import UsersListPage from "../components/shared/UsersListPage";
import { teachersConfig } from "../components/teachers/teachersConfig";

export default function TeachersPage() {
  return <UsersListPage config={teachersConfig} />;
}