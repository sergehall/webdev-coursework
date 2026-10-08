import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import WebDeveloperPathPage from "@/pages/WebDeveloperPathPage";

describe("WebDeveloperPathPage", () => {
  it("presents the pathway with a single descriptive page heading", () => {
    render(
      <MemoryRouter>
        <WebDeveloperPathPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Web Developer AS Degree & Certificate/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Understand the pathway/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Course notation/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Coursework plan/i })
    ).toBeInTheDocument();
  });
});
