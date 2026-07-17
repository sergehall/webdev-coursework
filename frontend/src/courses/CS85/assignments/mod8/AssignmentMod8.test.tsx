import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod8 from "./AssignmentMod8";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod8 />", () => {
  it("renders the Module 8 ReadMe introduction and task list", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod8 />);

    await user.click(
      screen.getByRole("button", {
        name: "ReadMe Module 8: ORM & Database Migrations",
      })
    );

    expect(
      screen.getByRole("heading", { name: "ORM & Database Migrations" })
    ).toBeInTheDocument();
    expect(screen.getByText("Module 8 Task List")).toBeInTheDocument();
    expect(
      screen.getByText("Assignment Module 8A: Laravel w/ Database Setup")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Assignment Module 8B: Rebuild Your Inventory with Laravel Eloquent"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Complete the Module Quiz.")).toBeInTheDocument();
  });

  it("renders Assignment 8A instructions and migration artifacts", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod8 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 8 Assignment 8A: Laravel w/ Database Environment",
      })
    );

    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(screen.getByText("Tools Needed")).toBeInTheDocument();
    expect(screen.getByText("Step 5: Run Migrations")).toBeInTheDocument();
    expect(screen.getByText("What to Submit")).toBeInTheDocument();
    expect(screen.getByText("Jul 19")).toBeInTheDocument();
    expect(screen.getByText("20 pts")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /README\.md/ })).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-8/8a/README.md"
    );
    expect(screen.getByRole("link", { name: /.env\.example/ })).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-8/8a/env.example"
    );

    await user.click(
      screen.getByRole("button", { name: "View migration screenshot" })
    );

    expect(screen.getByAltText("php_artisan_migrate.png")).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-8/8a/php_artisan_migrate.png"
    );
  });

  it("renders Assignment 8B instructions and the completed PDF", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod8 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 8 Assignment 8B: Rebuild Your Inventory with Laravel Eloquent",
      })
    );

    expect(screen.getByText("Objectives")).toBeInTheDocument();
    expect(screen.getByText("Project Overview")).toBeInTheDocument();
    expect(screen.getByText("Step 3: Create a Migration")).toBeInTheDocument();
    expect(screen.getByText("Step 10: Add a Reflection")).toBeInTheDocument();
    expect(screen.getByText("Submission Instructions")).toBeInTheDocument();
    expect(
      screen.getByText("cs85-module8b-inventory-eloquent")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "http://localhost:8000/inventory" })
    ).toHaveAttribute("href", "http://localhost:8000/inventory");

    expect(
      screen.getByRole("link", { name: "Download assignment PDF" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-8/8b/Module8_Assignment_8B.pdf"
    );
    expect(
      screen.getByRole("link", {
        name: "GitHub repository: cs85-php-programming",
      })
    ).toHaveAttribute(
      "href",
      "https://github.com/sergehall/cs85-php-programming"
    );

    await user.click(
      screen.getByRole("button", { name: "View assignment PDF" })
    );

    expect(screen.getByTitle("Module8_Assignment_8B.pdf")).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-8/8b/Module8_Assignment_8B.pdf"
    );
  });

  it("renders the Module 8 ORM and database migrations quiz", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod8 />);

    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 8 ORM & Database Migrations",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Quiz: Module 8 ORM & Database Migrations",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Access code: START")).toBeInTheDocument();
    expect(screen.getAllByText("22", { selector: "dd" })).toHaveLength(2);
  });
});
