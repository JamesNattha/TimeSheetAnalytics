"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[9834],{22889:function(e,s,r){var n=r(47313);s.Z=function(){var e=(0,n.useRef)(!0);return(0,n.useEffect)((function(){return function(){e.current=!1}}),[]),e}},39834:function(e,s,r){r.r(s),r.d(s,{default:function(){return M}});var n=r(47313),t=r(9019),i=r(42832),o=r(61113),a=r(54285),c=r(262),l=r(74165),d=r(15861),u=r(29439),m=r(58467),x=r(2135),h=r(15103),g=r(49914),p=r(41727),Z=r(15480),f=r(83929),j=r(44758),b=r(90891),w=r(31095),v=r(3463),F=r(7410),y=r(22889),S=(r(18585),r(94044)),k=r(51404),P=r(31741),C=r(44874),B=r(11163),L=r(58711),R=(r(84897),r(30078)),T=r(80771),E=r(36287),I=r(67114),_=r.n(I),D=(r(15826),r(46417)),V=function(){var e=n.useState(!1),s=(0,u.Z)(e,2),r=s[0],c=s[1],I=n.useState(!1),V=(0,u.Z)(I,2),q=V[0],z=V[1],A=(0,R.FV)(T.cz),W=(0,u.Z)(A,2),H=W[0],M=W[1],K=(0,a.Z)(),Y=(K.isLoggedIn,K.apiLogin),J=(0,y.Z)(),N=n.useState(!1),U=(0,u.Z)(N,2),G=U[0],O=U[1],Q=n.useState(!1),X=(0,u.Z)(Q,2),$=X[0],ee=X[1],se=(0,R.FV)(T.zV),re=(0,u.Z)(se,2),ne=(re[0],re[1],(0,m.s0)()),te=function(){ee(!$)},ie=function(e){e.preventDefault()},oe=function(e){e.getModifierState("CapsLock")?z(!0):z(!1)},ae=E.ZP.defaultPath;return(0,n.useEffect)((function(){"true"===localStorage.getItem("isLoggedIn")&&ne(ae),c(H.isRemember)}),[ae,ne,H.isRemember]),(0,D.jsx)(D.Fragment,{children:(0,D.jsx)(F.J9,{initialValues:{username:H.username,password:H.password,submit:null},validationSchema:v.Ry().shape({username:v.Z_().max(255).required("Email is required"),password:v.Z_().max(255).required("Password is required")}),onSubmit:function(){var e=(0,d.Z)((0,l.Z)().mark((function e(s,n){var t,i,o,a,c;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.setErrors,i=n.setStatus,o=n.setSubmitting,e.prev=1,O(!0),e.next=5,Y(s);case 5:a=e.sent,i({success:a.isStatus}),console.log("login in Login page",a),o(a.isStatus),a.isStatus?(c=E.ZP.defaultPath,localStorage.setItem("isLoggedIn",a.isStatus),M(r?{isRemember:!0,username:s.username,password:s.password,role:s.role}:{isRemember:!1,username:"",password:"",role:""}),ne(c)):"This account is not active"==a?_().fire({title:"Login failed",text:"This account is not active",confirmButtonText:"Try again",customClass:{confirmButton:"rounded-button "},iconHtml:'<div class="discard-icon"></div>'}):"it's Not your Time"===a.message?_().fire({title:"Login failed",text:"You can't login at this time",confirmButtonText:"Try again",customClass:{confirmButton:"rounded-button "},iconHtml:'<div class="discard-icon"></div>'}):_().fire({title:"Login failed",text:"Your password or email is incorrect",confirmButtonText:"Try again",customClass:{confirmButton:"rounded-button "},iconHtml:'<div class="discard-icon"></div>'}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),J.current&&(i({success:!1}),t({submit:e.t0.message}),o(!1));case 15:return e.prev=15,O(!1),e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[1,12,15,18]])})));return function(s,r){return e.apply(this,arguments)}}(),children:function(e){var s=e.errors,n=e.handleBlur,a=e.handleChange,l=e.handleSubmit,d=e.isSubmitting,u=e.touched,m=e.values;return(0,D.jsx)("form",{noValidate:!0,onSubmit:l,children:(0,D.jsxs)(t.ZP,{container:!0,spacing:3,children:[(0,D.jsx)(t.ZP,{item:!0,xs:12,children:(0,D.jsxs)(i.Z,{spacing:1,children:[(0,D.jsxs)(h.Z,{htmlFor:"email-login",children:["Email",(0,D.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,D.jsx)(g.Z,{id:"email-login",type:"text",value:m.username,name:"username",onBlur:n,onChange:a,placeholder:"Enter email address",fullWidth:!0,sx:{borderRadius:"30px",backgroundColor:"#F3F4F6"},error:Boolean(u.username&&s.username),startAdornment:(0,D.jsx)(p.Z,{position:"start",children:(0,D.jsx)(S.Z,{"aria-label":"toggle password visibility",edge:"end",color:"secondary",disabled:!0,children:(0,D.jsx)(B.Z,{})})})}),u.username&&s.username&&(0,D.jsx)(Z.Z,{error:!0,id:"standard-weight-helper-text-email-login",children:s.username})]})}),(0,D.jsx)(t.ZP,{item:!0,xs:12,children:(0,D.jsxs)(i.Z,{spacing:1,children:[(0,D.jsxs)(h.Z,{htmlFor:"password-login",children:["Password",(0,D.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,D.jsx)(g.Z,{fullWidth:!0,color:q?"warning":"primary",error:Boolean(u.password&&s.password),id:"-password-login",type:$?"text":"password",value:m.password,name:"password",sx:{borderRadius:"30px",backgroundColor:"#F3F4F6"},onBlur:function(e){z(!1),n(e)},onKeyDown:oe,onChange:a,startAdornment:(0,D.jsx)(p.Z,{position:"start",children:(0,D.jsx)(S.Z,{"aria-label":"toggle password visibility",edge:"end",disabled:!0,color:"secondary",children:(0,D.jsx)(L.Z,{})})}),endAdornment:(0,D.jsx)(p.Z,{position:"end",children:(0,D.jsx)(S.Z,{"aria-label":"toggle password visibility",onClick:te,onMouseDown:ie,edge:"end",color:"secondary",children:$?(0,D.jsx)(P.Z,{}):(0,D.jsx)(C.Z,{})})}),placeholder:"Enter password"}),q&&(0,D.jsx)(o.Z,{variant:"caption",sx:{color:"warning.main"},id:"warning-helper-text-password-login",children:"Caps lock on!"}),u.password&&s.password&&(0,D.jsx)(Z.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:s.password})]})}),(0,D.jsx)(t.ZP,{item:!0,xs:12,sx:{mt:-1},children:(0,D.jsxs)(i.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",spacing:2,children:[(0,D.jsx)(f.Z,{control:(0,D.jsx)(j.Z,{checked:r,onChange:function(e){c(e.target.checked),console.log(".target.checked",e.target.checked)},name:"checked",sx:{color:"#0066FF"},size:"small"}),label:(0,D.jsx)(o.Z,{variant:"h6",children:"Keep me sign in"})}),(0,D.jsx)(b.Z,{variant:"h6",component:x.rU,to:"/forgot-password",sx:{color:"#004FD8",textDecoration:"none"},children:"Forgot Password?"})]})}),s.submit&&(0,D.jsx)(t.ZP,{item:!0,xs:12,children:(0,D.jsx)(Z.Z,{error:!0,children:s.submit})}),(0,D.jsx)(t.ZP,{item:!0,xs:12,children:(0,D.jsx)(k.Z,{children:(0,D.jsx)(w.Z,{disableElevation:!0,disabled:d||G,fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{borderRadius:"30px",bgcolor:"#393939",color:"#FFFFFF","&:hover":{bgcolor:"#393939"}},children:"Login"})})})]})})}})})},q=r(38743),z=r(15862),A=r(19860),W=function(e){e.reverse,(0,A.Z)();return(0,D.jsx)(D.Fragment,{children:(0,D.jsx)("img",{src:z,alt:"Mantis",width:"200px"})})},H=function(e){e.reverse,e.isIcon;var s=e.sx;e.to;return(0,D.jsx)(q.Z,{disableRipple:!0,sx:s,children:(0,D.jsx)(W,{})})},M=function(){return(0,D.jsx)(c.Z,{children:(0,D.jsxs)(t.ZP,{container:!0,spacing:3,children:[(0,D.jsx)(t.ZP,{item:!0,xs:12,children:(0,D.jsxs)(i.Z,{direction:"column",alignItems:"center",sx:{mb:{xs:-.5,sm:.5}},children:[(0,D.jsx)(H,{}),(0,D.jsx)(o.Z,{variant:"h3",sx:{textAlign:"center",fontWeight:500,mt:2},children:"Login"})]})}),(0,D.jsx)(t.ZP,{item:!0,xs:12,children:(0,D.jsx)(V,{})})]})})}}}]);