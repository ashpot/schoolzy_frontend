import UsersListPage from "../components/shared/UsersListPage";
import { studentsConfig } from "../components/students/studentsConfig";

export default function StudentsPage() {
  return <UsersListPage config={studentsConfig} />;
}