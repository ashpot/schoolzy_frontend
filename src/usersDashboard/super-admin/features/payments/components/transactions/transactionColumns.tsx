import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { Col } from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import { formatDate, formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { Transaction } from "../../types";
import { txnTone } from "../../utils/tones";
import SchoolLine from "../shared/SchoolLine";

const text = "text-sm text-text-primary";

export const transactionColumns: Col<Transaction>[] = [
  { key: "ref", header: "Transaction ID", render: (t) => <span className="text-sm font-semibold text-text-primary">{t.ref}</span> },
  { key: "school", header: "School", render: (t) => <SchoolLine name={t.school} location={t.location} /> },
  { key: "plan", header: "Plan", render: (t) => <span className={text}>{t.plan}</span> },
  { key: "method", header: "Method", render: (t) => <span className={text}>{t.method}</span> },
  { key: "amount", header: "Amount", render: (t) => <span className="text-sm font-semibold text-text-primary">{formatNaira(t.amount)}</span> },
  { key: "date", header: "Date", render: (t) => <span className="text-sm text-text-secondary">{formatDate(t.date)}</span> },
  { key: "invoice", header: "Invoice No.", render: (t) => <span className="text-sm text-text-secondary">{t.invoiceNo}</span> },
  { key: "status", header: "Status", render: (t) => <StatusBadge label={t.status} tone={txnTone[t.status]} /> },
];