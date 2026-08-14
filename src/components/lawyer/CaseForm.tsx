"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CaseStatus,
  CaseType,
} from "@/types/lawyer";

export default function CaseForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseType, setCaseType] =
    useState<CaseType>("civil");
  const [court, setCourt] = useState("");
  const [clientName, setClientName] =
    useState("");
  const [oppositeParty, setOppositeParty] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState<CaseStatus>("active");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    /*
     * Database/API integration comes in Sprint 2.
     *
     * For now we only validate the form
     * and move back to the dashboard.
     */

    if (!title.trim()) {
      return;
    }

    router.push("/lawyer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >

      <Field
        label="Case Name"
        required
        value={title}
        onChange={setTitle}
        placeholder="ABC vs XYZ"
      />

      <Field
        label="Case Number"
        value={caseNumber}
        onChange={setCaseNumber}
        placeholder="CIV/2026/001"
      />

      <div className="grid gap-5 sm:grid-cols-2">

        <SelectField
          label="Case Type"
          value={caseType}
          onChange={(value) =>
            setCaseType(
              value as CaseType
            )
          }
          options={[
            ["civil", "Civil"],
            ["criminal", "Criminal"],
            ["corporate", "Corporate"],
            ["family", "Family"],
            ["property", "Property"],
            ["other", "Other"],
          ]}
        />

        <SelectField
          label="Status"
          value={status}
          onChange={(value) =>
            setStatus(
              value as CaseStatus
            )
          }
          options={[
            ["active", "Active"],
            ["pending", "Pending"],
            ["closed", "Closed"],
          ]}
        />

      </div>

      <Field
        label="Court"
        value={court}
        onChange={setCourt}
        placeholder="Patna High Court"
      />

      <div className="grid gap-5 sm:grid-cols-2">

        <Field
          label="Client Name"
          value={clientName}
          onChange={setClientName}
          placeholder="ABC"
        />

        <Field
          label="Opposite Party"
          value={oppositeParty}
          onChange={setOppositeParty}
          placeholder="XYZ"
        />

      </div>

      <div>

        <label className="text-sm font-semibold text-slate-800">
          Case Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          rows={6}
          placeholder="Briefly describe the case..."
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={() =>
            router.push("/lawyer")
          }
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Create Case
        </button>

      </div>

    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="text-sm font-semibold text-slate-800">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div>

      <label className="text-sm font-semibold text-slate-800">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >

        {options.map(
          ([optionValue, optionLabel]) => (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          )
        )}

      </select>

    </div>
  );
}