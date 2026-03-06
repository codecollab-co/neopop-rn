import{R as e,r as O}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:380,marginTop:"1rem"}},a=({value:n=!1,label:s,disabled:r=!1,onChange:o})=>{const[l,d]=O.useState(n),F=()=>{if(r)return;const f=!l;d(f),o==null||o(f)};return e.createElement(e.Fragment,null,e.createElement("style",null,`
        .neo-toggle-thumb {
          transition: transform 0.22s cubic-bezier(0.4,0,0.2,1), background 0.22s ease;
        }
        .neo-toggle-track {
          transition: background 0.22s ease;
        }
      `),e.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:"0.85rem",cursor:r?"not-allowed":"pointer",opacity:r?.4:1,userSelect:"none"},onClick:F},e.createElement("div",{className:"neo-toggle-track",style:{width:48,height:26,background:l?"#0066FF":"rgba(255,255,255,0.15)",border:`1px solid ${l?"#0066FF":"rgba(255,255,255,0.2)"}`,borderRadius:0,position:"relative",flexShrink:0}},e.createElement("div",{className:"neo-toggle-thumb",style:{position:"absolute",top:3,left:l?24:3,width:18,height:18,background:"#ffffff",boxShadow:"1px 1px 0 0 rgba(0,0,0,0.3)"}})),s&&e.createElement("span",{style:{fontFamily:"'Outfit', sans-serif",fontSize:"0.85rem",fontWeight:500,color:"#ffffff",letterSpacing:"0.02em"}},s)))},N=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopToggle"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Pill track with square thumb — smooth CSS transition"),e.createElement("p",{style:t.sectionTitle},"Off State"),e.createElement(a,{value:!1}),e.createElement("p",{style:{fontSize:"0.65rem",color:"rgba(255,255,255,0.3)",marginTop:"0.5rem",letterSpacing:"0.05em"}},"Gray track, thumb positioned left"),e.createElement("pre",{style:t.code},`<NeoPopToggle
  value={false}
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"On State"),e.createElement(a,{value:!0}),e.createElement("p",{style:{fontSize:"0.65rem",color:"rgba(255,255,255,0.3)",marginTop:"0.5rem",letterSpacing:"0.05em"}},"Blue track, thumb positioned right"),e.createElement("pre",{style:t.code},`<NeoPopToggle
  value={true}
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"With Label"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem"}},e.createElement(a,{value:!1,label:"Dark mode"}),e.createElement(a,{value:!0,label:"Push notifications"}),e.createElement(a,{value:!1,label:"Auto-save"}),e.createElement(a,{value:!0,label:"Analytics sharing"})),e.createElement("pre",{style:t.code},`<NeoPopToggle
  value={isDarkMode}
  label="Dark mode"
  onValueChange={setDarkMode}
/>`),e.createElement("p",{style:t.sectionTitle},"Disabled"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},e.createElement(a,{value:!1,disabled:!0,label:"Disabled off"}),e.createElement(a,{value:!0,disabled:!0,label:"Disabled on"})),e.createElement("pre",{style:t.code},`<NeoPopToggle
  value={false}
  disabled
  label="Disabled"
  onValueChange={(v) => console.log(v)}
/>`),e.createElement("p",{style:t.sectionTitle},"Interactive Demo"),e.createElement(V,null)),V=()=>{const[n,s]=O.useState({darkMode:!0,notifications:!1,haptics:!0,analytics:!1});return e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.5rem",maxWidth:340}},e.createElement("p",{style:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"1.25rem"}},"Settings"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"}},Object.entries(n).map(([r,o])=>e.createElement("div",{key:r,style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},e.createElement("span",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.7)",letterSpacing:"0.02em",textTransform:"capitalize"}},r.replace(/([A-Z])/g," $1").trim()),e.createElement(a,{value:o,onChange:l=>s(d=>({...d,[r]:l}))})))))},W=({value:n=!1})=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{value:n,label:"Toggle option"})),w={title:"Components/NeoPopToggle",component:W,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{value:{control:"boolean"}}},i={name:"All Variants",render:()=>e.createElement(N,null)},c={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{value:!1,label:"Toggle off"}))},m={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(a,{value:!0,label:"Toggle on"}))},g={render:()=>e.createElement("div",{style:{...t.page,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"3rem",gap:"1.25rem"}},e.createElement(a,{value:!1,label:"Enable dark mode"}),e.createElement(a,{value:!0,label:"Enable notifications"}))},p={args:{value:!1}};var u,y,b;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(b=(y=i.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var v,E,S;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Toggle value={false} label="Toggle off" />
    </div>
}`,...(S=(E=c.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var x,h,T;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Toggle value={true} label="Toggle on" />
    </div>
}`,...(T=(h=m.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var k,D,C;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem',
    gap: '1.25rem'
  }}>
      <Toggle value={false} label="Enable dark mode" />
      <Toggle value={true} label="Enable notifications" />
    </div>
}`,...(C=(D=g.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var z,P,I;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    value: false
  }
}`,...(I=(P=p.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};const A=["AllVariantsStory","Off","On","WithLabel","Playground"];export{i as AllVariantsStory,c as Off,m as On,p as Playground,g as WithLabel,A as __namedExportsOrder,w as default};
