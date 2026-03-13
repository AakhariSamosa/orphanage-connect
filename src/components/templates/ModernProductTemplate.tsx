import { ArrowRight, Code, Palette, Smartphone, Lightbulb, Check, Star, Mail, ExternalLink, Github, Linkedin, Twitter, Zap, Shield, Cpu } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import type { TemplateData } from './types';

const iconMap: Record<string, React.ElementType> = {
  code: Code, palette: Palette, smartphone: Smartphone, lightbulb: Lightbulb,
};
const socialIconMap: Record<string, React.ElementType> = {
  GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter,
};

export function ModernProductTemplate({ data }: { data: TemplateData }) {
  return (
    <div className="min-h-screen bg-[hsl(220,30%,98%)] text-[hsl(220,30%,15%)] overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(245,58%,96%)] via-[hsl(220,30%,98%)] to-[hsl(200,40%,96%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(245,60%,50%) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(245,58%,95%)] text-[hsl(245,58%,50%)] text-sm font-medium mb-6 animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                <Zap className="w-4 h-4" /> Available for Projects
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight animate-fade-up" style={{ opacity: 0, animationDelay: '400ms' }}>
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(245,58%,50%)] to-[hsl(280,60%,55%)]">Digital Products</span> That Matter
              </h1>
              <p className="text-lg text-[hsl(220,15%,50%)] mb-8 leading-relaxed animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
                {data.profileDescription}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '800ms' }}>
                <a href={`mailto:${data.contactEmail}`} className="px-8 py-4 bg-[hsl(245,58%,50%)] text-[hsl(0,0%,100%)] font-semibold rounded-xl hover:bg-[hsl(245,58%,45%)] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_hsl(245,58%,50%,0.4)]">
                  Start a Project
                </a>
                <a href="#projects" className="px-8 py-4 border-2 border-[hsl(220,20%,88%)] text-[hsl(220,30%,25%)] rounded-xl hover:border-[hsl(245,58%,50%)] hover:text-[hsl(245,58%,50%)] transition-all duration-300 flex items-center gap-2 group">
                  See Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
              {data.profileImage ? (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(245,58%,50%)]/20 to-[hsl(280,60%,55%)]/20 rounded-3xl blur-2xl" />
                  <img src={data.profileImage} alt={data.profileName} className="relative rounded-2xl w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]" />
                </div>
              ) : (
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(245,58%,95%)] to-[hsl(280,60%,95%)] flex items-center justify-center border border-[hsl(245,58%,90%)]">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-[hsl(245,58%,50%)] to-[hsl(280,60%,55%)] flex items-center justify-center mb-4">
                      <Code className="w-10 h-10 text-[hsl(0,0%,100%)]" />
                    </div>
                    <p className="text-[hsl(245,58%,50%)] font-display font-bold text-2xl">{data.profileName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features / Services */}
      <section className="py-24 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(245,58%,50%)] text-sm font-semibold tracking-wider uppercase">Services</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">What I Bring to the Table</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 100} direction="scale">
                  <div className="p-6 rounded-2xl border border-[hsl(220,20%,92%)] bg-[hsl(0,0%,100%)] hover:shadow-[0_8px_30px_-8px_hsl(245,58%,50%,0.12)] transition-all duration-300 hover:-translate-y-1 group h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[hsl(245,58%,95%)] to-[hsl(280,60%,95%)] flex items-center justify-center mb-4 group-hover:from-[hsl(245,58%,50%)] group-hover:to-[hsl(280,60%,55%)] transition-all duration-300">
                      <Icon className="w-6 h-6 text-[hsl(245,58%,50%)] group-hover:text-[hsl(0,0%,100%)] transition-colors" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-[hsl(220,15%,50%)] leading-relaxed">{service.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6 bg-gradient-to-r from-[hsl(245,58%,50%)] to-[hsl(280,60%,50%)]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[hsl(0,0%,100%)]">Tech Stack</h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.map((skill, i) => (
              <AnimatedSection key={skill} delay={i * 60} direction="scale">
                <span className="px-5 py-2.5 bg-[hsl(0,0%,100%)]/15 backdrop-blur-sm text-[hsl(0,0%,100%)] rounded-full text-sm font-medium border border-[hsl(0,0%,100%)]/20 hover:bg-[hsl(0,0%,100%)]/25 transition-colors">
                  {skill}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 bg-[hsl(220,30%,98%)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(245,58%,50%)] text-sm font-semibold tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">Recent Projects</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="bg-[hsl(0,0%,100%)] rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 group hover:-translate-y-1">
                  <div className="h-52 bg-gradient-to-br from-[hsl(245,58%,96%)] to-[hsl(280,60%,96%)] relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Cpu className="w-12 h-12 text-[hsl(245,58%,75%)] group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-[hsl(220,15%,50%)] text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[hsl(245,58%,96%)] text-[hsl(245,58%,45%)] font-medium">{tag}</span>
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
      <section className="py-24 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(245,58%,50%)] text-sm font-semibold tracking-wider uppercase">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">What Clients Say</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 120} direction="scale">
                <div className="p-6 rounded-2xl border border-[hsl(220,20%,92%)] hover:border-[hsl(245,58%,80%)] transition-all duration-300 h-full">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[hsl(45,90%,55%)] text-[hsl(45,90%,55%)]" />)}
                  </div>
                  <p className="text-[hsl(220,15%,40%)] italic mb-5 text-sm leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[hsl(220,15%,55%)]">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[hsl(220,30%,98%)]">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-[hsl(245,58%,50%)] to-[hsl(280,60%,50%)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[hsl(0,0%,100%)]/5 -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[hsl(0,0%,100%)] mb-4">Ready to Build Something Great?</h2>
            <p className="text-[hsl(0,0%,100%)]/80 mb-8">Let's discuss your next project and make it happen.</p>
            <a href={`mailto:${data.contactEmail}`} className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(0,0%,100%)] text-[hsl(245,58%,45%)] font-semibold rounded-xl hover:bg-[hsl(0,0%,95%)] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.2)]">
              <Mail className="w-5 h-5" /> Get Started
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[hsl(220,20%,92%)] bg-[hsl(0,0%,100%)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[hsl(220,15%,55%)]">© 2024 {data.profileName}. All rights reserved.</p>
          <div className="flex gap-3">
            {data.socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform] || ExternalLink;
              return (
                <a key={link.platform} href={link.url} className="w-10 h-10 rounded-full border border-[hsl(220,20%,90%)] flex items-center justify-center hover:border-[hsl(245,58%,50%)] hover:text-[hsl(245,58%,50%)] text-[hsl(220,15%,55%)] transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
