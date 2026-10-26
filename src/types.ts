export interface Project {
  id: string;
  title: string;
  category: 'social' | 'branding' | 'reels' | 'campaign';
  client: string;
  description: string;
  objective: string;
  strategy: string;
  deliverables: string[];
  platforms: string[];
  thumbnail: string;
  gallery: string[];
  metrics?: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}
