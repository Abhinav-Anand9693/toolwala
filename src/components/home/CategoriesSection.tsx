import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { categories } from "@/config/categories";

export default function CategoriesSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-24">
      <Container>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
              <Sparkles className="h-4 w-4" />
              Explore by category
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Tools for every kind of work.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Whether you are coding, studying, building a
              business or creating content, Toolwala gives
              you the tools to get things done.
            </p>

          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all tools
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition group-hover:bg-blue-50">
                  {category.icon}
                </div>

                <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />

              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {category.description}
              </p>

            </Link>
          ))}

        </div>

      </Container>
    </section>
  );
}