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
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-semibold">
                Bewust<span className="text-primary">Bestaan</span>
              </span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed mb-6">
              Jouw gids naar innerlijke balans en bewustwording.
              Gebaseerd op authentieke ervaring.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center text-background/60 hover:text-primary hover:bg-background/20 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center text-background/60 hover:text-primary hover:bg-background/20 transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Workshops */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">Platform</h4>
            <ul className="space-y-3">
              {links.workshops.map((link) => (
                <li key={link}>
                  <a href="#cursussen" className="text-sm text-background/50 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">Meer</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-background/50 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">Nieuwsbrief</h4>
            <p className="text-sm text-background/50 mb-4">
              Ontvang wekelijks inspiratie in je inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Je e-mail"
                className="flex-1 px-4 py-2.5 text-sm bg-background/10 text-background rounded-lg border border-background/20 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-background/30"
              />
              <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Aanmelden
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40 flex items-center gap-1">
            © {new Date().getFullYear()} Bewust Bestaan. Gemaakt met <Heart className="h-3 w-3 text-primary" /> voor persoonlijke groei.
          </p>
          <div className="flex items-center gap-6 text-xs text-background/40">
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
