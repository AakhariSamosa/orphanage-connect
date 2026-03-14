import { ArrowUpRight, Code, Palette, Smartphone, Lightbulb, Mail, ExternalLink, Github, Linkedin, Twitter, MousePointer2 } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import type { TemplateData } from './types';

const iconMap: Record<string, React.ElementType> = {
  code: Code, palette: Palette, smartphone: Smartphone, lightbulb: Lightbulb,
};
const socialIconMap: Record<string, React.ElementType> = {
  GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter,
};

export function MinimalPortfolioTemplate({ data }: { data: TemplateData }) {
  const statsAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[hsl(40,15%,97%)] text-[hsl(30,10%,12%)] overflow-hidden font-sans">
      {/* ===== HERO ===== */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {data.profileImage && (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                <img src={data.profileImage} alt={data.profileName} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(30,10%,92%)] text-[hsl(30,8%,45%)] text-xs font-medium mb-4 animate-fade-up" style={{ opacity: 0, animationDelay: '250ms' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(145,50%,45%)]" />
                {data.profileTitle}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.05] tracking-tight animate-fade-up" style={{ opacity: 0, animationDelay: '400ms' }}>
                Hello, I'm{' '}
                <span className="text-[hsl(30,10%,35%)]">{data.profileName}</span>
              </h1>
              <p className="text-base text-[hsl(30,8%,42%)] leading-relaxed max-w-xl animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
                {data.profileDescription}
              </p>
              <div className="flex gap-3 mt-8 animate-fade-up" style={{ opacity: 0, animationDelay: '800ms' }}>
                {data.socialLinks.map((link) => {
                  const Icon = socialIconMap[link.platform] || ExternalLink;
                  return (
                    <a key={link.platform} href={link.url} className="w-10 h-10 rounded-full bg-[hsl(30,10%,92%)] flex items-center justify-center hover:bg-[hsl(30,10%,12%)] hover:text-[hsl(0,0%,100%)] transition-all duration-300 hover:-translate-y-0.5">
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[hsl(30,10%,85%)] to-transparent" />
      </div>

      {/* ===== SERVICES ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-[10px] text-[hsl(30,8%,50%)] tracking-[0.3em] uppercase mb-8 font-medium">Services</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="group flex gap-4 p-5 rounded-2xl hover:bg-[hsl(0,0%,100%)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)] transition-all duration-500">
                    <div className="w-11 h-11 rounded-xl bg-[hsl(30,10%,92%)] flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(30,10%,12%)] transition-all duration-400">
                      <Icon className="w-5 h-5 text-[hsl(30,10%,35%)] group-hover:text-[hsl(0,0%,100%)] transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm">{service.title}</h3>
                      <p className="text-xs text-[hsl(30,8%,48%)] leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section className="py-24 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="text-[10px] text-[hsl(30,8%,50%)] tracking-[0.3em] uppercase mb-3 font-medium">Selected Work</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Portfolio</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 100} direction="scale">
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[hsl(30,10%,94%)] mb-4 relative shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] group-hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[hsl(30,10%,93%)] to-[hsl(30,10%,88%)]">
                        <Code className="w-10 h-10 text-[hsl(30,10%,70%)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[hsl(30,10%,8%)]/0 group-hover:bg-[hsl(30,10%,8%)]/40 transition-all duration-500 flex items-center justify-center">
                      <div className="px-5 py-2 rounded-full bg-[hsl(0,0%,100%)]/90 backdrop-blur-sm text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 flex items-center gap-2 shadow-lg">
                        <MousePointer2 className="w-3.5 h-3.5" /> View Project
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-base mb-1 group-hover:text-[hsl(30,10%,35%)] transition-colors">{project.title}</h3>
                  <p className="text-xs text-[hsl(30,8%,52%)]">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-[hsl(30,8%,45%)] bg-[hsl(30,10%,93%)] px-2.5 py-1 rounded-md font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-10">
            <p className="text-[10px] text-[hsl(30,8%,50%)] tracking-[0.3em] uppercase mb-3 font-medium">Expertise</p>
            <h2 className="text-3xl font-display font-bold">Skills & Tools</h2>
          </AnimatedSection>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <AnimatedSection key={skill} delay={i * 50} direction="scale">
                <span className="px-4 py-2 border border-[hsl(30,10%,86%)] rounded-full text-sm hover:bg-[hsl(30,10%,12%)] hover:text-[hsl(0,0%,100%)] hover:border-transparent transition-all duration-300 cursor-default font-medium">
                  {skill}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="text-[10px] text-[hsl(30,8%,50%)] tracking-[0.3em] uppercase mb-3 font-medium">Kind Words</p>
            <h2 className="text-3xl font-display font-bold">Testimonials</h2>
          </AnimatedSection>
          <div className="space-y-5">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 150}>
                <div className="group flex gap-6 p-6 rounded-2xl hover:bg-[hsl(30,10%,97%)] transition-all duration-400 border border-transparent hover:border-[hsl(30,10%,92%)]">
                  <div className="text-5xl font-display text-[hsl(30,10%,88%)] leading-none group-hover:text-[hsl(30,10%,70%)] transition-colors">"</div>
                  <div>
                    <p className="text-[hsl(30,8%,32%)] leading-relaxed mb-5 text-sm">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[hsl(30,10%,90%)] flex items-center justify-center text-xs font-bold group-hover:bg-[hsl(30,10%,12%)] group-hover:text-[hsl(0,0%,100%)] transition-all duration-300">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-[hsl(30,8%,52%)]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-6">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-10 md:p-12 rounded-3xl bg-[hsl(30,10%,12%)] text-[hsl(0,0%,95%)] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle, hsl(0,0%,100%) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Let's connect</h2>
              <p className="text-[hsl(0,0%,60%)] text-sm">Open for new projects and collaborations</p>
            </div>
            <a href={`mailto:${data.contactEmail}`} className="relative z-10 px-8 py-4 bg-[hsl(0,0%,100%)] text-[hsl(30,10%,12%)] font-semibold text-sm rounded-xl hover:bg-[hsl(0,0%,92%)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]">
              <Mail className="w-4 h-4" /> Say Hello
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-xs text-[hsl(30,8%,58%)]">
          © 2024 {data.profileName}
        </div>
      </footer>
    </div>
  );
}
