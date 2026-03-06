import{R as e,r as V}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:380,marginTop:"1rem"}},r=({isChecked:s=!1,disabled:l=!1,label:n,onChange:c})=>{const[a,g]=V.useState(s),o=()=>{if(l)return;const h=!a;g(h),c==null||c(h)};return e.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.75rem",cursor:l?"not-allowed":"pointer",opacity:l?.4:1,userSelect:"none"},onClick:o},e.createElement("div",{style:{position:"relative",width:22,height:22,flexShrink:0}},e.createElement("div",{style:{width:22,height:22,background:a?"#0066FF":"transparent",border:`2px solid ${a?"#0066FF":"rgba(255,255,255,0.4)"}`,boxShadow:`3px 3px 0 0 ${a?"rgba(0,60,175,0.9)":"rgba(255,255,255,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.15s ease, border-color 0.15s ease"}},a&&e.createElement("svg",{width:"12",height:"9",viewBox:"0 0 12 9",fill:"none"},e.createElement("path",{d:"M1 4L4.5 7.5L11 1",stroke:"#ffffff",strokeWidth:"2",strokeLinecap:"square",strokeLinejoin:"miter"})))),n&&e.createElement("span",{style:{fontFamily:"'Outfit', sans-serif",fontSize:"0.85rem",fontWeight:500,color:"#ffffff",letterSpacing:"0.02em"}},n))},j=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopCheckbox"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"3D checkbox — consistent depth language with button and card"),e.createElement("p",{style:t.sectionTitle},"Unchecked"),e.createElement(r,{isChecked:!1}),e.createElement("pre",{style:t.code},`<NeoPopCheckbox
  isChecked={false}
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"Checked"),e.createElement(r,{isChecked:!0}),e.createElement("pre",{style:t.code},`<NeoPopCheckbox
  isChecked={true}
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"With Label"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},e.createElement(r,{isChecked:!1,label:"I agree to the terms and conditions"}),e.createElement(r,{isChecked:!0,label:"Subscribe to newsletter"}),e.createElement(r,{isChecked:!1,label:"Enable notifications"})),e.createElement("pre",{style:t.code},`<NeoPopCheckbox
  isChecked={false}
  label="I agree to terms and conditions"
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"Disabled"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},e.createElement(r,{isChecked:!1,disabled:!0,label:"Disabled unchecked"}),e.createElement(r,{isChecked:!0,disabled:!0,label:"Disabled checked"})),e.createElement("pre",{style:t.code},`<NeoPopCheckbox
  isChecked={false}
  disabled
  label="Disabled"
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"Interactive Group"),e.createElement(F,null)),F=()=>{const[s,l]=V.useState(new Set(["option1"])),n=a=>{l(g=>{const o=new Set(g);return o.has(a)?o.delete(a):o.add(a),o})},c=[{key:"option1",label:"Dark mode interface"},{key:"option2",label:"Haptic feedback on press"},{key:"option3",label:"Auto-save progress"},{key:"option4",label:"Analytics and crash reports"}];return e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},c.map(a=>e.createElement(r,{key:a.key,isChecked:s.has(a.key),label:a.label,onChange:()=>n(a.key)})))},O=({isChecked:s=!1,disabled:l=!1,label:n="Checkbox label"})=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{isChecked:s,disabled:l,label:n})),N={title:"Components/NeoPopCheckbox",component:O,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{isChecked:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"}}},i={name:"All Variants",render:()=>e.createElement(j,null)},d={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}},e.createElement(r,{isChecked:!1,label:"Unchecked option"}))},m={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}},e.createElement(r,{isChecked:!0,label:"Checked option"}))},p={render:()=>e.createElement("div",{style:{...t.page,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",gap:"1.25rem",padding:"3rem"}},e.createElement(r,{isChecked:!1,label:"Option A"}),e.createElement(r,{isChecked:!0,label:"Option B"}),e.createElement(r,{isChecked:!1,label:"Option C"}))},f={args:{isChecked:!1,disabled:!1,label:"Checkbox label"}};var b,u,k;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(k=(u=i.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};var y,C,x;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem'
  }}>
      <Checkbox isChecked={false} label="Unchecked option" />
    </div>
}`,...(x=(C=d.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var E,v,S;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem'
  }}>
      <Checkbox isChecked={true} label="Checked option" />
    </div>
}`,...(S=(v=m.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var T,w,I;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '1.25rem',
    padding: '3rem'
  }}>
      <Checkbox isChecked={false} label="Option A" />
      <Checkbox isChecked={true} label="Option B" />
      <Checkbox isChecked={false} label="Option C" />
    </div>
}`,...(I=(w=p.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var D,A,P;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    isChecked: false,
    disabled: false,
    label: 'Checkbox label'
  }
}`,...(P=(A=f.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};const B=["AllVariantsStory","Unchecked","Checked","WithLabel","Playground"];export{i as AllVariantsStory,m as Checked,f as Playground,d as Unchecked,p as WithLabel,B as __namedExportsOrder,N as default};
