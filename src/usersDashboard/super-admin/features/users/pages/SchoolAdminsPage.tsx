import UsersListPage from "../components/shared/UsersListPage";
import { adminsConfig } from "../components/school-admins/adminsConfig";

export default function SchoolAdminsPage() {
  return <UsersListPage config={adminsConfig} />;
}