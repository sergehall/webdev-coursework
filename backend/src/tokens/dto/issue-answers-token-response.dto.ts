import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class IssueAnswersTokenResponseDto {
  @ApiProperty({
    description:
      "Short-lived JWT token for GET /quizzes/:quizId/answers authorization.",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJxdWl6SWQiOiJRdWl6TW9kdWxlMSJ9.signature",
  })
  @IsString()
  token!: string;
}
