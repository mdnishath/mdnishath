import { execSync } from "node:child_process";
import { C, SANS, MONO, REDUCED, esc, r1, write, svgOpen } from "./lib.mjs";

const LOGIN = process.env.PROFILE_LOGIN || "mdnishath";
const TOKEN =
  process.env.GITHUB_TOKEN || execSync("gh auth token", { encoding: "utf8" }).trim();

async function gql(query, variables = {}) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { authorization: `bearer ${TOKEN}`, "content-type": "application/json", "user-agent": "profile-stats" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? json));
  return json.data;
}

const base = await gql(
  `query($login:String!){user(login:$login){
    contributionsCollection{contributionYears contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}
    repositories(ownerAffiliations:OWNER,privacy:PUBLIC,isFork:false,first:100){totalCount nodes{languages(first:8,orderBy:{field:SIZE,direction:DESC}){edges{size node{name}}}}}
  }}`,
  { login: LOGIN }
);
const user = base.user;
const years = user.contributionsCollection.contributionYears;
const perYear = await gql(
  `query($login:String!){user(login:$login){${years
    .map((y) => `y${y}:contributionsCollection(from:"${y}-01-01T00:00:00Z",to:"${y}-12-31T23:59:59Z"){contributionCalendar{totalContributions}}`)
    .join(" ")}}}`,
  { login: LOGIN }
);
const allTime = Object.values(perYear.user).reduce((n, y) => n + y.contributionCalendar.totalContributions, 0);

const weeks = user.contributionsCollection.contributionCalendar.weeks;
const days = weeks.flatMap((w) => w.contributionDays);
const lastYear = user.contributionsCollection.contributionCalendar.totalContributions;
const activeDays = days.filter((d) => d.contributionCount > 0).length;
const weekly = weeks.map((w) => ({
  date: w.contributionDays[0].date,
  n: w.contributionDays.reduce((s, d) => s + d.contributionCount, 0),
}));

const langBytes = {};
for (const repo of user.repositories.nodes)
  for (const e of repo.languages.edges) langBytes[e.node.name] = (langBytes[e.node.name] || 0) + e.size;
const langTotal = Object.values(langBytes).reduce((a, b) => a + b, 0);
const ranked = Object.entries(langBytes).sort((a, b) => b[1] - a[1]);
const top = ranked.slice(0, 5).map(([name, size]) => ({ name, pct: (size / langTotal) * 100 }));
const otherPct = 100 - top.reduce((s, l) => s + l.pct, 0);

// Categorical slots are bound to the language, not its rank, so colours stay stable between runs.
const SLOT = { TypeScript: "#3987e5", JavaScript: "#d95926", PHP: "#199e70", HTML: "#c98500", CSS: "#d55181", Python: "#9085e9", Kotlin: "#e66767", Rust: "#008300" };
const SPARE = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9", "#e66767"];
const used = new Set(top.map((l) => SLOT[l.name]).filter(Boolean));
for (const l of top) {
  l.color = SLOT[l.name] ?? SPARE.find((c) => !used.has(c));
  used.add(l.color);
}
const langs = otherPct > 0.5 ? [...top, { name: "Other", pct: otherPct, color: "#64748B" }] : top;

const fmt = (n) => n.toLocaleString("en-US");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const W = 1200;
const PAD = 28;
const panel = (x, y, w, h, inner) =>
  `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="20" fill="url(#card)"/><rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="20" fill="none" stroke="${C.line}" stroke-width="1.5"/>${inner}</g>`;

/* tiles */
const tiles = [
  [fmt(allTime), "contributions", `since ${Math.min(...years)}`, C.violet],
  [fmt(lastYear), "contributions", "in the last 12 months", C.cyan],
  [fmt(user.repositories.totalCount), "public repositories", "original work, no forks", C.pink],
  [fmt(activeDays), "active days", "in the last 12 months", C.green],
];
const TW = 282, TH = 132, GAP = 24;
const tileSvg = tiles
  .map(([n, l, s, color], i) =>
    `<g class="up" style="animation-delay:${i * 0.12}s">${panel(
      i * (TW + GAP), 0, TW, TH,
      `<rect x="24" y="26" width="4" height="40" rx="2" fill="${color}"/>
       <text class="num" x="40" y="62">${esc(n)}</text>
       <text class="lab" x="24" y="94">${esc(l)}</text>
       <text class="sub" x="24" y="115">${esc(s)}</text>`
    )}</g>`
  )
  .join("");

/* weekly trend */
const CH_W = 768, CH_H = 300;
const plot = { x: 58, y: 66, w: CH_W - 58 - 30, h: 176 };
const maxW = Math.max(...weekly.map((w) => w.n), 1);
const step = Math.max(1, Math.ceil(maxW / 4 / 5) * 5);
const yMax = Math.ceil(maxW / step) * step;
const px = (i) => plot.x + (i / (weekly.length - 1)) * plot.w;
const py = (v) => plot.y + plot.h - (v / yMax) * plot.h;
const pts = weekly.map((w, i) => [px(i), py(w.n)]);
let line = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
for (let i = 1; i < pts.length; i++) {
  const [x0, y0] = pts[i - 1];
  const [x1, y1] = pts[i];
  const mx = (x0 + x1) / 2;
  line += ` C${r1(mx)} ${r1(y0)} ${r1(mx)} ${r1(y1)} ${r1(x1)} ${r1(y1)}`;
}
const area = `${line} L${r1(plot.x + plot.w)} ${plot.y + plot.h} L${plot.x} ${plot.y + plot.h} Z`;
const grid = [];
for (let v = 0; v <= yMax; v += step)
  grid.push(`<line x1="${plot.x}" x2="${plot.x + plot.w}" y1="${r1(py(v))}" y2="${r1(py(v))}" stroke="#FFFFFF" stroke-opacity="${v ? 0.07 : 0.18}"/><text class="ax" x="${plot.x - 12}" y="${r1(py(v) + 5)}" text-anchor="end">${v}</text>`);
const xl = [];
let prevMonth = -1;
weekly.forEach((w, i) => {
  const m = new Date(w.date + "T00:00:00Z").getUTCMonth();
  if (m !== prevMonth && i > 0 && i < weekly.length - 2 && m % 2 === 0) xl.push(`<text class="ax" x="${r1(px(i))}" y="${plot.y + plot.h + 26}" text-anchor="middle">${MONTHS[m]}</text>`);
  prevMonth = m;
});
const peakI = weekly.reduce((b, w, i) => (w.n > weekly[b].n ? i : b), 0);
const [pkx, pky] = pts[peakI];
const peakLabel = `${weekly[peakI].n} in one week`;
const anchor = pkx > plot.x + plot.w - 110 ? "end" : pkx < plot.x + 110 ? "start" : "middle";
const chart = panel(
  0, 0, CH_W, CH_H,
  `<text class="h" x="28" y="40">Weekly contributions</text>
   <text class="sub" x="${CH_W - 28}" y="40" text-anchor="end">last 12 months</text>
   ${grid.join("")}${xl.join("")}
   <path class="fade" d="${area}" fill="url(#area)"/>
   <path class="draw" d="${line}" fill="none" stroke="${C.violet}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" />
   <g class="fade"><circle class="ping" cx="${r1(pkx)}" cy="${r1(pky)}" r="5" fill="${C.violet}"/>
   <circle cx="${r1(pkx)}" cy="${r1(pky)}" r="5" fill="${C.violet}" stroke="${C.card}" stroke-width="2"/>
   <text class="pk" x="${r1(pkx)}" y="${r1(Math.max(pky - 14, plot.y - 6))}" text-anchor="${anchor}">${esc(peakLabel)}</text></g>`
);

/* languages */
const LG_W = W - CH_W - GAP;
const barW = LG_W - 56;
let bx = 0;
const segs = langs
  .map((l, i) => {
    const w = Math.max((l.pct / 100) * barW - 2, 1);
    const out = `<rect x="${r1(bx)}" width="${r1(w)}" height="14" rx="4" fill="${l.color}"/>`;
    bx += w + 2;
    return out;
  })
  .join("");
const legend = langs
  .map(
    (l, i) =>
      `<g class="up" style="animation-delay:${0.5 + i * 0.08}s"><g transform="translate(28 ${118 + i * 29})"><rect y="-11" width="12" height="12" rx="3" fill="${l.color}"/><text class="lg" x="24" y="0">${esc(l.name)}</text><text class="lv" x="${barW}" y="0" text-anchor="end">${l.pct.toFixed(1)}%</text></g></g>`
  )
  .join("");
const langPanel = panel(
  CH_W + GAP, 0, LG_W, CH_H,
  `<text class="h" x="28" y="40">Languages</text>
   <text class="sub" x="${LG_W - 28}" y="40" text-anchor="end">by code size</text>
   <g transform="translate(28 64)"><g class="grow">${segs}</g></g>${legend}`
);

/* heatmap */
const CELL = 17, CG = 4.3;
const HM_H = 250;
const hx = 66, hy = 76;
const maxD = Math.max(...days.map((d) => d.contributionCount), 1);
const RAMP = ["#1B2440", "#3B2A78", "#5B3FB5", "#7C5CE6", "#B9A5FF"];
const level = (n) => (n === 0 ? 0 : Math.min(4, 1 + Math.floor(((n - 1) / maxD) * 4)));
let cells = "";
const mlabels = [];
let pm = -1;
weeks.forEach((w, wi) => {
  const first = new Date(w.contributionDays[0].date + "T00:00:00Z");
  if (first.getUTCMonth() !== pm && wi < weeks.length - 1) {
    if (pm !== -1 || first.getUTCDate() <= 7) mlabels.push(`<text class="ax" x="${r1(hx + wi * (CELL + CG))}" y="${hy - 12}">${MONTHS[first.getUTCMonth()]}</text>`);
    pm = first.getUTCMonth();
  }
  let col = "";
  for (const d of w.contributionDays) {
    const dow = new Date(d.date + "T00:00:00Z").getUTCDay();
    col += `<rect x="${r1(hx + wi * (CELL + CG))}" y="${r1(hy + dow * (CELL + CG))}" width="${CELL}" height="${CELL}" rx="4" fill="${RAMP[level(d.contributionCount)]}"/>`;
  }
  cells += `<g class="cell" style="animation-delay:${r1(0.4 + wi * 0.025)}s">${col}</g>`;
});
const dl = [[1, "Mon"], [3, "Wed"], [5, "Fri"]]
  .map(([d, n]) => `<text class="ax" x="28" y="${r1(hy + d * (CELL + CG) + 13)}">${n}</text>`)
  .join("");
const keyX = W - 28 - 5 * 22 - 48;
const key = `<text class="ax" x="${keyX - 10}" y="41" text-anchor="end">Less</text>${RAMP.map((c, i) => `<rect x="${keyX + i * 22}" y="28" width="17" height="17" rx="4" fill="${c}"/>`).join("")}<text class="ax" x="${keyX + 5 * 22 + 6}" y="41">More</text>`;
const heat = panel(0, 0, W, HM_H, `<text class="h" x="28" y="40">Daily activity</text>${key}${mlabels.join("")}${dl}${cells}`);

const H = TH + GAP + CH_H + GAP + HM_H;
const updated = new Date().toISOString().slice(0, 10);
const svg = `${svgOpen(W, H, `GitHub activity for ${LOGIN}: ${fmt(allTime)} contributions all time, ${fmt(lastYear)} in the last 12 months`)}
<desc>Updated ${updated}. Languages: ${langs.map((l) => `${l.name} ${l.pct.toFixed(1)}%`).join(", ")}.</desc>
<defs>
  <linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cardHi}"/><stop offset="1" stop-color="#0A1020"/></linearGradient>
  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.violet}" stop-opacity=".38"/><stop offset="1" stop-color="${C.violet}" stop-opacity="0"/></linearGradient>
</defs>
<style>
  .num{font:800 38px ${SANS};fill:${C.text};letter-spacing:-1px}
  .lab{font:600 16.5px ${SANS};fill:${C.soft}}
  .sub{font:400 14.5px ${SANS};fill:${C.muted}}
  .h{font:700 20px ${SANS};fill:${C.text}}
  .ax{font:500 13.5px ${MONO};fill:${C.muted}}
  .pk{font:700 14.5px ${SANS};fill:${C.text}}
  .lg{font:600 16px ${SANS};fill:${C.soft}}
  .lv{font:600 15px ${MONO};fill:${C.muted}}
  .up{animation:up .7s cubic-bezier(.2,.7,.2,1) both}
  .draw{animation:draw 2.4s ease-out .3s both}
  .fade{animation:fade 1.2s ease-out 1.6s both}
  .grow{animation:grow 1.2s cubic-bezier(.2,.7,.2,1) .3s both}
  .cell{animation:fade .5s ease-out both}
  .ping{animation:ping 2.4s ease-out 2.8s infinite}
  @keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
  @keyframes fade{from{opacity:0}to{opacity:1}}
  @keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes ping{0%{r:5;opacity:.7}100%{r:18;opacity:0}}
  ${REDUCED}
</style>
${tileSvg}
<g transform="translate(0 ${TH + GAP})">${chart}${langPanel}</g>
<g transform="translate(0 ${TH + GAP + CH_H + GAP})">${heat}</g>
</svg>`;

write("assets/stats.svg", svg);
console.log(JSON.stringify({ allTime, lastYear, repos: user.repositories.totalCount, activeDays, maxW, langs: langs.map((l) => `${l.name}:${l.pct.toFixed(1)}:${l.color}`) }));
