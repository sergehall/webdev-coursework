import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import type { CS56CanvasItem } from "@/courses/CS56/components/module-scaffold/types";

type CanvasItemDetailsProps = {
  item: CS56CanvasItem;
  itemId: string;
  openCanvasItemPreviews: Record<string, string | null>;
  onToggleItemPreview: (itemId: string, fileUrl: string) => void;
  onCloseItemPreview: (itemId: string) => void;
};

export default function CanvasItemDetails({
  item,
  itemId,
  openCanvasItemPreviews,
  onToggleItemPreview,
  onCloseItemPreview,
}: CanvasItemDetailsProps) {
  return (
    <>
      {item.prompt ? <PromptBlock item={item} /> : null}
      {item.rubric ? <RubricBlock item={item} /> : null}
      {item.description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {item.description}
        </p>
      ) : null}
      {item.note ? <NoteBlock note={item.note} /> : null}
      {item.details ? <DetailsBlock item={item} /> : null}
      {item.codeBlocks?.length ? <CodeBlocks item={item} /> : null}
      {item.expectedOutput?.length ? <ExpectedOutput item={item} /> : null}
      {item.previewFiles?.length ? (
        <PreviewFiles
          item={item}
          itemId={itemId}
          openCanvasItemPreviews={openCanvasItemPreviews}
          onToggleItemPreview={onToggleItemPreview}
          onCloseItemPreview={onCloseItemPreview}
        />
      ) : null}
    </>
  );
}

function PromptBlock({ item }: { item: CS56CanvasItem }) {
  if (!item.prompt) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950/30">
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">
        {item.prompt.title}
      </h3>
      <div className="mt-4 space-y-5">
        {item.prompt.sections.map((section) => (
          <section key={section.title}>
            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {section.title}
            </h4>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200"
              >
                {paragraph}
              </p>
            ))}
            {section.steps ? (
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                {section.steps.map((step) => (
                  <li key={step.title} className="pl-1">
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {step.title}
                    </span>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {step.items.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            ) : null}
            {section.output ? (
              <pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-sm leading-6 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <code>{section.output.join("\n")}</code>
              </pre>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}

function RubricBlock({ item }: { item: CS56CanvasItem }) {
  if (!item.rubric) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">
          {item.rubric.title}
        </h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          {item.rubric.rows.length} criteria
        </span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">
                Criteria
              </th>
              <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">
                Ratings
              </th>
              <th className="py-3 font-semibold text-slate-900 dark:text-slate-100">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {item.rubric.rows.map((row) => (
              <tr key={row.criterion} className="align-top">
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-100">
                  {row.criterion}
                </td>
                <td className="py-3 pr-4">
                  <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {row.ratings.map((rating) => (
                      <div
                        key={`${row.criterion}-${rating.label}`}
                        className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/60"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            {rating.label}
                          </p>
                          <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                            {rating.pointsLabel}
                          </span>
                        </div>
                        {rating.description ? (
                          <p className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
                            {rating.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-3 font-semibold whitespace-nowrap text-slate-700 dark:text-slate-200">
                  {row.pointsLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NoteBlock({ note }: { note: string }) {
  return (
    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
      <span className="font-semibold">Note:</span> {note}
    </div>
  );
}

function DetailsBlock({ item }: { item: CS56CanvasItem }) {
  if (!item.details) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
      {item.details.intro ? (
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
          {item.details.intro}
        </p>
      ) : null}
      <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
        {item.details.steps.map((step) => (
          <li key={step.label} className="pl-1">
            <span className="font-semibold text-slate-950 dark:text-white">
              {step.label}:
            </span>{" "}
            <span>{step.text}</span>
            {step.pointsLabel ? (
              <span className="ml-2 inline-flex rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                {step.pointsLabel}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function CodeBlocks({ item }: { item: CS56CanvasItem }) {
  return (
    <div className="mt-4 space-y-4">
      {item.codeBlocks?.map((block) => (
        <div
          key={block.title}
          className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950"
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
            <p className="text-sm font-semibold text-slate-100">
              {block.title}
            </p>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-300">
              {block.language}
            </span>
          </div>
          <pre className="max-h-[520px] overflow-auto p-4 text-sm leading-6 text-slate-100">
            <code>{block.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

function ExpectedOutput({ item }: { item: CS56CanvasItem }) {
  return (
    <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
      <h4 className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
        Expected Output
      </h4>
      <pre className="mt-3 overflow-auto rounded bg-white p-3 text-sm leading-6 text-emerald-950 dark:bg-slate-950 dark:text-emerald-100">
        <code>{item.expectedOutput?.join("\n")}</code>
      </pre>
    </div>
  );
}

function PreviewFiles({
  item,
  itemId,
  openCanvasItemPreviews,
  onToggleItemPreview,
  onCloseItemPreview,
}: CanvasItemDetailsProps) {
  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.previewFiles?.map((file) => {
          const isOpen = openCanvasItemPreviews[itemId] === file.fileUrl;
          const buttonLabel = file.buttonLabel ?? file.filename;

          return (
            <ToggleModalButton
              key={file.fileUrl}
              isOpen={isOpen}
              label={isOpen ? `Close ${buttonLabel}` : buttonLabel}
              toggle={() => onToggleItemPreview(itemId, file.fileUrl)}
            />
          );
        })}
      </div>
      <ShowModalButton
        isOpen={!!openCanvasItemPreviews[itemId]}
        onClose={() => onCloseItemPreview(itemId)}
        files={
          item.previewFiles?.filter(
            (file) => file.fileUrl === openCanvasItemPreviews[itemId]
          ) ?? []
        }
      />
    </>
  );
}
