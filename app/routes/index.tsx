import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiEye } from 'react-icons/fi';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

const HeroSection = styled.section`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #f3f3f3, #ffffff);
  position: relative;
  overflow: hidden;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-image: url('/images/hero.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  max-width: 600px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ShopButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: #000;
  color: white;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductsSection = styled.section`
  padding: 5rem 2rem;
  background: white;
  min-height: 500px;
  position: relative;
  z-index: 1;
  display: block;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: #f8f8f8;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 450px;
  border: 1px solid #e0e0e0;
`;

const ProductImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProductImageContainer}:hover & {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
  background: white;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ViewButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: white;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Footer = styled.footer`
  background: #000;
  color: white;
  padding: 4rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: white;
        }
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #333;
  color: #ccc;
`;

const DebugInfo = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1000;
  max-width: 300px;
  overflow: auto;
  max-height: 200px;
`;

const Home = () => {
  const { addToCart } = useCart();
  const [debugInfo, setDebugInfo] = useState<any>({ productsLoaded: false, count: 0 });

  useEffect(() => {
    console.log('Products data:', products);
    console.log('Number of products:', products.length);
    
    setDebugInfo({
      productsLoaded: Array.isArray(products),
      count: Array.isArray(products) ? products.length : 0,
      firstProduct: Array.isArray(products) && products.length > 0 ? products[0].name : 'None'
    });
    
    const timer = setTimeout(() => {
      console.log('Forcing re-render...');
      setDebugInfo((prev: Record<string, any>) => ({ ...prev, timestamp: new Date().toISOString() }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  if (!products || products.length === 0) {
    return (
      <>
        <HeroSection>
          <HeroImage />
          <HeroContent>
            <HeroTitle>Streetwear Redefined</HeroTitle>
            <HeroSubtitle>Discover the latest trends in urban fashion</HeroSubtitle>
            <Link to="/shop">
              <ShopButton>Shop Now</ShopButton>
            </Link>
          </HeroContent>
        </HeroSection>
        
        <ProductsSection>
          <SectionTitle>Featured Products</SectionTitle>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>No products available at the moment. Please check back later.</p>
            <div style={{ marginTop: '20px' }}>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '10px 20px',
                    background: '#444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Try New Version
                </motion.button>
              </Link>
            </div>
          </div>
        </ProductsSection>
        
        <DebugInfo>
          <pre>Products Issue: {JSON.stringify(debugInfo, null, 2)}</pre>
        </DebugInfo>
      </>
    );
  }

  const fallbackProducts = [
    {
      id: 101,
      name: "Fallback Hoodie",
      price: 89.99,
      image: "/images/product1.jpg",
      category: "Hoodies",
      description: "A fallback product in case of data issues.",
      sizes: ["M"],
      colors: ["Black"]
    },
    {
      id: 102,
      name: "Fallback T-Shirt",
      price: 39.99,
      image: "/images/product4.jpg",
      category: "T-Shirts",
      description: "Another fallback product.",
      sizes: ["M"],
      colors: ["Black"]
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <>
      <HeroSection>
        <HeroImage />
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Streetwear Redefined
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the latest trends in urban fashion
          </HeroSubtitle>
          <Link to="/shop">
            <ShopButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Shop Now
            </ShopButton>
          </Link>
          
          <div style={{ marginTop: '15px' }}>
            <Link to="/">
              <ShopButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ background: '#444', fontSize: '0.9rem' }}
              >
                Try New Version
              </ShopButton>
            </Link>
          </div>
        </HeroContent>
      </HeroSection>

      <ProductsSection className="debug-border">
        <SectionTitle>Featured Products</SectionTitle>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <small>Total products: {displayProducts.length}</small>
        </div>
        
        <ProductGrid className="product-grid debug-border">
          {displayProducts.slice(0, 6).map((product, index) => (
            <ProductCard
              key={product.id}
              className="product-card debug-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <small style={{ position: 'absolute', top: 5, right: 5, background: '#fff', padding: '2px 5px', borderRadius: '3px', zIndex: 2 }}>
                ID: {product.id}
              </small>
              
              <ProductImageContainer>
                <ProductImage src={product.image} alt={product.name} />
                <ProductOverlay>
                  <Link to={`/product/${product.id}`}>
                    <ViewButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiEye />
                      View Details
                    </ViewButton>
                  </Link>
                </ProductOverlay>
              </ProductImageContainer>
              
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <AddToCartButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                >
                  <FiShoppingBag />
                  Add to Cart
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </ProductsSection>

      <DebugInfo>
        <pre>Debug: {JSON.stringify(debugInfo, null, 2)}</pre>
      </DebugInfo>

      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>About Us</h3>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Connect With Us</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Pinterest</a></li>
            </ul>
          </FooterSection>
        </FooterContent>
        <Copyright>
          © 2024 Streetwear. All rights reserved.
        </Copyright>
      </Footer>
    </>
  );
};

export default Home; 