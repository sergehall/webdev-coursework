import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ESL10GPresentation2Page from "../presentation/ESL10GPresentation2Page";
import ESL10GPage, { ESL10GPresentationPage } from "../ESL10GPage";

export function renderPage(route = "/coursework/ESL10G") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route
          path="/coursework/ESL10G/presentation-2"
          element={<ESL10GPresentation2Page />}
        />
        <Route path="/coursework/ESL10G" element={<ESL10GPage />} />
        <Route
          path="/coursework/ESL10G/presentation-1"
          element={<ESL10GPresentationPage />}
        />
      </Routes>
    </MemoryRouter>
  );
}
