import type { Deadline } from "@/types";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GoalModal } from "./GoalModal";
import { Progress } from "@/components/ui/progress";
import { parseDateOnly } from "@/lib/date";

interface GoalCardProps {
  goal: Deadline;
  editable?: boolean;
  onSave: (updated: Deadline) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export function GoalCard({ goal, editable = false, onSave, onDelete }: GoalCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    setToday(current);
  }, []);

  const { daysRemaining, percentComplete, isOverdue } = useMemo(() => {
    if (!today) {
      return {
        daysRemaining: null,
        percentComplete: goal.progresso ?? (goal.status === "Concluído" ? 100 : 0),
        isOverdue: false,
      };
    }

    const targetDate = parseDateOnly(goal.dataPrazo);

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysRemain = Math.ceil((targetDate.getTime() - today.getTime()) / msPerDay);

    // Se tem progresso manual, usar isso
    if (goal.progresso !== undefined) {
      return {
        daysRemaining: daysRemain,
        percentComplete: Math.min(Math.max(goal.progresso, 0), 100),
        isOverdue: daysRemain < 0,
      };
    }

    // Se concluído, mostrar 100%
    if (goal.status === "Concluído") {
      return { daysRemaining: 0, percentComplete: 100, isOverdue: false };
    }

    // Calcular progresso automaticamente baseado em tempo decorrido
    const createdDate = parseDateOnly(goal.dataPrazo);
    createdDate.setDate(createdDate.getDate() - 60); // Assume criada há 60 dias antes do prazo

    const totalDays = Math.ceil((targetDate.getTime() - createdDate.getTime()) / msPerDay);
    const elapsedDays = Math.ceil((today.getTime() - createdDate.getTime()) / msPerDay);
    const percent = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);

    return {
      daysRemaining: daysRemain,
      percentComplete: Math.round(percent),
      isOverdue: daysRemain < 0,
    };
  }, [goal, today]);

  const priorityConfig = {
    Alta: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      badge: "bg-destructive/20 text-destructive",
    },
    Média: { bg: "bg-warning/10", text: "text-warning", badge: "bg-warning/20 text-warning" },
    Baixa: { bg: "bg-success/10", text: "text-success", badge: "bg-success/20 text-success" },
  };

  const statusConfig = {
    Planejado: { badge: "bg-primary/20 text-primary" },
    "Em progresso": { badge: "bg-accent/20 text-accent" },
    Concluído: { badge: "bg-success/20 text-success" },
  };

  const priority = priorityConfig[goal.prioridade];
  const status = statusConfig[goal.status];
  const IconComponent =
    (Icons as unknown as Record<string, LucideIcon>)[goal.icon || "Target"] ?? Icons.Target;

  return (
    <>
      <article
        onClick={editable ? () => setIsOpen(true) : undefined}
        className={`group glass rounded-3xl border border-border p-5 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 animate-fade-in ${editable ? "cursor-pointer" : ""}`}
      >
        {/* Header com ícone e titulo */}
        <div className="flex items-start gap-3 mb-3">
          {IconComponent && (
            <div className={`rounded-lg p-2 ${priority.bg} flex-shrink-0`}>
              <IconComponent className={`h-5 w-5 ${priority.text}`} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition">
              {goal.titulo}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{goal.categoria}</p>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{goal.descricao}</p>

        {/* Barra de progresso */}
        <div className="mb-3">
          <Progress value={percentComplete} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{percentComplete}% concluído</p>
        </div>

        {/* Badges e info de tempo */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${priority.badge}`}>
              {goal.prioridade}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.badge}`}>
              {goal.status}
            </span>
          </div>
        </div>

        {/* Informação de dias restantes */}
        {goal.status !== "Concluído" && (
          <div
            className={`text-xs font-medium ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}
          >
            {daysRemaining === null ? (
              <span>Calculando prazo...</span>
            ) : isOverdue ? (
              <span>⚠️ Prazo vencido há {Math.abs(daysRemaining)} dias</span>
            ) : daysRemaining === 0 ? (
              <span>🔥 Prazo é hoje!</span>
            ) : (
              <span>{daysRemaining} dias restantes</span>
            )}
          </div>
        )}

        {goal.status === "Concluído" && (
          <div className="text-xs font-medium text-success">✅ Meta concluída</div>
        )}
      </article>

      {/* Modal de edição */}
      {editable && isOpen && (
        <GoalModal
          isOpen={isOpen}
          goal={goal}
          onClose={() => setIsOpen(false)}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
