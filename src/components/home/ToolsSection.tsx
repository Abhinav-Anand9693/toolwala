"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Code2,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  Wrench,
} from "lucide-react";

import Link from "next/link";
import { tools } from "@/config/tools";
import Container from "@/components/layout/Container";

const categories = [
  {
    id: "all",
    label: "All Tools",
    icon: Wrench,
  },
  {
    id: "AI",
    label: "AI",
    icon: Sparkles,
  },
  {
    id: "Developer",
    label: "Developer",
    icon: Code2,
  },
  {
    id: "Business",
    label: "Business",
    icon: BriefcaseBusiness,
  },
  {
    id: "Education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    id: "Career",
    label: "Career",
    icon: FileText,
  },
];

export default function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = useMemo(() => {
    if (activeCategory === "all") {
      return tools;
    }

    if (activeCategory === "AI") {
      return tools.filter((tool) => tool.isAI);
    }

    return tools.filter(
      (tool) => tool.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section
      id="tools"
      className="border-t bg-slate-50/70 py-24"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            Professional toolkit
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Everything you need to
            <span className="block text-blue-600">
              get work done.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Discover powerful tools organized around the work
            you actually do.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const active =
              activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setActiveCategory(category.id)
                }
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-slate-950 text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Tools */}
        {filteredTools.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.slice(0, 8).map((tool) => (
              <Link
                key={tool.id}
                href={`/tool/${tool.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    {tool.isAI ? (
                      <Sparkles className="h-5 w-5" />
                    ) : (
                      <Wrench className="h-5 w-5" />
                    )}
                  </div>

                  {tool.isAI && (
                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                      AI
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {tool.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {tool.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {tool.category}
                  </span>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-transform group-hover:translate-x-1">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Wrench className="mx-auto h-10 w-10 text-slate-400" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No tools available yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              We&apos;re adding more tools to this category.
            </p>
          </div>
        )}

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            Explore all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}