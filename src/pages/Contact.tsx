import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContactMessage } from "@/hooks/useContactMessages";
import { useAshram } from "@/contexts/AshramContext";
import { toast } from "sonner";
import { z } from "zod";

const inquiryTypes = [
  { id: "general", label: "General Inquiry", icon: MessageSquare },
  { id: "donation", label: "Donation Query", icon: Building },
  { id: "volunteer", label: "Volunteer", icon: Users },
  { id: "vendor", label: "Become Vendor", icon: Building },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

const Contact = () => {
  const { ashram, ashramId } = useAshram();
  const [inquiryType, setInquiryType] = useState("general");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const createMessage = useCreateContactMessage();

  const contactInfo = [
    { icon: MapPin, title: "Address", details: ashram?.address ? [ashram.address] : ["Contact us for address"] },
    { icon: Phone, title: "Phone", details: ashram?.phone ? [ashram.phone] : ["Contact us"] },
    { icon: Mail, title: "Email", details: ashram?.email ? [ashram.email] : ["Contact us"] },
    { icon: Clock, title: "Visiting Hours", details: ["Mon - Sat: 10:00 AM - 5:00 PM", "Sunday: By appointment only"] },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) { toast.error(result.error.errors[0].message); return; }
    try {
      await createMessage.mutateAsync({
        ...formData,
        phone: formData.phone || undefined,
        inquiry_type: inquiryType,
        ashram_id: ashramId || undefined,
      });
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch { toast.error("Failed to send message."); }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium mb-2 block">Get in Touch</span>
            <h1 className="heading-display mb-6">We'd Love to <span className="gradient-text">Hear From You</span></h1>
            <p className="text-body">Whether you have questions about donations, want to volunteer, or just want to learn more—we're here to help.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="heading-section mb-8">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-card p-8 md:p-12">
                <h2 className="heading-section mb-8">Send Us a Message</h2>
                <div className="mb-8">
                  <Label className="mb-3 block">What's this about?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {inquiryTypes.map((type) => (
                      <button key={type.id} onClick={() => setInquiryType(type.id)} className={`p-4 rounded-xl border-2 transition-all text-center ${inquiryType === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                        <type.icon className={`w-6 h-6 mx-auto mb-2 ${inquiryType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`text-sm font-medium ${inquiryType === type.id ? "text-primary" : ""}`}>{type.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><Label htmlFor="name">Full Name *</Label><Input id="name" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1" required /></div>
                    <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1" required /></div>
                    <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-1" /></div>
                    <div><Label htmlFor="subject">Subject *</Label><Input id="subject" placeholder="What's this about?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="mt-1" required /></div>
                  </div>
                  <div><Label htmlFor="message">Message *</Label><Textarea id="message" placeholder="Tell us how we can help you..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="mt-1" rows={6} required /></div>
                  <Button variant="hero" size="lg" type="submit" className="w-full md:w-auto" disabled={createMessage.isPending}>
                    {createMessage.isPending ? (<><Loader2 className="w-5 h-5 animate-spin" />Sending...</>) : (<><Send className="w-5 h-5" />Send Message</>)}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
