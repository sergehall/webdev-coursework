import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MidtermQuiz from "./MidtermQuiz";
import { midtermQuestions, midtermTotalPoints } from "./midtermData";

describe("CS56 Module 8 midterm", () => {
  it("contains the complete 33-question, 100-point exam", () => {
    expect(midtermQuestions).toHaveLength(33);
    expect(midtermTotalPoints).toBe(100);
    expect(midtermQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 33 }, (_, index) => index + 1)
    );
  });

  it("requires the START access code before showing questions", () => {
    render(<MidtermQuiz />);

    expect(
      screen.getByRole("heading", { name: "Midterm Quiz" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Question 1")).not.toBeInTheDocument();

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
    expect(screen.getByText("Question 33")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("renders native controls for choice, text, and code-completion questions", () => {
    render(<MidtermQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    expect(screen.getAllByRole("radio").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("combobox").length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText("Your answer")).toHaveLength(2);
  });
});
