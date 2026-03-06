import{R as e,r as v}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:420,marginTop:"1rem"}},r=({placeholder:n="Enter value...",error:l,showCharacterCount:h=!1,maxLength:a=100,multiline:y=!1,defaultValue:X="",label:E})=>{const[o,b]=v.useState(X),[C,s]=v.useState(!1),x=l?"#EE4D37":C?"#0066FF":"rgba(255,255,255,0.15)",S={width:"100%",background:"#0a0a0a",border:`1px solid ${x}`,borderBottom:`2px solid ${x}`,color:"#ffffff",fontFamily:"'Outfit', sans-serif",fontSize:"0.9rem",fontWeight:400,letterSpacing:"0.02em",padding:"0.85rem 1rem",outline:"none",boxSizing:"border-box",transition:"border-color 0.15s ease",resize:y?"vertical":"none"};return e.createElement("div",{style:{width:"100%",maxWidth:420}},E&&e.createElement("label",{style:{display:"block",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C?"#0066FF":"rgba(255,255,255,0.4)",marginBottom:"0.5rem",transition:"color 0.15s ease"}},E),y?e.createElement("textarea",{value:o,placeholder:n,maxLength:a,rows:4,style:{...S,display:"block"},onChange:f=>b(f.target.value),onFocus:()=>s(!0),onBlur:()=>s(!1)}):e.createElement("input",{type:"text",value:o,placeholder:n,maxLength:a,style:{...S,display:"block"},onChange:f=>b(f.target.value),onFocus:()=>s(!0),onBlur:()=>s(!1)}),e.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"0.4rem"}},l?e.createElement("span",{style:{fontSize:"0.65rem",color:"#EE4D37",letterSpacing:"0.03em"}},l):e.createElement("span",null),h&&e.createElement("span",{style:{fontSize:"0.6rem",color:o.length>=a?"#EE4D37":"rgba(255,255,255,0.3)",letterSpacing:"0.05em",fontVariantNumeric:"tabular-nums"}},o.length,"/",a)))},q=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopInputField"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Text input with animated border — focus/error/char-count states"),e.createElement("p",{style:t.sectionTitle},"Default"),e.createElement(r,{placeholder:"Enter your name",label:"Full Name"}),e.createElement("pre",{style:t.code},`<NeoPopInputField
  placeholder="Enter your name"
  label="Full Name"
  onChangeText={setText}
/>`),e.createElement("p",{style:t.sectionTitle},"With Value"),e.createElement(r,{placeholder:"Enter amount",label:"Amount",defaultValue:"₹10,000"}),e.createElement("pre",{style:t.code},`<NeoPopInputField
  placeholder="Enter amount"
  label="Amount"
  value={amount}
  onChangeText={setAmount}
/>`),e.createElement("p",{style:t.sectionTitle},"With Error"),e.createElement(r,{placeholder:"Enter email",label:"Email Address",defaultValue:"invalid-email",error:"Please enter a valid email address"}),e.createElement("pre",{style:t.code},`<NeoPopInputField
  placeholder="Enter email"
  label="Email"
  value={email}
  error="Please enter a valid email"
  onChangeText={setEmail}
/>`),e.createElement("p",{style:t.sectionTitle},"With Character Count"),e.createElement(r,{placeholder:"Write your message...",label:"Message",showCharacterCount:!0,maxLength:80,defaultValue:"Hello, world!"}),e.createElement("pre",{style:t.code},`<NeoPopInputField
  placeholder="Write your message"
  label="Message"
  showCharacterCount
  maxLength={80}
  value={msg}
  onChangeText={setMsg}
/>`),e.createElement("p",{style:t.sectionTitle},"Multiline"),e.createElement(r,{placeholder:"Enter description...",label:"Description",multiline:!0,maxLength:300,showCharacterCount:!0}),e.createElement("pre",{style:t.code},`<NeoPopInputField
  placeholder="Enter description"
  label="Description"
  multiline
  numberOfLines={4}
  maxLength={300}
  showCharacterCount
  value={desc}
  onChangeText={setDesc}
/>`)),G=({placeholder:n="Enter value...",error:l="",showCharacterCount:h=!1,maxLength:a=100})=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{placeholder:n,error:l||void 0,showCharacterCount:h,maxLength:a,label:"Field Label"})),K={title:"Components/NeoPopInputField",component:G,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{placeholder:{control:"text"},error:{control:"text"},showCharacterCount:{control:"boolean"},maxLength:{control:"number"}}},i={name:"All Variants",render:()=>e.createElement(q,null)},c={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{placeholder:"Enter your name",label:"Full Name"}))},m={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{placeholder:"Enter amount",label:"Amount",defaultValue:"₹10,000"}))},d={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{placeholder:"Enter email",label:"Email",defaultValue:"bad@",error:"Please enter a valid email address"}))},u={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{placeholder:"Write here...",label:"Message",showCharacterCount:!0,maxLength:60,defaultValue:"Start typing..."}))},p={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{placeholder:"Enter description...",label:"Description",multiline:!0,showCharacterCount:!0,maxLength:200}))},g={args:{placeholder:"Enter value...",error:"",showCharacterCount:!1,maxLength:100}};var F,I,T;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(T=(I=i.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var w,V,W;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <InputField placeholder="Enter your name" label="Full Name" />
    </div>
}`,...(W=(V=c.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var P,N,j;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <InputField placeholder="Enter amount" label="Amount" defaultValue="₹10,000" />
    </div>
}`,...(j=(N=m.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var A,D,z;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <InputField placeholder="Enter email" label="Email" defaultValue="bad@" error="Please enter a valid email address" />
    </div>
}`,...(z=(D=d.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var L,k,B;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <InputField placeholder="Write here..." label="Message" showCharacterCount maxLength={60} defaultValue="Start typing..." />
    </div>
}`,...(B=(k=u.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var M,O,H;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <InputField placeholder="Enter description..." label="Description" multiline showCharacterCount maxLength={200} />
    </div>
}`,...(H=(O=p.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var R,_,$;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter value...',
    error: '',
    showCharacterCount: false,
    maxLength: 100
  }
}`,...($=(_=g.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};const Q=["AllVariantsStory","Default","WithValue","WithError","WithCharCount","Multiline","Playground"];export{i as AllVariantsStory,c as Default,p as Multiline,g as Playground,u as WithCharCount,d as WithError,m as WithValue,Q as __namedExportsOrder,K as default};
