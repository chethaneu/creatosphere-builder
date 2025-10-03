import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Message sent! We'll get back to you soon.");
    
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="card-gradient animate-fade-in border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold mb-2 text-gradient">
              📞 Contact Me
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Have a question? Drop me a message and I'll get back to you!
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div>
                <Label htmlFor="contact-name" className="text-foreground">Name</Label>
                <Input
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 bg-input border-border text-foreground"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contact-email" className="text-foreground">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 bg-input border-border text-foreground"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contact-message" className="text-foreground">Message</Label>
                <Textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 bg-input border-border text-foreground min-h-32"
                  placeholder="Your message..."
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-bold glow-primary"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
            
            <div className="border-t border-border pt-6 space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:6361510130" className="hover:text-primary transition-colors">
                  6361510130
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:chethanchethueu11@gmail.com" className="hover:text-secondary transition-colors">
                  chethanchethueu11@gmail.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
