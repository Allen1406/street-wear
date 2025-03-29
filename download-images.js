const https = require('https');
const fs = require('fs');
const path = require('path');

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Define the image URLs and local file paths
const images = [
  {
    // Black Hoodie
    url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
    path: path.join(imagesDir, 'product1.jpg')
  },
  {
    // Navy Track Jacket
    url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    path: path.join(imagesDir, 'product2.jpg')
  },
  {
    // Black Track Jacket
    url: 'https://images.unsplash.com/photo-1601063476524-03f40acd259f',
    path: path.join(imagesDir, 'product3.jpg')
  },
  {
    // Graphic T-Shirt
    url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    path: path.join(imagesDir, 'product4.jpg')
  },
  {
    // Navy Track Pants
    url: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3',
    path: path.join(imagesDir, 'product5.jpg')
  },
  {
    // Black Track Pants
    url: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788',
    path: path.join(imagesDir, 'product6.jpg')
  },
  {
    // Hero Image
    url: 'https://images.unsplash.com/photo-1519748771451-a94c596fae97',
    path: path.join(imagesDir, 'streetwear_hero.jpg')
  }
];

// Function to download an image
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(`${url}?w=800&q=80`, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filePath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  for (const image of images) {
    try {
      await downloadImage(image.url, image.path);
    } catch (error) {
      console.error(`Failed to download ${image.url}`);
    }
  }
  console.log('All images downloaded successfully!');
}

downloadAllImages(); 