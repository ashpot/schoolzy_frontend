import { motion } from "framer-motion";
import {
  Settings,
  MonitorPlay,
  CreditCard,
  BarChart3,
  FileText,
  CalendarClock,
} from "lucide-react";

const features = [
  {
    icon: Settings,
    title: "Structural Management",
    description:
      "Create and manage sessions, terms, classes, class groups and subjects. Your entire school structure in one view.",
  },
  {
    icon: MonitorPlay,
    title: "E-Learning & CBT",
    description:
      "Share lesson materials, stream videos, manage curriculum and run full computer-based tests, all within the platform.",
  },
  {
    icon: CreditCard,
    title: "Online Registration & Payments",
    description:
      "Accept payments, issue receipts, and manage student, parent and teacher data, without paperwork or back-and-forth.",
  },
  {
    icon: BarChart3,
    title: "Daily Accounting",
    description:
      "Real-time income and expense tracking; daily, weekly, and quarterly. See your financial position without calling anyone.",
  },
  {
    icon: FileText,
    title: "Online Results",
    description:
      "Publish results once, parents access them immediately from anywhere. No printing, no waiting, no repeated calls to the office.",
  },
  {
    icon: CalendarClock,
    title: "Events & Notifications",
    description:
      "Announce events, share updates and get real-time feedback from staff, students, and parents in seconds.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-bg-main py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 mb-12 md:mb-16">
          <div>
            <span className="inline-flex items-center rounded-full border border-border-line03 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-text-muted01">
              EVERYTHING YOU NEED
            </span>
          </div>

          <div className="md:text-right md:max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-jakarta font-semibold leading-tight text-text-primary">
              All the tools to run a modern school
            </h2>
            <p className="mt-3 text-xl sm:text-2xl lg:text-3xl font-jakarta font-medium leading-snug text-text-muted">
              From classrooms to finance and CBT examinations, Schoolzy has
              every module your school needs.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="rounded-2xl border border-border-line04 px-7 py-9 hover:card-shadow transition-shadow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary">
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-lg font-jakarta font-semibold text-text-primary">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm font-jakarta text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}