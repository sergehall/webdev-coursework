import { useState } from "react";
import { Layers3, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";

import FinalExam from "./FinalExam";
import { assignment15Links, projectShowcases } from "./assignment15Data";
import {
  ArchitectureSection,
  AssignmentBrief,
  DemoSection,
  RubricSection,
} from "./components/ProjectEvidence";
import {
  ExternalAction,
  Hero,
  ProjectCard,
  SectionHeading,
} from "./components/ProjectShowcase";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export function AssignmentMod15View() {
  const [isFinalExamOpen, setIsFinalExamOpen] = useState(false);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-10 pt-6 pb-4 sm:pt-8">
      <AnimatedAccordionItem
        title="Final Exam"
        isOpen={isFinalExamOpen}
        onToggle={() => setIsFinalExamOpen((isOpen) => !isOpen)}
      >
        <FinalExam />
      </AnimatedAccordionItem>

      <Hero />

      <section aria-labelledby="projects-title">
        <SectionHeading
          eyebrow="Completed work"
          title="Two Java projects, shown with clear roles."
          copy="The first repository is the direct JavaFX assignment solution. The second shows how the same Java foundation grew into a secure full-stack application."
        />
        <h2 id="projects-title" className="sr-only">
          Completed Java projects
        </h2>
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {projectShowcases.map((project, index) => (
            <ProjectCard
              key={project.repositoryUrl}
              project={project}
              index={index}
            />
          ))}
        </div>
      </section>

      <DemoSection />
      <ArchitectureSection />
      <RubricSection />
      <AssignmentBrief />

      <section className="rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white px-6 py-8 sm:px-10 dark:border-emerald-800 dark:from-emerald-950/50 dark:to-slate-900">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase">
                Project evidence complete
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">
              Source, demonstration, and rubric alignment in one place.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Open either repository for the full README, setup instructions,
              project structure, and validation commands.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ExternalAction href={assignment15Links.javafxRepository}>
              <SiGithub aria-hidden="true" className="h-4 w-4" />
              JavaFX project
            </ExternalAction>
            <ExternalAction href={assignment15Links.javaStartRepository}>
              <Layers3 aria-hidden="true" className="h-4 w-4" />
              Java Start
            </ExternalAction>
          </div>
        </div>
      </section>

      <ModuleCompletionButton moduleId={15} />
    </section>
  );
}

export default function AssignmentMod15() {
  useFinalModuleRedirect(15);

  return <AssignmentMod15View />;
}
