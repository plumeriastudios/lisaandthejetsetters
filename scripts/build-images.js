#!/usr/bin/env node
/**
 * build-images.js
 * 
 * Usage:
 * 1. Put your high-res originals in images/originals/ (example: images/originals/01.jpg)
 * 2. Run: npm install
 * 3. Run: npm run build-images
 *
 * This script will produce images/photoN-400.jpg, -800.jpg, -1600.jpg and matching .webp files
 * numbered in the order found in the originals directory.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'images', 'originals');
const outputDir = path.join(__dirname, '..', 'images');

if (!fs.existsSync(inputDir)) {
  console.error('Input directory not found:', inputDir);
  console.error('Create images/originals and add your original photos.');
  process.exit(1);
}

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const sizes = [
  { suffix: '400', width: 400, quality: 78 },
  { suffix: '800', width: 800, quality: 80 },
  { suffix: '1600', width: 1600, quality: 82 }
];

async function processFile(filePath, index) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = `photo${index + 1}`;
  const input = path.join(inputDir, filePath);
  const image = sharp(input).rotate();

  for (const s of sizes) {
    const outJpg = path.join(outputDir, `${baseName}-${s.suffix}.jpg`);
    const outWebp = path.join(outputDir, `${baseName}-${s.suffix}.webp`);
    try {
      await image
        .resize({ width: s.width, withoutEnlargement: true })
        .jpeg({ quality: s.quality })
        .toFile(outJpg);
      await image
        .resize({ width: s.width, withoutEnlargement: true })
        .webp({ quality: Math.max(70, s.quality - 6) })
        .toFile(outWebp);
      console.log(`Created: ${outJpg} and ${outWebp}`);
    } catch (err) {
      console.error('Error processing', input, err);
    }
  }
}

async function build() {
  const entries = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png|tiff|webp)$/i.test(f));
  if (entries.length === 0) {
    console.error('No image files found in', inputDir);
    process.exit(1);
  }
  console.log(`Found ${entries.length} originals — generating responsive variants...`);
  for (let i = 0; i < entries.length; i++) {
    await processFile(entries[i], i);
  }
  console.log('Done. Check the images/ folder for generated files.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});