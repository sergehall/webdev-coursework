import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod10 from "./AssignmentMod10";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod10 />", () => {
  it("renders the Module 10 ReadMe introduction and task list", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod10 />);

    await user.click(
      screen.getByRole("button", {
        name: "ReadMe Module 10: User Authentication",
      })
    );

    expect(
      screen.getByRole("heading", { name: "User Authentication" })
    ).toBeInTheDocument();
    expect(screen.getByText("Module 10 Task List")).toBeInTheDocument();
    expect(
      screen.getByText("Assignment Module 10A: Laravel Breeze")
    ).toBeInTheDocument();
    expect(screen.getByText("Complete the Module Quiz.")).toBeInTheDocument();
    expect(
      screen.getAllByText("ReadMe Module 10: User Authentication")
    ).toHaveLength(1);
  });

  it("renders Assignment 10A instructions and the completed PDF", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod10 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 10 Assignment 10A: User Authentication",
      })
    );

    expect(screen.getByText("Jul 26")).toBeInTheDocument();
    expect(screen.getByText("20 pts")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Objective" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Part A — Before You Touch the Keyboard: The Concepts",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Part B — Build It" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Part C — Read the Code" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Part D — Make It Yours" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Part E — Submit" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("laravel new auth-demo", { exact: false })
    ).toHaveLength(2);
    expect(
      screen.getByText("Members only!", { exact: false })
    ).toBeInTheDocument();

    const repositoryLink = screen.getByRole("link", {
      name: "cs85-php-programming / assignments / module10a",
    });
    expect(repositoryLink).toHaveAttribute(
      "href",
      "https://github.com/sergehall/cs85-php-programming/tree/main/assignments/module10a"
    );

    const downloadLink = screen.getByRole("link", {
      name: "Download assignment PDF",
    });
    expect(downloadLink).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-10/10a/Module_10A_completion_summary.pdf"
    );

    await user.click(
      screen.getByRole("button", { name: "View assignment PDF" })
    );

    expect(
      screen.getByTitle("Module_10A_completion_summary.pdf")
    ).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-10/10a/Module_10A_completion_summary.pdf"
    );
  });

  it("renders the Module 10 Authentication quiz instead of a placeholder", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod10 />);

    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 10 Authentication",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Quiz: Module 10 Authentication",
      })
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("module-ten-quiz-details")).getAllByText("14", {
        selector: "dd",
      })
    ).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "Begin quiz" })
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Quiz - 14 pts content will be filled in later.")
    ).not.toBeInTheDocument();
  });
});
