import { Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding-top: 80px;
`;

export default function Root() {
  useEffect(() => {
    // Load the placeholder script
    const script = document.createElement('script');
    script.src = '/images/placeholder.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <CartProvider>
      <MainContainer>
        <Navbar />
        <Content>
          <Outlet />
        </Content>
      </MainContainer>
    </CartProvider>
  );
}
