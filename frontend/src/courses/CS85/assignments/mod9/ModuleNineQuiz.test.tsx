import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ModuleNineQuiz from "./ModuleNineQuiz";
import { moduleNineQuizQuestions, moduleNineQuizTotalPoints } from "./quizData";

const storageKey = "assessment:cs85-module-09-crud-validation-quiz:v1";

describe("CS85 Module 9 CRUD quiz", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete 13-question, 13-point quiz", () => {
    expect(moduleNineQuizQuestions).toHaveLength(13);
    expect(moduleNineQuizTotalPoints).toBe(13);
    expect(moduleNineQuizQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 13 }, (_, index) => index + 1)
    );
    expect(
      moduleNineQuizQuestions.every(
        (question) => question.kind === "single" && question.points === 1
      )
    ).toBe(true);
    expect(
      moduleNineQuizQuestions.map((question) => question.answer[0])
    ).toEqual([1, 1, 1, 2, 2, 2, 0, 1, 3, 2, 1, 3, 0]);
  });

  it("requires START and exposes the source quiz details", () => {
    render(<ModuleNineQuiz />);

    const quizDetails = screen.getByTestId("module-nine-quiz-details");
    expect(quizDetails).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Quiz details"));
    expect(quizDetails).toHaveAttribute("open");
    expect(
      within(quizDetails).getAllByText("13", { selector: "dd" })
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
    expect(screen.getByText("Question 13")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(50);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("saves progress and requires review before submission", async () => {
    render(<ModuleNineQuiz />);
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
      within(questionCard).getByRole("radio", {
        name: "Create Read Update Delete",
      })
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    );

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByRole("heading", { name: "Ready to submit?" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("12 questions will be submitted without an answer.")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));
    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("1 / 13")).toBeInTheDocument();
  });

  it("restores an active attempt after remounting", async () => {
    const firstRender = render(<ModuleNineQuiz />);
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
      within(questionCard).getByRole("radio", {
        name: "Create Read Update Delete",
      })
    );

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );
    firstRender.unmount();

    render(<ModuleNineQuiz />);
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
