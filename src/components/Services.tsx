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
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional technology solutions tailored for student projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="card-gradient hover:scale-105 transition-all duration-300 animate-slide-up border-border"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-lg bg-card flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl mb-2 text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
