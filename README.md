# Abu&ndash;Huraira — Liner Notes

A personal site presented as an **album's liner notes**, not a conventional
tech portfolio. Plain HTML, CSS, and JavaScript &mdash; no frameworks, no
build tools, no dependencies to install.

## Concept

A warm, "acoustic" alternative to the cold, digital look of a typical dev
portfolio:

- **Kraft-paper and cream tones** instead of dark mode or bright gradients
- A **generated waveform** in the hero, gently animating like an idle audio
  track
- A **cassette-tape label** sticker in the corner of the hero
- Content organized like an actual album, track by track:
  - **Track 01 &mdash; About Me** (liner notes, with a drop-cap opening line)
  - **Track 02 &mdash; My Story, So Far** (a dated B-side history)
  - **Track 03 &mdash; Credits** (skills, framed as album credits &mdash; no
    invented percentages)
  - **Track 04 &mdash; The Tracklist** (projects, listed like album tracks
    with status badges: live / in progress / planned)
  - A liner-note **pull quote**
  - **Track 05 &mdash; Request a Song** (the contact section)
- Dashed "perforated" section dividers, tilted sticky-note style cards, and
  warm serif + hand-lettered display type (Fraunces + Caveat)
- A friendly, dismissible onboarding banner so non-technical visitors
  immediately understand it's "just a portfolio dressed up"

Content is intentionally honest: no invented skill percentages, no
fabricated testimonials or streaming stats, no exaggerated bio.

## Structure

```
Portfolio-/
├── index.html         # All page markup and content
├── css/
│   └── style.css      # Full acoustic/warm design system
├── js/
│   └── main.js         # Waveform animation, reveal-on-scroll, contact form
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
  (`--paper`, `--ink`, `--accent`, `--wave`, `--tape`)
- **Waveform** — tweak the bar-count and animation parameters in the
  waveform section of `js/main.js`
- **Projects** — duplicate a `.track-row` block in the tracklist section as
  new projects are actually finished; update the `status-*` class

## Accessibility & Performance Notes

- Waveform idle animation is skipped (renders as a static pattern) when
  `prefers-reduced-motion: reduce` is set
- No external image hotlinking &mdash; the whole design is typographic/CSS
- Semantic landmarks (`header`, `main`, `section`, `footer`) used throughout
