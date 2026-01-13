import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { TopicCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Loader2 } from "lucide-react";
import { useCategory, useTopicsByCategory } from "@/hooks/useCommunity";
import { formatRelativeTime } from "@/lib/dateUtils";
import { Json } from "@/integrations/supabase/types";

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: category, isLoading: categoryLoading } = useCategory(slug || "");
  const { data: topics, isLoading: topicsLoading } = useTopicsByCategory(category?.id);

  const parseTags = (tags: Json | null): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === "string");
    return [];
  };

  if (categoryLoading) {
    return (
      <Layout>
        <div className="container py-8 md:py-12 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="container py-8 md:py-12">
          <Link
            to="/community"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Terug naar community
          </Link>
          <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-soft">
            <p className="text-muted-foreground">Categorie niet gevonden</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <Link
          to="/community"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Terug naar community
        </Link>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <PageHeader
            title={category.name}
            description={category.description || ""}
          />
          <Button onClick={() => navigate(`/community/nieuw-topic?category=${category.id}`)} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Nieuw topic
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          {topicsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : topics && topics.length > 0 ? (
            topics.map((topic) => (
              <TopicCard
                key={topic.id}
                title={topic.title}
                excerpt={topic.body.slice(0, 150) + (topic.body.length > 150 ? "..." : "")}
                author={topic.profile?.username || "Onbekend"}
                date={formatRelativeTime(topic.created_at)}
                replyCount={topic.topic_replies?.length || 0}
                tags={parseTags(topic.tags)}
                isLocked={topic.status === "locked"}
                onClick={() => navigate(`/community/topic/${topic.id}`)}
              />
            ))
          ) : (
            <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-soft">
              <p className="text-muted-foreground">
                Nog geen topics in deze categorie. Start de eerste discussie!
              </p>
              <Button 
                onClick={() => navigate(`/community/nieuw-topic?category=${category.id}`)} 
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nieuw topic maken
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
