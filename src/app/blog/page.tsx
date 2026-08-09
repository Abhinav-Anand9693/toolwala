import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Toolwala guides, productivity tips, AI workflows and practical tutorials.",
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      <Container>
        <section className="py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Toolwala Blog
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-950">
            Learn. Build. Get more done.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Practical guides, tool tutorials, AI workflows and
            productivity ideas.
          </p>

          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Articles coming soon
            </h2>

            <p className="mt-2 text-slate-500">
              We are preparing practical content for developers,
              students, professionals and businesses.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}