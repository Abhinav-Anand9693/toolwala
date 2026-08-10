import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Tool } from "@/types/tool";

type Props = {
  tool: Tool;
};

export default function ToolCard({ tool }: Props) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60">

      {/* ========================================
          TOP
      ======================================== */}

      <div className="flex items-start justify-between gap-4">

        {/* Tool icon */}

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">

          <span className="text-lg font-bold">
            {tool.title.charAt(0)}
          </span>

        </div>

        {/* AI badge */}

        {tool.isAI && (
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
            <Sparkles className="h-3 w-3" />
            AI
          </span>
        )}

      </div>

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className="mt-6 flex-1">

        {/* Category */}

        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {tool.category}
        </span>

        {/* Title */}

        <h3 className="mt-2 text-xl font-bold text-slate-950">
          {tool.title}
        </h3>

        {/* Description */}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {tool.description}
        </p>

      </div>

      {/* ========================================
          OPEN TOOL
      ======================================== */}

      <Link
        href={`/tool/${tool.id}`}
        className="mt-6 inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700"
      >
        Open tool

        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>

    </article>
  );
}