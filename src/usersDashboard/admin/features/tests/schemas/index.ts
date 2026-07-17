import { z } from "zod";

// ─── Questions
export const questionSchema = z
  .object({
    subject:       z.string().min(1, "Subject is required"),
    class:         z.string().min(1, "Class is required"),
    type:          z.enum(["objective", "subjective", "theory"]),
    questionText:  z.string().min(1, "Question text is required"),
    marks:         z.number().min(1, "Marks must be at least 1"),
    optionA:       z.string().optional(),
    optionB:       z.string().optional(),
    optionC:       z.string().optional(),
    optionD:       z.string().optional(),
    correctOption: z.string().optional(),
    correctAnswer: z.string().optional(),
    theoryAnswer:  z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "objective") {
      if (!data.optionA)       ctx.addIssue({ code: "custom", path: ["optionA"],       message: "Option A is required" });
      if (!data.optionB)       ctx.addIssue({ code: "custom", path: ["optionB"],       message: "Option B is required" });
      if (!data.optionC)       ctx.addIssue({ code: "custom", path: ["optionC"],       message: "Option C is required" });
      if (!data.optionD)       ctx.addIssue({ code: "custom", path: ["optionD"],       message: "Option D is required" });
      if (!data.correctOption) ctx.addIssue({ code: "custom", path: ["correctOption"], message: "Correct option is required" });
    }
    if (data.type === "subjective") {
      if (!data.correctAnswer) ctx.addIssue({ code: "custom", path: ["correctAnswer"], message: "Correct answer is required" });
    }
  });
export type QuestionFormValues = z.infer<typeof questionSchema>;

// ─── Tests
export const createTestSchema = z.object({
  title:       z.string().min(1, "Title is required"),
  subject:     z.string().min(1, "Subject is required"),
  class:       z.string().min(1, "Class is required"),
  type:        z.string().min(1, "Type is required"),
  timeAllowed: z.number().min(1, "Time must be at least 1 minute"),
  passcode:    z.string().optional(),
});
export type CreateTestValues = z.infer<typeof createTestSchema>;

export const scheduleTestSchema = z.object({
  test:          z.string().min(1, "Test is required"),
  class:         z.string().min(1, "Class is required"),
  dateScheduled: z.string().min(1, "Date is required"),
});
export type ScheduleTestValues = z.infer<typeof scheduleTestSchema>;