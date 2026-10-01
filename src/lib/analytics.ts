import type {
  Advisor,
  Channel,
  Filters,
  KardexProduct,
  Payment,
  ProductName,
  Sale,
} from "./types";
import { MONTH_LABEL, PRODUCT_COLORS } from "./types";

export function filterSales(sales: Sale[], f: Filters): Sale[] {
  const q = f.query.trim().toLowerCase();
  return sales.filter((s) => {
    if (f.month !== "all" && s.dt.slice(5, 7) !== f.month.padStart(2, "0")) {
      return false;
    }
    if (f.product !== "all" && s.product !== f.product) return false;
    if (f.channel !== "all" && s.channel !== f.channel) return false;
    if (f.payment !== "all" && s.pay !== f.payment) return false;
    if (f.advisor !== "all" && s.advisor !== f.advisor) return false;
    if (q) {
      const hay = `${s.id} ${s.client} ${s.dni} ${s.product}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function sum(rows: Sale[], pick: (s: Sale) => number) {
  let t = 0;
  for (const s of rows) t += pick(s);
  return t;
}

export type NamedSlice = { name: string; value: number; color?: string };

export type ClientRow = {
  dni: string;
  client: string;
  tickets: number;
  units: number;
  totalS: number;
};

export type SalesStats = {
  tickets: number;
  units: number;
  totalS: number;
  netUsd: number;
  cashUsd: number;
  igv: number;
  base: number;
  ticketAvg: number;
  clients: number;
  starProduct: ProductName | null;
  starPct: number;
  byProduct: { name: ProductName; units: number; totalS: number; netUsd: number; color: string }[];
  monthly: { month: string; key: string; Labial: number; Rubor: number; Gloss: number }[];
  weekly: { week: string; totalS: number }[];
  byChannel: NamedSlice[];
  byPayment: NamedSlice[];
  byAdvisor: { name: Advisor; label: string; tickets: number; units: number; totalS: number }[];
  topClients: ClientRow[];
  peakHour: number | null;
  peakHourSoles: number;
};

const PAY_COLOR: Record<Payment, string> = {
  Yape: "#D8005F",
  Plin: "#FF66A3",
  Tarjeta: "#4A154B",
  Efectivo: "#C9A0B0",
};

const CHANNEL_COLOR: Record<Channel, string> = {
  Física: "#4A154B",
  Online: "#D8005F",
};

export function computeSalesStats(rows: Sale[]): SalesStats {
  const tickets = rows.length;
  const units = sum(rows, (s) => s.qty);
  const totalS = sum(rows, (s) => s.totalS);
  const netUsd = sum(rows, (s) => s.netUsd);
  const cashUsd = sum(rows, (s) => s.cashUsd);
  const igv = sum(rows, (s) => s.igv);
  const base = sum(rows, (s) => s.base);

  const prodMap = new Map<ProductName, { units: number; totalS: number; netUsd: number }>();
  const monthMap = new Map<string, { Labial: number; Rubor: number; Gloss: number }>();
  const weekMap = new Map<number, number>();
  const channelMap = new Map<Channel, number>();
  const payMap = new Map<Payment, number>();
  const advisorMap = new Map<Advisor, { tickets: number; units: number; totalS: number }>();
  const clientMap = new Map<string, ClientRow>();
  const hourMap = new Map<number, number>();
  const dniSet = new Set<string>();

  for (const s of rows) {
    dniSet.add(s.dni);
    const p = prodMap.get(s.product) ?? { units: 0, totalS: 0, netUsd: 0 };
    p.units += s.qty;
    p.totalS += s.totalS;
    p.netUsd += s.netUsd;
    prodMap.set(s.product, p);

    const mk = s.dt.slice(5, 7);
    const bucket = monthMap.get(mk) ?? { Labial: 0, Rubor: 0, Gloss: 0 };
    if (s.product === "Labial Berry Chic") bucket.Labial += s.totalS;
    else if (s.product === "Rubor Secret Berry") bucket.Rubor += s.totalS;
    else bucket.Gloss += s.totalS;
    monthMap.set(mk, bucket);

    const d = new Date(s.dt.replace(" ", "T"));
    const w = isoWeek(d);
    weekMap.set(w, (weekMap.get(w) ?? 0) + s.totalS);

    channelMap.set(s.channel, (channelMap.get(s.channel) ?? 0) + s.totalS);
    payMap.set(s.pay, (payMap.get(s.pay) ?? 0) + s.totalS);

    const a = advisorMap.get(s.advisor) ?? { tickets: 0, units: 0, totalS: 0 };
    a.tickets += 1;
    a.units += s.qty;
    a.totalS += s.totalS;
    advisorMap.set(s.advisor, a);

    const c = clientMap.get(s.dni) ?? {
      dni: s.dni,
      client: s.client,
      tickets: 0,
      units: 0,
      totalS: 0,
    };
    c.tickets += 1;
    c.units += s.qty;
    c.totalS += s.totalS;
    clientMap.set(s.dni, c);

    const hour = Number(s.dt.slice(11, 13));
    hourMap.set(hour, (hourMap.get(hour) ?? 0) + s.totalS);
  }

  const byProduct = (["Labial Berry Chic", "Rubor Secret Berry", "Gloss Berry Cute"] as ProductName[])
    .map((name) => {
      const v = prodMap.get(name) ?? { units: 0, totalS: 0, netUsd: 0 };
      return { name, ...v, color: PRODUCT_COLORS[name] };
    })
    .sort((a, b) => b.totalS - a.totalS);

  const star = byProduct[0];
  const starProduct = star && star.totalS > 0 ? star.name : null;
  const starPct = totalS > 0 && star ? (star.totalS / totalS) * 100 : 0;

  const monthly = (["1", "2", "3"] as const).map((k) => {
    const key = k.padStart(2, "0");
    const v = monthMap.get(key) ?? { Labial: 0, Rubor: 0, Gloss: 0 };
    return { month: MONTH_LABEL[k], key, ...v };
  });

  const weekly = [...weekMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([w, total]) => ({ week: `S${w}`, totalS: total }));

  const byChannel = ([...channelMap.entries()] as [Channel, number][]).map(([name, value]) => ({
    name,
    value,
    color: CHANNEL_COLOR[name],
  }));

  const byPayment = ([...payMap.entries()] as [Payment, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value, color: PAY_COLOR[name] }));

  const advisorLabel: Record<Advisor, string> = {
    Selena_L: "Selena L.",
    Nadia_D: "Nadia D.",
    Azumy_C: "Azumy C.",
  };
  const byAdvisor = ([...advisorMap.entries()] as [Advisor, { tickets: number; units: number; totalS: number }][])
    .map(([name, v]) => ({ name, label: advisorLabel[name], ...v }))
    .sort((a, b) => b.totalS - a.totalS);

  const topClients = [...clientMap.values()].sort((a, b) => b.totalS - a.totalS).slice(0, 6);

  let peakHour: number | null = null;
  let peakHourSoles = 0;
  for (const [h, v] of hourMap) {
    if (v > peakHourSoles) {
      peakHour = h;
      peakHourSoles = v;
    }
  }

  return {
    tickets,
    units,
    totalS,
    netUsd,
    cashUsd,
    igv,
    base,
    ticketAvg: tickets ? totalS / tickets : 0,
    clients: dniSet.size,
    starProduct,
    starPct,
    byProduct,
    monthly,
    weekly,
    byChannel,
    byPayment,
    byAdvisor,
    topClients,
    peakHour,
    peakHourSoles,
  };
}

function isoWeek(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function inventoryAlerts(kardex: KardexProduct[]) {
  return kardex.filter((p) => p.current <= p.reorder);
}

export function coverageDays(p: KardexProduct, quarterDays = 90) {
  const daily = p.totalOut / quarterDays;
  if (!daily) return 0;
  return p.current / daily;
}
