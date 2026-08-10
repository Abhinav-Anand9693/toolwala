"use client";

import {
  CheckCircle2,
  CircleAlert,
  XCircle,
  Target,
} from "lucide-react";

import { JobMatchAnalysis } from "@/engine/resume/jobMatcher";

type Props = {
  analysis: JobMatchAnalysis;
};

export default function JobMatch({
  analysis,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

            <Target className="h-5 w-5" />

          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-950">
              Job match
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              How your current resume aligns with the
              target job.
            </p>

          </div>

        </div>

        <div className="text-right">

          <div className="text-3xl font-bold text-slate-950">
            {analysis.score}
          </div>

          <div className="text-xs font-semibold text-slate-400">
            / 100
          </div>

        </div>

      </div>

      {analysis.matches.length > 0 ? (

        <div className="mt-6 space-y-3">

          {analysis.matches.map((item) => (

            <div
              key={item.skill}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >

              <span className="text-sm font-semibold text-slate-700">
                {item.skill}
              </span>

              {item.status === "match" && (

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">

                  <CheckCircle2 className="h-4 w-4" />

                  Match

                </span>

              )}

              {item.status === "partial" && (

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">

                  <CircleAlert className="h-4 w-4" />

                  Partial

                </span>

              )}

              {item.status === "missing" && (

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600">

                  <XCircle className="h-4 w-4" />

                  Missing

                </span>

              )}

            </div>

          ))}

        </div>

      ) : (

        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">

          <p className="text-sm text-slate-500">
            Analyze a job description to see your match.
          </p>

        </div>

      )}

    </div>
  );
}