export  interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  tags: string[];
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  action: (args: string[]) => string | JSX.Element;
}

export interface TerminalHistory {
  input?: string;
  output: string | JSX.Element;
}

// Types pour l'accessibilité et le SEO
export interface SEOData {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  author?: string;
}

export interface CoreWebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface WebVitalsReport {
  metrics: CoreWebVital[];
  timestamp: string;
  url: string;
}
 