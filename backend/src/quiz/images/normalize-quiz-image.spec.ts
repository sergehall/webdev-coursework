import sharp = require("sharp");
import type sharpDefault from "sharp";
import {
  MAX_QUESTION_IMAGE_UPLOAD_BYTES,
  normalizeQuizImage,
} from "./normalize-quiz-image";

const createImage = sharp as unknown as typeof sharpDefault;

describe("normalizeQuizImage", () => {
  it.each([
    ["png", "image/png", "png"],
    ["jpeg", "image/jpeg", "jpg"],
    ["webp", "image/webp", "webp"],
    ["gif", "image/gif", "gif"],
  ] as const)("decodes and re-encodes %s", async (format, mime, extension) => {
    const buffer = await createImage({
      create: {
        width: 2,
        height: 2,
        channels: 4,
        background: "#0088ff",
      },
    })
      .toFormat(format)
      .toBuffer();

    const result = await normalizeQuizImage({
      buffer,
      size: buffer.length,
      mimetype: mime,
    });
    expect(result.mimeType).toBe(mime);
    expect(result.extension).toBe(extension);
    expect(await createImage(result.body).metadata()).toMatchObject({
      format,
      width: 2,
      height: 2,
    });
  });

  it("rejects SVG even when a client declares it as PNG", async () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"></svg>'
    );
    await expect(
      normalizeQuizImage({ buffer, size: buffer.length, mimetype: "image/png" })
    ).rejects.toMatchObject({ status: 400 });
  });

  it("rejects an oversized buffer even if its reported size is smaller", async () => {
    await expect(
      normalizeQuizImage({
        buffer: Buffer.alloc(MAX_QUESTION_IMAGE_UPLOAD_BYTES + 1),
        size: 1,
        mimetype: "image/png",
      })
    ).rejects.toMatchObject({ status: 400 });
  });
});
