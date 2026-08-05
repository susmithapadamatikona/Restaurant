/* Finds, for every Unsplash photo the site uses, the highest WebP quality that
   still delivers under the size budget at each display width.
   Run:  node tools/tune-images.js
   Prints an IMG_Q map to paste into assets/js/main.js. */
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");

const BUDGET = 96 * 1024;                 // stay clear of the 100 KB ceiling
const LADDER = [80, 74, 68, 62, 56, 50, 44, 38, 32, 26];
const WIDTHS = [1280, 900, 760, 600];     // hero, panel, card, chef
const root = path.resolve(__dirname, "..");

function bytes(id, w, q) {
  const url = `https://images.unsplash.com/${id}?fm=webp&fit=crop&w=${w}&q=${q}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return Number(execFileSync("curl", ["-s", "-o", process.platform === "win32" ? "NUL" : "/dev/null",
        "-w", "%{size_download}", "--max-time", "30",
        "-H", "Accept: image/webp,image/*", url], { encoding: "utf8" }).trim());
    } catch (e) { /* retry */ }
  }
  return Infinity;
}

const ids = [...new Set(
  fs.readdirSync(root).filter(f => f.endsWith(".html"))
    .flatMap(f => fs.readFileSync(path.join(root, f), "utf8").match(/photo-[a-z0-9-]+/g) || [])
)].sort();

const map = {};
for (const id of ids) {
  map[id] = {};
  for (const w of WIDTHS) {
    let chosen = LADDER[LADDER.length - 1], size = 0;
    for (const q of LADDER) {              // highest quality first, take the first that fits
      const b = bytes(id, w, q);
      if (b <= BUDGET) { chosen = q; size = b; break; }
      size = b;
    }
    map[id][w] = chosen;
    process.stderr.write(`${id} @${w} -> q${chosen} (${Math.round(size/1024)}K)\n`);
  }
}
console.log("const IMG_Q = " + JSON.stringify(map, null, 2)
  .replace(/"(\d+)":/g, "$1:").replace(/"(photo-[a-z0-9-]+)":/g, '"$1":') + ";");
