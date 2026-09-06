interface Env {
  DB: D1Database;
  GATEWAY_TOKEN: string;
}

type DatabaseValue = string | number | boolean | null;

interface Query {
  sql: string;
  params?: DatabaseValue[];
}

function json(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

async function tokensMatch(actual: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [actualDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(actual)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const actualBytes = new Uint8Array(actualDigest);
  const expectedBytes = new Uint8Array(expectedDigest);
  let difference = 0;
  for (let index = 0; index < actualBytes.length; index++) {
    difference |= actualBytes[index] ^ expectedBytes[index];
  }
  return difference === 0;
}

function parseQueries(payload: unknown): Query[] | null {
  if (!payload || Array.isArray(payload) || typeof payload !== "object") return null;
  const body = payload as Record<string, unknown>;
  const candidates = Array.isArray(body.batch) ? body.batch : [body];
  if (candidates.length === 0 || candidates.length > 20) return null;

  const queries: Query[] = [];
  for (const candidate of candidates) {
    if (!candidate || Array.isArray(candidate) || typeof candidate !== "object") return null;
    const query = candidate as Record<string, unknown>;
    if (typeof query.sql !== "string" || query.sql.length === 0 || query.sql.length > 100_000) {
      return null;
    }
    const params = query.params ?? [];
    if (!Array.isArray(params) || params.length > 100) return null;
    if (
      !params.every(
        (value) =>
          value === null ||
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean",
      )
    ) {
      return null;
    }
    queries.push({ sql: query.sql, params: params as DatabaseValue[] });
  }
  return queries;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") return json({ success: false }, 405);

    const authorization = request.headers.get("authorization") ?? "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
    if (!env.GATEWAY_TOKEN || !(await tokensMatch(token, env.GATEWAY_TOKEN))) {
      return json({ success: false }, 401);
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return json({ success: false }, 400);
    }
    const queries = parseQueries(payload);
    if (!queries) return json({ success: false }, 400);

    try {
      const statements = queries.map((query) => env.DB.prepare(query.sql).bind(...query.params!));
      const result = await env.DB.batch(statements);
      return json({ success: true, result });
    } catch (error) {
      console.error(error);
      return json({ success: false }, 500);
    }
  },
};
