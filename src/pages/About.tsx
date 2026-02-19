import { Link } from "react-router-dom";
import { Heart, Users, Target, Award, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAshram } from "@/contexts/AshramContext";
import buildingImage from "@/assets/orphanage-building.jpg";

const About = () => {
  const { ashram, basePath } = useAshram();

  const values = [
    { icon: Heart, title: "Compassion", description: "Every child is treated with love, care, and dignity." },
    { icon: Users, title: "Community", description: "Building a supportive network of donors and volunteers." },
    { icon: Target, title: "Transparency", description: "Complete accountability in how donations are utilized." },
    { icon: Award, title: "Excellence", description: "Providing quality education, healthcare, and development." },
  ];

  return (
    <Layout>
      <section className="relative py-20 md:py-32 bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-primary font-medium mb-2 block">About Us</span>
              <h1 className="heading-display mb-6">
                A Legacy of <span className="gradient-text">Love & Care</span>
              </h1>
              <p className="text-body mb-6">
                {ashram?.description || 'We provide not just shelter, but a loving home where children grow, learn, and dream.'}
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to={`${basePath}/donate`}><Heart className="w-5 h-5" />Support Our Mission</Link>
              </Button>
            </div>
            <div className="relative animate-scale-in">
              <img src={ashram?.cover_image_url || buildingImage} alt={ashram?.name || 'Building'} className="rounded-2xl shadow-elevated w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-medium mb-2 block">Our Values</span>
            <h2 className="heading-section mb-4">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-card rounded-2xl shadow-soft card-hover">
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

      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium mb-2 block">Our Care</span>
              <h2 className="heading-section mb-6">What We Provide</h2>
              <ul className="space-y-4">
                {["Nutritious meals three times a day", "Quality education", "Regular health checkups", "Vocational training", "Sports, arts, and cultural activities", "Mental health support", "Career guidance"].map((item, index) => (
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
                {[{ number: "150+", label: "Children Currently" }, { number: "2000+", label: "Alumni" }, { number: "98%", label: "Education Rate" }, { number: "85%", label: "Higher Studies" }].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="text-3xl font-display font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-earth text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="heading-section mb-6">Be Part of Our Story</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Join our mission to provide love, care, and opportunities.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to={`${basePath}/donate`}><Heart className="w-5 h-5" />Donate Now</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to={`${basePath}/contact`}>Become a Volunteer<ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
