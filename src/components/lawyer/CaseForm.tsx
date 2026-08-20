"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import {
  CaseStatus,
  CaseType,
} from "@/types/lawyer";

export default function CaseForm() {
  const router = useRouter();

  const {
    isLoaded,
    isSignedIn,
  } = useAuth();

  const [title, setTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseType, setCaseType] =
    useState<CaseType>("CIVIL");
  const [court, setCourt] = useState("");
  const [clientName, setClientName] = useState("");
  const [oppositeParty, setOppositeParty] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState<CaseStatus>("ACTIVE");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleCreateCase(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    /*
     * Wait until Clerk has loaded.
     */
    if (!isLoaded) {
      setError("Checking your login session...");
      return;
    }

    /*
     * User must be authenticated.
     */
    if (!isSignedIn) {
      setError(
        "Please login before creating a case."
      );

      router.push(
        "/sign-in?redirect_url=/lawyer/cases/new"
      );

      return;
    }

    /*
     * Basic validation.
     */
    if (!title.trim()) {
      setError("Case name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cases", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          title: title.trim(),
          caseNumber: caseNumber.trim(),
          caseType,
          court: court.trim(),
          clientName: clientName.trim(),
          oppositeParty: oppositeParty.trim(),
          description: description.trim(),
          status,
        }),
      });

      /*
       * Read as text first.
       *
       * This prevents:
       *
       * Unexpected token '<'
       *
       * when the server returns HTML instead of JSON.
       */
      const rawResponse =
        await response.text();

      let data: {
        case?: {
          id: string;
        };
        error?: string;
      };

      try {
        data = rawResponse
          ? JSON.parse(rawResponse)
          : {};
      } catch {
        console.error(
          "Invalid API response:",
          rawResponse.slice(0, 500)
        );

        if (response.status === 401) {
          throw new Error(
            "Your login session has expired. Please login again."
          );
        }

        throw new Error(
          "The server returned an unexpected response. Please try again."
        );
      }

      /*
       * API returned an error.
       */
      if (!response.ok) {
        throw new Error(
          data.error ||
            `Failed to create case (${response.status})`
        );
      }

      /*
       * Make sure API returned a case.
       */
      if (!data.case?.id) {
        throw new Error(
          "Case was created but the server did not return a case ID."
        );
      }

      /*
       * Success.
       */
      router.push(
        `/lawyer/cases/${data.case.id}`
      );

      router.refresh();

    } catch (error) {
      console.error(
        "Create case error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the case."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleCreateCase}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

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
            setCaseType(value as CaseType)
          }
          options={[
            ["CIVIL", "Civil"],
            ["CRIMINAL", "Criminal"],
            ["CORPORATE", "Corporate"],
            ["FAMILY", "Family"],
            ["PROPERTY", "Property"],
            ["OTHER", "Other"],
          ]}
        />

        <SelectField
          label="Status"
          value={status}
          onChange={(value) =>
            setStatus(value as CaseStatus)
          }
          options={[
            ["ACTIVE", "Active"],
            ["PENDING", "Pending"],
            ["CLOSED", "Closed"],
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
            setDescription(event.target.value)
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
          disabled={isSubmitting}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting || !isLoaded
          }
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {!isLoaded
            ? "Checking login..."
            : isSubmitting
            ? "Creating..."
            : "Create Case"}
        </button>
      </div>
    </form>
  );
}

/* ================================================= */
/* INPUT FIELD */
/* ================================================= */

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

/* ================================================= */
/* SELECT FIELD */
/* ================================================= */

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