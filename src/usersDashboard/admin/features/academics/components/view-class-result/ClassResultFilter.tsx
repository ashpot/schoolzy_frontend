import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slideFromLeft } from "../../animations/variants";
import type { ClassResultFilters } from "../../types/classResult";
import { useClassGroupsList } from "@/usersDashboard/admin/features/sections/hooks/useSections";
import { useSessionsList, useTermsList } from "@/usersDashboard/admin/features/sessions/hooks/useSessions";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import FormHeader from "../shared/FormHeader";

const schema = z.object({
  class_group: z.string().min(1, "Please select a class group"),
  term: z.string().min(1, "Please select a term"),
});
type FormValues = z.infer<typeof schema>;

interface Props {
  isLoading: boolean;
  onSubmit: (filters: ClassResultFilters) => void;
}

export default function ClassResultFilter({ isLoading, onSubmit }: Props) {
  const { data: groups, isLoading: groupsLoading } = useClassGroupsList();
  const { data: terms, isLoading: termsLoading } = useTermsList();
  const { data: sessions } = useSessionsList();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { class_group: "", term: "" },
  });

  const groupOptions = (groups ?? []).map((g) => ({ value: String(g.id), label: g.name }));

  // Term names repeat across sessions (FIRST TERM in every session), so the
  // label carries the session name. Display only, it is not a form field.
  const sessionName = new Map((sessions ?? []).map((s) => [s.id, s.name]));
  const termOptions = (terms ?? []).map((t) => ({
    value: String(t.id),
    label: `${t.name} (${sessionName.get(t.session) ?? "—"})`,
  }));

  return (
    <motion.div variants={slideFromLeft} initial="hidden" animate="show" className="bg-white rounded-2xl card-shadow mb-6">
      <FormHeader title="Class Result Filter" icon={<Users className="w-4 h-4 text-brand-primary" />} />
      <form
        onSubmit={handleSubmit((v) => onSubmit({ classGroupId: v.class_group, termId: v.term }))}
        noValidate
        className="p-6"
      >
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <FormSelect
            label="Class Group"
            placeholder={groupsLoading ? "Loading class groups..." : "Select class group"}
            options={groupOptions}
            isLoading={isLoading || groupsLoading}
            error={errors.class_group?.message}
            {...register("class_group")}
          />
          <FormSelect
            label="Term"
            placeholder={termsLoading ? "Loading terms..." : "Select term"}
            options={termOptions}
            isLoading={isLoading || termsLoading}
            error={errors.term?.message}
            {...register("term")}
          />
        </div>
        <SubmitButton label="Load Students" isLoading={isLoading} className="w-50" />
      </form>
    </motion.div>
  );
}