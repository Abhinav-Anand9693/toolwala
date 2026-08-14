import { Tool } from "@/types/tool";

export const tools: Tool[] = [
  {
    id: "resume-generator",
    title: "Resume Generator",
    category: "Career",
    profession: "student",
    description:
      "Generate professional resumes using AI.",
    isAI: true,
    processor:"resume-generator",
  },

  {
    id: "invoice-generator",
    title: "Invoice Generator",
    category: "Business",
    profession: "business",
    description:
      "Create professional invoices in seconds.",
    isAI: false,
    processor:"invoice-generator",
  },

  {
    id: "json-formatter",
    title: "JSON Formatter",
    category: "Developer",
    profession: "developer",
    description:
      "Format, beautify and validate JSON instantly.",
    isAI: false,
    processor:"json-formatter", 
  },

  {
    id: "lesson-generator",
    title: "Lesson Plan Generator",
    category: "Education",
    profession: "teacher",
    description:
      "Generate structured lesson plans using AI.",
    isAI: true,
    processor:"lesson-generator",
  },
   
  {
  id: "lawyer-workspace",
  title: "Lawyer Workspace",
  category: "Legal",
  profession: "lawyer",
  description:
    "Manage cases, organize documents, and analyze case information with an AI-assisted legal workspace.",
  isAI: true,
  processor:"lawyer-workspace",
},
 
];