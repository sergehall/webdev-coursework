import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
export class EmailDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;
}
export class RegisterDto extends EmailDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{3,40}$/)
  username!: string;
  @IsString()
  @MinLength(12)
  @MaxLength(128)
  password!: string;
}
export class TokenDto {
  @IsString()
  @Matches(/^[A-Za-z0-9_-]{43}$/)
  token!: string;
}
export class ResetDto extends TokenDto {
  @IsString()
  @MinLength(12)
  @MaxLength(128)
  password!: string;
}
