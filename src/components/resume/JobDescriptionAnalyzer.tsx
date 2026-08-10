"use client";

import {
  CheckCircle2,
  ClipboardList,
  Code2,
  KeyRound,
  Search,
  Sparkles,
} from "lucide-react";

import { JDAnalysis } from "@/engine/resume/jdAnalyzer";

type Props = {
  value: string;
  analysis: JDAnalysis;
  onChange: (value: string) => void;
  onAnalyze: () => void;
};

export default function JobDescriptionAnalyzer({
  value,
  analysis,
  onChange,
  onAnalyze,
}: Props) {
  const hasAnalysis =
    analysis.skills.length > 0 ||
    analysis.keywords.length > 0 ||
    analysis.requirements.length > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Search className="h-5 w-5" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-950">
            Target job
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Paste the job description so Toolwala can
            identify relevant skills, keywords and
            requirements.
          </p>

        </div>

      </div>

      {/* Input */}

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={10}
        placeholder={`Paste the complete job description here...

Example:

We are looking for a Software Engineer with experience in Java, Spring Boot, REST APIs, SQL and Docker...`}
        className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      />

      {/* Analyze */}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-xs text-slate-400">
          {value.length} characters
        </p>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={!value.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles className="h-4 w-4" />
          Analyze job
        </button>

      </div>

      {/* Results */}

      {hasAnalysis && (

        <div className="mt-8 border-t border-slate-200 pt-8">

          <div className="flex items-center gap-2">

            <CheckCircle2 className="h-5 w-5 text-emerald-500" />

            <h3 className="font-bold text-slate-950">
              Job analysis
            </h3>

          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">

            {/* Skills */}

            <AnalysisCard
              icon={
                <Code2 className="h-5 w-5" />
              }
              title="Technical skills"
              count={analysis.skills.length}
            >

              {analysis.skills.length > 0 ? (

                <div className="flex flex-wrap gap-2">

                  {analysis.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              ) : (

                <EmptyResult text="No recognized technical skills found." />

              )}

            </AnalysisCard>

            {/* Keywords */}

            <AnalysisCard
              icon={
                <KeyRound className="h-5 w-5" />
              }
              title="Important keywords"
              count={analysis.keywords.length}
            >

              {analysis.keywords.length > 0 ? (

                <div className="flex flex-wrap gap-2">

                  {analysis.keywords.map(
                    (keyword) => (
                      <span
                        key={keyword}
                        className="rounded-lg border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700"
                      >
                        {keyword}
                      </span>
                    )
                  )}

                </div>

              ) : (

                <EmptyResult text="No common keywords detected." />

              )}

            </AnalysisCard>

            {/* Requirements */}

            <div className="lg:col-span-2">

              <AnalysisCard
                icon={
                  <ClipboardList className="h-5 w-5" />
                }
                title="Requirements"
                count={
                  analysis.requirements.length
                }
              >

                {analysis.requirements.length > 0 ? (

                  <ul className="space-y-3">

                    {analysis.requirements.map(
                      (requirement, index) => (

                        <li
                          key={`${requirement}-${index}`}
                          className="flex gap-3 text-sm leading-6 text-slate-700"
                        >

                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

                          <span>
                            {requirement}
                          </span>

                        </li>

                      )
                    )}

                  </ul>

                ) : (

                  <EmptyResult text="No specific requirements were detected." />

                )}

              </AnalysisCard>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

type AnalysisCardProps = {
  icon: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
};

function AnalysisCard({
  icon,
  title,
  count,
  children,
}: AnalysisCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <div className="flex items-center justify-between gap-3">

        <div className="flex items-center gap-2">

          <div className="text-slate-500">
            {icon}
          </div>

          <h4 className="text-sm font-bold text-slate-900">
            {title}
          </h4>

        </div>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500">
          {count}
        </span>

      </div>

      <div className="mt-4">
        {children}
      </div>

    </div>
  );
}

function EmptyResult({
  text,
}: {
  text: string;
}) {
  return (
    <p className="text-sm text-slate-500">
      {text}
    </p>
  );
}