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

function isNearGreen(r, g, b) {
  return g > 90 && g > r * 1.15 && g > b * 1.15 && r < 180;
}

function isNearBlack(r, g, b) {
  return r < 60 && g < 60 && b < 60;
}

function isNearWhite(r, g, b) {
  return r > 220 && g > 220 && b > 220;
}

async function recolorPlusFlowEmerald(buf, { transparentBg = false, annyColor = "dark" } = {}) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const textTop = Math.floor(h * 0.62);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 10) continue;

      if (isNearGreen(r, g, b)) {
        if (transparentBg) data[i + 3] = 0;
        else {
          data[i] = PRIMARY.r;
          data[i + 1] = PRIMARY.g;
          data[i + 2] = PRIMARY.b;
        }
        continue;
      }

      if (isNearBlack(r, g, b)) {
        if (annyColor === "white") {
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

      if (isNearWhite(r, g, b) && y > textTop) {
        const mid = Math.floor(w * 0.52);
        if (x >= mid) {
          data[i] = PRIMARY.r;
          data[i + 1] = PRIMARY.g;
          data[i + 2] = PRIMARY.b;
        }
      }
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels: 4 } });
}

(async () => {
  const input = fs.readFileSync(src);
  const meta = await sharp(input).metadata();
  console.log("source", meta.width, meta.height, meta.format);

  await (await recolorPlusFlowEmerald(input, { transparentBg: false, annyColor: "dark" }))
    .png()
    .toFile(path.join(outDir, "logo-full.png"));

  await (await recolorPlusFlowEmerald(input, { transparentBg: true, annyColor: "dark" }))
    .png()
    .toFile(path.join(outDir, "logo-header.png"));

  await (await recolorPlusFlowEmerald(input, { transparentBg: true, annyColor: "white" }))
    .png()
    .toFile(path.join(outDir, "logo-footer.png"));

  const svgMark = fs.readFileSync(path.join(outDir, "annyflow-mark.svg"));
  const svgPng = await sharp(svgMark).resize(512, 512).png().toBuffer();

  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "android-chrome-192x192.png", size: 192 },
    { name: "android-chrome-512x512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  for (const s of sizes) {
    await sharp(svgPng).resize(s.size, s.size).png().toFile(path.join(favDir, s.name));
  }

  await sharp(svgPng).resize(32, 32).png().toFile(path.join("public", "favicon.ico"));
  await sharp(svgPng).resize(32, 32).png().toFile(path.join("public", "favicon-32.png"));
  fs.copyFileSync(path.join(outDir, "annyflow-mark.svg"), path.join("public", "favicon.svg"));

  // Trimmed mark from transparent header logo (icon only)
  const hm = await sharp(path.join(outDir, "logo-header.png")).metadata();
  const side = Math.floor(Math.min(hm.width * 0.55, hm.height * 0.58));
  const left = Math.floor((hm.width - side) / 2);
  const top = Math.floor(hm.height * 0.06);
  await sharp(path.join(outDir, "logo-header.png"))
    .extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: Math.min(side, hm.width),
      height: Math.min(side, hm.height - top),
    })
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, "logo-mark.png"));

  console.log("done");
  console.log("brand:", fs.readdirSync(outDir));
  console.log("icons:", fs.readdirSync(favDir));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
