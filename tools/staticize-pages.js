const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const scripts = [
  "assets/js/storage.js",
  "assets/js/auth.js",
  "assets/js/dashboard.js",
  "assets/js/main.js"
];

const localData = new Map();
const sandbox = {
  console,
  URLSearchParams,
  setTimeout() {},
  innerHeight: 900,
  scrollY: 0,
  scrollTo() {},
  matchMedia() { return { matches: false }; },
  localStorage: {
    getItem(key) { return localData.has(key) ? localData.get(key) : null; },
    setItem(key, value) { localData.set(key, String(value)); },
    removeItem(key) { localData.delete(key); }
  },
  document: {
    body: { dataset: {} },
    documentElement: { scrollHeight: 1600 },
    addEventListener() {},
    createElement() { return {}; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    head: { appendChild() {} }
  },
  window: {},
  location: { pathname: "/index.html", search: "" }
};
sandbox.window = sandbox;

vm.createContext(sandbox);
for (const file of scripts) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
}

vm.runInContext(`
function __headerStatic() {
  return headerHtml();
}
function __footerStatic() {
  return footerHtml();
}
function __renderStaticPage(page, auth, view, fileName) {
  document.body.dataset = { page: page || "home" };
  if (auth) document.body.dataset.auth = auth;
  if (view) document.body.dataset.view = view;
  location.pathname = "/" + fileName;
  location.search = "";
  const app = { innerHTML: "", children: [] };

  if (page === "home") renderHome(app);
  else if (page === "menu") renderMenu(app);
  else if (page === "menu-details") renderMenuDetails(app);
  else if (page === "reservation") renderReservation(app);
  else if (page && page.includes("dashboard")) renderDashboard(app, page.split("-")[0], view || "Dashboard");
  else if (page === "auth") renderAuth(app, auth);
  else renderStandard(app, page);

  return app.innerHTML;
}
`, sandbox);

function pageInfo(html, fileName) {
  const bodyMatch = html.match(/<body\b([^>]*)>/i);
  const attrs = bodyMatch ? bodyMatch[1] : "";
  const page = attrs.match(/data-page="([^"]+)"/i)?.[1] || (fileName === "index.html" ? "home" : fileName.replace(/\.html$/i, ""));
  const auth = attrs.match(/data-auth="([^"]+)"/i)?.[1] || "";
  const view = attrs.match(/data-view="([^"]+)"/i)?.[1] || "";
  return { page, auth, view };
}

function formatHtml(html) {
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
  const tokens = html.replace(/>\s*</g, ">\n<").split("\n").filter(token => token.trim());
  let depth = 0;

  return tokens.map(token => {
    const trimmed = token.trim();
    const closing = /^<\//.test(trimmed);
    const tag = trimmed.match(/^<\/?([a-z0-9-]+)/i)?.[1]?.toLowerCase();
    const selfClosing = /\/>$/.test(trimmed) || (tag && voidTags.has(tag)) || /^<!doctype/i.test(trimmed);

    if (closing) depth = Math.max(0, depth - 1);
    const line = `${"  ".repeat(depth)}${trimmed}`;
    if (!closing && !selfClosing && /^<[^!/][^>]*>$/.test(trimmed)) depth += 1;
    return line;
  }).join("\n") + "\n";
}

// Each dashboard sidebar entry is a real page, so make sure a file exists for it.
const dashShell = fs.readFileSync(path.join(root, "admin-dashboard.html"), "utf8");
for (const role of ["admin", "chef", "customer"]) {
  for (const view of sandbox.dashNavs(role)) {
    const fileName = sandbox.dashFile(role, view);
    const target = path.join(root, fileName);
    if (fs.existsSync(target)) continue;
    const roleLabel = role[0].toUpperCase() + role.slice(1);
    fs.writeFileSync(target, dashShell
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${roleLabel} ${view} | Stackly</title>`)
      .replace(/<body\b[^>]*>/i, `<body class="page-shell" data-page="${role}-dashboard" data-view="${view}">`));
    console.log(`Created ${fileName}`);
  }
}

for (const fileName of fs.readdirSync(root).filter(name => name.endsWith(".html"))) {
  const filePath = path.join(root, fileName);
  const html = fs.readFileSync(filePath, "utf8");
  const { page, auth, view } = pageInfo(html, fileName);
  const content = sandbox.__renderStaticPage(page, auth, view, fileName);
  // Auth and dashboard pages render standalone: no site header or footer.
  const bareChrome = page === "auth" || page.includes("dashboard");
  const header = bareChrome ? "" : sandbox.__headerStatic();
  const footer = bareChrome ? "" : sandbox.__footerStatic();
  const updated = html.replace(
    /<body\b([^>]*)>\s*(?:<header[\s\S]*?<\/header>)?\s*<main id="app">[\s\S]*<\/main>\s*(?:<footer[\s\S]*<\/footer>)?/i,
    (_match, bodyAttrs) => `<body${bodyAttrs}>\n${header}\n<main id="app">\n${content}\n</main>\n${footer}`
  );
  fs.writeFileSync(filePath, formatHtml(updated));
  console.log(`Staticized ${fileName}`);
}
