import { useEffect, useState } from "react";
import { parseDateOnly } from "@/lib/date";

function diff(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    days += 30;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
}

export function InternshipTimer({ start, end }: { start: string; end: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(i);
  }, []);
  const startD = parseDateOnly(start);
  const endD = parseDateOnly(end);
  const current = now && now > endD ? endD : now;
  const elapsed = current ? diff(startD, current) : null;
  const remaining = current ? diff(current, endD) : null;

  const Box = ({
    label,
    v,
  }: {
    label: string;
    v: { years: number; months: number; days: number } | null;
  }) => (
    <div className="glass rounded-2xl border border-border p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        {v ? (
          <>
            <span>
              <span className="text-2xl font-bold text-primary-deep">{v.years}</span>
              <span className="text-xs text-muted-foreground ml-1">a</span>
            </span>
            <span>
              <span className="text-2xl font-bold text-primary-deep">{v.months}</span>
              <span className="text-xs text-muted-foreground ml-1">m</span>
            </span>
            <span>
              <span className="text-2xl font-bold text-primary-deep">{v.days}</span>
              <span className="text-xs text-muted-foreground ml-1">d</span>
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold text-primary-deep" aria-label="Calculando">
            —
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Box label="Tempo decorrido" v={elapsed} />
      <Box label="Tempo restante" v={remaining} />
    </div>
  );
}
