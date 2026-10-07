import { goalLabels, type LearnerProfile, type Milestone } from "./mentor-demo";
import type { SavedProposal } from "./mentor-api";

export type PlanExport = {
  profile: LearnerProfile;
  steps: Milestone[];
  metadata: SavedProposal["metadata"];
  done: string[];
  draft: boolean;
};

const compact = (value: string) => value.replace(/\s+/g, " ").trim();
const markdownText = (value: string) =>
  compact(value).replace(/[\\`*_{}[\]<>]/g, "\\$&");
const htmlText = (value: string) =>
  compact(value).replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

function sourceLinks(data: PlanExport, step: Milestone, baseUrl: string) {
  return (step.sourceIds ?? []).flatMap((id) => {
    const source = data.metadata?.sources.find((item) => item.sourceId === id);
    if (!source) return [];
    try {
      const url = new URL(source.href, baseUrl);
      if (
        url.origin !== new URL(baseUrl).origin ||
        url.username ||
        url.password
      )
        return [];
      return [{ title: compact(source.title), url: url.href }];
    } catch {
      return [];
    }
  });
}

export function planMarkdown(data: PlanExport, baseUrl: string): string {
  const lines = [
    "# My web development learning path",
    "",
    `Status: ${data.draft ? "Draft for review" : "Accepted path"}`,
    `Goal: ${goalLabels[data.profile.goal]}`,
    `Time available: ${data.profile.hours} hours per week`,
  ];
  if (!data.draft)
    lines.push(
      `Progress: ${data.done.filter((id) => data.steps.some((step) => step.id === id)).length} of ${data.steps.length} steps complete`
    );
  if (data.metadata?.rationale)
    lines.push("", markdownText(data.metadata.rationale));
  for (const week of [1, 2, 3, 4]) {
    const steps = data.steps.filter((step) => step.week === week);
    if (!steps.length) continue;
    lines.push("", `## Week ${week}`);
    for (const step of steps) {
      const completed = !data.draft && data.done.includes(step.id);
      lines.push(
        "",
        `### ${markdownText(step.title)}`,
        `- ${completed ? "[x]" : "[ ]"} ${data.draft ? "Suggested" : "Self-reported"} practice · ${step.hours} h`,
        `- Done when: ${markdownText(step.doneWhen)}`
      );
      for (const source of sourceLinks(data, step, baseUrl))
        lines.push(
          `- Coursework: [${markdownText(source.title)}](${source.url})`
        );
    }
  }
  lines.push(
    "",
    "Example exercises are proposals, not completed coursework or official program requirements.",
    ""
  );
  return lines.join("\n");
}

export function planPrintHtml(data: PlanExport, baseUrl: string): string {
  const weeks = [1, 2, 3, 4]
    .map((week) => {
      const steps = data.steps.filter((step) => step.week === week);
      if (!steps.length) return "";
      const items = steps
        .map((step) => {
          const completed = !data.draft && data.done.includes(step.id);
          const sources = sourceLinks(data, step, baseUrl)
            .map(
              (source) =>
                `<li><a href="${htmlText(source.url)}">${htmlText(source.title)}</a></li>`
            )
            .join("");
          return `<article><h3>${htmlText(step.title)}</h3><p class="detail">${completed ? "Completed" : data.draft ? "Suggested practice" : "Practice"} · ${step.hours} h</p><p><strong>Done when:</strong> ${htmlText(step.doneWhen)}</p>${sources ? `<ul>${sources}</ul>` : ""}</article>`;
        })
        .join("");
      return `<section><h2>Week ${week}</h2>${items}</section>`;
    })
    .join("");
  const completed = data.done.filter((id) =>
    data.steps.some((step) => step.id === id)
  ).length;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>My web development learning path</title><style>
    @page { size: A4; margin: 18mm; }
    body { font: 11pt/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #152238; max-width: 760px; margin: auto; }
    h1 { font-size: 24pt; line-height: 1.2; margin: 0 0 10mm; }
    h2 { font-size: 15pt; border-bottom: 2px solid #087cb3; padding-bottom: 3mm; margin-top: 10mm; }
    h3 { font-size: 12pt; margin: 0 0 2mm; }
    p { margin: 2mm 0; } .detail, .muted { color: #52647a; }
    article { border: 1px solid #d5e0eb; border-radius: 8px; padding: 5mm; margin: 4mm 0; break-inside: avoid; }
    a { color: #087cb3; overflow-wrap: anywhere; } ul { margin: 3mm 0 0; padding-left: 6mm; }
    footer { margin-top: 12mm; border-top: 1px solid #d5e0eb; padding-top: 4mm; font-size: 9pt; color: #52647a; }
  </style></head><body><h1>My web development learning path</h1>
  <p><strong>Status:</strong> ${data.draft ? "Draft for review" : "Accepted path"}</p>
  <p><strong>Goal:</strong> ${htmlText(goalLabels[data.profile.goal])}</p>
  <p><strong>Time available:</strong> ${data.profile.hours} hours per week</p>
  ${data.draft ? "" : `<p><strong>Self-reported progress:</strong> ${completed} of ${data.steps.length} steps complete</p>`}
  ${data.metadata?.rationale ? `<p class="muted">${htmlText(data.metadata.rationale)}</p>` : ""}
  ${weeks}<footer>Example exercises are proposals, not completed coursework or official program requirements.</footer></body></html>`;
}

export function downloadPlan(data: PlanExport, baseUrl: string) {
  const blob = new Blob([planMarkdown(data, baseUrl)], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `web-development-path${data.draft ? "-draft" : ""}.md`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function printPlan(data: PlanExport, baseUrl: string): boolean {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return false;
  printWindow.opener = null;
  printWindow.document.write(planPrintHtml(data, baseUrl));
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  return true;
}
