import{R as e,r as F}from"./index-Bc2G9s8g.js";const n={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},p=[{id:1,title:"CRED Pay",subtitle:"Pay bills, earn coins",color:"#0a0a1a",accent:"#0066FF"},{id:2,title:"CRED Store",subtitle:"Exclusive rewards",color:"#0a1a0a",accent:"#06C270"},{id:3,title:"CRED Travel",subtitle:"Premium stays",color:"#1a0a0a",accent:"#EE4D37"},{id:4,title:"CRED Mint",subtitle:"Fixed deposits",color:"#1a1a0a",accent:"#F5A623"},{id:5,title:"CRED Cash",subtitle:"Instant credit",color:"#0a1a1a",accent:"#7C5CFC"}],s=({items:o=p,showDots:k=!0,cardWidth:g=220})=>{const[t,l]=F.useState(0),I=()=>l(r=>Math.max(0,r-1)),W=()=>l(r=>Math.min(o.length-1,r+1));return e.createElement("div",{style:{width:"100%",maxWidth:560}},e.createElement("div",{style:{position:"relative",overflow:"hidden",marginBottom:"1.25rem"}},e.createElement("div",{style:{display:"flex",gap:"1rem",transform:`translateX(calc(-${t*(g+16)}px))`,transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1)"}},o.map((r,a)=>e.createElement("div",{key:r.id,style:{flexShrink:0,width:g,height:140,background:r.color,border:`1px solid ${t===a?r.accent:"rgba(255,255,255,0.06)"}`,borderBottom:`3px solid ${t===a?r.accent:"rgba(255,255,255,0.06)"}`,padding:"1.25rem",cursor:"pointer",transition:"border-color 0.2s ease",opacity:Math.abs(a-t)>1?.4:1},onClick:()=>l(a)},e.createElement("div",{style:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:r.accent,marginBottom:"0.5rem"}},"CRED"),e.createElement("div",{style:{fontSize:"1rem",fontWeight:800,letterSpacing:"0.04em",marginBottom:"0.3rem"}},r.title),e.createElement("div",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.45)",letterSpacing:"0.02em"}},r.subtitle))))),e.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},e.createElement("button",{onClick:I,disabled:t===0,style:{background:t===0?"rgba(255,255,255,0.05)":"#ffffff",color:t===0?"rgba(255,255,255,0.2)":"#000000",border:"none",width:32,height:32,cursor:t===0?"not-allowed":"pointer",fontFamily:"'Outfit', sans-serif",fontSize:"0.9rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:t===0?"none":"2px 2px 0 0 rgba(175,175,175,0.7)"}},"←"),k&&e.createElement("div",{style:{display:"flex",gap:"0.4rem",alignItems:"center"}},o.map((r,a)=>e.createElement("div",{key:a,onClick:()=>l(a),style:{width:t===a?20:6,height:6,background:t===a?"#0066FF":"rgba(255,255,255,0.2)",cursor:"pointer",transition:"width 0.25s ease, background 0.25s ease"}}))),e.createElement("button",{onClick:W,disabled:t===o.length-1,style:{background:t===o.length-1?"rgba(255,255,255,0.05)":"#ffffff",color:t===o.length-1?"rgba(255,255,255,0.2)":"#000000",border:"none",width:32,height:32,cursor:t===o.length-1?"not-allowed":"pointer",fontFamily:"'Outfit', sans-serif",fontSize:"0.9rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:t===o.length-1?"none":"2px 2px 0 0 rgba(175,175,175,0.7)"}},"→")))},T=()=>e.createElement("div",{style:n.page},e.createElement("p",{style:n.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopCarousel"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Horizontal card carousel with dot indicators and prev/next controls"),e.createElement("p",{style:n.sectionTitle},"Default (with dots)"),e.createElement(s,null),e.createElement("pre",{style:n.code},`<NeoPopCarousel
  data={cards}
  renderItem={({ item }) => <Card {...item} />}
  showDots
/>`),e.createElement("p",{style:n.sectionTitle},"Without Dots"),e.createElement(s,{showDots:!1}),e.createElement("p",{style:n.sectionTitle},"Single Item"),e.createElement(s,{items:[p[0]],showDots:!1,cardWidth:280}),e.createElement("pre",{style:n.code},`<NeoPopCarousel
  data={[singleCard]}
  renderItem={({ item }) => <Card {...item} />}
/>`)),A={title:"Components/NeoPopCarousel",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},i={name:"All Variants",render:()=>e.createElement(T,null)},c={render:()=>e.createElement("div",{style:{...n.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(s,null))},m={render:()=>e.createElement("div",{style:{...n.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(s,{showDots:!0}))},d={render:()=>e.createElement("div",{style:{...n.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(s,{items:[p[2]],showDots:!1,cardWidth:300}))};var f,u,y;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(y=(u=i.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var h,b,E;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Carousel />
    </div>
}`,...(E=(b=c.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};var C,S,x;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Carousel showDots />
    </div>
}`,...(x=(S=m.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var v,w,D;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Carousel items={[CARDS[2]]} showDots={false} cardWidth={300} />
    </div>
}`,...(D=(w=d.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const R=["AllVariantsStory","Default","WithDots","SingleItem"];export{i as AllVariantsStory,c as Default,d as SingleItem,m as WithDots,R as __namedExportsOrder,A as default};
