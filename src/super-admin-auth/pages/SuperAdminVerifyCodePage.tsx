import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import AuthHeading from "../components/shared/AuthHeading";
import VerifyCodeForm from "../components/verify-code/VerifyCodeForm";

export default function SuperAdminVerifyCodePage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-10">
      <AuthHeading title="Verify code" subtitle="An authentication code has been sent to your email." />
      <VerifyCodeForm />
    </motion.div>
  );
}