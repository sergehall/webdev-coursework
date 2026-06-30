import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod3 from "./AssignmentMod3";

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

describe("<AssignmentMod3 />", () => {
  it("renders the Module 3 Canvas shell collapsed by default", () => {
    render(<AssignmentMod3 />);

    expect(
      screen.getByRole("heading", {
        name: "Module 3 - Handling Web Requests",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "ReadMe Module 3: Handling Web Requests",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Required Reading" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 3 Assignment 3A: Review and Comment on Form",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Module 3 Assignment 3B: Secure Product Contact Form",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Quiz: Module 3 - Handling Web Requests",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete module 3" })
    ).toBeInTheDocument();

    expect(
      screen.queryByText("module3_handlingWeb.pdf")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("19 pts")).not.toBeInTheDocument();
  });

  it("expands the Module 3 reading, assignment shells, and quiz shell independently", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod3 />);

    await user.click(screen.getByRole("button", { name: "Required Reading" }));
    await user.click(
      screen.getByRole("button", {
        name: "Module 3 Assignment 3A: Review and Comment on Form",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Module 3 Assignment 3B: Secure Product Contact Form",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 3 - Handling Web Requests",
      })
    );

    expect(screen.getByText("module3_handlingWeb.pdf")).toBeInTheDocument();
    expect(
      screen.getAllByText("Module 3 Assignment 3A: Review and Comment on Form")
    ).toHaveLength(2);
    expect(
      screen.getAllByText("Module 3 Assignment 3B: Secure Product Contact Form")
    ).toHaveLength(2);
    expect(screen.getByText("Assignment Overview")).toBeInTheDocument();
    expect(
      screen.getByText(/fully functional "Contact Me" PHP script/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Set Up Your File and Environment")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Reflection at the End of the File")
    ).toBeInTheDocument();
    expect(screen.getAllByText("GitHub and Canvas Submission")).toHaveLength(2);
    expect(screen.getByText("Learning Objectives")).toBeInTheDocument();
    expect(screen.getByText("Example Output")).toBeInTheDocument();
    expect(screen.getByText("Tutorial Summary")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Mini-Tutorial: Exploring Superglobals with a Survey Example"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Assignment Instructions")).toBeInTheDocument();
    expect(screen.getByText("PHP Requirements")).toBeInTheDocument();
    expect(
      screen.getByText("Required Comments and Reflection")
    ).toBeInTheDocument();
    expect(screen.getByText(/Thank you, Jordan!/)).toBeInTheDocument();
    expect(screen.getByText(/cs85-module3b-createform/)).toBeInTheDocument();
    expect(
      screen.getAllByText("Quiz: Module 3 - Handling Web Requests")
    ).toHaveLength(2);
    expect(screen.getByText("Started: Jun 29 at 6:37pm")).toBeInTheDocument();
    expect(screen.getByText("PDO, SQL, and CRUD review")).toBeInTheDocument();
    expect(
      screen.getByText("What does PDO stand for in PHP?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This quiz block is available directly in the module/)
    ).toBeInTheDocument();
    expect(screen.getAllByText("20 pts")).toHaveLength(2);
    expect(screen.getByText("19 pts")).toBeInTheDocument();
  });

  it("opens the Module 3 Assignment 3A PDF and PHP file preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod3 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 3 Assignment 3A: Review and Comment on Form",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "View Module 3 Assignment 3A files",
      })
    );

    expect(screen.getByTitle("Module3_Assignment_3A.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Module3_Assignment_3A.pdf" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-3/Module3_Assignment_3A.pdf"
    );
    expect(
      screen.getByRole("link", { name: "Download ContactForm.php" })
    ).toHaveAttribute("href", "/code-playground/CS85/mod-3/ContactForm.php");
  });

  it("opens the Module 3 Assignment 3B PDF and PHP file preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod3 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 3 Assignment 3B: Secure Product Contact Form",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "View Module 3 Assignment 3B files",
      })
    );

    expect(screen.getByTitle("Module3_Assignment_3B.pdf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Module3_Assignment_3B.pdf" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-3/Module3_Assignment_3B.pdf"
    );
    expect(
      screen.getByRole("link", {
        name: "Download SecureProductContactForm.php",
      })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-3/SecureProductContactForm.php"
    );
  });

  it("scores the Module 3 handling web requests quiz with the embedded answer key", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod3 />);

    await user.click(
      screen.getByRole("button", {
        name: "Quiz: Module 3 - Handling Web Requests",
      })
    );

    await answerQuestion(
      user,
      "What does PDO stand for in PHP?",
      "PHP Data Objects"
    );
    await answerQuestion(
      user,
      "What SQL command is used to retrieve data from a table?",
      "SELECT"
    );
    await answerQuestion(
      user,
      "Which clause in an SQL SELECT statement filters rows?",
      "WHERE"
    );
    await answerQuestion(
      user,
      "Which of these is a prepared statement vulnerability mitigation technique?",
      "Using placeholders and binding parameters"
    );
    await answerQuestion(
      user,
      "Which SQL keyword is used to insert new data into a table?",
      "INSERT"
    );
    await answerQuestion(
      user,
      "Which of the following ensures each row in a table is unique?",
      "PRIMARY KEY"
    );
    await answerQuestion(
      user,
      "Which statement prevents SQL injection in PHP using PDO?",
      "$stmt->execute([$userInput])"
    );
    await answerQuestion(
      user,
      "Which function returns a single row from a PDO statement?",
      "fetch()"
    );
    await answerQuestion(
      user,
      "Which SQL type stores large text like blog posts?",
      "TEXT"
    );
    await answerQuestion(
      user,
      "Which data type is best for monetary values?",
      "DECIMAL"
    );
    await answerQuestion(
      user,
      "Which SQL statement is used to remove records?",
      "DELETE"
    );
    await answerQuestion(
      user,
      "Which type of database key helps link tables?",
      "Foreign Key"
    );
    await answerQuestion(
      user,
      "Which SQL constraint prevents duplicate values?",
      "UNIQUE"
    );
    await answerQuestion(
      user,
      "What does the NOW() function return in SQL?",
      "Current date and time"
    );
    await answerQuestion(
      user,
      'What would cause a "Column count doesn\'t match value count" error?',
      "Mismatch between columns and VALUES in INSERT"
    );
    await answerQuestion(
      user,
      "Which PHP function should be avoided due to SQL injection risk?",
      "mysqli_query() with direct input"
    );
    await answerQuestion(
      user,
      "Which of the following is TRUE about PDO prepared statements?",
      "They separate logic and data"
    );
    await answerQuestion(
      user,
      "What happens if you omit WHERE in an UPDATE statement?",
      "All rows are updated"
    );
    await answerQuestion(
      user,
      "Which statements describe the purpose of the C in CRUD?",
      "Create new records"
    );

    await user.click(screen.getByRole("button", { name: "Submit Quiz" }));

    expect(
      screen.getByText("Score for this attempt: 19 out of 19")
    ).toBeInTheDocument();
  });
});
