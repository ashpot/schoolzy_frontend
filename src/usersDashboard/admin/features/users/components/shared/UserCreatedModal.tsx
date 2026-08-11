import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Copy, X } from "lucide-react";
import { modalVariant } from "../../animations/variants";

interface UserCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  username: string;
  password: string;
  role: string;
}

const CredentialRow: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-bg-input rounded-lg px-3.5 py-2.5">
      <div className="min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-mono font-medium text-text-primary truncate">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 p-1.5 rounded-lg text-text-muted hover:text-brand-primary hover:bg-white transition-colors"
      >
        {copied ? <CheckCircle2 size={15} className="text-success" /> : <Copy size={15} />}
      </button>
    </div>
  );
};

const UserCreatedModal: React.FC<UserCreatedModalProps> = ({
  isOpen, onClose, fullName, username, password, role,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:bg-bg-soft transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center text-center gap-2 mb-5">
              <div className="w-12 h-12 rounded-full bg-success/10 flex-center">
                <CheckCircle2 size={24} className="text-success" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">{role} Account Created</h2>
              <p className="text-sm text-text-secondary">
                Share these login details with <span className="font-medium text-text-primary">{fullName}</span>.
                This is the only time the password will be shown here.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <CredentialRow label="Username" value={username} />
              <CredentialRow label="Password" value={password} />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full mt-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-hover transition-colors"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserCreatedModal;