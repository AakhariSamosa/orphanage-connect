import { ArrowRight, Code, Palette, Smartphone, Lightbulb, Check, Star, Mail, ExternalLink, Github, Linkedin, Twitter, Zap, Cpu, Layers, MousePointer2 } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import type { TemplateData } from './types';

const iconMap: Record<string, React.ElementType> = {
  code: Code, palette: Palette, smartphone: Smartphone, lightbulb: Lightbulb,
};
const socialIconMap: Record<string, React.ElementType> = {
  GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter,
};

export function ModernProductTemplate({ data }: { data: TemplateData }) {
  const statsAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[hsl(220,25%,98%)] text-[hsl(220,25%,12%)] overflow-hidden font-sans">
      {/* ===== HERO ===== */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(245,60%,97%)] via-[hsl(220,30%,98%)] to-[hsl(220,25%,98%)]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(hsl(245,60%,40%) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* Gradient blob */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[hsl(245,60%,85%)]/40 to-[hsl(280,55%,85%)]/30 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(245,60%,96%)] border border-[hsl(245,60%,90%)] text-[hsl(245,60%,45%)] text-xs font-semibold mb-8 animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                <div className="w-2 h-2 rounded-full bg-[hsl(145,60%,45%)] animate-pulse-soft" />
                Available for Projects
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.05] tracking-tight animate-fade-up" style={{ opacity: 0, animationDelay: '400ms' }}>
                Building{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(245,60%,50%)] via-[hsl(265,55%,50%)] to-[hsl(285,50%,50%)] animate-gradient bg-[length:200%_200%]">
                  Digital Products
                </span>
                {' '}That Matter
              </h1>
              <p className="text-base text-[hsl(220,15%,45%)] mb-10 leading-relaxed max-w-lg animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
                {data.profileDescription}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '800ms' }}>
                <a href={`mailto:${data.contactEmail}`} className="group px-7 py-3.5 bg-[hsl(245,60%,50%)] text-[hsl(0,0%,100%)] font-semibold text-sm rounded-xl hover:bg-[hsl(245,60%,45%)] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_hsl(245,60%,50%,0.45)] hover:shadow-[0_12px_40px_-8px_hsl(245,60%,50%,0.55)] flex items-center gap-2">
                  Start a Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#projects" className="px-7 py-3.5 border-2 border-[hsl(220,20%,88%)] text-[hsl(220,25%,30%)] rounded-xl hover:border-[hsl(245,60%,50%)] hover:text-[hsl(245,60%,50%)] transition-all duration-300 text-sm font-semibold flex items-center gap-2 group">
                  See Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
              {data.profileImage ? (
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-r from-[hsl(245,60%,50%)]/15 to-[hsl(285,50%,50%)]/15 rounded-3xl blur-2xl" />
                  <img src={data.profileImage} alt={data.profileName} className="relative rounded-2xl w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]" />
                </div>
              ) : (
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(245,60%,96%)] to-[hsl(285,50%,96%)] flex items-center justify-center border border-[hsl(245,60%,90%)] shadow-[0_20px_60px_-20px_hsl(245,60%,50%,0.15)]">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[hsl(245,60%,50%)] to-[hsl(285,50%,50%)] flex items-center justify-center mb-4 shadow-[0_10px_30px_-8px_hsl(245,60%,50%,0.4)]">
                      <Layers className="w-10 h-10 text-[hsl(0,0%,100%)]" />
                    </div>
                    <p className="text-[hsl(245,60%,45%)] font-display font-bold text-xl">{data.profileName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 bg-[hsl(0,0%,100%)] border-y border-[hsl(220,20%,93%)]" ref={statsAnim.ref}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 50, suffix: '+', label: 'Projects' },
            { value: 30, suffix: '+', label: 'Clients' },
            { value: 8, suffix: '+', label: 'Years' },
            { value: 99, suffix: '%', label: 'Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className={`text-center scroll-hidden ${statsAnim.isVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-3xl font-display font-bold text-[hsl(245,60%,45%)]">
                <StatNum value={stat.value} suffix={stat.suffix} visible={statsAnim.isVisible} />
              </div>
              <div className="text-xs text-[hsl(220,15%,55%)] mt-1 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-28 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <span className="text-[hsl(245,60%,50%)] text-xs font-semibold tracking-[0.2em] uppercase">Services</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">What I Bring to the Table</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 100} direction="scale">
                  <div className="group p-7 rounded-2xl border border-[hsl(220,20%,93%)] bg-[hsl(0,0%,100%)] hover:shadow-[0_15px_40px_-10px_hsl(245,60%,50%,0.1)] transition-all duration-500 hover:-translate-y-1.5 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(245,60%,98%)] to-[hsl(285,50%,98%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-[hsl(245,60%,96%)] flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[hsl(245,60%,50%)] group-hover:to-[hsl(285,50%,50%)] transition-all duration-500 group-hover:shadow-[0_8px_20px_-5px_hsl(245,60%,50%,0.3)]">
                        <Icon className="w-6 h-6 text-[hsl(245,60%,50%)] group-hover:text-[hsl(0,0%,100%)] transition-colors duration-500" />
                      </div>
                      <h3 className="font-semibold text-base mb-2">{service.title}</h3>
                      <p className="text-sm text-[hsl(220,15%,50%)] leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className="py-20 px-6 bg-gradient-to-r from-[hsl(245,60%,50%)] via-[hsl(265,55%,48%)] to-[hsl(285,50%,48%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(0,0%,100%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(0,0%,100%) 0%, transparent 50%)'
        }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[hsl(0,0%,100%)]">Tech Stack</h2>
            <p className="text-[hsl(0,0%,100%)]/60 text-sm mt-2">Technologies I work with every day</p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.map((skill, i) => (
              <AnimatedSection key={skill} delay={i * 60} direction="scale">
                <span className="px-5 py-2.5 bg-[hsl(0,0%,100%)]/10 backdrop-blur-md text-[hsl(0,0%,100%)] rounded-full text-sm font-medium border border-[hsl(0,0%,100%)]/15 hover:bg-[hsl(0,0%,100%)]/20 hover:border-[hsl(0,0%,100%)]/30 transition-all duration-300 cursor-default">
                  {skill}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="py-28 px-6 bg-[hsl(220,25%,98%)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <span className="text-[hsl(245,60%,50%)] text-xs font-semibold tracking-[0.2em] uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">Recent Projects</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="group bg-[hsl(0,0%,100%)] rounded-2xl overflow-hidden shadow-[0_2px_15px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_-15px_hsl(245,60%,50%,0.12)] transition-all duration-700 hover:-translate-y-1.5 border border-[hsl(220,20%,94%)]">
                  <div className="h-56 relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[hsl(245,60%,96%)] via-[hsl(265,55%,96%)] to-[hsl(285,50%,96%)] flex items-center justify-center">
                        <Cpu className="w-12 h-12 text-[hsl(245,60%,70%)] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,100%)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                      <span className="px-4 py-2 rounded-full bg-[hsl(245,60%,50%)] text-[hsl(0,0%,100%)] text-xs font-semibold shadow-lg flex items-center gap-1.5">
                        <MousePointer2 className="w-3 h-3" /> View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-[hsl(220,15%,50%)] mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-3 py-1 rounded-full bg-[hsl(245,60%,96%)] text-[hsl(245,60%,42%)] font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-28 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <span className="text-[hsl(245,60%,50%)] text-xs font-semibold tracking-[0.2em] uppercase">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">What Clients Say</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 120} direction="scale">
                <div className="group p-6 rounded-2xl border border-[hsl(220,20%,93%)] hover:border-[hsl(245,60%,80%)] hover:shadow-[0_10px_30px_-10px_hsl(245,60%,50%,0.08)] transition-all duration-500 h-full bg-[hsl(0,0%,100%)]">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[hsl(45,90%,55%)] text-[hsl(45,90%,55%)]" />)}
                  </div>
                  <p className="text-[hsl(220,15%,40%)] italic mb-6 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(245,60%,50%)] to-[hsl(285,50%,50%)] flex items-center justify-center text-xs font-bold text-[hsl(0,0%,100%)]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-[hsl(220,15%,55%)]">{t.role}</p>
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
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(245,60%,50%)] via-[hsl(265,55%,48%)] to-[hsl(285,50%,48%)]" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 30% 70%, hsl(0,0%,100%) 0%, transparent 60%)'
            }} />
            <div className="absolute top-4 right-4 w-32 h-32 border border-[hsl(0,0%,100%)]/10 rounded-full" />
            <div className="absolute bottom-4 left-4 w-20 h-20 border border-[hsl(0,0%,100%)]/5 rounded-full" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[hsl(0,0%,100%)] mb-4">Ready to Build Something Great?</h2>
              <p className="text-[hsl(0,0%,100%)]/70 mb-10 text-sm max-w-md mx-auto">Let's discuss your next project and make it happen.</p>
              <a href={`mailto:${data.contactEmail}`} className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(0,0%,100%)] text-[hsl(245,60%,45%)] font-semibold rounded-xl hover:bg-[hsl(0,0%,97%)] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.2)] text-sm">
                <Mail className="w-4 h-4" /> Get Started
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[hsl(220,20%,93%)] bg-[hsl(0,0%,100%)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(220,15%,55%)]">© 2024 {data.profileName}. All rights reserved.</p>
          <div className="flex gap-3">
            {data.socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform] || ExternalLink;
              return (
                <a key={link.platform} href={link.url} className="w-9 h-9 rounded-full border border-[hsl(220,20%,90%)] flex items-center justify-center hover:border-[hsl(245,60%,50%)] hover:text-[hsl(245,60%,50%)] text-[hsl(220,15%,55%)] transition-all duration-300 hover:-translate-y-0.5">
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

function StatNum({ value, suffix, visible }: { value: number; suffix: string; visible: boolean }) {
  const count = useCountUp(value, 2000, visible);
  return <>{count}{suffix}</>;
}
