import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { itemTypeSchema, type ItemTypeValues } from "../../schemas";
import { useAddItemType } from "../../hooks/useInventory";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";

export default function ItemTypeForm() {
  const { register, handleSubmit, watch, reset, formState: { errors } } =
    useForm<ItemTypeValues>({
      resolver: zodResolver(itemTypeSchema),
      defaultValues: { name: "", description: "" },
    });

  const mutation = useAddItemType();
  const descLen = (watch("description") ?? "").length;

  const onSubmit = (values: ItemTypeValues) => {
    mutation.mutate(values, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-5">
      <FormHeader icon={Plus} title="Add Item Type" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
        <FormInput
          label="Name *"
          placeholder="e.g. Stationery"
          error={errors.name?.message}
          isLoading={mutation.isPending}
          {...register("name")}
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-label">Description *</label>
            <span className="text-xs text-text-muted">{descLen} chars</span>
          </div>
          <textarea
            rows={4}
            placeholder="Briefly describe what items belong to this type…"
            disabled={mutation.isPending}
            className="w-full px-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none transition disabled:opacity-60"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-danger mt-1">{errors.description.message}</p>
          )}
        </div>

        <SubmitButton label="Add Item Type" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}