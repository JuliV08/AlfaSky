import fs from 'fs';

const file = 'src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Add BP constant before export const metadata
content = content.replace(
  'export const metadata: Metadata = {',
  'const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";\n\nexport const metadata: Metadata = {'
);

// Fix icon paths
content = content.replace(
  '        icon: "/assets/ui/Favicon.png",\n        apple: "/assets/ui/Logo.png",',
  '        icon: `${BP}/assets/ui/Favicon.png`,\n        apple: `${BP}/assets/ui/Logo.png`,'
);

// Fix OG image path
content = content.replace(
  'images: [{ url: "/assets/ui/Logo.png", width: 512, height: 512 }],',
  'images: [{ url: `${BP}/assets/ui/Logo.png`, width: 512, height: 512 }],'
);

fs.writeFileSync(file, content, 'utf-8');
console.log('Done!');
