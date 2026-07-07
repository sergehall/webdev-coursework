import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import CS79DStaticQuiz from "@/courses/CS79D/components/CS79DStaticQuiz";
import type { CS79DQuiz } from "@/courses/CS79D/components/module-scaffold/types";

type QuizAccordionsProps = {
  quiz?: CS79DQuiz;
  midtermQuiz?: CS79DQuiz;
  isQuizOpen: boolean;
  isMidtermOpen: boolean;
  onToggleQuiz: () => void;
  onToggleMidterm: () => void;
};

export default function QuizAccordions({
  quiz,
  midtermQuiz,
  isQuizOpen,
  isMidtermOpen,
  onToggleQuiz,
  onToggleMidterm,
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
      {midtermQuiz ? (
        <QuizAccordion
          titlePrefix="Midterm"
          quiz={midtermQuiz}
          isOpen={isMidtermOpen}
          onToggle={onToggleMidterm}
        />
      ) : null}
    </>
  );
}

type QuizAccordionProps = {
  titlePrefix: "Quiz" | "Midterm";
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
