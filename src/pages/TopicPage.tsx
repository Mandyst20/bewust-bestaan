import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, MessageCircle, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { replyBodySchema } from "@/lib/validations";

const sampleTopic = {
  id: 1,
  title: "Hoe ga je om met overweldigende gedachten?",
  body: `Hallo allemaal,

Ik merk dat ik de laatste tijd 's nachts vaak wakker word met gedachten die maar blijven malen. Het voelt alsof mijn hoofd nooit stilstaat.

Overdag lukt het me om mezelf af te leiden met werk en andere bezigheden, maar zodra het stil wordt, komen alle zorgen terug.

Ik vraag me af of anderen dit herkennen en of jullie tips hebben om hiermee om te gaan. Hoe vinden jullie rust in je hoofd?

Met warme groet,
rust_zoeker`,
  author: "rust_zoeker",
  authorBio: "Op zoek naar innerlijke rust",
  date: "2 uur geleden",
  category: "Emoties & innerlijke onrust",
  categorySlug: "emoties-innerlijke-onrust",
  tags: ["angst", "slaap", "gedachten"],
  isLocked: false,
};

const sampleReplies = [
  {
    id: 1,
    author: "bewust_mens",
    body: "Wat herkenbaar. Wat mij helpt is een 'zorgen-momentje' overdag inplannen. Dan schrijf ik alles op wat me bezighoudt, zodat mijn hoofd 's nachts weet dat het al 'behandeld' is.",
    date: "1 uur geleden",
    allowDm: true,
  },
  {
    id: 2,
    author: "groeiend_hart",
    body: "Ik doe vaak een body scan voor het slapen. Gewoon aandacht geven aan elk deel van je lichaam, van je tenen naar je hoofd. Het helpt om uit je hoofd te komen en in je lichaam te komen.",
    date: "45 minuten geleden",
    allowDm: true,
  },
  {
    id: 3,
    author: "stille_kracht",
    body: "Ademhalingsoefeningen werken voor mij. 4 tellen inademen, 7 tellen vasthouden, 8 tellen uitademen. Het activeert je parasympathisch zenuwstelsel.",
    date: "30 minuten geleden",
    allowDm: false,
  },
];

const TopicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState("");

  const handleReply = () => {
    setReplyError("");
    
    // Validate reply
    const result = replyBodySchema.safeParse(replyText);
    if (!result.success) {
      setReplyError(result.error.errors[0]?.message || "Ongeldige invoer");
      return;
    }

    toast({
      title: "Reactie geplaatst",
      description: "Je reactie is toegevoegd aan dit topic.",
    });
    setReplyText("");
  };

  const handleStartDm = (username: string, allowDm: boolean) => {
    if (!allowDm) {
      toast({
        title: "Privéberichten uitgeschakeld",
        description: "Deze gebruiker ontvangt geen privéberichten.",
      });
      return;
    }
    navigate(`/messages/new?to=${username}`);
  };

  return (
    <Layout isLoggedIn={true} isAdmin={isAdmin}>
      <div className="container max-w-4xl py-8 md:py-12">
        <Link
          to={`/community/category/${sampleTopic.categorySlug}`}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Terug naar {sampleTopic.category}
        </Link>

        {/* Topic */}
        <article className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm text-muted-foreground">
                {sampleTopic.category}
              </span>
              <h1 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
                {sampleTopic.title}
              </h1>
            </div>
            {sampleTopic.isLocked && (
              <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Gesloten
              </span>
            )}
          </div>

          <div className="mt-6 whitespace-pre-wrap text-foreground leading-relaxed">
            {sampleTopic.body}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {sampleTopic.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-6">
            <Link
              to={`/u/${sampleTopic.author}`}
              className="flex items-center gap-3 transition-smooth hover:opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {sampleTopic.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-foreground">{sampleTopic.author}</p>
                <p className="text-xs text-muted-foreground">{sampleTopic.date}</p>
              </div>
            </Link>
            <Button
              variant="sage"
              size="sm"
              onClick={() => handleStartDm(sampleTopic.author, true)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Privé verder praten
            </Button>
          </div>
        </article>

        {/* Replies */}
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {sampleReplies.length} reacties
          </h2>

          <div className="mt-4 space-y-4">
            {sampleReplies.map((reply) => (
              <div
                key={reply.id}
                className="rounded-xl border border-border/50 bg-card p-5 shadow-soft"
              >
                <p className="text-foreground leading-relaxed">{reply.body}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/u/${reply.author}`}
                    className="flex items-center gap-2 transition-smooth hover:opacity-80"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {reply.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{reply.author}</p>
                      <p className="text-xs text-muted-foreground">{reply.date}</p>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStartDm(reply.author, reply.allowDm)}
                    className="text-xs"
                  >
                    <MessageCircle className="mr-1 h-3 w-3" />
                    Privé verder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        {!sampleTopic.isLocked && (
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
              <Button onClick={handleReply} disabled={!replyText.trim()}>
                Reactie plaatsen
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TopicPage;
