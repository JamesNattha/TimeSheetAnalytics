"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[2231],{2231:function(n,r,e){e.r(r);var t=e(74165),a=e(15861),o=e(29439),s=e(47313),i=e(57829),c=e(65033),l=e(47131),u=e(66835),d=e(57861),Z=e(67478),h=e(51629),x=e(23477),j=e(24076),m=e(61113),p=e(70501),f=e(29428),v=e(3665),b=e(84897),w=e(46417);function g(n){var r=n.row,e=(0,s.useState)(!1),t=(0,o.Z)(e,2),a=t[0],h=t[1];return(0,w.jsxs)(s.Fragment,{children:[(0,w.jsxs)(j.Z,{sx:{"& > *":{borderBottom:"unset"}},children:[(0,w.jsx)(Z.Z,{children:(0,w.jsx)(l.Z,{"aria-label":"expand row",size:"small",onClick:function(){return h(!a)},children:a?(0,w.jsx)(v.Z,{}):(0,w.jsx)(f.Z,{})})}),(0,w.jsx)(Z.Z,{component:"th",scope:"row",children:r.name})]}),(0,w.jsx)(j.Z,{children:(0,w.jsx)(Z.Z,{style:{paddingBottom:0,paddingTop:0},colSpan:6,children:(0,w.jsx)(c.Z,{in:a,timeout:"auto",unmountOnExit:!0,children:(0,w.jsxs)(i.Z,{sx:{margin:1},children:[(0,w.jsx)(m.Z,{variant:"h6",gutterBottom:!0,component:"div",children:"History"}),(0,w.jsxs)(u.Z,{size:"small","aria-label":"purchases",children:[(0,w.jsx)(x.Z,{children:(0,w.jsxs)(j.Z,{children:[(0,w.jsx)(Z.Z,{children:"Date"}),(0,w.jsx)(Z.Z,{children:"Customer"}),(0,w.jsx)(Z.Z,{align:"right",children:"Amount"}),(0,w.jsx)(Z.Z,{align:"right",children:"Total price ($)"})]})}),(0,w.jsx)(d.Z,{children:r.history&&r.history.map((function(n){return(0,w.jsxs)(j.Z,{children:[(0,w.jsx)(Z.Z,{component:"th",scope:"row",children:n.date}),(0,w.jsx)(Z.Z,{children:n.customerId}),(0,w.jsx)(Z.Z,{align:"right",children:n.amount}),(0,w.jsx)(Z.Z,{align:"right",children:Math.round(n.amount*r.price*100)/100})]},n.date)}))})]})]})})})})]})}r.default=function(){var n=(0,s.useState)([]),r=(0,o.Z)(n,2),e=r[0],i=r[1],c=function(){var n=(0,a.Z)((0,t.Z)().mark((function n(){var r,e;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,b.Z.monday.fetchGroups();case 3:r=n.sent,e=r.data,r.isStatus&&i(e),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),console.error(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(){return n.apply(this,arguments)}}();return(0,s.useEffect)((function(){c()}),[]),console.log("data \u0e02\u0e49\u0e32\u0e07\u0e43\u0e19",e),(0,w.jsx)(h.Z,{component:p.Z,children:(0,w.jsxs)(u.Z,{"aria-label":"collapsible table",children:[(0,w.jsx)(x.Z,{children:(0,w.jsxs)(j.Z,{children:[(0,w.jsx)(Z.Z,{}),(0,w.jsx)(Z.Z,{children:"Project of Name"})]})}),(0,w.jsx)(d.Z,{children:e.data&&e.data.boards.map((function(n){return(0,w.jsx)(g,{row:n},n.name)}))})]})})}},29428:function(n,r,e){var t=e(64836);r.Z=void 0;var a=t(e(45045)),o=e(46417),s=(0,a.default)((0,o.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");r.Z=s},3665:function(n,r,e){var t=e(64836);r.Z=void 0;var a=t(e(45045)),o=e(46417),s=(0,a.default)((0,o.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");r.Z=s},51629:function(n,r,e){e.d(r,{Z:function(){return m}});var t=e(87462),a=e(63366),o=e(47313),s=e(2197),i=e(21921),c=e(77342),l=e(17592),u=e(77430),d=e(32298);function Z(n){return(0,d.Z)("MuiTableContainer",n)}(0,u.Z)("MuiTableContainer",["root"]);var h=e(46417),x=["className","component"],j=(0,l.ZP)("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:function(n,r){return r.root}})({width:"100%",overflowX:"auto"}),m=o.forwardRef((function(n,r){var e=(0,c.Z)({props:n,name:"MuiTableContainer"}),o=e.className,l=e.component,u=void 0===l?"div":l,d=(0,a.Z)(e,x),m=(0,t.Z)({},e,{component:u}),p=function(n){var r=n.classes;return(0,i.Z)({root:["root"]},Z,r)}(m);return(0,h.jsx)(j,(0,t.Z)({ref:r,as:u,className:(0,s.Z)(p.root,o),ownerState:m},d))}))}}]);