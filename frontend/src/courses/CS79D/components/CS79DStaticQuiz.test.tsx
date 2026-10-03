import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it } from "vitest";

import CS79DStaticQuiz from "./CS79DStaticQuiz";

import { cs79dModule01Quiz } from "@/courses/CS79D/data/modules/module01Quiz";

beforeEach(() => localStorage.clear());

it("uses the stated CS79D quiz time limit in the shared practice gate", async () => {
  const user = userEvent.setup();
  render(<CS79DStaticQuiz {...cs79dModule01Quiz} />);

  expect(screen.getByText("15 minutes")).toBeInTheDocument();
  await user.type(
    screen.getByRole("textbox", {
      name: "Enter the access code when you are ready",
    }),
    "START"
  );
  await user.click(screen.getByRole("button", { name: "Begin quiz" }));

  expect(screen.getAllByRole("article")).toHaveLength(
    cs79dModule01Quiz.questions.length
  );
  expect(screen.getByRole("timer")).toHaveAccessibleName("15:00 remaining");
});
