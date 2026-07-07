import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

const moduleThreeQuizId = "CS85Module3HandlingWebRequestsQuiz";

export const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question: "What does PDO stand for in PHP?",
    options: [
      "PHP Data Objects",
      "Programming Database Objects",
      "Public Data Operator",
      "PHP Data Operations",
    ],
  },
  {
    id: 2,
    question: "What SQL command is used to retrieve data from a table?",
    options: ["DELETE", "SELECT", "INSERT", "UPDATE"],
  },
  {
    id: 3,
    question: "Which clause in an SQL SELECT statement filters rows?",
    options: ["GROUP BY", "HAVING", "WHERE", "ORDER BY"],
  },
  {
    id: 4,
    question:
      "Which of these is a prepared statement vulnerability mitigation technique?",
    options: [
      "Using placeholders and binding parameters",
      "Disabling error reporting",
      "Enabling debug mode",
      "Concatenating strings",
    ],
  },
  {
    id: 5,
    question: "Which SQL keyword is used to insert new data into a table?",
    options: ["SELECT", "INSERT", "APPEND", "UPDATE"],
  },
  {
    id: 6,
    question: "Which of the following ensures each row in a table is unique?",
    options: ["PRIMARY KEY", "DEFAULT constraint", "FOREIGN KEY", "NOT NULL"],
  },
  {
    id: 7,
    question: "Which statement prevents SQL injection in PHP using PDO?",
    options: [
      "$stmt->inject($input)",
      "$stmt->execute([$userInput])",
      "$pdo->query(...)",
      "$pdo->unsafeInsert(...)",
    ],
  },
  {
    id: 8,
    question: "Which function returns a single row from a PDO statement?",
    options: ["fetchAll()", "query()", "fetch()", "execute()"],
  },
  {
    id: 9,
    question: "Which SQL type stores large text like blog posts?",
    options: ["VARCHAR", "TEXT", "CHAR", "TINYTEXT"],
  },
  {
    id: 10,
    question: "Which data type is best for monetary values?",
    options: ["INT", "FLOAT", "TEXT", "DECIMAL"],
  },
  {
    id: 11,
    question: "Which SQL statement is used to remove records?",
    options: ["SELECT", "DELETE", "INSERT", "UPDATE"],
  },
  {
    id: 12,
    question: "Which type of database key helps link tables?",
    options: ["Primary Key", "Foreign Key", "Join Key", "Auto Increment"],
  },
  {
    id: 13,
    question: "Which SQL constraint prevents duplicate values?",
    options: ["CHECK", "INDEX", "UNIQUE", "NOT NULL"],
  },
  {
    id: 14,
    question: "What does the NOW() function return in SQL?",
    options: [
      "Session token",
      "Database ID",
      "Current date and time",
      "User's login time",
    ],
  },
  {
    id: 15,
    question:
      'What would cause a "Column count doesn\'t match value count" error?',
    options: [
      "Mismatch between columns and VALUES in INSERT",
      "Wrong primary key type",
      "Invalid SELECT clause",
      "Too many WHERE conditions",
    ],
  },
  {
    id: 16,
    question: "Which PHP function should be avoided due to SQL injection risk?",
    options: [
      "mysqli_query() with direct input",
      "htmlspecialchars()",
      "$_POST['email']",
      "password_hash()",
    ],
  },
  {
    id: 17,
    question: "Which of the following is TRUE about PDO prepared statements?",
    options: [
      "They use old MySQL APIs",
      "They execute SQL inline",
      "They separate logic and data",
      "They allow client-side authentication",
    ],
  },
  {
    id: 18,
    question: "What happens if you omit WHERE in an UPDATE statement?",
    options: [
      "Nothing is updated",
      "All rows are updated",
      "It creates new rows",
      "The SQL is invalid",
    ],
  },
  {
    id: 19,
    question: "Which statements describe the purpose of the C in CRUD?",
    options: [
      "Update existing records",
      "Compile data",
      "Create new records",
      "Destroy database schema",
      "Read existing records",
    ],
  },
];

export const quizAnswers: CorrectAnswerDto[] = [
  { quizId: moduleThreeQuizId, questionId: 1, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 2, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 3, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 4, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 5, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 6, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 7, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 8, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 9, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 10, correctAnswer: [3] },
  { quizId: moduleThreeQuizId, questionId: 11, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 12, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 13, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 14, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 15, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 16, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 17, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 18, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 19, correctAnswer: [2] },
];
