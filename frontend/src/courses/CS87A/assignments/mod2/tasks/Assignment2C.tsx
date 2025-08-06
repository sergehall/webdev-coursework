// src/assignments/mod2/tasks/Assignment2C.tsx
import { useState } from "react";

import {
  RunFunctionButton,
  RunInPlaygroundButton,
  DownloadJsButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment2C = () => {
  const [distance, setDistance] = useState("12");
  const [mode, setMode] = useState("bus");
  const [landmark, setLandmark] = useState("Central Park");
  const [landmarkMile, setLandmarkMile] = useState("6");
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Commute simulation console screenshot",
      src: "/code-playground/CS81/mod-2/C/Assignment2C_Screenshot.png",
    },
  ];

  const runSimulation = () => {
    const commuteDistance = parseInt(distance);
    const landmarkAt = parseInt(landmarkMile);
    const transportMode = mode.toLowerCase();
    let speed = 0;

    if (transportMode === "car") speed = 40;
    else if (transportMode === "bus") speed = 20;
    else if (transportMode === "bike") speed = 15;
    else if (transportMode === "walk") speed = 3;

    console.log("--- Commute Simulation ---");
    console.log(
      `Starting commute of ${commuteDistance} miles by ${transportMode}.`
    );

    for (let mile = 1; mile <= commuteDistance; mile++) {
      if (mile === landmarkAt) {
        console.log(`Mile ${mile}: Hey, there's ${landmark}!`);
      } else {
        console.log(`Mile ${mile}: Cruising along...`);
      }
    }

    const commuteTime = speed > 0 ? commuteDistance / speed : "Infinity";
    console.log("Arrived!");
    console.log(`Total commute time: ${commuteTime} hours.`);
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 2C: Conditions & Loops
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Simulate a commute using variables, conditionals, and loops. Watch the
        result in the browser console.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-auto"
          placeholder="Distance (miles)"
        />
        <input
          type="text"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-auto"
          placeholder="Mode (car, bus, bike, walk)"
        />
        <input
          type="text"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-auto"
          placeholder="Landmark name"
        />
        <input
          type="number"
          value={landmarkMile}
          onChange={(e) => setLandmarkMile(e.target.value)}
          className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-auto"
          placeholder="Landmark Mile"
        />
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <RunFunctionButton onClick={runSimulation} label="Run in Console" />

        <RunInPlaygroundButton
          file="CS81/mod-2/C/assn2c.js"
          label="Run in Sandbox"
        />

        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-2/C/assn2c.js"
          filename="assn2c.js"
        />
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
      </div>
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment2C;
