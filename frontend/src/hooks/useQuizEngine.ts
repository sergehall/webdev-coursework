// src/hooks/useQuizEngine.ts
import { useState } from "react";

import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export function useQuizEngine(
  questions: UIQuestion[],
  answers: CorrectAnswerDto[]
) {
  const [userAnswers, setUserAnswers] = useState<(number[] | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());

  const handleSelect = (questionId: number, optionIndex: number) => {
    const qIndex = questions.findIndex((q) => q.id === questionId);
    if (qIndex === -1) return;

    const updated = [...userAnswers];
    const isMultiple = questions[qIndex].multiple;

    if (isMultiple) {
      const current = updated[qIndex] || [];
      updated[qIndex] = current.includes(optionIndex)
        ? current.filter((i) => i !== optionIndex)
        : [...current, optionIndex];
    } else {
      updated[qIndex] = [optionIndex];
    }

    setUserAnswers(updated);
  };

  const isCorrect = (userAnswer: number[] | null, correctAnswer: number[]) => {
    if (!userAnswer) return false;
    const sortedUser = [...userAnswer].sort();
    const sortedCorrect = [...correctAnswer].sort();
    return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
  };

  const correctCount = questions.reduce((acc, q, i) => {
    const correctAnswer =
      answers.find((a) => a.questionId === q.id)?.correctAnswer ?? [];
    if (submitted && isCorrect(userAnswers[i], correctAnswer)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const resetQuiz = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  };

  const formatDuration = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  const submitTime = new Date();
  const formattedTime = submitTime.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedHour = submitTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    userAnswers,
    setUserAnswers,
    submitted,
    setSubmitted,
    startTime,
    handleSelect,
    correctCount,
    resetQuiz,
    formatDuration,
    formattedTime,
    formattedHour,
  };
}
