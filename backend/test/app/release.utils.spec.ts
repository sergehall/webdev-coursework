import { getReleaseIdentifier } from "../../src/app/release.utils";

describe("getReleaseIdentifier", () => {
  it("prefers HEROKU_RELEASE_VERSION", () => {
    expect(
      getReleaseIdentifier({
        HEROKU_RELEASE_VERSION: "v123",
        SOURCE_VERSION: "abcdef1234567890",
      })
    ).toBe("v123");
  });

  it("uses SOURCE_VERSION when release variables are missing", () => {
    expect(getReleaseIdentifier({ SOURCE_VERSION: "abcdef1234567890" })).toBe(
      "commit:abcdef123456"
    );
  });

  it("falls back to local when no metadata exists", () => {
    expect(getReleaseIdentifier({})).toBe("local");
  });
});
