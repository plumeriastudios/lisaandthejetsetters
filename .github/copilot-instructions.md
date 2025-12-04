## Repo purpose (short)
This is a small static travel guide site (HTML/CSS/vanilla JS) focused on responsive images and a lightbox-enabled photo gallery. Primary artifacts: `index.html`, `aruba.html`, `styles.css`, `script.js`, and `scripts/build-images.js`.

## High-level architecture
- Static site: plain HTML files per destination. No server-side code.
- Image pipeline: authors place high‑res originals in `images/originals/` and run `npm run build-images` (uses `scripts/build-images.js` + sharp) to produce `images/photoN-400/800/1600.{jpg,webp}` files.
- Frontend JS: `script.js` contains carousel, survey (local or remote via `FORM_ENDPOINT`), and the lightbox. Lightbox opens `data-large-webp` / `data-large-jpg` attributes on `.lightbox-trigger` elements.

## Developer workflows (commands you can run)
- Install deps: `npm install` (requires Node.js >=14)
- Build responsive images: `npm run build-images` (reads `images/originals/` and writes numbered `photoN-*` files to `images/`)
- Local preview: open `index.html` in your browser, or run a static server (examples in `README.md`)

## Project-specific conventions & patterns
- Image naming: generated files are `photo1-400.jpg`, `photo1-800.jpg`, `photo1-1600.jpg` and matching `.webp`. If ordering matters, prefix originals (e.g., `01-beach.jpg`).
- Picture markup: use `<picture>` with `source` for webp and jpeg and a fallback `<img>`; `sizes` attributes are used in several pages (see `aruba.html` for examples).
  - Example snippet from `aruba.html`:
    - `srcset="images/aruba-06-400.jpg 400w, images/aruba-06-800.jpg 800w, images/aruba-06-1600.jpg 1600w"`
- Lightbox pattern: anchors with class `.lightbox-trigger` may include `data-large-webp` and/or `data-large-jpg`. The lightbox prefers webp if provided (see `script.js` → `bestLargeSource`).
  - When adding an in-page thumbnail that should open larger, add `class="lightbox-trigger"` and set `data-large-jpg` (or `data-large-webp`).
- Survey handling: `script.js` will POST to `FORM_ENDPOINT` if set; otherwise responses are stored to localStorage under key `lts_survey_responses` for testing.

## Edit guidance (what AI agents should do)
- Prefer small, non-invasive edits to HTML/CSS to preserve existing styling. Match existing indentation and inline style patterns when modifying a page.
- When adding images: prefer using the `images/` build pipeline for production assets. For quick page-specific images (like `arubababybeach.jpg` used locally on `aruba.html`), the repo allows keeping a file next to the page — follow the existing lightbox pattern to wire it up.
- If modifying image markup, update `srcset`/`sizes` and include a `<source type="image/webp">` where possible to match site patterns.

## Files to inspect first (quick map)
- `aruba.html` — example of <picture> usage and the photos/lightbox block.
- `script.js` — site behaviors: carousel, lightbox, survey, and how `.lightbox-trigger` is consumed.
- `scripts/build-images.js` + `package.json` — image build workflow.
- `styles.css` — global styles and small utility classes used across pages.

## Examples from this repo
- To add a clickable Baby Beach image placed next to `aruba.html` use:
  - `<a class="lightbox-trigger" data-large-jpg="arubababybeach.jpg"><img src="arubababybeach.jpg" ...></a>`
- To add generated responsive images, follow `scripts/build-images.js` output and use a `picture` with matching `srcset` entries.

## Agent preferences
- Preference: prefer Claude Sonnet 4.5 for suggestions and small code edits when available. If Claude Sonnet 4.5 is not available to the running agent, fall back to GPT-5-mini.
- Note: I cannot change platform- or account-level model settings from this repository. If you need Claude Sonnet 4.5 enabled for all users in a hosted platform (GitHub Copilot, Chat UI, etc.), update your organization/account settings or contact the platform admin. Include a short step-by-step in this file if you want agents to follow manual instructions.
- Keep changes minimal and test behavior by opening the relevant HTML file in a browser (no full build required for static edits).

If anything above is unclear or you'd like the instructions to prefer a different model or a different image workflow, tell me and I will update this file.
