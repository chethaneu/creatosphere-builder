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
      
      <div className="container mx-auto px-4 py-8 text-center relative z-10">
        {/* Logo */}
        <div className="mb-6 animate-fade-in">
          <img 
            src={logo} 
            alt="Tech Sphere - Inspiring Youth" 
            className="h-32 md:h-44 w-auto mx-auto animate-float"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.15))' }}
          />
        </div>
        
        <p className="text-xl md:text-2xl mb-4 text-foreground font-bold tracking-tight uppercase">
          Student-Friendly Project Solutions
        </p>
        
        <p className="text-base md:text-lg mb-8 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
          We build <span className="text-primary font-semibold">Final Year</span> & <span className="text-accent font-semibold">Mini Projects</span> in Full Stack Development, Deep Learning, Machine Learning, and Mobile Apps — all within your budget.
        </p>
        
        <Button 
          onClick={scrollToForm} 
          size="lg" 
          className="bg-metallic text-primary-foreground font-bold text-lg px-10 py-6 glow-primary-lg transition-all duration-500 hover:scale-110 hover:glow-accent-lg group relative overflow-hidden uppercase tracking-wider"
        >
          <span className="relative z-10 flex items-center gap-3">
            Get Your Project
            <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </Button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </section>
  );
};

export default Hero;
