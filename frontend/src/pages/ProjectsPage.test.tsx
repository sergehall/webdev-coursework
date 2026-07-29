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
    const lensLoungeCard = screen
      .getByRole("heading", { name: /Lens Lounge/i })
      .closest("article");

    expect(lensLoungeCard).not.toBeNull();

    if (!lensLoungeCard) {
      throw new Error("Lens Lounge project card was not rendered");
    }

    expect(
      within(lensLoungeCard).getByText(/creator and editor workflows/i)
    ).toBeInTheDocument();
    expect(
      within(lensLoungeCard).getByText(/Browser-facing API gateway/i)
    ).toBeInTheDocument();
    expect(
      within(lensLoungeCard).getByText(/intentionally gating generic purchase/i)
    ).toBeInTheDocument();
    expect(
      within(lensLoungeCard).queryByRole("link", { name: /Source/i })
    ).not.toBeInTheDocument();
    expect(
      within(lensLoungeCard).queryByRole("link", { name: /Docs/i })
    ).not.toBeInTheDocument();
    expect(
      within(lensLoungeCard).queryByRole("link", { name: /Architecture/i })
    ).not.toBeInTheDocument();

    const lensDocsButton = within(lensLoungeCard).getByRole("button", {
      name: /Docs/i,
    });
    await user.click(lensDocsButton);

    const lensDocsDialog = screen.getByRole("dialog", {
      name: /Lens Lounge documentation/i,
    });

    expect(
      within(lensDocsDialog).getByRole("heading", {
        name: /Specialized services/i,
      })
    ).toBeInTheDocument();
    expect(
      within(lensDocsDialog).getByText(/Generic purchase activation remains/i)
    ).toBeInTheDocument();
    expect(
      within(lensDocsDialog).getByText(
        /excludes source code, credentials, infrastructure identifiers/i
      )
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(lensDocsDialog).not.toBeInTheDocument();
    expect(lensDocsButton).toHaveFocus();

    const lensArchitectureButton = within(lensLoungeCard).getByRole("button", {
      name: /Architecture/i,
    });
    await user.click(lensArchitectureButton);

    const lensArchitectureDialog = screen.getByRole("dialog", {
      name: /Lens Lounge architecture/i,
    });

    expect(
      within(lensArchitectureDialog).getByRole("heading", {
        name: /Browser-facing gateway/i,
      })
    ).toBeInTheDocument();
    expect(
      within(lensArchitectureDialog).getByText(
        /Presigned uploads move media directly/i
      )
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(lensArchitectureDialog).not.toBeInTheDocument();
    expect(lensArchitectureButton).toHaveFocus();

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
    expect(
      screen.getByRole("heading", { name: /JavaFX Event Handling/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /PHP Programming/i })
    ).toBeInTheDocument();

    const previewButtons = screen.getAllByRole("button", {
      name: /Preview .* screenshot/i,
    });

    expect(previewButtons[0]).toHaveAccessibleName(
      "Preview SERGIOARTG Platform screenshot"
    );
    expect(
      screen.getByText(/Professionals publish service offers/i)
    ).toBeInTheDocument();

    await user.click(previewButtons[0]);

    const sergioartgDialog = screen.getByRole("dialog", {
      name: /SERGIOARTG Platform screenshot preview/i,
    });
    const closeScreenshotButton = within(sergioartgDialog).getByRole("button", {
      name: /Close screenshot preview/i,
    });

    expect(
      within(sergioartgDialog).getByAltText(
        /SERGIOARTG Platform additional website preview 2/i
      )
    ).toHaveAttribute(
      "src",
      "/screenshots/projects/sergioartg-services-marketplace.webp"
    );
    expect(
      within(sergioartgDialog).getByAltText(
        /SERGIOARTG Platform additional website preview 3/i
      )
    ).toHaveAttribute(
      "src",
      "/screenshots/projects/sergioartg-service-categories.webp"
    );
    expect(closeScreenshotButton).toHaveFocus();

    await user.click(closeScreenshotButton);
    expect(previewButtons[0]).toHaveFocus();

    const sergioartgCard = screen
      .getByRole("heading", { name: /SERGIOARTG Platform/i })
      .closest("article");

    expect(sergioartgCard).not.toBeNull();

    if (!sergioartgCard) {
      throw new Error("SERGIOARTG project card was not rendered");
    }

    expect(
      within(sergioartgCard).queryByRole("link", { name: /Source/i })
    ).not.toBeInTheDocument();

    await user.click(
      within(sergioartgCard).getByRole("button", { name: /Docs/i })
    );

    const documentationDialog = screen.getByRole("dialog", {
      name: /SERGIOARTG Platform documentation/i,
    });
    const closeDocumentationButton = within(documentationDialog).getByRole(
      "button",
      {
        name: /Close documentation overview/i,
      }
    );

    expect(
      within(documentationDialog).getByRole("heading", {
        name: /Product and marketplace/i,
      })
    ).toBeInTheDocument();
    expect(
      within(documentationDialog).getByText(
        /repository and operational runbooks remain private/i
      )
    ).toBeInTheDocument();
    expect(closeDocumentationButton).toHaveFocus();

    await user.click(closeDocumentationButton);
    expect(
      within(sergioartgCard).getByRole("button", { name: /Docs/i })
    ).toHaveFocus();

    expect(
      within(sergioartgCard).queryByRole("link", { name: /Architecture/i })
    ).not.toBeInTheDocument();

    await user.click(
      within(sergioartgCard).getByRole("button", { name: /Architecture/i })
    );

    const architectureDialog = screen.getByRole("dialog", {
      name: /SERGIOARTG Platform architecture/i,
    });

    expect(
      within(architectureDialog).getByRole("heading", {
        name: /Measured improvements/i,
      })
    ).toBeInTheDocument();
    expect(
      within(architectureDialog).getByText(
        /Critical hotspots decreased from 3 to 0/i
      )
    ).toBeInTheDocument();

    await user.click(
      within(architectureDialog).getByRole("button", {
        name: /Close architecture overview/i,
      })
    );

    expect(screen.getAllByRole("link", { name: /Live site/i })).toHaveLength(5);
    expect(
      screen.getByRole("heading", { name: /Architecture footprint/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Explore my GitHub/i })
    ).toHaveAttribute("href", "https://github.com/SergeHall");
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
    expect(
      within(projectTypeFilters).getByRole("button", { name: "AI" })
    ).toBeInTheDocument();
    expect(
      within(languageFilters).getByRole("button", { name: "PHP" })
    ).toBeInTheDocument();

    await user.click(
      within(projectTypeFilters).getByRole("button", { name: "Fullstack" })
    );

    expect(screen.getByText(/Showing 8 of 8 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lens Lounge/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /AWS Learning Portal/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Security" }));

    expect(screen.getByText(/Showing 3 of 8 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Hex Gate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Java Start/i })
    ).toBeInTheDocument();

    await user.click(
      within(languageFilters).getByRole("button", { name: "Java" })
    );

    expect(screen.getByText(/Showing 1 of 8 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Java Start/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Hex Gate/i })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByText(/Showing 8 of 8 projects/i)).toBeInTheDocument();
    expect(
      within(projectTypeFilters).getByRole("button", { name: "All" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      within(languageFilters).getByRole("button", { name: "All" })
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(
      within(projectTypeFilters).getByRole("button", { name: "AI" })
    );

    expect(screen.getByText(/Showing 1 of 8 projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /PHP Programming/i })
    ).toBeInTheDocument();
    expect(
      within(languageFilters).getByRole("button", { name: "PHP" })
    ).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Reset" }));

    await user.click(
      within(languageFilters).getByRole("button", { name: "Go" })
    );

    expect(screen.getByText(/Showing 3 of 8 projects/i)).toBeInTheDocument();
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
      screen.queryByRole("heading", { name: /PHP Programming/i })
    ).not.toBeInTheDocument();

    await user.click(
      within(languageFilters).getByRole("button", { name: "All" })
    );

    await user.click(
      within(languageFilters).getByRole("button", { name: "JS" })
    );

    expect(screen.getByText(/Showing 1 of 8 projects/i)).toBeInTheDocument();
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
      within(projectTypeFilters).getByRole("button", { name: "AI" })
    ).toBeDisabled();
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

    expect(screen.getByText(/Showing 1 of 8 projects/i)).toBeInTheDocument();
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
      screen.getByRole("heading", { name: /Architecture footprint/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Lens Lounge/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Publishing, collaboration, and commerce platform/i)
        .length
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
