import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { projectShowcaseItems } from "@/data/projectShowcase";
import ProjectLinks from "@/features/projects/ProjectLinks";

const hexGateProject = projectShowcaseItems.find(
  (project) => project.id === "hex-gate"
);
const lavovalProject = projectShowcaseItems.find(
  (project) => project.id === "lavoval"
);
const javaStartProject = projectShowcaseItems.find(
  (project) => project.id === "java-start"
);
const awsLearningPortalProject = projectShowcaseItems.find(
  (project) => project.id === "aws-learning-portal"
);
const javaFxEventHandlingProject = projectShowcaseItems.find(
  (project) => project.id === "javafx-event-handling"
);
const cs85PhpProgrammingProject = projectShowcaseItems.find(
  (project) => project.id === "cs85-php-programming"
);

describe("<ProjectLinks /> project resources", () => {
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

  it("keeps the public Lavoval resources as direct external links", () => {
    if (!lavovalProject) {
      throw new Error("Lavoval project data was not found");
    }

    render(<ProjectLinks project={lavovalProject} />);

    expect(screen.getByRole("link", { name: /Live site/i })).toHaveAttribute(
      "href",
      "https://lavoval.com"
    );
    expect(screen.getByRole("link", { name: /Source/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/lavoval"
    );
    expect(screen.getByRole("link", { name: /Docs/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/lavoval/tree/main/docs"
    );
    expect(screen.getByRole("link", { name: /Architecture/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/lavoval/blob/main/docs/architecture.md"
    );

    expect(lavovalProject.category).toBe(
      "Executable skill marketplace and creator platform"
    );
    expect(lavovalProject.architectureTags).toContain(
      "Versioned skill definitions"
    );
    expect(
      lavovalProject.highlights.some((highlight) =>
        /external LLM providers stay on the roadmap/i.test(highlight)
      )
    ).toBe(true);
  });

  it("keeps Java Start local while linking its public project resources", () => {
    if (!javaStartProject) {
      throw new Error("Java Start project data was not found");
    }

    render(<ProjectLinks project={javaStartProject} />);

    expect(
      screen.queryByRole("link", { name: /Live site/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/java-start"
    );
    expect(screen.getByRole("link", { name: /Docs/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/java-start/blob/main/README.md"
    );
    expect(screen.getByRole("link", { name: /Architecture/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/java-start/blob/main/README.md#learning-map"
    );

    expect(javaStartProject.status).toBe("local");
    expect(javaStartProject.category).toBe(
      "CS56 coursework and full-stack Java learning platform"
    );
    expect(javaStartProject.architectureTags).toContain(
      "Catalog-driven learning"
    );
    expect(
      javaStartProject.highlights.some((highlight) =>
        /deployment remains intentionally local/i.test(highlight)
      )
    ).toBe(true);
  });

  it("links the AWS Learning Portal inventory and hosted video demo", () => {
    if (!awsLearningPortalProject) {
      throw new Error("AWS Learning Portal project data was not found");
    }

    render(<ProjectLinks project={awsLearningPortalProject} />);

    expect(screen.getByRole("link", { name: /Live site/i })).toHaveAttribute(
      "href",
      "https://awsawesome.com"
    );
    expect(screen.getByRole("link", { name: /Source/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/final-project-CS79D"
    );
    expect(screen.getByRole("link", { name: /Docs/i })).toHaveAttribute(
      "href",
      "https://sergehall.github.io/final-project-CS79D/"
    );
    expect(screen.getByRole("link", { name: /Architecture/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/final-project-CS79D/blob/main/docs/architecture.md"
    );
    expect(screen.getByRole("link", { name: /Video demo/i })).toHaveAttribute(
      "href",
      "https://sergehall.github.io/final-project-CS79D/video.html"
    );

    expect(awsLearningPortalProject.architectureTags).toContain(
      "Serverless activity pipeline"
    );
    expect(awsLearningPortalProject.status).toBe("paused");
    expect(awsLearningPortalProject.summary).toMatch(
      /EC2 runtime is currently paused/i
    );
    expect(
      awsLearningPortalProject.highlights.some((highlight) =>
        /account data resets after a backend restart/i.test(highlight)
      )
    ).toBe(true);
  });

  it("links the JavaFX project source, documentation, architecture, and demo", () => {
    if (!javaFxEventHandlingProject) {
      throw new Error("JavaFX Event Handling project data was not found");
    }

    render(<ProjectLinks project={javaFxEventHandlingProject} />);

    expect(
      screen.queryByRole("link", { name: /Live site/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/javafx-event-handling-group-project"
    );
    expect(screen.getByRole("link", { name: /Docs/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/javafx-event-handling-group-project/tree/main/docs"
    );
    expect(screen.getByRole("link", { name: /Architecture/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/javafx-event-handling-group-project?tab=readme-ov-file#architecture-boundaries"
    );
    expect(screen.getByRole("link", { name: /Video demo/i })).toHaveAttribute(
      "href",
      "https://sergehall.github.io/javafx-event-handling-group-project/"
    );

    expect(javaFxEventHandlingProject.languages).toEqual(["Java", "TS"]);
    expect(javaFxEventHandlingProject.status).toBe("local");
  });

  it("links the PHP project source, documentation, architecture, and AI demo", () => {
    if (!cs85PhpProgrammingProject) {
      throw new Error("CS85 PHP Programming project data was not found");
    }

    render(<ProjectLinks project={cs85PhpProgrammingProject} />);

    expect(
      screen.queryByRole("link", { name: /Live site/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/cs85-php-programming"
    );
    expect(screen.getByRole("link", { name: /Docs/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/cs85-php-programming/tree/main/docs"
    );
    expect(screen.getByRole("link", { name: /Architecture/i })).toHaveAttribute(
      "href",
      "https://github.com/sergehall/cs85-php-programming/blob/main/docs/architecture/ai-architecture.md"
    );
    expect(screen.getByRole("link", { name: /Video demo/i })).toHaveAttribute(
      "href",
      "https://sergehall.github.io/cs85-php-programming/"
    );

    expect(cs85PhpProgrammingProject.filters).toContain("AI");
    expect(cs85PhpProgrammingProject.languages).toEqual(["PHP"]);
    expect(cs85PhpProgrammingProject.status).toBe("local");
  });
});
