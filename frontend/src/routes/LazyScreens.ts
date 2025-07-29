// src/routes/LazyScreens.ts

import { lazy } from "react";

// Main pages
export const Home = lazy(() => import("../pages/HomePage"));
export const NotFound = lazy(() => import("../pages/NotFound"));

// Pages по Assignments
export const Coursework = lazy(() => import("../pages/Coursework"));
export const AssignmentWrapper = lazy(
  () => import("../pages/AssignmentWrapper")
);
export const AllDonePage = lazy(() => import("../pages/AllDonePage"));

// Tools / Playground
export const SandboxPage = lazy(() => import("../pages/SandboxPage"));
export const ResourcesPage = lazy(() => import("../pages/ResourcesPage"));

// Web Developer Path
export const WebDeveloperPathPage = lazy(
  () => import("../pages/WebDeveloperPathPage")
);
