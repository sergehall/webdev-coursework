import clsx from "clsx";
import {
  BookOpenCheck,
  CheckCircle2,
  CircleAlert,
  Clock3,
  LockKeyhole,
  RotateCcw,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import {
  midtermQuestions,
  midtermTotalPoints,
  type ChoiceQuestion,
  type CompletionQuestion,
  type MidtermQuestion,
  type TextQuestion,
} from "./midtermData";

type AnswerState = Record<number, string[]>;

const EXAM_DURATION_SECONDS = 60 * 60;

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, "").toLowerCase();
}

function arraysMatch(left: string[], right: string[]) {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function isQuestionCorrect(question: MidtermQuestion, answer: string[]) {
  if (question.kind === "text") {
    const response = normalizeText(answer[0] ?? "");
    return question.answers.some(
      (accepted) => normalizeText(accepted) === response
    );
  }

  if (question.kind === "completion") {
    const expected = question.lines
      .flat()
      .flatMap((segment) =>
        segment.blank ? [segment.blank.id + ":" + segment.blank.answer] : []
      );
    return arraysMatch(answer, expected);
  }

  return arraysMatch(
    answer,
    question.answer.map((optionIndex) => String(optionIndex))
  );
}

function isQuestionAnswered(question: MidtermQuestion, answer: string[]) {
  if (question.kind !== "completion") {
    return answer.length > 0 && answer.some((value) => value.trim().length > 0);
  }
  const blankCount = question.lines
    .flat()
    .filter((segment) => Boolean(segment.blank)).length;
  return answer.length === blankCount;
}

function formatTimer(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
}

export default function MidtermQuiz() {
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(
    EXAM_DURATION_SECONDS
  );

  const answeredCount = useMemo(
    () =>
      midtermQuestions.filter((question) =>
        isQuestionAnswered(question, answers[question.id] ?? [])
      ).length,
    [answers]
  );
  const earnedPoints = useMemo(
    () =>
      midtermQuestions.reduce(
        (total, question) =>
          total +
          (isQuestionCorrect(question, answers[question.id] ?? [])
            ? question.points
            : 0),
        0
      ),
    [answers]
  );

  useEffect(() => {
    if (!isStarted || submitted) return;
    const intervalId = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          setSubmitted(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [isStarted, submitted]);

  const startExam = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (accessCode.trim().toUpperCase() !== "START") {
      setAccessError("That access code is not valid. Try again.");
      return;
    }
    setAccessError("");
    setIsStarted(true);
  };

  const updateAnswer = (questionId: number, value: string[]) => {
    if (!submitted) {
      setAnswers((current) => ({ ...current, [questionId]: value }));
    }
  };

  const restartExam = () => {
    setAnswers({});
    setSubmitted(false);
    setSecondsRemaining(EXAM_DURATION_SECONDS);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isStarted) {
    return (
      <AccessGate
        accessCode={accessCode}
        accessError={accessError}
        onAccessCodeChange={setAccessCode}
        onSubmit={startExam}
      />
    );
  }

  const progress = Math.round((answeredCount / midtermQuestions.length) * 100);

  return (
    <section className="space-y-6">
      <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-7 dark:border-slate-700 dark:bg-slate-950/60">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase dark:text-sky-300">
                CS 56 · Module 8
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                Midterm Quiz
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {midtermQuestions.length} questions · {midtermTotalPoints}{" "}
                points
              </p>
            </div>
            <div
              className={clsx(
                "flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-sm font-bold",
                secondsRemaining <= 300
                  ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                  : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              )}
              aria-label={formatTimer(secondsRemaining) + " remaining"}
            >
              <Clock3 aria-hidden="true" className="h-4 w-4" />
              {formatTimer(secondsRemaining)}
            </div>
          </div>
        </div>
        {submitted ? (
          <ResultSummary
            answeredCount={answeredCount}
            earnedPoints={earnedPoints}
            onRestart={restartExam}
          />
        ) : (
          <div className="px-5 py-4 sm:px-7">
            <div className="flex justify-between gap-4 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {answeredCount} of {midtermQuestions.length} answered
              </span>
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                {progress}%
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={midtermQuestions.length}
              aria-valuenow={answeredCount}
            >
              <div
                className="h-full rounded-full bg-sky-600 transition-[width]"
                style={{ width: String(progress) + "%" }}
              />
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0 space-y-5">
          {midtermQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              answer={answers[question.id] ?? []}
              submitted={submitted}
              onChange={(value) => updateAnswer(question.id, value)}
            />
          ))}
          {!submitted ? (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              {answeredCount < midtermQuestions.length ? (
                <p className="mb-4 flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300">
                  <CircleAlert
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0"
                  />
                  {midtermQuestions.length - answeredCount} questions remain
                  unanswered. You can still submit this attempt.
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setSubmitted(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-3 font-bold text-white transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto dark:bg-sky-600 dark:hover:bg-sky-500"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
                Submit quiz
              </button>
            </div>
          ) : null}
        </div>
        <QuestionNavigator
          answers={answers}
          submitted={submitted}
          secondsRemaining={secondsRemaining}
        />
      </div>
    </section>
  );
}

type AccessGateProps = {
  accessCode: string;
  accessError: string;
  onAccessCodeChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function AccessGate({
  accessCode,
  accessError,
  onAccessCodeChange,
  onSubmit,
}: AccessGateProps) {
  return (
    <section className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="bg-slate-950 px-6 py-8 text-white sm:px-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 ring-1 ring-sky-400/30">
          <LockKeyhole aria-hidden="true" className="h-6 w-6 text-sky-300" />
        </div>
        <p className="mt-6 text-xs font-bold tracking-[0.22em] text-sky-300 uppercase">
          CS 56 · Module 8
        </p>
        <h2 className="mt-2 text-3xl font-bold">Midterm Quiz</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          The midterm consists of 33 questions. Most of them are multiple-choice
          type questions. A bit longer programming-style questions are at the
          end of the exam.
        </p>
      </div>
      <div className="grid gap-6 px-6 py-7 sm:px-10">
        <dl className="grid gap-3 sm:grid-cols-3">
          <ExamFact label="Questions" value="33" />
          <ExamFact label="Points" value="100" />
          <ExamFact label="Time limit" value="60 minutes" />
        </dl>
        <ModuleOverview />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
          <strong className="block">Before you begin</strong>
          The timer starts as soon as the access code is accepted. Use the
          question navigator to return to unanswered questions.
        </div>
        <form className="space-y-3" onSubmit={onSubmit}>
          <label
            className="block text-sm font-bold text-slate-800 dark:text-slate-100"
            htmlFor="midterm-access-code"
          >
            Enter the access code when you are ready
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="midterm-access-code"
              value={accessCode}
              onChange={(event) => onAccessCodeChange(event.target.value)}
              className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-mono tracking-[0.15em] text-slate-950 uppercase shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-describedby={
                accessError ? "midterm-access-error" : undefined
              }
              aria-invalid={Boolean(accessError)}
              placeholder="Access code"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-sky-700 px-6 py-3 font-bold text-white transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              Begin quiz
            </button>
          </div>
          {accessError ? (
            <p
              id="midterm-access-error"
              className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300"
              role="alert"
            >
              <CircleAlert aria-hidden="true" className="h-4 w-4" />
              {accessError}
            </p>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Access code: <strong className="font-mono">START</strong>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function ModuleOverview() {
  const linkClassName =
    "font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900 dark:text-sky-300 dark:decoration-sky-700 dark:hover:text-sky-100";

  return (
    <section
      aria-labelledby="midterm-module-overview-title"
      className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/40"
    >
      <h3
        id="midterm-module-overview-title"
        className="text-lg font-bold text-slate-950 dark:text-white"
      >
        Module Overview
      </h3>
      <div className="mt-4 space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
        <div className="space-y-2">
          <p>
            Welcome to the{" "}
            <a
              className={linkClassName}
              href="https://online.smc.edu/courses/83001/modules/619513"
              target="_blank"
              rel="noreferrer"
            >
              Module: Midterm
            </a>
            .
          </p>
          <p>
            This week will be the{" "}
            <a
              className={linkClassName}
              href="https://online.smc.edu/courses/83001/quizzes/512238"
              target="_blank"
              rel="noreferrer"
            >
              midterm
            </a>
            . Here&apos;s more info:
          </p>
        </div>

        <OverviewSection title="What?">
          The midterm will consist of 33 questions. It will cover all modules so
          far. The multiple choice part will be similar to the quizzes you have
          completed in the modules. The programming questions will be similar to
          the assignments you have completed in the modules. You should also
          know what design patterns are and the three categories. In particular
          you should know the design patterns discussed: Singleton, Template
          Method, Iterator.
        </OverviewSection>

        <OverviewSection title="How?">
          You need to answer all questions on Canvas without any other program
          open. Please be sure to close all notifications on your desktop. Leave
          the Canvas exam tab open at all times. You may use notes or the book
          while taking the exam but be sure to not close the exam tab on your
          computer. Also, be mindful of the time available. Answer easier
          questions first and those that may result in a higher score.
        </OverviewSection>

        <OverviewSection title="When?">
          Please reserve an uninterrupted block of 60 minutes to complete the
          midterm. You may take it at any time during the dates specified.
        </OverviewSection>

        <OverviewSection title="Anything else?">
          No, the main focus for you will be to review topics and study for the
          midterm. There won&apos;t be any new material covered and no other
          tasks to be completed in this module.
        </OverviewSection>

        <p className="font-semibold text-slate-900 dark:text-white">
          Happy programming!
        </p>
      </div>
    </section>
  );
}

function OverviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h4 className="font-bold text-slate-950 dark:text-white">{title}</h4>
      <p className="mt-1">{children}</p>
    </section>
  );
}

function ExamFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/40">
      <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 font-bold text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}

type QuestionCardProps = {
  question: MidtermQuestion;
  answer: string[];
  submitted: boolean;
  onChange: (answer: string[]) => void;
};

function QuestionCard({
  question,
  answer,
  submitted,
  onChange,
}: QuestionCardProps) {
  const correct = isQuestionCorrect(question, answer);
  const answered = isQuestionAnswered(question, answer);
  return (
    <article
      id={"midterm-question-" + String(question.id)}
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
        <h3 className="font-bold text-slate-900 dark:text-white">
          Question {question.id}
        </h3>
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
        {"instruction" in question && question.instruction ? (
          <p className="text-sm text-slate-600 italic dark:text-slate-300">
            {question.instruction}
          </p>
        ) : null}
        {"code" in question && question.code ? (
          <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-100 shadow-inner">
            <code>{question.code}</code>
          </pre>
        ) : null}
        {question.kind === "single" || question.kind === "multiple" ? (
          <ChoiceAnswer
            question={question}
            answer={answer}
            submitted={submitted}
            onChange={onChange}
          />
        ) : null}
        {question.kind === "text" ? (
          <TextAnswer
            question={question}
            answer={answer}
            submitted={submitted}
            onChange={onChange}
          />
        ) : null}
        {question.kind === "completion" ? (
          <CompletionAnswer
            question={question}
            answer={answer}
            submitted={submitted}
            onChange={onChange}
          />
        ) : null}
      </div>
    </article>
  );
}

function ChoiceAnswer({
  question,
  answer,
  submitted,
  onChange,
}: {
  question: ChoiceQuestion;
  answer: string[];
  submitted: boolean;
  onChange: (answer: string[]) => void;
}) {
  const updateChoice = (optionIndex: number) => {
    const value = String(optionIndex);
    if (question.kind === "single") {
      onChange([value]);
    } else {
      onChange(
        answer.includes(value)
          ? answer.filter((selected) => selected !== value)
          : [...answer, value]
      );
    }
  };

  return (
    <fieldset disabled={submitted} className="space-y-3">
      <legend className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">
        {question.kind === "multiple"
          ? "Group of answer choices — check all that apply"
          : "Group of answer choices"}
      </legend>
      {question.options.map((option, optionIndex) => {
        const value = String(optionIndex);
        const inputId =
          "question-" + String(question.id) + "-option-" + String(optionIndex);
        return (
          <label
            key={inputId}
            htmlFor={inputId}
            className={clsx(
              "flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm leading-6 transition",
              answer.includes(value)
                ? "border-sky-400 bg-sky-50 text-sky-950 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-100"
                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
              submitted && "cursor-default"
            )}
          >
            <input
              id={inputId}
              name={"midterm-question-" + String(question.id)}
              type={question.kind === "multiple" ? "checkbox" : "radio"}
              checked={answer.includes(value)}
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
  question,
  answer,
  submitted,
  onChange,
}: {
  question: TextQuestion;
  answer: string[];
  submitted: boolean;
  onChange: (answer: string[]) => void;
}) {
  const inputId = "question-" + String(question.id) + "-text";
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
        value={answer[0] ?? ""}
        disabled={submitted}
        onChange={(event) => onChange([event.target.value])}
        className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 font-mono text-sm text-slate-950 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-800"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

function CompletionAnswer({
  question,
  answer,
  submitted,
  onChange,
}: {
  question: CompletionQuestion;
  answer: string[];
  submitted: boolean;
  onChange: (answer: string[]) => void;
}) {
  const selectedByBlank = new Map(
    answer.map((entry) => {
      const separator = entry.indexOf(":");
      return [entry.slice(0, separator), entry.slice(separator + 1)];
    })
  );

  const updateBlank = (blankId: string, value: string) => {
    const next = new Map(selectedByBlank);
    if (value) next.set(blankId, value);
    else next.delete(blankId);
    onChange(Array.from(next, ([id, selected]) => id + ":" + selected));
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 shadow-inner sm:p-5">
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
                  value={selectedByBlank.get(segment.blank.id) ?? ""}
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
  );
}

function ResultSummary({
  answeredCount,
  earnedPoints,
  onRestart,
}: {
  answeredCount: number;
  earnedPoints: number;
  onRestart: () => void;
}) {
  const percentage = Math.round((earnedPoints / midtermTotalPoints) * 100);
  return (
    <div className="grid gap-5 px-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7">
      <div>
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
          <BookOpenCheck aria-hidden="true" className="h-5 w-5" />
          <p className="font-bold">Attempt submitted</p>
        </div>
        <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
          {earnedPoints} / {midtermTotalPoints}
          <span className="ml-2 text-base font-semibold text-slate-500 dark:text-slate-400">
            ({percentage}%)
          </span>
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          You answered {answeredCount} of {midtermQuestions.length} questions.
          Correct answers remain hidden so you can retry the exam.
        </p>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        Retry quiz
      </button>
    </div>
  );
}

function QuestionNavigator({
  answers,
  submitted,
  secondsRemaining,
}: {
  answers: AnswerState;
  submitted: boolean;
  secondsRemaining: number;
}) {
  return (
    <aside className="sticky top-4 order-first rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:order-last dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3 lg:block">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Question navigator
        </h3>
        <p className="font-mono text-xs font-bold text-slate-500 lg:mt-1 dark:text-slate-400">
          {formatTimer(secondsRemaining)} left
        </p>
      </div>
      <div className="mt-4 grid grid-cols-8 gap-2 sm:grid-cols-11 lg:grid-cols-5">
        {midtermQuestions.map((question) => {
          const answer = answers[question.id] ?? [];
          const answered = isQuestionAnswered(question, answer);
          const correct = submitted && isQuestionCorrect(question, answer);
          return (
            <button
              key={question.id}
              type="button"
              onClick={() =>
                document
                  .getElementById("midterm-question-" + String(question.id))
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className={clsx(
                "flex aspect-square min-h-8 items-center justify-center rounded-md border text-xs font-bold transition focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none",
                submitted
                  ? correct
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
                    : "border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
                  : answered
                    ? "border-sky-500 bg-sky-600 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-sky-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              )}
              aria-label={
                "Go to question " +
                String(question.id) +
                (answered ? ", answered" : ", unanswered")
              }
            >
              {question.id}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-xs text-slate-500 lg:block lg:space-y-2 dark:border-slate-700 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-sky-600" />
          Answered
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm border border-slate-400 bg-white dark:bg-slate-800" />
          Not answered
        </span>
      </div>
    </aside>
  );
}
