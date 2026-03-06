import{R as e}from"./index-Bc2G9s8g.js";const r={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff",position:"relative"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},z={success:{accent:"#06C270",icon:"✓",title:"Payment Successful",message:"Your transaction of ₹5,000 has been processed."},error:{accent:"#EE4D37",icon:"✕",title:"Transaction Failed",message:"Unable to process payment. Please try again."},warning:{accent:"#F5A623",icon:"!",title:"Action Required",message:"Your KYC documents need to be updated."},info:{accent:"#2196F3",icon:"i",title:"Update Available",message:"A new version of the app is ready to install."}},a=({type:t="info",showIcon:o=!0,showClose:d=!0,position:s="static"})=>{const n=z[t];return e.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:"0.85rem",background:"#111111",borderLeft:`3px solid ${n.accent}`,border:"1px solid rgba(255,255,255,0.08)",borderLeft:`3px solid ${n.accent}`,padding:"0.85rem 1rem",maxWidth:380,boxShadow:"4px 4px 0 0 rgba(0,0,0,0.5)",...s==="bottom"?{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:999,width:"90%",maxWidth:400}:{}}},o&&e.createElement("div",{style:{width:24,height:24,borderRadius:"50%",background:n.accent,color:"#000",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",fontWeight:900,flexShrink:0}},n.icon),e.createElement("div",{style:{flex:1,minWidth:0}},e.createElement("div",{style:{fontSize:"0.75rem",fontWeight:700,letterSpacing:"0.04em",color:"#ffffff",marginBottom:"0.25rem"}},n.title),e.createElement("div",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.5)",letterSpacing:"0.02em",lineHeight:1.5}},n.message)),d&&e.createElement("button",{style:{background:"transparent",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:"1rem",lineHeight:1,padding:0,flexShrink:0,fontFamily:"'Outfit', sans-serif"}},"✕"))},f=["success","error","warning","info"],j=()=>e.createElement("div",{style:r.page},e.createElement("p",{style:r.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopToast"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Slide-in notification — colored left border accent"),e.createElement("p",{style:r.sectionTitle},"All Types"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",marginBottom:"1.5rem"}},f.map(t=>e.createElement(a,{key:t,type:t}))),e.createElement("pre",{style:r.code},`showToast({
  type: 'success',
  title: 'Payment Successful',
  message: 'Your transaction has been processed.',
});`),e.createElement("p",{style:r.sectionTitle},"Without Icon"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",marginBottom:"1.5rem"}},f.map(t=>e.createElement(a,{key:t,type:t,showIcon:!1}))),e.createElement("p",{style:r.sectionTitle},"Without Close Button"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",marginBottom:"1.5rem"}},e.createElement(a,{type:"info",showClose:!1}),e.createElement(a,{type:"success",showClose:!1})),e.createElement("p",{style:r.sectionTitle},"Auto Close (label only)"),e.createElement(P,null),e.createElement("p",{style:r.sectionTitle},"Usage Code"),e.createElement("pre",{style:r.code},`// In your app entry / global context:
import { NeoPopToastProvider, useToast } from 'neopop-rn';

// Inside component:
const { showToast } = useToast();

showToast({
  type: 'error',
  title: 'Transaction Failed',
  message: 'Please try again.',
  duration: 4000,
  position: 'bottom',
});`)),P=()=>{const[t,o]=e.useState(!0),[d,s]=e.useState(100);e.useEffect(()=>{if(!t)return;const g=setInterval(()=>{s(u=>u<=0?(o(!1),clearInterval(g),0):u-2)},80);return()=>clearInterval(g)},[t]);const n=()=>{o(!0),s(100)};return t?e.createElement("div",{style:{maxWidth:380}},e.createElement(a,{type:"success",showClose:!1}),e.createElement("div",{style:{height:3,background:"rgba(255,255,255,0.08)",marginTop:0}},e.createElement("div",{style:{height:"100%",width:`${d}%`,background:"#06C270",transition:"width 0.08s linear"}}))):e.createElement("div",null,e.createElement("button",{onClick:n,style:{background:"#0066FF",color:"#ffffff",border:"none",padding:"0.5rem 1.25rem",fontFamily:"'Outfit', sans-serif",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",boxShadow:"3px 3px 0 0 rgba(0,40,140,0.8)"}},"Show Toast Again"))},D={title:"Components/NeoPopToast",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},i={name:"All Variants",render:()=>e.createElement(j,null)},l={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{type:"success"}))},c={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{type:"error"}))},m={render:()=>e.createElement("div",{style:{...r.page,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"3rem",gap:"1rem"}},f.map(t=>e.createElement(a,{key:t,type:t,showIcon:!0})))},p={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(P,null))};var y,h,x;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(x=(h=i.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var E,S,b;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Toast type="success" />
    </div>
}`,...(b=(S=l.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var T,v,C;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Toast type="error" />
    </div>
}`,...(C=(v=c.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var I,w,A;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem',
    gap: '1rem'
  }}>
      {TYPES.map(t => <Toast key={t} type={t} showIcon />)}
    </div>
}`,...(A=(w=m.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var k,W,F;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <AutoCloseToast />
    </div>
}`,...(F=(W=p.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};const V=["AllVariantsStory","Success","Error","WithIcon","AutoClose"];export{i as AllVariantsStory,p as AutoClose,c as Error,l as Success,m as WithIcon,V as __namedExportsOrder,D as default};
