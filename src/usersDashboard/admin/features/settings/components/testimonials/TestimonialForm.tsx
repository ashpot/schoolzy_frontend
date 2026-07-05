import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound, Upload } from "lucide-react";
import { useRef, useState } from "react";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";
import { testimonialSchema, type TestimonialValues } from "../../schemas";
import { useAddTestimonial } from "../../hooks/useSettings";
import { portfolioOptions } from "../../data/mockData";
import type { Testimonial } from "../../types";

interface Props {
  onSuccess: (t: Testimonial) => void;
}

export default function TestimonialForm({ onSuccess }: Props) {
  const mutation = useAddTestimonial();
  const [commentLen, setCommentLen] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<TestimonialValues>({
      resolver: zodResolver(testimonialSchema),
      defaultValues: { fullName: "", portfolio: undefined, comment: "" },
    });

  const onSubmit = (values: TestimonialValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        const newT: Testimonial = {
          id: Date.now().toString(),
          ...values,
          photo: photoPreview ?? undefined,
          createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        };
        onSuccess(newT);
        reset();
        setCommentLen(0);
        setPhotoPreview(null);
      },
    });
  };

  function handleFile(file: File) {
    setPhotoPreview(URL.createObjectURL(file));
  }

  return (
    <div className="bg-white rounded-2xl card-shadow p-5">
      <FormHeader icon={UserRound} title="Add Testimonial"/>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-4">
        <FormInput
          label="Full Name *"
          placeholder="e.g. Mrs. Adaeze Okonkwo"
          error={errors.fullName?.message}
          isLoading={mutation.isPending}
          {...register("fullName")}
        />
        <FormSelect
          label="Portfolio"
          options={portfolioOptions}
          placeholder="Select role"
          error={errors.portfolio?.message}
          {...register("portfolio")}
        />

        {/* Photo upload */}
        <div>
          <label className="text-sm font-medium text-label block mb-1.5">
            Photo <span className="text-text-muted font-normal">— optional</span>
          </label>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFile(f);
              }}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all
                ${dragging ? "border-brand-primary bg-blue-50/50" : "border-border-line02 bg-bg-input hover:border-brand-primary/50"}`}
            >
              <Upload size={16} className="text-brand-primary" />
              <p className="text-xs text-text-muted">Click or drag to upload</p>
              <input ref={inputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>
            <div className="w-16 h-16 rounded-xl border border-border-line02 bg-bg-input flex-center self-center">
              {photoPreview
                ? <img src={photoPreview} alt="" className="w-full h-full object-cover rounded-xl" />
                : <UserRound size={20} className="text-text-muted/40" />
              }
            </div>
          </div>
        </div>

        {/* Comment */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-label">Comment *</label>
            <span className="text-xs text-text-muted">{commentLen}/500</span>
          </div>
          <textarea
            rows={4}
            placeholder="What do they say about the school?"
            maxLength={500}
            className="w-full px-3 py-2.5 text-sm bg-bg-input border border-border-line02 rounded-xl text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
            {...register("comment", { onChange: (e) => setCommentLen(e.target.value.length) })}
          />
          {errors.comment && <p className="text-xs text-danger mt-1">{errors.comment.message}</p>}
        </div>

        <SubmitButton label="Add Testimonial" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}