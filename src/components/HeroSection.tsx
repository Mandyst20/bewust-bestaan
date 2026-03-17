import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
        >
          <source src="/videos/hero-video-hart.mp4" type="video/mp4" />
        </video>

        {/* Purple/indigo color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(239,79%,30%)]/60 via-[hsl(260,60%,25%)]/40 to-[hsl(222,47%,11%)]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,11%)]/90 via-transparent to-[hsl(239,79%,30%)]/30" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl space-y-8">

          {/* Subtle tag */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-white/60 font-light">
              Jouw reis naar bewustwording
            </span>
          </div>

          {/* Main headline */}
          <div
            className="relative opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight text-white">
              <span className="block">Your journey to</span>
              <span className="block text-gradient-warm bg-gradient-to-r from-[hsl(239,79%,75%)] via-[hsl(260,60%,70%)] to-[hsl(45,93%,60%)] bg-clip-text text-transparent">
                conscious living
              </span>
            </h1>

            {/* Decorative line */}
            <div className="mt-6 w-24 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-transparent" />
          </div>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-white/75 leading-relaxed max-w-xl font-light opacity-0 animate-fade-in"
            style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
          >
            Ontdek mindfulness, meditatie en welzijn door onze cursussen,
            e-books en een ondersteunende community. Start vandaag nog je transformatie.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-10 py-7 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link to="/register">
                Ontdek Cursussen
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl px-10 py-7 text-base font-medium border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <Link to="/community">
                Word Lid
              </Link>
            </Button>
          </div>
        </div>

        {/* Video control */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-10 right-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
          aria-label={isPlaying ? "Pauzeer video" : "Speel video"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
