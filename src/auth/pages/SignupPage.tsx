// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import AuthNav from "@/shared/components/AuthNav";
// import Sponsor from "@/shared/ui/Sponsor";
// import AdministratorDetailsStep from "../components/AdministratorDetailsStep";
// import SchoolDetailsStep from "../components/SchoolDetailsStep";
// import { slideVariants } from "../lib/animations/stepAnimations";
// import type {
//   AdministratorDetailsFormData,
//   SchoolDetailsFormData,
//   SignupFormData,
// } from "../schema/signupSchema";
// import signupImage from "@/assets/signup_image.webp";

// type Step = "admin" | "school";

// const SignupPage = (): React.ReactElement => {
//   const navigate = useNavigate();
//   const [[step, direction], setStep] = useState<[Step, number]>(["admin", 0]);
//   const [adminData, setAdminData] = useState<AdministratorDetailsFormData | null>(null);

//   const mutation = useMutation({
//     mutationFn: async (data: SignupFormData) => {
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...data,
//           schoolSize: Number(data.schoolSize),
//         }),
//       });
//       if (!response.ok) throw new Error("Registration failed");
//       return response.json();
//     },
//     onSuccess: () => {
//       navigate("/dashboard");
//     },
//   });

//   const handleAdminNext = (data: AdministratorDetailsFormData) => {
//     setAdminData(data);
//     setStep(["school", 1]);
//   };

//   const handleSchoolSubmit = (data: SchoolDetailsFormData) => {
//     if (!adminData) return;
//     const combinedData: SignupFormData = {
//       ...adminData,
//       ...data,
//     };
//     mutation.mutate(combinedData);
//   };

//   const handleBack = () => {
//     setStep(["admin", -1]);
//   };

//   const currentStep = step;

//   return (
//     <section className="relative min-h-screen">
//       <section className="relative z-10">
//         <AuthNav showBackButton backRoute="/" backButtonText="Go Back"/>
//       </section>

//       {/* signup layout [form + image] */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-20 my-4 md:my-8 px-4 md:px-6 lg:px-8">

//         {/* Left: Form */}
//         <div className="bg-bg-main order-2 lg:order-1">
//           {/* progress bar */}
//           <div className="mb-5 flex gap-4">
//             <div
//               className={`w-full h-2 rounded-full transition-colors duration-300 ${
//                 currentStep === "admin" ? "bg-brand-primary" : "bg-brand-primary"
//               }`}
//             />
//             <div
//               className={`w-full h-2 rounded-full transition-colors duration-300 ${
//                 currentStep === "school" ? "bg-brand-primary" : "bg-border-line02"
//               }`}
//             />
//           </div>

//           {/* text */}
//           <section className="space-y-6 md:space-y-10">
//             <div className="px-0 md:px-6 lg:px-10">
//               <h1 className="text-2xl md:text-[28px] font-semibold font-jakarta text-text-primary text-center leading-tight md:leading-loose">
//                 Set Up Your School
//               </h1>
//               <p className="text-sm md:text-base text-center text-text-muted mt-2 md:mt-0">
//                 {currentStep === "admin"
//                   ? "Let's get your administrator account created first."
//                   : "Now tell us about your school."}
//               </p>
//             </div>

//             {/* Animated step container */}
//             <div className="relative overflow-hidden min-h-100 md:min-h-112.5">
//               <AnimatePresence custom={direction}>
//                 <motion.div
//                   key={currentStep}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   className="w-full"
//                 >
//                   {currentStep === "admin" && (
//                     <AdministratorDetailsStep
//                       onNext={handleAdminNext}
//                       defaultValues={adminData || undefined}
//                     />
//                   )}

//                   {currentStep === "school" && (
//                     <SchoolDetailsStep
//                       onSubmit={handleSchoolSubmit}
//                       onBack={handleBack}
//                       isLoading={mutation.isPending}
//                     />
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             <Sponsor />
//           </section>
//         </div>

//         {/* Right: Image – hidden on mobile */}
//         <div className="hidden lg:flex items-center justify-center order-1 lg:order-2">
//           <img
//             src={signupImage}
//             alt="signup image"
//             className="w-full max-w-125 xl:max-w-140.5 rounded-2xl md:rounded-3xl object-cover"
//           />
//         </div>
//       </section>

//       {/* Global error toast */}
//       {mutation.isError && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="fixed bottom-5 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 bg-red-50 text-danger px-4 py-3 rounded-lg border border-red-200 text-sm text-center md:text-left z-50"
//         >
//           {(mutation.error as Error)?.message ||
//             "Something went wrong. Please try again."}
//         </motion.div>
//       )}
//     </section>
//   );
// };

// export default SignupPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AuthNav from "@/shared/components/AuthNav";
import Sponsor from "@/shared/ui/Sponsor";
import AdministratorDetailsStep from "../components/AdministratorDetailsStep";
import SchoolDetailsStep from "../components/SchoolDetailsStep";
import { slideVariants } from "../lib/animations/stepAnimations";
import { useSignup } from "../hooks/useSignup";
import type {
  AdministratorDetailsFormData,
  SchoolDetailsFormData,
  SignupFormData,
} from "../schema/signupSchema";
import signupImage from "@/assets/signup_image.webp";

type Step = "admin" | "school";

const SignupPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [[step, direction], setStep] = useState<[Step, number]>(["admin", 0]);
  const [adminData, setAdminData] = useState<AdministratorDetailsFormData | null>(null);

  const mutation = useSignup();

  const handleAdminNext = (data: AdministratorDetailsFormData) => {
    setAdminData(data);
    setStep(["school", 1]);
  };

  const handleSchoolSubmit = (data: SchoolDetailsFormData) => {
    if (!adminData) return;
    const combinedData: SignupFormData = {
      ...adminData,
      ...data,
    };
    mutation.mutate(combinedData, {
      onSuccess: (response) => {
        navigate("/auth/registration-success", { state: response.data });
      },
    });
  };

  const handleBack = () => {
    setStep(["admin", -1]);
  };

  const currentStep = step;

  return (
    <section className="relative min-h-screen">
      <section className="relative z-10">
        <AuthNav showBackButton backRoute="/" backButtonText="Go Back"/>
      </section>

      {/* signup layout [form + image] */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-20 my-4 md:my-8 px-4 md:px-6 lg:px-8">

        {/* Left: Form */}
        <div className="bg-bg-main order-2 lg:order-1">
          {/* progress bar */}
          <div className="mb-5 flex gap-4">
            <div
              className={`w-full h-2 rounded-full transition-colors duration-300 ${
                currentStep === "admin" ? "bg-brand-primary" : "bg-brand-primary"
              }`}
            />
            <div
              className={`w-full h-2 rounded-full transition-colors duration-300 ${
                currentStep === "school" ? "bg-brand-primary" : "bg-border-line02"
              }`}
            />
          </div>

          {/* text */}
          <section className="space-y-6 md:space-y-10">
            <div className="px-0 md:px-6 lg:px-10">
              <h1 className="text-2xl md:text-[28px] font-semibold font-jakarta text-text-primary text-center leading-tight md:leading-loose">
                Set Up Your School
              </h1>
              <p className="text-sm md:text-base text-center text-text-muted mt-2 md:mt-0">
                {currentStep === "admin"
                  ? "Let's get your administrator account created first."
                  : "Now tell us about your school."}
              </p>
            </div>

            {/* Animated step container */}
            <div className="relative overflow-hidden min-h-100 md:min-h-112.5">
              <AnimatePresence custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  {currentStep === "admin" && (
                    <AdministratorDetailsStep
                      onNext={handleAdminNext}
                      defaultValues={adminData || undefined}
                    />
                  )}

                  {currentStep === "school" && (
                    <SchoolDetailsStep
                      onSubmit={handleSchoolSubmit}
                      onBack={handleBack}
                      isLoading={mutation.isPending}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <Sponsor />
          </section>
        </div>

        {/* Right: Image – hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center order-1 lg:order-2">
          <img
            src={signupImage}
            alt="signup image"
            className="w-full max-w-125 xl:max-w-140.5 rounded-2xl md:rounded-3xl object-cover"
          />
        </div>
      </section>

      {/* Global error toast */}
      {mutation.isError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 bg-red-50 text-danger px-4 py-3 rounded-lg border border-red-200 text-sm text-center md:text-left z-50"
        >
          {(mutation.error as Error)?.message ||
            "Something went wrong. Please try again."}
        </motion.div>
      )}
    </section>
  );
};

export default SignupPage;