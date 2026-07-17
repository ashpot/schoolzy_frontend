import React from "react";
import { motion } from "framer-motion";
import { Upload, Plus } from "lucide-react";
import { pageFade } from "../../animations/variants";

interface UserPageHeaderProps {
  title: string;
  subtitle: string;
  onAdd?: () => void;
  addLabel?: string;
  showBulkUpload?: boolean;
  onBulkUpload?: () => void;
}

const UserPageHeader: React.FC<UserPageHeaderProps> = ({
  title, subtitle, onAdd, addLabel = "Add", showBulkUpload = false, onBulkUpload,
}) => (
  <motion.div
    variants={pageFade}
    initial="hidden"
    animate="show"
    className="flex items-center justify-between mb-6"
  >
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="text-body-small mt-1">{subtitle}</p>
    </div>
    <div className="flex items-center gap-3">
      {showBulkUpload && (
        <motion.button
          onClick={onBulkUpload}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-line02 bg-white text-text-nav text-sm font-lato font-medium hover:bg-bg-soft transition-colors"
        >
          <Upload className="w-4 h-4" />
          Bulk Upload
        </motion.button>
      )}
      <motion.button
        onClick={onAdd}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-hover text-white text-sm font-lato font-medium transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        {addLabel}
      </motion.button>
    </div>
  </motion.div>
);

export default UserPageHeader;