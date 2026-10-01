const soles = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  maximumFractionDigits: 0,
});

const solesDec = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compact = new Intl.NumberFormat("es-PE", {
  maximumFractionDigits: 0,
});

const decimal = new Intl.NumberFormat("es-PE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatSoles(n: number, decimals = false) {
  return decimals ? solesDec.format(n) : soles.format(n);
}

export function formatUsd(n: number) {
  return usd.format(n);
}

export function formatInt(n: number) {
  return compact.format(n);
}

export function formatPct(n: number, digits = 1) {
  return `${n.toFixed(digits)}%`;
}

export function formatDec(n: number) {
  return decimal.format(n);
}

export function formatDateTime(iso: string) {
  const [d, t] = iso.split(" ");
  if (!d || !t) return iso;
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y} · ${t}`;
}

export function formatDay(iso: string) {
  const d = iso.slice(0, 10);
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}
