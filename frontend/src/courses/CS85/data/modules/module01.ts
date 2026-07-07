import { createModule, standardAssessmentContext } from "../moduleFactory";

export const cs85Module01Blueprint = {
  ...createModule(
    1,
    "Introduction to PHP and IDE Configuration",
    "Week 1",
    "Mon, Jun 22-Sun, Jun 28, 2026",
    "Sunday, June 28, 2026 at 11:59 PM",
    [
      "Course orientation and Canvas workflow",
      "Laravel Herd setup",
      "VS Code, Git, GitHub, and Chrome developer tools",
      "PHP runtime basics",
      "Attendance-confirming Week 1 work",
    ],
    [
      "Log into Canvas starting June 22, 2026",
      "Open SMC 2026 Sum - CS 85 - PHP Programming",
      "Join or bookmark the Slack workspace",
      "Install or verify Laravel Herd, VS Code, Git, GitHub, and Chrome",
      "Complete the mandatory Module 1 assignment by June 28, 2026",
    ],
    "Development environment ready and Week 1 attendance requirement completed"
  ),
  overview:
    "This opening module gets the course, tooling, and attendance requirement moving. The priority is to enter Canvas, confirm the course workflow, set up the local development environment, and submit the mandatory Module 1 work by Sunday, June 28, 2026 at 11:59 PM.",
  assessmentContext: [
    "Module 1 assignment is mandatory for attendance.",
    "Failure to complete Week 1 assignments by June 28, 2026 may result in being dropped.",
    ...standardAssessmentContext,
  ],
  textTasks: [
    {
      id: "getting-started-first-steps",
      title: "Getting Started: First Steps",
      objective:
        "Confirm access to every system needed for the 6-week CS 85 workflow.",
      tasks: [
        "Log into Canvas at https://online.smc.edu/ starting June 22, 2026.",
        "Select SMC 2026 Sum - CS 85 - PHP Programming.",
        "Bookmark the Slack workspace: smccs85sum2026.slack.com.",
        "Install or verify Laravel Herd, VS Code, Git, GitHub, and Google Chrome.",
        "Create a local notes area for assignments, screenshots, and AI-use disclosures.",
      ],
      submissionInstructions: [
        "Follow the exact Module 1 Canvas submission instructions.",
        "Complete the Module 1 assignment by Sunday, June 28, 2026 at 11:59 PM.",
        "This assignment confirms attendance and your place in the class.",
      ],
      whyItMattersHeading: "Attendance Requirement",
      whyItMatters:
        "CS 85 is a fast-paced 6-week course. The syllabus states that students who do not complete the first week's work may be dropped, so the setup work is both technical preparation and enrollment confirmation.",
      resourceSections: [
        {
          title: "Course Links",
          items: [
            "Canvas: https://online.smc.edu/",
            "Slack: smccs85sum2026.slack.com",
            "Department: smc.edu/AcademicPrograms/CSIS",
          ],
        },
        {
          title: "Development Environment",
          items: ["Laravel Herd", "VS Code", "Git and GitHub", "Google Chrome"],
        },
      ],
    },
  ],
};
