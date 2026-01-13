import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Users, BookOpen, Shield, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center stagger-children">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Heart className="h-4 w-4" />
              <span>Een veilige plek voor jou</span>
            </div>
            
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Ontdek de kracht van{" "}
              <span className="text-gradient-warm">bewust leven</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Welkom bij Bewust Bestaan — een warme community waar je jezelf mag zijn. 
              Zonder likes, zonder scores. Alleen echte verbinding en groei.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button variant="hero" size="xl">
                  Start je reis
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Ik heb al een account
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Wat maakt ons bijzonder?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Bewust Bestaan is anders. Hier draait het niet om populariteit, 
              maar om echte menselijke verbinding.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft transition-smooth hover:shadow-medium">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">
                Veilige Community
              </h3>
              <p className="mt-3 text-muted-foreground">
                Deel je gedachten en gevoelens in een ondersteunende omgeving. 
                Geen oordeel, alleen begrip.
              </p>
            </div>
            
            <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft transition-smooth hover:shadow-medium">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sage/10 text-sage-dark">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">
                Inspirerende Content
              </h3>
              <p className="mt-3 text-muted-foreground">
                Ontdek blogs en oefeningen die je helpen om meer bewust en 
                aanwezig te leven.
              </p>
            </div>
            
            <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-soft transition-smooth hover:shadow-medium">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/50 text-clay">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">
                Jouw Privacy Voorop
              </h3>
              <p className="mt-3 text-muted-foreground">
                Jij bepaalt wie je mag benaderen. Volledige controle over 
                je eigen veilige ruimte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-card/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Klaar om te beginnen?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Word onderdeel van onze groeiende community en ontdek wat bewust 
              leven voor jou kan betekenen.
            </p>
            <Link to="/register" className="mt-8 inline-block">
              <Button variant="hero" size="lg">
                Maak gratis een account aan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
