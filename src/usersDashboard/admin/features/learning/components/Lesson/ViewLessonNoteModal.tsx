import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, User, Layers, Tag, Calendar, Download, X } from "lucide-react";
import Button from "@/shared/ui/Button";
import { useApproveLessonNote, useRejectLessonNote } from "../../hooks/useLearning";
import type { LessonNote } from "../../types";
import { modalVariant } from "../../animations/variants";

interface ViewLessonNoteModalProps {
  note: LessonNote;
  onClose: () => void;
  onStatusChange: (noteId: string, status: "approved" | "rejected") => void;
}

const ViewLessonNoteModal: React.FC<ViewLessonNoteModalProps> = ({ note, onClose, onStatusChange }) => {
  const [review, setReview] = useState("");
  const approveMutation = useApproveLessonNote();
  const rejectMutation = useRejectLessonNote();

  const handleApprove = () => {
    approveMutation.mutate({ noteId: note.id, review }, {
      onSuccess: () => { onStatusChange(note.id, "approved"); onClose(); },
    });
  };

  const handleReject = () => {
    rejectMutation.mutate({ noteId: note.id, review }, {
      onSuccess: () => { onStatusChange(note.id, "rejected"); onClose(); },
    });
  };

  const isPending = approveMutation.isPending || rejectMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div variants={modalVariant} initial="hidden" animate="show" exit="exit"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex-center shrink-0">
              <FileText className="w-5 h-5 text-danger" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">{note.title}</h2>
              <p className="text-sm text-text-secondary mt-0.5">
                {note.subject} · {note.class} · {note.term}, {note.week}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <InfoBlock icon={<User size={15} />} label="Teacher" value={note.teacher.name} />
            <InfoBlock icon={<Layers size={15} />} label="Class" value={note.class} />
            <InfoBlock icon={<Tag size={15} />} label="Subject" value={note.subject} />
            <InfoBlock icon={<Calendar size={15} />} label="Date Uploaded" value={note.dateUploaded} />
            <InfoBlock icon={<FileText size={15} />} label="File Type" value={note.file.type} />
            <InfoBlock icon={<FileText size={15} />} label="File Size" value={note.file.size} />
          </div>

          <div className="bg-bg-input rounded-xl p-4">
            <p className="text-xs font-semibold text-text-muted tracking-wide mb-2">DESCRIPTION</p>
            <p className="text-sm text-text-secondary">{note.description}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-label mb-1.5 block">
              Add Review <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              placeholder="Your thoughts or areas of improvement"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border-line02 bg-bg-input text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
            />
          </div>

          <div className="border-2 border-dashed border-border-line02 rounded-xl py-8 px-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-red-50 flex-center mb-3">
              <FileText className="w-6 h-6 text-danger" />
            </div>
            <p className="font-medium text-text-primary">{note.title}.{note.file.type.toLowerCase()}</p>
            <p className="text-xs text-text-muted mt-0.5">{note.file.size} · {note.file.type} document</p>
            <button
              onClick={() => {
                // TODO: Implement real file download
                console.log("Downloading", note.file.url);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-medium mt-4 hover:bg-brand-hover transition-colors"
            >
              <Download size={15} /> Download File
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="destructive" className="flex-1" isLoading={rejectMutation.isPending} disabled={isPending} onClick={handleReject}>
              Reject
            </Button>
            <Button
              className="flex-1 bg-success! hover:bg-green-600!"
              isLoading={approveMutation.isPending}
              disabled={isPending}
              onClick={handleApprove}
            >
              Approve
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InfoBlock: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-bg-input rounded-xl px-4 py-3">
    <div className="w-8 h-8 rounded-lg bg-white flex-center text-brand-primary shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-text-muted tracking-wide">{label.toUpperCase()}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  </div>
);

export default ViewLessonNoteModal;