import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 2rem;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
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
`;

const CartTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ItemDetails = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    justify-content: center;
  }
`;

const QuantityButton = styled(motion.button)`
  padding: 0.5rem;
  border-radius: 50%;
  background: #f3f3f3;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

const RemoveButton = styled(motion.button)`
  padding: 0.5rem;
  color: #ff4444;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #cc0000;
  }
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.3rem;
  font-weight: 700;
  border-top: 2px solid #f3f3f3;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const EmptyCartIcon = styled.div`
  font-size: 5rem;
  color: #ddd;
`;

const ShopNowButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  background: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
`;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    // Here you would typically integrate with a payment processor
    alert('Proceeding to checkout...');
    clearCart();
    navigate('/');
  };

  return (
    <CartContainer>
      <CartHeader>
        <BackButton
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          Back
        </BackButton>
        <CartTitle>Shopping Cart ({cartItems.length})</CartTitle>
      </CartHeader>
      
      {cartItems.length === 0 ? (
        <EmptyCart>
          <EmptyCartIcon>
            <FiShoppingBag />
          </EmptyCartIcon>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <ShopNowButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
          >
            Start Shopping
          </ShopNowButton>
        </EmptyCart>
      ) : (
        <>
          <CartItems>
            <AnimatePresence>
              {cartItems.map(item => (
                <CartItem
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemDetails>
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </ItemDetails>
                    <ItemPrice>${(item.price * item.quantity).toFixed(2)} (${item.price.toFixed(2)} each)</ItemPrice>
                  </ItemInfo>
                  <QuantityControls>
                    <QuantityButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <FiMinus />
                    </QuantityButton>
                    <span>{item.quantity}</span>
                    <QuantityButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <FiPlus />
                    </QuantityButton>
                    <RemoveButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 />
                    </RemoveButton>
                  </QuantityControls>
                </CartItem>
              ))}
            </AnimatePresence>
          </CartItems>

          <CartSummary>
            <SummaryRow>
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </SummaryRow>
            <TotalRow>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </TotalRow>
            <CheckoutButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </>
      )}
    </CartContainer>
  );
};

export default Cart; 