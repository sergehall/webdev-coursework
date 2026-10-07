import { describe, expect, it, vi } from "vitest";

import {
  downloadPlan,
  planMarkdown,
  planPrintHtml,
  type PlanExport,
} from "./mentor-plan-export";

const plan: PlanExport = {
  profile: {
    goal: "frontend",
    level: "beginner",
    hours: 4,
    outcome: "",
  },
  steps: [
    {
      id: "one",
      week: 1,
      title: "Build <a> page",
      doneWhen: "Open it in a browser",
      hours: 2,
      sourceIds: ["source:one", "source:external"],
    },
    {
      id: "two",
      week: 2,
      title: "Add styles",
      doneWhen: "The heading changes color",
      hours: 2,
    },
  ],
  metadata: {
    goal: "frontend",
    rationale: "Start with one page.",
    assumptions: [],
    sources: [
      {
        sourceId: "source:one",
        title: "HTML & CSS",
        href: "/coursework/CS80/assignment/1",
      },
      {
        sourceId: "source:external",
        title: "Unexpected external link",
        href: "https://external.example/course",
      },
    ],
  },
  done: ["one"],
  draft: false,
};

describe("mentor plan export", () => {
  it("exports the accepted path with progress and working coursework links", () => {
    const output = planMarkdown(plan, "https://webdev-coursework.com");
    expect(output).toContain("Status: Accepted path");
    expect(output).toContain("Progress: 1 of 2 steps complete");
    expect(output).toContain("## Week 1");
    expect(output).toContain("- [x] Self-reported practice · 2 h");
    expect(output).toContain(
      "[HTML & CSS](https://webdev-coursework.com/coursework/CS80/assignment/1)"
    );
    expect(output).not.toContain("external.example");
  });

  it("labels unaccepted work as a draft and escapes print content", () => {
    const draft = { ...plan, draft: true };
    const markdown = planMarkdown(draft, "https://webdev-coursework.com");
    const html = planPrintHtml(draft, "https://webdev-coursework.com");
    expect(markdown).toContain("Status: Draft for review");
    expect(markdown).not.toContain("Progress: 1 of 2");
    expect(html).toContain("Build &lt;a&gt; page");
    expect(html).toContain("Draft for review");
    expect(html).not.toContain("external.example");
    expect(html).not.toContain("<a> page");
  });

  it("downloads a local Markdown file without an API request", () => {
    const originalCreate = Object.getOwnPropertyDescriptor(
      URL,
      "createObjectURL"
    );
    const originalRevoke = Object.getOwnPropertyDescriptor(
      URL,
      "revokeObjectURL"
    );
    const create = vi.fn(() => "blob:mentor-plan");
    const revoke = vi.fn();
    const clicked: { href: string; name: string }[] = [];
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: create,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revoke,
    });
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        clicked.push({ href: this.href, name: this.download });
      });
    vi.useFakeTimers();
    try {
      downloadPlan(plan, "https://webdev-coursework.com");
      expect(create).toHaveBeenCalledWith(expect.any(Blob));
      expect(clicked).toEqual([
        { href: "blob:mentor-plan", name: "web-development-path.md" },
      ]);
      expect(document.querySelector("a[download]")).toBeNull();
      vi.runAllTimers();
      expect(revoke).toHaveBeenCalledWith("blob:mentor-plan");
    } finally {
      vi.useRealTimers();
      click.mockRestore();
      if (originalCreate)
        Object.defineProperty(URL, "createObjectURL", originalCreate);
      else
        delete (URL as unknown as { createObjectURL?: unknown })
          .createObjectURL;
      if (originalRevoke)
        Object.defineProperty(URL, "revokeObjectURL", originalRevoke);
      else
        delete (URL as unknown as { revokeObjectURL?: unknown })
          .revokeObjectURL;
    }
  });
});
