import {
  ChevronDown,
  ChevronUp,
  ClipboardPenLine,
  FileText,
  MessageSquareText,
  Paperclip,
  Rocket,
} from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import CanvasItemDetails from "@/courses/CS56/components/module-scaffold/CanvasItemDetails";
import type {
  CS56CanvasItem,
  CS56CanvasSection,
} from "@/courses/CS56/components/module-scaffold/types";

type CanvasSectionsProps = {
  sections: CS56CanvasSection[];
  openCanvasSections: Record<string, boolean>;
  openCanvasGroups: Record<string, boolean>;
  openCanvasItemDetails: Record<string, boolean>;
  openCanvasItemPreviews: Record<string, string | null>;
  onToggleSection: (sectionId: string) => void;
  onToggleGroup: (groupId: string) => void;
  onToggleItemDetails: (itemId: string) => void;
  onToggleItemPreview: (itemId: string, fileUrl: string) => void;
  onCloseItemPreview: (itemId: string) => void;
};

type CanvasItemType = CS56CanvasItem["type"];

const canvasItemIcons = {
  page: FileText,
  quiz: Rocket,
  discussion: MessageSquareText,
  assignment: ClipboardPenLine,
  attachment: Paperclip,
} satisfies Record<CanvasItemType, typeof FileText>;

export default function CanvasSections({
  sections,
  openCanvasSections,
  openCanvasGroups,
  openCanvasItemDetails,
  openCanvasItemPreviews,
  onToggleSection,
  onToggleGroup,
  onToggleItemDetails,
  onToggleItemPreview,
  onCloseItemPreview,
}: CanvasSectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <AnimatedAccordionItem
          key={section.id}
          title={section.title}
          isOpen={!!openCanvasSections[section.id]}
          onToggle={() => onToggleSection(section.id)}
        >
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950/20">
            {section.groups.map((group, groupIndex) => {
              const groupId = `${section.id}-${group.title ?? groupIndex}`;
              const isGroupCollapsible = !!group.defaultCollapsed;
              const isGroupOpen =
                !isGroupCollapsible || !!openCanvasGroups[groupId];

              return (
                <div key={groupId}>
                  {group.title ? (
                    isGroupCollapsible ? (
                      <button
                        type="button"
                        onClick={() => onToggleGroup(groupId)}
                        className="flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800"
                      >
                        <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
                          {group.title}
                        </span>
                        <span className="text-slate-500 dark:text-slate-300">
                          {isGroupOpen ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </span>
                      </button>
                    ) : (
                      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-900/60">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                          {group.title}
                        </h3>
                      </div>
                    )
                  ) : null}

                  {isGroupOpen ? (
                    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                      {group.items.map((item) => (
                        <CanvasItemRow
                          key={`${groupId}-${item.title}`}
                          item={item}
                          itemId={`${groupId}-${item.title}`}
                          openCanvasItemDetails={openCanvasItemDetails}
                          openCanvasItemPreviews={openCanvasItemPreviews}
                          onToggleItemDetails={onToggleItemDetails}
                          onToggleItemPreview={onToggleItemPreview}
                          onCloseItemPreview={onCloseItemPreview}
                        />
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </AnimatedAccordionItem>
      ))}
    </>
  );
}

type CanvasItemRowProps = {
  item: CS56CanvasItem;
  itemId: string;
  openCanvasItemDetails: Record<string, boolean>;
  openCanvasItemPreviews: Record<string, string | null>;
  onToggleItemDetails: (itemId: string) => void;
  onToggleItemPreview: (itemId: string, fileUrl: string) => void;
  onCloseItemPreview: (itemId: string) => void;
};

function CanvasItemRow({
  item,
  itemId,
  openCanvasItemDetails,
  openCanvasItemPreviews,
  onToggleItemDetails,
  onToggleItemPreview,
  onCloseItemPreview,
}: CanvasItemRowProps) {
  const Icon = canvasItemIcons[item.type];
  const itemHasDetails = Boolean(
    item.prompt ||
    item.rubric ||
    item.description ||
    item.note ||
    item.details ||
    item.codeBlocks?.length ||
    item.expectedOutput?.length ||
    item.previewFiles?.length
  );
  const isItemDetailsOpen =
    !item.defaultCollapsed || !!openCanvasItemDetails[itemId];

  return (
    <li className="flex gap-4 px-5 py-4 transition hover:bg-sky-50/70 dark:hover:bg-sky-950/20">
      <div className="flex w-12 shrink-0 justify-center pt-1">
        <Icon
          aria-hidden="true"
          className="h-5 w-5 text-slate-700 dark:text-slate-200"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-base font-bold break-words text-slate-950 dark:text-white">
          {item.title}
        </p>
        <CanvasItemMeta item={item} />

        {item.defaultCollapsed && itemHasDetails ? (
          <button
            type="button"
            onClick={() => onToggleItemDetails(itemId)}
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-expanded={isItemDetailsOpen}
          >
            {isItemDetailsOpen ? (
              <ChevronUp aria-hidden="true" className="h-4 w-4" />
            ) : (
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            )}
            {isItemDetailsOpen ? "Hide details" : "Show details"}
          </button>
        ) : null}

        {isItemDetailsOpen ? (
          <CanvasItemDetails
            item={item}
            itemId={itemId}
            openCanvasItemPreviews={openCanvasItemPreviews}
            onToggleItemPreview={onToggleItemPreview}
            onCloseItemPreview={onCloseItemPreview}
          />
        ) : null}
      </div>
    </li>
  );
}

function CanvasItemMeta({ item }: { item: CS56CanvasItem }) {
  if (!item.dueLabel && !item.pointsLabel && !item.scoreLabel) {
    return null;
  }

  if (item.dueLabel || item.pointsLabel) {
    return (
      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
        {item.dueLabel ? <span>{item.dueLabel}</span> : null}
        {item.pointsLabel ? <span>{item.pointsLabel}</span> : null}
        {item.scoreLabel ? <ScoreBadge scoreLabel={item.scoreLabel} /> : null}
      </p>
    );
  }

  return (
    <p className="mt-1 text-sm">
      <ScoreBadge scoreLabel={item.scoreLabel} />
    </p>
  );
}

function ScoreBadge({ scoreLabel }: { scoreLabel?: string }) {
  if (!scoreLabel) {
    return null;
  }

  return (
    <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800">
      {scoreLabel}
    </span>
  );
}
