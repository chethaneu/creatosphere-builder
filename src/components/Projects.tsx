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
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore some of the innovative projects we've built for students
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="card-gradient overflow-hidden hover:scale-105 transition-all duration-300 animate-slide-up border-border group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
