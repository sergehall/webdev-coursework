import type { CS56ModuleBlueprint } from "../types";

export const cs56Module07CanvasSections = [
  {
    id: "design-patterns",
    title: "Module: Design Patterns",
    groups: [
      {
        items: [
          {
            title: "Design Patterns: Overview",
            type: "page",
            defaultCollapsed: true,
            prompt: {
              title: "Welcome to the Design Patterns Module",
              sections: [
                {
                  title: "Welcome",
                  paragraphs: [
                    "In this module we will cover design patterns. Get ready to dive into the world of design patterns, where you'll discover the secret recipes to solve common programming challenges with elegance and efficiency! This module isn't just about learning solutions; it's about becoming a part of a tradition of excellence shared by seasoned developers around the globe. By mastering design patterns, you'll unlock the ability to write cleaner, more maintainable code, and speak the language of experienced programmers.",
                    "Module link: https://online.smc.edu/courses/83001/modules/619512",
                  ],
                },
                {
                  title:
                    "Here's what you'll uncover in this exhilarating journey",
                  steps: [
                    {
                      title: "The three categories of design patterns",
                      items: [
                        "Unveil the different families of design patterns and understand how they address various aspects of software design.",
                      ],
                    },
                    {
                      title: "Overview of 21 design patterns",
                      items: [
                        "Get a whirlwind tour of the most influential design patterns that have stood the test of time, each one a proven solution to a specific problem.",
                      ],
                    },
                    {
                      title: "In-depth study of three key design patterns",
                      items: [
                        "Singleton: Learn how to ensure a class has only one instance and provides a global point of access to it.",
                        "Template Method Pattern: Discover how to define the skeleton of an algorithm in a method, deferring some steps to subclasses.",
                        "Iterator: Master the art of sequentially accessing elements of a collection without exposing its underlying representation.",
                      ],
                    },
                  ],
                },
                {
                  title: "Module Goal",
                  paragraphs: [
                    "This module will ignite your passion for design patterns, empowering you to create more robust and elegant software solutions. Get ready to elevate your coding skills and join the ranks of developers who craft code with finesse and precision!",
                  ],
                },
                {
                  title: "Tasks",
                  steps: [
                    {
                      title: "Watch the lectures",
                      items: ["Complete the Design Patterns lecture sequence."],
                    },
                    {
                      title: "Take the quizzes",
                      items: ["Complete the module quizzes."],
                    },
                    {
                      title: "Complete the assignment",
                      items: ["Submit Assignment Design Patterns."],
                    },
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
            title: "Lecture: Intro to Design Patterns",
            type: "page",
          },
          {
            title: "Lecture: The Singleton Design Pattern",
            type: "page",
          },
          {
            title: "Quiz: The Singleton Design Pattern",
            type: "quiz",
            dueLabel: "Jul 12",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: The Template Method Design Pattern",
            type: "page",
          },
          {
            title: "Quiz: The Template Method Design Pattern",
            type: "quiz",
            dueLabel: "Jul 12",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: The Iterator Design Pattern",
            type: "page",
          },
          {
            title: "Quiz: The Iterator Design Pattern",
            type: "quiz",
            dueLabel: "Jul 12",
            pointsLabel: "3 pts",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Assignment Design Patterns",
            type: "assignment",
            dueLabel: "Jul 12",
            pointsLabel: "10 pts",
            scoreLabel: "Score: 10 / 10 pts",
            defaultCollapsed: true,
            description:
              "Complete the Design Patterns assignment covering pattern categories and the Iterator design pattern.",
            prompt: {
              title: "Assignment Design Patterns Instructions",
              sections: [
                {
                  title: "Attempt Notice",
                  paragraphs: [
                    "You only have a single attempt to submit. Please be very careful not to submit by accident and make sure to have all questions answered to your satisfaction.",
                    "You have unlimited time and you may move away from the quiz and come back another time as long as you don't submit.",
                    "Score for this quiz: 10 out of 10.",
                  ],
                },
                {
                  title: "Question 1 - 1 / 1 pts",
                  paragraphs: [
                    "Design Patterns provide solutions to common problems. They are organized into which categories? Check all that apply.",
                  ],
                  steps: [
                    {
                      title: "Correct selections",
                      items: ["Creational", "Behavioral", "Structural"],
                    },
                    {
                      title: "Not selected",
                      items: ["Programmable", "Relational", "Destructional"],
                    },
                  ],
                },
                {
                  title: "Question 2 - 4.5 / 4.5 pts",
                  paragraphs: [
                    "Please fill in the blanks in the code below that follows the Iterator design pattern. The code below defines two interfaces for creating an iterator and iterating over a string collection. It then implements two classes that implement the interfaces. Note that the code does not use the interfaces provided by the java.util package.",
                    "WARNING: Watch out for correct spelling and proper syntax! Any incorrect syntax would be a compile error and will be flagged as incorrect.",
                  ],
                },
                {
                  title: "Solution Note",
                  paragraphs: [
                    "The completed solution below fills the Canvas blanks shown in the partial solution: hasNext(), next(), Iterator, Iterator, Iterable, createIterator(), and MyListIterator().",
                    "The MyListIterator body is filled in so this example is self-contained and compiles while preserving the Iterator design pattern from the prompt.",
                  ],
                },
              ],
            },
            codeBlocks: [
              {
                title: "Completed Iterator Design Pattern Solution",
                language: "java",
                code: `interface Iterator {
    boolean hasNext();

    String next();
}

interface Iterable {
    Iterator createIterator();
}

class MyListIterator implements Iterator {
    private final String[] items = {"Singleton", "Template Method", "Iterator"};
    private int currentIndex = 0;

    @Override
    public boolean hasNext() {
        return currentIndex < items.length;
    }

    @Override
    public String next() {
        return items[currentIndex++];
    }
}

class MyList implements Iterable {
    public Iterator createIterator() {
        return new MyListIterator();
    }
}`,
              },
            ],
          },
        ],
      },
    ],
  },
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
