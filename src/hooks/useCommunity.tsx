import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Json } from "@/integrations/supabase/types";

// Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });
}

// Fetch a single category by slug
export function useCategory(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

// Fetch topics by category with profiles
export function useTopicsByCategory(categoryId: string | undefined) {
  return useQuery({
    queryKey: ["topics", "category", categoryId],
    queryFn: async () => {
      const { data: topics, error } = await supabase
        .from("topics")
        .select("*, topic_replies (id)")
        .eq("category_id", categoryId!)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!topics) return [];

      // Fetch profiles for all authors
      const authorIds = [...new Set(topics.map(t => t.author_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, username, avatar_url")
        .in("user_id", authorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

      return topics.map(topic => ({
        ...topic,
        profile: profileMap.get(topic.author_id),
      }));
    },
    enabled: !!categoryId,
  });
}

// Fetch recent topics across all categories
export function useRecentTopics(limit: number = 5) {
  return useQuery({
    queryKey: ["topics", "recent", limit],
    queryFn: async () => {
      const { data: topics, error } = await supabase
        .from("topics")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      if (!topics) return [];

      // Fetch profiles and categories
      const authorIds = [...new Set(topics.map(t => t.author_id))];
      const categoryIds = [...new Set(topics.map(t => t.category_id))];

      const [{ data: profiles }, { data: categories }] = await Promise.all([
        supabase.from("profiles").select("user_id, username, avatar_url").in("user_id", authorIds),
        supabase.from("categories").select("id, name, slug").in("id", categoryIds),
      ]);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));
      const categoryMap = new Map(categories?.map(c => [c.id, c]));

      return topics.map(topic => ({
        ...topic,
        profile: profileMap.get(topic.author_id),
        category: categoryMap.get(topic.category_id),
      }));
    },
  });
}

// Fetch a single topic
export function useTopic(id: string | undefined) {
  return useQuery({
    queryKey: ["topic", id],
    queryFn: async () => {
      const { data: topic, error } = await supabase
        .from("topics")
        .select("*")
        .eq("id", id!)
        .single();

      if (error) throw error;

      // Fetch profile and category
      const [{ data: profile }, { data: category }] = await Promise.all([
        supabase.from("profiles").select("user_id, username, avatar_url, allow_dm").eq("user_id", topic.author_id).single(),
        supabase.from("categories").select("id, name, slug").eq("id", topic.category_id).single(),
      ]);

      return {
        ...topic,
        profile,
        category,
      };
    },
    enabled: !!id,
  });
}

// Fetch topic replies
export function useTopicReplies(topicId: string | undefined) {
  return useQuery({
    queryKey: ["topic_replies", topicId],
    queryFn: async () => {
      const { data: replies, error } = await supabase
        .from("topic_replies")
        .select("*")
        .eq("topic_id", topicId!)
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (!replies) return [];

      // Fetch profiles for all authors
      const authorIds = [...new Set(replies.map(r => r.author_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, username, avatar_url, allow_dm")
        .in("user_id", authorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

      return replies.map(reply => ({
        ...reply,
        profile: profileMap.get(reply.author_id),
      }));
    },
    enabled: !!topicId,
  });
}

// Create a new topic
export function useCreateTopic() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      title,
      body,
      categoryId,
      tags,
    }: {
      title: string;
      body: string;
      categoryId: string;
      tags?: string[];
    }) => {
      if (!user) throw new Error("Je moet ingelogd zijn");

      const { data, error } = await supabase
        .from("topics")
        .insert({
          title,
          body,
          category_id: categoryId,
          author_id: user.id,
          tags: (tags || []) as unknown as Json,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
}

// Create a reply
export function useCreateReply() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      topicId,
      body,
    }: {
      topicId: string;
      body: string;
    }) => {
      if (!user) throw new Error("Je moet ingelogd zijn");

      const { data, error } = await supabase
        .from("topic_replies")
        .insert({
          topic_id: topicId,
          body,
          author_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["topic_replies", variables.topicId] });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
}
