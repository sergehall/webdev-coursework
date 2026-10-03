import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";
export class EmailDto {
  @IsEmail()
  @MaxLength(254)
  @ApiProperty({
    example: "learner@example.test",
    format: "email",
    maxLength: 254,
  })
  email!: string;
}
/** Public OAuth initiation transports proof in a POST body, never in the redirect URL. */
export class GithubStartDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MinLength(1)
  @MaxLength(2048)
  @ApiPropertyOptional({
    maxLength: 2048,
    writeOnly: true,
    description:
      "Single-use Turnstile token; required when human verification is configured.",
  })
  turnstileToken?: string;

  @IsOptional()
  @IsIn(["login", "register"])
  @ApiPropertyOptional({
    enum: ["login", "register"],
    default: "login",
    description:
      "Selects the account_login or account_register widget action; grants no account privileges.",
  })
  intent?: "login" | "register";
}
export class RegisterDto extends EmailDto {
  // Optional at the schema level for unconfigured environments; required by the verifier when enabled.
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MinLength(1)
  @MaxLength(2048)
  @ApiPropertyOptional({
    maxLength: 2048,
    writeOnly: true,
    description:
      "Single-use Turnstile token; required when human verification is configured.",
  })
  turnstileToken?: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{3,40}$/)
  @ApiProperty({
    example: "learner_01",
    pattern: "^[a-zA-Z0-9_-]{3,40}$",
    minLength: 3,
    maxLength: 40,
  })
  username!: string;
  @IsString()
  @MinLength(15)
  @MaxLength(128)
  @ApiProperty({
    example: "example-passphrase-2026",
    minLength: 15,
    maxLength: 128,
    writeOnly: true,
  })
  password!: string;
}
export class TokenDto {
  @IsString()
  @Matches(/^[A-Za-z0-9_-]{43}$/)
  @ApiProperty({
    example: "A".repeat(43),
    pattern: "^[A-Za-z0-9_-]{43}$",
    minLength: 43,
    maxLength: 43,
    writeOnly: true,
    description: "Single-use token from an email link.",
  })
  token!: string;
}
export class ResetDto extends TokenDto {
  @IsString()
  @MinLength(15)
  @MaxLength(128)
  @ApiProperty({
    example: "new-example-passphrase",
    minLength: 15,
    maxLength: 128,
    writeOnly: true,
  })
  password!: string;
}
export class SetupPasswordDto {
  @IsString()
  @MinLength(15)
  @MaxLength(128)
  @ApiProperty({
    example: "new-example-passphrase",
    minLength: 15,
    maxLength: 128,
    writeOnly: true,
  })
  newPassword!: string;
}
