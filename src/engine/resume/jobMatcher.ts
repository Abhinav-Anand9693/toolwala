import { JDAnalysis } from "./jdAnalyzer";
import { ResumeData } from "@/types/resume";

export type JobMatchItem = {
  skill: string;
  status: "match" | "partial" | "missing";
};

export type JobMatchAnalysis = {
  score: number;
  matches: JobMatchItem[];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[.\-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function skillMatches(
  resumeSkill: string,
  requiredSkill: string
) {
  const resume = normalize(resumeSkill);
  const required = normalize(requiredSkill);

  return (
    resume === required ||
    resume.includes(required) ||
    required.includes(resume)
  );
}

export function matchResumeToJob(
  resume: ResumeData,
  job: JDAnalysis
): JobMatchAnalysis {
  const resumeSkills = [
    ...resume.skills,

    ...resume.experience.flatMap(
      (experience) =>
        experience.description
          .split(/[,|•\n]/)
          .map((item) => item.trim())
          .filter(Boolean)
    ),

    ...resume.projects.flatMap(
      (project) =>
        project.technologies
          .split(/[,|•\n]/)
          .map((item) => item.trim())
          .filter(Boolean)
    ),
  ];

  const uniqueResumeSkills =
    Array.from(
      new Set(
        resumeSkills.map(normalize)
      )
    );

  const matches: JobMatchItem[] =
    job.skills.map((skill) => {
      const exactMatch =
        uniqueResumeSkills.some(
          (resumeSkill) =>
            skillMatches(
              resumeSkill,
              skill
            )
        );

      if (exactMatch) {
        return {
          skill,
          status: "match",
        };
      }

      const keywordMatch =
        job.keywords.some(
          (keyword) =>
            skillMatches(
              keyword,
              skill
            )
        );

      if (keywordMatch) {
        return {
          skill,
          status: "partial",
        };
      }

      return {
        skill,
        status: "missing",
      };
    });

  const total = matches.length;

  const points = matches.reduce(
    (sum, item) => {
      if (item.status === "match") {
        return sum + 1;
      }

      if (item.status === "partial") {
        return sum + 0.5;
      }

      return sum;
    },
    0
  );

  const score =
    total === 0
      ? 0
      : Math.round(
          (points / total) * 100
        );

  return {
    score,
    matches,
  };
}