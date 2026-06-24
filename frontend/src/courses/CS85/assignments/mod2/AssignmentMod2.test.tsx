import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import AssignmentMod2 from "./AssignmentMod2";

describe("<AssignmentMod2 />", () => {
  it("renders Module 2 with separate collapsed Canvas blocks", () => {
    render(<AssignmentMod2 />);

    expect(
      screen.getByRole("heading", {
        name: "Module 2 - Control Structures & Loops",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "ReadMe Module 2: Condition Statements & Loops",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Required Reading" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 2 Assignment 2A: if/else Business",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 2 Assignment 2B: Time loops",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Quiz: Module 2 - Condition Statements & Loops",
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Assignment & Quiz" })
    ).not.toBeInTheDocument();
    expect(screen.queryByText("module2_reading.pdf")).not.toBeInTheDocument();
    expect(screen.queryByText("20 pts")).not.toBeInTheDocument();
  });

  it("expands the Module 2 reading, assignments, and quiz independently", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod2 />);

    await user.click(screen.getByRole("button", { name: "Required Reading" }));
    expect(screen.getByText("module2_reading.pdf")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Module 2 Assignment 2A: if/else Business",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Module 2 Assignment 2B: Time loops",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 2 - Condition Statements & Loops",
      })
    );

    expect(
      screen.getAllByText("Module 2 Assignment 2A: if/else Business")
    ).toHaveLength(2);
    expect(screen.getAllByText("Objective")).toHaveLength(2);
    expect(
      screen.getByText(/real-world simulation of a common developer task/)
    ).toBeInTheDocument();
    expect(screen.getByText("The Scenario")).toBeInTheDocument();
    expect(
      screen.getByText(/junior developer at an online T-shirt store/)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Module 2 Assignment 2B: Time loops")
    ).toHaveLength(2);
    expect(
      screen.getByText(/This assignment tests loops and conditional logic/)
    ).toBeInTheDocument();
    expect(screen.getByText("Cosmic Number Rules")).toBeInTheDocument();
    expect(screen.getByText("Reflection")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View Module 2 Assignment 2B files" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Quiz: Module 2 - Condition Statements & Loops")
    ).toHaveLength(2);
    expect(screen.getAllByText("Due: Jun 28 at 11:59pm")).toHaveLength(1);
    expect(screen.getAllByText("20 pts")).toHaveLength(2);
    expect(screen.getByText("10 pts")).toBeInTheDocument();
    expect(screen.getByText("Timed quiz")).toBeInTheDocument();
    expect(
      screen.getByText(/SHIFT, ALT, and T\. Again: SHIFT, ALT, and T\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Which of the following is the correct syntax for an if statement?"
      )
    ).toBeInTheDocument();
  });

  it("opens the Module 2 Assignment 2A PDF preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod2 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 2 Assignment 2A: if/else Business",
      })
    );
    await user.click(
      screen.getByRole("button", { name: "View module2_assignment_2a.pdf" })
    );

    expect(screen.getByTitle("module2_assignment_2a.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download module2_assignment_2a.pdf" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-2/module2_assignment_2a.pdf"
    );
  });

  it("opens the Module 2 Assignment 2B file preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod2 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 2 Assignment 2B: Time loops",
      })
    );
    await user.click(
      screen.getByRole("button", { name: "View Module 2 Assignment 2B files" })
    );

    expect(screen.getByTitle("module2_assignment_2b.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download module2_assignment_2b.pdf" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-2/module2_assignment_2b.pdf"
    );
    expect(
      screen.getByRole("link", { name: "Download CosmicCalendarBuilder.php" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-2/CosmicCalendarBuilder.php"
    );
  });

  it("scores the Module 2 conditions and loops quiz with the embedded answer key", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod2 />);

    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 2 - Condition Statements & Loops",
      })
    );

    await user.click(
      screen.getByRole("button", { name: "if ($aVariable == 1)" })
    );
    await user.click(
      screen.getByRole("button", {
        name: "are within a command { ... } block",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: 'else { echo "the else statement"; }',
      })
    );
    await user.click(screen.getByRole("button", { name: "iteration" }));
    await user.click(
      screen.getByRole("button", { name: "while ($i < 100) { }" })
    );

    const trueOptions = screen.getAllByRole("button", { name: "True" });
    const falseOptions = screen.getAllByRole("button", { name: "False" });

    await user.click(trueOptions[0]);
    await user.click(trueOptions[1]);
    await user.click(falseOptions[2]);
    await user.click(trueOptions[3]);
    await user.click(trueOptions[4]);
    await user.click(screen.getByRole("button", { name: "Submit Quiz" }));

    expect(
      screen.getByText("Score for this attempt: 10 out of 10")
    ).toBeInTheDocument();
  });
});
