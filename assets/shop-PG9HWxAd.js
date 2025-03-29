import{w as f,u as h}from"./CartContext-C1fD52WZ.js";import{r as g,l as t,L as x}from"./chunk-XJI4KG32-CWcXHV3D.js";import{n as o,m as i,c as u,d as b}from"./index-DeAzHsZe.js";import{p as n}from"./products-COYa-fSL.js";const w=o.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,j=o.div`
  margin-bottom: 3rem;
  text-align: center;
`,y=o.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`,v=o.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`,C=o.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  gap: 1rem;
`,A=o(i.button)`
  padding: 0.5rem 1.5rem;
  background: ${r=>r.isActive?"#000":"#f3f3f3"};
  color: ${r=>r.isActive?"#fff":"#333"};
  border: 1px solid ${r=>r.isActive?"#000":"#e0e0e0"};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
`,P=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`,k=o(i.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,s=o.div`
  position: relative;
  overflow: hidden;
`,S=o.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s ease;
`,z=o.div`
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
  
  ${s}:hover & {
    opacity: 1;
  }
`,T=o.div`
  padding: 1.5rem;
`,$=o.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`,F=o.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 1rem;
`,B=o.span`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: #f3f3f3;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`,E=o(i.button)`
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
`,H=o(i.button)`
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
`,I=()=>{const[r,a]=g.useState("All"),{addToCart:c}=h(),d=["All",...Array.from(new Set(n.map(e=>e.category)))],l=r==="All"?n:n.filter(e=>e.category===r),m=e=>{c(e,e.sizes[0],e.colors[0])};return t.jsxs(w,{children:[t.jsxs(j,{children:[t.jsx(y,{children:"Shop Collection"}),t.jsx(v,{children:"Explore our latest collection of premium streetwear designed for style and comfort."})]}),t.jsx(C,{children:d.map(e=>t.jsx(A,{isActive:r===e,onClick:()=>a(e),whileHover:{scale:1.05},whileTap:{scale:.95},children:e},e))}),t.jsx(P,{children:l.map((e,p)=>t.jsxs(k,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:p*.1},children:[t.jsxs(s,{children:[t.jsx(S,{src:e.image,alt:e.name}),t.jsx(z,{children:t.jsx(x,{to:`/product/${e.id}`,children:t.jsxs(H,{whileHover:{scale:1.05},whileTap:{scale:.95},children:[t.jsx(u,{}),"View Details"]})})})]}),t.jsxs(T,{children:[t.jsx(B,{children:e.category}),t.jsx($,{children:e.name}),t.jsxs(F,{children:["$",e.price.toFixed(2)]}),t.jsxs(E,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>m(e),children:[t.jsx(b,{}),"Add to Cart"]})]})]},e.id))})]})},N=f(I);export{N as default};
