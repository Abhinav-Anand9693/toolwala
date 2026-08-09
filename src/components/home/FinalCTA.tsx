import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

import Container from "@/components/layout/Container";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[-100px] h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-900/40">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your work deserves
            <span className="block text-blue-400">
              a better workspace.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Stop jumping between dozens of websites. Bring
            your everyday tools and AI workflows together with
            Toolwala.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Explore Tools
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3.5 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
            >
              Create Free Account
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Free to start
            </span>

            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              No installation
            </span>

            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Built for professionals
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}