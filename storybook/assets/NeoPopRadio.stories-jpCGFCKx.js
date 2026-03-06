import{R as e,r as D}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:380,marginTop:"1rem"}},r=({isChecked:a=!1,label:o,disabled:n=!1,onSelect:l})=>e.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.75rem",cursor:n?"not-allowed":"pointer",opacity:n?.4:1,userSelect:"none"},onClick:()=>!n&&(l==null?void 0:l())},e.createElement("div",{style:{width:22,height:22,borderRadius:"50%",border:`2px solid ${a?"#0066FF":"rgba(255,255,255,0.4)"}`,boxShadow:a?"0 0 0 1px rgba(0,102,255,0.4)":"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"border-color 0.15s ease",background:"transparent"}},a&&e.createElement("div",{style:{width:10,height:10,borderRadius:"50%",background:"#0066FF",transition:"transform 0.15s ease"}})),o&&e.createElement("span",{style:{fontFamily:"'Outfit', sans-serif",fontSize:"0.85rem",fontWeight:500,color:"#ffffff",letterSpacing:"0.02em"}},o)),R=({options:a,defaultIndex:o=0})=>{const[n,l]=D.useState(o);return e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},a.map((m,p)=>e.createElement(r,{key:m,isChecked:n===p,label:m,onSelect:()=>l(p)})))},O=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopRadio"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Circular ring with inner dot — single-select control"),e.createElement("p",{style:t.sectionTitle},"Unchecked"),e.createElement(r,{isChecked:!1}),e.createElement("pre",{style:t.code},`<NeoPopRadio
  isChecked={false}
  onSelect={() => {}}
/>`),e.createElement("p",{style:t.sectionTitle},"Checked"),e.createElement(r,{isChecked:!0}),e.createElement("pre",{style:t.code},`<NeoPopRadio
  isChecked={true}
  onSelect={() => {}}
/>`),e.createElement("p",{style:t.sectionTitle},"With Label"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},e.createElement(r,{isChecked:!0,label:"Option selected"}),e.createElement(r,{isChecked:!1,label:"Option unselected"})),e.createElement("pre",{style:t.code},`<NeoPopRadio
  isChecked={false}
  label="Option A"
  onSelect={() => setSelected('A')}
/>`),e.createElement("p",{style:t.sectionTitle},"Group (interactive)"),e.createElement(R,{options:["Standard Delivery (3-5 days)","Express Delivery (1-2 days)","Same-Day Delivery"],defaultIndex:0}),e.createElement("pre",{style:t.code},`<NeoPopRadioGroup
  options={deliveryOptions}
  value={selected}
  onChange={setSelected}
/>`),e.createElement("p",{style:t.sectionTitle},"Disabled"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},e.createElement(r,{isChecked:!1,disabled:!0,label:"Disabled unchecked"}),e.createElement(r,{isChecked:!0,disabled:!0,label:"Disabled checked"}))),I={title:"Components/NeoPopRadio",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},i={name:"All Variants",render:()=>e.createElement(O,null)},s={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{isChecked:!1,label:"Unchecked radio"}))},c={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{isChecked:!0,label:"Checked radio"}))},d={render:()=>e.createElement("div",{style:{...t.page,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"3rem"}},e.createElement(R,{options:["Option Alpha","Option Beta","Option Gamma"],defaultIndex:1}))};var f,u,g;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(g=(u=i.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var y,h,E;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Radio isChecked={false} label="Unchecked radio" />
    </div>
}`,...(E=(h=s.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var x,k,b;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Radio isChecked={true} label="Checked radio" />
    </div>
}`,...(b=(k=c.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var S,C,v;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem'
  }}>
      <RadioGroup options={['Option Alpha', 'Option Beta', 'Option Gamma']} defaultIndex={1} />
    </div>
}`,...(v=(C=d.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};const A=["AllVariantsStory","Unchecked","Checked","Group"];export{i as AllVariantsStory,c as Checked,d as Group,s as Unchecked,A as __namedExportsOrder,I as default};
