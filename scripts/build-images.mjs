// Converts the curated Drive photos (source-photos/) into optimised WebP in public/img/.
// Usage: node scripts/build-images.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC = path.resolve('source-photos');
const OUT = path.resolve('public/img');

export const PICKS = {
  'pizza-bakery-hsr': ['28', '37', '29', '30', '16', '22', '06', '04', '46', '35', '41', '20', '27', '21', '49', '39'],
  'pizza-bakery-koramangala': ['33', '34', '39', '23', '09', '02', '26', '36', '01', '25', '31', '06'],
  'hyundai-rajajinagar': ['01', '02', '05', '08', '11', '19', '23', '29', '22'],
  'hyundai-hesarghatta': ['01', '05', '07', '08', '15', '23', '24', '19'],
};

for (const [slug, picks] of Object.entries(PICKS)) {
  fs.mkdirSync(path.join(OUT, slug), { recursive: true });
  for (const n of picks) {
    const src = path.join(SRC, slug, `${n}.jpg`);
    const img = sharp(src).rotate();
    await img.clone().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, slug, `${n}.webp`));
    await img.clone().resize({ width: 1200 }).webp({ quality: 74 }).toFile(path.join(OUT, slug, `${n}-md.webp`));
    await img.clone().resize({ width: 760 }).webp({ quality: 72 }).toFile(path.join(OUT, slug, `${n}-sm.webp`));
  }
  console.log(slug, picks.length);
}
