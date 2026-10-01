import { formatInt, formatSoles } from "@/lib/format";

type Payload = { name?: string; value?: number; color?: string; dataKey?: string };

export function MoneyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-hair bg-card px-3 py-2.5 shadow-[var(--shadow-float)]">
      <p className="mb-1.5 font-display text-sm font-semibold text-ink">{label}</p>
      <ul className="space-y-1">
        {payload.map((p) => (
          <li key={String(p.dataKey ?? p.name)} className="flex items-center gap-2 text-xs">
            <span className="size-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted">{p.name}</span>
            <span className="ml-auto font-semibold tabular-nums text-rose">
              {formatSoles(Number(p.value ?? 0))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UnitsTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-hair bg-card px-3 py-2.5 shadow-[var(--shadow-float)]">
      <p className="mb-1.5 font-display text-sm font-semibold text-ink">{label}</p>
      {payload.map((p) => (
        <p key={String(p.name)} className="text-xs text-muted">
          <span className="font-semibold tabular-nums text-rose">{formatInt(Number(p.value ?? 0))}</span>
          {" unidades"}
        </p>
      ))}
    </div>
  );
}
