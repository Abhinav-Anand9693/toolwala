"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Plus,
} from "lucide-react";

import {
  ResumeEvidence,
} from "@/types/resume";

type Props = {
  evidence: ResumeEvidence[];

  onAdd: (
    evidence: ResumeEvidence
  ) => void;
};

export default function EvidencePanel({
  evidence,
  onAdd,
}: Props) {
  const [skill, setSkill] =
    useState("");

  const [description, setDescription] =
    useState("");

  function handleAdd() {
    if (
      !skill.trim() ||
      !description.trim()
    ) {
      return;
    }

    onAdd({
      id: crypto.randomUUID(),

      skill: skill.trim(),

      source: "other",

      description:
        description.trim(),

      verified: true,
    });

    setSkill("");

    setDescription("");
  }

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div>

          <h2 className="font-bold text-slate-950">
            Evidence vault
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Store real evidence for your skills.
            Toolwala will never invent experience.
          </p>

        </div>

      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">

        <input
          value={skill}
          onChange={(event) =>
            setSkill(
              event.target.value
            )
          }
          placeholder="Skill e.g. Java"
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />

        <input
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          placeholder="Where did you use it?"
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >

        <Plus className="h-4 w-4" />

        Add evidence

      </button>

      {evidence.length > 0 && (

        <div className="mt-6 space-y-3">

          {evidence.map(
            (item) => (

              <div
                key={item.id}
                className="rounded-xl border border-emerald-100 bg-emerald-50 p-4"
              >

                <div className="flex items-center justify-between">

                  <span className="font-bold text-emerald-950">
                    {item.skill}
                  </span>

                  <span className="text-xs font-bold text-emerald-600">
                    ✓ Verified
                  </span>

                </div>

                <p className="mt-2 text-sm text-emerald-900">
                  {item.description}
                </p>

              </div>

            )
          )}

        </div>

      )}

    </section>
  );
}