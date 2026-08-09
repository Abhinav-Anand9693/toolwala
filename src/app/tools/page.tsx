import Container from "@/components/layout/Container";
import ToolCard from "@/components/tool/ToolCard";
import { tools } from "@/config/tools";

export const metadata = {
  title: "All Tools | Toolwala",
  description:
    "Explore Toolwala's professional AI and productivity tools.",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Tool Library
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Tools for getting work done
          </h1>

          <p className="mt-5 text-lg text-slate-600">
            Explore our growing collection of professional
            tools and AI-powered workflows.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}