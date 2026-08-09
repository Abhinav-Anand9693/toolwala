import Container from "@/components/layout/Container";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For exploring Toolwala.",
    features: [
      "Access to free tools",
      "Basic tool usage",
      "No credit card required",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    description: "For professionals who use Toolwala regularly.",
    features: [
      "Unlimited free tools",
      "AI tool credits",
      "Priority processing",
      "Tool history",
      "Premium workflows",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "Custom",
    description: "For teams and growing businesses.",
    features: [
      "Everything in Pro",
      "Team workspace",
      "Higher AI limits",
      "Priority support",
      "Custom workflows",
    ],
    popular: false,
  },
];

export const metadata = {
  title: "Pricing | Toolwala",
  description:
    "Simple pricing for Toolwala's professional AI workspace.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Pricing
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
            Start free. Upgrade when you need more.
          </h1>

          <p className="mt-5 text-lg text-slate-600">
            Use the tools you need today and upgrade when
            your workflow grows.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border bg-white p-8 shadow-sm ${
                plan.popular
                  ? "border-blue-500 shadow-xl shadow-blue-100"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              <h2 className="text-xl font-bold text-slate-950">
                {plan.name}
              </h2>

              <p className="mt-3 min-h-12 text-sm text-slate-500">
                {plan.description}
              </p>

              <div className="mt-7">
                <span className="text-4xl font-bold text-slate-950">
                  {plan.price}
                </span>

                {plan.name === "Pro" && (
                  <span className="text-sm text-slate-500">
                    /month
                  </span>
                )}
              </div>

              <button
                type="button"
                className={`mt-8 w-full rounded-xl px-5 py-3 font-semibold transition ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plan.name === "Business"
                  ? "Contact us"
                  : plan.name === "Pro"
                    ? "Start Pro"
                    : "Get started"}
              </button>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-3 text-sm text-slate-600"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}