import { ResumeData } from "@/types/resume";

export type ResumeScore = {
  score: number;

  criticalIssues: string[];

  warnings: string[];

  suggestions: string[];
};

export function scoreResume(
  resume: ResumeData
): ResumeScore {
  let score = 0;

  const criticalIssues: string[] = [];

  const warnings: string[] = [];

  const suggestions: string[] = [];

  /* Personal information */

  if (resume.personal.fullName.trim()) {
    score += 10;
  } else {
    criticalIssues.push(
      "Add your full name."
    );
  }

  if (resume.personal.email.trim()) {
    score += 10;
  } else {
    criticalIssues.push(
      "Add a professional email address."
    );
  }

  if (resume.personal.phone.trim()) {
    score += 5;
  } else {
    warnings.push(
      "Consider adding a phone number."
    );
  }

  if (resume.personal.jobTitle.trim()) {
    score += 5;
  } else {
    warnings.push(
      "Add the target job title."
    );
  }

  /* Summary */

  if (
    resume.summary.trim().length >= 80
  ) {
    score += 10;
  } else if (
    resume.summary.trim()
  ) {
    score += 5;

    warnings.push(
      "Your professional summary is short."
    );
  } else {
    warnings.push(
      "Add a professional summary."
    );
  }

  /* Experience */

  if (
    resume.experience.length > 0
  ) {
    score += 15;
  } else {
    warnings.push(
      "Add relevant experience or internships."
    );
  }

  /* Projects */

  if (
    resume.projects.length > 0
  ) {
    score += 15;
  } else {
    warnings.push(
      "Add relevant projects."
    );
  }

  /* Education */

  if (
    resume.education.length > 0
  ) {
    score += 10;
  } else {
    warnings.push(
      "Add your education."
    );
  }

  /* Skills */

  if (
    resume.skills.length >= 5
  ) {
    score += 15;
  } else if (
    resume.skills.length > 0
  ) {
    score += 8;

    warnings.push(
      "Consider adding more relevant skills."
    );
  } else {
    criticalIssues.push(
      "Add your technical and professional skills."
    );
  }

  /* Suggestions */

  if (
    resume.targetJobDescription.trim()
  ) {
    suggestions.push(
      "Use the Job Match analysis to identify relevant missing keywords."
    );
  } else {
    suggestions.push(
      "Paste a job description to tailor your resume."
    );
  }

  if (
    resume.projects.some(
      (project) =>
        project.description.length < 50
    )
  ) {
    suggestions.push(
      "Add more context to short project descriptions."
    );
  }

  if (
    resume.experience.some(
      (experience) =>
        experience.description.length < 50
    )
  ) {
    suggestions.push(
      "Use concise evidence-based descriptions for experience."
    );
  }

  return {
    score: Math.min(
      score,
      100
    ),

    criticalIssues,

    warnings,

    suggestions,
  };
}