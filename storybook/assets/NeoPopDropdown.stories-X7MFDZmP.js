import{R as e,r as u}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},r=({label:m,placeholder:N="Select an option",options:g=["Option 1","Option 2","Option 3","Option 4"],disabled:l=!1,defaultOpen:B=!1,defaultValue:I=""})=>{const[o,f]=u.useState(B),[n,P]=u.useState(I),W=a=>{P(a),f(!1)};return e.createElement("div",{style:{position:"relative",width:"100%",maxWidth:360}},m&&e.createElement("label",{style:{display:"block",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",marginBottom:"0.5rem"}},m),e.createElement("div",{style:{background:"#0a0a0a",border:`1px solid ${o?"#0066FF":"rgba(255,255,255,0.15)"}`,borderBottom:`2px solid ${o?"#0066FF":"rgba(255,255,255,0.15)"}`,padding:"0.85rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:l?"not-allowed":"pointer",opacity:l?.4:1,userSelect:"none",transition:"border-color 0.15s ease"},onClick:()=>!l&&f(a=>!a)},e.createElement("span",{style:{fontSize:"0.9rem",color:n?"#ffffff":"rgba(255,255,255,0.3)",letterSpacing:"0.02em",fontFamily:"'Outfit', sans-serif"}},n||N),e.createElement("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",style:{transform:o?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.2s ease",flexShrink:0}},e.createElement("path",{d:"M3 5.5L8 10.5L13 5.5",stroke:o?"#0066FF":"rgba(255,255,255,0.5)",strokeWidth:"1.5",strokeLinecap:"square"}))),o&&!l&&e.createElement("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.12)",borderTop:"none",zIndex:100,maxHeight:200,overflowY:"auto"}},g.map((a,j)=>e.createElement("div",{key:a,style:{padding:"0.75rem 1rem",cursor:"pointer",fontFamily:"'Outfit', sans-serif",fontSize:"0.85rem",color:n===a?"#0066FF":"#ffffff",background:n===a?"rgba(0,102,255,0.09)":"transparent",borderBottom:j<g.length-1?"1px solid rgba(255,255,255,0.05)":"none",letterSpacing:"0.02em",transition:"background 0.1s ease"},onClick:()=>W(a)},a))))},z=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopDropdown"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Pressable trigger with animated chevron and options list"),e.createElement("p",{style:t.sectionTitle},"Closed"),e.createElement(r,{label:"Select Category",placeholder:"Choose a category"}),e.createElement("pre",{style:t.code},`<NeoPopDropdown
  label="Select Category"
  placeholder="Choose a category"
  options={categories}
  onSelect={setCategory}
/>`),e.createElement("p",{style:t.sectionTitle,style:{marginTop:"6rem"}},"Open"),e.createElement(r,{label:"Payment Method",placeholder:"Choose payment method",options:["Credit Card","Debit Card","Net Banking","UPI","Wallet"],defaultOpen:!0}),e.createElement("pre",{style:{...t.code,marginTop:"14rem"}},`<NeoPopDropdown
  label="Payment Method"
  options={paymentMethods}
  isOpen={true}
  onSelect={setMethod}
/>`),e.createElement("p",{style:t.sectionTitle},"With Value"),e.createElement(r,{label:"State",placeholder:"Select state",options:["Maharashtra","Karnataka","Tamil Nadu","Delhi","Gujarat"],defaultValue:"Karnataka"}),e.createElement("pre",{style:t.code},`<NeoPopDropdown
  label="State"
  value="Karnataka"
  options={states}
  onSelect={setState}
/>`),e.createElement("p",{style:t.sectionTitle},"Disabled"),e.createElement(r,{label:"Disabled Field",placeholder:"Not available",disabled:!0}),e.createElement("pre",{style:t.code},`<NeoPopDropdown
  label="Disabled Field"
  disabled
  placeholder="Not available"
/>`)),M={title:"Components/NeoPopDropdown",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},s={name:"All Variants",render:()=>e.createElement(z,null)},i={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{label:"Select Option",placeholder:"Choose..."}))},p={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{label:"Select Option",defaultOpen:!0,options:["Alpha","Beta","Gamma","Delta"]}))},d={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{label:"Category",defaultValue:"Option 2"}))},c={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(r,{label:"Disabled",disabled:!0}))};var y,b,h;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var S,x,E;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Dropdown label="Select Option" placeholder="Choose..." />
    </div>
}`,...(E=(x=i.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var C,v,T;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Dropdown label="Select Option" defaultOpen options={['Alpha', 'Beta', 'Gamma', 'Delta']} />
    </div>
}`,...(T=(v=p.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var D,O,w;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Dropdown label="Category" defaultValue="Option 2" />
    </div>
}`,...(w=(O=d.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};var k,F,V;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <Dropdown label="Disabled" disabled />
    </div>
}`,...(V=(F=c.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};const G=["AllVariantsStory","Closed","Open","WithValue","Disabled"];export{s as AllVariantsStory,i as Closed,c as Disabled,p as Open,d as WithValue,G as __namedExportsOrder,M as default};
