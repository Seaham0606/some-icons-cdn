import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ICON_ROOT = "icon-assets";
const OUTPUT = "index.json";

function walk(dirAbs) {
  const out = [];
  for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    const p = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

function normalizeId(filename) {
  return filename.replace(/\.svg$/i, "").replace(/_/g, "-");
}

const iconRootAbs = path.join(ROOT, ICON_ROOT);
if (!fs.existsSync(iconRootAbs)) {
  console.error(`Missing folder: ${ICON_ROOT}`);
  process.exit(1);
}

const svgFilesAbs = walk(iconRootAbs).filter((p) => p.toLowerCase().endsWith(".svg"));

const icons = [];
const stylesSet = new Set();

for (const abs of svgFilesAbs) {
  const rel = toPosix(path.relative(ROOT, abs)); // e.g. icon-assets/outline/weather/weather-cloud.svg
  const parts = rel.split("/");

  // Expect: icon-assets/<style>/<category>/<file>.svg
  const style = parts[1] || "outline";
  const category = parts[2] || "misc";
  const file = parts[parts.length - 1];

  const id = normalizeId(file);
  const tags = id.split("-").filter(Boolean);

  stylesSet.add(style);

  // Merge multiple styles of same id/category into one icon entry
  let existing = icons.find((x) => x.id === id && x.category === category);
  if (!existing) {
    existing = { id, category, tags, files: {} };
    icons.push(existing);
  }

  existing.files[style] = rel;
}

const index = {
  version: "1.0.0",
  defaultSize: 16,
  styles: Array.from(stylesSet).sort(),
  icons: icons.sort((a, b) => (a.category + "/" + a.id).localeCompare(b.category + "/" + b.id)),
};

fs.writeFileSync(path.join(ROOT, OUTPUT), JSON.stringify(index, null, 2) + "\n");
console.log(`Generated ${index.icons.length} icons, styles: ${index.styles.join(", ")}`);
