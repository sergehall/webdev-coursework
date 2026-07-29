import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ModuleElevenQuiz from "./ModuleElevenQuiz";
import {
  moduleElevenQuizQuestions,
  moduleElevenQuizTotalPoints,
} from "./quizData";

const storageKey = "assessment:cs85-module-11-api-quiz:v1";

describe("CS85 Module 11 API quiz", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete 19-question, 19-point source quiz", () => {
    expect(moduleElevenQuizQuestions).toHaveLength(19);
    expect(moduleElevenQuizTotalPoints).toBe(19);
    expect(moduleElevenQuizQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 19 }, (_, index) => index + 1)
    );
    expect(
      moduleElevenQuizQuestions.every(
        (question) => question.kind === "single" && question.points === 1
      )
    ).toBe(true);
    expect(
      moduleElevenQuizQuestions.map((question) => question.answer[0])
    ).toEqual([3, 0, 1, 3, 2, 1, 1, 3, 3, 0, 3, 2, 2, 0, 2, 2, 0, 2, 1]);
  });

  it("requires START and exposes the source quiz details", () => {
    render(<ModuleElevenQuiz />);

    const quizDetails = screen.getByTestId("module-eleven-quiz-details");
    expect(quizDetails).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Quiz details"));
    expect(quizDetails).toHaveAttribute("open");
    expect(
      within(quizDetails).getAllByText("19", { selector: "dd" })
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
    expect(screen.getByText("Question 19")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(68);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("scores representative inferred answers and reviews unanswered questions", () => {
    render(<ModuleElevenQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionOneCard = screen
      .getByRole("heading", { name: "Question 1" })
      .closest("article");
    const questionNineteenCard = screen
      .getByRole("heading", { name: "Question 19" })
      .closest("article");
    expect(questionOneCard).not.toBeNull();
    expect(questionNineteenCard).not.toBeNull();
    if (!questionOneCard || !questionNineteenCard) return;

    fireEvent.click(
      within(questionOneCard).getByRole("radio", {
        name: "Application Programming Interface",
      })
    );
    fireEvent.click(
      within(questionNineteenCard).getByRole("radio", {
        name: "Log detailed errors and show user friendly messages",
      })
    );

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "2"
    );
    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByText("17 questions will be submitted without an answer.")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));

    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("2 / 19")).toBeInTheDocument();
  });

  it("saves and restores an active attempt", async () => {
    const firstRender = render(<ModuleElevenQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionCard = screen
      .getByRole("heading", { name: "Question 2" })
      .closest("article");
    expect(questionCard).not.toBeNull();
    if (!questionCard) return;
    fireEvent.click(within(questionCard).getByRole("radio", { name: "GET" }));

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );
    firstRender.unmount();

    render(<ModuleElevenQuiz />);
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
