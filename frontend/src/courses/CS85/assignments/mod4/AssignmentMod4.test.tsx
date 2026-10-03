import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { completePracticeQuiz } from "../quizTestHelpers";

import AssignmentMod4 from "./AssignmentMod4";
import { quizAnswers, quizQuestions } from "./quizData";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod4 />", () => {
  it("renders the Module 4 Canvas shell collapsed by default", () => {
    render(<AssignmentMod4 />);

    expect(
      screen.getByRole("heading", {
        name: "Module 4 - Database Fundamentals",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "ReadMe Module 4: Database Fundamentals",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Required Reading" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4A: Database Setup",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4B: Personal Inventory Database",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Quiz: Module 4 - Database",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete module 4" })
    ).toBeInTheDocument();

    expect(screen.queryByText("module4_databases.pdf")).not.toBeInTheDocument();
    expect(screen.queryByText("21 pts")).not.toBeInTheDocument();
  });

  it("expands the Module 4 reading, assignment shells, and quiz shell independently", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod4 />);

    await user.click(screen.getByRole("button", { name: "Required Reading" }));
    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4A: Database Setup",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4B: Personal Inventory Database",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 4 - Database",
      })
    );

    expect(screen.getByText("module4_databases.pdf")).toBeInTheDocument();
    expect(
      screen.getAllByText("Module 4 Assignment 4A: Database Setup")
    ).toHaveLength(1);
    expect(
      screen.getAllByText("Module 4 Assignment 4B: Personal Inventory Database")
    ).toHaveLength(1);
    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(screen.getByText("Learning Goals")).toBeInTheDocument();
    expect(
      screen.getByText("Option 1: Laravel Herd Setup (macOS)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Option 2: XAMPP Setup (Windows/macOS/Linux)")
    ).toBeInTheDocument();
    expect(screen.getAllByText("Canvas Submission")).toHaveLength(2);
    expect(screen.getByText("Assignment Description")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Tutorial: Connecting to MySQL with PDO and Displaying Data"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Your Task")).toBeInTheDocument();
    expect(screen.getByText("Comment and Reflect")).toBeInTheDocument();
    expect(screen.getByText("Implementation Notes")).toBeInTheDocument();
    expect(screen.getByText(/cs85-module4b-inventory/)).toBeInTheDocument();
    expect(screen.queryByText("20 pts")).not.toBeInTheDocument();
    expect(screen.getAllByText("Quiz: Module 4 - Database")).toHaveLength(3);
    expect(
      screen.getByText("Database fundamentals review")
    ).toBeInTheDocument();
    expect(screen.getByText("Started: Jun 29 at 6:54pm")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Begin quiz" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This quiz block is available directly in the module/)
    ).toBeInTheDocument();
    expect(screen.getByText("21 pts")).toBeInTheDocument();
  });

  it("opens the Module 4 Assignment 4A PDF preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod4 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4A: Database Setup",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "View Module 4 Assignment 4A files",
      })
    );

    expect(screen.getByTitle("Module4_Assignment_4A.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Module4_Assignment_4A.pdf" })
    ).toHaveAttribute(
      "href",
      "/course-materials/CS85/mod-4/Module4_Assignment_4A.pdf"
    );
  });

  it("opens the Module 4 Assignment 4B PDF and PHP file preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod4 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4B: Personal Inventory Database",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "View Module 4 Assignment 4B files",
      })
    );

    expect(screen.getByTitle("Module4_Assignment_4B.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Module4_Assignment_4B.pdf" })
    ).toHaveAttribute(
      "href",
      "/course-materials/CS85/mod-4/Module4_Assignment_4B.pdf"
    );
    expect(
      screen.getByRole("link", { name: "Download show_inventory.php" })
    ).toHaveAttribute(
      "href",
      "/course-materials/CS85/mod-4/show_inventory.php"
    );
  });

  it("scores the module quiz through the shared practice runner", async () => {
    const user = userEvent.setup();
    render(<AssignmentMod4 />);
    await user.click(
      screen.getByRole("button", { name: "Quiz: Module 4 - Database" })
    );
    await completePracticeQuiz(user, quizQuestions, quizAnswers);
  });
});
