import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./ProjectsPage";

function getMyCaseTrailCard() {
  const card = screen
    .getByRole("heading", { name: "MyCaseTrail" })
    .closest("article");

  if (!card) {
    throw new Error("MyCaseTrail project card was not rendered");
  }

  return card;
}

describe("MyCaseTrail project showcase", () => {
  it("places the live private project after OP Cosmetology with public resource dialogs", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const projectTitles = screen
      .getAllByRole("button", { name: /Preview .* screenshot/i })
      .map((button) => button.getAttribute("aria-label"));
    expect(projectTitles.slice(0, 4)).toEqual([
      "Preview SERGIOARTG Platform screenshot",
      "Preview OP Cosmetology screenshot",
      "Preview MyCaseTrail screenshot",
      "Preview Lens Lounge screenshot",
    ]);

    const card = getMyCaseTrailCard();
    expect(within(card).getByText("Published")).toBeInTheDocument();
    expect(
      within(card).getByRole("link", { name: /Live site/i })
    ).toHaveAttribute("href", "https://mycasetrail.com");
    expect(
      within(card).queryByRole("link", { name: /Source|Docs|Architecture/i })
    ).not.toBeInTheDocument();

    const docsButton = within(card).getByRole("button", { name: "Docs" });
    await user.click(docsButton);
    const docsDialog = screen.getByRole("dialog", {
      name: "MyCaseTrail documentation",
    });
    expect(
      within(docsDialog).getByRole("heading", {
        name: "Documents and Filing Packages",
      })
    ).toBeInTheDocument();
    expect(
      within(docsDialog).getByText(/does not provide legal advice/i)
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(docsButton).toHaveFocus();

    const architectureButton = within(card).getByRole("button", {
      name: "Architecture",
    });
    await user.click(architectureButton);
    const architectureDialog = screen.getByRole("dialog", {
      name: "MyCaseTrail architecture",
    });
    expect(
      within(architectureDialog).getByRole("heading", {
        name: "Account isolation and concurrency",
      })
    ).toBeInTheDocument();
    expect(
      within(architectureDialog).getByText(
        /do not automatically grant access to another account/i
      )
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(architectureButton).toHaveFocus();
  });

  it("uses screenshot one for the cover and cycles through all six views in numeric order", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const card = getMyCaseTrailCard();
    const preview = within(card).getByRole("button", {
      name: "Preview MyCaseTrail screenshot",
    });
    expect(within(preview).getByRole("img")).toHaveAttribute(
      "src",
      "/screenshots/projects/mycasetrail-card.webp?v=ca75b9a975b0"
    );

    await user.click(preview);
    const dialog = screen.getByRole("dialog", {
      name: "MyCaseTrail screenshot preview",
    });
    for (let number = 1; number <= 6; number++) {
      expect(within(dialog).getByText(`${number} of 6`)).toBeInTheDocument();
      expect(within(dialog).getByRole("img")).toHaveAttribute(
        "src",
        `/screenshots/projects/mycasetrail-${number}.webp?v=ca75b9a975b0`
      );
      await user.click(
        within(dialog).getByRole("button", { name: "Next screenshot" })
      );
    }
    expect(within(dialog).getByText("1 of 6")).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}");
    expect(within(dialog).getByText("6 of 6")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(preview).toHaveFocus();
  });
});
