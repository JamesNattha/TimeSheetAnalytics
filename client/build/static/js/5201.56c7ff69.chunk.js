"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[5201],{65201:function(e,n,r){r.r(n),r.d(n,{default:function(){return U}});var t=r(1413),o=r(29439),a=r(45987),i=r(47313),s=r(2135),l=r(75908),c=r(19860),d=r(87462),p=r(63366),u=["getTrigger","target"];function h(e,n){var r=n.disableHysteresis,t=void 0!==r&&r,o=n.threshold,a=void 0===o?100:o,i=n.target,s=e.current;return i&&(e.current=void 0!==i.pageYOffset?i.pageYOffset:i.scrollTop),!(!t&&void 0!==s&&e.current<s)&&e.current>a}var m="undefined"!==typeof window?window:null;var x=r(24813),y=r(47825),Z=r(9289),v=r(42832),f=r(61113),g=r(66212),b=r(90891),j=r(57829),w=r(31095),k=r(46923),D=r(48310),C=r(89840),S=r(74748),P=r(83213),z=r(36287),T=r(94044),N=r(51404),_=r(67894),M={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"}}]},name:"menu",theme:"outlined"},A=r(20262),V=function(e,n){return i.createElement(A.Z,(0,t.Z)((0,t.Z)({},e),{},{ref:n,icon:M}))};V.displayName="MenuOutlined";var F=i.forwardRef(V),H={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"}}]},name:"line",theme:"outlined"},L=function(e,n){return i.createElement(A.Z,(0,t.Z)((0,t.Z)({},e),{},{ref:n,icon:H}))};L.displayName="LineOutlined";var O=i.forwardRef(L),R=r(30078),E=r(80771),B=r(46417),I=["handleDrawerOpen","layout"];function W(e){var n=e.layout,r=e.children,t=e.window,a=(0,c.Z)(),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.getTrigger,r=void 0===n?h:n,t=e.target,a=void 0===t?m:t,s=(0,p.Z)(e,u),l=i.useRef(),c=i.useState((function(){return r(l,s)})),x=(0,o.Z)(c,2),y=x[0],Z=x[1];return i.useEffect((function(){var e=function(){Z(r(l,(0,d.Z)({target:a},s)))};return e(),a.addEventListener("scroll",e,{passive:!0}),function(){a.removeEventListener("scroll",e,{passive:!0})}}),[a,r,JSON.stringify(s)]),y}({disableHysteresis:!0,threshold:10,target:t?t():void 0}),l="dark"===a.palette.mode?a.palette.grey[50]:a.palette.grey[800],x="landing"!==n?l:"transparent";return i.cloneElement(r,{style:{backgroundColor:s?l:x}})}var U=function(e){var n=e.handleDrawerOpen,r=e.layout,d=void 0===r?"landing":r,p=(0,a.Z)(e,I),u=(0,R.FV)(E.zV),h=(0,o.Z)(u,2),m=(h[0],h[1],(0,c.Z)()),M=(0,x.Z)(m.breakpoints.down("md")),A=(0,i.useState)(!1),V=(0,o.Z)(A,2),H=V[0],L=V[1];defaultpath=z.ZP.defaultPath;var U=function(e){return function(n){("keydown"!==n.type||"Tab"!==n.key&&"Shift"!==n.key)&&L(e)}};return(0,B.jsx)(W,(0,t.Z)((0,t.Z)({layout:d},p),{},{children:(0,B.jsx)(l.Z,{sx:{bgcolor:"transparent",color:m.palette.text.primary,boxShadow:"none"},children:(0,B.jsx)(y.Z,{disableGutters:M,children:(0,B.jsxs)(Z.Z,{sx:{px:{xs:1.5,md:0,lg:0},py:2},children:[(0,B.jsxs)(v.Z,{direction:"row",sx:{flexGrow:1,display:{xs:"none",md:"block"}},alignItems:"center",children:[(0,B.jsx)(f.Z,{component:"div",sx:{textAlign:"left",display:"inline-block"},children:(0,B.jsx)(_.Z,{reverse:!0,to:"/"})}),(0,B.jsx)(g.Z,{label:"v1.2.0",variant:"outlined",size:"small",color:"secondary",sx:{mt:.5,ml:1,fontSize:"0.725rem",height:20,"& .MuiChip-label":{px:.5}}})]}),(0,B.jsxs)(v.Z,{direction:"row",sx:{"& .header-link":{px:1,"&:hover":{color:m.palette.primary.main}},display:{xs:"none",md:"block"}},spacing:2,children:[(0,B.jsx)(b.Z,{className:"header-link",color:"white",component:s.rU,to:"/login",target:"_blank",underline:"none",children:"Dashboard"}),(0,B.jsx)(b.Z,{className:"header-link",color:n?"primary":"white",component:s.rU,to:"/components-overview/buttons",underline:"none",children:"Components"}),(0,B.jsx)(b.Z,{className:"header-link",color:"white",href:"https://codedthemes.gitbook.io/mantis/",target:"_blank",underline:"none",children:"Documentation"}),(0,B.jsx)(j.Z,{sx:{display:"inline-block"},children:(0,B.jsx)(N.Z,{children:(0,B.jsx)(w.Z,{component:b.Z,href:"https://mui.com/store/items/mantis-react-admin-dashboard-template/",disableElevation:!0,color:"primary",variant:"contained",children:"Purchase Now"})})})]}),(0,B.jsxs)(j.Z,{sx:{width:"100%",alignItems:"center",justifyContent:"space-between",display:{xs:"flex",md:"none"}},children:[(0,B.jsx)(f.Z,{component:"div",sx:{textAlign:"left",display:"inline-block"},children:(0,B.jsx)(_.Z,{reverse:!0,to:"/"})}),(0,B.jsxs)(v.Z,{direction:"row",spacing:2,children:["component"===d&&(0,B.jsx)(w.Z,{variant:"outlined",size:"small",color:"warning",component:s.rU,to:defaultPath,sx:{mt:.5,height:28},children:"Dashboard"}),"component"!==d&&(0,B.jsx)(w.Z,{variant:"outlined",size:"small",color:"warning",component:s.rU,to:"/components-overview/buttons",sx:{mt:.5,height:28},children:"All Components"}),(0,B.jsx)(T.Z,(0,t.Z)((0,t.Z)({color:"secondary"},"component"===d?{onClick:n}:{onClick:U(!0)}),{},{sx:{"&:hover":{bgcolor:"dark"===m.palette.mode?"secondary.lighter":"secondary.dark"}},children:(0,B.jsx)(F,{style:{color:"dark"===m.palette.mode?"inherit":m.palette.grey[100]}})}))]}),(0,B.jsx)(k.ZP,{anchor:"top",open:H,onClose:U(!1),sx:{"& .MuiDrawer-paper":{backgroundImage:"none"}},children:(0,B.jsx)(j.Z,{sx:{width:"auto","& .MuiListItemIcon-root":{fontSize:"1rem",minWidth:28}},role:"presentation",onClick:U(!1),onKeyDown:U(!1),children:(0,B.jsxs)(D.Z,{children:[(0,B.jsx)(b.Z,{style:{textDecoration:"none"},href:"/login",target:"_blank",children:(0,B.jsxs)(C.Z,{component:"span",children:[(0,B.jsx)(S.Z,{children:(0,B.jsx)(O,{})}),(0,B.jsx)(P.Z,{primary:"Dashboard",primaryTypographyProps:{variant:"h6",color:"text.primary"}})]})}),(0,B.jsx)(b.Z,{style:{textDecoration:"none"},href:"/components-overview/buttons",target:"_blank",children:(0,B.jsxs)(C.Z,{component:"span",children:[(0,B.jsx)(S.Z,{children:(0,B.jsx)(O,{})}),(0,B.jsx)(P.Z,{primary:"All Components",primaryTypographyProps:{variant:"h6",color:"text.primary"}})]})}),(0,B.jsx)(b.Z,{style:{textDecoration:"none"},href:"https://github.com/codedthemes/mantis-free-react-admin-template",target:"_blank",children:(0,B.jsxs)(C.Z,{component:"span",children:[(0,B.jsx)(S.Z,{children:(0,B.jsx)(O,{})}),(0,B.jsx)(P.Z,{primary:"Free Version",primaryTypographyProps:{variant:"h6",color:"text.primary"}})]})}),(0,B.jsx)(b.Z,{style:{textDecoration:"none"},href:"https://codedthemes.gitbook.io/mantis/",target:"_blank",children:(0,B.jsxs)(C.Z,{component:"span",children:[(0,B.jsx)(S.Z,{children:(0,B.jsx)(O,{})}),(0,B.jsx)(P.Z,{primary:"Documentation",primaryTypographyProps:{variant:"h6",color:"text.primary"}})]})}),(0,B.jsx)(b.Z,{style:{textDecoration:"none"},href:"https://codedthemes.support-hub.io/",target:"_blank",children:(0,B.jsxs)(C.Z,{component:"span",children:[(0,B.jsx)(S.Z,{children:(0,B.jsx)(O,{})}),(0,B.jsx)(P.Z,{primary:"Support",primaryTypographyProps:{variant:"h6",color:"text.primary"}})]})}),(0,B.jsx)(b.Z,{style:{textDecoration:"none"},href:"https://mui.com/store/items/mantis-react-admin-dashboard-template/",target:"_blank",children:(0,B.jsxs)(C.Z,{component:"span",children:[(0,B.jsx)(S.Z,{children:(0,B.jsx)(O,{})}),(0,B.jsx)(P.Z,{primary:"Purchase Now",primaryTypographyProps:{variant:"h6",color:"text.primary"}}),(0,B.jsx)(g.Z,{color:"primary",label:"v1.0",size:"small"})]})})]})})})]})]})})})}))}},90891:function(e,n,r){r.d(n,{Z:function(){return P}});var t=r(93433),o=r(29439),a=r(4942),i=r(63366),s=r(87462),l=r(47313),c=r(2197),d=r(21921),p=r(91615),u=r(17592),h=r(77342),m=r(59127),x=r(86983),y=r(61113),Z=r(77430),v=r(32298);function f(e){return(0,v.Z)("MuiLink",e)}var g=(0,Z.Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),b=r(46428),j=r(17551),w={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},k=function(e){var n=e.theme,r=e.ownerState,t=function(e){return w[e]||e}(r.color),o=(0,b.DW)(n,"palette.".concat(t),!1)||r.color,a=(0,b.DW)(n,"palette.".concat(t,"Channel"));return"vars"in n&&a?"rgba(".concat(a," / 0.4)"):(0,j.Fq)(o,.4)},D=r(46417),C=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],S=(0,u.ZP)(y.Z,{name:"MuiLink",slot:"Root",overridesResolver:function(e,n){var r=e.ownerState;return[n.root,n["underline".concat((0,p.Z)(r.underline))],"button"===r.component&&n.button]}})((function(e){var n=e.theme,r=e.ownerState;return(0,s.Z)({},"none"===r.underline&&{textDecoration:"none"},"hover"===r.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===r.underline&&(0,s.Z)({textDecoration:"underline"},"inherit"!==r.color&&{textDecorationColor:k({theme:n,ownerState:r})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===r.component&&(0,a.Z)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(g.focusVisible),{outline:"auto"}))})),P=l.forwardRef((function(e,n){var r=(0,h.Z)({props:e,name:"MuiLink"}),a=r.className,u=r.color,y=void 0===u?"primary":u,Z=r.component,v=void 0===Z?"a":Z,g=r.onBlur,b=r.onFocus,j=r.TypographyClasses,k=r.underline,P=void 0===k?"always":k,z=r.variant,T=void 0===z?"inherit":z,N=r.sx,_=(0,i.Z)(r,C),M=(0,m.Z)(),A=M.isFocusVisibleRef,V=M.onBlur,F=M.onFocus,H=M.ref,L=l.useState(!1),O=(0,o.Z)(L,2),R=O[0],E=O[1],B=(0,x.Z)(n,H),I=(0,s.Z)({},r,{color:y,component:v,focusVisible:R,underline:P,variant:T}),W=function(e){var n=e.classes,r=e.component,t=e.focusVisible,o=e.underline,a={root:["root","underline".concat((0,p.Z)(o)),"button"===r&&"button",t&&"focusVisible"]};return(0,d.Z)(a,f,n)}(I);return(0,D.jsx)(S,(0,s.Z)({color:y,className:(0,c.Z)(W.root,a),classes:j,component:v,onBlur:function(e){V(e),!1===A.current&&E(!1),g&&g(e)},onFocus:function(e){F(e),!0===A.current&&E(!0),b&&b(e)},ref:B,ownerState:I,variant:T,sx:[].concat((0,t.Z)(Object.keys(w).includes(y)?[]:[{color:y}]),(0,t.Z)(Array.isArray(N)?N:[N]))},_))}))}}]);