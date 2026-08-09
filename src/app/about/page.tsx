import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Toolwala and our mission to make useful digital and AI tools easier to discover and use.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Container>
        <section className="mx-auto max-w-3xl py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            About Toolwala
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-950">
            A better way to get work done.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Toolwala is being built as a professional workspace
            where people can discover useful tools, AI workflows
            and productivity solutions without jumping between
            dozens of different websites.
          </p>

          <div className="mt-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Our mission
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Make useful technology easier to discover,
                understand and use.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                What we are building
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Toolwala brings together productivity tools,
                developer utilities, business workflows,
                career tools and AI-powered experiences in one
                growing platform.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}