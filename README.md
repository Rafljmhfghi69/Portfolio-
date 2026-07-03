# Portfolio — Abu-Huraira

A fully custom, animation-rich personal portfolio site — built from scratch
with plain HTML, CSS, and JavaScript. No frameworks, no build tools, no
dependencies to install.

## About

This site introduces Abu-Huraira: a 19-year-old self-taught tech enthusiast
who completed HSC in 2024 and is now focused on learning to build real
projects using AI-assisted development tools. The content is intentionally
honest — no inflated skill claims, just a real story and real momentum.

## Features

- **Custom cursor** with magnetic hover states on interactive elements
- **Animated canvas background** in the hero — a connected particle network that reacts to mouse movement
- **Typing effect** that rotates through roles/descriptors
- **Scroll-triggered reveal animations** (fade/scale-in) via `IntersectionObserver`
- **Animated skill bars** that fill in when scrolled into view
- **Scroll progress bar** and **active-section nav highlighting**
- **Dark/light theme toggle** persisted via `localStorage`
- **Glassmorphism navbar**, gradient accents, and a marquee ticker strip
- **Working contact form** (client-side validated, hands off to `mailto:`)
- Fully responsive, with a dedicated mobile nav and reduced-motion support (`prefers-reduced-motion`)
- Zero dependencies — just static files, ready to deploy anywhere

## Structure

```
Portfolio-/
├── index.html            # All page markup and content
├── css/
│   ├── style.css         # Design tokens, layout, components
│   └── animations.css    # Keyframes and motion-only rules
├── js/
│   ├── animations.js      # Canvas, cursor, scroll reveal, typing effect
│   └── main.js            # Nav, theme toggle, contact form, misc UI
├── images/                # Drop your profile photo / project screenshots here
└── README.md
```

## Running Locally

No build step needed — just open `index.html` in a browser, or serve the
folder with a simple static server for best results (canvas/fonts behave
more reliably over `http://` than `file://`):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying (GitHub Pages)

1. Go to the repository **Settings → Pages**
2. Set the source branch to `main` (or your default branch), root folder
3. Save — the site will be live at `https://<username>.github.io/Portfolio-/`

## Customizing

- **Content** — all text lives directly in `index.html` (bio, timeline, skills, projects, contact info)
- **Contact info** — replace the placeholder email (`youremail@example.com`) and LinkedIn `#` link in the Contact section, footer, and the `data-mailto` attribute on `#contact-form`
- **Colors** — edit the CSS variables at the top of `css/style.css` under `:root` (and `[data-theme="light"]` for the light mode palette)
- **Projects** — duplicate a `.project-card` block in the Projects section as new projects are completed
- **Photo** — drop an image into `images/` and reference it wherever you'd like (e.g. hero or about section)

## Performance & Accessibility Notes

- Canvas particle animation and custom cursor are automatically disabled on touch devices and when `prefers-reduced-motion: reduce` is set
- All animations respect reduced-motion preferences
- Semantic HTML landmarks (`header`, `nav`, `section`, `footer`) are used throughout
