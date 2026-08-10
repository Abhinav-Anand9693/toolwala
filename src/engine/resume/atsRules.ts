export type ATSRule = {
  id: string;
  label: string;
  description: string;
  weight: number;
};

export const atsRules: ATSRule[] = [
  {
    id: "name",
    label: "Name",
    description: "Full name is present.",
    weight: 10,
  },

  {
    id: "email",
    label: "Email",
    description: "Professional email address is present.",
    weight: 10,
  },

  {
    id: "phone",
    label: "Phone",
    description: "Phone number is present.",
    weight: 8,
  },

  {
    id: "job-title",
    label: "Target Job Title",
    description: "Target job title is present.",
    weight: 7,
  },

  {
    id: "summary",
    label: "Professional Summary",
    description: "Professional summary contains useful information.",
    weight: 10,
  },

  {
    id: "experience",
    label: "Experience",
    description: "Professional experience is present.",
    weight: 15,
  },

  {
    id: "education",
    label: "Education",
    description: "Education information is present.",
    weight: 10,
  },

  {
    id: "projects",
    label: "Projects",
    description: "Relevant projects are present.",
    weight: 10,
  },

  {
    id: "skills",
    label: "Skills",
    description: "Technical or professional skills are present.",
    weight: 10,
  },

  {
    id: "links",
    label: "Professional Links",
    description: "LinkedIn or GitHub is present.",
    weight: 5,
  },

  {
    id: "measurable-impact",
    label: "Measurable Impact",
    description:
      "Experience or project descriptions contain measurable outcomes.",
    weight: 5,
  },
];