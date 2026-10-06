import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import MentorMarkdown from "./MentorMarkdown";

describe("mentor answer formatting", () => {
  it("renders basic Markdown while escaping HTML and refusing unverified links", () => {
    const { container } = render(
      <MemoryRouter>
        <MentorMarkdown
          text={
            "**Start** with `HTML`.\n\n- Try a page\n- [Course](/coursework/cs56)\n- [Bad](javascript:alert)\n<img src=x onerror=alert(1)>"
          }
          allowedSources={[{ href: "/coursework/cs56" }]}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Start", { selector: "strong" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Course" })).toHaveAttribute(
      "href",
      "/coursework/cs56"
    );
    expect(screen.queryByRole("link", { name: "Bad" })).toBeNull();
    expect(container.querySelector("img")).toBeNull();
    expect(container).toHaveTextContent("<img src=x onerror=alert(1)>");
  });
});
