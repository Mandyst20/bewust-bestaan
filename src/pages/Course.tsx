import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Lock, GraduationCap } from "lucide-react";

const Course = () => {
  const hasAccess = false; // TODO: Check entitlements

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {hasAccess ? (
          // Course content for paid users
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Jouw Cursus
            </h1>
            {/* Course modules would go here */}
          </div>
        ) : (
          // Locked state
          <div className="mx-auto max-w-2xl text-center py-12">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <Lock className="h-12 w-12 text-muted-foreground" />
            </div>
            
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Cursus: De Weg Naar Binnen
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground">
              Een diepgaande reis naar zelfkennis en innerlijke rust. 
              Deze cursus helpt je om bewuster te leven en meer in verbinding 
              te komen met jezelf.
            </p>

            <div className="mt-10 rounded-2xl border border-border/50 bg-card p-8 shadow-soft text-left">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Wat je krijgt
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "8 weken aan diepgaande modules",
                  "Praktische oefeningen en reflecties",
                  "Audiobegeleiding voor meditaties",
                  "Levenslange toegang tot alle materialen",
                  "Certificaat van voltooiing",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sage-dark">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8">
              <p className="text-sm text-muted-foreground">Eenmalige investering</p>
              <p className="mt-2 font-display text-4xl font-bold text-foreground">
                €97
              </p>
              <Button size="lg" className="mt-6 w-full sm:w-auto">
                <GraduationCap className="mr-2 h-5 w-5" />
                Krijg toegang
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Veilig betalen via Stripe. 14 dagen niet-goed-geld-terug garantie.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Course;
