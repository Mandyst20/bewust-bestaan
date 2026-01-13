import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { CategoryCard } from "@/components/Cards";
import { Heart, Users, Compass, Sparkles, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategories, useRecentTopics } from "@/hooks/useCommunity";
import { formatRelativeTime } from "@/lib/dateUtils";

const categoryIcons: Record<string, React.ReactNode> = {
  "emoties-innerlijke-onrust": <Heart className="h-6 w-6" />,
  "grenzen-relaties": <Users className="h-6 w-6" />,
  "zelfbeeld": <Sparkles className="h-6 w-6" />,
  "zingeving": <Compass className="h-6 w-6" />,
};

const Community = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: recentTopics, isLoading: topicsLoading } = useRecentTopics(5);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <PageHeader
            title="Community"
            description="Verbind met anderen die dezelfde reis maken. Kies een categorie om te beginnen."
          />
          <Button onClick={() => navigate("/community/nieuw-topic")} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Nieuw topic
          </Button>
        </div>

        {categoriesLoading ? (
          <div className="mt-8 flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {categories?.map((category) => (
              <CategoryCard
                key={category.slug}
                title={category.name}
                description={category.description || ""}
                icon={categoryIcons[category.slug] || <Heart className="h-6 w-6" />}
                onClick={() => navigate(`/community/category/${category.slug}`)}
              />
            ))}
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Recente activiteit
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            De nieuwste bijdragen uit de community
          </p>
          
          <div className="mt-6 space-y-3">
            {topicsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : recentTopics && recentTopics.length > 0 ? (
              recentTopics.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/community/topic/${topic.id}`}
                  className="block rounded-xl border border-border/50 bg-card p-4 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-foreground">{topic.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        in {topic.category?.name} • door {topic.profile?.username}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatRelativeTime(topic.created_at)}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-soft">
                <p className="text-muted-foreground">
                  Nog geen topics. Start de eerste discussie!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
