import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./ProjectsPage";

describe("OP Cosmetology project showcase", () => {
  it("presents verified details and safe summaries for the private project", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const card = screen
      .getByRole("heading", { name: /OP Cosmetology/i })
      .closest("article");

    expect(card).not.toBeNull();

    if (!card) {
      throw new Error("OP Cosmetology project card was not rendered");
    }

    expect(
      within(card).getByText(/Transactional email outbox/i)
    ).toBeInTheDocument();
    expect(
      within(card).getByText(
        /booking, availability, payments, deposits, and certificates/i
      )
    ).toBeInTheDocument();
    expect(
      within(card).getByRole("link", { name: /Live site/i })
    ).toHaveAttribute("href", "https://opcosmetology.com");
    expect(
      within(card).queryByRole("link", { name: /Source/i })
    ).not.toBeInTheDocument();
    expect(
      within(card).queryByRole("link", { name: /Docs/i })
    ).not.toBeInTheDocument();
    expect(
      within(card).queryByRole("link", { name: /Architecture/i })
    ).not.toBeInTheDocument();

    const docsButton = within(card).getByRole("button", { name: /Docs/i });
    await user.click(docsButton);

    const docsDialog = screen.getByRole("dialog", {
      name: /OP Cosmetology documentation/i,
    });
    expect(
      within(docsDialog).getByRole("heading", {
        name: /Reliable communication/i,
      })
    ).toBeInTheDocument();
    expect(
      within(docsDialog).getByText(
        /Online booking, availability, payments, deposits/i
      )
    ).toBeInTheDocument();
    expect(
      within(docsDialog).getByText(
        /excludes source code, credentials, infrastructure identifiers/i
      )
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(docsDialog).not.toBeInTheDocument();
    expect(docsButton).toHaveFocus();

    const architectureButton = within(card).getByRole("button", {
      name: /Architecture/i,
    });
    await user.click(architectureButton);

    const architectureDialog = screen.getByRole("dialog", {
      name: /OP Cosmetology architecture/i,
    });
    expect(
      within(architectureDialog).getByRole("heading", {
        name: /Identity and trust/i,
      })
    ).toBeInTheDocument();
    expect(
      within(architectureDialog).getByText(
        /The browser owns presentation and user interaction/i
      )
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(architectureDialog).not.toBeInTheDocument();
    expect(architectureButton).toHaveFocus();
  });
});
