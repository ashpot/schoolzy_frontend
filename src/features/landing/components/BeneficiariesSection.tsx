import { motion } from "framer-motion";
import { Check } from "lucide-react";

const beneficiaries = [
  {
    number: "01",
    title: "School Administrators",
    points: [
      "Full visibility into revenue, attendance and academic progress.",
      "Run your school from any location.",
      "Control who accesses what across the entire platform.",
      "Communicate directly with staff and parents.",
    ],
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80",
    imageAlt: "School administrator working at a computer",
    imageSide: "right",
    bg: "bg-bg-main",
  },
  {
    number: "02",
    title: "Teachers & Finance Officers",
    points: [
      "Assign and track homework and holiday projects",
      "Upload scores, publish results and take attendance",
      "Design class timetables with built-in tools",
      "Process fees, generate receipts and keep daily records",
    ],
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=700&q=80",
    imageAlt: "Teacher holding a book in a classroom",
    imageSide: "left",
    bg: "bg-bg-main",
  },
  {
    number: "03",
    title: "Parents & Students",
    points: [
      "View results as soon as they are published",
      "Track attendance and assignment completion",
      "Access class timetables and online courses",
      "Stay notified of everything happening at school",
    ],
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=700&q=80",
    imageAlt: "Parent helping a child with schoolwork",
    imageSide: "right",
    bg: "bg-bg-soft",
  },
];

function BlobBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 800 400"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="60" cy="60" r="50" stroke="hsla(220,13%,91%,1)" strokeWidth="1.5" />
      <circle cx="650" cy="40" r="36" stroke="hsla(220,13%,91%,1)" strokeWidth="1.5" />
      <circle cx="540" cy="160" r="14" fill="hsla(220,13%,91%,0.6)" />
      <rect x="320" y="10" width="70" height="70" rx="20" stroke="hsla(220,13%,91%,1)" strokeWidth="1.5" transform="rotate(8 355 45)" />
      <rect x="700" y="180" width="90" height="90" rx="24" stroke="hsla(220,13%,91%,1)" strokeWidth="1.5" transform="rotate(-6 745 225)" />
    </svg>
  );
}

export default function BeneficiariesSection() {
  return (
    <section className="w-full bg-bg-soft">
      {/* Header */}
      <div className="relative overflow-hidden">
        <BlobBackdrop />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 md:pt-20 md:pb-16">
          <span className="inline-flex items-center rounded-full border border-border-line03 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-text-muted01">
            BUILT FOR EVERYONE
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-jakarta font-semibold leading-tight text-text-primary">
            One System,
            <br />
            Multiple <span className="text-brand-primary">Beneficiaries</span>
          </h2>

          <p className="mt-4 max-w-xl text-base font-jakarta text-text-secondary">
            Schoolzy isn&apos;t a tool for admins only. Every stakeholder gets
            what they need, where they need it.
          </p>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {beneficiaries.map((item, i) => (
          <div key={item.number} className={`relative overflow-hidden ${item.bg}`}>
            <BlobBackdrop />
            <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  item.imageSide === "left" ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: item.imageSide === "left" ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-sm font-jakarta font-semibold text-white">
                    {item.number}
                  </span>

                  <h3 className="mt-5 text-2xl sm:text-3xl font-jakarta font-semibold text-text-primary">
                    {item.title}
                  </h3>

                  <ul className="mt-6 flex flex-col gap-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                          <Check className="h-3 w-3 text-brand-primary" strokeWidth={3} />
                        </span>
                        <span className="text-sm sm:text-base font-jakarta text-text-secondary leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: item.imageSide === "left" ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {i < beneficiaries.length - 1 && (
              <div className="relative mx-auto max-w-7xl px-6">
                <div className="border-t border-border-line03" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}