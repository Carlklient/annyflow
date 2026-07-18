const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = path.join("public", "images", "annyflow-logo-source.png");
const outDir = path.join("public", "brand");
const favDir = path.join("public", "icons");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(favDir, { recursive: true });

const PRIMARY = { r: 16, g: 185, b: 129 }; // #10B981
const DARK = { r: 17, g: 24, b: 39 }; // #111827
const WHITE = { r: 255, g: 255, b: 255 };

function isGreen(r, g, b) {
  return g > 100 && g >= r + 15 && g >= b + 15 && r < 200 && b < 200;
}
function isBlack(r, g, b) {
  return r < 55 && g < 55 && b < 55;
}
function isWhite(r, g, b) {
  return r > 220 && g > 220 && b > 220;
}

/**
 * lightBg: for website header on #F8FAFC — dark DNA disc so logo is visible
 * darkBg: for footer — white DNA disc, white ANNY
 */
async function processLogo({ lightBg }) {
  const input = fs.readFileSync(src);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < Math.floor(h * 0.7); y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (isWhite(data[i], data[i + 1], data[i + 2]) && data[i + 3] > 200) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const radius = Math.max(maxX - minX, maxY - minY) / 2;
  const rOuter = radius * 1.04;
  const rBorder = radius * 0.985;
  const textTop = cy + rOuter * 0.88;

  const disc = lightBg ? DARK : WHITE; // disc fill behind DNA
  const anny = lightBg ? DARK : WHITE;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      if (a < 8) continue;

      const dist = Math.hypot(x - cx, y - cy);
      const inCircle = dist <= rOuter;
      const nearEdge = inCircle && dist >= rBorder;

      // Emerald ring on disc edge for definition on any background
      if (nearEdge) {
        data[i] = PRIMARY.r;
        data[i + 1] = PRIMARY.g;
        data[i + 2] = PRIMARY.b;
        data[i + 3] = 255;
        continue;
      }

      if (isGreen(r, g, b)) {
        if (inCircle) {
          // DNA helix → emerald
          data[i] = PRIMARY.r;
          data[i + 1] = PRIMARY.g;
          data[i + 2] = PRIMARY.b;
          data[i + 3] = 255;
        } else {
          // green tile → transparent
          data[i + 3] = 0;
        }
        continue;
      }

      if (isWhite(r, g, b)) {
        if (inCircle) {
          // Disc fill — dark on light sites so it doesn't vanish
          data[i] = disc.r;
          data[i + 1] = disc.g;
          data[i + 2] = disc.b;
          data[i + 3] = 255;
        } else if (y > textTop) {
          // FLOW text (was white) → emerald
          const mid = cx;
          if (x >= mid - w * 0.02) {
            data[i] = PRIMARY.r;
            data[i + 1] = PRIMARY.g;
            data[i + 2] = PRIMARY.b;
            data[i + 3] = 255;
          } else {
            data[i + 3] = 0; // stray white outside
          }
        } else {
          data[i + 3] = 0;
        }
        continue;
      }

      if (isBlack(r, g, b)) {
        data[i] = anny.r;
        data[i + 1] = anny.g;
        data[i + 2] = anny.b;
        data[i + 3] = 255;
        continue;
      }
    }
  }

  return {
    image: sharp(data, { raw: { width: w, height: h, channels: 4 } }),
    cx, cy, rOuter, w, h,
  };
}

(async () => {
  // Header / light page
  const light = await processLogo({ lightBg: true });
  await light.image.png().toFile(path.join(outDir, "_raw-header.png"));
  await sharp(path.join(outDir, "_raw-header.png")).trim({ threshold: 5 }).png()
    .toFile(path.join(outDir, "logo-header.png"));

  // Footer / dark page
  const dark = await processLogo({ lightBg: false });
  await dark.image.png().toFile(path.join(outDir, "_raw-footer.png"));
  await sharp(path.join(outDir, "_raw-footer.png")).trim({ threshold: 5 }).png()
    .toFile(path.join(outDir, "logo-footer.png"));

  // DNA mark for favicon / hero — dark disc, emerald DNA (visible everywhere)
  const markSrc = await processLogo({ lightBg: true });
  const pad = Math.ceil(markSrc.rOuter * 1.2);
  const left = Math.max(0, Math.floor(markSrc.cx - pad));
  const top = Math.max(0, Math.floor(markSrc.cy - pad));
  const size = Math.min(Math.ceil(pad * 2), markSrc.w - left, markSrc.h - top);

  await markSrc.image
    .extract({ left, top, width: size, height: size })
    .resize(512, 512)
    .png()
    .toFile(path.join(outDir, "logo-mark.png"));

  const mark = fs.readFileSync(path.join(outDir, "logo-mark.png"));
  for (const [name, s] of [
    ["favicon-16x16.png", 16],
    ["favicon-32x32.png", 32],
    ["favicon-48x48.png", 48],
    ["android-chrome-192x192.png", 192],
    ["android-chrome-512x512.png", 512],
    ["apple-touch-icon.png", 180],
  ]) {
    await sharp(mark).resize(s, s).png().toFile(path.join(favDir, name));
  }
  await sharp(mark).resize(32, 32).png().toFile(path.join("public", "favicon.ico"));
  await sharp(mark).resize(180, 180).png().toFile(path.join("public", "apple-touch-icon.png"));

  // Clean temps
  fs.unlinkSync(path.join(outDir, "_raw-header.png"));
  fs.unlinkSync(path.join(outDir, "_raw-footer.png"));

  const hm = await sharp(path.join(outDir, "logo-header.png")).metadata();
  console.log("header", hm.width, hm.height, "contrast-safe dark disc");
})().catch((e) => { console.error(e); process.exit(1); });
