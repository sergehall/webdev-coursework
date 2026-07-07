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
          element={<Screens.AssignmentWrapper />}
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
