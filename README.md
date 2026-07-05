<div align="center">

# QAlchemy — Marketing Website

**AI Powered Test Case Generation, presented.**

[![Live Site](https://img.shields.io/badge/Live-qalchemy.app-2563eb?logo=vercel&logoColor=white)](https://qalchemy-website.vercel.app)
[![QAlchemy App](https://img.shields.io/badge/App-Buraizuuu%2Fqalchemy-000000?logo=github&logoColor=white)](https://github.com/Buraizuuu/qalchemy)
[![MIT License](https://img.shields.io/badge/License-MIT-06B6D4)](#license)

</div>

---

## What this is

This repository holds the public landing page for **[QAlchemy](https://github.com/Buraizuuu/qalchemy)** — the open source, AI powered test case generator. It's a single static page designed to look and feel like a premium commercial SaaS product (in the spirit of Linear, Vercel, Stripe, and Raycast) while accurately representing an open source project.

The page exists to do three things:

1. Explain what QAlchemy does in one screen, without jargon.
2. Show the real product — every screenshot on this page is captured directly from the running app, never mocked up.
3. Convert visitors into GitHub stars, downloads, and contributors.

## Tech

No framework, no build step, no package manager. Just:

- **HTML5** — single `index.html`
- **Tailwind CSS** via CDN
- **Vanilla JavaScript** — scroll reveals, magnetic buttons, spotlight hover, animated counters, lightbox, mobile nav
- **Google Fonts** — Space Grotesk (display) + Inter (body)

Open `index.html` directly in a browser, or serve the folder with anything static (`npx serve`, `python -m http.server`, Vercel, Netlify, GitHub Pages). There is nothing to install and nothing to compile.

## Project structure

```
.
├── index.html               Entire page: markup, styles, and scripts
└── assets/
    ├── screenshots/          Real captures from the QAlchemy app (dashboard, generate,
    │                         results, suites, settings)
    ├── logo.svg               QAlchemy wordmark (light)
    ├── logo-dark.svg          QAlchemy wordmark (dark)
    └── favicon.svg            Browser tab icon
```

## Keeping this page honest

This site only advertises features that are actually shipped in the QAlchemy app. Anything not yet built lives in the **Coming Soon** section, clearly separated from the feature grid. When the product changes:

- **Screenshots** — recapture from the running app and drop the updated PNGs into `assets/screenshots/`, replacing the old files with the same names.
- **Feature copy** — cross check against [`QAlchemy`'s README and `PROJECT_MEMORY.md`](https://github.com/Buraizuuu/qalchemy) before adding a claim to the feature grid or hero.
- **Roadmap** — move an item out of "Coming Soon" and into the feature grid only once it has actually shipped.

## Deployment

This site is deployed on [Vercel](https://vercel.com) as a static site with zero build configuration. Pushing to `main` deploys automatically.

## Support

QAlchemy is free and open source. If it saves your team time, you can support continued development via the **Buy me a coffee** link on the site (Ko-fi).

## License

MIT — see the [QAlchemy repository](https://github.com/Buraizuuu/qalchemy) for the application license. This marketing site's own code is likewise MIT licensed.
