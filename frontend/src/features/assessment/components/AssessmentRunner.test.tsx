import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { AssessmentDefinition } from "../domain/types";

import AssessmentRunner from "./AssessmentRunner";

const definition: AssessmentDefinition = {
  id: "professional-test-assessment",
  delivery: "client-practice",
  eyebrow: "Test assessment",
  title: "Assessment Runner Contract",
  summary: "A compact assessment used to verify the shared runner.",
  accessCode: "BEGIN",
  accessHint: "Use BEGIN for this test.",
  durationSeconds: 900,
  storageKey: "assessment:professional-test:v1",
  questions: [
    {
      id: 1,
      kind: "single",
      points: 2,
      prompt: "Which option is the framework?",
      options: ["Laravel", "Plain text"],
      answer: [0],
    },
    {
      id: 2,
      kind: "multiple",
      points: 3,
      prompt: "Which practices help protect an API?",
      instruction: "Choose every correct answer.",
      options: ["Validate input", "Commit secrets", "Authorize requests"],
      answer: [0, 2],
    },
    {
      id: 3,
      kind: "text",
      points: 2,
      prompt: "Name the PHP framework used in CS85.",
      instruction: "Enter the framework name.",
      answers: ["Laravel"],
    },
    {
      id: 4,
      kind: "completion",
      points: 3,
      prompt: "Complete the architecture statement.",
      instruction: "Select the correct framework.",
      lines: [
        [
          { text: "The application uses " },
          {
            blank: {
              id: "framework",
              options: ["Laravel", "React"],
              answer: "Laravel",
            },
          },
          { text: "." },
        ],
      ],
    },
  ],
};

function unlockAssessment(accessCode = "BEGIN") {
  fireEvent.change(screen.getByLabelText(/enter the access code/i), {
    target: { value: accessCode },
  });
  fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));
}

describe("AssessmentRunner", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("enforces the access gate and renders native controls after unlock", () => {
    render(<AssessmentRunner definition={definition} />);

    unlockAssessment("wrong");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "That access code is not valid"
    );
    expect(screen.queryByText("Question 1")).not.toBeInTheDocument();

    unlockAssessment("  begin  ");

    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(screen.getByLabelText("Your answer")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Question 4, framework" })
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("requires explicit review, reports unanswered questions, and can restart", () => {
    render(<AssessmentRunner definition={definition} />);
    unlockAssessment();

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));

    expect(
      screen.getByRole("heading", { name: "Ready to submit?" })
    ).toBeInTheDocument();
    expect(screen.getByText(/4 questions will be submitted/i)).toBeVisible();
    expect(screen.queryByText("Attempt submitted")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Continue reviewing" }));
    expect(
      screen.queryByRole("heading", { name: "Ready to submit?" })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));

    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")[0]).toBeDisabled();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Start a new attempt" })
    );

    expect(screen.queryByText("Attempt submitted")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
    expect(screen.getAllByRole("radio")[0]).not.toBeDisabled();
  });

  it("scores single, multiple, text, and completion answers end to end", () => {
    render(<AssessmentRunner definition={definition} />);
    unlockAssessment();

    fireEvent.click(screen.getByRole("radio", { name: "Laravel" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Validate input" }));
    fireEvent.click(
      screen.getByRole("checkbox", { name: "Authorize requests" })
    );
    fireEvent.change(screen.getByLabelText("Your answer"), {
      target: { value: "  Lara vel  " },
    });
    fireEvent.change(
      screen.getByRole("combobox", { name: "Question 4, framework" }),
      { target: { value: "Laravel" } }
    );

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "4"
    );

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(screen.getByText("Every question has an answer.")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));

    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText(/10 \/ 10/)).toBeInTheDocument();
    expect(screen.getByText("(100%)")).toBeInTheDocument();
    for (const position of [1, 2, 3, 4]) {
      const card = screen
        .getByRole("heading", { name: `Question ${position}` })
        .closest("article");
      expect(card).not.toBeNull();
      if (card) {
        expect(within(card).getByText("Correct")).toBeInTheDocument();
      }
    }
  });
});
