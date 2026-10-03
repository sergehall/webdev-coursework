import type { AssessmentQuestion } from "@/features/assessment";

export const midtermQuestions22To33: readonly AssessmentQuestion[] = [
  {
    id: 22,
    kind: "multiple",
    points: 4,
    prompt:
      "Class B is in the same package as A but is not a subclass. Which members can B access through an A object?",
    instruction: "Select all that apply.",
    code: "class A {\n    public int publicValue;\n    protected int protectedValue;\n    int packageValue;\n    private int privateValue;\n}",
    options: ["publicValue", "protectedValue", "packageValue", "privateValue"],
    answer: [0, 1, 2],
  },
  {
    id: 23,
    kind: "single",
    points: 4,
    prompt: "What happens when new Square(4) is evaluated?",
    code: "class GeometricObject {\n    GeometricObject(String color) { }\n}\n\nclass Square extends GeometricObject {\n    Square(double side) {\n        this.side = side;\n    }\n    double side;\n}",
    options: [
      "It compiles and invokes an implicit no-argument superclass constructor.",
      "It fails to compile because Square does not explicitly call an available GeometricObject constructor.",
      "It compiles and automatically passes null to GeometricObject.",
      "It throws an exception only at runtime.",
    ],
    answer: [1],
  },
  {
    id: 24,
    kind: "text",
    points: 2,
    prompt:
      "Declare a variable named locker of type Locker with the generic type Item.",
    instruction: "Enter one Java declaration, including the semicolon.",
    answers: ["Locker<Item> locker;", "Locker <Item> locker;"],
  },
  {
    id: 25,
    kind: "multiple",
    points: 2,
    prompt: "Which statements about subclasses are true?",
    instruction: "Select all that apply.",
    options: [
      "A subclass inherits accessible members from its superclass.",
      "A subclass may override an inherited instance method.",
      "A subclass directly inherits private members as accessible members.",
      "Java classes may directly extend more than one class.",
    ],
    answer: [0, 1],
  },
  {
    id: 26,
    kind: "single",
    points: 2,
    prompt: "Which statement about dynamic binding is false?",
    options: [
      "The runtime object type determines which overridden instance method runs.",
      "It enables polymorphic method calls.",
      "It applies to overridden instance methods.",
      "The reference variable's declared type always determines the overridden method that runs.",
    ],
    answer: [3],
  },
  {
    id: 27,
    kind: "multiple",
    points: 2,
    prompt: "Given Sub extends Sandwich, which assignments are legal?",
    instruction: "Select all that apply.",
    code: "class Sub extends Sandwich { }",
    options: [
      "Sandwich meal = new Sub();",
      "Sub lunch = new Sub();",
      "Sub lunch = new Sandwich();",
      "Sandwich meal = new Sandwich();",
    ],
    answer: [0, 1, 3],
  },
  {
    id: 28,
    kind: "single",
    points: 2,
    prompt: "The Singleton pattern ensures there is only...",
    options: [
      "one method in a class.",
      "one subclass for a superclass.",
      "one instance of a class with a global access point.",
      "one constructor argument.",
    ],
    answer: [2],
  },
  {
    id: 29,
    kind: "completion",
    points: 8,
    prompt: "Complete the Singleton implementation.",
    instruction: "Implement the Singleton design pattern for DatabaseManager.",
    lines: [
      [
        { text: "public " },
        {
          blank: {
            id: "singleton-declaration",
            options: ["class", "abstract class", "singleton class"],
            answer: "class",
          },
        },
        { text: " DatabaseManager {" },
      ],
      [
        { text: "    " },
        {
          blank: {
            id: "singleton-field",
            options: ["private static", "public static", "private", "public"],
            answer: "private static",
          },
        },
        { text: " DatabaseManager manager;" },
      ],
      [
        { text: "    " },
        {
          blank: {
            id: "singleton-constructor",
            options: ["private", "public", "protected", "static"],
            answer: "private",
          },
        },
        { text: " DatabaseManager() { }" },
      ],
      [
        { text: "    " },
        {
          blank: {
            id: "singleton-accessor",
            options: ["public static", "private static", "public", "static"],
            answer: "public static",
          },
        },
        { text: " DatabaseManager getInstance() {" },
      ],
      [
        { text: "        if (" },
        {
          blank: {
            id: "singleton-condition",
            options: [
              "manager == null",
              "manager != null",
              "getInstance() == null",
              "count == 0",
            ],
            answer: "manager == null",
          },
        },
        { text: ") {" },
      ],
      [
        { text: "            manager = " },
        {
          blank: {
            id: "singleton-instance",
            options: [
              "new DatabaseManager()",
              "new Singleton()",
              "getInstance()",
            ],
            answer: "new DatabaseManager()",
          },
        },
        { text: ";" },
      ],
      [{ text: "        }" }],
      [{ text: "        return manager;" }],
      [{ text: "    }" }],
      [{ text: "}" }],
    ],
  },
  {
    id: 30,
    kind: "completion",
    points: 8,
    prompt: "Complete the bounded generic GarbageTruck implementation.",
    instruction:
      "GarbageTruck accepts a type parameter whose upper bound is Trash. Its dump method receives that type and returns no value.",
    lines: [
      [
        { text: "class " },
        {
          blank: {
            id: "trash-class",
            options: ["Trash", "Bike", "Sausage", "Cheese"],
            answer: "Trash",
          },
        },
        { text: " {" },
      ],
      [{ text: "}" }],
      [],
      [
        { text: "public class GarbageTruck" },
        {
          blank: {
            id: "generic-bound",
            options: [
              "<T extends Trash>",
              "<T super Trash>",
              "<T>",
              "<T implements Trash>",
            ],
            answer: "<T extends Trash>",
          },
        },
        { text: " {" },
      ],
      [
        { text: "    " },
        {
          blank: {
            id: "dump-return",
            options: ["void", "T", "<T>", "int"],
            answer: "void",
          },
        },
        { text: " dump(" },
        {
          blank: {
            id: "dump-parameter",
            options: ["T p", "<T> p", "Trash<T> p", "Object p"],
            answer: "T p",
          },
        },
        { text: ") {" },
      ],
      [{ text: '        System.out.println("dumping " + p);' }],
      [{ text: "    }" }],
      [{ text: "}" }],
    ],
  },
  {
    id: 31,
    kind: "completion",
    points: 10,
    prompt: "Complete the Tool / Drill / PowerDrill implementation.",
    instruction:
      "Use an interface, an abstract base class, and a concrete subclass with the correct inheritance relationships.",
    lines: [
      [
        { text: "public " },
        {
          blank: {
            id: "tool-kind",
            options: ["interface", "abstract class", "class"],
            answer: "interface",
          },
        },
        { text: " Tool {" },
      ],
      [
        { text: "    void " },
        {
          blank: {
            id: "tool-method",
            options: ["turnOn();", "turnOn() { }", "apply(int minutes);"],
            answer: "turnOn();",
          },
        },
      ],
      [{ text: "}" }],
      [],
      [
        { text: "public " },
        {
          blank: {
            id: "drill-kind",
            options: ["abstract class", "interface", "class"],
            answer: "abstract class",
          },
        },
        { text: " Drill {" },
      ],
      [
        { text: "    public " },
        {
          blank: {
            id: "drill-start",
            options: ["abstract void start();", "void start() { }", "start();"],
            answer: "abstract void start();",
          },
        },
      ],
      [{ text: "}" }],
      [],
      [
        { text: "public " },
        {
          blank: {
            id: "powerdrill-kind",
            options: ["class", "abstract class", "interface"],
            answer: "class",
          },
        },
        { text: " PowerDrill " },
        {
          blank: {
            id: "powerdrill-extends",
            options: ["extends", "implements", "inherits"],
            answer: "extends",
          },
        },
        { text: " Drill " },
        {
          blank: {
            id: "powerdrill-implements",
            options: ["implements", "extends", "uses"],
            answer: "implements",
          },
        },
        { text: " Tool {" },
      ],
      [
        { text: "    public " },
        {
          blank: {
            id: "powerdrill-start",
            options: ["void start() { }", "abstract void start();", "start();"],
            answer: "void start() { }",
          },
        },
      ],
      [
        { text: "    public " },
        {
          blank: {
            id: "powerdrill-turnon",
            options: [
              "void turnOn() { }",
              "abstract void turnOn();",
              "turnOn();",
            ],
            answer: "void turnOn() { }",
          },
        },
      ],
      [{ text: "}" }],
    ],
  },
  {
    id: 32,
    kind: "single",
    points: 2,
    prompt: "Which character represents a generic wildcard?",
    options: ["?", "#", "$", "!"],
    answer: [0],
  },
  {
    id: 33,
    kind: "single",
    points: 2,
    prompt:
      "Which lambda expression correctly implements the Incident interface?",
    code: "interface Incident {\n    void handle();\n}",
    options: [
      '() -> { System.out.println("handled"); }',
      '() => { System.out.println("handled"); }',
      '(handle) -> { System.out.println("handled"); }',
      'Incident() -> { System.out.println("handled"); }',
    ],
    answer: [0],
  },
];
