import { ArrowRight, Code, Palette, Smartphone, Lightbulb, Star, Mail, ExternalLink, Github, Linkedin, Twitter, MousePointer2 } from 'lucide-react';
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
    <div className="min-h-screen bg-[hsl(240,15%,3%)] text-[hsl(0,0%,92%)] overflow-hidden font-sans">
      {/* ===== HERO - Cinematic Full-screen ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient light orbs */}
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(35,60%,35%)]/8 blur-[150px] animate-float pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[hsl(280,40%,30%)]/6 blur-[130px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[60%] left-[60%] w-[300px] h-[300px] rounded-full bg-[hsl(200,50%,25%)]/5 blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '5s' }} />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        {data.coverImage && (
          <div className="absolute inset-0">
            <img src={data.coverImage} alt="" className="w-full h-full object-cover opacity-15 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,15%,3%)]/70 via-[hsl(240,15%,3%)]/50 to-[hsl(240,15%,3%)]" />
          </div>
        )}

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(35,60%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(35,60%,50%) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {data.profileImage && (
            <div className="w-28 h-28 mx-auto mb-10 rounded-full overflow-hidden ring-2 ring-[hsl(35,55%,50%)]/20 shadow-[0_0_60px_-10px_hsl(35,55%,50%,0.3)] animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
              <img src={data.profileImage} alt={data.profileName} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[hsl(35,55%,50%)]/15 bg-[hsl(35,55%,50%)]/5 backdrop-blur-xl mb-8 animate-fade-up" style={{ opacity: 0, animationDelay: '300ms' }}>
            <div className="w-2 h-2 rounded-full bg-[hsl(35,55%,50%)] animate-pulse-soft" />
            <span className="text-[hsl(35,55%,65%)] text-xs tracking-[0.2em] uppercase font-medium">{data.profileTitle}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold mb-8 leading-[0.92] tracking-tight animate-fade-up" style={{ opacity: 0, animationDelay: '500ms' }}>
            <span className="block">{data.profileName.split(' ')[0]}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[hsl(35,60%,55%)] via-[hsl(25,50%,50%)] to-[hsl(35,60%,55%)] animate-gradient bg-[length:200%_200%]">
              {data.profileName.split(' ').slice(1).join(' ') || data.profileName}
            </span>
          </h1>

          <p className="text-base md:text-lg text-[hsl(0,0%,55%)] max-w-xl mx-auto mb-14 leading-relaxed animate-fade-up" style={{ opacity: 0, animationDelay: '700ms' }}>
            {data.profileDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '900ms' }}>
            <a href={`mailto:${data.contactEmail}`} className="group relative px-8 py-4 overflow-hidden rounded-xl font-semibold text-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(35,55%,45%)] to-[hsl(25,50%,40%)] transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[hsl(35,55%,50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-[hsl(240,15%,3%)] flex items-center gap-2">
                Get In Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a href="#projects" className="px-8 py-4 border border-[hsl(0,0%,18%)] rounded-xl text-sm font-medium hover:border-[hsl(35,55%,40%)] hover:text-[hsl(35,55%,60%)] transition-all duration-500 hover:shadow-[0_0_30px_-10px_hsl(35,55%,50%,0.2)] flex items-center gap-2 group">
              View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 text-[hsl(0,0%,30%)]">
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[hsl(35,55%,40%)] to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-16 border-y border-[hsl(0,0%,8%)] bg-[hsl(240,15%,4%)]" ref={statsAnim.ref}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 50, suffix: '+', label: 'Projects Delivered' },
            { value: 30, suffix: '+', label: 'Happy Clients' },
            { value: 8, suffix: '+', label: 'Years Experience' },
            { value: 99, suffix: '%', label: 'Satisfaction Rate' },
          ].map((stat, i) => (
            <div key={i} className={`text-center scroll-hidden ${statsAnim.isVisible ? 'scroll-visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-display font-bold text-[hsl(35,55%,55%)]">
                <StatNum value={stat.value} suffix={stat.suffix} visible={statsAnim.isVisible} />
              </div>
              <div className="text-xs text-[hsl(0,0%,40%)] mt-2 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-28 px-6 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(35,55%,30%)]/3 blur-[150px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-[hsl(35,55%,55%)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">What I Do</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Crafted <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(35,55%,55%)] to-[hsl(25,45%,45%)]">Services</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 120} direction="scale">
                  <div className="group p-8 rounded-2xl border border-[hsl(0,0%,10%)] bg-[hsl(240,12%,6%)] hover:border-[hsl(35,55%,25%)] transition-all duration-700 hover:-translate-y-1 relative overflow-hidden">
                    {/* Glassmorphism hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(35,55%,50%)]/0 to-[hsl(280,40%,30%)]/0 group-hover:from-[hsl(35,55%,50%)]/3 group-hover:to-[hsl(280,40%,30%)]/3 transition-all duration-700" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(35,55%,50%)]/10 to-[hsl(35,55%,50%)]/5 flex items-center justify-center mb-5 group-hover:shadow-[0_0_25px_-5px_hsl(35,55%,50%,0.3)] transition-shadow duration-500">
                        <Icon className="w-6 h-6 text-[hsl(35,55%,55%)]" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-[hsl(35,55%,65%)] transition-colors">{service.title}</h3>
                      <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="py-28 px-6 bg-[hsl(240,12%,5%)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="text-[hsl(35,55%,55%)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(35,55%,55%)] to-[hsl(25,45%,45%)]">Projects</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 150} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="group rounded-2xl overflow-hidden border border-[hsl(0,0%,10%)] bg-[hsl(240,12%,6%)] hover:border-[hsl(35,55%,20%)] transition-all duration-700 hover:-translate-y-1">
                  <div className="h-56 relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[hsl(35,55%,15%)] via-[hsl(240,12%,8%)] to-[hsl(280,30%,10%)] flex items-center justify-center">
                        <Code className="w-10 h-10 text-[hsl(35,55%,25%)] group-hover:text-[hsl(35,55%,40%)] group-hover:scale-110 transition-all duration-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,12%,6%)] via-[hsl(240,12%,6%)]/30 to-transparent" />
                    {/* Hover overlay with glassmorphism */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="px-5 py-2.5 rounded-full bg-[hsl(0,0%,100%)]/10 backdrop-blur-md border border-[hsl(0,0%,100%)]/10 text-sm font-medium flex items-center gap-2">
                        <MousePointer2 className="w-3.5 h-3.5" /> View Project
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[hsl(35,55%,60%)] transition-colors">{project.title}</h3>
                    <p className="text-sm text-[hsl(0,0%,45%)] mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-3 py-1 rounded-full bg-[hsl(35,55%,50%)]/8 text-[hsl(35,55%,60%)] border border-[hsl(35,55%,50%)]/12 font-medium">
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="text-[hsl(35,55%,55%)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Client Love</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 150} direction="scale">
                <div className="group p-7 rounded-2xl border border-[hsl(0,0%,10%)] bg-[hsl(240,12%,6%)] hover:border-[hsl(35,55%,20%)] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[hsl(35,55%,50%)]/3 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[hsl(35,55%,50%)] text-[hsl(35,55%,50%)]" />)}
                    </div>
                    <p className="text-[hsl(0,0%,60%)] italic mb-6 text-sm leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(35,55%,30%)] to-[hsl(35,55%,20%)] flex items-center justify-center text-xs font-bold text-[hsl(35,55%,70%)]">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-[hsl(0,0%,40%)]">{t.role}</p>
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
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,15%,3%)] via-[hsl(240,12%,5%)] to-[hsl(240,15%,3%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(35,55%,30%)]/5 blur-[150px]" />
        </div>
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Let's Build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(35,55%,55%)] to-[hsl(25,45%,45%)]">Something Great</span>
          </h2>
          <p className="text-[hsl(0,0%,45%)] text-base mb-12 max-w-lg mx-auto">Have a project in mind? Let's create something extraordinary together.</p>
          <a href={`mailto:${data.contactEmail}`} className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[hsl(35,55%,45%)] to-[hsl(25,50%,40%)] text-[hsl(240,15%,3%)] font-semibold rounded-xl hover:shadow-[0_20px_60px_-15px_hsl(35,55%,50%,0.4)] transition-all duration-500 hover:-translate-y-1 text-base">
            <Mail className="w-5 h-5" /> {data.contactEmail}
          </a>
          <div className="flex justify-center gap-4 mt-12">
            {data.socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform] || ExternalLink;
              return (
                <a key={link.platform} href={link.url} className="w-11 h-11 rounded-full border border-[hsl(0,0%,12%)] flex items-center justify-center hover:border-[hsl(35,55%,40%)] hover:text-[hsl(35,55%,55%)] hover:shadow-[0_0_20px_-5px_hsl(35,55%,50%,0.2)] transition-all duration-500 hover:-translate-y-1">
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[hsl(0,0%,8%)]">
        <div className="max-w-5xl mx-auto px-6 text-center text-xs text-[hsl(0,0%,30%)] tracking-wider">
          © 2024 {data.profileName} — All rights reserved
        </div>
      </footer>
    </div>
  );
}

function StatNum({ value, suffix, visible }: { value: number; suffix: string; visible: boolean }) {
  const count = useCountUp(value, 2000, visible);
  return <>{count}{suffix}</>;
}
