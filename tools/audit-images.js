const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const budget = 100 * 1024;
const files = fs.readdirSync(root)
  .filter(name => /\.(html|css|js)$/i.test(name))
  .map(name => path.join(root, name))
  .concat(fs.readdirSync(path.join(root, "assets", "js")).map(name => path.join(root, "assets", "js", name)))
  .concat(fs.readdirSync(path.join(root, "assets", "css")).map(name => path.join(root, "assets", "css", name)));

const urls = new Set();
const remoteImage = /https:\/\/images\.unsplash\.com\/[^"')\s<>]+/g;
for (const file of files) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue;
  const matches = fs.readFileSync(file, "utf8").match(remoteImage) || [];
  for (const match of matches) urls.add(match.replace(/&amp;/g, "&"));
}

let failed = false;
for (const url of [...urls].sort()) {
  const size = Number(execFileSync("curl", [
    "-L", "-s", "-o", process.platform === "win32" ? "NUL" : "/dev/null",
    "-w", "%{size_download}",
    "--max-time", "30",
    "-H", "Accept: image/webp,image/*",
    url
  ], { encoding: "utf8" }).trim());
  const ok = size <= budget && /[?&]fm=webp\b/.test(url);
  if (!ok) failed = true;
  console.log(`${ok ? "OK" : "FAIL"} ${Math.round(size / 1024)}KB ${url}`);
}

for (const file of fs.readdirSync(path.join(root, "assets", "images"))) {
  const imagePath = path.join(root, "assets", "images", file);
  if (!fs.statSync(imagePath).isFile()) continue;
  const size = fs.statSync(imagePath).size;
  const ok = /\.webp$/i.test(file) && size <= budget;
  if (!ok) failed = true;
  console.log(`${ok ? "OK" : "FAIL"} ${Math.round(size / 1024)}KB assets/images/${file}`);
}

process.exit(failed ? 1 : 0);
