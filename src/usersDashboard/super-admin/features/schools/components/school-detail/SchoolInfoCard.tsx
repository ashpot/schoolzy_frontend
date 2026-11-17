import { Building2, Globe, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import type { SchoolDetail } from "../../types/detail";
import InfoRow from "./InfoRow";

export default function SchoolInfoCard({ school }: { school: SchoolDetail }) {
  const address = [school.address, school.city, school.state].filter(Boolean).join(", ");

  return (
    <SectionCard title="School Information">
      <InfoRow icon={Building2} label="School Name" value={school.name} />
      <InfoRow icon={ShieldCheck} label="School Code" value={school.code ?? ""} />
      <InfoRow icon={MapPin} label="Address" value={address} />
      <InfoRow icon={Phone} label="Phone" value={school.phone ?? ""} />
      <InfoRow icon={Mail} label="Email" value={school.email ?? ""} />
      <InfoRow icon={Globe} label="Website" value={school.website ?? ""} />
      <InfoRow icon={User} label="Principal" value={school.principal ?? ""} />
    </SectionCard>
  );
}