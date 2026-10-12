import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useOnboarding } from "../hooks/useOnboarding";
import { getActiveStepIndex, getStepStatus } from "../utils/onboardingUtils";
import HelpPanel from "../components/onboarding-page/HelpPanel";
import OnboardingProgress from "../components/onboarding-page/OnboardingProgress";
import OnboardingState from "../components/onboarding-page/OnboardingState";
import StepCard from "../components/onboarding-page/StepCard";

export default function OnboardingPage() {
  const { data, isLoading, isError, refetch } = useOnboarding();

  if (isLoading || isError || !data) {
    return <OnboardingState isError={isError} onRetry={refetch} />;
  }
  if (data.onboarding.completed) return <Navigate to="/admin-dashboard" replace />;

  const { steps, progress } = data.onboarding;
  const activeIndex = getActiveStepIndex(steps);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] items-start"
    >
      <section>
        <OnboardingProgress
          percentage={progress.percentage}
          completed={progress.completed_items}
          total={progress.total_items}
          score={data.health_score}
          status={data.status}
        />
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mt-6 space-y-4">
          {steps.map((step, i) => (
            <StepCard key={step.slug} step={step} status={getStepStatus(i, activeIndex)} />
          ))}
        </motion.div>
      </section>
      <HelpPanel recommendations={data.recommendations} />
    </motion.div>
  );
}