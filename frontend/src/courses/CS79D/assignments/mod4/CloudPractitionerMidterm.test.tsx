import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import CloudPractitionerMidterm from "./CloudPractitionerMidterm";

import { cs79dModule04MidtermQuizAnswers } from "@/courses/CS79D/data/modules/module04MidtermQuizAnswers";
import {
  cs79dCloudPractitionerMidtermDefinition,
  cs79dCloudPractitionerMidtermQuestions,
} from "@/courses/CS79D/data/modules/module04MidtermQuiz";
import { cs79dModule04MidtermQuizQuestions } from "@/courses/CS79D/data/modules/module04MidtermQuizQuestions";
import { getAssessmentTotalPoints } from "@/features/assessment";

const storageKey = "assessment:cs79d-cloud-practitioner-midterm:v1";

describe("CS79D Module 4 Cloud Practitioner midterm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  test("preserves all 67 source questions, answers, and points", () => {
    expect(cs79dCloudPractitionerMidtermQuestions).toHaveLength(67);
    expect(cs79dModule04MidtermQuizAnswers).toHaveLength(67);
    expect(
      getAssessmentTotalPoints(cs79dCloudPractitionerMidtermQuestions)
    ).toBe(67);
    expect(cs79dCloudPractitionerMidtermDefinition.durationSeconds).toBe(
      2 * 60 * 60
    );
    expect(cs79dCloudPractitionerMidtermQuestions.map(({ id }) => id)).toEqual(
      Array.from({ length: 67 }, (_, index) => index + 1)
    );

    const answersByQuestionId = new Map(
      cs79dModule04MidtermQuizAnswers.map((answer) => [
        answer.questionId,
        answer.correctAnswer,
      ])
    );

    cs79dModule04MidtermQuizQuestions.forEach((sourceQuestion, index) => {
      const migratedQuestion = cs79dCloudPractitionerMidtermQuestions[index];

      expect(migratedQuestion).toMatchObject({
        id: sourceQuestion.id,
        kind: sourceQuestion.multiple ? "multiple" : "single",
        points: 1,
        prompt: sourceQuestion.question,
        options: sourceQuestion.options,
        answer: answersByQuestionId.get(sourceQuestion.id),
      });
    });
  });

  test("requires the source access code and keeps details collapsed", () => {
    render(<CloudPractitionerMidterm />);

    expect(
      screen.getByRole("heading", {
        name: "Midterm: Cloud Practitioner Practice Exam",
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText("67", { selector: "dd" })).toHaveLength(2);
    expect(screen.getByText("2 hours")).toBeInTheDocument();

    const details = screen.getByTestId("cs79d-midterm-details");
    expect(details).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Midterm details"));
    expect(details).toHaveAttribute("open");
    expect(
      screen.getByText("The course deadline is May 17, 2026 at 11:59 pm.")
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "That access code is not valid"
    );

    unlockMidterm();

    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 67")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  test("uses native single-answer and multiple-answer controls", () => {
    render(<CloudPractitionerMidterm />);
    unlockMidterm();

    expect(screen.getAllByRole("radio").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
  });

  test("autosaves responses and requires review before submission", async () => {
    render(<CloudPractitionerMidterm />);
    unlockMidterm();

    answerFirstQuestion();

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    );
    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );

    fireEvent.click(screen.getByRole("button", { name: "Review & submit" }));
    expect(
      screen.getByRole("heading", { name: "Ready to submit?" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Attempt submitted")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit attempt" }));
    expect(screen.getByText("Attempt submitted")).toBeInTheDocument();
    expect(screen.getByText("1 / 67")).toBeInTheDocument();
  });

  test("restores a validated active attempt after remounting", async () => {
    const firstRender = render(<CloudPractitionerMidterm />);
    unlockMidterm();
    answerFirstQuestion();

    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toContain(
        '"status":"active"'
      )
    );
    firstRender.unmount();

    render(<CloudPractitionerMidterm />);

    expect(
      screen.queryByLabelText(/enter the access code/i)
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "saved attempt was restored"
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    );
  }, 10_000);
});

function unlockMidterm() {
  fireEvent.change(screen.getByLabelText(/enter the access code/i), {
    target: { value: cs79dCloudPractitionerMidtermDefinition.accessCode },
  });
  fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));
}

function answerFirstQuestion() {
  const questionCard = screen
    .getByRole("heading", { name: "Question 1" })
    .closest("article");
  expect(questionCard).not.toBeNull();
  if (!questionCard) return;

  const answer = within(questionCard).getByRole("radio", {
    name: /geographical area divided into availability zones/i,
  });
  fireEvent.click(answer);
}
