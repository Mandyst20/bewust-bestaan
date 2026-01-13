import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useThreads, useLastMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { formatRelativeTime } from "@/lib/dateUtils";

const Messages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: threads, isLoading: threadsLoading } = useThreads();
  const threadIds = threads?.map((t) => t.id) || [];
  const { data: lastMessages } = useLastMessages(threadIds);

  const getOtherUser = (thread: any) => {
    if (!user) return null;
    if (thread.user_a === user.id) {
      return thread.user_b_profile;
    }
    return thread.user_a_profile;
  };

  const filteredThreads = threads?.filter((thread) => {
    const otherUser = getOtherUser(thread);
    return otherUser?.username?.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  return (
    <Layout>
      <div className="container max-w-3xl py-8 md:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            title="Berichten"
            description="Jouw privégesprekken"
          />
          <Button onClick={() => navigate("/community")} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Nieuw gesprek
          </Button>
        </div>

        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Zoek in gesprekken..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Thread List */}
        <div className="mt-6 space-y-2">
          {threadsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => {
              const otherUser = getOtherUser(thread);
              const lastMessage = lastMessages?.[thread.id];
              
              return (
                <Link
                  key={thread.id}
                  to={`/messages/${thread.id}`}
                  className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
                >
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-medium text-primary">
                    {otherUser?.avatar_url ? (
                      <img src={otherUser.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      otherUser?.username?.charAt(0).toUpperCase() || "?"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-foreground">
                        {otherUser?.username || "Onbekend"}
                      </p>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatRelativeTime(lastMessage?.created_at || thread.last_message_at)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {lastMessage?.body || "Start het gesprek..."}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-soft">
              <p className="text-muted-foreground">
                {searchQuery ? "Geen gesprekken gevonden" : "Nog geen privégesprekken. Start een chat vanuit een topic in de community!"}
              </p>
              <Button onClick={() => navigate("/community")} className="mt-4" variant="outline">
                Naar community
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
