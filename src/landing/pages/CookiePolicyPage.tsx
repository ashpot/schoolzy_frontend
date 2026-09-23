import LegalPageLayout from "../components/LegalPageLayout";
import { cookiePolicy } from "../data/legalContent";

export default function CookiePolicyPage() {
  return <LegalPageLayout document={cookiePolicy} />;
}