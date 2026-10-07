import { BadRequestException } from "@nestjs/common";

export function parseAccountPageQuery(rawSearch?: string, rawPage?: string) {
  if (
    rawSearch !== undefined &&
    (typeof rawSearch !== "string" ||
      rawSearch.length > 80 ||
      rawSearch.includes("\0"))
  )
    throw new BadRequestException("Invalid account search");
  if (
    rawPage !== undefined &&
    (typeof rawPage !== "string" || !/^[1-9]\d{0,5}$/.test(rawPage))
  )
    throw new BadRequestException("Invalid account page");
  return { search: rawSearch?.trim() ?? "", page: Number(rawPage ?? 1) };
}
