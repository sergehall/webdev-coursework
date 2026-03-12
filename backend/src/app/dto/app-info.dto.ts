import { ApiProperty } from "@nestjs/swagger";

class AppEndpointsDto {
  @ApiProperty({ example: "/docs" })
  docs!: string;

  @ApiProperty({ example: "/health" })
  health!: string;

  @ApiProperty({ example: "/info" })
  info!: string;
}

export class AppInfoDto {
  @ApiProperty({ example: "Webdev Coursework API" })
  name!: string;

  @ApiProperty({ example: "1.0.0" })
  version!: string;

  @ApiProperty({ example: true })
  docsEnabled!: boolean;

  @ApiProperty({ type: AppEndpointsDto })
  endpoints!: AppEndpointsDto;

  @ApiProperty({
    example: "v103",
    description:
      "Release identifier from environment (HEROKU_RELEASE_VERSION, RELEASE_VERSION, or commit-based fallback via SOURCE_VERSION/HEROKU_SLUG_COMMIT).",
  })
  release!: string;
}
