import type React from "react";

export type AssignmentImporter = () => Promise<{ default: React.FC }>;

export type AssignmentRegistryEntry = {
  main: React.LazyExoticComponent<React.FC>;
  placeholder: React.LazyExoticComponent<React.FC>;
  prefetchMain: AssignmentImporter;
  prefetchPlaceholder: AssignmentImporter;
};

export type AssignmentRegistry = Record<string, AssignmentRegistryEntry>;
