export type ResumeExperience = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ResumeEducation = {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
};

export type ResumeProject = {
  id: string;
  name: string;
  technologies: string;
  description: string;
  link: string;
};

export type ResumeData = {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };

  summary: string;

  experience: ResumeExperience[];

  education: ResumeEducation[];

  projects: ResumeProject[];

  skills: string[];

  targetJobDescription: string;
};