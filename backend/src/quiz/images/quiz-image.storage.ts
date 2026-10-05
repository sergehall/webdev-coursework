import {
  BadGatewayException,
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import {
  MAX_QUESTION_IMAGE_UPLOAD_BYTES,
  mimeTypeForExtension,
  normalizeQuizImage,
  type QuizImageExtension,
} from "./normalize-quiz-image";

export const QUIZ_IMAGE_S3_CLIENT = Symbol("QUIZ_IMAGE_S3_CLIENT");
const IMAGE_NAME =
  /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(jpg|png|webp|gif)$/;
const OBJECT_PREFIX = "quiz-images/";
export const MAX_CONCURRENT_IMAGE_READS = 8;
const IMAGE_READ_TIMEOUT_MS = 10_000;

export function createQuizImageS3Client(config: ConfigService): S3Client {
  const endpoint = config.get<string>("QUIZ_IMAGE_S3_ENDPOINT")?.trim();
  const accessKeyId = config.get<string>("QUIZ_IMAGE_S3_ACCESS_KEY_ID")?.trim();
  const secretAccessKey = config
    .get<string>("QUIZ_IMAGE_S3_SECRET_ACCESS_KEY")
    ?.trim();
  if (Boolean(accessKeyId) !== Boolean(secretAccessKey)) {
    throw new Error("Quiz image S3 credentials must be configured together");
  }
  if (endpoint && (!accessKeyId || !secretAccessKey)) {
    throw new Error(
      "A custom quiz image S3 endpoint requires dedicated credentials"
    );
  }
  if (endpoint) {
    const url = new URL(endpoint);
    if (
      (url.protocol !== "https:" && process.env.NODE_ENV === "production") ||
      !["http:", "https:"].includes(url.protocol)
    ) {
      throw new Error("Quiz image S3 endpoint must use HTTPS in production");
    }
  }
  return new S3Client({
    region: config.get<string>("QUIZ_IMAGE_S3_REGION")?.trim() || "us-east-1",
    maxAttempts: 2,
    ...(endpoint ? { endpoint, forcePathStyle: true } : {}),
    ...(accessKeyId && secretAccessKey
      ? { credentials: { accessKeyId, secretAccessKey } }
      : {}),
  });
}

@Injectable()
export class QuizImageStorage {
  private activeReads = 0;
  constructor(
    @Inject(QUIZ_IMAGE_S3_CLIENT) private readonly client: S3Client,
    private readonly config: ConfigService
  ) {}

  private bucket(): string {
    const bucket = this.config.get<string>("QUIZ_IMAGE_S3_BUCKET")?.trim();
    if (!bucket) {
      throw new ServiceUnavailableException(
        "Quiz image storage is unavailable"
      );
    }
    return bucket;
  }

  async save(files: Express.Multer.File[]): Promise<string[]> {
    if (files.length === 0) return [];
    const bucket = this.bucket();
    const images = [];
    for (const file of files) images.push(await normalizeQuizImage(file));

    const keys: string[] = [];
    try {
      for (const image of images) {
        const fileName = `${randomUUID()}.${image.extension}`;
        const key = `${OBJECT_PREFIX}${fileName}`;
        await this.client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: image.body,
            ContentType: image.mimeType,
            ContentLength: image.body.length,
            CacheControl: "public, max-age=31536000, immutable",
          })
        );
        keys.push(key);
      }
    } catch {
      await Promise.allSettled(
        keys.map((key) =>
          this.client.send(
            new DeleteObjectCommand({ Bucket: bucket, Key: key })
          )
        )
      );
      throw new ServiceUnavailableException(
        "Quiz image storage is unavailable"
      );
    }
    return keys.map((key) => `/uploads/${key.slice(OBJECT_PREFIX.length)}`);
  }

  async remove(paths: string[]): Promise<void> {
    if (paths.length === 0) return;
    const bucket = this.bucket();
    await Promise.allSettled(
      paths.map((path) => {
        const name = path.slice("/uploads/".length);
        if (!path.startsWith("/uploads/") || !IMAGE_NAME.test(name)) {
          return Promise.resolve();
        }
        return this.client.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: `${OBJECT_PREFIX}${name}`,
          })
        );
      })
    );
  }

  async read(fileName: string): Promise<{ body: Buffer; mimeType: string }> {
    const match = IMAGE_NAME.exec(fileName);
    if (!match) throw new NotFoundException("Image not found");
    const bucket = this.bucket();
    // No unbounded queue: this cap also protects against callers spread across IPs.
    if (this.activeReads >= MAX_CONCURRENT_IMAGE_READS) {
      throw new ServiceUnavailableException("Quiz image storage is busy");
    }
    this.activeReads++;
    const abortSignal = AbortSignal.timeout(IMAGE_READ_TIMEOUT_MS);
    let stopBody: (() => void) | undefined;
    try {
      const result = await this.client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: `${OBJECT_PREFIX}${fileName}`,
        }),
        { abortSignal }
      );
      const responseBody = result.Body;
      if (abortSignal.aborted) {
        // No stream collector is attached yet: close without emitting an
        // unhandled stream error, then reject the request explicitly.
        if (responseBody && "destroy" in responseBody) responseBody.destroy();
        throw new ServiceUnavailableException(
          "Quiz image storage is unavailable"
        );
      }
      stopBody = () => {
        if (responseBody && "destroy" in responseBody) {
          responseBody.destroy(new Error("Image read timed out"));
        }
      };
      abortSignal.addEventListener("abort", stopBody, { once: true });
      if (
        !result.Body ||
        !result.ContentLength ||
        result.ContentLength > MAX_QUESTION_IMAGE_UPLOAD_BYTES
      ) {
        if (result.Body && "destroy" in result.Body) {
          result.Body.destroy();
        }
        throw new BadGatewayException("Stored image is unavailable");
      }
      const body = Buffer.from(await result.Body.transformToByteArray());
      if (body.length !== result.ContentLength) {
        throw new BadGatewayException("Stored image is unavailable");
      }
      return {
        body,
        mimeType: mimeTypeForExtension(match[2] as QuizImageExtension),
      };
    } catch (error) {
      if (error instanceof BadGatewayException) throw error;
      if (
        error instanceof Error &&
        ["NoSuchKey", "NotFound"].includes(error.name)
      ) {
        throw new NotFoundException("Image not found");
      }
      throw new ServiceUnavailableException(
        "Quiz image storage is unavailable"
      );
    } finally {
      if (stopBody) abortSignal.removeEventListener("abort", stopBody);
      this.activeReads--;
    }
  }
}
