import ShowModalButton from "../../../components/buttons/ShowModalButton";
import { presentationTextParagraphs } from "../courseContent";

const PRESENTATION_TEXT_FILES = [
  {
    fileUrl: "/course-materials/esl10g/presentation/Presentation_1.pdf",
    filename: "Presentation_1.pdf",
    preview: (
      <article className="mx-auto max-w-3xl space-y-4 rounded-xl bg-white p-5 text-base leading-7 text-slate-800 sm:p-8 dark:bg-slate-900 dark:text-slate-200">
        <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
          A little about myself
        </h3>
        {presentationTextParagraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0 || index === presentationTextParagraphs.length - 1
                ? "font-semibold"
                : ""
            }
          >
            {paragraph}
          </p>
        ))}
      </article>
    ),
  },
];

interface PresentationTextModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function PresentationTextModal({
  isOpen,
  onClose,
}: PresentationTextModalProps) {
  return (
    <ShowModalButton
      isOpen={isOpen}
      onClose={onClose}
      files={PRESENTATION_TEXT_FILES}
    />
  );
}
