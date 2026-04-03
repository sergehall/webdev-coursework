import QuizGenerator from "@/components/quiz/QuizGenerator";
import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

type CS79CStaticQuizProps = {
  title: string;
  dueLabel?: string;
  questions: UIQuestion[];
  answers: CorrectAnswerDto[];
};

export default function CS79CStaticQuiz({
  title,
  dueLabel,
  questions,
  answers,
}: CS79CStaticQuizProps) {
  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {dueLabel ? (
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Due: {dueLabel}
          </p>
        ) : null}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This quiz block is now available directly in the module so it can be
          reviewed and filled in before we wire in any additional
          course-specific artifacts.
        </p>
      </header>

      <QuizGenerator questions={questions} answers={answers} />
    </section>
  );
}
