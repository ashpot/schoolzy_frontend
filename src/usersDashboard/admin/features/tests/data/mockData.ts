import type { Question, Test, ScheduledTest, TestResult, QuestionResult } from "../types";

// ─── Questions mock ────────────────────────────────────────────────────────
export const mockQuestions: Question[] = [
  {
    id: "q-001", subject: "Civic Education", class: "SS 2",
    questionText: "Which arm of government is responsible for making laws...",
    type: "objective", marks: 2, correctAnswer: "Option B",
    optionA: "Executive arm", optionB: "Legislative arm",
    optionC: "Judicial arm",  optionD: "Federal arm", correctOption: "B",
  },
  {
    id: "q-002", subject: "Mathematics", class: "SS 1",
    questionText: "Solve for x: 3x + 7 = 22",
    type: "objective", marks: 3, correctAnswer: "Option C",
    optionA: "x = 3", optionB: "x = 4", optionC: "x = 5", optionD: "x = 6", correctOption: "C",
  },
  {
    id: "q-003", subject: "English Language", class: "JSS 1",
    questionText: "Write a short paragraph describing your best holiday ex…",
    type: "subjective", marks: 10, correctAnswer: "Accept any well-written paragraph with p…",
  },
  {
    id: "q-004", subject: "Biology", class: "SS 1",
    questionText: "Explain the process of photosynthesis and state two pro…",
    type: "theory", marks: 15, correctAnswer: "Photosynthesis is the process by which g…",
  },
  {
    id: "q-005", subject: "Economics", class: "SS 2",
    questionText: "Define inflation and list three causes of demand-pull i…",
    type: "theory", marks: 12, correctAnswer: "Inflation is a sustained increase in the…",
  },
];

// ─── Tests mock ────────────────────────────────────────────────────────────
export const mockTests: Test[] = [
  { id: "t-001", title: "Civic Education Exam",  class: "SS 1",  subject: "Civic Education",  type: "Exam", timeAllowed: 90, passcode: "qNwLGAYJ", dateCreated: "15 Jan 2026" },
  { id: "t-002", title: "Mathematics Test",       class: "SS 2",  subject: "Mathematics",       type: "Test", timeAllowed: 45, passcode: "mB3xTk9P", dateCreated: "03 Feb 2026" },
  { id: "t-003", title: "English Language Quiz",  class: "JSS 1", subject: "English Language",  type: "Quiz", timeAllowed: 30, passcode: "rZ7vCw2N", dateCreated: "18 Feb 2026" },
  { id: "t-004", title: "Biology Exam",           class: "SS 3",  subject: "Biology",           type: "Exam", timeAllowed: 90, passcode: "hK5pLs8Q", dateCreated: "07 Mar 2026" },
  { id: "t-005", title: "Economics Test",         class: "SS 2",  subject: "Economics",         type: "Test", timeAllowed: 45, passcode: "dY4jFn6R", dateCreated: "22 Mar 2026" },
];

// ─── Scheduled tests mock ──────────────────────────────────────────────────
export const mockScheduledTests: ScheduledTest[] = [
  { id: "st-001", testTitle: "Civic Education Exam",  subject: "Civic Education",  type: "Exam", timeAllowed: 90, class: "SS 1",  dateScheduled: "15 Jan 2026", dateCreated: "06 Jan 2026", status: "past" },
  { id: "st-002", testTitle: "Mathematics Test",       subject: "Mathematics",       type: "Test", timeAllowed: 45, class: "SS 2",  dateScheduled: "03 Feb 2026", dateCreated: "15 Jan 2026", status: "past" },
  { id: "st-003", testTitle: "English Language Quiz",  subject: "English Language",  type: "Quiz", timeAllowed: 30, class: "JSS 1", dateScheduled: "18 Feb 2026", dateCreated: "28 Jan 2026", status: "past" },
  { id: "st-004", testTitle: "Biology Exam",           subject: "Biology",           type: "Exam", timeAllowed: 90, class: "SS 2",  dateScheduled: "07 Mar 2026", dateCreated: "11 Feb 2026", status: "upcoming" },
  { id: "st-005", testTitle: "Economics Test",         subject: "Economics",         type: "Test", timeAllowed: 45, class: "SS 2",  dateScheduled: "22 Mar 2026", dateCreated: "19 Feb 2026", status: "upcoming" },
  { id: "st-006", testTitle: "Civic Education Exam",  subject: "Civic Education",  type: "Exam", timeAllowed: 90, class: "SS 2",  dateScheduled: "28 Mar 2026", dateCreated: "20 Feb 2026", status: "upcoming" },
  { id: "st-007", testTitle: "Mathematics Test",       subject: "Mathematics",       type: "Test", timeAllowed: 45, class: "SS 1",  dateScheduled: "04 Apr 2026", dateCreated: "01 Mar 2026", status: "upcoming" },
  { id: "st-008", testTitle: "Biology Exam",           subject: "Biology",           type: "Exam", timeAllowed: 90, class: "SS 3",  dateScheduled: "10 Apr 2026", dateCreated: "05 Mar 2026", status: "upcoming" },
  { id: "st-009", testTitle: "English Language Quiz",  subject: "English Language",  type: "Quiz", timeAllowed: 30, class: "JSS 2", dateScheduled: "18 Apr 2026", dateCreated: "10 Mar 2026", status: "upcoming" },
];

// ─── Results mock ──────────────────────────────────────────────────────────
type QBank = { q: string; correct: string; wrong: string }[];

const ENG_BANK: QBank = [
  { q: "Which of the following is a noun?",                          correct: "Happiness",                      wrong: "Beautiful"                  },
  { q: "Identify the verb in: 'She sings beautifully.'",             correct: "Sings",                          wrong: "Beautifully"                },
  { q: "Which sentence is in passive voice?",                        correct: "The man was bitten by the dog.", wrong: "The dog bit the man."       },
  { q: "What is an antonym of 'benevolent'?",                        correct: "Malevolent",                     wrong: "Generous"                   },
  { q: "Choose the correctly punctuated sentence:",                  correct: "It's raining today.",            wrong: "Its raining today."         },
  { q: "Identify the adjective in: 'The tall man ran.'",             correct: "Tall",                           wrong: "Ran"                        },
  { q: "A synonym for 'happy' is:",                                  correct: "Joyful",                         wrong: "Sorrowful"                  },
  { q: "Which word is a conjunction?",                               correct: "And",                            wrong: "Run"                        },
  { q: "The plural of 'mouse' is:",                                  correct: "Mice",                           wrong: "Mouses"                     },
  { q: "Identify the preposition in: 'The cat sat under the table.'",correct: "Under",                          wrong: "Sat"                        },
];

const MATH_BANK: QBank = [
  { q: "What is 12 × 8?",                  correct: "96",               wrong: "86"              },
  { q: "Solve: 3x + 7 = 22",               correct: "x = 5",            wrong: "x = 4"           },
  { q: "Area of a square with side 6 cm:", correct: "36 cm²",           wrong: "30 cm²"          },
  { q: "LCM of 4 and 6:",                  correct: "12",               wrong: "8"               },
  { q: "15% of 200:",                      correct: "30",               wrong: "25"              },
  { q: "√144 =",                           correct: "12",               wrong: "11"              },
  { q: "Factorize: x² − 9",               correct: "(x + 3)(x − 3)",   wrong: "(x + 9)(x − 9)" },
  { q: "What is 2³?",                      correct: "8",                wrong: "6"               },
  { q: "Simplify 4/8:",                    correct: "1/2",              wrong: "2/3"             },
  { q: "Solve: 5y = 35",                   correct: "y = 7",            wrong: "y = 8"           },
];

const CIVIC_BANK: QBank = [
  { q: "Which arm of government makes laws?",        correct: "Legislature",                              wrong: "Executive"                          },
  { q: "The head of state in Nigeria is:",           correct: "The President",                            wrong: "The Governor"                       },
  { q: "How many states are in Nigeria?",            correct: "36",                                       wrong: "30"                                 },
  { q: "INEC stands for:",                           correct: "Independent National Electoral Commission",wrong: "International National Electoral Council" },
  { q: "The symbol of the judiciary is:",            correct: "Scales of justice",                        wrong: "A crown"                            },
  { q: "Which document guarantees citizens' rights?",correct: "The Constitution",                         wrong: "The Budget"                         },
  { q: "A referendum is:",                           correct: "A vote by the public on a question",       wrong: "An election for president"          },
  { q: "The Nigerian flag colours are:",             correct: "Green and White",                          wrong: "Blue and White"                     },
  { q: "Federalism means:",                          correct: "Power shared between centre and states",   wrong: "All power at the centre"            },
  { q: "Primary elections are conducted by:",        correct: "Political parties",                        wrong: "INEC"                               },
];

const PHYS_BANK: QBank = [
  { q: "Unit of force:",                     correct: "Newton",          wrong: "Joule"          },
  { q: "Speed = Distance ÷",                 correct: "Time",            wrong: "Mass"           },
  { q: "Ohm's law states V =",               correct: "IR",              wrong: "I/R"            },
  { q: "Light travels at approximately:",    correct: "3 × 10⁸ m/s",    wrong: "3 × 10⁶ m/s"   },
  { q: "A concave lens causes light to:",    correct: "Diverge",         wrong: "Converge"       },
  { q: "The SI unit of energy is:",          correct: "Joule",           wrong: "Watt"           },
  { q: "Newton's first law is also called:", correct: "Law of inertia",  wrong: "Law of gravity" },
  { q: "Frequency is measured in:",          correct: "Hertz",           wrong: "Metres"         },
  { q: "An echo is caused by:",              correct: "Reflection of sound", wrong: "Absorption of sound" },
  { q: "Pressure = Force ÷",                correct: "Area",            wrong: "Volume"         },
];

const ECON_BANK: QBank = [
  { q: "Economics is the study of:",                      correct: "Scarcity and choice",               wrong: "Profit and loss"             },
  { q: "Inflation means prices are:",                     correct: "Rising",                            wrong: "Falling"                     },
  { q: "GDP stands for:",                                 correct: "Gross Domestic Product",            wrong: "General Domestic Profit"     },
  { q: "Law of demand: when price rises, demand:",        correct: "Falls",                             wrong: "Rises"                       },
  { q: "A monopoly is:",                                  correct: "One seller in the market",          wrong: "Many sellers in the market"  },
  { q: "Opportunity cost is:",                            correct: "The next best alternative forgone", wrong: "The actual cost of a product"},
  { q: "Which is a factor of production?",                correct: "Land",                              wrong: "Money"                       },
  { q: "A subsidy is given by:",                          correct: "Government",                        wrong: "Banks"                       },
  { q: "Free trade means:",                               correct: "No trade barriers",                 wrong: "Trade is free of cost"       },
  { q: "The demand curve slopes:",                        correct: "Downward",                          wrong: "Upward"                      },
];

const CHEM_BANK: QBank = [
  { q: "The chemical symbol for gold is:",  correct: "Au",              wrong: "Go"              },
  { q: "pH of pure water:",                 correct: "7",               wrong: "14"              },
  { q: "Atomic number of carbon:",          correct: "6",               wrong: "8"               },
  { q: "Water is made of:",                 correct: "H₂O",             wrong: "CO₂"             },
  { q: "An acid turns litmus:",             correct: "Red",             wrong: "Blue"            },
  { q: "The lightest element is:",          correct: "Hydrogen",        wrong: "Helium"          },
  { q: "NaCl is the formula for:",          correct: "Table salt",      wrong: "Baking soda"     },
  { q: "Oxidation involves loss of:",       correct: "Electrons",       wrong: "Protons"         },
  { q: "Alkanes have the general formula:", correct: "CₙH₂ₙ₊₂",       wrong: "CₙH₂ₙ"          },
  { q: "Photosynthesis produces:",          correct: "Oxygen",          wrong: "Carbon dioxide"  },
];

function buildQuestions(bank: QBank, rightCount: number): QuestionResult[] {
  return bank.map((item, i) => ({
    id:            `q-${i + 1}`,
    number:        i + 1,
    questionText:  item.q,
    studentAnswer: i < rightCount ? item.correct : item.wrong,
    correctAnswer: item.correct,
    isCorrect:     i < rightCount,
  }));
}

export const mockResults: TestResult[] = [
  {
    id: "r-001", dateAdded: "02 Apr 2026",
    student: { name: "Chidinma Harold", class: "SS 2A" },
    test: "English Language - Test", subject: "English Language", testType: "Test",
    right: 8, wrong: 2, totalQuestions: 10, score: 80, grade: "A1",
    questions: buildQuestions(ENG_BANK, 8),
  },
  {
    id: "r-002", dateAdded: "03 Apr 2026",
    student: { name: "Kelechi Igwe", class: "SS 2A" },
    test: "Mathematics - Quiz", subject: "Mathematics", testType: "Quiz",
    right: 8, wrong: 2, totalQuestions: 10, score: 80, grade: "A1",
    questions: buildQuestions(MATH_BANK, 8),
  },
  {
    id: "r-003", dateAdded: "04 Apr 2026",
    student: { name: "Femi Ade", class: "SS 1A" },
    test: "Civic Education - Test", subject: "Civic Education", testType: "Test",
    right: 8, wrong: 2, totalQuestions: 10, score: 80, grade: "A1",
    questions: buildQuestions(CIVIC_BANK, 8),
  },
  {
    id: "r-004", dateAdded: "06 Apr 2026",
    student: { name: "Emeka Okeke", class: "SS 3C" },
    test: "Physics - Test", subject: "Physics", testType: "Test",
    right: 7, wrong: 3, totalQuestions: 10, score: 70, grade: "B3",
    questions: buildQuestions(PHYS_BANK, 7),
  },
  {
    id: "r-005", dateAdded: "08 Apr 2026",
    student: { name: "Zainab Yusuf", class: "SS 2B" },
    test: "Economics - Quiz", subject: "Economics", testType: "Quiz",
    right: 10, wrong: 0, totalQuestions: 10, score: 100, grade: "A1",
    questions: buildQuestions(ECON_BANK, 10),
  },
  {
    id: "r-006", dateAdded: "08 Apr 2026",
    student: { name: "Chinedu Obi", class: "SS 3A" },
    test: "Chemistry - Test", subject: "Chemistry", testType: "Test",
    right: 5, wrong: 5, totalQuestions: 10, score: 50, grade: "D7",
    questions: buildQuestions(CHEM_BANK, 5),
  },
  {
    id: "r-007", dateAdded: "12 Apr 2026",
    student: { name: "Ngozi Anthony", class: "JSS 1A" },
    test: "English Language - Quiz", subject: "English Language", testType: "Quiz",
    right: 7, wrong: 3, totalQuestions: 10, score: 70, grade: "B3",
    questions: buildQuestions(ENG_BANK, 7),
  },
];

// ─── Select options ────────────────────────────────────────────────────────
export const subjectOptions = [
  { value: "civic-education",  label: "Civic Education" },
  { value: "mathematics",      label: "Mathematics" },
  { value: "english-language", label: "English Language" },
  { value: "biology",          label: "Biology" },
  { value: "economics",        label: "Economics" },
  { value: "physics",          label: "Physics" },
  { value: "chemistry",        label: "Chemistry" },
  { value: "government",       label: "Government" },
];

export const classOptions = [
  { value: "jss-1", label: "JSS 1" },
  { value: "jss-2", label: "JSS 2" },
  { value: "jss-3", label: "JSS 3" },
  { value: "ss-1",  label: "SS 1" },
  { value: "ss-2",  label: "SS 2" },
  { value: "ss-3",  label: "SS 3" },
];

export const correctOptionOptions = [
  { value: "A", label: "Option A" },
  { value: "B", label: "Option B" },
  { value: "C", label: "Option C" },
  { value: "D", label: "Option D" },
];

export const testTypeOptions = [
  { value: "Exam", label: "Exam" },
  { value: "Test", label: "Test" },
  { value: "Quiz", label: "Quiz" },
];

export const testSelectOptions = mockTests.map((t) => ({
  value: t.id,
  label: t.title,
}));