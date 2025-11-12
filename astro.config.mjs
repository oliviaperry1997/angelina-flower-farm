import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://oliviaperry1997.github.io',
  base: process.env.NODE_ENV === 'production' ? '/angelina-flower-farm' : undefined,
  integrations: [tailwind()],
});
