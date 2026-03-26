import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const RAW_DIR = path.join(process.cwd(), 'fotos originales');
const OUT_DIR = path.join(process.cwd(), 'public', 'media', 'home');

const filesToProcess = [
  // Switched to the newly uploaded 'sanitarios_sin_aplastar.png'
  { raw: 'sanitarios_sin_aplastar.png', base: 'panel-sanitarios-d' },
  { raw: 'sanitarios_sin_aplastar.png', base: 'panel-sanitarios-m' },
  { raw: 'ChatGPT Image 18 mar 2026, 12_49_08 p.m..png', base: 'panel-ejecutivo-d' },
  { raw: 'ChatGPT Image 18 mar 2026, 12_49_3 p.m..png', base: 'panel-ejecutivo-m' },
  { raw: 'ChatGPT Image 18 mar 2026, 12_50_04 p.m..png', base: 'panel-empresas-d' },
  { raw: 'ChatGPT Image 18 mar 2026, 12_51_55 p.m..png', base: 'panel-empresas-m' },
  { raw: 'ChatGPT Image 18 mar 2026, 12_52_01 p.m..png', base: 'panel-estado-d' },
  { raw: 'ChatGPT Image 18 mar 2026, 12_52_01 p.m..png', base: 'panel-estado-m' }
];

async function processImages() {
  for (const fileConf of filesToProcess) {
    const inputPath = path.join(RAW_DIR, fileConf.raw);
    try {
      if (!fs.existsSync(inputPath)) continue;
      await sharp(inputPath).webp({ quality: 80, effort: 6 }).toFile(path.join(OUT_DIR, `${fileConf.base}.webp`));
      await sharp(inputPath).avif({ quality: 75, effort: 6 }).toFile(path.join(OUT_DIR, `${fileConf.base}.avif`));
      await sharp(inputPath).jpeg({ quality: 85 }).toFile(path.join(OUT_DIR, `${fileConf.base}.jpg`));
    } catch (err) {
      console.error(err);
    }
  }
}
processImages();
