import React from "react";

interface Props {
  onOpenComment: () => void;
  onOpenPsychomotive: () => void;
  onOpenPrintable: () => void;
}

const outline =
  "px-4 py-2.5 rounded-lg border border-border-line02 bg-white text-sm font-medium text-text-secondary hover:bg-bg-soft transition-colors";

const ResultActionsBar: React.FC<Props> = ({ onOpenComment, onOpenPsychomotive, onOpenPrintable }) => (
  <div className="flex items-center gap-3 flex-wrap">
    <button type="button" className={outline} onClick={onOpenPsychomotive}>Add Psychomotive Evaluation Score</button>
    <button type="button" className={outline} onClick={onOpenComment}>Add Result Comment</button>
    <button
      type="button"
      onClick={onOpenPrintable}
      className="ml-auto px-4 py-2.5 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-hover transition-colors"
    >
      View Printable Format
    </button>
  </div>
);

export default ResultActionsBar;