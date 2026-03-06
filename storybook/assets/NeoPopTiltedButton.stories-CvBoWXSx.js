import{R as e}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},variantLabel:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"0.75rem",display:"block"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},a=({label:w,faceColor:m="#ffffff",textColor:T="#000000",disabled:i=!1,floating:h=!1,skewDeg:c=-12})=>{const B=(k,f)=>{const s=parseInt(k.replace("#",""),16),D=Math.max(0,(s>>16)-f),P=Math.max(0,(s>>8&255)-f),W=Math.max(0,(s&255)-f);return`rgb(${D},${P},${W})`};return e.createElement(e.Fragment,null,e.createElement("style",null,`
        @keyframes tiltedBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `),e.createElement("div",{style:{display:"inline-block",opacity:i?.4:1,cursor:i?"not-allowed":"pointer",animation:h&&!i?"tiltedBob 2s ease-in-out infinite":"none"}},e.createElement("div",{style:{transform:`skewX(${c}deg)`,background:m,boxShadow:`4px 4px 0 0 ${B(m,70)}`,display:"inline-block"}},e.createElement("div",{style:{transform:`skewX(${-c}deg)`,color:T,fontFamily:"'Outfit', sans-serif",fontSize:"0.75rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.75rem 2.5rem",whiteSpace:"nowrap"}},w))))},N=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopTiltedButton"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Parallelogram-shaped button using CSS skewX transform"),e.createElement("p",{style:t.sectionTitle},"Default"),e.createElement("span",{style:t.variantLabel},"skewX(-12deg) with 3D shadow"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",marginBottom:"1.5rem",paddingLeft:"1rem"}},e.createElement(a,{label:"Pay Now",faceColor:"#ffffff",textColor:"#000000"}),e.createElement(a,{label:"Explore",faceColor:"#0066FF",textColor:"#ffffff"}),e.createElement(a,{label:"Success",faceColor:"#06C270",textColor:"#000000"})),e.createElement("pre",{style:t.code},`<NeoPopTiltedButton
  label="Pay Now"
  backgroundColor="#ffffff"
  onPress={() => {}}
/>`),e.createElement("p",{style:t.sectionTitle},"With Floating Animation"),e.createElement("span",{style:t.variantLabel},"Subtle bounce CSS keyframe animation"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",marginBottom:"1.5rem",paddingLeft:"1rem"}},e.createElement(a,{label:"Floating",faceColor:"#7C5CFC",textColor:"#ffffff",floating:!0}),e.createElement(a,{label:"Hover Me",faceColor:"#F5A623",textColor:"#000000",floating:!0})),e.createElement("pre",{style:t.code},`<NeoPopTiltedButton
  label="Floating"
  backgroundColor="#7C5CFC"
  isFloating
  onPress={() => {}}
/>`),e.createElement("p",{style:t.sectionTitle},"Disabled"),e.createElement("span",{style:t.variantLabel},"opacity: 0.4, cursor: not-allowed"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",marginBottom:"1.5rem",paddingLeft:"1rem"}},e.createElement(a,{label:"Disabled",faceColor:"#ffffff",textColor:"#000000",disabled:!0})),e.createElement("pre",{style:t.code},`<NeoPopTiltedButton
  label="Disabled"
  backgroundColor="#ffffff"
  disabled
  onPress={() => {}}
/>`),e.createElement("p",{style:t.sectionTitle},"Skew Variants"),e.createElement("span",{style:t.variantLabel},"Different skew angles"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",marginBottom:"1.5rem",paddingLeft:"2rem"}},e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",alignItems:"center"}},e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}},"-8deg"),e.createElement(a,{label:"Light Tilt",faceColor:"#0066FF",textColor:"#ffffff",skewDeg:-8})),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",alignItems:"center"}},e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}},"-12deg"),e.createElement(a,{label:"Standard",faceColor:"#0066FF",textColor:"#ffffff",skewDeg:-12})),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",alignItems:"center"}},e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}},"-18deg"),e.createElement(a,{label:"Bold Tilt",faceColor:"#0066FF",textColor:"#ffffff",skewDeg:-18})))),I={title:"Components/NeoPopTiltedButton",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},r={name:"All Variants",render:()=>e.createElement(N,null)},l={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}},e.createElement(a,{label:"Pay Now",faceColor:"#ffffff",textColor:"#000000"}),e.createElement(a,{label:"Continue",faceColor:"#0066FF",textColor:"#ffffff"}))},o={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}},e.createElement(a,{label:"Floating Button",faceColor:"#7C5CFC",textColor:"#ffffff",floating:!0}))},n={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{label:"Disabled",faceColor:"#ffffff",textColor:"#000000",disabled:!0}))};var p,d,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var y,u,b;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem'
  }}>
      <TiltedBtn label="Pay Now" faceColor="#ffffff" textColor="#000000" />
      <TiltedBtn label="Continue" faceColor="#0066FF" textColor="#ffffff" />
    </div>
}`,...(b=(u=l.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var C,x,E;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem'
  }}>
      <TiltedBtn label="Floating Button" faceColor="#7C5CFC" textColor="#ffffff" floating />
    </div>
}`,...(E=(x=o.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var S,F,v;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <TiltedBtn label="Disabled" faceColor="#ffffff" textColor="#000000" disabled />
    </div>
}`,...(v=(F=n.parameters)==null?void 0:F.docs)==null?void 0:v.source}}};const L=["AllVariantsStory","Default","WithFloating","Disabled"];export{r as AllVariantsStory,l as Default,n as Disabled,o as WithFloating,L as __namedExportsOrder,I as default};
