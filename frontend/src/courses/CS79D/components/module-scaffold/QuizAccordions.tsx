import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import CS79DStaticQuiz from "@/courses/CS79D/components/CS79DStaticQuiz";
import type { CS79DQuiz } from "@/courses/CS79D/components/module-scaffold/types";

type QuizAccordionsProps = {
  quiz?: CS79DQuiz;
  isQuizOpen: boolean;
  onToggleQuiz: () => void;
};

export default function QuizAccordions({
  quiz,
  isQuizOpen,
  onToggleQuiz,
}: QuizAccordionsProps) {
  return (
    <>
      {quiz ? (
        <QuizAccordion
          titlePrefix="Quiz"
          quiz={quiz}
          isOpen={isQuizOpen}
          onToggle={onToggleQuiz}
        />
      ) : null}
    </>
  );
}

type QuizAccordionProps = {
  titlePrefix: "Quiz";
  quiz: CS79DQuiz;
  isOpen: boolean;
  onToggle: () => void;
};

function QuizAccordion({
  titlePrefix,
  quiz,
  isOpen,
  onToggle,
}: QuizAccordionProps) {
  return (
    <AnimatedAccordionItem
      title={`${titlePrefix}: ${quiz.title}`}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <CS79DStaticQuiz
        title={quiz.title}
        dueLabel={quiz.dueLabel}
        questions={quiz.questions}
        answers={quiz.answers}
      />
    </AnimatedAccordionItem>
  );
}
