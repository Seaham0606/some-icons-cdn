import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ICON_ROOT = "icon-assets";
const OUTPUT = "index.json";

// Define which styles your plugin supports
const KNOWN_STYLES = ["filled", "outline"];

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

function uniq(arr) {
  return Array.from(new Set(arr));
}

const iconRootAbs = path.join(ROOT, ICON_ROOT);
if (!fs.existsSync(iconRootAbs)) {
  console.error(`Missing folder: ${ICON_ROOT}`);
  process.exit(1);
}

const svgFilesAbs = walk(iconRootAbs).filter((p) => p.toLowerCase().endsWith(".svg"));

// Use a map for O(1) merging instead of icons.find()
const iconsMap = new Map();
const stylesSet = new Set();

for (const abs of svgFilesAbs) {
  const rel = toPosix(path.relative(ROOT, abs)); // icon-assets/outline/weather/weather-cloud.svg
  const parts = rel.split("/");

  // Expect: icon-assets/<style>/<category>/<file>.svg
  const style = parts[1] || "outline";
  const category = parts[2] || "misc";
  const file = parts[parts.length - 1];

  const id = normalizeId(file);

  // Only record known styles, ignore any unexpected folder names
  if (!KNOWN_STYLES.includes(style)) continue;

  stylesSet.add(style);

  const key = `${category}/${id}`;
  let icon = iconsMap.get(key);

  if (!icon) {
    const baseTags = id.split("-").filter(Boolean);
    const tags = uniq([category, ...baseTags]);

    icon = { id, category, tags, files: {} };
    iconsMap.set(key, icon);
  }

  icon.files[style] = rel;
}

// Post-pass: if an icon only exists once, duplicate that path across missing styles
let duplicatedCount = 0;

for (const icon of iconsMap.values()) {
  const presentStyles = Object.keys(icon.files);

  if (presentStyles.length === 1) {
    const existingStyle = presentStyles[0];
    const existingPath = icon.files[existingStyle];

    for (const s of KNOWN_STYLES) {
      if (!icon.files[s]) icon.files[s] = existingPath;
    }

    duplicatedCount += 1;
  }
}

const icons = Array.from(iconsMap.values()).sort((a, b) =>
  (a.category + "/" + a.id).localeCompare(b.category + "/" + b.id)
);

const index = {
  version: "1.0.0",
  defaultSize: 16,
  styles: KNOWN_STYLES.slice(), // keep stable and explicit
  icons,
};

fs.writeFileSync(path.join(ROOT, OUTPUT), JSON.stringify(index, null, 2) + "\n");

console.log(
  `Generated ${index.icons.length} icons, styles: ${index.styles.join(", ")}, duplicated single-style icons: ${duplicatedCount}`
);
