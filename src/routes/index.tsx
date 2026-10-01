import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Download,
  Menu,
  Package,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { InventoryPanel } from "@/components/inventory-panel";
import { SalesPanel } from "@/components/sales-panel";
import { SALES, KARDEX } from "@/data/catalog";
import { exportOfflineHtml, exportSalesCsv } from "@/lib/export-offline";
import { filterSales } from "@/lib/analytics";
import {
  ADVISOR_LABEL,
  type Advisor,
  type Channel,
  type Filters,
  type MonthFilter,
  type Panel,
  type Payment,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
});

const EMPTY: Filters = {
  month: "all",
  product: "all",
  channel: "all",
  payment: "all",
  advisor: "all",
  query: "",
};

function Home() {
  const [panel, setPanel] = useState<Panel>("sales");
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const filtered = useMemo(() => filterSales(SALES, filters), [filters]);

  async function onDownload() {
    setBusy(true);
    try {
      await exportOfflineHtml(SALES, KARDEX);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-dvh bg-pearl">
      <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 flex-col border-r border-hair bg-card px-6 py-7 lg:flex">
        <Brand />
        <Nav panel={panel} onChange={setPanel} />
        <p className="mt-auto pt-8 text-[11px] leading-relaxed text-muted">
          Q1 2026 · Perú
          <br />
          713 tickets reales
          <br />
          TC 3.44 · IGV 18%
        </p>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/30"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-[80%] max-w-[300px] flex-col bg-card px-6 py-7 shadow-[var(--shadow-float)]">
            <div className="mb-4 flex justify-end">
              <button type="button" className="grid size-11 place-items-center" onClick={() => setOpen(false)} aria-label="Cerrar">
                <X className="size-5" />
              </button>
            </div>
            <Brand />
            <Nav
              panel={panel}
              onChange={(p) => {
                setPanel(p);
                setOpen(false);
              }}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-hair bg-pearl/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <img
            src="/logo_fresita.png"
            alt=""
            className="h-8 w-auto lg:hidden"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              Fresita Beauty · ERP
            </p>
            <h1 className="font-display truncate text-xl font-semibold sm:text-2xl">
              {panel === "sales" ? "Reporte de ventas" : "Control de inventarios"}
            </h1>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => exportSalesCsv(filtered)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-warm px-4 text-xs font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              CSV
            </button>
            <button
              type="button"
              onClick={onDownload}
              disabled={busy}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-rose px-4 text-xs font-semibold text-card transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-60"
            >
              <Download className="size-3.5" />
              {busy ? "Preparando…" : "Descargar HTML"}
            </button>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto px-4 pt-3 lg:hidden">
          <NavPills panel={panel} onChange={setPanel} />
        </div>

        {panel === "sales" && (
          <FilterBar filters={filters} onChange={setFilters} />
        )}

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {panel === "sales" ? (
            <SalesPanel sales={SALES} filters={filters} />
          ) : (
            <InventoryPanel kardex={KARDEX} />
          )}
        </main>

        <div className="flex gap-2 px-4 pb-6 sm:hidden">
          <button
            type="button"
            onClick={() => exportSalesCsv(filtered)}
            className="h-11 flex-1 rounded-full bg-warm text-xs font-semibold"
          >
            Exportar CSV
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="h-11 flex-1 rounded-full bg-rose text-xs font-semibold text-card"
          >
            Descargar HTML
          </button>
        </div>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="mb-8">
      <img
        src="/logo_fresita.png"
        alt="Fresita Beauty"
        width={200}
        height={88}
        className="h-auto w-[168px] max-w-full"
      />
      <p className="mt-3 text-[11px] tracking-[0.18em] text-muted uppercase">Dirección estratégica · Q1</p>
    </div>
  );
}

function Nav({ panel, onChange }: { panel: Panel; onChange: (p: Panel) => void }) {
  return (
    <nav className="flex flex-col gap-2" aria-label="Módulos">
      <NavBtn active={panel === "sales"} onClick={() => onChange("sales")} icon={<ShoppingBag className="size-4" />}>
        Reporte de Ventas
      </NavBtn>
      <NavBtn active={panel === "inventory"} onClick={() => onChange("inventory")} icon={<Package className="size-4" />}>
        Control de Inventarios
      </NavBtn>
    </nav>
  );
}

function NavPills({ panel, onChange }: { panel: Panel; onChange: (p: Panel) => void }) {
  return (
    <>
      <button
        type="button"
        onClick={() => onChange("sales")}
        className={cn(
          "h-11 shrink-0 rounded-full px-4 text-xs font-semibold",
          panel === "sales" ? "bg-rose text-card" : "bg-card text-ink",
        )}
      >
        Ventas
      </button>
      <button
        type="button"
        onClick={() => onChange("inventory")}
        className={cn(
          "h-11 shrink-0 rounded-full px-4 text-xs font-semibold",
          panel === "inventory" ? "bg-rose text-card" : "bg-card text-ink",
        )}
      >
        Inventarios
      </button>
    </>
  );
}

function NavBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-[background,color,transform] duration-150 ease-out active:scale-[0.96]",
        active ? "bg-lavender text-rose shadow-[var(--shadow-float)]" : "text-ink hover:bg-pearl",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-hair px-4 py-3 sm:px-6 lg:px-8">
      <label className="relative min-w-[180px] flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted" />
        <input
          value={filters.query}
          onChange={(e) => set({ query: e.target.value })}
          placeholder="Buscar clienta, DNI o ticket"
          className="h-11 w-full rounded-full bg-card pr-4 pl-9 text-sm shadow-[var(--shadow-float)] outline-none placeholder:text-muted focus:ring-2 focus:ring-rose/30"
        />
      </label>
      <Select
        value={filters.month}
        onChange={(v) => set({ month: v as MonthFilter })}
        options={[
          ["all", "Trimestre"],
          ["1", "Enero"],
          ["2", "Febrero"],
          ["3", "Marzo"],
        ]}
      />
      <Select
        value={filters.product}
        onChange={(v) => set({ product: v as Filters["product"] })}
        options={[
          ["all", "Producto"],
          ["Labial Berry Chic", "Labial"],
          ["Rubor Secret Berry", "Rubor"],
          ["Gloss Berry Cute", "Gloss"],
        ]}
      />
      <Select
        value={filters.channel}
        onChange={(v) => set({ channel: v as "all" | Channel })}
        options={[
          ["all", "Canal"],
          ["Física", "Física"],
          ["Online", "Online"],
        ]}
      />
      <Select
        value={filters.payment}
        onChange={(v) => set({ payment: v as "all" | Payment })}
        options={[
          ["all", "Pago"],
          ["Yape", "Yape"],
          ["Plin", "Plin"],
          ["Tarjeta", "Tarjeta"],
          ["Efectivo", "Efectivo"],
        ]}
      />
      <Select
        value={filters.advisor}
        onChange={(v) => set({ advisor: v as "all" | Advisor })}
        options={[
          ["all", "Asesora"],
          ...Object.entries(ADVISOR_LABEL).map(([k, v]) => [k, v] as [string, string]),
        ]}
      />
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 rounded-full bg-card px-3 text-xs font-medium text-ink shadow-[var(--shadow-float)] outline-none"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  );
}
