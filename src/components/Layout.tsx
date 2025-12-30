import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

export function Layout({ 
  children, 
  showNav = true, 
  showFooter = true,
  isLoggedIn = false,
  isAdmin = false 
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {showNav && <Navigation isLoggedIn={isLoggedIn} isAdmin={isAdmin} />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
