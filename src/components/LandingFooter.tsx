import { Mail, Instagram, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  const links = {
    workshops: ["Mini-Workshops", "Gratis Challenges", "Premium Cursussen", "Audio Content"],
    resources: ["Artikelen", "Community", "Nieuwsbrief", "FAQ"],
    legal: [
      { label: "Privacy", href: "/richtlijnen" },
      { label: "Voorwaarden", href: "/richtlijnen" },
      { label: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">B</span>
              </div>
              <span className="text-xl font-semibold text-foreground">
                Bewust<span className="text-primary">Bestaan</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Jouw gids naar innerlijke balans en bewustwording. 
              Gebaseerd op authentieke ervaring.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Workshops */}
          <div>
            <h4 className="font-semibold mb-4">Workshops</h4>
            <ul className="space-y-3">
              {links.workshops.map((link) => (
                <li key={link}>
                  <a href="#cursussen" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Meer</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Nieuwsbrief</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Ontvang wekelijks inspiratie in je inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Je e-mail"
                className="flex-1 px-4 py-2.5 text-sm bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                Aanmelden
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            © 2024 Bewust Bestaan. Gemaakt met <Heart className="h-3 w-3 text-primary" /> voor persoonlijke groei.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            {links.legal.map((link) => (
              <Link key={link.label} to={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
