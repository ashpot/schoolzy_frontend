import brand_logo from "@/assets/brand/schoolzy_brand_name.svg";
import LoginForm from "../components/LoginForm";
import bgImage from "@/assets/login_image.webp";

const SigninPage = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-bg-main/30" />
      <div className="relative z-10">
        {/* brand logo and navigation area */}
        <nav className="p-5 px-10">
          <div>
            <img src={brand_logo} alt="schoolzy logo" />
          </div>
        </nav>

        {/* form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default SigninPage;
