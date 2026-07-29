import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod11 from "./AssignmentMod11";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod11 />", () => {
  it("renders the API and Architecture ReadMe content", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod11 />);

    await user.click(
      screen.getByRole("button", {
        name: "ReadMe Module 11: API & Architecture",
      })
    );

    expect(
      screen.getByRole("heading", { name: "API & Architecture" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /API integration and clean architecture patterns that power virtually every modern web application/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AI-powered blog application using OpenAI's API/)
    ).toBeInTheDocument();
  });

  it("renders Assignment 11A instructions and the completed PDF", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod11 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 11 Assignment 11A: API Data",
      })
    );

    expect(screen.getByText("Aug 2")).toBeInTheDocument();
    expect(screen.getByText("20 pts")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Scenario" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Learning Objectives" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Instructions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Submission Guidelines" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("storage/app/private/weather.json", { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Storage::get('weather.json')", { exact: false })
    ).toHaveLength(2);

    const repositoryLink = screen.getByRole("link", {
      name: "cs85-php-programming / assignments / module11a",
    });
    expect(repositoryLink).toHaveAttribute(
      "href",
      "https://github.com/sergehall/cs85-php-programming/blob/main/assignments/module11a/README.md"
    );

    const downloadLink = screen.getByRole("link", {
      name: "Download assignment PDF",
    });
    expect(downloadLink).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-11/11a/Assignment_11A_API_Data_Report.pdf"
    );

    await user.click(
      screen.getByRole("button", { name: "View assignment PDF" })
    );

    expect(
      screen.getByTitle("Assignment_11A_API_Data_Report.pdf")
    ).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-11/11a/Assignment_11A_API_Data_Report.pdf"
    );
  });

  it("renders the complete Module 11 API quiz instead of a placeholder", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod11 />);

    await user.click(
      screen.getByRole("button", { name: "Quiz: Module 11 API" })
    );

    expect(
      screen.getByRole("heading", { name: "Quiz: Module 11 API" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Begin quiz" })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Quiz - Aug 2 - 19 pts content will be filled in later."
      )
    ).not.toBeInTheDocument();
  });
});
