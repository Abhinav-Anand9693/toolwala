"use client";

import { ResumeData } from "@/types/resume";

type Props = {
  resume: ResumeData;
};

export default function ResumeProgress({
  resume,
}: Props) {
  const checks = [
    Boolean(
      resume.personal.fullName.trim()
    ),

    Boolean(
      resume.personal.email.trim()
    ),

    Boolean(
      resume.personal.jobTitle.trim()
    ),

    Boolean(
      resume.summary.trim()
    ),

    resume.experience.length > 0,

    resume.projects.length > 0,

    resume.education.length > 0,

    resume.skills.length >= 3,
  ];

  const completed =
    checks.filter(Boolean).length;

  const percentage = Math.round(
    (completed / checks.length) * 100
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-bold text-slate-950">
            Resume completeness
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {completed} of {checks.length} sections completed
          </p>
        </div>

        <span className="text-xl font-bold text-slate-950">
          {percentage}%
        </span>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}