// src/assignments/mod1/tasks/QuizModule4.tsx
import QuizGenerator from "@/components/quiz/QuizGenerator";
import { useQuizData } from "@/hooks/useQuizData";

const QuizModule4 = () => {
  const { questions, answers, loading, error } = useQuizData("QuizModule4");

  if (loading) {
    return (
      <div className="flex h-56 flex-col items-center justify-center space-y-4 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Loading quiz…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">
        Failed to load quiz: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <QuizGenerator questions={questions} answers={answers} />
    </div>
  );
};

export default QuizModule4;
