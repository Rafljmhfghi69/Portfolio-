# abu-huraira — ~/portfolio

A personal site presented as a **code editor**, not a conventional
portfolio. Plain HTML, CSS, and JavaScript &mdash; no frameworks, no build
tools, no dependencies to install.

## Concept

Instead of a hero-and-cards layout, the whole page is styled like an open
VS Code window:

- A **fake OS title bar** (red/yellow/green dots) at the top
- A **file explorer sidebar** with real "files": `about.md`, `journey.log`,
  `skills.json`, `projects/`, `contact.sh`
- A **tab bar** mirroring the sidebar, with the active tab highlighted as
  you scroll
- **Line-numbered gutters** next to every section, like an actual editor
  pane
- A **live-typing terminal** in `about.md` that runs commands (`whoami`,
  `cat status.txt`) to introduce the page
- **`journey.log`** presented as a `git log --oneline --decorate --graph`
  output, with real commit-style entries instead of a visual timeline
- **`skills.json`** as an actual JSON object &mdash; explicitly including
  `"skill_bars": null // on purpose` and `"fabricated_testimonials": false`
  instead of invented percentage bars
- **`projects/`** shown as diff-style blocks with status badges (`live`,
  `in progress`, `planned`)
- **`contact.sh`** as a terminal window containing a real form, with a
  `./send.sh` button
- A **VS Code&ndash;style status bar** pinned to the bottom (`⎇ main`,
  current file, `UTF-8`)

Content is intentionally honest: no invented skill percentages, no
fabricated testimonials, no exaggerated bio &mdash; `skills.json` says so
directly.

## Structure

```
Portfolio-/
├── index.html         # All page markup: titlebar, sidebar, tabs, 5 panes
├── css/
│   └── style.css      # Full editor/terminal design system + syntax colors
├── js/
│   └── main.js         # Terminal typing sequence, tab sync, reveal, contact form
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
  `data-file` sections: `about-md`, `journey-log`, `skills-json`,
  `projects-dir`, `contact-sh`
- **Contact info** — replace the placeholder email (`youremail@example.com`)
  and the LinkedIn `#` link in the `contact-sh` section, and update the
  `data-mailto` attribute on `#contact-form`
- **Terminal script** — edit the `termScript` array at the top of
  `js/main.js` to change what the hero terminal types out
- **Syntax colors** — edit the `--syn-*` CSS variables at the top of
  `css/style.css` (VS Code "Dark+" inspired palette)
- **Projects** — duplicate a `.project-block` in the `projects-dir` section
  as new projects are actually finished; update the `status-badge` class
  (`status-live`, `status-progress`, `status-planned`)

## Accessibility & Performance Notes

- Terminal typing animation is skipped (renders instantly) when
  `prefers-reduced-motion: reduce` is set
- Sidebar collapses to a toggleable menu on narrow viewports
- No external image hotlinking &mdash; the whole design is typographic/CSS
- Semantic landmarks (`header`-equivalent titlebar, `aside`, `main`,
  `section`) used throughout
