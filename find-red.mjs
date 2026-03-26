import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIR = path.join(process.cwd(), 'fotos originales');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));

async function findReddest() {
  const results = [];
  for (const file of files) {
    const filePath = path.join(DIR, file);
    const { data, info } = await sharp(filePath)
      .resize(100, 100)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let redScore = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      // Red criteria: r is dominant
      if (r > 150 && g < 100 && b < 100) {
        redScore += (r - g - b);
      }
    }
    results.push({ file, redScore });
  }

  results.sort((a, b) => b.redScore - a.redScore);
  console.log("Images sorted by red score (top is most likely sanitarios):");
  results.forEach(r => console.log(`${r.redScore} - ${r.file}`));
}

findReddest().catch(console.error);
