export type ProductName =
  | "Labial Berry Chic"
  | "Rubor Secret Berry"
  | "Gloss Berry Cute";

export type Channel = "Física" | "Online";
export type Payment = "Yape" | "Plin" | "Tarjeta" | "Efectivo";
export type Advisor = "Selena_L" | "Nadia_D" | "Azumy_C";

export type Sale = {
  id: string;
  dt: string;
  dni: string;
  client: string;
  product: ProductName;
  price: number;
  qty: number;
  base: number;
  igv: number;
  totalS: number;
  netUsd: number;
  cashUsd: number;
  pay: Payment;
  channel: Channel;
  advisor: Advisor;
};

export type KardexMove = {
  period: string | null;
  type: string;
  qty: number | null;
  start: number | null;
  in: number | null;
  out: number | null;
  end: number | null;
};

export type KardexProduct = {
  name: ProductName;
  sku: string;
  price: number;
  capacity: number;
  reorder: number;
  color: string;
  current: number;
  avgInventory: number;
  rotation: number;
  totalOut: number;
  movements: KardexMove[];
};

export type Panel = "sales" | "inventory";

export type MonthFilter = "all" | "1" | "2" | "3";

export type Filters = {
  month: MonthFilter;
  product: "all" | ProductName;
  channel: "all" | Channel;
  payment: "all" | Payment;
  advisor: "all" | Advisor;
  query: string;
};

export const TC_USD = 3.44;

export const PRODUCT_COLORS: Record<ProductName, string> = {
  "Labial Berry Chic": "#D8005F",
  "Rubor Secret Berry": "#FF66A3",
  "Gloss Berry Cute": "#FFB3D9",
};

export const ADVISOR_LABEL: Record<Advisor, string> = {
  Selena_L: "Selena L.",
  Nadia_D: "Nadia D.",
  Azumy_C: "Azumy C.",
};

export const MONTH_LABEL: Record<Exclude<MonthFilter, "all">, string> = {
  "1": "Enero",
  "2": "Febrero",
  "3": "Marzo",
};
