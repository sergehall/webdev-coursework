import { BadRequestException, PayloadTooLargeException } from "@nestjs/common";
import sharp = require("sharp");
import type sharpDefault from "sharp";
const createImage = sharp as unknown as typeof sharpDefault;

export const MAX_QUESTION_IMAGE_UPLOAD_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 16_000_000;
const MAX_IMAGE_FRAMES = 20;

const imageTypes = {
  jpeg: { mimeType: "image/jpeg", extension: "jpg" },
  png: { mimeType: "image/png", extension: "png" },
  webp: { mimeType: "image/webp", extension: "webp" },
  gif: { mimeType: "image/gif", extension: "gif" },
} as const;

export type QuizImageExtension =
  (typeof imageTypes)[keyof typeof imageTypes]["extension"];

export function mimeTypeForExtension(extension: QuizImageExtension): string {
  return Object.values(imageTypes).find((type) => type.extension === extension)!
    .mimeType;
}

export async function normalizeQuizImage(
  file: Pick<Express.Multer.File, "buffer" | "mimetype" | "size">
): Promise<{ body: Buffer; mimeType: string; extension: QuizImageExtension }> {
  if (
    !Buffer.isBuffer(file.buffer) ||
    file.buffer.length === 0 ||
    file.buffer.length > MAX_QUESTION_IMAGE_UPLOAD_BYTES ||
    file.size > MAX_QUESTION_IMAGE_UPLOAD_BYTES
  ) {
    throw new BadRequestException("An image file is required");
  }

  let metadata: sharp.Metadata;
  try {
    metadata = await createImage(file.buffer, {
      animated: true,
      failOn: "warning",
      limitInputPixels: MAX_IMAGE_PIXELS,
    }).metadata();
  } catch {
    throw new BadRequestException("Invalid image content");
  }

  if (!metadata.format || !(metadata.format in imageTypes)) {
    throw new BadRequestException("Unsupported image format");
  }
  const format = metadata.format as keyof typeof imageTypes;
  const imageType = imageTypes[format];
  const frames = metadata.pages ?? 1;
  if (
    file.mimetype !== imageType.mimeType ||
    !metadata.width ||
    !metadata.height ||
    frames > MAX_IMAGE_FRAMES ||
    metadata.width * metadata.height * frames > MAX_IMAGE_PIXELS
  ) {
    throw new BadRequestException("Invalid image type or dimensions");
  }

  let body: Buffer;
  try {
    // Decoding and re-encoding verifies all pixels and removes untrusted metadata.
    body = await createImage(file.buffer, {
      animated: true,
      failOn: "warning",
      limitInputPixels: MAX_IMAGE_PIXELS,
    })
      .toFormat(format)
      .toBuffer();
  } catch {
    throw new BadRequestException("Invalid image content");
  }
  if (body.length > MAX_QUESTION_IMAGE_UPLOAD_BYTES) {
    throw new PayloadTooLargeException("Normalized image exceeds 5 MiB");
  }

  return { body, mimeType: imageType.mimeType, extension: imageType.extension };
}
