import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

interface ProjectBuildRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  projectDescription: string;
  skillLevel?: string;
  interest?: string;
  department?: string;
}

const ProjectBuildRequestDialog = ({
  open,
  onOpenChange,
  projectTitle,
  projectDescription,
  skillLevel,
  interest,
  department,
}: ProjectBuildRequestDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    additionalRequirements: "",
    budgetRange: "",
    timeline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("project_build_requests").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        project_title: projectTitle,
        project_description: projectDescription,
        skill_level: skillLevel || null,
        interest: interest || null,
        department: department || null,
        additional_requirements: formData.additionalRequirements || null,
        budget_range: formData.budgetRange || null,
        timeline: formData.timeline || null,
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We'll get back to you soon with a quote for your project.",
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        additionalRequirements: "",
        budgetRange: "",
        timeline: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get This Project Built For You</DialogTitle>
          <DialogDescription className="text-base">
            Fill in the details below and we'll get back to you with a quote and timeline for building{" "}
            <span className="font-semibold text-foreground">"{projectTitle}"</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range (Optional)</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1000">Under $1,000</SelectItem>
                  <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25000-plus">$25,000+</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Desired Timeline (Optional)</Label>
              <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                <SelectTrigger id="timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                  <SelectItem value="normal">Normal (1 month)</SelectItem>
                  <SelectItem value="flexible">Flexible (2-3 months)</SelectItem>
                  <SelectItem value="long-term">Long-term (3+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Additional Requirements or Details (Optional)</Label>
            <Textarea
              id="requirements"
              value={formData.additionalRequirements}
              onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
              placeholder="Tell us more about your specific needs, features you want, or any other important details..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Project Details:</h4>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Title:</span> {projectTitle}
            </p>
            {department && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Industry:</span> {department}
              </p>
            )}
            {interest && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Technology:</span> {interest}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectBuildRequestDialog;
