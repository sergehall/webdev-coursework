import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResourcesPage from "./ResourcesPage";

describe("<ResourcesPage />", () => {
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
  });
});
