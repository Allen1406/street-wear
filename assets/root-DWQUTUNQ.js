import{u as x,w as h,C as m}from"./CartContext-C1fD52WZ.js";import{L as r,r as d,l as e,O as u}from"./chunk-XJI4KG32-CWcXHV3D.js";import{n as o,m as p,F as a,a as g,b}from"./index-Dq6RcAo_.js";const f=o.nav`
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
`,j=o(r)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`,w=o.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`,t=o(r)`
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
`,l=o(p.button)`
  position: relative;
  padding: 0.5rem;
`,c=o.span`
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
`,v=o.button`
  display: none;
  font-size: 1.5rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`,y=o(p.div)`
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
`,C=()=>{const[n,i]=d.useState(!1),{cartItems:s}=x();return e.jsxs(f,{children:[e.jsx(j,{to:"/",children:"STREETWEAR"}),e.jsxs(w,{children:[e.jsx(t,{to:"/",children:"Home"}),e.jsx(t,{to:"/original",children:"Original Page"}),e.jsx(t,{to:"/shop",children:"Shop"}),e.jsx(t,{to:"/collections",children:"Collections"}),e.jsx(t,{to:"/about",children:"About"}),e.jsx(l,{whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsxs(r,{to:"/cart",style:{display:"flex",position:"relative"},children:[e.jsx(a,{size:24}),s.length>0&&e.jsx(c,{children:s.length})]})})]}),e.jsx(v,{onClick:()=>i(!n),children:n?e.jsx(g,{}):e.jsx(b,{})}),n&&e.jsxs(y,{initial:{x:100},animate:{x:0},exit:{x:100},children:[e.jsx(t,{to:"/",children:"Home"}),e.jsx(t,{to:"/original",children:"Original Page"}),e.jsx(t,{to:"/shop",children:"Shop"}),e.jsx(t,{to:"/collections",children:"Collections"}),e.jsx(t,{to:"/about",children:"About"}),e.jsx(l,{whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsxs(r,{to:"/cart",style:{display:"flex",position:"relative"},children:[e.jsx(a,{size:24}),s.length>0&&e.jsx(c,{children:s.length})]})})]})]})},k=o.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,M=o.main`
  flex: 1;
  padding-top: 80px;
`,S=h(function(){return d.useEffect(()=>{const i=document.createElement("script");return i.src="/images/placeholder.js",i.async=!0,document.body.appendChild(i),()=>{document.body.removeChild(i)}},[]),e.jsx(m,{children:e.jsxs(k,{children:[e.jsx(C,{}),e.jsx(M,{children:e.jsx(u,{})})]})})});export{S as default};
