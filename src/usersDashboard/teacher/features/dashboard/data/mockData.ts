import type { TeacherDetails, Subject } from "../types";

export const mockTeacherDetails: TeacherDetails = {
  name: "Ms. Kim Williams",
  role: "Mathematics Teacher",
  classAssigned: "JSS 3A (Form Teacher)",
  email: "emeka.nwosu@schoolzy.ng",
  phone: "+234 802 345 6789",
};

export const mockSubjects: Subject[] = [
  { id: "1", name: "Mathematics", code: "MAT", classes: ["JSS 3", "SS 1"] },
  { id: "2", name: "Physics", code: "PHY", classes: ["SS 1", "SS 2"] },
  { id: "3", name: "Further Mathematics", code: "FMT", classes: ["SS 2"] },
];