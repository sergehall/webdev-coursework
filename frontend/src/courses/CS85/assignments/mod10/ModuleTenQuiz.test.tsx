import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ModuleTenQuiz from "./ModuleTenQuiz";
import { moduleTenQuizQuestions, moduleTenQuizTotalPoints } from "./quizData";

const storageKey = "assessment:cs85-module-10-authentication-quiz:v1";

describe("CS85 Module 10 Authentication quiz", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete corrected 14-question, 14-point quiz", () => {
    expect(moduleTenQuizQuestions).toHaveLength(14);
    expect(moduleTenQuizTotalPoints).toBe(14);
    expect(moduleTenQuizQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 14 }, (_, index) => index + 1)
    );
    expect(
      moduleTenQuizQuestions.every(
        (question) => question.kind === "single" && question.points === 1
      )
    ).toBe(true);
    expect(
      moduleTenQuizQuestions.map((question) => question.answer[0])
    ).toEqual([0, 1, 1, 1, 1, 3, 2, 1, 2, 1, 0, 1, 1, 0]);

    expect(moduleTenQuizQuestions[5]).toMatchObject({
      id: 6,
      answer: [3],
      options: expect.arrayContaining(["All of the Above"]),
    });
    expect(moduleTenQuizQuestions[10]).toMatchObject({
      id: 11,
      answer: [0],
      options: expect.arrayContaining(["What they can do"]),
    });
  });

  it("requires START and exposes the source quiz details", () => {
    render(<ModuleTenQuiz />);

    const quizDetails = screen.getByTestId("module-ten-quiz-details");
    expect(quizDetails).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Quiz details"));
    expect(quizDetails).toHaveAttribute("open");
    expect(
      within(quizDetails).getAllByText("14", { selector: "dd" })
    ).toHaveLength(2);
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
    expect(screen.getByText("Question 14")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(57);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("scores the corrected Question 6 and Question 11 answers", () => {
    render(<ModuleTenQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionSixCard = screen
      .getByRole("heading", { name: "Question 6" })
      .closest("article");
    const questionElevenCard = screen
      .getByRole("heading", { name: "Question 11" })
      .closest("article");
    expect(questionSixCard).not.toBeNull();
    expect(questionElevenCard).not.toBeNull();
    if (!questionSixCard || !questionElevenCard) return;

    fireEvent.click(
      within(questionSixCard).getByRole("radio", {
        name: "All of the Above",
      })
    );
    fireEvent.click(
      within(questionElevenCard).getByRole("radio", {
        name: "What they can do",
      })
    );

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByText("12 questions will be submitted without an answer.")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));

    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("2 / 14")).toBeInTheDocument();
  });

  it("saves and restores an active attempt", async () => {
    const firstRender = render(<ModuleTenQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionCard = screen
      .getByRole("heading", { name: "Question 1" })
      .closest("article");
    expect(questionCard).not.toBeNull();
    if (!questionCard) return;
    fireEvent.click(
      within(questionCard).getByRole("radio", { name: "Gatekeeper" })
    );

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );
    firstRender.unmount();

    render(<ModuleTenQuiz />);
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
  });
});
