import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Link } from "react-router";
import type { PricingPlan } from "../data/pricingPlans";

interface Props {
  plan: PricingPlan;
  index: number;
}

export default function PricingCard({ plan, index }: Props) {
  const { dark } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl px-7 py-8 xl:py-10 ${
        dark
          ? "bg-bg-dark xl:-translate-y-4 xl:py-12"
          : "bg-bg-main border border-border-line04"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-xl font-jakarta font-semibold ${dark ? "text-white" : "text-text-primary"}`}>
          {plan.name}
        </h3>
        {plan.popular && (
          <span className="rounded-full bg-white px-3 py-1 text-xs font-jakarta font-semibold text-brand-primary">
            Most Popular
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className={`text-4xl font-jakarta font-bold ${dark ? "text-white" : "text-text-primary"}`}>
          {plan.price}
        </span>
        <span className={`text-sm font-jakarta ${dark ? "text-text-inverse-muted" : "text-text-muted"}`}>
          {plan.period}
        </span>
      </div>

      {plan.note && (
        <p className="mt-2 text-sm font-jakarta text-text-muted">{plan.note}</p>
      )}

      <ul className={`flex flex-col gap-3.5 ${plan.note ? "mt-6" : "mt-7"}`}>
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                f.included ? "bg-brand-primary" : "bg-border-line03"
              }`}
            >
              {f.included ? (
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              ) : (
                <X className="h-3 w-3 text-white" strokeWidth={3} />
              )}
            </span>
            <span
              className={`text-sm font-jakarta ${
                f.included ? (dark ? "text-white" : "text-text-primary") : "text-text-muted"
              }`}
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      <Link to={plan.path}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`mt-8 w-full rounded-full py-3.5 text-sm font-jakarta font-semibold transition-colors ${
            dark
              ? "bg-white text-brand-primary hover:bg-bg-soft"
              : "border border-border-line01 text-brand-primary hover:bg-bg-soft"
          }`}
        >
          {plan.cta}
        </motion.button>
      </Link>
    </motion.div>
  );
}