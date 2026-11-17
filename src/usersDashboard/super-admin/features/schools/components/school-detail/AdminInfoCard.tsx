import { Mail, Phone, User } from "lucide-react";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import type { SchoolDetail } from "../../types/detail";
import InfoRow from "./InfoRow";

export default function AdminInfoCard({ school }: { school: SchoolDetail }) {
  const name = school.admin?.trim() || "";

  return (
    <SectionCard title="Administrator Information">
      <div className="mb-2 flex items-center gap-4 rounded-2xl bg-bg-input p-5">
        <span className="flex-center h-14 w-14 shrink-0 rounded-2xl bg-brand-primary text-2xl font-semibold text-white">
          {name[0]?.toUpperCase() ?? "?"}
        </span>
        <div>
          <p className="font-semibold text-text-primary">{name || "No administrator yet"}</p>
          <p className="text-sm text-text-secondary">School Administrator</p>
        </div>
      </div>
      <InfoRow icon={Mail} label="Email" value={school.adminEmail ?? ""} />
      <InfoRow icon={Phone} label="Phone" value={school.adminPhone ?? ""} />
      <InfoRow icon={User} label="Username" value={school.adminUsername ?? ""} />
    </SectionCard>
  );
}