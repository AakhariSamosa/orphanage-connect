import { Code, Palette, Smartphone, Lightbulb, Star, Mail, ExternalLink, Github, Linkedin, Twitter, Sparkles, MoveRight, MousePointer2 } from 'lucide-react';
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
    <div className="min-h-screen bg-[hsl(222,47%,6%)] text-[hsl(0,0%,94%)] overflow-hidden font-sans">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Ambient gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[hsl(280,70%,20%)]/25 via-transparent to-[hsl(330,70%,35%)]/15" />
          <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(330,70%,45%)]/8 blur-[150px] animate-float pointer-events-none" />
          <div className="absolute -bottom-[100px] -left-[100px] w-[500px] h-[500px] rounded-full bg-[hsl(260,70%,40%)]/8 blur-[120px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-[hsl(200,70%,40%)]/5 blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '5s' }} />
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(330,70%,45%)]/20 bg-[hsl(330,70%,45%)]/5 backdrop-blur-xl text-[hsl(330,70%,65%)] text-xs font-semibold mb-10 animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                <Sparkles className="w-3.5 h-3.5" /> Creative Developer
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[0.88] mb-8 tracking-tight animate-fade-up" style={{ opacity: 0, animationDelay: '400ms' }}>
                I Create
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] via-[hsl(280,70%,55%)] to-[hsl(200,70%,55%)] animate-gradient bg-[length:200%_200%]">
                  Digital Art
                </span>
              </h1>
              <p className="text-base text-[hsl(0,0%,50%)] mb-12 max-w-md leading-relaxed animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
                {data.profileDescription}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '800ms' }}>
                <a href={`mailto:${data.contactEmail}`} className="group relative px-8 py-4 rounded-2xl font-semibold text-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(330,70%,50%)] to-[hsl(280,70%,50%)] transition-transform duration-500 group-hover:scale-105" />
                  <span className="relative z-10 text-[hsl(0,0%,100%)] flex items-center gap-2">
                    Let's Talk <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="#work" className="px-8 py-4 border border-[hsl(0,0%,18%)] rounded-2xl text-sm font-medium hover:border-[hsl(330,70%,45%)] hover:shadow-[0_0_30px_-10px_hsl(330,70%,50%,0.2)] transition-all duration-500 flex items-center gap-2 group">
                  View Work <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
              {data.profileImage ? (
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[hsl(330,70%,50%)] via-[hsl(280,70%,50%)] to-[hsl(200,70%,50%)] rounded-3xl blur-xl opacity-20 animate-gradient bg-[length:200%_200%]" />
                  <img src={data.profileImage} alt={data.profileName} className="relative rounded-3xl w-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]" />
                </div>
              ) : (
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(330,70%,12%)] to-[hsl(260,70%,8%)] border border-[hsl(0,0%,12%)] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(330,70%,50%)]/3 to-[hsl(280,70%,50%)]/3" />
                  <div className="text-center relative z-10">
                    <div className="text-[7rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-[hsl(330,70%,55%)] to-[hsl(280,70%,30%)] leading-none">
                      {data.profileName.charAt(0)}
                    </div>
                    <p className="text-[hsl(0,0%,40%)] mt-2 text-sm">{data.profileName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND MARQUEE ===== */}
      {data.brandCollaborations && data.brandCollaborations.length > 0 && (
        <section className="py-8 border-y border-[hsl(0,0%,10%)] overflow-hidden bg-[hsl(222,47%,5%)]">
          <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {[...data.brandCollaborations, ...data.brandCollaborations, ...data.brandCollaborations].map((brand, i) => (
              <span key={i} className="mx-8 text-sm font-display font-medium text-[hsl(0,0%,25%)] hover:text-[hsl(330,70%,55%)] transition-colors duration-300 cursor-default uppercase tracking-wider">
                {brand}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ===== SERVICES ===== */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-20">
            <p className="text-[hsl(330,70%,55%)] text-xs tracking-[0.3em] uppercase mb-4 font-semibold">Expertise</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              What I{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] to-[hsl(280,70%,55%)]">Do Best</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 120} direction={i % 2 === 0 ? 'left' : 'right'}>
                  <div className="group p-8 rounded-3xl border border-[hsl(0,0%,10%)] bg-[hsl(222,40%,8%)] hover:border-[hsl(330,70%,25%)] transition-all duration-700 relative overflow-hidden hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(330,70%,50%)]/0 to-[hsl(280,70%,50%)]/0 group-hover:from-[hsl(330,70%,50%)]/4 group-hover:to-[hsl(280,70%,50%)]/4 transition-all duration-700" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(330,70%,50%)]/8 to-[hsl(280,70%,50%)]/8 flex items-center justify-center mb-5 group-hover:from-[hsl(330,70%,50%)]/15 group-hover:to-[hsl(280,70%,50%)]/15 group-hover:shadow-[0_0_30px_-5px_hsl(330,70%,50%,0.2)] transition-all duration-500">
                        <Icon className="w-7 h-7 text-[hsl(330,70%,60%)]" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-[hsl(330,70%,70%)] transition-colors">{service.title}</h3>
                      <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Skills & Technologies</h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.map((skill, i) => (
              <AnimatedSection key={skill} delay={i * 50} direction="scale">
                <span className="px-5 py-2.5 rounded-full border border-[hsl(0,0%,12%)] text-sm hover:border-[hsl(330,70%,45%)] hover:text-[hsl(330,70%,60%)] hover:bg-[hsl(330,70%,50%)]/5 hover:shadow-[0_0_20px_-5px_hsl(330,70%,50%,0.15)] transition-all duration-400 cursor-default font-medium">
                  {skill}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="work" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-20">
            <p className="text-[hsl(330,70%,55%)] text-xs tracking-[0.3em] uppercase mb-4 font-semibold">Portfolio</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Selected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] to-[hsl(200,70%,55%)]">Projects</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 150} direction="scale">
                <div className="group cursor-pointer rounded-3xl overflow-hidden border border-[hsl(0,0%,10%)] bg-[hsl(222,40%,8%)] hover:border-[hsl(330,70%,25%)] transition-all duration-700 hover:-translate-y-1">
                  <div className="h-60 relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[hsl(330,70%,12%)] via-[hsl(280,60%,10%)] to-[hsl(260,70%,8%)] flex items-center justify-center">
                        <Code className="w-12 h-12 text-[hsl(330,70%,20%)] group-hover:text-[hsl(330,70%,40%)] transition-colors duration-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,40%,8%)] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="px-5 py-2 rounded-full bg-[hsl(0,0%,100%)]/10 backdrop-blur-md border border-[hsl(0,0%,100%)]/10 text-sm font-medium flex items-center gap-2">
                        <MousePointer2 className="w-3.5 h-3.5" /> View Project
                      </div>
                    </div>
                  </div>
                  <div className="p-6 -mt-6 relative z-10">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[hsl(330,70%,60%)] transition-colors">{project.title}</h3>
                    <p className="text-sm text-[hsl(0,0%,45%)] mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-3 py-1 rounded-full bg-[hsl(330,70%,50%)]/8 text-[hsl(330,70%,60%)] border border-[hsl(330,70%,50%)]/15 font-medium">
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
            <p className="text-[hsl(330,70%,55%)] text-xs tracking-[0.3em] uppercase mb-4 font-semibold">Reviews</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Happy Clients</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 120} direction="scale">
                <div className="group p-7 rounded-3xl border border-[hsl(0,0%,10%)] bg-[hsl(222,40%,8%)] hover:border-[hsl(330,70%,22%)] transition-all duration-500 h-full relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-bl from-[hsl(330,70%,50%)]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[hsl(330,70%,55%)] text-[hsl(330,70%,55%)]" />)}
                    </div>
                    <p className="text-[hsl(0,0%,55%)] italic mb-6 text-sm leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(330,70%,45%)] to-[hsl(280,70%,40%)] flex items-center justify-center text-xs font-bold text-[hsl(0,0%,100%)]">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-[hsl(0,0%,38%)]">{t.role}</p>
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
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,6%)] via-[hsl(280,40%,8%)] to-[hsl(222,47%,6%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(330,70%,40%)]/5 blur-[150px]" />
        </div>
        <AnimatedSection className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[0.95]">
            Let's Create
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(330,70%,55%)] via-[hsl(280,65%,55%)] to-[hsl(200,70%,55%)] animate-gradient bg-[length:200%_200%]">Something Amazing</span>
          </h2>
          <p className="text-[hsl(0,0%,45%)] text-base mb-12 max-w-xl mx-auto">Ready to bring your vision to life? Let's start the conversation.</p>
          <a href={`mailto:${data.contactEmail}`} className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-base relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(330,70%,50%)] to-[hsl(280,70%,50%)] transition-transform duration-500 group-hover:scale-105" />
            <span className="relative z-10 text-[hsl(0,0%,100%)] flex items-center gap-3">
              <Mail className="w-5 h-5" /> Get In Touch
            </span>
          </a>
          <div className="flex justify-center gap-4 mt-12">
            {data.socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform] || ExternalLink;
              return (
                <a key={link.platform} href={link.url} className="w-11 h-11 rounded-full border border-[hsl(0,0%,12%)] flex items-center justify-center hover:border-[hsl(330,70%,45%)] hover:text-[hsl(330,70%,55%)] hover:shadow-[0_0_25px_-5px_hsl(330,70%,50%,0.2)] transition-all duration-500 hover:-translate-y-1">
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[hsl(0,0%,8%)]">
        <div className="max-w-5xl mx-auto px-6 text-center text-xs text-[hsl(0,0%,28%)] tracking-wider">
          © 2024 {data.profileName} — Crafted with passion
        </div>
      </footer>
    </div>
  );
}
