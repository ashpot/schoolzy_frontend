import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Button from "@/shared/ui/Button";

export default function SuccessStep() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-success flex-center mx-auto mb-5">
        <CheckCircle2 size={32} className="text-white" strokeWidth={2.5} />
      </div>
      <h1 className="page-title">Password Updated Successfully!</h1>
      <p className="text-body-small text-text-secondary mt-2 mb-6">
        Your password has been changed successfully.
        <br />
        You can now sign in using your new password.
      </p>
      <Button variant="primary" size="lg" className="w-full" onClick={() => navigate("/auth/signin")}>
        Back to Login
      </Button>
    </div>
  );
}