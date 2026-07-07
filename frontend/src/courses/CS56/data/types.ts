export type CS56ModuleBlueprint = {
  id: number;
  title: string;
  weekLabel: string;
  dateLabel: string;
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
  moduleSummary: Array<{
    step: string;
    description: string;
  }>;
  readingHighlights: string[];
  canvasSections?: Array<{
    id: string;
    title: string;
    groups: Array<{
      title?: string;
      defaultCollapsed?: boolean;
      items: Array<{
        title: string;
        type: "page" | "quiz" | "discussion" | "assignment" | "attachment";
        dueLabel?: string;
        pointsLabel?: string;
        scoreLabel?: string;
        defaultCollapsed?: boolean;
        description?: string;
        note?: string;
        prompt?: {
          title: string;
          sections: Array<{
            title: string;
            paragraphs?: string[];
            steps?: Array<{
              title: string;
              items: string[];
            }>;
            output?: string[];
          }>;
        };
        details?: {
          intro?: string;
          steps: Array<{
            label: string;
            text: string;
            pointsLabel?: string;
          }>;
        };
        codeBlocks?: Array<{
          title: string;
          language: string;
          code: string;
        }>;
        expectedOutput?: string[];
        rubric?: {
          title: string;
          rows: Array<{
            criterion: string;
            pointsLabel: string;
            ratings: Array<{
              label: string;
              description?: string;
              pointsLabel: string;
            }>;
          }>;
        };
        previewFiles?: Array<{
          fileUrl: string;
          filename: string;
          buttonLabel?: string;
        }>;
      }>;
    }>;
  }>;
  textTasks: Array<{
    id: string;
    title: string;
    objective: string;
    tasks: string[];
    submissionInstructions: string[];
    resourceSections?: Array<{
      title: string;
      items: string[];
    }>;
  }>;
};
