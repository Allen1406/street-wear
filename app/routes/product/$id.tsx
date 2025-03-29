import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ProductDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const OptionsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SizeOption = styled(motion.button)<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.isSelected ? '#000' : '#e0e0e0'};
  background: ${props => props.isSelected ? '#000' : '#fff'};
  color: ${props => props.isSelected ? '#fff' : '#333'};
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ColorOption = styled(motion.button)<{ color: string; isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.color.toLowerCase()};
  cursor: pointer;
  border: 2px solid ${props => props.isSelected ? '#000' : 'transparent'};
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-top: auto;
`;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  
  if (!product) {
    return (
      <ProductContainer>
        <h2>Product not found</h2>
        <BackButton onClick={() => navigate('/shop')}>
          <FiArrowLeft />
          Back to Shop
        </BackButton>
      </ProductContainer>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    navigate('/cart');
  };
  
  const getColorValue = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Black': '#000000',
      'Gray': '#808080',
      'Navy': '#000080',
      'White': '#FFFFFF',
      'Olive': '#808000',
      'Khaki': '#F0E68C',
      'Light Blue': '#ADD8E6',
      'Dark Blue': '#00008B'
    };
    
    return colorMap[color] || color;
  };
  
  return (
    <ProductContainer>
      <BackButton 
        onClick={() => navigate(-1)}
        whileHover={{ x: -5 }}
      >
        <FiArrowLeft />
        Back
      </BackButton>
      
      <ProductDetails>
        <ProductImage src={product.image} alt={product.name} />
        
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          
          <OptionsTitle>Size</OptionsTitle>
          <SizeOptions>
            {product.sizes.map(size => (
              <SizeOption
                key={size}
                isSelected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </SizeOption>
            ))}
          </SizeOptions>
          
          <OptionsTitle>Color</OptionsTitle>
          <ColorOptions>
            {product.colors.map(color => (
              <ColorOption
                key={color}
                color={getColorValue(color)}
                isSelected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </ColorOptions>
          
          <AddToCartButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
          >
            <FiShoppingBag />
            Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ProductDetails>
    </ProductContainer>
  );
};

export default ProductDetail; 