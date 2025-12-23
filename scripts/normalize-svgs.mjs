import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ICON_ROOT = process.argv[2] ?? "icon-assets";

function walk(dirAbs) {
  const out = [];
  for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    const p = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// Convert fill values to currentColor, while preserving:
// - fill="none"
// - fill="currentColor"
// - fill="url(#...)"
// Also updates style="...fill: ..."
// Adds fill="currentColor" to <svg> if root has no fill attribute.
function normalizeSvg(svg) {
  let out = svg;

  // Replace fill="..."
  out = out.replace(/fill\s*=\s*["']([^"']+)["']/gi, (m, raw) => {
    const v = String(raw).trim();
    const lower = v.toLowerCase();

    if (!v) return m;
    if (lower === "none") return m;
    if (lower === "currentcolor") return m;
    if (lower.startsWith("url(")) return m;

    return `fill="currentColor"`;
  });

  // Replace fill: ... inside style="..."
  out = out.replace(/style\s*=\s*["']([^"']*)["']/gi, (m, styleValue) => {
    let style = String(styleValue);

    if (!/fill\s*:/i.test(style)) return m;

    style = style.replace(/fill\s*:\s*([^;]+)\s*;?/gi, (mm, raw) => {
      const v = String(raw).trim();
      const lower = v.toLowerCase();

      if (lower === "none") return mm;
      if (lower === "currentcolor") return mm;
      if (lower.startsWith("url(")) return mm;

      return "fill: currentColor;";
    });

    return `style="${style}"`;
  });

  // Ensure root <svg> has fill="currentColor" if it does not already
  const hasRootFill = /<svg\b[^>]*\bfill\s*=\s*["'][^"']+["']/i.test(out);
  if (!hasRootFill) {
    out = out.replace(/<svg\b/i, `<svg fill="currentColor"`);
  }

  return out;
}

const iconRootAbs = path.join(ROOT, ICON_ROOT);
if (!fs.existsSync(iconRootAbs)) {
  console.error(`Missing folder: ${ICON_ROOT}`);
  process.exit(1);
}

const svgFilesAbs = walk(iconRootAbs).filter((p) => p.toLowerCase().endsWith(".svg"));

let changedCount = 0;

for (const abs of svgFilesAbs) {
  const before = fs.readFileSync(abs, "utf8");
  const after = normalizeSvg(before);

  if (after !== before) {
    fs.writeFileSync(abs, after, "utf8");
    changedCount += 1;
  }
}

console.log(`Normalized ${changedCount} SVG file(s) under ${ICON_ROOT}`);
