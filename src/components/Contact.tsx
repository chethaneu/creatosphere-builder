import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z.string().trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters")
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    
    try {
      const { data: validatedData } = validation;
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message
        });

      if (error) throw error;

      toast.success("Message sent! We'll get back to you soon.");
      
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-semibold">
              Get In Touch
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Contact Me
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Have a question? Drop me a message and I'll get back to you!
          </p>
        </div>
        
        <Card className="card-glass animate-fade-in border-border/50 hover:card-elevated transition-all duration-500">
          <CardHeader className="text-center pb-4">
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
                  maxLength={100}
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
                  maxLength={255}
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
                  maxLength={1000}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-right text-primary-foreground font-bold text-lg glow-primary-lg hover:glow-accent-lg transition-all duration-500 hover:scale-105 group"
              >
                <Send className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                Send Message
              </Button>
            </form>
            
            <div className="border-t border-border pt-6 space-y-3 text-center">
              <a href="tel:6361510130" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <span className="sr-only">Call 6361510130</span>
              </a>
              
              <a href="mailto:chethanchethueu11@gmail.com" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-secondary transition-colors">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="sr-only">Email chethanchethueu11@gmail.com</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
