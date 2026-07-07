import type { CS56ModuleBlueprint } from "../types";

import { cs56Module10CanvasSections } from "./module10CanvasSections";
import { cs56Module10TextTasks } from "./module10TextTasks";

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
  canvasSections: cs56Module10CanvasSections,
  textTasks: cs56Module10TextTasks,
} satisfies CS56ModuleBlueprint;
