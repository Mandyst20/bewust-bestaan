import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WorkshopsSection } from "@/components/WorkshopsSection";
import { AudioSection } from "@/components/AudioSection";
import { BlogSection } from "@/components/BlogSection";
import { CommunitySection } from "@/components/CommunitySection";
import { LandingFooter } from "@/components/LandingFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WorkshopsSection />
        <BlogSection />
        <AudioSection />
        <CommunitySection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Index;
