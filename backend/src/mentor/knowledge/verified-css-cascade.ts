/** A narrow, source-backed answer for the origin comparison the model failed in beta. */
export function verifiedCssCascadeAnswer(question: string): string | null {
  const text = question.toLowerCase();
  if (
    question.length > 500 ||
    !/\b(css|cascade)\b/.test(text) ||
    !/\buser\b/.test(text) ||
    !/\bauthor\b/.test(text) ||
    !/\b(normal|important)\b/.test(text) ||
    !/\b(order|priority|precedence|outrank|override|overrides|win|wins|cascade|higher|beat|beats)\b/.test(
      text
    ) ||
    /\b(user-agent|browser|animation|transition|layer|shadow|inline)\b/.test(
      text
    )
  )
    return null;

  return (
    "For declarations competing on the same property, CSS Cascade Level 5 orders " +
    "these origins from higher to lower priority: **user `!important` > author `!important` > " +
    "normal author > normal user**. A user stylesheet is distinct from browser defaults " +
    "(the user-agent origin). Origin and importance are compared before selector specificity. " +
    "Check a conflicting property in DevTools and identify each declaration's origin and " +
    "`!important` status. [W3C CSS Cascade §6.1](https://www.w3.org/TR/css-cascade-5/#cascade-sort)."
  );
}
