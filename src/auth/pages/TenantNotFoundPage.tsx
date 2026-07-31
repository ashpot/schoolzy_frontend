import { fadeUp } from "@/landing/animations/variants";
import { motion } from "framer-motion";
import { School } from "lucide-react";
export default function TenantNotFoundPage() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="min-h-screen flex-center bg-bg-input"
    >
      <div className="w-full max-w-md bg-white rounded-2xl card-shadow p-8 text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex-center">
          <School size={28} className="text-danger" />
        </div>
        <h1 className="page-title">School Not Found</h1>
        <p className="text-body-small text-text-secondary">
          We couldn't find a school registered at this address. Please check
          the link your school provided, or contact your school administrator.
        </p>
      </div>
    </motion.div>
  );
}