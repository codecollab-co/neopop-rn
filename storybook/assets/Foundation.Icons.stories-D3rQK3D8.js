import{R as e}from"./index-Bc2G9s8g.js";const r={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},iconWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.6rem",padding:"1.25rem",background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",width:100},iconLabel:{fontSize:"0.45rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",textAlign:"center"}},W={up:"rotate(0deg)",down:"rotate(180deg)",left:"rotate(-90deg)",right:"rotate(90deg)"},l=({direction:t="down",size:n=24,color:a="#ffffff",strokeWidth:p=1.5})=>e.createElement("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",style:{transform:W[t],transition:"transform 0.2s ease"}},e.createElement("path",{d:"M5 8L12 15L19 8",stroke:a,strokeWidth:p,strokeLinecap:"square",strokeLinejoin:"miter"})),d=({size:t=24,color:n="#ffffff",strokeWidth:a=1.5})=>e.createElement("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none"},e.createElement("path",{d:"M5 5L19 19",stroke:n,strokeWidth:a,strokeLinecap:"square"}),e.createElement("path",{d:"M19 5L5 19",stroke:n,strokeWidth:a,strokeLinecap:"square"})),g=({size:t=24,color:n="#ffffff",direction:a="right"})=>{const p={up:"rotate(-90deg)",down:"rotate(90deg)",left:"rotate(180deg)",right:"rotate(0deg)"}[a];return e.createElement("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",style:{transform:p}},e.createElement("path",{d:"M5 12H19M19 12L13 6M19 12L13 18",stroke:n,strokeWidth:"1.5",strokeLinecap:"square",strokeLinejoin:"miter"}))},m=["up","down","left","right"],w=[16,20,24,32,40],L=["#ffffff","#0066FF","#06C270","#EE4D37","#F5A623","#7C5CFC"],z=()=>e.createElement("div",{style:r.page},e.createElement("p",{style:r.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"Skia Icon Primitives"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Chevron · Cross · Pointer — rendered as inline SVG"),e.createElement("p",{style:r.sectionTitle},"Chevron — All Directions"),e.createElement("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"1.5rem"}},m.map(t=>e.createElement("div",{key:t,style:r.iconWrap},e.createElement(l,{direction:t,size:28}),e.createElement("span",{style:r.iconLabel},"Chevron ",t)))),e.createElement("p",{style:r.sectionTitle},"Cross (X)"),e.createElement("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"1.5rem"}},[16,20,24,32].map(t=>e.createElement("div",{key:t,style:r.iconWrap},e.createElement(d,{size:t}),e.createElement("span",{style:r.iconLabel},t,"px")))),e.createElement("p",{style:r.sectionTitle},"Pointer / Arrow"),e.createElement("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"1.5rem"}},m.map(t=>e.createElement("div",{key:t,style:r.iconWrap},e.createElement(g,{direction:t,size:28}),e.createElement("span",{style:r.iconLabel},"Pointer ",t)))),e.createElement("p",{style:r.sectionTitle},"Size Scale"),e.createElement("div",{style:{display:"flex",gap:"1.25rem",alignItems:"flex-end",flexWrap:"wrap",marginBottom:"1.5rem"}},w.map(t=>e.createElement("div",{key:t,style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"}},e.createElement(l,{size:t}),e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}},t,"px")))),e.createElement("p",{style:r.sectionTitle},"Color Variants"),e.createElement("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"1.5rem"}},L.map(t=>e.createElement("div",{key:t,style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.75rem",padding:"0.75rem",background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.05)"}},e.createElement("div",{style:{display:"flex",gap:"0.5rem"}},e.createElement(l,{color:t,size:20,direction:"right"}),e.createElement(d,{color:t,size:20}),e.createElement(g,{color:t,size:20})),e.createElement("div",{style:{width:16,height:16,background:t}}),e.createElement("span",{style:{fontSize:"0.42rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.05em",fontVariantNumeric:"tabular-nums"}},t)))),e.createElement("p",{style:r.sectionTitle},"Stroke Width Variants"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap",marginBottom:"1.5rem"}},[.75,1,1.5,2,2.5].map(t=>e.createElement("div",{key:t,style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"}},e.createElement(l,{strokeWidth:t,size:28}),e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}},t,"px")))),e.createElement("p",{style:r.sectionTitle},"Combined Usage Example"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"1px",maxWidth:300}},["Account Settings","Linked Cards","Transaction History","Help & Support"].map(t=>e.createElement("div",{key:t,style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.85rem 1rem",background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.05)",cursor:"pointer"}},e.createElement("span",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.7)"}},t),e.createElement(l,{direction:"right",size:16,color:"rgba(255,255,255,0.3)"}))))),B={title:"Foundation/Icons",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},o={name:"All Icons",render:()=>e.createElement(z,null)},i={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem",flexWrap:"wrap"}},m.map(t=>e.createElement("div",{key:t,style:r.iconWrap},e.createElement(l,{direction:t,size:32}),e.createElement("span",{style:r.iconLabel},"Chevron ",t))))},s={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem",flexWrap:"wrap"}},[16,24,32,40].map(t=>e.createElement("div",{key:t,style:r.iconWrap},e.createElement(d,{size:t}),e.createElement("span",{style:r.iconLabel},t,"px"))))},c={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem",flexWrap:"wrap"}},m.map(t=>e.createElement("div",{key:t,style:r.iconWrap},e.createElement(g,{direction:t,size:32}),e.createElement("span",{style:r.iconLabel},"Pointer ",t))))};var f,y,E;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'All Icons',
  render: () => <AllIcons />
}`,...(E=(y=o.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var x,u,v;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap'
  }}>
      {DIRECTIONS.map(dir => <div key={dir} style={S.iconWrap}>
          <ChevronIcon direction={dir} size={32} />
          <span style={S.iconLabel}>Chevron {dir}</span>
        </div>)}
    </div>
}`,...(v=(u=i.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var S,h,b;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap'
  }}>
      {[16, 24, 32, 40].map(s => <div key={s} style={S.iconWrap}>
          <CrossIcon size={s} />
          <span style={S.iconLabel}>{s}px</span>
        </div>)}
    </div>
}`,...(b=(h=s.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var k,C,I;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap'
  }}>
      {DIRECTIONS.map(dir => <div key={dir} style={S.iconWrap}>
          <PointerIcon direction={dir} size={32} />
          <span style={S.iconLabel}>Pointer {dir}</span>
        </div>)}
    </div>
}`,...(I=(C=c.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const A=["AllIconsStory","Chevron","Cross","Pointer"];export{o as AllIconsStory,i as Chevron,s as Cross,c as Pointer,A as __namedExportsOrder,B as default};
