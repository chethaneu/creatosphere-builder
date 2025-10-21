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
