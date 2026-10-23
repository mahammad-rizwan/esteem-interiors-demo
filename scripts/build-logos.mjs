// Generates the 8 Esteem logo concepts as outlined (font-free) SVG + PNG files,
// plus src/data/logos.generated.js for inline, theme-aware rendering.
// Usage: node scripts/build-logos.mjs
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const opentype = require('opentype.js');

const FONT_DIR = path.resolve('scripts/fonts');
const OUT_DIR = path.resolve('public/logos');
const GEN_FILE = path.resolve('src/data/logos.generated.js');
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(GEN_FILE), { recursive: true });

const fonts = {};
for (const f of fs.readdirSync(FONT_DIR)) {
  const buf = fs.readFileSync(path.join(FONT_DIR, f));
  fonts[f.replace('.ttf', '')] = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const r = (n) => Math.round(n * 100) / 100;

// Serialise opentype path commands ourselves (opentype 2.0's toPathData can emit NaN).
function pathData(p) {
  return p.commands.map((c) => {
    if (c.type === 'M' || c.type === 'L') return c.type + r(c.x) + ' ' + r(c.y);
    if (c.type === 'Q') return 'Q' + [c.x1, c.y1, c.x, c.y].map(r).join(' ');
    if (c.type === 'C') return 'C' + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].map(r).join(' ');
    return 'Z';
  }).join('');
}

// Measure a string with letter-spacing (tracking in em).
function measure(font, str, size, tracking = 0) {
  let w = 0;
  const glyphs = Array.from(str).map((c) => font.charToGlyph(c));
  glyphs.forEach((g, i) => {
    w += (g.advanceWidth / font.unitsPerEm) * size;
    if (i < glyphs.length - 1) {
      w += tracking * size;
      const k = font.getKerningValue(g, glyphs[i + 1]) || 0;
      w += (k / font.unitsPerEm) * size;
    }
  });
  return w;
}

// Text as an outlined path. anchor: start | middle | end
function text(fontKey, str, x, y, size, { anchor = 'start', tracking = 0, fill = '{I}', opacity } = {}) {
  const font = fonts[fontKey];
  if (!font) throw new Error('missing font ' + fontKey);
  const w = measure(font, str, size, tracking);
  let cx = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  const glyphs = Array.from(str).map((c) => font.charToGlyph(c));
  let d = '';
  glyphs.forEach((g, i) => {
    d += pathData(g.getPath(cx, y, size));
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
    if (i < glyphs.length - 1) cx += ((font.getKerningValue(g, glyphs[i + 1]) || 0) / font.unitsPerEm) * size;
  });
  return `<path d="${d}" fill="${fill}"${opacity ? ` fill-opacity="${opacity}"` : ''}/>`;
}

// Text set along a circular arc (centred on angle `mid`, degrees, 0 = top).
function arcText(fontKey, str, cx, cy, radius, size, { mid = 0, tracking = 0, fill = '{I}', bottom = false } = {}) {
  const font = fonts[fontKey];
  const glyphs = Array.from(str).map((c) => font.charToGlyph(c));
  const widths = glyphs.map((g) => (g.advanceWidth / font.unitsPerEm) * size);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * size * (glyphs.length - 1);
  const rad = bottom ? radius + size * 0.7 : radius;
  const totalAng = (total / rad) * (180 / Math.PI);
  let ang = bottom ? mid + totalAng / 2 : mid - totalAng / 2;
  let out = '';
  glyphs.forEach((g, i) => {
    const gAng = (widths[i] / rad) * (180 / Math.PI);
    const center = bottom ? ang - gAng / 2 : ang + gAng / 2;
    const t = (center * Math.PI) / 180;
    const px = cx + rad * Math.sin(t);
    const py = cy - rad * Math.cos(t);
    const rot = bottom ? center + 180 : center;
    const d = pathData(g.getPath(-widths[i] / 2, 0, size));
    out += `<path d="${d}" transform="translate(${r(px)} ${r(py)}) rotate(${r(rot)})" fill="${fill}"/>`;
    const step = gAng + (tracking * size / rad) * (180 / Math.PI);
    ang += bottom ? -step : step;
  });
  return out;
}

// ---------------------------------------------------------------------------
// Logo definitions. `{I}` = ink colour, `{A}` = accent colour.
// Each returns { w, h, body, icon: { w, h, body } }
// ---------------------------------------------------------------------------
const LOGOS = [
  {
    id: 'aurum', name: 'Aurum Monogram', theme: 'Noir & Gold',
    concept: 'A gold-framed diamond monogram with refined serif lettering. Reads as luxury, craft and permanence.',
    ink: '#121212', accent: '#B8914A', reverse: '#F4EFE6',
    build() {
      const mark = (ox, oy, s = 1) => `
        <g transform="translate(${ox} ${oy}) scale(${s})">
          <rect x="-46" y="-46" width="92" height="92" transform="rotate(45)" fill="none" stroke="{A}" stroke-width="2.4"/>
          <rect x="-38" y="-38" width="76" height="76" transform="rotate(45)" fill="none" stroke="{A}" stroke-width="0.9"/>
          ${text('CormorantGaramond-600', 'E', -3, 19, 56, { anchor: 'end', fill: '{I}' })}
          <rect x="3" y="-21" width="5.2" height="40" fill="{A}"/>
          <rect x="-1" y="-21" width="13.2" height="2" fill="{A}"/>
          <rect x="-1" y="17" width="13.2" height="2" fill="{A}"/>
        </g>`;
      const body = `
        ${mark(300, 82)}
        ${text('CormorantGaramond-600', 'ESTEEM', 300, 236, 70, { anchor: 'middle', tracking: 0.26 })}
        <rect x="170" y="258" width="88" height="1.2" fill="{A}"/>
        <rect x="342" y="258" width="88" height="1.2" fill="{A}"/>
        <rect x="296" y="255" width="8" height="8" transform="rotate(45 300 259)" fill="{A}"/>
        ${text('Montserrat-500', 'INTERIORS & CONSULTANTS', 300, 296, 14.5, { anchor: 'middle', tracking: 0.42 })}`;
      return { w: 600, h: 320, body, icon: { w: 200, h: 200, body: mark(100, 100, 1.45) } };
    },
  },
  {
    id: 'blueprint', name: 'Blueprint Frame', theme: 'Blueprint',
    concept: 'An "E" drawn as floor-plan walls under a roofline, set in a drafting frame. Engineering precision, first.',
    ink: '#0B1F3A', accent: '#2F7DE1', reverse: '#EAF2FF',
    build() {
      const mark = (ox, oy) => `
        <g transform="translate(${ox} ${oy})">
          <rect x="2" y="2" width="136" height="136" fill="none" stroke="{I}" stroke-width="3"/>
          <path d="M2 22 H10 M2 118 H10 M130 22 H138 M130 118 H138 M22 2 V10 M118 2 V10 M22 130 V138 M118 130 V138" stroke="{I}" stroke-width="2"/>
          <polyline points="22,58 70,22 118,58" fill="none" stroke="{A}" stroke-width="9" stroke-linejoin="miter"/>
          <rect x="36" y="66" width="11" height="52" fill="{I}"/>
          <rect x="36" y="66" width="68" height="11" fill="{I}"/>
          <rect x="36" y="86.5" width="52" height="11" fill="{I}"/>
          <rect x="36" y="107" width="68" height="11" fill="{I}"/>
          <circle cx="104" cy="92" r="3.5" fill="{A}"/>
        </g>`;
      const body = `
        ${mark(0, 10)}
        ${text('SpaceGrotesk-600', 'ESTEEM', 168, 92, 76, { tracking: 0.04 })}
        <rect x="170" y="108" width="430" height="2" fill="{A}"/>
        ${text('SpaceGrotesk-400', 'INTERIORS & CONSULTANTS', 170, 138, 17.5, { tracking: 0.255, fill: '{I}' })}`;
      return { w: 610, h: 160, body, icon: { w: 160, h: 160, body: mark(10, 10) } };
    },
  },
  {
    id: 'arch', name: 'Heritage Arch', theme: 'Terracotta',
    concept: 'Twin nested arches: a doorway into a space and a nod to classic architecture. Warm, crafted and welcoming.',
    ink: '#3B2418', accent: '#C2572F', reverse: '#F6EBDD',
    build() {
      const mark = (ox, oy) => `
        <g transform="translate(${ox} ${oy})">
          <path d="M8 150 V66 A52 52 0 0 1 112 66 V150" fill="none" stroke="{I}" stroke-width="6"/>
          <path d="M30 150 V72 A30 30 0 0 1 90 72 V150 Z" fill="{A}"/>
          <rect x="54" y="88" width="12" height="62" fill="{I}" fill-opacity="0.92"/>
          <rect x="0" y="148" width="120" height="6" fill="{I}"/>
        </g>`;
      const body = `
        ${mark(0, 6)}
        ${text('Fraunces-600', 'Esteem', 146, 96, 84, { tracking: -0.01 })}
        ${text('Manrope-600', 'INTERIORS & CONSULTANTS', 150, 140, 16, { tracking: 0.2, fill: '{A}' })}`;
      return { w: 560, h: 166, body, icon: { w: 160, h: 170, body: mark(20, 6) } };
    },
  },
  {
    id: 'brick', name: 'Brickwork E', theme: 'Concrete',
    concept: 'An "E" laid in running-bond bricks with one bright accent brick. Built, structural and no-nonsense.',
    ink: '#1C1C1C', accent: '#FF5A1F', reverse: '#F2F2F0',
    build() {
      const b = (x, y, w, fill = '{I}') => `<rect x="${x}" y="${y}" width="${w}" height="18" fill="${fill}"/>`;
      const mark = (ox, oy) => `
        <g transform="translate(${ox} ${oy})">
          ${b(0, 0, 44)}${b(48, 0, 44)}${b(96, 0, 34)}
          ${b(0, 22, 22)}${b(26, 22, 30)}
          ${b(0, 44, 44)}${b(48, 44, 44, '{A}')}
          ${b(0, 66, 22)}${b(26, 66, 30)}
          ${b(0, 88, 44)}${b(48, 88, 44)}${b(96, 88, 34)}
        </g>`;
      const body = `
        ${mark(0, 14)}
        ${text('Anton-400', 'ESTEEM', 152, 110, 104, { tracking: 0.02 })}
        ${text('Inter-500', 'INTERIORS & CONSULTANTS', 154, 146, 15.5, { tracking: 0.24 })}
        <rect x="0" y="136" width="130" height="10" fill="{A}"/>`;
      return { w: 520, h: 156, body, icon: { w: 150, h: 150, body: mark(10, 20) } };
    },
  },
  {
    id: 'line', name: 'Single Line Home', theme: 'Scandi Oak',
    concept: 'One continuous line draws a roof, walls and an open door. Calm, minimal and quietly confident.',
    ink: '#2B2723', accent: '#A7865E', reverse: '#F7F3EC',
    build() {
      const mark = (ox, oy) => `
        <g transform="translate(${ox} ${oy})" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 58 L60 12 L114 58 V118 H74 V82 H46 V118 H6 Z" stroke="{I}" stroke-width="4.5"/>
          <path d="M46 82 L66 88 V124 L46 118" stroke="{A}" stroke-width="4.5"/>
          <circle cx="60" cy="44" r="5" fill="{A}" stroke="none"/>
        </g>`;
      const body = `
        ${mark(0, 2)}
        ${text('Manrope-600', 'esteem', 140, 82, 78, { tracking: -0.02 })}
        ${text('Manrope-400', 'interiors & consultants', 143, 118, 20.5, { tracking: 0.1, fill: '{A}' })}`;
      return { w: 470, h: 134, body, icon: { w: 140, h: 140, body: mark(10, 6) } };
    },
  },
  {
    id: 'crest', name: 'Heritage Crest', theme: 'Emerald Heritage',
    concept: 'A round seal with a heritage serif monogram and the founding year, 1996. Established, trusted, premium.',
    ink: '#0F3B2E', accent: '#B88A44', reverse: '#F3EEDF',
    build() {
      const seal = (cx, cy) => `
        <circle cx="${cx}" cy="${cy}" r="146" fill="none" stroke="{I}" stroke-width="5"/>
        <circle cx="${cx}" cy="${cy}" r="136" fill="none" stroke="{A}" stroke-width="1.5"/>
        <circle cx="${cx}" cy="${cy}" r="88" fill="none" stroke="{A}" stroke-width="1.5"/>
        <circle cx="${cx}" cy="${cy}" r="82" fill="{I}"/>
        ${arcText('Cinzel-600', 'ESTEEM INTERIORS', cx, cy, 107, 19, { tracking: 0.16 })}
        ${arcText('Cinzel-600', 'CONSULTANTS', cx, cy, 104, 16, { tracking: 0.34, bottom: true, mid: 180 })}
        <path d="M${cx - 118} ${cy} l6 -6 l6 6 l-6 6 z M${cx + 106} ${cy} l6 -6 l6 6 l-6 6 z" fill="{A}"/>
        ${text('PlayfairDisplay-700', 'E', cx, cy + 32, 92, { anchor: 'middle', fill: '{A}' })}
        ${text('Cinzel-600', 'EST. 1996', cx, cy + 58, 11.5, { anchor: 'middle', tracking: 0.28, fill: '{A}' })}
        <rect x="${cx - 28}" y="${cy - 52}" width="56" height="1.4" fill="{A}"/>`;
      return { w: 320, h: 320, body: seal(160, 160), icon: { w: 320, h: 320, body: seal(160, 160) } };
    },
  },
  {
    id: 'editorial', name: 'Editorial Wordmark', theme: 'Monochrome Editorial',
    concept: 'A high-contrast Didone wordmark with a single red full stop. Fashion-magazine confidence for design-led clients.',
    ink: '#0A0A0A', accent: '#D7261E', reverse: '#FFFFFF',
    build() {
      const font = fonts['BodoniModa-500'];
      const w = measure(font, 'Esteem', 120, -0.02);
      const body = `
        ${text('BodoniModa-500', 'Esteem', 10, 118, 120, { tracking: -0.02 })}
        <rect x="${r(10 + w + 6)}" y="98" width="20" height="20" fill="{A}"/>
        <rect x="12" y="146" width="40" height="1.5" fill="{I}"/>
        ${text('Montserrat-500', 'INTERIORS  ·  CONSULTANTS', 64, 152, 14, { tracking: 0.42 })}`;
      const icon = `
        ${text('BodoniModa-500', 'E', 74, 150, 170, { anchor: 'middle' })}
        <rect x="130" y="124" width="26" height="26" fill="{A}"/>`;
      return { w: Math.ceil(10 + w + 36), h: 168, body, icon: { w: 180, h: 180, body: icon } };
    },
  },
  {
    id: 'cube', name: 'Isometric Cube', theme: 'Midnight Copper',
    concept: 'An isometric block whose faces form an "E" in negative space: space, volume and modern construction.',
    ink: '#121826', accent: '#D08A57', reverse: '#EEF1F6',
    build() {
      // hexagon centred at (70,70), radius 64
      const mark = (ox, oy) => `
        <g transform="translate(${ox} ${oy})">
          <path d="M70 6 L125.4 38 L70 70 L14.6 38 Z" fill="{A}"/>
          <path d="M14.6 38 L70 70 V134 L14.6 102 Z" fill="{I}"/>
          <path d="M70 70 L125.4 38 V102 L70 134 Z" fill="{I}" fill-opacity="0.72"/>
          <path d="M84 78 L125.4 54 V64 L84 88 Z M84 96 L114 78.6 V88.6 L84 106 Z" fill="{A}"/>
        </g>`;
      const body = `
        ${mark(0, 4)}
        ${text('Syne-700', 'ESTEEM', 160, 88, 70, { tracking: 0.03 })}
        ${text('Montserrat-500', 'INTERIORS & CONSULTANTS', 162, 124, 15, { tracking: 0.3, fill: '{A}' })}`;
      return { w: 520, h: 146, body, icon: { w: 150, h: 150, body: mark(5, 5) } };
    },
  },
];

const fill = (s, ink, accent) => s.replaceAll('{I}', ink).replaceAll('{A}', accent);
const svgDoc = (w, h, body, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}${body}</svg>\n`;
const pad = (w, h, body, p) => ({ w: w + p * 2, h: h + p * 2, body: `<g transform="translate(${p} ${p})">${body}</g>` });

const generated = [];
for (const L of LOGOS) {
  const built = L.build();
  const full = pad(built.w, built.h, built.body, 24);
  const icon = pad(built.icon.w, built.icon.h, built.icon.body, 16);
  const variants = {
    color: [L.ink, L.accent, null],
    reverse: [L.reverse, L.accent, null],
  };
  const files = {};
  for (const [kind, [ink, accent]] of Object.entries(variants)) {
    for (const [part, g] of Object.entries({ logo: full, icon })) {
      const base = `esteem-${L.id}-${part}-${kind}`;
      const svg = svgDoc(g.w, g.h, fill(g.body, ink, accent));
      fs.writeFileSync(path.join(OUT_DIR, base + '.svg'), svg);
      const width = part === 'logo' ? 2400 : 1024;
      await sharp(Buffer.from(svg), { density: Math.ceil((72 * width) / g.w) }).resize({ width }).png().toFile(path.join(OUT_DIR, base + '.png'));
      files[`${part}-${kind}`] = base;
    }
  }
  // Inline version uses CSS variables so it re-colours with the active theme.
  const inline = (s) => s.replaceAll('fill="{I}"', 'style="fill:var(--logo-ink)"').replaceAll('fill="{A}"', 'style="fill:var(--logo-accent)"')
    .replaceAll('stroke="{I}"', 'style="stroke:var(--logo-ink)"').replaceAll('stroke="{A}"', 'style="stroke:var(--logo-accent)"');
  if (/\{[IA]\}/.test(inline(full.body))) throw new Error('unreplaced token in ' + L.id);
  generated.push({
    id: L.id, name: L.name, theme: L.theme, concept: L.concept, ink: L.ink, accent: L.accent, reverse: L.reverse,
    w: full.w, h: full.h, body: inline(full.body), iconW: icon.w, iconH: icon.h, iconBody: inline(icon.body), files,
  });
  console.log('built', L.id);
}

fs.writeFileSync(GEN_FILE, `// AUTO-GENERATED by scripts/build-logos.mjs — do not edit by hand.\nexport const LOGOS = ${JSON.stringify(generated)};\n`);
