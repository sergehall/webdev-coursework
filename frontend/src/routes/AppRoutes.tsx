// src/routes/AppRoutes.tsx

import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AssignmentWrapper } from "./LazyScreens";
import * as Screens from "./LazyScreens";

import Layout from "@/layout/Layout";
import AutoAssignmentRouter from "@/routes/AutoAssignmentRouter";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Корневой Layout — только один раз */}
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
              <Screens.Coursework />
            </Suspense>
          }
        />

        <Route
          path="/coursework/:code/assignment"
          element={<AssignmentWrapper />}
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
          path="/sandbox/*"
          element={
            <Suspense fallback={<div>Loading Sandbox...</div>}>
              <Screens.SandboxPage />
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
