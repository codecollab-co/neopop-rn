import{R as e}from"./index-Bc2G9s8g.js";const a={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},n=({progress:r,color:t="#0066FF",label:o})=>e.createElement("div",{style:{width:"100%",maxWidth:420}},o&&e.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"}},e.createElement("span",{style:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)"}},o),e.createElement("span",{style:{fontSize:"0.65rem",fontWeight:700,color:t,letterSpacing:"0.05em",fontVariantNumeric:"tabular-nums"}},r,"%")),e.createElement("div",{style:{height:6,background:"rgba(255,255,255,0.08)",position:"relative",overflow:"hidden"}},e.createElement("div",{style:{position:"absolute",left:0,top:0,height:"100%",width:`${Math.min(100,Math.max(0,r))}%`,background:t,transition:"width 0.4s cubic-bezier(0.4,0,0.2,1)"}}))),l=({progress:r,size:t=120,strokeWidth:o=8,color:s="#0066FF",label:y})=>{const f=(t-o)/2,u=2*Math.PI*f,B=u-r/100*u;return e.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.75rem"}},e.createElement("div",{style:{position:"relative",width:t,height:t}},e.createElement("svg",{width:t,height:t,style:{transform:"rotate(-90deg)"}},e.createElement("circle",{cx:t/2,cy:t/2,r:f,fill:"none",stroke:"rgba(255,255,255,0.08)",strokeWidth:o}),e.createElement("circle",{cx:t/2,cy:t/2,r:f,fill:"none",stroke:s,strokeWidth:o,strokeDasharray:u,strokeDashoffset:B,strokeLinecap:"butt",style:{transition:"stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)"}})),e.createElement("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},e.createElement("span",{style:{fontSize:"1.25rem",fontWeight:800,color:s,letterSpacing:"0.02em",fontFamily:"'Outfit', sans-serif"}},r,"%"))),y&&e.createElement("span",{style:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)"}},y))},g=[0,25,50,75,100],d=r=>r<=25?"#EE4D37":r<=60?"#F5A623":r<100?"#0066FF":"#06C270",T=()=>e.createElement("div",{style:a.page},e.createElement("p",{style:a.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopProgressBar"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Horizontal filled bar and circular SVG arc variants"),e.createElement("p",{style:a.sectionTitle},"Horizontal — All Progress Values"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem",marginBottom:"1rem"}},g.map(r=>e.createElement(n,{key:r,progress:r,color:d(r),label:`${r}%`}))),e.createElement("pre",{style:a.code},`<NeoPopProgressBar
  variant="horizontal"
  progress={75}
  color="#0066FF"
/>`),e.createElement("p",{style:a.sectionTitle},"Horizontal — Custom Colors"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem",marginBottom:"1rem"}},e.createElement(n,{progress:40,color:"#EE4D37",label:"Error State"}),e.createElement(n,{progress:65,color:"#F5A623",label:"Warning State"}),e.createElement(n,{progress:88,color:"#06C270",label:"Success State"})),e.createElement("p",{style:a.sectionTitle},"Circular Arc"),e.createElement("div",{style:{display:"flex",gap:"3rem",flexWrap:"wrap",marginBottom:"1rem"}},g.map(r=>e.createElement(l,{key:r,progress:r,color:d(r),label:`${r}%`}))),e.createElement("pre",{style:a.code},`<NeoPopProgressBar
  variant="circular"
  progress={75}
  color="#0066FF"
  size={120}
/>`),e.createElement("p",{style:a.sectionTitle},"Circular — Animated"),e.createElement(w,null)),w=()=>{const[r,t]=e.useState(0);return e.useEffect(()=>{const o=setInterval(()=>{t(s=>s>=100?0:s+1)},60);return()=>clearInterval(o)},[]),e.createElement("div",{style:{display:"flex",gap:"2rem",alignItems:"center",marginBottom:"1rem"}},e.createElement(l,{progress:r,color:"#0066FF",label:"Loading"}),e.createElement(l,{progress:r,color:"#06C270",size:80,strokeWidth:6,label:"Upload"}),e.createElement(l,{progress:r,color:"#7C5CFC",size:60,strokeWidth:5,label:"Sync"}))},W=({progress:r=50,variant:t="horizontal"})=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"2rem"}},t==="horizontal"?e.createElement(n,{progress:r,label:"Progress"}):e.createElement(l,{progress:r,label:"Progress"})),V={title:"Components/NeoPopProgressBar",component:W,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{progress:{control:{type:"range",min:0,max:100}},variant:{control:{type:"select"},options:["horizontal","circular"]}}},i={name:"All Variants",render:()=>e.createElement(T,null)},c={render:()=>e.createElement("div",{style:{...a.page,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"3rem",gap:"2rem"}},g.map(r=>e.createElement(n,{key:r,progress:r,color:d(r),label:`${r}%`})))},m={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem",flexWrap:"wrap"}},g.map(r=>e.createElement(l,{key:r,progress:r,color:d(r),label:`${r}%`})))},p={args:{progress:50,variant:"horizontal"}};var E,S,h;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(h=(S=i.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var x,b,v;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem',
    gap: '2rem'
  }}>
      {PROGRESS_VALUES.map(p => <HorizontalBar key={p} progress={p} color={colorForProgress(p)} label={\`\${p}%\`} />)}
    </div>
}`,...(v=(b=c.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var C,P,F;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
    flexWrap: 'wrap'
  }}>
      {PROGRESS_VALUES.map(p => <CircularProgress key={p} progress={p} color={colorForProgress(p)} label={\`\${p}%\`} />)}
    </div>
}`,...(F=(P=m.parameters)==null?void 0:P.docs)==null?void 0:F.source}}};var z,k,A;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    progress: 50,
    variant: 'horizontal'
  }
}`,...(A=(k=p.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};const I=["AllVariantsStory","Horizontal","Circular","Playground"];export{i as AllVariantsStory,m as Circular,c as Horizontal,p as Playground,I as __namedExportsOrder,V as default};
