import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Mail, Calendar, User, Phone } from "lucide-react";

interface ProjectRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  description: string | null;
  budget: string | null;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch project requests
      const { data: requests, error: requestsError } = await supabase
        .from("project_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (requestsError) throw requestsError;
      setProjectRequests(requests || []);

      // Fetch contact messages
      const { data: messages, error: messagesError } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (messagesError) throw messagesError;
      setContactMessages(messages || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">View all form submissions</p>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="projects">
              <FileText className="w-4 h-4 mr-2" />
              Project Requests ({projectRequests.length})
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact Messages ({contactMessages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : projectRequests.length === 0 ? (
              <Card className="card-gradient border-border">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No project requests yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {projectRequests.map((request) => (
                  <Card key={request.id} className="card-gradient border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-foreground flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            {request.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(request.created_at)}
                          </CardDescription>
                        </div>
                        <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {request.project_type}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4 text-secondary" />
                        <a href={`mailto:${request.email}`} className="hover:text-secondary">
                          {request.email}
                        </a>
                      </div>
                      {request.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4 text-accent" />
                          <a href={`tel:${request.phone}`} className="hover:text-accent">
                            {request.phone}
                          </a>
                        </div>
                      )}
                      {request.description && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-foreground mb-1">Description:</p>
                          <p className="text-muted-foreground">{request.description}</p>
                        </div>
                      )}
                      {request.budget && (
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-foreground mb-1">Budget:</p>
                          <p className="text-muted-foreground">{request.budget}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : contactMessages.length === 0 ? (
              <Card className="card-gradient border-border">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No contact messages yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {contactMessages.map((message) => (
                  <Card key={message.id} className="card-gradient border-border">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        {message.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(message.created_at)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4 text-secondary" />
                        <a href={`mailto:${message.email}`} className="hover:text-secondary">
                          {message.email}
                        </a>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-foreground mb-1">Message:</p>
                        <p className="text-muted-foreground">{message.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
