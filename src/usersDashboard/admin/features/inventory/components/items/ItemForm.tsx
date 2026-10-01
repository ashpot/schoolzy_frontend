import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Plus, CalendarDays } from "lucide-react";
import { inventoryItemSchema, type InventoryItemValues } from "../../schemas";
import { useAddInventoryItem, useItemTypesList } from "../../hooks/useInventory";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";
import { z } from "zod";

export default function ItemForm() {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<z.input<typeof inventoryItemSchema>, any, InventoryItemValues>({
      resolver: zodResolver(inventoryItemSchema),
      defaultValues: { name: "", typeId: "", quantity: "" as unknown as number, unitPrice: "" as unknown as number },
    });

  const mutation = useAddInventoryItem();
  const { data: itemTypes, isLoading: typesLoading } = useItemTypesList();

  const typeOptions = (itemTypes ?? []).map((t) => ({ label: t.name, value: t.id }));

  const onSubmit = (values: InventoryItemValues) => {
    mutation.mutate(values, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-5">
      <FormHeader icon={Plus} title="Add Inventory Item" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
        <FormInput
          label="Name *"
          placeholder="e.g. A4 Printing Paper (500 sheets)"
          error={errors.name?.message}
          isLoading={mutation.isPending}
          {...register("name")}
        />

        <FormSelect
          label="Item Type *"
          options={typeOptions}
          placeholder={typesLoading ? "Loading item types..." : "Select a type"}
          isLoading={mutation.isPending || typesLoading}
          error={errors.typeId?.message}
          {...register("typeId")}
        />

        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Quantity *</label>
          <div className="relative">
            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="number"
              min={0}
              placeholder="0"
              disabled={mutation.isPending}
              className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60 transition"
              {...register("quantity")}
            />
          </div>
          {errors.quantity && <p className="text-xs text-danger mt-1">{errors.quantity.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Unit Price *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">₦</span>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              disabled={mutation.isPending}
              className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60 transition"
              {...register("unitPrice")}
            />
          </div>
          {errors.unitPrice && <p className="text-xs text-danger mt-1">{errors.unitPrice.message}</p>}
        </div>

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-bg-input border border-border-line02">
          <CalendarDays size={13} className="text-text-muted shrink-0" />
          <p className="text-xs text-text-muted">Date added will be recorded automatically</p>
        </div>

        <SubmitButton label="Add Inventory Item" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}