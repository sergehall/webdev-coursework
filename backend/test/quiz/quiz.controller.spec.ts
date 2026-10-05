import { QuizController } from "../../src/quiz/api/quiz.controller";
import type { QuizService } from "../../src/quiz/service/quiz.service";
import type { QuizImageStorage } from "../../src/quiz/images/quiz-image.storage";

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
  let imageStorage: jest.Mocked<Pick<QuizImageStorage, "save" | "remove">>;
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
    imageStorage = {
      save: jest.fn().mockResolvedValue([]),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    controller = new QuizController(
      quizService as unknown as QuizService,
      imageStorage as unknown as QuizImageStorage
    );
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

  it("saves uploaded images before persisting their paths", async () => {
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
      images: ["/uploads/00000000-0000-0000-0000-000000000000.png"],
    } as never);
    imageStorage.save.mockResolvedValue([
      "/uploads/00000000-0000-0000-0000-000000000000.png",
    ]);
    const file = { originalname: "image-1.png" } as Express.Multer.File;

    await controller.createQuestion("quiz-1", dto, {
      images: [file],
    });

    expect(imageStorage.save).toHaveBeenCalledWith([file]);
    expect(quizService.createAndSaveQuestion).toHaveBeenCalledWith(
      {
        ...dto,
        quizId: "quiz-1",
      },
      ["/uploads/00000000-0000-0000-0000-000000000000.png"]
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

    expect(imageStorage.save).toHaveBeenCalledWith([]);
    expect(quizService.createAndSaveQuestion).toHaveBeenCalledWith(
      {
        ...dto,
        quizId: "quiz-1",
      },
      []
    );
  });

  it("removes newly uploaded images if the question cannot be saved", async () => {
    const path = "/uploads/00000000-0000-0000-0000-000000000000.png";
    imageStorage.save.mockResolvedValue([path]);
    quizService.createAndSaveQuestion.mockRejectedValue(new Error("DB failed"));

    await expect(
      controller.createQuestion(
        "quiz-1",
        {
          quizId: "quiz-1",
          questionId: 1,
          questionText: "Question text",
          options: ["A", "B"],
        },
        { images: [{ originalname: "image.png" } as Express.Multer.File] }
      )
    ).rejects.toThrow("DB failed");
    expect(imageStorage.remove).toHaveBeenCalledWith([path]);
  });

  it("delegates progress lookup to the quiz service", async () => {
    quizService.getProgress.mockResolvedValue([1, 2]);

    await expect(
      controller.getProgress({
        clientId: "client-1",
        appId: "app-1",
        courseId: "course-1",
      })
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
