import { Card } from "@/components/ui/card";
import profileImg from "@/assets/profile.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              About TechSphere Creations
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Hi, I'm <span className="text-primary font-semibold">Chethan</span>, a Computer Science student 
                passionate about building innovative projects that solve real-world problems.
              </p>
              
              <p>
                I specialize in <span className="text-secondary font-semibold">Full Stack Development</span>, 
                <span className="text-secondary font-semibold"> Deep Learning</span>, 
                <span className="text-secondary font-semibold"> Machine Learning</span>, and 
                <span className="text-secondary font-semibold"> Mobile App Development</span> — providing 
                budget-friendly solutions specifically designed for students.
              </p>
              
              <p>
                Whether you need a final year project, mini project, or want to bring your tech idea to life, 
                I'm here to help you build something amazing without breaking the bank.
              </p>
              
              <div className="pt-4">
                <p className="text-foreground font-semibold">Let's build your next project together! 🚀</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-slide-up">
            <Card className="card-gradient overflow-hidden border-border">
              <img 
                src={profileImg} 
                alt="Chethan - TechSphere Creations" 
                className="w-full h-auto rounded-lg"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
