import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AlertTriangle, CheckCircle2, PackageCheck, RotateCcw } from "lucide-react";
import { InsightCard } from "@/components/insight-card";
import { ClientOnly } from "@/components/client-only";
import { coverageDays, inventoryAlerts } from "@/lib/analytics";
import { formatDec, formatInt, formatPct } from "@/lib/format";
import type { KardexProduct } from "@/lib/types";
import { cn } from "@/lib/utils";

export function InventoryPanel({ kardex }: { kardex: KardexProduct[] }) {
  const [sku, setSku] = useState<string>(kardex[0]?.sku ?? "");
  const active = kardex.find((p) => p.sku === sku) ?? kardex[0];
  const alerts = inventoryAlerts(kardex);
  const total = kardex.reduce((a, p) => a + p.current, 0);
  const donut = kardex.map((p) => ({ name: p.name, value: p.current, color: p.color }));
  const axisMax = Math.max(400, ...kardex.map((p) => Math.max(p.current, p.capacity)));

  return (
    <div className="stagger-in space-y-5">
      {alerts.length > 0 ? (
        <InsightCard tone="alert" icon={<AlertTriangle className="size-5" />} kicker="Insight operativo">
          Riesgo de quiebre en {alerts.map((p) => p.name).join(", ")}. Emitir orden de compra
          prioritaria hoy.
        </InsightCard>
      ) : (
        <InsightCard tone="ok" icon={<CheckCircle2 className="size-5" />} kicker="Insight operativo">
          Stock saludable. Ningún SKU está en o bajo el punto de reorden (50 / 60 uds). Gloss
          Berry Cute es el más rotativo: planificar reposición preventiva.
        </InsightCard>
      )}

      <section className="grid gap-4 lg:grid-cols-5">
        <article className="panel-card p-5 sm:p-6 lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold">Distribución de stock</h2>
          <p className="mt-1 text-sm text-muted">Saldo final al 31 de marzo 2026</p>
          <div className="relative mx-auto mt-2 h-[240px] w-full max-w-[280px]">
            <ClientOnly>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={donut}
                  dataKey="value"
                  innerRadius="65%"
                  outerRadius="92%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {donut.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `${formatInt(Number(v ?? 0))} uds`}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid rgba(74,21,75,0.1)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            </ClientOnly>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[11px] tracking-[0.14em] text-muted uppercase">Total</p>
              <p className="font-display text-3xl font-semibold text-ink tabular-nums">{formatInt(total)}</p>
              <p className="text-xs text-muted">unidades</p>
            </div>
          </div>
          <ul className="mt-1 space-y-2">
            {kardex.map((p) => (
              <li key={p.sku} className="flex items-center gap-2 text-sm">
                <span className="size-2.5 rounded-full" style={{ background: p.color }} />
                <span className="text-muted">{p.name}</span>
                <span className="ml-auto font-semibold tabular-nums">
                  {formatInt(p.current)} · {formatPct((p.current / total) * 100, 0)}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel-card p-5 sm:p-6 lg:col-span-3">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">Monitor de reorden</h2>
              <p className="mt-1 text-sm text-muted">
                Capacidad de fondo · líneas de reorden 50 y 60 · color según umbral
              </p>
            </div>
            <PackageCheck className="size-4 text-rose" />
          </div>
          <div className="space-y-8 pt-2">
            {kardex.map((p) => (
              <ReorderBar key={p.sku} product={p} axisMax={axisMax} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-6 rounded-sm bg-warm" /> Capacidad
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-6 rounded-sm bg-mint" /> Sobre reorden
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-6 rounded-sm bg-coral" /> Zona crítica
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-3 w-px bg-ink" /> Reorden 50 / 60
            </span>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {kardex.map((p) => {
          const days = coverageDays(p);
          const critical = p.current <= p.reorder;
          return (
            <article key={p.sku} className="panel-card p-5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{p.sku}</p>
              <h3 className="mt-1 font-display text-xl font-semibold">{p.name}</h3>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted">Stock actual</dt>
                  <dd className={cn("text-lg font-semibold tabular-nums", critical ? "text-coral" : "text-rose")}>
                    {formatInt(p.current)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Rotación Q1</dt>
                  <dd className="flex items-center gap-1 text-lg font-semibold tabular-nums">
                    <RotateCcw className="size-3.5 text-muted" />
                    {formatDec(p.rotation)}x
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Inv. promedio</dt>
                  <dd className="font-medium tabular-nums">{formatDec(p.avgInventory)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Cobertura</dt>
                  <dd className="font-medium tabular-nums">{formatDec(days)} días</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Salidas</dt>
                  <dd className="font-medium tabular-nums">{formatInt(p.totalOut)} uds</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Reorden / cap.</dt>
                  <dd className="font-medium tabular-nums">
                    {p.reorder} / {p.capacity}
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </section>

      <section className="panel-card overflow-hidden">
        <header className="flex flex-wrap items-end justify-between gap-3 px-5 pt-5 sm:px-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">Kardex semanal</h2>
            <p className="mt-1 text-sm text-muted">Movimientos reales de compras y ventas · Q1</p>
          </div>
          <div className="flex flex-wrap gap-1 rounded-full bg-warm p-1">
            {kardex.map((p) => (
              <button
                key={p.sku}
                type="button"
                onClick={() => setSku(p.sku)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium",
                  sku === p.sku ? "bg-card text-ink shadow-sm" : "text-muted",
                )}
              >
                {p.name.replace(" Berry", "").replace(" Secret", "")}
              </button>
            ))}
          </div>
        </header>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-y border-warm text-[11px] tracking-[0.12em] text-muted uppercase">
              <tr>
                <th className="px-5 py-2.5 font-semibold sm:px-6">Periodo</th>
                <th className="px-3 py-2.5 font-semibold">Tipo</th>
                <th className="px-3 py-2.5 text-right font-semibold">Ingresos</th>
                <th className="px-3 py-2.5 text-right font-semibold">Salidas</th>
                <th className="px-5 py-2.5 text-right font-semibold sm:px-6">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {active?.movements.map((m, i) => (
                <tr key={`${active.sku}-${i}`} className="border-b border-warm/80 last:border-0">
                  <td className="px-5 py-2.5 sm:px-6">{m.period ?? "—"}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        m.type === "Compras"
                          ? "bg-lavender text-rose"
                          : m.type === "Saldo Inicial"
                            ? "bg-warm text-muted"
                            : "bg-warm text-ink",
                      )}
                    >
                      {m.type}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{m.in ?? "—"}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{m.out ?? "—"}</td>
                  <td className="px-5 py-2.5 text-right font-semibold tabular-nums sm:px-6">
                    {m.end ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ReorderBar({ product, axisMax }: { product: KardexProduct; axisMax: number }) {
  const critical = product.current <= product.reorder;
  const stockPct = Math.min(100, (product.current / axisMax) * 100);
  const capPct = Math.min(100, (product.capacity / axisMax) * 100);
  const line50 = (50 / axisMax) * 100;
  const line60 = (60 / axisMax) * 100;

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold">{product.name}</p>
        <p className="text-xs text-muted">
          {critical ? (
            <span className="font-semibold tracking-wide text-coral uppercase">Alerta</span>
          ) : (
            <span className="text-mint">Sobre reorden</span>
          )}
          <span className="mx-2 text-warm">·</span>
          <span className="font-semibold tabular-nums text-ink">{formatInt(product.current)} uds</span>
        </p>
      </div>
      <div className="relative mt-5 h-8">
        <div
          className="absolute inset-y-0 left-0 rounded-md bg-warm"
          style={{ width: `${capPct}%` }}
        />
        <div
          className={cn("absolute inset-y-0 left-0 rounded-md", critical ? "bg-coral" : "bg-mint")}
          style={{ width: `${stockPct}%` }}
        />
        <span
          className="absolute top-[-6px] h-10 w-px bg-ink"
          style={{ left: `${line50}%` }}
          title="Reorden 50"
        />
        <span
          className="absolute top-[-6px] h-10 w-px bg-ink/70"
          style={{ left: `${line60}%` }}
          title="Reorden 60"
        />
        <span
          className="absolute -top-4 text-[10px] font-medium whitespace-nowrap text-ink"
          style={{ left: `${(line50 + line60) / 2}%`, transform: "translateX(-50%)" }}
        >
          50 / 60
        </span>
      </div>
    </div>
  );
}
