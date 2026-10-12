import { pricingPlans } from "../data/pricingPlans";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  return (
    <section className="w-full bg-bg-main py-16 md:py-20 lg:py-28" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}