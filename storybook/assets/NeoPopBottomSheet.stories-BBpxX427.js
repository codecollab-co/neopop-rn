import{R as e,r as S}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},n=({sheetOpen:r=!1,sheetContent:s})=>e.createElement("div",{style:{width:320,height:560,background:"#111111",border:"1px solid rgba(255,255,255,0.1)",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}},e.createElement("div",{style:{flex:1,padding:"1.5rem",display:"flex",flexDirection:"column",justifyContent:"flex-end"}},e.createElement("div",{style:{fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.5rem"}},"Screen Content"),e.createElement("div",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6}},"This represents the main app screen behind the bottom sheet.")),r&&e.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)",transition:"opacity 0.3s ease"}}),e.createElement("div",{style:{position:"absolute",bottom:r?0:"-100%",left:0,right:0,background:"#0a0a0a",borderTop:"1px solid rgba(255,255,255,0.12)",transition:"bottom 0.35s cubic-bezier(0.4,0,0.2,1)",zIndex:10,padding:"0.75rem 1.25rem 1.25rem"}},e.createElement("div",{style:{display:"flex",justifyContent:"center",marginBottom:"1rem"}},e.createElement("div",{style:{width:36,height:4,background:"rgba(255,255,255,0.2)",borderRadius:2}})),s||e.createElement(e.Fragment,null,e.createElement("div",{style:{fontSize:"1rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.5rem"}},"Bottom Sheet Title"),e.createElement("div",{style:{fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6,marginBottom:"1.25rem"}},"Sheet content goes here. This slides up from the bottom of the screen."),e.createElement("div",{style:{background:"#0066FF",color:"#ffffff",fontFamily:"'Outfit', sans-serif",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.65rem",textAlign:"center",boxShadow:"3px 3px 0 0 rgba(0,40,140,0.8)",cursor:"pointer"}},"Confirm")))),b=()=>{const[r,s]=S.useState(!1);return e.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"1.5rem"}},e.createElement("button",{onClick:()=>s(y=>!y),style:{background:"#0066FF",color:"#ffffff",border:"none",padding:"0.6rem 1.5rem",fontFamily:"'Outfit', sans-serif",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",boxShadow:"3px 3px 0 0 rgba(0,40,140,0.8)"}},r?"Close Sheet":"Open Sheet"),e.createElement(n,{sheetOpen:r}))},x=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopBottomSheet"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Modal bottom sheet — notch bar, overlay, slide-up animation"),e.createElement("p",{style:t.sectionTitle},"Closed State"),e.createElement(n,{sheetOpen:!1}),e.createElement("pre",{style:t.code},`<NeoPopBottomSheet
  isVisible={false}
  onClose={() => setVisible(false)}
>
  <SheetContent />
</NeoPopBottomSheet>`),e.createElement("p",{style:t.sectionTitle},"Open State"),e.createElement(n,{sheetOpen:!0}),e.createElement("pre",{style:t.code},`<NeoPopBottomSheet
  isVisible={true}
  onClose={() => setVisible(false)}
>
  <SheetContent />
</NeoPopBottomSheet>`),e.createElement("p",{style:t.sectionTitle},"Interactive Demo"),e.createElement(b,null)),v={title:"Components/NeoPopBottomSheet",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},o={name:"All Variants",render:()=>e.createElement(x,null)},a={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(n,{sheetOpen:!1}))},i={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(n,{sheetOpen:!0}))};var l,m,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(c=(m=o.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,d,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <MockPhone sheetOpen={false} />
    </div>
}`,...(f=(d=a.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var g,h,u;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <MockPhone sheetOpen={true} />
    </div>
}`,...(u=(h=i.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};const C=["AllVariantsStory","Closed","Open"];export{o as AllVariantsStory,a as Closed,i as Open,C as __namedExportsOrder,v as default};
