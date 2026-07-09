import { CreditCard } from "lucide-react";
// import { FormHeader } from "@/shared/ui";
import { feeStatusStyles } from "../../utils/colors";
import type { StudentFeeProfile } from "../../types";
import FormHeader from "@/shared/ui/FormHeader";

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export default function FeeProfileCard({ profile }: { profile: StudentFeeProfile }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <FormHeader icon={CreditCard} title="Student Fee Profile" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex-center bg-brand-primary text-white font-semibold text-lg">
            {getInitials(profile.studentName)}
          </div>
          <div>
            <p className="font-semibold text-text-primary">{profile.studentName}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs">
              {profile.className}
            </span>
            <p className="text-body-small text-text-secondary mt-1 flex items-center gap-1.5">
              Fee Status:
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${feeStatusStyles[profile.feeStatus]}`}>
                {profile.feeStatus}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <Stat label="Total Fees" value={profile.totalFees} className="text-text-primary" />
          <Stat label="Total Paid" value={profile.totalPaid} className="text-green-600" />
          <Stat label="Balance Due" value={profile.balanceDue} className="text-danger" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className="text-right">
      <p className={`card-number ${className}`}>₦{value.toLocaleString()}</p>
      <p className="text-body-small text-text-secondary">{label}</p>
    </div>
  );
}