import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ShowModalButton from "./ShowModalButton";

const pdfFile = {
  fileUrl: "/coursework/module-report.pdf",
  filename: "Module Report.pdf",
};

describe("ShowModalButton", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not expose a dialog while it is closed or has no files", () => {
    const { rerender } = render(
      <ShowModalButton isOpen={false} onClose={vi.fn()} files={[pdfFile]} />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(<ShowModalButton isOpen onClose={vi.fn()} files={[]} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders an accessible PDF preview and download action", () => {
    render(<ShowModalButton isOpen onClose={vi.fn()} files={[pdfFile]} />);

    const dialog = screen.getByRole("dialog", { name: "File preview" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveFocus();
    expect(screen.getByTitle("Module Report.pdf")).toHaveAttribute(
      "src",
      pdfFile.fileUrl
    );
    expect(
      screen.getByRole("link", { name: "Download Module Report.pdf" })
    ).toHaveAttribute("href", pdfFile.fileUrl);
  });

  it("loads and displays source-code previews", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "const answer = 42;",
    } satisfies Partial<Response>);
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ShowModalButton
        isOpen
        onClose={vi.fn()}
        files={[{ fileUrl: "/src/example.ts", filename: "example.ts" }]}
      />
    );

    expect(screen.getByText("Loading preview...")).toBeInTheDocument();
    expect(await screen.findByText("const answer = 42;")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/src/example.ts");
  });

  it("shows a useful error when a source-code preview cannot be loaded", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        text: async () => "",
      } satisfies Partial<Response>)
    );

    render(
      <ShowModalButton
        isOpen
        onClose={vi.fn()}
        files={[{ fileUrl: "/src/missing.php", filename: "missing.php" }]}
      />
    );

    expect(
      await screen.findByText("Unable to load missing.php")
    ).toBeInTheDocument();
  });

  it("renders image previews and explains unsupported file types", () => {
    render(
      <ShowModalButton
        isOpen
        onClose={vi.fn()}
        files={[
          { fileUrl: "/images/result.png", filename: "result.png" },
          { fileUrl: "/archives/source.zip", filename: "source.zip" },
        ]}
      />
    );

    expect(screen.getByRole("img", { name: "result.png" })).toHaveAttribute(
      "src",
      "/images/result.png"
    );
    expect(screen.getByText("Unsupported file type")).toBeInTheDocument();
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();

    function ModalHarness() {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <button type="button" onClick={() => setIsOpen(true)}>
            Open files
          </button>
          <ShowModalButton
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            files={[pdfFile]}
          />
        </>
      );
    }

    render(<ModalHarness />);
    const trigger = screen.getByRole("button", { name: "Open files" });

    await user.click(trigger);
    expect(screen.getByRole("dialog")).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
