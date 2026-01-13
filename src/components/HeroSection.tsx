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
          className="w-full h-full object-cover sepia-[0.3] saturate-[0.8] brightness-[0.9]"
        >
          <source
            src="/videos/hero-video-stilte.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Warm beige/sand color overlay */}
        <div className="absolute inset-0 bg-[#c4a77d]/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[#d4c4a8]/20 mix-blend-color" />
        
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2318]/70 via-[#3d3224]/40 to-[#1a1510]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a2318]/50 via-transparent to-[#2a2318]/30" />
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
        
        {/* Film grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
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
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.2] tracking-tight text-white opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            God grant me the <span className="italic font-normal">serenity</span> to accept the things I cannot change,
            <br />
            the <span className="italic font-normal">courage</span> to change the things I can,
            <br />
            and the <span className="italic font-normal">wisdom</span> to know the difference.
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl font-light opacity-0 animate-fade-in"
            style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
          >
            Begin je persoonlijke reis naar innerlijke rust met praktische tools 
            en een warme community die je ondersteunt.
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 pt-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-7 text-base font-medium transition-all duration-500 hover:scale-105"
            >
              <Link to="/register">
                Start Je Reis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-10 py-7 text-base font-medium border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-500"
            >
              Ontdek Meer
            </Button>
          </div>
        </div>

        {/* Video control button */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-10 right-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
          aria-label={isPlaying ? "Pauzeer video" : "Speel video"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-white/40">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
