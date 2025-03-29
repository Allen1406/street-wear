import{u as m,w as u,C as f}from"./CartContext-C1fD52WZ.js";import{L as l,r as a,l as e,O as g}from"./chunk-XJI4KG32-CWcXHV3D.js";import{n as t,m as p,F as d,a as b,b as j}from"./index-DeAzHsZe.js";import{A as w}from"./index-KQl_1X3o.js";const y=t.nav`
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
`,v=t(l)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`,C=t.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`,r=t(l)`
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
`,x=t(p.button)`
  position: relative;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`,c=t.span`
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
`,k=t.button`
  display: none;
  font-size: 1.5rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`,M=t(p.div)`
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
`,z=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`,E=t.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`,s=t(r)`
  padding: 0.8rem 0;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:after {
    display: none;
  }
`,L=t.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,O=t(x)`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem 0;
  
  svg {
    font-size: 1.5rem;
  }
`,S=t(x)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 4rem;
    top: 1rem;
  }
`,A=t(p.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`,B=()=>{const[i,o]=a.useState(!1),{cartItems:n}=m();return a.useEffect(()=>{const h=()=>{window.innerWidth>768&&i&&o(!1)};return window.addEventListener("resize",h),()=>window.removeEventListener("resize",h)},[i]),a.useEffect(()=>(i?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>{document.body.style.overflow="auto"}),[i]),e.jsxs(y,{children:[e.jsx(v,{to:"/",children:"STREETWEAR"}),e.jsxs(C,{children:[e.jsx(r,{to:"/",children:"Home"}),e.jsx(r,{to:"/original",children:"Original Page"}),e.jsx(r,{to:"/shop",children:"Shop"}),e.jsx(r,{to:"/collections",children:"Collections"}),e.jsx(r,{to:"/about",children:"About"}),e.jsx(x,{whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsxs(l,{to:"/cart",style:{display:"flex",position:"relative"},children:[e.jsx(d,{size:24}),n.length>0&&e.jsx(c,{children:n.length})]})})]}),e.jsx(S,{whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsxs(l,{to:"/cart",style:{display:"flex",position:"relative"},children:[e.jsx(d,{size:24}),n.length>0&&e.jsx(c,{children:n.length})]})}),e.jsx(k,{onClick:()=>o(!0),children:e.jsx(b,{})}),e.jsx(w,{children:i&&e.jsxs(e.Fragment,{children:[e.jsx(A,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>o(!1)}),e.jsxs(M,{initial:{x:300},animate:{x:0},exit:{x:300},transition:{type:"tween",duration:.3},children:[e.jsxs(z,{children:[e.jsx("h3",{style:{color:"white",margin:0},children:"Menu"}),e.jsx(E,{onClick:()=>o(!1),children:e.jsx(j,{})})]}),e.jsx(s,{to:"/",onClick:()=>o(!1),children:"Home"}),e.jsx(s,{to:"/original",onClick:()=>o(!1),children:"Original Page"}),e.jsx(s,{to:"/shop",onClick:()=>o(!1),children:"Shop"}),e.jsx(s,{to:"/collections",onClick:()=>o(!1),children:"Collections"}),e.jsx(s,{to:"/about",onClick:()=>o(!1),children:"About"}),e.jsx(L,{children:e.jsx(s,{to:"/cart",onClick:()=>o(!1),children:e.jsxs(O,{children:[e.jsx(d,{}),"Cart",n.length>0&&e.jsx(c,{children:n.length})]})})})]})]})})]})},F=t.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,H=t.main`
  flex: 1;
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`,I=u(function(){return a.useEffect(()=>{const o=document.createElement("script");return o.src="/images/placeholder.js",o.async=!0,document.body.appendChild(o),()=>{document.body.removeChild(o)}},[]),e.jsx(f,{children:e.jsxs(F,{children:[e.jsx(B,{}),e.jsx(H,{children:e.jsx(g,{})})]})})});export{I as default};
