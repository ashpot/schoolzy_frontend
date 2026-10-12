import { motion, useReducedMotion } from "framer-motion";
import WhatsAppIcon from "@/shared/lib/icons/WhatsAppIcon";

const WHATSAPP_NUMBER = "2348127870201";
const WHATSAPP_MESSAGE = "Hello Schoolzy, I'd like to know more about your school management system.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppFab() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Schoolzy support on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -14, 0, -7, 0] }
      }
      transition={{
        opacity: { delay: 1.5, duration: 0.4 },
        scale: { delay: 1.5, duration: 0.4 },
        y: { delay: 2, duration: 1.2, repeat: Infinity, repeatDelay: 3, ease: "easeOut" },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex items-center"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <span className="pointer-events-none mr-3 hidden sm:block whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-text-primary card-shadow opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
        Chat with us
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
        {!reduceMotion && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        )}
        <WhatsAppIcon className="relative" />
      </span>
    </motion.a>
  );
}