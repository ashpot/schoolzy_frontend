import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import bgImage from "@/assets/login_image.webp";
import AuthNav from "@/shared/components/AuthNav";
import EmailStep from "../components/forgot-password/EmailStep";
import OtpStep from "../components/forgot-password/OtpStep";
import NewPasswordStep from "../components/forgot-password/NewPasswordStep";
import SuccessStep from "../components/forgot-password/SuccessStep";

type Step = "email" | "otp" | "password" | "success";

const stepVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-bg-main/30" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AuthNav />
        </motion.div>

        <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
          <div className="w-full max-w-md bg-white rounded-2xl card-shadow p-8">
            <AnimatePresence mode="wait">
              {step === "email" && (
                <motion.div key="email" variants={stepVariants} initial="hidden" animate="show" exit="exit">
                  <EmailStep
                    onSuccess={(submittedEmail) => {
                      setEmail(submittedEmail);
                      setStep("otp");
                    }}
                  />
                </motion.div>
              )}

              {step === "otp" && (
                <motion.div key="otp" variants={stepVariants} initial="hidden" animate="show" exit="exit">
                  <OtpStep email={email} onSuccess={() => setStep("password")} />
                </motion.div>
              )}

              {step === "password" && (
                <motion.div key="password" variants={stepVariants} initial="hidden" animate="show" exit="exit">
                  <NewPasswordStep onSuccess={() => setStep("success")} />
                </motion.div>
              )}

              {step === "success" && (
                <motion.div key="success" variants={stepVariants} initial="hidden" animate="show" exit="exit">
                  <SuccessStep />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}