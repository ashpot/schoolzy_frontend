import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { questionSchema, type QuestionFormValues } from "../../schemas";
import { useAddQuestion } from "../../hooks/useTests";
import { subjectOptions, classOptions } from "../../data/mockData";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ObjectiveFields from "./ObjectiveFields";
import SubjectiveFields from "./SubjectiveFields";
import TheoryFields from "./TheoryFields";
import type { QuestionType } from "../../types";

const TABS: { value: QuestionType; label: string }[] = [
  { value: "objective",  label: "Objective" },
  { value: "subjective", label: "Subjective" },
  { value: "theory",     label: "Theory" },
];

const BLANK_DEFAULTS = {
  optionA: "", optionB: "", optionC: "", optionD: "",
  correctOption: "", correctAnswer: "", theoryAnswer: "",
};

interface Props {
  onQuestionAdded: () => void;
}

export default function QuestionForm({ onQuestionAdded }: Props) {
  const [activeTab, setActiveTab] = useState<QuestionType>("objective");
  const addMutation = useAddQuestion();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      subject: "", class: "", type: "objective",
      questionText: "", marks: "" as unknown as number,
      ...BLANK_DEFAULTS,
    },
  });

  const handleTabChange = (tab: QuestionType) => {
    const { subject, class: cls, questionText, marks } = getValues();
    setActiveTab(tab);
    reset({ subject, class: cls, questionText, marks, type: tab, ...BLANK_DEFAULTS });
  };

  const onSubmit = (values: QuestionFormValues) => {
    addMutation.mutate(values, {
      onSuccess: () => {
        onQuestionAdded();
        reset({ subject: "", class: "", type: activeTab, questionText: "",
          marks: "" as unknown as number, ...BLANK_DEFAULTS });
      },
    });
  };

  const isLoading = addMutation.isPending;

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-md bg-blue-50 flex-center">
          <Plus className="w-3.5 h-3.5 text-text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-text-nav">
          Add Question
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Subject + Class */}
        <div className="grid grid-cols-3 gap-4">
          <FormSelect
            label="Subject"
            placeholder="Select Subject"
            options={subjectOptions}
            required
            isLoading={isLoading}
            error={errors.subject?.message}
            {...register("subject")}
          />
          <FormSelect
            label="Class"
            placeholder="Select Class"
            options={classOptions}
            required
            isLoading={isLoading}
            error={errors.class?.message}
            {...register("class")}
          />
          {/* Question Type — driven by tabs below, slot kept for visual alignment */}
          <div>
            <label className="block text-sm font-medium text-label mb-2">
              Question Type
            </label>
            <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-0.5">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleTabChange(tab.value)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.value
                      ? "bg-white shadow-sm text-text-nav"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-label mb-1.5">
            Question Text <span className="text-danger">*</span>
          </label>
          <textarea
            placeholder="Type your question here…"
            disabled={isLoading}
            rows={3}
            className={`w-full px-3 py-2.5 rounded-xl border bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none disabled:opacity-60 ${
              errors.questionText
                ? "border-color-danger"
                : "border-border-line02"
            }`}
            {...register("questionText")}
          />
          {errors.questionText && (
            <p className="mt-1 text-xs text-danger">
              {errors.questionText.message}
            </p>
          )}
        </div>

        {/* Mark */}
        <div className="w-40">
          <label className="block text-sm font-medium text-label mb-1.5">
            Mark <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            placeholder="# e.g. 5"
            disabled={isLoading}
            min={1}
            className={`w-full px-3 py-2.5 rounded-xl border bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all disabled:opacity-60 ${
              errors.marks
                ? "border-danger"
                : "border-border-line02"
            }`}
            {...register("marks")}
          />
          {errors.marks && (
            <p className="mt-1 text-xs text-danger">
              {errors.marks.message}
            </p>
          )}
        </div>

        {/* Dynamic fields */}
        {activeTab === "objective"  && <ObjectiveFields  register={register} errors={errors} isLoading={isLoading} />}
        {activeTab === "subjective" && <SubjectiveFields register={register} errors={errors} isLoading={isLoading} />}
        {activeTab === "theory"     && <TheoryFields     register={register} errors={errors} isLoading={isLoading} />}

        <div className="pt-1">
          <SubmitButton label="Save Question" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}