import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

const Guidelines = () => {
  return (
    <Layout>
      <div className="container max-w-3xl py-8 md:py-12">
        <PageHeader
          title="Communityrichtlijnen"
          description="Onze afspraken voor een veilige en warme gemeenschap"
        />

        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-foreground">🤝 Respecteer elkaar</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Iedereen hier is op een persoonlijke reis. Behandel anderen zoals je zelf behandeld wilt worden. Geen oordeel, geen kritiek — alleen warmte en begrip.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-foreground">🔒 Privacy is heilig</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Wat hier gedeeld wordt, blijft hier. Deel nooit persoonlijke informatie van anderen buiten dit platform.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-foreground">💚 Geen likes of scores</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Wij geloven niet in populariteitswedstrijden. Hier draait het om echte verbinding, niet om aandacht.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-foreground">🚫 Niet toegestaan</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>• Haatdragende of discriminerende uitingen</li>
              <li>• Spam of commerciële berichten</li>
              <li>• Delen van persoonlijke gegevens van anderen</li>
              <li>• Ongewenste benadering na aangeven van grenzen</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Guidelines;
