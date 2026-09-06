import { createHttpD1Database, type Database } from "./d1-http";

export interface AppEnv {
  DB: Database;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}

let cached: AppEnv | undefined;

// Em desenvolvimento, o proxy do Wrangler lê .dev.vars e o D1 local.
// Na Vercel, o banco D1 é acessado pela API autenticada do Cloudflare.
export async function getBindings(): Promise<AppEnv> {
  if (cached) return cached;
  if (import.meta.env.DEV) {
    const { getPlatformProxy } = await import("wrangler");
    const proxy = await getPlatformProxy<AppEnv>({ persist: true });
    cached = proxy.env;
  } else {
    const required = [
      "ADMIN_PASSWORD",
      "SESSION_SECRET",
      "D1_GATEWAY_URL",
      "D1_GATEWAY_TOKEN",
    ] as const;
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length > 0) {
      throw new Error(`Variáveis de ambiente ausentes: ${missing.join(", ")}`);
    }

    cached = {
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
      SESSION_SECRET: process.env.SESSION_SECRET!,
      DB: createHttpD1Database({
        gatewayUrl: process.env.D1_GATEWAY_URL!,
        gatewayToken: process.env.D1_GATEWAY_TOKEN!,
      }),
    };
  }
  return cached;
}
