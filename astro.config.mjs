import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://adityajamuar.com",
  integrations: [sitemap()],
});
