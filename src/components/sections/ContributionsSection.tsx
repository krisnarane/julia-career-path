import { useMemo, useState } from "react";
import { contributions } from "@/data/contributions";
import { ContributionCard } from "@/components/ui-custom/ContributionCard";
import { FilterTabs } from "@/components/ui-custom/FilterTabs";

const FILTERS = ["Todas", "Backend", "Cloud", "Infra", "Estudos", "Projetos", "Comunidade"] as const;

export function ContributionsSection() {
  const [filter, setFilter] = useState<string>("Todas");
  const items = useMemo(
    () => filter === "Todas" ? contributions : contributions.filter((c) => c.category === filter),
    [filter]
  );
  return (
    <div>
      <div className="mb-8"><FilterTabs options={[...FILTERS]} value={filter} onChange={setFilter} /></div>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Nenhuma contribuição nessa categoria ainda.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c) => <ContributionCard key={c.id} item={c} />)}
        </div>
      )}
    </div>
  );
}
