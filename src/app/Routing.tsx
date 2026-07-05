import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import { SigninPage, SignupPage } from "@/auth";
import { AuthLayout, PublicLayout } from "./layouts";
import { LandingPage } from "@/landing";
import DashboardLayout from "./layouts/DashboardLayout";
import { DashboardHome } from "@/usersDashboard/admin/features/dashboard";
import { AdminsPage, ParentsPage, StudentsPage, TeachersPage } from "@/usersDashboard/admin/features/users";
import { AssessmentTypesPage, AttendanceSummariesPage, GradePage, ManageScoresPage, PromoteStudentsPage, PsychomotivePage, SubjectsPage, SubjectTeachersPage, ViewClassResultPage, ViewStudentResultPage } from "@/usersDashboard/admin/features/academics";
import { AttendancePage, LessonNotesPage } from "@/usersDashboard/admin/features/learning";
import { QuestionsPage, ResultsPage, ScheduledTestsPage, TestsPage } from "@/usersDashboard/admin/features/tests";
import { UploadAssessmentPage, UploadOmittedPage, UploadResultsPage, UploadWeeklyPage, ViewScoresPage } from "@/usersDashboard/admin/features/results";
import { ClassAvgDenominatorPage, ClassesPage, ClassGroupsPage, SectionsPage } from "@/usersDashboard/admin/features/sections";
import AssignFormTeacherPage from "@/usersDashboard/admin/features/sections/pages/AssignFormTeacherPage";
import { AssignFeesPage, ExpensesPage, FeesPage, FeeTypePage, PaidListPage, PaymentsPage } from "@/usersDashboard/admin/features/finances";
import { InventoryReportPage, ItemsPage, ItemTypesPage, RecordSalePage } from "@/usersDashboard/admin/features/inventory";
import { SessionsPage, TermsPage } from "@/usersDashboard/admin/features/sessions";
import { NewsEventsPage, SchoolSettingsPage, TestimonialsPage } from "@/usersDashboard/admin/features/settings";


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