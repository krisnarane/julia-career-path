import { useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import type { RoadmapArea } from "@/types";
import { TechnologyBadge } from "@/components/ui-custom/TechnologyBadge";
import { RoadmapAreaModal } from "@/components/ui-custom/RoadmapAreaModal";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { deleteRoadmapArea, upsertRoadmapArea } from "@/api/roadmap";

function newAreaTemplate(): RoadmapArea {
  return { id: crypto.randomUUID(), area: "", icon: "Code", techs: [] };
}

export function RoadmapSection({ roadmap }: { roadmap: RoadmapArea[] }) {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [editing, setEditing] = useState<{ item: RoadmapArea; isNew: boolean } | null>(null);

  const summary = useMemo(() => {
    const all = roadmap.flatMap((a) => a.techs);
    return {
      domino: all.filter((t) => t.status === "domino").length,
      estudando: all.filter((t) => t.status === "estudando").length,
      preciso: all.filter((t) => t.status === "preciso-estudar").length,
      total: all.length,
    };
  }, [roadmap]);

  const handleSave = async (area: RoadmapArea) => {
    try {
      await upsertRoadmapArea({ data: area });
      await router.invalidate();
      toast.success("Área salva com sucesso!");
      return true;
    } catch {
      toast.error("Erro ao salvar a área");
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRoadmapArea({ data: { id } });
      await router.invalidate();
      toast.success("Área deletada com sucesso!");
      return true;
    } catch {
      toast.error("Erro ao deletar a área");
      return false;
    }
  };

  return (
    <div className="space-y-10">
      {isAdmin && (
        <div className="flex justify-end">
          <button
            onClick={() => setEditing({ item: newAreaTemplate(), isNew: true })}
            className="px-5 py-2.5 rounded-full gradient-primary text-white font-medium shadow-soft hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Icons.Plus className="h-5 w-5" />
            Adicionar Área
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          color="success"
          label="Tecnologias que domino"
          value={summary.domino}
          total={summary.total}
        />
        <SummaryCard
          color="warning"
          label="Estudando"
          value={summary.estudando}
          total={summary.total}
        />
        <SummaryCard
          color="destructive"
          label="Preciso estudar"
          value={summary.preciso}
          total={summary.total}
        />
      </div>

      <div className="space-y-6">
        {roadmap.map((area) => {
          const Icon = (Icons as unknown as Record<string, LucideIcon>)[area.icon] ?? Icons.Code;
          return (
            <div
              key={area.id}
              className="glass rounded-3xl border border-border p-6 animate-fade-in"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl gradient-primary text-white flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold flex-1">{area.area}</h3>
                {isAdmin && (
                  <button
                    onClick={() => setEditing({ item: area, isNew: false })}
                    className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/10 transition"
                    title="Editar área"
                    aria-label="Editar área"
                  >
                    <Icons.Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {area.techs.map((t) => (
                  <TechnologyBadge key={t.name} name={t.name} status={t.status} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <RoadmapAreaModal
          isOpen
          area={editing.item}
          isNew={editing.isNew}
          onClose={() => setEditing(null)}
          onSave={handleSave}
          onDelete={editing.isNew ? undefined : handleDelete}
        />
      )}
    </div>
  );
}

function SummaryCard({
  color,
  label,
  value,
  total,
}: {
  color: "success" | "warning" | "destructive";
  label: string;
  value: number;
  total: number;
}) {
  const map = {
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/20 text-foreground border-warning/40",
    destructive: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <div className={`rounded-2xl border p-5 ${map[color]}`}>
      <p className="text-xs uppercase tracking-wider opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-bold">
        {value}
        <span className="text-sm font-medium opacity-70">/{total}</span>
      </p>
    </div>
  );
}
