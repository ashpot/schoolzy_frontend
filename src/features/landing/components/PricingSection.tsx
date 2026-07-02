import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Link } from "react-router";

const plans = [
  {
    name: "Basic",
    price: "₦25,000",
    period: "/month",
    note: "Up to 200 students.",
    popular: false,
    dark: false,
    path: "/signup",
    features: [
      { label: "Student & staff management", included: true },
      { label: "Attendance tracking", included: true },
      { label: "Results & grading", included: true },
      { label: "Fee payment tracking", included: true },
      { label: "CBT module", included: false },
      { label: "Parent portal", included: false },
    ],
  },
  {
    name: "Standard",
    price: "₦55,000",
    period: "/month",
    note: null,
    popular: true,
    dark: true,
    path: "/signup",
    features: [
      { label: "All Basic features", included: true },
      { label: "Up to 500 students", included: true },
      { label: "CBT module (unlimited tests)", included: true },
      { label: "Parent portal access", included: true },
      { label: "Expense & finance tracking", included: true },
      { label: "SMS & email notifications", included: true },
      { label: "Priority support", included: true },
    ],
  },
  {
    name: "Premium",
    price: "₦95,000",
    period: "/month",
    note: null,
    popular: false,
    dark: false,
    path: "/signup",
    features: [
      { label: "All Standard features", included: true },
      { label: "Unlimited students", included: true },
      { label: "Multi-branch management", included: true },
      { label: "Custom domain", included: true },
      { label: "API access & integrations", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "24/7 phone support", included: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="w-full bg-bg-main py-16 md:py-20 lg:py-28" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-border-line03 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-text-muted01">
            PRICING
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-jakarta font-semibold text-text-primary">
            Simple, Transparent <span className="text-brand-primary">Pricing</span>
          </h2>

          <p className="mt-4 max-w-xl text-base font-jakarta text-text-secondary">
            All plans include full access to core features. Scale up as your
            school grows.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl px-7 py-8 lg:py-10 ${
                plan.dark
                  ? "bg-bg-dark lg:-translate-y-4 lg:py-12"
                  : "bg-bg-main border border-border-line04"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`text-xl font-jakarta font-semibold ${
                    plan.dark ? "text-white" : "text-text-primary"
                  }`}
                >
                  {plan.name}
                </h3>
                {plan.popular && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-jakarta font-semibold text-brand-primary">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-jakarta font-bold ${
                    plan.dark ? "text-white" : "text-text-primary"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm font-jakarta ${
                    plan.dark ? "text-text-inverse-muted" : "text-text-muted"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              {plan.note && (
                <p className="mt-2 text-sm font-jakarta text-text-muted">
                  {plan.note}
                </p>
              )}

              <ul className={`flex flex-col gap-3.5 ${plan.note ? "mt-6" : "mt-7"}`}>
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded ${
                        feature.included
                          ? "bg-brand-primary"
                          : "bg-border-line03"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      ) : (
                        <X className="h-3 w-3 text-white" strokeWidth={3} />
                      )}
                    </span>
                    <span
                      className={`text-sm font-jakarta ${
                        feature.included
                          ? plan.dark
                            ? "text-white"
                            : "text-text-primary"
                          : "text-text-muted"
                      }`}
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to={plan.path}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 w-full rounded-full py-3.5 text-sm font-jakarta font-semibold transition-colors ${
                    plan.dark
                      ? "bg-white text-brand-primary hover:bg-bg-soft"
                      : "border border-border-line01 text-brand-primary hover:bg-bg-soft"
                  }`}
                >
                  Get Started
                </motion.button>
              </Link>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}