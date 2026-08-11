import {
  ResumeData,
  ResumeEvidence,
} from "@/types/resume";

export type EvidenceStatus =
  | "verified"
  | "unverified"
  | "missing";

export type EvidenceResult = {
  skill: string;
  status: EvidenceStatus;
  evidence?: ResumeEvidence;
};

export function checkSkillEvidence(
  resume: ResumeData,
  skill: string
): EvidenceResult {
  const evidence =
    resume.evidence.find(
      (item) =>
        item.skill.toLowerCase() ===
        skill.toLowerCase()
    );

  if (!evidence) {
    return {
      skill,
      status: "missing",
    };
  }

  if (!evidence.verified) {
    return {
      skill,
      status: "unverified",
      evidence,
    };
  }

  return {
    skill,
    status: "verified",
    evidence,
  };
}