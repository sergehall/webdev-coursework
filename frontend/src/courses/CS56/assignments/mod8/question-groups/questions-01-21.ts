import type { AssessmentQuestion } from "@/features/assessment";

const trueFalse = ["True", "False"];

export const midtermQuestions01To21: readonly AssessmentQuestion[] = [
  {
    id: 1,
    kind: "single",
    points: 2,
    prompt: "The finally block in a try-catch block is optional.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 2,
    kind: "single",
    points: 2,
    prompt: "The finally keyword is executed _____________.",
    options: [
      "never.",
      "only if an exception is thrown.",
      "only if no exception is thrown.",
      "regardless of whether or not an exception is thrown.",
    ],
    answer: [3],
  },
  {
    id: 3,
    kind: "single",
    points: 2,
    prompt:
      "A game character can equip different weapons and swap them at runtime. Which mechanism best models the character/weapon relationship?",
    options: ["Polymorphism", "Dynamic binding", "Composition", "Inheritance"],
    answer: [2],
  },
  {
    id: 4,
    kind: "multiple",
    points: 2,
    prompt: "Which categories of design patterns exist?",
    instruction: "Select all that apply.",
    options: [
      "Structural",
      "Relational",
      "Functional",
      "Behavioral",
      "Creational",
    ],
    answer: [0, 3, 4],
  },
  {
    id: 5,
    kind: "text",
    points: 2,
    prompt:
      'Type the keyword used when one interface "inherits" from another interface.',
    instruction: "Enter one Java keyword.",
    answers: ["extends"],
  },
  {
    id: 6,
    kind: "single",
    points: 2,
    prompt:
      "There is no difference between an abstract class with only abstract methods and an interface.",
    options: trueFalse,
    answer: [1],
  },
  {
    id: 7,
    kind: "multiple",
    points: 2,
    prompt: "The Iterator interface has which methods?",
    instruction: "Select all that apply.",
    options: [
      "next()",
      "createIterator()",
      "iterate()",
      "iterator()",
      "hasNext()",
    ],
    answer: [0, 4],
  },
  {
    id: 8,
    kind: "multiple",
    points: 4,
    prompt: "Analyze the Device/Phone interfaces. Which statements are true?",
    instruction: "Select all that apply.",
    code: "interface Device {\n    void turnOn();\n}\n\ninterface Phone extends Device {\n    void call(String number);\n}",
    options: [
      "Phone inherits turnOn() from Device.",
      "A concrete Phone implementation must implement both methods.",
      "Phone must use implements Device instead of extends Device.",
      "Phone can be instantiated directly with new Phone().",
    ],
    answer: [0, 1],
  },
  {
    id: 9,
    kind: "single",
    points: 2,
    prompt:
      "An abstract class must have at least _________ abstract method(s).",
    options: ["0", "1", "2", "3"],
    answer: [0],
  },
  {
    id: 10,
    kind: "single",
    points: 2,
    prompt: "What does overriding a method mean?",
    options: [
      "Defining a subclass method with the same signature and a compatible return type.",
      "Calling a superclass constructor from a subclass.",
      "Writing two methods with the same name and different parameters.",
      "Preventing a method from being inherited.",
    ],
    answer: [0],
  },
  {
    id: 11,
    kind: "single",
    points: 2,
    prompt: "What best describes the relationship between Vehicle and Car?",
    options: ["Dynamic binding", "Inheritance", "Polymorphism", "Composition"],
    answer: [1],
  },
  {
    id: 12,
    kind: "single",
    points: 2,
    prompt: "A try-catch block may have multiple catch blocks.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 13,
    kind: "completion",
    points: 4,
    prompt: "Complete the RoadBike class declaration.",
    instruction:
      "RoadBike must inherit Bicycle and implement the Lockable interface.",
    lines: [
      [{ text: "interface Lockable {" }],
      [{ text: "}" }],
      [],
      [{ text: "class Bicycle {" }],
      [{ text: "}" }],
      [],
      [
        { text: "class RoadBike " },
        {
          blank: {
            id: "relationship-class",
            options: ["extends", "implements", "inherits"],
            answer: "extends",
          },
        },
        { text: " Bicycle " },
        {
          blank: {
            id: "relationship-interface",
            options: ["implements", "extends", "uses"],
            answer: "implements",
          },
        },
        { text: " Lockable {" },
      ],
      [{ text: "}" }],
    ],
  },
  {
    id: 14,
    kind: "single",
    points: 2,
    prompt: "Does the declaration below cause a compile error?",
    code: "Package<Item> p;",
    options: trueFalse,
    answer: [1],
  },
  {
    id: 15,
    kind: "completion",
    points: 8,
    prompt: "Complete the exception-handling code.",
    instruction:
      "Assume Room and its methods already exist. Select the correct Java keyword for every blank.",
    lines: [
      [
        { text: "class RoomNotDirtyException extends " },
        {
          blank: {
            id: "exception-base",
            options: ["Exception", "Throwable", "Error", "Runtime"],
            answer: "Exception",
          },
        },
        { text: " {" },
      ],
      [{ text: "}" }],
      [],
      [{ text: "class RoomCleaner {" }],
      [
        { text: "    public static void cleanRoom(Room room) " },
        {
          blank: {
            id: "declares-exception",
            options: ["throws", "throw", "catch", "finally"],
            answer: "throws",
          },
        },
        { text: " RoomNotDirtyException {" },
      ],
      [{ text: "        if (room.isClean()) {" }],
      [
        { text: "            " },
        {
          blank: {
            id: "raise-exception",
            options: ["throw", "throws", "try", "catch"],
            answer: "throw",
          },
        },
        { text: " new RoomNotDirtyException();" },
      ],
      [{ text: "        }" }],
      [{ text: "        // clean room ..." }],
      [{ text: "    }" }],
      [],
      [{ text: "    public static void main(String... args) {" }],
      [{ text: "        Room room = new Room();" }],
      [
        { text: "        " },
        {
          blank: {
            id: "try-block",
            options: ["try", "catch", "throw", "finally"],
            answer: "try",
          },
        },
        { text: " {" },
      ],
      [{ text: "            cleanRoom(room);" }],
      [
        { text: "        } " },
        {
          blank: {
            id: "catch-block",
            options: ["catch", "finally", "throws", "try"],
            answer: "catch",
          },
        },
        { text: " (RoomNotDirtyException ex) {" },
      ],
      [{ text: "            ex.printStackTrace();" }],
      [{ text: "        }" }],
      [{ text: "    }" }],
      [{ text: "}" }],
    ],
  },
  {
    id: 16,
    kind: "single",
    points: 2,
    prompt: "The Singleton design pattern declares a __________ constructor.",
    options: ["protected", "static", "private", "public"],
    answer: [2],
  },
  {
    id: 17,
    kind: "single",
    points: 2,
    prompt: "UML stands for...",
    options: [
      "Unified Modeling Language",
      "Universal Method Library",
      "User Mode Logic",
      "Uniform Markup Language",
    ],
    answer: [0],
  },
  {
    id: 18,
    kind: "single",
    points: 2,
    prompt: "Does the declaration below cause a compile error?",
    code: "Group<Object> p;",
    options: trueFalse,
    answer: [1],
  },
  {
    id: 19,
    kind: "single",
    points: 2,
    prompt:
      "The Singleton design pattern requires a __________ member variable to hold its single instance.",
    options: ["public", "static", "final", "abstract"],
    answer: [1],
  },
  {
    id: 20,
    kind: "single",
    points: 2,
    prompt: "Member variables of a class should mostly be public.",
    options: trueFalse,
    answer: [1],
  },
  {
    id: 21,
    kind: "single",
    points: 2,
    prompt:
      "UML class diagrams are used to visualize classes and relationships.",
    options: trueFalse,
    answer: [0],
  },
];
