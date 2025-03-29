const fs = require('fs');
const path = require('path');

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to save placeholder images
function savePlaceholderImages() {
  // List of product image names
  const imageNames = [
    'product1.jpg',  // Black Hoodie
    'product2.jpg',  // Navy Track Jacket
    'product3.jpg',  // Black Track Jacket
    'product4.jpg',  // Graphic T-Shirt
    'product5.jpg',  // Navy Track Pants
    'product6.jpg',  // Black Track Pants
    'hero.jpg'       // Hero Image
  ];

  imageNames.forEach(imageName => {
    // Create a simple colored rectangle as a placeholder
    const placeholderData = generateColoredImagePlaceholder(imageName);
    const outputPath = path.join(imagesDir, imageName);
    
    fs.writeFileSync(outputPath, placeholderData);
    console.log(`Created placeholder image: ${outputPath}`);
  });
}

// Function to generate a simple colored rectangle as an SVG
function generateColoredImagePlaceholder(imageName) {
  // Choose a color based on the image name
  let color = '#333333';
  if (imageName.includes('product1')) color = '#111111'; // Black hoodie
  if (imageName.includes('product2')) color = '#000080'; // Navy jacket
  if (imageName.includes('product3')) color = '#222222'; // Black jacket
  if (imageName.includes('product4')) color = '#333333'; // T-shirt
  if (imageName.includes('product5')) color = '#000080'; // Navy pants
  if (imageName.includes('product6')) color = '#222222'; // Black pants
  if (imageName.includes('hero')) color = '#555555';     // Hero image

  // Create an SVG with the product name
  const svgContent = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="${color}" />
      <text x="400" y="300" font-family="Arial" font-size="36" fill="white" text-anchor="middle">
        ${imageName.replace('.jpg', '')}
      </text>
    </svg>
  `;

  // Convert the SVG string to Buffer
  return Buffer.from(svgContent);
}

// Run the function to save placeholder images
savePlaceholderImages();
console.log('All placeholder images created successfully!'); 