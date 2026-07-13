import clsx from "clsx";
import { CheckCircle2, CircleAlert } from "lucide-react";

import {
  getQuestionDomId,
  isQuestionAnswered,
  isQuestionCorrect,
} from "@/features/assessment/domain/assessmentEngine";
import type {
  AssessmentQuestion,
  AssessmentResponse,
  ChoiceQuestion,
  CompletionQuestion,
  TextQuestion,
} from "@/features/assessment/domain/types";

type AssessmentQuestionCardProps = {
  readonly assessmentId: string;
  readonly question: AssessmentQuestion;
  readonly position: number;
  readonly questionCount: number;
  readonly response: AssessmentResponse | undefined;
  readonly submitted: boolean;
  readonly onChange: (response: AssessmentResponse) => void;
};

export default function AssessmentQuestionCard({
  assessmentId,
  question,
  position,
  questionCount,
  response,
  submitted,
  onChange,
}: AssessmentQuestionCardProps) {
  const correct = isQuestionCorrect(question, response);
  const answered = isQuestionAnswered(question, response);
  const titleId = assessmentId + "-question-title-" + String(question.id);
  const instructionId =
    assessmentId + "-question-instruction-" + String(question.id);

  return (
    <article
      id={getQuestionDomId(assessmentId, question.id)}
      aria-labelledby={titleId}
      className={clsx(
        "min-w-0 scroll-mt-4 overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-slate-900",
        submitted
          ? correct
            ? "border-emerald-300 dark:border-emerald-800"
            : "border-red-300 dark:border-red-900"
          : "border-slate-200 dark:border-slate-700"
      )}
    >
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-950/50">
        <div>
          <h3 id={titleId} className="font-bold text-slate-900 dark:text-white">
            Question {position}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {position} of {questionCount}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {submitted ? (
            <span
              className={clsx(
                "flex items-center gap-1 text-xs font-bold",
                correct
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-red-700 dark:text-red-300"
              )}
            >
              {correct ? (
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              ) : (
                <CircleAlert aria-hidden="true" className="h-4 w-4" />
              )}
              {correct ? "Correct" : answered ? "Incorrect" : "Unanswered"}
            </span>
          ) : null}
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {question.points} pts
          </span>
        </div>
      </header>

      <div className="space-y-5 px-5 py-6 sm:px-7">
        <p className="text-base leading-7 font-medium text-slate-900 dark:text-slate-100">
          {question.prompt}
        </p>
        {question.instruction ? (
          <p
            id={instructionId}
            className="text-sm text-slate-600 italic dark:text-slate-300"
          >
            {question.instruction}
          </p>
        ) : null}
        {question.code ? (
          <pre
            tabIndex={0}
            aria-label={"Java code for question " + String(position)}
            className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-100 shadow-inner focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
          >
            <code>{question.code}</code>
          </pre>
        ) : null}

        {question.kind === "single" || question.kind === "multiple" ? (
          <ChoiceAnswer
            assessmentId={assessmentId}
            instructionId={question.instruction ? instructionId : undefined}
            question={question}
            response={response}
            submitted={submitted}
            onChange={onChange}
          />
        ) : null}
        {question.kind === "text" ? (
          <TextAnswer
            assessmentId={assessmentId}
            instructionId={instructionId}
            question={question}
            response={response}
            submitted={submitted}
            onChange={onChange}
          />
        ) : null}
        {question.kind === "completion" ? (
          <CompletionAnswer
            instructionId={instructionId}
            question={question}
            response={response}
            submitted={submitted}
            onChange={onChange}
          />
        ) : null}
      </div>
    </article>
  );
}

function ChoiceAnswer({
  assessmentId,
  instructionId,
  question,
  response,
  submitted,
  onChange,
}: {
  assessmentId: string;
  instructionId: string | undefined;
  question: ChoiceQuestion;
  response: AssessmentResponse | undefined;
  submitted: boolean;
  onChange: (response: AssessmentResponse) => void;
}) {
  const selected =
    response?.kind === "choice" ? response.selectedOptionIndexes : [];

  const updateChoice = (optionIndex: number) => {
    const next =
      question.kind === "single"
        ? [optionIndex]
        : selected.includes(optionIndex)
          ? selected.filter((index) => index !== optionIndex)
          : [...selected, optionIndex];
    onChange({ kind: "choice", selectedOptionIndexes: next });
  };

  return (
    <fieldset
      disabled={submitted}
      aria-describedby={instructionId}
      className="space-y-3"
    >
      <legend className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">
        {question.kind === "multiple"
          ? "Group of answer choices — check all that apply"
          : "Group of answer choices"}
      </legend>
      {question.options.map((option, optionIndex) => {
        const inputId =
          assessmentId +
          "-question-" +
          String(question.id) +
          "-option-" +
          String(optionIndex);
        const isSelected = selected.includes(optionIndex);
        return (
          <label
            key={inputId}
            htmlFor={inputId}
            className={clsx(
              "flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm leading-6 transition-colors",
              isSelected
                ? "border-sky-400 bg-sky-50 text-sky-950 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-100"
                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
              submitted && "cursor-default"
            )}
          >
            <input
              id={inputId}
              name={"assessment-question-" + String(question.id)}
              type={question.kind === "multiple" ? "checkbox" : "radio"}
              checked={isSelected}
              onChange={() => updateChoice(optionIndex)}
              className="mt-1 h-4 w-4 shrink-0 accent-sky-700"
            />
            <span>{option}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

function TextAnswer({
  assessmentId,
  instructionId,
  question,
  response,
  submitted,
  onChange,
}: {
  assessmentId: string;
  instructionId: string;
  question: TextQuestion;
  response: AssessmentResponse | undefined;
  submitted: boolean;
  onChange: (response: AssessmentResponse) => void;
}) {
  const inputId = assessmentId + "-question-" + String(question.id) + "-text";
  return (
    <div>
      <label
        className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
        htmlFor={inputId}
      >
        Your answer
      </label>
      <input
        id={inputId}
        type="text"
        value={response?.kind === "text" ? response.value : ""}
        disabled={submitted}
        aria-describedby={instructionId}
        onChange={(event) =>
          onChange({ kind: "text", value: event.target.value })
        }
        className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 font-mono text-sm text-slate-950 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-800"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

function CompletionAnswer({
  instructionId,
  question,
  response,
  submitted,
  onChange,
}: {
  instructionId: string;
  question: CompletionQuestion;
  response: AssessmentResponse | undefined;
  submitted: boolean;
  onChange: (response: AssessmentResponse) => void;
}) {
  const values = response?.kind === "completion" ? response.values : {};
  const updateBlank = (blankId: string, value: string) => {
    const nextValues = { ...values };
    if (value) nextValues[blankId] = value;
    else delete nextValues[blankId];
    onChange({ kind: "completion", values: nextValues });
  };

  return (
    <div>
      <p className="mb-2 text-xs text-slate-500 sm:hidden dark:text-slate-400">
        Scroll the code horizontally to reach every blank.
      </p>
      <div
        tabIndex={0}
        aria-describedby={instructionId}
        aria-label={"Interactive Java code for question " + String(question.id)}
        className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 shadow-inner focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none sm:p-5"
      >
        <div className="min-w-max font-mono text-sm leading-10 text-slate-100">
          {question.lines.map((line, lineIndex) => (
            <div
              key={String(question.id) + "-line-" + String(lineIndex)}
              className="min-h-10"
            >
              {line.map((segment, segmentIndex) =>
                segment.blank ? (
                  <select
                    key={segment.blank.id}
                    value={values[segment.blank.id] ?? ""}
                    disabled={submitted}
                    onChange={(event) =>
                      updateBlank(segment.blank.id, event.target.value)
                    }
                    aria-label={
                      "Question " +
                      String(question.id) +
                      ", " +
                      segment.blank.id.replaceAll("-", " ")
                    }
                    className="mx-1 min-h-9 max-w-64 rounded-md border border-sky-400/60 bg-slate-800 px-2 py-1 font-mono text-sm text-sky-100 focus:ring-2 focus:ring-sky-400 focus:outline-none disabled:opacity-80"
                  >
                    <option value="">Select…</option>
                    {segment.blank.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    key={
                      String(question.id) +
                      "-" +
                      String(lineIndex) +
                      "-" +
                      String(segmentIndex)
                    }
                  >
                    {segment.text}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
