// O wrapper do Lovable mantém TanStack Start, React, Tailwind e os aliases.
// O plugin Cloudflare é desativado para que o Nitro gere a saída da Vercel.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Mantém o wrapper de erros SSR do projeto como entrada do servidor.
export default defineConfig({
  cloudflare: false,
  plugins: [nitro()],
  tanstackStart: {
    server: { entry: "server" },
  },
});
