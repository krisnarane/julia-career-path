import { defineConfig } from "vitest/config";
import path from "node:path";

// Config dedicado ao Vitest (não reaproveita vite.config.ts porque ele depende
// de @lovable.dev/vite-tanstack-config, que injeta plugins de build/SSR
// incompatíveis com o ambiente de testes). Mantemos apenas o alias "@" usado
// nos imports do projeto (ver tsconfig.json paths).
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
  },
});
