"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[5593],{10392:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(1413),o=a(47313),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 248H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"}}]},name:"camera",theme:"outlined"},r=a(20262),s=function(e,t){return o.createElement(r.Z,(0,n.Z)((0,n.Z)({},e),{},{ref:t,icon:i}))};s.displayName="CameraOutlined";var c=o.forwardRef(s)},51824:function(e,t,a){a.d(t,{Z:function(){return Z}});var n=a(63366),o=a(87462),i=a(47313),r=a(2197),s=a(21921),c=a(17592),d=a(77342),l=a(51195),u=a(77430),p=a(32298);function m(e){return(0,p.Z)("MuiListItemSecondaryAction",e)}(0,u.Z)("MuiListItemSecondaryAction",["root","disableGutters"]);var v=a(46417),b=["className"],g=(0,c.ZP)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.disableGutters&&t.disableGutters]}})((function(e){var t=e.ownerState;return(0,o.Z)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0})})),f=i.forwardRef((function(e,t){var a=(0,d.Z)({props:e,name:"MuiListItemSecondaryAction"}),c=a.className,u=(0,n.Z)(a,b),p=i.useContext(l.Z),f=(0,o.Z)({},a,{disableGutters:p.disableGutters}),Z=function(e){var t=e.disableGutters,a=e.classes,n={root:["root",t&&"disableGutters"]};return(0,s.Z)(n,m,a)}(f);return(0,v.jsx)(g,(0,o.Z)({className:(0,r.Z)(Z.root,c),ownerState:f,ref:t},u))}));f.muiName="ListItemSecondaryAction";var Z=f},60194:function(e,t,a){a.d(t,{ZP:function(){return N}});var n=a(4942),o=a(63366),i=a(87462),r=a(47313),s=a(2197),c=a(21921),d=a(43066),l=a(17551),u=a(17592),p=a(77342),m=a(38743),v=a(27816),b=a(24993),g=a(86983),f=a(51195),Z=a(77430),h=a(32298);function y(e){return(0,h.Z)("MuiListItem",e)}var C=(0,Z.Z)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]),x=a(55618),S=a(51824),I=a(46417),A=["className"],P=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],w=(0,u.ZP)("div",{name:"MuiListItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,"flex-start"===a.alignItems&&t.alignItemsFlexStart,a.divider&&t.divider,!a.disableGutters&&t.gutters,!a.disablePadding&&t.padding,a.button&&t.button,a.hasSecondaryAction&&t.secondaryAction]}})((function(e){var t,a=e.theme,o=e.ownerState;return(0,i.Z)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!o.disablePadding&&(0,i.Z)({paddingTop:8,paddingBottom:8},o.dense&&{paddingTop:4,paddingBottom:4},!o.disableGutters&&{paddingLeft:16,paddingRight:16},!!o.secondaryAction&&{paddingRight:48}),!!o.secondaryAction&&(0,n.Z)({},"& > .".concat(x.Z.root),{paddingRight:48}),(t={},(0,n.Z)(t,"&.".concat(C.focusVisible),{backgroundColor:(a.vars||a).palette.action.focus}),(0,n.Z)(t,"&.".concat(C.selected),(0,n.Z)({backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(C.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),(0,n.Z)(t,"&.".concat(C.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity}),t),"flex-start"===o.alignItems&&{alignItems:"flex-start"},o.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},o.button&&(0,n.Z)({transition:a.transitions.create("background-color",{duration:a.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(C.selected,":hover"),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),o.hasSecondaryAction&&{paddingRight:48})})),G=(0,u.ZP)("li",{name:"MuiListItem",slot:"Container",overridesResolver:function(e,t){return t.container}})({position:"relative"}),N=r.forwardRef((function(e,t){var a=(0,p.Z)({props:e,name:"MuiListItem"}),n=a.alignItems,l=void 0===n?"center":n,u=a.autoFocus,Z=void 0!==u&&u,h=a.button,x=void 0!==h&&h,N=a.children,O=a.className,R=a.component,k=a.components,L=void 0===k?{}:k,M=a.componentsProps,F=void 0===M?{}:M,V=a.ContainerComponent,j=void 0===V?"li":V,z=a.ContainerProps,H=(void 0===z?{}:z).className,q=a.dense,B=void 0!==q&&q,_=a.disabled,D=void 0!==_&&_,T=a.disableGutters,X=void 0!==T&&T,E=a.disablePadding,Y=void 0!==E&&E,J=a.divider,K=void 0!==J&&J,Q=a.focusVisibleClassName,U=a.secondaryAction,W=a.selected,$=void 0!==W&&W,ee=a.slotProps,te=void 0===ee?{}:ee,ae=a.slots,ne=void 0===ae?{}:ae,oe=(0,o.Z)(a.ContainerProps,A),ie=(0,o.Z)(a,P),re=r.useContext(f.Z),se=r.useMemo((function(){return{dense:B||re.dense||!1,alignItems:l,disableGutters:X}}),[l,re.dense,B,X]),ce=r.useRef(null);(0,b.Z)((function(){Z&&ce.current&&ce.current.focus()}),[Z]);var de=r.Children.toArray(N),le=de.length&&(0,v.Z)(de[de.length-1],["ListItemSecondaryAction"]),ue=(0,i.Z)({},a,{alignItems:l,autoFocus:Z,button:x,dense:se.dense,disabled:D,disableGutters:X,disablePadding:Y,divider:K,hasSecondaryAction:le,selected:$}),pe=function(e){var t=e.alignItems,a=e.button,n=e.classes,o=e.dense,i=e.disabled,r={root:["root",o&&"dense",!e.disableGutters&&"gutters",!e.disablePadding&&"padding",e.divider&&"divider",i&&"disabled",a&&"button","flex-start"===t&&"alignItemsFlexStart",e.hasSecondaryAction&&"secondaryAction",e.selected&&"selected"],container:["container"]};return(0,c.Z)(r,y,n)}(ue),me=(0,g.Z)(ce,t),ve=ne.root||L.Root||w,be=te.root||F.root||{},ge=(0,i.Z)({className:(0,s.Z)(pe.root,be.className,O),disabled:D},ie),fe=R||"li";return x&&(ge.component=R||"div",ge.focusVisibleClassName=(0,s.Z)(C.focusVisible,Q),fe=m.Z),le?(fe=ge.component||R?fe:"div","li"===j&&("li"===fe?fe="div":"li"===ge.component&&(ge.component="div")),(0,I.jsx)(f.Z.Provider,{value:se,children:(0,I.jsxs)(G,(0,i.Z)({as:j,className:(0,s.Z)(pe.container,H),ref:me,ownerState:ue},oe,{children:[(0,I.jsx)(ve,(0,i.Z)({},be,!(0,d.X)(ve)&&{as:fe,ownerState:(0,i.Z)({},ue,be.ownerState)},ge,{children:de})),de.pop()]}))})):(0,I.jsx)(f.Z.Provider,{value:se,children:(0,I.jsxs)(ve,(0,i.Z)({},be,{as:fe,ref:me},!(0,d.X)(ve)&&{ownerState:(0,i.Z)({},ue,be.ownerState)},ge,{children:[de,U&&(0,I.jsx)(S.Z,{children:U})]}))})}))}}]);