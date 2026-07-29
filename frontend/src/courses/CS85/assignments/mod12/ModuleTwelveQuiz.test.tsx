import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ModuleTwelveQuiz from "./ModuleTwelveQuiz";
import {
  moduleTwelveQuizQuestions,
  moduleTwelveQuizTotalPoints,
} from "./quizData";

const storageKey = "assessment:cs85-module-12-ai-integration-quiz:v1";

describe("CS85 Module 12 AI Integration quiz", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete 20-question, 20-point source quiz", () => {
    expect(moduleTwelveQuizQuestions).toHaveLength(20);
    expect(moduleTwelveQuizTotalPoints).toBe(20);
    expect(moduleTwelveQuizQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => index + 1)
    );
    expect(
      moduleTwelveQuizQuestions.filter((question) => question.kind === "single")
    ).toHaveLength(17);
    expect(
      moduleTwelveQuizQuestions.filter(
        (question) => question.kind === "multiple"
      )
    ).toHaveLength(3);
    expect(moduleTwelveQuizQuestions.every(({ points }) => points === 1)).toBe(
      true
    );
    expect(
      moduleTwelveQuizQuestions.map((question) => question.answer)
    ).toEqual([
      [0],
      [2],
      [0, 3],
      [3],
      [0, 1, 2, 3],
      [2],
      [2],
      [0],
      [3],
      [2],
      [3],
      [0],
      [3],
      [3],
      [1],
      [0, 2, 3],
      [0],
      [1],
      [1],
      [1],
    ]);
  });

  it("requires START and renders native controls for both question types", () => {
    render(<ModuleTwelveQuiz />);

    const quizDetails = screen.getByTestId("module-twelve-quiz-details");
    expect(quizDetails).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Quiz details"));
    expect(quizDetails).toHaveAttribute("open");
    expect(
      within(quizDetails).getAllByText("20", { selector: "dd" })
    ).toHaveLength(2);
    expect(
      within(quizDetails).getByText("17 single · 3 select all")
    ).toBeInTheDocument();
    expect(within(quizDetails).getByText("Not provided")).toBeInTheDocument();
    expect(within(quizDetails).getByText("60 minutes")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "That access code is not valid"
    );

    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "start" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 20")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(68);
    expect(screen.getAllByRole("checkbox")).toHaveLength(12);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("scores representative inferred answers after submission review", () => {
    render(<ModuleTwelveQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionOneCard = screen
      .getByRole("heading", { name: "Question 1" })
      .closest("article");
    const questionSixteenCard = screen
      .getByRole("heading", { name: "Question 16" })
      .closest("article");
    expect(questionOneCard).not.toBeNull();
    expect(questionSixteenCard).not.toBeNull();
    if (!questionOneCard || !questionSixteenCard) return;

    fireEvent.click(
      within(questionOneCard).getByRole("radio", {
        name: "Garbage In Garbage Out",
      })
    );
    for (const answer of [
      "Remove potentially sensitive information like credit cards",
      "Strip HTML tags",
      "Limit input length to prevent abuse",
    ]) {
      fireEvent.click(
        within(questionSixteenCard).getByRole("checkbox", { name: answer })
      );
    }

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "2"
    );
    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByText("18 questions will be submitted without an answer.")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));

    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("2 / 20")).toBeInTheDocument();
  });

  it("saves and restores a multiple-answer response", async () => {
    const firstRender = render(<ModuleTwelveQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionCard = screen
      .getByRole("heading", { name: "Question 3" })
      .closest("article");
    expect(questionCard).not.toBeNull();
    if (!questionCard) return;

    fireEvent.click(
      within(questionCard).getByRole("checkbox", {
        name: "Chain-of-thought prompting",
      })
    );
    fireEvent.click(
      within(questionCard).getByRole("checkbox", {
        name: "Few-shot prompting",
      })
    );

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );
    firstRender.unmount();

    render(<ModuleTwelveQuiz />);
    expect(
      screen.queryByLabelText(/enter the access code/i)
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "saved attempt was restored"
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    );
    expect(
      screen.getByRole("checkbox", { name: "Chain-of-thought prompting" })
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "Few-shot prompting" })
    ).toBeChecked();
  });
});
