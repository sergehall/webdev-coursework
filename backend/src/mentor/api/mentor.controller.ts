import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  NestInterceptor,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  ServiceUnavailableException,
  UseFilters,
  UseInterceptors,
  type CallHandler,
  type ExecutionContext,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { Observable } from "rxjs";
import { MentorErrorFilter } from "./mentor-error.filter";
import { MentorAccountAccess } from "../access/mentor-account-access";
import { MentorProfileStore } from "../profile/mentor-profile.store";
import { MentorConversationStore } from "../conversation/mentor-conversation.store";
import { MentorPathwayStore } from "../pathway/mentor-pathway.store";
import {
  exact,
  integer,
  milestoneInput,
  profileInput,
  record,
  string,
  uuid,
} from "./mentor-input";

@Injectable()
class NoStoreInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader("Cache-Control", "no-store, private");
    return next.handle();
  }
}
@Controller("api/mentor")
@UseInterceptors(NoStoreInterceptor)
@UseFilters(MentorErrorFilter)
export class MentorController {
  constructor(
    private readonly access: MentorAccountAccess,
    private readonly profiles: MentorProfileStore,
    private readonly conversations: MentorConversationStore,
    private readonly paths: MentorPathwayStore
  ) {}
  private previewOnly() {
    if (process.env.NODE_ENV === "production")
      throw new ServiceUnavailableException({
        code: "GENERATION_DISABLED",
        message: "Mentor generation is not enabled",
      });
  }
  private page(limit: unknown, cursor: unknown, max: number) {
    return {
      limit:
        limit === undefined
          ? Math.min(10, max)
          : integer(Number(limit), 1, max),
      cursor: cursor === undefined ? null : uuid(cursor),
    };
  }
  @Get("bootstrap")
  async bootstrap(@Req() req: Request) {
    const accountId = await this.access.accountId(req, "bootstrap");
    const [profile, pathway, conversations, proposal] = await Promise.all([
      this.profiles.get(accountId),
      this.paths.current(accountId),
      this.conversations.list(accountId, 10, null),
      this.paths.latestProposal(accountId),
    ]);
    return {
      profile,
      pathway,
      proposal,
      conversations: conversations.entries,
      generationEnabled: false,
      previewEnabled: process.env.NODE_ENV !== "production",
    };
  }
  @Put("profile")
  async saveProfile(@Req() req: Request, @Body() body: unknown) {
    const accountId = await this.access.accountId(req, "profile.save", true);
    const input = profileInput(body);
    return this.profiles.save(accountId, input.profile, input.expectedVersion);
  }
  @Post("conversations")
  async createConversation(@Req() req: Request, @Body() body: unknown) {
    const accountId = await this.access.accountId(
      req,
      "conversation.create",
      true
    );
    const input = record(body);
    exact(input, ["title"]);
    return this.conversations.create(accountId, string(input.title, 100));
  }
  @Get("conversations")
  async listConversations(
    @Req() req: Request,
    @Query("limit") limit?: string,
    @Query("cursor") cursor?: string
  ) {
    const accountId = await this.access.accountId(req, "conversation.list");
    const page = this.page(limit, cursor, 25);
    return this.conversations.list(accountId, page.limit, page.cursor);
  }
  @Get("conversations/:id/messages")
  async messages(
    @Req() req: Request,
    @Param("id") id: string,
    @Query("limit") limit?: string,
    @Query("cursor") cursor?: string
  ) {
    const accountId = await this.access.accountId(req, "message.list");
    return this.conversations.messages(
      accountId,
      uuid(id),
      limit === undefined ? 30 : integer(Number(limit), 1, 50),
      cursor === undefined ? null : integer(Number(cursor), 1, 2147483647)
    );
  }
  @Post("conversations/:id/messages")
  async addMessage(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() body: unknown
  ) {
    this.previewOnly();
    const accountId = await this.access.accountId(req, "message.create", true);
    const input = record(body);
    exact(input, ["content"]);
    return this.conversations.add(
      accountId,
      uuid(id),
      "user",
      string(input.content, 4000)
    );
  }
  @Post("conversations/:id/preview-replies")
  async previewReply(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() body: unknown
  ) {
    this.previewOnly();
    const accountId = await this.access.accountId(req, "preview.reply", true);
    const input = record(body);
    exact(input, ["content"]);
    return this.conversations.add(
      accountId,
      uuid(id),
      "assistant",
      string(input.content, 4000)
    );
  }
  @Delete("conversations/:id")
  async deleteConversation(@Req() req: Request, @Param("id") id: string) {
    const accountId = await this.access.accountId(
      req,
      "conversation.delete",
      true
    );
    return this.conversations.remove(accountId, uuid(id));
  }
  @Get("pathway")
  async pathway(@Req() req: Request) {
    return this.paths.current(await this.access.accountId(req, "pathway.view"));
  }
  @Get("pathway/revisions")
  async revisions(
    @Req() req: Request,
    @Query("limit") limit?: string,
    @Query("cursor") cursor?: string
  ) {
    const accountId = await this.access.accountId(req, "pathway.revisions");
    const page = this.page(limit, cursor, 25);
    return this.paths.revisions(accountId, page.limit, page.cursor);
  }
  @Post("proposals")
  async propose(@Req() req: Request, @Body() body: unknown) {
    this.previewOnly();
    const accountId = await this.access.accountId(req, "proposal.create", true);
    const input = record(body);
    exact(input, ["milestones", "expectedProfileVersion"]);
    return this.paths.propose(
      accountId,
      milestoneInput(input.milestones),
      integer(input.expectedProfileVersion, 1, 2147483646)
    );
  }
  @Get("proposals/:id")
  async proposal(@Req() req: Request, @Param("id") id: string) {
    return this.paths.proposal(
      await this.access.accountId(req, "proposal.view"),
      uuid(id)
    );
  }
  @Post("proposals/:id/accept")
  async accept(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() body: unknown
  ) {
    const accountId = await this.access.accountId(req, "proposal.accept", true);
    const input = record(body);
    exact(input, ["expectedVersion", "expectedProfileVersion"]);
    return this.paths.accept(
      accountId,
      uuid(id),
      integer(input.expectedVersion, 0, 2147483646),
      integer(input.expectedProfileVersion, 1, 2147483646)
    );
  }
  @Delete("proposals/:id")
  async discard(@Req() req: Request, @Param("id") id: string) {
    return this.paths.discard(
      await this.access.accountId(req, "proposal.discard", true),
      uuid(id)
    );
  }
  @Patch("pathway/milestones/:id")
  async progress(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() body: unknown
  ) {
    const accountId = await this.access.accountId(
      req,
      "milestone.progress",
      true
    );
    const input = record(body);
    exact(input, ["status", "expectedVersion", "expectedPathVersion"]);
    if (input.status !== "pending" && input.status !== "done")
      throw new BadRequestException("Invalid status");
    return this.paths.progress(
      accountId,
      string(id, 100),
      input.status,
      input.expectedVersion === null
        ? null
        : integer(input.expectedVersion, 1, 2147483646),
      integer(input.expectedPathVersion, 1, 2147483646)
    );
  }
  @Delete("workspace")
  async deleteWorkspace(@Req() req: Request) {
    return this.paths.deleteWorkspace(
      await this.access.accountId(req, "workspace.delete", true)
    );
  }
}
