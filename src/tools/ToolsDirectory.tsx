"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

import Container from "@/components/layout/Container";
import ToolCard from "@/components/tool/ToolCard";
import { tools } from "@/config/tools";

const categories = [
  "All",
  "Developer",
  "Career",
  "Business",
  "Education",
  "Productivity",
];

export default function ToolsDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [aiOnly, setAiOnly] = useState(false);
  const [sort, setSort] = useState("A-Z");

  const filteredTools = useMemo(() => {
    let result = tools.filter((tool) => {
      const search = query.toLowerCase().trim();

      const matchesSearch =
        !search ||
        tool.title.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search) ||
        tool.category.toLowerCase().includes(search) ||
        tool.profession.toLowerCase().includes(search);

      const matchesCategory =
        category === "All" ||
        tool.category === category;

      const matchesAI =
        !aiOnly || tool.isAI;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAI
      );
    });

    if (sort === "A-Z") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "Z-A") {
      result = [...result].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return result;
  }, [query, category, aiOnly, sort]);

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setAiOnly(false);
    setSort("A-Z");
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ========================================
          HERO
      ======================================== */}

      <section className="border-b border-slate-200 bg-white">

        <Container>

          <div className="py-20 sm:py-24">

            <div className="mx-auto max-w-3xl text-center">

              {/* Icon */}

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Wrench className="h-7 w-7" />
              </div>

              {/* Heading */}

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Explore all tools
              </h1>

              {/* Description */}

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Find powerful tools for development,
                career, business, education and everyday
                productivity.
              </p>

              {/* Search */}

              <div className="relative mx-auto mt-8 max-w-2xl">

                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search tools..."
                  aria-label="Search tools"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

              </div>

            </div>

          </div>

        </Container>

      </section>

      {/* ========================================
          DIRECTORY
      ======================================== */}

      <section className="py-12 sm:py-16">

        <Container>

          {/* ====================================
              FILTER BAR
          ==================================== */}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Categories */}

            <div className="flex flex-wrap items-center gap-2">

              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    category === item
                      ? "bg-slate-950 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

            {/* Right controls */}

            <div className="flex flex-wrap items-center gap-3">

              {/* AI filter */}

              <button
                type="button"
                onClick={() => setAiOnly(!aiOnly)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  aiOnly
                    ? "border-violet-200 bg-violet-50 text-violet-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <Sparkles className="h-4 w-4" />

                AI Tools
              </button>

              {/* Sort */}

              <div className="relative">

                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                  aria-label="Sort tools"
                  className="h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="A-Z">
                    A-Z
                  </option>

                  <option value="Z-A">
                    Z-A
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* ====================================
              RESULT HEADER
          ==================================== */}

          <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-950">
                All tools
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredTools.length}{" "}
                {filteredTools.length === 1
                  ? "tool"
                  : "tools"}{" "}
                available
              </p>

            </div>

            {(query ||
              category !== "All" ||
              aiOnly) && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:self-auto"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}

          </div>

          {/* ====================================
              TOOL CARDS
          ==================================== */}

          {filteredTools.length > 0 ? (

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                />
              ))}

            </div>

          ) : (

            /* ==================================
               EMPTY STATE
            ================================== */

            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                No tools found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We could not find any tools matching your
                search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Clear filters
              </button>

            </div>

          )}

        </Container>

      </section>

    </main>
  );
}