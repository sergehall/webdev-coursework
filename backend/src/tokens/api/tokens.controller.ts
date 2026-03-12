// src/tokens/tokens.controller.ts
import {
  Body,
  Controller,
  Param,
  Post,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminApiKeyGuard } from "../../guards/admin-api-key.guard";
import { ApiDocService } from "../../swagger/api-doc.service";
import { EndpointKeys } from "../../swagger/enums/endpoint-keys.enum";
import { QuizzesMethods } from "../../swagger/enums/quizzes-methods.enum";
import { VerifyTokenDto } from "../dto/verify-token.dto";
import { TokensService } from "../service/tokens.service";

@Controller("tokens")
@ApiTags("Tokens")
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  /**
   * Issues a short-lived JWT token for GET /quizzes/:quizId/answers.
   */
  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.IssueAnswersToken)
  @Post(":quizId/answers-token")
  issueAnswersToken(@Param("quizId") quizId: string) {
    const token = this.tokensService.issueQuizAnswersToken(quizId);
    return { token };
  }

  /**
   * Verifies a previously issued token (debug/utility endpoint).
   * Returns { ok, payload } on success or { ok:false, error }.
   */
  @UseGuards(AdminApiKeyGuard)
  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.VerifyAnswersToken)
  @Post(":quizId/answers-token/verify")
  verifyAnswersToken(
    @Param("quizId") quizId: string,
    @Body() body: VerifyTokenDto
  ) {
    if (!body?.token) {
      throw new BadRequestException("token is required");
    }

    const result = this.tokensService.tryVerifyQuizAnswersToken(body.token);
    if (!result.ok) {
      return { ok: false, error: result.error };
    }

    // extra safety: ensure token quizId matches the route quizId
    if (result.payload.quizId !== quizId) {
      return { ok: false, error: "Token quizId mismatch" };
    }

    return { ok: true, payload: result.payload };
  }
}
