const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images', 'projects');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Генерируем уникальные изображения через picsum.photos
const projects = [
  { id: 1, seed: 'furnace1' },   // Печи трубчатые
  { id: 2, seed: 'furnace2' },
  { id: 3, seed: 'furnace3' },
  { id: 4, seed: 'furnace4' },
  { id: 5, seed: 'furnace5' },
  { id: 6, seed: 'column1' },    // Ректификационные колонны
  { id: 7, seed: 'column2' },
  { id: 8, seed: 'column3' },
  { id: 9, seed: 'heat1' },      // Теплообменное оборудование
  { id: 10, seed: 'heat2' },
  { id: 11, seed: 'heat3' },
  { id: 12, seed: 'valve1' },    // Арматурные блоки
  { id: 13, seed: 'valve2' },
  { id: 14, seed: 'valve3' },
  { id: 15, seed: 'install1' },  // Монтажные работы
  { id: 16, seed: 'install2' },
  { id: 17, seed: 'install3' },
  { id: 18, seed: 'install4' },
  { id: 19, seed: 'install5' },
];

function downloadImage(seed, filepath) {
  return new Promise((resolve, reject) => {
    const url = `https://picsum.photos/seed/${seed}/800/600`;
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (res) => {
          const fileStream = fs.createWriteStream(filepath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(filepath);
          });
          fileStream.on('error', reject);
        }).on('error', reject);
        return;
      }
      
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading project images...\n');
  
  for (const project of projects) {
    const filename = `project-${project.id}.jpg`;
    const filepath = path.join(imagesDir, filename);
    
    try {
      await downloadImage(project.seed, filepath);
      console.log(`✓ Downloaded: ${filename}`);
    } catch (error) {
      console.log(`✗ Failed: ${filename} - ${error.message}`);
    }
  }
  
  console.log(`\nDone! Downloaded images to public/images/projects/`);
}

main().catch(console.error);
