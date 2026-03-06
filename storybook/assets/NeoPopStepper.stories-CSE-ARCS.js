import{R as e,r as j}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},r=({value:s=1,min:i=Number.NEGATIVE_INFINITY,max:l=Number.POSITIVE_INFINITY,step:n=1,onChange:m,label:f})=>{const[o,y]=j.useState(s),w=()=>{if(o-n>=i){const a=o-n;y(a),m==null||m(a)}},D=()=>{if(o+n<=l){const a=o+n;y(a),m==null||m(a)}},S=o-n<i,x=o+n>l,b=a=>({width:40,height:40,background:a?"rgba(255,255,255,0.05)":"#ffffff",color:a?"rgba(255,255,255,0.2)":"#000000",border:"none",fontFamily:"'Outfit', sans-serif",fontSize:"1.2rem",fontWeight:700,cursor:a?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:a?"none":"3px 3px 0 0 rgba(175,175,175,0.8)",userSelect:"none",transition:"background 0.1s ease"});return e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"}},f&&e.createElement("span",{style:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)"}},f),e.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:0}},e.createElement("button",{style:b(S),onClick:w,disabled:S},"−"),e.createElement("div",{style:{width:64,height:40,background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit', sans-serif",fontSize:"1rem",fontWeight:700,color:"#ffffff",letterSpacing:"0.04em",fontVariantNumeric:"tabular-nums",userSelect:"none"}},o),e.createElement("button",{style:b(x),onClick:D,disabled:x},"+")))},M=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopStepper"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Increment/decrement control with +/– buttons"),e.createElement("p",{style:t.sectionTitle},"Default (value: 1)"),e.createElement(r,{value:1,label:"Quantity"}),e.createElement("pre",{style:t.code},`<NeoPopStepper
  value={1}
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"With Bounds (min: 0, max: 10)"),e.createElement(r,{value:5,min:0,max:10,label:"Rating (0–10)"}),e.createElement("pre",{style:t.code},`<NeoPopStepper
  value={5}
  min={0}
  max={10}
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"At Minimum Bound"),e.createElement(r,{value:0,min:0,max:10,label:"At Min (0)"}),e.createElement("p",{style:t.sectionTitle},"At Maximum Bound"),e.createElement(r,{value:10,min:0,max:10,label:"At Max (10)"}),e.createElement("p",{style:t.sectionTitle},"Large Value"),e.createElement(r,{value:1e3,step:100,label:"Amount (step 100)"}),e.createElement("pre",{style:t.code},`<NeoPopStepper
  value={1000}
  step={100}
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"Custom Step"),e.createElement(r,{value:5,min:0,max:50,step:5,label:"Step 5"}),e.createElement("p",{style:t.sectionTitle},"In Context — Cart Item"),e.createElement(R,null)),R=()=>{const[s,i]=j.useState(2),l=299;return e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.25rem",maxWidth:340,display:"flex",alignItems:"center",gap:"1rem"}},e.createElement("div",{style:{flex:1}},e.createElement("div",{style:{fontSize:"0.9rem",fontWeight:700,marginBottom:"0.25rem"}},"CRED Store Item"),e.createElement("div",{style:{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}},"₹",l," each")),e.createElement(r,{value:s,min:0,max:9,onChange:i}),e.createElement("div",{style:{fontSize:"0.9rem",fontWeight:800,color:"#0066FF",minWidth:60,textAlign:"right",fontVariantNumeric:"tabular-nums"}},"₹",s*l))},O=({value:s=1,min:i=0,max:l=10,step:n=1})=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:s,min:i,max:l,step:n,label:"Stepper"})),_={title:"Components/NeoPopStepper",component:O,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{value:{control:"number"},min:{control:"number"},max:{control:"number"},step:{control:"number"}}},c={name:"All Variants",render:()=>e.createElement(M,null)},p={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:1,label:"Quantity"}))},u={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:5,min:0,max:10,label:"Rating (0–10)"}))},d={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:1500,step:100,label:"Amount (step 100)"}))},g={args:{value:1,min:0,max:10,step:1}};var v,E,h;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(h=(E=c.parameters)==null?void 0:E.docs)==null?void 0:h.source}}};var I,T,V;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Stepper value={1} label="Quantity" />
    </div>
}`,...(V=(T=p.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var N,A,C;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Stepper value={5} min={0} max={10} label="Rating (0–10)" />
    </div>
}`,...(C=(A=u.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var W,k,z;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Stepper value={1500} step={100} label="Amount (step 100)" />
    </div>
}`,...(z=(k=d.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var B,F,P;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    value: 1,
    min: 0,
    max: 10,
    step: 1
  }
}`,...(P=(F=g.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};const L=["AllVariantsStory","Default","WithBounds","LargeValue","Playground"];export{c as AllVariantsStory,p as Default,d as LargeValue,g as Playground,u as WithBounds,L as __namedExportsOrder,_ as default};
