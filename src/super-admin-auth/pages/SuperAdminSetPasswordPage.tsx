import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import AuthHeading from "../components/shared/AuthHeading";
import SetPasswordForm from "../components/set-password/SetPasswordForm";

export default function SuperAdminSetPasswordPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-10">
      <AuthHeading
        title="Set new password"
        subtitle="Your previous password has been reset. Please set a new password for your account."
      />
      <SetPasswordForm />
    </motion.div>
  );
}