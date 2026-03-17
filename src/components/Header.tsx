import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-bewustbestaan.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Cursussen", href: "#cursussen" },
    { label: "Artikelen", href: "#artikelen" },
    { label: "Audio", href: "#audio" },
    { label: "Community", href: "#community" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="BewustBestaan logo" className="h-14 w-14" />
            <span className="text-xl font-semibold text-foreground">
              Bewust<span className="text-primary">Bestaan</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-lg"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              asChild
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6"
            >
              <Link to="/login">Inloggen</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-primary/30 text-primary hover:bg-primary/5 rounded-lg px-6"
            >
              <Link to="/register">Aanmelden</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.href.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="flex gap-2 mt-4">
                <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                  <Link to="/login">Inloggen</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-primary/30 text-primary rounded-lg">
                  <Link to="/register">Aanmelden</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
