import type { SystemSettings } from "../../types";
import MaintenanceCard from "./MaintenanceCard";
import SystemActionsCard from "./SystemActionsCard";
import SystemStatusCard from "./SystemStatusCard";

export default function SystemTab({ data }: { data: SystemSettings }) {
  return (
    <div className="space-y-6">
      <MaintenanceCard enabled={data.maintenance.enabled} message={data.maintenance.message} />
      <SystemStatusCard status={data.status} />
      <SystemActionsCard />
    </div>
  );
}