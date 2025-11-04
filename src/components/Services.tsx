import { Code2, Brain, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Custom-built web applications with responsive frontend and scalable backend.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "Deep Learning & Machine Learning",
    description: "AI-driven solutions including image recognition, prediction models, and intelligent systems.",
    color: "text-secondary"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Student-friendly apps with clean UI and smooth performance for Android & iOS.",
    color: "text-accent"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
              What We Offer
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Professional technology solutions tailored for student projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="card-glass hover:card-elevated hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-slide-up border-border/50 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500"></div>
              
              <CardHeader className="relative">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-card to-muted flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-500 relative`}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <service.icon className="w-10 h-10 relative z-10" />
                </div>
                <CardTitle className="text-2xl mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
                
                {/* Decorative bottom border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
