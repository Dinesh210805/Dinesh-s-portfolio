export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface ExperienceItem {
  id: number;
  year: string;
  role: string;
  company: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}
