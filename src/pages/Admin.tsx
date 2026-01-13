import { Layout } from "@/components/Layout";
import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MessageSquare, AlertTriangle, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Admin = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <PageHeader
          title="Admin Dashboard"
          description="Beheer gebruikers, content en veiligheid"
        />

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <ContentCard className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-sm text-muted-foreground">Actieve leden</p>
            </div>
          </ContentCard>
          <ContentCard className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage-dark">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-sm text-muted-foreground">Topics vandaag</p>
            </div>
          </ContentCard>
          <ContentCard className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Openstaande alerts</p>
            </div>
          </ContentCard>
        </div>

        {/* Safety Alerts */}
        <div className="mt-12">
          <SectionHeader title="Veiligheidsalerts" description="AI-gedetecteerde berichten die aandacht nodig hebben" />
          <div className="mt-6 space-y-3">
            {[
              { type: "Topic", user: "anoniem_123", level: "medium", reason: "Mogelijk zorgwekkende inhoud gedetecteerd" },
              { type: "DM", user: "gebruiker_456", level: "high", reason: "Dringende ondersteuning mogelijk nodig" },
            ].map((alert, i) => (
              <ContentCard key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${alert.level === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-accent text-accent-foreground'}`}>
                    {alert.level}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{alert.type} van {alert.user}</p>
                    <p className="text-sm text-muted-foreground">{alert.reason}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Bekijken</Button>
              </ContentCard>
            ))}
          </div>
        </div>

        {/* User Search */}
        <div className="mt-12">
          <SectionHeader title="Gebruikers beheren" />
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Zoek op gebruikersnaam of e-mail..." className="pl-10" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
