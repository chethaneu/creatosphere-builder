import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(13, 13, 13, 0.9)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="container mx-auto px-4 py-20 text-center relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-6 text-accent animate-glow-pulse">
          <Rocket className="w-8 h-8" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
          TechSphere Creations
        </h1>
        
        <p className="text-2xl md:text-3xl mb-4 text-foreground font-medium">
          Student-Friendly Project Solutions
        </p>
        
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
          I build Final Year & Mini Projects in Full Stack Development, Deep Learning, 
          Machine Learning, and Mobile Apps — all within your budget.
        </p>
        
        <Button 
          onClick={scrollToForm}
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-bold text-lg px-8 py-6 glow-primary transition-all hover:scale-105"
        >
          Get Your Project
        </Button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
