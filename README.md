Some Icons

A clean, lightweight outline icon set designed for modern interfaces, with a Figma plugin for fast insertion and consistent sizing.

This project is focused on clarity, consistency, and scalability, making it suitable for product design, UI systems, and early engineering handoff.

Features

Outline icons, designed on a consistent grid

Default size: 16 × 16

Simple, semantic naming (weather-cloud, weather-cloud-alt)

Insert icons directly into Figma via plugin

Icons remain fully editable vectors

Free and open to use

Planned:

Filled style

More sizes

Expanded icon coverage

Figma Plugin

The Figma plugin allows you to browse and insert icons directly into your canvas.

Plugin features

Search by name

Filter by category and style

Choose insertion size (16 / 20 / 24 / 32)

Insert as editable vector paths

The plugin is intended to feel lightweight and predictable, similar to established libraries like Feather or Material.

Naming Convention

All icons follow lowercase kebab-case naming.

collection-icon-name
collection-icon-name-alt


Examples:

weather-cloud

weather-cloud-alt

system-close

ui-search

This avoids naming collisions and keeps the API stable for future exports.

Icon Design Guidelines

Grid: 16 × 16

Outline icons use strokes (not outlined shapes)

Consistent stroke weight across the set

Rounded line caps and joins

Optical padding applied consistently

Icons are designed to scale cleanly via code. Pixel-perfect size variants may be added later if needed.

Repository Structure
dist/
  v1/
    index.json
    outline/
      weather-cloud.svg
      weather-cloud-alt.svg


index.json contains icon metadata and paths

SVGs are hosted via GitHub + jsDelivr CDN

Versioning is handled via tagged releases

Using the Icons Programmatically

Icons are served via CDN and can be consumed by tools or plugins.

Example base URL:

https://cdn.jsdelivr.net/gh/<owner>/<repo>@v1/dist/v1/


Icons are fetched on demand, keeping integrations fast and lightweight.

Roadmap

Filled icon style

More icon categories

Size-specific tuning for small icons

Component export (React / Vue)

Improved plugin browsing and grouping

License

TBD (MIT recommended for public use)

Credits

Designed and maintained by Sihan.
