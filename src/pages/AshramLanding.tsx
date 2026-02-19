import { Link } from "react-router-dom";
import { Heart, MapPin, ArrowRight, Loader2, Building2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAshrams } from "@/hooks/useAshrams";

export default function AshramLanding() {
  const { data: ashrams, isLoading } = useAshrams();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container-custom text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Multi-Ashram Platform
          </span>
          <h1 className="heading-display mb-6 max-w-4xl mx-auto">
            Support <span className="gradient-text">Ashrams</span> Across India
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Browse ashrams, see their needs, donate directly, and make a real difference in the lives of children and communities.
          </p>
        </div>
      </section>

      {/* Ashram Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">Our Ashrams</h2>
            <p className="text-body max-w-2xl mx-auto">
              Each ashram has unique needs and stories. Choose one to explore and support.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !ashrams?.length ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="heading-card mb-2">No ashrams yet</h3>
              <p className="text-muted-foreground">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ashrams.map((ashram) => (
                <Link
                  key={ashram.id}
                  to={`/ashram/${ashram.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                    {ashram.cover_image_url ? (
                      <img
                        src={ashram.cover_image_url}
                        alt={ashram.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    {/* Logo overlay */}
                    {ashram.logo_url && (
                      <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-full bg-card shadow-md overflow-hidden border-2 border-card">
                        <img src={ashram.logo_url} alt="" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 pt-8">
                    <h3 className="heading-card mb-2 group-hover:text-primary transition-colors">
                      {ashram.name}
                    </h3>
                    {(ashram.city || ashram.state) && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        {[ashram.city, ashram.state].filter(Boolean).join(', ')}
                      </div>
                    )}
                    {ashram.description && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {ashram.description}
                      </p>
                    )}
                    <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                      Visit & Support <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="heading-section text-primary-foreground mb-6">
            Every Contribution Makes a Difference
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Choose an ashram above to see their specific needs and make a direct impact.
          </p>
        </div>
      </section>
    </Layout>
  );
}
