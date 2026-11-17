import UsersListPage from "../components/shared/UsersListPage";
import { parentsConfig } from "../components/parents/parentsConfig";

export default function ParentsPage() {
  return <UsersListPage config={parentsConfig} />;
}