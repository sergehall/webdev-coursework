import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question:
      "What is the default extension that most Web servers use to process PHP scripts?",
    options: [".asp", ".html", ".js", ".php"],
  },
  {
    id: 2,
    question:
      "What do you use to separate multiple arguments that are passed to a function?",
    options: ["forward slash /", "comma ,", "period .", "back slash \\"],
  },
  {
    id: 3,
    question:
      "Line comments can be added in PHP by adding ________ at the front of the comment line.",
    options: [
      "// forward slash forward slash",
      "|| pipe pipe",
      ".. period period",
      "\\\\ back slash back slash",
    ],
  },
  {
    id: 4,
    question: "Which of the below options is a valid variable name?",
    options: [
      "$myNewVariable",
      "$1LoveVariables",
      "1LastTry",
      "allTheseVaraibles",
    ],
  },
  {
    id: 5,
    question:
      "Which of the following has the correct syntax to declare variable and assign a value?",
    options: ["$myNum = 1;", "$myNum = 1", "myNum = 1;", "$myNum == 1;"],
  },
  {
    id: 6,
    question:
      "PHP requires instructions to be terminated with a ____________ .",
    options: [
      "# pound sign",
      "// forward slash forward slash",
      ": colon",
      "; semicolon",
    ],
  },
  {
    id: 7,
    question: "Which of the following is a Boolean value? (Select 2)",
    options: ["YES", "FALSE", "TRUE", "OR"],
    multiple: true,
  },
  {
    id: 8,
    question:
      "Which of the following refers to the first element in an indexed array named $aArray[]?",
    options: ["$aArray[]", "$aArray[0]", "$aArray[First]", "$aArray[1]"],
  },
  {
    id: 9,
    question: "What is the value of the expression 3 * 2 + 7?",
    options: ["11", "27", "13", "23"],
  },
  {
    id: 10,
    question: "The logical And (&&) operator returns TRUE if ...",
    options: [
      "the right operand is TRUE",
      "the left operand is TRUE",
      "the right operand is FALSE and the left operand is TRUE",
      "the right operand is TRUE and the left operand is TRUE",
    ],
  },
];

export const quizAnswers: CorrectAnswerDto[] = [
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 1, correctAnswer: [3] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 2, correctAnswer: [1] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 3, correctAnswer: [0] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 4, correctAnswer: [0] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 5, correctAnswer: [0] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 6, correctAnswer: [3] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 7, correctAnswer: [1, 2] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 8, correctAnswer: [1] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 9, correctAnswer: [2] },
  { quizId: "CS85Module1IntroToPhpQuiz", questionId: 10, correctAnswer: [3] },
];
