import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: black;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const CartButton = styled(motion.button)`
  position: relative;
  padding: 0.5rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  font-size: 0.8rem;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  background: #111;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <Nav>
      <Logo to="/">STREETWEAR</Logo>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/original">Original Page</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/collections">Collections</NavLink>
        <NavLink to="/about">About</NavLink>
        <CartButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link to="/cart" style={{ display: 'flex', position: 'relative' }}>
            <FiShoppingCart size={24} />
            {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
          </Link>
        </CartButton>
      </NavLinks>

      <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </MobileMenuButton>

      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/original">Original Page</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/about">About</NavLink>
          <CartButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/cart" style={{ display: 'flex', position: 'relative' }}>
              <FiShoppingCart size={24} />
              {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
            </Link>
          </CartButton>
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar; 