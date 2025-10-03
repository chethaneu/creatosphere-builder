import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText } from "lucide-react";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    budget: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.projectType) {
      toast.error("Please fill in all required fields");
      return;
    }
    
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
