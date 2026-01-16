import { Link } from "react-router-dom";
import { Heart, Users, Target, Award, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import buildingImage from "@/assets/orphanage-building.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Every child is treated with love, care, and dignity as part of our family.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive network of donors, volunteers, and well-wishers.",
    },
    {
      icon: Target,
      title: "Transparency",
      description: "Complete accountability in how donations are received and utilized.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Providing quality education, healthcare, and holistic development.",
    },
  ];

  const milestones = [
    { year: "1952", event: "Founded by Swami Shradhanand's followers" },
    { year: "1965", event: "First school building constructed" },
    { year: "1980", event: "Healthcare center established" },
    { year: "1995", event: "Vocational training programs launched" },
    { year: "2010", event: "Digital learning center opened" },
    { year: "2024", event: "Launch of Earn & Support initiative" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-primary font-medium mb-2 block">About Us</span>
              <h1 className="heading-display mb-6">
                A Legacy of{" "}
                <span className="gradient-text">Love & Care</span>
              </h1>
              <p className="text-body mb-6">
                For over seven decades, Shri Shradhanand Anathalay has been a sanctuary of hope for orphaned and abandoned children in Nagpur. We provide not just shelter, but a loving home where children grow, learn, and dream.
              </p>
              <p className="text-body mb-8">
                Named after the great social reformer Swami Shradhanand, our institution embodies his vision of education, compassion, and service to humanity.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/donate">
                  <Heart className="w-5 h-5" />
                  Support Our Mission
                </Link>
              </Button>
            </div>
            <div className="relative animate-scale-in">
              <img
                src={buildingImage}
                alt="Shri Shradhanand Anathalay Building"
                className="rounded-2xl shadow-elevated w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-card">
                <div className="text-4xl font-display font-bold">72+</div>
                <div className="text-sm opacity-90">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-medium mb-2 block">Our Values</span>
            <h2 className="heading-section mb-4">What We Stand For</h2>
            <p className="text-body">
              Our values guide everything we do, from daily care to long-term planning for each child's future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-card rounded-2xl shadow-soft card-hover"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium mb-2 block">Our Care</span>
              <h2 className="heading-section mb-6">What We Provide</h2>
              <p className="text-body mb-8">
                We believe in holistic development of each child, ensuring they have everything needed to thrive and succeed in life.
              </p>
              <ul className="space-y-4">
                {[
                  "Nutritious meals three times a day",
                  "Quality education from primary to higher secondary",
                  "Regular health checkups and medical care",
                  "Vocational training and skill development",
                  "Sports, arts, and cultural activities",
                  "Mental health support and counseling",
                  "Career guidance and placement assistance",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="heading-card mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "150+", label: "Children Currently" },
                  { number: "2000+", label: "Alumni" },
                  { number: "98%", label: "Education Rate" },
                  { number: "85%", label: "Higher Studies" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="text-3xl font-display font-bold text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-medium mb-2 block">Our Journey</span>
            <h2 className="heading-section mb-4">Milestones</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm">
                    {milestone.year.slice(2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-primary font-semibold">{milestone.year}</span>
                  <p className="text-foreground mt-1">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-earth text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="heading-section mb-6">Be Part of Our Story</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our mission to provide love, care, and opportunities to every child who needs a home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/donate">
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">
                Become a Volunteer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
