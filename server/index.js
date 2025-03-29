import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, createContext, useState, useContext, useEffect } from "react";
import { Link, Outlet, useNavigate, useParams as useParams$1 } from "react-router-dom";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiX, FiMenu, FiEye, FiShoppingBag, FiArrowLeft, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
const CartContext = createContext(void 0);
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product, size, color) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingItem) {
        return prevItems.map(
          (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const updateQuantity = (id, change) => {
    setCartItems(
      (prevItems) => prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return /* @__PURE__ */ jsx(CartContext.Provider, { value: { cartItems, addToCart, removeFromCart, updateQuantity, clearCart }, children });
}
function useCart() {
  const context = useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
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
  return /* @__PURE__ */ jsxs(Nav, { children: [
    /* @__PURE__ */ jsx(Logo, { to: "/", children: "STREETWEAR" }),
    /* @__PURE__ */ jsxs(NavLinks, { children: [
      /* @__PURE__ */ jsx(NavLink, { to: "/", children: "Home" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/original", children: "Original Page" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/shop", children: "Shop" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/collections", children: "Collections" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/about", children: "About" }),
      /* @__PURE__ */ jsx(
        CartButton,
        {
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 },
          children: /* @__PURE__ */ jsxs(Link, { to: "/cart", style: { display: "flex", position: "relative" }, children: [
            /* @__PURE__ */ jsx(FiShoppingCart, { size: 24 }),
            cartItems.length > 0 && /* @__PURE__ */ jsx(CartCount, { children: cartItems.length })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(MobileMenuButton, { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: isMobileMenuOpen ? /* @__PURE__ */ jsx(FiX, {}) : /* @__PURE__ */ jsx(FiMenu, {}) }),
    isMobileMenuOpen && /* @__PURE__ */ jsxs(
      MobileMenu,
      {
        initial: { x: 100 },
        animate: { x: 0 },
        exit: { x: 100 },
        children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/", children: "Home" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/original", children: "Original Page" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/shop", children: "Shop" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/collections", children: "Collections" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/about", children: "About" }),
          /* @__PURE__ */ jsx(
            CartButton,
            {
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.9 },
              children: /* @__PURE__ */ jsxs(Link, { to: "/cart", style: { display: "flex", position: "relative" }, children: [
                /* @__PURE__ */ jsx(FiShoppingCart, { size: 24 }),
                cartItems.length > 0 && /* @__PURE__ */ jsx(CartCount, { children: cartItems.length })
              ] })
            }
          )
        ]
      }
    )
  ] });
};
const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Content = styled.main`
  flex: 1;
  padding-top: 80px;
`;
const root = withComponentProps(function Root() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/images/placeholder.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx(CartProvider, {
    children: /* @__PURE__ */ jsxs(MainContainer, {
      children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Content, {
        children: /* @__PURE__ */ jsx(Outlet, {})
      })]
    })
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const products = [
  {
    id: 1,
    name: "Black Hoodie",
    price: 89.99,
    image: "/images/product1.jpg",
    category: "Hoodies",
    description: "A comfortable and stylish black hoodie perfect for urban streetwear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Navy"]
  },
  {
    id: 2,
    name: "Navy Track Jacket",
    price: 79.99,
    image: "/images/product2.jpg",
    category: "Jackets",
    description: "Stylish navy track jacket with STREETWEAR logo on the back.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"]
  },
  {
    id: 3,
    name: "Black Track Jacket",
    price: 79.99,
    image: "/images/product3.jpg",
    category: "Jackets",
    description: "Modern black track jacket with white stripes and STREETWEAR branding.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray"]
  },
  {
    id: 4,
    name: "Graphic T-Shirt",
    price: 39.99,
    image: "/images/product4.jpg",
    category: "T-Shirts",
    description: "Black STREETWEAR t-shirt with bold back logo design.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"]
  },
  {
    id: 5,
    name: "Navy Track Pants",
    price: 69.99,
    image: "/images/product5.jpg",
    category: "Pants",
    description: "Comfortable navy track pants with white piping detail.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"]
  },
  {
    id: 6,
    name: "Black Track Pants",
    price: 69.99,
    image: "/images/product6.jpg",
    category: "Pants",
    description: "Athletic black track pants with white stripe detailing.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray"]
  }
];
const Homepage = () => {
  console.log("Homepage rendering, products:", products);
  const {
    addToCart
  } = useCart();
  const [addedToCart, setAddedToCart] = useState({});
  const handleAddToCart = (product) => {
    addToCart(product, product.sizes[0], product.colors[0]);
    setAddedToCart({
      ...addedToCart,
      [product.id]: true
    });
    setTimeout(() => {
      setAddedToCart({
        ...addedToCart,
        [product.id]: false
      });
    }, 2e3);
  };
  return /* @__PURE__ */ jsxs("div", {
    style: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto"
    },
    children: [/* @__PURE__ */ jsxs("div", {
      style: {
        height: "500px",
        background: "linear-gradient(45deg, #111, #222)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        marginBottom: "40px",
        position: "relative",
        overflow: "hidden"
      },
      children: [/* @__PURE__ */ jsx("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: 'url("/images/streetwear_hero.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
          zIndex: 0
        }
      }), /* @__PURE__ */ jsxs("div", {
        style: {
          textAlign: "center",
          padding: "25px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "10px",
          zIndex: 1,
          maxWidth: "600px",
          border: "1px solid rgba(255,255,255,0.1)"
        },
        children: [/* @__PURE__ */ jsx("div", {
          style: {
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "white",
            textTransform: "uppercase",
            letterSpacing: "3px"
          },
          children: "STREETWEAR"
        }), /* @__PURE__ */ jsx("h1", {
          style: {
            fontSize: "2.2rem",
            marginBottom: "15px",
            color: "white",
            fontWeight: "300"
          },
          children: "Premium Performance Wear"
        }), /* @__PURE__ */ jsx("p", {
          style: {
            fontSize: "1.2rem",
            marginBottom: "25px",
            color: "#ccc",
            maxWidth: "80%",
            margin: "0 auto 25px auto"
          },
          children: "Elevate your training with our signature track jackets and pants collection"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/shop",
          style: {
            display: "inline-block",
            padding: "12px 30px",
            background: "white",
            color: "black",
            textDecoration: "none",
            borderRadius: "30px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease"
          },
          children: "Shop Now"
        })]
      })]
    }), /* @__PURE__ */ jsx("h2", {
      style: {
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "30px"
      },
      children: "Featured Products"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        color: "#333",
        textAlign: "center",
        marginBottom: "20px"
      },
      children: /* @__PURE__ */ jsxs("p", {
        children: ["Total products available: ", products.length]
      })
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px"
      },
      children: [Array.isArray(products) && products.slice(0, 6).map((product) => /* @__PURE__ */ jsxs("div", {
        style: {
          border: "1px solid #ddd",
          borderRadius: "10px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        },
        children: [/* @__PURE__ */ jsxs("div", {
          style: {
            position: "relative",
            height: "300px"
          },
          children: [/* @__PURE__ */ jsx("img", {
            src: product.image,
            alt: product.name,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover"
            },
            onError: (e) => {
              const target = e.target;
              target.onerror = null;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.style.backgroundColor = "#333";
                parent.style.display = "flex";
                parent.style.alignItems = "center";
                parent.style.justifyContent = "center";
                const text = document.createElement("div");
                text.textContent = product.name;
                text.style.color = "white";
                text.style.fontWeight = "bold";
                text.style.padding = "10px";
                text.style.textAlign = "center";
                parent.appendChild(text);
              }
            }
          }), /* @__PURE__ */ jsxs("div", {
            style: {
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px"
            },
            children: ["ID: ", product.id]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            padding: "15px"
          },
          children: [/* @__PURE__ */ jsx("h3", {
            style: {
              marginBottom: "5px"
            },
            children: product.name
          }), /* @__PURE__ */ jsxs("p", {
            style: {
              color: "#666",
              marginBottom: "15px"
            },
            children: ["$", product.price.toFixed(2)]
          }), /* @__PURE__ */ jsxs("div", {
            style: {
              display: "flex",
              gap: "10px"
            },
            children: [/* @__PURE__ */ jsx(Link, {
              to: `/product/${product.id}`,
              style: {
                flex: 1,
                padding: "8px",
                background: "#f3f3f3",
                color: "#333",
                textAlign: "center",
                textDecoration: "none",
                borderRadius: "5px"
              },
              children: "View Details"
            }), /* @__PURE__ */ jsx("button", {
              onClick: () => handleAddToCart(product),
              style: {
                flex: 1,
                padding: "8px",
                background: addedToCart[product.id] ? "#4CAF50" : "#000",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              },
              children: addedToCart[product.id] ? "Added! ✓" : "Add to Cart"
            })]
          })]
        })]
      }, product.id)), (!Array.isArray(products) || products.length === 0) && /* @__PURE__ */ jsx("div", {
        style: {
          gridColumn: "1 / -1",
          textAlign: "center",
          padding: "50px",
          border: "1px dashed #ddd",
          borderRadius: "10px"
        },
        children: /* @__PURE__ */ jsx("p", {
          children: "No products available at the moment. Please check back later."
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        marginTop: "50px",
        padding: "40px 30px",
        background: "#000",
        color: "white",
        textAlign: "center",
        borderRadius: "10px"
      },
      children: [/* @__PURE__ */ jsx("div", {
        style: {
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
          letterSpacing: "2px"
        },
        children: "STREETWEAR"
      }), /* @__PURE__ */ jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "30px",
          flexWrap: "wrap"
        },
        children: [/* @__PURE__ */ jsx("div", {
          children: "Shop"
        }), /* @__PURE__ */ jsx("div", {
          children: "About"
        }), /* @__PURE__ */ jsx("div", {
          children: "Athletes"
        }), /* @__PURE__ */ jsx("div", {
          children: "Careers"
        }), /* @__PURE__ */ jsx("div", {
          children: "Support"
        })]
      }), /* @__PURE__ */ jsx("p", {
        children: "© 2024 STREETWEAR. All rights reserved."
      })]
    })]
  });
};
const homepage = withComponentProps(Homepage);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: homepage
}, Symbol.toStringTag, { value: "Module" }));
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
const ProductGrid$1 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const ProductCard$1 = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: #f8f8f8;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 450px;
  border: 1px solid #e0e0e0;
`;
const ProductImageContainer$1 = styled.div`
  position: relative;
  overflow: hidden;
`;
const ProductImage$2 = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductImageContainer$1}:hover & {
    transform: scale(1.05);
  }
`;
const ProductOverlay$1 = styled.div`
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
  
  ${ProductImageContainer$1}:hover & {
    opacity: 1;
  }
`;
const ProductInfo$2 = styled.div`
  padding: 1.5rem;
  text-align: center;
  background: white;
`;
const ProductName$2 = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;
const ProductPrice$2 = styled.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 1rem;
`;
const AddToCartButton$2 = styled(motion.button)`
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
const ViewButton$1 = styled(motion.button)`
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
  const {
    addToCart
  } = useCart();
  const [debugInfo, setDebugInfo] = useState({
    productsLoaded: false,
    count: 0
  });
  useEffect(() => {
    console.log("Products data:", products);
    console.log("Number of products:", products.length);
    setDebugInfo({
      productsLoaded: Array.isArray(products),
      count: Array.isArray(products) ? products.length : 0,
      firstProduct: Array.isArray(products) && products.length > 0 ? products[0].name : "None"
    });
    const timer = setTimeout(() => {
      console.log("Forcing re-render...");
      setDebugInfo((prev) => ({
        ...prev,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }));
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  const handleAddToCart = (product) => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };
  if (!products || products.length === 0) {
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsxs(HeroSection, {
        children: [/* @__PURE__ */ jsx(HeroImage, {}), /* @__PURE__ */ jsxs(HeroContent, {
          children: [/* @__PURE__ */ jsx(HeroTitle, {
            children: "Streetwear Redefined"
          }), /* @__PURE__ */ jsx(HeroSubtitle, {
            children: "Discover the latest trends in urban fashion"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/shop",
            children: /* @__PURE__ */ jsx(ShopButton, {
              children: "Shop Now"
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs(ProductsSection, {
        children: [/* @__PURE__ */ jsx(SectionTitle, {
          children: "Featured Products"
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            textAlign: "center",
            padding: "50px"
          },
          children: [/* @__PURE__ */ jsx("p", {
            children: "No products available at the moment. Please check back later."
          }), /* @__PURE__ */ jsx("div", {
            style: {
              marginTop: "20px"
            },
            children: /* @__PURE__ */ jsx(Link, {
              to: "/",
              children: /* @__PURE__ */ jsx(motion.button, {
                whileHover: {
                  scale: 1.05
                },
                whileTap: {
                  scale: 0.95
                },
                style: {
                  padding: "10px 20px",
                  background: "#444",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  cursor: "pointer"
                },
                children: "Try New Version"
              })
            })
          })]
        })]
      }), /* @__PURE__ */ jsx(DebugInfo, {
        children: /* @__PURE__ */ jsxs("pre", {
          children: ["Products Issue: ", JSON.stringify(debugInfo, null, 2)]
        })
      })]
    });
  }
  const fallbackProducts = [{
    id: 101,
    name: "Fallback Hoodie",
    price: 89.99,
    image: "/images/product1.jpg",
    category: "Hoodies",
    description: "A fallback product in case of data issues.",
    sizes: ["M"],
    colors: ["Black"]
  }, {
    id: 102,
    name: "Fallback T-Shirt",
    price: 39.99,
    image: "/images/product4.jpg",
    category: "T-Shirts",
    description: "Another fallback product.",
    sizes: ["M"],
    colors: ["Black"]
  }];
  const displayProducts = products.length > 0 ? products : fallbackProducts;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs(HeroSection, {
      children: [/* @__PURE__ */ jsx(HeroImage, {}), /* @__PURE__ */ jsxs(HeroContent, {
        children: [/* @__PURE__ */ jsx(HeroTitle, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.8
          },
          children: "Streetwear Redefined"
        }), /* @__PURE__ */ jsx(HeroSubtitle, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.8,
            delay: 0.2
          },
          children: "Discover the latest trends in urban fashion"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/shop",
          children: /* @__PURE__ */ jsx(ShopButton, {
            whileHover: {
              scale: 1.05
            },
            whileTap: {
              scale: 0.95
            },
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              duration: 0.8,
              delay: 0.4
            },
            children: "Shop Now"
          })
        }), /* @__PURE__ */ jsx("div", {
          style: {
            marginTop: "15px"
          },
          children: /* @__PURE__ */ jsx(Link, {
            to: "/",
            children: /* @__PURE__ */ jsx(ShopButton, {
              whileHover: {
                scale: 1.05
              },
              whileTap: {
                scale: 0.95
              },
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                duration: 0.8,
                delay: 0.5
              },
              style: {
                background: "#444",
                fontSize: "0.9rem"
              },
              children: "Try New Version"
            })
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs(ProductsSection, {
      className: "debug-border",
      children: [/* @__PURE__ */ jsx(SectionTitle, {
        children: "Featured Products"
      }), /* @__PURE__ */ jsx("div", {
        style: {
          textAlign: "center",
          marginBottom: "20px"
        },
        children: /* @__PURE__ */ jsxs("small", {
          children: ["Total products: ", displayProducts.length]
        })
      }), /* @__PURE__ */ jsx(ProductGrid$1, {
        className: "product-grid debug-border",
        children: displayProducts.slice(0, 6).map((product, index2) => /* @__PURE__ */ jsxs(ProductCard$1, {
          className: "product-card debug-border",
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5,
            delay: index2 * 0.1
          },
          children: [/* @__PURE__ */ jsxs("small", {
            style: {
              position: "absolute",
              top: 5,
              right: 5,
              background: "#fff",
              padding: "2px 5px",
              borderRadius: "3px",
              zIndex: 2
            },
            children: ["ID: ", product.id]
          }), /* @__PURE__ */ jsxs(ProductImageContainer$1, {
            children: [/* @__PURE__ */ jsx(ProductImage$2, {
              src: product.image,
              alt: product.name
            }), /* @__PURE__ */ jsx(ProductOverlay$1, {
              children: /* @__PURE__ */ jsx(Link, {
                to: `/product/${product.id}`,
                children: /* @__PURE__ */ jsxs(ViewButton$1, {
                  whileHover: {
                    scale: 1.05
                  },
                  whileTap: {
                    scale: 0.95
                  },
                  children: [/* @__PURE__ */ jsx(FiEye, {}), "View Details"]
                })
              })
            })]
          }), /* @__PURE__ */ jsxs(ProductInfo$2, {
            children: [/* @__PURE__ */ jsx(ProductName$2, {
              children: product.name
            }), /* @__PURE__ */ jsxs(ProductPrice$2, {
              children: ["$", product.price.toFixed(2)]
            }), /* @__PURE__ */ jsxs(AddToCartButton$2, {
              whileHover: {
                scale: 1.02
              },
              whileTap: {
                scale: 0.98
              },
              onClick: () => handleAddToCart(product),
              children: [/* @__PURE__ */ jsx(FiShoppingBag, {}), "Add to Cart"]
            })]
          })]
        }, product.id))
      })]
    }), /* @__PURE__ */ jsx(DebugInfo, {
      children: /* @__PURE__ */ jsxs("pre", {
        children: ["Debug: ", JSON.stringify(debugInfo, null, 2)]
      })
    }), /* @__PURE__ */ jsxs(Footer, {
      children: [/* @__PURE__ */ jsxs(FooterContent, {
        children: [/* @__PURE__ */ jsxs(FooterSection, {
          children: [/* @__PURE__ */ jsx("h3", {
            children: "About Us"
          }), /* @__PURE__ */ jsxs("ul", {
            children: [/* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Our Story"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Careers"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Press"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Blog"
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs(FooterSection, {
          children: [/* @__PURE__ */ jsx("h3", {
            children: "Customer Service"
          }), /* @__PURE__ */ jsxs("ul", {
            children: [/* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Contact Us"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Shipping Policy"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Returns & Exchanges"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "FAQ"
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs(FooterSection, {
          children: [/* @__PURE__ */ jsx("h3", {
            children: "Connect With Us"
          }), /* @__PURE__ */ jsxs("ul", {
            children: [/* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Instagram"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Facebook"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Twitter"
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                children: "Pinterest"
              })
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx(Copyright, {
        children: "© 2024 Streetwear. All rights reserved."
      })]
    })]
  });
};
const index = withComponentProps(Home);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
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
const FilterButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  background: ${(props) => props.isActive ? "#000" : "#f3f3f3"};
  color: ${(props) => props.isActive ? "#fff" : "#333"};
  border: 1px solid ${(props) => props.isActive ? "#000" : "#e0e0e0"};
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
const ProductImage$1 = styled.img`
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
const ProductInfo$1 = styled.div`
  padding: 1.5rem;
`;
const ProductName$1 = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;
const ProductPrice$1 = styled.p`
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
const AddToCartButton$1 = styled(motion.button)`
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
  const [activeCategory, setActiveCategory] = useState("All");
  const {
    addToCart
  } = useCart();
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
  const filteredProducts = activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);
  const handleAddToCart = (product) => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };
  return /* @__PURE__ */ jsxs(ShopContainer, {
    children: [/* @__PURE__ */ jsxs(ShopHeader, {
      children: [/* @__PURE__ */ jsx(ShopTitle, {
        children: "Shop Collection"
      }), /* @__PURE__ */ jsx(ShopDescription, {
        children: "Explore our latest collection of premium streetwear designed for style and comfort."
      })]
    }), /* @__PURE__ */ jsx(FilterContainer, {
      children: categories.map((category) => /* @__PURE__ */ jsx(FilterButton, {
        isActive: activeCategory === category,
        onClick: () => setActiveCategory(category),
        whileHover: {
          scale: 1.05
        },
        whileTap: {
          scale: 0.95
        },
        children: category
      }, category))
    }), /* @__PURE__ */ jsx(ProductGrid, {
      children: filteredProducts.map((product, index2) => /* @__PURE__ */ jsxs(ProductCard, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.3,
          delay: index2 * 0.1
        },
        children: [/* @__PURE__ */ jsxs(ProductImageContainer, {
          children: [/* @__PURE__ */ jsx(ProductImage$1, {
            src: product.image,
            alt: product.name
          }), /* @__PURE__ */ jsx(ProductOverlay, {
            children: /* @__PURE__ */ jsx(Link, {
              to: `/product/${product.id}`,
              children: /* @__PURE__ */ jsxs(ViewButton, {
                whileHover: {
                  scale: 1.05
                },
                whileTap: {
                  scale: 0.95
                },
                children: [/* @__PURE__ */ jsx(FiEye, {}), "View Details"]
              })
            })
          })]
        }), /* @__PURE__ */ jsxs(ProductInfo$1, {
          children: [/* @__PURE__ */ jsx(ProductCategory, {
            children: product.category
          }), /* @__PURE__ */ jsx(ProductName$1, {
            children: product.name
          }), /* @__PURE__ */ jsxs(ProductPrice$1, {
            children: ["$", product.price.toFixed(2)]
          }), /* @__PURE__ */ jsxs(AddToCartButton$1, {
            whileHover: {
              scale: 1.02
            },
            whileTap: {
              scale: 0.98
            },
            onClick: () => handleAddToCart(product),
            children: [/* @__PURE__ */ jsx(FiShoppingBag, {}), "Add to Cart"]
          })]
        })]
      }, product.id))
    })]
  });
};
const shop = withComponentProps(Shop);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: shop
}, Symbol.toStringTag, { value: "Module" }));
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
const BackButton$1 = styled(motion.button)`
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
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    clearCart();
    navigate("/");
  };
  return /* @__PURE__ */ jsxs(CartContainer, {
    children: [/* @__PURE__ */ jsxs(CartHeader, {
      children: [/* @__PURE__ */ jsxs(BackButton$1, {
        whileHover: {
          x: -5
        },
        onClick: () => navigate(-1),
        children: [/* @__PURE__ */ jsx(FiArrowLeft, {}), "Back"]
      }), /* @__PURE__ */ jsxs(CartTitle, {
        children: ["Shopping Cart (", cartItems.length, ")"]
      })]
    }), cartItems.length === 0 ? /* @__PURE__ */ jsxs(EmptyCart, {
      children: [/* @__PURE__ */ jsx(EmptyCartIcon, {
        children: /* @__PURE__ */ jsx(FiShoppingBag, {})
      }), /* @__PURE__ */ jsx("h2", {
        children: "Your cart is empty"
      }), /* @__PURE__ */ jsx("p", {
        children: "Looks like you haven't added any items to your cart yet."
      }), /* @__PURE__ */ jsx(ShopNowButton, {
        whileHover: {
          scale: 1.05
        },
        whileTap: {
          scale: 0.95
        },
        onClick: () => navigate("/"),
        children: "Start Shopping"
      })]
    }) : /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(CartItems, {
        children: /* @__PURE__ */ jsx(AnimatePresence, {
          children: cartItems.map((item) => /* @__PURE__ */ jsxs(CartItem, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            exit: {
              opacity: 0,
              y: -20
            },
            children: [/* @__PURE__ */ jsx(ItemImage, {
              src: item.image,
              alt: item.name
            }), /* @__PURE__ */ jsxs(ItemInfo, {
              children: [/* @__PURE__ */ jsx(ItemName, {
                children: item.name
              }), /* @__PURE__ */ jsxs(ItemDetails, {
                children: ["Size: ", item.selectedSize, " | Color: ", item.selectedColor]
              }), /* @__PURE__ */ jsxs(ItemPrice, {
                children: ["$", (item.price * item.quantity).toFixed(2), " ($", item.price.toFixed(2), " each)"]
              })]
            }), /* @__PURE__ */ jsxs(QuantityControls, {
              children: [/* @__PURE__ */ jsx(QuantityButton, {
                whileHover: {
                  scale: 1.1
                },
                whileTap: {
                  scale: 0.9
                },
                onClick: () => updateQuantity(item.id, -1),
                children: /* @__PURE__ */ jsx(FiMinus, {})
              }), /* @__PURE__ */ jsx("span", {
                children: item.quantity
              }), /* @__PURE__ */ jsx(QuantityButton, {
                whileHover: {
                  scale: 1.1
                },
                whileTap: {
                  scale: 0.9
                },
                onClick: () => updateQuantity(item.id, 1),
                children: /* @__PURE__ */ jsx(FiPlus, {})
              }), /* @__PURE__ */ jsx(RemoveButton, {
                whileHover: {
                  scale: 1.1
                },
                whileTap: {
                  scale: 0.9
                },
                onClick: () => removeFromCart(item.id),
                children: /* @__PURE__ */ jsx(FiTrash2, {})
              })]
            })]
          }, `${item.id}-${item.selectedSize}-${item.selectedColor}`))
        })
      }), /* @__PURE__ */ jsxs(CartSummary, {
        children: [/* @__PURE__ */ jsxs(SummaryRow, {
          children: [/* @__PURE__ */ jsxs("span", {
            children: ["Subtotal (", cartItems.reduce((sum, item) => sum + item.quantity, 0), " items)"]
          }), /* @__PURE__ */ jsxs("span", {
            children: ["$", subtotal.toFixed(2)]
          })]
        }), /* @__PURE__ */ jsxs(SummaryRow, {
          children: [/* @__PURE__ */ jsx("span", {
            children: "Shipping"
          }), /* @__PURE__ */ jsxs("span", {
            children: ["$", shipping.toFixed(2)]
          })]
        }), /* @__PURE__ */ jsxs(TotalRow, {
          children: [/* @__PURE__ */ jsx("span", {
            children: "Total"
          }), /* @__PURE__ */ jsxs("span", {
            children: ["$", total.toFixed(2)]
          })]
        }), /* @__PURE__ */ jsx(CheckoutButton, {
          whileHover: {
            scale: 1.02
          },
          whileTap: {
            scale: 0.98
          },
          onClick: handleCheckout,
          children: "Proceed to Checkout"
        })]
      })]
    })]
  });
};
const cart = withComponentProps(Cart);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cart
}, Symbol.toStringTag, { value: "Module" }));
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
const SizeOption = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => props.isSelected ? "#000" : "#e0e0e0"};
  background: ${(props) => props.isSelected ? "#000" : "#fff"};
  color: ${(props) => props.isSelected ? "#fff" : "#333"};
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
`;
const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;
const ColorOption = styled(motion.button)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) => props.color.toLowerCase()};
  cursor: pointer;
  border: 2px solid ${(props) => props.isSelected ? "#000" : "transparent"};
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
  const {
    id
  } = useParams$1();
  const navigate = useNavigate();
  const {
    addToCart
  } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState((product == null ? void 0 : product.sizes[0]) || "");
  const [selectedColor, setSelectedColor] = useState((product == null ? void 0 : product.colors[0]) || "");
  if (!product) {
    return /* @__PURE__ */ jsxs(ProductContainer, {
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Product not found"
      }), /* @__PURE__ */ jsxs(BackButton, {
        onClick: () => navigate("/shop"),
        children: [/* @__PURE__ */ jsx(FiArrowLeft, {}), "Back to Shop"]
      })]
    });
  }
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    navigate("/cart");
  };
  const getColorValue = (color) => {
    const colorMap = {
      "Black": "#000000",
      "Gray": "#808080",
      "Navy": "#000080",
      "White": "#FFFFFF",
      "Olive": "#808000",
      "Khaki": "#F0E68C",
      "Light Blue": "#ADD8E6",
      "Dark Blue": "#00008B"
    };
    return colorMap[color] || color;
  };
  return /* @__PURE__ */ jsxs(ProductContainer, {
    children: [/* @__PURE__ */ jsxs(BackButton, {
      onClick: () => navigate(-1),
      whileHover: {
        x: -5
      },
      children: [/* @__PURE__ */ jsx(FiArrowLeft, {}), "Back"]
    }), /* @__PURE__ */ jsxs(ProductDetails, {
      children: [/* @__PURE__ */ jsx(ProductImage, {
        src: product.image,
        alt: product.name
      }), /* @__PURE__ */ jsxs(ProductInfo, {
        children: [/* @__PURE__ */ jsx(ProductName, {
          children: product.name
        }), /* @__PURE__ */ jsxs(ProductPrice, {
          children: ["$", product.price.toFixed(2)]
        }), /* @__PURE__ */ jsx(ProductDescription, {
          children: product.description
        }), /* @__PURE__ */ jsx(OptionsTitle, {
          children: "Size"
        }), /* @__PURE__ */ jsx(SizeOptions, {
          children: product.sizes.map((size) => /* @__PURE__ */ jsx(SizeOption, {
            isSelected: selectedSize === size,
            onClick: () => setSelectedSize(size),
            whileHover: {
              scale: 1.05
            },
            whileTap: {
              scale: 0.95
            },
            children: size
          }, size))
        }), /* @__PURE__ */ jsx(OptionsTitle, {
          children: "Color"
        }), /* @__PURE__ */ jsx(ColorOptions, {
          children: product.colors.map((color) => /* @__PURE__ */ jsx(ColorOption, {
            color: getColorValue(color),
            isSelected: selectedColor === color,
            onClick: () => setSelectedColor(color),
            whileHover: {
              scale: 1.1
            },
            whileTap: {
              scale: 0.9
            }
          }, color))
        }), /* @__PURE__ */ jsxs(AddToCartButton, {
          whileHover: {
            scale: 1.02
          },
          whileTap: {
            scale: 0.98
          },
          onClick: handleAddToCart,
          children: [/* @__PURE__ */ jsx(FiShoppingBag, {}), "Add to Cart"]
        })]
      })]
    })]
  });
};
const $id = withComponentProps(ProductDetail);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $id
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Br7EufPb.js", "imports": ["/assets/chunk-XJI4KG32-CWcXHV3D.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-DWQUTUNQ.js", "imports": ["/assets/chunk-XJI4KG32-CWcXHV3D.js", "/assets/CartContext-C1fD52WZ.js", "/assets/index-Dq6RcAo_.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/homepage": { "id": "routes/homepage", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/homepage-ya8sDMA0.js", "imports": ["/assets/CartContext-C1fD52WZ.js", "/assets/chunk-XJI4KG32-CWcXHV3D.js", "/assets/products-COYa-fSL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/index": { "id": "routes/index", "parentId": "root", "path": "/original", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-B8GqTBSr.js", "imports": ["/assets/CartContext-C1fD52WZ.js", "/assets/chunk-XJI4KG32-CWcXHV3D.js", "/assets/index-Dq6RcAo_.js", "/assets/products-COYa-fSL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/shop": { "id": "routes/shop", "parentId": "root", "path": "/shop", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/shop-DzPhw14o.js", "imports": ["/assets/CartContext-C1fD52WZ.js", "/assets/chunk-XJI4KG32-CWcXHV3D.js", "/assets/index-Dq6RcAo_.js", "/assets/products-COYa-fSL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/cart": { "id": "routes/cart", "parentId": "root", "path": "/cart", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/cart-DqRH7F52.js", "imports": ["/assets/CartContext-C1fD52WZ.js", "/assets/chunk-XJI4KG32-CWcXHV3D.js", "/assets/index-Dq6RcAo_.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/product/$id": { "id": "routes/product/$id", "parentId": "root", "path": "/product/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_id-jH4OgQXG.js", "imports": ["/assets/CartContext-C1fD52WZ.js", "/assets/chunk-XJI4KG32-CWcXHV3D.js", "/assets/index-Dq6RcAo_.js", "/assets/products-COYa-fSL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-62db9560.js", "version": "62db9560" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/homepage": {
    id: "routes/homepage",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "/original",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/shop": {
    id: "routes/shop",
    parentId: "root",
    path: "/shop",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/cart": {
    id: "routes/cart",
    parentId: "root",
    path: "/cart",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/product/$id": {
    id: "routes/product/$id",
    parentId: "root",
    path: "/product/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
