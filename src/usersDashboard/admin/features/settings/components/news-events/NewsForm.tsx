import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Newspaper, Upload } from "lucide-react";
import { useRef, useState } from "react";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import FormHeader from "@/shared/ui/FormHeader";
import SubmitButton from "@/shared/ui/SubmitButton";
import { newsPostSchema, type NewsPostValues } from "../../schemas";
import { usePublishNewsPost } from "../../hooks/useSettings";
import { authorOptions, newsCategoryOptions } from "../../data/mockData";
import type { NewsPost } from "../../types";
import { z } from "zod";

interface Props {
  onSuccess: (post: NewsPost) => void;
}

export default function NewsForm({ onSuccess }: Props) {
  const mutation = usePublishNewsPost();
  const [contentLen, setContentLen] = useState(0);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<z.input<typeof newsPostSchema>, any, NewsPostValues>({
      resolver: zodResolver(newsPostSchema),
      defaultValues: { title: "", author: "", category: undefined, content: "", featured: false },
    });

  const onSubmit = (values: NewsPostValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        const post: NewsPost = {
          id: Date.now().toString(),
          ...values,
          coverPhoto: coverPreview ?? undefined,
          createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        };
        onSuccess(post);
        reset();
        setContentLen(0);
        setCoverPreview(null);
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={Newspaper} title="Add News / Update" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-4">
        {/* Row 1: Title + Content side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left col */}
          <div className="space-y-4">
            <FormInput
              label="Title *"
              placeholder="e.g. Annual Sports Day 2025"
              error={errors.title?.message}
              isLoading={mutation.isPending}
              {...register("title")}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormSelect
                label="Author"
                options={authorOptions}
                placeholder="Select author"
                error={errors.author?.message}
                {...register("author")}
              />
              <FormSelect
                label="Category"
                options={newsCategoryOptions}
                placeholder="Select category"
                error={errors.category?.message}
                {...register("category")}
              />
            </div>
            {/* Featured checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                {...register("featured")}
                className="mt-0.5 w-4 h-4 rounded border-border-line02 text-brand-primary focus:ring-brand-primary/20"
              />
              <div>
                <p className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">Mark as Featured</p>
                <p className="text-xs text-text-muted">Featured posts are highlighted at the top of the feed</p>
              </div>
            </label>
          </div>

          {/* Right col: Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-label">Content *</label>
              <span className="text-xs text-text-muted">{contentLen} chars</span>
            </div>
            <textarea
              rows={7}
              placeholder="Write the full content of this post or announcement…"
              className="w-full px-3 py-2.5 text-sm bg-bg-input border border-border-line02 rounded-xl text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all h-[calc(100%-28px)]"
              {...register("content", { onChange: (e) => setContentLen(e.target.value.length) })}
            />
            {errors.content && <p className="text-xs text-danger mt-1">{errors.content.message}</p>}
          </div>
        </div>

        {/* Cover Photo */}
        <div>
          <label className="text-sm font-medium text-label block mb-1.5">
            Cover Photo <span className="text-text-muted font-normal">— optional, max 8 MB</span>
          </label>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files[0];
                if (f) setCoverPreview(URL.createObjectURL(f));
              }}
              onClick={() => inputRef.current?.click()}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed cursor-pointer transition-all
                ${dragging ? "border-brand-primary bg-blue-50/50" : "border-border-line02 bg-bg-input hover:border-brand-primary/50"}`}
            >
              <Upload size={15} className="text-brand-primary" />
              <p className="text-sm text-text-muted">Click or drag to upload PNG, JPG, WebP</p>
              <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) setCoverPreview(URL.createObjectURL(f)); }} />
            </div>
            <div className="w-16 h-14 rounded-xl border border-border-line02 bg-bg-input flex-center overflow-hidden">
              {coverPreview
                ? <img src={coverPreview} alt="" className="w-full h-full object-cover" />
                : <Upload size={16} className="text-text-muted/30" />
              }
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <SubmitButton label="Publish Update" isLoading={mutation.isPending} />
        </div>
      </form>
    </div>
  );
}