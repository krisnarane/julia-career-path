export interface AppEnv {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}

let cached: AppEnv | undefined;

// Em dev o plugin Cloudflare não roda (build-only), então `cloudflare:workers`
// não existe — usamos o proxy do wrangler, que lê .dev.vars e o D1 local
// de .wrangler/state (o mesmo de `npm run db:migrate:local`).
export async function getBindings(): Promise<AppEnv> {
  if (cached) return cached;
  if (import.meta.env.DEV) {
    const { getPlatformProxy } = await import("wrangler");
    const proxy = await getPlatformProxy<AppEnv>({ persist: true });
    cached = proxy.env;
  } else {
    const mod = await import("cloudflare:workers");
    cached = (mod as { env: AppEnv }).env;
  }
  return cached;
}
