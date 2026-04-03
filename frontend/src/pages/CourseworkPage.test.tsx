import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import CourseworkPage from "./CourseworkPage";

describe("<CourseworkPage />", () => {
  it("treats CS 79C as an active course with an assignment link", () => {
    render(
      <MemoryRouter>
        <CourseworkPage />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", {
      name: /CS 79C[\s\S]*Compute Engines in Amazon Web Services/i,
    });

    expect(link).toHaveAttribute("href", "/coursework/CS79C/assignment");
    expect(link).not.toHaveTextContent(/not yet completed/i);
  });
});
