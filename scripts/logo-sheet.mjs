// Preview sheet of every logo (colour on light, reverse on dark). Usage: node scripts/logo-sheet.mjs <out.png>
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.resolve('public/logos');
const ids = ['aurum', 'blueprint', 'arch', 'brick', 'line', 'crest', 'editorial', 'cube'];
const darkBg = { aurum: '#0E0E0E', blueprint: '#0B1F3A', arch: '#3B2418', brick: '#1C1C1C', line: '#2B2723', crest: '#0F3B2E', editorial: '#0A0A0A', cube: '#121826' };
const CW = 560, CH = 230;
const comps = [];
for (const [i, id] of ids.entries()) {
  for (const [j, kind] of ['color', 'reverse'].entries()) {
    const bg = kind === 'color' ? '#F5F2EC' : darkBg[id];
    const tile = await sharp({ create: { width: CW, height: CH, channels: 3, background: bg } }).png().toBuffer();
    const logo = await sharp(path.join(dir, `esteem-${id}-logo-${kind}.png`)).resize({ width: 440, height: 190, fit: 'inside' }).toBuffer();
    const icon = await sharp(path.join(dir, `esteem-${id}-icon-${kind}.png`)).resize({ width: 70, height: 70, fit: 'inside' }).toBuffer();
    const x = j * (CW + 360), y = i * CH;
    comps.push({ input: tile, left: x, top: y }, { input: logo, left: x + 20, top: y + 20 });
    comps.push({ input: await sharp({ create: { width: 340, height: CH, channels: 3, background: bg } }).png().toBuffer(), left: x + CW, top: y });
    comps.push({ input: icon, left: x + CW + 20, top: y + 80 });
  }
}
await sharp({ create: { width: 2 * (CW + 360), height: ids.length * CH, channels: 3, background: '#888' } })
  .composite(comps).png().toFile(process.argv[2]);
