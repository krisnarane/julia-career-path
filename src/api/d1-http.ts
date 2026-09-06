export type DatabaseValue = string | number | boolean | null;

export interface DatabaseResult<T = unknown> {
  success: true;
  results: T[];
  meta: Record<string, unknown>;
}

export interface DatabaseStatement {
  bind(...values: unknown[]): DatabaseStatement;
  all<T = Record<string, unknown>>(): Promise<DatabaseResult<T>>;
  run<T = Record<string, unknown>>(): Promise<DatabaseResult<T>>;
}

export interface Database {
  prepare(query: string): DatabaseStatement;
  batch<T = unknown>(statements: DatabaseStatement[]): Promise<DatabaseResult<T>[]>;
}

interface D1HttpConfig {
  gatewayUrl: string;
  gatewayToken: string;
  fetch?: typeof globalThis.fetch;
}

interface D1ApiQuery {
  sql: string;
  params: DatabaseValue[];
}

interface D1ApiResult {
  success?: boolean;
  results?: unknown[];
  meta?: Record<string, unknown>;
}

interface D1ApiResponse {
  success?: boolean;
  result?: D1ApiResult[];
  errors?: Array<{ message?: string }>;
}

function normalizeValue(value: unknown): DatabaseValue {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }
  throw new TypeError(`Tipo de parâmetro não suportado pelo D1: ${typeof value}`);
}

class HttpD1Statement implements DatabaseStatement {
  constructor(
    readonly database: HttpD1Database,
    readonly sql: string,
    readonly params: DatabaseValue[] = [],
  ) {}

  bind(...values: unknown[]): DatabaseStatement {
    return new HttpD1Statement(this.database, this.sql, values.map(normalizeValue));
  }

  async all<T = Record<string, unknown>>(): Promise<DatabaseResult<T>> {
    const [result] = await this.database.query<T>([{ sql: this.sql, params: this.params }]);
    return result;
  }

  run<T = Record<string, unknown>>(): Promise<DatabaseResult<T>> {
    return this.all<T>();
  }
}

class HttpD1Database implements Database {
  private readonly endpoint: string;
  private readonly fetcher: typeof globalThis.fetch;

  constructor(private readonly config: D1HttpConfig) {
    this.endpoint = config.gatewayUrl;
    this.fetcher = config.fetch ?? globalThis.fetch;
  }

  prepare(query: string): DatabaseStatement {
    return new HttpD1Statement(this, query);
  }

  async batch<T = unknown>(statements: DatabaseStatement[]): Promise<DatabaseResult<T>[]> {
    const queries = statements.map((statement) => {
      if (!(statement instanceof HttpD1Statement) || statement.database !== this) {
        throw new TypeError("O batch contém uma instrução de outro banco.");
      }
      return { sql: statement.sql, params: statement.params };
    });
    return this.query<T>(queries);
  }

  async query<T>(queries: D1ApiQuery[]): Promise<DatabaseResult<T>[]> {
    const body =
      queries.length === 1
        ? queries[0]
        : {
            batch: queries,
          };
    const response = await this.fetcher(this.endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.config.gatewayToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let payload: D1ApiResponse;
    try {
      payload = (await response.json()) as D1ApiResponse;
    } catch {
      throw new Error(`O D1 respondeu com HTTP ${response.status} e conteúdo inválido.`);
    }

    if (!response.ok || !payload.success || !payload.result) {
      const detail = payload.errors
        ?.map((error) => error.message)
        .filter(Boolean)
        .join("; ");
      throw new Error(detail || `Falha ao consultar o D1 (HTTP ${response.status}).`);
    }

    return payload.result.map((result) => {
      if (!result.success) {
        throw new Error("O D1 não conseguiu executar uma das consultas.");
      }
      return {
        success: true,
        results: (result.results ?? []) as T[],
        meta: result.meta ?? {},
      };
    });
  }
}

export function createHttpD1Database(config: D1HttpConfig): Database {
  return new HttpD1Database(config);
}
