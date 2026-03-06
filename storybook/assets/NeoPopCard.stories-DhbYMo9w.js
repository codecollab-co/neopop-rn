import{R as e}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},variantLabel:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"0.75rem",display:"block"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},r=({children:E,disabled:l=!1,faceColor:b="#0a0a0a",width:v=260,height:T="auto"})=>e.createElement("div",{style:{display:"inline-block",opacity:l?.4:1,cursor:l?"not-allowed":"pointer"}},e.createElement("div",{style:{background:b,border:"1px solid rgba(255,255,255,0.12)",boxShadow:"4px 4px 0 0 rgba(255,255,255,0.12)",width:v,height:T,padding:"1.5rem",fontFamily:"'Outfit', sans-serif",color:"#ffffff",position:"relative"}},E)),x=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopCard"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"3D surface container — same depth language as NeoPopButton"),e.createElement("p",{style:t.sectionTitle},"Default"),e.createElement("span",{style:t.variantLabel},"Empty card surface"),e.createElement(r,{width:260,height:120}),e.createElement("pre",{style:t.code},`<NeoPopCard
  backgroundColor="#0a0a0a"
  onPress={() => {}}
/>`),e.createElement("p",{style:t.sectionTitle},"With Content"),e.createElement("span",{style:t.variantLabel},"Heading + body text"),e.createElement(r,{width:320},e.createElement("div",{style:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#0066FF",marginBottom:"0.75rem"}},"Card Tag"),e.createElement("div",{style:{fontSize:"1.1rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.6rem",lineHeight:1.2}},"Card Heading"),e.createElement("div",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6,letterSpacing:"0.02em",marginBottom:"1.25rem"}},"A surface container that carries the NeoPop 3D depth language. Use it to group related content with tactile weight."),e.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"1rem",borderTop:"1px solid rgba(255,255,255,0.07)"}},e.createElement("span",{style:{fontSize:"0.55rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase"}},"View Details"),e.createElement("span",{style:{color:"#0066FF",fontSize:"0.8rem"}},"→"))),e.createElement("pre",{style:t.code},`<NeoPopCard
  backgroundColor="#0a0a0a"
  onPress={() => {}}
>
  <Typography type="CAPS">Card Tag</Typography>
  <Typography type="HEADING">Card Heading</Typography>
  <Typography>Card body content here.</Typography>
</NeoPopCard>`),e.createElement("p",{style:t.sectionTitle},"Colored Face"),e.createElement("div",{style:{display:"flex",gap:"1.5rem",flexWrap:"wrap",marginBottom:"1.5rem"}},e.createElement(r,{faceColor:"#0066FF",width:200,height:100},e.createElement("div",{style:{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.1em"}},"Blue Card")),e.createElement(r,{faceColor:"#06C270",width:200,height:100},e.createElement("div",{style:{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.1em",color:"#000"}},"Success Card")),e.createElement(r,{faceColor:"#EE4D37",width:200,height:100},e.createElement("div",{style:{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.1em"}},"Error Card"))),e.createElement("p",{style:t.sectionTitle},"Disabled"),e.createElement("span",{style:t.variantLabel},"opacity: 0.4, pointer-events: none"),e.createElement(r,{width:260,disabled:!0},e.createElement("div",{style:{fontSize:"0.9rem",fontWeight:700,letterSpacing:"0.05em",marginBottom:"0.5rem"}},"Disabled Card"),e.createElement("div",{style:{fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",lineHeight:1.5}},"This card is not interactive in its current state.")),e.createElement("pre",{style:t.code},`<NeoPopCard
  backgroundColor="#0a0a0a"
  disabled
  onPress={() => {}}
>
  <Typography>Disabled Card</Typography>
</NeoPopCard>`)),z={title:"Components/NeoPopCard",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},n={name:"All Variants",render:()=>e.createElement(x,null)},a={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{width:280,height:140}))},o={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{width:320},e.createElement("div",{style:{fontSize:"1rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.5rem"}},"Card Title"),e.createElement("div",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6}},"Card body content with supporting information and details.")))},i={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{width:280,disabled:!0},e.createElement("div",{style:{fontSize:"1rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.5rem"}},"Disabled Card"),e.createElement("div",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6}},"Not interactive in current state.")))};var s,m,c;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(c=(m=n.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var d,p,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <NeoPopCardComponent width={280} height={140} />
    </div>
}`,...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var f,y,h;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <NeoPopCardComponent width={320}>
        <div style={{
        fontSize: '1rem',
        fontWeight: 800,
        letterSpacing: '0.04em',
        marginBottom: '0.5rem'
      }}>Card Title</div>
        <div style={{
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.6
      }}>
          Card body content with supporting information and details.
        </div>
      </NeoPopCardComponent>
    </div>
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var u,C,S;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <NeoPopCardComponent width={280} disabled>
        <div style={{
        fontSize: '1rem',
        fontWeight: 800,
        letterSpacing: '0.04em',
        marginBottom: '0.5rem'
      }}>Disabled Card</div>
        <div style={{
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.6
      }}>
          Not interactive in current state.
        </div>
      </NeoPopCardComponent>
    </div>
}`,...(S=(C=i.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};const N=["AllVariantsStory","Default","WithContent","Disabled"];export{n as AllVariantsStory,a as Default,i as Disabled,o as WithContent,N as __namedExportsOrder,z as default};
