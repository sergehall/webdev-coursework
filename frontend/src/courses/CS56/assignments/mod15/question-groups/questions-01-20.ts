import { trueFalse } from "./trueFalse";

import type { AssessmentQuestion } from "@/features/assessment";

export const finalExamQuestions01To20 = [
  {
    id: 1,
    kind: "multiple",
    points: 2,
    prompt:
      "The Iterable interface of the Iterator design pattern has which of the following methods?",
    instruction: "Check all that apply.",
    options: ["next()", "iterator()", "hasNext()"],
    answer: [1],
  },
  {
    id: 2,
    kind: "single",
    points: 2,
    prompt: "The elements in a HashSet are ordered.",
    options: trueFalse,
    answer: [1],
  },
  {
    id: 3,
    kind: "single",
    points: 2,
    prompt: "Which data structure is used to map keys to values?",
    options: ["ArrayList", "LinkedList", "HashSet", "HashMap"],
    answer: [3],
  },
  {
    id: 4,
    kind: "single",
    points: 2,
    prompt: "The Set is an __________.",
    options: ["struct", "class", "interface", "package"],
    answer: [2],
  },
  {
    id: 5,
    kind: "single",
    points: 2,
    prompt: "The synchronized keyword can be used on methods.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 6,
    kind: "single",
    points: 2,
    prompt: "What is a thread?",
    options: [
      "A thread is a data structure.",
      "A thread is a lightweight process.",
      "A thread is a heavyweight process.",
    ],
    answer: [1],
  },
  {
    id: 7,
    kind: "single",
    points: 1,
    prompt:
      "Which method is used to halt execution of a thread in order to wait for another thread?",
    options: ["stop", "notify", "wait", "sleep"],
    answer: [2],
  },
  {
    id: 8,
    kind: "single",
    points: 2,
    prompt: "Which method is used to wake up another thread?",
    options: ["wakeup", "wait", "notify", "awake"],
    answer: [2],
  },
  {
    id: 9,
    kind: "single",
    points: 2,
    prompt: "Which method is used to add an item to a HashSet?",
    options: ["add", "push", "put", "append"],
    answer: [0],
  },
  {
    id: 10,
    kind: "single",
    points: 2,
    prompt: "Which method is used to add an item to a ArrayList?",
    options: ["append", "put", "push", "add"],
    answer: [3],
  },
  {
    id: 11,
    kind: "single",
    points: 2,
    prompt: "Which method is used to check if a key exists in a HashMap?",
    options: ["exists", "containsKey", "contains", "existsKey"],
    answer: [1],
  },
  {
    id: 12,
    kind: "single",
    points: 2,
    prompt: "What is the appropriate way of comparing two objects?",
    options: [
      "Using the equals method",
      "Using the = operator",
      "Using the isEqualTo method",
      "Using the == operator",
    ],
    answer: [0],
  },
  {
    id: 13,
    kind: "single",
    points: 2,
    prompt:
      "Which of the following classes represents the window for a JavaFX graphical user interface?",
    options: ["Window", "Stage", "Node", "Scene"],
    answer: [1],
  },
  {
    id: 14,
    kind: "single",
    points: 1,
    prompt:
      "An .fxml file defines the scene of JavaFX elements using an XML format.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 15,
    kind: "single",
    points: 2,
    prompt: "The VBox class is used to layout elements vertically.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 16,
    kind: "completion",
    points: 1,
    prompt:
      "What arguments does the Socket constructor expect for the two blanks?",
    instruction: "Select the appropriate argument for each blank.",
    lines: [
      [
        { text: "Socket socket = new Socket(" },
        {
          blank: {
            id: "socket-host",
            options: [
              "The buffered reader to read from.",
              "The host address to connect to.",
              "The port number.",
              "The buffered writer to write to.",
            ],
            answer: "The host address to connect to.",
          },
        },
        { text: ", " },
        {
          blank: {
            id: "socket-port",
            options: [
              "The buffered reader to read from.",
              "The host address to connect to.",
              "The port number.",
              "The buffered writer to write to.",
            ],
            answer: "The port number.",
          },
        },
        { text: ");" },
      ],
    ],
  },
  {
    id: 17,
    kind: "single",
    points: 2,
    prompt: "Which method is used to make a JavaFX stage visible?",
    options: ["show", "view", "makeVisible", "display"],
    answer: [0],
  },
  {
    id: 18,
    kind: "completion",
    points: 6,
    prompt:
      'Fill in the blanks so that the button has a text "Start" that calls the onStartClicked() method when clicked.',
    instruction: "Select the correct FXML attribute or handler for each blank.",
    lines: [
      [
        { text: "<Button " },
        {
          blank: {
            id: "button-text-attribute",
            options: ["value", "click", "id", "text"],
            answer: "text",
          },
        },
        { text: '="Start" ' },
        {
          blank: {
            id: "button-action-attribute",
            options: ["onAction", "onClick", "onEventHandler", "text"],
            answer: "onAction",
          },
        },
        { text: '="#' },
        {
          blank: {
            id: "button-action-handler",
            options: ['"Start"', "clicked", "onStartClicked"],
            answer: "onStartClicked",
          },
        },
        { text: '"/>' },
      ],
    ],
  },
  {
    id: 19,
    kind: "completion",
    points: 5,
    prompt:
      "Assume the method convertToInt(...) throws a NumberFormatException. Complete the code below.",
    instruction: "Select the correct Java term for each blank.",
    lines: [
      [{ text: "public static void main(String... args) {" }],
      [
        { text: "    " },
        {
          blank: {
            id: "try-keyword",
            options: ["throw", "try", "attempt"],
            answer: "try",
          },
        },
        { text: " (Scanner scanner = new Scanner()) {" },
      ],
      [{ text: "        String value = scanner.nextLine();" }],
      [{ text: "        int number = convertToInt(value);" }],
      [
        { text: "    } catch (" },
        {
          blank: {
            id: "exception-type",
            options: ["NumberFormatException", "String", "catch"],
            answer: "NumberFormatException",
          },
        },
        { text: " ex) {" },
      ],
      [{ text: "        ex.printStackTrace();" }],
      [{ text: "    }" }],
      [{ text: "}" }],
      [],
      [
        { text: "int convertToInt(String value) " },
        {
          blank: {
            id: "throws-keyword",
            options: ["throw new", "throws", "throw"],
            answer: "throws",
          },
        },
        { text: " NumberFormatException {" },
      ],
      [{ text: "    // assume code exists" }],
      [{ text: "}" }],
    ],
  },
  {
    id: 20,
    kind: "multiple",
    points: 2,
    prompt: "Which categories for design patterns exist?",
    instruction: "Check all that apply.",
    options: [
      "Behavioral Design Patterns",
      "Relational Design Patterns",
      "Structural Design Patterns",
      "Creational Design Patterns",
      "Functional Design Patterns",
    ],
    answer: [0, 2, 3],
  },
] satisfies readonly AssessmentQuestion[];
