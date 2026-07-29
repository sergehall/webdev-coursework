import type { DataSource, EntityManager } from "typeorm";

import { QuizProgressRepository } from "../../src/quiz/repository/quiz-progress.repository";

describe("QuizProgressRepository", () => {
  const query = jest.fn();
  const dataSource = {
    createEntityManager: jest.fn(
      () =>
        ({
          query,
        }) as unknown as EntityManager
    ),
  } as unknown as DataSource;

  let repository: QuizProgressRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    query.mockResolvedValue([]);
    repository = new QuizProgressRepository(dataSource);
  });

  it("marks a module with one atomic upsert that merges concurrent completions", async () => {
    await repository.markCompleted("client-1", "app-1", "CS85", 3);

    expect(query).toHaveBeenCalledTimes(1);
    const [sql, parameters] = query.mock.calls[0] as [string, unknown[]];
    expect(sql).toContain('ON CONFLICT ("clientId", "appId", "courseId")');
    expect(sql).toContain('"webdev_quiz_progress"."completedModules"');
    expect(sql).toContain('EXCLUDED."completedModules"');
    expect(parameters.slice(0, 4)).toEqual(["client-1", "app-1", "CS85", 3]);
    expect(parameters[4]).toEqual(expect.any(String));
  });

  it("unmarks a module with an atomic array update", async () => {
    await repository.unmarkCompleted("client-1", "app-1", "CS85", 3);

    expect(query).toHaveBeenCalledWith(
      expect.stringContaining(
        'SET "completedModules" = array_remove("completedModules", $4)'
      ),
      ["client-1", "app-1", "CS85", 3]
    );
  });
});
