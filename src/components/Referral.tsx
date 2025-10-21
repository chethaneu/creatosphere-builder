import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

const referralSchema = z.object({
  referrer_name: z.string().trim().min(1, "Your name is required").max(100),
  referrer_email: z.string().trim().email("Invalid email address").max(255),
  referred_name: z.string().trim().min(1, "Friend's name is required").max(100),
  referred_email: z.string().trim().email("Invalid email address").max(255),
  referred_phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

type ReferralFormValues = z.infer<typeof referralSchema>;

const Referral = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      referrer_name: "",
      referrer_email: "",
      referred_name: "",
      referred_email: "",
      referred_phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ReferralFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("referrals").insert([{
        referrer_name: data.referrer_name,
        referrer_email: data.referrer_email,
        referred_name: data.referred_name,
        referred_email: data.referred_email,
        referred_phone: data.referred_phone || null,
        message: data.message || null,
      }]);

      if (error) throw error;

      toast.success("Referral submitted successfully! Thank you for spreading the word.");
      form.reset();
    } catch (error) {
      console.error("Error submitting referral:", error);
      toast.error("Failed to submit referral. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="referral" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">Refer a Friend</h2>
            <p className="text-muted-foreground text-lg">
              Know someone who could benefit from our services? Refer them and help us grow our community!
            </p>
          </div>

          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <UserPlus className="w-5 h-5 text-primary" />
                Referral Form
              </CardTitle>
              <CardDescription>
                Fill in the details below to refer someone to our services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Your Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="referrer_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="referrer_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Friend's Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="referred_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Friend's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="referred_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Friend's Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="referred_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Friend's Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you think your friend would benefit from our services..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Referral"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Referral;
