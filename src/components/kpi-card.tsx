import type { ReactNode } from "react";

export function KpiCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
}) {
  return (
    <article className="kpi-float relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{label}</p>
        <span className="grid size-9 place-items-center rounded-sm bg-lavender text-rose">{icon}</span>
      </div>
      <p className="mt-3 font-display text-[1.85rem] leading-none font-semibold tracking-tight text-rose tabular-nums sm:text-[2.15rem]">
        {value}
      </p>
      <p className="mt-2.5 text-xs text-muted">{hint}</p>
    </article>
  );
}
