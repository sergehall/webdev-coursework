import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ModuleSevenQuiz from "./ModuleSevenQuiz";
import {
  moduleSevenQuizQuestions,
  moduleSevenQuizTotalPoints,
} from "./quizData";

describe("CS85 Module 7 Laravel quiz", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete 24-question, 24-point quiz", () => {
    expect(moduleSevenQuizQuestions).toHaveLength(24);
    expect(moduleSevenQuizTotalPoints).toBe(24);
    expect(moduleSevenQuizQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 24 }, (_, index) => index + 1)
    );
    expect(
      moduleSevenQuizQuestions.every(
        (question) => question.kind === "single" && question.points === 1
      )
    ).toBe(true);
  });

  it("requires START and exposes the source quiz details", () => {
    render(<ModuleSevenQuiz />);

    const quizDetails = screen.getByTestId("module-seven-quiz-details");
    expect(quizDetails).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Quiz details"));
    expect(quizDetails).toHaveAttribute("open");
    expect(screen.getByText("Jul 19 at 11:59pm")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();

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
    expect(screen.getByText("Question 24")).toBeInTheDocument();
    expect(screen.getAllByRole("radio").length).toBeGreaterThan(24);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("saves progress and requires review before submission", async () => {
    render(<ModuleSevenQuiz />);
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
        name: "Solving common web development problems automatically",
      })
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    );

    await waitFor(() =>
      expect(
        window.localStorage.getItem("assessment:cs85-module-07-laravel-quiz:v1")
      ).toContain('"status":"active"')
    );

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByRole("heading", { name: "Ready to submit?" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("23 questions will be submitted without an answer.")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));
    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("1 / 24")).toBeInTheDocument();
  });

  it("restores an active attempt after remounting", async () => {
    const firstRender = render(<ModuleSevenQuiz />);
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
        name: "Solving common web development problems automatically",
      })
    );

    await waitFor(() =>
      expect(
        window.localStorage.getItem("assessment:cs85-module-07-laravel-quiz:v1")
      ).toContain('"status":"active"')
    );
    firstRender.unmount();

    render(<ModuleSevenQuiz />);
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
