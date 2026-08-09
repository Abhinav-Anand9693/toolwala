"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/layout/Container";

const faqs = [
  {
    question: "What is Toolwala?",
    answer:
      "Toolwala is a professional AI workspace that brings useful productivity, developer, business, education and AI tools into one place.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can use many of Toolwala's tools without an account. An account becomes useful when you want features such as saved history, favorites and personalized workflows.",
  },
  {
    question: "Are the tools free?",
    answer:
      "Many tools will be available for free. Some advanced AI-powered features may have usage limits or require a Pro plan.",
  },
  {
    question: "Are my files and data secure?",
    answer:
      "Security is a core part of Toolwala's design. We will minimize data retention, protect sensitive information and clearly communicate how each tool handles user data.",
  },
  {
    question: "Can I use Toolwala on mobile?",
    answer:
      "Yes. Toolwala is being designed responsively so that the core experience works across phones, tablets and desktops.",
  },
  {
    question: "Will more tools be added?",
    answer:
      "Yes. Toolwala's architecture is designed so new tools can be added without changing the entire platform.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(
      openIndex === index ? null : index
    );
  }

  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              FAQ
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Questions, answered.
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Everything you need to know about Toolwala.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-slate-950">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-200 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}