import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import AuthHeading from "../components/shared/AuthHeading";
import SocialLoginRow from "../components/shared/SocialLoginRow";
import ForgotPasswordForm from "../components/forgot-password/ForgotPasswordForm";

export default function SuperAdminForgotPasswordPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-10">
      <AuthHeading
        title="Forgot your password?"
        subtitle="Enter your email below to recover your password"
      />
      <ForgotPasswordForm />
      <SocialLoginRow />
    </motion.div>
  );
}