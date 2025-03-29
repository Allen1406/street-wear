import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Get the directory name using ESM approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a placeholder image for the streetwear hero
function createPlaceholderHeroImage() {
  console.log('Creating STREETWEAR hero image placeholder...');
  
  // URL for a placeholder image with black background and STREETWEAR text
  // This creates a styled image similar to the screenshot shared
  const imageUrl = 'https://placehold.co/1200x600/121212/ffffff?text=STREETWEAR&font=montserrat';
  
  // Create both filenames to ensure compatibility
  const imagePath1 = path.join(__dirname, 'public', 'images', 'streetwear_hero.jpg');
  const imagePath2 = path.join(__dirname, 'public', 'images', 'hero.jpg');
  
  // Download the main image
  const file1 = fs.createWriteStream(imagePath1);
  
  https.get(imageUrl, (response) => {
    response.pipe(file1);
    
    file1.on('finish', () => {
      file1.close();
      console.log(`Hero image created at ${imagePath1}`);
      
      // Create a copy with the alternate name
      fs.copyFile(imagePath1, imagePath2, (err) => {
        if (err) {
          console.error('Error copying file:', err);
        } else {
          console.log(`Copied to ${imagePath2}`);
        }
      });
    });
  }).on('error', (err) => {
    fs.unlink(imagePath1, () => {}); // Delete the file if there's an error
    console.error('Error downloading hero image:', err.message);
  });
}

createPlaceholderHeroImage(); 