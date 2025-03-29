import{w as H,u as L}from"./CartContext-C1fD52WZ.js";import{r as s,l as e,n as q}from"./chunk-XJI4KG32-CWcXHV3D.js";import{M as D,u as F,P as N,e as Q,f as W,L as A,n as r,m as b,g as K,d as U,h as G,i as O,j as V}from"./index-Dq6RcAo_.js";class X extends s.Component{getSnapshotBeforeUpdate(i){const n=this.props.childRef.current;if(n&&i.isPresent&&!this.props.isPresent){const d=n.offsetParent,h=d instanceof HTMLElement&&d.offsetWidth||0,a=this.props.sizeRef.current;a.height=n.offsetHeight||0,a.width=n.offsetWidth||0,a.top=n.offsetTop,a.left=n.offsetLeft,a.right=h-a.width-a.left}return null}componentDidUpdate(){}render(){return this.props.children}}function Y({children:c,isPresent:i,anchorX:n}){const d=s.useId(),h=s.useRef(null),a=s.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:u}=s.useContext(D);return s.useInsertionEffect(()=>{const{width:C,height:l,top:t,left:o,right:g}=a.current;if(i||!h.current||!C||!l)return;const f=n==="left"?`left: ${o}`:`right: ${g}`;h.current.dataset.motionPopId=d;const m=document.createElement("style");return u&&(m.nonce=u),document.head.appendChild(m),m.sheet&&m.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${C}px !important;
            height: ${l}px !important;
            ${f}px !important;
            top: ${t}px !important;
          }
        `),()=>{document.head.removeChild(m)}},[i]),e.jsx(X,{isPresent:i,childRef:h,sizeRef:a,children:s.cloneElement(c,{ref:h})})}const _=({children:c,initial:i,isPresent:n,onExitComplete:d,custom:h,presenceAffectsLayout:a,mode:u,anchorX:C})=>{const l=F(J),t=s.useId(),o=s.useCallback(f=>{l.set(f,!0);for(const m of l.values())if(!m)return;d&&d()},[l,d]),g=s.useMemo(()=>({id:t,initial:i,isPresent:n,custom:h,onExitComplete:o,register:f=>(l.set(f,!1),()=>l.delete(f))}),a?[Math.random(),o]:[n,o]);return s.useMemo(()=>{l.forEach((f,m)=>l.set(m,!1))},[n]),s.useEffect(()=>{!n&&!l.size&&d&&d()},[n]),u==="popLayout"&&(c=e.jsx(Y,{isPresent:n,anchorX:C,children:c})),e.jsx(N.Provider,{value:g,children:c})};function J(){return new Map}const v=c=>c.key||"";function S(c){const i=[];return s.Children.forEach(c,n=>{s.isValidElement(n)&&i.push(n)}),i}const Z=({children:c,custom:i,initial:n=!0,onExitComplete:d,presenceAffectsLayout:h=!0,mode:a="sync",propagate:u=!1,anchorX:C="left"})=>{const[l,t]=Q(u),o=s.useMemo(()=>S(c),[c]),g=u&&!l?[]:o.map(v),f=s.useRef(!0),m=s.useRef(o),w=F(()=>new Map),[M,T]=s.useState(o),[j,I]=s.useState(o);W(()=>{f.current=!1,m.current=o;for(let x=0;x<j.length;x++){const p=v(j[x]);g.includes(p)?w.delete(p):w.get(p)!==!0&&w.set(p,!1)}},[j,g.length,g.join("-")]);const k=[];if(o!==M){let x=[...o];for(let p=0;p<j.length;p++){const y=j[p],R=v(y);g.includes(R)||(x.splice(p,0,y),k.push(y))}return a==="wait"&&k.length&&(x=k),I(S(x)),T(o),null}const{forceRender:z}=s.useContext(A);return e.jsx(e.Fragment,{children:j.map(x=>{const p=v(x),y=u&&!l?!1:o===j||g.includes(p),R=()=>{if(w.has(p))w.set(p,!0);else return;let P=!0;w.forEach(B=>{B||(P=!1)}),P&&(z==null||z(),I(m.current),u&&(t==null||t()),d&&d())};return e.jsx(_,{isPresent:y,initial:!f.current||n?void 0:!1,custom:i,presenceAffectsLayout:h,mode:a,onExitComplete:y?void 0:R,anchorX:C,children:x},p)})})},ee=r.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 2rem;
`,te=r.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`,ne=r(b.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
`,re=r.h1`
  font-size: 2.5rem;
  font-weight: 700;
`,oe=r.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,se=r(b.div)`
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
`,ie=r.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`,ae=r.div`
  flex: 1;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`,ce=r.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`,de=r.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`,le=r.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
`,pe=r.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    justify-content: center;
  }
`,$=r(b.button)`
  padding: 0.5rem;
  border-radius: 50%;
  background: #f3f3f3;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`,he=r(b.button)`
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
`,ue=r.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,E=r.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`,me=r(E)`
  font-size: 1.3rem;
  font-weight: 700;
  border-top: 2px solid #f3f3f3;
  padding-top: 1rem;
  margin-top: 1rem;
`,fe=r(b.button)`
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
`,xe=r.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`,ge=r.div`
  font-size: 5rem;
  color: #ddd;
`,Ce=r(b.button)`
  padding: 0.8rem 2rem;
  background: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
`,je=()=>{const c=q(),{cartItems:i,removeFromCart:n,updateQuantity:d,clearCart:h}=L(),a=i.reduce((t,o)=>t+o.price*o.quantity,0),u=i.length>0?5.99:0,C=a+u,l=()=>{alert("Proceeding to checkout..."),h(),c("/")};return e.jsxs(ee,{children:[e.jsxs(te,{children:[e.jsxs(ne,{whileHover:{x:-5},onClick:()=>c(-1),children:[e.jsx(K,{}),"Back"]}),e.jsxs(re,{children:["Shopping Cart (",i.length,")"]})]}),i.length===0?e.jsxs(xe,{children:[e.jsx(ge,{children:e.jsx(U,{})}),e.jsx("h2",{children:"Your cart is empty"}),e.jsx("p",{children:"Looks like you haven't added any items to your cart yet."}),e.jsx(Ce,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>c("/"),children:"Start Shopping"})]}):e.jsxs(e.Fragment,{children:[e.jsx(oe,{children:e.jsx(Z,{children:i.map(t=>e.jsxs(se,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},children:[e.jsx(ie,{src:t.image,alt:t.name}),e.jsxs(ae,{children:[e.jsx(ce,{children:t.name}),e.jsxs(de,{children:["Size: ",t.selectedSize," | Color: ",t.selectedColor]}),e.jsxs(le,{children:["$",(t.price*t.quantity).toFixed(2)," ($",t.price.toFixed(2)," each)"]})]}),e.jsxs(pe,{children:[e.jsx($,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>d(t.id,-1),children:e.jsx(G,{})}),e.jsx("span",{children:t.quantity}),e.jsx($,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>d(t.id,1),children:e.jsx(O,{})}),e.jsx(he,{whileHover:{scale:1.1},whileTap:{scale:.9},onClick:()=>n(t.id),children:e.jsx(V,{})})]})]},`${t.id}-${t.selectedSize}-${t.selectedColor}`))})}),e.jsxs(ue,{children:[e.jsxs(E,{children:[e.jsxs("span",{children:["Subtotal (",i.reduce((t,o)=>t+o.quantity,0)," items)"]}),e.jsxs("span",{children:["$",a.toFixed(2)]})]}),e.jsxs(E,{children:[e.jsx("span",{children:"Shipping"}),e.jsxs("span",{children:["$",u.toFixed(2)]})]}),e.jsxs(me,{children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:["$",C.toFixed(2)]})]}),e.jsx(fe,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:l,children:"Proceed to Checkout"})]})]})]})},ve=H(je);export{ve as default};
