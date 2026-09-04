# AGENTS.md

Personal landing pages for Donggeon Lim (PW486). Vite + React 19 + TypeScript, deployed to GitHub Pages (user site, served at root).

## Commands
- `npm run dev` — local dev server
- `npm run build` — `tsc -b && vite build && cp dist/index.html dist/404.html && mkdir -p dist/travel && cp dist/index.html dist/travel/index.html && node scripts/patch-travel-html.js`; this is the typecheck step. No lint/test script.

## Deployment
- Push to `main` → `.github/workflows/deploy.yml` builds and deploys `dist/` to Pages.
- `dist/` is gitignored.
- User site (`pw486.github.io`) served at root — do **not** set `base` in `vite.config.ts`.

## Structure
- `src/App.tsx` — router (`/` → `Home`, `/travel` → `Travel`) + `ScrollToTop`
- `src/main.tsx` — entry with `BrowserRouter`
- `src/pages/swe/Home.tsx` + `Home.css` — hero (GitHub/LinkedIn/Email, avatar `/profile.jpg`) + project grid
- `src/pages/traveler/Travel.tsx` + `Travel.css` — same layout, warm palette (`--travel-*`), hero (Instagram/Email, avatar `/traveler/profile.jpg`), vertical timeline. `html.travel-html`/`body.travel-body` overrides outer background.
- `src/data/projects.json` — home cards (`label` = `og:description`, `image` = `og:image` — see "Adding a new project")
- `src/data/journey.json` — travel entries (88, oldest first, reversed in code). One city per line. Gallery is attached to the **first occurrence** of a city only; format: `"gallery": ["/images/{city-slug}-{n}.webp"]`. Paths MUST be root-absolute (`/images/...`) — relative paths break on `/travel` because the browser resolves them against `/travel/images/`.
- `public/images/*` — travel gallery images, referenced by `journey.json`. Folder contents must equal the referenced set (no orphans). All `.webp`, width 1000px, quality 80, metadata (EXIF/GPS/IPTC) stripped.
- `public/{profile.jpg,og-image.jpg,favicon.*}` — default (SWE) assets; `public/traveler/*` — traveler assets. `apple-touch-icon.png` and `web-app-manifest-*.png` are generated from `profile.jpg` (180/192/512). `og-image.jpg` is 1200×630 generated from `profile.jpg`.
- `index.html` — SWE OG/manifest/favicons (`/profile.jpg`, `/og-image.jpg`). Travel OG is patched at build (`scripts/patch-travel-html.js` → `dist/travel/index.html` uses `/traveler/*` and `og:url https://pw486.github.io/travel`) and swapped at runtime in `Travel.tsx`.
- `vite.config.ts` — no `base`.

## Image pipeline (travel gallery)
- Naming: lowercase city slug + `-N` sequence, e.g. `reykjavik-1.webp`. Slug = `city.toLowerCase()` with non-alphanumerics → `-` (matches journey.json city; e.g. San Francisco → `san-francisco`, Cat Ba → `cat-ba`).
- Convert originals to WebP: `python3 scripts/convert-images.py <src-dir>` (width 1000px, downscale only; `quality=80, method=6`, Pillow + pillow-heif). sips cannot write webp.
- Strip metadata: remove all JPEG APPn segments except APP0 (JFIF) / APP2 (ICC) and COM comments before/while converting.
- Galleries are max 4 images → CSS only defines `cols-1`…`cols-4`.

## Adding a new project
1. Fetch `og:image` and `og:description` from the project URL (`curl -sL <url> | grep -i "og:image\|og:description"`). `label` MUST equal `og:description` exactly and `image` MUST equal `og:image` exactly — do not invent, paraphrase, or use a different cover/screenshot.
2. Add a new entry to `src/data/projects.json` at the top (newest first) with `name`, `url`, `image` (`og:image`), and `label` (`og:description`).
3. Verify with `npm run build`.

## Adding a new city / photos
1. Add the city entry to `src/data/journey.json` (one line per city, keep oldest-first order).
2. Drop original photos anywhere temporarily, then run `python3 scripts/convert-images.py <src-dir>` to write `public/images/{city-slug}-{n}.webp`.
3. Add `"gallery": ["/images/{city-slug}-1.webp", ...]` to the city's first entry in `journey.json`.
4. If a city already exists in the timeline, append photos to its existing gallery instead of adding a duplicate gallery.
5. Verify: every `journey.json` gallery path exists in `public/images`, and no orphan files remain in the folder.

## Notes
- Keep hero metrics identical between pages (3.5rem title, 100px avatar, 36px socials); only colors differ.
- Timeline: `padding-left 2.5rem` (desktop) / `2.2rem` (mobile), dot centered on city+country, line `top 36px bottom 42px` solid `var(--travel-line)`. Gallery grid: PC 4 cols / tablet(≤896px) 3 cols (4 images → 2×2) / mobile(≤640px) 2 cols; no `Traveler` title string — unified to `Donggeon Lim · PW486`.
- `dist/404.html` is copy of `dist/index.html` for SPA fallback on Pages.
