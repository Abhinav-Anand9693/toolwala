"use client";

import {
  Check,
  LayoutTemplate,
} from "lucide-react";

import {
  ResumeTemplate,
} from "@/types/resume";

type Props = {
  value: ResumeTemplate;
  onChange: (
    template: ResumeTemplate
  ) => void;
};

const templates: {
  id: ResumeTemplate;
  title: string;
  description: string;
}[] = [
  {
    id: "classic",
    title: "ATS Classic",
    description:
      "Minimal single-column format for maximum ATS compatibility.",
  },
  {
    id: "modern",
    title: "Modern Professional",
    description:
      "Clean modern layout while keeping important resume structure readable.",
  },
  {
    id: "student",
    title: "Student / Fresher",
    description:
      "Optimized for students, internships and entry-level applications.",
  },
];

export default function ResumeTemplates({
  value,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <LayoutTemplate className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-bold text-slate-950">
            Resume template
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose a layout that matches your career stage.
          </p>
        </div>

      </div>

      <div className="mt-5 grid gap-3">

        {templates.map(
          (template) => {
            const selected =
              value === template.id;

            return (
              <button
                key={template.id}
                type="button"
                onClick={() =>
                  onChange(
                    template.id
                  )
                }
                className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >

                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300"
                  }`}
                >

                  {selected && (
                    <Check className="h-3 w-3" />
                  )}

                </div>

                <div>

                  <p className="text-sm font-bold text-slate-900">
                    {template.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {template.description}
                  </p>

                </div>

              </button>
            );
          }
        )}

      </div>

    </section>
  );
}