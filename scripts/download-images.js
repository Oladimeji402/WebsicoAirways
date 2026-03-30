const https = require('https');
const fs = require('fs');
const path = require('path');

// Using Pexels free images - no attribution required
const destinations = [
  { name: 'london', url: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'guangzhou', url: 'https://images.pexels.com/photos/2412609/pexels-photo-2412609.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'new-york', url: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'paris', url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'dubai', url: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'washington', url: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const heroImages = [
  { name: 'hero-1', url: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { name: 'hero-2', url: 'https://images.pexels.com/photos/3566187/pexels-photo-3566187.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { name: 'hero-3', url: 'https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { name: 'hero-4', url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1920' },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function downloadAll() {
  const destDir = path.join(__dirname, '../public/destinations');
  const heroDir = path.join(__dirname, '../public/hero');

  // Create directories
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  if (!fs.existsSync(heroDir)) fs.mkdirSync(heroDir, { recursive: true });

  console.log('Downloading destination images...\n');
  
  // Download destination images
  for (const dest of destinations) {
    const filepath = path.join(destDir, `${dest.name}.jpg`);
    try {
      await downloadImage(dest.url, filepath);
      await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
    } catch (error) {
      console.error(`✗ Failed to download ${dest.name}:`, error.message);
    }
  }

  console.log('\nDownloading hero images...\n');
  
  // Download hero images
  for (const hero of heroImages) {
    const filepath = path.join(heroDir, `${hero.name}.jpg`);
    try {
      await downloadImage(hero.url, filepath);
      await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
    } catch (error) {
      console.error(`✗ Failed to download ${hero.name}:`, error.message);
    }
  }

  console.log('\n✓ All images downloaded successfully!');
}

downloadAll().catch(console.error);
