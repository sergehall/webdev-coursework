export class CloudflareQuotaExhaustedError extends Error {
  constructor() {
    super("Cloudflare daily free allocation exhausted");
  }
}

export function cloudflareQuotaCode(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (Number(record.code) === 3036) return true;
  return (
    Array.isArray(record.errors) && record.errors.some(cloudflareQuotaCode)
  );
}

export async function throwProviderHttpError(
  response: Response
): Promise<never> {
  if (response.status === 429 && response.body) {
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (size < 4096) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        chunks.push(value);
      }
    } finally {
      await reader.cancel().catch(() => undefined);
      reader.releaseLock();
    }
    if (size <= 4096) {
      try {
        const body = JSON.parse(
          new TextDecoder().decode(Buffer.concat(chunks))
        ) as unknown;
        if (cloudflareQuotaCode(body))
          throw new CloudflareQuotaExhaustedError();
      } catch (error) {
        if (error instanceof CloudflareQuotaExhaustedError) throw error;
      }
    }
  }
  throw new Error(`Provider HTTP ${response.status}`);
}
