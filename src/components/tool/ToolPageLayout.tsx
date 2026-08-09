"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Tool } from "@/types/tool";
import Breadcrumb from "./Breadcrumb";
import ToolActions from "./ToolActions";

type Props = {
  tool: Tool;
  children: ReactNode;
};

export default function ToolPageLayout({
  tool,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <Breadcrumb
          profession={tool.profession}
          title={tool.title}
        />

        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div className="max-w-3xl">

            <div className="mb-4 flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {tool.category}
              </span>

              {tool.isAI && (
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  AI Powered
                </span>
              )}

            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {tool.title}
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              {tool.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-500">

              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                Fast processing
              </span>

              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Secure
              </span>

            </div>
          </div>

          <ToolActions />

        </div>

        <div className="mt-12">
          {children}
        </div>

        <div className="mt-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse all tools
          </Link>
        </div>

      </div>
    </main>
  );
}