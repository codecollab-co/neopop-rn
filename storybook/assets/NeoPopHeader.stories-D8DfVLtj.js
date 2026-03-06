import{R as e}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},r=({title:c,description:m,showBack:C=!1,rightElement:d,maxWidth:P=480})=>e.createElement("div",{style:{background:"#000000",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",display:"flex",alignItems:"center",gap:"0.75rem",maxWidth:P,width:"100%"}},C&&e.createElement("button",{style:{background:"transparent",border:"none",color:"#ffffff",cursor:"pointer",padding:"0.25rem",display:"flex",alignItems:"center",gap:"0.4rem",flexShrink:0}},e.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none"},e.createElement("path",{d:"M12 4L6 10L12 16",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"square"}))),e.createElement("div",{style:{flex:1,minWidth:0}},e.createElement("div",{style:{fontSize:"1rem",fontWeight:800,letterSpacing:"0.04em",textTransform:"uppercase",color:"#ffffff",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},c),m&&e.createElement("div",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginTop:"0.2rem"}},m)),d&&e.createElement("div",{style:{flexShrink:0}},d)),a=({label:c})=>e.createElement("div",{style:{background:"#0066FF",color:"#ffffff",fontFamily:"'Outfit', sans-serif",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.3rem 0.75rem",boxShadow:"2px 2px 0 0 rgba(0,40,140,0.8)",cursor:"pointer"}},c),W=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopHeader"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Page header row — title, back button, description, right element"),e.createElement("p",{style:t.sectionTitle},"Default (Title Only)"),e.createElement(r,{title:"My Account"}),e.createElement("pre",{style:t.code},'<NeoPopHeader title="My Account" />'),e.createElement("p",{style:t.sectionTitle},"With Back Button"),e.createElement(r,{title:"Payment Details",showBack:!0}),e.createElement("pre",{style:t.code},`<NeoPopHeader
  title="Payment Details"
  showBackButton
  onBackPress={() => navigation.goBack()}
/>`),e.createElement("p",{style:t.sectionTitle},"With Description"),e.createElement(r,{title:"CRED Rewards",description:"Earn coins on every payment",showBack:!0}),e.createElement("pre",{style:t.code},`<NeoPopHeader
  title="CRED Rewards"
  description="Earn coins on every payment"
  showBackButton
/>`),e.createElement("p",{style:t.sectionTitle},"With Right Element"),e.createElement(r,{title:"Transactions",showBack:!0,rightElement:e.createElement(a,{label:"Filter"})}),e.createElement("pre",{style:t.code},`<NeoPopHeader
  title="Transactions"
  showBackButton
  rightElement={
    <NeoPopChip label="Filter" onPress={openFilter} />
  }
/>`),e.createElement("p",{style:t.sectionTitle},"Full Composition"),e.createElement(r,{title:"CRED Pay",description:"Unified payments dashboard",showBack:!0,rightElement:e.createElement("div",{style:{display:"flex",gap:"0.5rem"}},e.createElement(a,{label:"Help"}),e.createElement(a,{label:"Settings"}))}),e.createElement("p",{style:t.sectionTitle},"In Page Context"),e.createElement("div",{style:{maxWidth:480,background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)"}},e.createElement(r,{title:"Bill Payments",showBack:!0,rightElement:e.createElement(a,{label:"History"}),maxWidth:"100%"}),e.createElement("div",{style:{padding:"1.5rem"}},e.createElement("div",{style:{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6}},"Page body content appears here below the header.")))),D={title:"Components/NeoPopHeader",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},n={name:"All Variants",render:()=>e.createElement(W,null)},o={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{title:"My Account"}))},i={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{title:"Payment Details",showBack:!0}))},l={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{title:"CRED Rewards",description:"Earn coins on every payment",showBack:!0}))},s={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{title:"Transactions",showBack:!0,rightElement:e.createElement(a,{label:"Filter"})}))};var p,g,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var y,u,h;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Header title="My Account" />
    </div>
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var E,x,b;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Header title="Payment Details" showBack />
    </div>
}`,...(b=(x=i.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var S,v,k;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Header title="CRED Rewards" description="Earn coins on every payment" showBack />
    </div>
}`,...(k=(v=l.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var B,w,T;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Header title="Transactions" showBack rightElement={<ChipButton label="Filter" />} />
    </div>
}`,...(T=(w=s.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const R=["AllVariantsStory","Default","WithBack","WithDescription","WithRightElement"];export{n as AllVariantsStory,o as Default,i as WithBack,l as WithDescription,s as WithRightElement,R as __namedExportsOrder,D as default};
