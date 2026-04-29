import React from "react";
import { useNavigate } from "react-router-dom";
import brand_logo from "@/assets/brand/schoolzy_brand_name.svg";
import Button from "../ui/Button";

interface AuthNavProps {
  showBackButton?: boolean;
  backButtonText?: string;
  backRoute?: string;
  onBackClick?: () => void;
}

const AuthNav = ({
  showBackButton = false,
  backButtonText = "Back to Login",
  backRoute = "/login",
  onBackClick,
}: AuthNavProps): React.ReactElement => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(backRoute);
    }
  };

  return (
    <nav className="flex items-center justify-between p-5 px-10">
      <div>
        <img src={brand_logo} alt="schoolzy logo" />
      </div>
      {showBackButton && (
        <Button
            onClick={()=>handleBackClick()}
            variant="outline"
            className="border-border-line03 bg-bg-input rounded-full font-jakarta font-semibold text-[13px] text-text-primary"
        >
            {backButtonText}
        </Button>
      )}
    </nav>
  );
};

export default AuthNav;