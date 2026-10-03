import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it } from "vitest";

import CS79CStaticQuiz from "./CS79CStaticQuiz";

import { cs79cModule01Quiz } from "@/courses/CS79C/data/modules/module01Quiz";

beforeEach(() => localStorage.clear());

it("starts the CS79C practice quiz with its original choice content", async () => {
  const user = userEvent.setup();
  render(<CS79CStaticQuiz {...cs79cModule01Quiz} />);

  expect(
    screen.getByRole("button", { name: "Begin quiz" })
  ).toBeInTheDocument();
  expect(screen.getByText("60 minutes")).toBeInTheDocument();

  await user.type(
    screen.getByRole("textbox", {
      name: "Enter the access code when you are ready",
    }),
    "START"
  );
  await user.click(screen.getByRole("button", { name: "Begin quiz" }));

  const firstQuestion = screen.getByRole("article", { name: "Question 1" });
  expect(firstQuestion).toHaveTextContent(
    cs79cModule01Quiz.questions[0].question
  );
  await user.click(within(firstQuestion).getByRole("radio", { name: "True" }));
  expect(screen.getByText("1 of 10 answered")).toBeInTheDocument();
});
