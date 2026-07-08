import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import { SigninPage, SignupPage } from "@/auth";
import { AdminDashboardLayout, AuthLayout, DashboardLayout, PublicLayout } from "./layouts";
import { LandingPage } from "@/landing";
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
import { DashboardPage as ParentDashboardPage } from "@/usersDashboard/parent/features/dashboard";
import { DashboardPage as StudentDashboardPage } from "@/usersDashboard/student/features/dashboard";
import { PayFeesPage, PaymentHistoryPage } from "@/usersDashboard/parent/features/fees";
import { MyClassPage } from "@/usersDashboard/student/features/my-class";
import { MyResultsPage } from "@/usersDashboard/student/features/my-results";
import { MyFeesPage } from "@/usersDashboard/student/features/my-fees";
import { DashboardPage as TeacherDashboardPage } from "@/usersDashboard/teacher/features/dashboard";
import { AttendanceSummaryPage, ClassListPage } from "@/usersDashboard/teacher/features/my-classes";
import { LessonNotesPage as TeacherLessonNotesPage, AttendancePage as TeacherAttendancePage } from "@/usersDashboard/teacher/features/learning";
import {
  EnterScoresPage,
  UploadResultsPage as TeacherUploadResultsPage,
  UploadOmittedPage as TeacherUploadOmittedPage,
  ViewResultsPage,
  ImportScoresPage,
  ViewSubjectResultsPage,
  ViewUploadedScoresPage
} from "@/usersDashboard/teacher/features/results";
import NotFoundPage from "@/shared/components/NotFoundPage";
import { CheckResultsPage } from "@/usersDashboard/parent/features/results";



const AppRouter = () => {
  const location = useLocation();
  const ADMIN_ROOT_ROUTE = "admin-dashboard";
  const PARENT_ROOT_ROUTE = "parent-dashboard";
  const TEACHER_ROOT_ROUTE = "teacher-dashboard";
  const STUDENT_ROOT_ROUTE = "student-dashboard";


  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public ~ Landing page*/}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Route>

        {/*____________________ School Admin Dashboard __________________*/}
        <Route element={<AdminDashboardLayout />}>
          <Route path={`${ADMIN_ROOT_ROUTE}`} element={<DashboardHome />} />

          {/* Users */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/users`}>
            <Route index element={<StudentsPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="parents" element={<ParentsPage />} />
          </Route>

          {/* Academics */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/academics`}>
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
          <Route path={`/${ADMIN_ROOT_ROUTE}/learning`}>
            <Route index element={<LessonNotesPage />} />
            <Route path="lesson-notes" element={<LessonNotesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
          </Route>

          {/* Tests */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/tests`}>
            <Route index element={<TestsPage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="scheduled" element={<ScheduledTestsPage />} />
            <Route path="list" element={<TestsPage />} />
            <Route path="results" element={<ResultsPage />} />
          </Route>

          {/* Results */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/results`}>
            <Route index element={<UploadResultsPage />} />
            <Route path="upload-assessment" element={<UploadAssessmentPage />} />
            <Route path="upload-omitted" element={<UploadOmittedPage />} />
            <Route path="upload-weekly" element={<UploadWeeklyPage />} />
            <Route path="upload" element={<UploadResultsPage />} />
            <Route path="view-scores" element={<ViewScoresPage />} />
          </Route>

          {/* Sections */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/sections`}>
            <Route index element={<SectionsPage />} />
            <Route path="sections" element={<SectionsPage />} />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="class-groups" element={<ClassGroupsPage />} />
            <Route path="assign-class" element={<AssignFormTeacherPage />} />
            <Route path="class-average" element={<ClassAvgDenominatorPage />} />
          </Route>

          {/* Finances */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/finances`}>
            <Route index element={<FeesPage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="fee-type" element={<FeeTypePage />} />
            <Route path="assign-fees" element={<AssignFeesPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="paid-lists" element={<PaidListPage />} />
            <Route path="expenses" element={<ExpensesPage />} />
          </Route>

          {/* Inventory */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/inventory`}>
            <Route index element={<ItemsPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="item-types" element={<ItemTypesPage />} />
            <Route path="record-sale" element={<RecordSalePage />} />
            <Route path="inventory-report" element={<InventoryReportPage />} />
          </Route>

          {/* Sessions */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/sessions`}>
            <Route index element={<SessionsPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>

          {/* Settings */}
          <Route path={`/${ADMIN_ROOT_ROUTE}/settings`}>
            <Route index element={<SchoolSettingsPage />} />
            <Route path="school" element={<SchoolSettingsPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="news-events" element={<NewsEventsPage />} />
          </Route>
        </Route>
        {/*____________________ End of School Admin Dashboard __________________*/}

      <Route element={<DashboardLayout/>} >
      {/* parent's dashboard */}
        <Route path={`/${PARENT_ROOT_ROUTE}`} element={<ParentDashboardPage />} />
        <Route path={`/${PARENT_ROOT_ROUTE}/results`} element={<CheckResultsPage />} />
        <Route path={`/${PARENT_ROOT_ROUTE}/fees`}>
          <Route index element={<PayFeesPage/>} />
          <Route path="pay-fees" element={<PayFeesPage/>} />
          <Route path="payment-history" element={<PaymentHistoryPage/>}/>
        </Route>
      {/* end of parent's dashboard */}

      {/* student's dashboard */}
      <Route path={`/${STUDENT_ROOT_ROUTE}`} element={<StudentDashboardPage />} />
      <Route path={`/${STUDENT_ROOT_ROUTE}/my-class`} element={<MyClassPage />} />
      <Route path={`/${STUDENT_ROOT_ROUTE}/my-results`} element={<MyResultsPage />} />
      <Route path={`/${STUDENT_ROOT_ROUTE}/my-fees`} element={<MyFeesPage />} />
      {/* end of student's dashboard page */}

      {/* teacher's dashboard */}
      <Route path={`/${TEACHER_ROOT_ROUTE}`} element={<TeacherDashboardPage />} />
      <Route path={`/${TEACHER_ROOT_ROUTE}/my-classes`} >
        <Route index element={<ClassListPage/>} />
        <Route path="class-list" element={<ClassListPage/>} />
        <Route path="attendance-summary" element={<AttendanceSummaryPage/>} />
      </Route>
      <Route path={`/${TEACHER_ROOT_ROUTE}/teacher-learning`}>
        <Route index element={<TeacherLessonNotesPage />} />
        <Route path="lesson-notes" element={<TeacherLessonNotesPage />} />
        <Route path="attendance" element={<TeacherAttendancePage />} />
      </Route>
      <Route path={`/${TEACHER_ROOT_ROUTE}/teacher-results`}>
        <Route index element={<EnterScoresPage/>}/>
        <Route path="enter-scores" element={<EnterScoresPage/>}/>
        <Route path="upload-results" element={<TeacherUploadResultsPage/>}/>
        <Route path="upload-omitted" element={<TeacherUploadOmittedPage/>}/>
        <Route path="view-results" element={<ViewResultsPage/>}/>
        <Route path="import-scores" element={<ImportScoresPage/>}/>
        <Route path="view-subject-results" element={<ViewSubjectResultsPage/>}/>
        <Route path="view-uploaded-scores" element={<ViewUploadedScoresPage/>}/>
      </Route>
      {/* end of teacher's dashboard */}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;