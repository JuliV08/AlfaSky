import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function fixFavicon() {
  const faviconPath = path.join(process.cwd(), 'public', 'assets', 'ui', 'FaviconTransparent.png');
  const tempPath = path.join(process.cwd(), 'public', 'assets', 'ui', 'FaviconTransparent_temp.png');
  
  if (!fs.existsSync(faviconPath)) {
    console.log("No favicon found");
    return;
  }
  
  // Trim removes transparent pixels from the edges
  try {
    await sharp(faviconPath)
      .trim({ threshold: 0 }) 
      .toFile(tempPath);
      
    fs.renameSync(tempPath, faviconPath);
    console.log("Trimmed Favicon successfully! Now it has no transparent padding.");
  } catch (err) {
    console.error("Error trimming favicon", err);
  }
}

fixFavicon();
