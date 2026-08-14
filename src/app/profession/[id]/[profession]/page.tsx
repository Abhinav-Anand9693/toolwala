import Link from "next/link";
import { notFound } from "next/navigation";

import { professions } from "@/config/professions";
import { tools } from "@/config/tools";

type Props = {
  params: Promise<{
    profession: string;
  }>;
};

export default async function ProfessionPage({
  params,
}: Props) {
  const { profession } = await params;

  const currentProfession =
    professions.find(
      (item) =>
        item.id === profession
    );

  if (!currentProfession) {
    notFound();
  }

  const professionTools =
    tools.filter(
      (tool) =>
        tool.profession === profession
    );

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="text-5xl">
            {currentProfession.icon}
          </div>

          <h1 className="mt-5 text-4xl font-bold text-slate-950">
            {currentProfession.title} Tools
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Professional tools designed to help you work faster and more efficiently.
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {professionTools.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <h2 className="font-bold text-slate-950">
              Tools coming soon
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              We are building more tools for this profession.
            </p>

          </div>

        ) : (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {professionTools.map(
              (tool) => (

                <Link
                  key={tool.id}
                  href={`/tool/${tool.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >

                  <div className="flex items-start justify-between">

                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {tool.category}
                    </span>

                    {tool.isAI && (
                      <span className="rounded-lg bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                        AI
                      </span>
                    )}

                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-blue-600">
                    {tool.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {tool.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold text-blue-600">
                    Open Tool →
                  </div>

                </Link>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}