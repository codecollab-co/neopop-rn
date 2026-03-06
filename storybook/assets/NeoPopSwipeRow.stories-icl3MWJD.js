import{R as e,r as E}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},l=({title:i,subtitle:g,leftAction:o,rightAction:a,swipeHint:M=!1})=>{const[s,c]=E.useState(0),[u,h]=E.useState(!1),y=e.useRef(0),r=80,k=o?r:0,F=a?-r:0,P=n=>Math.min(k,Math.max(F,n)),B=n=>{h(!0),y.current=n.clientX-s},H=n=>{if(!u)return;const j=n.clientX-y.current;c(P(j))},b=()=>{h(!1),s>r/2&&o?c(r):s<-40&&a?c(-r):c(0)};return e.createElement("div",{style:{position:"relative",overflow:"hidden",maxWidth:440,cursor:"grab",userSelect:"none"},onMouseDown:B,onMouseMove:H,onMouseUp:b,onMouseLeave:b},o&&e.createElement("div",{style:{position:"absolute",left:0,top:0,bottom:0,width:r,background:o.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#000000",fontFamily:"'Outfit', sans-serif"}},o.label),a&&e.createElement("div",{style:{position:"absolute",right:0,top:0,bottom:0,width:r,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#ffffff",fontFamily:"'Outfit', sans-serif"}},a.label),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",display:"flex",alignItems:"center",gap:"1rem",transform:`translateX(${s}px)`,transition:u?"none":"transform 0.3s cubic-bezier(0.4,0,0.2,1)",position:"relative",zIndex:1}},e.createElement("div",{style:{width:36,height:36,background:"rgba(0,102,255,0.15)",border:"1px solid rgba(0,102,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},e.createElement("span",{style:{fontSize:"0.7rem",color:"#0066FF"}},"₹")),e.createElement("div",{style:{flex:1,minWidth:0}},e.createElement("div",{style:{fontSize:"0.85rem",fontWeight:600,letterSpacing:"0.02em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},i),g&&e.createElement("div",{style:{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)",marginTop:"0.2rem"}},g)),M&&e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"0.25rem",flexShrink:0}},o&&e.createElement("span",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.2)"}},"←"),a&&e.createElement("span",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.2)"}},"→")),e.createElement("div",{style:{fontSize:"0.9rem",fontWeight:700,color:"#ffffff",flexShrink:0,fontVariantNumeric:"tabular-nums"}},"₹5,000")))},N=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopSwipeRow"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Swipeable list row — drag left/right to reveal action panels"),e.createElement("p",{style:t.sectionTitle},"Default (drag hint)"),e.createElement(l,{title:"HDFC Credit Card",subtitle:"Due in 5 days",leftAction:{label:"Pay",color:"#06C270"},rightAction:{label:"Delete",color:"#EE4D37"},swipeHint:!0}),e.createElement("pre",{style:t.code},`<NeoPopSwipeRow
  leftActions={[{ label: 'Pay', color: '#06C270', onPress }]}
  rightActions={[{ label: 'Delete', color: '#EE4D37', onPress }]}
>
  <RowContent />
</NeoPopSwipeRow>`),e.createElement("p",{style:t.sectionTitle},"With Left Action (Archive)"),e.createElement(l,{title:"Axis Bank Statement",subtitle:"Monthly summary",leftAction:{label:"Archive",color:"#06C270"}}),e.createElement("p",{style:t.sectionTitle},"With Right Action (Delete)"),e.createElement(l,{title:"ICICI Credit Card",subtitle:"Linked account",rightAction:{label:"Remove",color:"#EE4D37"}}),e.createElement("p",{style:t.sectionTitle},"Both Actions"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1px",maxWidth:440}},[{title:"HDFC Credit Card",subtitle:"Bill due 12th Mar"},{title:"Amazon Pay Card",subtitle:"Bill due 18th Mar"},{title:"Kotak Mahindra",subtitle:"Bill due 25th Mar"}].map(i=>e.createElement(l,{key:i.title,title:i.title,subtitle:i.subtitle,leftAction:{label:"Pay",color:"#06C270"},rightAction:{label:"Snooze",color:"#F5A623"}})))),V={title:"Components/NeoPopSwipeRow",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},m={name:"All Variants",render:()=>e.createElement(N,null)},d={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(l,{title:"HDFC Credit Card",subtitle:"Due in 5 days",leftAction:{label:"Pay",color:"#06C270"},rightAction:{label:"Delete",color:"#EE4D37"},swipeHint:!0}))},p={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(l,{title:"Archive this item",subtitle:"Drag right to archive",leftAction:{label:"Archive",color:"#06C270"}}))},f={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(l,{title:"Delete this item",subtitle:"Drag left to delete",rightAction:{label:"Delete",color:"#EE4D37"}}))};var S,v,x;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(x=(v=m.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var C,w,D;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <SwipeRow title="HDFC Credit Card" subtitle="Due in 5 days" leftAction={{
      label: 'Pay',
      color: '#06C270'
    }} rightAction={{
      label: 'Delete',
      color: '#EE4D37'
    }} swipeHint />
    </div>
}`,...(D=(w=d.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var A,W,z;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <SwipeRow title="Archive this item" subtitle="Drag right to archive" leftAction={{
      label: 'Archive',
      color: '#06C270'
    }} />
    </div>
}`,...(z=(W=p.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var I,R,T;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <SwipeRow title="Delete this item" subtitle="Drag left to delete" rightAction={{
      label: 'Delete',
      color: '#EE4D37'
    }} />
    </div>
}`,...(T=(R=f.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};const L=["AllVariantsStory","Default","WithLeftAction","WithRightAction"];export{m as AllVariantsStory,d as Default,p as WithLeftAction,f as WithRightAction,L as __namedExportsOrder,V as default};
