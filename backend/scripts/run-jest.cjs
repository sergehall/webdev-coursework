#!/usr/bin/env node

const args = process.argv.slice(2);
const hasWorkerMode = args.some(
  (arg) =>
    arg === "--runInBand" ||
    arg === "-i" ||
    arg === "--maxWorkers" ||
    arg.startsWith("--maxWorkers=")
);

// Jest 29 workers hit Node 24/Yarn PnP's ESM translator path in this repo.
const stableArgs = hasWorkerMode ? args : ["--runInBand", ...args];

process.argv = [
  process.execPath,
  require.resolve("jest/bin/jest"),
  ...stableArgs,
];

require("jest/bin/jest");
