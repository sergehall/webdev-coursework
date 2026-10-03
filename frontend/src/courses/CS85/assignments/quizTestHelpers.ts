import { screen, within } from "@testing-library/react";
import type userEvent from "@testing-library/user-event";

import type { CorrectAnswerDto } from "@/features/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/features/quiz/types/UIQuestion.type";

export async function completePracticeQuiz(
  user: ReturnType<typeof userEvent.setup>,
  questions: readonly UIQuestion[],
  answers: readonly CorrectAnswerDto[]
) {
  await user.type(
    screen.getByRole("textbox", {
      name: "Enter the access code when you are ready",
    }),
    "START"
  );
  await user.click(screen.getByRole("button", { name: "Begin quiz" }));

  for (const question of questions) {
    const card = screen.getByText(question.question).closest("article");
    if (!card)
      throw new Error(`Question ${question.id} has no assessment card.`);
    const answer = answers.find(
      (candidate) => candidate.questionId === question.id
    );
    if (!answer) throw new Error(`Question ${question.id} has no answer.`);
    for (const index of answer.correctAnswer) {
      await user.click(
        within(card).getByRole(question.multiple ? "checkbox" : "radio", {
          name: question.options[index],
        })
      );
    }
  }

  await user.click(screen.getByRole("button", { name: "Review & submit" }));
  await user.click(screen.getByRole("button", { name: "Submit attempt" }));
  expectPracticeScore(questions.length);
}

function expectPracticeScore(questionCount: number) {
  const score = `${questionCount} / ${questionCount}`;
  if (
    !screen.queryByText(
      (_, element) =>
        element?.tagName === "P" &&
        element.textContent?.includes(score) === true
    )
  ) {
    throw new Error(`Expected practice score ${score}.`);
  }
}
