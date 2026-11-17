import { useId } from "react";
import { motion } from "framer-motion";
import Button from "@/shared/ui/Button";
import ModalShell from "./ModalShell";

export default function SchoolCreatedModal({ name, onClose }: { name: string; onClose: () => void }) {
  const titleId = useId();

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-sm">
      <div className="p-8 text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex-center mx-auto h-16 w-16 rounded-full bg-sa-green-icon"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
            />
          </svg>
        </motion.span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">School Created!</h2>
        <p className="mt-2 text-sm text-text-secondary">
          <strong className="font-semibold text-text-primary">{name}</strong> has been successfully added to the Schoolzy platform.
        </p>
        <Button type="button" variant="primary" className="mt-6 w-full" onClick={onClose}>Done</Button>
      </div>
    </ModalShell>
  );
}