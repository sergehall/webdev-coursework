import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ModuleEightQuiz from "./ModuleEightQuiz";
import {
  moduleEightQuizQuestions,
  moduleEightQuizTotalPoints,
} from "./quizData";

const storageKey = "assessment:cs85-module-08-orm-database-migrations-quiz:v1";

describe("CS85 Module 8 ORM and database migrations quiz", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete 22-question, 22-point quiz", () => {
    expect(moduleEightQuizQuestions).toHaveLength(22);
    expect(moduleEightQuizTotalPoints).toBe(22);
    expect(moduleEightQuizQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 22 }, (_, index) => index + 1)
    );
    expect(
      moduleEightQuizQuestions.every(
        (question) => question.kind === "single" && question.points === 1
      )
    ).toBe(true);
    expect(
      moduleEightQuizQuestions.map((question) => question.answer[0])
    ).toEqual([
      2, 2, 0, 1, 1, 2, 4, 2, 4, 3, 3, 1, 4, 1, 3, 2, 2, 2, 3, 4, 0, 2,
    ]);
  });

  it("requires START and exposes the source quiz details", () => {
    render(<ModuleEightQuiz />);

    const quizDetails = screen.getByTestId("module-eight-quiz-details");
    expect(quizDetails).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Quiz details"));
    expect(quizDetails).toHaveAttribute("open");
    expect(screen.getByText("Jul 19 at 11:59pm")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

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
    expect(screen.getByText("Question 22")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(110);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("saves progress and requires review before submission", async () => {
    render(<ModuleEightQuiz />);
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
        name: "Store application configuration separate from code",
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
      screen.getByText("21 questions will be submitted without an answer.")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));
    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("1 / 22")).toBeInTheDocument();
  });

  it("restores an active attempt after remounting", async () => {
    const firstRender = render(<ModuleEightQuiz />);
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
        name: "Store application configuration separate from code",
      })
    );

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );
    firstRender.unmount();

    render(<ModuleEightQuiz />);
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
