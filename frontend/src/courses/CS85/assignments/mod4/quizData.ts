import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

const moduleFourQuizId = "CS85Module4DatabaseQuiz";

export const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question: "What does PDO stand for in PHP?",
    options: [
      "PHP Data Operations",
      "Public Data Operator",
      "PHP Data Objects",
      "Programming Database Objects",
    ],
  },
  {
    id: 2,
    question: "Which SQL command retrieves data from a table?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
  },
  {
    id: 3,
    question: "Which SQL command is used to add new data?",
    options: ["SELECT", "ALTER", "INSERT", "DELETE"],
  },
  {
    id: 4,
    question:
      "Which clause is critical for targeting specific rows in SELECT or UPDATE?",
    options: ["HAVING", "GROUP BY", "WHERE", "ORDER BY"],
  },
  {
    id: 5,
    question: "In a SQL query what does the % symbol do when used with LIKE?",
    options: [
      "It ignores nulls",
      "It matches any number of characters",
      "It matches numeric types",
      "It validates email input",
    ],
  },
  {
    id: 6,
    question: "Which of the following statements about primary keys is true?",
    options: [
      "They uniquely identify each row",
      "They accept duplicate values",
      "They allow null values",
      "They store user passwords",
    ],
  },
  {
    id: 7,
    question: "What type of key connects records in related tables?",
    options: ["Composite Key", "Soft Key", "Foreign Key", "Primary Key"],
  },
  {
    id: 8,
    question: "Which SQL data type is best for storing prices?",
    options: ["TEXT", "FLOAT", "DECIMAL", "INT"],
  },
  {
    id: 9,
    question: "Which PDO fetch mode returns data as an associative array?",
    options: [
      "PDO::FETCH_NUM",
      "PDO::FETCH_OBJ",
      "PDO::FETCH_CLASS",
      "PDO::FETCH_ASSOC",
    ],
  },
  {
    id: 10,
    question: "Which of the following best prevents SQL injection in PDO?",
    options: [
      "Prepared statements with parameter binding",
      "HTML escaping",
      "Concatenated SQL queries",
      "Input trimming",
    ],
  },
  {
    id: 11,
    question: "In PDO what does the execute() function do?",
    options: [
      "Runs the prepared statement",
      "Checks query syntax",
      "Starts the database server",
      "Declares variables",
    ],
  },
  {
    id: 12,
    question: "Which of these is considered a security best practice?",
    options: [
      "Hardcoding admin credentials",
      "Writing SQL in JavaScript",
      "Disabling error logs",
      "Using environment variables for credentials",
    ],
  },
  {
    id: 13,
    question: "Which constraint prevents null entries in a column?",
    options: ["CHECK", "NOT NULL", "DEFAULT", "UNIQUE"],
  },
  {
    id: 14,
    question: "What SQL operation is used to change existing data?",
    options: ["UPDATE", "SELECT", "INSERT", "DELETE"],
  },
  {
    id: 15,
    question: "What does fetchAll() return?",
    options: ["String of JSON", "Array of records", "Single record", "Boolean"],
  },
  {
    id: 16,
    question: "What PHP function securely hashes a password?",
    options: ["encrypt()", "md5()", "password_hash()", "sha1()"],
  },
  {
    id: 17,
    question: "In MySQL what is the purpose of AUTO_INCREMENT?",
    options: [
      "Inserts timestamps",
      "Updates all rows",
      "Prepares the query",
      "Automatically assigns unique IDs",
    ],
  },
  {
    id: 18,
    question: "Which type of database model does MySQL use?",
    options: ["Flat file", "Object-oriented", "Relational", "Hierarchical"],
  },
  {
    id: 19,
    question: "Which SQL clause limits the number of returned records?",
    options: ["ORDER BY", "HAVING", "LIMIT", "JOIN"],
  },
  {
    id: 20,
    question: "What is the best data type for a true/false column in MySQL?",
    options: ["DATE", "DECIMAL", "CHAR", "BOOLEAN"],
  },
  {
    id: 21,
    question: "What does the LIKE operator allow you to do in SQL?",
    options: [
      "Delete null records",
      "Sort alphabetically",
      "Perform pattern matching",
      "Filter numeric values",
    ],
  },
];

export const quizAnswers: CorrectAnswerDto[] = [
  { quizId: moduleFourQuizId, questionId: 1, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 2, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 3, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 4, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 5, correctAnswer: [1] },
  { quizId: moduleFourQuizId, questionId: 6, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 7, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 8, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 9, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 10, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 11, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 12, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 13, correctAnswer: [1] },
  { quizId: moduleFourQuizId, questionId: 14, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 15, correctAnswer: [1] },
  { quizId: moduleFourQuizId, questionId: 16, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 17, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 18, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 19, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 20, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 21, correctAnswer: [2] },
];
