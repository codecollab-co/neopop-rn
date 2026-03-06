import{R as e}from"./index-Bc2G9s8g.js";const a={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},r=()=>e.createElement("style",null,`
    @keyframes levitate {
      0%, 100% { transform: translateY(0px); box-shadow: 4px 8px 0 0 rgba(0,40,140,0.7); }
      50%       { transform: translateY(-8px); box-shadow: 4px 16px 0 0 rgba(0,40,140,0.4); }
    }
    @keyframes levitateCircle {
      0%, 100% { transform: translateY(0px); box-shadow: 0 8px 0 0 rgba(0,40,140,0.7); }
      50%       { transform: translateY(-8px); box-shadow: 0 16px 0 0 rgba(0,40,140,0.4); }
    }
    @keyframes floatShimmer {
      0%   { transform: translateX(-100%) skewX(-12deg) translateY(0px); }
      50%  { transform: translateX(200%) skewX(-12deg) translateY(-6px); }
      100% { transform: translateX(-100%) skewX(-12deg) translateY(0px); }
    }
  `),t=({label:P,shape:m="rectangle",faceColor:k="#0066FF",textColor:T="#ffffff",withShimmer:p=!1,animate:N=!0})=>{const W=m==="pill"?50:m==="circle"?"50%":0,l=m==="circle";return e.createElement("div",{style:{display:"inline-block",position:"relative",overflow:p?"hidden":"visible",background:k,color:T,fontFamily:"'Outfit', sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:l?"0":"0.75rem 2rem",width:l?60:"auto",height:l?60:"auto",display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:W,cursor:"pointer",userSelect:"none",animation:N?l?"levitateCircle 2.2s ease-in-out infinite":"levitate 2.2s ease-in-out infinite":"none",boxShadow:"4px 8px 0 0 rgba(0,40,140,0.7)"}},P,p&&e.createElement("div",{style:{position:"absolute",inset:0,background:"linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",animation:"floatShimmer 2.5s ease-in-out infinite",pointerEvents:"none"}}))},I=()=>e.createElement("div",{style:a.page},e.createElement(r,null),e.createElement("p",{style:a.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopFloatingButton"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Levitating button with CSS keyframe bob animation and shadow depth"),e.createElement("p",{style:a.sectionTitle},"Rectangle"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",padding:"2rem 0",marginBottom:"1.5rem"}},e.createElement(t,{label:"Pay Now",shape:"rectangle",faceColor:"#0066FF"}),e.createElement(t,{label:"Claim",shape:"rectangle",faceColor:"#06C270",textColor:"#000000"}),e.createElement(t,{label:"Alert",shape:"rectangle",faceColor:"#EE4D37"})),e.createElement("pre",{style:a.code},`<NeoPopFloatingButton
  shape="rectangle"
  label="Pay Now"
  color="#0066FF"
  onPress={() => {}}
/>`),e.createElement("p",{style:a.sectionTitle},"Pill (border-radius: 50px)"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",padding:"2rem 0",marginBottom:"1.5rem"}},e.createElement(t,{label:"Continue",shape:"pill",faceColor:"#0066FF"}),e.createElement(t,{label:"Subscribe",shape:"pill",faceColor:"#7C5CFC"})),e.createElement("pre",{style:a.code},`<NeoPopFloatingButton
  shape="pill"
  label="Continue"
  color="#0066FF"
  onPress={() => {}}
/>`),e.createElement("p",{style:a.sectionTitle},"Circle (border-radius: 50%)"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",padding:"2rem 0",marginBottom:"1.5rem",alignItems:"center"}},e.createElement(t,{label:"+",shape:"circle",faceColor:"#0066FF"}),e.createElement(t,{label:"★",shape:"circle",faceColor:"#F5A623",textColor:"#000000"}),e.createElement(t,{label:"✓",shape:"circle",faceColor:"#06C270",textColor:"#000000"})),e.createElement("pre",{style:a.code},`<NeoPopFloatingButton
  shape="circle"
  icon={<PlusIcon />}
  color="#0066FF"
  onPress={() => {}}
/>`),e.createElement("p",{style:a.sectionTitle},"With Shimmer"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",padding:"2rem 0",marginBottom:"1.5rem"}},e.createElement(t,{label:"Get Offer",shape:"rectangle",faceColor:"#06C270",textColor:"#000000",withShimmer:!0}),e.createElement(t,{label:"Unlock",shape:"pill",faceColor:"#0066FF",withShimmer:!0})),e.createElement("pre",{style:a.code},`<NeoPopFloatingButton
  label="Get Offer"
  showShimmer
  color="#06C270"
  onPress={() => {}}
/>`),e.createElement("p",{style:a.sectionTitle},"Static (No Animation)"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",marginBottom:"1.5rem"}},e.createElement(t,{label:"Static",shape:"rectangle",animate:!1}),e.createElement(t,{label:"Static Pill",shape:"pill",animate:!1}))),A={title:"Components/NeoPopFloatingButton",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},n={name:"All Variants",render:()=>e.createElement(I,null)},o={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem"}},e.createElement(r,null),e.createElement(t,{label:"Pay Now",shape:"rectangle"}))},i={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem"}},e.createElement(r,null),e.createElement(t,{label:"Continue",shape:"pill"}))},s={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem"}},e.createElement(r,null),e.createElement(t,{label:"+",shape:"circle"}))},c={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem"}},e.createElement(r,null),e.createElement(t,{label:"Get Offer",faceColor:"#06C270",textColor:"#000000",withShimmer:!0}))};var d,g,f;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var u,y,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem'
  }}>
      <Keyframes />
      <FloatingBtn label="Pay Now" shape="rectangle" />
    </div>
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var b,x,E;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem'
  }}>
      <Keyframes />
      <FloatingBtn label="Continue" shape="pill" />
    </div>
}`,...(E=(x=i.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var C,S,F;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem'
  }}>
      <Keyframes />
      <FloatingBtn label="+" shape="circle" />
    </div>
}`,...(F=(S=s.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var v,w,B;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem'
  }}>
      <Keyframes />
      <FloatingBtn label="Get Offer" faceColor="#06C270" textColor="#000000" withShimmer />
    </div>
}`,...(B=(w=c.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const O=["AllVariantsStory","Rectangle","Pill","Circle","WithShimmer"];export{n as AllVariantsStory,s as Circle,i as Pill,o as Rectangle,c as WithShimmer,O as __namedExportsOrder,A as default};
