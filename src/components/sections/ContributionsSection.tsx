import { useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Contribution } from "@/types";
import { ContributionCard } from "@/components/ui-custom/ContributionCard";
import { ContributionModal } from "@/components/ui-custom/ContributionModal";
import { FilterTabs } from "@/components/ui-custom/FilterTabs";
import { FilterSelect } from "@/components/ui-custom/FilterSelect";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { deleteContribution, upsertContribution } from "@/api/contributions";

const FILTERS = [
  "Todas",
  "Backend",
  "Cloud",
  "Infra",
  "Estudos",
  "Projetos",
  "Comunidade",
] as const;

const STATUS_OPTIONS = ["Todos", "Em andamento", "Concluído", "Planejado"] as const;
const SORT_OPTIONS = ["Mais recentes", "Mais antigas", "Título (A-Z)"] as const;

function newContributionTemplate(): Contribution {
  return {
    id: crypto.randomUUID(),
    icon: "Sparkles",
    title: "",
    category: "Projetos",
    description: "",
    technologies: [],
    impacts: [],
    status: "Em andamento",
  };
}

export function ContributionsSection({ contributions }: { contributions: Contribution[] }) {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [filter, setFilter] = useState<string>("Todas");
  const [filterStatus, setFilterStatus] = useState<Contribution["status"] | "Todos">("Todos");
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]>("Mais recentes");
  const [editing, setEditing] = useState<{ item: Contribution; isNew: boolean } | null>(null);

  const items = useMemo(() => {
    let result = contributions;
    if (filter !== "Todas") {
      result = result.filter((c) => c.category === filter);
    }
    if (filterStatus !== "Todos") {
      result = result.filter((c) => c.status === filterStatus);
    }
    // A lista vem ordenada da mais antiga para a mais recente (sort_order asc)
    if (sortBy === "Mais recentes") return [...result].reverse();
    if (sortBy === "Título (A-Z)")
      return [...result].sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    return result;
  }, [contributions, filter, filterStatus, sortBy]);

  const handleSave = async (item: Contribution) => {
    try {
      await upsertContribution({ data: item });
      await router.invalidate();
      toast.success("Contribuição salva com sucesso!");
      return true;
    } catch {
      toast.error("Erro ao salvar a contribuição");
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContribution({ data: { id } });
      await router.invalidate();
      toast.success("Contribuição deletada com sucesso!");
      return true;
    } catch {
      toast.error("Erro ao deletar a contribuição");
      return false;
    }
  };

  return (
    <div>
      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setEditing({ item: newContributionTemplate(), isNew: true })}
            className="px-5 py-2.5 rounded-full gradient-primary text-white font-medium shadow-soft hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Adicionar Contribuição
          </button>
        </div>
      )}
      <div className="mb-4">
        <FilterTabs options={[...FILTERS]} value={filter} onChange={setFilter} />
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <FilterSelect
          label="Ordenar por"
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={(v) => setSortBy(v as (typeof SORT_OPTIONS)[number])}
        />
        <FilterSelect
          label="Status"
          options={STATUS_OPTIONS}
          value={filterStatus}
          onChange={(v) => setFilterStatus(v as Contribution["status"] | "Todos")}
        />
        {(filter !== "Todas" || filterStatus !== "Todos" || sortBy !== "Mais recentes") && (
          <button
            onClick={() => {
              setFilter("Todas");
              setFilterStatus("Todos");
              setSortBy("Mais recentes");
            }}
            className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Limpar filtros
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          Nenhuma contribuição encontrada para esses filtros.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c) => (
            <ContributionCard
              key={c.id}
              item={c}
              onEdit={isAdmin ? () => setEditing({ item: c, isNew: false }) : undefined}
            />
          ))}
        </div>
      )}
      {editing && (
        <ContributionModal
          isOpen
          contribution={editing.item}
          isNew={editing.isNew}
          onClose={() => setEditing(null)}
          onSave={handleSave}
          onDelete={editing.isNew ? undefined : handleDelete}
        />
      )}
    </div>
  );
}
