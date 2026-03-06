import{R as e}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},r=({heading:a,rightElement:m,maxWidth:b=480})=>e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.85rem 1.25rem",background:"#000000",borderBottom:"1px solid rgba(255,255,255,0.07)",maxWidth:b,width:"100%",cursor:"pointer",userSelect:"none"}},e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",flexShrink:0}},e.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none"},e.createElement("path",{d:"M12 4L6 10L12 16",stroke:"#ffffff",strokeWidth:"1.5",strokeLinecap:"square"})),e.createElement("span",{style:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"#ffffff"}},"Back")),a&&e.createElement(e.Fragment,null,e.createElement("div",{style:{width:1,height:16,background:"rgba(255,255,255,0.15)"}}),e.createElement("span",{style:{flex:1,fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.04em",color:"rgba(255,255,255,0.7)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},a)),m&&e.createElement("div",{style:{flexShrink:0,marginLeft:"auto"}},m)),s=({label:a})=>e.createElement("div",{style:{background:"#0066FF",color:"#ffffff",fontFamily:"'Outfit', sans-serif",fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.25rem 0.65rem",boxShadow:"2px 2px 0 0 rgba(0,40,140,0.8)",cursor:"pointer"}},a),v=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopBack"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Back navigation row — arrow, label, optional heading and right element"),e.createElement("p",{style:t.sectionTitle},"Default (Arrow Only)"),e.createElement(r,null),e.createElement("pre",{style:t.code},"<NeoPopBack onPress={() => navigation.goBack()} />"),e.createElement("p",{style:t.sectionTitle},"With Heading"),e.createElement(r,{heading:"Payment Details"}),e.createElement("pre",{style:t.code},`<NeoPopBack
  heading="Payment Details"
  onPress={() => navigation.goBack()}
/>`),e.createElement("p",{style:t.sectionTitle},"With Right Element"),e.createElement(r,{rightElement:e.createElement(s,{label:"Skip"})}),e.createElement("pre",{style:t.code},`<NeoPopBack
  rightElement={<SkipButton />}
  onPress={() => navigation.goBack()}
/>`),e.createElement("p",{style:t.sectionTitle},"Full Composition"),e.createElement(r,{heading:"CRED Rewards",rightElement:e.createElement(s,{label:"Info"})}),e.createElement("p",{style:t.sectionTitle},"In Page Context"),e.createElement("div",{style:{maxWidth:480,background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)"}},e.createElement(r,{heading:"Bill Payments",rightElement:e.createElement(s,{label:"History"}),maxWidth:"100%"}),e.createElement("div",{style:{padding:"1.5rem"}},e.createElement("div",{style:{fontSize:"1.25rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.5rem"}},"Select a Bill"),e.createElement("div",{style:{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6}},"Choose from your linked utility accounts.")))),T={title:"Components/NeoPopBack",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},n={name:"All Variants",render:()=>e.createElement(v,null)},l={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,null))},i={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{heading:"Payment Details"}))},o={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{heading:"Settings",rightElement:e.createElement(s,{label:"Help"})}))};var c,d,p;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,f,y;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <BackRow />
    </div>
}`,...(y=(f=l.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var h,u,E;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <BackRow heading="Payment Details" />
    </div>
}`,...(E=(u=i.parameters)==null?void 0:u.docs)==null?void 0:E.source}}};var S,x,k;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <BackRow heading="Settings" rightElement={<ChipBtn label="Help" />} />
    </div>
}`,...(k=(x=o.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};const w=["AllVariantsStory","Default","WithHeading","WithRightElement"];export{n as AllVariantsStory,l as Default,i as WithHeading,o as WithRightElement,w as __namedExportsOrder,T as default};
