const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const outDir = path.join("public", "brand");
const favDir = path.join("public", "icons");

(async () => {
  // Use full brand tile — crop top symbol for app icons
  const fullPath = path.join(outDir, "logo-full.png");
  const meta = await sharp(fullPath).metadata();
  const w = meta.width;
  const h = meta.height;

  // The mark sits in the upper portion of the square composition
  const cropSize = Math.floor(w * 0.62);
  const left = Math.floor((w - cropSize) / 2);
  const top = Math.floor(h * 0.08);

  const markBuf = await sharp(fullPath)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize(512, 512)
    .png()
    .toBuffer();

  await sharp(markBuf).toFile(path.join(outDir, "logo-mark.png"));

  // Soft-rounded app icon: emerald pad + mark
  const padded = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 16, g: 185, b: 129, alpha: 1 },
    },
  })
    .composite([
      {
        input: await sharp(markBuf).resize(440, 440).png().toBuffer(),
        gravity: "centre",
      },
    ])
    .png()
    .toBuffer();

  // Prefer mark itself as favicon source (already has emerald field)
  const source = markBuf;

  const sizes = [
    ["favicon-16x16.png", 16],
    ["favicon-32x32.png", 32],
    ["favicon-48x48.png", 48],
    ["android-chrome-192x192.png", 192],
    ["android-chrome-512x512.png", 512],
    ["apple-touch-icon.png", 180],
  ];

  for (const [name, size] of sizes) {
    await sharp(source).resize(size, size).png().toFile(path.join(favDir, name));
  }

  await sharp(source).resize(32, 32).png().toFile(path.join("public", "favicon.ico"));
  await sharp(source).resize(32, 32).png().toFile(path.join("public", "favicon-32.png"));
  await sharp(source).resize(180, 180).png().toFile(path.join("public", "apple-touch-icon.png"));

  // Transparent SVG wrapper for modern favicon (embeds PNG as data URI alternative: keep PNG refs)
  // Update public favicon.svg as simple emerald circle reference — browsers use PNG links mainly

  console.log("favicon set regenerated from official mark");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
