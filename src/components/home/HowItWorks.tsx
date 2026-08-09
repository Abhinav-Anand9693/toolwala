import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Container from "@/components/layout/Container";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell us what you need",
    description:
      "Describe your task in simple language. You don't need to know which tool to use.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Toolwala finds the right solution",
    description:
      "We match your task with the most useful tool or AI-powered workflow.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Get your work done",
    description:
      "Use the tool, download your result, and continue with your work.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            How Toolwala works
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Stop searching for tools.
            <span className="block text-blue-600">
              Start getting work done.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Toolwala is designed around your task—not around
            complicated tool categories.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-4xl font-bold text-slate-200 transition-colors group-hover:text-blue-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}