"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Search,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

import { searchTools } from "@/lib/search";

const popularTasks = [
  "Create a resume",
  "Format JSON",
  "Create an invoice",
  "Generate lesson plan",
];

export default function Hero() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  function handleSearch() {
    const results = searchTools(query);

    if (results.length === 0) {
      return;
    }

    router.push(`/tool/${results[0].id}`);
  }

  function handlePopularTask(task: string) {
    setQuery(task);

    const results = searchTools(task);

    if (results.length > 0) {
      router.push(`/tool/${results[0].id}`);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <section className="relative overflow-hidden border-b bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="absolute right-[-150px] top-[200px] h-[300px] w-[300px] rounded-full bg-violet-100/40 blur-3xl" />

        <div className="absolute left-[-150px] top-[350px] h-[300px] w-[300px] rounded-full bg-cyan-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-4xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
          >
            <Sparkles className="h-4 w-4" />

            Your professional AI workspace

            <ArrowRight className="h-4 w-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
          >
            Get your work done

            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              with AI.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
          >
            Toolwala brings professional tools and AI workflows
            into one simple workspace. Tell us what you need to
            accomplish and we&apos;ll help you get it done.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-10 max-w-3xl"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60 transition-all duration-300 focus-within:border-blue-300 focus-within:shadow-2xl focus-within:shadow-blue-100">
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 sm:px-5 sm:py-4">
                <Search className="h-5 w-5 shrink-0 text-slate-400" />

                <input
                  type="text"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="What do you want to accomplish?"
                  className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:text-lg"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!query.trim()}
                  className="hidden shrink-0 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
                >
                  Find Tool
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="px-2 py-2 text-sm text-slate-500">
                Try:
              </span>

              {popularTasks.map((task) => (
                <button
                  key={task}
                  type="button"
                  onClick={() => handlePopularTask(task)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {task}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
            >
              Explore Tools
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-500" />
              Free to start
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-500" />
              No installation
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-500" />
              Fast & secure
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}