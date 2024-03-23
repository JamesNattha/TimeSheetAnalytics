"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[9056],{99056:function(e,s,r){r.r(s);var n=r(74165),t=r(15861),a=r(29439),o=r(47313),i=r(56352),d=r(61113),l=r(19536),c=r(9019),p=r(42832),u=r(15103),h=r(24631),m=r(41727),w=r(15480),x=r(31095),v=r(41412),f=r(94044),Z=(r(18530),r(58711)),g=r(3463),b=r(7410),j=r(84897),y=r(67114),C=r.n(y),P=r(31741),E=r(44874),z=r(46417),S=g.Ry().shape({oldpassword:g.Z_().required("Current Password is required"),newpassword:g.Z_().max(255).min(8,"New password must contain english letters and numbers. At least 8 Charaters, 1 uppercase letter, 1 number and 1 special characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,"New password must contain English letters, numbers, and at least 1 special character (excluding periods)").required("New password is required").matches(/[A-Z]/,"New password must contain at least 1 uppercase letter").matches(/\d/,"New password must contain at least 1 number"),confirmpassword:g.Z_().required("Confirm Password is required").when("newpassword",{is:function(e){return!!(e&&e.length>0)},then:g.Z_().oneOf([g.iH("newpassword")],"Confirm password must be exactly the same with the new password")})});s.default=function(){(0,i.I0)();var e=(0,o.useState)(!1),s=(0,a.Z)(e,2),r=s[0],g=s[1],y=(0,o.useState)(!1),A=(0,a.Z)(y,2),R=A[0],I=A[1],L=(0,o.useState)(!1),B=(0,a.Z)(L,2),M=B[0],N=B[1],k=function(e){e.preventDefault()},T=function(){var e=(0,t.Z)((0,n.Z)().mark((function e(){var s,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Inter is NOT THERE"),s={currentpassword:q.values.oldpassword,newpassword:q.values.newpassword},console.log("changePass",s),e.prev=3,e.next=6,j.Z.profile.changePassword(s);case 6:r=e.sent,console.log("result",r),r.isStatus?(C().fire({title:"Success",customClass:{popup:"modal-success","swal2-icon.swal2-icon-content":"margin-top: 0px !important"},text:"Your password has been successfully changed",showConfirmButton:!1,iconHtml:'<div class="success-icon"></div>'}),q.resetForm()):r.isStatus||"Wrong Current Password Combination"!==r.message?C().fire({title:"Failed",timer:2e3,customClass:"modal-success",showConfirmButton:!1,iconHtml:'<div class="discard-icon"></div>'}):C().fire({title:"Failed",timer:2e3,customClass:"modal-success",text:"Your current password is wrong combination",showConfirmButton:!1,iconHtml:'<div class="discard-icon"></div>'}),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(3),console.error("Error uploading profile settings:",e.t0),C().fire({title:"WTF",timer:2e3,customClass:"modal-success",showConfirmButton:!1,iconHtml:'<div class="discard-icon"></div>'});case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}(),q=(0,b.TA)({initialValues:{oldpassword:"",newpassword:"",confirmpassword:""},validationSchema:S,onSubmit:T}),F=q.errors,H=q.touched,_=(q.getFieldProps,q.handleSubmit),D=(q.setFieldValue,q.handleBlur),V=q.handleChange;return(0,z.jsx)("div",{children:(0,z.jsxs)(v.Z,{children:[(0,z.jsx)(d.Z,{variant:"h4",sx:{my:"14px",display:"flex",flexDirection:"row",alignItems:"center"},children:(0,z.jsx)("span",{style:{flex:1,display:"flex",alignItems:"center"},children:"Change Password"})}),(0,z.jsx)(l.Z,{sx:{mb:"14px"}}),(0,z.jsx)("form",{onSubmit:_,children:(0,z.jsxs)(c.ZP,{container:!0,spacing:3,children:[(0,z.jsxs)(c.ZP,{item:!0,container:!0,spacing:3,xs:12,sm:6,children:[(0,z.jsx)(c.ZP,{item:!0,xs:12,children:(0,z.jsxs)(p.Z,{spacing:1.25,children:[(0,z.jsxs)(u.Z,{htmlFor:"password-reset",children:["Current password",(0,z.jsx)("div",{style:{color:"red",display:"inline"},children:" *"})]}),(0,z.jsx)(h.Z,{fullWidth:!0,helperText:H.oldpassword&&F.oldpassword,error:Boolean(H.oldpassword&&F.oldpassword),id:"password-reset",type:r?"text":"password",value:q.values.oldpassword,name:"oldpassword",onBlur:D,onChange:V,InputProps:{style:{borderRadius:"30px "},startAdornment:(0,z.jsx)(m.Z,{position:"start",children:(0,z.jsx)(f.Z,{"aria-label":"toggle password visibility",edge:"end",color:"secondary",disabled:!0,children:(0,z.jsx)(Z.Z,{})})}),endAdornment:(0,z.jsx)(m.Z,{position:"end",children:(0,z.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:function(){g(!r)},onMouseDown:k,edge:"end",color:"secondary",children:r?(0,z.jsx)(P.Z,{}):(0,z.jsx)(E.Z,{})})})},sx:{borderRadius:"30px"},placeholder:"Enter password"})]})}),(0,z.jsx)(c.ZP,{item:!0,xs:12,children:(0,z.jsxs)(p.Z,{spacing:1.25,children:[(0,z.jsxs)(u.Z,{htmlFor:"password-reset",children:["New password",(0,z.jsx)("div",{style:{color:"red",display:"inline"},children:" *"})]}),(0,z.jsx)(h.Z,{fullWidth:!0,helperText:H.newpassword&&F.newpassword,error:Boolean(H.newpassword&&F.newpassword),id:"password-reset",type:R?"text":"password",value:q.values.newpassword,name:"newpassword",onBlur:D,onChange:V,sx:{borderRadius:"30px"},InputProps:{style:{borderRadius:"30px "},startAdornment:(0,z.jsx)(m.Z,{position:"start",children:(0,z.jsx)(f.Z,{"aria-label":"toggle password visibility",edge:"end",color:"secondary",disabled:!0,children:(0,z.jsx)(Z.Z,{})})}),endAdornment:(0,z.jsx)(m.Z,{position:"end",children:(0,z.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:function(){I(!R)},onMouseDown:k,edge:"end",color:"secondary",children:R?(0,z.jsx)(P.Z,{}):(0,z.jsx)(E.Z,{})})})},placeholder:"Enter password"}),!F.newpassword&&!H.newpassword&&(0,z.jsx)(w.Z,{id:"helper-text-password",children:"Password must contain english letters and numbers. At least 8 Charaters, 1 uppercase letter, 1 number and 1 special characters"})]})}),(0,z.jsx)(c.ZP,{item:!0,xs:12,children:(0,z.jsxs)(p.Z,{spacing:1.25,children:[(0,z.jsxs)(u.Z,{htmlFor:"confirm-password-reset",children:["Confirm password",(0,z.jsx)("div",{style:{color:"red",display:"inline"},children:" *"})]}),(0,z.jsx)(h.Z,{fullWidth:!0,helperText:H.confirmpassword&&F.confirmpassword,error:Boolean(H.confirmpassword&&F.confirmpassword),id:"confirm-password-reset",type:M?"text":"password",value:q.values.confirmpassword,name:"confirmpassword",sx:{borderRadius:"30px"},onBlur:D,onChange:V,InputProps:{style:{borderRadius:"30px "},startAdornment:(0,z.jsx)(m.Z,{position:"start",children:(0,z.jsx)(f.Z,{"aria-label":"toggle password visibility",edge:"end",color:"secondary",disabled:!0,children:(0,z.jsx)(Z.Z,{})})}),endAdornment:(0,z.jsx)(m.Z,{position:"end",children:(0,z.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:function(){N(!M)},onMouseDown:k,edge:"end",color:"secondary",children:M?(0,z.jsx)(P.Z,{}):(0,z.jsx)(E.Z,{})})})},placeholder:"Enter confirm password"}),!F.confirmpassword&&!H.confirmpassword&&(0,z.jsx)(w.Z,{id:"helper-text-password",children:"The confirm password must be exactly the same with the new password"})]})})]}),(0,z.jsx)(c.ZP,{item:!0,xs:12,children:(0,z.jsx)(p.Z,{direction:"row",justifyContent:"flex-start",alignItems:"center",spacing:2,children:(0,z.jsx)(x.Z,{variant:"contained",type:"submit",sx:{backgroundColor:"#393939",borderRadius:"40px",width:"170px",height:"40px","&:hover":{backgroundColor:"#242424"}},children:"Change Password"})})})]})})]})})}},44874:function(e,s,r){r.d(s,{Z:function(){return d}});var n=r(1413),t=r(47313),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"},o=r(20262),i=function(e,s){return t.createElement(o.Z,(0,n.Z)((0,n.Z)({},e),{},{ref:s,icon:a}))};i.displayName="EyeInvisibleOutlined";var d=t.forwardRef(i)},31741:function(e,s,r){r.d(s,{Z:function(){return d}});var n=r(1413),t=r(47313),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},o=r(20262),i=function(e,s){return t.createElement(o.Z,(0,n.Z)((0,n.Z)({},e),{},{ref:s,icon:a}))};i.displayName="EyeOutlined";var d=t.forwardRef(i)},58711:function(e,s,r){var n=r(64836);s.Z=void 0;var t=n(r(45045)),a=r(46417),o=(0,t.default)((0,a.jsx)("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");s.Z=o},41727:function(e,s,r){r.d(s,{Z:function(){return y}});var n=r(4942),t=r(63366),a=r(87462),o=r(47313),i=r(2197),d=r(21921),l=r(91615),c=r(61113),p=r(91397),u=r(99008),h=r(17592),m=r(77430),w=r(32298);function x(e){return(0,w.Z)("MuiInputAdornment",e)}var v,f=(0,m.Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),Z=r(77342),g=r(46417),b=["children","className","component","disablePointerEvents","disableTypography","position","variant"],j=(0,h.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,s){var r=e.ownerState;return[s.root,s["position".concat((0,l.Z)(r.position))],!0===r.disablePointerEvents&&s.disablePointerEvents,s[r.variant]]}})((function(e){var s=e.theme,r=e.ownerState;return(0,a.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(s.vars||s).palette.action.active},"filled"===r.variant&&(0,n.Z)({},"&.".concat(f.positionStart,"&:not(.").concat(f.hiddenLabel,")"),{marginTop:16}),"start"===r.position&&{marginRight:8},"end"===r.position&&{marginLeft:8},!0===r.disablePointerEvents&&{pointerEvents:"none"})})),y=o.forwardRef((function(e,s){var r=(0,Z.Z)({props:e,name:"MuiInputAdornment"}),n=r.children,h=r.className,m=r.component,w=void 0===m?"div":m,f=r.disablePointerEvents,y=void 0!==f&&f,C=r.disableTypography,P=void 0!==C&&C,E=r.position,z=r.variant,S=(0,t.Z)(r,b),A=(0,u.Z)()||{},R=z;z&&A.variant,A&&!R&&(R=A.variant);var I=(0,a.Z)({},r,{hiddenLabel:A.hiddenLabel,size:A.size,disablePointerEvents:y,position:E,variant:R}),L=function(e){var s=e.classes,r=e.disablePointerEvents,n=e.hiddenLabel,t=e.position,a=e.size,o=e.variant,i={root:["root",r&&"disablePointerEvents",t&&"position".concat((0,l.Z)(t)),o,n&&"hiddenLabel",a&&"size".concat((0,l.Z)(a))]};return(0,d.Z)(i,x,s)}(I);return(0,g.jsx)(p.Z.Provider,{value:null,children:(0,g.jsx)(j,(0,a.Z)({as:w,ownerState:I,className:(0,i.Z)(L.root,h),ref:s},S,{children:"string"!==typeof n||P?(0,g.jsxs)(o.Fragment,{children:["start"===E?v||(v=(0,g.jsx)("span",{className:"notranslate",children:"\u200b"})):null,n]}):(0,g.jsx)(c.Z,{color:"text.secondary",children:n})}))})}))}}]);