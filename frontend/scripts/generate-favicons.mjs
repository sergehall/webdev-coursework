#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const publicDir = resolve(root, "public");

const svgPath = resolve(publicDir, "favicon.svg");
const svgBuffer = readFileSync(svgPath);

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

console.log("Generating favicons from favicon.svg...\n");

for (const { name, size } of sizes) {
  const outPath = resolve(publicDir, name);
  await sharp(svgBuffer)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`  ✓ ${name} (${size}x${size})`);
}

// Generate favicon.ico from 16x16 and 32x32 PNGs
const ico16 = resolve(publicDir, "favicon-16x16.png");
const ico32 = resolve(publicDir, "favicon-32x32.png");
const icoBuffer = await pngToIco([ico16, ico32]);
writeFileSync(resolve(publicDir, "favicon.ico"), icoBuffer);
console.log("  ✓ favicon.ico (16x16 + 32x32)");

console.log("\nDone. All favicons written to /public");
