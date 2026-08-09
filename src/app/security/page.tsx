import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Toolwala collects, uses and protects information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <Container>
        <article className="mx-auto max-w-3xl py-24">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Legal
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-950">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 9, 2026
          </p>

          <div className="mt-12 space-y-10 text-slate-600">

            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                1. Overview
              </h2>

              <p className="mt-3 leading-7">
                This Privacy Policy explains how Toolwala
                handles information when you use our website
                and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                2. Information we collect
              </h2>

              <p className="mt-3 leading-7">
                The information collected depends on the
                features you use, your account settings and
                the services required to operate Toolwala.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                3. How we use information
              </h2>

              <p className="mt-3 leading-7">
                We may use information to provide our services,
                improve the product, maintain security and
                communicate with users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                4. Contact
              </h2>

              <p className="mt-3 leading-7">
                If you have questions about privacy, contact
                the Toolwala team.
              </p>
            </section>

          </div>
        </article>
      </Container>
    </main>
  );
}