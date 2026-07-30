import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import FinalExam from "./FinalExam";
import { finalExamQuestions, finalExamTotalPoints } from "./finalExamData";

const storageKey = "assessment:cs56-final-exam:v1";

describe("CS56 Final Exam", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("contains the complete 38-question, 98-point exam", () => {
    expect(finalExamQuestions).toHaveLength(38);
    expect(finalExamTotalPoints).toBe(98);
    expect(finalExamQuestions.map((question) => question.id)).toEqual(
      Array.from({ length: 38 }, (_, index) => index + 1)
    );
    expect(
      finalExamQuestions.filter((question) => question.kind === "single")
    ).toHaveLength(30);
    expect(
      finalExamQuestions.filter((question) => question.kind === "multiple")
    ).toHaveLength(2);
    expect(
      finalExamQuestions.filter((question) => question.kind === "completion")
    ).toHaveLength(6);
    expect(finalExamQuestions.map(({ points }) => points)).toEqual([
      2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 6, 5, 2, 2, 2, 2, 2, 2,
      2, 4, 10, 1, 1, 1, 1, 1, 15, 2, 2, 2, 2,
    ]);
  });

  it("requires START and renders all supported exam controls", () => {
    render(<FinalExam />);

    const examDetails = screen.getByTestId("final-exam-details");
    expect(examDetails).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Final Exam details"));
    expect(examDetails).toHaveAttribute("open");
    expect(within(examDetails).getByText("38")).toBeInTheDocument();
    expect(within(examDetails).getByText("98")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "That access code is not valid"
    );

    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 38")).toBeInTheDocument();
    expect(screen.getAllByRole("radio").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("combobox")).toHaveLength(24);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("scores representative collection, JavaFX, and socket answers", () => {
    render(<FinalExam />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const questionOneCard = screen
      .getByRole("heading", { name: "Question 1" })
      .closest("article");
    const questionTwoCard = screen
      .getByRole("heading", { name: "Question 2" })
      .closest("article");
    expect(questionOneCard).not.toBeNull();
    expect(questionTwoCard).not.toBeNull();
    if (!questionOneCard || !questionTwoCard) return;

    fireEvent.click(
      within(questionOneCard).getByRole("checkbox", { name: "iterator()" })
    );
    fireEvent.click(
      within(questionTwoCard).getByRole("radio", { name: "False" })
    );
    fireEvent.change(
      screen.getByRole("combobox", {
        name: "Question 16, socket host",
      }),
      { target: { value: "The host address to connect to." } }
    );
    fireEvent.change(
      screen.getByRole("combobox", {
        name: "Question 16, socket port",
      }),
      { target: { value: "The port number." } }
    );

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "3"
    );
    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByText("35 questions will be submitted without an answer.")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));

    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("5 / 98")).toBeInTheDocument();
  });

  it("saves and restores a code-completion response", async () => {
    const firstRender = render(<FinalExam />);
    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    const textAttribute = screen.getByRole("combobox", {
      name: "Question 18, button text attribute",
    });
    const actionAttribute = screen.getByRole("combobox", {
      name: "Question 18, button action attribute",
    });
    const actionHandler = screen.getByRole("combobox", {
      name: "Question 18, button action handler",
    });

    fireEvent.change(textAttribute, { target: { value: "text" } });
    fireEvent.change(actionAttribute, { target: { value: "onAction" } });
    fireEvent.change(actionHandler, {
      target: { value: "onStartClicked" },
    });

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );
    firstRender.unmount();

    render(<FinalExam />);
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
      screen.getByRole("combobox", {
        name: "Question 18, button text attribute",
      })
    ).toHaveValue("text");
    expect(
      screen.getByRole("combobox", {
        name: "Question 18, button action attribute",
      })
    ).toHaveValue("onAction");
    expect(
      screen.getByRole("combobox", {
        name: "Question 18, button action handler",
      })
    ).toHaveValue("onStartClicked");
  });
});
