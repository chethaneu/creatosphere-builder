import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Mail, Calendar, User, Phone, Trash2, LogOut } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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

interface Referral {
  id: string;
  referrer_name: string;
  referrer_email: string;
  referred_name: string;
  referred_email: string;
  referred_phone: string | null;
  message: string | null;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchData();
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

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

      // Fetch referrals
      const { data: referralData, error: referralsError } = await supabase
        .from("referrals")
        .select("*")
        .order("created_at", { ascending: false });

      if (referralsError) throw referralsError;
      setReferrals(referralData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast.success("Logged out successfully");
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

  const handleDeleteProjectRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from("project_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setProjectRequests(projectRequests.filter(req => req.id !== id));
      toast.success("Project request deleted successfully");
    } catch (error) {
      console.error("Error deleting project request:", error);
      toast.error("Failed to delete project request");
    }
  };

  const handleDeleteContactMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setContactMessages(contactMessages.filter(msg => msg.id !== id));
      toast.success("Contact message deleted successfully");
    } catch (error) {
      console.error("Error deleting contact message:", error);
      toast.error("Failed to delete contact message");
    }
  };

  const handleDeleteReferral = async (id: string) => {
    try {
      const { error } = await supabase
        .from("referrals")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setReferrals(referrals.filter(ref => ref.id !== id));
      toast.success("Referral deleted successfully");
    } catch (error) {
      console.error("Error deleting referral:", error);
      toast.error("Failed to delete referral");
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">View all form submissions</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
            <TabsTrigger value="projects">
              <FileText className="w-4 h-4 mr-2" />
              Project Requests ({projectRequests.length})
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact Messages ({contactMessages.length})
            </TabsTrigger>
            <TabsTrigger value="referrals">
              <User className="w-4 h-4 mr-2" />
              Referrals ({referrals.length})
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
                        <div className="flex-1">
                          <CardTitle className="text-xl text-foreground flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            {request.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(request.created_at)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                            {request.project_type}
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project Request</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this project request from {request.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteProjectRequest(request.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-foreground flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            {message.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(message.created_at)}
                          </CardDescription>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Contact Message</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this message from {message.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteContactMessage(message.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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

          <TabsContent value="referrals">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : referrals.length === 0 ? (
              <Card className="card-gradient border-border">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No referrals yet
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {referrals.map((referral) => (
                  <Card key={referral.id} className="card-gradient border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-foreground">
                            Referral from {referral.referrer_name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(referral.created_at)}
                          </CardDescription>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Referral</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this referral? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteReferral(referral.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-2">Referrer Information</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4 text-primary" />
                              {referral.referrer_name}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-4 h-4 text-secondary" />
                              <a href={`mailto:${referral.referrer_email}`} className="hover:text-secondary">
                                {referral.referrer_email}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-2">Referred Person</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4 text-primary" />
                              {referral.referred_name}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-4 h-4 text-secondary" />
                              <a href={`mailto:${referral.referred_email}`} className="hover:text-secondary">
                                {referral.referred_email}
                              </a>
                            </div>
                            {referral.referred_phone && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-4 h-4 text-accent" />
                                <a href={`tel:${referral.referred_phone}`} className="hover:text-accent">
                                  {referral.referred_phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {referral.message && (
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">Message:</p>
                          <p className="text-muted-foreground">{referral.message}</p>
                        </div>
                      )}
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
