import type { CS56ModuleBlueprint } from "../types";

export const cs56Module10CanvasSections = [
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
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
