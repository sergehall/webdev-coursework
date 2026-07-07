import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

const moduleFiveQuizId = "CS85Module5OOPQuiz";

export const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question: "What is a class in Object-Oriented Programming?",
    options: [
      "A collection of related files",
      "A blueprint for creating objects",
      "An algorithm used for calculations",
      "A function that stores variables",
    ],
  },
  {
    id: 2,
    question: "Which keyword is used to define a class in PHP?",
    options: ["function", "class", "new", "define"],
  },
  {
    id: 3,
    question: "What does the new keyword do in PHP OOP?",
    options: [
      "Defines a property",
      "Creates a new object from a class",
      "Imports a module",
      "Declares a new function",
    ],
  },
  {
    id: 4,
    question: "True or False: An object is a specific instance of a class.",
    options: ["True", "False"],
  },
  {
    id: 5,
    question:
      "Which of the following symbols is used to access properties and methods of an object?",
    options: ["::", "=>", "->", "."],
  },
  {
    id: 6,
    question: "What are object properties in OOP?",
    options: [
      "Functions within an object",
      "Private members of a class",
      "Attributes inherited from a parent class",
      "Variables that belong to a class",
    ],
  },
  {
    id: 7,
    question: "What does the this keyword refer to?",
    options: [
      "The file name",
      "The parent class",
      "The current object",
      "A global variable",
    ],
  },
  {
    id: 8,
    question: "What is the purpose of a constructor in a class?",
    options: [
      "To initialize object properties when created",
      "To define global functions",
      "To create static properties",
      "To validate form inputs",
    ],
  },
  {
    id: 9,
    question: "What visibility keyword allows property access from anywhere?",
    options: ["protected", "private", "public", "static"],
  },
  {
    id: 10,
    question: "In the statement book title equals PHP Basics, what is title?",
    options: [
      "Class name",
      "Method name",
      "Constant",
      "Property of the object",
    ],
  },
  {
    id: 11,
    question: "How do you define a method inside a class?",
    options: [
      "Declare with define",
      "Use the function keyword inside the class",
      "Write it after the constructor",
      "Assign using this",
    ],
  },
  {
    id: 12,
    question: "Which method runs automatically when an object is created?",
    options: ["__construct()", "__get()", "__set()", "__toString()"],
  },
  {
    id: 13,
    question:
      "True or False: Each object created from a class shares the same property values.",
    options: ["True", "False"],
  },
  {
    id: 14,
    question: "Which of these is NOT a characteristic of good OOP design?",
    options: ["Encapsulation", "Tight Coupling", "Reusability", "Modularity"],
  },
  {
    id: 15,
    question: "What is an example of using a method in OOP?",
    options: [
      "User.getName()",
      "getName($user)",
      "$user->getName()",
      "get(User->name)",
    ],
  },
];

export const quizAnswers: CorrectAnswerDto[] = [
  { quizId: moduleFiveQuizId, questionId: 1, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 2, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 3, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 4, correctAnswer: [0] },
  { quizId: moduleFiveQuizId, questionId: 5, correctAnswer: [2] },
  { quizId: moduleFiveQuizId, questionId: 6, correctAnswer: [3] },
  { quizId: moduleFiveQuizId, questionId: 7, correctAnswer: [2] },
  { quizId: moduleFiveQuizId, questionId: 8, correctAnswer: [0] },
  { quizId: moduleFiveQuizId, questionId: 9, correctAnswer: [2] },
  { quizId: moduleFiveQuizId, questionId: 10, correctAnswer: [3] },
  { quizId: moduleFiveQuizId, questionId: 11, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 12, correctAnswer: [0] },
  { quizId: moduleFiveQuizId, questionId: 13, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 14, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 15, correctAnswer: [2] },
];
