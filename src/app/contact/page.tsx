import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Toolwala team for support, feedback, partnerships and business inquiries.",
};

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      <Container>
        <section className="mx-auto max-w-3xl py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Contact
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-950">
            We have love to hear from you.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have feedback, found a problem or want to work
            with Toolwala? Get in touch with our team.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">
              General inquiries
            </p>

            <a
              href="mailto:hello@toolwala.com"
              className="mt-2 block text-lg font-semibold text-blue-600 hover:text-blue-700"
            >
              hello@toolwala.com
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}