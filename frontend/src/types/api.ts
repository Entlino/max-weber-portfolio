export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  gitHubUrl: string;
  linkedInUrl: string;
  yearsOfExperience: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  gitHubUrl: string;
  liveUrl?: string;
  year: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiencyLevel: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}
