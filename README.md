# Portfolio - Abu-Huraira

A simple, responsive personal portfolio website built with plain HTML, CSS, and JavaScript — no frameworks or build tools required.

## About

This portfolio introduces Abu-Huraira, a 19-year-old self-taught tech enthusiast who completed HSC in 2024 and is currently learning to build projects using AI-assisted development tools.

## Structure

```
Portfolio-/
├── index.html      # Main page (Hero, About, Skills, Projects, Contact)
├── style.css       # Styling (dark theme, responsive layout)
├── script.js       # Mobile nav toggle, active-link highlighting, footer year
├── images/         # Place profile photo / project screenshots here
└── README.md
```

## Running Locally

No build step needed. Just open `index.html` in your browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

This site is static and can be hosted for free with **GitHub Pages**:

1. Go to the repository **Settings > Pages**
2. Set the source branch to `main` (or your default branch) and root folder
3. Save — your site will be live at `https://<username>.github.io/Portfolio-/`

## Customizing

- Update text content directly in `index.html` (bio, skills, projects, contact links)
- Replace placeholder email/social links in the **Contact** section
- Add real project entries in the **Projects** section as you complete them
- Drop a profile photo or project screenshots into the `images/` folder and reference them in `index.html`
