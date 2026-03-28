import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ICON_ROOT = path.join(ROOT, "icon-assets");
const OUT_DIR = path.join(ROOT, "packages/icons-react/src/icons");
const STYLES = ["outline", "filled"];

function walk(dirAbs) {
  const out = [];
  for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    const p = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function stemToPascal(stem) {
  return stem
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toSafeComponentName(name) {
  if (!name) return "Icon";
  const cleaned = name.replace(/[^a-zA-Z0-9_$]/g, "");
  const base = cleaned || "Icon";
  return /^[0-9]/.test(base) ? `Icon${base}` : base;
}

function styleSuffix(style) {
  return style === "filled" ? "Filled" : "";
}

function defaultNameFor(style, stemPascal) {
  return toSafeComponentName(`${stemPascal}${styleSuffix(style)}`);
}

function prefixedNameFor(style, category, stemPascal) {
  const catP = stemToPascal(category);
  return toSafeComponentName(`${catP}${stemPascal}${styleSuffix(style)}`);
}

function toReactPropKey(name) {
  if (name === "xmlns") return "xmlns";
  const lower = name.toLowerCase();
  if (lower === "xmlns:xlink") return "xmlnsXlink";
  if (lower === "class") return "className";
  return name.replace(/-([a-z])/gi, (_, c) => c.toUpperCase());
}

function splitSvg(svgText) {
  const trimmed = svgText.trim();
  const openEnd = trimmed.indexOf(">");
  if (openEnd === -1 || !/^<svg\b/i.test(trimmed)) {
    throw new Error("Expected <svg> root element");
  }
  const openTag = trimmed.slice(0, openEnd);
  const attrPart = openTag.replace(/^<svg\b/i, "").trim();
  const closeIdx = trimmed.toLowerCase().lastIndexOf("</svg>");
  if (closeIdx === -1) {
    throw new Error("Expected closing </svg>");
  }
  const inner = trimmed.slice(openEnd + 1, closeIdx).trim();
  return { attrPart, inner };
}

function parseAttrs(attrPart) {
  const attrs = {};
  const re = /(^|\s)([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(attrPart))) {
    attrs[m[2]] = m[4] ?? m[5] ?? "";
  }
  return attrs;
}

function emitSvgPropLines(attrs) {
  const skip = new Set(["width", "height"]);
  const lines = [];
  for (const [k, v] of Object.entries(attrs)) {
    if (skip.has(k.toLowerCase())) continue;
    const rk = toReactPropKey(k);
    lines.push(`        ${rk}={${JSON.stringify(v)}}`);
  }
  return lines.join("\n");
}

function buildComponentSource(componentName, attrLines, inner) {
  const innerLiteral = JSON.stringify(inner);
  const propsBlock = attrLines ? `${attrLines}\n` : "";
  return `import * as React from "react";

export type ${componentName}Props = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

const ${componentName} = React.forwardRef<SVGSVGElement, ${componentName}Props>(
  function ${componentName}({ size, width, height, ...rest }, ref) {
    const w = width !== undefined ? width : size;
    const h = height !== undefined ? height : size;
    return (
      <svg
        ref={ref}
${propsBlock}        {...(w !== undefined ? { width: w } : {})}
        {...(h !== undefined ? { height: h } : {})}
        {...rest}
        dangerouslySetInnerHTML={{ __html: ${innerLiteral} }}
      />
    );
  }
);

export default ${componentName};
`;
}

if (!fs.existsSync(ICON_ROOT)) {
  console.error(`Missing folder: ${path.relative(ROOT, ICON_ROOT)}`);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

/** @type {{ style: string, category: string, rel: string, abs: string, stemPascal: string }[]} */
const items = [];

for (const style of STYLES) {
  const styleDir = path.join(ICON_ROOT, style);
  if (!fs.existsSync(styleDir)) continue;

  for (const abs of walk(styleDir)) {
    if (!abs.toLowerCase().endsWith(".svg")) continue;
    const rel = path.relative(ICON_ROOT, abs).split(path.sep).join("/");
    const parts = rel.split("/");
    const category = parts.length >= 2 ? parts[1] : "misc";
    const stem = path.basename(abs, ".svg");
    const stemPascal = stemToPascal(stem);
    items.push({ style, category, rel, abs, stemPascal });
  }
}

/** @type {Map<string, typeof items>} */
const byDefault = new Map();
for (const it of items) {
  const def = defaultNameFor(it.style, it.stemPascal);
  if (!byDefault.has(def)) byDefault.set(def, []);
  byDefault.get(def).push(it);
}

/** @type {{ style: string, category: string, rel: string, abs: string, stemPascal: string, componentName: string }[]} */
const resolved = [];

for (const [, group] of byDefault) {
  if (group.length === 1) {
    const it = group[0];
    resolved.push({
      ...it,
      componentName: defaultNameFor(it.style, it.stemPascal),
    });
  } else {
    for (const it of group) {
      resolved.push({
        ...it,
        componentName: prefixedNameFor(it.style, it.category, it.stemPascal),
      });
    }
  }
}

const usedNames = new Set();
for (const it of resolved) {
  const base = it.componentName;
  let name = base;
  let n = 1;
  while (usedNames.has(name)) {
    name = toSafeComponentName(`${base}${n++}`);
  }
  usedNames.add(name);
  it.componentName = name;
}

for (const it of resolved) {
  const raw = fs.readFileSync(it.abs, "utf8");
  const { attrPart, inner } = splitSvg(raw);
  const attrs = parseAttrs(attrPart);
  const attrLines = emitSvgPropLines(attrs);
  const src = buildComponentSource(it.componentName, attrLines, inner);
  const outPath = path.join(OUT_DIR, `${it.componentName}.tsx`);
  fs.writeFileSync(outPath, src, "utf8");
}

console.log(`Wrote ${resolved.length} icon components to ${path.relative(ROOT, OUT_DIR)}`);
