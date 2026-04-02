# @someicons/icons-react

React componentsfor the Some Icons set. Each icon is a `forwardRef` `<svg>` generated from the repository’s SVG sources under `icon-assets/`.

## Install

```bash
npm install @someicons/icons-react
```

`react` **17+** is a [peer dependency](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies); install it in your app if it is not already present.

## Usage

Default view box is **16 × 16**. Icons use **`currentColor`** for strokes/fills so they inherit the surrounding text color unless you override with `className` or SVG props.

Named import from the barrel (tree-shake friendly with modern bundlers; the package sets `sideEffects: false`):

```tsx
import { ArrowLeft } from "@someicons/icons-react";

export function Back() {
  return <ArrowLeft size={20} aria-hidden />;
}
```

Per-icon subpath import (`./icons/*` in `package.json`), default export:

```tsx
import ArrowLeft from "@someicons/icons-react/icons/ArrowLeft";
```

### Props

Each component accepts [React’s `SVGSVGElement` props](https://react.dev/reference/react-dom/components/svg) plus:

- **`size`** — optional `number` or `string`; applied as both `width` and `height` when those are not set explicitly.
- **`width` / `height`** — if either is set, it overrides the corresponding dimension derived from `size`.

Refs are forwarded to the root `<svg>` element.

Example with ref and explicit dimensions:

```tsx
import { ArrowLeft } from "@someicons/icons-react";
import { useRef } from "react";

export function Example() {
  const ref = useRef<SVGSVGElement>(null);
  return <ArrowLeft ref={ref} width={24} height={24} />;
}
```

Types are published with the package (`dist/**/*.d.ts`).

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

Output is ESM plus TypeScript declarations in **`dist/`** (one file per icon under `dist/icons/`, plus a barrel `dist/index.js`).You can import from the package root or load a single icon module:```ts
import { ArrowLeft } from "@someicons/icons-react";Per-icon subpath (also default-exported):```ts
import ArrowLeft from "@someicons/icons-react/icons/ArrowLeft";Bundlers can tree-shake unused icons when you use the root barrel.## Peer dependencyRequires **React 17+** (`react` is a peer dependency).