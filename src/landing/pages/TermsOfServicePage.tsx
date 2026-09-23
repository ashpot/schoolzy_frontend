import LegalPageLayout from "../components/LegalPageLayout";
import { termsOfService } from "../data/legalContent";

export default function TermsOfServicePage() {
  return <LegalPageLayout document={termsOfService} />;
}