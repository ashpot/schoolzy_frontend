import { motion } from "framer-motion";
import { Settings, Zap } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp } from "../../animations/variants";
import type { Gateway, GatewayStatus } from "../../types";
import { timeAgo } from "../../utils/format";
import { Switch } from "../shared/ToggleControls";

const STATUS_TONE: Record<GatewayStatus, Tone> = { Connected: "green", Sandbox: "amber", Disconnected: "red" };
const TILE: Record<string, string> = {
  PS: "bg-sa-avatar-blue", FW: "bg-sa-avatar-amber", ST: "bg-sa-avatar-purple", MN: "bg-bg-dark",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="font-medium text-text-primary">{value}</dd>
    </div>
  );
}

interface GatewayCardProps {
  gateway: Gateway;
  busy: boolean;
  testing: boolean;
  onToggle: (enabled: boolean) => void;
  onConfigure: () => void;
  onTest: () => void;
}

export default function GatewayCard({ gateway: g, busy, testing, onToggle, onConfigure, onTest }: GatewayCardProps) {
  const lastTested = g.needsKeys ? timeAgo(g.lastTested) : "N/A";

  return (
    <motion.article variants={fadeUp} whileHover={{ y: -3 }} className="rounded-3xl border border-border-line02 bg-white p-6 transition-shadow hover:card-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className={cn("flex-center h-14 w-14 shrink-0 rounded-2xl text-lg font-semibold text-white", TILE[g.code] ?? "bg-sa-avatar-teal")}>{g.code}</span>
          <div>
            <p className="font-jakarta text-lg font-semibold text-text-primary">{g.name}</p>
            <div className="mt-1.5 flex gap-2">
              <StatusBadge label={g.status} tone={STATUS_TONE[g.status]} />
              <StatusBadge label={g.mode} tone="gray" />
            </div>
          </div>
        </div>
        <Switch checked={g.enabled} label={`${g.name} enabled`} disabled={busy} onChange={onToggle} />
      </div>

      <dl className="mt-5 space-y-2.5">
        <Row label="Transactions today" value={g.txToday === null ? "—" : String(g.txToday)} />
        <Row label="Last tested" value={lastTested} />
        <Row label="Currency" value={g.currency} />
      </dl>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" leftIcon={<Settings size={16} />} onClick={onConfigure}>Configure</Button>
        <Button type="button" variant="outline" leftIcon={<Zap size={16} />} onClick={onTest} disabled={testing || !g.needsKeys}>
          {testing ? "Testing..." : "Test"}
        </Button>
      </div>
    </motion.article>
  );
}