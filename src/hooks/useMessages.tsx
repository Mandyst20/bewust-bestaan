import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

// Fetch all DM threads for the current user
export function useThreads() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["dm_threads", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("dm_threads")
        .select(`
          *,
          user_a_profile:profiles!dm_threads_user_a_fkey (username, avatar_url),
          user_b_profile:profiles!dm_threads_user_b_fkey (username, avatar_url)
        `)
        .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
        .order("last_message_at", { ascending: false });

      if (error) {
        // If the join fails, try without the foreign key references
        const { data: simpleData, error: simpleError } = await supabase
          .from("dm_threads")
          .select("*")
          .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
          .order("last_message_at", { ascending: false });

        if (simpleError) throw simpleError;

        // Manually fetch profiles for each thread
        const profileIds = new Set<string>();
        simpleData?.forEach((thread) => {
          profileIds.add(thread.user_a);
          profileIds.add(thread.user_b);
        });

        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, username, avatar_url")
          .in("user_id", Array.from(profileIds));

        const profileMap = new Map(profiles?.map((p) => [p.user_id, p]));

        return simpleData?.map((thread) => ({
          ...thread,
          user_a_profile: profileMap.get(thread.user_a),
          user_b_profile: profileMap.get(thread.user_b),
        }));
      }

      return data;
    },
    enabled: !!user,
  });
}

// Fetch a single thread with the last message
export function useThread(threadId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["dm_thread", threadId],
    queryFn: async () => {
      if (!user || !threadId) return null;

      const { data, error } = await supabase
        .from("dm_threads")
        .select("*")
        .eq("id", threadId)
        .single();

      if (error) throw error;

      // Get the other user's profile
      const otherUserId = data.user_a === user.id ? data.user_b : data.user_a;
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url, user_id")
        .eq("user_id", otherUserId)
        .single();

      return { ...data, otherUser: profile };
    },
    enabled: !!user && !!threadId,
  });
}

// Fetch messages for a thread
export function useThreadMessages(threadId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["dm_messages", threadId],
    queryFn: async () => {
      if (!threadId) return [];

      const { data, error } = await supabase
        .from("dm_messages")
        .select("*")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!threadId,
  });

  // Subscribe to realtime updates
  useEffect(() => {
    if (!threadId) return;

    const channel = supabase
      .channel(`dm_messages_${threadId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dm_messages",
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ["dm_messages", threadId],
            (old: any[] | undefined) => {
              if (!old) return [payload.new];
              // Avoid duplicates
              if (old.some((msg) => msg.id === payload.new.id)) return old;
              return [...old, payload.new];
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId, queryClient]);

  return query;
}

// Send a message
export function useSendMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      threadId,
      body,
    }: {
      threadId: string;
      body: string;
    }) => {
      if (!user) throw new Error("Je moet ingelogd zijn");

      const { data, error } = await supabase
        .from("dm_messages")
        .insert({
          thread_id: threadId,
          sender_id: user.id,
          body,
        })
        .select()
        .single();

      if (error) throw error;

      // Update thread's last_message_at
      await supabase
        .from("dm_threads")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", threadId);

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dm_threads"] });
    },
  });
}

// Create or get existing thread with a user
export function useCreateThread() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (otherUserId: string) => {
      if (!user) throw new Error("Je moet ingelogd zijn");
      if (user.id === otherUserId) throw new Error("Je kunt geen chat starten met jezelf");

      // Check if thread already exists
      const { data: existingThread } = await supabase
        .from("dm_threads")
        .select("*")
        .or(
          `and(user_a.eq.${user.id},user_b.eq.${otherUserId}),and(user_a.eq.${otherUserId},user_b.eq.${user.id})`
        )
        .single();

      if (existingThread) {
        return existingThread;
      }

      // Create new thread
      const { data, error } = await supabase
        .from("dm_threads")
        .insert({
          user_a: user.id,
          user_b: otherUserId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dm_threads"] });
    },
  });
}

// Get last message for each thread
export function useLastMessages(threadIds: string[]) {
  return useQuery({
    queryKey: ["last_messages", threadIds],
    queryFn: async () => {
      if (threadIds.length === 0) return {};

      const messages: Record<string, { body: string; created_at: string }> = {};

      // Fetch last message for each thread
      for (const threadId of threadIds) {
        const { data } = await supabase
          .from("dm_messages")
          .select("body, created_at")
          .eq("thread_id", threadId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (data) {
          messages[threadId] = data;
        }
      }

      return messages;
    },
    enabled: threadIds.length > 0,
  });
}
