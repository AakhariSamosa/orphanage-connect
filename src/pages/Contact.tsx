import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Users, Building, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContactMessage } from "@/hooks/useContactMessages";
import { toast } from "sonner";
import { z } from "zod";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Dharampeth, Near Main Road", "Nagpur, Maharashtra 440010"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 712 255 5555", "+91 98765 43210"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@shradhanand.org", "donate@shradhanand.org"],
  },
  {
    icon: Clock,
    title: "Visiting Hours",
    details: ["Mon - Sat: 10:00 AM - 5:00 PM", "Sunday: By appointment only"],
  },
];

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
  const [inquiryType, setInquiryType] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const createMessage = useCreateContactMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    
    try {
      await createMessage.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        inquiry_type: inquiryType,
        subject: formData.subject,
        message: formData.message,
      });
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium mb-2 block">Get in Touch</span>
            <h1 className="heading-display mb-6">
              We'd Love to <span className="gradient-text">Hear From You</span>
            </h1>
            <p className="text-body">
              Whether you have questions about donations, want to volunteer, or just want to learn more about our work—we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
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
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden h-64 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41773660857!2d79.00830279726562!3d21.14630785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06571f1823!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Orphanage Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-card p-8 md:p-12">
                <h2 className="heading-section mb-8">Send Us a Message</h2>

                {/* Inquiry Type */}
                <div className="mb-8">
                  <Label className="mb-3 block">What's this about?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setInquiryType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          inquiryType === type.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                          inquiryType === type.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <p className={`text-sm font-medium ${
                          inquiryType === type.id ? "text-primary" : ""
                        }`}>
                          {type.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1"
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    variant="hero" 
                    size="lg" 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={createMessage.isPending}
                  >
                    {createMessage.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4">
            {[
              {
                q: "How can I donate to the orphanage?",
                a: "You can donate online through our website, via bank transfer, or by visiting us in person. All donations are eligible for 80G tax exemption.",
              },
              {
                q: "Can I visit the orphanage?",
                a: "Yes, we welcome visitors during our regular visiting hours (Mon-Sat, 10 AM - 5 PM). For Sunday visits, please schedule an appointment.",
              },
              {
                q: "How can I volunteer?",
                a: "Fill out the contact form above selecting 'Volunteer' as the inquiry type, or email us at volunteer@shradhanand.org with your details and availability.",
              },
              {
                q: "Is my donation tax-deductible?",
                a: "Yes, all donations are eligible for tax deduction under Section 80G of the Income Tax Act. You'll receive an official receipt.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-soft">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
