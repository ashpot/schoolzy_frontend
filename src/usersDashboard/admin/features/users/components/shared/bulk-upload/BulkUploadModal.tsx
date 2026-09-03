import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useBulkUpload } from "../../../hooks/useBulkUpload";
import BulkUploadStepper from "./BulkUploadStepper";
import DownloadTemplateStep from "./DownloadTemplateStep";
import UploadFileStep from "./UploadFileStep";
import ReviewImportStep from "./ReviewImportStep";
import ImportSuccessStep from "./ImportSuccessStep";
import type { BulkUploadConfig } from "../../../types/BulkUpload";
import { modalVariant } from "../../../animations/variants";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BulkUploadConfig;
  queryKey: string;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose, config, queryKey }) => {
  const bulkUpload = useBulkUpload(config, queryKey);

  const handleClose = () => {
    bulkUpload.reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between px-6 pt-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Bulk Upload {config.entityLabelPlural}
                </h2>
                <p className="text-body-small text-text-secondary mt-1">{config.description}</p>
              </div>
              <button onClick={handleClose} className="text-text-muted hover:text-text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {bulkUpload.step < 4 && (
              <div className="px-6 mt-5">
                <BulkUploadStepper currentStep={bulkUpload.step} />
              </div>
            )}

            <div className="px-6 py-6">
              {bulkUpload.step === 1 && (
                <DownloadTemplateStep config={config} onCancel={handleClose} onContinue={bulkUpload.goToUpload} />
              )}
              {bulkUpload.step === 2 && (
                 <UploadFileStep
                  config={config}
                  file={bulkUpload.file}
                  onFileSelect={bulkUpload.setFile}
                  onCancel={handleClose}
                  onBack={bulkUpload.goToDownload}
                  onContinue={bulkUpload.goToReview}
                />
              )}
              {bulkUpload.step === 3 && (
                <ReviewImportStep
                  config={config}
                  rows={bulkUpload.filteredRows}
                  filter={bulkUpload.reviewFilter}
                  onFilterChange={bulkUpload.setReviewFilter}
                  readyCount={bulkUpload.readyCount}
                  warningCount={bulkUpload.warningCount}
                  errorCount={bulkUpload.errorCount}
                  isImporting={bulkUpload.importMutation.isPending}
                  onCancel={handleClose}
                  onBack={bulkUpload.goToUpload}
                  onImport={() => bulkUpload.importMutation.mutate()}
                />
              )}
              {bulkUpload.step === 4 && bulkUpload.importMutation.data && (
                <ImportSuccessStep
                  config={config}
                  result={bulkUpload.importMutation.data}
                  onDone={handleClose}
                  onViewList={handleClose}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BulkUploadModal;