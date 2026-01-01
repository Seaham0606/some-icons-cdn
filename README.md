# Some Icons

A clean, lightweight icon set designed for modern interfaces, with a Figma plugin for fast insertion and consistent sizing.

This project is focused on clarity, consistency, and scalability, making it suitable for product design, UI systems, and early engineering handoff.

## Features

- **Outline and filled styles** — Icons designed on a consistent grid
- **Default size** — 16 × 16 pixels
- **Semantic naming** — Simple, predictable names (e.g., `weather-cloud`, `weather-cloud-alt`)
- **Figma plugin** — Insert icons directly into your canvas
- **Editable vectors** — Icons remain fully editable after insertion
- **Free and open** — Open source and free to use

## Figma Plugin

The Figma plugin allows you to browse and insert icons directly into your canvas.

### Plugin Features

- Search by name
- Filter by category and style
- Choose insertion size (16 / 20 / 24 / 32)
- Insert as editable vector paths

The plugin is intended to feel lightweight and predictable, similar to established libraries like Feather or Material.

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

Icons are served directly from GitHub and can be consumed by tools or plugins.

### Example Base URL

```
https://raw.githubusercontent.com/<owner>/<repo>/<branch>/icon-assets/
```

### Example Icon Paths

```
https://raw.githubusercontent.com/<owner>/<repo>/<branch>/icon-assets/outline/weather/weather-cloud.svg
https://raw.githubusercontent.com/<owner>/<repo>/<branch>/icon-assets/filled/weather/weather-cloud.svg
```

For tagged releases, use the tag name instead of branch:

```
https://raw.githubusercontent.com/<owner>/<repo>/<tag>/icon-assets/outline/weather/weather-cloud.svg
```

Icons are fetched on demand, keeping integrations fast and lightweight.

## Roadmap

- More icon categories
- Size-specific tuning for small icons
- Component export (React / Vue)
- Improved plugin browsing and grouping

## License

MIT License

Copyright © 2025 Sihan Liu

## Credits

Designed and maintained by Sihan.

## Current progress

938/2000 icons

Current progress:

940/2000 icons