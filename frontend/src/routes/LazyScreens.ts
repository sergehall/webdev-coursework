// src/routes/LazyScreens.ts

import { lazy } from "react";

// Main pages
export const Home = lazy(() => import("../pages/HomePage"));
export const OwnerPage = lazy(() => import("../features/account/OwnerPage"));
export const NotFound = lazy(() => import("../pages/NotFound"));

// Assignment-related pages
export const CourseworkPage = lazy(() => import("../pages/./CourseworkPage"));
export const ESL10GPage = lazy(() => import("../courses/ESL10G/ESL10GPage"));
export const ESL10GPresentationPage = lazy(() =>
  import("../courses/ESL10G/ESL10GPage").then((module) => ({
    default: module.ESL10GPresentationPage,
  }))
);
export const AssignmentWrapper = lazy(
  () => import("../components/AssignmentWrapper")
);
export const AllDonePage = lazy(() => import("../pages/AllDonePage"));

// Tools / Playground
export const CodePlaygroundPage = lazy(
  () => import("../pages/CodePlaygroundLabPage")
);
export const ResourcesPage = lazy(() => import("../pages/ResourcesPage"));
export const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));

// Web Developer Path
export const WebDeveloperPathPage = lazy(
  () => import("../pages/WebDeveloperPathPage")
);
