// This script will replace missing image sources with colored placeholders
document.addEventListener('DOMContentLoaded', function() {
  // List of products with their colors
  const products = [
    { id: 'product1', name: 'Black Hoodie', color: '#111111' },
    { id: 'product2', name: 'Navy Track Jacket', color: '#000080' },
    { id: 'product3', name: 'Black Track Jacket', color: '#222222' },
    { id: 'product4', name: 'Graphic T-Shirt', color: '#333333' },
    { id: 'product5', name: 'Navy Track Pants', color: '#000080' },
    { id: 'product6', name: 'Black Track Pants', color: '#222222' },
    { id: 'hero', name: 'Hero Image', color: '#555555' }
  ];

  // Create a map for quick lookup
  const productMap = {};
  products.forEach(product => {
    productMap[product.id] = product;
  });

  // Find all images on the page
  const images = document.querySelectorAll('img');
  
  // Try to load images from app/images directory if they're not found
  images.forEach(img => {
    const originalSrc = img.getAttribute('src');
    if (originalSrc && (originalSrc.includes('/images/') || originalSrc === '')) {
      // First, try to determine which product this is
      let productId = null;
      
      for (const id of Object.keys(productMap)) {
        if (originalSrc.includes(id)) {
          productId = id;
          break;
        }
      }
      
      if (productId) {
        // Create a backup image path
        const newSrc = `/app/images/${productId}.jpg`;
        
        // If original src is empty or image fails to load, try the new path
        if (originalSrc === '' || img.naturalWidth === 0) {
          img.src = newSrc;
        }
        
        // Add fallback in case new path also fails
        img.onerror = function() {
          createPlaceholder(img, productId);
        };
      }
    }
  });
  
  function createPlaceholder(img, productId) {
    const product = productMap[productId];
    
    // Create a canvas element for the placeholder
    const canvas = document.createElement('canvas');
    canvas.width = img.width || 800;
    canvas.height = img.height || 600;
    
    const ctx = canvas.getContext('2d');
    
    // Fill with product color
    ctx.fillStyle = product.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add product name text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(product.name, canvas.width / 2, canvas.height / 2);
    
    // Replace the image src with the canvas data URL
    img.src = canvas.toDataURL('image/png');
  }

  // Handle background images (specifically for the hero image)
  const heroElements = document.querySelectorAll('[style*="background-image"]');
  heroElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const backgroundImage = style.backgroundImage;
    
    // If the background image contains hero.jpg and it's not loaded properly
    if (backgroundImage.includes('hero.jpg')) {
      // Try to set the background image to the app/images path
      if (backgroundImage.includes('/images/')) {
        el.style.backgroundImage = 'url("/app/images/hero.jpg")';
      }
      
      // Add a fallback color and text if the image still fails
      setTimeout(() => {
        // Check if the background image has loaded by creating a new image
        const img = new Image();
        img.src = el.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
        
        if (!img.complete || img.naturalWidth === 0) {
          el.style.backgroundColor = '#555555';
          
          // Check if the text overlay already exists
          if (!el.querySelector('.hero-placeholder-text')) {
            const textOverlay = document.createElement('div');
            textOverlay.className = 'hero-placeholder-text';
            textOverlay.textContent = 'Hero Image';
            textOverlay.style.position = 'absolute';
            textOverlay.style.top = '50%';
            textOverlay.style.left = '50%';
            textOverlay.style.transform = 'translate(-50%, -50%)';
            textOverlay.style.color = '#FFFFFF';
            textOverlay.style.fontFamily = 'Arial, sans-serif';
            textOverlay.style.fontSize = '36px';
            textOverlay.style.fontWeight = 'bold';
            textOverlay.style.zIndex = '1';
            
            el.appendChild(textOverlay);
          }
        }
      }, 500); // Give it a bit of time to load
    }
  });
}); 