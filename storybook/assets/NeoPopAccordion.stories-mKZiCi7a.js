import{R as e,r as k}from"./index-Bc2G9s8g.js";const n={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},w=({title:r,content:a,isOpen:t=!1,onToggle:o,number:m})=>e.createElement("div",{style:{border:"1px solid rgba(255,255,255,0.08)",borderTop:t?"2px solid #0066FF":"1px solid rgba(255,255,255,0.08)",background:t?"rgba(0,102,255,0.04)":"#0a0a0a",transition:"border-color 0.15s ease, background 0.15s ease",marginBottom:"1px"}},e.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1rem 1.25rem",cursor:"pointer",userSelect:"none",gap:"1rem"},onClick:o},e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"0.85rem"}},m!==void 0&&e.createElement("span",{style:{width:22,height:22,background:t?"#0066FF":"rgba(255,255,255,0.1)",color:t?"#ffffff":"rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",fontWeight:700,flexShrink:0,transition:"background 0.15s ease"}},m),e.createElement("span",{style:{fontSize:"0.85rem",fontWeight:600,letterSpacing:"0.03em",color:t?"#ffffff":"rgba(255,255,255,0.7)",transition:"color 0.15s ease"}},r)),e.createElement("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",style:{transform:t?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.2s ease",flexShrink:0}},e.createElement("path",{d:"M3 5.5L8 10.5L13 5.5",stroke:t?"#0066FF":"rgba(255,255,255,0.4)",strokeWidth:"1.5",strokeLinecap:"square"}))),e.createElement("div",{style:{overflow:"hidden",maxHeight:t?500:0,transition:"max-height 0.3s cubic-bezier(0.4,0,0.2,1)"}},e.createElement("div",{style:{padding:"0 1.25rem 1rem",fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.75,letterSpacing:"0.02em",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"0.75rem"}},a))),d=[{title:"What is NeoPop?",content:"NeoPop is CRED's design language that combines bold typography, 3D depth surfaces, and fluid animations to create a tactile digital experience. It bridges physical and digital interactions through carefully crafted visual metaphors."},{title:"How does the 3D surface work?",content:"The 3D effect is achieved using box-shadow offsets on the main face element. A bottom shadow and right shadow (each 4px, 30% darker than the face color) create the illusion of depth and physical extrusion. On press, the shadows reduce to simulate depression."},{title:"Is it compatible with Expo?",content:"Yes. neopop-rn supports both bare React Native and Expo managed workflow. Skia-based components require @shopify/react-native-skia which needs a bare workflow or EAS Build with native modules support."},{title:"Can I customize the color palette?",content:"Absolutely. The design system exposes a theme provider that accepts custom color tokens. All components reference semantic tokens so swapping the accent color updates the entire UI consistently."}],p=({defaultOpen:r=!1})=>{const[a,t]=k.useState(r);return e.createElement("div",{style:{maxWidth:480}},e.createElement(w,{title:d[0].title,content:d[0].content,isOpen:a,onToggle:()=>t(o=>!o),number:1}))},C=()=>{const[r,a]=k.useState(0);return e.createElement("div",{style:{maxWidth:480}},d.map((t,o)=>e.createElement(w,{key:t.title,title:t.title,content:t.content,isOpen:r===o,onToggle:()=>a(r===o?null:o),number:o+1})))},I=()=>e.createElement("div",{style:n.page},e.createElement("p",{style:n.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopAccordion"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Expand/collapse with smooth height transition"),e.createElement("p",{style:n.sectionTitle},"Collapsed"),e.createElement(p,{defaultOpen:!1}),e.createElement("pre",{style:n.code},`<NeoPopAccordion
  title="What is NeoPop?"
  isExpanded={false}
  onToggle={toggle}
>
  <Typography>Content here</Typography>
</NeoPopAccordion>`),e.createElement("p",{style:n.sectionTitle},"Expanded"),e.createElement(p,{defaultOpen:!0}),e.createElement("pre",{style:n.code},`<NeoPopAccordion
  title="What is NeoPop?"
  isExpanded={true}
  onToggle={toggle}
>
  <Typography>Content here</Typography>
</NeoPopAccordion>`),e.createElement("p",{style:n.sectionTitle},"Multiple (one open at a time)"),e.createElement(C,null),e.createElement("pre",{style:n.code},`<NeoPopAccordionGroup>
  {items.map(item => (
    <NeoPopAccordion
      key={item.id}
      title={item.title}
    >
      <Typography>{item.content}</Typography>
    </NeoPopAccordion>
  ))}
</NeoPopAccordionGroup>`)),P={title:"Components/NeoPopAccordion",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},s={name:"All Variants",render:()=>e.createElement(I,null)},i={render:()=>e.createElement("div",{style:{...n.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(p,{defaultOpen:!1}))},l={render:()=>e.createElement("div",{style:{...n.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(p,{defaultOpen:!0}))},c={render:()=>e.createElement("div",{style:{...n.page,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"5rem"}},e.createElement(C,null))};var g,f,u;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(u=(f=s.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var h,y,x;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <SingleAccordion defaultOpen={false} />
    </div>
}`,...(x=(y=i.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var E,b,S;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <SingleAccordion defaultOpen={true} />
    </div>
}`,...(S=(b=l.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var T,v,A;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5rem'
  }}>
      <MultipleAccordion />
    </div>
}`,...(A=(v=c.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const W=["AllVariantsStory","Collapsed","Expanded","Multiple"];export{s as AllVariantsStory,i as Collapsed,l as Expanded,c as Multiple,W as __namedExportsOrder,P as default};
