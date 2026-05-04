import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { slideFromLeft } from "../../animations/variants";

interface UserFormPanelProps {
  title: string;
  children: React.ReactNode;
}

const UserFormPanel: React.FC<UserFormPanelProps> = ({ title, children }) => (
  <motion.div
    variants={slideFromLeft}
    initial="hidden"
    animate="show"
    className="bg-white rounded-2xl border border-border-line02 card-shadow overflow-hidden"
  >
    {/* Panel header */}
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border-line02">
      <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center">
        <User className="w-4 h-4 text-brand-primary" />
      </div>
      <h2 className="text-base font-lato font-semibold text-text-primary">{title}</h2>
    </div>
    <div className="px-5 py-4">{children}</div>
  </motion.div>
);

export default UserFormPanel;