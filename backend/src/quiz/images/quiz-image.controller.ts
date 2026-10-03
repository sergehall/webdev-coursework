import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import type { Response } from "express";
import { QuizImageStorage } from "./quiz-image.storage";

@Controller("uploads")
@ApiExcludeController()
export class QuizImageController {
  constructor(private readonly storage: QuizImageStorage) {}

  @Get(":fileName")
  async getImage(
    @Param("fileName") fileName: string,
    @Res({ passthrough: true }) response: Response
  ): Promise<StreamableFile> {
    const image = await this.storage.read(fileName);
    response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    response.setHeader("X-Content-Type-Options", "nosniff");
    return new StreamableFile(image.body, {
      type: image.mimeType,
      length: image.body.length,
    });
  }
}
