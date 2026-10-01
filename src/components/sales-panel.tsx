import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lightbulb,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import { InsightCard } from "@/components/insight-card";
import { KpiCard } from "@/components/kpi-card";
import { MoneyTooltip } from "@/components/charts/chart-tooltip";
import { ClientOnly } from "@/components/client-only";
import { computeSalesStats, filterSales } from "@/lib/analytics";
import { formatDateTime, formatInt, formatPct, formatSoles, formatUsd } from "@/lib/format";
import { ADVISOR_LABEL, TC_USD, type Filters, type Sale } from "@/lib/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

export function SalesPanel({ sales, filters }: { sales: Sale[]; filters: Filters }) {
  const rows = useMemo(() => filterSales(sales, filters), [sales, filters]);
  const stats = useMemo(() => computeSalesStats(rows), [rows]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<"dt" | "totalS">("dt");

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => (sort === "dt" ? b.dt.localeCompare(a.dt) : b.totalS - a.totalS));
    return copy;
  }, [rows, sort]);

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const slice = sorted.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const star = stats.starProduct ?? "Labial Berry Chic";

  return (
    <div className="stagger-in space-y-5">
      <InsightCard tone="brand" icon={<Lightbulb className="size-5" />} kicker="Insight estratégico">
        El producto estrella es {star} representando el {formatPct(stats.starPct)} de los
        ingresos. Se sugiere inyectar pauta digital para maximizar el margen bruto.
      </InsightCard>

      <section className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Flujo de caja total"
          value={formatSoles(stats.totalS)}
          hint="Soles · tickets del recorte activo"
          icon={<Wallet className="size-4" />}
        />
        <KpiCard
          label="Ingreso neto"
          value={formatUsd(stats.netUsd)}
          hint={`USD · TC ${TC_USD} · sin IGV`}
          icon={<Banknote className="size-4" />}
        />
        <KpiCard
          label="Unidades vendidas"
          value={formatInt(stats.units)}
          hint={`${formatInt(stats.tickets)} tickets · ${formatInt(stats.clients)} clientas`}
          icon={<Store className="size-4" />}
        />
      </section>

      <section className="panel-card p-5 sm:p-6">
        <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Evolución trimestral</h2>
            <p className="mt-1 text-sm text-muted">Ingresos brutos en soles por producto · Q1 2026</p>
          </div>
          <ul className="flex flex-wrap gap-3 text-xs font-medium text-muted">
            <li className="flex items-center gap-1.5">
              <i className="size-2.5 rounded-full bg-rose" /> Labial
            </li>
            <li className="flex items-center gap-1.5">
              <i className="size-2.5 rounded-full bg-blush" /> Rubor
            </li>
            <li className="flex items-center gap-1.5">
              <i className="size-2.5 rounded-full bg-petal" /> Gloss
            </li>
          </ul>
        </header>
        <div className="h-[280px] w-full sm:h-[320px]">
          <ClientOnly>
            <ResponsiveContainer>
            <BarChart data={stats.monthly} barGap={6} barCategoryGap="28%">
              <CartesianGrid stroke="#F2EEF0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#7A6B73", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#7A6B73", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
              />
              <Tooltip content={<MoneyTooltip />} cursor={{ fill: "rgba(216,0,95,0.04)" }} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: "#7A6B73", paddingTop: 12 }}
              />
              <Bar dataKey="Labial" name="Labial Berry Chic" fill="#D8005F" radius={[6, 6, 0, 0]} maxBarSize={28} />
              <Bar dataKey="Rubor" name="Rubor Secret Berry" fill="#FF66A3" radius={[6, 6, 0, 0]} maxBarSize={28} />
              <Bar dataKey="Gloss" name="Gloss Berry Cute" fill="#FFB3D9" radius={[6, 6, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
          </ClientOnly>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <article className="panel-card p-5 sm:p-6 lg:col-span-2">
          <h3 className="font-display text-xl font-semibold">Mix de canal y pago</h3>
          <p className="mt-1 mb-4 text-sm text-muted">Participación sobre flujo de caja</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="mb-1 text-center text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">
                Canal
              </p>
              <MiniDonut data={stats.byChannel} />
            </div>
            <div>
              <p className="mb-1 text-center text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">
                Pago
              </p>
              <MiniDonut data={stats.byPayment} />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {stats.byPayment.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-xs">
                <span className="size-2 rounded-full" style={{ background: p.color }} />
                <span className="text-muted">{p.name}</span>
                <span className="ml-auto font-semibold tabular-nums text-ink">
                  {formatSoles(p.value)}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card p-5 sm:p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold">Ranking de asesoras</h3>
              <p className="mt-1 text-sm text-muted">Conversión del trimestre filtrado</p>
            </div>
            <Users className="size-4 text-rose" />
          </div>
          <ul className="space-y-3">
            {stats.byAdvisor.map((a, i) => {
              const max = stats.byAdvisor[0]?.totalS || 1;
              return (
                <li key={a.name}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">
                      <span className="mr-2 text-muted tabular-nums">0{i + 1}</span>
                      {a.label}
                    </span>
                    <span className="font-semibold tabular-nums text-rose">{formatSoles(a.totalS)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-warm">
                    <div
                      className="h-full rounded-full bg-rose"
                      style={{ width: `${(a.totalS / max) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    {formatInt(a.tickets)} tickets · {formatInt(a.units)} uds
                  </p>
                </li>
              );
            })}
          </ul>
          {stats.peakHour != null && (
            <p className="mt-5 flex items-center gap-2 rounded-md bg-lavender px-3 py-2 text-xs text-ink">
              <Clock className="size-3.5 text-rose" />
              Pico horario: {String(stats.peakHour).padStart(2, "0")}:00 · {formatSoles(stats.peakHourSoles)}
            </p>
          )}
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <article className="panel-card overflow-hidden lg:col-span-3">
          <header className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-6">
            <div>
              <h3 className="font-display text-xl font-semibold">Libro de ventas</h3>
              <p className="mt-1 text-sm text-muted">{formatInt(sorted.length)} movimientos reales</p>
            </div>
            <div className="flex gap-1 rounded-full bg-warm p-1">
              <button
                type="button"
                onClick={() => setSort("dt")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium",
                  sort === "dt" ? "bg-card text-ink shadow-sm" : "text-muted",
                )}
              >
                Fecha
              </button>
              <button
                type="button"
                onClick={() => setSort("totalS")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium",
                  sort === "totalS" ? "bg-card text-ink shadow-sm" : "text-muted",
                )}
              >
                Monto
              </button>
            </div>
          </header>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-y border-warm text-[11px] tracking-[0.12em] text-muted uppercase">
                <tr>
                  <th className="px-5 py-2.5 font-semibold sm:px-6">ID</th>
                  <th className="px-3 py-2.5 font-semibold">Fecha</th>
                  <th className="px-3 py-2.5 font-semibold">Clienta</th>
                  <th className="px-3 py-2.5 font-semibold">Producto</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Cant.</th>
                  <th className="px-5 py-2.5 text-right font-semibold sm:px-6">Total</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((s) => (
                  <tr key={s.id} className="border-b border-warm/80 last:border-0">
                    <td className="px-5 py-3 font-medium tabular-nums text-rose sm:px-6">{s.id}</td>
                    <td className="px-3 py-3 text-xs text-muted tabular-nums">{formatDateTime(s.dt)}</td>
                    <td className="px-3 py-3">
                      <p className="max-w-[180px] truncate font-medium">{s.client}</p>
                      <p className="text-[11px] text-muted">
                        {s.channel} · {s.pay} · {ADVISOR_LABEL[s.advisor]}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-xs">{s.product}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{s.qty}</td>
                    <td className="px-5 py-3 text-right font-semibold tabular-nums sm:px-6">
                      {formatSoles(s.totalS)}
                    </td>
                  </tr>
                ))}
                {slice.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted">
                      No hay ventas con esos filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <footer className="flex items-center justify-between px-5 py-4 sm:px-6">
            <p className="text-xs text-muted">
              {safePage * PAGE_SIZE + (slice.length ? 1 : 0)}–{safePage * PAGE_SIZE + slice.length} de{" "}
              {formatInt(sorted.length)}
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                className="grid size-9 place-items-center rounded-md bg-warm text-ink disabled:opacity-40"
                disabled={safePage === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                aria-label="Página anterior"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                className="grid size-9 place-items-center rounded-md bg-warm text-ink disabled:opacity-40"
                disabled={safePage >= pages - 1}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Página siguiente"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </footer>
        </article>

        <article className="panel-card p-5 sm:p-6 lg:col-span-2">
          <h3 className="font-display text-xl font-semibold">Clientas recurrentes</h3>
          <p className="mt-1 mb-4 text-sm text-muted">Mayor lifetime value del recorte</p>
          <ol className="space-y-3">
            {stats.topClients.map((c, i) => (
              <li key={c.dni} className="flex items-start gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lavender text-[11px] font-semibold text-rose">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.client}</p>
                  <p className="text-[11px] text-muted">
                    DNI {c.dni} · {c.tickets} compras · {c.units} uds
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-rose">{formatSoles(c.totalS)}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </div>
  );
}

function MiniDonut({ data }: { data: { name: string; value: number; color?: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="h-[140px]">
      <ClientOnly fallback={<div className="h-full animate-pulse rounded-md bg-warm/70" />}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius="62%" outerRadius="88%" paddingAngle={2} stroke="none">
            {data.map((d) => (
              <Cell key={d.name} fill={d.color ?? "#D8005F"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => formatSoles(Number(v ?? 0))}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(74,21,75,0.1)",
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      </ClientOnly>
      <p className="sr-only">Total {formatSoles(total)}</p>
    </div>
  );
}
