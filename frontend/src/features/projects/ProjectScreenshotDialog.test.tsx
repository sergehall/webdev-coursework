import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { sergioartgProject } from "@/features/projects/data/projects/sergioartgProject";
import ProjectScreenshotDialog from "@/features/projects/ProjectScreenshotDialog";

describe("<ProjectScreenshotDialog />", () => {
  it("cycles through a project gallery and resets when reopened", async () => {
    const user = userEvent.setup();
    const project = {
      ...sergioartgProject,
      galleryImages: [
        { src: "/screenshots/projects/second.webp", caption: "Second view" },
        { src: "/screenshots/projects/third.webp", caption: "Third view" },
      ],
    };
    const onClose = vi.fn();
    const { rerender } = render(
      <ProjectScreenshotDialog project={project} onClose={onClose} />
    );
    const dialog = screen.getByRole("dialog");

    expect(within(dialog).getByText("1 of 3")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Next screenshot" })
    );
    expect(within(dialog).getByText("Second view")).toBeInTheDocument();
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      "/screenshots/projects/second.webp"
    );

    await user.keyboard("{ArrowLeft}");
    expect(within(dialog).getByText("1 of 3")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Previous screenshot" })
    );
    expect(within(dialog).getByText("3 of 3")).toBeInTheDocument();

    rerender(<ProjectScreenshotDialog project={null} onClose={onClose} />);
    rerender(<ProjectScreenshotDialog project={project} onClose={onClose} />);
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });
});
