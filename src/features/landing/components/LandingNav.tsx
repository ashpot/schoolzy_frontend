import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import brand_logo from "@/assets/brand/schoolzy_brand_name.svg";
import { Link } from "react-router";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-main/95 backdrop-blur-sm border-b border-border-line03" id="back-to-top">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <div>
            <img src={brand_logo} alt="schoolzy logo" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-jakarta font-medium text-text-nav hover:text-brand-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/signin"
              className="text-sm font-jakarta font-medium text-text-nav hover:text-brand-primary transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              to="/signin"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-jakarta font-semibold text-white hover:bg-brand-hover transition-colors"
              >
                Get Started
              </motion.button>
            </Link>

          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center text-text-primary"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border-line03 bg-bg-main"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-jakarta font-medium text-text-nav"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="text-sm font-jakarta font-medium text-text-nav"
              >
                Request a Demo
              </Link>
              <Link
                to="/signin"
              >
                <button className="mt-2 rounded-full bg-brand-primary px-6 py-2.5 text-sm font-jakarta font-semibold text-white hover:bg-brand-hover transition-colors">
                  Get Started
                </button>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}