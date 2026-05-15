import type { Status } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  "domino": "bg-success/15 text-success border-success/30",
  "estudando": "bg-warning/20 text-foreground border-warning/40",
  "preciso-estudar": "bg-destructive/15 text-destructive border-destructive/30",
};
const labels: Record<Status, string> = {
  "domino": "Já pratiquei",
  "estudando": "Estudando",
  "preciso-estudar": "Preciso estudar",
};

export function TechnologyBadge({ name, status }: { name: string; status: Status }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-transform hover:-translate-y-0.5", styles[status])}>
      <span className={cn("h-2 w-2 rounded-full",
        status === "domino" && "bg-success",
        status === "estudando" && "bg-warning",
        status === "preciso-estudar" && "bg-destructive",
      )} />
      {name}
      <span className="sr-only">{labels[status]}</span>
    </span>
  );
}
