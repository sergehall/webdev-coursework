import {
  getAssessmentTotalPoints,
  type AssessmentQuestion,
} from "@/features/assessment";

const trueFalse = ["True", "False"];

export const finalExamQuestions = [
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
  {
    id: 21,
    kind: "single",
    points: 2,
    prompt:
      "UML is a modeling language that includes various types of diagrams to visualize a software design.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 22,
    kind: "single",
    points: 2,
    prompt: "The Singleton design pattern ensures there's only...",
    options: [
      "a single object of any class.",
      "a class named Singleton.",
      "a single object of a class.",
      "a single class.",
    ],
    answer: [2],
  },
  {
    id: 23,
    kind: "single",
    points: 2,
    prompt: "A try-catch block may have multiple catch blocks.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 24,
    kind: "single",
    points: 2,
    prompt:
      "Does the following statement cause a compile error (assume any classes/interfaces used exist)?",
    code: "public class Package<T> {\n    void add(T item)\n}\n\nPackage<Vase> p = new Package<>();",
    options: trueFalse,
    answer: [1],
  },
  {
    id: 25,
    kind: "single",
    points: 2,
    prompt:
      "An abstract class must have at least _________ abstract method(s).",
    options: ["0", "1"],
    answer: [0],
  },
  {
    id: 26,
    kind: "single",
    points: 2,
    prompt: "What does overriding a method mean?",
    options: [
      "Implementing an instance method with the same name as a static method.",
      "Implementing a method in a subclass with the same signature of the superclass.",
      "Implementing a method in an interface.",
      "Implementing a method with the same name but different parameters.",
    ],
    answer: [1],
  },
  {
    id: 27,
    kind: "completion",
    points: 4,
    prompt:
      "The following code defines an interface. Complete the code below with the most appropriate choices.",
    instruction: "Select the correct relationship and access modifier.",
    lines: [
      [
        { text: "public interface Utterance " },
        {
          blank: {
            id: "utterance-relationship",
            options: ["extends", "implements", "inherits"],
            answer: "extends",
          },
        },
        { text: " Action {" },
      ],
      [
        { text: "    " },
        {
          blank: {
            id: "speak-access",
            options: ["protected", "private", "public"],
            answer: "public",
          },
        },
        { text: " void speak();" },
      ],
      [{ text: "}" }],
    ],
  },
  {
    id: 28,
    kind: "completion",
    points: 10,
    prompt:
      "Use generics to fulfill the following requirements. Define an interface Baker with a generic type of type Cake or any subclass thereof. The interface defines a method named addIngredient. The method's return type is of the generic type. The method has two parameters. The first method parameter is of the generic type. The second method parameter is of type Ingredient.",
    instruction:
      "Select the correct generic declaration, return type, and parameters.",
    lines: [
      [
        { text: "public interface Baker" },
        {
          blank: {
            id: "baker-generic",
            options: [
              "<T extends Cake>",
              "<T>",
              "<T implements Cake>",
              "<Cake>",
            ],
            answer: "<T extends Cake>",
          },
        },
        { text: " {" },
      ],
      [
        { text: "    " },
        {
          blank: {
            id: "baker-return-type",
            options: ["T", "<T extends Cake>", "Cake"],
            answer: "T",
          },
        },
        { text: " addIngredient(" },
        {
          blank: {
            id: "baker-first-parameter",
            options: ["Cake a1", "T a1", "<T extends Cake> a1"],
            answer: "T a1",
          },
        },
        { text: ", " },
        {
          blank: {
            id: "baker-second-parameter",
            options: ["Ingredient a2", "T a2", "Cake a2"],
            answer: "Ingredient a2",
          },
        },
        { text: ");" },
      ],
      [{ text: "}" }],
    ],
  },
  {
    id: 29,
    kind: "single",
    points: 1,
    prompt:
      "Which keyword is used when a class inherits from an abstract class?",
    options: ["extends", "implements"],
    answer: [0],
  },
  {
    id: 30,
    kind: "single",
    points: 1,
    prompt:
      "A default constructor is automatically added for a class that has no explicit constructor implemented.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 31,
    kind: "single",
    points: 1,
    prompt:
      "Which keyword is used when an interface inherits from another interface?",
    options: ["extends", "implements"],
    answer: [0],
  },
  {
    id: 32,
    kind: "single",
    points: 1,
    prompt:
      "The term class and object can be used interchangeably because they both refer to the same thing.",
    options: trueFalse,
    answer: [1],
  },
  {
    id: 33,
    kind: "single",
    points: 1,
    prompt: "The do-loop runs at least ________ .",
    options: ["zero time", "once"],
    answer: [1],
  },
  {
    id: 34,
    kind: "completion",
    points: 15,
    prompt:
      'Declare an interface named Tool with a single method apply. The method has a single parameter of type int named minutes but does not return any value.\n\nImplement an abstract class named Drill. The class has a boolean variable and implements two methods turnOn and turnOff. Both have no parameters and do not return any values.\n\nImplement a class named PowerDrill. The class inherits from Drill and implements the Tool interface. The apply method outputs a message "drilling for {X} minutes" where {X} is the minutes argument that is passed to the method, e.g. "drilling for 5 minutes".',
    instruction:
      "Tool declares apply(int minutes). Drill is abstract and implements turnOn and turnOff. PowerDrill extends Drill, implements Tool, and prints the drilling message.",
    lines: [
      [
        { text: "public " },
        {
          blank: {
            id: "tool-kind",
            options: ["abstract class", "interface", "class"],
            answer: "interface",
          },
        },
        { text: " " },
        {
          blank: {
            id: "tool-name",
            options: ["Drill", "Tool", "PowerDrill"],
            answer: "Tool",
          },
        },
        { text: " {" },
      ],
      [
        { text: "    void " },
        {
          blank: {
            id: "tool-method",
            options: [
              "apply();",
              "apply(int minutes);",
              "apply(int minutes) { }",
              "apply() { }",
            ],
            answer: "apply(int minutes);",
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
            options: ["class", "interface", "abstract class"],
            answer: "abstract class",
          },
        },
        { text: " Drill {" },
      ],
      [{ text: "    boolean isOn;" }],
      [],
      [
        { text: "    public " },
        {
          blank: {
            id: "turn-on-method",
            options: ["void turnOff()", "void turnOn()"],
            answer: "void turnOn()",
          },
        },
        { text: " {" },
      ],
      [{ text: "        this.isOn = true;" }],
      [{ text: "    }" }],
      [],
      [
        { text: "    public " },
        {
          blank: {
            id: "turn-off-method",
            options: ["void turnOn()", "void turnOff()"],
            answer: "void turnOff()",
          },
        },
        { text: " {" },
      ],
      [{ text: "        this.isOn = false;" }],
      [{ text: "    }" }],
      [{ text: "}" }],
      [],
      [
        { text: "public " },
        {
          blank: {
            id: "power-drill-kind",
            options: ["interface", "abstract class", "class"],
            answer: "class",
          },
        },
        { text: " PowerDrill " },
        {
          blank: {
            id: "power-drill-class-relationship",
            options: ["extends", "implements"],
            answer: "extends",
          },
        },
        { text: " Drill " },
        {
          blank: {
            id: "power-drill-interface-relationship",
            options: ["implements", "extends"],
            answer: "implements",
          },
        },
        { text: " Tool {" },
      ],
      [
        { text: "    " },
        {
          blank: {
            id: "power-drill-apply",
            options: [
              "public void apply(int minutes)",
              "private void apply(int minutes)",
              "protected void apply(int minutes)",
            ],
            answer: "public void apply(int minutes)",
          },
        },
        { text: " {" },
      ],
      [
        {
          text: '        System.out.println("drilling for " + minutes + " minutes");',
        },
      ],
      [{ text: "    }" }],
      [{ text: "}" }],
    ],
  },
  {
    id: 35,
    kind: "single",
    points: 2,
    prompt: "Which character represents a generic wildcard?",
    options: ["!", "#", "$", "?"],
    answer: [3],
  },
  {
    id: 36,
    kind: "single",
    points: 2,
    prompt:
      "What is the size of the HashSet if the class Document overrides the equals(..) and hashCode() methods?",
    code: 'HashSet<Document> set = new HashSet<>();\nset.add(new Document("Policy"));\nset.add(new Document("Insurance"));\nset.add(new Document("Policy"));\n\nint size = set.size();',
    options: ["1", "2", "3", "4"],
    answer: [1],
  },
  {
    id: 37,
    kind: "single",
    points: 2,
    prompt: "Generics can be used on methods and classes.",
    options: trueFalse,
    answer: [0],
  },
  {
    id: 38,
    kind: "single",
    points: 2,
    prompt: "The finally block in a try-catch block is optional.",
    options: trueFalse,
    answer: [0],
  },
] satisfies readonly AssessmentQuestion[];

export const finalExamTotalPoints =
  getAssessmentTotalPoints(finalExamQuestions);
