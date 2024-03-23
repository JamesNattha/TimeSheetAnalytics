"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[1863],{94469:function(e,o,t){var r=t(4942),n=t(63366),i=t(87462),a=t(47313),l=t(2197),c=t(21921),p=t(28334),s=t(91615),u=t(20463),d=t(32530),m=t(70501),h=t(77342),f=t(17592),v=t(85560),g=t(63909),Z=t(91554),b=t(19860),x=t(46417),w=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],y=(0,f.ZP)(Z.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,o){return o.backdrop}})({zIndex:-1}),T=(0,f.ZP)(u.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,o){return o.root}})({"@media print":{position:"absolute !important"}}),k=(0,f.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,o){var t=e.ownerState;return[o.container,o["scroll".concat((0,s.Z)(t.scroll))]]}})((function(e){var o=e.ownerState;return(0,i.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===o.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===o.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),P=(0,f.ZP)(m.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,o){var t=e.ownerState;return[o.paper,o["scrollPaper".concat((0,s.Z)(t.scroll))],o["paperWidth".concat((0,s.Z)(String(t.maxWidth)))],t.fullWidth&&o.paperFullWidth,t.fullScreen&&o.paperFullScreen]}})((function(e){var o=e.theme,t=e.ownerState;return(0,i.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===t.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===t.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!t.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===t.maxWidth&&(0,r.Z)({maxWidth:"px"===o.breakpoints.unit?Math.max(o.breakpoints.values.xs,444):"max(".concat(o.breakpoints.values.xs).concat(o.breakpoints.unit,", 444px)")},"&.".concat(v.Z.paperScrollBody),(0,r.Z)({},o.breakpoints.down(Math.max(o.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),t.maxWidth&&"xs"!==t.maxWidth&&(0,r.Z)({maxWidth:"".concat(o.breakpoints.values[t.maxWidth]).concat(o.breakpoints.unit)},"&.".concat(v.Z.paperScrollBody),(0,r.Z)({},o.breakpoints.down(o.breakpoints.values[t.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),t.fullWidth&&{width:"calc(100% - 64px)"},t.fullScreen&&(0,r.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(v.Z.paperScrollBody),{margin:0,maxWidth:"100%"}))})),S=a.forwardRef((function(e,o){var t=(0,h.Z)({props:e,name:"MuiDialog"}),r=(0,b.Z)(),u={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},f=t["aria-describedby"],Z=t["aria-labelledby"],S=t.BackdropComponent,R=t.BackdropProps,W=t.children,C=t.className,M=t.disableEscapeKeyDown,B=void 0!==M&&M,F=t.fullScreen,D=void 0!==F&&F,N=t.fullWidth,E=void 0!==N&&N,I=t.maxWidth,L=void 0===I?"sm":I,O=t.onBackdropClick,j=t.onClose,A=t.open,z=t.PaperComponent,q=void 0===z?m.Z:z,H=t.PaperProps,K=void 0===H?{}:H,U=t.scroll,X=void 0===U?"paper":U,Y=t.TransitionComponent,$=void 0===Y?d.Z:Y,_=t.transitionDuration,V=void 0===_?u:_,G=t.TransitionProps,J=(0,n.Z)(t,w),Q=(0,i.Z)({},t,{disableEscapeKeyDown:B,fullScreen:D,fullWidth:E,maxWidth:L,scroll:X}),ee=function(e){var o=e.classes,t=e.scroll,r=e.maxWidth,n=e.fullWidth,i=e.fullScreen,a={root:["root"],container:["container","scroll".concat((0,s.Z)(t))],paper:["paper","paperScroll".concat((0,s.Z)(t)),"paperWidth".concat((0,s.Z)(String(r))),n&&"paperFullWidth",i&&"paperFullScreen"]};return(0,c.Z)(a,v.D,o)}(Q),oe=a.useRef(),te=(0,p.Z)(Z),re=a.useMemo((function(){return{titleId:te}}),[te]);return(0,x.jsx)(T,(0,i.Z)({className:(0,l.Z)(ee.root,C),closeAfterTransition:!0,components:{Backdrop:y},componentsProps:{backdrop:(0,i.Z)({transitionDuration:V,as:S},R)},disableEscapeKeyDown:B,onClose:j,open:A,ref:o,onClick:function(e){oe.current&&(oe.current=null,O&&O(e),j&&j(e,"backdropClick"))},ownerState:Q},J,{children:(0,x.jsx)($,(0,i.Z)({appear:!0,in:A,timeout:V,role:"presentation"},G,{children:(0,x.jsx)(k,{className:(0,l.Z)(ee.container),onMouseDown:function(e){oe.current=e.target===e.currentTarget},ownerState:Q,children:(0,x.jsx)(P,(0,i.Z)({as:q,elevation:24,role:"dialog","aria-describedby":f,"aria-labelledby":te},K,{className:(0,l.Z)(ee.paper,K.className),ownerState:Q,children:(0,x.jsx)(g.Z.Provider,{value:re,children:W})}))})}))}))}));o.Z=S},63909:function(e,o,t){var r=t(47313).createContext({});o.Z=r},85560:function(e,o,t){t.d(o,{D:function(){return i}});var r=t(77430),n=t(32298);function i(e){return(0,n.Z)("MuiDialog",e)}var a=(0,r.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);o.Z=a},61689:function(e,o,t){t.d(o,{Z:function(){return I}});var r=t(29439),n=t(4942),i=t(63366),a=t(87462),l=t(47313),c=t(2197),p=t(21921),s=t(53637),u=t(17551),d=t(17592),m=t(19860),h=t(77342),f=t(91615),v=t(73365),g=t(1327),Z=t(73236),b=t(86983),x=t(17677),w=t(59127),y=t(53800),T=t(77430),k=t(32298);function P(e){return(0,k.Z)("MuiTooltip",e)}var S=(0,T.Z)("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),R=t(46417),W=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];var C=(0,d.ZP)(g.Z,{name:"MuiTooltip",slot:"Popper",overridesResolver:function(e,o){var t=e.ownerState;return[o.popper,!t.disableInteractive&&o.popperInteractive,t.arrow&&o.popperArrow,!t.open&&o.popperClose]}})((function(e){var o,t=e.theme,r=e.ownerState,i=e.open;return(0,a.Z)({zIndex:(t.vars||t).zIndex.tooltip,pointerEvents:"none"},!r.disableInteractive&&{pointerEvents:"auto"},!i&&{pointerEvents:"none"},r.arrow&&(o={},(0,n.Z)(o,'&[data-popper-placement*="bottom"] .'.concat(S.arrow),{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}}),(0,n.Z)(o,'&[data-popper-placement*="top"] .'.concat(S.arrow),{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}}),(0,n.Z)(o,'&[data-popper-placement*="right"] .'.concat(S.arrow),(0,a.Z)({},r.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}})),(0,n.Z)(o,'&[data-popper-placement*="left"] .'.concat(S.arrow),(0,a.Z)({},r.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})),o))})),M=(0,d.ZP)("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:function(e,o){var t=e.ownerState;return[o.tooltip,t.touch&&o.touch,t.arrow&&o.tooltipArrow,o["tooltipPlacement".concat((0,f.Z)(t.placement.split("-")[0]))]]}})((function(e){var o,t,r=e.theme,i=e.ownerState;return(0,a.Z)({backgroundColor:r.vars?r.vars.palette.Tooltip.bg:(0,u.Fq)(r.palette.grey[700],.92),borderRadius:(r.vars||r).shape.borderRadius,color:(r.vars||r).palette.common.white,fontFamily:r.typography.fontFamily,padding:"4px 8px",fontSize:r.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:r.typography.fontWeightMedium},i.arrow&&{position:"relative",margin:0},i.touch&&{padding:"8px 16px",fontSize:r.typography.pxToRem(14),lineHeight:"".concat((t=16/14,Math.round(1e5*t)/1e5),"em"),fontWeight:r.typography.fontWeightRegular},(o={},(0,n.Z)(o,".".concat(S.popper,'[data-popper-placement*="left"] &'),(0,a.Z)({transformOrigin:"right center"},i.isRtl?(0,a.Z)({marginLeft:"14px"},i.touch&&{marginLeft:"24px"}):(0,a.Z)({marginRight:"14px"},i.touch&&{marginRight:"24px"}))),(0,n.Z)(o,".".concat(S.popper,'[data-popper-placement*="right"] &'),(0,a.Z)({transformOrigin:"left center"},i.isRtl?(0,a.Z)({marginRight:"14px"},i.touch&&{marginRight:"24px"}):(0,a.Z)({marginLeft:"14px"},i.touch&&{marginLeft:"24px"}))),(0,n.Z)(o,".".concat(S.popper,'[data-popper-placement*="top"] &'),(0,a.Z)({transformOrigin:"center bottom",marginBottom:"14px"},i.touch&&{marginBottom:"24px"})),(0,n.Z)(o,".".concat(S.popper,'[data-popper-placement*="bottom"] &'),(0,a.Z)({transformOrigin:"center top",marginTop:"14px"},i.touch&&{marginTop:"24px"})),o))})),B=(0,d.ZP)("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:function(e,o){return o.arrow}})((function(e){var o=e.theme;return{overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:o.vars?o.vars.palette.Tooltip.bg:(0,u.Fq)(o.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}})),F=!1,D=null,N={x:0,y:0};function E(e,o){return function(t){o&&o(t),e(t)}}var I=l.forwardRef((function(e,o){var t,n,u,d,T,k,S,I,L,O,j,A,z,q,H,K,U,X,Y,$=(0,h.Z)({props:e,name:"MuiTooltip"}),_=$.arrow,V=void 0!==_&&_,G=$.children,J=$.components,Q=void 0===J?{}:J,ee=$.componentsProps,oe=void 0===ee?{}:ee,te=$.describeChild,re=void 0!==te&&te,ne=$.disableFocusListener,ie=void 0!==ne&&ne,ae=$.disableHoverListener,le=void 0!==ae&&ae,ce=$.disableInteractive,pe=void 0!==ce&&ce,se=$.disableTouchListener,ue=void 0!==se&&se,de=$.enterDelay,me=void 0===de?100:de,he=$.enterNextDelay,fe=void 0===he?0:he,ve=$.enterTouchDelay,ge=void 0===ve?700:ve,Ze=$.followCursor,be=void 0!==Ze&&Ze,xe=$.id,we=$.leaveDelay,ye=void 0===we?0:we,Te=$.leaveTouchDelay,ke=void 0===Te?1500:Te,Pe=$.onClose,Se=$.onOpen,Re=$.open,We=$.placement,Ce=void 0===We?"bottom":We,Me=$.PopperComponent,Be=$.PopperProps,Fe=void 0===Be?{}:Be,De=$.slotProps,Ne=void 0===De?{}:De,Ee=$.slots,Ie=void 0===Ee?{}:Ee,Le=$.title,Oe=$.TransitionComponent,je=void 0===Oe?v.Z:Oe,Ae=$.TransitionProps,ze=(0,i.Z)($,W),qe=l.isValidElement(G)?G:(0,R.jsx)("span",{children:G}),He=(0,m.Z)(),Ke="rtl"===He.direction,Ue=l.useState(),Xe=(0,r.Z)(Ue,2),Ye=Xe[0],$e=Xe[1],_e=l.useState(null),Ve=(0,r.Z)(_e,2),Ge=Ve[0],Je=Ve[1],Qe=l.useRef(!1),eo=pe||be,oo=l.useRef(),to=l.useRef(),ro=l.useRef(),no=l.useRef(),io=(0,y.Z)({controlled:Re,default:!1,name:"Tooltip",state:"open"}),ao=(0,r.Z)(io,2),lo=ao[0],co=ao[1],po=lo,so=(0,x.Z)(xe),uo=l.useRef(),mo=l.useCallback((function(){void 0!==uo.current&&(document.body.style.WebkitUserSelect=uo.current,uo.current=void 0),clearTimeout(no.current)}),[]);l.useEffect((function(){return function(){clearTimeout(oo.current),clearTimeout(to.current),clearTimeout(ro.current),mo()}}),[mo]);var ho=function(e){clearTimeout(D),F=!0,co(!0),Se&&!po&&Se(e)},fo=(0,Z.Z)((function(e){clearTimeout(D),D=setTimeout((function(){F=!1}),800+ye),co(!1),Pe&&po&&Pe(e),clearTimeout(oo.current),oo.current=setTimeout((function(){Qe.current=!1}),He.transitions.duration.shortest)})),vo=function(e){Qe.current&&"touchstart"!==e.type||(Ye&&Ye.removeAttribute("title"),clearTimeout(to.current),clearTimeout(ro.current),me||F&&fe?to.current=setTimeout((function(){ho(e)}),F?fe:me):ho(e))},go=function(e){clearTimeout(to.current),clearTimeout(ro.current),ro.current=setTimeout((function(){fo(e)}),ye)},Zo=(0,w.Z)(),bo=Zo.isFocusVisibleRef,xo=Zo.onBlur,wo=Zo.onFocus,yo=Zo.ref,To=l.useState(!1),ko=(0,r.Z)(To,2)[1],Po=function(e){xo(e),!1===bo.current&&(ko(!1),go(e))},So=function(e){Ye||$e(e.currentTarget),wo(e),!0===bo.current&&(ko(!0),vo(e))},Ro=function(e){Qe.current=!0;var o=qe.props;o.onTouchStart&&o.onTouchStart(e)},Wo=vo,Co=go;l.useEffect((function(){if(po)return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)};function e(e){"Escape"!==e.key&&"Esc"!==e.key||fo(e)}}),[fo,po]);var Mo=(0,b.Z)(qe.ref,yo,$e,o);Le||0===Le||(po=!1);var Bo=l.useRef(),Fo={},Do="string"===typeof Le;re?(Fo.title=po||!Do||le?null:Le,Fo["aria-describedby"]=po?so:null):(Fo["aria-label"]=Do?Le:null,Fo["aria-labelledby"]=po&&!Do?so:null);var No=(0,a.Z)({},Fo,ze,qe.props,{className:(0,c.Z)(ze.className,qe.props.className),onTouchStart:Ro,ref:Mo},be?{onMouseMove:function(e){var o=qe.props;o.onMouseMove&&o.onMouseMove(e),N={x:e.clientX,y:e.clientY},Bo.current&&Bo.current.update()}}:{});var Eo={};ue||(No.onTouchStart=function(e){Ro(e),clearTimeout(ro.current),clearTimeout(oo.current),mo(),uo.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",no.current=setTimeout((function(){document.body.style.WebkitUserSelect=uo.current,vo(e)}),ge)},No.onTouchEnd=function(e){qe.props.onTouchEnd&&qe.props.onTouchEnd(e),mo(),clearTimeout(ro.current),ro.current=setTimeout((function(){fo(e)}),ke)}),le||(No.onMouseOver=E(Wo,No.onMouseOver),No.onMouseLeave=E(Co,No.onMouseLeave),eo||(Eo.onMouseOver=Wo,Eo.onMouseLeave=Co)),ie||(No.onFocus=E(So,No.onFocus),No.onBlur=E(Po,No.onBlur),eo||(Eo.onFocus=So,Eo.onBlur=Po));var Io=l.useMemo((function(){var e,o=[{name:"arrow",enabled:Boolean(Ge),options:{element:Ge,padding:4}}];return null!=(e=Fe.popperOptions)&&e.modifiers&&(o=o.concat(Fe.popperOptions.modifiers)),(0,a.Z)({},Fe.popperOptions,{modifiers:o})}),[Ge,Fe]),Lo=(0,a.Z)({},$,{isRtl:Ke,arrow:V,disableInteractive:eo,placement:Ce,PopperComponentProp:Me,touch:Qe.current}),Oo=function(e){var o=e.classes,t=e.disableInteractive,r=e.arrow,n=e.touch,i=e.placement,a={popper:["popper",!t&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",n&&"touch","tooltipPlacement".concat((0,f.Z)(i.split("-")[0]))],arrow:["arrow"]};return(0,p.Z)(a,P,o)}(Lo),jo=null!=(t=null!=(n=Ie.popper)?n:Q.Popper)?t:C,Ao=null!=(u=null!=(d=null!=(T=Ie.transition)?T:Q.Transition)?d:je)?u:v.Z,zo=null!=(k=null!=(S=Ie.tooltip)?S:Q.Tooltip)?k:M,qo=null!=(I=null!=(L=Ie.arrow)?L:Q.Arrow)?I:B,Ho=(0,s.$)(jo,(0,a.Z)({},Fe,null!=(O=Ne.popper)?O:oe.popper,{className:(0,c.Z)(Oo.popper,null==Fe?void 0:Fe.className,null==(j=null!=(A=Ne.popper)?A:oe.popper)?void 0:j.className)}),Lo),Ko=(0,s.$)(Ao,(0,a.Z)({},Ae,null!=(z=Ne.transition)?z:oe.transition),Lo),Uo=(0,s.$)(zo,(0,a.Z)({},null!=(q=Ne.tooltip)?q:oe.tooltip,{className:(0,c.Z)(Oo.tooltip,null==(H=null!=(K=Ne.tooltip)?K:oe.tooltip)?void 0:H.className)}),Lo),Xo=(0,s.$)(qo,(0,a.Z)({},null!=(U=Ne.arrow)?U:oe.arrow,{className:(0,c.Z)(Oo.arrow,null==(X=null!=(Y=Ne.arrow)?Y:oe.arrow)?void 0:X.className)}),Lo);return(0,R.jsxs)(l.Fragment,{children:[l.cloneElement(qe,No),(0,R.jsx)(jo,(0,a.Z)({as:null!=Me?Me:g.Z,placement:Ce,anchorEl:be?{getBoundingClientRect:function(){return{top:N.y,left:N.x,right:N.x,bottom:N.y,width:0,height:0}}}:Ye,popperRef:Bo,open:!!Ye&&po,id:so,transition:!0},Eo,Ho,{popperOptions:Io,children:function(e){var o=e.TransitionProps;return(0,R.jsx)(Ao,(0,a.Z)({timeout:He.transitions.duration.shorter},o,Ko,{children:(0,R.jsxs)(zo,(0,a.Z)({},Uo,{children:[Le,V?(0,R.jsx)(qo,(0,a.Z)({},Xo,{ref:Je})):null]}))}))}}))]})}))},97423:function(e,o,t){t.d(o,{Z:function(){return w}});var r=t(29439),n=t(63366),i=t(87462),a=t(47313),l=t(2197),c=t(21921),p=t(91615),s=t(17592),u=t(53800),d=t(99008),m=t(38743),h=t(77430),f=t(32298);function v(e){return(0,f.Z)("PrivateSwitchBase",e)}(0,h.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var g=t(46417),Z=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],b=(0,s.ZP)(m.Z)((function(e){var o=e.ownerState;return(0,i.Z)({padding:9,borderRadius:"50%"},"start"===o.edge&&{marginLeft:"small"===o.size?-3:-12},"end"===o.edge&&{marginRight:"small"===o.size?-3:-12})})),x=(0,s.ZP)("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),w=a.forwardRef((function(e,o){var t=e.autoFocus,a=e.checked,s=e.checkedIcon,m=e.className,h=e.defaultChecked,f=e.disabled,w=e.disableFocusRipple,y=void 0!==w&&w,T=e.edge,k=void 0!==T&&T,P=e.icon,S=e.id,R=e.inputProps,W=e.inputRef,C=e.name,M=e.onBlur,B=e.onChange,F=e.onFocus,D=e.readOnly,N=e.required,E=void 0!==N&&N,I=e.tabIndex,L=e.type,O=e.value,j=(0,n.Z)(e,Z),A=(0,u.Z)({controlled:a,default:Boolean(h),name:"SwitchBase",state:"checked"}),z=(0,r.Z)(A,2),q=z[0],H=z[1],K=(0,d.Z)(),U=f;K&&"undefined"===typeof U&&(U=K.disabled);var X="checkbox"===L||"radio"===L,Y=(0,i.Z)({},e,{checked:q,disabled:U,disableFocusRipple:y,edge:k}),$=function(e){var o=e.classes,t=e.checked,r=e.disabled,n=e.edge,i={root:["root",t&&"checked",r&&"disabled",n&&"edge".concat((0,p.Z)(n))],input:["input"]};return(0,c.Z)(i,v,o)}(Y);return(0,g.jsxs)(b,(0,i.Z)({component:"span",className:(0,l.Z)($.root,m),centerRipple:!0,focusRipple:!y,disabled:U,tabIndex:null,role:void 0,onFocus:function(e){F&&F(e),K&&K.onFocus&&K.onFocus(e)},onBlur:function(e){M&&M(e),K&&K.onBlur&&K.onBlur(e)},ownerState:Y,ref:o},j,{children:[(0,g.jsx)(x,(0,i.Z)({autoFocus:t,checked:a,defaultChecked:h,className:$.input,disabled:U,id:X?S:void 0,name:C,onChange:function(e){if(!e.nativeEvent.defaultPrevented){var o=e.target.checked;H(o),B&&B(e,o)}},readOnly:D,ref:W,required:E,ownerState:Y,tabIndex:I,type:L},"checkbox"===L&&void 0===O?{}:{value:O},R)),q?s:P]}))}))}}]);