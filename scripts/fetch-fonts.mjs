// Downloads static TTFs from Google Fonts for build-time logo generation.
// Usage: node scripts/fetch-fonts.mjs
import fs from 'fs';
import path from 'path';

const OUT = path.resolve('scripts/fonts');
const FONTS = [
  ['Cormorant Garamond', 600], ['Cormorant Garamond', 500], ['Montserrat', 500], ['Montserrat', 600],
  ['Space Grotesk', 600], ['Space Grotesk', 400], ['Fraunces', 600], ['Anton', 400], ['Playfair Display', 700],
  ['Bodoni Moda', 500], ['Syne', 700], ['Manrope', 600], ['Manrope', 400], ['Cinzel', 600], ['Inter', 500],
];

fs.mkdirSync(OUT, { recursive: true });
for (const [family, weight] of FONTS) {
  const file = path.join(OUT, `${family.replace(/ /g, '')}-${weight}.ttf`);
  if (fs.existsSync(file)) continue;
  const css = await (await fetch(`https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${weight}`, {
    headers: { 'User-Agent': 'Mozilla/4.0' },
  })).text();
  const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
  if (!url) { console.log('no ttf for', family, weight, css.slice(0, 200)); continue; }
  fs.writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
  console.log('ok', family, weight);
}
