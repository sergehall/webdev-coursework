type Screenshot = {
  src: string;
  alt?: string;
};

type Props = {
  screenshots: Screenshot[];
  className?: string;
};

export default function ScreenshotGallery({
  screenshots,
  className = "",
}: Props) {
  if (!screenshots.length) return null;

  return (
    <div className={`mt-6 space-y-4 ${className}`}>
      {screenshots.map((screenshot) => (
        <div key={screenshot.src}>
          {screenshot.alt && (
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {screenshot.alt}
            </p>
          )}
          <img
            src={screenshot.src}
            alt={screenshot.alt || "Screenshot"}
            className="rounded border border-gray-300 dark:border-gray-700"
          />
        </div>
      ))}
    </div>
  );
}
