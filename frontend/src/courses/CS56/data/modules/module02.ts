import type { CS56ModuleBlueprint } from "../types";

export const cs56Module02Blueprint = {
  id: 2,
  title: "Inheritance",
  weekLabel: "Module 2",
  dateLabel: "June 25-28",
  overview:
    "This module moves from Java review into inheritance. It covers superclass/subclass relationships, packages, access levels, constructors with the super keyword, and abstract classes.",
  topicLine:
    "Inheritance, packages, access control, constructors, super, and abstract classes",
  focusAreas: [
    "Superclass and subclass design",
    "Package organization",
    "Public, private, protected, and package-private access",
    "Constructors and the super keyword",
    "Abstract classes",
  ],
  objectivesAligned: [
    "Explain how inheritance reuses and specializes behavior",
    "Organize Java classes with packages",
    "Choose appropriate access levels for fields and methods",
    "Use constructors and super to initialize inherited state",
    "Design abstract base classes for shared contracts",
  ],
  outcomeAlignment: [
    "Build object-oriented Java programs with inheritance hierarchies",
    "Reason about visibility and initialization across related classes",
    "Prepare for more advanced polymorphism and interface work",
  ],
  syllabusContext: [
    "Module: Inheritance includes overview, lecture, reading, quizzes, and a discussion task",
    "Visible Canvas deadlines: Discussion due Jun 25; inheritance quizzes due Jun 28",
  ],
  starterTasks: [
    "Review Inheritance: Overview",
    "Complete inheritance lecture pages and quizzes",
    "Read the Inheritance reading",
    "Participate in Discussion: Inheritance",
  ],
  artifacts: [
    "Inheritance quiz submissions",
    "Discussion: Inheritance post",
    "Reading notes for inheritance concepts",
  ],
  importantDates: [
    "Jun 25 - Discussion: Inheritance",
    "Jun 28 - Quiz - Inheritance",
    "Jun 28 - Quiz - Packages",
    "Jun 28 - Quiz - Access Levels",
    "Jun 28 - Quiz - Inheritance: Constructors & super",
    "Jun 28 - Quiz - Abstract Classes",
  ],
  assessmentContext: [
    "Discussion: Inheritance - 5 pts",
    "Quiz - Inheritance - 3 pts",
    "Quiz - Packages - 3 pts",
    "Quiz - Access Levels - 3 pts",
    "Quiz - Inheritance: Constructors & super - 3 pts",
    "Quiz - Abstract Classes - 3 pts",
  ],
  milestone: "Inheritance lecture sequence and discussion completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Start with the inheritance overview and connect the module to Java OOP review.",
    },
    {
      step: "Lecture",
      description:
        "Work through inheritance, packages, access levels, constructors with super, and abstract classes.",
    },
    {
      step: "Tasks",
      description:
        "Complete quizzes, read the inheritance material, and submit the discussion.",
    },
  ],
  readingHighlights: [
    "Inheritance: Overview",
    "Reading: Inheritance",
    "Lecture pages on inheritance, packages, access levels, constructors, super, and abstract classes",
  ],
  canvasSections: [
    {
      id: "inheritance",
      title: "Module: Inheritance",
      groups: [
        {
          items: [
            {
              title: "Inheritance: Overview",
              type: "page",
            },
          ],
        },
        {
          title: "Lecture",
          defaultCollapsed: true,
          items: [
            {
              title: "Lecture: Inheritance",
              type: "page",
            },
            {
              title: "Quiz - Inheritance",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Packages",
              type: "page",
            },
            {
              title: "Quiz - Packages",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Access Levels",
              type: "page",
            },
            {
              title: "Quiz - Access Levels",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Constructors & super Keyword",
              type: "page",
            },
            {
              title: "Quiz - Inheritance: Constructors & super",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Lecture: Abstract Classes",
              type: "page",
            },
            {
              title: "Quiz - Abstract Classes",
              type: "quiz",
              dueLabel: "Jun 28",
              pointsLabel: "3 pts",
            },
            {
              title: "Reading: Inheritance",
              type: "page",
            },
          ],
        },
        {
          title: "Tasks",
          items: [
            {
              title: "Discussion: Inheritance",
              type: "discussion",
              dueLabel: "Jun 25",
              pointsLabel: "5 pts",
              details: {
                intro:
                  "Let's ensure that everyone of us understands this module's subject well and is confident applying inheritance when needed. Complete the following tasks:",
                steps: [
                  {
                    label: "By Thursday",
                    text: "Submit a question on this module's subject.",
                    pointsLabel: "2 points",
                  },
                  {
                    label: "By Sunday",
                    text: "Select a question from one of your classmates and provide a thorough response. Ensure your answer is at least two sentences long and includes an example where relevant.",
                    pointsLabel: "3 points",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  textTasks: [
    {
      id: "module-2-inheritance-discussion",
      title: "Discussion: Inheritance",
      objective:
        "Participate in the inheritance discussion after completing the lecture and reading materials.",
      tasks: [
        "Review inheritance, packages, access levels, constructors, super, and abstract classes",
        "Complete the inheritance quizzes",
        "Post the inheritance discussion response by Jun 25",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas discussion",
        "Due: Jun 25",
        "5 points",
      ],
    },
  ],
} satisfies CS56ModuleBlueprint;
