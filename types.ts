export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
  status: 'DEPLOYED' | 'ARCHIVED' | 'BETA' | 'ACTIVE';
  tech: string[];
  complexity: string;
  description: string;
}

export interface ExperienceItem {
  id: number;
  year: string;
  role: string;
  company: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  description: string;
  images: string[];
  date: string;
  rank?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  image: string;
  date?: string;
}
