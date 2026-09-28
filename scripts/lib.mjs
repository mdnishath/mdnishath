import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const C = {
  bg0: "#070B17",
  bg1: "#0D1326",
  card: "#0F172A",
  cardHi: "#131C33",
  line: "#243049",
  text: "#F1F5F9",
  soft: "#CBD5E1",
  muted: "#94A3B8",
  dim: "#64748B",
  violet: "#8B5CF6",
  violetHi: "#C4B5FD",
  cyan: "#22D3EE",
  pink: "#F472B6",
  green: "#34D399",
  amber: "#FBBF24",
};

export const SANS =
  "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Ubuntu, Arial, sans-serif";
export const MONO =
  "'SFMono-Regular', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace";

export const REDUCED =
  "@media (prefers-reduced-motion: reduce){*{animation:none!important}}";

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const sansW = (s, size, bold = false) =>
  s.length * size * (bold ? 0.6 : 0.55);
export const monoW = (s, size) => s.length * size * 0.602;

export function wrap(text, maxChars, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      lines.push(cur.trim());
      cur = w;
    } else cur += " " + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s,.;:—-]+\S*$/, "") + "…";
    return kept;
  }
  return lines;
}

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const r1 = (n) => Math.round(n * 10) / 10;

export function write(rel, svg) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.replace(/\n\s+/g, "\n").trim() + "\n");
  console.log("wrote", rel, `${(svg.length / 1024).toFixed(1)}kb`);
}

export const svgOpen = (w, h, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">`;
