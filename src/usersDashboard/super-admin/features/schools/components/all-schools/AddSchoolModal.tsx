import { useId, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import { createSchoolSchema, type CreateSchoolInput, type CreateSchoolValues } from "../../schemas";
import { stepVariants } from "../../animations/variants";
import { useCreateSchool } from "../../hooks/useSchools";
import { CREATE_SCHOOL_DEFAULTS, STEP_FIELDS, WIZARD_STEPS } from "../../utils/constants";
import ModalShell from "./ModalShell";
import WizardStepper from "./WizardStepper";
import SchoolInfoStep from "./SchoolInfoStep";
import AdministratorStep from "./AdministratorStep";
import SubscriptionStep from "./SubscriptionStep";

const LAST = WIZARD_STEPS.length - 1;

interface AddSchoolModalProps {
  onClose: () => void;
  onCreated: (schoolName: string) => void;
}

export default function AddSchoolModal({ onClose, onCreated }: AddSchoolModalProps) {
  const titleId = useId();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Three type arguments: what the form holds, context, and what validation outputs.
  const methods = useForm<CreateSchoolInput, unknown, CreateSchoolValues>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: CREATE_SCHOOL_DEFAULTS,
    mode: "onTouched",
  });
  const mutation = useCreateSchool();

  const goNext = async () => {
    if (await methods.trigger(STEP_FIELDS[step])) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step === 0) return onClose();
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const onSubmit = (values: CreateSchoolValues) => {
    mutation.mutate(values, { onSuccess: (school) => onCreated(school.name) });
  };

  // Pressing Enter on steps 1–2 must move forward, not submit the whole form early.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (step < LAST) {
      e.preventDefault();
      void goNext();
      return;
    }
    return methods.handleSubmit(onSubmit)(e);
  };

  const busy = mutation.isPending;

  return (
    // Backdrop click is disabled so three steps of input can't be lost by accident.
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-2xl" closeOnBackdrop={false}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="font-jakarta text-2xl font-semibold text-text-primary">Add New School</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Step {step + 1} of {WIZARD_STEPS.length} — {WIZARD_STEPS[step].label}
            </p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6"><WizardStepper current={step} /></div>

        <FormProvider {...methods}>
          <form onSubmit={handleFormSubmit} noValidate className="mt-6">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {step === 0 && <SchoolInfoStep isLoading={busy} />}
                  {step === 1 && <AdministratorStep isLoading={busy} />}
                  {step === 2 && <SubscriptionStep isLoading={busy} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {mutation.isError && (
              <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
                {mutation.error.message}
              </p>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" onClick={goBack} disabled={busy}>
                {step === 0 ? "Cancel" : "Back"}
              </Button>
              {step < LAST ? (
                <Button type="button" variant="primary" onClick={goNext}>Continue</Button>
              ) : (
                <SubmitButton label="Create School" isLoading={busy} />
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </ModalShell>
  );
}