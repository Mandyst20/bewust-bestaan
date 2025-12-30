import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { TopicCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";

const categoryData: Record<string, { name: string; description: string }> = {
  "emoties-innerlijke-onrust": {
    name: "Emoties & innerlijke onrust",
    description: "Een veilige plek om te delen wat je voelt. Angst, verdriet, onrust — je bent niet alleen.",
  },
  "grenzen-relaties": {
    name: "Grenzen & relaties",
    description: "Praat over relaties, het stellen van grenzen, en het omgaan met anderen in je leven.",
  },
  "zelfbeeld": {
    name: "Zelfbeeld",
    description: "Ontdek wie je bent en wie je wilt zijn. Deel je worstelingen en overwinningen.",
  },
  "zingeving": {
    name: "Zingeving",
    description: "Grote levensvragen, doel en betekenis. Samen zoeken naar wat ertoe doet.",
  },
};

const sampleTopics = [
  {
    id: 1,
    title: "Hoe ga je om met overweldigende gedachten?",
    excerpt: "Soms word ik 's nachts wakker met gedachten die maar blijven malen. Heeft iemand tips om hiermee om te gaan?",
    author: "rust_zoeker",
    date: "2 uur geleden",
    replyCount: 12,
    tags: ["angst", "slaap", "gedachten"],
  },
  {
    id: 2,
    title: "Mijn eerste stap naar rust",
    excerpt: "Vandaag heb ik voor het eerst een wandeling gemaakt zonder mijn telefoon. Het voelde bevrijdend.",
    author: "bewust_mens",
    date: "5 uur geleden",
    replyCount: 8,
    tags: ["mindfulness", "natuur"],
  },
  {
    id: 3,
    title: "Omgaan met emoties na een moeilijke dag",
    excerpt: "Werk was vandaag heel zwaar. Ik zoek manieren om 's avonds los te laten. Wat werkt voor jullie?",
    author: "groeiend_hart",
    date: "1 dag geleden",
    replyCount: 15,
    tags: ["werk", "stress", "ontspanning"],
  },
];

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = categoryData[slug || ""] || { name: "Categorie", description: "" };

  return (
    <Layout isLoggedIn={true}>
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
            description={category.description}
          />
          <Button onClick={() => navigate("/community/nieuw-topic")} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Nieuw topic
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          {sampleTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              excerpt={topic.excerpt}
              author={topic.author}
              date={topic.date}
              replyCount={topic.replyCount}
              tags={topic.tags}
              onClick={() => navigate(`/community/topic/${topic.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
