import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  MapPin,
  UserRound,
} from "lucide-react";

import { LawyerCase } from "@/types/lawyer";

type Props = {
  lawyerCase: LawyerCase;
};

export default function CaseCard({
  lawyerCase,
}: Props) {
  return (
    <Link
      href={`/lawyer/cases/${lawyerCase.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                lawyerCase.status === "active"
                  ? "bg-emerald-50 text-emerald-700"
                  : lawyerCase.status === "pending"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {lawyerCase.status}
            </span>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-700">
              {lawyerCase.caseType}
            </span>

          </div>

          <h3 className="mt-3 truncate text-lg font-bold text-slate-950">
            {lawyerCase.title}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {lawyerCase.caseNumber}
          </p>

        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-blue-200 group-hover:text-blue-600">
          <ChevronRight className="h-4 w-4" />
        </div>

      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
        {lawyerCase.description}
      </p>

      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:grid-cols-2">

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="truncate">
            {lawyerCase.court}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-slate-400" />
          <span className="truncate">
            {lawyerCase.clientName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          {lawyerCase.createdAt}
        </div>

      </div>

    </Link>
  );
}