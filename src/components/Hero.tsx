import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import logo from "@/assets/logo.png";
import GalaxyMorphBackground from "./GalaxyMorphBackground";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("request-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#05031A' }}
    >
      {/* Galaxy Morph Background */}
      <GalaxyMorphBackground />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"></div>
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src={logo} 
            alt="Tech Sphere - Inspiring Youth" 
            className="h-48 md:h-64 w-auto mx-auto drop-shadow-2xl animate-float"
            style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))' }}
          />
        </div>
        
        <p className="text-2xl md:text-3xl mb-6 text-foreground font-bold tracking-tight uppercase">
          Student-Friendly Project Solutions
        </p>
        
        <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-muted-foreground leading-relaxed">
          We build <span className="text-primary font-semibold">Final Year</span> & <span className="text-accent font-semibold">Mini Projects</span> in Full Stack Development, Deep Learning, Machine Learning, and Mobile Apps — all within your budget.
        </p>
        
        <Button 
          onClick={scrollToForm} 
          size="lg" 
          className="bg-metallic text-primary-foreground font-bold text-xl px-12 py-8 glow-primary-lg transition-all duration-500 hover:scale-110 hover:glow-accent-lg group relative overflow-hidden uppercase tracking-wider"
        >
          <span className="relative z-10 flex items-center gap-3">
            Get Your Project
            <Rocket className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </Button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </section>
  );
};

export default Hero;
