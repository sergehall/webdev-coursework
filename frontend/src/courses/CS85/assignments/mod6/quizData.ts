import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

const moduleSixQuizId = "CS85Module6AutoloadMVCQuiz";

export const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question:
      "What is the main benefit of using Composer's autoloading system?",
    options: [
      "Harder deployment",
      "Slower performance",
      "Automatic Array loading",
      "Easier deployment",
    ],
  },
  {
    id: 2,
    question: "Which file does Composer use to store autoloading rules?",
    options: ["autoload.config", "vendor.php", "composer.json", "index.php"],
  },
  {
    id: 3,
    question: "What does PSR-4 mapping define?",
    options: [
      "Composer commands",
      "Namespace to directory map",
      "Filename structure",
      "File extensions",
    ],
  },
  {
    id: 4,
    question: "In MVC, what does the Model represent?",
    options: ["View scripts", "Data and logic", "User interface", "Web layout"],
  },
  {
    id: 5,
    question: "Which keyword is used to import a namespace class?",
    options: ["use", "include", "import", "load"],
  },
  {
    id: 6,
    question: "Why is require_once not scalable?",
    options: [
      "It autoloads files",
      "It is outdated",
      "It uses too much memory",
      "It requires manual updates",
    ],
  },
  {
    id: 7,
    question: "What is the role of a Controller in MVC?",
    options: [
      "Database access",
      "Data storage",
      "HTML output",
      "Request handling",
    ],
  },
  {
    id: 8,
    question: "What is a namespace used for in PHP?",
    options: [
      "Storing arrays",
      "Organizing code",
      "Avoiding name conflicts",
      "Looping data",
    ],
  },
  {
    id: 9,
    question: "Which of these tools is required to enable autoloading?",
    options: ["Laravel", "Composer", "PHPMyAdmin", "Apache"],
  },
  {
    id: 10,
    question: "When should you run composer dump-autoload?",
    options: [
      "After file renaming",
      "After installing a database",
      "After updating namespaces",
      "After creating CSS files",
    ],
  },
  {
    id: 11,
    question: "What type of logic should a View contain?",
    options: ["Database", "Presentation", "Validation", "Session management"],
  },
  {
    id: 12,
    question: "What directory typically holds MVC View files?",
    options: ["controllers", "models", "src/public", "views"],
  },
  {
    id: 13,
    question: "What causes merge conflicts in manual include projects?",
    options: [
      "MySQL issues",
      "Missing includes",
      "Use of MVC",
      "Different PHP versions",
    ],
  },
  {
    id: 14,
    question: "What happens if autoload mapping is incorrect?",
    options: [
      "HTML fails",
      "Database crashes",
      "Classes fail to load",
      "Composer runs slowly",
    ],
  },
  {
    id: 15,
    question: "What is a common aliasing technique in namespaces?",
    options: ["use X as Y", "use import X", "use B from A", "use A as B"],
  },
];

export const quizAnswers: CorrectAnswerDto[] = [
  { quizId: moduleSixQuizId, questionId: 1, correctAnswer: [3] },
  { quizId: moduleSixQuizId, questionId: 2, correctAnswer: [2] },
  { quizId: moduleSixQuizId, questionId: 3, correctAnswer: [1] },
  { quizId: moduleSixQuizId, questionId: 4, correctAnswer: [1] },
  { quizId: moduleSixQuizId, questionId: 5, correctAnswer: [0] },
  { quizId: moduleSixQuizId, questionId: 6, correctAnswer: [3] },
  { quizId: moduleSixQuizId, questionId: 7, correctAnswer: [3] },
  { quizId: moduleSixQuizId, questionId: 8, correctAnswer: [2] },
  { quizId: moduleSixQuizId, questionId: 9, correctAnswer: [1] },
  { quizId: moduleSixQuizId, questionId: 10, correctAnswer: [2] },
  { quizId: moduleSixQuizId, questionId: 11, correctAnswer: [1] },
  { quizId: moduleSixQuizId, questionId: 12, correctAnswer: [3] },
  { quizId: moduleSixQuizId, questionId: 13, correctAnswer: [1] },
  { quizId: moduleSixQuizId, questionId: 14, correctAnswer: [2] },
  { quizId: moduleSixQuizId, questionId: 15, correctAnswer: [0] },
];
