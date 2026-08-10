import { ResumeData } from "@/types/resume";
import { atsRules } from "./atsRules";

export type ATSCheck = {
  id: string;
  label: string;
  description: string;
  passed: boolean;
  weight: number;
};

export type ATSAnalysis = {
  score: number;
  checks: ATSCheck[];
  warnings: string[];
};

export function analyzeResume(
  resume: ResumeData
): ATSAnalysis {
  const checks: ATSCheck[] = [];

  const addCheck = (
    id: string,
    passed: boolean
  ) => {
    const rule = atsRules.find(
      (item) => item.id === id
    );

    if (!rule) {
      return;
    }

    checks.push({
      id: rule.id,
      label: rule.label,
      description: rule.description,
      passed,
      weight: rule.weight,
    });
  };

  addCheck(
    "name",
    Boolean(resume.personal.fullName.trim())
  );

  addCheck(
    "email",
    Boolean(resume.personal.email.trim())
  );

  addCheck(
    "phone",
    Boolean(resume.personal.phone.trim())
  );

  addCheck(
    "job-title",
    Boolean(resume.personal.jobTitle.trim())
  );

  addCheck(
    "summary",
    resume.summary.trim().length >= 80
  );

  addCheck(
    "experience",
    resume.experience.length > 0
  );

  addCheck(
    "education",
    resume.education.length > 0
  );

  addCheck(
    "projects",
    resume.projects.length > 0
  );

  addCheck(
    "skills",
    resume.skills.length >= 3
  );

  addCheck(
    "links",
    Boolean(
      resume.personal.linkedin.trim() ||
      resume.personal.github.trim()
    )
  );

  const allDescriptions = [
    ...resume.experience.map(
      (item) => item.description
    ),

    ...resume.projects.map(
      (item) => item.description
    ),
  ].join(" ");

  const hasMetric =
    /\d+%|\d+\+|\d+x|\$\d+|₹\d+|\b\d+\s*(users|customers|projects|requests|records|employees)\b/i.test(
      allDescriptions
    );

  addCheck(
    "measurable-impact",
    hasMetric
  );

  const totalWeight = atsRules.reduce(
    (sum, rule) => sum + rule.weight,
    0
  );

  const earnedWeight = checks
    .filter((check) => check.passed)
    .reduce(
      (sum, check) => sum + check.weight,
      0
    );

  const score = Math.round(
    (earnedWeight / totalWeight) * 100
  );

  const warnings: string[] = [];

  if (!resume.summary.trim()) {
    warnings.push(
      "Add a professional summary."
    );
  } else if (resume.summary.trim().length < 80) {
    warnings.push(
      "Your professional summary is too short."
    );
  }

  if (resume.experience.length === 0) {
    warnings.push(
      "Add relevant experience or internship information."
    );
  }

  if (resume.projects.length === 0) {
    warnings.push(
      "Add at least one relevant project."
    );
  }

  if (resume.skills.length < 3) {
    warnings.push(
      "Add more relevant skills."
    );
  }

  if (!hasMetric) {
    warnings.push(
      "Add measurable outcomes where you have genuine evidence."
    );
  }

  if (
    !resume.personal.linkedin.trim() &&
    !resume.personal.github.trim()
  ) {
    warnings.push(
      "Consider adding LinkedIn or GitHub."
    );
  }

  return {
    score,
    checks,
    warnings,
  };
}