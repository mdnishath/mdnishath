import * as si from "simple-icons";
import { C, SANS, MONO, REDUCED, esc, sansW, monoW, wrap, rng, r1, write, svgOpen } from "./lib.mjs";

const W = 1200;

function brand(icon) {
  const hex = icon.hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.28 ? "#FFFFFF" : `#${hex}`;
}

const glyph = (icon, size, fill) =>
  `<g transform="scale(${r1(size / 24)}) translate(-12 -12)"><path fill="${fill}" d="${icon.path}"/></g>`;

/* ------------------------------------------------------------------ hero */
function hero() {
  const H = 470;
  const rand = rng(7);
  const particles = Array.from({ length: 54 }, () => {
    const x = r1(rand() * W);
    const y = r1(rand() * H);
    const r = r1(0.6 + rand() * 1.6);
    const d = r1(2 + rand() * 5);
    const delay = r1(rand() * -6);
    return `<circle class="tw" cx="${x}" cy="${y}" r="${r}" style="animation-duration:${d}s;animation-delay:${delay}s"/>`;
  }).join("");

  const orbit = (radius, items, cls, rev) =>
    `<g class="${cls}">${items
      .map((icon, i) => {
        const a = (360 / items.length) * i;
        return `<g transform="rotate(${a}) translate(${radius} 0) rotate(${-a})"><g class="${rev}">
          <circle r="25" fill="${C.card}" stroke="${C.line}" stroke-width="1.5"/>
          ${glyph(icon, 24, brand(icon))}
        </g></g>`;
      })
      .join("")}</g>`;

  const words = ["full-stack web apps", "desktop software", "WordPress plugins", "AI-powered tools"];
  const chips = ["Next.js", "React", "TypeScript", "Node.js", "Electron", "WordPress"];
  let cx = 84;
  const chipSvg = chips
    .map((c) => {
      const w = Math.round(sansW(c, 16, true) + 34);
      const out = `<g transform="translate(${cx} 322)"><rect width="${w}" height="36" rx="18" fill="#FFFFFF" fill-opacity=".05" stroke="#FFFFFF" stroke-opacity=".14"/><text x="${w / 2}" y="24" text-anchor="middle" class="chip">${esc(c)}</text></g>`;
      cx += w + 10;
      return out;
    })
    .join("");

  const facts = [
    ["6+", "years experience"],
    ["80+", "public repositories"],
    ["Remote", "working worldwide"],
  ];
  const factSvg = facts
    .map(
      ([n, l], i) =>
        `<g transform="translate(${[84, 300, 548][i]} 398)"><text class="fn" y="22">${esc(n)}</text><text class="fl" x="${Math.round(n.length * 24 * 0.68 + 12)}" y="21">${esc(l)}</text></g>`
    )
    .join("");

  return `${svgOpen(W, H, "Md Nishath Khandakar — Full Stack Developer")}
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1020"/><stop offset=".55" stop-color="${C.bg0}"/><stop offset="1" stop-color="#120A2A"/></linearGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${C.violetHi}"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.cyan}"/><stop offset="1" stop-color="${C.violet}"/></linearGradient>
    <radialGradient id="fade" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <mask id="gridMask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#FFFFFF" stroke-opacity=".07"/></pattern>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
    <clipPath id="clip"><rect width="${W}" height="${H}" rx="28"/></clipPath>
  </defs>
  <style>
    .hello{font:500 19px ${MONO};fill:${C.muted}}
    .name{font:800 60px ${SANS};fill:url(#name);letter-spacing:-1.2px}
    .role{font:600 30px ${SANS};fill:${C.soft}}
    .word{font:700 30px ${SANS};fill:url(#accent);opacity:0;animation:word 12s infinite}
    .w1{animation-delay:0s}.w2{animation-delay:3s}.w3{animation-delay:6s}.w4{animation-delay:9s}
    .chip{font:600 16px ${SANS};fill:${C.soft}}
    .fn{font:800 24px ${SANS};fill:${C.text}}
    .fl{font:500 16px ${SANS};fill:${C.muted}}
    .hire{font:600 15px ${SANS};fill:#A7F3D0}
    .code{font:700 34px ${MONO};fill:#FFFFFF}
    .tw{fill:#FFFFFF;animation:tw 4s ease-in-out infinite}
    .b1{animation:drift1 16s ease-in-out infinite}
    .b2{animation:drift2 20s ease-in-out infinite}
    .b3{animation:drift3 24s ease-in-out infinite}
    .spin{animation:spin 38s linear infinite}
    .spinr{animation:spin 38s linear infinite reverse}
    .spin2{animation:spin 56s linear infinite reverse}
    .spin2r{animation:spin 56s linear infinite}
    .pulse{animation:pulse 2.2s ease-out infinite}
    .core{animation:float 6s ease-in-out infinite}
    @keyframes word{0%{opacity:0;transform:translateY(16px)}3%,22%{opacity:1;transform:translateY(0)}25%,100%{opacity:0;transform:translateY(-16px)}}
    @keyframes tw{0%,100%{opacity:.08}50%{opacity:.7}}
    @keyframes drift1{0%,100%{transform:translate(0,0)}50%{transform:translate(120px,60px)}}
    @keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-140px,-50px)}}
    @keyframes drift3{0%,100%{transform:translate(0,0)}50%{transform:translate(80px,-70px)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%{r:6;opacity:.7}100%{r:17;opacity:0}}
    @keyframes float{0%,100%{transform:translateY(-5px)}50%{transform:translateY(5px)}}
    @media (prefers-reduced-motion: reduce){*{animation:none!important}.w1{opacity:1}}
  </style>
  <g clip-path="url(#clip)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g filter="url(#blur)" opacity=".55">
      <circle class="b1" cx="140" cy="60" r="190" fill="${C.violet}"/>
      <circle class="b2" cx="1060" cy="420" r="210" fill="#2563EB"/>
      <circle class="b3" cx="760" cy="40" r="130" fill="${C.cyan}" opacity=".6"/>
    </g>
    <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#gridMask)"/>
    ${particles}

    <g transform="translate(84 62)">
      <rect width="196" height="36" rx="18" fill="#10B981" fill-opacity=".12" stroke="#34D399" stroke-opacity=".4"/>
      <circle class="pulse" cx="22" cy="18" r="6" fill="${C.green}"/>
      <circle cx="22" cy="18" r="5" fill="${C.green}"/>
      <text class="hire" x="38" y="23.5">Available for new work</text>
    </g>

    <text class="hello" x="86" y="148">// hello world, I'm</text>
    <text class="name" x="83" y="218">Md Nishath Khandakar</text>
    <text class="role" x="84" y="276">I build</text>
    <g transform="translate(196 276)">
      ${words.map((w, i) => `<text class="word w${i + 1}">${esc(w)}</text>`).join("")}
    </g>
    ${chipSvg}
    <rect x="84" y="380" width="700" height="1" fill="#FFFFFF" fill-opacity=".1"/>
    ${factSvg}

    <g transform="translate(1004 236)">
      <circle r="88" fill="none" stroke="#FFFFFF" stroke-opacity=".1" stroke-dasharray="3 9"/>
      <circle r="146" fill="none" stroke="#FFFFFF" stroke-opacity=".08" stroke-dasharray="3 9"/>
      ${orbit(88, [si.siReact, si.siNextdotjs, si.siTypescript], "spin", "spinr")}
      ${orbit(146, [si.siNodedotjs, si.siElectron, si.siWordpress, si.siTailwindcss, si.siPython], "spin2", "spin2r")}
      <g class="core">
        <rect x="-46" y="-46" width="92" height="92" rx="24" fill="url(#accent)"/>
        <rect x="-43" y="-43" width="86" height="86" rx="21" fill="${C.bg1}"/>
        <text class="code" text-anchor="middle" y="12">&lt;/&gt;</text>
      </g>
    </g>
    <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="28" fill="none" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="1.5"/>
  </g>
</svg>`;
}

/* -------------------------------------------------------------- terminal */
function terminal() {
  const lines = [
    { t: [["$ ", C.green], ["whoami", C.text]], type: true },
    { t: [["nishath", C.violetHi], [" — full stack developer, 6+ years in production", C.soft]] },
    { t: [["$ ", C.green], ["cat focus.txt", C.text]], type: true },
    { t: [["→ ", C.cyan], ["scalable web apps   ", C.soft], ["→ ", C.cyan], ["clean UI/UX   ", C.soft], ["→ ", C.cyan], ["APIs   ", C.soft], ["→ ", C.cyan], ["desktop & automation", C.soft]] },
    { t: [["$ ", C.green], ["cat workflow.txt", C.text]], type: true },
    { t: [["AI-powered development with Claude Code — ship faster, keep quality", C.soft]] },
    { t: [["$ ", C.green], ["status --hire", C.text]], type: true },
    { t: [["● ", C.green], ["open to freelance · contract · long-term collaboration", C.soft]] },
  ];
  const FS = 19;
  const LH = 35;
  const top = 108;
  const H = top + lines.length * LH + 56;
  const total = 22;
  let clock = 0.8;
  let css = "";
  const body = lines
    .map((l, i) => {
      const chars = l.t.reduce((n, [s]) => n + s.length, 0);
      const dur = l.type ? 0.9 : 0.05;
      const start = clock;
      clock += dur + (l.type ? 0.35 : 0.75);
      const p0 = r1((start / total) * 100);
      const p1 = r1(((start + dur) / total) * 100);
      const timing = l.type ? `steps(${chars - 2},end)` : "linear";
      const from = l.type ? Math.round(monoW("$ ", FS)) : 0;
      css += `.c${i}{animation:c${i} ${total}s infinite}@keyframes c${i}{0%,${r1(p0 - 0.05)}%{transform:translateX(0)}${p0}%{transform:translateX(${from}px);animation-timing-function:${timing}}${p1}%,97%{transform:translateX(1200px)}100%{transform:translateX(0)}}`;
      const y = top + i * LH;
      return `<text class="ln" x="56" y="${y}" xml:space="preserve">${l.t
        .map(([s, c]) => `<tspan fill="${c}">${esc(s)}</tspan>`)
        .join("")}</text><rect class="cv c${i}" x="52" y="${y - 25}" width="1150" height="${LH}" fill="${C.card}"/>`;
    })
    .join("");
  const endY = top + lines.length * LH;
  const pEnd = r1((clock / total) * 100);
  return `${svgOpen(W, H, "About Nishath — terminal")}
  <defs>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.violet}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>
    <clipPath id="clip"><rect width="${W}" height="${H}" rx="22"/></clipPath>
  </defs>
  <style>
    .ln{font:500 ${FS}px ${MONO}}
    .ttl{font:500 15px ${MONO};fill:${C.dim}}
    .cur{fill:${C.violetHi};opacity:0;animation:cur ${total}s infinite}
    .blink{animation:blink 1.1s steps(1) infinite}
    ${css}
    @keyframes cur{0%,${pEnd}%{opacity:0}${r1(pEnd + 0.1)}%,97%{opacity:1}100%{opacity:0}}
    @keyframes blink{50%{opacity:0}}
    @media (prefers-reduced-motion: reduce){*{animation:none!important}.cv{opacity:0}.cur{opacity:1}}
  </style>
  <g clip-path="url(#clip)">
    <rect width="${W}" height="${H}" fill="${C.card}"/>
    <rect width="${W}" height="54" fill="#0B1222"/>
    <rect y="53" width="${W}" height="1" fill="${C.line}"/>
    <circle cx="34" cy="27" r="7" fill="#F87171"/><circle cx="58" cy="27" r="7" fill="${C.amber}"/><circle cx="82" cy="27" r="7" fill="${C.green}"/>
    <text class="ttl" x="${W / 2}" y="32" text-anchor="middle">nishath@dev: ~/about</text>
    ${body}
    <text class="ln cur" x="56" y="${endY}" style="fill:${C.green}">$</text>
    <g class="blink"><rect class="cur" x="${56 + Math.round(monoW("$ ", FS))}" y="${endY - 19}" width="11" height="24" rx="2"/></g>
    <rect y="${H - 3}" width="${W}" height="3" fill="url(#bar)"/>
    <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="22" fill="none" stroke="${C.line}" stroke-width="1.5"/>
  </g>
</svg>`;
}

/* --------------------------------------------------------------- headers */
function header(num, title, sub) {
  const H = 96;
  const tw = Math.round(sansW(title, 36, true)) + 96;
  return `${svgOpen(W, H, title)}
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient>
    <linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7C3AED" stop-opacity=".7"/><stop offset="1" stop-color="#0EA5E9" stop-opacity="0"/></linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22D3EE" stop-opacity="0"/><stop offset=".5" stop-color="#22D3EE"/><stop offset="1" stop-color="#22D3EE" stop-opacity="0"/></linearGradient>
    <clipPath id="c"><rect x="${tw}" y="0" width="${W - tw}" height="${H}"/></clipPath>
  </defs>
  <style>
    .n{font:700 17px ${MONO};fill:#7C3AED}
    .t{font:800 36px ${SANS};fill:url(#g);letter-spacing:-.5px}
    .s{font:500 16px ${SANS};fill:#64748B}
    .sw{animation:sw 4.5s ease-in-out infinite}
    @keyframes sw{0%{transform:translateX(0)}100%{transform:translateX(${W}px)}}
    ${REDUCED}
  </style>
  <rect x="0" y="12" width="52" height="34" rx="10" fill="#7C3AED" fill-opacity=".12" stroke="#7C3AED" stroke-opacity=".45"/>
  <text class="n" x="26" y="35" text-anchor="middle">${esc(num)}</text>
  <text class="t" x="70" y="42">${esc(title)}</text>
  <text class="s" x="71" y="72">${esc(sub)}</text>
  <rect x="${tw}" y="29" width="${W - tw}" height="2" rx="1" fill="url(#l)"/>
  <g clip-path="url(#c)"><rect class="sw" x="${tw - 160}" y="28" width="160" height="4" rx="2" fill="url(#s)"/></g>
</svg>`;
}

/* ----------------------------------------------------------------- bento */
function services() {
  const items = [
    ["Full-Stack Web Apps", "React, Next.js, Node.js, Express, MongoDB, PostgreSQL and Supabase — end to end.", C.violet, "M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5"],
    ["Business Sites & SEO", "Fast, responsive, lead-generating websites with clean Lighthouse scores.", C.cyan, "M3 17l6-6 4 4 8-8 M14 7h7v7"],
    ["WordPress & WooCommerce", "Custom plugins, headless WordPress and WPGraphQL storefronts.", C.pink, "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.3 7 12 12l8.7-5 M12 22V12"],
    ["Desktop Apps & Automation", "Electron apps with auto-update, plus Python and Playwright automation.", C.green, "M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 21h8 M12 17v4"],
    ["APIs & Backends", "REST and GraphQL APIs, authentication, payments and database design.", C.amber, "M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M4 14h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z M6 6h.01 M6 18h.01"],
    ["AI Integrations", "MCP servers, LLM integrations, Claude Code skills and developer tooling.", "#60A5FA", "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"],
  ];
  const cw = 384, ch = 232, gap = 24;
  const H = ch * 2 + gap;
  const per = 2 * (cw + ch);
  const cards = items
    .map(([title, desc, color, icon], i) => {
      const x = (i % 3) * (cw + gap);
      const y = Math.floor(i / 3) * (ch + gap);
      const d = wrap(desc, 38, 3);
      return `<g transform="translate(${x} ${y})">
        <rect width="${cw}" height="${ch}" rx="20" fill="url(#card)"/>
        <g clip-path="url(#cc)"><circle cx="${cw - 10}" cy="0" r="210" fill="url(#gl${i})"/></g>
        <rect x=".75" y=".75" width="${cw - 1.5}" height="${ch - 1.5}" rx="20" fill="none" stroke="${C.line}" stroke-width="1.5"/>
        <rect class="sweep" style="animation-delay:${-i * 1.3}s" x=".75" y=".75" width="${cw - 1.5}" height="${ch - 1.5}" rx="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-dasharray="150 ${per}" pathLength="${per + 150}"/>
        <rect x="28" y="28" width="56" height="56" rx="16" fill="${color}" fill-opacity=".14" stroke="${color}" stroke-opacity=".5"/>
        <g transform="translate(44 44)"><path d="${icon}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
        <text class="t" x="28" y="126">${esc(title)}</text>
        ${d.map((l, k) => `<text class="d" x="28" y="${158 + k * 25}">${esc(l)}</text>`).join("")}
      </g>`;
    })
    .join("");
  return `${svgOpen(W, H, "What I do")}
  <defs><linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cardHi}"/><stop offset="1" stop-color="#0A1020"/></linearGradient>
  <clipPath id="cc"><rect width="${cw}" height="${ch}" rx="20"/></clipPath>${items.map(([, , color], i) => `<radialGradient id="gl${i}"><stop offset="0" stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`).join("")}</defs>
  <style>
    .t{font:700 23px ${SANS};fill:${C.text}}
    .d{font:400 17px ${SANS};fill:${C.muted}}
    .sweep{animation:sweep 8s linear infinite}
    @keyframes sweep{from{stroke-dashoffset:${per + 150}}to{stroke-dashoffset:0}}
    ${REDUCED}
  </style>
  ${cards}
</svg>`;
}

/* --------------------------------------------------------------- marquee */
function stack() {
  const rows = [
    [si.siNextdotjs, si.siReact, si.siTypescript, si.siJavascript, si.siTailwindcss, si.siRedux, si.siShadcnui, si.siFramer, si.siMui, si.siSass, si.siHtml5, si.siCss],
    [si.siNodedotjs, si.siExpress, si.siMongodb, si.siPostgresql, si.siMysql, si.siSupabase, si.siFirebase, si.siGraphql, si.siPrisma, si.siPhp, si.siWordpress, si.siWoocommerce],
    [si.siElectron, si.siPython, si.siRust, si.siKotlin, si.siDocker, si.siGit, si.siGithub, si.siVercel, si.siGooglecloud, si.siFigma, si.siClaude, si.siAnthropic],
  ];
  const names = { "Next.js": "Next.js", "Node.js": "Node.js", "shadcn/ui": "shadcn/ui", "Google Cloud": "Google Cloud" };
  const RH = 62;
  const H = rows.length * RH + 6;
  let css = "";
  const body = rows
    .map((row, ri) => {
      let x = 0;
      const pills = row
        .map((icon) => {
          const label = names[icon.title] ?? icon.title;
          const w = Math.round(sansW(label, 17, true) + 66);
          const out = `<g transform="translate(${x} 0)"><rect width="${w}" height="48" rx="24" fill="${C.card}" stroke="${C.line}" stroke-width="1.5"/><g transform="translate(28 24)">${glyph(icon, 22, brand(icon))}</g><text class="p" x="50" y="30">${esc(label)}</text></g>`;
          x += w + 14;
          return out;
        })
        .join("");
      const len = x;
      const dir = ri % 2 ? "reverse" : "normal";
      css += `.r${ri}{animation:m${ri} ${38 + ri * 8}s linear infinite ${dir}}@keyframes m${ri}{from{transform:translateX(0)}to{transform:translateX(${-len}px)}}`;
      return `<g transform="translate(0 ${4 + ri * RH})"><g class="r${ri}">${pills}<g transform="translate(${len} 0)">${pills}</g></g></g>`;
    })
    .join("");
  return `${svgOpen(W, H, "Tech stack")}
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".1" stop-color="#fff"/><stop offset=".9" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="m"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>
  <style>.p{font:600 17px ${SANS};fill:${C.soft}}${css}${REDUCED}</style>
  <g mask="url(#m)">${body}</g>
</svg>`;
}

/* ----------------------------------------------------------------- cards */
const ICONS = {
  plug: "M12 22v-5 M9 8V2 M15 8V2 M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z",
  cart: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  tag: "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z M7 7h.01",
  check: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  rocket: "M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z M12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0 M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  scale: "M12 3v18 M5 21h14 M5 7l-3 7a4 4 0 0 0 6 0L5 7z M19 7l-3 7a4 4 0 0 0 6 0l-3-7z M4 7h16",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z M2 21c0-3 1.9-5.4 5.1-6",
  flask: "M9 2h6 M10 2v6L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8V2 M7 15h10",
  building: "M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16 M9 7h2 M13 7h2 M9 11h2 M13 11h2 M9 15h2 M13 15h2",
  tool: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  cap: "M22 10 12 5 2 10l10 5 10-5z M6 12v5c3 3 9 3 12 0v-5",
  truck: "M1 3h15v13H1z M16 8h4l3 3v5h-7z M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
};

function card({ slug, kind, title, desc, tags, color, icon, foot, live }) {
  const cw = 588, ch = 272, gut = 14;
  const d = wrap(desc, 62, 3);
  let tx = 28;
  const tagSvg = tags
    .map((t) => {
      const w = Math.round(monoW(t, 13.5) + 24);
      const out = `<g transform="translate(${tx} 220)"><rect width="${w}" height="28" rx="14" fill="${color}" fill-opacity=".1" stroke="${color}" stroke-opacity=".35"/><text class="tg" x="${w / 2}" y="18.5" text-anchor="middle">${esc(t)}</text></g>`;
      tx += w + 8;
      return out;
    })
    .join("");
  const kw = Math.round(monoW(kind, 12.5) + (live ? 40 : 24));
  return `${svgOpen(cw, ch + gut, title)}
  <defs>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cardHi}"/><stop offset="1" stop-color="#0A1020"/></linearGradient>
    <linearGradient id="top" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient>
    <clipPath id="c"><rect width="${cw}" height="${ch}" rx="20"/></clipPath>
    <radialGradient id="gl"><stop offset="0" stop-color="${color}" stop-opacity="1"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>
  </defs>
  <style>
    .k{font:700 12.5px ${MONO};fill:${C.soft};letter-spacing:1px}
    .t{font:800 25px ${SANS};fill:${C.text};letter-spacing:-.3px}
    .d{font:400 16.5px ${SANS};fill:${C.muted}}
    .tg{font:600 13.5px ${MONO};fill:${C.soft}}
    .f{font:500 13.5px ${MONO};fill:${C.dim}}
    .glow{animation:glow 7s ease-in-out infinite}
    .arrow{animation:nudge 2.4s ease-in-out infinite}
    .dot{animation:pulse 2s ease-out infinite}
    @keyframes glow{0%,100%{opacity:.22}50%{opacity:.4}}
    @keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
    @keyframes pulse{0%{r:4;opacity:.8}100%{r:11;opacity:0}}
    ${REDUCED}
  </style>
  <g clip-path="url(#c)">
    <rect width="${cw}" height="${ch}" fill="url(#card)"/>
    <circle class="glow" cx="${cw - 20}" cy="-10" r="260" fill="url(#gl)"/>
    <rect width="${cw}" height="3" fill="url(#top)"/>
    <rect x="28" y="30" width="52" height="52" rx="15" fill="${color}" fill-opacity=".14" stroke="${color}" stroke-opacity=".5"/>
    <g transform="translate(42 44)"><path d="${ICONS[icon]}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g transform="translate(${cw - 28 - kw} 42)">
      <rect width="${kw}" height="28" rx="14" fill="#FFFFFF" fill-opacity=".05" stroke="#FFFFFF" stroke-opacity=".14"/>
      ${live ? `<circle class="dot" cx="16" cy="14" r="4" fill="${C.green}"/><circle cx="16" cy="14" r="4" fill="${C.green}"/>` : ""}
      <text class="k" x="${live ? 28 : 12}" y="18.5">${esc(kind)}</text>
    </g>
    <text class="t" x="28" y="122">${esc(title)}</text>
    ${d.map((l, i) => `<text class="d" x="28" y="${152 + i * 24}">${esc(l)}</text>`).join("")}
        ${tagSvg}
    <g transform="translate(${cw - 52} 234)">
      <circle r="17" fill="${color}" fill-opacity=".14" stroke="${color}" stroke-opacity=".5"/>
      <g class="arrow"><path d="M-7 0h12 M1 -5l5 5-5 5" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
    </g>
    <rect x=".75" y=".75" width="${cw - 1.5}" height="${ch - 1.5}" rx="20" fill="none" stroke="${C.line}" stroke-width="1.5"/>
  </g>
</svg>`;
}

const CARDS = [
  { slug: "autocomplete-google-address", kind: "WORDPRESS.ORG", live: true, title: "Autocomplete Google Address", icon: "pin", color: C.green, tags: ["2,000+ installs", "WordPress", "WooCommerce"], desc: "Google Places address autocomplete for any WordPress form — WooCommerce, Contact Form 7, WPForms, Gravity Forms and Elementor." },
  { slug: "wp-ultra-mcp", kind: "OPEN SOURCE", title: "WP Ultra MCP", icon: "plug", color: C.violet, tags: ["PHP", "WordPress", "MCP"], desc: "Turns any WordPress site into an MCP server for AI clients — files, SQL, WP-CLI, content and declarative custom abilities." },
  { slug: "headless-ecommerce", kind: "OPEN SOURCE", title: "Headless E-commerce Boilerplate", icon: "cart", color: C.cyan, tags: ["Next.js 15", "React 19", "WooGraphQL"], desc: "White-label storefront on a headless WooCommerce backend. Multi-client, i18n and multi-currency out of the box." },
  { slug: "security-audit", kind: "OPEN SOURCE", title: "Pre-Launch Security Audit", icon: "shield", color: C.pink, tags: ["Claude Code", "Security"], desc: "Five-phase audit skill that catches leaked secrets, PII leaks, IDOR, injection, auth and payment-logic flaws before launch." },
  { slug: "wc-promo-links", kind: "OPEN SOURCE", title: "WC Promo Links", icon: "tag", color: C.amber, tags: ["PHP", "WooCommerce"], desc: "Share a link and everyone who reaches your store through it gets your coupon applied to cart and checkout automatically." },
  { slug: "md-task-tracker", kind: "OPEN SOURCE", title: "MD Task Tracker", icon: "check", color: "#60A5FA", tags: ["JavaScript", "Windows"], desc: "Turn any Markdown file into a clickable task tracker. Portable Windows app — ticks write straight back into the .md file." },

  { slug: "nexus-v4", kind: "DESKTOP APP", title: "Nexus V4", icon: "rocket", color: C.violet, tags: ["Windows", "Auto-update"], desc: "The latest generation of the Nexus desktop suite, shipped as a Windows installer with a built-in auto-update feed." },
  { slug: "nexus-profile-manager", kind: "DESKTOP APP", title: "Nexus Anty Profile Manager", icon: "users", color: C.cyan, tags: ["Windows", "Auto-update"], desc: "Create, organise and launch isolated browser profiles from a single dashboard, delivered with automatic updates." },
  { slug: "mailnexus-pro", kind: "DESKTOP APP", title: "MailNexus Pro", icon: "mail", color: C.pink, tags: ["Electron", "Auto-update"], desc: "Desktop email management application built on Electron, with seamless updates through electron-updater." },
  { slug: "gmailfinder-ai", kind: "DESKTOP APP", title: "GmailFinder AI", icon: "search", color: C.green, tags: ["Electron", "Python", "Playwright"], desc: "Desktop app pairing an Electron interface with a Python and Playwright automation backend." },

  { slug: "troobiolabs", kind: "LIVE", live: true, title: "TROO Bio-Labs", icon: "flask", color: C.cyan, tags: ["Next.js 16", "WooCommerce", "Zustand"], desc: "Headless e-commerce storefront for research peptides — Next.js front end on a WooCommerce backend, with cart, checkout and 30 prerendered product pages." },
  { slug: "lazar-couverture-27", kind: "LIVE", live: true, title: "Lazar Couverture 27", icon: "home", color: C.violet, tags: ["Next.js 16", "React 19", "SEO"], desc: "86-page website for a roofer in Les Andelys, every page prerendered at build time. No database, no CMS — content lives in code." },
  { slug: "strategimmo", kind: "LIVE", live: true, title: "STRATEGiMMO", icon: "building", color: C.pink, tags: ["React Three Fiber", "GSAP", "Next.js 16"], desc: "Immersive 3D concept for a network of 11 estate agencies in Normandy — scroll-driven cinematic tour and a real 3D map of the region." },
  { slug: "jourdain-metallerie", kind: "LIVE", live: true, title: "Jourdain Métallerie", icon: "tool", color: C.amber, tags: ["React Three Fiber", "GSAP", "Tailwind 4"], desc: "Immersive 3D website concept for a metalwork and locksmith company near Caen, with scroll-driven animation." },
  { slug: "mypeptideguide", kind: "LIVE", live: true, title: "MyPeptideGuide.ai", icon: "book", color: C.green, tags: ["Next.js 16", "Vitest", "Playwright"], desc: "A free guide to the published evidence on peptides. Filters and explains the research; never recommends." },
  { slug: "campus-revenu", kind: "LIVE", live: true, title: "Campus Revenu", icon: "cap", color: "#60A5FA", tags: ["Next.js", "Supabase", "TanStack Query"], desc: "Task-based income platform for students in France, with admin tools, task review and an audit log." },
  { slug: "couverture-jjm", kind: "LIVE", live: true, title: "Couverture J.J.M", icon: "home", color: C.amber, tags: ["Next.js 16", "Tailwind 4", "Framer Motion"], desc: "Lead-generation website for a French roofing and carpentry company in Fréjus. Live at couverturejjm.com." },
  { slug: "koron-podolsky", kind: "LIVE", live: true, title: "Koron & Podolsky, LLP", icon: "scale", color: "#60A5FA", tags: ["Next.js 16", "TypeScript"], desc: "Website for a firm of trial attorneys — clear practice areas, credibility-first design and fast page loads." },
  { slug: "peptidetracker", kind: "LIVE", live: true, title: "PeptideTracker", icon: "activity", color: C.pink, tags: ["Next.js", "TypeScript"], desc: "Doses, labs and recovery on one timeline. Marketing site and graded compound library." },
  { slug: "jardins-val-doise", kind: "LIVE", live: true, title: "Les Jardins du Val-d'Oise", icon: "leaf", color: C.green, tags: ["Next.js", "TypeScript", "SEO"], desc: "Showcase site for a tree-surgery and landscaping business serving Pontoise, Cergy and the Val-d'Oise." },
];

/* ---------------------------------------------------------------- contact */
function cta() {
  const H = 250;
  return `${svgOpen(W, H, "Have a project in mind? Let's build it together.")}
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1E1147"/><stop offset=".5" stop-color="#0B1020"/><stop offset="1" stop-color="#06263A"/></linearGradient>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${C.violetHi}"/></linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#FFFFFF" fill-opacity=".1"/></pattern>
    <clipPath id="c"><rect width="${W}" height="${H}" rx="26"/></clipPath>
  </defs>
  <style>
    .k{font:700 14px ${MONO};fill:${C.cyan};letter-spacing:3px}
    .h{font:800 50px ${SANS};fill:url(#t);letter-spacing:-1px}
    .s{font:400 20px ${SANS};fill:${C.soft}}
    .a{animation:a 14s ease-in-out infinite}.b{animation:b 18s ease-in-out infinite}
    @keyframes a{0%,100%{transform:translate(0,0)}50%{transform:translate(200px,40px)}}
    @keyframes b{0%,100%{transform:translate(0,0)}50%{transform:translate(-220px,-30px)}}
    ${REDUCED}
  </style>
  <g clip-path="url(#c)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g filter="url(#blur)" opacity=".6"><circle class="a" cx="180" cy="40" r="150" fill="${C.violet}"/><circle class="b" cx="1040" cy="230" r="160" fill="#0EA5E9"/></g>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>
    <text class="k" x="${W / 2}" y="70" text-anchor="middle">LET'S WORK TOGETHER</text>
    <text class="h" x="${W / 2}" y="134" text-anchor="middle">Have a project in mind?</text>
    <text class="s" x="${W / 2}" y="180" text-anchor="middle">Freelance, contract or long-term — I reply within a day.</text>
    <rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="26" fill="none" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="1.5"/>
  </g>
</svg>`;
}

function button(slug, label, icon, color) {
  const w = Math.round(sansW(label, 17, true) + 78);
  const h = 52;
  return `${svgOpen(w, h, label)}
  <style>.l{font:700 17px ${SANS};fill:${C.text}}</style>
  <rect width="${w}" height="${h}" rx="26" fill="${C.card}"/>
  <rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="25.25" fill="${color}" fill-opacity=".1" stroke="${color}" stroke-opacity=".6" stroke-width="1.5"/>
  <g transform="translate(32 26)">${glyph(icon, 22, color)}</g>
  <text class="l" x="56" y="32">${esc(label)}</text>
</svg>`;
}

/* ----------------------------------------------------------------- footer */
function footer() {
  const H = 130;
  const wave = (amp, y, phase) => {
    let d = `M${-W} ${y}`;
    for (let x = -W; x < W * 2; x += 150) d += ` q 75 ${phase * amp} 150 0 t 150 0`;
    return `${d} V${H} H${-W} Z`;
  };
  return `${svgOpen(W, H, "footer")}
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient></defs>
  <style>
    .w1{animation:w 11s linear infinite}.w2{animation:w 17s linear infinite reverse}.w3{animation:w 23s linear infinite}
    @keyframes w{from{transform:translateX(0)}to{transform:translateX(600px)}}
    ${REDUCED}
  </style>
  <path class="w3" d="${wave(26, 50, -1)}" fill="url(#g)" opacity=".18"/>
  <path class="w2" d="${wave(22, 66, 1)}" fill="url(#g)" opacity=".3"/>
  <path class="w1" d="${wave(18, 84, -1)}" fill="url(#g)" opacity=".75"/>
</svg>`;
}

/* ------------------------------------------------------------------ build */
write("assets/hero.svg", hero());
write("assets/terminal.svg", terminal());
write("assets/services.svg", services());
write("assets/stack.svg", stack());
write("assets/cta.svg", cta());
write("assets/footer.svg", footer());

[
  ["about", "01", "About", "Who I am and how I work"],
  ["services", "02", "What I Do", "Six things I get hired for"],
  ["stack", "03", "Tech Stack", "Tools I ship production code with"],
  ["opensource", "04", "Open Source", "Plugins and tools used by thousands of sites"],
  ["desktop", "05", "Desktop Software", "Products with installers and auto-update"],
  ["clients", "06", "Featured Work", "Live projects you can open right now"],
  ["activity", "07", "GitHub Activity", "Refreshed automatically every day"],
].forEach(([slug, n, t, s]) => write(`assets/h-${slug}.svg`, header(n, t, s)));

CARDS.forEach((c) => write(`assets/cards/${c.slug}.svg`, card(c)));

[
  ["email", "Email", si.siGmail, "#F87171"],
  ["whatsapp", "WhatsApp", si.siWhatsapp, "#34D399"],
  ["upwork", "Upwork", si.siUpwork, "#84CC16"],
  ["website", "mdnishath.com", si.siGooglechrome, "#A78BFA"],
  ["x", "X / Twitter", si.siX, "#E2E8F0"],
  ["facebook", "Facebook", si.siFacebook, "#60A5FA"],
].forEach(([slug, label, icon, color]) => write(`assets/buttons/${slug}.svg`, button(slug, label, icon, color)));
