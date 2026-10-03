import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3000 },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    css: false,
    env: { VITE_API_BASE_URL: "https://open-api.delcom.org/api/v1" },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/setupTests.js", "src/test-utils.jsx", "src/**/*.test.{js,jsx}"],
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  },
});
