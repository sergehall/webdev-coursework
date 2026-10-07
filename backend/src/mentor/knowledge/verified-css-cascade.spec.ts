import { verifiedCssCascadeAnswer } from "./verified-css-cascade";

describe("verified CSS origin explanation", () => {
  it("answers the beta failure with the W3C order and a source", () => {
    const answer = verifiedCssCascadeAnswer(
      "Explain how normal and important user and author CSS declarations are ordered in the cascade."
    );
    expect(answer).toContain("user `!important` > author `!important`");
    expect(answer).toContain("normal author > normal user");
    expect(answer).toContain(
      "https://www.w3.org/TR/css-cascade-5/#cascade-sort"
    );
  });

  it("leaves broader CSS topics and unrelated questions to the model", () => {
    expect(
      verifiedCssCascadeAnswer(
        "How do browser user-agent styles, animations and author CSS rules compare?"
      )
    ).toBeNull();
    expect(
      verifiedCssCascadeAnswer("How should I practice responsive CSS?")
    ).toBeNull();
  });

  it("corrects a differently worded misconception about user styles", () => {
    expect(
      verifiedCssCascadeAnswer(
        "Does a normal user CSS rule override a normal author rule in the cascade?"
      )
    ).toContain("normal author > normal user");
  });
});
