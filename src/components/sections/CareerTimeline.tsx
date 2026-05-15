import { careerSteps, goals } from "@/data/career";
import { CheckCircle2, Circle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export function CareerTimeline() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ol className="relative border-l-2 border-border ml-3 space-y-6">
          {careerSteps.map((s) => (
            <li key={s.id} className="ml-6 animate-fade-in">
              <span className={cn(
                "absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-background",
                s.current ? "border-primary text-primary animate-pulse-soft" : "border-border text-muted-foreground"
              )}>
                {s.current ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </span>
              <div className={cn(
                "rounded-2xl border p-5 glass transition",
                s.current ? "border-primary shadow-soft" : "border-border hover:border-primary/50"
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">Etapa {s.id}</span>
                  {s.current && <span className="text-xs px-2 py-0.5 rounded-full gradient-primary text-white">Atual</span>}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">Foco: {s.focus}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <aside>
        <div className="glass rounded-3xl border border-border p-6 sticky top-20">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary-deep" />
            <h3 className="font-semibold">Metas em andamento</h3>
          </div>
          <ul className="space-y-2">
            {goals.map((g) => (
              <li key={g.title} className="text-sm flex gap-2">
                <span className="text-primary mt-1">◆</span>{g.title}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
