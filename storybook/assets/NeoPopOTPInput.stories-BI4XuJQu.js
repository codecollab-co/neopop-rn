import{R as e,r as x}from"./index-Bc2G9s8g.js";const r={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},a=({length:l=4,masked:E=!1,hasError:i=!1,defaultValues:_=[]})=>{const[s,R]=x.useState(Array.from({length:l},(o,n)=>_[n]??"")),h=x.useRef([]),H=(o,n)=>{var T;const t=n.replace(/\D/g,"").slice(-1),m=[...s];m[o]=t,R(m),t&&o<l-1&&((T=h.current[o+1])==null||T.focus())},K=(o,n)=>{var t;n.key==="Backspace"&&!s[o]&&o>0&&((t=h.current[o-1])==null||t.focus())},S=i?"#EE4D37":"rgba(255,255,255,0.2)",c=i?"#EE4D37":"#0066FF";return e.createElement("div",null,e.createElement("div",{style:{display:"flex",gap:"0.75rem"}},Array.from({length:l}).map((o,n)=>e.createElement("input",{key:n,ref:t=>{h.current[n]=t},type:E?"password":"text",maxLength:1,value:s[n],onChange:t=>H(n,t.target.value),onKeyDown:t=>K(n,t),inputMode:"numeric",style:{width:52,height:58,background:"#0a0a0a",border:`1px solid ${s[n]?c:S}`,borderBottom:`3px solid ${s[n]?c:S}`,color:"#ffffff",fontFamily:"'Outfit', sans-serif",fontSize:"1.4rem",fontWeight:700,textAlign:"center",outline:"none",letterSpacing:0,transition:"border-color 0.15s ease",boxSizing:"border-box"},onFocus:t=>{t.target.style.borderColor=c,t.target.style.borderBottomColor=c},onBlur:t=>{const m=s[n]?c:S;t.target.style.borderColor=m,t.target.style.borderBottomColor=m}}))),i&&e.createElement("p",{style:{fontSize:"0.65rem",color:"#EE4D37",letterSpacing:"0.03em",marginTop:"0.5rem"}},"Invalid OTP. Please try again."))},$=()=>e.createElement("div",{style:r.page},e.createElement("p",{style:r.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopOTPInput"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Multi-box PIN / OTP entry — 4-digit and 6-digit variants"),e.createElement("p",{style:r.sectionTitle},"4-Digit OTP"),e.createElement(a,{length:4}),e.createElement("pre",{style:r.code},`<NeoPopOTPInput
  length={4}
  onComplete={(otp) => verify(otp)}
/>`),e.createElement("p",{style:r.sectionTitle},"6-Digit OTP"),e.createElement(a,{length:6}),e.createElement("pre",{style:r.code},`<NeoPopOTPInput
  length={6}
  onComplete={(otp) => verify(otp)}
/>`),e.createElement("p",{style:r.sectionTitle},"With Pre-filled Values"),e.createElement(a,{length:4,defaultValues:["1","2","3","4"]}),e.createElement(a,{length:6,defaultValues:["7","8","3","4","5","6"]}),e.createElement("p",{style:r.sectionTitle},"With Error"),e.createElement(a,{length:4,defaultValues:["9","9","9","9"],hasError:!0}),e.createElement("pre",{style:r.code},`<NeoPopOTPInput
  length={4}
  hasError={true}
  errorMessage="Invalid OTP. Please try again."
  onComplete={(otp) => verify(otp)}
/>`),e.createElement("p",{style:r.sectionTitle},"Masked (dots)"),e.createElement(a,{length:4,masked:!0,defaultValues:["1","2","3","4"]}),e.createElement("pre",{style:r.code},`<NeoPopOTPInput
  length={4}
  masked
  onComplete={(otp) => verify(otp)}
/>`)),L=({length:l=4,masked:E=!1,hasError:i=!1})=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{length:l,masked:E,hasError:i})),q={title:"Components/NeoPopOTPInput",component:L,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{length:{control:{type:"select"},options:[4,6]},masked:{control:"boolean"},hasError:{control:"boolean"}}},p={name:"All Variants",render:()=>e.createElement($,null)},d={name:"4-Digit",render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{length:4}))},g={name:"6-Digit",render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{length:6}))},u={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{length:4,defaultValues:["9","9","9","9"],hasError:!0}))},f={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{length:4,masked:!0,defaultValues:["1","2","3","4"]}))},y={args:{length:4,masked:!1,hasError:!1}};var P,v,b;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(b=(v=p.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var C,I,O;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: '4-Digit',
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <OTPInput length={4} />
    </div>
}`,...(O=(I=d.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var k,D,V;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: '6-Digit',
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <OTPInput length={6} />
    </div>
}`,...(V=(D=g.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var B,F,j;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <OTPInput length={4} defaultValues={['9', '9', '9', '9']} hasError />
    </div>
}`,...(j=(F=u.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var A,N,W;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <OTPInput length={4} masked defaultValues={['1', '2', '3', '4']} />
    </div>
}`,...(W=(N=f.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var z,w,M;y.parameters={...y.parameters,docs:{...(z=y.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    length: 4,
    masked: false,
    hasError: false
  }
}`,...(M=(w=y.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};const G=["AllVariantsStory","FourDigit","SixDigit","WithError","Masked","Playground"];export{p as AllVariantsStory,d as FourDigit,f as Masked,y as Playground,g as SixDigit,u as WithError,G as __namedExportsOrder,q as default};
