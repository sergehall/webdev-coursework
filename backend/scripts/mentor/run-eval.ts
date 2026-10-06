import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  validateManifest,
  type CatalogManifest,
} from "../../src/mentor/knowledge/catalog-contract";
import { mentorEvalScenarios } from "../../src/mentor/eval/mentor-eval-scenarios";
import { buildChatMessages } from "../../src/mentor/generation/generation-prompt";
import { buildPlanMessages } from "../../src/mentor/pathway/plan-prompt";
import { validatePlanProposal } from "../../src/mentor/pathway/plan-proposal";
import { CloudflareProvider } from "../../src/mentor/generation/cloudflare-provider";
import {
  MAX_OUTPUT_TOKENS,
  MODEL,
  PLAN_OUTPUT_TOKENS,
} from "../../src/mentor/generation/generation-config";
import { PLAN_SCHEMA } from "../../src/mentor/pathway/plan-proposal";
import type { EvidenceSelection } from "../../src/mentor/knowledge/knowledge-catalog";

type EvalResult = {
  id: string;
  mode: "chat" | "plan";
  promptHash: string;
  model: string;
  catalogVersion: string;
  outcome: "completed" | "invalid_plan" | "provider_error";
  response: unknown;
  durationMs: number;
  firstTextMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  reportedNeurons: number | null;
  failureKind?: string;
};

const start = Number(process.argv[2]);
const count = Number(process.argv[3]);
const retryError = process.argv[4] === "--retry-error";
if (
  !Number.isInteger(start) ||
  !Number.isInteger(count) ||
  start < 0 ||
  count < 1 ||
  count > 5 ||
  start + count > mentorEvalScenarios.length
)
  throw new Error("Pass a start index and a batch size from 1 to 5");

// This runner uses synthetic fixtures only. It does not connect to the app DB.
process.loadEnvFile(resolve(__dirname, "../../.env.local"));
if (
  process.env.AI_PROVIDER_MODE !== "cloudflare" ||
  !process.env.CLOUDFLARE_ACCOUNT_ID ||
  !(process.env.CLOUDFLARE_AI_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN)
)
  throw new Error("Local Cloudflare evaluation configuration is unavailable");

const manifest: unknown = JSON.parse(
  readFileSync(
    join(__dirname, "../../src/mentor/knowledge/catalog.manifest.json"),
    "utf8"
  )
);
validateManifest(manifest);
const catalog: CatalogManifest = manifest;
const entries = new Map(catalog.entries.map((entry) => [entry.id, entry]));
const outputDir = resolve(__dirname, "../../../.local/ai-mentor");
const outputPath = join(outputDir, "eval-results.json");
mkdirSync(outputDir, { recursive: true, mode: 0o700 });
const previous = (() => {
  try {
    return JSON.parse(readFileSync(outputPath, "utf8")) as EvalResult[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
})();

function save(results: EvalResult[]) {
  const temporary = `${outputPath}.tmp`;
  writeFileSync(temporary, JSON.stringify(results, null, 2), { mode: 0o600 });
  renameSync(temporary, outputPath);
}

function evidence(ids: string[]): EvidenceSelection {
  return {
    catalogVersion: catalog.version,
    sources: ids.map((id) => {
      const entry = entries.get(id);
      if (!entry) throw new Error(`Fixture source missing: ${id}`);
      return entry;
    }),
  };
}

async function main() {
  const provider = new CloudflareProvider();
  for (const item of mentorEvalScenarios.slice(start, start + count)) {
    const selected = evidence(item.availableSourceIds);
    const messages =
      item.mode === "chat"
        ? buildChatMessages(item.profile, selected, [], item.request)
        : buildPlanMessages(item.profile, [], selected, item.request);
    const promptHash = createHash("sha256")
      .update(
        JSON.stringify({
          messages,
          model: MODEL,
          outputTokens:
            item.mode === "chat" ? MAX_OUTPUT_TOKENS : PLAN_OUTPUT_TOKENS,
          schema: item.mode === "plan" ? PLAN_SCHEMA : undefined,
          catalogVersion: catalog.version,
        })
      )
      .digest("hex");
    if (
      previous.some(
        (row) =>
          row.id === item.id &&
          row.promptHash === promptHash &&
          (!retryError || row.outcome !== "provider_error")
      )
    ) {
      process.stdout.write(`${item.id} already recorded\n`);
      continue;
    }
    const started = performance.now();
    const result: EvalResult = {
      id: item.id,
      mode: item.mode,
      promptHash,
      model: MODEL,
      catalogVersion: catalog.version,
      outcome: "provider_error",
      response: null,
      durationMs: 0,
      firstTextMs: null,
      inputTokens: null,
      outputTokens: null,
      reportedNeurons: null,
    };
    try {
      if (item.mode === "chat") {
        let answer = "";
        for await (const update of provider.stream(
          messages,
          AbortSignal.timeout(45_000)
        )) {
          if (update.kind === "text") {
            if (result.firstTextMs === null && update.text)
              result.firstTextMs = Math.round(performance.now() - started);
            answer += update.text;
          } else if (update.kind === "usage") {
            result.inputTokens = update.inputTokens;
            result.outputTokens = update.outputTokens;
            result.reportedNeurons = update.neurons ?? null;
          }
        }
        result.response = answer;
        result.outcome = answer.trim() ? "completed" : "provider_error";
      } else {
        const output = await provider.completePlan(
          messages,
          AbortSignal.timeout(45_000)
        );
        result.inputTokens = output.usage?.inputTokens ?? null;
        result.outputTokens = output.usage?.outputTokens ?? null;
        result.reportedNeurons = output.usage?.neurons ?? null;
        result.response = output.value;
        try {
          validatePlanProposal(output.value, item.profile, selected);
          result.outcome = "completed";
        } catch {
          result.outcome = "invalid_plan";
        }
      }
    } catch (error) {
      result.outcome = "provider_error";
      const message = error instanceof Error ? error.message : "";
      result.failureKind = /^Provider HTTP \d{3}$/.test(message)
        ? message
        : [
              "Provider unavailable",
              "Provider response too large",
              "Incomplete provider response",
              "Invalid provider response",
            ].includes(message)
          ? message
          : "transport_or_parse";
    }
    result.durationMs = Math.round(performance.now() - started);
    previous.push(result);
    save(previous);
    process.stdout.write(
      `${item.id} ${result.outcome}${result.failureKind ? ` (${result.failureKind})` : ""} ${result.durationMs}ms ${result.reportedNeurons ?? "usage-unavailable"} neurons\n`
    );
    if (result.outcome === "provider_error") break;
  }
}

void main().catch(() => {
  process.stderr.write(
    "Evaluation stopped; inspect local environment and result file.\n"
  );
  process.exitCode = 1;
});
