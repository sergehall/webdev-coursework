import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, it } from "vitest";

import { storySlides } from "../courseContent";

import { presentationImageUrl } from "./config";
import { presentation2ImageUrl, presentation2Slides } from "./presentation2";

const imageUrls = [
  ...storySlides.map((slide) => presentationImageUrl(slide.image)),
  ...presentation2Slides.map((slide) => presentation2ImageUrl(slide.image)),
];

it.each(imageUrls)("versions %s using the current image bytes", (url) => {
  const [pathname, query] = url.split("?");
  const file = resolve(
    dirname(fileURLToPath(import.meta.url)),
    `../../../../public${pathname}`
  );
  const hash = createHash("sha256")
    .update(readFileSync(file))
    .digest("hex")
    .slice(0, 12);

  expect(query).toBe(`v=${hash}`);
});
