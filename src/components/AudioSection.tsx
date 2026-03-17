import { Button } from "@/components/ui/button";
import { Headphones, Play, Check } from "lucide-react";

export const AudioSection = () => {
  const features = [
    "Dagelijkse meditaties van 10-15 minuten",
    "Rustgevende slaap visualisaties",
    "Wekelijkse podcasts over bewustwording",
    "Nieuwe content elke week",
  ];

  const audioItems = [
    { title: "Ochtend Meditatie", duration: "10 min", type: "Meditatie" },
    { title: "Avond Visualisatie", duration: "15 min", type: "Visualisatie" },
    { title: "Mindful Moment", duration: "5 min", type: "Quick" },
  ];

  return (
    <section id="audio" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-primary mb-3 block tracking-wide uppercase">Audio Abonnement</span>
              <h2 className="heading-3 mb-4">
                Exclusieve audio content voor dagelijks bewust leven
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Maandelijks abonnement met nieuwe meditaties, visualisaties en podcasts
                die je helpen bij je persoonlijke groei.
              </p>
            </div>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-card rounded-2xl p-6 inline-block shadow-soft border border-border/50">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-semibold text-foreground">€12,99</span>
                <span className="text-muted-foreground">/ maand</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Volledige toegang tot alle content</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                Start Abonnement
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-3xl p-8 shadow-medium border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Nu aan het luisteren</div>
                  <div className="text-sm text-muted-foreground">50+ sessies beschikbaar</div>
                </div>
              </div>

              <div className="space-y-3">
                {audioItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      index === 0 ? 'bg-primary/10' : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      index === 0 ? 'bg-primary text-primary-foreground' : 'bg-background'
                    }`}>
                      <Play className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.type}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.duration}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Ochtend Meditatie</span>
                  <span className="text-muted-foreground">3:24 / 10:00</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
