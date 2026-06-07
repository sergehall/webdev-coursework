import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ProjectsPage from "./ProjectsPage";

const originalMatchMedia = window.matchMedia;

function mockCompactLayout(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
    writable: true,
  });
}

describe("<ProjectsPage />", () => {
  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: originalMatchMedia,
      writable: true,
    });
    vi.restoreAllMocks();
  });

  it("renders the project showcase scaffold", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { name: /Project Showcase/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lens Lounge/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /SERGIOARTG Platform/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Hex Gate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lavoval/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Java Start/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /AWS Learning Portal/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Live site/i })).toHaveLength(5);
    expect(
      screen.getByRole("heading", { name: /Architecture Tags/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Designed, implemented, tested, and deployed/i)
    ).toBeInTheDocument();

    const projectTypeFilters = screen.getByRole("region", {
      name: /Project filters/i,
    });
    const languageFilters = screen.getByRole("region", {
      name: /Programming language filters/i,
    });

    expect(
      within(projectTypeFilters).queryByRole("button", { name: "Java" })
    ).not.toBeInTheDocument();
    expect(
      within(languageFilters).getByRole("button", { name: "Java" })
    ).toBeInTheDocument();

    await user.click(
      within(projectTypeFilters).getByRole("button", { name: "Fullstack" })
    );

    expect(screen.getByText(/Showing 6 of 6 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lens Lounge/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /AWS Learning Portal/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Security" }));

    expect(screen.getByText(/Showing 3 of 6 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Hex Gate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Java Start/i })
    ).toBeInTheDocument();

    await user.click(
      within(languageFilters).getByRole("button", { name: "Java" })
    );

    expect(screen.getByText(/Showing 1 of 6 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Java Start/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Hex Gate/i })
    ).not.toBeInTheDocument();

    await user.click(
      within(languageFilters).getByRole("button", { name: "All" })
    );

    await user.click(
      within(projectTypeFilters).getByRole("button", { name: "All" })
    );
    await user.click(
      within(languageFilters).getByRole("button", { name: "Go" })
    );

    expect(screen.getByText(/Showing 3 of 6 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lens Lounge/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Hex Gate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lavoval/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /SERGIOARTG Platform/i })
    ).not.toBeInTheDocument();

    await user.click(
      within(languageFilters).getByRole("button", { name: "All" })
    );

    await user.click(
      within(languageFilters).getByRole("button", { name: "JS" })
    );

    expect(screen.getByText(/Showing 1 of 6 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /AWS Learning Portal/i })
    ).toBeInTheDocument();
    expect(
      within(projectTypeFilters).getByRole("button", { name: "Cloud" })
    ).toBeEnabled();
    expect(
      within(projectTypeFilters).getByRole("button", { name: "Fullstack" })
    ).toBeEnabled();
    expect(
      within(projectTypeFilters).getByRole("button", { name: "Security" })
    ).toBeEnabled();
    expect(
      within(projectTypeFilters).getByRole("button", { name: "Marketplace" })
    ).toBeDisabled();
    expect(
      within(projectTypeFilters).getByRole("button", { name: "Microservices" })
    ).toBeDisabled();

    await user.click(
      within(languageFilters).getByRole("button", { name: "All" })
    );
    await user.click(
      within(projectTypeFilters).getByRole("button", { name: "Microservices" })
    );

    expect(screen.getByText(/Showing 1 of 6 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lens Lounge/i })
    ).toBeInTheDocument();
    expect(
      within(languageFilters).getByRole("button", { name: "TS" })
    ).toBeEnabled();
    expect(
      within(languageFilters).getByRole("button", { name: "Go" })
    ).toBeEnabled();
    expect(
      within(languageFilters).getByRole("button", { name: "JS" })
    ).toBeDisabled();
    expect(
      within(languageFilters).getByRole("button", { name: "Java" })
    ).toBeDisabled();

    await user.click(
      within(projectTypeFilters).getByRole("button", { name: "All" })
    );

    await user.click(
      screen.getByRole("button", { name: /Preview Hex Gate screenshot/i })
    );

    expect(
      screen.getByRole("dialog", { name: /Hex Gate screenshot preview/i })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Close screenshot preview/i })
    );

    expect(
      screen.queryByRole("dialog", { name: /Hex Gate screenshot preview/i })
    ).not.toBeInTheDocument();
  });

  it("renders compact project cards with collapsed details on mobile", async () => {
    mockCompactLayout(true);
    const user = userEvent.setup();

    render(<ProjectsPage />);

    expect(
      screen.queryByRole("heading", { name: /Architecture Tags/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lens Lounge/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Content and commerce platform/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.queryByRole("heading", { name: /What I Built/i })
    ).not.toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Details" })[0]);

    expect(
      screen.getByRole("heading", { name: /What I Built/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Project At A Glance/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Live site/i })
    ).toBeInTheDocument();
  });
});
