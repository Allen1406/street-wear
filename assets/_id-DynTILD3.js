import{w as j,u as w}from"./CartContext-C1fD52WZ.js";import{o as C,n as S,r as d,l as e}from"./chunk-XJI4KG32-CWcXHV3D.js";import{n as r,m as s,e as l,d as k}from"./index-DeAzHsZe.js";import{p as v}from"./products-COYa-fSL.js";const m=r.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,p=r(s.button)`
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
`,P=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,z=r.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`,y=r.div`
  display: flex;
  flex-direction: column;
`,B=r.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`,F=r.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`,T=r.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`,h=r.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`,$=r.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`,D=r(s.button)`
  padding: 0.5rem 1rem;
  border: 1px solid ${i=>i.isSelected?"#000":"#e0e0e0"};
  background: ${i=>i.isSelected?"#000":"#fff"};
  color: ${i=>i.isSelected?"#fff":"#333"};
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
`,O=r.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`,A=r(s.button)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${i=>i.color.toLowerCase()};
  cursor: pointer;
  border: 2px solid ${i=>i.isSelected?"#000":"transparent"};
`,E=r(s.button)`
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
`,H=()=>{const{id:i}=C(),n=S(),{addToCart:u}=w(),o=v.find(t=>t.id===Number(i)),[a,x]=d.useState((o==null?void 0:o.sizes[0])||""),[c,g]=d.useState((o==null?void 0:o.colors[0])||"");if(!o)return e.jsxs(m,{children:[e.jsx("h2",{children:"Product not found"}),e.jsxs(p,{onClick:()=>n("/shop"),children:[e.jsx(l,{}),"Back to Shop"]})]});const f=()=>{u(o,a,c),n("/cart")},b=t=>({Black:"#000000",Gray:"#808080",Navy:"#000080",White:"#FFFFFF",Olive:"#808000",Khaki:"#F0E68C","Light Blue":"#ADD8E6","Dark Blue":"#00008B"})[t]||t;return e.jsxs(m,{children:[e.jsxs(p,{onClick:()=>n(-1),whileHover:{x:-5},children:[e.jsx(l,{}),"Back"]}),e.jsxs(P,{children:[e.jsx(z,{src:o.image,alt:o.name}),e.jsxs(y,{children:[e.jsx(B,{children:o.name}),e.jsxs(F,{children:["$",o.price.toFixed(2)]}),e.jsx(T,{children:o.description}),e.jsx(h,{children:"Size"}),e.jsx($,{children:o.sizes.map(t=>e.jsx(D,{isSelected:a===t,onClick:()=>x(t),whileHover:{scale:1.05},whileTap:{scale:.95},children:t},t))}),e.jsx(h,{children:"Color"}),e.jsx(O,{children:o.colors.map(t=>e.jsx(A,{color:b(t),isSelected:c===t,onClick:()=>g(t),whileHover:{scale:1.1},whileTap:{scale:.9}},t))}),e.jsxs(E,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:f,children:[e.jsx(k,{}),"Add to Cart"]})]})]})]})},K=j(H);export{K as default};
