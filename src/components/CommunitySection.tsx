import { Button } from "@/components/ui/button";
import { Users, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CommunitySection = () => {
  const testimonials = [
    {
      text: "Deze community heeft mijn leven veranderd. De ondersteuning en warmte zijn ongelooflijk.",
      name: "Sarah M.",
      role: "6 maanden lid",
      avatar: "S",
    },
    {
      text: "Eindelijk een plek waar ik mezelf kan zijn en kan groeien samen met anderen.",
      name: "Mark V.",
      role: "1 jaar lid",
      avatar: "M",
    },
    {
      text: "De dagelijkse meditaties en community gesprekken hebben me enorm geholpen.",
      name: "Lisa K.",
      role: "8 maanden lid",
      avatar: "L",
    },
  ];

  return (
    <section id="community" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-primary mb-3 block tracking-wide uppercase">Community</span>
          <h2 className="heading-3 mb-4">
            Groei samen met gelijkgestemden
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Sluit je aan bij een warme, ondersteunende community waar je ervaringen
            kunt delen en samen kunt groeien.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mb-16">
          {[
            { icon: <Users className="h-5 w-5" />, value: "1000+", label: "Leden" },
            { icon: <MessageCircle className="h-5 w-5" />, value: "500+", label: "Gesprekken" },
            { icon: <Heart className="h-5 w-5" />, value: "50+", label: "Workshops" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 card-hover"
            >
              <svg className="h-8 w-8 text-primary/40 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 max-w-md mx-auto border border-primary/10">
            <h3 className="text-xl font-semibold mb-2">Word lid van de community</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Gratis toegang tot discussies, events en ondersteuning
            </p>
            <Button
              asChild
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            >
              <Link to="/register">
                Gratis Lid Worden
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
