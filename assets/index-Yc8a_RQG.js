import{w as z,u as P}from"./CartContext-C1fD52WZ.js";import{r as p,l as e,L as n}from"./chunk-XJI4KG32-CWcXHV3D.js";import{n as i,m as o,c as T,d as A}from"./index-DeAzHsZe.js";import{p as t}from"./products-COYa-fSL.js";const m=i.section`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #f3f3f3, #ffffff);
  position: relative;
  overflow: hidden;
`,g=i.div`
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
`,u=i.div`
  text-align: center;
  z-index: 1;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  max-width: 600px;
`,f=i(o.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`,j=i(o.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`,a=i(o.button)`
  padding: 1rem 2rem;
  background: #000;
  color: white;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`,b=i.section`
  padding: 5rem 2rem;
  background: white;
  min-height: 500px;
  position: relative;
  z-index: 1;
  display: block;
`,y=i.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 700;
`,C=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`,F=i(o.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: #f8f8f8;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 450px;
  border: 1px solid #e0e0e0;
`,c=i.div`
  position: relative;
  overflow: hidden;
`,H=i.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${c}:hover & {
    transform: scale(1.05);
  }
`,N=i.div`
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
  
  ${c}:hover & {
    opacity: 1;
  }
`,I=i.div`
  padding: 1.5rem;
  text-align: center;
  background: white;
`,B=i.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`,D=i.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 1rem;
`,R=i(o.button)`
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
`,E=i(o.button)`
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
`,O=i.footer`
  background: #000;
  color: white;
  padding: 4rem 2rem;
`,L=i.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`,d=i.div`
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
`,V=i.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #333;
  color: #ccc;
`,w=i.div`
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
`,$=()=>{const{addToCart:v}=P(),[l,h]=p.useState({productsLoaded:!1,count:0});p.useEffect(()=>{console.log("Products data:",t),console.log("Number of products:",t.length),h({productsLoaded:Array.isArray(t),count:Array.isArray(t)?t.length:0,firstProduct:Array.isArray(t)&&t.length>0?t[0].name:"None"});const r=setTimeout(()=>{console.log("Forcing re-render..."),h(s=>({...s,timestamp:new Date().toISOString()}))},1e3);return()=>clearTimeout(r)},[]);const k=r=>{v(r,r.sizes[0],r.colors[0])};if(!t||t.length===0)return e.jsxs(e.Fragment,{children:[e.jsxs(m,{children:[e.jsx(g,{}),e.jsxs(u,{children:[e.jsx(f,{children:"Streetwear Redefined"}),e.jsx(j,{children:"Discover the latest trends in urban fashion"}),e.jsx(n,{to:"/shop",children:e.jsx(a,{children:"Shop Now"})})]})]}),e.jsxs(b,{children:[e.jsx(y,{children:"Featured Products"}),e.jsxs("div",{style:{textAlign:"center",padding:"50px"},children:[e.jsx("p",{children:"No products available at the moment. Please check back later."}),e.jsx("div",{style:{marginTop:"20px"},children:e.jsx(n,{to:"/",children:e.jsx(o.button,{whileHover:{scale:1.05},whileTap:{scale:.95},style:{padding:"10px 20px",background:"#444",color:"white",border:"none",borderRadius:"30px",fontWeight:"bold",cursor:"pointer"},children:"Try New Version"})})})]})]}),e.jsx(w,{children:e.jsxs("pre",{children:["Products Issue: ",JSON.stringify(l,null,2)]})})]});const S=[{id:101,name:"Fallback Hoodie",price:89.99,image:"/images/product1.jpg",category:"Hoodies",description:"A fallback product in case of data issues.",sizes:["M"],colors:["Black"]},{id:102,name:"Fallback T-Shirt",price:39.99,image:"/images/product4.jpg",category:"T-Shirts",description:"Another fallback product.",sizes:["M"],colors:["Black"]}],x=t.length>0?t:S;return e.jsxs(e.Fragment,{children:[e.jsxs(m,{children:[e.jsx(g,{}),e.jsxs(u,{children:[e.jsx(f,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8},children:"Streetwear Redefined"}),e.jsx(j,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:"Discover the latest trends in urban fashion"}),e.jsx(n,{to:"/shop",children:e.jsx(a,{whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.4},children:"Shop Now"})}),e.jsx("div",{style:{marginTop:"15px"},children:e.jsx(n,{to:"/",children:e.jsx(a,{whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.5},style:{background:"#444",fontSize:"0.9rem"},children:"Try New Version"})})})]})]}),e.jsxs(b,{className:"debug-border",children:[e.jsx(y,{children:"Featured Products"}),e.jsx("div",{style:{textAlign:"center",marginBottom:"20px"},children:e.jsxs("small",{children:["Total products: ",x.length]})}),e.jsx(C,{className:"product-grid debug-border",children:x.slice(0,6).map((r,s)=>e.jsxs(F,{className:"product-card debug-border",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:s*.1},children:[e.jsxs("small",{style:{position:"absolute",top:5,right:5,background:"#fff",padding:"2px 5px",borderRadius:"3px",zIndex:2},children:["ID: ",r.id]}),e.jsxs(c,{children:[e.jsx(H,{src:r.image,alt:r.name}),e.jsx(N,{children:e.jsx(n,{to:`/product/${r.id}`,children:e.jsxs(E,{whileHover:{scale:1.05},whileTap:{scale:.95},children:[e.jsx(T,{}),"View Details"]})})})]}),e.jsxs(I,{children:[e.jsx(B,{children:r.name}),e.jsxs(D,{children:["$",r.price.toFixed(2)]}),e.jsxs(R,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>k(r),children:[e.jsx(A,{}),"Add to Cart"]})]})]},r.id))})]}),e.jsx(w,{children:e.jsxs("pre",{children:["Debug: ",JSON.stringify(l,null,2)]})}),e.jsxs(O,{children:[e.jsxs(L,{children:[e.jsxs(d,{children:[e.jsx("h3",{children:"About Us"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:"#",children:"Our Story"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Careers"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Press"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Blog"})})]})]}),e.jsxs(d,{children:[e.jsx("h3",{children:"Customer Service"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:"#",children:"Contact Us"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Shipping Policy"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Returns & Exchanges"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"FAQ"})})]})]}),e.jsxs(d,{children:[e.jsx("h3",{children:"Connect With Us"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:"#",children:"Instagram"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Facebook"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Twitter"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Pinterest"})})]})]})]}),e.jsx(V,{children:"© 2024 Streetwear. All rights reserved."})]})]})},G=z($);export{G as default};
