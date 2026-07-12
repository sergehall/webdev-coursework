export type ChoiceQuestion = {
  id: number;
  kind: "single" | "multiple";
  points: number;
  prompt: string;
  instruction?: string;
  code?: string;
  options: string[];
  answer: number[];
};

export type TextQuestion = {
  id: number;
  kind: "text";
  points: number;
  prompt: string;
  instruction: string;
  code?: string;
  answers: string[];
};

export type CompletionBlank = {
  id: string;
  options: string[];
  answer: string;
};

export type CompletionSegment =
  | { text: string; blank?: never }
  | { text?: never; blank: CompletionBlank };

export type CompletionQuestion = {
  id: number;
  kind: "completion";
  points: number;
  prompt: string;
  instruction: string;
  lines: CompletionSegment[][];
};

export type MidtermQuestion =
  | ChoiceQuestion
  | TextQuestion
  | CompletionQuestion;

const trueFalse = ["True", "False"];

export const midtermQuestions: MidtermQuestion[] = [
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

export const midtermTotalPoints = midtermQuestions.reduce(
  (total, question) => total + question.points,
  0
);
