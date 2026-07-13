import type {
  AssessmentAnswerState,
  AssessmentDefinition,
  AssessmentMetrics,
  AssessmentQuestion,
  AssessmentQuestionId,
  AssessmentResponse,
  CompletionQuestion,
} from "./types";

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, "").toLowerCase();
}

function numberSetsMatch(
  left: readonly number[],
  right: readonly number[]
): boolean {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort((a, b) => a - b);
  const sortedRight = [...right].sort((a, b) => a - b);
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function getCompletionBlanks(question: CompletionQuestion) {
  return question.lines
    .flat()
    .flatMap((segment) => (segment.blank ? [segment.blank] : []));
}

export function getQuestionResponse(
  answers: AssessmentAnswerState,
  questionId: AssessmentQuestionId
): AssessmentResponse | undefined {
  return answers[String(questionId)];
}

export function isQuestionAnswered(
  question: AssessmentQuestion,
  response: AssessmentResponse | undefined
): boolean {
  if (!response) return false;

  switch (question.kind) {
    case "single":
    case "multiple":
      return (
        response.kind === "choice" && response.selectedOptionIndexes.length > 0
      );
    case "text":
      return response.kind === "text" && response.value.trim().length > 0;
    case "completion": {
      if (response.kind !== "completion") return false;
      return getCompletionBlanks(question).every(
        (blank) => (response.values[blank.id] ?? "").trim().length > 0
      );
    }
  }
}

export function isQuestionCorrect(
  question: AssessmentQuestion,
  response: AssessmentResponse | undefined
): boolean {
  if (!response) return false;

  switch (question.kind) {
    case "single":
    case "multiple":
      return (
        response.kind === "choice" &&
        numberSetsMatch(response.selectedOptionIndexes, question.answer)
      );
    case "text": {
      if (response.kind !== "text") return false;
      const normalizedResponse = normalizeText(response.value);
      return question.answers.some(
        (answer) => normalizeText(answer) === normalizedResponse
      );
    }
    case "completion": {
      if (response.kind !== "completion") return false;
      return getCompletionBlanks(question).every(
        (blank) => response.values[blank.id] === blank.answer
      );
    }
  }
}

export function getAssessmentTotalPoints(
  questions: readonly AssessmentQuestion[]
): number {
  return questions.reduce((total, question) => total + question.points, 0);
}

export function getAssessmentMetrics(
  questions: readonly AssessmentQuestion[],
  answers: AssessmentAnswerState
): AssessmentMetrics {
  const totalPoints = getAssessmentTotalPoints(questions);
  let answeredCount = 0;
  let correctCount = 0;
  let earnedPoints = 0;

  for (const question of questions) {
    const response = getQuestionResponse(answers, question.id);
    if (isQuestionAnswered(question, response)) answeredCount += 1;
    if (isQuestionCorrect(question, response)) {
      correctCount += 1;
      earnedPoints += question.points;
    }
  }

  return {
    answeredCount,
    correctCount,
    earnedPoints,
    totalPoints,
    progressPercentage:
      questions.length === 0
        ? 0
        : Math.round((answeredCount / questions.length) * 100),
    scorePercentage:
      totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100),
  };
}

export function formatAssessmentTimer(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
}

export function formatAssessmentDuration(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes) + "m " + String(seconds).padStart(2, "0") + "s";
}

export function getQuestionDomId(
  assessmentId: string,
  questionId: AssessmentQuestionId
): string {
  return assessmentId + "-question-" + String(questionId);
}

export function assertAssessmentDefinition(
  definition: AssessmentDefinition
): void {
  if (
    definition.id.trim().length === 0 ||
    definition.storageKey.trim().length === 0 ||
    definition.accessCode.trim().length === 0
  ) {
    throw new Error("Assessment identity and access fields cannot be empty.");
  }
  if (definition.questions.length === 0) {
    throw new Error("Assessment must contain at least one question.");
  }
  if (
    !Number.isInteger(definition.durationSeconds) ||
    definition.durationSeconds <= 0
  ) {
    throw new Error("Assessment duration must be greater than zero.");
  }

  const questionIds = new Set<number>();
  for (const question of definition.questions) {
    if (!Number.isInteger(question.id) || question.id <= 0) {
      throw new Error("Assessment question ids must be positive integers.");
    }
    if (questionIds.has(question.id)) {
      throw new Error(
        "Assessment contains duplicate question id " + String(question.id) + "."
      );
    }
    questionIds.add(question.id);

    if (!Number.isFinite(question.points) || question.points <= 0) {
      throw new Error(
        "Question " + String(question.id) + " must award positive points."
      );
    }

    if (question.kind === "single" || question.kind === "multiple") {
      if (question.options.length < 2 || question.answer.length === 0) {
        throw new Error(
          "Question " + String(question.id) + " has an invalid choice contract."
        );
      }
      if (new Set(question.answer).size !== question.answer.length) {
        throw new Error(
          "Question " + String(question.id) + " repeats an answer index."
        );
      }
      if (question.kind === "single" && question.answer.length !== 1) {
        throw new Error(
          "Question " +
            String(question.id) +
            " must define exactly one correct answer."
        );
      }
      if (
        question.answer.some(
          (index) => index < 0 || index >= question.options.length
        )
      ) {
        throw new Error(
          "Question " + String(question.id) + " has an invalid answer index."
        );
      }
    }

    if (question.kind === "text") {
      if (
        question.answers.length === 0 ||
        question.answers.some((answer) => answer.trim().length === 0)
      ) {
        throw new Error(
          "Question " + String(question.id) + " needs an accepted text answer."
        );
      }
    }

    if (question.kind === "completion") {
      const blankIds = new Set<string>();
      for (const blank of getCompletionBlanks(question)) {
        if (blankIds.has(blank.id)) {
          throw new Error(
            "Question " +
              String(question.id) +
              " contains duplicate blank id " +
              blank.id +
              "."
          );
        }
        blankIds.add(blank.id);
        if (
          blank.options.length === 0 ||
          !blank.options.includes(blank.answer)
        ) {
          throw new Error(
            "Question " +
              String(question.id) +
              " has an invalid completion answer."
          );
        }
      }
      if (blankIds.size === 0) {
        throw new Error(
          "Question " + String(question.id) + " needs a completion blank."
        );
      }
    }
  }
}
