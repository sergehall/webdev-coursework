import {
  DeleteObjectCommand,
  PutObjectCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { Readable } from "node:stream";
import sharp = require("sharp");
import type sharpDefault from "sharp";
import {
  createQuizImageS3Client,
  MAX_CONCURRENT_IMAGE_READS,
  QuizImageStorage,
} from "./quiz-image.storage";

const createImage = sharp as unknown as typeof sharpDefault;

async function pngFile(): Promise<Express.Multer.File> {
  const buffer = await createImage({
    create: {
      width: 2,
      height: 2,
      channels: 4,
      background: "#ff0000",
    },
  })
    .png()
    .toBuffer();
  return {
    buffer,
    size: buffer.length,
    mimetype: "image/png",
  } as Express.Multer.File;
}

describe("QuizImageStorage", () => {
  it("destroys a stalled response body when the read deadline expires", async () => {
    const controller = new AbortController();
    jest.spyOn(AbortSignal, "timeout").mockReturnValue(controller.signal);
    const stream = new Readable({ read() {} });
    let collecting!: () => void;
    const started = new Promise<void>((resolve) => {
      collecting = resolve;
    });
    const body = Object.assign(stream, {
      transformToByteArray: () =>
        new Promise<Uint8Array>((_resolve, reject) => {
          stream.once("error", reject);
          collecting();
        }),
    });
    const send = jest.fn(async () => ({ ContentLength: 10, Body: body }));
    const storage = new QuizImageStorage(
      { send } as unknown as S3Client,
      new ConfigService({ QUIZ_IMAGE_S3_BUCKET: "test-bucket" })
    );
    const read = storage.read("00000000-0000-0000-0000-000000000000.png");
    const assertion = expect(read).rejects.toMatchObject({ status: 503 });
    await started;
    controller.abort();
    await assertion;
    expect(stream.destroyed).toBe(true);
  });
  it("caps concurrent upstream reads and releases slots on failures", async () => {
    const pending: Array<(value: unknown) => void> = [];
    const send = jest.fn(() => new Promise((resolve) => pending.push(resolve)));
    const storage = new QuizImageStorage(
      { send } as unknown as S3Client,
      new ConfigService({ QUIZ_IMAGE_S3_BUCKET: "test-bucket" })
    );
    const name = "00000000-0000-0000-0000-000000000000.png";
    const reads = Array.from({ length: MAX_CONCURRENT_IMAGE_READS }, () =>
      storage.read(name)
    );
    const settled = Promise.allSettled(reads);
    await expect(storage.read(name)).rejects.toMatchObject({ status: 503 });
    expect(send).toHaveBeenCalledTimes(MAX_CONCURRENT_IMAGE_READS);
    pending.forEach((resolve) => resolve({}));
    await settled;
    send.mockImplementation(async () => ({
      ContentLength: 1,
      Body: { transformToByteArray: async () => new Uint8Array([1]) },
    }));
    await expect(storage.read(name)).resolves.toMatchObject({
      body: Buffer.from([1]),
    });
  });

  it("aborts stalled upstream requests and frees their slot", async () => {
    const controller = new AbortController();
    jest.spyOn(AbortSignal, "timeout").mockReturnValue(controller.signal);
    const send = jest.fn(
      (_command: unknown, options: { abortSignal: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          options.abortSignal.addEventListener(
            "abort",
            () => reject(new Error("aborted")),
            { once: true }
          );
        })
    );
    const storage = new QuizImageStorage(
      { send } as unknown as S3Client,
      new ConfigService({ QUIZ_IMAGE_S3_BUCKET: "test-bucket" })
    );
    const read = storage.read("00000000-0000-0000-0000-000000000000.png");
    const assertion = expect(read).rejects.toMatchObject({ status: 503 });
    controller.abort();
    await assertion;
    expect(AbortSignal.timeout).toHaveBeenCalledWith(10_000);
  });
  it("fails closed when an image bucket has not been configured", async () => {
    const send = jest.fn();
    const storage = new QuizImageStorage(
      { send } as unknown as S3Client,
      new ConfigService({})
    );

    await expect(storage.save([await pngFile()])).rejects.toMatchObject({
      status: 503,
    });
    expect(send).not.toHaveBeenCalled();
    await expect(storage.save([])).resolves.toEqual([]);
  });

  it("removes prior objects when a later object write fails", async () => {
    const commands: unknown[] = [];
    let writes = 0;
    const send = jest.fn(async (command: unknown) => {
      commands.push(command);
      if (command instanceof PutObjectCommand && ++writes === 2) {
        throw new Error("S3 unavailable");
      }
      return {};
    });
    const storage = new QuizImageStorage(
      { send } as unknown as S3Client,
      new ConfigService({ QUIZ_IMAGE_S3_BUCKET: "test-bucket" })
    );
    const image = await pngFile();

    await expect(storage.save([image, image])).rejects.toMatchObject({
      status: 503,
    });
    const firstPut = commands[0] as PutObjectCommand;
    const cleanup = commands[2] as DeleteObjectCommand;
    expect(cleanup).toBeInstanceOf(DeleteObjectCommand);
    expect(cleanup.input.Key).toBe(firstPut.input.Key);
    expect(cleanup.input.Bucket).toBe("test-bucket");
  });

  it("rejects invalid public image names before calling S3", async () => {
    const send = jest.fn();
    const storage = new QuizImageStorage(
      { send } as unknown as S3Client,
      new ConfigService({ QUIZ_IMAGE_S3_BUCKET: "test-bucket" })
    );

    await expect(storage.read("../secrets.txt")).rejects.toMatchObject({
      status: 404,
    });
    expect(send).not.toHaveBeenCalled();
  });

  it("requires dedicated credentials for a custom S3 endpoint", () => {
    expect(() =>
      createQuizImageS3Client(
        new ConfigService({
          QUIZ_IMAGE_S3_ENDPOINT: "https://example.r2.cloudflarestorage.com",
          QUIZ_IMAGE_S3_REGION: "auto",
        })
      )
    ).toThrow("requires dedicated credentials");
  });
});
