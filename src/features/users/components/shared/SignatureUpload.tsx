import React, { useRef, useState } from "react";
import { motion } from "framer-motion";


interface SignatureUploadProps {
  onChange?: (file: File) => void;
}

const SignatureUpload: React.FC<SignatureUploadProps> = ({ onChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    onChange?.(file);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-label leading-4.5 tracking-wide">
        Signature
      </label>
      <motion.button
        type="button"
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full border-2 border-dashed border-border-line02 hover:border-brand-primary/40 rounded-2xl py-5 flex flex-col items-center gap-2 bg-bg-input hover:bg-brand-primary/5 transition-all"
      >
        <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center">
          <Pencil className="w-4 h-4 text-brand-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-text-secondary">
            {fileName ?? "Upload signature"}
          </p>
          <p className="text-xs text-text-muted mt-0.5">PNG, JPG up to 2MB</p>
        </div>
      </motion.button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

export default SignatureUpload;