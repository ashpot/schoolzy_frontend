import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import PayFeeForm from "../components/pay-fees/PayFeeForm";

export default function PayFeesPage() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div>
        <h1 className="page-title">Pay Fees</h1>
        <p className="text-body-small text-text-secondary mt-1">Make a payment towards your child's fees</p>
      </div>

      <PayFeeForm />
    </motion.div>
  );
}