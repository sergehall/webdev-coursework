import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminPagination({
  page,
  hasMore,
  busy = false,
  label,
  previousLabel = "Previous",
  nextLabel = "Next",
  onPrevious,
  onNext,
}: {
  page: number;
  hasMore: boolean;
  busy?: boolean;
  label: string;
  previousLabel?: string;
  nextLabel?: string;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <nav className="owner-admin-pagination" aria-label={label}>
      <button
        className="owner-button owner-admin-page-button"
        type="button"
        aria-label={previousLabel}
        title={previousLabel}
        disabled={busy || page === 1}
        onClick={onPrevious}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <span aria-live="polite" aria-atomic="true">
        Page {page}
      </span>
      <button
        className="owner-button owner-admin-page-button"
        type="button"
        aria-label={nextLabel}
        title={nextLabel}
        disabled={busy || !hasMore}
        onClick={onNext}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
