import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface PhotoUploadProps {
  value?: File | null;
  onChange?: (file: File | undefined) => void;
  error?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ value, onChange, error }) => {
  const [preview, setPreview] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  // Preview follows the form value, so reset() clears it automatically
  useEffect(() => {
    if (!value) {
      setPreview(undefined);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange?.(file);
    e.target.value = ""; // allow re-picking the same file
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2 py-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "backOut" }}
    >
      <motion.button
        type="button"
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative w-24 h-24 rounded-full border-2 border-dashed border-brand-primary/50 hover:border-brand-primary flex items-center justify-center bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors overflow-hidden group"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <Camera className="w-7 h-7 text-brand-primary/60 group-hover:text-brand-primary transition-colors" />
        )}
      </motion.button>
      <p className="text-xs text-text-muted">Click to upload photo</p>
      {error && <p className="text-xs text-danger">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </motion.div>
  );
};

export default PhotoUpload;