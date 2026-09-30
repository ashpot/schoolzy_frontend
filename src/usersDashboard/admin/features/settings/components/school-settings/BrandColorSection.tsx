import { type UseFormRegister } from "react-hook-form";
import { Palette } from "lucide-react";
import type { SchoolSettingsValues } from "../../schemas";

interface Props {
  register: UseFormRegister<SchoolSettingsValues>;
  isPending: boolean;
}

export default function BrandColorsSection({ register, isPending }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="text-xs font-semibold text-label leading-4.5 tracking-wide flex items-center gap-1.5 mb-1.5">
          <Palette size={14} /> Primary Color
        </label>
        <input
          type="color"
          disabled={isPending}
          className="w-full h-10 rounded-xl border border-border-line02 bg-bg-input cursor-pointer disabled:opacity-50"
          {...register("primary_color")}
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-label leading-4.5 tracking-wide flex items-center gap-1.5 mb-1.5">
          <Palette size={14} /> Secondary Color
        </label>
        <input
          type="color"
          disabled={isPending}
          className="w-full h-10 rounded-xl border border-border-line02 bg-bg-input cursor-pointer disabled:opacity-50"
          {...register("secondary_color")}
        />
      </div>
    </div>
  );
}