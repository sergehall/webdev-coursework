import type { INestApplication } from "@nestjs/common";

import { configureValidation } from "../../src/bootstrap/configure-validation";

describe("configureValidation", () => {
  it("registers the validation pipe without resolving class-validator internals from Nest", () => {
    const useGlobalPipes = jest.fn();
    const get = jest.fn(() => {
      throw new Error("Unexpected provider lookup");
    });
    const app = {
      get,
      useGlobalPipes,
    } as unknown as INestApplication;

    expect(() => configureValidation(app)).not.toThrow();
    expect(get).not.toHaveBeenCalled();
    expect(useGlobalPipes).toHaveBeenCalledTimes(1);
  });
});
