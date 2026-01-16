import { Link } from "react-router-dom";
import { Heart, Users, Gift, Briefcase, ArrowRight, Star, HandHeart, GraduationCap, Utensils, Shirt } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-children.jpg";

const Index = () => {
  const impactStats = [
    { number: "150+", label: "Children Cared For" },
    { number: "72", label: "Years of Service" },
    { number: "5000+", label: "Lives Touched" },
    { number: "₹2Cr+", label: "Donated" },
  ];

  const needs = [
    { icon: Utensils, title: "Food & Nutrition", description: "Healthy meals for growing children", urgent: true },
    { icon: Shirt, title: "Clothes & Essentials", description: "Uniforms, winter wear, daily clothes", urgent: false },
    { icon: GraduationCap, title: "Education Materials", description: "Books, stationery, digital learning", urgent: true },
    { icon: Heart, title: "Healthcare", description: "Medical checkups and medicines", urgent: false },
  ];

  const waysToHelp = [
    {
      icon: Gift,
      title: "Direct Donation",
      description: "Contribute funds or essentials directly to children in need.",
      link: "/donate",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: HandHeart,
      title: "Fulfill a Need",
      description: "Browse specific needs and directly sponsor what children require.",
      link: "/needs",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Briefcase,
      title: "Earn & Support",
      description: "Shop from local vendors. A percentage supports the orphanage.",
      link: "/earn",
      color: "bg-gold/10 text-gold",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Children at Shri Shradhanand Anathalay"
            className="w-full h-full object-cover"
          />
          <div className="image-overlay" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
              Since 1952 • Nagpur, India
            </span>
            <h1 className="heading-display text-primary-foreground mb-6">
              Every Child Deserves a{" "}
              <span className="text-primary">Loving Home</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Join us in nurturing orphaned children with love, education, and hope for a brighter future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/donate">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/needs">
                  See Children's Needs
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-earth text-primary-foreground py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Needs Preview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-medium mb-2 block">Current Priorities</span>
            <h2 className="heading-section mb-4">Children's Immediate Needs</h2>
            <p className="text-body">
              Help us provide essential items our children need right now. Every contribution makes a real difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {needs.map((need, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card card-hover relative overflow-hidden"
              >
                {need.urgent && (
                  <span className="absolute top-4 right-4 px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
                    Urgent
                  </span>
                )}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <need.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="heading-card mb-2">{need.title}</h3>
                <p className="text-muted-foreground text-sm">{need.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/needs">
                View All Needs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-medium mb-2 block">Get Involved</span>
            <h2 className="heading-section mb-4">Ways You Can Help</h2>
            <p className="text-body">
              Whether through donations, fulfilling needs, or supporting local vendors—every action creates impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {waysToHelp.map((way, index) => (
              <Link
                key={index}
                to={way.link}
                className="bg-card rounded-2xl p-8 shadow-card card-hover group"
              >
                <div className={`w-16 h-16 rounded-2xl ${way.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <way.icon className="w-8 h-8" />
                </div>
                <h3 className="heading-card mb-3">{way.title}</h3>
                <p className="text-muted-foreground mb-4">{way.description}</p>
                <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-medium mb-2 block">Testimonials</span>
            <h2 className="heading-section mb-4">What People Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Regular Donor",
                quote: "Seeing the smiles on these children's faces fills my heart. The transparency here is remarkable.",
              },
              {
                name: "Priya Sharma",
                role: "Volunteer",
                quote: "The Earn & Support initiative is brilliant. I can help while supporting local businesses.",
              },
              {
                name: "Dr. Anil Deshmukh",
                role: "Trustee",
                quote: "For 72 years, this institution has been a beacon of hope for countless children in need.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-soft">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-gold" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="heading-section text-primary-foreground mb-6">
            Together, We Can Change Lives
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our community of donors, volunteers, and supporters making a real difference in children's lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/donate">
                <Heart className="w-5 h-5" />
                Start Giving Today
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
