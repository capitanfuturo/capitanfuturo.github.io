# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal Italian-language blog by Giuseppe Caliendo, built with Astro 5 and Tailwind CSS v4, deployed to GitHub Pages.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

Docker alternative:
```bash
make start-docker  # Run via docker compose
```

Publishing (merges develop → main → GitHub Pages):
```bash
make publish
```

## Architecture

### Content

Blog posts live in `/content/blog/` as Markdown files (not in `src/`). They are loaded via Astro's content collections with the `glob` loader defined in `src/content.config.ts`.

Required frontmatter fields: `title`, `date`  
Optional: `tags` (array), `published` (bool, default `true`), `description`

### Routing

- `/` — paginated post list (`src/pages/index.astro`, `src/pages/[page].astro`)
- `/<slug>/` — individual post (`src/pages/[...slug].astro`)
- `/tags/` — tag index (`src/pages/tags/index.astro`)
- `/tags/<tag>/` — posts by tag (`src/pages/tags/[tag].astro`)
- `/rss.xml` — RSS feed

### Key files

- `src/lib/posts.ts` — utilities for fetching/filtering/sorting blog posts
- `src/layouts/Layout.astro` — base HTML layout
- `src/components/Bio.astro` — author bio component
- `src/styles/global.css` — Tailwind v4 imports (`@import "tailwindcss"` + typography plugin)

### Static assets

Public files go in `static/` (mapped to `publicDir` in `astro.config.mjs`), not `public/`.

### Configuration

- `trailingSlash: 'always'` — all URLs must end with `/`
- Tailwind configured via `@tailwindcss/vite` Vite plugin (no separate config file)
- Syntax highlighting uses Shiki with `github-dark` theme
- Sitemap auto-generated via `@astrojs/sitemap`

### Deployment

GitHub Actions workflow (`.github/workflows/gh-pages.yml`) builds on Node 20 and deploys to GitHub Pages on push to `main`. Development happens on the `develop` branch.
