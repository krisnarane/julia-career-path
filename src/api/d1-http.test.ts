import { describe, expect, it, vi } from "vitest";
import { createHttpD1Database } from "./d1-http";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("D1 HTTP adapter", () => {
  it("consulta o banco com parâmetros e autenticação", async () => {
    const fetcher = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
      jsonResponse({
        success: true,
        result: [{ success: true, results: [{ id: "1" }], meta: { rows_read: 1 } }],
      }),
    );
    const database = createHttpD1Database({
      gatewayUrl: "https://database.example.workers.dev",
      gatewayToken: "secret-token",
      fetch: fetcher,
    });

    const result = await database.prepare("SELECT * FROM items WHERE id = ?1").bind("1").all();

    expect(result.results).toEqual([{ id: "1" }]);
    expect(fetcher).toHaveBeenCalledOnce();
    const [url, init] = fetcher.mock.calls[0];
    expect(url).toBe("https://database.example.workers.dev");
    expect(init?.headers).toMatchObject({ authorization: "Bearer secret-token" });
    expect(JSON.parse(String(init?.body))).toEqual({
      sql: "SELECT * FROM items WHERE id = ?1",
      params: ["1"],
    });
  });

  it("envia batches como uma única requisição", async () => {
    const fetcher = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
      jsonResponse({
        success: true,
        result: [
          { success: true, results: [], meta: { changes: 1 } },
          { success: true, results: [], meta: { changes: 1 } },
        ],
      }),
    );
    const database = createHttpD1Database({
      gatewayUrl: "https://database.example.workers.dev",
      gatewayToken: "token",
      fetch: fetcher,
    });

    const result = await database.batch([
      database.prepare("UPDATE items SET active = 0"),
      database.prepare("UPDATE items SET active = 1 WHERE id = ?1").bind("1"),
    ]);

    expect(result).toHaveLength(2);
    const [, init] = fetcher.mock.calls[0];
    expect(JSON.parse(String(init?.body))).toEqual({
      batch: [
        { sql: "UPDATE items SET active = 0", params: [] },
        { sql: "UPDATE items SET active = 1 WHERE id = ?1", params: ["1"] },
      ],
    });
  });

  it("expõe a mensagem retornada pela API", async () => {
    const database = createHttpD1Database({
      gatewayUrl: "https://database.example.workers.dev",
      gatewayToken: "token",
      fetch: vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
        jsonResponse({ success: false, errors: [{ message: "Token inválido" }] }, 403),
      ),
    });

    await expect(database.prepare("SELECT 1").all()).rejects.toThrow("Token inválido");
  });
});
