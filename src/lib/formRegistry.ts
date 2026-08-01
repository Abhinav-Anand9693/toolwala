import resumeGeneratorInput from "@/config/tool-inputs/resume-generator";

export function getFormByTool(slug: string) {
  switch (slug) {
    case "resume-generator":
      return resumeGeneratorInput;

    default:
      return null;
  }
}