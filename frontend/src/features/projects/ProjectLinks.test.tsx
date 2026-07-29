import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { projectShowcaseItems } from "@/data/projectShowcase";
import ProjectLinks from "@/features/projects/ProjectLinks";

const hexGateProject = projectShowcaseItems.find(
  (project) => project.id === "hex-gate"
);

describe("<ProjectLinks /> private project resources", () => {
  it("keeps Hex Gate source private and presents safe modal summaries", async () => {
    if (!hexGateProject) {
      throw new Error("Hex Gate project data was not found");
    }

    const user = userEvent.setup();
    render(<ProjectLinks project={hexGateProject} />);

    expect(screen.getByRole("link", { name: /Live site/i })).toHaveAttribute(
      "href",
      "https://6b616c69.com"
    );
    expect(
      screen.queryByRole("link", { name: /Source/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Docs/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Architecture/i })
    ).not.toBeInTheDocument();

    const docsButton = screen.getByRole("button", { name: /Docs/i });
    await user.click(docsButton);

    const docsDialog = screen.getByRole("dialog", {
      name: /Hex Gate documentation/i,
    });
    expect(
      within(docsDialog).getByRole("heading", {
        name: /Controlled validation/i,
      })
    ).toBeInTheDocument();
    expect(
      within(docsDialog).getByText(
        /production scanner transport remain fail-closed/i
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

    const architectureButton = screen.getByRole("button", {
      name: /Architecture/i,
    });
    await user.click(architectureButton);

    const architectureDialog = screen.getByRole("dialog", {
      name: /Hex Gate architecture/i,
    });
    expect(
      within(architectureDialog).getByRole("heading", {
        name: /Scanner control plane/i,
      })
    ).toBeInTheDocument();
    expect(
      within(architectureDialog).getByText(
        /browser never becomes a general command channel/i
      )
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(architectureDialog).not.toBeInTheDocument();
    expect(architectureButton).toHaveFocus();
  });
});
