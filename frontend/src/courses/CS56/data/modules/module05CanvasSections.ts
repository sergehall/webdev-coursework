import type { CS56ModuleBlueprint } from "../types";

export const cs56Module05CanvasSections = [
  {
    id: "exceptions",
    title: "Module: Exceptions",
    groups: [
      {
        items: [
          {
            title: "Exception: Overview",
            type: "page",
            defaultCollapsed: true,
            prompt: {
              title: "Welcome to Module: Exceptions",
              sections: [
                {
                  title: "Welcome",
                  paragraphs: [
                    "Get ready to tackle one of the most critical aspects of Java programming: handling exceptions. This module is all about empowering you to write robust and resilient code that can gracefully handle the unexpected. Imagine the confidence you will gain knowing your program can stay afloat even when things go awry.",
                  ],
                },
                {
                  title: "Here's what you'll dive into",
                  steps: [
                    {
                      title: "Exception classes",
                      items: [
                        "Explore the different types of exceptions in Java and understand how they help identify and manage errors.",
                      ],
                    },
                    {
                      title: "Declaring methods that may throw exceptions",
                      items: [
                        "Learn how to signal potential issues in your methods, making your code more predictable and easier to debug.",
                      ],
                    },
                    {
                      title: "Throwing exceptions",
                      items: [
                        "Master the art of generating exceptions to handle specific error conditions effectively.",
                      ],
                    },
                    {
                      title: "try-catch blocks",
                      items: [
                        "Discover how to encapsulate risky code and handle errors gracefully, ensuring your program continues to run smoothly.",
                      ],
                    },
                    {
                      title: "try-catch blocks with auto-closable",
                      items: [
                        "Automate resource management and prevent resource leaks with the power of auto-closable in your try-catch blocks.",
                      ],
                    },
                  ],
                },
                {
                  title: "Tasks",
                  paragraphs: [
                    "Watch the lectures, take the quizzes, and complete the assignment.",
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
            title: "Lecture: The try-catch Block",
            type: "page",
          },
          {
            title: "Quiz: Try-Catch Block",
            type: "quiz",
            dueLabel: "Jul 5",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Exception Classes",
            type: "page",
          },
          {
            title: "Quiz: Exception Classes",
            type: "quiz",
            dueLabel: "Jul 5",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: The finally Block",
            type: "page",
          },
          {
            title: "Quiz: finally",
            type: "quiz",
            dueLabel: "Jul 5",
            pointsLabel: "2 pts",
          },
          {
            title: "Lecture: Exceptions with AutoClosable",
            type: "page",
          },
          {
            title: "Exceptions: Reading",
            type: "page",
          },
        ],
      },
      {
        title: "Code Example",
        items: [
          {
            title: "DivideByZeroException.java",
            type: "attachment",
          },
          {
            title: "Mathematics.java",
            type: "attachment",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Assignment: Exceptions",
            type: "assignment",
            dueLabel: "Jul 5",
            pointsLabel: "10 pts",
            scoreLabel: "Score: 10 / 10 pts",
            defaultCollapsed: true,
            description:
              "Implement an application that represents a valet parking system which manages 10 parking spots.",
            prompt: {
              title: "Assignment: Exceptions",
              sections: [
                {
                  title: "Question 1 - 10 pts",
                  paragraphs: [
                    "Implement an application that represents a valet parking system which manages 10 parking spots. Create the classes Car.java, NoSpaceAvailableException.java, NoCarException.java, and Valet.java.",
                  ],
                },
                {
                  title: "Class Requirements",
                  steps: [
                    {
                      title: "Car.java",
                      items: [
                        "Create a class named Car with two instance variables for make and model with appropriate accessibility levels.",
                        "Add getter and setter methods for each member variable.",
                        "Override the toString() method of java.lang.Object with an appropriate description of a vehicle.",
                      ],
                    },
                    {
                      title: "NoSpaceAvailableException.java",
                      items: [
                        "Create a new exception class used when no parking spot is available.",
                      ],
                    },
                    {
                      title: "NoCarException.java",
                      items: [
                        "Create a new exception class used when a requested spot is invalid or empty.",
                      ],
                    },
                    {
                      title: "Valet.java",
                      items: [
                        "Represent the 10 valet parking spots with an array. Initially, all 10 spots are available.",
                        "Implement void park(Car car) throws NoSpaceAvailableException. It parks the car in the next available spot. If no spot is available, throw NoSpaceAvailableException.",
                        "Implement Car get(int spot) throws NoCarException. It returns the car stored at the specified index. If the index is out of bounds or the spot is empty, throw NoCarException.",
                        "Implement Car leave(int spot) throws NoCarException. It removes and returns the car at the specified spot. If the index is out of bounds or the spot is empty, throw NoCarException.",
                      ],
                    },
                  ],
                },
                {
                  title: "Solution Note",
                  paragraphs: [
                    'The code below shows the completed solution. Inline comments marked "inserted answer" identify the parts that were filled into the gray Canvas answer boxes.',
                  ],
                },
              ],
            },
            codeBlocks: [
              {
                title: "Completed Valet Parking Exception Solution",
                language: "java",
                code: `public class Car { // inserted answer: Car
    private String make;
    private String model;

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public String toString() {
        return String.format("%s %s", make, model);
    }
}

class NoSpaceAvailableException extends Exception { // inserted answers: extends, Exception
}

class NoCarException extends Exception { // inserted answers: extends, Exception
}

class Valet {
    private Car[] spots = new Car[10]; // inserted answer: new Car[10]

    public void park(Car car) throws NoSpaceAvailableException { // inserted answers: throws, NoSpaceAvailableException
        for (int i = 0; i < spots.length; i++) {
            if (spots[i] == null) {
                spots[i] = car;
                return;
            }
        }
        throw new NoSpaceAvailableException(); // inserted answers: throw, NoSpaceAvailableException()
    }

    public Car get(int spot) throws NoCarException { // inserted answers: throws, NoCarException
        if (spot < 0 || spot >= spots.length || spots[spot] == null) { // inserted answer: spots[spot]
            throw new NoCarException(); // inserted answers: throw, NoCarException()
        }
        return spots[spot];
    }

    public Car leave(int spot) throws NoCarException { // inserted answers: throws, NoCarException
        Car car = get(spot);
        spots[spot] = null; // inserted answer: null
        return car;
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
