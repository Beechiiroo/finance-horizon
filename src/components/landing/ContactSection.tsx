import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Request a Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interested in Finance-Horizon? Let's discuss how we can help transform your financial operations.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-muted-foreground">
                  Have questions about Finance-Horizon? Reach out and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">contact@finance-horizon.app</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">Tunisia, North Africa</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="pt-8 border-t border-border">
                <p className="font-semibold mb-4">What you'll get:</p>
                <div className="space-y-3">
                  {[
                    'Personalized demo walkthrough',
                    'Technical consultation',
                    'Custom integration options',
                    'Pricing discussion',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input 
                      id="company" 
                      placeholder="Your Company" 
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input 
                      id="role" 
                      placeholder="e.g., Financial Analyst" 
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your needs..." 
                    required 
                    className="min-h-32 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
