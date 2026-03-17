import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-lg font-semibold">
                Bewust Bestaan
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Een veilige plek voor rust, verbinding en persoonlijke groei. 
              Samen ontdekken we de kracht van bewust leven.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/community" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/oefeningen" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                  Oefeningen
                </Link>
              </li>
              <li>
                <Link to="/cursus" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                  Cursus
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold">Informatie</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/richtlijnen" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                  Communityrichtlijnen
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                  Contact
                </Link>
              </li>
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
