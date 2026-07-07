import type { CS56ModuleBlueprint } from "../types";

export const cs56Module03Blueprint = {
  id: 3,
  title: "Polymorphism, Dynamic Binding & Interfaces",
  weekLabel: "Module 3",
  dateLabel: "June 28",
  overview:
    "This module expands object-oriented Java design with polymorphism, dynamic binding, method overriding, and interfaces. It also introduces anonymous classes and functional interfaces.",
  topicLine:
    "Polymorphism, dynamic binding, method overriding, interfaces, anonymous classes, and functional interfaces",
  focusAreas: [
    "Polymorphic references",
    "Method overriding",
    "Dynamic binding",
    "Interface design and extension",
    "Anonymous classes",
    "Functional interfaces",
  ],
  objectivesAligned: [
    "Explain how polymorphism changes runtime behavior",
    "Override methods intentionally in inheritance hierarchies",
    "Use dynamic binding to call subclass behavior through superclass references",
    "Define and extend Java interfaces",
    "Recognize anonymous classes and functional interface patterns",
  ],
  outcomeAlignment: [
    "Build Java programs that use polymorphism and interfaces cleanly",
    "Prepare for event-driven, collection, and callback-oriented Java APIs",
  ],
  syllabusContext: [
    "Module: Polymorphism, Dynamic Binding & Interfaces includes overview, two lecture sections, reading, quizzes, and an assignment task",
    "Visible Canvas deadlines: all quizzes and Assignment: Polymorphism due Jun 28",
  ],
  starterTasks: [
    "Review Polymorphism: Overview",
    "Complete the polymorphism and dynamic binding lecture sequence",
    "Complete the interfaces lecture sequence",
    "Read Polymorphism & Interfaces",
    "Submit Assignment: Polymorphism",
  ],
  artifacts: [
    "Polymorphism quiz submissions",
    "Interfaces quiz submissions",
    "Assignment: Polymorphism",
  ],
  importantDates: [
    "Jun 28 - Quiz: Polymorphism",
    "Jun 28 - Quiz: Overriding Methods",
    "Jun 28 - Quiz: Dynamic Binding",
    "Jun 28 - Quiz: Interfaces",
    "Jun 28 - Quiz: More on Interfaces",
    "Jun 28 - Quiz: Anonymous Classes",
    "Jun 28 - Quiz: Functional Interfaces",
    "Jun 28 - Assignment: Polymorphism",
  ],
  assessmentContext: [
    "Quiz: Polymorphism - 3 pts",
    "Quiz: Overriding Methods - 3 pts",
    "Quiz: Dynamic Binding - 3 pts",
    "Quiz: Interfaces - 4 pts",
    "Quiz: More on Interfaces - 3 pts",
    "Quiz: Anonymous Classes - 3 pts",
    "Quiz: Functional Interfaces - 3 pts",
    "Assignment: Polymorphism - 1 pt",
  ],
  milestone: "Polymorphism, dynamic binding, and interface tasks completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Start with the polymorphism overview and connect it to inheritance from the previous module.",
    },
    {
      step: "Polymorphism",
      description:
        "Study polymorphism, overriding methods, and dynamic binding.",
    },
    {
      step: "Interfaces",
      description:
        "Study interface basics, interface extension, anonymous classes, and functional interfaces.",
    },
    {
      step: "Tasks",
      description: "Complete quizzes, reading, and Assignment: Polymorphism.",
    },
  ],
  readingHighlights: [
    "Polymorphism: Overview",
    "Reading: Polymorphism & Interfaces",
    "Lecture pages on polymorphism, dynamic binding, and interfaces",
  ],
  canvasSections: [
    {
      id: "polymorphism-dynamic-binding-interfaces",
      title: "Module: Polymorphism, Dynamic Binding & Interfaces",
      groups: [
        {
          items: [
            {
              title: "Polymorphism: Overview",
              type: "page",
            },
          ],
        },
        {
          title: "Lecture - Polymorphism & Dynamic Binding",
          defaultCollapsed: true,
          items: [
            {
              title: "Lecture: Polymorphism",
              type: "page",
            },
            {
              title: "Quiz: Polymorphism",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Overriding Methods",
              type: "page",
            },
            {
              title: "Quiz: Overriding Methods",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Dynamic Binding",
              type: "page",
            },
            {
              title: "Quiz: Dynamic Binding",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
          ],
        },
        {
          title: "Lecture - Interfaces",
          defaultCollapsed: true,
          items: [
            {
              title: "Lecture: Intro to Interfaces",
              type: "page",
            },
            {
              title: "Lecture: Extending an Interface",
              type: "page",
            },
            {
              title: "Quiz: Interfaces",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "4 pts",
            },
            {
              title: "Lecture: More on Interfaces",
              type: "page",
            },
            {
              title: "Quiz: More on Interfaces",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Anonymous Classes",
              type: "page",
            },
            {
              title: "Quiz: Anonymous Classes",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Functional Interfaces",
              type: "page",
            },
            {
              title: "Quiz: Functional Interfaces",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Reading: Polymorphism & Interfaces",
              type: "page",
            },
          ],
        },
        {
          title: "Tasks",
          items: [
            {
              title: "Assignment: Polymorphism",
              type: "assignment",
              dueLabel: "Jun 28",
              pointsLabel: "1 pts",
              prompt: {
                title: "Implementing Polymorphism with Devices in Java",
                sections: [
                  {
                    title: "Introduction",
                    paragraphs: [
                      "In modern computing, various electronic devices interact seamlessly through software systems. Understanding polymorphism allows you to write flexible and scalable code that treats different devices in a uniform way. In this assignment, you will implement polymorphism using an electronic device hierarchy, demonstrating how method overriding enables dynamic behavior across multiple device types.",
                    ],
                  },
                  {
                    title: "Instructions",
                    steps: [
                      {
                        title: "Create a Parent Class (Device)",
                        items: [
                          'Define a method turnOn() that prints "Turning on the device...".',
                        ],
                      },
                      {
                        title:
                          "Create Child Classes (Smartphone, Laptop, Tablet, Smartwatch)",
                        items: [
                          "Each class should inherit from Device.",
                          'Override the turnOn() method with unique behaviors: Smartphone: "Booting up the smartphone..."; Laptop: "Powering on the laptop..."; Tablet: "Starting the tablet..."; Smartwatch: "Waking up the smartwatch...".',
                        ],
                      },
                      {
                        title: "Implement the Main Method (DeviceTest)",
                        items: [
                          "Create an ArrayList of Device objects.",
                          "Populate the list with instances of Smartphone, Laptop, Tablet, and Smartwatch.",
                          "Use a loop to call turnOn() on each object and observe polymorphic behavior.",
                        ],
                      },
                    ],
                  },
                  {
                    title: "Expected Output Example",
                    output: [
                      "Booting up the smartphone...",
                      "Powering on the laptop...",
                      "Starting the tablet...",
                      "Waking up the smartwatch...",
                    ],
                  },
                ],
              },
              scoreLabel: "Score: 0.81 / 1 pts",
              description: "Java Code Solution - Polymorphism with Devices",
              note: "Submission note: my answer lost points because I wrote turnOn without parentheses in the method call. The loop should call device.turnOn();.",
              codeBlocks: [
                {
                  title: "Corrected DeviceTest.java",
                  language: "java",
                  code: `import java.util.ArrayList;

class Device {
    void turnOn() {
        System.out.println("Turning on the device...");
    }
}

class Smartphone extends Device {
    @Override
    void turnOn() {
        System.out.println("Booting up the smartphone...");
    }
}

class Laptop extends Device {
    @Override
    void turnOn() {
        System.out.println("Powering on the laptop...");
    }
}

class Tablet extends Device {
    @Override
    void turnOn() {
        System.out.println("Starting the tablet...");
    }
}

class Smartwatch extends Device {
    @Override
    void turnOn() {
        System.out.println("Waking up the smartwatch...");
    }
}

public class DeviceTest {
    public static void main(String[] args) {
        ArrayList<Device> devices = new ArrayList<>();

        devices.add(new Smartphone());
        devices.add(new Laptop());
        devices.add(new Tablet());
        devices.add(new Smartwatch());

        for (Device device : devices) {
            device.turnOn();
        }
    }
}`,
                },
              ],
              expectedOutput: [
                "Booting up the smartphone...",
                "Powering on the laptop...",
                "Starting the tablet...",
                "Waking up the smartwatch...",
              ],
            },
          ],
        },
      ],
    },
  ],
  textTasks: [
    {
      id: "module-3-polymorphism",
      title: "Assignment: Polymorphism",
      objective:
        "Complete the polymorphism assignment after reviewing polymorphism, dynamic binding, and interfaces.",
      tasks: [
        "Review polymorphism, overriding methods, and dynamic binding",
        "Review interface basics, extension, anonymous classes, and functional interfaces",
        "Submit Assignment: Polymorphism by Jun 28",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Jun 28",
        "1 point",
      ],
    },
  ],
} satisfies CS56ModuleBlueprint;
