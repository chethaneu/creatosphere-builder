import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = href === "#hero" ? document.body : document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => scrollToSection("#hero")}
            className="flex items-center gap-3 hover:scale-105 transition-all duration-300"
          >
            <img src={logo} alt="Tech Sphere" className="h-12 w-auto" />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium relative group uppercase tracking-wider text-sm"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("#request-form")}
              className="bg-metallic text-primary-foreground font-bold transition-all duration-500 glow-primary hover:glow-primary-lg hover:scale-105 uppercase tracking-wider"
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left py-3 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider text-sm"
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("#request-form")}
              className="w-full mt-4 bg-metallic text-primary-foreground font-bold uppercase tracking-wider"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
