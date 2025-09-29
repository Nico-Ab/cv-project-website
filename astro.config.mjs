import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  integrations: [tailwind({
    config: {
      applyBaseStyles: true
    }
  })],
  // ⚠️ When you know your repo name, uncomment and set these for GitHub Pages:
  // site: 'https://nico-ab.github.io/<REPO_NAME>',
  // base: '/<REPO_NAME>/',
});