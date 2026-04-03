// src/routes/LazyScreens.ts

import { lazy } from "react";

// Main pages
export const Home = lazy(() => import("../pages/HomePage"));
export const NotFound = lazy(() => import("../pages/NotFound"));

// Assignment-related pages
export const CourseworkPage = lazy(() => import("../pages/./CourseworkPage"));
export const AssignmentWrapper = lazy(
  () => import("../components/AssignmentWrapper")
);
export const AllDonePage = lazy(() => import("../pages/AllDonePage"));

// Tools / Playground
export const CodePlaygroundPage = lazy(
  () => import("../pages/CodePlaygroundPage")
);
export const ResourcesPage = lazy(() => import("../pages/ResourcesPage"));

// Web Developer Path
export const WebDeveloperPathPage = lazy(
  () => import("../pages/WebDeveloperPathPage")
);
