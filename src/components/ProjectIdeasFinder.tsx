import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lightbulb, Sparkles, Loader2, Clock, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectIdea {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  technologies: string[];
  estimatedTime: string;
}

const ProjectIdeasFinder = () => {
  const { toast } = useToast();
  const [skillLevel, setSkillLevel] = useState("");
  const [interest, setInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectIdea[]>([]);

  const handleFindProjects = async () => {
    if (!skillLevel || !interest) {
      toast({
        title: "Missing Information",
        description: "Please select both skill level and area of interest.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProjects([]);

    try {
      const { data, error } = await supabase.functions.invoke("suggest-projects", {
        body: { skillLevel, interest },
      });

      if (error) {
        throw error;
      }

      if (data?.projects) {
        setProjects(data.projects);
        toast({
          title: "Projects Found!",
          description: `We found ${data.projects.length} exciting projects for you.`,
        });
      }
    } catch (error) {
      console.error("Error fetching project ideas:", error);
      toast({
        title: "Error",
        description: "Failed to generate project ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-accent/20 text-accent-foreground";
      case "Medium":
        return "bg-secondary/20 text-secondary-foreground";
      case "Hard":
        return "bg-destructive/20 text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Find Your Perfect Project
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let AI suggest personalized project ideas based on your skills and interests
          </p>
        </div>

        <Card className="max-w-4xl mx-auto card-gradient glow-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lightbulb className="w-6 h-6 text-primary" />
              Project Idea Generator
            </CardTitle>
            <CardDescription>
              Tell us about yourself and we'll suggest trending projects perfect for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select value={skillLevel} onValueChange={setSkillLevel}>
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select your skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Area of Interest</Label>
                <Select value={interest} onValueChange={setInterest}>
                  <SelectTrigger id="interest">
                    <SelectValue placeholder="Choose your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="Game Development">Game Development</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleFindProjects}
              disabled={isLoading || !skillLevel || !interest}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Find Project Ideas
                </>
              )}
            </Button>

            {projects.length > 0 && (
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Suggested Projects
                </h3>
                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <Card key={index} className="bg-card/50 hover:bg-card transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge className={getDifficultyColor(project.difficulty)}>
                            {project.difficulty}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{project.estimatedTime}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Code className="w-4 h-4 text-muted-foreground" />
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Button className="w-full mt-2" variant="secondary">
                            Build Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProjectIdeasFinder;
