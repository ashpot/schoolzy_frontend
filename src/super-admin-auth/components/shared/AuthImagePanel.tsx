import { useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";
import type { AuthPanelConfig } from "../../types";

export default function AuthImagePanel({ images, fit }: AuthPanelConfig) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <aside
      aria-hidden="true"
      className="relative hidden min-h-[560px] overflow-hidden rounded-[40px] bg-bg-soft lg:block"
    >
      <img
        src={images[index]}
        alt=""
        draggable={false}
        className={cn(
          "absolute inset-0 h-full w-full",
          fit === "cover" ? "object-cover" : "object-contain p-10"
        )}
      />
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-brand-primary" : "w-2 bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </aside>
  );
}