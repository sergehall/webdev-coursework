// src/routes/AppRoutes.tsx

import { Suspense } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

import * as Screens from "./LazyScreens";

import Layout from "@/layout/Layout";
import AutoAssignmentRouter from "@/routes/AutoAssignmentRouter";

function CourseAssignmentRedirect() {
  const { courseId } = useParams<{ courseId: string }>();

  return <Navigate to={`/coursework/${courseId}/assignment`} replace />;
}

function PageLoadingState({ label }: { label: string }) {
  return (
    <div className="p-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-gray-900">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-24 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>
        <p className="sr-only">{label}</p>
      </section>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root layout, mounted only once */}
      <Route element={<Layout />}>
        {/* Home */}
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading Home...</div>}>
              <Screens.Home />
            </Suspense>
          }
        />

        <Route
          path="/coursework"
          element={
            <Suspense fallback={<div>Loading Coursework...</div>}>
              <Screens.CourseworkPage />
            </Suspense>
          }
        />

        <Route
          path="/coursework/:courseId"
          element={<CourseAssignmentRedirect />}
        />

        <Route
          path="/coursework/:courseId/assignment"
          element={
            <Suspense
              fallback={<PageLoadingState label="Loading assignment..." />}
            >
              <Screens.AssignmentWrapper />
            </Suspense>
          }
        >
          <Route path=":id" element={<AutoAssignmentRouter />} />
          <Route
            path="completed"
            element={
              <Suspense fallback={<div>Loading Summary...</div>}>
                <Screens.AllDonePage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/code-playground/*"
          element={
            <Suspense fallback={<div>Loading Code Playground...</div>}>
              <Screens.CodePlaygroundPage />
            </Suspense>
          }
        />

        <Route
          path="/web-developer-path"
          element={
            <Suspense fallback={<div>Loading Web Developer Path...</div>}>
              <Screens.WebDeveloperPathPage />
            </Suspense>
          }
        />

        <Route
          path="/resources/*"
          element={
            <Suspense fallback={<div>Loading Resources...</div>}>
              <Screens.ResourcesPage />
            </Suspense>
          }
        />

        <Route
          path="/projects"
          element={
            <Suspense fallback={<div>Loading Projects...</div>}>
              <Screens.ProjectsPage />
            </Suspense>
          }
        />

        {/* Not found */}
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading 404...</div>}>
              <Screens.NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
