import { motion } from "framer-motion";
import stats_image_01 from "@/assets/landing/stats_image_01.webp";
import stats_image_02 from "@/assets/landing/stats_image_02.webp";
import stats_image_03 from "@/assets/landing/stats_image_03.webp";

const cellVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const mobileStats = [
  { value: "5,430", label: "Students Managed" },
  { value: "10+", label: "Schools Onboarded" },
  { value: "2X", label: "Awards Won" },
  { value: "100%", label: "Web-based" },
];

export default function StatsStrip() {
  return (
    <section className="w-full bg-bg-main py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center rounded-full border border-border-line03 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-text-muted01">
            BY THE NUMBERS
          </span>
        </div>
        <div className="md:hidden grid grid-cols-2 divide-x divide-y divide-border-line03 border border-border-line03 rounded-2xl overflow-hidden">
          {mobileStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={cellVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center"
            >
              <p className="text-4xl font-jakarta font-semibold text-text-primary">
                {stat.value}
              </p>
              <p className="text-sm font-jakarta text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:grid grid-cols-3">
          {/* Row 1 */}
          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 px-6 py-8 border-border-line03 border-b"
          >
            <img
              src={stats_image_01}
              alt="Students in uniform"
              className="w-[70%] rounded-2xl object-cover"
            />
          </motion.div>

          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3 px-6 py-8 border-border-line03 border-b border-x"
          >
            <p className="text-base font-jakarta text-text-secondary">Students Managed</p>
            <p className="text-5xl lg:text-6xl font-jakarta font-semibold text-text-primary">
              5,430
            </p>
          </motion.div>

          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center px-6 py-8 text-center border-border-line03 border-b"
          >
            <p className="text-base font-jakarta text-text-secondary leading-relaxed">
              Setup in under 24 hours.
              <br />
              100% web-based.
            </p>
          </motion.div>

          {/* Row 2 */}
          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="px-6 py-8 border-border-line03 border-b"
          />

          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center px-6 py-8 border-border-line03 border-b border-x"
          >
            <img
              src={stats_image_02}
              alt="Teacher with students in a library"
              className="h-44 w-full rounded-2xl object-cover"
            />
          </motion.div>

          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-end justify-center gap-3 px-6 py-8 text-right border-border-line03 border-b"
          >
            <p className="text-base font-jakarta text-text-secondary">Awards Won</p>
            <p className="text-5xl lg:text-6xl font-jakarta font-semibold text-text-primary">
              2
            </p>
          </motion.div>

          {/* Row 3 */}
          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 px-6 py-8"
          >
            <p className="text-base font-jakarta text-text-secondary">Schools Onboarded</p>
            <p className="text-5xl lg:text-6xl font-jakarta font-semibold text-text-primary">
              10+
            </p>
          </motion.div>

          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center px-6 py-8 border-border-line03 border-x"
          >
            <p className="text-base font-jakarta text-text-secondary">
              Built for African schools of every size.
            </p>
          </motion.div>

          <motion.div
            variants={cellVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-end px-6 py-8"
          >
            <img
              src={stats_image_03}
              alt="Student in classroom"
              className="h-40 w-40 rounded-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}