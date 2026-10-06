import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { MentorAccountAccess } from "../access/mentor-account-access";
import {
  GenerationService,
  type AppEvent,
} from "../generation/generation.service";
import { exact, record, string, uuid } from "./mentor-input";
import { MentorErrorFilter } from "./mentor-error.filter";

@Controller("api/mentor")
@UseFilters(MentorErrorFilter)
export class MentorGenerationController {
  constructor(
    private readonly access: MentorAccountAccess,
    private readonly generation: GenerationService
  ) {}

  @Post("conversations/:id/messages")
  async message(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: string,
    @Body() body: unknown
  ) {
    const accountId = await this.access.accountId(
      req,
      "generation.create",
      true
    );
    const conversationId = uuid(id);
    const input = record(body);
    exact(input, ["content", "clientRequestId", "intent"]);
    if (input.intent !== "chat" && input.intent !== "propose_plan")
      throw new BadRequestException("Invalid generation intent");
    const content = string(input.content, 4000);
    const requestId = uuid(input.clientRequestId);
    const started = await this.generation.start(
      accountId,
      conversationId,
      requestId,
      content,
      input.intent
    );
    if (started.duplicate) {
      res
        .status(200)
        .json(await this.generation.receipt(accountId, started.row.id));
      return;
    }
    const idOfGeneration = started.row.id;
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, private, no-transform");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();
    let finished = false;
    res.on("close", () => {
      if (!finished)
        void this.generation
          .cancel(accountId, idOfGeneration)
          .catch(() => undefined);
    });
    const write = (event: AppEvent) => {
      if (!res.destroyed)
        res.write(`event: ${event.event}\ndata: ${JSON.stringify(event)}\n\n`);
    };
    write({
      event: "accepted",
      generationId: idOfGeneration,
      userMessageId: started.row.user_message_id,
    });
    try {
      const stream =
        input.intent === "propose_plan"
          ? this.generation.runPlan(
              accountId,
              idOfGeneration,
              content,
              started.remaining
            )
          : this.generation.run(
              accountId,
              conversationId,
              idOfGeneration,
              content,
              started.remaining
            );
      for await (const event of stream) write(event);
    } catch {
      write({
        event: "failed",
        code: "STORAGE_UNAVAILABLE",
        partial: true,
        canRetry: false,
      });
    } finally {
      finished = true;
      if (!res.destroyed) res.end();
    }
  }

  @Get("generations/:id")
  async status(@Req() req: Request, @Param("id") id: string) {
    const accountId = await this.access.accountId(req, "generation.status");
    return this.generation.receipt(accountId, uuid(id));
  }

  @Post("generations/:id/cancel")
  async cancel(@Req() req: Request, @Param("id") id: string) {
    const accountId = await this.access.accountId(
      req,
      "generation.cancel",
      true
    );
    return this.generation.cancel(accountId, uuid(id));
  }
}
