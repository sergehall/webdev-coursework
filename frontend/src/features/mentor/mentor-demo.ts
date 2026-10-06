export type LearnerProfile = {
  goal: "frontend" | "backend" | "full-stack" | "explore";
  level: "beginner" | "foundations" | "building-projects";
  hours: number;
  outcome: string;
};
export const goalLabels = {
  frontend: "Frontend development",
  backend: "Backend development",
  "full-stack": "Full-stack engineering",
  explore: "Explore web development",
};
export type Milestone = {
  id: string;
  week: number;
  title: string;
  doneWhen: string;
  hours: number;
};
export type DemoScenario =
  | "normal"
  | "unavailable"
  | "quota"
  | "timeout"
  | "invalid-plan"
  | "conflict";
export type Message = {
  id: number | string;
  role: "user" | "assistant";
  text: string;
  partial?: boolean;
};

// Proposed practice, not claims about published coursework or learner progress.
export function createExamplePath(profile: LearnerProfile): Milestone[] {
  const foundations = profile.level === "beginner";
  const backend = profile.goal === "backend";
  const fullstack = profile.goal === "full-stack";
  const topics: [string, string][] = foundations
    ? [
        [
          "Give a page its structure",
          "Build a page with a heading, navigation, main content, and a footer.",
        ],
        [
          "Make it work on a small screen",
          "At 375px, the text is readable and the page has no horizontal scrolling.",
        ],
        [
          "Learn JavaScript through a tiny interaction",
          "A button updates one paragraph without reloading the page.",
        ],
        [
          "Build a small task list",
          "You can add a task, mark it complete, and remove it.",
        ],
      ]
    : [
        [
          "Take stock of your foundations",
          "Build a small responsive page and explain its HTML, CSS, and JavaScript.",
        ],
        [
          "Make interactions accessible",
          "Every control works with a keyboard and has a visible focus state.",
        ],
        [
          "Work with a data request",
          "Display loading, success, and error states for a sample JSON request.",
        ],
        [
          "Test one important interaction",
          "An automated test covers both a successful action and a failed action.",
        ],
      ];
  topics.push(
    ...(backend || fullstack
      ? [
          [
            "Design one small API",
            "Write a request and response example, including invalid input.",
          ] as [string, string],
          [
            "Follow data from request to storage",
            "Explain validation, storage, and a useful error response for one resource.",
          ] as [string, string],
        ]
      : [
          [
            "Connect interface and data",
            "A small interface displays sample data and handles an empty result.",
          ] as [string, string],
          [
            "Review accessibility and errors",
            "Check labels, keyboard navigation, contrast, and an unavailable-data state.",
          ] as [string, string],
        ])
  );
  topics.push(
    [
      "Use AI as a reviewer",
      "Ask AI for feedback, verify one suggestion, and explain your decision.",
    ],
    [
      "Share what you built",
      "Prepare a working demo and a README explaining one decision and one limitation.",
    ]
  );
  return topics.map(([title, doneWhen], i) => ({
    id: `example-${profile.level}-${profile.goal}-${i}`,
    week: Math.floor(i / 2) + 1,
    title,
    doneWhen,
    hours: profile.hours / 2,
  }));
}

export function exampleReply(input: string, profile: LearnerProfile) {
  if (/already|completed|mark.*done/i.test(input))
    return "Your progress belongs to you. Review the completion criteria in My path, then mark a step done when you have demonstrated it. The portfolio author's coursework does not count as your own completion.";
  if (/easier|less|busy|time/i.test(input))
    return `Start with one small outcome and stop there. With ${profile.hours} hours a week, split your time between trying it yourself and checking the result. You can edit your learning profile to change the time budget; an accepted plan stays unchanged until you review and accept its replacement.`;
  if (/explain|step|start/i.test(input))
    return "Start with the next unfinished step in My path. Read its completion criterion, try a small version yourself, and check it in the browser. If you use AI for a hint, explain the result in your own words before moving on.";
  return "In this preview, replies are examples rather than answers from a live model. Try ‘Explain my next step’ or ‘Make this easier’ to explore the experience. Your real pathway will connect your goal, available time, and verified coursework materials.";
}
