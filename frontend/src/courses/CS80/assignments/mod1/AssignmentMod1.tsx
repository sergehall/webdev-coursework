// src/assignments/mod1/AssignmentMod1.tsx
import { useState } from "react";

import AutocompleteDayForm from "./tasks/AutocompleteDayForm";
import CampusFeedbackForm from "./tasks/CampusFeedbackForm";
import ClientVsServerExplanation from "./tasks/ClientVsServerExplanation";
import FavoriteDailyDeals from "./tasks/FavoriteDailyDeals";
import HtmlOrderedListWithFlavors from "./tasks/HtmlOrderedListWithFlavors";
import WebsiteRegistrationForm from "./tasks/WebsiteRegistrationForm";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import { ModuleCompletionButton } from "@/components/buttons";

export default function AssignmentMod1() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 1: Intro to HTML5 & Web Concepts
      </h2>

      <AnimatedAccordionItem
        title="1.11 – Client-side vs Server-side Programming"
        isOpen={openItem === "1.11"}
        onToggle={() => toggleItem("1.11")}
      >
        <ClientVsServerExplanation />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="2.6 – Lists with nested flavors"
        isOpen={openItem === "2.6"}
        onToggle={() => toggleItem("2.6")}
      >
        <HtmlOrderedListWithFlavors />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="2.8 – Favorite Daily Deal Websites"
        isOpen={openItem === "2.8"}
        onToggle={() => toggleItem("2.8")}
      >
        <FavoriteDailyDeals />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="2.16 – Campus Feedback Form"
        isOpen={openItem === "2.16"}
        onToggle={() => toggleItem("2.16")}
      >
        <CampusFeedbackForm />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="3.6 – Website Registration Form with Optional Survey"
        isOpen={openItem === "3.6"}
        onToggle={() => toggleItem("3.6")}
      >
        <WebsiteRegistrationForm />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="3.8 – Autocomplete Day Form"
        isOpen={openItem === "3.8"}
        onToggle={() => toggleItem("3.8")}
      >
        <AutocompleteDayForm />
      </AnimatedAccordionItem>
      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
