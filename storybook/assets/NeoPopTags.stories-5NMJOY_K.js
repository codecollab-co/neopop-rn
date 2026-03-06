import{R as e}from"./index-Bc2G9s8g.js";const r={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},F={success:{bg:"rgba(6,194,112,0.1)",border:"rgba(6,194,112,0.35)",text:"#06C270",dot:"#06C270"},error:{bg:"rgba(238,77,55,0.1)",border:"rgba(238,77,55,0.35)",text:"#EE4D37",dot:"#EE4D37"},warning:{bg:"rgba(245,166,35,0.1)",border:"rgba(245,166,35,0.35)",text:"#F5A623",dot:"#F5A623"},info:{bg:"rgba(33,150,243,0.1)",border:"rgba(33,150,243,0.35)",text:"#2196F3",dot:"#2196F3"},custom:{bg:"rgba(124,92,252,0.1)",border:"rgba(124,92,252,0.35)",text:"#7C5CFC",dot:"#7C5CFC"}},k={success:"✓",error:"✕",warning:"!",info:"i",custom:"★"},a=({type:t="info",label:n="Label",showIcon:o=!1})=>{const l=F[t];return e.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.4rem",background:l.bg,border:`1px solid ${l.border}`,padding:"0.25rem 0.65rem",fontFamily:"'Outfit', sans-serif",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:l.text,whiteSpace:"nowrap"}},o&&e.createElement("span",{style:{width:14,height:14,borderRadius:"50%",background:l.dot,color:"#000",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"0.5rem",fontWeight:900,flexShrink:0}},k[t]),n)},P=({type:t="info",label:n="Label"})=>{const o=F[t];return e.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.45rem",fontFamily:"'Outfit', sans-serif",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:o.text,background:o.bg,border:`1px solid ${o.border}`,padding:"0.25rem 0.65rem"}},e.createElement("span",{style:{width:6,height:6,borderRadius:"50%",background:o.dot,flexShrink:0}}),n)},s=["success","error","warning","info","custom"],d={success:"Payment Successful",error:"Transaction Failed",warning:"Action Required",info:"Processing",custom:"Premium"},L=()=>e.createElement("div",{style:r.page},e.createElement("p",{style:r.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopTags"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Semantic pill badges — success, error, warning, info, custom"),e.createElement("p",{style:r.sectionTitle},"All Types — Without Icon"),e.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem",marginBottom:"1.5rem"}},s.map(t=>e.createElement(a,{key:t,type:t,label:d[t]}))),e.createElement("pre",{style:r.code},`<NeoPopTag
  type="success"
  label="Payment Successful"
/>`),e.createElement("p",{style:r.sectionTitle},"All Types — With Icon"),e.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem",marginBottom:"1.5rem"}},s.map(t=>e.createElement(a,{key:t,type:t,label:d[t],showIcon:!0}))),e.createElement("pre",{style:r.code},`<NeoPopTag
  type="error"
  label="Transaction Failed"
  showIcon
/>`),e.createElement("p",{style:r.sectionTitle},"With Status Dot"),e.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem",marginBottom:"1.5rem"}},s.map(t=>e.createElement(P,{key:t,type:t,label:d[t]}))),e.createElement("p",{style:r.sectionTitle},"In Context"),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.5rem",maxWidth:380}},e.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"}},e.createElement("div",null,e.createElement("div",{style:{fontSize:"1rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.25rem"}},"HDFC Bank"),e.createElement("div",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.05em"}},"Savings Account")),e.createElement(a,{type:"success",label:"Active",showIcon:!0})),e.createElement("div",{style:{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"1rem",display:"flex",gap:"0.5rem",flexWrap:"wrap"}},e.createElement(a,{type:"info",label:"KYC Verified"}),e.createElement(a,{type:"warning",label:"Limit Warning"})))),B=({type:t="info",label:n="Tag Label"})=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",flexWrap:"wrap"}},e.createElement(a,{type:t,label:n}),e.createElement(a,{type:t,label:n,showIcon:!0}),e.createElement(P,{type:t,label:n})),j={title:"Components/NeoPopTags",component:B,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{type:{control:{type:"select"},options:s},label:{control:"text"}}},c={name:"All Variants",render:()=>e.createElement(L,null)},i={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem"}},e.createElement(a,{type:"success",label:"Payment Successful"}),e.createElement(a,{type:"success",label:"Payment Successful",showIcon:!0}))},m={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem"}},e.createElement(a,{type:"error",label:"Transaction Failed"}),e.createElement(a,{type:"error",label:"Transaction Failed",showIcon:!0}))},p={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"0.75rem",flexWrap:"wrap"}},s.map(t=>e.createElement(a,{key:t,type:t,label:d[t],showIcon:!0})))},g={args:{type:"info",label:"Tag Label"}};var y,f,u;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(u=(f=c.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var b,E,S;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem'
  }}>
      <Tag type="success" label="Payment Successful" />
      <Tag type="success" label="Payment Successful" showIcon />
    </div>
}`,...(S=(E=i.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var x,T,h;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem'
  }}>
      <Tag type="error" label="Transaction Failed" />
      <Tag type="error" label="Transaction Failed" showIcon />
    </div>
}`,...(h=(T=m.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var w,v,C;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>
      {ALL_TYPES.map(t => <Tag key={t} type={t} label={TAG_LABELS[t]} showIcon />)}
    </div>
}`,...(C=(v=p.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var I,A,W;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    type: 'info',
    label: 'Tag Label'
  }
}`,...(W=(A=g.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};const _=["AllVariantsStory","Success","Error","AllTypes","Playground"];export{p as AllTypes,c as AllVariantsStory,m as Error,g as Playground,i as Success,_ as __namedExportsOrder,j as default};
