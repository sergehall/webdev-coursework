import React from "react";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

import { DownloadHtmlButton, ResetDayButton } from "@/components/buttons";
import SubmitButton from "@/components/buttons/SubmitButton";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const funnyResponses: Record<DayKey, { emoji: string; message: string }> = {
  monday: {
    emoji: "😞",
    message: "Oh no, it's Monday again? Hope you survive it!",
  },
  tuesday: { emoji: "😐", message: "Tuesday is just Monday with glasses." },
  wednesday: {
    emoji: "😕",
    message: "Midweek! You deserve a medal for surviving.",
  },
  thursday: {
    emoji: "🙂",
    message: "Almost Friday. You can smell the weekend!",
  },
  friday: { emoji: "😊", message: "Friday! Spiritually, you're already home." },
  saturday: { emoji: "😎", message: "Saturday – time to wake up… at noon." },
  sunday: { emoji: "😄", message: "Sunday: the last drop of freedom..." },
};

const AutocompleteDayForm = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDay.trim() === "") return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000); // simulate async submission
  };

  const resetForm = () => {
    setSelectedDay("");
    setSubmitted(false);
    setLoading(false);
  };

  const normalizedDay = selectedDay.toLowerCase();
  const result =
    normalizedDay in funnyResponses
      ? funnyResponses[normalizedDay as DayKey]
      : null;

  return (
    <div className="space-y-6">
      <div className="w-full rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-[0.95rem] font-medium italic text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <strong>Task:</strong> Create an autocomplete input element with an
        associated <code>&lt;datalist&gt;</code> that contains the days of the
        week.
      </div>

      <DownloadHtmlButton
        fileUrl="/code-playground/mod-1/autocomplete-day-form.html"
        filename="autocomplete-day-form.html"
      />

      <div className="mx-auto max-w-md space-y-6 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
          <CalendarDays size={20} className="shrink-0" />
          <span className="truncate">Choose Your Favorite Day</span>
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Day of the Week
              </label>
              <input
                type="text"
                list="days"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                placeholder="Start typing..."
                required
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-600"
              />
              <datalist id="days">
                {Object.keys(funnyResponses).map((day) => (
                  <option
                    key={day}
                    value={day[0].toUpperCase() + day.slice(1)}
                  />
                ))}
              </datalist>
            </div>

            <div className="flex justify-center">
              <SubmitButton loading={loading} submitted={submitted} />
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="text-4xl">{result ? result.emoji : "🤔"}</div>
            <p className="text-md font-medium text-gray-800 dark:text-gray-100">
              {result?.message ?? "Interesting choice!"}
            </p>
            <ResetDayButton onClick={resetForm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteDayForm;
