import { useState } from "react";

import {
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment6A = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Console Output Example",
      src: "/code-playground/CS81/mod-6/A/playlist-console-output.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 6A: Code Review – playlist.js
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        In this assignment, you will practice reading and analyzing a working
        JavaScript program that uses constructors and methods. You’ll annotate a
        simple <code>Playlist</code> object, suggest one improvement, and add a
        new method to enhance its functionality.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Create a GitHub repository named: <code>cs81-module6a-review</code>
        </li>
        <li>
          Add the provided <code>playlist.js</code> file and include at least 10
          meaningful comments explaining the constructor, methods, and outputs.
        </li>
        <li>Add one suggestion for improvement as a comment.</li>
        <li>
          Write and test a new method that extends playlist functionality.
        </li>
        <li>
          Create a <code>REFLECTION.md</code> file answering the provided
          questions.
        </li>
        <li>Make at least 3 meaningful Git commits with clear messages.</li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module6a-review"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/code-playground/CS81/mod-6/A/playlist.js"
          filename="playlist.js"
          label="playlist.js"
        />

        <RunInPlaygroundButton
          file="CS81/mod-6/A/playlist.js"
          label="Run in Playground"
        />

        <DownloadMdButton
          fileUrl="/code-playground/CS81/mod-6/A/REFLECTION.md"
          filename="REFLECTION.md"
          label="REFLECTION.md"
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

export default Assignment6A;
