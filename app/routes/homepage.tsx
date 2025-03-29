import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Homepage: React.FC = () => {
  console.log("Homepage rendering, products:", products);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<{[key: number]: boolean}>({});
  
  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, product.sizes[0], product.colors[0]);
    
    // Show visual confirmation
    setAddedToCart({...addedToCart, [product.id]: true});
    
    // Reset the confirmation after 2 seconds
    setTimeout(() => {
      setAddedToCart({...addedToCart, [product.id]: false});
    }, 2000);
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        height: '500px',
        background: 'linear-gradient(45deg, #111, #222)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
        padding: '20px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/streetwear_hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
          zIndex: 0
        }}></div>
        
        <div style={{
          textAlign: 'center',
          padding: '25px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          zIndex: 1,
          maxWidth: '600px',
          width: '90%',
          margin: '0 auto',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 'bold', 
            marginBottom: '10px', 
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            lineHeight: 1.1
          }}>
            STREETWEAR
          </div>
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
            marginBottom: '15px', 
            color: 'white',
            fontWeight: '300',
            lineHeight: 1.2
          }}>
            Premium Performance Wear
          </h1>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', 
            marginBottom: '25px', 
            color: '#ccc',
            maxWidth: '90%',
            margin: '0 auto 25px auto',
            lineHeight: 1.4
          }}>
            Elevate your training with our signature track jackets and pants collection
          </p>
          <Link to="/shop" style={{
            display: 'inline-block',
            padding: 'clamp(8px, 2vw, 12px) clamp(15px, 4vw, 30px)',
            background: 'white',
            color: 'black',
            textDecoration: 'none',
            borderRadius: '30px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)'
          }}>
            Shop Now
          </Link>
        </div>
      </div>
      
      {/* Products Section */}
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '30px' }}>
        Featured Products
      </h2>
      
      <div style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>
        <p>Total products available: {products.length}</p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '0 10px'
      }}>
        {Array.isArray(products) && products.slice(0, 6).map(product => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ position: 'relative', height: '280px' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.style.display = 'none';
                  
                  // Add colored background with product name
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.backgroundColor = '#333';
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                    
                    const text = document.createElement('div');
                    text.textContent = product.name;
                    text.style.color = 'white';
                    text.style.fontWeight = 'bold';
                    text.style.padding = '10px';
                    text.style.textAlign = 'center';
                    
                    parent.appendChild(text);
                  }
                }}
              />
              
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '12px'
              }}>
                ID: {product.id}
              </div>
            </div>
            
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ marginBottom: '5px', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>{product.name}</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>${product.price.toFixed(2)}</p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <Link to={`/product/${product.id}`} style={{
                  flex: 1,
                  padding: '8px',
                  background: '#f3f3f3',
                  color: '#333',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}>
                  View Details
                </Link>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  style={{
                  flex: 1,
                  padding: '8px',
                  background: addedToCart[product.id] ? '#4CAF50' : '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}>
                  {addedToCart[product.id] ? 'Added! ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Fallback if products array is empty */}
        {(!Array.isArray(products) || products.length === 0) && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', border: '1px dashed #ddd', borderRadius: '10px' }}>
            <p>No products available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
      
      {/* Simple Footer */}
      <div style={{
        marginTop: '50px',
        padding: '40px 20px',
        background: '#000',
        color: 'white',
        textAlign: 'center',
        borderRadius: '10px'
      }}>
        <div style={{ 
          fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          letterSpacing: '2px'
        }}>
          STREETWEAR
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(15px, 4vw, 30px)',
          marginBottom: '30px',
          flexWrap: 'wrap',
          padding: '0 10px'
        }}>
          <div style={{ padding: '5px 0' }}>Shop</div>
          <div style={{ padding: '5px 0' }}>About</div>
          <div style={{ padding: '5px 0' }}>Athletes</div>
          <div style={{ padding: '5px 0' }}>Careers</div>
          <div style={{ padding: '5px 0' }}>Support</div>
        </div>
        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>© 2024 STREETWEAR. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Homepage; 