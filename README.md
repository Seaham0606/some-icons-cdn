# Some Icons

A clean, lightweight icon set designed for modern interfaces, with a Figma plugin for fast insertion and consistent sizing. The same SVGs publish as **[`@someicons/icons-react`](https://www.npmjs.com/package/@someicons/icons-react)** for React apps.

This project is focused on clarity, consistency, and scalability, making it suitable for product design, UI systems, and early engineering handoff.

## Features

- **Outline and filled styles** — Icons designed on a consistent grid
- **Default size** — 16 × 16 pixels
- **Semantic naming** — Simple, predictable names (e.g., `weather-cloud`, `weather-cloud-alt`)
- **Figma plugin** — Insert icons directly into your canvas
- **React components** — Tree-shakeable package `@someicons/icons-react` generated from this repo
- **Editable vectors** — Icons remain fully editable after insertion
- **Free and open** — Open source and free to use

## Figma Plugin

The Figma plugin allows you to browse and insert icons directly into your canvas.

## Naming Convention

All icons follow lowercase kebab-case naming:

```
collection-icon-name
collection-icon-name-alt
```

### Examples

- `weather-cloud`
- `weather-cloud-alt`
- `system-close`
- `ui-search`

This naming convention avoids collisions and keeps the API stable for future exports.

## Icon Design Guidelines

- **Grid**: 16 × 16
- **Outline icons**: Use strokes (not outlined shapes)
- **Stroke weight**: Consistent across the set
- **Line caps and joins**: Rounded
- **Optical padding**: Applied consistently

Icons are designed to scale cleanly via code. Pixel-perfect size variants may be added later if needed.

## Repository Structure

```
packages/
  icons-react/          # @someicons/icons-react (see packages/icons-react/README.md)
icon-assets/
  filled/
    arrow/
    communication/
    content/
    device/
    general/
    media/
    symbol/
    weather/
  outline/
    arrow/
    communication/
    content/
    device/
    general/
    media/
    symbol/
    weather/
index.json
```

- `icon-assets/` contains all SVG files organized by style and category
- `index.json` contains icon metadata and paths
- SVGs are served directly from GitHub raw URLs
- Versioning is handled via tagged releases

## Icon Categories

Icons are organized into the following categories:

- **Arrow** — Directional and navigation icons
- **Communication** — Messaging, phone, and contact icons
- **Content** — Document, book, and editing icons
- **Device** — Hardware and device-related icons
- **General** — Common UI elements and actions
- **Media** — Audio, video, and playback icons
- **Symbol** — Symbols and special characters
- **Weather** — Weather and climate icons

## Using the Icons Programmatically

### React (npm)

Install and import generated components (React 17+):

```bash
npm install @someicons/icons-react
```

```tsx
import { WeatherCloud } from "@someicons/icons-react";

<WeatherCloud size={20} aria-hidden />
```

Build scripts and full API (props, subpath imports, regenerating from SVGs) live in [`packages/icons-react/README.md`](packages/icons-react/README.md). From the repo root you can run `npm run build:react:all` to regenerate icons and build the package.

### Raw SVGs (GitHub)

Icons are also served as static files from GitHub for tools, plugins, or non-React stacks.

**Base URL (replace `main` with a tag for pinned versions):**

```
https://raw.githubusercontent.com/Seaham0606/some-icons-cdn/main/icon-assets/
```

**Examples:**

```
https://raw.githubusercontent.com/Seaham0606/some-icons-cdn/main/icon-assets/outline/weather/weather-cloud.svg
https://raw.githubusercontent.com/Seaham0606/some-icons-cdn/main/icon-assets/filled/weather/weather-cloud.svg
```

For a release, swap `main` for the tag name in the path. Icons can be fetched on demand, which keeps integrations lightweight.

## Roadmap

- More icon categories
- Size-specific tuning for small icons
- Component exports for other frameworks (e.g. Vue)
- Improved plugin browsing and grouping

## License

MIT License

Copyright © 2026 Sihan Liu

## Credits

Designed and maintained by Sihan.

Current progress:

1603/2000 icons