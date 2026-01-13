import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";

const sampleExercise = {
  slug: "ademhalingsoefening-rust",
  title: "4-7-8 Ademhalingsoefening",
  body: `Deze kalmerende ademhalingstechniek werd ontwikkeld door Dr. Andrew Weil en is gebaseerd op oude yogapraktijken. Het is een natuurlijke manier om je zenuwstelsel te kalmeren.

## Hoe werkt het?

De 4-7-8 ademhaling activeert je parasympathisch zenuwstelsel — het deel van je lichaam dat zorgt voor rust en herstel. Door bewust te ademen, geef je je lichaam het signaal dat het veilig is om te ontspannen.

## De techniek

**Voorbereiding**
Ga comfortabel zitten of liggen. Plaats het puntje van je tong tegen het weefsel achter je bovenste voortanden. Houd je tong daar gedurende de hele oefening.

**De stappen:**

1. **Adem uit** - Laat alle lucht uit je longen ontsnappen door je mond met een zuchtend geluid.

2. **Adem in (4 tellen)** - Sluit je mond en adem stil door je neus in terwijl je mentaal tot 4 telt.

3. **Houd vast (7 tellen)** - Houd je adem vast en tel tot 7.

4. **Adem uit (8 tellen)** - Adem volledig uit door je mond, met een zuchtend geluid, terwijl je tot 8 telt.

Dit is één cyclus. Herhaal de cyclus nog 3 keer, voor een totaal van 4 ademhalingen.

## Tips

- Begin met 4 cycli en bouw langzaam op
- Doe dit minimaal twee keer per dag voor het beste resultaat
- Als je je duizelig voelt, stop dan en adem normaal
- Het is normaal dat het in het begin ongemakkelijk voelt — dit wordt makkelijker met oefening

## Wanneer gebruik je dit?

- Voor het slapengaan
- Bij stress of spanning
- Na een moeilijk gesprek
- Als je je overweldigd voelt
- Als "reset" midden op de dag

---

*Neem de tijd. Er is geen haast. Jouw welzijn is het waard.*`,
  duration: "5 minuten",
  hasAudio: true,
};

const ExerciseDetail = () => {
  const { slug } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Layout>
      <article className="py-8 md:py-12">
        <div className="container max-w-3xl">
          <Link
            to="/oefeningen"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Terug naar oefeningen
          </Link>

          <header>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>⏱ {sampleExercise.duration}</span>
              {sampleExercise.hasAudio && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Volume2 className="h-4 w-4" />
                    Met audiobegeleiding
                  </span>
                </>
              )}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              {sampleExercise.title}
            </h1>
          </header>

          {/* Audio Player */}
          {sampleExercise.hasAudio && (
            <div className="mt-8 rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-14 w-14 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {isPlaying ? "Nu aan het afspelen..." : "Audiobegeleiding"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {sampleExercise.duration}
                  </p>
                </div>
              </div>
              
              {/* Progress bar placeholder */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div 
                  className={`h-full bg-primary transition-all duration-300 ${isPlaying ? 'w-1/3' : 'w-0'}`} 
                />
              </div>
            </div>
          )}

          <div className="mt-8">
            {sampleExercise.body.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="mt-10 font-display text-2xl font-semibold text-foreground">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={index} className="mt-6 font-semibold text-foreground">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                const isNumbered = paragraph.startsWith('1. ');
                const ListTag = isNumbered ? 'ol' : 'ul';
                return (
                  <ListTag key={index} className={`mt-4 space-y-3 ${isNumbered ? 'list-decimal' : 'list-disc'} pl-6`}>
                    {items.map((item, i) => {
                      const content = item.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '');
                      const parts = content.split('**');
                      return (
                        <li key={i} className="text-foreground leading-relaxed">
                          {parts.map((part, j) => 
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                          )}
                        </li>
                      );
                    })}
                  </ListTag>
                );
              }
              if (paragraph.startsWith('---')) {
                return <hr key={index} className="my-8 border-border" />;
              }
              if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                return (
                  <p key={index} className="mt-6 italic text-muted-foreground">
                    {paragraph.replace(/\*/g, '')}
                  </p>
                );
              }
              return (
                <p key={index} className="mt-6 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ExerciseDetail;
