import { useMemo } from "react";
import { roadmap } from "@/data/roadmap";
import { TechnologyBadge } from "@/components/ui-custom/TechnologyBadge";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function RoadmapSection() {
  const summary = useMemo(() => {
    const all = roadmap.flatMap((a) => a.techs);
    return {
      domino: all.filter((t) => t.status === "domino").length,
      estudando: all.filter((t) => t.status === "estudando").length,
      preciso: all.filter((t) => t.status === "preciso-estudar").length,
      total: all.length,
    };
  }, []);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard color="success" label="Tecnologias que domino" value={summary.domino} total={summary.total} />
        <SummaryCard color="warning" label="Estudando" value={summary.estudando} total={summary.total} />
        <SummaryCard color="destructive" label="Preciso estudar" value={summary.preciso} total={summary.total} />
      </div>

      <div className="space-y-6">
        {roadmap.map((area) => {
          const Icon = ((Icons as unknown as Record<string, LucideIcon>)[area.icon]) ?? Icons.Code;
          return (
            <div key={area.area} className="glass rounded-3xl border border-border p-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl gradient-primary text-white flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                <h3 className="text-xl font-semibold">{area.area}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {area.techs.map((t) => <TechnologyBadge key={t.name} name={t.name} status={t.status} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({ color, label, value, total }: { color: "success" | "warning" | "destructive"; label: string; value: number; total: number }) {
  const map = {
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/20 text-foreground border-warning/40",
    destructive: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <div className={`rounded-2xl border p-5 ${map[color]}`}>
      <p className="text-xs uppercase tracking-wider opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}<span className="text-sm font-medium opacity-70">/{total}</span></p>
    </div>
  );
}
