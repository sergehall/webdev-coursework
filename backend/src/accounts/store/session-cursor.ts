import { BadRequestException } from "@nestjs/common";

export function decodeSessionCursor(cursor?: string): {
  at: string | null;
  id: string | null;
} {
  let at: string | null = null,
    id: string | null = null;
  if (cursor) {
    try {
      const parsed = JSON.parse(
        Buffer.from(cursor, "base64url").toString("utf8")
      ) as { at: string; id: string };
      if (
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(parsed.at) ||
        new Date(parsed.at).toISOString() !== parsed.at ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          parsed.id
        )
      )
        throw new Error();
      at = parsed.at;
      id = parsed.id;
    } catch {
      throw new BadRequestException("Invalid sessions cursor");
    }
  }
  return { at, id };
}
