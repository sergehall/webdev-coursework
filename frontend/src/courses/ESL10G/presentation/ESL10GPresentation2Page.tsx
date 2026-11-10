import { Link } from "react-router-dom";

import { resetPageScroll } from "../resetPageScroll";

import { PresentationViewer } from "./components/PresentationViewer";
import "../presentation-bookends.css";

export default function ESL10GPresentation2Page() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <Link
        to="/coursework/ESL10G"
        onClick={resetPageScroll}
        className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
      >
        ← Back to ESL 10G
      </Link>
      <PresentationViewer comic />
    </div>
  );
}
