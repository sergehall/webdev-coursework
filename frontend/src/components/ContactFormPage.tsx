// components/ContactFormPage.tsx
import { useState } from "react";

import PlainContactForm from "@/components/PlainContactForm";
import StyledContactForm from "@/components/StyledContactForm";

const ContactFormPage = () => {
  const [formType, setFormType] = useState<"plain" | "styled" | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-6 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white/90 p-8 shadow-xl dark:bg-gray-800 dark:text-white">
        <h2 className="mb-2 text-center text-2xl font-bold">Contact Form</h2>
        <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Select which version you'd like to use:
        </p>

        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setFormType("plain")}
            className={`rounded-lg px-5 py-2 font-semibold transition ${
              formType === "plain"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            Plain Form
          </button>

          <button
            onClick={() => setFormType("styled")}
            className={`rounded-lg px-5 py-2 font-semibold transition ${
              formType === "styled"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            Styled Form
          </button>
        </div>

        {formType === "plain" && <PlainContactForm />}
        {formType === "styled" && <StyledContactForm />}
      </div>
    </div>
  );
};

export default ContactFormPage;
