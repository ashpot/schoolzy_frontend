import { motion } from "framer-motion";
import ctaImage from "@/assets/landing/cta_01.webp";
import { Link } from "react-router";

export default function CtaSection() {
  return (
    <section className="w-full bg-bg-main px-6 py-16 md:py-20 lg:py-24" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-bg-dark min-h-115 lg:min-h-125"
      >
        {/* Image — absolutely positioned, does NOT affect card height */}
        <div className="hidden lg:block absolute bottom-0 right-0 h-full w-1/2 pointer-events-none">
          <img
            src={ctaImage}
            alt=""
            className="absolute bottom-0 right-0 h-full w-auto object-contain object-bottom-right grayscale"
            draggable={false}
          />
        </div>

        {/* Text — sits above image via z-index */}
        <div className="relative z-10 px-8 sm:px-12 py-12 lg:py-16 max-w-xl">
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
            <Link
              to="/signup"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-brand-primary px-7 py-3.5 text-sm font-jakarta font-semibold text-white hover:bg-brand-hover transition-colors"
              >
                Get Started
              </motion.button>
            </Link>

            <Link
              to="/signup"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-white px-7 py-3.5 text-sm font-jakarta font-semibold text-text-primary hover:bg-bg-soft transition-colors"
              >
                Request a Demo
              </motion.button>
            </Link>

          </div>
        </div>
      </motion.div>
    </section>
  );
}