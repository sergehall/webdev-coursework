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

  it("renders CourseworkPage page", async () => {
    renderWithProviders(<App />, "/coursework");
    expect(await screen.findByText(/Loading Coursework/i)).toBeInTheDocument();
  });

  it("renders WebDeveloperPath Page", async () => {
    renderWithProviders(<App />, "/web-developer-path");
    expect(
      await screen.findByText(/Loading Web Developer Path/i)
    ).toBeInTheDocument();
  });

  it("renders Completed Assignments page for CS81", async () => {
    renderWithProviders(<App />, "/coursework/CS81/assignment/completed");

    const heading = await screen.findByRole(
      "heading",
      { name: /all modules completed!/i },
      { timeout: 3000 }
    );

    expect(heading).toBeInTheDocument();
  });

  it("renders Completed Assignments page for CS80", async () => {
    renderWithProviders(<App />, "/coursework/CS80/assignment/completed");

    const heading = await screen.findByRole(
      "heading",
      { name: /all modules completed!/i },
      { timeout: 3000 }
    );

    expect(heading).toBeInTheDocument();
  });

  it("renders Code Playground Page", async () => {
    renderWithProviders(<App />, "/code-playground");
    expect(
      await screen.findByText(/loading code playground/i)
    ).toBeInTheDocument();
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
