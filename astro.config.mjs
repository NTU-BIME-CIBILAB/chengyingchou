// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages *project* page for repo NTU-BIME-CIBILAB/chengyingchou, served from
//   https://ntu-bime-cibilab.github.io/chengyingchou/
// Rule: site = https://<user-or-org>.github.io ; base = /<repo-name>.
// (If you later add a custom domain or rename the repo, update these.)
// All internal links and public/assets URLs go through withBase() in src/lib/dom.ts.
export default defineConfig({
  site: 'https://ntu-bime-cibilab.github.io',
  base: '/chengyingchou',
  output: 'static',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
