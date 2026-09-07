import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Deadline } from "@/types";
import { getBindings } from "./bindings";
import { adminMiddleware } from "./auth";

const goalSchema = z.object({
  id: z.string().min(1),
  categoria: z.enum(["Backend", "Cloud", "Data Engineering", "DevOps", "Estudos"]),
  titulo: z.string().trim().min(1, "Título é obrigatório"),
  descricao: z.string().default(""),
  dataPrazo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data de prazo é obrigatória"),
  prioridade: z.enum(["Alta", "Média", "Baixa"]),
  status: z.enum(["Planejado", "Em progresso", "Concluído"]),
  icon: z.string().optional(),
  progresso: z.number().int().min(0).max(100).optional(),
});

interface GoalRow {
  id: string;
  categoria: string;
  titulo: string;
  descricao: string;
  data_prazo: string;
  prioridade: string;
  status: string;
  icon: string | null;
  progresso: number | null;
  created_at: string;
}

function rowToDeadline(r: GoalRow): Deadline {
  return {
    id: r.id,
    categoria: r.categoria as Deadline["categoria"],
    titulo: r.titulo,
    descricao: r.descricao,
    dataPrazo: r.data_prazo,
    prioridade: r.prioridade as Deadline["prioridade"],
    status: r.status as Deadline["status"],
    icon: r.icon ?? undefined,
    progresso: r.progresso ?? undefined,
    createdAt: r.created_at,
  };
}

export const listGoals = createServerFn({ method: "GET" }).handler(
  async (): Promise<Deadline[]> => {
    const { DB } = await getBindings();
    const { results } = await DB.prepare(
      "SELECT * FROM goals ORDER BY data_prazo ASC",
    ).all<GoalRow>();
    return results.map(rowToDeadline);
  },
);

export const upsertGoal = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(goalSchema)
  .handler(async ({ data }) => {
    const { DB } = await getBindings();
    await DB.prepare(
      `INSERT INTO goals (id, categoria, titulo, descricao, data_prazo, prioridade, status, icon, progresso)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
       ON CONFLICT(id) DO UPDATE SET
         categoria = ?2, titulo = ?3, descricao = ?4, data_prazo = ?5,
         prioridade = ?6, status = ?7, icon = ?8, progresso = ?9,
         updated_at = datetime('now')`,
    )
      .bind(
        data.id,
        data.categoria,
        data.titulo,
        data.descricao,
        data.dataPrazo,
        data.prioridade,
        data.status,
        data.icon ?? null,
        data.progresso ?? null,
      )
      .run();
    return { ok: true };
  });

export const deleteGoal = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = await getBindings();
    await DB.prepare("DELETE FROM goals WHERE id = ?1").bind(data.id).run();
    return { ok: true };
  });
