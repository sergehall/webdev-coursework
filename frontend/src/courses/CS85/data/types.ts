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
