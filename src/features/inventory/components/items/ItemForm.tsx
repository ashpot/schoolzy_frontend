import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Plus, CalendarDays } from "lucide-react";
import { inventoryItemSchema, type InventoryItemValues } from "../../schemas";
import { useAddInventoryItem } from "../../hooks/useInventory";
import type { InventoryItem, ItemType } from "../../types";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";

interface Props {
  itemTypes: ItemType[];
  onSuccess: (item: InventoryItem) => void;
}

export default function ItemForm({ itemTypes, onSuccess }: Props) {
  const { register, handleSubmit, watch, reset, formState: { errors } } =
    useForm<InventoryItemValues>({
      resolver: zodResolver(inventoryItemSchema),
      defaultValues: { name: "", typeId: "", quantity: "" as unknown as number, unitPrice: "" as unknown as number },
    });

  const mutation = useAddInventoryItem();

  const typeOptions = itemTypes.map((t) => ({ label: t.name, value: t.id }));

  const onSubmit = (values: InventoryItemValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        const typeName = itemTypes.find((t) => t.id === values.typeId)?.name ?? "";
        const newItem: InventoryItem = {
          id: Date.now().toString(),
          ...values,
          typeName,
          addedAt: new Date().toISOString().split("T")[0],
        };
        onSuccess(newItem);
        reset();
      },
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
          placeholder="Select a type"
          error={errors.typeId?.message}
          {...register("typeId")}
        />

        {/* Quantity — # prefix */}
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

        {/* Unit Price — ₦ prefix */}
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

        {/* Auto date hint */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-bg-input border border-border-line02">
          <CalendarDays size={13} className="text-text-muted shrink-0" />
          <p className="text-xs text-text-muted">Date added will be recorded automatically</p>
        </div>

        <SubmitButton label="Add Inventory Item" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}