import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ResourcesPage from "./ResourcesPage";

describe("<ResourcesPage />", () => {
  it("renders resource sections in the requested learning order", () => {
    render(<ResourcesPage />);

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent)
    ).toEqual([
      "Find the right reference",
      "Project, AI, and Daily Workflow",
      "Database, Internet, JavaScript, PHP, and Python",
      "Networking, Cloud, and AWS",
      "CS 56 - Advanced Java Programming",
    ]);
  });

  it("shows OpenAI Codex resources and course-specific references", () => {
    render(<ResourcesPage />);

    expect(screen.getByRole("link", { name: /OpenAI Codex/i })).toHaveAttribute(
      "href",
      "https://openai.com/codex/"
    );
    expect(
      screen.getByRole("link", { name: /Using Codex with ChatGPT/i })
    ).toHaveAttribute(
      "href",
      "https://help.openai.com/en/articles/11369540-codex-in-chatgpt"
    );
    expect(
      screen.getByRole("heading", {
        name: /CS 56 - Advanced Java Programming/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/AWS IAM User Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/PHP Manual/i)).toBeInTheDocument();
    expect(screen.getByText(/Python Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Laravel 13 Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/OpenAI API Quickstart/i)).toBeInTheDocument();
    expect(screen.getByText(/JavaFX Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Spring Boot Reference/i)).toBeInTheDocument();
  });

  it("searches resources by technology and course", async () => {
    const user = userEvent.setup();

    render(<ResourcesPage />);

    expect(screen.getByText(/Showing 27 of 27/i)).toBeInTheDocument();

    const search = screen.getByRole("searchbox", {
      name: /Search resources/i,
    });

    await user.type(search, "Codex");

    expect(screen.getByText(/Showing 2 of 27/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /OpenAI Codex/i })).toBeVisible();
    expect(screen.queryByText(/PHP Manual/i)).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Clear resource search/i })
    );
    await user.type(search, "CS 56");

    expect(screen.getByText(/Showing 6 of 27/i)).toBeInTheDocument();
    expect(screen.getByText(/Oracle Java Tutorials/i)).toBeInTheDocument();
    expect(screen.queryByText(/AWS Documentation/i)).not.toBeInTheDocument();
  });
});
