import{R as e}from"./index-Bc2G9s8g.js";const r={page:{fontFamily:"'Outfit', sans-serif",background:"#000000",minHeight:"100vh",padding:"3rem",color:"#ffffff"},heading:{fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#0066FF",marginBottom:"1.5rem"},sectionTitle:{fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"2rem"},code:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.07)",padding:"1rem 1.25rem",fontFamily:"'Courier New', monospace",fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre",overflowX:"auto",maxWidth:400,marginTop:"1rem"}},l=()=>e.createElement("style",null,`
    @keyframes shimmerMove {
      0%   { transform: translateX(-100%) skewX(-12deg); }
      100% { transform: translateX(250%) skewX(-12deg); }
    }
    .shimmer-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(255,255,255,0.12) 50%,
        transparent 70%
      );
      animation: shimmerMove 1.6s ease-in-out infinite;
    }
  `),t=({width:o=200,height:B=16,style:b})=>e.createElement("div",{style:{position:"relative",overflow:"hidden",width:o,height:B,background:"rgba(255,255,255,0.07)",...b}},e.createElement("div",{className:"shimmer-overlay"})),w=()=>e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"}},e.createElement(t,{width:"80%",height:12}),e.createElement(t,{width:"100%",height:12}),e.createElement(t,{width:"65%",height:12}),e.createElement(t,{width:"90%",height:12})),v=()=>e.createElement("div",{style:{background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.06)",padding:"1.25rem",width:280}},e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"0.85rem",marginBottom:"1rem"}},e.createElement(t,{width:42,height:42}),e.createElement("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"0.4rem"}},e.createElement(t,{width:"60%",height:12}),e.createElement(t,{width:"40%",height:10}))),e.createElement(t,{width:"100%",height:10,style:{marginBottom:"0.4rem"}}),e.createElement(t,{width:"85%",height:10,style:{marginBottom:"0.4rem"}}),e.createElement(t,{width:"70%",height:10,style:{marginBottom:"1rem"}}),e.createElement(t,{width:"100%",height:36})),k=()=>e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"1rem",padding:"0.85rem 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}},e.createElement(t,{width:48,height:48}),e.createElement("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"0.4rem"}},e.createElement(t,{width:"55%",height:12}),e.createElement(t,{width:"35%",height:10})),e.createElement(t,{width:60,height:24})),T=()=>e.createElement("div",{style:r.page},e.createElement(l,null),e.createElement("p",{style:r.heading},"NeoPop Design System"),e.createElement("h2",{style:{fontSize:"1.5rem",fontWeight:900,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}},"NeoPopShimmer"),e.createElement("p",{style:{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.03em",marginBottom:"3rem"}},"Diagonal sweep shimmer — loading skeleton placeholder"),e.createElement("p",{style:r.sectionTitle},"Shimmer Block"),e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",marginBottom:"1.5rem"}},e.createElement(t,{width:320,height:20}),e.createElement(t,{width:240,height:80}),e.createElement(t,{width:160,height:160})),e.createElement("pre",{style:r.code},"<NeoPopShimmer width={320} height={20} />"),e.createElement("p",{style:r.sectionTitle},"Shimmer Text"),e.createElement("div",{style:{width:320,marginBottom:"1.5rem"}},e.createElement(w,null)),e.createElement("pre",{style:r.code},"<NeoPopShimmerText lines={4} />"),e.createElement("p",{style:r.sectionTitle},"Shimmer Card"),e.createElement(v,null),e.createElement("pre",{style:r.code},"<NeoPopShimmerCard />"),e.createElement("p",{style:r.sectionTitle},"Shimmer List"),e.createElement("div",{style:{maxWidth:400,marginBottom:"1.5rem"}},[1,2,3,4].map(o=>e.createElement(k,{key:o}))),e.createElement("pre",{style:r.code},"<NeoPopShimmerList itemCount={4} />")),I={title:"Components/NeoPopShimmer",parameters:{layout:"fullscreen",backgrounds:{default:"dark"}}},n={name:"All Variants",render:()=>e.createElement(T,null)},a={render:()=>e.createElement("div",{style:{...r.page,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"3rem",gap:"1rem"}},e.createElement(l,null),e.createElement(t,{width:300,height:24}),e.createElement(t,{width:220,height:100}),e.createElement(t,{width:140,height:140}))},m={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(l,null),e.createElement("div",{style:{width:320}},e.createElement(w,null)))},i={render:()=>e.createElement("div",{style:{...r.page,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(l,null),e.createElement(v,null))};var s,c,d;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: 'All Variants',
  render: () => <AllVariants />
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var h,g,p;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem',
    gap: '1rem'
  }}>
      <ShimmerKeyframes />
      <ShimmerBox width={300} height={24} />
      <ShimmerBox width={220} height={100} />
      <ShimmerBox width={140} height={140} />
    </div>
}`,...(p=(g=a.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var y,f,E;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <ShimmerKeyframes />
      <div style={{
      width: 320
    }}>
        <ShimmerTextBlock />
      </div>
    </div>
}`,...(E=(f=m.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};var u,S,x;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    ...S.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
      <ShimmerKeyframes />
      <ShimmerCardBlock />
    </div>
}`,...(x=(S=i.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};const N=["AllVariantsStory","ShimmerBlock","ShimmerText","ShimmerCard"];export{n as AllVariantsStory,a as ShimmerBlock,i as ShimmerCard,m as ShimmerText,N as __namedExportsOrder,I as default};
