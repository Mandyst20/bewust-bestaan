import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users } from "lucide-react";

export const WorkshopsSection = () => {
  const workshops = [
    {
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
      title: "7 Dagen Rust in Je Hoofd",
      description: "Een dagelijkse reis om meer rust en helderheid te vinden in je gedachten.",
      duration: "7 dagen",
      participants: 234,
      price: "€19",
      featured: true,
    },
    {
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
      title: "Elke Dag 5 Minuten Mindful",
      description: "Bouw mindfulness in je dagelijkse routine met korte oefeningen.",
      duration: "5 dagen",
      participants: 156,
      price: "Gratis",
    },
    {
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&q=80",
      title: "Stress Transformeren naar Kracht",
      description: "Zet stress om in positieve energie en persoonlijke groei.",
      duration: "6 dagen",
      participants: 189,
      price: "€29",
    },
  ];

  return (
    <section id="cursussen" className="section-padding bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-medium text-primary mb-3 block tracking-wide uppercase">Cursussen</span>
          <h2 className="heading-3 mb-4">
            Transformatie in kleine stappen
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Korte, krachtige workshops die je helpen om concrete veranderingen
            door te voeren in je dagelijks leven.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((workshop, index) => (
            <div
              key={index}
              className={`group bg-card rounded-2xl overflow-hidden shadow-soft card-hover ${
                workshop.featured ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                {workshop.featured && (
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    Populair
                  </span>
                )}
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {workshop.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {workshop.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {workshop.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {workshop.participants}
                    </span>
                  </div>
                  <span className="font-semibold text-primary">{workshop.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-lg px-8 border-primary/20 hover:bg-primary/5 hover:border-primary/40 text-primary"
          >
            Bekijk alle cursussen
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
