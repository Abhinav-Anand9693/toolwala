import { Tool } from "@/types/tool";
export const tools = [
  {
    id: "resume-generator",
    title: "Resume Generator",
    category: "Career",
    profession: "student",
    description: "Generate professional resumes using AI.",
    isAI: true,
    processor: "resume-generator",
  },
  {
    id: "invoice-generator",
    title: "Invoice Generator",
    category: "Business",
    profession: "business",
    description: "Create invoices in seconds.",
    isAI: false,
    processor: "invoice-generator",
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    category: "Developer",
    profession: "developer",
    description: "Format and validate JSON.",
    isAI: false,
    processor: "json-formatter",
  },
  {
    id: "lesson-generator",
    title: "Lesson Plan Generator",
    category: "Education",
    profession: "teacher",
    description: "Generate lesson plans using AI.",
    isAI: true,
    processor: "lesson-generator",
  },
];