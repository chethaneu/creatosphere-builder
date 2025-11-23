import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import GalaxyMorphBackground from "./GalaxyMorphBackground";
const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("request-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
    background: '#05031A'
  }}>
      {/* Galaxy Morph Background */}
      <GalaxyMorphBackground />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"></div>
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          <span className="text-sm font-medium text-foreground">Transforming Ideas into Reality</span>
          <Zap className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="mb-6 inline-flex items-center gap-2 text-accent glow-accent-lg animate-float">
          <Rocket className="w-12 h-12" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gradient-shine leading-tight">
          TechSphere Creations
        </h1>
        
        <p className="text-3xl md:text-4xl mb-6 text-foreground font-bold tracking-tight">
          Student-Friendly Project Solutions
        </p>
        
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-muted-foreground leading-relaxed font-light">
          We build <span className="text-primary font-semibold">Final Year</span> &amp; <span className="text-secondary font-semibold">Mini Projects</span> in Full Stack Development, Deep Learning, Machine Learning, and Mobile Apps — all within your budget.
        </p>
        
        <Button 
          onClick={scrollToForm} 
          size="lg" 
          className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-right text-primary-foreground font-bold text-xl px-12 py-8 glow-primary-lg transition-all duration-500 hover:scale-110 hover:glow-accent-lg group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Get Your Project
            <Rocket className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </Button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </section>;
};
export default Hero;