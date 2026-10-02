import { useState } from "react";

import { CourseOverview } from "./components/CourseOverview";
import { CourseTextbooks } from "./components/CourseTextbooks";
import { CourseOutline } from "./components/CourseOutline";
import { PresentationTextModal } from "./components/PresentationTextModal";

export { ESL10GPresentationPage } from "./presentation/ESL10GPresentationPage";

export default function ESL10GPage() {
  const [presentationTextOpen, setPresentationTextOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <CourseOverview />
      <CourseTextbooks />
      <CourseOutline
        onOpenPresentationText={() => setPresentationTextOpen(true)}
      />
      <PresentationTextModal
        isOpen={presentationTextOpen}
        onClose={() => setPresentationTextOpen(false)}
      />
    </div>
  );
}
