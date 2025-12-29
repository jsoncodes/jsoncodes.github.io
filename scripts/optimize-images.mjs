import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'content/blog';
const OUTPUT_DIR = 'public/blog';
const MAX_WIDTH = 1200;

function findImages(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findImages(fullPath, files);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(srcPath) {
  const relativePath = path.relative(SOURCE_DIR, srcPath);
  const destPath = path.join(OUTPUT_DIR, relativePath);
  const destDir = path.dirname(destPath);

  fs.mkdirSync(destDir, { recursive: true });

  const image = sharp(srcPath);
  const metadata = await image.metadata();

  let pipeline = image;

  if (metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH);
  }

  if (/\.png$/i.test(srcPath)) {
    pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: 80, progressive: true });
  }

  await pipeline.toFile(destPath);

  const srcSize = fs.statSync(srcPath).size;
  const destSize = fs.statSync(destPath).size;
  const saved = ((1 - destSize / srcSize) * 100).toFixed(1);

  console.log(`${relativePath}: ${(srcSize/1024).toFixed(0)}KB → ${(destSize/1024).toFixed(0)}KB (${saved}% saved)`);
}

async function main() {
  console.log('Optimizing blog images...\n');

  const images = findImages(SOURCE_DIR);

  for (const image of images) {
    await optimizeImage(image);
  }

  console.log(`\nDone. Optimized ${images.length} images.`);
}

main().catch(console.error);
