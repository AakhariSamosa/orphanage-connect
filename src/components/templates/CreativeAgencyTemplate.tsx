import { ArrowRight, Code, Palette, Smartphone, Lightbulb, Star, Mail, ExternalLink, Github, Linkedin, Twitter, Sparkles, MoveRight } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import type { TemplateData } from './types';

const iconMap: Record<string, React.ElementType> = {
  code: Code, palette: Palette, smartphone: Smartphone, lightbulb: Lightbulb,
};
const socialIconMap: Record<string, React.ElementType> = {
  GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter,
};

export function CreativeAgencyTemplate({ data }: { data: TemplateData }) {
  const statsAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[hsl(222,47%,8%)] text-[hsl(0,0%,96%)] overflow-hidden">
      {/* Hero - Bold & Creative */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[hsl(280,70%,25%)]/30 via-transparent to-[hsl(330,70%,45%)]/20" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[hsl(330,70%,50%)]/10 blur-[120px] animate-float" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[hsl(260,70%,50%)]/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(330,70%,50%)]/30 bg-[hsl(330,70%,50%)]/5 backdrop-blur-sm text-[hsl(330,70%,65%)] text-sm mb-8 animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                <Sparkles className="w-4 h-4" /> Creative Developer
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8 animate-fade-up" style={{ opacity: 0, animationDelay: '400ms' }}>
                I Create
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] via-[hsl(280,70%,55%)] to-[hsl(200,70%,55%)] animate-gradient bg-[length:200%_200%]">
                  Digital Art
                </span>
              </h1>
              <p className="text-lg text-[hsl(0,0%,60%)] mb-10 max-w-md leading-relaxed animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
                {data.profileDescription}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '800ms' }}>
                <a href={`mailto:${data.contactEmail}`} className="px-8 py-4 bg-gradient-to-r from-[hsl(330,70%,50%)] to-[hsl(280,70%,50%)] text-[hsl(0,0%,100%)] font-semibold rounded-2xl hover:shadow-[0_10px_40px_-10px_hsl(330,70%,50%,0.5)] transition-all duration-300 hover:-translate-y-1">
                  Let's Talk
                </a>
                <a href="#work" className="px-8 py-4 border border-[hsl(0,0%,25%)] rounded-2xl hover:border-[hsl(330,70%,50%)] transition-all duration-300 flex items-center gap-2 group">
                  View Work <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
              {data.profileImage ? (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(330,70%,50%)] via-[hsl(280,70%,50%)] to-[hsl(200,70%,50%)] rounded-3xl blur-xl opacity-30 animate-gradient bg-[length:200%_200%]" />
                  <img src={data.profileImage} alt={data.profileName} className="relative rounded-3xl w-full" />
                </div>
              ) : (
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(330,70%,15%)] to-[hsl(260,70%,10%)] border border-[hsl(0,0%,15%)] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(330,70%,50%)]/5 to-[hsl(280,70%,50%)]/5" />
                  <div className="text-center relative z-10">
                    <div className="text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-[hsl(330,70%,55%)] to-[hsl(280,70%,40%)]">
                      {data.profileName.charAt(0)}
                    </div>
                    <p className="text-[hsl(0,0%,50%)] mt-2">{data.profileName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Collaborations Marquee */}
      {data.brandCollaborations && data.brandCollaborations.length > 0 && (
        <section className="py-10 border-y border-[hsl(0,0%,12%)] overflow-hidden">
          <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {[...data.brandCollaborations, ...data.brandCollaborations].map((brand, i) => (
              <span key={i} className="mx-8 text-lg font-display text-[hsl(0,0%,30%)] hover:text-[hsl(330,70%,55%)] transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="text-[hsl(330,70%,55%)] text-sm tracking-[0.3em] uppercase mb-3">Expertise</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] to-[hsl(280,70%,55%)]">Do Best</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 120} direction={i % 2 === 0 ? 'left' : 'right'}>
                  <div className="p-8 rounded-3xl border border-[hsl(0,0%,12%)] bg-[hsl(222,40%,10%)] hover:border-[hsl(330,70%,30%)] transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(330,70%,50%)]/0 to-[hsl(280,70%,50%)]/0 group-hover:from-[hsl(330,70%,50%)]/5 group-hover:to-[hsl(280,70%,50%)]/5 transition-all duration-500" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[hsl(330,70%,50%)]/10 to-[hsl(280,70%,50%)]/10 flex items-center justify-center mb-5 group-hover:from-[hsl(330,70%,50%)]/20 group-hover:to-[hsl(280,70%,50%)]/20 transition-all">
                        <Icon className="w-7 h-7 text-[hsl(330,70%,60%)]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-[hsl(0,0%,50%)] leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Skills & Technologies</h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.map((skill, i) => (
              <AnimatedSection key={skill} delay={i * 50} direction="scale">
                <span className="px-5 py-2.5 rounded-full border border-[hsl(0,0%,15%)] text-sm hover:border-[hsl(330,70%,50%)] hover:text-[hsl(330,70%,60%)] hover:bg-[hsl(330,70%,50%)]/5 transition-all duration-300 cursor-default">
                  {skill}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="text-[hsl(330,70%,55%)] text-sm tracking-[0.3em] uppercase mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] to-[hsl(200,70%,55%)]">Projects</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 150} direction="scale">
                <div className="group cursor-pointer rounded-3xl overflow-hidden border border-[hsl(0,0%,12%)] bg-[hsl(222,40%,10%)] hover:border-[hsl(330,70%,30%)] transition-all duration-500">
                  <div className="h-60 relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[hsl(330,70%,15%)] to-[hsl(260,70%,10%)] flex items-center justify-center">
                        <Code className="w-12 h-12 text-[hsl(330,70%,25%)] group-hover:text-[hsl(330,70%,45%)] transition-colors" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,40%,10%)] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 -mt-8 relative z-10">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[hsl(330,70%,60%)] transition-colors">{project.title}</h3>
                    <p className="text-sm text-[hsl(0,0%,50%)] mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[hsl(330,70%,50%)]/10 text-[hsl(330,70%,60%)] border border-[hsl(330,70%,50%)]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[hsl(330,70%,55%)] text-sm tracking-[0.3em] uppercase mb-3">Reviews</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Happy Clients</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 120} direction="scale">
                <div className="p-6 rounded-3xl border border-[hsl(0,0%,12%)] bg-[hsl(222,40%,10%)] hover:border-[hsl(330,70%,25%)] transition-all duration-300 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[hsl(330,70%,50%)]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[hsl(330,70%,55%)] text-[hsl(330,70%,55%)]" />)}
                  </div>
                  <p className="text-[hsl(0,0%,65%)] italic mb-6 text-sm leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[hsl(0,0%,40%)]">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(330,70%,25%)]/20 via-[hsl(280,70%,25%)]/10 to-[hsl(200,70%,25%)]/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(330,70%,45%)]/5 blur-[120px]" />
        <AnimatedSection className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-6">
            Let's Create
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] to-[hsl(200,70%,55%)]">Something Amazing</span>
          </h2>
          <p className="text-[hsl(0,0%,55%)] text-lg mb-10 max-w-xl mx-auto">Ready to bring your vision to life? Let's start the conversation.</p>
          <a href={`mailto:${data.contactEmail}`} className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[hsl(330,70%,50%)] to-[hsl(280,70%,50%)] text-[hsl(0,0%,100%)] font-semibold rounded-2xl hover:shadow-[0_20px_60px_-15px_hsl(330,70%,50%,0.4)] transition-all duration-300 hover:-translate-y-1 text-lg">
            <Mail className="w-5 h-5" /> Get In Touch
          </a>
          <div className="flex justify-center gap-4 mt-10">
            {data.socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform] || ExternalLink;
              return (
                <a key={link.platform} href={link.url} className="w-12 h-12 rounded-full border border-[hsl(0,0%,15%)] flex items-center justify-center hover:border-[hsl(330,70%,50%)] hover:text-[hsl(330,70%,55%)] transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
