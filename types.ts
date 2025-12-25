
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

// Global JSX augmentation for custom and third-party elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
      ambientLight: any;
      pointLight: any;
      group: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      torusGeometry: any;
      sphereGeometry: any;
    }
  }
}

// Ensure compatible namespace augmentation for modern React JSX transforms
// Fix: Use declare module 'react' instead of declare namespace React to avoid conflict with imports
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string;
        'loading-anim-type'?: string;
      }, HTMLElement>;
      ambientLight: any;
      pointLight: any;
      group: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      torusGeometry: any;
      sphereGeometry: any;
    }
  }
}
