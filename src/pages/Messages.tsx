import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const sampleThreads = [
  {
    id: "thread-1",
    otherUser: "bewust_mens",
    lastMessage: "Dankjewel voor je steun, het betekent veel voor me.",
    timestamp: "2 min geleden",
    unread: true,
  },
  {
    id: "thread-2",
    otherUser: "groeiend_hart",
    lastMessage: "Heb je die ademhalingsoefening al geprobeerd?",
    timestamp: "1 uur geleden",
    unread: false,
  },
  {
    id: "thread-3",
    otherUser: "stille_kracht",
    lastMessage: "Ik begrijp precies wat je bedoelt. Het is niet makkelijk.",
    timestamp: "Gisteren",
    unread: false,
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = sampleThreads.filter((thread) =>
    thread.otherUser.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container max-w-3xl py-8 md:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            title="Berichten"
            description="Jouw privégesprekken"
          />
          <Button onClick={() => navigate("/messages/new")} className="shrink-0">
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
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => (
              <Link
                key={thread.id}
                to={`/messages/${thread.id}`}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-medium text-primary">
                  {thread.otherUser.charAt(0).toUpperCase()}
                  {thread.unread && (
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card bg-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-medium ${thread.unread ? 'text-foreground' : 'text-foreground'}`}>
                      {thread.otherUser}
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {thread.timestamp}
                    </span>
                  </div>
                  <p className={`mt-0.5 truncate text-sm ${thread.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {thread.lastMessage}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-soft">
              <p className="text-muted-foreground">
                Geen gesprekken gevonden
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
