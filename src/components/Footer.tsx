import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-lg font-semibold">Bewust Bestaan</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Een veilige plek voor rust, verbinding en persoonlijke groei.
              Samen ontdekken we de kracht van bewust leven.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2">
              {["Community", "Blogs", "Oefeningen", "Cursus"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Informatie</h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Communityrichtlijnen", href: "/richtlijnen" },
                { label: "Privacy", href: "/privacy" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bewust Bestaan. Met zorg gemaakt voor jouw welzijn.
          </p>
        </div>
      </div>
    </footer>
  );
}
