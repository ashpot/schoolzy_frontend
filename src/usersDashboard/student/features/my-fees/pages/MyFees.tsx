import { motion } from "framer-motion";
import { useFeeProfile, useFeeRecords } from "../hooks/useMyFees";
import FeeProfileCard from "../components/payment-history/FeeProfileCard";
import PaymentRecordsTable from "../components/payment-history/PaymentRecordsTable";
import { fadeUp } from "../../dashboard/animations/variants";

export default function MyFees() {
  const { data: profile } = useFeeProfile();
  const { data: records } = useFeeRecords();

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Payment History</h1>
        <p className="text-body-small text-text-secondary mt-1">Student Portal</p>
      </div>

      {profile && <FeeProfileCard profile={profile} />}
      {records && <PaymentRecordsTable records={records} />}
    </motion.div>
  );
}