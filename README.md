# Abu&ndash;Huraira — Now Exhibiting

A personal site presented as a **small museum exhibition**, not a
conventional tech portfolio. Plain HTML, CSS, and JavaScript &mdash; no
frameworks, no build tools, no dependencies to install.

## Concept

A clean, gallery-style alternative designed to be immediately legible to
any visitor, technical or not:

- **White gallery-wall background**, generous whitespace, hairline rules
- Content organized as **numbered exhibits**, each with a small plaque
  label (like a museum wall tag):
  - **Exhibit I &mdash; About Me** (with a drop-cap opening line and a
    small fact plaque)
  - **Exhibit II &mdash; My Story, So Far** (a dated timeline)
  - **Exhibit III &mdash; Curatorial Notes** (skills, framed as curator's
    notes &mdash; no invented percentages)
  - **Exhibit IV &mdash; The Catalog** (projects, listed with status tags:
    On display / In progress / Coming soon)
  - A **Curator's Note** pull quote
  - **Exhibit V &mdash; Sign the Visitor Book** (the contact section)
- Elegant serif display type (Cormorant Garamond) paired with a clean,
  highly legible sans body font (Inter) and small monospace labels (IBM
  Plex Mono) for plaque-style captions
- A friendly, dismissible onboarding banner so any visitor immediately
  understands it's "just a portfolio, styled like a small exhibition"

Content is intentionally honest: no invented skill percentages, no
fabricated testimonials or visitor counts, no exaggerated bio.

## Structure

```
Portfolio-/
├── index.html         # All page markup and content
├── css/
│   └── style.css      # Full gallery/exhibition design system
├── js/
│   └── main.js         # Reveal-on-scroll, contact form, nav highlighting
└── README.md
```

## Running Locally

No build step needed — open `index.html` directly, or serve the folder for
best results with fonts/animations:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying (GitHub Pages)

1. Repository must be **public** for GitHub Pages to work on a free account
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → Branch: **main** → Folder: **/(root)**
4. Save — the site goes live at `https://<username>.github.io/Portfolio-/`

## Customizing

- **Content** — all copy lives directly in `index.html`, organized by
  section id: `hero`, `about`, `journey`, `skills`, `projects`, `stance`,
  `contact`
- **Contact info** — replace the placeholder email (`youremail@example.com`)
  and the LinkedIn `#` link in the `contact` section, and update the
  `data-mailto` attribute on `#contact-form`
- **Palette** — edit the CSS variables at the top of `css/style.css`
  (`--wall`, `--ink`, `--accent`, `--brass`)
- **Projects** — duplicate a `.catalog-row` block in the catalog section as
  new projects are actually finished; update the `status-*` class

## Accessibility & Performance Notes

- No external image hotlinking &mdash; the whole design is typographic/CSS
- All animations respect `prefers-reduced-motion: reduce`
- Semantic landmarks (`header`, `main`, `section`, `footer`) used throughout
- High-contrast, legible typography prioritized over visual gimmicks
