import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, MessageCircle, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { replyBodySchema } from "@/lib/validations";
import { useTopic, useTopicReplies, useCreateReply } from "@/hooks/useCommunity";
import { useCreateThread } from "@/hooks/useMessages";
import { formatRelativeTime } from "@/lib/dateUtils";
import { useAuth } from "@/hooks/useAuth";
import { Json } from "@/integrations/supabase/types";

const TopicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState("");

  const { data: topic, isLoading: topicLoading } = useTopic(id);
  const { data: replies, isLoading: repliesLoading } = useTopicReplies(id);
  const createReply = useCreateReply();
  const createThread = useCreateThread();

  const parseTags = (tags: Json | null): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === "string");
    return [];
  };

  const handleReply = async () => {
    setReplyError("");
    
    const result = replyBodySchema.safeParse(replyText);
    if (!result.success) {
      setReplyError(result.error.errors[0]?.message || "Ongeldige invoer");
      return;
    }

    try {
      await createReply.mutateAsync({
        topicId: id!,
        body: replyText,
      });

      toast({
        title: "Reactie geplaatst",
        description: "Je reactie is toegevoegd aan dit topic.",
      });
      setReplyText("");
    } catch (error: any) {
      toast({
        title: "Fout",
        description: error.message || "Kon reactie niet plaatsen",
        variant: "destructive",
      });
    }
  };

  const handleStartDm = async (userId: string | undefined, allowDm: boolean | null) => {
    if (!allowDm) {
      toast({
        title: "Privéberichten uitgeschakeld",
        description: "Deze gebruiker ontvangt geen privéberichten.",
      });
      return;
    }

    if (!userId) return;

    try {
      const thread = await createThread.mutateAsync(userId);
      navigate(`/messages/${thread.id}`);
    } catch (error: any) {
      toast({
        title: "Fout",
        description: error.message || "Kon chat niet starten",
        variant: "destructive",
      });
    }
  };

  if (topicLoading) {
    return (
      <Layout>
        <div className="container py-8 md:py-12 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!topic) {
    return (
      <Layout>
        <div className="container max-w-4xl py-8 md:py-12">
          <Link
            to="/community"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Terug naar community
          </Link>
          <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-soft">
            <p className="text-muted-foreground">Topic niet gevonden</p>
          </div>
        </div>
      </Layout>
    );
  }

  const isLocked = topic.status === "locked";

  return (
    <Layout>
      <div className="container max-w-4xl py-8 md:py-12">
        <Link
          to={`/community/category/${topic.category?.slug}`}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Terug naar {topic.category?.name}
        </Link>

        {/* Topic */}
        <article className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm text-muted-foreground">
                {topic.category?.name}
              </span>
              <h1 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
                {topic.title}
              </h1>
            </div>
            {isLocked && (
              <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Gesloten
              </span>
            )}
          </div>

          <div className="mt-6 whitespace-pre-wrap text-foreground leading-relaxed">
            {topic.body}
          </div>

          {parseTags(topic.tags).length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {parseTags(topic.tags).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-6">
            <Link
              to={`/u/${topic.profile?.username}`}
              className="flex items-center gap-3 transition-smooth hover:opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {topic.profile?.avatar_url ? (
                  <img src={topic.profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  topic.profile?.username?.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{topic.profile?.username}</p>
                <p className="text-xs text-muted-foreground">{formatRelativeTime(topic.created_at)}</p>
              </div>
            </Link>
            {user && topic.profile?.user_id !== user.id && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStartDm(topic.profile?.user_id, topic.profile?.allow_dm ?? true)}
                disabled={createThread.isPending}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Privé verder praten
              </Button>
            )}
          </div>
        </article>

        {/* Replies */}
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {replies?.length || 0} reacties
          </h2>

          <div className="mt-4 space-y-4">
            {repliesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : replies && replies.length > 0 ? (
              replies.map((reply) => (
                <div
                  key={reply.id}
                  className="rounded-xl border border-border/50 bg-card p-5 shadow-soft"
                >
                  <p className="text-foreground leading-relaxed">{reply.body}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/u/${reply.profile?.username}`}
                      className="flex items-center gap-2 transition-smooth hover:opacity-80"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {reply.profile?.avatar_url ? (
                          <img src={reply.profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          reply.profile?.username?.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{reply.profile?.username}</p>
                        <p className="text-xs text-muted-foreground">{formatRelativeTime(reply.created_at)}</p>
                      </div>
                    </Link>
                    {user && reply.profile?.user_id !== user.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartDm(reply.profile?.user_id, reply.profile?.allow_dm ?? true)}
                        className="text-xs"
                        disabled={createThread.isPending}
                      >
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Privé verder
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-border/50 bg-card p-6 text-center shadow-soft">
                <p className="text-muted-foreground">Nog geen reacties. Wees de eerste!</p>
              </div>
            )}
          </div>
        </div>

        {/* Reply Form */}
        {!isLocked && user && (
          <div className="mt-8 rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Jouw reactie
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Deel je gedachten, ervaringen of steun met de community
            </p>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Schrijf hier je reactie..."
              className="mt-4 min-h-32"
              maxLength={5000}
            />
            {replyError && (
              <p className="mt-2 text-sm text-destructive">{replyError}</p>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{replyText.length}/5000 karakters</span>
              <Button 
                onClick={handleReply} 
                disabled={!replyText.trim() || createReply.isPending}
              >
                {createReply.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reactie plaatsen
              </Button>
            </div>
          </div>
        )}

        {!user && (
          <div className="mt-8 rounded-2xl border border-border/50 bg-card p-6 shadow-soft text-center">
            <p className="text-muted-foreground mb-4">
              Log in om te reageren op dit topic
            </p>
            <Button asChild>
              <Link to="/login">Inloggen</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TopicPage;
