export type AssessmentQuestionId = number;

type QuestionBase = {
  readonly id: AssessmentQuestionId;
  readonly points: number;
  readonly prompt: string;
  readonly instruction?: string;
  readonly code?: string;
};

export type ChoiceQuestion = QuestionBase & {
  readonly kind: "single" | "multiple";
  readonly options: readonly string[];
  readonly answer: readonly number[];
};

export type TextQuestion = QuestionBase & {
  readonly kind: "text";
  readonly instruction: string;
  readonly answers: readonly string[];
};

export type CompletionBlank = {
  readonly id: string;
  readonly options: readonly string[];
  readonly answer: string;
};

export type CompletionSegment =
  | { readonly text: string; readonly blank?: never }
  | { readonly text?: never; readonly blank: CompletionBlank };

export type CompletionQuestion = QuestionBase & {
  readonly kind: "completion";
  readonly instruction: string;
  readonly lines: readonly (readonly CompletionSegment[])[];
};

export type AssessmentQuestion =
  | ChoiceQuestion
  | TextQuestion
  | CompletionQuestion;

export type ChoiceResponse = {
  readonly kind: "choice";
  readonly selectedOptionIndexes: readonly number[];
};

export type TextResponse = {
  readonly kind: "text";
  readonly value: string;
};

export type CompletionResponse = {
  readonly kind: "completion";
  readonly values: Readonly<Record<string, string>>;
};

export type AssessmentResponse =
  | ChoiceResponse
  | TextResponse
  | CompletionResponse;

export type AssessmentAnswerState = Readonly<
  Record<string, AssessmentResponse>
>;

export type AssessmentDefinition = {
  readonly id: string;
  readonly delivery: "client-practice";
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly accessCode: string;
  readonly accessHint: string;
  readonly durationSeconds: number;
  readonly storageKey: string;
  readonly questions: readonly AssessmentQuestion[];
};

export type SubmissionReason = "manual" | "time-expired";

export type LockedAttempt = {
  readonly status: "locked";
};

export type ActiveAttempt = {
  readonly status: "active";
  readonly answers: AssessmentAnswerState;
  readonly startedAt: number;
  readonly deadlineAt: number;
};

export type SubmittedAttempt = {
  readonly status: "submitted";
  readonly answers: AssessmentAnswerState;
  readonly startedAt: number;
  readonly deadlineAt: number;
  readonly submittedAt: number;
  readonly reason: SubmissionReason;
};

export type AssessmentAttempt =
  | LockedAttempt
  | ActiveAttempt
  | SubmittedAttempt;

export type AssessmentMetrics = {
  readonly answeredCount: number;
  readonly correctCount: number;
  readonly earnedPoints: number;
  readonly totalPoints: number;
  readonly progressPercentage: number;
  readonly scorePercentage: number;
};
