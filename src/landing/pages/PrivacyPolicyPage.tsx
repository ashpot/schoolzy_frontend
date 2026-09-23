import LegalPageLayout from "../components/LegalPageLayout";
import { privacyPolicy } from "../data/legalContent";

export default function PrivacyPolicyPage() {
  return <LegalPageLayout document={privacyPolicy} />;
}