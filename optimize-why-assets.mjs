import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUT_DIR = path.join(process.cwd(), 'public', 'media', 'home');

const filesToProcess = [
  { raw: 'C:\\Users\\Villex\\.gemini\\antigravity\\brain\\30772018-8c5c-4800-8ec4-a5c115cf48a5\\why_experiencia_v3_1773855741063.png', base: 'why-experiencia' },
  { raw: 'C:\\Users\\Villex\\.gemini\\antigravity\\brain\\30772018-8c5c-4800-8ec4-a5c115cf48a5\\why_flota_v3_1773855755773.png', base: 'why-flota' },
  { raw: 'C:\\Users\\Villex\\.gemini\\antigravity\\brain\\30772018-8c5c-4800-8ec4-a5c115cf48a5\\why_coordinacion_v2_1773855400394.png', base: 'why-coordinacion' },
];

async function processImages() {
  for (const fileConf of filesToProcess) {
    const inputPath = fileConf.raw;
    try {
      if (!fs.existsSync(inputPath)) continue;
      // High-quality resizing to ensure standard 1920x1080 resolution without pixelation
      await sharp(inputPath).resize(1920, 1080).webp({ quality: 85, effort: 6 }).toFile(path.join(OUT_DIR, `${fileConf.base}.webp`));
      await sharp(inputPath).resize(1920, 1080).jpeg({ quality: 90 }).toFile(path.join(OUT_DIR, `${fileConf.base}.jpg`));
    } catch (err) {
      console.error(err);
    }
  }
}
processImages();
