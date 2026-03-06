import{R as e}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},variantRow:{display:"flex",gap:"2rem",alignItems:"flex-start",flexWrap:"wrap",marginBottom:"2.5rem"},variantBlock:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"flex-start"},variantLabel:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400}},r=({label:l,faceColor:a="#ffffff",textColor:o="#000000",shadowDepth:n=4,disabled:y=!1,fullWidth:g=!1,fontSize:F="0.7rem",padding:N="0.75rem 1.75rem"})=>{const W=((D,p)=>{const d=parseInt(D.replace("#",""),16),L=Math.max(0,(d>>16)-p),z=Math.max(0,(d>>8&255)-p),R=Math.max(0,(d&255)-p);return`rgb(${L},${z},${R})`})(a,80);return e.createElement("div",{style:{position:"relative",display:g?"block":"inline-block",opacity:y?.4:1,cursor:y?"not-allowed":"pointer",userSelect:"none"}},e.createElement("div",{style:{background:a,color:o,fontFamily:"'Outfit', sans-serif",fontSize:F,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:N,display:g?"block":"inline-block",textAlign:"center",boxShadow:`${n}px ${n}px 0 0 ${W}`,position:"relative",zIndex:1,transition:"box-shadow 0.1s ease, transform 0.1s ease"}},l))},m=({label:l,borderColor:a="#ffffff",disabled:o=!1})=>e.createElement("div",{style:{display:"inline-block",opacity:o?.4:1,cursor:o?"not-allowed":"pointer"}},e.createElement("div",{style:{background:"transparent",color:a,fontFamily:"'Outfit', sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.75rem 1.75rem",border:`2px solid ${a}`,boxShadow:"4px 4px 0 0 rgba(255,255,255,0.15)"}},l)),u=({label:l,faceColor:a="#06C270"})=>e.createElement("div",{style:{display:"inline-block",position:"relative",overflow:"hidden"}},e.createElement("style",null,`
      @keyframes shimmerSweep {
        0% { transform: translateX(-100%) skewX(-12deg); }
        100% { transform: translateX(200%) skewX(-12deg); }
      }
    `),e.createElement("div",{style:{background:a,color:"#000000",fontFamily:"'Outfit', sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.75rem 1.75rem",boxShadow:"4px 4px 0 0 #04905A",position:"relative",overflow:"hidden"}},l,e.createElement("div",{style:{position:"absolute",inset:0,background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",animation:"shimmerSweep 1.8s ease-in-out infinite"}}))),A=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopButton"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"3D extruded tactile button — main face + bottom/right depth shadows"),e.createElement("p",{style:t.sectionTitle},"Elevated"),e.createElement("div",{style:t.variantRow},e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"White Face"),e.createElement(r,{label:"Pay Now",faceColor:"#ffffff",textColor:"#000000"})),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Blue Face"),e.createElement(r,{label:"Continue",faceColor:"#0066FF",textColor:"#ffffff"})),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Usage"),e.createElement("pre",{style:t.code},`<NeoPopButton
  variant="elevated"
  color="#ffffff"
  onPress={() => {}}
>
  <Typography>Pay Now</Typography>
</NeoPopButton>`))),e.createElement("p",{style:t.sectionTitle},"Flat"),e.createElement("div",{style:t.variantRow},e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"No depth"),e.createElement("div",{style:{background:"#ffffff",color:"#000000",fontFamily:"'Outfit', sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.75rem 1.75rem"}},"Flat Button")),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Usage"),e.createElement("pre",{style:t.code},`<NeoPopButton
  variant="flat"
  color="#ffffff"
  onPress={() => {}}
>
  <Typography>Flat Button</Typography>
</NeoPopButton>`))),e.createElement("p",{style:t.sectionTitle},"Stroke"),e.createElement("div",{style:t.variantRow},e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"White border"),e.createElement(m,{label:"Stroke Button"})),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Blue border"),e.createElement(m,{label:"Stroke Button",borderColor:"#0066FF"})),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Usage"),e.createElement("pre",{style:t.code},`<NeoPopButton
  variant="stroke"
  color="#ffffff"
  onPress={() => {}}
>
  <Typography>Stroke Button</Typography>
</NeoPopButton>`))),e.createElement("p",{style:t.sectionTitle},"With Shimmer"),e.createElement("div",{style:t.variantRow},e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Green shimmer"),e.createElement(u,{label:"Claim Reward",faceColor:"#06C270"})),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Blue shimmer"),e.createElement(u,{label:"Get Started",faceColor:"#0066FF"})),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Usage"),e.createElement("pre",{style:t.code},`<NeoPopButton
  variant="elevated"
  color="#06C270"
  showShimmer
  onPress={() => {}}
>
  <Typography>Claim Reward</Typography>
</NeoPopButton>`))),e.createElement("p",{style:t.sectionTitle},"Disabled"),e.createElement("div",{style:t.variantRow},e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"opacity: 0.4"),e.createElement(r,{label:"Disabled",faceColor:"#ffffff",textColor:"#000000",disabled:!0})),e.createElement("div",{style:t.variantBlock},e.createElement("span",{style:t.variantLabel},"Usage"),e.createElement("pre",{style:t.code},`<NeoPopButton
  variant="elevated"
  color="#ffffff"
  disabled
  onPress={() => {}}
>
  <Typography>Disabled</Typography>
</NeoPopButton>`))),e.createElement("p",{style:t.sectionTitle},"Big / Full Width"),e.createElement("div",{style:{marginBottom:"2rem"}},e.createElement(r,{label:"Full Width Button",faceColor:"#0066FF",textColor:"#ffffff",fullWidth:!0,fontSize:"0.8rem",padding:"1rem 2rem"})),e.createElement("pre",{style:t.code},`<NeoPopButton
  variant="elevated"
  color="#0066FF"
  fullWidth
  onPress={() => {}}
>
  <Typography>Full Width Button</Typography>
</NeoPopButton>`),e.createElement("p",{style:t.sectionTitle},"Adjacent Left / Right (no gap)"),e.createElement("div",{style:{display:"flex",gap:0,marginBottom:"1.5rem"}},e.createElement("div",{style:{flex:1,background:"#ffffff",color:"#000000",fontFamily:"'Outfit', sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.75rem 0",textAlign:"center",boxShadow:"4px 4px 0 0 rgb(175,175,175)",cursor:"pointer"}},"Cancel"),e.createElement("div",{style:{flex:1,background:"#0066FF",color:"#ffffff",fontFamily:"'Outfit', sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.75rem 0",textAlign:"center",boxShadow:"4px 4px 0 0 rgb(0,60,175)",cursor:"pointer"}},"Confirm")),e.createElement("pre",{style:t.code},`<Row>
  <NeoPopButton variant="elevated" color="#ffffff" adjacentLeft>
    <Typography>Cancel</Typography>
  </NeoPopButton>
  <NeoPopButton variant="elevated" color="#0066FF" adjacentRight>
    <Typography>Confirm</Typography>
  </NeoPopButton>
</Row>`)),I=({variant:l="elevated",disabled:a=!1,fullWidth:o=!1,color:n="#ffffff"})=>l==="stroke"?e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(m,{label:"Playground",borderColor:n,disabled:a})):e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{label:"Playground",faceColor:n,textColor:n==="#ffffff"?"#000000":"#ffffff",disabled:a,fullWidth:o})),V={title:"Components/NeoPopButton",component:I,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{variant:{control:{type:"select"},options:["elevated","flat","stroke"]},size:{control:{type:"select"},options:["big","medium","small"]},disabled:{control:"boolean"},fullWidth:{control:"boolean"},color:{control:"color"}}},s={name:"All Variants",render:()=>e.createElement(A,null)},i={args:{variant:"elevated",disabled:!1,fullWidth:!1,color:"#ffffff"}},f={render:()=>e.createElement("div",{style:{...t.page,display:"flex",gap:"2rem",flexWrap:"wrap",alignItems:"center"}},e.createElement(r,{label:"White",faceColor:"#ffffff",textColor:"#000000"}),e.createElement(r,{label:"Blue",faceColor:"#0066FF",textColor:"#ffffff"}),e.createElement(r,{label:"Success",faceColor:"#06C270",textColor:"#000000"}))},c={render:()=>e.createElement("div",{style:{...t.page,display:"flex",gap:"2rem",flexWrap:"wrap",alignItems:"center"}},e.createElement(r,{label:"Disabled",faceColor:"#ffffff",textColor:"#000000",disabled:!0}),e.createElement(m,{label:"Disabled Stroke",disabled:!0}))};var v,b,E;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(E=(b=s.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};var x,h,B;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    disabled: false,
    fullWidth: false,
    color: '#ffffff'
  }
}`,...(B=(h=i.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var S,k,C;f.parameters={...f.parameters,docs:{...(S=f.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <NeoPopBtn3D label="White" faceColor="#ffffff" textColor="#000000" />
      <NeoPopBtn3D label="Blue" faceColor="#0066FF" textColor="#ffffff" />
      <NeoPopBtn3D label="Success" faceColor="#06C270" textColor="#000000" />
    </div>
}`,...(C=(k=f.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var T,P,w;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <NeoPopBtn3D label="Disabled" faceColor="#ffffff" textColor="#000000" disabled />
      <StrokeBtn3D label="Disabled Stroke" disabled />
    </div>
}`,...(w=(P=c.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};const j=["AllVariantsStory","Playground","Elevated","Disabled"];export{s as AllVariantsStory,c as Disabled,f as Elevated,i as Playground,j as __namedExportsOrder,V as default};
