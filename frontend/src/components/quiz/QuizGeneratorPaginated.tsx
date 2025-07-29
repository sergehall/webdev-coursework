import { useState } from "react";

import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";
import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import {
  NextButton,
  PreviousButton,
} from "@/components/buttons/QuizNavButtons";
import QuestionCard from "@/components/quiz/QuestionCard";
import { SubmitQuizButton, RetryQuizButton } from "@/components/buttons";
import { useQuizEngine } from "@/hooks/useQuizEngine";

interface QuizProps {
  questions: UIQuestion[];
  answers: CorrectAnswerDto[];
}

const QuizGeneratorPaginated = ({ questions, answers }: QuizProps) => {
  const [current, setCurrent] = useState(0);

  const {
    userAnswers,
    submitted,
    setSubmitted,
    handleSelect,
    correctCount,
    resetQuiz: resetBase,
    formatDuration,
    formattedTime,
    formattedHour,
    startTime,
  } = useQuizEngine(questions, answers);

  const resetQuiz = () => {
    resetBase(); // reset from useQuizEngine
    setCurrent(0); // local current reset
  };

  return (
    <div className="mx-auto w-full max-w-[600px] space-y-6">
      <QuestionCard
        key={questions[current].id}
        question={questions[current]}
        index={current}
        userAnswer={userAnswers[current]}
        submitted={submitted}
        onSelect={handleSelect}
      />

      {!submitted ? (
        <div className="flex items-center justify-between">
          <PreviousButton
            onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
            disabled={current === 0}
          />
          {current < questions.length - 1 ? (
            <NextButton onClick={() => setCurrent((prev) => prev + 1)} />
          ) : (
            <SubmitQuizButton onClick={() => setSubmitted(true)} />
          )}
        </div>
      ) : (
        <div className="space-y-2 text-center">
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            Correct answers are hidden.
          </p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-300">
            Score: {correctCount} out of {questions.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Submitted {formattedTime} at {formattedHour}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Duration: {formatDuration(Date.now() - startTime)}
          </p>
          <RetryQuizButton onClick={resetQuiz} />
        </div>
      )}
    </div>
  );
};

export default QuizGeneratorPaginated;
