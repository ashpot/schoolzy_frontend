import { motion } from "framer-motion";
import b_01 from "@/assets/landing/b_01.webp";
import b_02 from "@/assets/landing/b_02.webp";
import b_03 from "@/assets/landing/b_03.webp";

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
    image: b_01,
    imageAlt: "Student working at a computer in a library",
    imageSide: "right" as const,
    bg: "bg-bg-soft",
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
    image: b_02,
    imageAlt: "Teacher holding a book smiling",
    imageSide: "left" as const,
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
    image: b_03,
    imageAlt: "Parent helping child with schoolwork on a laptop",
    imageSide: "right" as const,
    bg: "bg-bg-soft",
  },
];
function Blobs({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${flip ? "scale-x-[-1]" : ""}`}
      viewBox="0 0 870 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* top-left large circle outline */}
      <circle cx="60" cy="80" r="80" stroke="hsla(214,32%,91%,1)" strokeWidth="1.5" />
      {/* top-right rounded square outline */}
      <rect x="680" y="20" width="120" height="120" rx="30" stroke="hsla(214,32%,91%,1)" strokeWidth="1.5" transform="rotate(8 740 80)" />
      {/* mid-right medium circle outline */}
      <circle cx="820" cy="300" r="55" stroke="hsla(214,32%,91%,1)" strokeWidth="1.5" />
      {/* mid-left small filled circle */}
      <circle cx="30" cy="360" r="22" fill="hsla(214,32%,91%,0.7)" />
      {/* bottom-left rounded square outline */}
      <rect x="60" y="460" width="100" height="100" rx="28" stroke="hsla(214,32%,91%,1)" strokeWidth="1.5" transform="rotate(-6 110 510)" />
      {/* bottom-right small circle */}
      <circle cx="750" cy="520" r="30" stroke="hsla(214,32%,91%,1)" strokeWidth="1.5" />
      {/* center-left pill */}
      <rect x="100" y="250" width="50" height="80" rx="25" stroke="hsla(214,32%,91%,1)" strokeWidth="1.5" />
    </svg>
  );
}

export default function BeneficiariesSection() {
  return (
      <section className="w-full overflow-hidden">
      {/* Header */}
      <div className="relative">
        <Blobs />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-20 md:pb-14">
          <span className="inline-flex items-center rounded-full border border-border-line03 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-text-muted01">
            BUILT FOR EVERYONE
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-jakarta font-semibold leading-tight text-text-primary">
            One System,
            <br />
            Multiple <span className="text-brand-primary">Beneficiaries</span>
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base font-jakarta text-text-secondary">
            Schoolzy isn&apos;t a tool for admins only. Every stakeholder gets
            what they need, where they need it.
          </p>
        </div>
      </div>

      {/* Rows */}
      {beneficiaries.map((item, i) => (
        <div key={item.number} className={`relative overflow-hidden ${item.bg}`}>
          <Blobs flip={i % 2 !== 0} />
          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${
                item.imageSide === "left" ? "md:grid-flow-dense" : ""
              }`}
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: item.imageSide === "right" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={item.imageSide === "left" ? "md:col-start-2" : ""}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary text-base font-jakarta font-semibold text-white">
                  {item.number}
                </span>

                <h3 className="mt-5 text-2xl sm:text-3xl font-jakarta font-bold text-text-primary">
                  {item.title}
                </h3>

                <ul className="mt-5 flex flex-col gap-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary" />
                      <span className="text-sm sm:text-base font-jakarta text-text-secondary leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: item.imageSide === "right" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={item.imageSide === "left" ? "md:col-start-1 md:row-start-1" : ""}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="aspect-4/3 w-full rounded-2xl object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}