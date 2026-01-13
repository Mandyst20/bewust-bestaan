import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessageCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleProfile = {
  username: "bewust_mens",
  bio: "Ontdekkingsreiziger van het innerlijk leven. Gepassioneerd over mindfulness en menselijke verbinding.",
  memberSince: "Oktober 2024",
  allowDm: true,
  topicCount: 12,
  replyCount: 47,
};

const UserProfile = () => {
  const { username } = useParams();
  const { toast } = useToast();

  const handleStartDm = () => {
    if (!sampleProfile.allowDm) {
      toast({
        title: "Privéberichten uitgeschakeld",
        description: "Deze gebruiker ontvangt geen privéberichten.",
      });
      return;
    }
    // Navigate to new DM
    window.location.href = `/messages/new?to=${username}`;
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-8 md:py-12">
        <Link
          to="/community"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Terug naar community
        </Link>

        <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
              {sampleProfile.username.charAt(0).toUpperCase()}
            </div>
            <div className="mt-4 sm:ml-6 sm:mt-0">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {sampleProfile.username}
              </h1>
              <div className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground sm:justify-start">
                <Calendar className="h-4 w-4" />
                <span>Lid sinds {sampleProfile.memberSince}</span>
              </div>
              {sampleProfile.bio && (
                <p className="mt-4 text-muted-foreground">
                  {sampleProfile.bio}
                </p>
              )}
              <div className="mt-6">
                <Button onClick={handleStartDm} variant="sage">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Stuur een bericht
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-8">
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {sampleProfile.topicCount}
              </p>
              <p className="text-sm text-muted-foreground">Topics gestart</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {sampleProfile.replyCount}
              </p>
              <p className="text-sm text-muted-foreground">Reacties geplaatst</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
