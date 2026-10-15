import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://louissanteliz.netlify.app",
  integrations: [react()],
  vite: {
    optimizeDeps: {
      include: ["react-dom/client"],
    },
    plugins: [tailwindcss()],
  },
});
