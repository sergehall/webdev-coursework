import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./ProjectsPage";

describe("<ProjectsPage />", () => {
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

    expect(screen.getByText(/Showing 1 of 6 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lavoval/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Lens Lounge/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Hex Gate/i })
    ).not.toBeInTheDocument();

    await user.click(
      within(languageFilters).getByRole("button", { name: "All" })
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
});
