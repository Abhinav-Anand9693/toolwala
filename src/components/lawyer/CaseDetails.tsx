import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  MapPin,
  UserRound,
  CalendarDays,
} from "lucide-react";

type Props = {
  caseId: string;
};

export default function CaseDetails({
  caseId,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-50">

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <Link
            href="/lawyer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cases
          </Link>

          <div className="mt-6">

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              Active
            </span>

            <h1 className="mt-3 text-3xl font-bold text-slate-950">
              ABC vs XYZ
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Case Number: CIV/2026/001
            </p>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-950">
                Case Overview
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Civil dispute regarding property and ownership.
              </p>

            </div>

          </div>

          <div className="space-y-4">

            <InfoItem
              icon={<MapPin className="h-4 w-4" />}
              label="Court"
              value="Patna High Court"
            />

            <InfoItem
              icon={<UserRound className="h-4 w-4" />}
              label="Client"
              value="ABC"
            />

            <InfoItem
              icon={<UserRound className="h-4 w-4" />}
              label="Opposite Party"
              value="XYZ"
            />

            <InfoItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Created"
              value="10 Aug 2026"
            />

          </div>

        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">

          <FileText className="mx-auto h-10 w-10 text-slate-300" />

          <h3 className="mt-4 font-bold text-slate-950">
            Documents
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Document upload will be connected in the next sprint.
          </p>

        </div>

      </section>

    </main>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </div>

      <p className="mt-2 font-semibold text-slate-900">
        {value}
      </p>

    </div>
  );
}