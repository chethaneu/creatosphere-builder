import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RequestForm from "@/components/RequestForm";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <Hero />
        <Services />
        <RequestForm />
        <Projects />
        <About />
        <Contact />
      </main>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 TechSphere Creations. Built with passion for students.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Empowering students with technology solutions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
