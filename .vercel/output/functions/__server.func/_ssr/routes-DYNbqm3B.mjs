import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChevronLeft, a as Store, c as RotateCcw, d as Menu, f as Lightbulb, g as ChevronRight, h as CircleCheck, i as TriangleAlert, l as Package, m as Clock, n as Wallet, o as ShoppingBag, p as Download, r as Users, s as Search, t as X, u as PackageCheck, v as Banknote } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { a as CartesianGrid, c as Cell, d as Legend, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DYNbqm3B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function InsightCard({ tone = "brand", icon, kicker, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("insight-premium flex gap-4 px-5 py-5 sm:px-7 sm:py-6", tone === "alert" && "is-alert", tone === "ok" && "is-ok"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mt-0.5 grid size-11 shrink-0 place-items-center rounded-md", tone === "alert" && "bg-coral/10 text-coral", tone === "ok" && "bg-mint/10 text-mint", tone === "brand" && "bg-rose/10 text-rose"),
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
				children: kicker
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 font-display text-[1.15rem] leading-snug font-semibold text-ink sm:text-[1.35rem]",
				children
			})]
		})]
	});
}
function ClientOnly({ children, fallback }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[240px] animate-pulse rounded-md bg-warm/70",
		"aria-hidden": "true"
	});
	return children;
}
var TC_USD = 3.44;
var PRODUCT_COLORS = {
	"Labial Berry Chic": "#D8005F",
	"Rubor Secret Berry": "#FF66A3",
	"Gloss Berry Cute": "#FFB3D9"
};
var ADVISOR_LABEL = {
	Selena_L: "Selena L.",
	Nadia_D: "Nadia D.",
	Azumy_C: "Azumy C."
};
var MONTH_LABEL = {
	"1": "Enero",
	"2": "Febrero",
	"3": "Marzo"
};
function filterSales(sales, f) {
	const q = f.query.trim().toLowerCase();
	return sales.filter((s) => {
		if (f.month !== "all" && s.dt.slice(5, 7) !== f.month.padStart(2, "0")) return false;
		if (f.product !== "all" && s.product !== f.product) return false;
		if (f.channel !== "all" && s.channel !== f.channel) return false;
		if (f.payment !== "all" && s.pay !== f.payment) return false;
		if (f.advisor !== "all" && s.advisor !== f.advisor) return false;
		if (q) {
			if (!`${s.id} ${s.client} ${s.dni} ${s.product}`.toLowerCase().includes(q)) return false;
		}
		return true;
	});
}
function sum(rows, pick) {
	let t = 0;
	for (const s of rows) t += pick(s);
	return t;
}
var PAY_COLOR = {
	Yape: "#D8005F",
	Plin: "#FF66A3",
	Tarjeta: "#4A154B",
	Efectivo: "#C9A0B0"
};
var CHANNEL_COLOR = {
	Física: "#4A154B",
	Online: "#D8005F"
};
function computeSalesStats(rows) {
	const tickets = rows.length;
	const units = sum(rows, (s) => s.qty);
	const totalS = sum(rows, (s) => s.totalS);
	const netUsd = sum(rows, (s) => s.netUsd);
	const cashUsd = sum(rows, (s) => s.cashUsd);
	const igv = sum(rows, (s) => s.igv);
	const base = sum(rows, (s) => s.base);
	const prodMap = /* @__PURE__ */ new Map();
	const monthMap = /* @__PURE__ */ new Map();
	const weekMap = /* @__PURE__ */ new Map();
	const channelMap = /* @__PURE__ */ new Map();
	const payMap = /* @__PURE__ */ new Map();
	const advisorMap = /* @__PURE__ */ new Map();
	const clientMap = /* @__PURE__ */ new Map();
	const hourMap = /* @__PURE__ */ new Map();
	const dniSet = /* @__PURE__ */ new Set();
	for (const s of rows) {
		dniSet.add(s.dni);
		const p = prodMap.get(s.product) ?? {
			units: 0,
			totalS: 0,
			netUsd: 0
		};
		p.units += s.qty;
		p.totalS += s.totalS;
		p.netUsd += s.netUsd;
		prodMap.set(s.product, p);
		const mk = s.dt.slice(5, 7);
		const bucket = monthMap.get(mk) ?? {
			Labial: 0,
			Rubor: 0,
			Gloss: 0
		};
		if (s.product === "Labial Berry Chic") bucket.Labial += s.totalS;
		else if (s.product === "Rubor Secret Berry") bucket.Rubor += s.totalS;
		else bucket.Gloss += s.totalS;
		monthMap.set(mk, bucket);
		const w = isoWeek(new Date(s.dt.replace(" ", "T")));
		weekMap.set(w, (weekMap.get(w) ?? 0) + s.totalS);
		channelMap.set(s.channel, (channelMap.get(s.channel) ?? 0) + s.totalS);
		payMap.set(s.pay, (payMap.get(s.pay) ?? 0) + s.totalS);
		const a = advisorMap.get(s.advisor) ?? {
			tickets: 0,
			units: 0,
			totalS: 0
		};
		a.tickets += 1;
		a.units += s.qty;
		a.totalS += s.totalS;
		advisorMap.set(s.advisor, a);
		const c = clientMap.get(s.dni) ?? {
			dni: s.dni,
			client: s.client,
			tickets: 0,
			units: 0,
			totalS: 0
		};
		c.tickets += 1;
		c.units += s.qty;
		c.totalS += s.totalS;
		clientMap.set(s.dni, c);
		const hour = Number(s.dt.slice(11, 13));
		hourMap.set(hour, (hourMap.get(hour) ?? 0) + s.totalS);
	}
	const byProduct = [
		"Labial Berry Chic",
		"Rubor Secret Berry",
		"Gloss Berry Cute"
	].map((name) => {
		return {
			name,
			...prodMap.get(name) ?? {
				units: 0,
				totalS: 0,
				netUsd: 0
			},
			color: PRODUCT_COLORS[name]
		};
	}).sort((a, b) => b.totalS - a.totalS);
	const star = byProduct[0];
	const starProduct = star && star.totalS > 0 ? star.name : null;
	const starPct = totalS > 0 && star ? star.totalS / totalS * 100 : 0;
	const monthly = [
		"1",
		"2",
		"3"
	].map((k) => {
		const key = k.padStart(2, "0");
		const v = monthMap.get(key) ?? {
			Labial: 0,
			Rubor: 0,
			Gloss: 0
		};
		return {
			month: MONTH_LABEL[k],
			key,
			...v
		};
	});
	const weekly = [...weekMap.entries()].sort((a, b) => a[0] - b[0]).map(([w, total]) => ({
		week: `S${w}`,
		totalS: total
	}));
	const byChannel = [...channelMap.entries()].map(([name, value]) => ({
		name,
		value,
		color: CHANNEL_COLOR[name]
	}));
	const byPayment = [...payMap.entries()].sort((a, b) => b[1] - a[1]).map(([name, value]) => ({
		name,
		value,
		color: PAY_COLOR[name]
	}));
	const advisorLabel = {
		Selena_L: "Selena L.",
		Nadia_D: "Nadia D.",
		Azumy_C: "Azumy C."
	};
	const byAdvisor = [...advisorMap.entries()].map(([name, v]) => ({
		name,
		label: advisorLabel[name],
		...v
	})).sort((a, b) => b.totalS - a.totalS);
	const topClients = [...clientMap.values()].sort((a, b) => b.totalS - a.totalS).slice(0, 6);
	let peakHour = null;
	let peakHourSoles = 0;
	for (const [h, v] of hourMap) if (v > peakHourSoles) {
		peakHour = h;
		peakHourSoles = v;
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
		peakHourSoles
	};
}
function isoWeek(d) {
	const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	const day = date.getUTCDay() || 7;
	date.setUTCDate(date.getUTCDate() + 4 - day);
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	return Math.ceil(((date.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
}
function inventoryAlerts(kardex) {
	return kardex.filter((p) => p.current <= p.reorder);
}
function coverageDays(p, quarterDays = 90) {
	const daily = p.totalOut / quarterDays;
	if (!daily) return 0;
	return p.current / daily;
}
var soles = new Intl.NumberFormat("es-PE", {
	style: "currency",
	currency: "PEN",
	maximumFractionDigits: 0
});
var solesDec = new Intl.NumberFormat("es-PE", {
	style: "currency",
	currency: "PEN",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
var usd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
var compact = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });
var decimal = new Intl.NumberFormat("es-PE", {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});
function formatSoles(n, decimals = false) {
	return decimals ? solesDec.format(n) : soles.format(n);
}
function formatUsd(n) {
	return usd.format(n);
}
function formatInt(n) {
	return compact.format(n);
}
function formatPct(n, digits = 1) {
	return `${n.toFixed(digits)}%`;
}
function formatDec(n) {
	return decimal.format(n);
}
function formatDateTime(iso) {
	const [d, t] = iso.split(" ");
	if (!d || !t) return iso;
	const [y, m, day] = d.split("-");
	return `${day}/${m}/${y} · ${t}`;
}
function InventoryPanel({ kardex }) {
	const [sku, setSku] = (0, import_react.useState)(kardex[0]?.sku ?? "");
	const active = kardex.find((p) => p.sku === sku) ?? kardex[0];
	const alerts = inventoryAlerts(kardex);
	const total = kardex.reduce((a, p) => a + p.current, 0);
	const donut = kardex.map((p) => ({
		name: p.name,
		value: p.current,
		color: p.color
	}));
	const axisMax = Math.max(400, ...kardex.map((p) => Math.max(p.current, p.capacity)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-5",
		children: [
			alerts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
				tone: "alert",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" }),
				kicker: "Insight operativo",
				children: [
					"Riesgo de quiebre en ",
					alerts.map((p) => p.name).join(", "),
					". Emitir orden de compra prioritaria hoy."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCard, {
				tone: "ok",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }),
				kicker: "Insight operativo",
				children: "Stock saludable. Ningún SKU está en o bajo el punto de reorden (50 / 60 uds). Gloss Berry Cute es el más rotativo: planificar reposición preventiva."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel-card p-5 sm:p-6 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Distribución de stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Saldo final al 31 de marzo 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto mt-2 h-[240px] w-full max-w-[280px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: donut,
								dataKey: "value",
								innerRadius: "65%",
								outerRadius: "92%",
								paddingAngle: 3,
								stroke: "none",
								children: donut.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.color }, d.name))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (v) => `${formatInt(Number(v ?? 0))} uds`,
								contentStyle: {
									borderRadius: 12,
									border: "1px solid rgba(74,21,75,0.1)",
									fontSize: 12
								}
							})] }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] tracking-[0.14em] text-muted uppercase",
										children: "Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl font-semibold text-ink tabular-nums",
										children: formatInt(total)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "unidades"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 space-y-2",
							children: kardex.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2.5 rounded-full",
										style: { background: p.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-auto font-semibold tabular-nums",
										children: [
											formatInt(p.current),
											" · ",
											formatPct(p.current / total * 100, 0)
										]
									})
								]
							}, p.sku))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel-card p-5 sm:p-6 lg:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold",
								children: "Monitor de reorden"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Capacidad de fondo · líneas de reorden 50 y 60 · color según umbral"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "size-4 text-rose" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-8 pt-2",
							children: kardex.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderBar, {
								product: p,
								axisMax
							}, p.sku))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-4 text-[11px] text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2 w-6 rounded-sm bg-warm" }), " Capacidad"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2 w-6 rounded-sm bg-mint" }), " Sobre reorden"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2 w-6 rounded-sm bg-coral" }), " Zona crítica"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-3 w-px bg-ink" }), " Reorden 50 / 60"]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: kardex.map((p) => {
					const days = coverageDays(p);
					const critical = p.current <= p.reorder;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-[0.14em] text-muted uppercase",
								children: p.sku
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-xl font-semibold",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid grid-cols-2 gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "Stock actual"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: cn("text-lg font-semibold tabular-nums", critical ? "text-coral" : "text-rose"),
										children: formatInt(p.current)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "Rotación Q1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "flex items-center gap-1 text-lg font-semibold tabular-nums",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 text-muted" }),
											formatDec(p.rotation),
											"x"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "Inv. promedio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium tabular-nums",
										children: formatDec(p.avgInventory)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "Cobertura"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "font-medium tabular-nums",
										children: [formatDec(days), " días"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "Salidas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "font-medium tabular-nums",
										children: [formatInt(p.totalOut), " uds"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "Reorden / cap."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "font-medium tabular-nums",
										children: [
											p.reorder,
											" / ",
											p.capacity
										]
									})] })
								]
							})
						]
					}, p.sku);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-wrap items-end justify-between gap-3 px-5 pt-5 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Kardex semanal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Movimientos reales de compras y ventas · Q1"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 rounded-full bg-warm p-1",
						children: kardex.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSku(p.sku),
							className: cn("rounded-full px-3 py-1.5 text-xs font-medium", sku === p.sku ? "bg-card text-ink shadow-sm" : "text-muted"),
							children: p.name.replace(" Berry", "").replace(" Secret", "")
						}, p.sku))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-y border-warm text-[11px] tracking-[0.12em] text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-2.5 font-semibold sm:px-6",
									children: "Periodo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 font-semibold",
									children: "Tipo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 text-right font-semibold",
									children: "Ingresos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 text-right font-semibold",
									children: "Salidas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-2.5 text-right font-semibold sm:px-6",
									children: "Saldo"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: active?.movements.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-warm/80 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-2.5 sm:px-6",
									children: m.period ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", m.type === "Compras" ? "bg-lavender text-rose" : m.type === "Saldo Inicial" ? "bg-warm text-muted" : "bg-warm text-ink"),
										children: m.type
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2.5 text-right tabular-nums",
									children: m.in ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2.5 text-right tabular-nums",
									children: m.out ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-2.5 text-right font-semibold tabular-nums sm:px-6",
									children: m.end ?? "—"
								})
							]
						}, `${active.sku}-${i}`)) })]
					})
				})]
			})
		]
	});
}
function ReorderBar({ product, axisMax }) {
	const critical = product.current <= product.reorder;
	const stockPct = Math.min(100, product.current / axisMax * 100);
	const capPct = Math.min(100, product.capacity / axisMax * 100);
	const line50 = 50 / axisMax * 100;
	const line60 = 60 / axisMax * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex flex-wrap items-baseline justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold",
			children: product.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				critical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold tracking-wide text-coral uppercase",
					children: "Alerta"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-mint",
					children: "Sobre reorden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-2 text-warm",
					children: "·"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold tabular-nums text-ink",
					children: [formatInt(product.current), " uds"]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-5 h-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 left-0 rounded-md bg-warm",
				style: { width: `${capPct}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-y-0 left-0 rounded-md", critical ? "bg-coral" : "bg-mint"),
				style: { width: `${stockPct}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-[-6px] h-10 w-px bg-ink",
				style: { left: `${line50}%` },
				title: "Reorden 50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-[-6px] h-10 w-px bg-ink/70",
				style: { left: `${line60}%` },
				title: "Reorden 60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-4 text-[10px] font-medium whitespace-nowrap text-ink",
				style: {
					left: `${(line50 + line60) / 2}%`,
					transform: "translateX(-50%)"
				},
				children: "50 / 60"
			})
		]
	})] });
}
function KpiCard({ label, value, hint, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "kpi-float relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold tracking-[0.14em] text-muted uppercase",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 place-items-center rounded-sm bg-lavender text-rose",
					children: icon
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-[1.85rem] leading-none font-semibold tracking-tight text-rose tabular-nums sm:text-[2.15rem]",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2.5 text-xs text-muted",
				children: hint
			})
		]
	});
}
function MoneyTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-hair bg-card px-3 py-2.5 shadow-[var(--shadow-float)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1.5 font-display text-sm font-semibold text-ink",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1",
			children: payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 rounded-full",
						style: { background: p.color }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto font-semibold tabular-nums text-rose",
						children: formatSoles(Number(p.value ?? 0))
					})
				]
			}, String(p.dataKey ?? p.name)))
		})]
	});
}
var PAGE_SIZE = 8;
function SalesPanel({ sales, filters }) {
	const rows = (0, import_react.useMemo)(() => filterSales(sales, filters), [sales, filters]);
	const stats = (0, import_react.useMemo)(() => computeSalesStats(rows), [rows]);
	const [page, setPage] = (0, import_react.useState)(0);
	const [sort, setSort] = (0, import_react.useState)("dt");
	const sorted = (0, import_react.useMemo)(() => {
		const copy = [...rows];
		copy.sort((a, b) => sort === "dt" ? b.dt.localeCompare(a.dt) : b.totalS - a.totalS);
		return copy;
	}, [rows, sort]);
	const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
	const safePage = Math.min(page, pages - 1);
	const slice = sorted.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
	const star = stats.starProduct ?? "Labial Berry Chic";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
				tone: "brand",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-5" }),
				kicker: "Insight estratégico",
				children: [
					"El producto estrella es ",
					star,
					" representando el ",
					formatPct(stats.starPct),
					" de los ingresos. Se sugiere inyectar pauta digital para maximizar el margen bruto."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Flujo de caja total",
						value: formatSoles(stats.totalS),
						hint: "Soles · tickets del recorte activo",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Ingreso neto",
						value: formatUsd(stats.netUsd),
						hint: `USD · TC ${TC_USD} · sin IGV`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Unidades vendidas",
						value: formatInt(stats.units),
						hint: `${formatInt(stats.tickets)} tickets · ${formatInt(stats.clients)} clientas`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel-card p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-5 flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold text-ink",
						children: "Evolución trimestral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Ingresos brutos en soles por producto · Q1 2026"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "flex flex-wrap gap-3 text-xs font-medium text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 rounded-full bg-rose" }), " Labial"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 rounded-full bg-blush" }), " Rubor"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 rounded-full bg-petal" }), " Gloss"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[280px] w-full sm:h-[320px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: stats.monthly,
						barGap: 6,
						barCategoryGap: "28%",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "#F2EEF0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "month",
								tick: {
									fill: "#7A6B73",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "#7A6B73",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								tickFormatter: (v) => `${Math.round(v / 1e3)}k`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyTooltip, {}),
								cursor: { fill: "rgba(216,0,95,0.04)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								iconType: "circle",
								iconSize: 8,
								wrapperStyle: {
									fontSize: 12,
									color: "#7A6B73",
									paddingTop: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "Labial",
								name: "Labial Berry Chic",
								fill: "#D8005F",
								radius: [
									6,
									6,
									0,
									0
								],
								maxBarSize: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "Rubor",
								name: "Rubor Secret Berry",
								fill: "#FF66A3",
								radius: [
									6,
									6,
									0,
									0
								],
								maxBarSize: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "Gloss",
								name: "Gloss Berry Cute",
								fill: "#FFB3D9",
								radius: [
									6,
									6,
									0,
									0
								],
								maxBarSize: 28
							})
						]
					}) }) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel-card p-5 sm:p-6 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold",
							children: "Mix de canal y pago"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 mb-4 text-sm text-muted",
							children: "Participación sobre flujo de caja"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1 text-center text-[11px] font-semibold tracking-[0.12em] text-muted uppercase",
								children: "Canal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniDonut, { data: stats.byChannel })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1 text-center text-[11px] font-semibold tracking-[0.12em] text-muted uppercase",
								children: "Pago"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniDonut, { data: stats.byPayment })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: stats.byPayment.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2 rounded-full",
										style: { background: p.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto font-semibold tabular-nums text-ink",
										children: formatSoles(p.value)
									})
								]
							}, p.name))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel-card p-5 sm:p-6 lg:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold",
								children: "Ranking de asesoras"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Conversión del trimestre filtrado"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-rose" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: stats.byAdvisor.map((a, i) => {
								const max = stats.byAdvisor[0]?.totalS || 1;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1.5 flex items-baseline justify-between gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mr-2 text-muted tabular-nums",
												children: ["0", i + 1]
											}), a.label]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold tabular-nums text-rose",
											children: formatSoles(a.totalS)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 overflow-hidden rounded-full bg-warm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-rose",
											style: { width: `${a.totalS / max * 100}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-[11px] text-muted",
										children: [
											formatInt(a.tickets),
											" tickets · ",
											formatInt(a.units),
											" uds"
										]
									})
								] }, a.name);
							})
						}),
						stats.peakHour != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 flex items-center gap-2 rounded-md bg-lavender px-3 py-2 text-xs text-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-rose" }),
								"Pico horario: ",
								String(stats.peakHour).padStart(2, "0"),
								":00 · ",
								formatSoles(stats.peakHourSoles)
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel-card overflow-hidden lg:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold",
								children: "Libro de ventas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [formatInt(sorted.length), " movimientos reales"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 rounded-full bg-warm p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSort("dt"),
									className: cn("rounded-full px-3 py-1.5 text-xs font-medium", sort === "dt" ? "bg-card text-ink shadow-sm" : "text-muted"),
									children: "Fecha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSort("totalS"),
									className: cn("rounded-full px-3 py-1.5 text-xs font-medium", sort === "totalS" ? "bg-card text-ink shadow-sm" : "text-muted"),
									children: "Monto"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[640px] text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-y border-warm text-[11px] tracking-[0.12em] text-muted uppercase",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-2.5 font-semibold sm:px-6",
											children: "ID"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 font-semibold",
											children: "Fecha"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 font-semibold",
											children: "Clienta"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 font-semibold",
											children: "Producto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-semibold",
											children: "Cant."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-2.5 text-right font-semibold sm:px-6",
											children: "Total"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [slice.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-warm/80 last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 font-medium tabular-nums text-rose sm:px-6",
											children: s.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-3 text-xs text-muted tabular-nums",
											children: formatDateTime(s.dt)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "max-w-[180px] truncate font-medium",
												children: s.client
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted",
												children: [
													s.channel,
													" · ",
													s.pay,
													" · ",
													ADVISOR_LABEL[s.advisor]
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-3 text-xs",
											children: s.product
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-3 text-right tabular-nums",
											children: s.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 text-right font-semibold tabular-nums sm:px-6",
											children: formatSoles(s.totalS)
										})
									]
								}, s.id)), slice.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 6,
									className: "px-6 py-10 text-center text-sm text-muted",
									children: "No hay ventas con esos filtros."
								}) })] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "flex items-center justify-between px-5 py-4 sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									safePage * PAGE_SIZE + (slice.length ? 1 : 0),
									"–",
									safePage * PAGE_SIZE + slice.length,
									" de",
									" ",
									formatInt(sorted.length)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-9 place-items-center rounded-md bg-warm text-ink disabled:opacity-40",
									disabled: safePage === 0,
									onClick: () => setPage((p) => Math.max(0, p - 1)),
									"aria-label": "Página anterior",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-9 place-items-center rounded-md bg-warm text-ink disabled:opacity-40",
									disabled: safePage >= pages - 1,
									onClick: () => setPage((p) => p + 1),
									"aria-label": "Página siguiente",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel-card p-5 sm:p-6 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold",
							children: "Clientas recurrentes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 mb-4 text-sm text-muted",
							children: "Mayor lifetime value del recorte"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "space-y-3",
							children: stats.topClients.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-7 shrink-0 place-items-center rounded-full bg-lavender text-[11px] font-semibold text-rose",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: c.client
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted",
											children: [
												"DNI ",
												c.dni,
												" · ",
												c.tickets,
												" compras · ",
												c.units,
												" uds"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold tabular-nums text-rose",
										children: formatSoles(c.totalS)
									})
								]
							}, c.dni))
						})
					]
				})]
			})
		]
	});
}
function MiniDonut({ data }) {
	const total = data.reduce((a, b) => a + b.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-[140px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full animate-pulse rounded-md bg-warm/70" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
				data,
				dataKey: "value",
				innerRadius: "62%",
				outerRadius: "88%",
				paddingAngle: 2,
				stroke: "none",
				children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.color ?? "#D8005F" }, d.name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				formatter: (v) => formatSoles(Number(v ?? 0)),
				contentStyle: {
					borderRadius: 12,
					border: "1px solid rgba(74,21,75,0.1)",
					fontSize: 12
				}
			})] }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "sr-only",
			children: ["Total ", formatSoles(total)]
		})]
	});
}
var sales_default = /*#__PURE__*/ JSON.parse("[{\"id\":\"V-0002\",\"dt\":\"2026-01-01 10:41\",\"dni\":\"69736491\",\"client\":\"Camila Victoria Mamani Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0003\",\"dt\":\"2026-01-01 11:01\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0004\",\"dt\":\"2026-01-01 11:11\",\"dni\":\"41414875\",\"client\":\"Sofía Fernanda Mendoza Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0005\",\"dt\":\"2026-01-01 11:32\",\"dni\":\"66661604\",\"client\":\"Valeria Micaela Flores Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0006\",\"dt\":\"2026-01-01 12:00\",\"dni\":\"60847849\",\"client\":\"Gabriela Victoria Rojas Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0007\",\"dt\":\"2026-01-01 12:28\",\"dni\":\"60635828\",\"client\":\"Daniela Carolina Gómez Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0008\",\"dt\":\"2026-01-01 12:49\",\"dni\":\"56073964\",\"client\":\"Daniela Micaela Condori Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0009\",\"dt\":\"2026-01-01 13:19\",\"dni\":\"71982612\",\"client\":\"Andrea Fernanda Flores Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0011\",\"dt\":\"2026-01-01 15:13\",\"dni\":\"71860474\",\"client\":\"Andrea Beatriz Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0013\",\"dt\":\"2026-01-01 16:06\",\"dni\":\"48202485\",\"client\":\"Daniela Paula Gómez Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0014\",\"dt\":\"2026-01-01 17:09\",\"dni\":\"47665698\",\"client\":\"Sofía Martina Condori Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0016\",\"dt\":\"2026-01-01 18:21\",\"dni\":\"79198074\",\"client\":\"Ana Fernanda Mendoza Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0018\",\"dt\":\"2026-01-02 11:18\",\"dni\":\"45024695\",\"client\":\"Andrea Alejandra Quispe Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0020\",\"dt\":\"2026-01-02 12:58\",\"dni\":\"70321623\",\"client\":\"Ana Paula Rojas Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0021\",\"dt\":\"2026-01-02 13:04\",\"dni\":\"45024695\",\"client\":\"Andrea Alejandra Quispe Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0022\",\"dt\":\"2026-01-02 13:27\",\"dni\":\"42427329\",\"client\":\"Andrea Victoria Silva Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0023\",\"dt\":\"2026-01-02 14:29\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0024\",\"dt\":\"2026-01-02 15:13\",\"dni\":\"64145057\",\"client\":\"Lucía Martina Flores Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0025\",\"dt\":\"2026-01-02 16:06\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0026\",\"dt\":\"2026-01-02 17:22\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0028\",\"dt\":\"2026-01-02 18:09\",\"dni\":\"44486482\",\"client\":\"Valeria Alejandra Mamani Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0029\",\"dt\":\"2026-01-03 11:19\",\"dni\":\"61409818\",\"client\":\"Elena Victoria Quispe Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0030\",\"dt\":\"2026-01-03 11:35\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0032\",\"dt\":\"2026-01-03 12:51\",\"dni\":\"71725896\",\"client\":\"María Paula Vargas Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0033\",\"dt\":\"2026-01-03 13:26\",\"dni\":\"50216436\",\"client\":\"Gabriela Carolina Rojas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0035\",\"dt\":\"2026-01-03 15:27\",\"dni\":\"64172107\",\"client\":\"Ana Beatriz Pérez Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0036\",\"dt\":\"2026-01-03 16:22\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0037\",\"dt\":\"2026-01-03 16:54\",\"dni\":\"69507277\",\"client\":\"Gabriela Martina Flores Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0039\",\"dt\":\"2026-01-04 11:46\",\"dni\":\"68036951\",\"client\":\"Ana Martina Condori Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0041\",\"dt\":\"2026-01-04 14:17\",\"dni\":\"65223527\",\"client\":\"Gabriela Carolina Silva Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0042\",\"dt\":\"2026-01-04 14:23\",\"dni\":\"51239099\",\"client\":\"Andrea Carolina Mamani Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0044\",\"dt\":\"2026-01-04 17:09\",\"dni\":\"45024695\",\"client\":\"Andrea Alejandra Quispe Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0045\",\"dt\":\"2026-01-04 17:43\",\"dni\":\"71860474\",\"client\":\"Andrea Beatriz Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0046\",\"dt\":\"2026-01-04 18:58\",\"dni\":\"78921743\",\"client\":\"Valeria Victoria Silva Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0047\",\"dt\":\"2026-01-05 10:08\",\"dni\":\"70082741\",\"client\":\"Valeria Martina Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0049\",\"dt\":\"2026-01-05 11:01\",\"dni\":\"79059848\",\"client\":\"Lucía Isabella Pérez Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0050\",\"dt\":\"2026-01-05 11:55\",\"dni\":\"47379247\",\"client\":\"Lucía Micaela Rojas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0051\",\"dt\":\"2026-01-05 12:20\",\"dni\":\"65472150\",\"client\":\"María Paula Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0052\",\"dt\":\"2026-01-05 12:23\",\"dni\":\"48882341\",\"client\":\"María Alejandra Gómez Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0053\",\"dt\":\"2026-01-05 12:40\",\"dni\":\"67118707\",\"client\":\"Valeria Beatriz Mamani Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0055\",\"dt\":\"2026-01-05 15:25\",\"dni\":\"46480658\",\"client\":\"Lucía Beatriz Mendoza Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0056\",\"dt\":\"2026-01-05 17:22\",\"dni\":\"69953745\",\"client\":\"Daniela Isabella Silva Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0057\",\"dt\":\"2026-01-06 10:05\",\"dni\":\"60904042\",\"client\":\"Lucía Paula Rojas Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0058\",\"dt\":\"2026-01-06 10:50\",\"dni\":\"43212565\",\"client\":\"Sofía Micaela Vargas Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0060\",\"dt\":\"2026-01-06 13:07\",\"dni\":\"54392049\",\"client\":\"Sofía Martina Flores Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0063\",\"dt\":\"2026-01-06 15:15\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0064\",\"dt\":\"2026-01-06 15:25\",\"dni\":\"56966556\",\"client\":\"Andrea Alejandra Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0066\",\"dt\":\"2026-01-06 16:14\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0067\",\"dt\":\"2026-01-06 17:04\",\"dni\":\"70532655\",\"client\":\"Valeria Fernanda Silva Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0068\",\"dt\":\"2026-01-06 17:08\",\"dni\":\"63837224\",\"client\":\"Valeria Beatriz Rojas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0069\",\"dt\":\"2026-01-06 17:40\",\"dni\":\"51788360\",\"client\":\"Valeria Martina Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0071\",\"dt\":\"2026-01-07 10:12\",\"dni\":\"42332885\",\"client\":\"Ana Carolina Vargas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0072\",\"dt\":\"2026-01-07 11:07\",\"dni\":\"65533911\",\"client\":\"Valeria Julieta Mamani Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0074\",\"dt\":\"2026-01-07 12:48\",\"dni\":\"42427329\",\"client\":\"Andrea Victoria Silva Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0076\",\"dt\":\"2026-01-07 17:20\",\"dni\":\"67118707\",\"client\":\"Valeria Beatriz Mamani Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0077\",\"dt\":\"2026-01-07 17:42\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0079\",\"dt\":\"2026-01-07 18:43\",\"dni\":\"61409818\",\"client\":\"Elena Victoria Quispe Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0080\",\"dt\":\"2026-01-08 10:40\",\"dni\":\"71458274\",\"client\":\"Camila Victoria Pérez Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0082\",\"dt\":\"2026-01-08 11:58\",\"dni\":\"41550856\",\"client\":\"Andrea Micaela Rojas Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0083\",\"dt\":\"2026-01-08 13:15\",\"dni\":\"77051356\",\"client\":\"Daniela Martina Quispe Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0084\",\"dt\":\"2026-01-08 13:50\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0085\",\"dt\":\"2026-01-08 14:07\",\"dni\":\"78921743\",\"client\":\"Valeria Victoria Silva Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0086\",\"dt\":\"2026-01-08 15:45\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0088\",\"dt\":\"2026-01-08 16:14\",\"dni\":\"47847155\",\"client\":\"Valeria Beatriz Silva Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0089\",\"dt\":\"2026-01-08 17:05\",\"dni\":\"79198074\",\"client\":\"Ana Fernanda Mendoza Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0090\",\"dt\":\"2026-01-08 17:06\",\"dni\":\"70016741\",\"client\":\"Lucía Alejandra Flores Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0091\",\"dt\":\"2026-01-08 17:12\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0093\",\"dt\":\"2026-01-08 17:19\",\"dni\":\"43925078\",\"client\":\"Elena Beatriz Quispe Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0095\",\"dt\":\"2026-01-08 17:58\",\"dni\":\"72862919\",\"client\":\"Lucía Isabella Flores Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0096\",\"dt\":\"2026-01-08 18:37\",\"dni\":\"52213730\",\"client\":\"Daniela Isabella Mendoza Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0097\",\"dt\":\"2026-01-09 10:51\",\"dni\":\"53641499\",\"client\":\"Andrea Victoria Rojas Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0099\",\"dt\":\"2026-01-09 13:15\",\"dni\":\"57673953\",\"client\":\"Daniela Carolina Pérez Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0101\",\"dt\":\"2026-01-09 13:42\",\"dni\":\"43631228\",\"client\":\"Gabriela Beatriz Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0102\",\"dt\":\"2026-01-09 14:18\",\"dni\":\"40267712\",\"client\":\"Sofía Isabella Gómez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0103\",\"dt\":\"2026-01-09 14:41\",\"dni\":\"72642106\",\"client\":\"Elena Isabella Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0105\",\"dt\":\"2026-01-09 16:37\",\"dni\":\"70109689\",\"client\":\"Andrea Isabella Gómez Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0106\",\"dt\":\"2026-01-09 17:04\",\"dni\":\"62048181\",\"client\":\"Andrea Martina Vargas Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0108\",\"dt\":\"2026-01-09 18:34\",\"dni\":\"69530563\",\"client\":\"Daniela Carolina Vargas Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0110\",\"dt\":\"2026-01-09 18:39\",\"dni\":\"70408469\",\"client\":\"Andrea Carolina Vargas Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0112\",\"dt\":\"2026-01-10 11:36\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0113\",\"dt\":\"2026-01-10 11:50\",\"dni\":\"62048181\",\"client\":\"Andrea Martina Vargas Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0114\",\"dt\":\"2026-01-10 12:01\",\"dni\":\"61707922\",\"client\":\"Daniela Paula Mamani Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0115\",\"dt\":\"2026-01-10 13:53\",\"dni\":\"44486482\",\"client\":\"Valeria Alejandra Mamani Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0116\",\"dt\":\"2026-01-10 14:05\",\"dni\":\"70016741\",\"client\":\"Lucía Alejandra Flores Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0117\",\"dt\":\"2026-01-10 14:06\",\"dni\":\"70532655\",\"client\":\"Valeria Fernanda Silva Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0118\",\"dt\":\"2026-01-10 15:08\",\"dni\":\"63117162\",\"client\":\"Lucía Fernanda Pérez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0119\",\"dt\":\"2026-01-10 16:09\",\"dni\":\"69736491\",\"client\":\"Camila Victoria Mamani Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0120\",\"dt\":\"2026-01-10 18:43\",\"dni\":\"70801887\",\"client\":\"Valeria Paula Rojas Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0122\",\"dt\":\"2026-01-11 10:22\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0123\",\"dt\":\"2026-01-11 10:50\",\"dni\":\"56614669\",\"client\":\"Ana Fernanda Silva Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0124\",\"dt\":\"2026-01-11 12:50\",\"dni\":\"44996654\",\"client\":\"Andrea Martina Pérez Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0125\",\"dt\":\"2026-01-11 12:50\",\"dni\":\"50859676\",\"client\":\"Ana Fernanda Rojas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0127\",\"dt\":\"2026-01-11 16:29\",\"dni\":\"68836404\",\"client\":\"Gabriela Paula Condori Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0128\",\"dt\":\"2026-01-11 17:09\",\"dni\":\"71982612\",\"client\":\"Andrea Fernanda Flores Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0130\",\"dt\":\"2026-01-12 11:33\",\"dni\":\"53414801\",\"client\":\"Valeria Isabella Mamani Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0132\",\"dt\":\"2026-01-12 13:16\",\"dni\":\"77276434\",\"client\":\"Elena Julieta Mendoza Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0133\",\"dt\":\"2026-01-12 13:33\",\"dni\":\"64345066\",\"client\":\"Elena Martina Gómez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0134\",\"dt\":\"2026-01-12 13:40\",\"dni\":\"72641643\",\"client\":\"Sofía Beatriz Mendoza Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0135\",\"dt\":\"2026-01-12 14:16\",\"dni\":\"70644464\",\"client\":\"Ana Beatriz Quispe Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0136\",\"dt\":\"2026-01-12 14:47\",\"dni\":\"47665698\",\"client\":\"Sofía Martina Condori Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0137\",\"dt\":\"2026-01-12 15:07\",\"dni\":\"72658224\",\"client\":\"Ana Micaela Pérez Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0138\",\"dt\":\"2026-01-12 16:44\",\"dni\":\"70321623\",\"client\":\"Ana Paula Rojas Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0139\",\"dt\":\"2026-01-12 18:00\",\"dni\":\"48194623\",\"client\":\"Elena Fernanda Condori Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0140\",\"dt\":\"2026-01-12 18:44\",\"dni\":\"65004530\",\"client\":\"Lucía Julieta Quispe Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0141\",\"dt\":\"2026-01-12 18:47\",\"dni\":\"66694609\",\"client\":\"Andrea Paula Quispe Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0142\",\"dt\":\"2026-01-13 10:45\",\"dni\":\"71477768\",\"client\":\"Valeria Julieta Condori Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0143\",\"dt\":\"2026-01-13 11:17\",\"dni\":\"70555498\",\"client\":\"Gabriela Beatriz Quispe Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0146\",\"dt\":\"2026-01-13 12:11\",\"dni\":\"41224436\",\"client\":\"Ana Paula Mamani Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0148\",\"dt\":\"2026-01-13 12:38\",\"dni\":\"65472150\",\"client\":\"María Paula Condori Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0149\",\"dt\":\"2026-01-13 12:43\",\"dni\":\"51239099\",\"client\":\"Andrea Carolina Mamani Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0150\",\"dt\":\"2026-01-13 14:00\",\"dni\":\"50708593\",\"client\":\"Elena Martina Flores Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0153\",\"dt\":\"2026-01-13 17:27\",\"dni\":\"79955892\",\"client\":\"Camila Victoria Flores Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0154\",\"dt\":\"2026-01-13 17:31\",\"dni\":\"45289098\",\"client\":\"Lucía Paula Vargas Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0155\",\"dt\":\"2026-01-14 10:44\",\"dni\":\"69736491\",\"client\":\"Camila Victoria Mamani Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0156\",\"dt\":\"2026-01-14 10:47\",\"dni\":\"71982612\",\"client\":\"Andrea Fernanda Flores Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0157\",\"dt\":\"2026-01-14 11:09\",\"dni\":\"52286862\",\"client\":\"Gabriela Carolina Gómez Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0158\",\"dt\":\"2026-01-14 12:00\",\"dni\":\"46480658\",\"client\":\"Lucía Beatriz Mendoza Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0159\",\"dt\":\"2026-01-14 12:54\",\"dni\":\"73264145\",\"client\":\"Ana Alejandra Gómez Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0161\",\"dt\":\"2026-01-14 15:47\",\"dni\":\"47395044\",\"client\":\"María Isabella Gómez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0162\",\"dt\":\"2026-01-14 16:09\",\"dni\":\"54985579\",\"client\":\"Valeria Martina Gómez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0163\",\"dt\":\"2026-01-14 16:16\",\"dni\":\"47847155\",\"client\":\"Valeria Beatriz Silva Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0165\",\"dt\":\"2026-01-14 18:10\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0168\",\"dt\":\"2026-01-15 13:24\",\"dni\":\"68471632\",\"client\":\"Andrea Isabella Mamani Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0169\",\"dt\":\"2026-01-15 13:55\",\"dni\":\"50216436\",\"client\":\"Gabriela Carolina Rojas Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0170\",\"dt\":\"2026-01-15 14:21\",\"dni\":\"62459061\",\"client\":\"Lucía Micaela Condori Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0171\",\"dt\":\"2026-01-15 15:15\",\"dni\":\"59036983\",\"client\":\"Valeria Julieta Vargas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0172\",\"dt\":\"2026-01-15 15:52\",\"dni\":\"40267712\",\"client\":\"Sofía Isabella Gómez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0174\",\"dt\":\"2026-01-15 17:07\",\"dni\":\"50216436\",\"client\":\"Gabriela Carolina Rojas Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0175\",\"dt\":\"2026-01-15 17:18\",\"dni\":\"46992959\",\"client\":\"Daniela Micaela Gómez Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0177\",\"dt\":\"2026-01-16 10:55\",\"dni\":\"52213730\",\"client\":\"Daniela Isabella Mendoza Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0178\",\"dt\":\"2026-01-16 11:16\",\"dni\":\"77051356\",\"client\":\"Daniela Martina Quispe Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0180\",\"dt\":\"2026-01-16 11:41\",\"dni\":\"49789018\",\"client\":\"Andrea Beatriz Pérez Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0181\",\"dt\":\"2026-01-16 13:49\",\"dni\":\"49937780\",\"client\":\"María Isabella Vargas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0182\",\"dt\":\"2026-01-16 13:58\",\"dni\":\"41759319\",\"client\":\"Sofía Carolina Pérez Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0183\",\"dt\":\"2026-01-16 14:06\",\"dni\":\"65004530\",\"client\":\"Lucía Julieta Quispe Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0184\",\"dt\":\"2026-01-16 14:09\",\"dni\":\"51973877\",\"client\":\"Gabriela Beatriz Pérez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0185\",\"dt\":\"2026-01-16 15:08\",\"dni\":\"47976246\",\"client\":\"Gabriela Julieta Quispe Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0186\",\"dt\":\"2026-01-16 15:12\",\"dni\":\"49937780\",\"client\":\"María Isabella Vargas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0187\",\"dt\":\"2026-01-16 15:42\",\"dni\":\"57673953\",\"client\":\"Daniela Carolina Pérez Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0189\",\"dt\":\"2026-01-16 16:16\",\"dni\":\"41151546\",\"client\":\"Elena Martina Flores Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0190\",\"dt\":\"2026-01-16 16:16\",\"dni\":\"48194623\",\"client\":\"Elena Fernanda Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0191\",\"dt\":\"2026-01-16 17:39\",\"dni\":\"45289098\",\"client\":\"Lucía Paula Vargas Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0193\",\"dt\":\"2026-01-16 18:53\",\"dni\":\"41151546\",\"client\":\"Elena Martina Flores Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0195\",\"dt\":\"2026-01-17 10:10\",\"dni\":\"46480658\",\"client\":\"Lucía Beatriz Mendoza Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0196\",\"dt\":\"2026-01-17 11:36\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0198\",\"dt\":\"2026-01-17 11:43\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0200\",\"dt\":\"2026-01-17 15:09\",\"dni\":\"71458274\",\"client\":\"Camila Victoria Pérez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0201\",\"dt\":\"2026-01-17 16:27\",\"dni\":\"51973877\",\"client\":\"Gabriela Beatriz Pérez Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0202\",\"dt\":\"2026-01-17 17:19\",\"dni\":\"48194623\",\"client\":\"Elena Fernanda Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0204\",\"dt\":\"2026-01-17 18:28\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0205\",\"dt\":\"2026-01-18 10:02\",\"dni\":\"53414801\",\"client\":\"Valeria Isabella Mamani Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0206\",\"dt\":\"2026-01-18 11:18\",\"dni\":\"68471632\",\"client\":\"Andrea Isabella Mamani Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0207\",\"dt\":\"2026-01-18 11:40\",\"dni\":\"50708593\",\"client\":\"Elena Martina Flores Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0208\",\"dt\":\"2026-01-18 15:33\",\"dni\":\"68836404\",\"client\":\"Gabriela Paula Condori Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0209\",\"dt\":\"2026-01-18 15:34\",\"dni\":\"57673953\",\"client\":\"Daniela Carolina Pérez Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0211\",\"dt\":\"2026-01-18 15:49\",\"dni\":\"70321623\",\"client\":\"Ana Paula Rojas Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0213\",\"dt\":\"2026-01-18 15:55\",\"dni\":\"68036951\",\"client\":\"Ana Martina Condori Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0214\",\"dt\":\"2026-01-18 16:37\",\"dni\":\"65673971\",\"client\":\"Daniela Paula Condori Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0215\",\"dt\":\"2026-01-18 16:45\",\"dni\":\"47847155\",\"client\":\"Valeria Beatriz Silva Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0217\",\"dt\":\"2026-01-18 17:33\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0218\",\"dt\":\"2026-01-18 18:57\",\"dni\":\"72642106\",\"client\":\"Elena Isabella Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0220\",\"dt\":\"2026-01-19 11:49\",\"dni\":\"72642106\",\"client\":\"Elena Isabella Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0221\",\"dt\":\"2026-01-19 12:37\",\"dni\":\"79955892\",\"client\":\"Camila Victoria Flores Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0222\",\"dt\":\"2026-01-19 13:04\",\"dni\":\"74281272\",\"client\":\"Camila Fernanda Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0223\",\"dt\":\"2026-01-19 13:46\",\"dni\":\"67118707\",\"client\":\"Valeria Beatriz Mamani Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0224\",\"dt\":\"2026-01-19 14:15\",\"dni\":\"43212565\",\"client\":\"Sofía Micaela Vargas Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0225\",\"dt\":\"2026-01-19 15:50\",\"dni\":\"77136189\",\"client\":\"Camila Micaela Pérez Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0226\",\"dt\":\"2026-01-19 16:10\",\"dni\":\"74382322\",\"client\":\"María Micaela Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0227\",\"dt\":\"2026-01-19 16:27\",\"dni\":\"70175898\",\"client\":\"Valeria Victoria Quispe Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0228\",\"dt\":\"2026-01-19 16:30\",\"dni\":\"69079410\",\"client\":\"Valeria Fernanda Vargas Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0230\",\"dt\":\"2026-01-19 16:55\",\"dni\":\"62048181\",\"client\":\"Andrea Martina Vargas Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0231\",\"dt\":\"2026-01-20 10:36\",\"dni\":\"70109689\",\"client\":\"Andrea Isabella Gómez Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0232\",\"dt\":\"2026-01-20 10:43\",\"dni\":\"54392049\",\"client\":\"Sofía Martina Flores Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0233\",\"dt\":\"2026-01-20 11:15\",\"dni\":\"71860474\",\"client\":\"Andrea Beatriz Mamani Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0234\",\"dt\":\"2026-01-20 11:31\",\"dni\":\"75554727\",\"client\":\"Andrea Fernanda Vargas Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0235\",\"dt\":\"2026-01-20 11:32\",\"dni\":\"51239099\",\"client\":\"Andrea Carolina Mamani Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0236\",\"dt\":\"2026-01-20 11:59\",\"dni\":\"40207785\",\"client\":\"Camila Fernanda Condori Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0237\",\"dt\":\"2026-01-20 12:05\",\"dni\":\"49937780\",\"client\":\"María Isabella Vargas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0239\",\"dt\":\"2026-01-20 12:26\",\"dni\":\"74975941\",\"client\":\"Ana Alejandra Mamani Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0243\",\"dt\":\"2026-01-20 17:26\",\"dni\":\"57673953\",\"client\":\"Daniela Carolina Pérez Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0244\",\"dt\":\"2026-01-20 18:55\",\"dni\":\"46480658\",\"client\":\"Lucía Beatriz Mendoza Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0245\",\"dt\":\"2026-01-21 11:09\",\"dni\":\"71477768\",\"client\":\"Valeria Julieta Condori Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0247\",\"dt\":\"2026-01-21 14:02\",\"dni\":\"56966556\",\"client\":\"Andrea Alejandra Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0248\",\"dt\":\"2026-01-21 14:14\",\"dni\":\"72641643\",\"client\":\"Sofía Beatriz Mendoza Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0249\",\"dt\":\"2026-01-21 14:22\",\"dni\":\"46480658\",\"client\":\"Lucía Beatriz Mendoza Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0250\",\"dt\":\"2026-01-21 14:38\",\"dni\":\"77276434\",\"client\":\"Elena Julieta Mendoza Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0251\",\"dt\":\"2026-01-21 14:58\",\"dni\":\"64172107\",\"client\":\"Ana Beatriz Pérez Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0252\",\"dt\":\"2026-01-21 15:48\",\"dni\":\"42332885\",\"client\":\"Ana Carolina Vargas Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0253\",\"dt\":\"2026-01-21 16:37\",\"dni\":\"46480658\",\"client\":\"Lucía Beatriz Mendoza Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0255\",\"dt\":\"2026-01-22 12:28\",\"dni\":\"51697165\",\"client\":\"Sofía Beatriz Rojas Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0256\",\"dt\":\"2026-01-22 13:19\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0258\",\"dt\":\"2026-01-22 15:14\",\"dni\":\"74382322\",\"client\":\"María Micaela Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0259\",\"dt\":\"2026-01-22 16:06\",\"dni\":\"54945827\",\"client\":\"Andrea Martina Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0260\",\"dt\":\"2026-01-22 16:18\",\"dni\":\"63837224\",\"client\":\"Valeria Beatriz Rojas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0261\",\"dt\":\"2026-01-22 16:57\",\"dni\":\"73552954\",\"client\":\"Ana Alejandra Rojas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0262\",\"dt\":\"2026-01-23 10:04\",\"dni\":\"41974829\",\"client\":\"Lucía Beatriz Flores Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0263\",\"dt\":\"2026-01-23 11:07\",\"dni\":\"49937780\",\"client\":\"María Isabella Vargas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0264\",\"dt\":\"2026-01-23 11:27\",\"dni\":\"62459061\",\"client\":\"Lucía Micaela Condori Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0266\",\"dt\":\"2026-01-23 12:43\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0267\",\"dt\":\"2026-01-23 13:35\",\"dni\":\"50077279\",\"client\":\"Sofía Beatriz Silva Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0268\",\"dt\":\"2026-01-23 14:02\",\"dni\":\"65004530\",\"client\":\"Lucía Julieta Quispe Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0269\",\"dt\":\"2026-01-23 15:47\",\"dni\":\"51697165\",\"client\":\"Sofía Beatriz Rojas Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0270\",\"dt\":\"2026-01-23 17:56\",\"dni\":\"50708593\",\"client\":\"Elena Martina Flores Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0272\",\"dt\":\"2026-01-24 11:16\",\"dni\":\"75554727\",\"client\":\"Andrea Fernanda Vargas Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0273\",\"dt\":\"2026-01-24 11:51\",\"dni\":\"47379247\",\"client\":\"Lucía Micaela Rojas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0275\",\"dt\":\"2026-01-24 14:25\",\"dni\":\"68836404\",\"client\":\"Gabriela Paula Condori Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0279\",\"dt\":\"2026-01-24 16:49\",\"dni\":\"70555498\",\"client\":\"Gabriela Beatriz Quispe Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0280\",\"dt\":\"2026-01-24 17:17\",\"dni\":\"70015641\",\"client\":\"Daniela Isabella Silva Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0281\",\"dt\":\"2026-01-24 17:27\",\"dni\":\"41224436\",\"client\":\"Ana Paula Mamani Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0283\",\"dt\":\"2026-01-24 18:37\",\"dni\":\"56614669\",\"client\":\"Ana Fernanda Silva Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0284\",\"dt\":\"2026-01-24 18:47\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0286\",\"dt\":\"2026-01-25 13:28\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0287\",\"dt\":\"2026-01-25 13:51\",\"dni\":\"44996654\",\"client\":\"Andrea Martina Pérez Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0288\",\"dt\":\"2026-01-25 14:36\",\"dni\":\"69953745\",\"client\":\"Daniela Isabella Silva Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0292\",\"dt\":\"2026-01-25 17:21\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0293\",\"dt\":\"2026-01-25 18:19\",\"dni\":\"69507277\",\"client\":\"Gabriela Martina Flores Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0294\",\"dt\":\"2026-01-26 10:06\",\"dni\":\"73264145\",\"client\":\"Ana Alejandra Gómez Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0295\",\"dt\":\"2026-01-26 14:08\",\"dni\":\"51866378\",\"client\":\"Gabriela Isabella Silva Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0296\",\"dt\":\"2026-01-26 14:13\",\"dni\":\"50216436\",\"client\":\"Gabriela Carolina Rojas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0297\",\"dt\":\"2026-01-26 14:16\",\"dni\":\"42622617\",\"client\":\"Elena Fernanda Vargas Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0298\",\"dt\":\"2026-01-26 14:23\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0300\",\"dt\":\"2026-01-26 18:34\",\"dni\":\"70082741\",\"client\":\"Valeria Martina Quispe Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0301\",\"dt\":\"2026-01-27 11:10\",\"dni\":\"71860474\",\"client\":\"Andrea Beatriz Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0303\",\"dt\":\"2026-01-27 11:23\",\"dni\":\"69079410\",\"client\":\"Valeria Fernanda Vargas Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0304\",\"dt\":\"2026-01-27 11:47\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0305\",\"dt\":\"2026-01-27 12:10\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0306\",\"dt\":\"2026-01-27 16:05\",\"dni\":\"46992959\",\"client\":\"Daniela Micaela Gómez Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0307\",\"dt\":\"2026-01-27 18:32\",\"dni\":\"77136189\",\"client\":\"Camila Micaela Pérez Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0308\",\"dt\":\"2026-01-27 18:36\",\"dni\":\"63117162\",\"client\":\"Lucía Fernanda Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0309\",\"dt\":\"2026-01-28 10:06\",\"dni\":\"53641499\",\"client\":\"Andrea Victoria Rojas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0310\",\"dt\":\"2026-01-28 10:17\",\"dni\":\"53684780\",\"client\":\"Andrea Alejandra Mendoza Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0311\",\"dt\":\"2026-01-28 10:29\",\"dni\":\"43212565\",\"client\":\"Sofía Micaela Vargas Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0312\",\"dt\":\"2026-01-28 12:53\",\"dni\":\"54945827\",\"client\":\"Andrea Martina Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0314\",\"dt\":\"2026-01-28 15:08\",\"dni\":\"46532941\",\"client\":\"Daniela Martina Mendoza Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0315\",\"dt\":\"2026-01-28 16:16\",\"dni\":\"46992959\",\"client\":\"Daniela Micaela Gómez Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0316\",\"dt\":\"2026-01-28 18:06\",\"dni\":\"67118707\",\"client\":\"Valeria Beatriz Mamani Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0318\",\"dt\":\"2026-01-28 18:44\",\"dni\":\"40207785\",\"client\":\"Camila Fernanda Condori Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0319\",\"dt\":\"2026-01-29 10:13\",\"dni\":\"43631228\",\"client\":\"Gabriela Beatriz Quispe Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0320\",\"dt\":\"2026-01-29 11:57\",\"dni\":\"69736491\",\"client\":\"Camila Victoria Mamani Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0321\",\"dt\":\"2026-01-29 13:52\",\"dni\":\"71982612\",\"client\":\"Andrea Fernanda Flores Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0322\",\"dt\":\"2026-01-29 14:51\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0323\",\"dt\":\"2026-01-29 15:08\",\"dni\":\"51697165\",\"client\":\"Sofía Beatriz Rojas Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0324\",\"dt\":\"2026-01-29 15:46\",\"dni\":\"60635828\",\"client\":\"Daniela Carolina Gómez Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0325\",\"dt\":\"2026-01-29 15:47\",\"dni\":\"47976246\",\"client\":\"Gabriela Julieta Quispe Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0326\",\"dt\":\"2026-01-29 17:59\",\"dni\":\"46532941\",\"client\":\"Daniela Martina Mendoza Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0327\",\"dt\":\"2026-01-30 10:51\",\"dni\":\"72641643\",\"client\":\"Sofía Beatriz Mendoza Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0328\",\"dt\":\"2026-01-30 11:44\",\"dni\":\"48882341\",\"client\":\"María Alejandra Gómez Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0330\",\"dt\":\"2026-01-30 13:50\",\"dni\":\"75916672\",\"client\":\"Lucía Paula Quispe Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0334\",\"dt\":\"2026-01-30 15:34\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0336\",\"dt\":\"2026-01-30 15:56\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0338\",\"dt\":\"2026-01-30 16:56\",\"dni\":\"65223527\",\"client\":\"Gabriela Carolina Silva Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0339\",\"dt\":\"2026-01-31 10:33\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0340\",\"dt\":\"2026-01-31 11:02\",\"dni\":\"71860474\",\"client\":\"Andrea Beatriz Mamani Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0341\",\"dt\":\"2026-01-31 12:32\",\"dni\":\"77136189\",\"client\":\"Camila Micaela Pérez Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0343\",\"dt\":\"2026-01-31 12:35\",\"dni\":\"42332885\",\"client\":\"Ana Carolina Vargas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0344\",\"dt\":\"2026-01-31 16:47\",\"dni\":\"68036951\",\"client\":\"Ana Martina Condori Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0346\",\"dt\":\"2026-01-31 17:55\",\"dni\":\"47395044\",\"client\":\"María Isabella Gómez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0350\",\"dt\":\"2026-02-01 13:41\",\"dni\":\"43925078\",\"client\":\"Elena Beatriz Quispe Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0351\",\"dt\":\"2026-02-01 13:59\",\"dni\":\"72017068\",\"client\":\"Gabriela Martina Condori Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0353\",\"dt\":\"2026-02-01 14:12\",\"dni\":\"50090074\",\"client\":\"Lucía Victoria Quispe Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0354\",\"dt\":\"2026-02-01 16:32\",\"dni\":\"44996654\",\"client\":\"Andrea Martina Pérez Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0355\",\"dt\":\"2026-02-01 16:37\",\"dni\":\"60813031\",\"client\":\"Camila Isabella Mamani Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0357\",\"dt\":\"2026-02-01 16:54\",\"dni\":\"50794302\",\"client\":\"Valeria Martina Pérez Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0358\",\"dt\":\"2026-02-01 17:30\",\"dni\":\"66661604\",\"client\":\"Valeria Micaela Flores Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0359\",\"dt\":\"2026-02-01 18:39\",\"dni\":\"71725896\",\"client\":\"María Paula Vargas Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0361\",\"dt\":\"2026-02-02 11:31\",\"dni\":\"51788360\",\"client\":\"Valeria Martina Gómez Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0363\",\"dt\":\"2026-02-02 12:14\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0364\",\"dt\":\"2026-02-02 12:42\",\"dni\":\"78921743\",\"client\":\"Valeria Victoria Silva Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0365\",\"dt\":\"2026-02-02 12:49\",\"dni\":\"50078222\",\"client\":\"Gabriela Micaela Silva Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0369\",\"dt\":\"2026-02-02 15:26\",\"dni\":\"48194623\",\"client\":\"Elena Fernanda Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0370\",\"dt\":\"2026-02-02 15:40\",\"dni\":\"69507277\",\"client\":\"Gabriela Martina Flores Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0372\",\"dt\":\"2026-02-02 17:06\",\"dni\":\"47379247\",\"client\":\"Lucía Micaela Rojas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0373\",\"dt\":\"2026-02-02 17:10\",\"dni\":\"77294971\",\"client\":\"Lucía Fernanda Condori Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0374\",\"dt\":\"2026-02-02 17:52\",\"dni\":\"72642106\",\"client\":\"Elena Isabella Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0375\",\"dt\":\"2026-02-03 10:41\",\"dni\":\"65472150\",\"client\":\"María Paula Condori Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0378\",\"dt\":\"2026-02-03 14:47\",\"dni\":\"41974829\",\"client\":\"Lucía Beatriz Flores Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0379\",\"dt\":\"2026-02-03 15:53\",\"dni\":\"48564493\",\"client\":\"Ana Isabella Vargas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0380\",\"dt\":\"2026-02-03 16:52\",\"dni\":\"73491603\",\"client\":\"Sofía Alejandra Rojas Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0381\",\"dt\":\"2026-02-03 17:01\",\"dni\":\"77136189\",\"client\":\"Camila Micaela Pérez Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0382\",\"dt\":\"2026-02-03 17:19\",\"dni\":\"66694609\",\"client\":\"Andrea Paula Quispe Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0383\",\"dt\":\"2026-02-03 18:30\",\"dni\":\"74975941\",\"client\":\"Ana Alejandra Mamani Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0386\",\"dt\":\"2026-02-04 13:55\",\"dni\":\"47847155\",\"client\":\"Valeria Beatriz Silva Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0388\",\"dt\":\"2026-02-04 16:00\",\"dni\":\"50078222\",\"client\":\"Gabriela Micaela Silva Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0390\",\"dt\":\"2026-02-05 10:03\",\"dni\":\"50090074\",\"client\":\"Lucía Victoria Quispe Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0391\",\"dt\":\"2026-02-05 10:29\",\"dni\":\"75554727\",\"client\":\"Andrea Fernanda Vargas Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0392\",\"dt\":\"2026-02-05 10:51\",\"dni\":\"45289098\",\"client\":\"Lucía Paula Vargas Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0393\",\"dt\":\"2026-02-05 10:52\",\"dni\":\"68533084\",\"client\":\"Andrea Julieta Mendoza Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0394\",\"dt\":\"2026-02-05 11:03\",\"dni\":\"40267712\",\"client\":\"Sofía Isabella Gómez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0395\",\"dt\":\"2026-02-05 11:28\",\"dni\":\"60635828\",\"client\":\"Daniela Carolina Gómez Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0396\",\"dt\":\"2026-02-05 12:02\",\"dni\":\"50216436\",\"client\":\"Gabriela Carolina Rojas Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0398\",\"dt\":\"2026-02-05 13:31\",\"dni\":\"74382322\",\"client\":\"María Micaela Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0400\",\"dt\":\"2026-02-05 14:22\",\"dni\":\"41974829\",\"client\":\"Lucía Beatriz Flores Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0401\",\"dt\":\"2026-02-05 14:49\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0402\",\"dt\":\"2026-02-05 15:08\",\"dni\":\"49688401\",\"client\":\"Ana Micaela Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0403\",\"dt\":\"2026-02-05 17:00\",\"dni\":\"56966556\",\"client\":\"Andrea Alejandra Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0404\",\"dt\":\"2026-02-05 18:17\",\"dni\":\"47847155\",\"client\":\"Valeria Beatriz Silva Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0408\",\"dt\":\"2026-02-06 11:45\",\"dni\":\"68471632\",\"client\":\"Andrea Isabella Mamani Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0409\",\"dt\":\"2026-02-06 12:33\",\"dni\":\"70109689\",\"client\":\"Andrea Isabella Gómez Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0412\",\"dt\":\"2026-02-06 17:32\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0413\",\"dt\":\"2026-02-06 18:04\",\"dni\":\"41151546\",\"client\":\"Elena Martina Flores Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0414\",\"dt\":\"2026-02-07 10:18\",\"dni\":\"43925078\",\"client\":\"Elena Beatriz Quispe Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0416\",\"dt\":\"2026-02-07 12:02\",\"dni\":\"68471632\",\"client\":\"Andrea Isabella Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0418\",\"dt\":\"2026-02-07 13:34\",\"dni\":\"41974829\",\"client\":\"Lucía Beatriz Flores Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0419\",\"dt\":\"2026-02-07 13:56\",\"dni\":\"66661604\",\"client\":\"Valeria Micaela Flores Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0420\",\"dt\":\"2026-02-07 15:11\",\"dni\":\"65533911\",\"client\":\"Valeria Julieta Mamani Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0421\",\"dt\":\"2026-02-07 15:29\",\"dni\":\"69953745\",\"client\":\"Daniela Isabella Silva Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0422\",\"dt\":\"2026-02-07 16:03\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0423\",\"dt\":\"2026-02-07 17:29\",\"dni\":\"52213730\",\"client\":\"Daniela Isabella Mendoza Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0424\",\"dt\":\"2026-02-07 18:37\",\"dni\":\"56286583\",\"client\":\"Lucía Carolina Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0425\",\"dt\":\"2026-02-08 10:09\",\"dni\":\"40605089\",\"client\":\"Valeria Victoria Condori Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0426\",\"dt\":\"2026-02-08 10:13\",\"dni\":\"77294971\",\"client\":\"Lucía Fernanda Condori Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0428\",\"dt\":\"2026-02-08 11:30\",\"dni\":\"77051356\",\"client\":\"Daniela Martina Quispe Soto\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0429\",\"dt\":\"2026-02-08 11:49\",\"dni\":\"50090074\",\"client\":\"Lucía Victoria Quispe Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0430\",\"dt\":\"2026-02-08 12:01\",\"dni\":\"56966556\",\"client\":\"Andrea Alejandra Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0432\",\"dt\":\"2026-02-08 12:29\",\"dni\":\"46702182\",\"client\":\"Daniela Martina Vargas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0435\",\"dt\":\"2026-02-08 13:36\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0436\",\"dt\":\"2026-02-08 14:09\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0437\",\"dt\":\"2026-02-08 15:50\",\"dni\":\"40207785\",\"client\":\"Camila Fernanda Condori Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0440\",\"dt\":\"2026-02-08 16:05\",\"dni\":\"65223527\",\"client\":\"Gabriela Carolina Silva Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0442\",\"dt\":\"2026-02-09 13:21\",\"dni\":\"79059848\",\"client\":\"Lucía Isabella Pérez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0443\",\"dt\":\"2026-02-09 14:13\",\"dni\":\"66694609\",\"client\":\"Andrea Paula Quispe Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0444\",\"dt\":\"2026-02-09 15:40\",\"dni\":\"52213730\",\"client\":\"Daniela Isabella Mendoza Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0445\",\"dt\":\"2026-02-09 16:44\",\"dni\":\"54508141\",\"client\":\"Valeria Martina Pérez Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0447\",\"dt\":\"2026-02-09 17:15\",\"dni\":\"63117162\",\"client\":\"Lucía Fernanda Pérez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0449\",\"dt\":\"2026-02-09 17:24\",\"dni\":\"42622617\",\"client\":\"Elena Fernanda Vargas Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0451\",\"dt\":\"2026-02-10 10:07\",\"dni\":\"73264145\",\"client\":\"Ana Alejandra Gómez Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0452\",\"dt\":\"2026-02-10 10:15\",\"dni\":\"40809849\",\"client\":\"Andrea Victoria Mendoza Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0453\",\"dt\":\"2026-02-10 11:15\",\"dni\":\"40267712\",\"client\":\"Sofía Isabella Gómez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0454\",\"dt\":\"2026-02-10 11:32\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0455\",\"dt\":\"2026-02-10 13:16\",\"dni\":\"51788360\",\"client\":\"Valeria Martina Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0456\",\"dt\":\"2026-02-10 15:24\",\"dni\":\"51866378\",\"client\":\"Gabriela Isabella Silva Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0458\",\"dt\":\"2026-02-10 16:01\",\"dni\":\"63117162\",\"client\":\"Lucía Fernanda Pérez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0459\",\"dt\":\"2026-02-10 16:20\",\"dni\":\"49937780\",\"client\":\"María Isabella Vargas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0461\",\"dt\":\"2026-02-10 17:59\",\"dni\":\"44996654\",\"client\":\"Andrea Martina Pérez Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0462\",\"dt\":\"2026-02-10 18:17\",\"dni\":\"47665698\",\"client\":\"Sofía Martina Condori Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0463\",\"dt\":\"2026-02-10 18:51\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0465\",\"dt\":\"2026-02-11 13:37\",\"dni\":\"53641499\",\"client\":\"Andrea Victoria Rojas Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0467\",\"dt\":\"2026-02-11 17:57\",\"dni\":\"48882341\",\"client\":\"María Alejandra Gómez Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0468\",\"dt\":\"2026-02-11 18:55\",\"dni\":\"71860474\",\"client\":\"Andrea Beatriz Mamani Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0469\",\"dt\":\"2026-02-12 11:00\",\"dni\":\"55481831\",\"client\":\"Ana Victoria Mamani Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0470\",\"dt\":\"2026-02-12 11:10\",\"dni\":\"75554727\",\"client\":\"Andrea Fernanda Vargas Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0472\",\"dt\":\"2026-02-12 11:58\",\"dni\":\"72017068\",\"client\":\"Gabriela Martina Condori Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0473\",\"dt\":\"2026-02-12 12:15\",\"dni\":\"53414801\",\"client\":\"Valeria Isabella Mamani Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0474\",\"dt\":\"2026-02-12 12:16\",\"dni\":\"45024695\",\"client\":\"Andrea Alejandra Quispe Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0475\",\"dt\":\"2026-02-12 12:28\",\"dni\":\"72658224\",\"client\":\"Ana Micaela Pérez Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0476\",\"dt\":\"2026-02-12 12:53\",\"dni\":\"48194623\",\"client\":\"Elena Fernanda Condori Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0477\",\"dt\":\"2026-02-12 13:25\",\"dni\":\"79955892\",\"client\":\"Camila Victoria Flores Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0478\",\"dt\":\"2026-02-12 14:00\",\"dni\":\"52286862\",\"client\":\"Gabriela Carolina Gómez Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0480\",\"dt\":\"2026-02-12 14:11\",\"dni\":\"72642106\",\"client\":\"Elena Isabella Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0482\",\"dt\":\"2026-02-12 15:53\",\"dni\":\"62048181\",\"client\":\"Andrea Martina Vargas Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0485\",\"dt\":\"2026-02-12 18:22\",\"dni\":\"71860474\",\"client\":\"Andrea Beatriz Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0486\",\"dt\":\"2026-02-12 18:44\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0487\",\"dt\":\"2026-02-12 18:48\",\"dni\":\"60635828\",\"client\":\"Daniela Carolina Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0489\",\"dt\":\"2026-02-13 13:32\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0491\",\"dt\":\"2026-02-13 14:37\",\"dni\":\"60904042\",\"client\":\"Lucía Paula Rojas Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0494\",\"dt\":\"2026-02-13 16:25\",\"dni\":\"54985579\",\"client\":\"Valeria Martina Gómez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0496\",\"dt\":\"2026-02-13 16:45\",\"dni\":\"61707922\",\"client\":\"Daniela Paula Mamani Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0497\",\"dt\":\"2026-02-13 16:52\",\"dni\":\"45289098\",\"client\":\"Lucía Paula Vargas Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0498\",\"dt\":\"2026-02-14 10:34\",\"dni\":\"60813031\",\"client\":\"Camila Isabella Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0499\",\"dt\":\"2026-02-14 15:33\",\"dni\":\"64145057\",\"client\":\"Lucía Martina Flores Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0500\",\"dt\":\"2026-02-14 16:04\",\"dni\":\"55481831\",\"client\":\"Ana Victoria Mamani Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0501\",\"dt\":\"2026-02-14 16:31\",\"dni\":\"53091216\",\"client\":\"María Victoria Quispe Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0505\",\"dt\":\"2026-02-15 13:24\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0506\",\"dt\":\"2026-02-15 17:20\",\"dni\":\"55481831\",\"client\":\"Ana Victoria Mamani Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0509\",\"dt\":\"2026-02-16 10:45\",\"dni\":\"77382306\",\"client\":\"Lucía Julieta Mamani Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0510\",\"dt\":\"2026-02-16 11:18\",\"dni\":\"56966556\",\"client\":\"Andrea Alejandra Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0514\",\"dt\":\"2026-02-16 14:35\",\"dni\":\"54392049\",\"client\":\"Sofía Martina Flores Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0515\",\"dt\":\"2026-02-16 14:35\",\"dni\":\"53641499\",\"client\":\"Andrea Victoria Rojas Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0516\",\"dt\":\"2026-02-16 15:13\",\"dni\":\"69507277\",\"client\":\"Gabriela Martina Flores Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0517\",\"dt\":\"2026-02-16 17:12\",\"dni\":\"71477768\",\"client\":\"Valeria Julieta Condori Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0519\",\"dt\":\"2026-02-17 10:55\",\"dni\":\"71725896\",\"client\":\"María Paula Vargas Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0520\",\"dt\":\"2026-02-17 11:38\",\"dni\":\"69736491\",\"client\":\"Camila Victoria Mamani Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0522\",\"dt\":\"2026-02-17 12:10\",\"dni\":\"73491603\",\"client\":\"Sofía Alejandra Rojas Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0525\",\"dt\":\"2026-02-17 12:53\",\"dni\":\"77382306\",\"client\":\"Lucía Julieta Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0527\",\"dt\":\"2026-02-17 13:26\",\"dni\":\"65004530\",\"client\":\"Lucía Julieta Quispe Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0528\",\"dt\":\"2026-02-17 15:11\",\"dni\":\"61707922\",\"client\":\"Daniela Paula Mamani Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0529\",\"dt\":\"2026-02-17 15:38\",\"dni\":\"71982612\",\"client\":\"Andrea Fernanda Flores Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0530\",\"dt\":\"2026-02-17 15:44\",\"dni\":\"74281272\",\"client\":\"Camila Fernanda Condori Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0531\",\"dt\":\"2026-02-17 16:19\",\"dni\":\"49789018\",\"client\":\"Andrea Beatriz Pérez Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0535\",\"dt\":\"2026-02-18 11:57\",\"dni\":\"48564493\",\"client\":\"Ana Isabella Vargas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0536\",\"dt\":\"2026-02-18 13:33\",\"dni\":\"53414801\",\"client\":\"Valeria Isabella Mamani Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0537\",\"dt\":\"2026-02-18 13:57\",\"dni\":\"41974829\",\"client\":\"Lucía Beatriz Flores Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0538\",\"dt\":\"2026-02-18 17:02\",\"dni\":\"42427329\",\"client\":\"Andrea Victoria Silva Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0539\",\"dt\":\"2026-02-18 17:38\",\"dni\":\"70175898\",\"client\":\"Valeria Victoria Quispe Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0540\",\"dt\":\"2026-02-18 18:56\",\"dni\":\"70408469\",\"client\":\"Andrea Carolina Vargas Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0541\",\"dt\":\"2026-02-19 10:00\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0543\",\"dt\":\"2026-02-19 11:44\",\"dni\":\"72862919\",\"client\":\"Lucía Isabella Flores Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0544\",\"dt\":\"2026-02-19 12:23\",\"dni\":\"74281272\",\"client\":\"Camila Fernanda Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0546\",\"dt\":\"2026-02-19 12:59\",\"dni\":\"70555498\",\"client\":\"Gabriela Beatriz Quispe Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0548\",\"dt\":\"2026-02-19 14:10\",\"dni\":\"53684780\",\"client\":\"Andrea Alejandra Mendoza Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0549\",\"dt\":\"2026-02-19 14:16\",\"dni\":\"51866378\",\"client\":\"Gabriela Isabella Silva Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0551\",\"dt\":\"2026-02-19 14:58\",\"dni\":\"58975668\",\"client\":\"Ana Micaela Quispe Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0552\",\"dt\":\"2026-02-19 15:43\",\"dni\":\"44255535\",\"client\":\"Ana Carolina Vargas Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0554\",\"dt\":\"2026-02-19 16:17\",\"dni\":\"75554727\",\"client\":\"Andrea Fernanda Vargas Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0558\",\"dt\":\"2026-02-20 10:40\",\"dni\":\"71458274\",\"client\":\"Camila Victoria Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0560\",\"dt\":\"2026-02-20 13:14\",\"dni\":\"66694609\",\"client\":\"Andrea Paula Quispe Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0561\",\"dt\":\"2026-02-20 14:53\",\"dni\":\"42172108\",\"client\":\"Valeria Martina Condori Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0562\",\"dt\":\"2026-02-20 15:10\",\"dni\":\"70095152\",\"client\":\"María Beatriz Silva Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0563\",\"dt\":\"2026-02-20 15:13\",\"dni\":\"47379247\",\"client\":\"Lucía Micaela Rojas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0564\",\"dt\":\"2026-02-20 17:11\",\"dni\":\"48202485\",\"client\":\"Daniela Paula Gómez Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0565\",\"dt\":\"2026-02-20 18:41\",\"dni\":\"56073964\",\"client\":\"Daniela Micaela Condori Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0566\",\"dt\":\"2026-02-20 18:45\",\"dni\":\"73491603\",\"client\":\"Sofía Alejandra Rojas Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0568\",\"dt\":\"2026-02-21 10:24\",\"dni\":\"51239099\",\"client\":\"Andrea Carolina Mamani Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0569\",\"dt\":\"2026-02-21 11:58\",\"dni\":\"40605089\",\"client\":\"Valeria Victoria Condori Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0571\",\"dt\":\"2026-02-21 15:35\",\"dni\":\"42622617\",\"client\":\"Elena Fernanda Vargas Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0573\",\"dt\":\"2026-02-21 16:01\",\"dni\":\"65472150\",\"client\":\"María Paula Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0574\",\"dt\":\"2026-02-21 17:43\",\"dni\":\"72487019\",\"client\":\"María Fernanda Quispe Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0575\",\"dt\":\"2026-02-21 18:12\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0576\",\"dt\":\"2026-02-21 18:15\",\"dni\":\"49688401\",\"client\":\"Ana Micaela Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0577\",\"dt\":\"2026-02-21 18:15\",\"dni\":\"74975941\",\"client\":\"Ana Alejandra Mamani Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0578\",\"dt\":\"2026-02-21 18:24\",\"dni\":\"71458274\",\"client\":\"Camila Victoria Pérez Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0580\",\"dt\":\"2026-02-22 10:11\",\"dni\":\"72487019\",\"client\":\"María Fernanda Quispe Soto\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0582\",\"dt\":\"2026-02-22 10:32\",\"dni\":\"61707922\",\"client\":\"Daniela Paula Mamani Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0584\",\"dt\":\"2026-02-22 13:05\",\"dni\":\"70555498\",\"client\":\"Gabriela Beatriz Quispe Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0585\",\"dt\":\"2026-02-22 14:12\",\"dni\":\"50078222\",\"client\":\"Gabriela Micaela Silva Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0586\",\"dt\":\"2026-02-22 15:44\",\"dni\":\"49688401\",\"client\":\"Ana Micaela Condori Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0588\",\"dt\":\"2026-02-22 16:33\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0589\",\"dt\":\"2026-02-22 18:10\",\"dni\":\"54508141\",\"client\":\"Valeria Martina Pérez Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0590\",\"dt\":\"2026-02-23 10:07\",\"dni\":\"40267712\",\"client\":\"Sofía Isabella Gómez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0591\",\"dt\":\"2026-02-23 10:52\",\"dni\":\"41414875\",\"client\":\"Sofía Fernanda Mendoza Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0592\",\"dt\":\"2026-02-23 12:18\",\"dni\":\"57673953\",\"client\":\"Daniela Carolina Pérez Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0593\",\"dt\":\"2026-02-23 15:58\",\"dni\":\"47395044\",\"client\":\"María Isabella Gómez Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0594\",\"dt\":\"2026-02-23 16:52\",\"dni\":\"61409818\",\"client\":\"Elena Victoria Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0595\",\"dt\":\"2026-02-23 17:01\",\"dni\":\"41151546\",\"client\":\"Elena Martina Flores Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0596\",\"dt\":\"2026-02-23 17:06\",\"dni\":\"72642106\",\"client\":\"Elena Isabella Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0597\",\"dt\":\"2026-02-24 10:01\",\"dni\":\"56073964\",\"client\":\"Daniela Micaela Condori Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0598\",\"dt\":\"2026-02-24 10:23\",\"dni\":\"77051356\",\"client\":\"Daniela Martina Quispe Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0600\",\"dt\":\"2026-02-24 10:59\",\"dni\":\"70408469\",\"client\":\"Andrea Carolina Vargas Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0602\",\"dt\":\"2026-02-24 13:00\",\"dni\":\"69736491\",\"client\":\"Camila Victoria Mamani Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0604\",\"dt\":\"2026-02-24 14:38\",\"dni\":\"64172107\",\"client\":\"Ana Beatriz Pérez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0605\",\"dt\":\"2026-02-24 15:32\",\"dni\":\"42831040\",\"client\":\"Andrea Fernanda Rojas Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0606\",\"dt\":\"2026-02-24 15:33\",\"dni\":\"50708593\",\"client\":\"Elena Martina Flores Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0608\",\"dt\":\"2026-02-24 17:05\",\"dni\":\"64145057\",\"client\":\"Lucía Martina Flores Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0609\",\"dt\":\"2026-02-24 17:37\",\"dni\":\"56073964\",\"client\":\"Daniela Micaela Condori Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0611\",\"dt\":\"2026-02-24 17:53\",\"dni\":\"70532655\",\"client\":\"Valeria Fernanda Silva Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0612\",\"dt\":\"2026-02-24 18:48\",\"dni\":\"50708593\",\"client\":\"Elena Martina Flores Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0614\",\"dt\":\"2026-02-25 11:37\",\"dni\":\"66661604\",\"client\":\"Valeria Micaela Flores Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0615\",\"dt\":\"2026-02-25 11:45\",\"dni\":\"50078222\",\"client\":\"Gabriela Micaela Silva Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0617\",\"dt\":\"2026-02-25 13:39\",\"dni\":\"42332885\",\"client\":\"Ana Carolina Vargas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0618\",\"dt\":\"2026-02-25 14:25\",\"dni\":\"68533084\",\"client\":\"Andrea Julieta Mendoza Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0619\",\"dt\":\"2026-02-25 16:10\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0620\",\"dt\":\"2026-02-25 16:33\",\"dni\":\"50077279\",\"client\":\"Sofía Beatriz Silva Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0621\",\"dt\":\"2026-02-25 17:44\",\"dni\":\"69079410\",\"client\":\"Valeria Fernanda Vargas Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0622\",\"dt\":\"2026-02-25 17:50\",\"dni\":\"59036983\",\"client\":\"Valeria Julieta Vargas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0623\",\"dt\":\"2026-02-26 10:19\",\"dni\":\"54945827\",\"client\":\"Andrea Martina Mamani Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0625\",\"dt\":\"2026-02-26 11:52\",\"dni\":\"44486482\",\"client\":\"Valeria Alejandra Mamani Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0627\",\"dt\":\"2026-02-26 12:48\",\"dni\":\"53091216\",\"client\":\"María Victoria Quispe Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0629\",\"dt\":\"2026-02-26 15:25\",\"dni\":\"47665698\",\"client\":\"Sofía Martina Condori Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0630\",\"dt\":\"2026-02-26 16:34\",\"dni\":\"53684780\",\"client\":\"Andrea Alejandra Mendoza Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0632\",\"dt\":\"2026-02-27 10:29\",\"dni\":\"62459061\",\"client\":\"Lucía Micaela Condori Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0633\",\"dt\":\"2026-02-27 11:00\",\"dni\":\"60847849\",\"client\":\"Gabriela Victoria Rojas Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0635\",\"dt\":\"2026-02-27 12:29\",\"dni\":\"44486482\",\"client\":\"Valeria Alejandra Mamani Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0636\",\"dt\":\"2026-02-27 13:17\",\"dni\":\"51697165\",\"client\":\"Sofía Beatriz Rojas Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0637\",\"dt\":\"2026-02-27 13:19\",\"dni\":\"49688401\",\"client\":\"Ana Micaela Condori Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0638\",\"dt\":\"2026-02-27 13:27\",\"dni\":\"62048181\",\"client\":\"Andrea Martina Vargas Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0639\",\"dt\":\"2026-02-27 14:12\",\"dni\":\"66661604\",\"client\":\"Valeria Micaela Flores Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0640\",\"dt\":\"2026-02-27 15:13\",\"dni\":\"56073964\",\"client\":\"Daniela Micaela Condori Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0641\",\"dt\":\"2026-02-27 15:30\",\"dni\":\"50708593\",\"client\":\"Elena Martina Flores Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0643\",\"dt\":\"2026-02-27 16:39\",\"dni\":\"43631228\",\"client\":\"Gabriela Beatriz Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0644\",\"dt\":\"2026-02-27 17:03\",\"dni\":\"43631228\",\"client\":\"Gabriela Beatriz Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0645\",\"dt\":\"2026-02-27 17:09\",\"dni\":\"46992959\",\"client\":\"Daniela Micaela Gómez Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0647\",\"dt\":\"2026-02-28 13:40\",\"dni\":\"77051356\",\"client\":\"Daniela Martina Quispe Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0648\",\"dt\":\"2026-02-28 14:05\",\"dni\":\"69507277\",\"client\":\"Gabriela Martina Flores Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0649\",\"dt\":\"2026-02-28 15:01\",\"dni\":\"55481831\",\"client\":\"Ana Victoria Mamani Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0650\",\"dt\":\"2026-02-28 16:11\",\"dni\":\"40207785\",\"client\":\"Camila Fernanda Condori Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0652\",\"dt\":\"2026-02-28 18:54\",\"dni\":\"65004530\",\"client\":\"Lucía Julieta Quispe Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0654\",\"dt\":\"2026-03-01 10:52\",\"dni\":\"41974829\",\"client\":\"Lucía Beatriz Flores Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0655\",\"dt\":\"2026-03-01 11:04\",\"dni\":\"50090074\",\"client\":\"Lucía Victoria Quispe Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0656\",\"dt\":\"2026-03-01 14:31\",\"dni\":\"72658224\",\"client\":\"Ana Micaela Pérez Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0657\",\"dt\":\"2026-03-01 15:17\",\"dni\":\"56073964\",\"client\":\"Daniela Micaela Condori Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0658\",\"dt\":\"2026-03-01 16:01\",\"dni\":\"42172108\",\"client\":\"Valeria Martina Condori Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0659\",\"dt\":\"2026-03-01 16:54\",\"dni\":\"79198074\",\"client\":\"Ana Fernanda Mendoza Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0660\",\"dt\":\"2026-03-01 17:36\",\"dni\":\"69736491\",\"client\":\"Camila Victoria Mamani Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0661\",\"dt\":\"2026-03-01 18:11\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0662\",\"dt\":\"2026-03-01 18:41\",\"dni\":\"77382306\",\"client\":\"Lucía Julieta Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0664\",\"dt\":\"2026-03-02 12:57\",\"dni\":\"68836404\",\"client\":\"Gabriela Paula Condori Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0665\",\"dt\":\"2026-03-02 13:14\",\"dni\":\"48882341\",\"client\":\"María Alejandra Gómez Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0667\",\"dt\":\"2026-03-02 14:23\",\"dni\":\"70015641\",\"client\":\"Daniela Isabella Silva Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0668\",\"dt\":\"2026-03-02 16:38\",\"dni\":\"41151546\",\"client\":\"Elena Martina Flores Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0669\",\"dt\":\"2026-03-02 17:02\",\"dni\":\"70175898\",\"client\":\"Valeria Victoria Quispe Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0670\",\"dt\":\"2026-03-02 17:14\",\"dni\":\"74281272\",\"client\":\"Camila Fernanda Condori Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0673\",\"dt\":\"2026-03-02 18:05\",\"dni\":\"40267712\",\"client\":\"Sofía Isabella Gómez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0674\",\"dt\":\"2026-03-02 18:10\",\"dni\":\"52213730\",\"client\":\"Daniela Isabella Mendoza Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0676\",\"dt\":\"2026-03-03 10:32\",\"dni\":\"70532655\",\"client\":\"Valeria Fernanda Silva Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0679\",\"dt\":\"2026-03-03 11:54\",\"dni\":\"73264145\",\"client\":\"Ana Alejandra Gómez Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0680\",\"dt\":\"2026-03-03 13:58\",\"dni\":\"62459061\",\"client\":\"Lucía Micaela Condori Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0681\",\"dt\":\"2026-03-03 15:00\",\"dni\":\"69530563\",\"client\":\"Daniela Carolina Vargas Soto\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0683\",\"dt\":\"2026-03-03 18:45\",\"dni\":\"40392266\",\"client\":\"Elena Micaela Mendoza Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0685\",\"dt\":\"2026-03-04 11:22\",\"dni\":\"70015641\",\"client\":\"Daniela Isabella Silva Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0687\",\"dt\":\"2026-03-04 13:00\",\"dni\":\"74281272\",\"client\":\"Camila Fernanda Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0689\",\"dt\":\"2026-03-04 15:49\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0691\",\"dt\":\"2026-03-05 10:46\",\"dni\":\"50859676\",\"client\":\"Ana Fernanda Rojas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0692\",\"dt\":\"2026-03-05 11:18\",\"dni\":\"61409818\",\"client\":\"Elena Victoria Quispe Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0693\",\"dt\":\"2026-03-05 12:10\",\"dni\":\"79955892\",\"client\":\"Camila Victoria Flores Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0694\",\"dt\":\"2026-03-05 12:15\",\"dni\":\"54392049\",\"client\":\"Sofía Martina Flores Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0695\",\"dt\":\"2026-03-05 12:54\",\"dni\":\"70644464\",\"client\":\"Ana Beatriz Quispe Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0698\",\"dt\":\"2026-03-05 15:20\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0699\",\"dt\":\"2026-03-05 15:53\",\"dni\":\"56614669\",\"client\":\"Ana Fernanda Silva Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0702\",\"dt\":\"2026-03-05 17:03\",\"dni\":\"49937780\",\"client\":\"María Isabella Vargas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0703\",\"dt\":\"2026-03-06 11:33\",\"dni\":\"46532941\",\"client\":\"Daniela Martina Mendoza Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0704\",\"dt\":\"2026-03-06 13:21\",\"dni\":\"72641643\",\"client\":\"Sofía Beatriz Mendoza Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0705\",\"dt\":\"2026-03-06 14:04\",\"dni\":\"53641499\",\"client\":\"Andrea Victoria Rojas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0706\",\"dt\":\"2026-03-06 15:00\",\"dni\":\"73552954\",\"client\":\"Ana Alejandra Rojas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0707\",\"dt\":\"2026-03-06 15:36\",\"dni\":\"70095152\",\"client\":\"María Beatriz Silva Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0708\",\"dt\":\"2026-03-06 16:04\",\"dni\":\"53414801\",\"client\":\"Valeria Isabella Mamani Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0710\",\"dt\":\"2026-03-06 17:32\",\"dni\":\"40809849\",\"client\":\"Andrea Victoria Mendoza Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0711\",\"dt\":\"2026-03-06 18:01\",\"dni\":\"54945827\",\"client\":\"Andrea Martina Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0712\",\"dt\":\"2026-03-06 18:33\",\"dni\":\"59036983\",\"client\":\"Valeria Julieta Vargas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0715\",\"dt\":\"2026-03-07 11:28\",\"dni\":\"40605089\",\"client\":\"Valeria Victoria Condori Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0716\",\"dt\":\"2026-03-07 12:21\",\"dni\":\"75916672\",\"client\":\"Lucía Paula Quispe Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0717\",\"dt\":\"2026-03-07 12:44\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0721\",\"dt\":\"2026-03-07 15:31\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0722\",\"dt\":\"2026-03-07 16:00\",\"dni\":\"49970558\",\"client\":\"Andrea Isabella Pérez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0723\",\"dt\":\"2026-03-07 16:19\",\"dni\":\"50090074\",\"client\":\"Lucía Victoria Quispe Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0724\",\"dt\":\"2026-03-07 16:50\",\"dni\":\"44486482\",\"client\":\"Valeria Alejandra Mamani Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0725\",\"dt\":\"2026-03-07 17:04\",\"dni\":\"41224436\",\"client\":\"Ana Paula Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0726\",\"dt\":\"2026-03-07 18:09\",\"dni\":\"44255535\",\"client\":\"Ana Carolina Vargas Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0727\",\"dt\":\"2026-03-07 18:21\",\"dni\":\"49688401\",\"client\":\"Ana Micaela Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0728\",\"dt\":\"2026-03-08 10:25\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0729\",\"dt\":\"2026-03-08 11:36\",\"dni\":\"40392266\",\"client\":\"Elena Micaela Mendoza Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0731\",\"dt\":\"2026-03-08 12:20\",\"dni\":\"47395044\",\"client\":\"María Isabella Gómez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0732\",\"dt\":\"2026-03-08 13:51\",\"dni\":\"72658224\",\"client\":\"Ana Micaela Pérez Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0733\",\"dt\":\"2026-03-08 14:48\",\"dni\":\"72017068\",\"client\":\"Gabriela Martina Condori Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0734\",\"dt\":\"2026-03-08 15:14\",\"dni\":\"78921743\",\"client\":\"Valeria Victoria Silva Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0736\",\"dt\":\"2026-03-08 17:27\",\"dni\":\"68471632\",\"client\":\"Andrea Isabella Mamani Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0737\",\"dt\":\"2026-03-08 18:36\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0739\",\"dt\":\"2026-03-09 12:33\",\"dni\":\"69507277\",\"client\":\"Gabriela Martina Flores Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0740\",\"dt\":\"2026-03-09 13:17\",\"dni\":\"70095152\",\"client\":\"María Beatriz Silva Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0743\",\"dt\":\"2026-03-09 15:25\",\"dni\":\"67118707\",\"client\":\"Valeria Beatriz Mamani Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0745\",\"dt\":\"2026-03-10 10:48\",\"dni\":\"51973877\",\"client\":\"Gabriela Beatriz Pérez Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0747\",\"dt\":\"2026-03-10 11:20\",\"dni\":\"41414875\",\"client\":\"Sofía Fernanda Mendoza Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0748\",\"dt\":\"2026-03-10 14:53\",\"dni\":\"70015641\",\"client\":\"Daniela Isabella Silva Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0749\",\"dt\":\"2026-03-10 15:06\",\"dni\":\"52286862\",\"client\":\"Gabriela Carolina Gómez Castro\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0750\",\"dt\":\"2026-03-10 15:44\",\"dni\":\"53414801\",\"client\":\"Valeria Isabella Mamani Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0751\",\"dt\":\"2026-03-10 15:53\",\"dni\":\"50090074\",\"client\":\"Lucía Victoria Quispe Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0753\",\"dt\":\"2026-03-10 18:20\",\"dni\":\"77294971\",\"client\":\"Lucía Fernanda Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0756\",\"dt\":\"2026-03-11 11:42\",\"dni\":\"48564493\",\"client\":\"Ana Isabella Vargas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0757\",\"dt\":\"2026-03-11 11:51\",\"dni\":\"56286583\",\"client\":\"Lucía Carolina Pérez Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":7,\"base\":266.95,\"igv\":48.05,\"totalS\":315,\"netUsd\":77.6,\"cashUsd\":91.57,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0759\",\"dt\":\"2026-03-11 12:28\",\"dni\":\"50078222\",\"client\":\"Gabriela Micaela Silva Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0761\",\"dt\":\"2026-03-11 13:45\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0764\",\"dt\":\"2026-03-11 16:09\",\"dni\":\"41550856\",\"client\":\"Andrea Micaela Rojas Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0765\",\"dt\":\"2026-03-11 17:01\",\"dni\":\"69079410\",\"client\":\"Valeria Fernanda Vargas Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0766\",\"dt\":\"2026-03-11 17:16\",\"dni\":\"46532941\",\"client\":\"Daniela Martina Mendoza Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0768\",\"dt\":\"2026-03-12 10:29\",\"dni\":\"73552954\",\"client\":\"Ana Alejandra Rojas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0769\",\"dt\":\"2026-03-12 10:35\",\"dni\":\"41224436\",\"client\":\"Ana Paula Mamani Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0770\",\"dt\":\"2026-03-12 10:38\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0771\",\"dt\":\"2026-03-12 12:22\",\"dni\":\"58772776\",\"client\":\"Valeria Martina Mamani Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0772\",\"dt\":\"2026-03-12 12:23\",\"dni\":\"55481831\",\"client\":\"Ana Victoria Mamani Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0774\",\"dt\":\"2026-03-12 13:10\",\"dni\":\"68471632\",\"client\":\"Andrea Isabella Mamani Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0775\",\"dt\":\"2026-03-12 13:23\",\"dni\":\"69530563\",\"client\":\"Daniela Carolina Vargas Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0776\",\"dt\":\"2026-03-12 14:44\",\"dni\":\"56966556\",\"client\":\"Andrea Alejandra Condori Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0777\",\"dt\":\"2026-03-12 14:50\",\"dni\":\"68533084\",\"client\":\"Andrea Julieta Mendoza Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0778\",\"dt\":\"2026-03-12 15:43\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0779\",\"dt\":\"2026-03-12 17:09\",\"dni\":\"75916672\",\"client\":\"Lucía Paula Quispe Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0780\",\"dt\":\"2026-03-12 18:03\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0781\",\"dt\":\"2026-03-13 10:01\",\"dni\":\"48194623\",\"client\":\"Elena Fernanda Condori Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0782\",\"dt\":\"2026-03-13 10:26\",\"dni\":\"74281272\",\"client\":\"Camila Fernanda Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0784\",\"dt\":\"2026-03-13 12:16\",\"dni\":\"41414875\",\"client\":\"Sofía Fernanda Mendoza Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0786\",\"dt\":\"2026-03-13 12:39\",\"dni\":\"65004530\",\"client\":\"Lucía Julieta Quispe Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0790\",\"dt\":\"2026-03-13 14:49\",\"dni\":\"62459061\",\"client\":\"Lucía Micaela Condori Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0791\",\"dt\":\"2026-03-13 15:12\",\"dni\":\"49789018\",\"client\":\"Andrea Beatriz Pérez Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0793\",\"dt\":\"2026-03-13 16:05\",\"dni\":\"65673971\",\"client\":\"Daniela Paula Condori Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0794\",\"dt\":\"2026-03-13 16:44\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0795\",\"dt\":\"2026-03-13 17:57\",\"dni\":\"54985579\",\"client\":\"Valeria Martina Gómez Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0796\",\"dt\":\"2026-03-14 10:04\",\"dni\":\"72642106\",\"client\":\"Elena Isabella Gómez Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0798\",\"dt\":\"2026-03-14 10:59\",\"dni\":\"48564493\",\"client\":\"Ana Isabella Vargas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0800\",\"dt\":\"2026-03-14 11:32\",\"dni\":\"50077279\",\"client\":\"Sofía Beatriz Silva Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0802\",\"dt\":\"2026-03-14 11:56\",\"dni\":\"66661604\",\"client\":\"Valeria Micaela Flores Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0803\",\"dt\":\"2026-03-14 12:47\",\"dni\":\"42332885\",\"client\":\"Ana Carolina Vargas Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0804\",\"dt\":\"2026-03-14 12:50\",\"dni\":\"64172107\",\"client\":\"Ana Beatriz Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0809\",\"dt\":\"2026-03-14 14:14\",\"dni\":\"70175898\",\"client\":\"Valeria Victoria Quispe Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0810\",\"dt\":\"2026-03-14 14:32\",\"dni\":\"41224436\",\"client\":\"Ana Paula Mamani Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0811\",\"dt\":\"2026-03-14 15:45\",\"dni\":\"48202485\",\"client\":\"Daniela Paula Gómez Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0812\",\"dt\":\"2026-03-14 16:04\",\"dni\":\"71458274\",\"client\":\"Camila Victoria Pérez Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0813\",\"dt\":\"2026-03-14 17:01\",\"dni\":\"72641643\",\"client\":\"Sofía Beatriz Mendoza Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0814\",\"dt\":\"2026-03-14 17:24\",\"dni\":\"65472150\",\"client\":\"María Paula Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0816\",\"dt\":\"2026-03-14 18:22\",\"dni\":\"70175898\",\"client\":\"Valeria Victoria Quispe Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0820\",\"dt\":\"2026-03-15 15:11\",\"dni\":\"57673953\",\"client\":\"Daniela Carolina Pérez Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0821\",\"dt\":\"2026-03-15 16:33\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0822\",\"dt\":\"2026-03-15 16:57\",\"dni\":\"43212565\",\"client\":\"Sofía Micaela Vargas Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0823\",\"dt\":\"2026-03-15 18:05\",\"dni\":\"71458274\",\"client\":\"Camila Victoria Pérez Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0824\",\"dt\":\"2026-03-15 18:05\",\"dni\":\"79198074\",\"client\":\"Ana Fernanda Mendoza Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0825\",\"dt\":\"2026-03-15 18:50\",\"dni\":\"53091216\",\"client\":\"María Victoria Quispe Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0827\",\"dt\":\"2026-03-15 18:57\",\"dni\":\"42427329\",\"client\":\"Andrea Victoria Silva Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0828\",\"dt\":\"2026-03-16 10:12\",\"dni\":\"49789018\",\"client\":\"Andrea Beatriz Pérez Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0831\",\"dt\":\"2026-03-16 12:15\",\"dni\":\"43212565\",\"client\":\"Sofía Micaela Vargas Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0832\",\"dt\":\"2026-03-16 12:18\",\"dni\":\"77382306\",\"client\":\"Lucía Julieta Mamani Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0835\",\"dt\":\"2026-03-16 13:21\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0836\",\"dt\":\"2026-03-16 13:48\",\"dni\":\"53091216\",\"client\":\"María Victoria Quispe Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0837\",\"dt\":\"2026-03-16 13:52\",\"dni\":\"69953745\",\"client\":\"Daniela Isabella Silva Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0838\",\"dt\":\"2026-03-16 14:02\",\"dni\":\"60635828\",\"client\":\"Daniela Carolina Gómez Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0839\",\"dt\":\"2026-03-16 16:01\",\"dni\":\"75916672\",\"client\":\"Lucía Paula Quispe Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0840\",\"dt\":\"2026-03-16 16:02\",\"dni\":\"40605089\",\"client\":\"Valeria Victoria Condori Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0841\",\"dt\":\"2026-03-16 16:22\",\"dni\":\"70175898\",\"client\":\"Valeria Victoria Quispe Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0842\",\"dt\":\"2026-03-16 16:45\",\"dni\":\"51697165\",\"client\":\"Sofía Beatriz Rojas Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0843\",\"dt\":\"2026-03-16 18:13\",\"dni\":\"77276434\",\"client\":\"Elena Julieta Mendoza Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0846\",\"dt\":\"2026-03-17 11:47\",\"dni\":\"51973877\",\"client\":\"Gabriela Beatriz Pérez Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0847\",\"dt\":\"2026-03-17 12:29\",\"dni\":\"51973877\",\"client\":\"Gabriela Beatriz Pérez Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0849\",\"dt\":\"2026-03-17 14:13\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0851\",\"dt\":\"2026-03-17 16:29\",\"dni\":\"79198074\",\"client\":\"Ana Fernanda Mendoza Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0852\",\"dt\":\"2026-03-17 16:33\",\"dni\":\"47395044\",\"client\":\"María Isabella Gómez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0853\",\"dt\":\"2026-03-17 17:26\",\"dni\":\"70109689\",\"client\":\"Andrea Isabella Gómez Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0854\",\"dt\":\"2026-03-17 17:49\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0855\",\"dt\":\"2026-03-17 18:20\",\"dni\":\"70321623\",\"client\":\"Ana Paula Rojas Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0856\",\"dt\":\"2026-03-17 18:31\",\"dni\":\"76023212\",\"client\":\"Sofía Julieta Pérez Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0857\",\"dt\":\"2026-03-18 10:05\",\"dni\":\"77136189\",\"client\":\"Camila Micaela Pérez Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0858\",\"dt\":\"2026-03-18 14:08\",\"dni\":\"52213730\",\"client\":\"Daniela Isabella Mendoza Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0859\",\"dt\":\"2026-03-18 14:40\",\"dni\":\"41759319\",\"client\":\"Sofía Carolina Pérez Soto\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0860\",\"dt\":\"2026-03-18 14:59\",\"dni\":\"74975941\",\"client\":\"Ana Alejandra Mamani Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0863\",\"dt\":\"2026-03-18 15:51\",\"dni\":\"52213730\",\"client\":\"Daniela Isabella Mendoza Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0864\",\"dt\":\"2026-03-18 15:52\",\"dni\":\"41550856\",\"client\":\"Andrea Micaela Rojas Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0865\",\"dt\":\"2026-03-18 16:04\",\"dni\":\"77136189\",\"client\":\"Camila Micaela Pérez Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0866\",\"dt\":\"2026-03-18 16:26\",\"dni\":\"58772776\",\"client\":\"Valeria Martina Mamani Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0867\",\"dt\":\"2026-03-18 16:37\",\"dni\":\"49789018\",\"client\":\"Andrea Beatriz Pérez Díaz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0870\",\"dt\":\"2026-03-19 10:53\",\"dni\":\"70532655\",\"client\":\"Valeria Fernanda Silva Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0871\",\"dt\":\"2026-03-19 14:19\",\"dni\":\"46702182\",\"client\":\"Daniela Martina Vargas Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0872\",\"dt\":\"2026-03-19 15:46\",\"dni\":\"62459061\",\"client\":\"Lucía Micaela Condori Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0873\",\"dt\":\"2026-03-19 17:13\",\"dni\":\"62048181\",\"client\":\"Andrea Martina Vargas Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0874\",\"dt\":\"2026-03-20 11:18\",\"dni\":\"41151546\",\"client\":\"Elena Martina Flores Paredes\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0875\",\"dt\":\"2026-03-20 11:43\",\"dni\":\"43631228\",\"client\":\"Gabriela Beatriz Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":2,\"base\":67.8,\"igv\":12.2,\"totalS\":80,\"netUsd\":19.71,\"cashUsd\":23.26,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0876\",\"dt\":\"2026-03-20 13:23\",\"dni\":\"50723994\",\"client\":\"Valeria Fernanda Mamani Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0877\",\"dt\":\"2026-03-20 14:32\",\"dni\":\"58975668\",\"client\":\"Ana Micaela Quispe Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0879\",\"dt\":\"2026-03-20 15:31\",\"dni\":\"79198074\",\"client\":\"Ana Fernanda Mendoza Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0880\",\"dt\":\"2026-03-20 16:03\",\"dni\":\"64172107\",\"client\":\"Ana Beatriz Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0882\",\"dt\":\"2026-03-20 16:35\",\"dni\":\"75554727\",\"client\":\"Andrea Fernanda Vargas Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0883\",\"dt\":\"2026-03-20 16:59\",\"dni\":\"50090074\",\"client\":\"Lucía Victoria Quispe Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0884\",\"dt\":\"2026-03-20 17:32\",\"dni\":\"79059848\",\"client\":\"Lucía Isabella Pérez Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0886\",\"dt\":\"2026-03-21 11:36\",\"dni\":\"67118707\",\"client\":\"Valeria Beatriz Mamani Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0887\",\"dt\":\"2026-03-21 13:47\",\"dni\":\"69953745\",\"client\":\"Daniela Isabella Silva Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0888\",\"dt\":\"2026-03-21 15:01\",\"dni\":\"70801887\",\"client\":\"Valeria Paula Rojas Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":5,\"base\":190.68,\"igv\":34.32,\"totalS\":225,\"netUsd\":55.43,\"cashUsd\":65.41,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0889\",\"dt\":\"2026-03-21 15:37\",\"dni\":\"79955892\",\"client\":\"Camila Victoria Flores Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0890\",\"dt\":\"2026-03-21 17:27\",\"dni\":\"47395044\",\"client\":\"María Isabella Gómez Herrera\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0891\",\"dt\":\"2026-03-21 17:57\",\"dni\":\"64345066\",\"client\":\"Elena Martina Gómez Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0892\",\"dt\":\"2026-03-21 18:12\",\"dni\":\"72641643\",\"client\":\"Sofía Beatriz Mendoza Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0893\",\"dt\":\"2026-03-21 18:29\",\"dni\":\"47665698\",\"client\":\"Sofía Martina Condori Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0894\",\"dt\":\"2026-03-22 10:22\",\"dni\":\"70082741\",\"client\":\"Valeria Martina Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0895\",\"dt\":\"2026-03-22 10:28\",\"dni\":\"42172108\",\"client\":\"Valeria Martina Condori Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0897\",\"dt\":\"2026-03-22 13:24\",\"dni\":\"70644464\",\"client\":\"Ana Beatriz Quispe Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0898\",\"dt\":\"2026-03-22 13:50\",\"dni\":\"59036983\",\"client\":\"Valeria Julieta Vargas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0899\",\"dt\":\"2026-03-22 14:01\",\"dni\":\"71725896\",\"client\":\"María Paula Vargas Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0900\",\"dt\":\"2026-03-22 14:50\",\"dni\":\"40605089\",\"client\":\"Valeria Victoria Condori Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0901\",\"dt\":\"2026-03-22 16:15\",\"dni\":\"60813031\",\"client\":\"Camila Isabella Mamani Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0902\",\"dt\":\"2026-03-22 16:42\",\"dni\":\"40207785\",\"client\":\"Camila Fernanda Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0903\",\"dt\":\"2026-03-22 18:50\",\"dni\":\"53684780\",\"client\":\"Andrea Alejandra Mendoza Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0904\",\"dt\":\"2026-03-23 10:00\",\"dni\":\"75916672\",\"client\":\"Lucía Paula Quispe Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0905\",\"dt\":\"2026-03-23 11:01\",\"dni\":\"63117162\",\"client\":\"Lucía Fernanda Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0907\",\"dt\":\"2026-03-23 15:27\",\"dni\":\"75554727\",\"client\":\"Andrea Fernanda Vargas Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0908\",\"dt\":\"2026-03-23 15:34\",\"dni\":\"70801887\",\"client\":\"Valeria Paula Rojas Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0909\",\"dt\":\"2026-03-23 15:54\",\"dni\":\"72641643\",\"client\":\"Sofía Beatriz Mendoza Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0910\",\"dt\":\"2026-03-23 17:11\",\"dni\":\"72017068\",\"client\":\"Gabriela Martina Condori Soto\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0912\",\"dt\":\"2026-03-24 10:31\",\"dni\":\"44996654\",\"client\":\"Andrea Martina Pérez Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0913\",\"dt\":\"2026-03-24 10:52\",\"dni\":\"48882341\",\"client\":\"María Alejandra Gómez Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0914\",\"dt\":\"2026-03-24 11:47\",\"dni\":\"51697165\",\"client\":\"Sofía Beatriz Rojas Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0915\",\"dt\":\"2026-03-24 12:35\",\"dni\":\"47976246\",\"client\":\"Gabriela Julieta Quispe Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0916\",\"dt\":\"2026-03-24 13:25\",\"dni\":\"50859676\",\"client\":\"Ana Fernanda Rojas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0918\",\"dt\":\"2026-03-24 17:36\",\"dni\":\"51697165\",\"client\":\"Sofía Beatriz Rojas Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0920\",\"dt\":\"2026-03-24 18:56\",\"dni\":\"50794302\",\"client\":\"Valeria Martina Pérez Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0924\",\"dt\":\"2026-03-25 12:42\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0926\",\"dt\":\"2026-03-25 13:27\",\"dni\":\"49970558\",\"client\":\"Andrea Isabella Pérez Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0927\",\"dt\":\"2026-03-25 14:59\",\"dni\":\"43998662\",\"client\":\"Camila Paula Condori Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0929\",\"dt\":\"2026-03-25 17:55\",\"dni\":\"70109689\",\"client\":\"Andrea Isabella Gómez Vega\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0930\",\"dt\":\"2026-03-26 10:56\",\"dni\":\"47395044\",\"client\":\"María Isabella Gómez Herrera\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0932\",\"dt\":\"2026-03-26 12:11\",\"dni\":\"40267712\",\"client\":\"Sofía Isabella Gómez Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0933\",\"dt\":\"2026-03-26 12:40\",\"dni\":\"79198074\",\"client\":\"Ana Fernanda Mendoza Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0935\",\"dt\":\"2026-03-26 14:19\",\"dni\":\"46992959\",\"client\":\"Daniela Micaela Gómez Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0936\",\"dt\":\"2026-03-26 15:05\",\"dni\":\"50794302\",\"client\":\"Valeria Martina Pérez Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0937\",\"dt\":\"2026-03-26 15:53\",\"dni\":\"70016741\",\"client\":\"Lucía Alejandra Flores Soto\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":2,\"base\":76.27,\"igv\":13.73,\"totalS\":90,\"netUsd\":22.17,\"cashUsd\":26.16,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0939\",\"dt\":\"2026-03-26 15:58\",\"dni\":\"68533084\",\"client\":\"Andrea Julieta Mendoza Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0940\",\"dt\":\"2026-03-26 16:33\",\"dni\":\"77051356\",\"client\":\"Daniela Martina Quispe Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0941\",\"dt\":\"2026-03-26 16:50\",\"dni\":\"70321623\",\"client\":\"Ana Paula Rojas Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0942\",\"dt\":\"2026-03-26 17:54\",\"dni\":\"60847849\",\"client\":\"Gabriela Victoria Rojas Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":6,\"base\":203.39,\"igv\":36.61,\"totalS\":240,\"netUsd\":59.12,\"cashUsd\":69.77,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0946\",\"dt\":\"2026-03-27 12:20\",\"dni\":\"68836404\",\"client\":\"Gabriela Paula Condori Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":5,\"base\":148.31,\"igv\":26.69,\"totalS\":175,\"netUsd\":43.11,\"cashUsd\":50.87,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0949\",\"dt\":\"2026-03-27 14:27\",\"dni\":\"51788360\",\"client\":\"Valeria Martina Gómez Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0950\",\"dt\":\"2026-03-27 15:39\",\"dni\":\"73264145\",\"client\":\"Ana Alejandra Gómez Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0951\",\"dt\":\"2026-03-27 16:55\",\"dni\":\"56286583\",\"client\":\"Lucía Carolina Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0952\",\"dt\":\"2026-03-28 11:54\",\"dni\":\"73552954\",\"client\":\"Ana Alejandra Rojas Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0953\",\"dt\":\"2026-03-28 12:30\",\"dni\":\"50859676\",\"client\":\"Ana Fernanda Rojas Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0955\",\"dt\":\"2026-03-28 13:17\",\"dni\":\"63837224\",\"client\":\"Valeria Beatriz Rojas Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0956\",\"dt\":\"2026-03-28 17:54\",\"dni\":\"73491603\",\"client\":\"Sofía Alejandra Rojas Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0957\",\"dt\":\"2026-03-28 18:48\",\"dni\":\"70016741\",\"client\":\"Lucía Alejandra Flores Soto\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0958\",\"dt\":\"2026-03-28 18:58\",\"dni\":\"70015641\",\"client\":\"Daniela Isabella Silva Ríos\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":4,\"base\":152.54,\"igv\":27.46,\"totalS\":180,\"netUsd\":44.34,\"cashUsd\":52.33,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0960\",\"dt\":\"2026-03-29 11:01\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0961\",\"dt\":\"2026-03-29 11:49\",\"dni\":\"54945827\",\"client\":\"Andrea Martina Mamani Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0962\",\"dt\":\"2026-03-29 12:35\",\"dni\":\"64949611\",\"client\":\"Ana Paula Gómez Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":3,\"base\":114.41,\"igv\":20.59,\"totalS\":135,\"netUsd\":33.26,\"cashUsd\":39.24,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0963\",\"dt\":\"2026-03-29 12:47\",\"dni\":\"53414801\",\"client\":\"Valeria Isabella Mamani Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0964\",\"dt\":\"2026-03-29 13:31\",\"dni\":\"42622617\",\"client\":\"Elena Fernanda Vargas Paredes\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0965\",\"dt\":\"2026-03-29 14:12\",\"dni\":\"70175898\",\"client\":\"Valeria Victoria Quispe Cruz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0966\",\"dt\":\"2026-03-29 14:34\",\"dni\":\"53552344\",\"client\":\"Elena Fernanda Flores Salazar\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0968\",\"dt\":\"2026-03-29 16:50\",\"dni\":\"61409818\",\"client\":\"Elena Victoria Quispe Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0970\",\"dt\":\"2026-03-29 17:30\",\"dni\":\"47847155\",\"client\":\"Valeria Beatriz Silva Ríos\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0971\",\"dt\":\"2026-03-29 17:35\",\"dni\":\"77276434\",\"client\":\"Elena Julieta Mendoza Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0973\",\"dt\":\"2026-03-29 18:18\",\"dni\":\"72017068\",\"client\":\"Gabriela Martina Condori Soto\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0974\",\"dt\":\"2026-03-29 18:59\",\"dni\":\"54392049\",\"client\":\"Sofía Martina Flores Paredes\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":4,\"base\":118.64,\"igv\":21.36,\"totalS\":140,\"netUsd\":34.49,\"cashUsd\":40.7,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0975\",\"dt\":\"2026-03-30 10:36\",\"dni\":\"55481831\",\"client\":\"Ana Victoria Mamani Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0977\",\"dt\":\"2026-03-30 12:26\",\"dni\":\"48194623\",\"client\":\"Elena Fernanda Condori Salazar\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0979\",\"dt\":\"2026-03-30 14:18\",\"dni\":\"64172107\",\"client\":\"Ana Beatriz Pérez Cruz\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":3,\"base\":88.98,\"igv\":16.02,\"totalS\":105,\"netUsd\":25.87,\"cashUsd\":30.52,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0980\",\"dt\":\"2026-03-30 14:50\",\"dni\":\"42555245\",\"client\":\"Camila Beatriz Quispe Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Tarjeta\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0982\",\"dt\":\"2026-03-30 16:20\",\"dni\":\"71982612\",\"client\":\"Andrea Fernanda Flores Cruz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Yape\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0983\",\"dt\":\"2026-03-30 17:01\",\"dni\":\"74524653\",\"client\":\"Valeria Alejandra Flores Díaz\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":1,\"base\":33.9,\"igv\":6.1,\"totalS\":40,\"netUsd\":9.85,\"cashUsd\":11.63,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0984\",\"dt\":\"2026-03-31 10:33\",\"dni\":\"43925078\",\"client\":\"Elena Beatriz Quispe Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":4,\"base\":135.59,\"igv\":24.41,\"totalS\":160,\"netUsd\":39.42,\"cashUsd\":46.51,\"pay\":\"Yape\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0985\",\"dt\":\"2026-03-31 10:51\",\"dni\":\"42172108\",\"client\":\"Valeria Martina Condori Torres\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":7,\"base\":237.29,\"igv\":42.71,\"totalS\":280,\"netUsd\":68.98,\"cashUsd\":81.4,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0987\",\"dt\":\"2026-03-31 14:24\",\"dni\":\"70095152\",\"client\":\"María Beatriz Silva Castro\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":5,\"base\":169.49,\"igv\":30.51,\"totalS\":200,\"netUsd\":49.27,\"cashUsd\":58.14,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0988\",\"dt\":\"2026-03-31 14:39\",\"dni\":\"44996654\",\"client\":\"Andrea Martina Pérez Vega\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0989\",\"dt\":\"2026-03-31 16:02\",\"dni\":\"70015641\",\"client\":\"Daniela Isabella Silva Ríos\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0990\",\"dt\":\"2026-03-31 16:09\",\"dni\":\"79059848\",\"client\":\"Lucía Isabella Pérez Herrera\",\"product\":\"Rubor Secret Berry\",\"price\":40,\"qty\":3,\"base\":101.69,\"igv\":18.31,\"totalS\":120,\"netUsd\":29.56,\"cashUsd\":34.88,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0991\",\"dt\":\"2026-03-31 16:15\",\"dni\":\"50216436\",\"client\":\"Gabriela Carolina Rojas Castro\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":2,\"base\":59.32,\"igv\":10.68,\"totalS\":70,\"netUsd\":17.24,\"cashUsd\":20.35,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0992\",\"dt\":\"2026-03-31 16:26\",\"dni\":\"77294971\",\"client\":\"Lucía Fernanda Condori Salazar\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0993\",\"dt\":\"2026-03-31 16:45\",\"dni\":\"50794302\",\"client\":\"Valeria Martina Pérez Torres\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":1,\"base\":38.14,\"igv\":6.86,\"totalS\":45,\"netUsd\":11.09,\"cashUsd\":13.08,\"pay\":\"Plin\",\"channel\":\"Online\",\"advisor\":\"Azumy_C\"},{\"id\":\"V-0994\",\"dt\":\"2026-03-31 17:00\",\"dni\":\"70532655\",\"client\":\"Valeria Fernanda Silva Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":7,\"base\":207.63,\"igv\":37.37,\"totalS\":245,\"netUsd\":60.36,\"cashUsd\":71.22,\"pay\":\"Efectivo\",\"channel\":\"Online\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0997\",\"dt\":\"2026-03-31 17:52\",\"dni\":\"78921743\",\"client\":\"Valeria Victoria Silva Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Efectivo\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-0998\",\"dt\":\"2026-03-31 17:58\",\"dni\":\"41550856\",\"client\":\"Andrea Micaela Rojas Díaz\",\"product\":\"Labial Berry Chic\",\"price\":45,\"qty\":6,\"base\":228.81,\"igv\":41.19,\"totalS\":270,\"netUsd\":66.51,\"cashUsd\":78.49,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Selena_L\"},{\"id\":\"V-0999\",\"dt\":\"2026-03-31 18:04\",\"dni\":\"68836404\",\"client\":\"Gabriela Paula Condori Vega\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":6,\"base\":177.97,\"igv\":32.03,\"totalS\":210,\"netUsd\":51.74,\"cashUsd\":61.05,\"pay\":\"Tarjeta\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"},{\"id\":\"V-1000\",\"dt\":\"2026-03-31 18:09\",\"dni\":\"71477768\",\"client\":\"Valeria Julieta Condori Torres\",\"product\":\"Gloss Berry Cute\",\"price\":35,\"qty\":1,\"base\":29.66,\"igv\":5.34,\"totalS\":35,\"netUsd\":8.62,\"cashUsd\":10.17,\"pay\":\"Plin\",\"channel\":\"Física\",\"advisor\":\"Nadia_D\"}]");
var kardex_default = /*#__PURE__*/ JSON.parse("[{\"name\":\"Labial Berry Chic\",\"sku\":\"LAB-BC\",\"price\":45,\"capacity\":300,\"reorder\":50,\"color\":\"#D8005F\",\"current\":304,\"avgInventory\":297.33,\"rotation\":3.01,\"totalOut\":896,\"movements\":[{\"period\":\"Enero\",\"type\":\"Saldo Inicial\",\"qty\":300,\"start\":null,\"in\":null,\"out\":null,\"end\":300},{\"period\":\"Enero - Sem 1\",\"type\":\"Ventas\",\"qty\":81,\"start\":300,\"in\":null,\"out\":81,\"end\":219},{\"period\":\"Enero - Sem 2\",\"type\":\"Compras\",\"qty\":150,\"start\":219,\"in\":150,\"out\":null,\"end\":369},{\"period\":\"Enero - Sem 2\",\"type\":\"Ventas\",\"qty\":114,\"start\":369,\"in\":null,\"out\":114,\"end\":255},{\"period\":\"Enero - Sem 3\",\"type\":\"Ventas\",\"qty\":83,\"start\":255,\"in\":null,\"out\":83,\"end\":172},{\"period\":\"Enero - Sem 4\",\"type\":\"Compras\",\"qty\":150,\"start\":172,\"in\":150,\"out\":null,\"end\":322},{\"period\":\"Enero - Sem 4\",\"type\":\"Ventas\",\"qty\":53,\"start\":322,\"in\":null,\"out\":53,\"end\":269},{\"period\":\"Febrero - Sem 5\",\"type\":\"Ventas\",\"qty\":78,\"start\":269,\"in\":null,\"out\":78,\"end\":191},{\"period\":\"Febrero - Sem 6\",\"type\":\"Compras\",\"qty\":150,\"start\":191,\"in\":150,\"out\":null,\"end\":341},{\"period\":\"Febrero - Sem 6\",\"type\":\"Ventas\",\"qty\":59,\"start\":341,\"in\":null,\"out\":59,\"end\":282},{\"period\":\"Febrero - Sem 7\",\"type\":\"Ventas\",\"qty\":33,\"start\":282,\"in\":null,\"out\":33,\"end\":249},{\"period\":\"Febrero - Sem 8\",\"type\":\"Compras\",\"qty\":150,\"start\":249,\"in\":150,\"out\":null,\"end\":399},{\"period\":\"Febrero - Sem 8\",\"type\":\"Ventas\",\"qty\":80,\"start\":399,\"in\":null,\"out\":80,\"end\":319},{\"period\":\"Marzo - Sem 9\",\"type\":\"Ventas\",\"qty\":70,\"start\":319,\"in\":null,\"out\":70,\"end\":249},{\"period\":\"Marzo - Sem 10\",\"type\":\"Compras\",\"qty\":150,\"start\":249,\"in\":150,\"out\":null,\"end\":399},{\"period\":\"Marzo - Sem 10\",\"type\":\"Ventas\",\"qty\":99,\"start\":399,\"in\":null,\"out\":99,\"end\":300},{\"period\":\"Marzo - Sem 11\",\"type\":\"Ventas\",\"qty\":57,\"start\":300,\"in\":null,\"out\":57,\"end\":243},{\"period\":\"Marzo - Sem 12\",\"type\":\"Compras\",\"qty\":150,\"start\":243,\"in\":150,\"out\":null,\"end\":393},{\"period\":\"Marzo - Sem 12\",\"type\":\"Ventas\",\"qty\":53,\"start\":393,\"in\":null,\"out\":53,\"end\":340},{\"period\":\"Marzo - Sem 13\",\"type\":\"Ventas\",\"qty\":36,\"start\":340,\"in\":null,\"out\":36,\"end\":304}]},{\"name\":\"Rubor Secret Berry\",\"sku\":\"RUB-SB\",\"price\":40,\"capacity\":250,\"reorder\":60,\"color\":\"#FF66A3\",\"current\":198,\"avgInventory\":237.0,\"rotation\":4.02,\"totalOut\":952,\"movements\":[{\"period\":\"Enero\",\"type\":\"Saldo Inicial\",\"qty\":250,\"start\":null,\"in\":null,\"out\":null,\"end\":250},{\"period\":\"Enero - Sem 1\",\"type\":\"Ventas\",\"qty\":91,\"start\":250,\"in\":null,\"out\":91,\"end\":159},{\"period\":\"Enero - Sem 2\",\"type\":\"Compras\",\"qty\":150,\"start\":159,\"in\":150,\"out\":null,\"end\":309},{\"period\":\"Enero - Sem 2\",\"type\":\"Ventas\",\"qty\":61,\"start\":309,\"in\":null,\"out\":61,\"end\":248},{\"period\":\"Enero - Sem 3\",\"type\":\"Ventas\",\"qty\":95,\"start\":248,\"in\":null,\"out\":95,\"end\":153},{\"period\":\"Enero - Sem 4\",\"type\":\"Compras\",\"qty\":150,\"start\":153,\"in\":150,\"out\":null,\"end\":303},{\"period\":\"Enero - Sem 4\",\"type\":\"Ventas\",\"qty\":56,\"start\":303,\"in\":null,\"out\":56,\"end\":247},{\"period\":\"Febrero - Sem 5\",\"type\":\"Ventas\",\"qty\":65,\"start\":247,\"in\":null,\"out\":65,\"end\":182},{\"period\":\"Febrero - Sem 6\",\"type\":\"Compras\",\"qty\":150,\"start\":182,\"in\":150,\"out\":null,\"end\":332},{\"period\":\"Febrero - Sem 6\",\"type\":\"Ventas\",\"qty\":82,\"start\":332,\"in\":null,\"out\":82,\"end\":250},{\"period\":\"Febrero - Sem 7\",\"type\":\"Ventas\",\"qty\":65,\"start\":250,\"in\":null,\"out\":65,\"end\":185},{\"period\":\"Febrero - Sem 8\",\"type\":\"Compras\",\"qty\":150,\"start\":185,\"in\":150,\"out\":null,\"end\":335},{\"period\":\"Febrero - Sem 8\",\"type\":\"Ventas\",\"qty\":69,\"start\":335,\"in\":null,\"out\":69,\"end\":266},{\"period\":\"Marzo - Sem 9\",\"type\":\"Ventas\",\"qty\":23,\"start\":266,\"in\":null,\"out\":23,\"end\":243},{\"period\":\"Marzo - Sem 10\",\"type\":\"Compras\",\"qty\":150,\"start\":243,\"in\":150,\"out\":null,\"end\":393},{\"period\":\"Marzo - Sem 10\",\"type\":\"Ventas\",\"qty\":46,\"start\":393,\"in\":null,\"out\":46,\"end\":347},{\"period\":\"Marzo - Sem 11\",\"type\":\"Ventas\",\"qty\":124,\"start\":347,\"in\":null,\"out\":124,\"end\":223},{\"period\":\"Marzo - Sem 12\",\"type\":\"Compras\",\"qty\":150,\"start\":223,\"in\":150,\"out\":null,\"end\":373},{\"period\":\"Marzo - Sem 12\",\"type\":\"Ventas\",\"qty\":75,\"start\":373,\"in\":null,\"out\":75,\"end\":298},{\"period\":\"Marzo - Sem 13\",\"type\":\"Ventas\",\"qty\":100,\"start\":298,\"in\":null,\"out\":100,\"end\":198}]},{\"name\":\"Gloss Berry Cute\",\"sku\":\"GLO-BC\",\"price\":35,\"capacity\":200,\"reorder\":50,\"color\":\"#FFB3D9\",\"current\":175,\"avgInventory\":189.33,\"rotation\":5.2,\"totalOut\":985,\"movements\":[{\"period\":\"Enero\",\"type\":\"Saldo Inicial\",\"qty\":200,\"start\":null,\"in\":null,\"out\":null,\"end\":200},{\"period\":\"Enero - Sem 1\",\"type\":\"Ventas\",\"qty\":64,\"start\":200,\"in\":null,\"out\":64,\"end\":136},{\"period\":\"Enero - Sem 2\",\"type\":\"Compras\",\"qty\":160,\"start\":136,\"in\":160,\"out\":null,\"end\":296},{\"period\":\"Enero - Sem 2\",\"type\":\"Ventas\",\"qty\":104,\"start\":296,\"in\":null,\"out\":104,\"end\":192},{\"period\":\"Enero - Sem 3\",\"type\":\"Ventas\",\"qty\":88,\"start\":192,\"in\":null,\"out\":88,\"end\":104},{\"period\":\"Enero - Sem 4\",\"type\":\"Compras\",\"qty\":160,\"start\":104,\"in\":160,\"out\":null,\"end\":264},{\"period\":\"Enero - Sem 4\",\"type\":\"Ventas\",\"qty\":75,\"start\":264,\"in\":null,\"out\":75,\"end\":189},{\"period\":\"Febrero - Sem 5\",\"type\":\"Ventas\",\"qty\":50,\"start\":189,\"in\":null,\"out\":50,\"end\":139},{\"period\":\"Febrero - Sem 6\",\"type\":\"Compras\",\"qty\":160,\"start\":139,\"in\":160,\"out\":null,\"end\":299},{\"period\":\"Febrero - Sem 6\",\"type\":\"Ventas\",\"qty\":91,\"start\":299,\"in\":null,\"out\":91,\"end\":208},{\"period\":\"Febrero - Sem 7\",\"type\":\"Ventas\",\"qty\":86,\"start\":208,\"in\":null,\"out\":86,\"end\":122},{\"period\":\"Febrero - Sem 8\",\"type\":\"Compras\",\"qty\":160,\"start\":122,\"in\":160,\"out\":null,\"end\":282},{\"period\":\"Febrero - Sem 8\",\"type\":\"Ventas\",\"qty\":78,\"start\":282,\"in\":null,\"out\":78,\"end\":204},{\"period\":\"Marzo - Sem 9\",\"type\":\"Ventas\",\"qty\":68,\"start\":204,\"in\":null,\"out\":68,\"end\":136},{\"period\":\"Marzo - Sem 10\",\"type\":\"Compras\",\"qty\":160,\"start\":136,\"in\":160,\"out\":null,\"end\":296},{\"period\":\"Marzo - Sem 10\",\"type\":\"Ventas\",\"qty\":69,\"start\":296,\"in\":null,\"out\":69,\"end\":227},{\"period\":\"Marzo - Sem 11\",\"type\":\"Ventas\",\"qty\":86,\"start\":227,\"in\":null,\"out\":86,\"end\":141},{\"period\":\"Marzo - Sem 12\",\"type\":\"Compras\",\"qty\":160,\"start\":141,\"in\":160,\"out\":null,\"end\":301},{\"period\":\"Marzo - Sem 12\",\"type\":\"Ventas\",\"qty\":65,\"start\":301,\"in\":null,\"out\":65,\"end\":236},{\"period\":\"Marzo - Sem 13\",\"type\":\"Ventas\",\"qty\":61,\"start\":236,\"in\":null,\"out\":61,\"end\":175}]}]");
var SALES = sales_default;
var KARDEX = kardex_default;
function downloadBlob(filename, content, mime) {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function exportSalesCsv(rows) {
	const lines = [[
		"ID_VENTA",
		"FECHA_HORA",
		"DNI_CLIENTE",
		"NOMBRE_CLIENTE",
		"PRODUCTO",
		"PRECIO",
		"CANTIDAD",
		"SUBTOTAL_BASE_S",
		"MONTO_IGV_S",
		"MONTO_TOTAL_S",
		"INGRESO_NETO_USD",
		"FLUJO_CAJA_USD",
		"METODO_PAGO",
		"CANAL_VENTA",
		"ASESOR"
	].join(",")];
	for (const s of rows) lines.push([
		s.id,
		s.dt,
		s.dni,
		csv(s.client),
		csv(s.product),
		s.price,
		s.qty,
		s.base,
		s.igv,
		s.totalS,
		s.netUsd,
		s.cashUsd,
		s.pay,
		s.channel,
		s.advisor
	].join(","));
	downloadBlob("Fresita_Beauty_Ventas_Q1_2026.csv", lines.join("\n"), "text/csv;charset=utf-8");
}
function csv(v) {
	if (v.includes(",") || v.includes("\"")) return `"${v.replaceAll("\"", "\"\"")}"`;
	return v;
}
async function exportOfflineHtml(sales, kardex) {
	const logo = await toDataUri("/logo_fresita.png");
	downloadBlob("Fresita_Beauty_ERP.html", buildHtml(sales, kardex, computeSalesStats(sales), logo), "text/html;charset=utf-8");
}
async function toDataUri(src) {
	try {
		const blob = await (await fetch(src)).blob();
		return await new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result ?? ""));
			reader.readAsDataURL(blob);
		});
	} catch {
		return "";
	}
}
function buildHtml(sales, kardex, stats, logo) {
	const payload = JSON.stringify({
		sales,
		kardex
	}).replace(/</g, "\\u003c");
	const star = stats.starProduct ?? "Labial Berry Chic";
	const starPct = stats.starPct.toFixed(1);
	const alerts = kardex.filter((p) => p.current <= p.reorder);
	const insightInv = alerts.length ? `Riesgo de quiebre en ${alerts.map((p) => p.name).join(", ")}. Emitir orden de compra prioritaria hoy.` : "Stock saludable. Ningún SKU está en o bajo el punto de reorden (50 / 60 uds).";
	const advisors = stats.byAdvisor.map((a) => `<div class="row"><span>${a.label}</span><b>S/ ${a.totalS.toLocaleString("es-PE")}</b></div>`).join("");
	return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Fresita Beauty ERP</title>
<style>
:root{--pearl:#FDFAFB;--ink:#4A154B;--rose:#D8005F;--blush:#FF66A3;--petal:#FFB3D9;--muted:#7A6B73;--mint:#20C997;--coral:#FF4D4D;--lav:#FFF0F5;--warm:#F2EEF0;--card:#fff}
*{box-sizing:border-box}
html,body{margin:0;background:var(--pearl);color:var(--ink);font-family:Georgia,"Times New Roman",serif}
body{display:flex;min-height:100vh}
button{font:inherit;cursor:pointer}
.side{width:260px;background:#fff;padding:28px 22px;box-shadow:8px 0 30px rgba(216,0,95,.05);position:sticky;top:0;height:100vh}
.side img{width:200px;max-width:100%;height:auto}
.side h1{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:18px 0 22px}
.nav{display:flex;flex-direction:column;gap:8px}
.nav button{text-align:left;border:0;background:transparent;padding:12px 14px;border-radius:14px;color:var(--ink)}
.nav button.on{background:linear-gradient(180deg,#fff,var(--lav));box-shadow:0 10px 30px rgba(216,0,95,.08);color:var(--rose);font-weight:700}
.main{flex:1;padding:28px 32px 48px}
.insight{background:linear-gradient(180deg,#fff,var(--lav));border-left:6px solid var(--rose);border-radius:20px;padding:22px 26px;box-shadow:0 10px 30px rgba(216,0,95,.08);margin-bottom:22px}
.insight.ok{border-left-color:var(--mint);background:linear-gradient(180deg,#fff,#f3fbf8)}
.insight.alert{border-left-color:var(--coral)}
.kicker{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:0 0 8px}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:22px}
.kpi{background:#fff;border-radius:20px;padding:22px;box-shadow:0 10px 30px rgba(216,0,95,.08)}
.kpi span{display:block;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.kpi b{display:block;margin-top:10px;font-size:28px;color:var(--rose)}
.card{background:#fff;border-radius:20px;padding:22px;box-shadow:0 10px 30px rgba(216,0,95,.08);margin-bottom:18px}
h2{margin:0 0 6px;font-size:26px}
p.sub{margin:0 0 16px;font-family:system-ui,sans-serif;color:var(--muted);font-size:13px}
table{width:100%;border-collapse:collapse;font-family:system-ui,sans-serif;font-size:13px}
th{text-align:left;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding:8px 10px;border-bottom:1px solid var(--warm)}
td{padding:10px;border-bottom:1px solid var(--warm)}
.row{display:flex;justify-content:space-between;font-family:system-ui,sans-serif;font-size:13px;padding:8px 0;border-bottom:1px solid var(--warm)}
.bars{display:flex;align-items:flex-end;gap:28px;height:240px;padding:8px 4px 0}
.group{flex:1;display:flex;gap:6px;align-items:flex-end;justify-content:center;height:100%;position:relative}
.group i{width:22px;border-radius:6px 6px 0 0;display:block}
.group label{position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-family:system-ui,sans-serif;font-size:12px;color:var(--muted)}
.legend{display:flex;gap:14px;font-family:system-ui,sans-serif;font-size:12px;color:var(--muted);margin-top:28px}
.legend b{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}
.monitor{margin:18px 0 8px}
.monitor h3{margin:0 0 8px;font-size:16px}
.track{position:relative;height:28px;background:transparent}
.cap,.stk{position:absolute;inset:0 auto 0 0;border-radius:8px;height:28px}
.cap{background:var(--warm)}
.line{position:absolute;top:-6px;width:1px;height:40px;background:var(--ink)}
.donut-wrap{display:flex;gap:24px;align-items:center;flex-wrap:wrap}
.hide{display:none}
@media(max-width:860px){body{flex-direction:column}.side{width:100%;height:auto;position:relative}.kpis{grid-template-columns:1fr}.main{padding:18px}}
</style>
</head>
<body>
<aside class="side">
  ${logo ? `<img src="${logo}" alt="Fresita Beauty"/>` : `<div style="font-size:32px;color:var(--rose)">Fresita Beauty</div>`}
  <h1>ERP estratégico · Q1 2026</h1>
  <nav class="nav">
    <button class="on" id="btn-sales" type="button">Reporte de Ventas</button>
    <button id="btn-inv" type="button">Control de Inventarios</button>
  </nav>
  <p class="sub" style="margin-top:28px">Tipo de cambio ${TC_USD}<br/>713 ventas reales · sin datos simulados</p>
</aside>
<main class="main">
  <section id="sales">
    <div class="insight">
      <p class="kicker">Insight estratégico</p>
      <div>El producto estrella es ${star} representando el ${starPct}% de los ingresos. Se sugiere inyectar pauta digital para maximizar el margen bruto.</div>
    </div>
    <div class="kpis">
      <div class="kpi"><span>Flujo de caja total</span><b>S/ ${stats.totalS.toLocaleString("es-PE")}</b></div>
      <div class="kpi"><span>Ingreso neto USD</span><b>US$ ${stats.netUsd.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}</b></div>
      <div class="kpi"><span>Unidades vendidas</span><b>${stats.units.toLocaleString("es-PE")}</b></div>
    </div>
    <div class="card">
      <h2>Evolución trimestral</h2>
      <p class="sub">Ingresos brutos en soles por producto</p>
      <div class="bars" id="bars"></div>
      <div class="legend">
        <span><b style="background:#D8005F"></b>Labial Berry Chic</span>
        <span><b style="background:#FF66A3"></b>Rubor Secret Berry</span>
        <span><b style="background:#FFB3D9"></b>Gloss Berry Cute</span>
      </div>
    </div>
    <div class="card">
      <h2>Asesoras</h2>
      ${advisors}
    </div>
    <div class="card">
      <h2>Libro de ventas</h2>
      <p class="sub">${sales.length} tickets · ${Object.keys(ADVISOR_LABEL).length} asesoras</p>
      <div style="overflow:auto;max-height:420px">
        <table>
          <thead><tr><th>ID</th><th>Fecha</th><th>Clienta</th><th>Producto</th><th>Cant.</th><th>Total S/</th></tr></thead>
          <tbody id="tbody"></tbody>
        </table>
      </div>
    </div>
  </section>
  <section id="inv" class="hide">
    <div class="insight ${alerts.length ? "alert" : "ok"}">
      <p class="kicker">Insight operativo</p>
      <div>${insightInv}</div>
    </div>
    <div class="card donut-wrap">
      <svg id="donut" width="220" height="220" viewBox="0 0 120 120"></svg>
      <div>
        <h2>Stock actual</h2>
        <p class="sub">Saldo final 31 mar 2026</p>
        <div id="stock-leg"></div>
      </div>
    </div>
    <div class="card" id="monitor"></div>
  </section>
</main>
<script>
const DATA = ${payload};
const monthly = ${JSON.stringify(stats.monthly)};
const kardex = DATA.kardex;
const sales = DATA.sales;
const maxM = Math.max(...monthly.map(m => m.Labial+m.Rubor+m.Gloss), 1);
const bars = document.getElementById("bars");
monthly.forEach(m => {
  const g = document.createElement("div");
  g.className = "group";
  const h = (n) => Math.max(6, (n / maxM) * 220);
  g.innerHTML = '<i style="height:'+h(m.Labial)+'px;background:#D8005F"></i>'
    +'<i style="height:'+h(m.Rubor)+'px;background:#FF66A3"></i>'
    +'<i style="height:'+h(m.Gloss)+'px;background:#FFB3D9"></i>'
    +'<label>'+m.month+'</label>';
  bars.appendChild(g);
});
const tb = document.getElementById("tbody");
sales.slice().sort((a,b)=>b.dt.localeCompare(a.dt)).forEach(s => {
  const tr = document.createElement("tr");
  tr.innerHTML = "<td>"+s.id+"</td><td>"+s.dt+"</td><td>"+s.client+"</td><td>"+s.product+"</td><td>"+s.qty+"</td><td>"+s.totalS.toLocaleString("es-PE")+"</td>";
  tb.appendChild(tr);
});
const total = kardex.reduce((a,p)=>a+p.current,0);
const r0=36,r1=52,cx=60,cy=60;
let ang=-Math.PI/2;
const svg=document.getElementById("donut");
function arc(a0,a1,color){
  const x0=cx+r1*Math.cos(a0), y0=cy+r1*Math.sin(a0);
  const x1=cx+r1*Math.cos(a1), y1=cy+r1*Math.sin(a1);
  const x2=cx+r0*Math.cos(a1), y2=cy+r0*Math.sin(a1);
  const x3=cx+r0*Math.cos(a0), y3=cy+r0*Math.sin(a0);
  const large = (a1-a0)>Math.PI?1:0;
  const p=document.createElementNS("http://www.w3.org/2000/svg","path");
  p.setAttribute("d","M "+x0+" "+y0+" A "+r1+" "+r1+" 0 "+large+" 1 "+x1+" "+y1+" L "+x2+" "+y2+" A "+r0+" "+r0+" 0 "+large+" 0 "+x3+" "+y3+" Z");
  p.setAttribute("fill",color);
  svg.appendChild(p);
}
kardex.forEach(p=>{
  const slice=(p.current/total)*Math.PI*2;
  arc(ang, ang+slice, p.color);
  ang+=slice;
});
const t=document.createElementNS("http://www.w3.org/2000/svg","text");
t.setAttribute("x","60"); t.setAttribute("y","58"); t.setAttribute("text-anchor","middle");
t.setAttribute("fill","#4A154B"); t.setAttribute("font-size","14"); t.setAttribute("font-weight","700");
t.textContent=String(total);
svg.appendChild(t);
const t2=document.createElementNS("http://www.w3.org/2000/svg","text");
t2.setAttribute("x","60"); t2.setAttribute("y","72"); t2.setAttribute("text-anchor","middle");
t2.setAttribute("fill","#7A6B73"); t2.setAttribute("font-size","6");
t2.textContent="unidades";
svg.appendChild(t2);
document.getElementById("stock-leg").innerHTML = kardex.map(p =>
  '<div class="row"><span>'+p.name+'</span><b>'+p.current+' uds</b></div>'
).join("");
const mon=document.getElementById("monitor");
mon.innerHTML="<h2>Monitor de reorden</h2><p class='sub'>Capacidad de fondo · líneas 50 y 60</p>"+kardex.map(p=>{
  const max=400;
  const crit=p.current<=p.reorder;
  return '<div class="monitor"><h3>'+p.name+' · '+p.current+' uds '+(crit?'¡ALERTA!':'')+'</h3>'
    +'<div class="track">'
    +'<div class="cap" style="width:'+(p.capacity/max*100)+'%"></div>'
    +'<div class="stk" style="width:'+(p.current/max*100)+'%;background:'+(crit?'#FF4D4D':'#20C997')+'"></div>'
    +'<div class="line" style="left:'+(50/max*100)+'%"></div>'
    +'<div class="line" style="left:'+(60/max*100)+'%"></div>'
    +'</div></div>';
}).join("");
const salesEl=document.getElementById("sales");
const invEl=document.getElementById("inv");
document.getElementById("btn-sales").onclick=()=>{
  salesEl.classList.remove("hide"); invEl.classList.add("hide");
  document.getElementById("btn-sales").className="on";
  document.getElementById("btn-inv").className="";
};
document.getElementById("btn-inv").onclick=()=>{
  invEl.classList.remove("hide"); salesEl.classList.add("hide");
  document.getElementById("btn-inv").className="on";
  document.getElementById("btn-sales").className="";
};
<\/script>
</body></html>`;
}
var EMPTY = {
	month: "all",
	product: "all",
	channel: "all",
	payment: "all",
	advisor: "all",
	query: ""
};
function Home() {
	const [panel, setPanel] = (0, import_react.useState)("sales");
	const [filters, setFilters] = (0, import_react.useState)(EMPTY);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const filtered = (0, import_react.useMemo)(() => filterSales(SALES, filters), [filters]);
	async function onDownload() {
		setBusy(true);
		try {
			await exportOfflineHtml(SALES, KARDEX);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-pearl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-dvh w-[260px] shrink-0 flex-col border-r border-hair bg-card px-6 py-7 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
						panel,
						onChange: setPanel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-auto pt-8 text-[11px] leading-relaxed text-muted",
						children: [
							"Q1 2026 · Perú",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"713 tickets reales",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"TC 3.44 · IGV 18%"
						]
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-ink/30",
					"aria-label": "Cerrar menú",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "relative z-50 flex h-full w-[80%] max-w-[300px] flex-col bg-card px-6 py-7 shadow-[var(--shadow-float)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center",
								onClick: () => setOpen(false),
								"aria-label": "Cerrar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
							panel,
							onChange: (p) => {
								setPanel(p);
								setOpen(false);
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 flex items-center gap-3 border-b border-hair bg-pearl/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center rounded-md lg:hidden",
								onClick: () => setOpen(true),
								"aria-label": "Abrir menú",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo_fresita.png",
								alt: "",
								className: "h-8 w-auto lg:hidden"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
									children: "Fresita Beauty · ERP"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display truncate text-xl font-semibold sm:text-2xl",
									children: panel === "sales" ? "Reporte de ventas" : "Control de inventarios"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-2 sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => exportSalesCsv(filtered),
									className: "inline-flex h-11 items-center gap-2 rounded-full bg-warm px-4 text-xs font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.96]",
									children: "CSV"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: onDownload,
									disabled: busy,
									className: "inline-flex h-11 items-center gap-2 rounded-full bg-rose px-4 text-xs font-semibold text-card transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), busy ? "Preparando…" : "Descargar HTML"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto px-4 pt-3 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPills, {
							panel,
							onChange: setPanel
						})
					}),
					panel === "sales" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBar, {
						filters,
						onChange: setFilters
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 px-4 py-5 sm:px-6 lg:px-8",
						children: panel === "sales" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesPanel, {
							sales: SALES,
							filters
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryPanel, { kardex: KARDEX })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 px-4 pb-6 sm:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => exportSalesCsv(filtered),
							className: "h-11 flex-1 rounded-full bg-warm text-xs font-semibold",
							children: "Exportar CSV"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onDownload,
							className: "h-11 flex-1 rounded-full bg-rose text-xs font-semibold text-card",
							children: "Descargar HTML"
						})]
					})
				]
			})
		]
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/logo_fresita.png",
			alt: "Fresita Beauty",
			width: 200,
			height: 88,
			className: "h-auto w-[168px] max-w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-[11px] tracking-[0.18em] text-muted uppercase",
			children: "Dirección estratégica · Q1"
		})]
	});
}
function Nav({ panel, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-col gap-2",
		"aria-label": "Módulos",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
			active: panel === "sales",
			onClick: () => onChange("sales"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }),
			children: "Reporte de Ventas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
			active: panel === "inventory",
			onClick: () => onChange("inventory"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4" }),
			children: "Control de Inventarios"
		})]
	});
}
function NavPills({ panel, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onChange("sales"),
		className: cn("h-11 shrink-0 rounded-full px-4 text-xs font-semibold", panel === "sales" ? "bg-rose text-card" : "bg-card text-ink"),
		children: "Ventas"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onChange("inventory"),
		className: cn("h-11 shrink-0 rounded-full px-4 text-xs font-semibold", panel === "inventory" ? "bg-rose text-card" : "bg-card text-ink"),
		children: "Inventarios"
	})] });
}
function NavBtn({ active, onClick, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex min-h-11 items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-[background,color,transform] duration-150 ease-out active:scale-[0.96]", active ? "bg-lavender text-rose shadow-[var(--shadow-float)]" : "text-ink hover:bg-pearl"),
		children: [icon, children]
	});
}
function FilterBar({ filters, onChange }) {
	const set = (patch) => onChange({
		...filters,
		...patch
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2 border-b border-hair px-4 py-3 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative min-w-[180px] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: filters.query,
					onChange: (e) => set({ query: e.target.value }),
					placeholder: "Buscar clienta, DNI o ticket",
					className: "h-11 w-full rounded-full bg-card pr-4 pl-9 text-sm shadow-[var(--shadow-float)] outline-none placeholder:text-muted focus:ring-2 focus:ring-rose/30"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: filters.month,
				onChange: (v) => set({ month: v }),
				options: [
					["all", "Trimestre"],
					["1", "Enero"],
					["2", "Febrero"],
					["3", "Marzo"]
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: filters.product,
				onChange: (v) => set({ product: v }),
				options: [
					["all", "Producto"],
					["Labial Berry Chic", "Labial"],
					["Rubor Secret Berry", "Rubor"],
					["Gloss Berry Cute", "Gloss"]
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: filters.channel,
				onChange: (v) => set({ channel: v }),
				options: [
					["all", "Canal"],
					["Física", "Física"],
					["Online", "Online"]
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: filters.payment,
				onChange: (v) => set({ payment: v }),
				options: [
					["all", "Pago"],
					["Yape", "Yape"],
					["Plin", "Plin"],
					["Tarjeta", "Tarjeta"],
					["Efectivo", "Efectivo"]
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: filters.advisor,
				onChange: (v) => set({ advisor: v }),
				options: [["all", "Asesora"], ...Object.entries(ADVISOR_LABEL).map(([k, v]) => [k, v])]
			})
		]
	});
}
function Select({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "h-11 rounded-full bg-card px-3 text-xs font-medium text-ink shadow-[var(--shadow-float)] outline-none",
		children: options.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: v,
			children: l
		}, v))
	});
}
//#endregion
export { Home as component };
