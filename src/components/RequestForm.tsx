import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string().trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string().trim()
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  projectType: z.string().min(1, "Project type is required"),
  description: z.string().trim()
    .max(2000, "Description must be less than 2000 characters")
    .optional()
    .or(z.literal("")),
  budget: z.string().trim()
    .max(100, "Budget must be less than 100 characters")
    .optional()
    .or(z.literal(""))
});

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    budget: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = requestSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    
    try {
      const { data: validatedData } = validation;
      const { error } = await supabase
        .from("project_requests")
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          project_type: validatedData.projectType,
          description: validatedData.description || null,
          budget: validatedData.budget || null
        });

      if (error) throw error;

      toast.success("Request submitted! We'll contact you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        description: "",
        budget: ""
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <section id="request-form" className="py-20 bg-card">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="card-gradient animate-fade-in border-border">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <CardTitle className="text-4xl font-bold mb-2 text-gradient">
              📌 Request Your Project
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Tell us what kind of project you need, and we'll help you build it in your budget.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 bg-input border-border text-foreground"
                  maxLength={100}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-input border-border text-foreground"
                    maxLength={255}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 bg-input border-border text-foreground"
                    maxLength={20}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="projectType" className="text-foreground">Project Type *</Label>
                <Select 
                  value={formData.projectType} 
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                >
                  <SelectTrigger className="mt-2 bg-input border-border text-foreground">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="fullstack">Full Stack Development</SelectItem>
                    <SelectItem value="deeplearning">Deep Learning</SelectItem>
                    <SelectItem value="machinelearning">Machine Learning</SelectItem>
                    <SelectItem value="mobile">Mobile App Development</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-foreground">Project Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 bg-input border-border text-foreground min-h-32"
                  placeholder="Describe your project requirements..."
                  maxLength={2000}
                />
              </div>
              
              <div>
                <Label htmlFor="budget" className="text-foreground">Budget Range</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="mt-2 bg-input border-border text-foreground"
                  placeholder="e.g., ₹5,000 - ₹10,000"
                  maxLength={100}
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-bold glow-primary"
              >
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RequestForm;
