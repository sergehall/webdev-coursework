import type { CS56ModuleBlueprint } from "../types";

export const cs56Module04Blueprint = {
  id: 4,
  title: "Unified Modeling Language",
  weekLabel: "Module 4",
  dateLabel: "July 2-5",
  overview:
    "This module introduces Unified Modeling Language as a design and visualization tool for Java programs. It focuses on understanding UML, reading and writing class diagrams, and using sequence diagrams to describe object interactions over time.",
  topicLine:
    "UML foundations, diagram types, class diagrams, sequence diagrams, and PlantUML setup",
  focusAreas: [
    "Purpose and value of UML",
    "UML diagram categories",
    "Class diagrams",
    "Sequence diagrams",
    "PlantUML workflow in IntelliJ",
  ],
  objectivesAligned: [
    "Explain what UML is and why developers use it",
    "Identify different UML diagram types",
    "Create class diagrams that show classes, attributes, methods, and relationships",
    "Create sequence diagrams that show interactions over time",
    "Use PlantUML as a practical diagramming tool in a Java workflow",
  ],
  outcomeAlignment: [
    "Plan Java systems before implementation",
    "Communicate object-oriented design decisions with visual models",
    "Connect design artifacts to later coding assignments",
  ],
  syllabusContext: [
    "Module: Unified Modeling Language includes overview, lecture pages, a discussion, and an assignment task",
    "Visible Canvas deadlines: Discussion: UML due Jul 2; Assignment: UML due Jul 5",
  ],
  starterTasks: [
    "Review UML: Overview",
    "Complete the UML lecture sequence",
    "Install or review the PlantUML plugin workflow in IntelliJ",
    "Post on Discussion: UML",
    "Submit Assignment: UML",
  ],
  artifacts: [
    "Discussion: UML",
    "Assignment: UML",
    "Class diagram or PlantUML artifact",
    "Sequence diagram or PlantUML artifact",
  ],
  importantDates: ["Jul 2 - Discussion: UML", "Jul 5 - Assignment: UML"],
  assessmentContext: ["Discussion: UML - 5 pts", "Assignment: UML - 10 pts"],
  milestone: "UML discussion and assignment completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Learn what UML is and why it helps developers design and communicate complex systems before coding.",
    },
    {
      step: "Lecture",
      description:
        "Study UML basics, PlantUML setup in IntelliJ, class diagrams, and sequence diagrams.",
    },
    {
      step: "Tasks",
      description:
        "Post on the UML discussion and complete the UML assignment in Canvas.",
    },
  ],
  readingHighlights: [
    "UML: Overview",
    "Lecture: Intro to UML",
    "Lecture: UML - Class Diagrams",
    "Lecture: UML - Sequence Diagrams",
  ],
  canvasSections: [
    {
      id: "unified-modeling-language",
      title: "Module: Unified Modeling Language",
      groups: [
        {
          items: [
            {
              title: "UML: Overview",
              type: "page",
              defaultCollapsed: true,
              prompt: {
                title: "Welcome to Module: Unified Modeling Language",
                sections: [
                  {
                    title: "Welcome",
                    paragraphs: [
                      "Dive headfirst into the captivating world of Java programming with the power of Unified Modeling Language (UML). This module is more than just an introduction to a tool. It is about mastering the art of designing and visualizing complex systems. UML serves as the blueprint for your coding masterpieces, providing a clear and structured way to map out your ideas before bringing them to life.",
                    ],
                  },
                  {
                    title: "Here's what you'll explore",
                    steps: [
                      {
                        title: "What the UML is",
                        items: [
                          "Discover this powerful language and learn why it is a game changer for developers around the world.",
                        ],
                      },
                      {
                        title: "Different diagram types",
                        items: [
                          "Explore the variety of UML diagrams that help you visualize every aspect of your system, from structure to behavior.",
                        ],
                      },
                      {
                        title: "Use and write class diagrams",
                        items: [
                          "Learn how to create detailed class diagrams that illustrate the relationships and interactions between the different classes in your program.",
                        ],
                      },
                      {
                        title: "Use and write sequence diagrams",
                        items: [
                          "Master sequence diagrams to visualize the flow of operations and interactions over time within your system.",
                        ],
                      },
                    ],
                  },
                  {
                    title: "Tasks",
                    paragraphs: [
                      "Post on the discussion and complete the assignment.",
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          title: "Lecture",
          items: [
            {
              title: "Lecture: Intro to UML",
              type: "page",
            },
            {
              title: "Lecture: How to install PlantUML Plugin in IntelliJ",
              type: "page",
            },
            {
              title: "Lecture: UML - Class Diagrams",
              type: "page",
            },
            {
              title: "Lecture: UML - Sequence Diagrams",
              type: "page",
            },
          ],
        },
        {
          title: "Tasks",
          items: [
            {
              title: "Discussion: UML",
              type: "discussion",
              dueLabel: "Jul 2",
              pointsLabel: "5 pts",
              defaultCollapsed: true,
              description:
                "Post on the UML discussion after reviewing the overview and lecture materials.",
              prompt: {
                title: "Task 1: Example of a UML Diagram",
                sections: [
                  {
                    title: "Text Response",
                    paragraphs: [
                      "Here is an example of a UML class diagram for a simple Library Management System.",
                      "This UML class diagram shows a basic library management system. The main classes in the diagram are Library, Book, Member, and Librarian. Each class represents an important part of the system. For example, the Book class stores information about a book, such as its title, author, ISBN number, and whether it is available. The Member class represents a library user who can borrow and return books.",
                      "The diagram also shows the relationships between the classes. A Library can have many books, while a Member can borrow many books. The Librarian manages the library and can perform actions like managing books and registering members. I think this is a good example of a UML diagram because it shows both the data each class contains and the actions each class can perform. It also makes the structure of the system easier to understand before writing the actual code.",
                    ],
                  },
                ],
              },
            },
            {
              title: "Assignment: UML",
              type: "assignment",
              dueLabel: "Jul 5",
              pointsLabel: "10 pts",
              defaultCollapsed: true,
              description:
                "Complete the UML quiz-style assignment in Canvas. It includes UML concept checks and two PlantUML exercises.",
              prompt: {
                title: "Assignment: UML - Quiz Instructions",
                sections: [
                  {
                    title: "Question 1 - 1 pt",
                    paragraphs: [
                      "UML is a programming language that is used to develop a variety of diagrams.",
                      "Answer: False. UML is a modeling language, not a programming language.",
                    ],
                  },
                  {
                    title: "Question 2 - 1 pt",
                    paragraphs: [
                      "Which of the following diagrams are part of the UML? Check all that apply.",
                      "Answer: Class diagram, Sequence diagram, Activity diagram.",
                    ],
                  },
                  {
                    title: "Question 3 - 1 pt",
                    paragraphs: [
                      "Which of the following can be expressed in a UML class diagram? Check all that apply.",
                      "Answer: Interfaces, Methods, Inheritance relationships, Classes.",
                    ],
                  },
                  {
                    title: "Question 4 - 4 pts",
                    paragraphs: [
                      "PlantUML provides textual commands to define diagrams. Design a class diagram with a package named Math that includes a class Shape with two subclasses named Rectangle and Square.",
                    ],
                    steps: [
                      {
                        title: "Class diagram requirements",
                        items: [
                          "The Shape class has one public method named area() that returns a float.",
                          "The Square class has one private member variable of type float named side.",
                          "The Rectangle class has two private member variables of type float named width and height.",
                        ],
                      },
                    ],
                  },
                  {
                    title: "Question 5 - 3 pts",
                    paragraphs: [
                      "PlantUML provides textual commands to define diagrams. Design a sequence diagram for this scenario: an actor uses a vending machine to order an item and pays for it with a credit card.",
                    ],
                    steps: [
                      {
                        title: "Sequence diagram requirements",
                        items: [
                          "Create an actor named Customer.",
                          "The Customer calls order() on a VendingMachine object.",
                          "The Customer calls pay() on the VendingMachine object.",
                          "As part of pay(), the VendingMachine calls charge() on a CreditCard object.",
                          "As part of pay(), the VendingMachine calls output() on itself and returns from pay() to the Customer.",
                        ],
                      },
                    ],
                  },
                ],
              },
              codeBlocks: [
                {
                  title: "Question 4 PlantUML Class Diagram Solution",
                  language: "plantuml",
                  code: `@startuml
package Math {
    class Shape {
        + float area()
    }

    class Square {
        - float side
    }

    class Rectangle {
        - float width
        - float height
    }

    Shape <|-- Square
    Shape <|-- Rectangle
}
@enduml`,
                },
                {
                  title: "Question 5 PlantUML Sequence Diagram Solution",
                  language: "plantuml",
                  code: `@startuml
actor Customer
participant VendingMachine
participant CreditCard

Customer -> VendingMachine : order()
Customer -> VendingMachine : pay()
activate VendingMachine
VendingMachine -> CreditCard : charge()
VendingMachine -> VendingMachine : output()
VendingMachine --> Customer : pay()
deactivate VendingMachine
@enduml`,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  textTasks: [
    {
      id: "module-4-uml-discussion",
      title: "Discussion: UML",
      objective:
        "Participate in the UML discussion after reviewing the overview and lecture materials.",
      tasks: [
        "Review what UML is and why developers use it",
        "Review the class diagram and sequence diagram lecture pages",
        "Use the text-only Library Management System response as the discussion answer",
        "Post on Discussion: UML by Jul 2",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas discussion",
        "Due: Jul 2",
        "5 points",
      ],
    },
    {
      id: "module-4-uml-assignment",
      title: "Assignment: UML",
      objective:
        "Complete the UML assignment after studying UML foundations, class diagrams, sequence diagrams, and PlantUML setup.",
      tasks: [
        "Complete the UML overview and lecture sequence",
        "Use UML notation to model program structure or behavior as required by Canvas",
        "Submit Assignment: UML by Jul 5",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Jul 5",
        "10 points",
      ],
    },
  ],
} satisfies CS56ModuleBlueprint;
