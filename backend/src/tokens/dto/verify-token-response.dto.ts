import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class VerifiedAnswersPayloadDto {
  @ApiProperty({ example: "QuizModule1" })
  quizId!: string;
  @ApiProperty({
    example: 1790960400,
    description: "Issued-at Unix timestamp in seconds.",
  })
  iat!: number;
  @ApiPropertyOptional({
    example: 1790960700,
    description:
      "Expiry Unix timestamp in seconds; newly issued tokens always include it.",
  })
  exp?: number;
  @ApiPropertyOptional({ example: "webdev-coursework" })
  iss?: string;
  @ApiPropertyOptional({ example: "webdev-coursework-users" })
  aud?: string;
}
export class VerifiedAnswersTokenDto {
  @ApiProperty({ enum: [true], example: true })
  ok!: boolean;
  @ApiProperty({ type: VerifiedAnswersPayloadDto })
  payload!: VerifiedAnswersPayloadDto;
}
export class InvalidAnswersTokenDto {
  @ApiProperty({ enum: [false], example: false })
  ok!: boolean;
  @ApiProperty({ example: "jwt expired" })
  error!: string;
}
