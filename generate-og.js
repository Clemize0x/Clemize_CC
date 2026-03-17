const puppeteer = require('puppeteer');
const path = require('path');

async function generateOgImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const filePath = 'file://' + path.resolve(__dirname, 'og-image.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  await page.screenshot({
    path: 'og-image.jpg',
    type: 'jpeg',
    quality: 92,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  await browser.close();
  console.log('og-image.jpg généré avec succès.');
}

generateOgImage().catch(console.error);
