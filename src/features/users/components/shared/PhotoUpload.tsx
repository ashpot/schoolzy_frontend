import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface PhotoUploadProps {
  value?: string;
  onChange?: (file: File, preview: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ value, onChange }) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file, url);
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
          <>
            {/* Animated rotating dashes */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-brand-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <Camera className="w-7 h-7 text-brand-primary/60 group-hover:text-brand-primary transition-colors" />
          </>
        )}
      </motion.button>
      <p className="text-xs text-text-muted">Click to upload photo</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </motion.div>
  );
};

export default PhotoUpload;