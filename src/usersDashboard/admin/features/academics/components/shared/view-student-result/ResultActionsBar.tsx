import React from "react";
import Button from "@/shared/ui/Button";

interface ResultActionsBarProps {
  onOpenAttendance: () => void;
  onOpenComment: () => void;
  onOpenPsychomotive: () => void;
  onOpenPrintable: () => void;
}

const ResultActionsBar: React.FC<ResultActionsBarProps> = ({
  onOpenAttendance, onOpenComment, onOpenPsychomotive, onOpenPrintable,
}) => (
  <div className="flex items-center gap-3 flex-wrap">
    <Button variant="outline" onClick={onOpenPsychomotive}>Add Psychomotive Evaluation Score</Button>
    <Button variant="outline" onClick={onOpenComment}>Add Result Comment</Button>
    <Button variant="outline" onClick={onOpenAttendance}>Add attendance Summary</Button>
    <Button variant="primary" className="ml-auto" onClick={onOpenPrintable}>View Printable Format</Button>
  </div>
);

export default ResultActionsBar;