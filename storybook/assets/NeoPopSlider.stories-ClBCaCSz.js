import{R as e,r as R}from"./index-Bc2G9s8g.js";const t={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},r=({value:g=50,min:a=0,max:l=100,step:n=1,showSteps:y=!1,label:v,onChange:f})=>{const[S,H]=R.useState(g),b=(S-a)/(l-a)*100,E=y&&n>1?Array.from({length:Math.floor((l-a)/n)+1},(o,s)=>a+s*n):[];return e.createElement("div",{style:{width:"100%",maxWidth:420}},v&&e.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.75rem"}},e.createElement("span",{style:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)"}},v),e.createElement("span",{style:{fontSize:"0.65rem",fontWeight:700,color:"#0066FF",letterSpacing:"0.05em",fontVariantNumeric:"tabular-nums"}},S)),e.createElement("div",{style:{position:"relative",paddingBottom:y?"1.5rem":0}},e.createElement("div",{style:{position:"relative",height:4,background:"rgba(255,255,255,0.1)",marginBottom:0}},e.createElement("div",{style:{position:"absolute",left:0,top:0,height:"100%",width:`${b}%`,background:"#0066FF"}})),e.createElement("input",{type:"range",min:a,max:l,step:n,value:S,onChange:o=>{const s=Number(o.target.value);H(s),f==null||f(s)},style:{position:"absolute",top:-10,left:0,width:"100%",opacity:0,height:24,cursor:"pointer",margin:0,zIndex:2}}),e.createElement("div",{style:{position:"absolute",top:-7,left:`calc(${b}% - 9px)`,width:18,height:18,background:"#0066FF",boxShadow:"2px 2px 0 0 rgba(0,40,140,0.8)",zIndex:1,pointerEvents:"none"}}),y&&E.length>0&&e.createElement("div",{style:{position:"absolute",top:8,left:0,right:0,display:"flex",justifyContent:"space-between"}},E.map(o=>{const s=(o-a)/(l-a)*100;return e.createElement("div",{key:o,style:{display:"flex",flexDirection:"column",alignItems:"center",position:"absolute",left:`${s}%`,transform:"translateX(-50%)"}},e.createElement("div",{style:{width:1,height:6,background:"rgba(255,255,255,0.2)",marginBottom:2}}),e.createElement("span",{style:{fontSize:"0.45rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.05em"}},o))}))),e.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"0.5rem"}},e.createElement("span",{style:{fontSize:"0.5rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.08em"}},a),e.createElement("span",{style:{fontSize:"0.5rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.08em"}},l)))},_=()=>e.createElement("div",{style:t.page},e.createElement("p",{style:t.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopSlider"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Horizontal track with square thumb — styled HTML range input"),e.createElement("p",{style:t.sectionTitle},"Default (50%)"),e.createElement(r,{value:50,label:"Volume"}),e.createElement("pre",{style:t.code},`<NeoPopSlider
  value={50}
  minimumValue={0}
  maximumValue={100}
  onValueChange={setValue}
/>`),e.createElement("p",{style:t.sectionTitle},"Min Value (0%)"),e.createElement(r,{value:0,label:"Brightness"}),e.createElement("p",{style:t.sectionTitle},"Max Value (100%)"),e.createElement(r,{value:100,label:"Speed"}),e.createElement("p",{style:t.sectionTitle},"Custom Range"),e.createElement(r,{value:25,min:0,max:50,label:"Amount (₹0 – ₹50)"}),e.createElement("pre",{style:t.code},`<NeoPopSlider
  value={25}
  minimumValue={0}
  maximumValue={50}
  onValueChange={setValue}
/>`),e.createElement("p",{style:t.sectionTitle},"With Steps"),e.createElement(r,{value:4,min:0,max:10,step:2,showSteps:!0,label:"Step Size 2"}),e.createElement("pre",{style:t.code},`<NeoPopSlider
  value={4}
  minimumValue={0}
  maximumValue={10}
  step={2}
  showStepMarkers
  onValueChange={setValue}
/>`)),$=({value:g=50,min:a=0,max:l=100,step:n=1})=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:g,min:a,max:l,step:n,label:"Slider"})),X={title:"Components/NeoPopSlider",component:$,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{value:{control:{type:"range",min:0,max:100}},min:{control:"number"},max:{control:"number"},step:{control:"number"}}},i={name:"All Variants",render:()=>e.createElement(_,null)},m={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:50,label:"Slider (50%)"}))},c={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:0,label:"Min Value (0%)"}))},p={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:100,label:"Max Value (100%)"}))},u={render:()=>e.createElement("div",{style:{...t.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(r,{value:6,min:0,max:10,step:2,showSteps:!0,label:"With Step Markers"}))},d={args:{value:50,min:0,max:100,step:1}};var h,x,V;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(V=(x=i.parameters)==null?void 0:x.docs)==null?void 0:V.source}}};var T,C,w;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Slider value={50} label="Slider (50%)" />
    </div>
}`,...(w=(C=m.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var M,z,k;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Slider value={0} label="Min Value (0%)" />
    </div>
}`,...(k=(z=c.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var j,I,W;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Slider value={100} label="Max Value (100%)" />
    </div>
}`,...(W=(I=p.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var F,B,N;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <Slider value={6} min={0} max={10} step={2} showSteps label="With Step Markers" />
    </div>
}`,...(N=(B=u.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var P,A,D;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1
  }
}`,...(D=(A=d.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};const q=["AllVariantsStory","Default","MinValue","MaxValue","WithSteps","Playground"];export{i as AllVariantsStory,m as Default,p as MaxValue,c as MinValue,d as Playground,u as WithSteps,q as __namedExportsOrder,X as default};
