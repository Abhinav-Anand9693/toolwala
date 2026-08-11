export type PersonalInfo = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  technologies: string;
  description: string;
  link: string;
};

export type ResumeEvidence = {
  id: string;
  skill: string;
  source:
    | "experience"
    | "project"
    | "education"
    | "certification"
    | "other";
  description: string;
  verified: boolean;
};

export type ResumeTemplate =
  | "classic"
  | "modern"
  | "student";

export type ResumeData = {
  personal: PersonalInfo;

  summary: string;

  experience: ExperienceItem[];

  education: EducationItem[];

  projects: ProjectItem[];

  skills: string[];

  targetJobDescription: string;

  template: ResumeTemplate;

  evidence: ResumeEvidence[];
};