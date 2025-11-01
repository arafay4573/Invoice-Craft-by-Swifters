import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const svgPath = path.resolve(process.cwd(), 'public/favicon.svg');
  const outputPath = path.resolve(process.cwd(), 'public/favicon.ico');

  const svgBuffer = await fs.readFile(svgPath);

  await sharp(svgBuffer)
    .resize(32, 32)
    .toFormat('png')
    .toFile(outputPath);

  console.log(`Favicon saved to ${outputPath}`);
}

main();
