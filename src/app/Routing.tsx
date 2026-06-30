import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import { SigninPage, SignupPage } from "@/features/auth";
import DashboardHome from "@/features/dashboard/pages/DashboardHome";

// Users
import StudentsPage from "@/features/users/pages/StudentsPage";
import TeachersPage from "@/features/users/pages/TeachersPage";
import AdminsPage from "@/features/users/pages/AdminsPage";
import ParentsPage from "@/features/users/pages/ParentsPage";

// Academics
import SubjectsPage from "@/features/academics/pages/SubjectsPage";
import SubjectTeachersPage from "@/features/academics/pages/SubjectTeachersPage";
import AssessmentTypesPage from "@/features/academics/pages/AssessmentTypesPage";
import GradePage from "@/features/academics/pages/GradePage";
import PsychomotivePage from "@/features/academics/pages/PsychomotivePage";
import ViewStudentResultPage from "@/features/academics/pages/ViewStudentResultPage";
import ViewClassResultPage from "@/features/academics/pages/ViewClassResultPage";
import PromoteStudentsPage from "@/features/academics/pages/PromoteStudentsPage";
import ManageScoresPage from "@/features/academics/pages/ManageScoresPage";
import AttendanceSummariesPage from "@/features/academics/pages/AttendanceSummariesPage";

// Learning
import LessonNotesPage from "@/features/learning/pages/LessonNotesPage";
import AttendancePage from "@/features/learning/pages/AttendancePage";

// Tests
import QuestionsPage from "@/features/tests/pages/QuestionsPage";
import TestsPage from "@/features/tests/pages/TestsPage";
import ScheduledTestsPage from "@/features/tests/pages/ScheduledTestsPage";
import ResultsPage from "@/features/tests/pages/ResultsPage";

// Results
import UploadAssessmentPage from "@/features/results/pages/UploadAssessmentPage";
import UploadOmittedPage from "@/features/results/pages/UploadOmittedPage";
import UploadWeeklyPage from "@/features/results/pages/UploadWeeklyPage";
import UploadResultsPage from "@/features/results/pages/UploadResultsPage";
import ViewScoresPage from "@/features/results/pages/ViewScoresPage";

// Sections
import ClassesPage from "@/features/sections/pages/ClassesPage";
import ClassGroupsPage from "@/features/sections/pages/ClassGroupsPage";
// import AssignClassPage from "@/features/sections/pages/AssignClassPage";
// import ClassAveragePage from "@/features/sections/pages/ClassAveragePage";

// Finances
import FeesPage from "@/features/finances/pages/FeesPage";
import FeeTypePage from "@/features/finances/pages/FeeTypePage";
import AssignFeesPage from "@/features/finances/pages/AssignFeesPage";
import PaymentsPage from "@/features/finances/pages/PaymentsPage";
import PaidListPage from "@/features/finances/pages/PaidListPage";
import ExpensesPage from "@/features/finances/pages/ExpensesPage";

// Inventory
import ItemsPage from "@/features/inventory/pages/ItemsPage";
import ItemTypesPage from "@/features/inventory/pages/ItemTypesPage";
import RecordSalePage from "@/features/inventory/pages/RecordSalePage";
import InventoryReportPage from "@/features/inventory/pages/InventoryReportPage";

// Sessions
import TermsPage from "@/features/sessions/pages/TermsPage";

// Settings
import SchoolSettingsPage from "@/features/settings/pages/SchoolSettingsPage";
import TestimonialsPage from "@/features/settings/pages/TestimonialsPage";
import NewsEventsPage from "@/features/settings/pages/NewsEventsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { AuthLayout, PublicLayout } from "./layouts";
import { ClassAvgDenominatorPage, SectionsPage } from "@/features/sections";
import AssignFormTeacherPage from "@/features/sections/pages/AssignFormTeacherPage";
import { SessionsPage } from "@/features/sessions";
import { LandingPage } from "@/features/landing";

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />

          {/* Users */}
          <Route path="users">
            <Route index element={<StudentsPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="parents" element={<ParentsPage />} />
          </Route>

          {/* Academics */}
          <Route path="academics">
            <Route index element={<SubjectsPage />} />
            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="subject-teachers" element={<SubjectTeachersPage />} />
            <Route path="assessment-types" element={<AssessmentTypesPage />} />
            <Route path="grade" element={<GradePage />} />
            <Route path="psychomotive" element={<PsychomotivePage />} />
            <Route path="view-student-result" element={<ViewStudentResultPage />} />
            <Route path="view-class-result" element={<ViewClassResultPage />} />
            <Route path="promote-students" element={<PromoteStudentsPage />} />
            <Route path="manage-scores" element={<ManageScoresPage />} />
            <Route path="attendance-summaries" element={<AttendanceSummariesPage />} />
          </Route>

          {/* Learning */}
          <Route path="learning">
            <Route index element={<LessonNotesPage />} />
            <Route path="lesson-notes" element={<LessonNotesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
          </Route>

          {/* Tests */}
          <Route path="tests">
            <Route index element={<TestsPage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="scheduled" element={<ScheduledTestsPage />} />
            <Route path="list" element={<TestsPage />} />
            <Route path="results" element={<ResultsPage />} />
          </Route>

          {/* Results */}
          <Route path="results">
            <Route index element={<UploadResultsPage />} />
            <Route path="upload-assessment" element={<UploadAssessmentPage />} />
            <Route path="upload-omitted" element={<UploadOmittedPage />} />
            <Route path="upload-weekly" element={<UploadWeeklyPage />} />
            <Route path="upload" element={<UploadResultsPage />} />
            <Route path="view-scores" element={<ViewScoresPage />} />
          </Route>

          {/* Sections */}
          <Route path="sections">
            <Route index element={<SectionsPage />} />
            <Route path="sections" element={<SectionsPage />} />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="class-groups" element={<ClassGroupsPage />} />
            <Route path="assign-class" element={<AssignFormTeacherPage />} />
            <Route path="class-average" element={<ClassAvgDenominatorPage />} />
          </Route>

          {/* Finances */}
          <Route path="finances">
            <Route index element={<FeesPage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="fee-type" element={<FeeTypePage />} />
            <Route path="assign-fees" element={<AssignFeesPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="paid-lists" element={<PaidListPage />} />
            <Route path="expenses" element={<ExpensesPage />} />
          </Route>

          {/* Inventory */}
          <Route path="inventory">
            <Route index element={<ItemsPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="item-types" element={<ItemTypesPage />} />
            <Route path="record-sale" element={<RecordSalePage />} />
            <Route path="inventory-report" element={<InventoryReportPage />} />
          </Route>

          {/* Sessions */}
          <Route path="sessions">
            <Route index element={<SessionsPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>

          {/* Settings */}
          <Route path="settings">
            <Route index element={<SchoolSettingsPage />} />
            <Route path="school" element={<SchoolSettingsPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="news-events" element={<NewsEventsPage />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;