import type { CS56ModuleBlueprint } from "../types";

export const cs56Module06CanvasSections = [
  {
    id: "generics",
    title: "Module: Generics",
    groups: [
      {
        items: [
          {
            title: "Generics: Overview",
            type: "page",
            defaultCollapsed: true,
            prompt: {
              title: "Welcome to Module: Generics",
              sections: [
                {
                  title: "Welcome",
                  paragraphs: [
                    "Welcome to the Module: Generics. Get ready to unlock the full power of Java programming with generics! This module is not just about understanding a concept - it's about gaining the ability to write more flexible, efficient, and type-safe code. Generics are like magical placeholders that can adapt to various types, making your code more dynamic and reusable.",
                    "Module link: https://online.smc.edu/courses/83001/modules/619511",
                  ],
                },
                {
                  title: "Here's what you'll dive into",
                  steps: [
                    {
                      title: "Generics",
                      items: [
                        "Discover how generics work as powerful type placeholders, allowing you to write code that works with any data type, improving both flexibility and safety.",
                      ],
                    },
                    {
                      title: "Upper- and lower-bound generic type parameters",
                      items: [
                        "Learn how to set boundaries on generics, enabling more precise type control and preventing type-related errors.",
                      ],
                    },
                    {
                      title: "Wildcards",
                      items: [
                        "Explore the versatility of wildcards in generics, giving you the tools to handle unknown types with ease.",
                      ],
                    },
                  ],
                },
                {
                  title: "Module Goal",
                  paragraphs: [
                    "This module will transform the way you think about and write Java code. Get ready to harness the full potential of generics and elevate your programming skills to new heights!",
                  ],
                },
                {
                  title: "Tasks",
                  steps: [
                    {
                      title: "Watch the lectures",
                      items: ["Complete the Generics lecture sequence."],
                    },
                    {
                      title: "Take the quizzes",
                      items: ["Complete the module quizzes."],
                    },
                    {
                      title: "Post on the discussion",
                      items: ["Submit the Generics discussion post."],
                    },
                    {
                      title: "Complete the assignment",
                      items: ["Submit Assignment: Generics."],
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
            title: "Lecture: Generics",
            type: "page",
          },
          {
            title: "Quiz: Intro to Generics",
            type: "quiz",
            dueLabel: "Jul 12",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Generics with Wildcard",
            type: "page",
          },
          {
            title: "Quiz: Generics with Wildcard",
            type: "quiz",
            dueLabel: "Jul 12",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Generics on Methods",
            type: "page",
          },
          {
            title: "Quiz: Generics on Methods",
            type: "quiz",
            dueLabel: "Jul 12",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Bounded Type Parameters",
            type: "page",
          },
          {
            title: "Quiz: Bounded Type Parameters",
            type: "quiz",
            dueLabel: "Jul 12",
            pointsLabel: "2 pts",
          },
          {
            title: "Reading: Generics",
            type: "page",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Discussion: Generics",
            type: "discussion",
            dueLabel: "Jul 9",
            pointsLabel: "5 pts",
          },
          {
            title: "Assignment: Generics",
            type: "assignment",
            dueLabel: "Jul 12",
            pointsLabel: "10 pts",
            scoreLabel: "Score: 10 / 10 pts",
            defaultCollapsed: true,
            description:
              "Implement a generic Truck class that carries different Load implementations while keeping the truck behavior the same.",
            prompt: {
              title: "Assignment: Generics Instructions",
              sections: [
                {
                  title: "Instructions",
                  paragraphs: [
                    "This is a programming assignment. The problem statement defines the instructions on what to implement. The solution is partially provided with blanks. Before looking at the partial solution, try to program it yourself in an IDE such as Eclipse, NetBeans, or IntelliJ. Once you have a solution, compare it to the provided solution and fill in the gaps. Be very careful to follow proper formatting and make sure the solution with your answers would compile.",
                    "This assignment helps to learn how to use generics in Java effectively. The focus of this assignment is on how to design and use classes with generic type parameters.",
                    "Implement an application that handles different kinds of trucks. All trucks share the same behavior of a regular truck but they provide different purposes in terms of the load they transport, such as a car carrier trailer carries cars, a logging truck carries logs, or refrigerator truck carries refrigerated items. Each truck only distinguishes itself from other trucks by its load.",
                    "Inheritance is not applicable because all functionality is the same and there is no specialized behavior. The property of every truck is also the same and only differs by its data type. That is, the load of a truck is defined by an instance variable in the truck class. This instance variable is defined by a generic parameter that must have the Load interface as an upper bound. The Load interface represents any load a truck can carry. It is implemented by three different classes.",
                  ],
                },
                {
                  title: "Create the following types",
                  steps: [
                    {
                      title: "Load",
                      items: [
                        "Create an interface called Load. The interface is empty.",
                      ],
                    },
                    {
                      title: "Car",
                      items: [
                        "Create a class named Car that implements the Load interface. This class is empty but you may add properties.",
                      ],
                    },
                    {
                      title: "TreeLog",
                      items: [
                        "Create a class named TreeLog that implements the Load interface. This class is empty but you may add properties.",
                      ],
                    },
                    {
                      title: "RefrigeratedStorage",
                      items: [
                        "Create a class named RefrigeratedStorage that implements the Load interface. This class is empty but you may add properties.",
                      ],
                    },
                    {
                      title: "Truck",
                      items: [
                        "Create a final class named Truck. Instances of this Truck class should be specialized in the way they handle freight transport.",
                        "Use a generic type parameter in the class definition. The generic parameter must have the Load interface as its upper bound.",
                        "Each truck carries freight defined by an ArrayList instance variable with elements of the generic type parameter. Do not use the Load interface as the element type.",
                        "The exact type of the load instance variable is determined at instantiation time when a variable of the Truck class is declared.",
                      ],
                    },
                  ],
                },
                {
                  title: "Truck properties",
                  steps: [
                    {
                      title: "freight",
                      items: [
                        "A member variable of type ArrayList named freight. The ArrayList stores objects of the generic type defined in the class definition.",
                      ],
                    },
                    {
                      title: "load(..)",
                      items: [
                        "A method named load(..) that loads one object onto the truck and adds it to the freight list.",
                        "The object is passed in as an argument and must be of the generic type defined in the class definition.",
                      ],
                    },
                    {
                      title: "unload(...)",
                      items: [
                        "A method named unload(...) which expects an index of the element in the freight list to be removed.",
                        "The removed element is returned by the method.",
                      ],
                    },
                  ],
                },
                {
                  title: "Solution Note",
                  paragraphs: [
                    "The completed solution below fills the Canvas blanks shown in the partial solution: Load, Car, implements, Load, implements, Load, implements, Load, <T extends Load>, <T>, <T>, and T.",
                    "The unload method uses remove(index) so the method both removes and returns the selected freight item, matching the written assignment requirement.",
                  ],
                },
              ],
            },
            codeBlocks: [
              {
                title: "Completed Truck Generics Solution",
                language: "java",
                code: `import java.util.ArrayList;

interface Load {
}

class Car implements Load {
}

class TreeLog implements Load {
}

class RefrigeratedStorage implements Load {
}

public final class Truck<T extends Load> {
    private ArrayList<T> freight = new ArrayList<T>();

    public void load(T item) {
        this.freight.add(item);
    }

    public T unload(int index) {
        return this.freight.remove(index);
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
