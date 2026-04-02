import { QuizController } from "../../src/quiz/api/quiz.controller";
import type { QuizService } from "../../src/quiz/service/quiz.service";

describe("QuizController", () => {
  let quizService: jest.Mocked<
    Pick<
      QuizService,
      | "getQuizWithQuestions"
      | "getCorrectAnswers"
      | "createAndSaveQuestion"
      | "getProgress"
      | "markModuleCompleted"
      | "unmarkModuleCompleted"
      | "resetProgress"
    >
  >;
  let controller: QuizController;

  beforeEach(() => {
    quizService = {
      getQuizWithQuestions: jest.fn(),
      getCorrectAnswers: jest.fn(),
      createAndSaveQuestion: jest.fn(),
      getProgress: jest.fn(),
      markModuleCompleted: jest.fn(),
      unmarkModuleCompleted: jest.fn(),
      resetProgress: jest.fn(),
    };

    controller = new QuizController(quizService as unknown as QuizService);
  });

  it("returns quiz questions for the given quiz id", async () => {
    quizService.getQuizWithQuestions.mockResolvedValue([
      {
        questionId: 1,
        questionText: "What is HTML?",
        options: ["Markup", "Language"],
        images: [],
      },
    ]);

    await expect(controller.getQuizQuestions("quiz-1")).resolves.toEqual([
      {
        questionId: 1,
        questionText: "What is HTML?",
        options: ["Markup", "Language"],
        images: [],
      },
    ]);
    expect(quizService.getQuizWithQuestions).toHaveBeenCalledWith("quiz-1");
  });

  it("returns quiz answers for the given quiz id", async () => {
    quizService.getCorrectAnswers.mockResolvedValue([
      {
        quizId: "quiz-1",
        questionId: 1,
        correctAnswer: [0],
      },
    ]);

    await expect(controller.getQuizAnswers("quiz-1")).resolves.toEqual([
      {
        quizId: "quiz-1",
        questionId: 1,
        correctAnswer: [0],
      },
    ]);
    expect(quizService.getCorrectAnswers).toHaveBeenCalledWith("quiz-1");
  });

  it("maps uploaded image filenames to public upload paths when creating a question", async () => {
    const dto = {
      quizId: "ignored-by-controller",
      questionId: 1,
      questionText: "Question text",
      options: ["A", "B"],
    };
    quizService.createAndSaveQuestion.mockResolvedValue({
      quizId: "quiz-1",
      questionId: 1,
      questionText: "Question text",
      options: ["A", "B"],
      images: ["/uploads/image-1.png"],
    } as never);

    await controller.createQuestion("quiz-1", dto, {
      images: [{ filename: "image-1.png" } as Express.Multer.File],
    });

    expect(quizService.createAndSaveQuestion).toHaveBeenCalledWith(
      {
        ...dto,
        quizId: "quiz-1",
      },
      ["/uploads/image-1.png"]
    );
  });

  it("passes an empty image list when no files are uploaded", async () => {
    const dto = {
      quizId: "ignored-by-controller",
      questionId: 1,
      questionText: "Question text",
      options: ["A", "B"],
    };

    await controller.createQuestion("quiz-1", dto, {});

    expect(quizService.createAndSaveQuestion).toHaveBeenCalledWith(
      {
        ...dto,
        quizId: "quiz-1",
      },
      []
    );
  });

  it("delegates progress lookup to the quiz service", async () => {
    quizService.getProgress.mockResolvedValue([1, 2]);

    await expect(
      controller.getProgress("client-1", "app-1", "course-1")
    ).resolves.toEqual([1, 2]);
    expect(quizService.getProgress).toHaveBeenCalledWith(
      "client-1",
      "app-1",
      "course-1"
    );
  });

  it("delegates marking and unmarking progress to the quiz service", async () => {
    const body = {
      clientId: "client-1",
      appId: "app-1",
      courseId: "course-1",
      moduleNumber: 4,
    };

    await controller.markProgress(body);
    await controller.unmarkProgress(body);

    expect(quizService.markModuleCompleted).toHaveBeenCalledWith(
      "client-1",
      "app-1",
      "course-1",
      4
    );
    expect(quizService.unmarkModuleCompleted).toHaveBeenCalledWith(
      "client-1",
      "app-1",
      "course-1",
      4
    );
  });

  it("delegates reset progress to the quiz service", async () => {
    await controller.resetProgress({
      clientId: "client-1",
      appId: "app-1",
      courseId: "course-1",
    });

    expect(quizService.resetProgress).toHaveBeenCalledWith(
      "client-1",
      "app-1",
      "course-1"
    );
  });
});
