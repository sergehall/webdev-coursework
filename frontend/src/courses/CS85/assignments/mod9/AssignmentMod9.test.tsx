import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod9 from "./AssignmentMod9";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod9 />", () => {
  it("renders the Module 9 ReadMe introduction without a duplicate link", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod9 />);

    await user.click(
      screen.getByRole("button", {
        name: "ReadMe Module 9: Full CRUD & Validation",
      })
    );

    expect(
      screen.getByRole("heading", { name: "Full CRUD & Validation" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/build complete, secure web applications/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Instagram, Amazon, LinkedIn/)).toBeInTheDocument();
    expect(screen.getByText(/Laravel, Django, Rails/)).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: "ReadMe Module 9: Full CRUD & Validation",
      })
    ).not.toBeInTheDocument();
  });

  it("renders Assignment 9A instructions and the completed PDF", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod9 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 9 Assignment 9A: Contact List App",
      })
    );

    expect(screen.getByText("Learning Objectives")).toBeInTheDocument();
    expect(screen.getByText("App Overview")).toBeInTheDocument();
    expect(screen.getByText("Laravel Concepts")).toBeInTheDocument();
    expect(screen.getByText("Project Setup")).toBeInTheDocument();
    expect(screen.getByText("Testing the App")).toBeInTheDocument();
    expect(screen.getByText("Submission Instructions")).toBeInTheDocument();
    expect(screen.getByText("Jul 26")).toBeInTheDocument();
    expect(screen.getByText("20 pts")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "http://127.0.0.1:8000/contacts" })
    ).toHaveAttribute("href", "http://127.0.0.1:8000/contacts");
    expect(
      screen.getByRole("link", { name: "Download assignment PDF" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-9/9a/Module9_Assignment_9A.pdf"
    );

    await user.click(
      screen.getByRole("button", { name: "View assignment PDF" })
    );

    expect(screen.getByTitle("Module9_Assignment_9A.pdf")).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-9/9a/Module9_Assignment_9A.pdf"
    );
  });

  it("renders the Module 9 CRUD quiz", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod9 />);

    await user.click(
      screen.getByRole("button", { name: "Quiz: Module 9 CRUD" })
    );

    expect(
      screen.getByRole("heading", { name: "Quiz: Module 9 CRUD" })
    ).toBeInTheDocument();
    expect(screen.getByText("Access code: START")).toBeInTheDocument();
    expect(screen.getAllByText("13", { selector: "dd" })).toHaveLength(4);
  });
});
