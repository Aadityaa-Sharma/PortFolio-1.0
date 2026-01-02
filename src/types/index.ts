export interface Education {
  degree: string;
  institution: string;
  specialization?: string;
  duration?: string;
  cgpa?: string;
  location?: string;
  board?: string;
  year?: string;
  percentage?: string;
}

export interface AboutData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  bio: {
    intro: string;
    journey: string;
    current: string;
  };
  education: Education[];
  stats: {
    projects: string;
    experience: string;
    technologies: string;
    contributions: string;
    commits?: string;
  };
  highlights: string[];
}

export interface Technology {
  name: string;
  logo: string;
}

export interface TechCategory {
  id: string;
  name: string;
  technologies: Technology[];
}

export interface TechStackData {
  categories: TechCategory[];
}

export interface ProjectLink {
  github?: string;
  live?: string;
  demo?: string;
  local?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDescription?: string;
  year: string;
  category: string;
  role?: string;
  technologies: string[];
  image: string;
  featured: boolean;
  deployed: boolean;
  links: ProjectLink;
  timeline?: string;
}

export interface ProjectsData {
  featured: Project[];
  other: Project[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  hoverColor: string;
  download?: boolean;
}

export interface SocialsData {
  links: SocialLink[];
  email: string;
}
