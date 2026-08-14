"use client";

import Link from "next/link";

import { professions } from "@/config/professions";

export default function ProfessionGrid() {
  return (
    <section className="py-16">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10">

          <p className="text-sm font-semibold text-blue-600">
            Explore by profession
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            Tools built for your work
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            Choose your profession and discover tools designed around your workflow.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

          {professions.map((profession) => (

            <Link
              key={profession.id}
              href={`/profession/${profession.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="text-3xl">
                {profession.icon}
              </div>

              <h3 className="mt-4 font-bold text-slate-950">
                {profession.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Explore tools
              </p>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}