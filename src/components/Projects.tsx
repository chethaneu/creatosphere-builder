import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import airTrafficImg from "@/assets/project-airtraffic.jpg";
import arAppImg from "@/assets/project-ar.jpg";
import groceryImg from "@/assets/project-grocery.jpg";

const projects = [
  {
    title: "Air Traffic Control Technologies",
    description: "Final year project exploring modern air traffic management systems.",
    image: airTrafficImg
  },
  {
    title: "AR Skeletal System App",
    description: "Augmented reality app scanning the body and displaying skeletal system.",
    image: arAppImg
  },
  {
    title: "Grocery E-commerce Website",
    description: "Supermarket website with geolocation, delivery zones, and admin dashboard.",
    image: groceryImg
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background relative">
      {/* Decorative background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-semibold">
              Portfolio
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Explore some of the innovative projects we've built for students
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="card-glass overflow-hidden hover:card-elevated hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-slide-up border-border/50 group cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden h-56">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                />
                {/* Multiple gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  View Project
                </div>
              </div>
              
              <CardHeader className="relative">
                <CardTitle className="text-xl text-foreground group-hover:text-gradient transition-all duration-300 mb-1">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
                
                {/* Animated bottom accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-secondary to-accent group-hover:w-full transition-all duration-700"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
