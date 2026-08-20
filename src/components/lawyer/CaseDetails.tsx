"use client";

import { useEffect, useState } from "react";

import type { LawyerCase } from "@/types/lawyer";

type Props = {
  caseId: string;
};

export default function CaseDetails({
  caseId,
}: Props) {
  const [caseItem, setCaseItem] =
    useState<LawyerCase | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadCase() {
      try {
        const response = await fetch(
          `/api/cases/${caseId}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to load case"
          );
        }

        setCaseItem(data.case);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load case."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCase();
  }, [caseId]);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10">
        Loading case...
      </div>
    );
  }

  if (error || !caseItem) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error || "Case not found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm font-medium text-slate-500">
          Case
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-950">
          {caseItem.title}
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <Info
          label="Case Number"
          value={
            caseItem.caseNumber ||
            "Not provided"
          }
        />

        <Info
          label="Case Type"
          value={caseItem.caseType}
        />

        <Info
          label="Court"
          value={
            caseItem.court ||
            "Not provided"
          }
        />

        <Info
          label="Client"
          value={
            caseItem.clientName ||
            "Not provided"
          }
        />

        <Info
          label="Opposite Party"
          value={
            caseItem.oppositeParty ||
            "Not provided"
          }
        />

        <Info
          label="Status"
          value={caseItem.status}
        />

      </div>

      <div className="rounded-2xl border bg-white p-6">
        <h2 className="font-semibold text-slate-950">
          Case Description
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
          {caseItem.description ||
            "No description provided."}
        </p>
      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}