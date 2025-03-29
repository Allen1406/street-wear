import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiFilter, FiEye } from 'react-icons/fi';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ShopContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ShopHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const ShopTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ShopDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterButton = styled(motion.button)<{ isActive: boolean }>`
  padding: 0.5rem 1.5rem;
  background: ${props => props.isActive ? '#000' : '#f3f3f3'};
  color: ${props => props.isActive ? '#fff' : '#333'};
  border: 1px solid ${props => props.isActive ? '#000' : '#e0e0e0'};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

const ProductCategory = styled.span`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: #f3f3f3;
  border-radius: 4px;
  font-size: 0.8rem;
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

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { addToCart } = useCart();

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];

  // Filter products by category
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  return (
    <ShopContainer>
      <ShopHeader>
        <ShopTitle>Shop Collection</ShopTitle>
        <ShopDescription>
          Explore our latest collection of premium streetwear designed for style and comfort.
        </ShopDescription>
      </ShopHeader>

      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProductGrid>
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
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
              <ProductCategory>{product.category}</ProductCategory>
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
    </ShopContainer>
  );
};

export default Shop; 