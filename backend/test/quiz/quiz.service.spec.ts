import { NotFoundException } from "@nestjs/common";

import { QuizService } from "../../src/quiz/service/quiz.service";
import type { CorrectAnswerRepository } from "../../src/quiz/repository/correct-answer.repository";
import type { QuizProgressRepository } from "../../src/quiz/repository/quiz-progress.repository";
import type { QuizQuestionRepository } from "../../src/quiz/repository/quiz-question.repository";

describe("QuizService", () => {
  let quizQuestionRepo: jest.Mocked<
    Pick<QuizQuestionRepository, "findAllByQuizId" | "create" | "save">
  >;
  let correctAnswerRepo: jest.Mocked<
    Pick<CorrectAnswerRepository, "findAllByQuizId">
  >;
  let quizProgressRepo: jest.Mocked<
    Pick<
      QuizProgressRepository,
      | "findByClientAppAndCourse"
      | "markCompleted"
      | "unmarkCompleted"
      | "resetProgress"
    >
  >;
  let service: QuizService;

  beforeEach(() => {
    quizQuestionRepo = {
      findAllByQuizId: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    correctAnswerRepo = {
      findAllByQuizId: jest.fn(),
    };
    quizProgressRepo = {
      findByClientAppAndCourse: jest.fn(),
      markCompleted: jest.fn(),
      unmarkCompleted: jest.fn(),
      resetProgress: jest.fn(),
    };

    service = new QuizService(
      quizQuestionRepo as unknown as QuizQuestionRepository,
      correctAnswerRepo as unknown as CorrectAnswerRepository,
      quizProgressRepo as unknown as QuizProgressRepository
    );
  });

  describe("getQuizWithQuestions", () => {
    it("maps stored records into the public DTO shape", async () => {
      quizQuestionRepo.findAllByQuizId.mockResolvedValue([
        {
          questionId: 1,
          questionText: "What is HTML?",
          options: ["Markup", "Language"],
          images: null,
        },
      ] as never);

      await expect(service.getQuizWithQuestions("quiz-1")).resolves.toEqual([
        {
          questionId: 1,
          questionText: "What is HTML?",
          options: ["Markup", "Language"],
          images: [],
        },
      ]);
    });

    it("throws when the quiz has no questions", async () => {
      quizQuestionRepo.findAllByQuizId.mockResolvedValue([]);

      await expect(service.getQuizWithQuestions("missing-quiz")).rejects.toThrow(
        new NotFoundException('Quiz with ID "missing-quiz" not found')
      );
    });
  });

  describe("getCorrectAnswers", () => {
    it("maps stored answers into the public DTO shape", async () => {
      correctAnswerRepo.findAllByQuizId.mockResolvedValue([
        {
          questionId: 1,
          correctAnswer: [0],
        },
      ] as never);

      await expect(service.getCorrectAnswers("quiz-1")).resolves.toEqual([
        {
          quizId: "quiz-1",
          questionId: 1,
          correctAnswer: [0],
        },
      ]);
    });

    it("throws when the quiz has no correct answers", async () => {
      correctAnswerRepo.findAllByQuizId.mockResolvedValue([]);

      await expect(service.getCorrectAnswers("missing-quiz")).rejects.toThrow(
        new NotFoundException('Answers for quiz "missing-quiz" not found')
      );
    });
  });

  describe("createAndSaveQuestion", () => {
    it("creates a question entity and persists it", async () => {
      const dto = {
        quizId: "quiz-1",
        questionId: 1,
        questionText: "Question text",
        options: ["A", "B"],
      };
      const createdQuestion = { ...dto, images: ["/uploads/q1.png"] };
      quizQuestionRepo.create.mockReturnValue(createdQuestion as never);
      quizQuestionRepo.save.mockResolvedValue(createdQuestion as never);

      await expect(
        service.createAndSaveQuestion(dto, ["/uploads/q1.png"])
      ).resolves.toEqual(createdQuestion);

      expect(quizQuestionRepo.create).toHaveBeenCalledWith({
        quizId: "quiz-1",
        questionId: 1,
        questionText: "Question text",
        options: ["A", "B"],
        images: ["/uploads/q1.png"],
      });
      expect(quizQuestionRepo.save).toHaveBeenCalledWith(createdQuestion);
    });
  });

  describe("progress methods", () => {
    it("returns an empty array when no progress record exists", async () => {
      quizProgressRepo.findByClientAppAndCourse.mockResolvedValue(null);

      await expect(
        service.getProgress("client-1", "app-1", "course-1")
      ).resolves.toEqual([]);
    });

    it("returns completed modules when progress exists", async () => {
      quizProgressRepo.findByClientAppAndCourse.mockResolvedValue({
        completedModules: [1, 2, 3],
      } as never);

      await expect(
        service.getProgress("client-1", "app-1", "course-1")
      ).resolves.toEqual([1, 2, 3]);
    });

    it("delegates mark, unmark and reset operations to the repository", async () => {
      await service.markModuleCompleted("client-1", "app-1", "course-1", 4);
      await service.unmarkModuleCompleted("client-1", "app-1", "course-1", 4);
      await service.resetProgress("client-1", "app-1", "course-1");

      expect(quizProgressRepo.markCompleted).toHaveBeenCalledWith(
        "client-1",
        "app-1",
        "course-1",
        4
      );
      expect(quizProgressRepo.unmarkCompleted).toHaveBeenCalledWith(
        "client-1",
        "app-1",
        "course-1",
        4
      );
      expect(quizProgressRepo.resetProgress).toHaveBeenCalledWith(
        "client-1",
        "app-1",
        "course-1"
      );
    });
  });
});
