import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ICON_ROOT = "icon-assets";
const README_PATH = "README.md";
const TARGET_COUNT = 2000;

// Recursively walk directory and collect all files
function walk(dirAbs) {
  const out = [];
  for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    const p = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(p));
    } else {
      out.push(p);
    }
  }
  return out;
}

// Count SVG files in icon-assets/
function countSvgFiles() {
  const iconRootAbs = path.join(ROOT, ICON_ROOT);
  
  if (!fs.existsSync(iconRootAbs)) {
    console.warn(`Warning: ${ICON_ROOT} folder does not exist`);
    return 0;
  }

  const allFiles = walk(iconRootAbs);
  const svgFiles = allFiles.filter((p) => p.toLowerCase().endsWith(".svg"));
  
  return svgFiles.length;
}

// Update README.md with progress section
function updateReadme(count) {
  const readmePath = path.join(ROOT, README_PATH);
  
  if (!fs.existsSync(readmePath)) {
    console.error(`Error: ${README_PATH} does not exist`);
    process.exit(1);
  }

  let content = fs.readFileSync(readmePath, "utf-8");
  
  // Define the progress section
  const progressSection = `Current progress:

${count}/${TARGET_COUNT} icons`;

  // Pattern to match the progress section (with optional trailing newline)
  // Matches "Current progress:" followed by blank line and "XXX/2000 icons"
  const progressPattern = /Current progress:\s*\n\s*\d+\/2000 icons\s*/;

  if (progressPattern.test(content)) {
    // Replace existing section
    content = content.replace(progressPattern, progressSection);
  } else {
    // Append new section (ensure it's at the end with proper newline)
    content = content.trimEnd();
    if (!content.endsWith("\n")) {
      content += "\n";
    }
    content += "\n" + progressSection + "\n";
  }

  fs.writeFileSync(readmePath, content, "utf-8");
  console.log(`Updated ${README_PATH} with progress: ${count}/${TARGET_COUNT} icons`);
}

// Main execution
const count = countSvgFiles();
updateReadme(count);
console.log(`Found ${count} SVG files in ${ICON_ROOT}/`);

