import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";
import QuestionCard from "@/components/quiz/QuestionCard";
import { SubmitQuizButton, RetryQuizButton } from "@/components/buttons";
import { useQuizEngine } from "@/hooks/useQuizEngine";

interface QuizProps {
  questions: UIQuestion[];
  answers: CorrectAnswerDto[];
}

const QuizGenerator = ({ questions, answers }: QuizProps) => {
  const {
    userAnswers,
    submitted,
    setSubmitted,
    handleSelect,
    correctCount,
    resetQuiz,
    formatDuration,
    formattedTime,
    formattedHour,
    startTime,
  } = useQuizEngine(questions, answers);

  return (
    <div className="space-y-6">
      {questions.map((q: UIQuestion, index: number) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={index}
          userAnswer={userAnswers[index]}
          submitted={submitted}
          onSelect={handleSelect}
        />
      ))}

      {!submitted ? (
        <div className="flex justify-center">
          <SubmitQuizButton onClick={() => setSubmitted(true)} />
        </div>
      ) : (
        <div className="space-y-2 text-center">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Correct answers are hidden.
          </p>
          <p className="text-lg font-semibold text-green-700 dark:text-green-300">
            Score for this attempt: {correctCount} out of {questions.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Submitted {formattedTime} at {formattedHour}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This attempt took {formatDuration(Date.now() - startTime)}.
          </p>
          <RetryQuizButton onClick={resetQuiz} />
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
