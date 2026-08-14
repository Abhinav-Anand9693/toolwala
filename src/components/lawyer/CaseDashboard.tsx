"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Plus,
  Search,
  FileText,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import CaseCard from "./CaseCard";
import { LawyerCase } from "@/types/lawyer";

const demoCases: LawyerCase[] = [
  {
    id: "case-1",
    title: "ABC vs XYZ",
    caseNumber: "CIV/2026/001",
    caseType: "civil",
    court: "Patna High Court",
    clientName: "ABC",
    oppositeParty: "XYZ",
    description:
      "Civil dispute regarding property and ownership.",
    status: "active",
    createdAt: "2026-08-10",
  },
  {
    id: "case-2",
    title: "Company vs Employee",
    caseNumber: "LAB/2026/014",
    caseType: "corporate",
    court: "Labour Court",
    clientName: "ABC Pvt Ltd",
    oppositeParty: "John Doe",
    description:
      "Employment and contractual dispute.",
    status: "pending",
    createdAt: "2026-08-08",
  },
];

export default function CaseDashboard() {
  const activeCases = demoCases.filter(
    (item) => item.status === "active"
  ).length;

  const pendingCases = demoCases.filter(
    (item) => item.status === "pending"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">

                <BriefcaseBusiness className="h-4 w-4" />

                Lawyer Workspace

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Case Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage your cases, documents and case intelligence from one workspace.
              </p>

            </div>

            <Link
              href="/lawyer/cases/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              Create Case
            </Link>

          </div>

        </div>

      </section>

      {/* Dashboard */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Stats */}

        <div className="grid gap-4 sm:grid-cols-3">

          <StatCard
            title="Total Cases"
            value={demoCases.length}
            icon={<FileText className="h-5 w-5" />}
          />

          <StatCard
            title="Active Cases"
            value={activeCases}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />

          <StatCard
            title="Pending Cases"
            value={pendingCases}
            icon={<Clock3 className="h-5 w-5" />}
          />

        </div>

        {/* Search */}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          <div className="relative flex-1">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              placeholder="Search cases..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* Cases */}

        <div className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Your Cases
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recently created and active cases.
              </p>
            </div>

          </div>

          {demoCases.length === 0 ? (
            <EmptyCases />
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">

              {demoCases.map((lawyerCase) => (
                <CaseCard
                  key={lawyerCase.id}
                  lawyerCase={lawyerCase}
                />
              ))}

            </div>
          )}

        </div>

      </section>

    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {value}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

function EmptyCases() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

      <BriefcaseBusiness className="mx-auto h-10 w-10 text-slate-300" />

      <h3 className="mt-4 font-bold text-slate-950">
        No cases yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Create your first case to start organizing your legal workspace.
      </p>

      <Link
        href="/lawyer/cases/new"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
      >
        <Plus className="h-4 w-4" />
        Create First Case
      </Link>

    </div>
  );
}