// src/App.test.tsx

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import App from "@/App";
import { renderWithProviders } from "@/test/renderWithProviders";

describe("<App /> integration", () => {
  it("renders without crashing", () => {
    const { container } = renderWithProviders(<App />);
    expect(container).toBeDefined();
  });

  it("renders Home route", async () => {
    renderWithProviders(<App />, "/");
    expect(await screen.findByText(/loading home/i)).toBeInTheDocument();
  });

  it("renders Coursework page", async () => {
    renderWithProviders(<App />, "/coursework");
    expect(await screen.findByText(/Loading Coursework/i)).toBeInTheDocument();
  });

  it("renders WebDeveloperPath Page", async () => {
    renderWithProviders(<App />, "/web-developer-path");
    expect(
      await screen.findByText(/Loading Web Developer Path/i)
    ).toBeInTheDocument();
  });

  it("renders Completed Assignments page", async () => {
    renderWithProviders(<App />, "/coursework/cs81/assignment/completed");

    const heading = await screen.findByRole(
      "heading",
      { name: /all modules completed!/i },
      { timeout: 3000 }
    );

    expect(heading).toBeInTheDocument();
  });

  it("renders Sandbox page", async () => {
    renderWithProviders(<App />, "/sandbox");
    expect(await screen.findByText(/loading sandbox/i)).toBeInTheDocument();
  });

  it("renders Resources page", async () => {
    renderWithProviders(<App />, "/resources");
    expect(await screen.findByText(/loading resources/i)).toBeInTheDocument();
  });

  it("renders NotFound route", async () => {
    renderWithProviders(<App />, "/some-non-existent-page");
    expect(await screen.findByText(/loading 404/i)).toBeInTheDocument();
  });
});
