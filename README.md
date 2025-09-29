# Nico Portfolio (Astro + Tailwind)

Starter repo for a clean, fast portfolio with sidebar navigation and dedicated pages for four data projects.
Built with **Astro + Tailwind** so it's easy to host on GitHub Pages and extend with interactive demos later.

## Quickstart (Linux Mint Cinnamon)

```bash
# 1) Install Node 18+ (or 20+). On Mint:
#    sudo apt-get install -y nodejs npm  # or use nvm for latest LTS
# 2) Install deps
npm install

# 3) Run dev server
npm run dev  # then open the printed localhost URL

# 4) Build for production
npm run build
```

> Edit files with `xed` (Mint’s editor) or VS Code. Example:
```bash
xed src/pages/about.astro
```

## Structure

```
src/
  layouts/       # Base layout with sidebar & theme toggle
  components/    # Small UI pieces (cards, etc.)
  pages/
    about.astro
    projects/
      mini-warehouse.astro
      data-quality-lineage.astro
      cdc-warehouse.astro
      performance-governance.astro
  data/projects.ts
public/          # static assets (favicon, CV placeholder, images)
```

## Customize

- Replace placeholders in `about.astro` and each project page.
- Put your **CV** as `public/CV.pdf` and link to it from the sidebar (currently a placeholder `cv-placeholder.txt`).
- If you plan to use **GitHub Pages**, set `site` and `base` in `astro.config.mjs` after you know the repo name.

## Deploy to GitHub Pages

1. Create a repo on GitHub (e.g., `portfolio-site`) and push this project.
2. In `astro.config.mjs`, uncomment and set:
   ```js
   site: 'https://<your-username>.github.io/portfolio-site',
   base: '/portfolio-site/',
   ```
3. Enable **Pages** in the repo settings: Source = GitHub Actions.
4. The included workflow will build & deploy on push to `main`.

## License

MIT — make it yours.