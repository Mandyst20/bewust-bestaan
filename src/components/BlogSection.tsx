import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const BlogSection = () => {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80",
      category: "Mindfulness",
      title: "5 Minuten Mindfulness: Kleine Stappen, Grote Impact",
      excerpt: "Ontdek hoe je met slechts 5 minuten per dag meer bewustzijn kunt creëren.",
      date: "2 dec 2024",
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      category: "Groei",
      title: "De Kracht van Zelfreflectie",
      excerpt: "Leer hoe zelfreflectie je helpt om diepere inzichten te krijgen.",
      date: "28 nov 2024",
    },
    {
      image: "https://images.unsplash.com/photo-1515894203077-9cd36032142f?w=400&q=80",
      category: "Balans",
      title: "Stress Loslaten: Praktische Technieken",
      excerpt: "Bewezen technieken om stress te verminderen en balans te vinden.",
      date: "25 nov 2024",
    },
  ];

  return (
    <section id="artikelen" className="section-padding bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sm font-medium text-primary mb-3 block tracking-wide uppercase">Inspiratie</span>
            <h2 className="heading-3">
              Laatste artikelen
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-primary/5 rounded-lg self-start sm:self-auto"
          >
            <Link to="/blogs">
              Alle artikelen
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="group cursor-pointer card-hover"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 shadow-soft">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
