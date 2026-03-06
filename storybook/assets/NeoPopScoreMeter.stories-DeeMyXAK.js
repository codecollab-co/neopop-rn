import{R as e}from"./index-Bc2G9s8g.js";const a={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},n=({reading:o,lowerLimit:i=300,upperLimit:u=900,size:l=200,label:b})=>{const r=Math.min(1,Math.max(0,(o-i)/(u-i))),E=14,t=(l-E)/2,c=l/2,s=l/2,m=Math.PI,A=2*Math.PI,M=m+r*Math.PI,h=c+t*Math.cos(m),x=s+t*Math.sin(m),$=c+t*Math.cos(A),P=s+t*Math.sin(A),X=`M ${h} ${x} A ${t} ${t} 0 0 1 ${$} ${P}`,_=c+t*Math.cos(M),G=s+t*Math.sin(M),Y=r>.5?1:0,k=r===0?"":r>=1?`M ${h} ${x} A ${t} ${t} 0 1 1 ${$+.001} ${P}`:`M ${h} ${x} A ${t} ${t} 0 ${Y} 1 ${_} ${G}`,S=r<.3?"#EE4D37":r<.6?"#F5A623":"#06C270",q=r<.3?"Poor":r<.6?"Average":r<.85?"Good":"Excellent",T=m+r*Math.PI,J=c+(t-20)*Math.cos(T),K=s+(t-20)*Math.sin(T);return e.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.75rem"}},e.createElement("div",{style:{position:"relative",width:l,height:l/2+30,overflow:"hidden"}},e.createElement("svg",{width:l,height:l,style:{position:"absolute",top:0,left:0}},e.createElement("path",{d:X,fill:"none",stroke:"rgba(255,255,255,0.08)",strokeWidth:E,strokeLinecap:"butt"}),k&&e.createElement("path",{d:k,fill:"none",stroke:S,strokeWidth:E,strokeLinecap:"butt"}),e.createElement("line",{x1:c,y1:s,x2:J,y2:K,stroke:"#ffffff",strokeWidth:2,strokeLinecap:"square"}),e.createElement("circle",{cx:c,cy:s,r:5,fill:"#ffffff"}))),e.createElement("div",{style:{textAlign:"center",marginTop:"-10px"}},e.createElement("div",{style:{fontSize:"2rem",fontWeight:900,color:S,letterSpacing:"0.04em",lineHeight:1,fontFamily:"'Outfit', sans-serif"}},o),e.createElement("div",{style:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:S,marginTop:"0.25rem"}},q)),e.createElement("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}},[{label:"Poor",color:"#EE4D37",range:"300–500"},{label:"Average",color:"#F5A623",range:"500–650"},{label:"Good",color:"#0066FF",range:"650–750"},{label:"Excellent",color:"#06C270",range:"750–900"}].map(v=>e.createElement("div",{key:v.label,style:{display:"flex",alignItems:"center",gap:"0.3rem"}},e.createElement("div",{style:{width:8,height:8,background:v.color,flexShrink:0}}),e.createElement("span",{style:{fontSize:"0.5rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.08em"}},v.label)))),b&&e.createElement("span",{style:{fontSize:"0.5rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)"}},b))},Q=()=>e.createElement("div",{style:a.page},e.createElement("p",{style:a.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopScoreMeter"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Semi-circular arc gauge — credit score visualization"),e.createElement("p",{style:a.sectionTitle},"Score Levels"),e.createElement("div",{style:{display:"flex",gap:"3rem",flexWrap:"wrap",marginBottom:"2rem"}},e.createElement(n,{reading:380,label:"Poor"}),e.createElement(n,{reading:560,label:"Average"}),e.createElement(n,{reading:765,label:"Excellent"})),e.createElement("pre",{style:a.code},`<NeoPopScoreMeter
  reading={765}
  lowerLimit={300}
  upperLimit={900}
/>`),e.createElement("p",{style:a.sectionTitle},"Full Range"),e.createElement("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap"}},[300,420,550,680,780,900].map(o=>e.createElement(n,{key:o,reading:o,size:140})))),U=({reading:o=650,lowerLimit:i=300,upperLimit:u=900})=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(n,{reading:o,lowerLimit:i,upperLimit:u})),ee={title:"Components/NeoPopScoreMeter",component:U,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},argTypes:{reading:{control:{type:"range",min:300,max:900}},lowerLimit:{control:"number"},upperLimit:{control:"number"}}},p={name:"All Variants",render:()=>e.createElement(Q,null)},g={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(n,{reading:380,label:"Poor (20%)"}))},d={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(n,{reading:560,label:"Average (55%)"}))},f={render:()=>e.createElement("div",{style:{...a.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(n,{reading:800,label:"Excellent (85%)"}))},y={args:{reading:650,lowerLimit:300,upperLimit:900}};var I,w,C;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(C=(w=p.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var W,L,F;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <ScoreMeter reading={380} label="Poor (20%)" />
    </div>
}`,...(F=(L=g.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var j,D,V;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <ScoreMeter reading={560} label="Average (55%)" />
    </div>
}`,...(V=(D=d.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var z,B,N;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <ScoreMeter reading={800} label="Excellent (85%)" />
    </div>
}`,...(N=(B=f.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var H,O,R;y.parameters={...y.parameters,docs:{...(H=y.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    reading: 650,
    lowerLimit: 300,
    upperLimit: 900
  }
}`,...(R=(O=y.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const te=["AllVariantsStory","Poor","Average","Excellent","Playground"];export{p as AllVariantsStory,d as Average,f as Excellent,y as Playground,g as Poor,te as __namedExportsOrder,ee as default};
