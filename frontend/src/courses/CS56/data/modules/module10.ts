import type { CS56ModuleBlueprint } from "../types";

export const cs56Module10Blueprint = {
  id: 10,
  title: "Networking",
  weekLabel: "Module 10",
  dateLabel: "July 19",
  overview:
    "This module introduces networking concepts for Java applications. It covers client-server applications, web applications, networking code examples, and a discussion task.",
  topicLine: "Networking, client-server applications, and web applications",
  focusAreas: [
    "Client-server applications",
    "Web applications",
    "Java networking code examples",
    "Networking discussion",
  ],
  objectivesAligned: [
    "Explain the structure of client-server applications",
    "Describe how web applications fit into networking concepts",
    "Review Java networking examples",
    "Participate in the networking discussion",
  ],
  outcomeAlignment: [
    "Prepare for network-aware Java programs",
    "Connect Java application structure to client-server and web communication",
  ],
  syllabusContext: [
    "Module: Networking includes overview, lecture pages, quizzes, code examples, and a discussion task",
    "Visible Canvas deadlines: networking quizzes due Jul 19 and Discussion: Networking due Jul 16",
  ],
  starterTasks: [
    "Review Networking Overview",
    "Complete the client-server and web application lecture sequence",
    "Complete the Client-Server Application and Web Application quizzes",
    "Review ChatClient.java and EchoServer.java",
    "Post on Discussion: Networking",
  ],
  artifacts: [
    "Quiz: Client-Server Application",
    "Quiz: Web Application",
    "ChatClient.java",
    "EchoServer.java",
    "Discussion: Networking",
  ],
  importantDates: [
    "Jul 16 - Discussion: Networking",
    "Jul 19 - Quiz: Client-Server Application",
    "Jul 19 - Quiz: Web Application",
  ],
  assessmentContext: [
    "Quiz: Client-Server Application - 3 pts",
    "Quiz: Web Application - 4 pts",
    "Discussion: Networking - 5 pts",
  ],
  milestone:
    "Networking lectures, quizzes, code examples, and discussion completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Start with the networking overview and connect the module to Java communication patterns.",
    },
    {
      step: "Lecture",
      description: "Study client-server applications and web applications.",
    },
    {
      step: "Examples",
      description: "Review ChatClient.java and EchoServer.java.",
    },
    {
      step: "Tasks",
      description:
        "Complete the quizzes and Discussion: Networking by the Canvas due dates.",
    },
  ],
  readingHighlights: [
    "Networking Overview",
    "Lecture: Client Server Application",
    "Lecture: Web Application",
    "ChatClient.java",
    "EchoServer.java",
  ],
  canvasSections: [
    {
      id: "networking",
      title: "Module: Networking",
      groups: [
        {
          items: [
            {
              title: "Networking Overview",
              type: "page",
            },
          ],
        },
        {
          title: "Lecture",
          items: [
            {
              title: "Lecture: Client Server Application",
              type: "page",
            },
            {
              title: "Quiz: Client-Server Application",
              type: "quiz",
              dueLabel: "Jul 19",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Web Application",
              type: "page",
            },
            {
              title: "Quiz: Web Application",
              type: "quiz",
              dueLabel: "Jul 19",
              pointsLabel: "4 pts",
            },
          ],
        },
        {
          title: "Code Example",
          items: [
            {
              title: "ChatClient.java",
              type: "attachment",
            },
            {
              title: "EchoServer.java",
              type: "attachment",
            },
          ],
        },
        {
          title: "Tasks",
          items: [
            {
              title: "Discussion: Networking",
              type: "discussion",
              dueLabel: "Jul 16",
              pointsLabel: "5 pts",
              defaultCollapsed: true,
              description:
                "Discussion details will be filled in separately after the module shell matches Canvas.",
            },
          ],
        },
      ],
    },
  ],
  textTasks: [
    {
      id: "module-10-networking",
      title: "Discussion: Networking",
      objective:
        "Complete the Networking module after reviewing client-server applications, web applications, and Java networking code examples.",
      tasks: [
        "Review Networking Overview",
        "Complete the networking lecture and quiz sequence",
        "Review ChatClient.java and EchoServer.java",
        "Post on Discussion: Networking by Jul 16",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Jul 16",
        "5 points",
        "Discussion content will be added separately",
      ],
    },
  ],
} satisfies CS56ModuleBlueprint;
