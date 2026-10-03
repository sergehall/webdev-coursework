import { assertAcceptablePassword } from "./password-policy";

describe("new password policy", () => {
  it("blocks whole common passwords even when they satisfy the length rule", () => {
    expect(() => assertAcceptablePassword("123456789987654321")).toThrow(
      expect.objectContaining({
        response: expect.objectContaining({ code: "PASSWORD_TOO_COMMON" }),
      })
    );
  });

  it("blocks a password equal to a current account identifier", () => {
    expect(() =>
      assertAcceptablePassword("learner@example.test", ["learner@example.test"])
    ).toThrow(
      expect.objectContaining({
        response: expect.objectContaining({ code: "PASSWORD_TOO_COMMON" }),
      })
    );
  });

  it("blocks a password equal to the service name", () => {
    expect(() => assertAcceptablePassword("WEBDEV-COURSEWORK")).toThrow(
      expect.objectContaining({
        response: expect.objectContaining({ code: "PASSWORD_TOO_COMMON" }),
      })
    );
  });

  it("accepts a distinct passphrase", () => {
    expect(() =>
      assertAcceptablePassword("owl-river-jade-forest-9842", ["learner"])
    ).not.toThrow();
  });
});
