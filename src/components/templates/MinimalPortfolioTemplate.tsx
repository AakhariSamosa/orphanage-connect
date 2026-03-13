import { ArrowUpRight, Code, Palette, Smartphone, Lightbulb, Star, Mail, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import type { TemplateData } from './types';

const iconMap: Record<string, React.ElementType> = {
  code: Code, palette: Palette, smartphone: Smartphone, lightbulb: Lightbulb,
};
const socialIconMap: Record<string, React.ElementType> = {
  GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter,
};

export function MinimalPortfolioTemplate({ data }: { data: TemplateData }) {
  return (
    <div className="min-h-screen bg-[hsl(40,20%,98%)] text-[hsl(30,10%,15%)] overflow-hidden">
      {/* Hero - Clean & Minimal */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {data.profileImage && (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden flex-shrink-0 animate-fade-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                <img src={data.profileImage} alt={data.profileName} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <p className="text-[hsl(30,8%,55%)] text-sm mb-3 animate-fade-up" style={{ opacity: 0, animationDelay: '300ms' }}>
                {data.profileTitle}
              </p>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight animate-fade-up" style={{ opacity: 0, animationDelay: '400ms' }}>
                Hello, I'm {data.profileName}
              </h1>
              <p className="text-lg text-[hsl(30,8%,45%)] leading-relaxed max-w-xl animate-fade-up" style={{ opacity: 0, animationDelay: '600ms' }}>
                {data.profileDescription}
              </p>
              <div className="flex gap-3 mt-8 animate-fade-up" style={{ opacity: 0, animationDelay: '800ms' }}>
                {data.socialLinks.map((link) => {
                  const Icon = socialIconMap[link.platform] || ExternalLink;
                  return (
                    <a key={link.platform} href={link.url} className="w-10 h-10 rounded-full bg-[hsl(30,10%,92%)] flex items-center justify-center hover:bg-[hsl(30,10%,15%)] hover:text-[hsl(0,0%,100%)] transition-all duration-300">
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
        <div className="h-px bg-[hsl(30,10%,90%)]" />
      </div>

      {/* About / Services */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-xs text-[hsl(30,8%,55%)] tracking-[0.25em] uppercase mb-6">Services</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(30,10%,93%)] flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(30,10%,15%)] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[hsl(30,10%,40%)] group-hover:text-[hsl(0,0%,100%)] transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{service.title}</h3>
                      <p className="text-sm text-[hsl(30,8%,50%)] leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-xs text-[hsl(30,8%,55%)] tracking-[0.25em] uppercase mb-3">Selected Work</p>
            <h2 className="text-3xl font-display font-bold">Portfolio</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 100} direction="scale">
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[hsl(30,10%,94%)] mb-4 relative">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[hsl(30,10%,93%)] to-[hsl(30,10%,88%)]">
                        <Code className="w-10 h-10 text-[hsl(30,10%,70%)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[hsl(30,10%,10%)]/0 group-hover:bg-[hsl(30,10%,10%)]/40 transition-colors duration-300 flex items-center justify-center">
                      <ArrowUpRight className="w-8 h-8 text-[hsl(0,0%,100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[hsl(30,10%,40%)] transition-colors">{project.title}</h3>
                  <p className="text-sm text-[hsl(30,8%,55%)]">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-[hsl(30,8%,50%)] bg-[hsl(30,10%,94%)] px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-8">
            <p className="text-xs text-[hsl(30,8%,55%)] tracking-[0.25em] uppercase mb-3">Expertise</p>
            <h2 className="text-3xl font-display font-bold">Skills & Tools</h2>
          </AnimatedSection>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <AnimatedSection key={skill} delay={i * 50} direction="scale">
                <span className="px-4 py-2 border border-[hsl(30,10%,88%)] rounded-full text-sm hover:bg-[hsl(30,10%,15%)] hover:text-[hsl(0,0%,100%)] hover:border-transparent transition-all duration-300 cursor-default">
                  {skill}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[hsl(0,0%,100%)]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-xs text-[hsl(30,8%,55%)] tracking-[0.25em] uppercase mb-3">Kind Words</p>
            <h2 className="text-3xl font-display font-bold">Testimonials</h2>
          </AnimatedSection>
          <div className="space-y-8">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 150}>
                <div className="flex gap-6 p-6 rounded-2xl hover:bg-[hsl(30,10%,97%)] transition-colors duration-300">
                  <div className="text-4xl font-display text-[hsl(30,10%,85%)] leading-none">"</div>
                  <div>
                    <p className="text-[hsl(30,8%,35%)] leading-relaxed mb-4">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[hsl(30,10%,90%)] flex items-center justify-center text-xs font-semibold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-[hsl(30,8%,55%)]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-10 rounded-3xl bg-[hsl(30,10%,15%)] text-[hsl(0,0%,95%)]">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Let's connect</h2>
              <p className="text-[hsl(0,0%,65%)]">Open for new projects and collaborations</p>
            </div>
            <a href={`mailto:${data.contactEmail}`} className="px-8 py-4 bg-[hsl(0,0%,100%)] text-[hsl(30,10%,15%)] font-semibold rounded-xl hover:bg-[hsl(0,0%,90%)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5">
              <Mail className="w-5 h-5" /> Say Hello
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-[hsl(30,8%,60%)]">
          © 2024 {data.profileName}
        </div>
      </footer>
    </div>
  );
}
