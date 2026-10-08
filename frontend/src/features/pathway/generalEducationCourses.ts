export type GeneralEducationCourse = {
  code: string;
  title: string;
  units: number;
  description: string;
  prerequisite?: string;
  calGetcArea?: string;
};

// SMC GE Area 1A, reviewed October 8, 2026:
// https://www.smc.edu/academics/classes/program.php?id=414
export const area1ACourses: GeneralEducationCourse[] = [
  {
    code: "BUS 31",
    title: "Business English Fundamentals",
    units: 3,
    description:
      "Develops clear business writing through grammar, punctuation, sentence structure, and paragraph organization, with applications to research reports and other business documents.",
  },
  {
    code: "ENGL C1000",
    title: "Academic Reading and Writing (formerly ENGL 1)",
    units: 3,
    description:
      "Builds academic reading and writing skills through writing processes, effective language use, analytical thinking, and introductory academic research.",
    prerequisite:
      "Placement as determined by the college’s multiple measures assessment process",
    calGetcArea: "1A: English Composition",
  },
  {
    code: "ENGL 1D",
    title: "Reading and Writing Composition I - Diversity",
    units: 3,
    description:
      "Introduces rhetoric, written communication, and research papers through texts about diversity and difference. Students examine at least two groups and consider how political and social structures affect their experiences.",
    prerequisite: "ESL 19B or Group A Placement",
    calGetcArea: "1A: English Composition",
  },
];
