import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities and work with the Toolwala team.",
};

export default function CareersPage() {
  return (
    <main className="bg-slate-50">
      <Container>
        <section className="mx-auto max-w-3xl py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Careers
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-950">
            Build the future of useful tools.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Toolwala is growing. Future opportunities will be
            listed here as the team expands.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl font-bold text-slate-950">
              No open positions right now
            </h2>

            <p className="mt-3 text-slate-600">
              Check back later for new opportunities.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}