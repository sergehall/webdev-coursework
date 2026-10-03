import {
  DeleteObjectCommand,
  PutObjectCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import sharp = require("sharp");
import type sharpDefault from "sharp";
import {
  createQuizImageS3Client,
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
