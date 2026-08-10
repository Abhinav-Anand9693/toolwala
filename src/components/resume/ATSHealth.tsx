"use client";

import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
} from "lucide-react";

import { ATSAnalysis } from "@/engine/resume/resumeValidator";

type Props = {
  analysis: ATSAnalysis;
};

export default function ATSHealth({
  analysis,
}: Props) {
  const getScoreLabel = () => {
    if (analysis.score >= 90) {
      return "Excellent";
    }

    if (analysis.score >= 75) {
      return "Good";
    }

    if (analysis.score >= 60) {
      return "Needs improvement";
    }

    return "Needs attention";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div>

          <div className="flex items-center gap-2">

            <ShieldCheck className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-bold text-slate-950">
              ATS Health
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Compatibility checks based on resume structure
            and content quality.
          </p>

        </div>

        <div className="text-right">

          <div className="text-3xl font-bold text-slate-950">
            {analysis.score}
          </div>

          <div className="text-xs font-semibold text-slate-500">
            / 100
          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-5">

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${analysis.score}%`,
            }}
          />

        </div>

        <p className="mt-2 text-sm font-semibold text-slate-700">
          {getScoreLabel()}
        </p>

      </div>

      {/* Checks */}

      <div className="mt-6 space-y-3">

        {analysis.checks.map((check) => (

          <div
            key={check.id}
            className="flex items-start gap-3"
          >

            {check.passed ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            )}

            <div>

              <p className="text-sm font-semibold text-slate-800">
                {check.label}
              </p>

              <p className="text-xs leading-5 text-slate-500">
                {check.description}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Warnings */}

      {analysis.warnings.length > 0 && (

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">

          <div className="flex items-center gap-2">

            <AlertTriangle className="h-4 w-4 text-amber-600" />

            <h3 className="text-sm font-bold text-amber-900">
              Improvements
            </h3>

          </div>

          <ul className="mt-3 space-y-2">

            {analysis.warnings.map(
              (warning, index) => (

                <li
                  key={`${warning}-${index}`}
                  className="text-sm leading-5 text-amber-800"
                >
                  • {warning}
                </li>

              )
            )}

          </ul>

        </div>

      )}

    </div>
  );
}