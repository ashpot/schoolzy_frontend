import { motion } from "framer-motion";
import hero_image from "@/assets/hero_image.webp";
import avatar_01 from "@/assets/landing/avatar/avatar_01.webp";
import avatar_02 from "@/assets/landing/avatar/avatar_02.webp";
import avatar_03 from "@/assets/landing/avatar/avatar_03.webp";
import { Link } from "react-router";


const avatars = [
  avatar_01,
  avatar_02,
  avatar_03,
];

export default function HeroSection() {
  return (
    <section className="w-full bg-bg-main">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            {/* Eyebrow badge */}
            <span className="inline-flex items-center rounded-full border border-border-line03 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-text-muted01">
              TRUSTED BY 500+ SCHOOLS ACROSS NIGERIA
            </span>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-jakarta font-semibold leading-[1.1] tracking-tight text-text-primary">
              Manage your entire school from one platform
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-md text-base sm:text-lg font-jakarta text-text-secondary">
              Leading school management web portal for Africa with full
              support for e-learning.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/signin"
              >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-brand-primary px-7 py-3.5 text-sm font-jakarta font-semibold text-white shadow-sm hover:bg-brand-hover transition-colors"
              >
                Get Started
              </motion.button>
              </Link>
              <Link
                to="/signin"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-border-line01 px-7 py-3.5 text-sm font-jakarta font-semibold text-text-primary hover:bg-bg-soft transition-colors"
                >
                  Request a Demo
                </motion.button>
              </Link>

            </div>

            {/* Community card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative mt-12 w-full max-w-md overflow-hidden rounded-2xl bg-bg-dark px-6 py-6"
            >
              {/* faint logo watermark, bottom right */}
              <div className="pointer-events-none absolute -bottom-4 -right-2 h-24 w-24 opacity-10">
                <svg viewBox="0 0 100 100" fill="none">
                  <path d="M50 0L100 100H0L50 0Z" fill="white" />
                </svg>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {avatars.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-10 w-10 rounded-full border-2 border-bg-dark object-cover"
                      style={{ marginLeft: i === 0 ? 0 : -12 }}
                    />
                  ))}
                  <span className="-ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg-dark bg-brand-primary text-xs font-jakarta font-semibold text-white">
                    50+
                  </span>
                </div>
                <p className="text-sm font-jakarta text-text-inverse-muted text-right leading-snug">
                  Trusted by schools
                  <br />
                  across Nigeria
                </p>
              </div>

              <p className="relative z-10 mt-4 text-2xl font-jakarta font-semibold text-white">
                Join the <span className="text-brand-hover">Community</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - image */}
          <motion.div
            className="hidden lg:flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
          <img
            src={hero_image}
            alt="student writing in a notebook"
            loading="eager"
            className="w-full max-w-125 xl:max-w-140.5 rounded-2xl md:rounded-3xl object-cover"
          />
        </motion.div>
        </div>
      </div>
    </section>
  );
}