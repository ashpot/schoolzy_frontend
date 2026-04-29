import LoginForm from "../components/LoginForm";
import bgImage from "@/assets/login_image.webp";
import AuthNav from "@/shared/components/AuthNav";

const SigninPage = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-bg-main/30" />
      <div className="relative z-10">
        <AuthNav />
        {/* form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default SigninPage;
