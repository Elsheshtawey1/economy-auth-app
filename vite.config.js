import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/economy-api": {
        target: "https://alive-roby-karimhashim2002-3cfd1cd3.koyeb.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
