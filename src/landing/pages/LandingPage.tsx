import { motion } from "framer-motion";
import LandingNav from "../components/LandingNav";
import HeroSection from "../components/HeroSection";
import StatsStrip from "../components/StatsStrip";
import FeaturesSection from "../components/FeaturesSection";
import BeneficiariesSection from "../components/BeneficiariesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import CtaBanner from "../components/CtaBanner";
import LandingFooter from "../components/LandingFooter";
import { fadeIn } from "../animations/variants";
import { Navigate } from "react-router-dom";
import { isTenantDomain } from "@/shared/utils/tenant";


export default function LandingPage() {
  if (isTenantDomain()) {
    return <Navigate to="/auth/signin" replace />;
  }
  return (
   <motion.div variants={fadeIn} initial="hidden" animate="show">
      <LandingNav />
      <main>
        <HeroSection />
        <StatsStrip />
        <FeaturesSection />
        <BeneficiariesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaBanner />
      </main>
      <LandingFooter />
    </motion.div>
  );
}