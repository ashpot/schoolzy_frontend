import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Plus } from "lucide-react";
import { saleSchema, type SaleValues } from "../../schemas";
import { useAddSale } from "../../hooks/useInventory";
import type { InventoryItem, SaleRecord } from "../../types";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "@/shared/ui/FormHeader";
import {z} from "zod";

interface Props {
  items: InventoryItem[];
  onSuccess: (sale: SaleRecord) => void;
}

export default function SaleForm({ items, onSuccess }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<z.input<typeof saleSchema>, any, SaleValues>({
      resolver: zodResolver(saleSchema),
      defaultValues: { itemId: "", quantity: "" as unknown as number, amount: "" as unknown as number },
    });

  const mutation = useAddSale();
  const itemOptions = items.map((i) => ({ label: i.name, value: i.id }));

  const onSubmit = (values: SaleValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        const item = items.find((i) => i.id === values.itemId);
        const newSale: SaleRecord = {
          id: Date.now().toString(),
          itemId: values.itemId,
          itemName: item?.name ?? "",
          typeName: item?.typeName ?? "",
          quantity: values.quantity,
          amount: values.amount,
          date: new Date().toISOString().split("T")[0],
        };
        onSuccess(newSale);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-5">
      <FormHeader icon={Plus} title="Add Sale" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
        <FormSelect
          label="Item *"
          options={itemOptions}
          placeholder="Select an item"
          error={errors.itemId?.message}
          {...register("itemId")}
        />

        {/* Quantity */}
        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Quantity *</label>
          <div className="relative">
            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="number"
              min={1}
              placeholder="0"
              disabled={mutation.isPending}
              className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60 transition"
              {...register("quantity")}
            />
          </div>
          {errors.quantity && <p className="text-xs text-danger mt-1">{errors.quantity.message}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-label block mb-1.5">Amount *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">₦</span>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              disabled={mutation.isPending}
              className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60 transition"
              {...register("amount")}
            />
          </div>
          {errors.amount && <p className="text-xs text-danger mt-1">{errors.amount.message}</p>}
        </div>

        <SubmitButton label="Add Sale" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}