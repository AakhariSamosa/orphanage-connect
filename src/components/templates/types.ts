export interface TemplateData {
  profileName: string;
  profileTitle: string;
  profileDescription: string;
  profileImage: string;
  coverImage: string;
  projects: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
  }[];
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  skills: string[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
    avatar?: string;
  }[];
  contactEmail: string;
  contactPhone?: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  brandCollaborations?: string[];
}

export type TemplateVariant = 'premium-dark' | 'modern-product' | 'minimal-portfolio' | 'creative-agency';

export interface TemplateConfig {
  id: TemplateVariant;
  name: string;
  description: string;
  preview: {
    bg: string;
    accent: string;
    text: string;
  };
}

export const templateConfigs: TemplateConfig[] = [
  {
    id: 'premium-dark',
    name: 'Premium Dark',
    description: 'Luxury dark theme with elegant typography and accent glow effects',
    preview: { bg: '#0a0a0f', accent: '#c8a97e', text: '#ffffff' },
  },
  {
    id: 'modern-product',
    name: 'Modern Product',
    description: 'Clean SaaS-inspired layout with feature blocks and crisp sections',
    preview: { bg: '#f8fafc', accent: '#6366f1', text: '#1e293b' },
  },
  {
    id: 'minimal-portfolio',
    name: 'Minimal Portfolio',
    description: 'Soft tones, grid gallery, and refined whitespace',
    preview: { bg: '#fafaf9', accent: '#78716c', text: '#292524' },
  },
  {
    id: 'creative-agency',
    name: 'Creative Agency',
    description: 'Bold gradients, large type, and vibrant creative energy',
    preview: { bg: '#0f172a', accent: '#f472b6', text: '#f8fafc' },
  },
];

export const sampleData: TemplateData = {
  profileName: 'Alex Rivera',
  profileTitle: 'Full-Stack Developer & Designer',
  profileDescription: 'I craft beautiful, performant digital experiences. Specializing in modern web technologies, I help businesses transform their ideas into reality.',
  profileImage: '',
  coverImage: '',
  projects: [
    { title: 'E-Commerce Platform', description: 'Modern shopping experience built with React & Node.js', image: '', tags: ['React', 'Node.js', 'Stripe'] },
    { title: 'Analytics Dashboard', description: 'Real-time data visualization for enterprise clients', image: '', tags: ['TypeScript', 'D3.js', 'PostgreSQL'] },
    { title: 'Mobile Fitness App', description: 'Cross-platform health tracking application', image: '', tags: ['React Native', 'Firebase', 'AI'] },
    { title: 'SaaS Booking System', description: 'Appointment scheduling for service businesses', image: '', tags: ['Next.js', 'Prisma', 'Tailwind'] },
  ],
  services: [
    { title: 'Web Development', description: 'Custom websites and web applications built with modern tech', icon: 'code' },
    { title: 'UI/UX Design', description: 'Beautiful interfaces that delight users', icon: 'palette' },
    { title: 'Mobile Apps', description: 'Cross-platform mobile applications', icon: 'smartphone' },
    { title: 'Consulting', description: 'Technical strategy and architecture guidance', icon: 'lightbulb' },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'AWS', 'PostgreSQL', 'GraphQL', 'Docker', 'Tailwind CSS'],
  testimonials: [
    { name: 'Sarah Chen', role: 'CEO, TechStart', quote: 'Alex delivered an exceptional product that exceeded our expectations. Highly recommended!' },
    { name: 'James Wilson', role: 'Product Manager, InnovateCo', quote: 'Outstanding attention to detail and a pleasure to work with.' },
    { name: 'Maria Garcia', role: 'Founder, DesignHub', quote: 'The best developer we\'ve worked with. Clean code, great communication.' },
  ],
  contactEmail: 'hello@alexrivera.dev',
  socialLinks: [
    { platform: 'GitHub', url: '#' },
    { platform: 'LinkedIn', url: '#' },
    { platform: 'Twitter', url: '#' },
  ],
  brandCollaborations: ['Google', 'Microsoft', 'Stripe', 'Vercel', 'Figma', 'Notion'],
};
