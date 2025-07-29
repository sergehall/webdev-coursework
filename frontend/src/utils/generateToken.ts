export async function generateQuizToken(
  quizId: string,
  secret: string
): Promise<string> {
  const data = `${quizId}:${secret}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(data)
  );
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
