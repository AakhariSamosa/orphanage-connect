import { ArrowRight, Code, Palette, Smartphone, Lightbulb, Star, Mail, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import type { TemplateData } from './types';

const iconMap: Record<string, React.ElementType> = {
  code: Code, palette: Palette, smartphone: Smartphone, lightbulb: Lightbulb,
};

const socialIconMap: Record<string, React.ElementType> = {
  GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter,
};

export function PremiumDarkTemplate({ data }: { data: TemplateData }) {
  const statsAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[hsl(240,20%,4%)] text-[hsl(0,0%,95%)] overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[hsl(35,50%,40%)]/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[hsl(35,50%,40%)]/5 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        
        {data.coverImage && (
          <div className="absolute inset-0">
            <img src={data.coverImage} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,20%,4%)]/80 via-[hsl(240,20%,4%)]/60 to-[hsl(240,20%,4%)]" />
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {data.profileImage && (
            <div className="w-28 h-28 mx-auto mb-8 rounded-full overflow-hidden ring-2 ring-[hsl(35,50%,50%)]/30 animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
              <img src={data.profileImage} alt={data.profileName} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="text-[hsl(35,50%,60%)] tracking-[0.3em] uppercase text-sm font-medium mb-4 animate-fade-up" style={{ opacity: 0, animationDelay: '300ms' }}>
            {data.profileTitle}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[0.95] animate-fade-up" style={{ opacity: 0, animationDelay: '500ms' }}>
            {data.profileName}
          </h1>
          <p className="text-lg md:text-xl text-[hsl(0,0%,70%)] max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ opacity: 0, animationDelay: '700ms' }}>
            {data.profileDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '900ms' }}>
            <a href={`mailto:${data.contactEmail}`} className="px-8 py-4 bg-[hsl(35,50%,45%)] text-[hsl(240,20%,4%)] font-semibold rounded-lg hover:bg-[hsl(35,50%,55%)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_hsl(35,50%,45%,0.4)]">
              Get In Touch
            </a>
            <a href="#projects" className="px-8 py-4 border border-[hsl(0,0%,25%)] rounded-lg hover:border-[hsl(35,50%,45%)] hover:text-[hsl(35,50%,60%)] transition-all duration-300 group flex items-center gap-2">
              View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border border-[hsl(0,0%,30%)] flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-[hsl(35,50%,45%)]" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[hsl(0,0%,12%)]" ref={statsAnim.ref}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 50, suffix: '+', label: 'Projects' },
            { value: 30, suffix: '+', label: 'Clients' },
            { value: 8, suffix: '+', label: 'Years Exp.' },
            { value: 99, suffix: '%', label: 'Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className={`text-center scroll-hidden ${statsAnim.isVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-display font-bold text-[hsl(35,50%,55%)]">
                <StatNum value={stat.value} suffix={stat.suffix} visible={statsAnim.isVisible} />
              </div>
              <div className="text-sm text-[hsl(0,0%,50%)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[hsl(35,50%,55%)] text-sm tracking-[0.2em] uppercase mb-3">What I Do</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Services</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 120} direction="scale">
                  <div className="p-8 rounded-2xl border border-[hsl(0,0%,12%)] bg-[hsl(240,15%,7%)] hover:border-[hsl(35,50%,30%)] transition-all duration-500 group hover:-translate-y-1">
                    <Icon className="w-8 h-8 text-[hsl(35,50%,55%)] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-[hsl(0,0%,55%)] leading-relaxed">{service.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 bg-[hsl(240,15%,6%)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[hsl(35,50%,55%)] text-sm tracking-[0.2em] uppercase mb-3">Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Featured Projects</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 150} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="group rounded-2xl overflow-hidden border border-[hsl(0,0%,12%)] bg-[hsl(240,15%,7%)] hover:border-[hsl(35,50%,30%)] transition-all duration-500">
                  <div className="h-56 bg-gradient-to-br from-[hsl(35,50%,20%)] to-[hsl(240,20%,8%)] relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code className="w-12 h-12 text-[hsl(35,50%,30%)] group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,15%,7%)] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[hsl(35,50%,60%)] transition-colors">{project.title}</h3>
                    <p className="text-[hsl(0,0%,50%)] text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[hsl(35,50%,45%)]/10 text-[hsl(35,50%,60%)] border border-[hsl(35,50%,45%)]/20">
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
            <p className="text-[hsl(35,50%,55%)] text-sm tracking-[0.2em] uppercase mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Client Love</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 150} direction="scale">
                <div className="p-8 rounded-2xl border border-[hsl(0,0%,12%)] bg-[hsl(240,15%,7%)] hover:border-[hsl(35,50%,25%)] transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[hsl(35,50%,50%)] text-[hsl(35,50%,50%)]" />)}
                  </div>
                  <p className="text-[hsl(0,0%,70%)] italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-[hsl(0,0%,45%)]">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(35,50%,25%)]/10 to-[hsl(240,30%,15%)]/10" />
        <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-[hsl(35,50%,40%)]/5 blur-[80px] animate-float" />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Let's Work Together</h2>
          <p className="text-[hsl(0,0%,60%)] text-lg mb-10">Have a project in mind? Let's create something extraordinary.</p>
          <a href={`mailto:${data.contactEmail}`} className="inline-flex items-center gap-3 px-10 py-5 bg-[hsl(35,50%,45%)] text-[hsl(240,20%,4%)] font-semibold rounded-xl hover:bg-[hsl(35,50%,55%)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(35,50%,45%,0.4)] text-lg">
            <Mail className="w-5 h-5" /> {data.contactEmail}
          </a>
          <div className="flex justify-center gap-4 mt-10">
            {data.socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform] || ExternalLink;
              return (
                <a key={link.platform} href={link.url} className="w-12 h-12 rounded-full border border-[hsl(0,0%,20%)] flex items-center justify-center hover:border-[hsl(35,50%,45%)] hover:text-[hsl(35,50%,55%)] transition-all duration-300 hover:-translate-y-1">
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

function StatNum({ value, suffix, visible }: { value: number; suffix: string; visible: boolean }) {
  const count = useCountUp(value, 2000, visible);
  return <>{count}{suffix}</>;
}
