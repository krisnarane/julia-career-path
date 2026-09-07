import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

export function FilterSelect({ label, options, value, onChange, className }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={label}
        className={cn(
          "h-auto w-auto min-w-[9.5rem] gap-2 rounded-full border-border bg-card px-4 py-2 text-sm font-medium shadow-none transition-all hover:border-primary hover:text-foreground",
          className,
        )}
      >
        <span className="text-muted-foreground">{label}:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-2xl">
        {options.map((o) => (
          <SelectItem key={o} value={o} className="rounded-xl text-sm">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
