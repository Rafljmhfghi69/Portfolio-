# Abu&ndash;Huraira — A Working Notebook (Issue N&deg;01)

A personal site built as an editorial "notebook" rather than a conventional
tech portfolio &mdash; no gradients, no glassmorphism, no rounded cards, no
skill-percentage bars. Plain HTML, CSS, and JavaScript. No frameworks, no
build tools, no dependencies to install.

## Concept

Most developer portfolios share the same shape: hero, glass cards, a grid
of skills with progress bars, a projects grid. This one intentionally
avoids that shape. It's designed like a printed notebook or zine:

- A rotated **spine** running down the left edge, like a book spine
- A **page rail** on the right tracking which "entry" you're currently on
- A sticky **masthead** instead of a floating navbar
- **Drop caps**, a **dot-leader table of contents**, and a **numbered
  glossary** of capabilities instead of animated skill bars
- Projects presented as **plates** with generative CSS halftone/line
  textures &mdash; no stock photography, no hotlinked images
- A **custom cursor with a contextual text label** ("Read", "Open", "Send")
  that changes depending on what you're hovering
- Ink-on-paper color palette (`#f3efe7` paper, `#111110` ink, `#c0311a`
  accent) with a subtle film-grain overlay

Content is deliberately honest: no invented skill percentages, no
fabricated testimonials, no exaggerated bio. It reads like a notebook
because that's what it actually is.

## Structure

```
Portfolio-/
├── index.html         # All page markup and content
├── css/
│   └── style.css      # Full design system: layout, type, components
├── js/
│   └── main.js         # Cursor label, section rail, reveal-on-scroll, contact form
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

- **Content** — all copy lives directly in `index.html` (Cover, Profile,
  Log, Capabilities, Works, Stance, Colophon)
- **Contact info** — replace the placeholder email (`youremail@example.com`)
  and the LinkedIn `#` link in the Colophon section, and update the
  `data-mailto` attribute on `#contact-form`
- **Palette** — edit the CSS variables at the top of `css/style.css`
  (`--paper`, `--ink`, `--accent`)
- **Works/projects** — duplicate a `.work-item` block as new projects are
  actually finished; swap the `plate-1/2/3` CSS-pattern classes or add new
  ones in `css/style.css`
- **Cursor labels** — add `data-cursor="Your Label"` to any element to give
  it a custom cursor label on hover (desktop only)

## Accessibility & Performance Notes

- Custom cursor is automatically disabled on touch devices
- All animations respect `prefers-reduced-motion: reduce`
- No external image hotlinking — project "plates" are pure CSS patterns
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) used throughout
