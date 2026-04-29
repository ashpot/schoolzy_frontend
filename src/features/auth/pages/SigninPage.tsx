import LoginForm from "../components/LoginForm";
import bgImage from "@/assets/login_image.webp";
import AuthNav from "@/shared/components/AuthNav";
import { motion } from "framer-motion";

const SigninPage = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-bg-main/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Animated Nav */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AuthNav />
        </motion.div>

        <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;