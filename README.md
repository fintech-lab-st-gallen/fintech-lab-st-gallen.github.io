# FinTech Lab St. Gallen — website

A responsive, single-page website built with plain HTML, CSS and JavaScript. It has no framework, build step or external dependency, so it can be published directly with GitHub Pages.

## Project structure

```text
fintech-lab-website/
├── index.html              # Page content and section structure
├── styles.css              # Layout, colours and responsive design
├── script.js               # Mobile menu, active section and current year
├── README.md               # Setup and publication notes
└── assets/
    ├── fintech-lab-logo.png
    ├── hero-visual.png
    └── favicon.svg
```

## Preview locally

The simplest option is to open `index.html` in a browser.

For a local web server, open a terminal inside this folder and run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Content that still needs final links

Search for the comments beginning with `Replace` in `index.html` and update:

1. The Google Form URL.
2. LinkedIn, Instagram and TikTok URLs.
3. Team names, roles, photographs and biographies when available.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Save. GitHub will show the public website URL after deployment.

## Main design settings

The primary colours, widths and font stack are defined at the top of `styles.css` inside `:root`. Changing those variables updates the whole website consistently.
