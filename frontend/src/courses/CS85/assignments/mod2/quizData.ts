import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question:
      "Which of the following is the correct syntax for an if statement?",
    options: [
      "if ($aVariable == 1);",
      "if ($aVariable == 1)()",
      "if $aVariable == 1",
      "if ($aVariable == 1)",
    ],
  },
  {
    id: 2,
    question:
      "An if statement can execute multiple lines of PHP code if they are",
    options: [
      "are excluded from the PHP code",
      "are within a command { ... } block",
      "are within a code segment /* ... */",
      "are within an always false if statement",
    ],
  },
  {
    id: 3,
    question: "Which is the correct PHP syntax for else:",
    options: [
      'else { echo "the else statement"; }',
      'else ; { echo "the else statement"; }',
      'else - echo "the else statement"',
      'else \\/ { echo "the else statement"; }',
    ],
  },
  {
    id: 4,
    question: "Each time a loop run through the code, it's called a",
    options: ["looping", "iteration", "recurrence", "deduplication"],
  },
  {
    id: 5,
    question: "Which while loop syntax is correct?",
    options: [
      "while ($i < 100) { }",
      "while $i < 100 { }",
      "while $i < 100 ...",
      "while ($i < 100; i++) { }",
    ],
  },
  {
    id: 6,
    question: "The for statement can initialize a counter.",
    options: ["True", "False"],
  },
  {
    id: 7,
    question: "The do ... while statement will always execute at least once.",
    options: ["True", "False"],
  },
  {
    id: 8,
    question:
      "The while statement will execute a series of statements as long as a given conditional expression evaluates to FALSE.",
    options: ["True", "False"],
  },
  {
    id: 9,
    question:
      "A if . . . else statement allows a program to make decisions about what statements to execute.",
    options: ["True", "False"],
  },
  {
    id: 10,
    question:
      "The if/else statement will contain at least one condition statement to make the decision to run one block of code and skip over another block of code.",
    options: ["True", "False"],
  },
];

export const quizAnswers: CorrectAnswerDto[] = [
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 1,
    correctAnswer: [3],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 2,
    correctAnswer: [1],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 3,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 4,
    correctAnswer: [1],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 5,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 6,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 7,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 8,
    correctAnswer: [1],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 9,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 10,
    correctAnswer: [0],
  },
];
