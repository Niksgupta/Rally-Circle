import type { Sport } from "@pp/shared";
import { cn } from "../lib/cn";

const LABELS: Record<Sport, string> = {
  badminton: "🏸 Badminton",
  football: "⚽ Football",
  cricket: "🏏 Cricket",
  tennis: "🎾 Tennis",
  "table-tennis": "🏓 Table Tennis",
  volleyball: "🏐 Volleyball",
  running: "🏃 Running",
  yoga: "🧘 Yoga",
  other: "🎽 Sport",
};

export function SportBadge({ sport, className }: { sport: Sport; className?: string }) {
  return <span className={cn("chip bg-brand-100 text-brand-800", className)}>{LABELS[sport]}</span>;
}
