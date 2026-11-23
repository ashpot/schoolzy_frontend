import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { Col } from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import { formatDate, formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { Invoice } from "../../types";
import { invoiceDisplay } from "../../utils/derive";
import { invoiceTone } from "../../utils/tones";
import SchoolLine from "../shared/SchoolLine";

export const invoiceColumns: Col<Invoice>[] = [
  { key: "no", header: "Invoice No.", render: (i) => <span className="text-sm font-semibold text-text-primary">{i.invoiceNo}</span> },
  { key: "school", header: "School", render: (i) => <SchoolLine name={i.school} location={i.location} /> },
  { key: "plan", header: "Plan", render: (i) => <span className="text-sm text-text-primary">{i.plan}</span> },
  { key: "date", header: "Invoice Date", render: (i) => <span className="text-sm text-text-secondary">{formatDate(i.invoiceDate)}</span> },
  { key: "due", header: "Due Date", render: (i) => <span className="text-sm text-text-secondary">{formatDate(i.dueDate)}</span> },
  { key: "amount", header: "Amount", render: (i) => <span className="text-sm font-semibold text-text-primary">{formatNaira(i.amount)}</span> },
  {
    key: "status",
    header: "Status",
    render: (i) => {
      const s = invoiceDisplay(i);
      return <StatusBadge label={s} tone={invoiceTone[s]} />;
    },
  },
];