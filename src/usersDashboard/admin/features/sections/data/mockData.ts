import type { Section, Class, ClassGroup, Teacher, FormTeacherAssignment, Denominator } from "../types";

export const mockSections: Section[] = [
  { id: "1",  title: "Sciences",        code: "SCI",  showPosition: true  },
  { id: "2",  title: "Arts",            code: "ARTS", showPosition: true  },
  { id: "3",  title: "Commercial",      code: "COM",  showPosition: false },
  { id: "4",  title: "Social Sciences", code: "SS",   showPosition: true  },
  { id: "5",  title: "Technical",       code: "TECH", showPosition: false },
  { id: "6",  title: "Vocational",      code: "VOC",  showPosition: false },
  { id: "7",  title: "Languages",       code: "LANG", showPosition: true  },
  { id: "8",  title: "Mathematics",     code: "MATH", showPosition: true  },
  { id: "9",  title: "Humanities",      code: "HUM",  showPosition: true  },
  { id: "10", title: "Engineering",     code: "ENG",  showPosition: false },
];

export const mockClasses: Class[] = [
  { id: "1",  name: "Nursery 1", code: "NUR1", section: "Languages"      },
  { id: "2",  name: "Nursery 2", code: "NUR2", section: "Languages"      },
  { id: "3",  name: "Primary 1", code: "PRI1", section: "Arts"           },
  { id: "4",  name: "Primary 2", code: "PRI2", section: "Arts"           },
  { id: "5",  name: "Primary 3", code: "PRI3", section: "Arts"           },
  { id: "6",  name: "JSS 1",     code: "JSS1", section: "Social Sciences" },
  { id: "7",  name: "JSS 2",     code: "JSS2", section: "Social Sciences" },
  { id: "8",  name: "JSS 3",     code: "JSS3", section: "Social Sciences" },
  { id: "9",  name: "SS 1",      code: "SS1",  section: "Sciences"       },
  { id: "10", name: "SS 2",      code: "SS2",  section: "Sciences"       },
  { id: "11", name: "SS 3",      code: "SS3",  section: "Sciences"       },
];

export const mockClassGroups: ClassGroup[] = [
  { id: "1",  name: "JSS 1 Science",   code: "J1SCI", parentClass: "JSS 1" },
  { id: "2",  name: "JSS 1 Arts",      code: "J1ART", parentClass: "JSS 1" },
  { id: "3",  name: "JSS 2 Science",   code: "J2SCI", parentClass: "JSS 2" },
  { id: "4",  name: "JSS 2 Arts",      code: "J2ART", parentClass: "JSS 2" },
  { id: "5",  name: "SS 1 Science",    code: "S1SCI", parentClass: "SS 1"  },
  { id: "6",  name: "SS 1 Commercial", code: "S1COM", parentClass: "SS 1"  },
  { id: "7",  name: "SS 2 Science",    code: "S2SCI", parentClass: "SS 2"  },
  { id: "8",  name: "SS 2 Arts",       code: "S2ART", parentClass: "SS 2"  },
  { id: "9",  name: "SS 3 Science",    code: "S3SCI", parentClass: "SS 3"  },
  { id: "10", name: "SS 3 Arts",       code: "S3ART", parentClass: "SS 3"  },
];

export const mockTeachers: Teacher[] = [
  { id: "1",  name: "Mrs. Adaeze Okonkwo", subject: "Mathematics"      },
  { id: "2",  name: "Mr. Emeka Nwosu",     subject: "English Language" },
  { id: "3",  name: "Ms. Fatima Bello",    subject: "Biology"          },
  { id: "4",  name: "Mr. Chukwudi Eze",    subject: "Physics"          },
  { id: "5",  name: "Mrs. Ngozi Amara",    subject: "Chemistry"        },
  { id: "6",  name: "Mr. Tunde Adesanya",  subject: "Economics"        },
  { id: "7",  name: "Ms. Amina Yusuf",     subject: "Geography"        },
  { id: "8",  name: "Mr. Segun Adewale",   subject: "Government"       },
  { id: "9",  name: "Mrs. Chioma Obi",     subject: "Literature"       },
  { id: "10", name: "Mr. Yusuf Ibrahim",   subject: "Further Maths"    },
  { id: "11", name: "Ms. Blessing Eze",    subject: "Civic Education"  },
  { id: "12", name: "Mr. Dauda Musa",      subject: "Agricultural Sci" },
];

export const mockAssignments: FormTeacherAssignment[] = [
  { id: "1", className: "JSS 1",     teacherName: "Mrs. Adaeze Okonkwo", subject: "Mathematics",      assignedBy: "Admin", assignedAt: "01 Sept 2025" },
  { id: "2", className: "JSS 2",     teacherName: "Mr. Emeka Nwosu",     subject: "English Language", assignedBy: "Admin", assignedAt: "01 Sept 2025" },
  { id: "3", className: "JSS 3",     teacherName: "Ms. Fatima Bello",    subject: "Biology",          assignedBy: "Admin", assignedAt: "01 Sept 2025" },
  { id: "4", className: "SS 1",      teacherName: "Mr. Chukwudi Eze",    subject: "Physics",          assignedBy: "Admin", assignedAt: "02 Sept 2025" },
  { id: "5", className: "SS 2",      teacherName: "Mrs. Ngozi Amara",    subject: "Chemistry",        assignedBy: "Admin", assignedAt: "02 Sept 2025" },
  { id: "6", className: "SS 3",      teacherName: "Mr. Tunde Adesanya",  subject: "Economics",        assignedBy: "Admin", assignedAt: "02 Sept 2025" },
  { id: "7", className: "Primary 1", teacherName: "Ms. Amina Yusuf",     subject: "Geography",        assignedBy: "Admin", assignedAt: "03 Sept 2025" },
  { id: "8", className: "Primary 2", teacherName: "Mr. Segun Adewale",   subject: "Government",       assignedBy: "Admin", assignedAt: "03 Sept 2025" },
];

export const mockDenominators: Denominator[] = [
  { id: "1", denominator: 100, className: "JSS 1"     },
  { id: "2", denominator: 100, className: "JSS 2"     },
  { id: "3", denominator: 100, className: "JSS 3"     },
  { id: "4", denominator: 100, className: "SS 1"      },
  { id: "5", denominator:  50, className: "Primary 1" },
  { id: "6", denominator:  50, className: "Primary 2" },
];

export const sectionSelectOptions = mockSections.map((s) => ({ value: s.title, label: s.title }));
export const classSelectOptions   = mockClasses.map((c)   => ({ value: c.name,  label: c.name  }));
export const teacherSelectOptions = mockTeachers.map((t)  => ({ value: t.id,    label: t.name  }));