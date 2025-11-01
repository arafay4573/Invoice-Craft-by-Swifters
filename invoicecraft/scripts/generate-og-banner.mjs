import { ImageResponse } from '@vercel/og';
import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';
import { OgBanner } from './OgBanner.js';

async function main() {
  const image = new ImageResponse(
    React.createElement(OgBanner),
    {
      width: 1200,
      height: 630,
    }
  );

  const buffer = await image.arrayBuffer();
  const outputPath = path.resolve(process.cwd(), 'public/og-banner.png');
  await fs.writeFile(outputPath, Buffer.from(buffer));
  console.log(`Banner saved to ${outputPath}`);
}

main();
