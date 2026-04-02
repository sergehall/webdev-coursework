import { lazy } from "react";

import type {
  AssignmentImporter,
  AssignmentRegistry,
  AssignmentRegistryEntry,
} from "./types";

type PlaceholderLoaders =
  | AssignmentImporter
  | Record<string, AssignmentImporter>;

function resolvePlaceholderLoader(
  moduleId: string,
  placeholderLoaders: PlaceholderLoaders
): AssignmentImporter | undefined {
  if (typeof placeholderLoaders === "function") {
    return placeholderLoaders;
  }

  return placeholderLoaders[moduleId];
}

function createAssignmentEntry(
  loadMain: AssignmentImporter,
  loadPlaceholder: AssignmentImporter
): AssignmentRegistryEntry {
  return {
    main: lazy(loadMain),
    placeholder: lazy(loadPlaceholder),
    prefetchMain: loadMain,
    prefetchPlaceholder: loadPlaceholder,
  };
}

export function createAssignmentRegistry(
  moduleLoaders: Record<string, AssignmentImporter>,
  placeholderLoaders: PlaceholderLoaders
): AssignmentRegistry {
  return Object.fromEntries(
    Object.entries(moduleLoaders).map(([moduleId, loadMain]) => {
      const loadPlaceholder = resolvePlaceholderLoader(
        moduleId,
        placeholderLoaders
      );

      if (!loadPlaceholder) {
        throw new Error(
          `Missing placeholder loader for assignment module "${moduleId}"`
        );
      }

      return [moduleId, createAssignmentEntry(loadMain, loadPlaceholder)];
    })
  );
}
