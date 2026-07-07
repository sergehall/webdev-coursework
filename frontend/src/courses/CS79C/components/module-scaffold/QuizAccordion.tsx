import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import CS79CStaticQuiz from "@/courses/CS79C/components/CS79CStaticQuiz";
import type { CS79CQuiz } from "@/courses/CS79C/components/module-scaffold/types";

type QuizAccordionProps = {
  quiz?: CS79CQuiz;
  isOpen: boolean;
  onToggle: () => void;
};

export default function QuizAccordion({
  quiz,
  isOpen,
  onToggle,
}: QuizAccordionProps) {
  if (!quiz) {
    return null;
  }

  return (
    <AnimatedAccordionItem
      title={`Quiz: ${quiz.title}`}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <CS79CStaticQuiz
        title={quiz.title}
        dueLabel={quiz.dueLabel}
        questions={quiz.questions}
        answers={quiz.answers}
      />
    </AnimatedAccordionItem>
  );
}
