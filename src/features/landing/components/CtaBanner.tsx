import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="w-full bg-bg-main px-6 py-16 md:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-bg-dark"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end">
          {/* Text */}
          <div className="px-8 sm:px-12 py-14 lg:py-20">
            <span className="inline-flex items-center rounded-full border border-white/25 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-white">
              JOIN 500+ SCHOOLS
            </span>

            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-[3.2rem] font-jakarta font-semibold leading-[1.1] text-white">
              Start Managing
              <br />
              Your School
              <br />
              <span className="text-brand-hover">Smarter Today</span>
            </h2>

            <p className="mt-6 max-w-md text-base font-jakarta text-text-inverse-muted">
              Join growing schools across Nigeria. Get Schoolzy running in
              your institution, request a demo today.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-brand-primary px-7 py-3.5 text-sm font-jakarta font-semibold text-white hover:bg-brand-hover transition-colors"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-white px-7 py-3.5 text-sm font-jakarta font-semibold text-text-primary hover:bg-bg-soft transition-colors"
              >
                Request a Demo
              </motion.button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80"
              alt="Smiling student with arms crossed"
              className="absolute inset-0 h-full w-full object-cover object-top grayscale"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}