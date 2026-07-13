import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MidtermQuiz from "./MidtermQuiz";
import { midtermQuestions, midtermTotalPoints } from "./midtermData";

describe("CS56 Module 8 midterm", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete 33-question, 100-point exam", () => {
    expect(midtermQuestions).toHaveLength(33);
    expect(midtermTotalPoints).toBe(100);
    expect(midtermQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 33 }, (_, index) => index + 1)
    );
  });

  it("requires the START access code before showing questions", () => {
    render(<MidtermQuiz />);

    const moduleOverview = screen.getByTestId("midterm-module-overview");
    expect(moduleOverview).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Module Overview"));
    expect(moduleOverview).toHaveAttribute("open");

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

  it("saves answers and requires a review step before submission", async () => {
    render(<MidtermQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionHeading = screen.getByRole("heading", {
      name: "Question 1",
    });
    const questionCard = questionHeading.closest("article");
    expect(questionCard).not.toBeNull();
    if (!questionCard) return;

    fireEvent.click(within(questionCard).getByRole("radio", { name: "True" }));
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    );

    await waitFor(() =>
      expect(
        window.localStorage.getItem("assessment:cs56-midterm:v1")
      ).toContain('"status":"active"')
    );

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByRole("heading", { name: "Ready to submit?" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Attempt submitted")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));
    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
  });

  it("restores an active attempt after remounting", async () => {
    const firstRender = render(<MidtermQuiz />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionCard = screen
      .getByRole("heading", { name: "Question 1" })
      .closest("article");
    expect(questionCard).not.toBeNull();
    if (!questionCard) return;
    fireEvent.click(within(questionCard).getByRole("radio", { name: "True" }));

    await waitFor(() =>
      expect(
        window.localStorage.getItem("assessment:cs56-midterm:v1")
      ).toContain('"status":"active"')
    );
    firstRender.unmount();

    render(<MidtermQuiz />);
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
