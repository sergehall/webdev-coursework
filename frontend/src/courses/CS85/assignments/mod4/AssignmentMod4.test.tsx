import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod4 from "./AssignmentMod4";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

async function answerQuestion(
  user: ReturnType<typeof userEvent.setup>,
  question: string | RegExp,
  answer: string | RegExp
) {
  const questionText = screen.getByText(question);
  const card = questionText.closest(".rounded-lg");

  expect(card).not.toBeNull();

  await user.click(
    within(card as HTMLElement).getByRole("button", {
      name: answer,
    })
  );
}

describe("<AssignmentMod4 />", () => {
  it("renders the Module 4 Canvas shell collapsed by default", () => {
    render(<AssignmentMod4 />);

    expect(
      screen.getByRole("heading", {
        name: "Module 4 - Database Fundamentals",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "ReadMe Module 4: Database Fundamentals",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Required Reading" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4A: Database Setup",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4B: Personal Inventory Database",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Quiz: Module 4 - Database",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete module 4" })
    ).toBeInTheDocument();

    expect(screen.queryByText("module4_databases.pdf")).not.toBeInTheDocument();
    expect(screen.queryByText("21 pts")).not.toBeInTheDocument();
  });

  it("expands the Module 4 reading, assignment shells, and quiz shell independently", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod4 />);

    await user.click(screen.getByRole("button", { name: "Required Reading" }));
    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4A: Database Setup",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4B: Personal Inventory Database",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 4 - Database",
      })
    );

    expect(screen.getByText("module4_databases.pdf")).toBeInTheDocument();
    expect(
      screen.getAllByText("Module 4 Assignment 4A: Database Setup")
    ).toHaveLength(1);
    expect(
      screen.getAllByText("Module 4 Assignment 4B: Personal Inventory Database")
    ).toHaveLength(1);
    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(screen.getByText("Learning Goals")).toBeInTheDocument();
    expect(
      screen.getByText("Option 1: Laravel Herd Setup (macOS)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Option 2: XAMPP Setup (Windows/macOS/Linux)")
    ).toBeInTheDocument();
    expect(screen.getAllByText("Canvas Submission")).toHaveLength(2);
    expect(screen.getByText("Assignment Description")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Tutorial: Connecting to MySQL with PDO and Displaying Data"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Your Task")).toBeInTheDocument();
    expect(screen.getByText("Comment and Reflect")).toBeInTheDocument();
    expect(screen.getByText("Implementation Notes")).toBeInTheDocument();
    expect(screen.getByText(/cs85-module4b-inventory/)).toBeInTheDocument();
    expect(screen.queryByText("20 pts")).not.toBeInTheDocument();
    expect(screen.getAllByText("Quiz: Module 4 - Database")).toHaveLength(2);
    expect(
      screen.getByText("Database fundamentals review")
    ).toBeInTheDocument();
    expect(screen.getByText("Started: Jun 29 at 6:54pm")).toBeInTheDocument();
    expect(
      screen.getByText("What does PDO stand for in PHP?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This quiz block is available directly in the module/)
    ).toBeInTheDocument();
    expect(screen.getByText("21 pts")).toBeInTheDocument();
  });

  it("opens the Module 4 Assignment 4A PDF preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod4 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4A: Database Setup",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "View Module 4 Assignment 4A files",
      })
    );

    expect(screen.getByTitle("Module4_Assignment_4A.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Module4_Assignment_4A.pdf" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-4/Module4_Assignment_4A.pdf"
    );
  });

  it("opens the Module 4 Assignment 4B PDF and PHP file preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod4 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 4 Assignment 4B: Personal Inventory Database",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "View Module 4 Assignment 4B files",
      })
    );

    expect(screen.getByTitle("Module4_Assignment_4B.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Module4_Assignment_4B.pdf" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-4/Module4_Assignment_4B.pdf"
    );
    expect(
      screen.getByRole("link", { name: "Download show_inventory.php" })
    ).toHaveAttribute("href", "/code-playground/CS85/mod-4/show_inventory.php");
  });

  it("scores the Module 4 database quiz with the embedded answer key", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod4 />);

    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 4 - Database",
      })
    );

    await answerQuestion(
      user,
      "What does PDO stand for in PHP?",
      "PHP Data Objects"
    );
    await answerQuestion(
      user,
      "Which SQL command retrieves data from a table?",
      "SELECT"
    );
    await answerQuestion(
      user,
      "Which SQL command is used to add new data?",
      "INSERT"
    );
    await answerQuestion(
      user,
      "Which clause is critical for targeting specific rows in SELECT or UPDATE?",
      "WHERE"
    );
    await answerQuestion(
      user,
      "In a SQL query what does the % symbol do when used with LIKE?",
      "It matches any number of characters"
    );
    await answerQuestion(
      user,
      "Which of the following statements about primary keys is true?",
      "They uniquely identify each row"
    );
    await answerQuestion(
      user,
      "What type of key connects records in related tables?",
      "Foreign Key"
    );
    await answerQuestion(
      user,
      "Which SQL data type is best for storing prices?",
      "DECIMAL"
    );
    await answerQuestion(
      user,
      "Which PDO fetch mode returns data as an associative array?",
      "PDO::FETCH_ASSOC"
    );
    await answerQuestion(
      user,
      "Which of the following best prevents SQL injection in PDO?",
      "Prepared statements with parameter binding"
    );
    await answerQuestion(
      user,
      "In PDO what does the execute() function do?",
      "Runs the prepared statement"
    );
    await answerQuestion(
      user,
      "Which of these is considered a security best practice?",
      "Using environment variables for credentials"
    );
    await answerQuestion(
      user,
      "Which constraint prevents null entries in a column?",
      "NOT NULL"
    );
    await answerQuestion(
      user,
      "What SQL operation is used to change existing data?",
      "UPDATE"
    );
    await answerQuestion(
      user,
      "What does fetchAll() return?",
      "Array of records"
    );
    await answerQuestion(
      user,
      "What PHP function securely hashes a password?",
      "password_hash()"
    );
    await answerQuestion(
      user,
      "In MySQL what is the purpose of AUTO_INCREMENT?",
      "Automatically assigns unique IDs"
    );
    await answerQuestion(
      user,
      "Which type of database model does MySQL use?",
      "Relational"
    );
    await answerQuestion(
      user,
      "Which SQL clause limits the number of returned records?",
      "LIMIT"
    );
    await answerQuestion(
      user,
      "What is the best data type for a true/false column in MySQL?",
      "BOOLEAN"
    );
    await answerQuestion(
      user,
      "What does the LIKE operator allow you to do in SQL?",
      "Perform pattern matching"
    );

    await user.click(screen.getByRole("button", { name: "Submit Quiz" }));

    expect(
      screen.getByText("Score for this attempt: 21 out of 21")
    ).toBeInTheDocument();
  });
});
