import { computeSalesStats } from "@/lib/analytics";
import { ADVISOR_LABEL, TC_USD, type KardexProduct, type Sale } from "@/lib/types";

function downloadBlob(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportSalesCsv(rows: Sale[]) {
  const header = [
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
    "ASESOR",
  ];
  const lines = [header.join(",")];
  for (const s of rows) {
    lines.push(
      [
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
        s.advisor,
      ].join(","),
    );
  }
  downloadBlob("Fresita_Beauty_Ventas_Q1_2026.csv", lines.join("\n"), "text/csv;charset=utf-8");
}

function csv(v: string) {
  if (v.includes(",") || v.includes('"')) return `"${v.replaceAll('"', '""')}"`;
  return v;
}

export async function exportOfflineHtml(sales: Sale[], kardex: KardexProduct[]) {
  const logo = await toDataUri("/logo_fresita.png");
  const stats = computeSalesStats(sales);
  const html = buildHtml(sales, kardex, stats, logo);
  downloadBlob("Fresita_Beauty_ERP.html", html, "text/html;charset=utf-8");
}

async function toDataUri(src: string) {
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

function buildHtml(
  sales: Sale[],
  kardex: KardexProduct[],
  stats: ReturnType<typeof computeSalesStats>,
  logo: string,
) {
  const payload = JSON.stringify({ sales, kardex }).replace(/</g, "\\u003c");
  const star = stats.starProduct ?? "Labial Berry Chic";
  const starPct = stats.starPct.toFixed(1);
  const alerts = kardex.filter((p) => p.current <= p.reorder);
  const insightInv = alerts.length
    ? `Riesgo de quiebre en ${alerts.map((p) => p.name).join(", ")}. Emitir orden de compra prioritaria hoy.`
    : "Stock saludable. Ningún SKU está en o bajo el punto de reorden (50 / 60 uds).";
  const advisors = stats.byAdvisor
    .map(
      (a) =>
        `<div class="row"><span>${a.label}</span><b>S/ ${a.totalS.toLocaleString("es-PE")}</b></div>`,
    )
    .join("");

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
      <div class="kpi"><span>Ingreso neto USD</span><b>US$ ${stats.netUsd.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</b></div>
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
</script>
</body></html>`;
}
