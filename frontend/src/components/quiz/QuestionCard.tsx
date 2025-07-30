// src/components/quiz/QuestionCard.tsx

import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";
import type { UserAnswer } from "@/components/quiz/types/userAnswer.type";

type Props = {
  question: UIQuestion;
  index: number;
  userAnswer: UserAnswer;
  submitted: boolean;
  onSelect: (questionId: number, optionIndex: number) => void;
};

const QuestionCard = ({
  question,
  index,
  userAnswer,
  submitted,
  onSelect,
}: Props) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-lg dark:border-gray-600 dark:bg-gray-900">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold uppercase leading-tight tracking-wide text-blue-600 dark:text-blue-400">
          Question {index + 1}
        </span>
        {submitted && (
          <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
            {userAnswer != null ? "Answered" : "Not answered"}
          </span>
        )}
      </div>

      <p className="my-5 text-gray-800 dark:text-white">
        {question.question}
      </p>

      {Array.isArray(question.imageUrl) && (
        <div className="my-5">
          {question.imageUrl.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${question.question} - image ${i + 1}`}
              className="mb-3 rounded-md border border-gray-200 dark:border-gray-600"
            />
          ))}
        </div>
      )}

      <div className="space-y-2">
        {question.options.map((opt, oIndex) => {
          const selected = question.multiple
            ? userAnswer?.includes(oIndex)
            : userAnswer?.[0] === oIndex;

          return (
            <button
              type="button"
              key={`${question.id}-${opt}`}
              onClick={() => onSelect(question.id, oIndex)}
              className={`block w-full rounded border px-4 py-2 text-left text-sm transition ${
                selected
                  ? "border-blue-300 bg-blue-100 text-blue-900 dark:border-blue-500 dark:bg-blue-800 dark:text-white"
                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`}
              disabled={submitted}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
