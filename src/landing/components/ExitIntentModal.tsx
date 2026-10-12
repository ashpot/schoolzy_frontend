import { AnimatePresence } from "framer-motion";
import { useExitIntent } from "../hooks/useExitIntent";
import ExitIntentDialog from "./ExitIntentDialog";

// TODO: Replace with the real Google Form URL
const DEMO_FORM_URL = "https://bit.ly/SchoolzyDemoRequest";

export default function ExitIntentModal() {
  const { isOpen, close } = useExitIntent();

  const handleDemo = () => {
    window.open(DEMO_FORM_URL, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && <ExitIntentDialog onDemo={handleDemo} onClose={close} />}
    </AnimatePresence>
  );
}