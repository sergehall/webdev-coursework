import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { completePracticeQuiz } from "../quizTestHelpers";

import AssignmentMod1 from "./AssignmentMod1";
import { quizAnswers, quizQuestions } from "./quizData";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod1 />", () => {
  it("renders the CS85 module 1 Canvas blocks collapsed by default", () => {
    render(<AssignmentMod1 />);

    expect(
      screen.getByRole("heading", {
        name: "Module 1 - Introduction to PHP",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "ReadMe Module 1: Introduction to PHP",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Required Reading" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 1 Assignment 1A: Home Dev Environment & hello world",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 1 Assignment 1B: Setup Slack Account and App",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Quiz: Module 1 - Intro to PHP" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete module 1" })
    ).toBeInTheDocument();

    expect(screen.queryByText("module_1_reading.pdf")).not.toBeInTheDocument();
    expect(screen.queryByText("20 pts")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Due: Jun 28 at 11:59pm")
    ).not.toBeInTheDocument();
  });

  it("expands the required reading, assignment, and quiz blocks", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod1 />);

    await user.click(screen.getByRole("button", { name: "Required Reading" }));

    expect(screen.getByText("module_1_reading.pdf")).toBeInTheDocument();
    expect(screen.getByText("PHP_HTML_CSS_Guide.pdf")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Module 1 Assignment 1A: Home Dev Environment & hello world",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Module 1 Assignment 1B: Setup Slack Account and App",
      })
    );

    expect(
      screen.getAllByText(
        "Module 1 Assignment 1A: Home Dev Environment & hello world"
      )
    ).toHaveLength(2);
    expect(screen.getAllByText("Objective")).toHaveLength(2);
    expect(
      screen.getByText(/professional-grade PHP development environment/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Important: Use Git & Push Often")
    ).toBeInTheDocument();
    expect(screen.getByText("GitHub Repository Link")).toBeInTheDocument();
    expect(screen.getByText("View assignment_1a.pdf")).toBeInTheDocument();

    expect(
      screen.getAllByText("Module 1 Assignment 1B: Setup Slack Account and App")
    ).toHaveLength(2);
    expect(screen.getByText("Sign Up for Slack")).toBeInTheDocument();
    expect(
      screen.getByText("Join the CS 85 Slack Workspace")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/connected to the course communication platform, Slack/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your name visible in the CS 85 Slack Workspace/i)
    ).toBeInTheDocument();
    expect(screen.getByText("smccs85sum2026")).toBeInTheDocument();
    expect(screen.getByText("Why Slack?")).toBeInTheDocument();
    expect(screen.getAllByText("Jun 28")).toHaveLength(2);

    await user.click(
      screen.getByRole("button", { name: "Quiz: Module 1 - Intro to PHP" })
    );

    expect(screen.getAllByText("Quiz: Module 1 - Intro to PHP")).toHaveLength(
      3
    );
    expect(
      screen.getByRole("button", { name: "Begin quiz" })
    ).toBeInTheDocument();
    expect(screen.getByText("Due: Jun 28 at 11:59pm")).toBeInTheDocument();
  });

  it("opens the Assignment 1A PDF in a modal preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod1 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 1 Assignment 1A: Home Dev Environment & hello world",
      })
    );
    await user.click(
      screen.getByRole("button", { name: "View assignment_1a.pdf" })
    );

    expect(screen.getByTitle("assignment_1a.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download assignment_1a.pdf" })
    ).toHaveAttribute("href", "/course-materials/CS85/mod-1/assignment_1a.pdf");
  });

  it("scores the module quiz through the shared practice runner", async () => {
    const user = userEvent.setup();
    render(<AssignmentMod1 />);
    await user.click(
      screen.getByRole("button", { name: "Quiz: Module 1 - Intro to PHP" })
    );
    await completePracticeQuiz(user, quizQuestions, quizAnswers);
  });
});
