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

function isGreen(r, g, b) {
  // Source logo green — bright / mid emerald
  return g > 100 && g >= r + 15 && g >= b + 15 && r < 200 && b < 200;
}

function isBlack(r, g, b) {
  return r < 55 && g < 55 && b < 55;
}

function isWhite(r, g, b) {
  return r > 225 && g > 225 && b > 225;
}

async function processLogo({ annyWhite = false } = {}) {
  const input = fs.readFileSync(src);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  // Estimate circle from dense white pixels in upper 65%
  let minX = w,
    minY = h,
    maxX = 0,
    maxY = 0,
    count = 0;
  for (let y = 0; y < Math.floor(h * 0.7); y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (isWhite(data[i], data[i + 1], data[i + 2]) && data[i + 3] > 200) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        count++;
      }
    }
  }

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const radius = Math.max(maxX - minX, maxY - minY) / 2;
  // Slightly expand so DNA edge stays inside treatment
  const rOuter = radius * 1.02;
  const textTop = cy + rOuter * 0.85;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 8) continue;

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const inCircle = dist <= rOuter;

      if (isGreen(r, g, b)) {
        if (inCircle) {
          // DNA strands that were green cutouts → brand emerald
          data[i] = PRIMARY.r;
          data[i + 1] = PRIMARY.g;
          data[i + 2] = PRIMARY.b;
          data[i + 3] = 255;
        } else {
          // Green tile / any square behind icon → fully transparent
          data[i + 3] = 0;
        }
        continue;
      }

      if (isBlack(r, g, b)) {
        if (annyWhite) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        } else {
          data[i] = DARK.r;
          data[i + 1] = DARK.g;
          data[i + 2] = DARK.b;
        }
        continue;
      }

      // FLOW was white on green — recolor to emerald in text band
      if (isWhite(r, g, b) && y > textTop && !inCircle) {
        const mid = cx; // FLOW is right half of wordmark under icon
        if (x >= mid - w * 0.02) {
          data[i] = PRIMARY.r;
          data[i + 1] = PRIMARY.g;
          data[i + 2] = PRIMARY.b;
        } else if (annyWhite) {
          // ANNY is black in source; keep any leftover white
        }
      }
    }
  }

  return {
    image: sharp(data, { raw: { width: w, height: h, channels: 4 } }),
    cx,
    cy,
    rOuter,
    w,
    h,
  };
}

(async () => {
  const light = await processLogo({ annyWhite: false });
  await light.image.clone().png().toFile(path.join(outDir, "logo-header-raw.png"));
  await sharp(path.join(outDir, "logo-header-raw.png"))
    .trim({ threshold: 8 })
    .png()
    .toFile(path.join(outDir, "logo-header.png"));

  const dark = await processLogo({ annyWhite: true });
  await dark.image.clone().png().toFile(path.join(outDir, "logo-footer-raw.png"));
  await sharp(path.join(outDir, "logo-footer-raw.png"))
    .trim({ threshold: 8 })
    .png()
    .toFile(path.join(outDir, "logo-footer.png"));

  // DNA mark only: crop circle region from transparent header raw (before trim for coords)
  const raw = await processLogo({ annyWhite: false });
  const pad = Math.ceil(raw.rOuter * 1.18);
  const left = Math.max(0, Math.floor(raw.cx - pad));
  const top = Math.max(0, Math.floor(raw.cy - pad));
  const size = Math.min(Math.ceil(pad * 2), raw.w - left, raw.h - top);

  await raw.image
    .clone()
    .extract({ left, top, width: size, height: size })
    .resize(512, 512)
    .png()
    .toFile(path.join(outDir, "logo-mark.png"));

  // Favicons from DNA mark only
  const mark = fs.readFileSync(path.join(outDir, "logo-mark.png"));
  const sizes = [
    ["favicon-16x16.png", 16],
    ["favicon-32x32.png", 32],
    ["favicon-48x48.png", 48],
    ["android-chrome-192x192.png", 192],
    ["android-chrome-512x512.png", 512],
    ["apple-touch-icon.png", 180],
  ];
  for (const [name, s] of sizes) {
    await sharp(mark).resize(s, s).png().toFile(path.join(favDir, name));
  }
  await sharp(mark).resize(32, 32).png().toFile(path.join("public", "favicon.ico"));
  await sharp(mark).resize(180, 180).png().toFile(path.join("public", "apple-touch-icon.png"));

  // Transparent SVG favicon wrapper isn't needed — use PNG; also write a simple data ref
  // Copy mark as favicon svg alternative via png\to buffer isn't svg. Keep existing favicon.svg updated later.

  const hm = await sharp(path.join(outDir, "logo-header.png")).metadata();
  console.log("header", hm.width, hm.height);
  console.log("done — green tile removed, DNA emerald, FLOW emerald");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
