export type CS85TextTask = {
  id: string;
  title: string;
  objective?: string;
  tasks?: string[];
  submissionInstructions?: string[];
  whyItMattersHeading?: string;
  whyItMatters?: string;
  resourceSections?: Array<{
    title: string;
    items: string[];
  }>;
};

export type CS85ModuleBlueprint = {
  id: number;
  title: string;
  weekLabel: string;
  dateLabel: string;
  dueLabel: string;
  overview: string;
  topicLine: string;
  focusAreas: string[];
  objectivesAligned: string[];
  outcomeAlignment: string[];
  syllabusContext: string[];
  starterTasks: string[];
  artifacts: string[];
  importantDates: string[];
  assessmentContext: string[];
  milestone: string;
  isFinalProject?: boolean;
  moduleSummary?: Array<{
    step: string;
    description: string;
  }>;
  textTasks?: CS85TextTask[];
};

export const cs85CourseReference = {
  courseTitle: "CS 85 – PHP Programming",
  sessionLabel: "Summer 2026 • 6-Week Session • Online",
  instructor: "Vicky Seno",
  instructorEmail: "seno_vicky@smc.edu",
  facultyOffice: "BUS 220J",
  facultyPhone: "(310) 434-4819",
  officeHours: "Online, by appointment via Zoom or Slack",
  slackWorkspace: "smccs85sum2026.slack.com",
  canvasUrl: "https://online.smc.edu/",
  canvasCourse: "SMC 2026 Sum - CS 85 - PHP Programming",
  departmentWebsite: "smc.edu/AcademicPrograms/CSIS",
  requiredTextbook:
    "SMC: PHP and MySQL Web Development — material provided via Canvas",
  catalogDescription:
    "This course teaches how to design and write applications that extend Web servers. These applications process data submitted from Web forms and access back-end databases to dynamically generate Web pages using PHP and MySQL.",
  prerequisiteSkills: "HTML/CSS scripting",
  developmentTools: [
    "Laravel Herd",
    "VS Code",
    "Git and a free GitHub account",
    "Google Chrome developer tools",
    "PHP, MySQL, Composer, and Laravel",
  ],
  certificates: [
    "Computer Programming",
    "Database Applications",
    "Web Programmer",
  ],
  courseObjectives: [
    "Write server-side scripts in the PHP language.",
    "Process user data submitted from Web forms.",
    "Design and create databases for Web applications.",
    "Design and implement 3-tier Web apps using PHP and MySQL.",
  ],
  studentLearningOutcomes: [
    "Write PHP server-side scripts that process online form data and access MySQL databases to create dynamic Web pages.",
    "Define and use cookies, redirection, and sessions to implement Web applications.",
  ],
  gradingBreakdown: [
    "Quizzes — 40%",
    "Weekly assignments and discussions — 40%",
    "Final project — 20%",
  ],
  gradeScale: [
    "A — 90-100%",
    "B — 80-89%",
    "C — 70-79%",
    "D — 60-69%",
    "F — 0-59%",
  ],
  importantSessionDates: [
    "6-week session begins: Monday, June 22, 2026",
    "Refund deadline: Friday, June 26, 2026",
    "Class census day: Tuesday, June 30, 2026",
    "Withdraw and avoid W deadline: Saturday, July 4, 2026",
    "Class 60% day: Thursday, July 16, 2026",
    "Guaranteed W deadline: Wednesday, July 22, 2026",
    "Pass/No Pass deadline: Friday, July 31, 2026",
    "Final exam window: Monday, July 27-Friday, July 31, 2026",
    "6-week session ends: Friday, July 31, 2026",
    "Grades due from faculty: Friday, August 7, 2026",
  ],
  coursePolicies: [
    "The course is fully asynchronous and online through Canvas.",
    "Two modules are released each Monday during the 6-week session.",
    "Each module has reading, assignments, discussions, quizzes, and project guidance in Canvas.",
    "Late work has a 10% penalty for 1-3 days late and a 20% penalty for 4+ days late.",
    "AI tools are allowed when disclosed with which tools were used and how.",
    "Students who do not complete Week 1 work or miss two consecutive weeks may be dropped without notice.",
  ],
} as const;

const weeklyAssignmentContext = [
  "Confirm the current Canvas module instructions before submitting.",
  "Track reading notes, code experiments, screenshots, and reflection notes here as assignments are released.",
  "Disclose AI assistance when used, including the tool and how it supported the work.",
];

const standardAssessmentContext = [
  "Canvas module assignment — details to be filled as released",
  "Canvas discussion or engagement activity — details to be filled as released",
  "Canvas quiz — details to be filled as released",
  "Course grading context: quizzes 40%, weekly assignments/discussions 40%, final project 20%",
];

const createModule = (
  id: number,
  title: string,
  weekLabel: string,
  dateLabel: string,
  dueLabel: string,
  focusAreas: string[],
  starterTasks: string[],
  milestone: string,
  isFinalProject = false
): CS85ModuleBlueprint => ({
  id,
  title,
  weekLabel,
  dateLabel,
  dueLabel,
  overview: `${title} anchors ${weekLabel.toLowerCase()} of CS 85. This portal entry captures the syllabus topic now and leaves room to add Canvas assignment details, code artifacts, screenshots, quiz notes, and reflection once the module opens.`,
  topicLine: `Scheduled topic: ${title}`,
  focusAreas,
  objectivesAligned: [
    "Write practical server-side PHP code.",
    "Connect PHP concepts to dynamic web application behavior.",
    "Build toward a portfolio-ready Laravel final project.",
  ],
  outcomeAlignment: [
    "Process data from online forms and web requests.",
    "Use PHP with MySQL to generate dynamic web pages.",
    "Apply modern server-side development workflow habits.",
  ],
  syllabusContext: [
    "CS 85 Summer 2026 is a fast-paced 6-week online Canvas course.",
    "Two modules are released each Monday.",
    "Late work is accepted with syllabus penalties unless accommodations apply.",
    "AI usage must be disclosed when used on assignments.",
  ],
  starterTasks,
  artifacts: [
    "Canvas assignment submission",
    "Development notes and code snippets",
    "Screenshots or terminal output when required",
    "AI-use disclosure note when applicable",
  ],
  importantDates: [
    `${dateLabel} — module start window`,
    `${dueLabel} — expected Canvas deadline checkpoint`,
  ],
  assessmentContext: standardAssessmentContext,
  milestone,
  isFinalProject,
  moduleSummary: [
    {
      step: "Read",
      description:
        "Review the Canvas module materials and record the exact assignment requirements here.",
    },
    {
      step: "Build",
      description:
        "Complete the PHP, MySQL, Composer, or Laravel work for the module.",
    },
    {
      step: "Submit",
      description:
        "Submit through Canvas and keep a local record of files, screenshots, notes, and AI disclosure.",
    },
  ],
  textTasks: [
    {
      id: `module-${id}-canvas-assignment-shell`,
      title: `Module ${id}: Assignment Shell`,
      objective:
        "Hold the official Canvas instructions, deliverables, and notes once this module assignment is released.",
      tasks: weeklyAssignmentContext,
      submissionInstructions: [
        "Submit through SMC Canvas.",
        `Target checkpoint: ${dueLabel}.`,
        "Do not submit by email unless the instructor explicitly requests it.",
      ],
      whyItMatters:
        "This keeps the course portal ready on day one while preserving space for the real assignment text, code samples, rubric details, and reflections as they arrive.",
    },
  ],
});

export const cs85ModuleBlueprints: CS85ModuleBlueprint[] = [
  {
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
            items: [
              "Laravel Herd",
              "VS Code",
              "Git and GitHub",
              "Google Chrome",
            ],
          },
        ],
      },
    ],
  },
  createModule(
    2,
    "Control Structures & Arrays",
    "Week 1",
    "Mon, Jun 22-Sun, Jun 28, 2026",
    "Sunday, June 28, 2026 at 11:59 PM",
    [
      "Conditional logic",
      "Loops",
      "Indexed arrays",
      "Associative arrays",
      "Basic PHP program flow",
    ],
    [
      "Review Canvas readings for control structures and arrays",
      "Practice small PHP scripts with branching and iteration",
      "Capture any required screenshots or output",
    ],
    "Basic PHP control flow and array practice completed"
  ),
  createModule(
    3,
    "Handling Web Requests",
    "Week 2",
    "Mon, Jun 29-Sun, Jul 5, 2026",
    "Sunday, July 5, 2026 at 11:59 PM",
    [
      "HTTP request handling",
      "Form input processing",
      "GET and POST data",
      "Input validation",
      "Secure contact form flow",
    ],
    [
      "Review Canvas materials for handling web requests",
      "Stage notes for the form review assignment",
      "Prepare implementation space for the secure product contact form",
    ],
    "Handling web requests module shell ready for Canvas details"
  ),
  createModule(
    4,
    "Object Oriented PHP",
    "Week 2",
    "Mon, Jun 29-Sun, Jul 5, 2026",
    "Sunday, July 5, 2026 at 11:59 PM",
    [
      "Classes and objects",
      "Properties and methods",
      "Constructors",
      "Encapsulation",
      "Object-oriented design habits",
    ],
    [
      "Review object-oriented PHP syntax",
      "Model a simple domain with classes",
      "Connect OOP practice to Laravel conventions",
    ],
    "Core object-oriented PHP concepts ready for framework work"
  ),
  createModule(
    5,
    "Forms & HTTP Requests",
    "Week 3",
    "Mon, Jul 6-Sun, Jul 12, 2026",
    "Sunday, July 12, 2026 at 11:59 PM",
    [
      "HTML form handling",
      "GET and POST requests",
      "Input validation",
      "Request/response flow",
      "User-submitted data",
    ],
    [
      "Practice processing form data in PHP",
      "Document validation and sanitization decisions",
      "Capture request/response behavior for notes",
    ],
    "Form submission flow implemented and documented"
  ),
  createModule(
    6,
    "Composer",
    "Week 3",
    "Mon, Jul 6-Sun, Jul 12, 2026",
    "Sunday, July 12, 2026 at 11:59 PM",
    [
      "PHP dependency management",
      "Composer project structure",
      "Autoloading",
      "Package installation",
      "Modern PHP workflow",
    ],
    [
      "Install or verify Composer through the course toolchain",
      "Review autoloading concepts",
      "Track package commands used for the assignment",
    ],
    "Composer workflow understood and ready for Laravel"
  ),
  createModule(
    7,
    "Intro to Laravel",
    "Week 4",
    "Mon, Jul 13-Sun, Jul 19, 2026",
    "Sunday, July 19, 2026 at 11:59 PM",
    [
      "Laravel project structure",
      "Artisan basics",
      "Framework conventions",
      "Local development with Herd",
      "Portfolio app foundation",
    ],
    [
      "Create or open the Laravel project specified in Canvas",
      "Run the app locally",
      "Record Artisan commands and setup notes",
    ],
    "Laravel app foundation running locally"
  ),
  createModule(
    8,
    "Routing and Views",
    "Week 4",
    "Mon, Jul 13-Sun, Jul 19, 2026",
    "Sunday, July 19, 2026 at 11:59 PM",
    [
      "Laravel routes",
      "Controllers",
      "Blade views",
      "Template data flow",
      "Page organization",
    ],
    [
      "Map requested pages to Laravel routes",
      "Create or update Blade views",
      "Document route names and view files",
    ],
    "Laravel pages routed and rendered with views"
  ),
  createModule(
    9,
    "Databases",
    "Week 5",
    "Mon, Jul 20-Sun, Jul 26, 2026",
    "Sunday, July 26, 2026 at 11:59 PM",
    [
      "MySQL database design",
      "Laravel database configuration",
      "Migrations",
      "Tables and columns",
      "Data model planning",
    ],
    [
      "Review database setup instructions in Canvas",
      "Design the tables needed for the assignment or project",
      "Save migration and schema notes",
    ],
    "Database structure planned and implemented"
  ),
  createModule(
    10,
    "Database Operations",
    "Week 5",
    "Mon, Jul 20-Sun, Jul 26, 2026",
    "Sunday, July 26, 2026 at 11:59 PM",
    [
      "Create, read, update, delete flows",
      "Query building",
      "Eloquent basics",
      "Validation around persistence",
      "Dynamic web application behavior",
    ],
    [
      "Implement the database operations requested in Canvas",
      "Test insert, update, delete, and display behavior",
      "Capture before/after states when screenshots are required",
    ],
    "Dynamic database-backed behavior working"
  ),
  createModule(
    11,
    "Core Features",
    "Week 6",
    "Mon, Jul 27-Fri, Jul 31, 2026",
    "Friday, July 31, 2026 by Canvas deadline",
    [
      "Application feature completion",
      "Sessions, redirects, and cookies where assigned",
      "Laravel feature integration",
      "AI feature planning or integration",
      "Final project readiness",
    ],
    [
      "Prioritize final-week Canvas instructions",
      "Complete required core project features",
      "Document AI feature usage and disclosure where applicable",
    ],
    "Core application features completed for final project polish",
    true
  ),
  createModule(
    12,
    "Project Polish",
    "Week 6",
    "Mon, Jul 27-Fri, Jul 31, 2026",
    "Friday, July 31, 2026 by Canvas deadline",
    [
      "Final project refinement",
      "Portfolio readiness",
      "Bug fixes",
      "Usability pass",
      "Submission packaging",
    ],
    [
      "Review final project requirements in Canvas",
      "Polish the Laravel application and AI feature",
      "Prepare final submission artifacts",
    ],
    "Portfolio-ready Laravel final project submitted",
    true
  ),
];
