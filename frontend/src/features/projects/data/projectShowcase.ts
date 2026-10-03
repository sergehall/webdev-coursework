import { lensLoungeProject } from "@/features/projects/data/projects/lensLoungeProject";
import { sergioartgProject } from "@/features/projects/data/projects/sergioartgProject";
import { hexGateProject } from "@/features/projects/data/projects/hexGateProject";
import { lavovalProject } from "@/features/projects/data/projects/lavovalProject";
import { javaStartProject } from "@/features/projects/data/projects/javaStartProject";
import { awsLearningPortalProject } from "@/features/projects/data/projects/awsLearningPortalProject";
import { cs85PhpProgrammingProject } from "@/features/projects/data/projects/cs85PhpProgrammingProject";
import { javaFxEventHandlingProject } from "@/features/projects/data/projects/javaFxEventHandlingProject";
import { opCosmetologyProject } from "@/features/projects/data/projects/opCosmetologyProject";
import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export type {
  BuildContribution,
  ProjectFilter,
  ProjectFramework,
  ProjectGalleryImage,
  ProjectLanguage,
  ProjectShowcaseItem,
  ProjectStatus,
} from "@/features/projects/data/projectShowcase.types";

export const projectFilters = [
  "All",
  "Fullstack",
  "AI",
  "Cloud",
  "Security",
  "Marketplace",
  "Microservices",
] as const;

export type ProjectFilterOption = (typeof projectFilters)[number];

export const projectLanguageFilters = [
  "All",
  "JS",
  "TS",
  "PHP",
  "Java",
  "Go",
] as const;

export type ProjectLanguageFilterOption =
  (typeof projectLanguageFilters)[number];

export const projectFrameworkFilters = [
  "All",
  "Vite",
  "Next.js",
  "NestJS",
  "AWS",
  "Spring Boot",
  "Laravel",
] as const;

export type ProjectFrameworkFilterOption =
  (typeof projectFrameworkFilters)[number];

export const projectShowcaseItems = [
  lensLoungeProject,
  sergioartgProject,
  opCosmetologyProject,
  hexGateProject,
  lavovalProject,
  javaStartProject,
  awsLearningPortalProject,
  javaFxEventHandlingProject,
  cs85PhpProgrammingProject,
] satisfies readonly ProjectShowcaseItem[];
