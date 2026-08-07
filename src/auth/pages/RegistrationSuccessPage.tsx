// src/auth/pages/RegistrationSuccessPage.tsx
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
import Button from "@/shared/ui/Button";
import type { RegisterSchoolResponse } from "../hooks/useSignup";

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const data = location.state as RegisterSchoolResponse["data"] | undefined;

  // If someone lands here directly without registering, bounce them back
  if (!data) {
    return <Navigate to="/auth/signup" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex-center px-4"
    >
      <div className="w-full max-w-md bg-white rounded-2xl card-shadow p-8 text-center space-y-5">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex-center">
          <CheckCircle2 size={32} className="text-success" />
        </div>

        <div className="space-y-2">
          <h1 className="page-title">You're All Set!</h1>
          <p className="text-body-small text-text-secondary">
            <span className="font-semibold text-text-primary">{data.school_name}</span> has
            been registered successfully. Your school's dashboard is ready.
          </p>
        </div>

        <a
          href={data.login_url}
          className="block w-full"
        >
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ExternalLink size={16} />}
            className="w-full rounded-2xl text-sm font-jakarta font-semibold py-3 md:py-4"
          >
            Go to {data.domain}
          </Button>
        </a>

        <p className="text-xs text-text-muted">
          Bookmark this link — it's your school's dedicated login page.
        </p>
      </div>
    </motion.div>
  );
};

export default RegistrationSuccessPage;