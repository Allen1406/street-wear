import{w as u,u as f}from"./CartContext-C1fD52WZ.js";import{n as j,l as e}from"./chunk-XJI4KG32-CWcXHV3D.js";import{n as r,m as n,e as b,d as w,f as y,g as C,h as k}from"./index-DeAzHsZe.js";import{A as v}from"./index-KQl_1X3o.js";const z=r.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 2rem;
`,S=r.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`,F=r(n.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
`,I=r.h1`
  font-size: 2.5rem;
  font-weight: 700;
`,T=r.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,B=r(n.div)`
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
`,$=r.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`,H=r.div`
  flex: 1;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`,P=r.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`,q=r.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`,R=r.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
`,A=r.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    justify-content: center;
  }
`,p=r(n.button)`
  padding: 0.5rem;
  border-radius: 50%;
  background: #f3f3f3;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`,E=r(n.button)`
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
`,N=r.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,a=r.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`,Q=r(a)`
  font-size: 1.3rem;
  font-weight: 700;
  border-top: 2px solid #f3f3f3;
  padding-top: 1rem;
  margin-top: 1rem;
`,L=r(n.button)`
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
`,D=r.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`,M=r.div`
  font-size: 5rem;
  color: #ddd;
`,Y=r(n.button)`
  padding: 0.8rem 2rem;
  background: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
`,G=()=>{const s=j(),{cartItems:o,removeFromCart:m,updateQuantity:c,clearCart:x}=f(),d=o.reduce((t,i)=>t+i.price*i.quantity,0),l=o.length>0?5.99:0,h=d+l,g=()=>{alert("Proceeding to checkout..."),x(),s("/")};return e.jsxs(z,{children:[e.jsxs(S,{children:[e.jsxs(F,{whileHover:{x:-5},onClick:()=>s(-1),children:[e.jsx(b,{}),"Back"]}),e.jsxs(I,{children:["Shopping Cart (",o.length,")"]})]}),o.length===0?e.jsxs(D,{children:[e.jsx(M,{children:e.jsx(w,{})}),e.jsx("h2",{children:"Your cart is empty"}),e.jsx("p",{children:"Looks like you haven't added any items to your cart yet."}),e.jsx(Y,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>s("/"),children:"Start Shopping"})]}):e.jsxs(e.Fragment,{children:[e.jsx(T,{children:e.jsx(v,{children:o.map(t=>e.jsxs(B,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},children:[e.jsx($,{src:t.image,alt:t.name}),e.jsxs(H,{children:[e.jsx(P,{children:t.name}),e.jsxs(q,{children:["Size: ",t.selectedSize," | Color: ",t.selectedColor]}),e.jsxs(R,{children:["$",(t.price*t.quantity).toFixed(2)," ($",t.price.toFixed(2)," each)"]})]}),e.jsxs(A,{children:[e.jsx(p,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>c(t.id,-1),children:e.jsx(y,{})}),e.jsx("span",{children:t.quantity}),e.jsx(p,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>c(t.id,1),children:e.jsx(C,{})}),e.jsx(E,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>m(t.id),children:e.jsx(k,{})})]})]},`${t.id}-${t.selectedSize}-${t.selectedColor}`))})}),e.jsxs(N,{children:[e.jsxs(a,{children:[e.jsxs("span",{children:["Subtotal (",o.reduce((t,i)=>t+i.quantity,0)," items)"]}),e.jsxs("span",{children:["$",d.toFixed(2)]})]}),e.jsxs(a,{children:[e.jsx("span",{children:"Shipping"}),e.jsxs("span",{children:["$",l.toFixed(2)]})]}),e.jsxs(Q,{children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:["$",h.toFixed(2)]})]}),e.jsx(L,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:g,children:"Proceed to Checkout"})]})]})]})},V=u(G);export{V as default};
