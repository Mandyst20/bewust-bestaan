import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { CategoryCard } from "@/components/Cards";
import { Heart, Users, Compass, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    slug: "emoties-innerlijke-onrust",
    name: "Emoties & innerlijke onrust",
    description: "Een veilige plek om te delen wat je voelt. Angst, verdriet, onrust — je bent niet alleen.",
    icon: <Heart className="h-6 w-6" />,
    topicCount: 24,
  },
  {
    slug: "grenzen-relaties",
    name: "Grenzen & relaties",
    description: "Praat over relaties, het stellen van grenzen, en het omgaan met anderen in je leven.",
    icon: <Users className="h-6 w-6" />,
    topicCount: 18,
  },
  {
    slug: "zelfbeeld",
    name: "Zelfbeeld",
    description: "Ontdek wie je bent en wie je wilt zijn. Deel je worstelingen en overwinningen.",
    icon: <Sparkles className="h-6 w-6" />,
    topicCount: 31,
  },
  {
    slug: "zingeving",
    name: "Zingeving",
    description: "Grote levensvragen, doel en betekenis. Samen zoeken naar wat ertoe doet.",
    icon: <Compass className="h-6 w-6" />,
    topicCount: 15,
  },
];

const Community = () => {
  const navigate = useNavigate();

  return (
    <Layout isLoggedIn={true}>
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              title={category.name}
              description={category.description}
              icon={category.icon}
              topicCount={category.topicCount}
              onClick={() => navigate(`/community/category/${category.slug}`)}
            />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Recente activiteit
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            De nieuwste bijdragen uit de community
          </p>
          
          <div className="mt-6 space-y-3">
            {[
              { title: "Hoe ga je om met overweldigende gedachten?", category: "Emoties & innerlijke onrust", author: "rust_zoeker", time: "2 uur geleden" },
              { title: "Tips voor het stellen van grenzen op werk", category: "Grenzen & relaties", author: "bewust_mens", time: "5 uur geleden" },
              { title: "Mijn reis naar zelfacceptatie", category: "Zelfbeeld", author: "groeiend_hart", time: "1 dag geleden" },
            ].map((topic, index) => (
              <Link
                key={index}
                to={`/community/topic/${index + 1}`}
                className="block rounded-xl border border-border/50 bg-card p-4 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-foreground">{topic.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      in {topic.category} • door {topic.author}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {topic.time}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
