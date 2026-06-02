import { useMemo, useState, useEffect } from "react";
import type { Deadline, GoalStatus } from "@/types";
import { deadlines as initialDeadlines } from "@/data/goals";
import { GoalCard } from "../ui-custom/GoalCard";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Target, Plus } from "lucide-react";

export function GoalsSection() {
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines);
  const [filterStatus, setFilterStatus] = useState<GoalStatus | "Todos">("Todos");

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("deadlines");
    if (stored) {
      try {
        setDeadlines(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar deadlines do localStorage", e);
      }
    }
  }, []);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const total = deadlines.length;
    const inProgress = deadlines.filter((d) => d.status === "Em progresso").length;
    const completed = deadlines.filter((d) => d.status === "Concluído").length;
    return { total, inProgress, completed };
  }, [deadlines]);

  // Filtrar e ordenar
  const filteredDeadlines = useMemo(() => {
    let result = deadlines;

    if (filterStatus !== "Todos") {
      result = result.filter((d) => d.status === filterStatus);
    }

    // Ordenar por data mais próxima primeiro
    return result.sort((a, b) => {
      const dateA = new Date(a.dataPrazo).getTime();
      const dateB = new Date(b.dataPrazo).getTime();
      return dateA - dateB;
    });
  }, [deadlines, filterStatus]);

  const handleUpdateGoal = (updated: Deadline) => {
    const stored = localStorage.getItem("deadlines");
    const goals: Deadline[] = stored ? JSON.parse(stored) : [];
    const index = goals.findIndex((g) => g.id === updated.id);
    if (index >= 0) {
      goals[index] = updated;
    } else {
      goals.push(updated);
    }
    localStorage.setItem("deadlines", JSON.stringify(goals));
    setDeadlines(goals);
  };

  const handleAddGoal = () => {
    const newGoal: Deadline = {
      id: Date.now().toString(),
      categoria: "Backend",
      titulo: "Nova meta",
      descricao: "",
      dataPrazo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      prioridade: "Média",
      status: "Planejado",
      icon: "Target",
      progresso: 0,
    };
    const stored = localStorage.getItem("deadlines");
    const goals: Deadline[] = stored ? JSON.parse(stored) : [];
    goals.push(newGoal);
    localStorage.setItem("deadlines", JSON.stringify(goals));
    setDeadlines(goals);
  };

  return (
    <section className="py-10">
      {/* Botão Adicionar Nova Meta */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleAddGoal}
          className="px-5 py-2.5 rounded-full gradient-primary text-white font-medium shadow-soft hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Adicionar Nova Meta
        </button>
      </div>
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="glass rounded-3xl border border-border p-6 flex items-center gap-4">
          <div className="rounded-lg p-3 bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Metas</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
        </Card>

        <Card className="glass rounded-3xl border border-border p-6 flex items-center gap-4">
          <div className="rounded-lg p-3 bg-accent/10">
            <Clock className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Em Progresso</p>
            <p className="text-3xl font-bold">{stats.inProgress}</p>
          </div>
        </Card>

        <Card className="glass rounded-3xl border border-border p-6 flex items-center gap-4">
          <div className="rounded-lg p-3 bg-success/10">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Concluídas</p>
            <p className="text-3xl font-bold">{stats.completed}</p>
          </div>
        </Card>
      </div>

      {/* Abas de Filtro */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(["Todos", "Planejado", "Em progresso", "Concluído"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition whitespace-nowrap ${
              filterStatus === status
                ? "gradient-primary text-white shadow-soft"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Grid de Cards */}
      {filteredDeadlines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeadlines.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={handleUpdateGoal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma meta encontrada para este filtro.</p>
        </div>
      )}
    </section>
  );
}
