import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Users, BookOpen, Heart, GraduationCap, User, MessageCircle,
  Menu, X, LogOut, Settings
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Community", href: "/community", icon: <Users className="h-4 w-4" /> },
  { label: "Blogs", href: "/blogs", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Oefeningen", href: "/oefeningen", icon: <Heart className="h-4 w-4" /> },
  { label: "Cursus", href: "/cursus", icon: <GraduationCap className="h-4 w-4" /> },
];

interface NavigationProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

export function Navigation({ isLoggedIn = false, isAdmin = false }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            Bewust Bestaan
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {isLoggedIn && navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                location.pathname.startsWith(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">2</span>
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/5 hover:text-primary">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="hover:bg-primary/5 hover:text-primary">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-primary/5 hover:text-primary">Inloggen</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Account aanmaken</Button>
              </Link>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="animate-fade-in border-t border-border/50 bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {isLoggedIn && navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  location.pathname.startsWith(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border/50" />
            {isLoggedIn ? (
              <>
                <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary">
                  <MessageCircle className="h-4 w-4" /> Berichten
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary">
                  <User className="h-4 w-4" /> Mijn Profiel
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary">
                    <Settings className="h-4 w-4" /> Admin
                  </Link>
                )}
                <button onClick={handleSignOut} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-destructive/5 hover:text-destructive">
                  <LogOut className="h-4 w-4" /> Uitloggen
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary">
                  Inloggen
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
                  Account aanmaken
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
