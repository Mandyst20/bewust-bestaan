import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}

export function Layout({ 
  children, 
  showNav = true, 
  showFooter = true,
}: LayoutProps) {
  const { user, isAdmin } = useAuth();
  const isLoggedIn = !!user;

  return (
    <div className="flex min-h-screen flex-col">
      {showNav && <Navigation isLoggedIn={isLoggedIn} isAdmin={isAdmin} />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
