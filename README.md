# doggi

A single-page, single-photo “sorry” site built with React + Vite + Framer Motion.

## The one photo

Place your only image at:

- `public/photo.jpg`

That file is used as:

- The low-opacity background across the whole page
- The photo inside every openable envelope
- The site icon (favicon)

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Edit the message

The apology copy and envelope notes live in `src/App.jsx`.

## Deploy (GitHub Pages)

This project deploys to GitHub Pages using the `gh-pages` branch.

In GitHub: Settings → Pages → Source: **Deploy from a branch** → Branch: `gh-pages` → Folder: `/ (root)`.

Deploy from your machine:

```bash
npm run deploy
```

Expected URL:

- https://izhaan-dev.github.io/doggi/
