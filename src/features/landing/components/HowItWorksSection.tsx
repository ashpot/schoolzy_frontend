import { motion } from "framer-motion";

const steps = [
  {
    badge: "Step 01",
    title: "Set up Your School",
    description:
      "Create your school profile, configure classes, subjects, and fee structures. Onboard your staff and import your student list in minutes.",
  },
  {
    badge: "Step 02",
    title: "Manage Operations",
    description:
      "Record attendance, collect fees, run CBT assessments and communicate with parents, all from your Schoolzy dashboard, every day.",
  },
  {
    badge: "Step 03",
    title: "Track Performance",
    description:
      "Generate results at the end of every term, analyze academic trends, review financials, and share reports with stakeholders with one click.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full bg-bg-dark py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-white/25 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-white">
            HOW IT WORKS
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-jakarta font-semibold leading-tight text-white">
            Up and Running
            <br />
            in <span className="text-brand-hover">3 Simple Steps</span>
          </h2>

          <p className="mt-4 max-w-xl text-base font-jakarta text-text-inverse-muted">
            No technical expertise required. Get your school live on the same
            day.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.badge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center rounded-2xl bg-white/5 px-7 py-10"
            >
              <span className="inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-sm font-jakarta font-semibold text-white">
                {step.badge}
              </span>

              <h3 className="mt-5 text-xl sm:text-2xl font-jakarta font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm font-jakarta text-text-inverse-muted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}