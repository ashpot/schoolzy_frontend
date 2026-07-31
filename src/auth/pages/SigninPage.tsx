import LoginForm from "../components/LoginForm";
import bgImage from "@/assets/login_image.webp";
import AuthNav from "@/shared/components/AuthNav";
import { motion } from "framer-motion";
import { School } from "lucide-react";
import { useTenantCheck } from "@/shared/hooks/useTenantCheck";
import { isTenantDomain } from "@/shared/utils/tenant";

const SigninPage = () => {
  const isTenant = isTenantDomain();
  const { data, isLoading, isError } = useTenantCheck();

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
          {isTenant && isLoading ? (
            <div className="w-full max-w-md bg-white rounded-2xl card-shadow p-8 text-center">
              <p className="text-body-small text-text-secondary">Checking school...</p>
            </div>
          ) : isTenant && isError ? (
            <div className="w-full max-w-md bg-white rounded-2xl card-shadow p-8 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex-center">
                <School size={28} className="text-danger" />
              </div>
              <h1 className="page-title">School Not Found</h1>
              <p className="text-body-small text-text-secondary">
                We couldn't find a school registered at this address. Please
                check the link your school provided, or contact your school
                administrator.
              </p>
            </div>
          ) : (
            <LoginForm tenant={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninPage;