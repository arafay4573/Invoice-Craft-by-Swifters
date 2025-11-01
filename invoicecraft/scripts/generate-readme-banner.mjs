import { ImageResponse } from '@vercel/og';
import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';
import { ReadmeBanner } from './ReadmeBanner.js';

async function main() {
  const image = new ImageResponse(
    React.createElement(ReadmeBanner),
    {
      width: 1280,
      height: 640,
    }
  );

  const buffer = await image.arrayBuffer();
  const outputPath = path.resolve(process.cwd(), 'public/readme-banner.png');
  await fs.writeFile(outputPath, Buffer.from(buffer));
  console.log(`Banner saved to ${outputPath}`);
}

main();
