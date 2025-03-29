import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
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
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
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
  background: none;
  border: none;
  cursor: pointer;
  color: white;
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
  z-index: 1001;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const MobileNavLink = styled(NavLink)`
  padding: 0.8rem 0;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:after {
    display: none;
  }
`;

const MobileCartWrapper = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileCartButton = styled(CartButton)`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem 0;
  
  svg {
    font-size: 1.5rem;
  }
`;

// Component for displaying cart in mobile view when menu is closed
const MobileCartIcon = styled(CartButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 4rem;
    top: 1rem;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

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
      
      {/* Cart icon for mobile (visible when menu is closed) */}
      <MobileCartIcon
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link to="/cart" style={{ display: 'flex', position: 'relative' }}>
          <FiShoppingCart size={24} />
          {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
        </Link>
      </MobileCartIcon>

      <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
        <FiMenu />
      </MobileMenuButton>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Backdrop 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <MobileMenuHeader>
                <h3 style={{ color: 'white', margin: 0 }}>Menu</h3>
                <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                  <FiX />
                </CloseButton>
              </MobileMenuHeader>
              
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/original" onClick={() => setIsMobileMenuOpen(false)}>Original Page</MobileNavLink>
              <MobileNavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</MobileNavLink>
              <MobileNavLink to="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
              
              <MobileCartWrapper>
                <MobileNavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <MobileCartButton>
                    <FiShoppingCart />
                    Cart
                    {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
                  </MobileCartButton>
                </MobileNavLink>
              </MobileCartWrapper>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar; 