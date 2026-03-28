# @someicons/icons-react

React components for the Some Icons set. Each icon is a `forwardRef` SVG component generated from the repository’s SVG sources.

## Source of truth

Icons are defined only under **`icon-assets/`** at the repo root (`outline/` and `filled/`). This package does not ship or edit those SVGs; it only consumes them at build time.

## Generate

From the **repository root** (not this folder):

```bash
npm run generate:react
```

That runs `scripts/generate-react-icons.mjs` (one component per SVG in `packages/icons-react/src/icons/`) and `scripts/generate-react-exports.mjs` (rewrites `packages/icons-react/src/index.ts`).

## Build

From the repo root:

```bash
npm run build:react
```

Or generate and build in one step:

```bash
npm run build:react:all
```

Output is ESM plus TypeScript declarations in **`dist/`** (one file per icon under `dist/icons/`, plus a barrel `dist/index.js`).

You can import from the package root or load a single icon module:

```ts
import { ArrowLeft } from "@someicons/icons-react";
```

Per-icon subpath (also default-exported):

```ts
import ArrowLeft from "@someicons/icons-react/icons/ArrowLeft";
```

Bundlers can tree-shake unused icons when you use the root barrel.

## Peer dependency

Requires **React 17+** (`react` is a peer dependency).
