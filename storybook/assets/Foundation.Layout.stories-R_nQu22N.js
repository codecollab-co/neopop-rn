import{R as e}from"./index-Bc2G9s8g.js";const a={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"},box:{background:"rgba(0,102,255,0.1)",border:"1px solid rgba(0,102,255,0.3)",padding:"0.75rem 1rem",fontFamily:"'Outfit', sans-serif",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#0066FF",whiteSpace:"nowrap"}},o=({children:r,gap:l=16,align:n="center",justify:g="flex-start",wrap:R=!1})=>e.createElement("div",{style:{display:"flex",flexDirection:"row",gap:l,alignItems:n,justifyContent:g,flexWrap:R?"wrap":"nowrap"}},r),k=({children:r,gap:l=16,align:n="flex-start"})=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:l,alignItems:n}},r),I=({children:r,paddingHorizontal:l=24,paddingVertical:n=24,maxWidth:g=480})=>e.createElement("div",{style:{width:"100%",maxWidth:g,paddingLeft:l,paddingRight:l,paddingTop:n,paddingBottom:n,boxSizing:"border-box",background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)"}},r),p=({color:r="rgba(255,255,255,0.07)",thickness:l=1,margin:n=16})=>e.createElement("div",{style:{width:"100%",height:l,background:r,margin:`${n}px 0`}}),b=({size:r=16})=>e.createElement("div",{style:{width:r,height:1,flexShrink:0}}),i=({size:r=16})=>e.createElement("div",{style:{height:r,width:"100%",flexShrink:0}}),t=({label:r,w:l=80,h:n=40})=>e.createElement("div",{style:{...a.box,width:l,height:n,display:"flex",alignItems:"center",justifyContent:"center"}},r),T=()=>e.createElement("div",{style:a.page},e.createElement("p",{style:a.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"Layout Helpers"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Row · Column · PageContainer · Dividers · Spacers"),e.createElement("p",{style:a.sectionTitle},"Row (horizontal flex)"),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.25rem",maxWidth:500,marginBottom:"0.5rem"}},e.createElement(o,{gap:12},e.createElement(t,{label:"A"}),e.createElement(t,{label:"B"}),e.createElement(t,{label:"C"}),e.createElement(t,{label:"D"}))),e.createElement("pre",{style:a.code},`<Row gap={12} align="center">
  <BoxA />
  <BoxB />
  <BoxC />
</Row>`),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",marginBottom:"1.5rem"}},e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem",maxWidth:500}},e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.15em",textTransform:"uppercase",display:"block",marginBottom:"0.5rem"}},"justify: space-between"),e.createElement(o,{gap:8,justify:"space-between"},e.createElement(t,{label:"Left"}),e.createElement(t,{label:"Right"}))),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem",maxWidth:500}},e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.15em",textTransform:"uppercase",display:"block",marginBottom:"0.5rem"}},"justify: center"),e.createElement(o,{gap:8,justify:"center"},e.createElement(t,{label:"A"}),e.createElement(t,{label:"B"})))),e.createElement("p",{style:a.sectionTitle},"Column (vertical flex)"),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.25rem",maxWidth:200,marginBottom:"0.5rem"}},e.createElement(k,{gap:8},e.createElement(t,{label:"Item 1",w:140}),e.createElement(t,{label:"Item 2",w:140}),e.createElement(t,{label:"Item 3",w:140}))),e.createElement("pre",{style:a.code},`<Column gap={8}>
  <ItemA />
  <ItemB />
  <ItemC />
</Column>`),e.createElement("p",{style:a.sectionTitle},"PageContainer (padded wrapper)"),e.createElement(I,{paddingHorizontal:24,paddingVertical:24,maxWidth:400},e.createElement("div",{style:{fontSize:"0.55rem",color:"#0066FF",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.5rem"}},"paddingH: 24 · paddingV: 24"),e.createElement("div",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6}},"Content inside the PageContainer is padded and constrained to maxWidth.")),e.createElement("pre",{style:a.code},`<PageContainer
  paddingHorizontal={24}
  paddingVertical={24}
  maxWidth={480}
>
  <Content />
</PageContainer>`),e.createElement("p",{style:a.sectionTitle},"HorizontalDivider"),e.createElement("div",{style:{maxWidth:400}},e.createElement(t,{label:"Section A",w:200}),e.createElement(p,{margin:12}),e.createElement(t,{label:"Section B",w:200}),e.createElement(p,{color:"rgba(0,102,255,0.3)",thickness:2,margin:12}),e.createElement(t,{label:"Section C",w:200})),e.createElement("pre",{style:a.code},`<HorizontalDivider />
<HorizontalDivider
  color="rgba(0,102,255,0.3)"
  thickness={2}
/>`),e.createElement("p",{style:a.sectionTitle},"HorizontalSpacer"),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem",maxWidth:500,marginBottom:"0.5rem"}},e.createElement("div",{style:{display:"flex",alignItems:"center"}},e.createElement(t,{label:"Left",w:80}),e.createElement(b,{size:32}),e.createElement("div",{style:{...a.box,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.3)",color:"#F5A623",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.5rem"}},"32"),e.createElement(b,{size:32}),e.createElement(t,{label:"Right",w:80}))),e.createElement("pre",{style:a.code},`<Row>
  <LeftContent />
  <HorizontalSpacer size={32} />
  <RightContent />
</Row>`),e.createElement("p",{style:a.sectionTitle},"VerticalSpacer"),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem",maxWidth:200,marginBottom:"0.5rem"}},e.createElement(t,{label:"Top",w:140}),e.createElement(i,{size:32}),e.createElement("div",{style:{...a.box,background:"rgba(245,166,35,0.1)",border:"1px solid rgba(245,166,35,0.3)",color:"#F5A623",height:32,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.5rem"}},"32px gap"),e.createElement(i,{size:32}),e.createElement(t,{label:"Bottom",w:140})),e.createElement("pre",{style:a.code},`<Column>
  <TopContent />
  <VerticalSpacer size={32} />
  <BottomContent />
</Column>`)),L={title:"Foundation/Layout",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},m={name:"All Layouts",render:()=>e.createElement(T,null)},c={render:()=>e.createElement("div",{style:{...a.page,display:"flex",flexDirection:"column",gap:"2rem",padding:"3rem"}},e.createElement("p",{style:a.heading},"Row — Horizontal Flex"),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.5rem"}},e.createElement(o,{gap:16},e.createElement(t,{label:"A"}),e.createElement(t,{label:"B"}),e.createElement(t,{label:"C"}))),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.5rem"}},e.createElement(o,{gap:16,justify:"space-between"},e.createElement(t,{label:"Left",w:100}),e.createElement(t,{label:"Center",w:100}),e.createElement(t,{label:"Right",w:100}))))},d={render:()=>e.createElement("div",{style:{...a.page,display:"flex",gap:"3rem",padding:"3rem",alignItems:"flex-start"}},e.createElement("div",null,e.createElement("p",{style:a.heading},"Column — Vertical Flex"),e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1.5rem"}},e.createElement(k,{gap:12},e.createElement(t,{label:"Item 1",w:160}),e.createElement(t,{label:"Item 2",w:160}),e.createElement(t,{label:"Item 3",w:160}),e.createElement(t,{label:"Item 4",w:160})))))},s={render:()=>e.createElement("div",{style:{...a.page,padding:"3rem"}},e.createElement("p",{style:a.heading},"Spacers & Dividers"),e.createElement("div",{style:{maxWidth:400}},e.createElement(t,{label:"Content A",w:300}),e.createElement(i,{size:16}),e.createElement(p,null),e.createElement(i,{size:16}),e.createElement(t,{label:"Content B",w:300}),e.createElement(i,{size:32}),e.createElement(t,{label:"Content C",w:300}),e.createElement(p,{color:"rgba(0,102,255,0.4)",thickness:2}),e.createElement(t,{label:"Content D",w:300})))};var E,y,x;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'All Layouts',
  render: () => <AllLayouts />
}`,...(x=(y=m.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var u,f,w;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '3rem'
  }}>
      <p style={S.heading}>Row — Horizontal Flex</p>
      <div style={{
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.07)',
      padding: '1.5rem'
    }}>
        <Row gap={16}>
          <Box label="A" />
          <Box label="B" />
          <Box label="C" />
        </Row>
      </div>
      <div style={{
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.07)',
      padding: '1.5rem'
    }}>
        <Row gap={16} justify="space-between">
          <Box label="Left" w={100} />
          <Box label="Center" w={100} />
          <Box label="Right" w={100} />
        </Row>
      </div>
    </div>
}`,...(w=(f=c.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var h,v,S;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    gap: '3rem',
    padding: '3rem',
    alignItems: 'flex-start'
  }}>
      <div>
        <p style={S.heading}>Column — Vertical Flex</p>
        <div style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '1.5rem'
      }}>
          <Column gap={12}>
            <Box label="Item 1" w={160} />
            <Box label="Item 2" w={160} />
            <Box label="Item 3" w={160} />
            <Box label="Item 4" w={160} />
          </Column>
        </div>
      </div>
    </div>
}`,...(S=(v=d.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var C,B,z;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    padding: '3rem'
  }}>
      <p style={S.heading}>Spacers & Dividers</p>
      <div style={{
      maxWidth: 400
    }}>
        <Box label="Content A" w={300} />
        <VerticalSpacer size={16} />
        <HorizontalDivider />
        <VerticalSpacer size={16} />
        <Box label="Content B" w={300} />
        <VerticalSpacer size={32} />
        <Box label="Content C" w={300} />
        <HorizontalDivider color="rgba(0,102,255,0.4)" thickness={2} />
        <Box label="Content D" w={300} />
      </div>
    </div>
}`,...(z=(B=s.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};const W=["AllLayoutsStory","RowLayout","ColumnLayout","Spacers"];export{m as AllLayoutsStory,d as ColumnLayout,c as RowLayout,s as Spacers,W as __namedExportsOrder,L as default};
