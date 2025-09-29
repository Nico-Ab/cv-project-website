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
  site: 'https://Nico-Ab.github.io/cv-project-website',
  base: '/cv-project-website/',

});