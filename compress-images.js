const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compress() {
  const input = 'IMG_5498.jpg';
  const outputWebp = 'IMG_5498.webp';
  const outputJpg = 'IMG_5498-optimized.jpg';

  const before = (fs.statSync(input).size / 1024 / 1024).toFixed(2);

  // WebP — meilleure compression, supporté par tous les navigateurs modernes
  await sharp(input)
    .resize(1400, null, { withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(outputWebp);

  // JPG fallback — pour les rares navigateurs sans support WebP
  await sharp(input)
    .resize(1400, null, { withoutEnlargement: true })
    .jpeg({ quality: 75, progressive: true })
    .toFile(outputJpg);

  const afterWebp = (fs.statSync(outputWebp).size / 1024).toFixed(0);
  const afterJpg  = (fs.statSync(outputJpg).size / 1024).toFixed(0);

  console.log(`Original  : ${before} MB`);
  console.log(`WebP      : ${afterWebp} KB`);
  console.log(`JPG optim : ${afterJpg} KB`);
}

compress().catch(console.error);
