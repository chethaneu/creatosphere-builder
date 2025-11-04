import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("request-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(13, 13, 13, 0.9)), url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-mesh opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      
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