<div align="center">

# QAlchemy — Marketing Website

**AI-powered test case generation, presented.**

[![Live Site](https://img.shields.io/badge/Live-qalchemy.vercel.app-2563eb?logo=vercel&logoColor=white)](https://qalchemy.vercel.app)

</div>

---

## What this is

This repository holds the public marketing site for **QAlchemy**, a closed-source, local-first desktop QA workspace. It's a static, multi-page site designed to look and feel like a premium commercial SaaS product (in the spirit of Linear, Vercel, and Raycast) while accurately representing a desktop application — no cloud service or open-source claims.

Every screenshot on this site is captured directly from the running app, never mocked up.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Landing page: hero, product tour, feature grid, export formats, how it works |
| `downloads.html` | Windows installers (.exe / .msi), SmartScreen guidance, VirusTotal scan result |
| `gallery.html` | Full-size screenshot gallery of every core workspace |
| `docs.html` | Complete product guide with sticky sidebar navigation |
| `changelog.html` | Version history and release notes |
| `about.html` | Why QAlchemy exists, its principles, and creator/support links |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |

## Tech

No framework, no build step, no package manager. Just:

- **HTML5** — one file per page, shared header/footer markup
- **Plain CSS** (`assets/css/main.css`) — design tokens (OKLCH colors), glassmorphism, dark mode via `prefers-color-scheme` + manual toggle
- **Vanilla JavaScript** (`assets/js/main.js`) — theme toggle, scroll-reveal animations, mobile nav, page-transition fade, docs TOC scroll-spy
- **Google Fonts** — Sora (display) + Inter (body) + JetBrains Mono

Open any `.html` file directly in a browser, or serve the folder with anything static (`npx serve`, `python -m http.server`, Vercel, Netlify, GitHub Pages). There is nothing to install and nothing to compile.

## Project structure

```
.
├── index.html, downloads.html, gallery.html, docs.html,
│   changelog.html, about.html, privacy.html, terms.html
├── releases/                 Windows installers (.exe, .msi)
├── assets/
│   ├── css/main.css           Shared design system
│   ├── js/main.js             Shared behavior
│   ├── screenshots/           Real captures from the QAlchemy app
│   ├── qalchemy-logo.png      App icon / brand mark
│   └── creator.JPG            Creator photo (About page)
├── robots.txt
└── sitemap.xml
```

## Keeping this site honest

This site only advertises features that are actually shipped in the QAlchemy desktop app, and does not reference source code, repositories, or open-source licensing — the app is closed-source freeware. When the product changes:

- **Screenshots** — recapture from the running app (dark mode, real data) and drop the updated PNGs into `assets/screenshots/`, replacing the old files with the same names.
- **Installers** — rebuild via the app's `npm run build:tauri`, then replace the files in `releases/` and update the version/size text on `downloads.html`, `index.html`, and `changelog.html`.
- **Feature copy** — cross-check against the app's own docs before adding a claim to the feature grid or hero.

## Deployment

This site is deployed on [Vercel](https://vercel.com) as a static site with zero build configuration. Pushing to `master` deploys automatically.

## Support

QAlchemy is built and maintained independently. If it saves you time, you can support continued development via the **Ko-fi** link on the site.
