import { motion } from "framer-motion";
import { BarChart3, BookOpen, CheckCircle2, FileText, Layers } from "lucide-react";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { useSchoolAcademics } from "../../hooks/useSchoolDetail";
import { TabError, TabSkeleton } from "./TabStates";
import StatTile from "./StatTile";
import ResultsUploadedChart from "./ResultsUploadedChart";
import AttendanceTrendChart from "./AttendanceTrendChart";
import ActiveTeachers from "./ActiveTeachers";

export default function AcademicsTab({ schoolId }: { schoolId: string }) {
  const { data, isLoading, isError, refetch } = useSchoolAcademics(schoolId);

  if (isLoading) return <TabSkeleton />;
  if (isError || !data) return <TabError onRetry={() => refetch()} />;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatTile icon={BookOpen} tone="blue" label="Subjects" value={data.subjects} />
        <StatTile icon={Layers} tone="amber" label="Classes" value={data.classes} />
        <StatTile icon={FileText} tone="green" label="Results Uploaded" value={data.resultsUploaded} />
        <StatTile icon={CheckCircle2} tone="purple" label="Attendance Rate" value={data.attendanceRate} suffix="%" />
        <StatTile icon={BarChart3} tone="blue" label="Lesson Notes Uploaded" value={data.lessonNotes} />
      </motion.div>
      <motion.div variants={fadeUp} className="grid gap-6 xl:grid-cols-2">
        <ResultsUploadedChart data={data.resultsByMonth} />
        <AttendanceTrendChart data={data.attendanceTrend} />
      </motion.div>
      <motion.div variants={fadeUp}><ActiveTeachers teachers={data.topTeachers} /></motion.div>
    </motion.div>
  );
}