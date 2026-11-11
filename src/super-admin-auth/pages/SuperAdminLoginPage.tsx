import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import AuthHeading from "../components/shared/AuthHeading";
import SocialLoginRow from "../components/shared/SocialLoginRow";
import LoginForm from "../components/login/LoginForm";

export default function SuperAdminLoginPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-10">
      <AuthHeading
        title="Login"
        subtitle="Manage schools, subscriptions, users and platform operations from one secure dashboard."
      />
      <LoginForm />
      <SocialLoginRow />
    </motion.div>
  );
}