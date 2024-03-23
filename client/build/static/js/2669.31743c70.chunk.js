"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[2669],{75761:function(e,t,n){var o=n(1413),r=n(29439),i=n(47313),a=n(19860),s=n(17551),d=n(61689),c=(n(57829),n(42832)),l=n(70501),u=n(49914),p=n(31095),m=n(1550),h=n(23931),x=n(51405),f=n(66835),v=n(23477),Z=n(24076),g=n(67478),b=n(57861),_=n(94044),C=n(10259),j=n(1309),w=n(45110),y=n(35397),S=n(7519),B=(n(67440),n(5186),n(40765)),P=n(46417);t.Z=function(e){var t=e.columns,n=e.data,k=e.getHeaderProps,R=e.renderRowSubComponent,D=e.handleAdd,H=e.nameCreateButton,F=e.sortColumn,T=e.isExpand,E=e.expandPage,N=(e.permission,(0,a.Z)()),M=(0,i.useMemo)((function(){return y.KR}),[]),z={id:F,desc:!1},A=(0,w.useTable)({columns:t,data:n,filterTypes:M,initialState:{pageIndex:0,pageSize:10,hiddenColumns:t.filter((function(e){return e.hidden})).map((function(e){return e.accessor})),sortBy:[z]}},w.useGlobalFilter,w.useFilters,w.useSortBy,w.useExpanded,w.usePagination,w.useRowSelect),I=A.getTableProps,G=A.getTableBodyProps,U=A.headerGroups,W=A.prepareRow,O=(A.setHiddenColumns,A.allColumns,A.visibleColumns),V=(A.getToggleAllPageRowsSelectedProps,A.rows),q=A.page,K=A.gotoPage,L=A.setPageSize,Y=A.state,J=(Y.globalFilter,Y.selectedRowIds),Q=Y.pageIndex,X=Y.pageSize,$=A.preGlobalFilteredRows,ee=A.setGlobalFilter,te=A.setSortBy,ne=(0,i.useState)({}),oe=(0,r.Z)(ne,2),re=(oe[0],oe[1],(0,i.useState)("")),ie=(0,r.Z)(re,2),ae=ie[0],se=ie[1],de=$.length,ce=(0,i.useState)(1),le=(0,r.Z)(ce,2),ue=le[0],pe=le[1];return(0,P.jsx)(P.Fragment,{children:(0,P.jsxs)("div",{children:[(0,P.jsx)(S.c,{selected:Object.keys(J).length}),(0,P.jsxs)(c.Z,{spacing:2,children:[(0,P.jsx)(l.Z,{variant:"outlined",sx:{py:1,boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.1)",border:"1px solid #ccc",borderRadius:"10px"},children:(0,P.jsxs)("div",{style:{display:"flex",padding:"5px 10px 5px 10px",alignItems:"center"},children:[(0,P.jsx)(u.Z,{id:"start-adornment-email",placeholder:"Type something (".concat(de," Records)"),startAdornment:(0,P.jsx)(B.Z,{}),fullWidth:!0,value:ae,onChange:function(e){return se(e.target.value)},sx:{borderRadius:20,backgroundColor:"#F3F4F6"}}),(0,P.jsxs)(p.Z,{variant:"contained",sx:{width:"150px",margin:"5px",borderRadius:"40px",height:"37px",backgroundColor:"#232323","&::after":{boxShadow:"0 0 5px 5px rgba(0, 0, 0, 0.9)",borderRadius:"40px"},"&:hover":{backgroundColor:"#686868 !important"}},onClick:function(){ee(ae)},children:[(0,P.jsx)(C.G,{icon:j.wn1,style:{fontSize:"15px"}}),"Search"]}),(0,P.jsx)(_.Z,{shape:"rounded",variant:"contained",style:{margin:"5px",backgroundColor:"#232323"},onClick:function(){ee(""),se("")},sx:{"&:hover":{backgroundColor:"#686868 !important"}},children:(0,P.jsx)(C.G,{icon:j.jHE})})]})}),(0,P.jsx)(l.Z,{variant:"outlined",sx:{py:1,boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.1)",border:"1px solid #ccc",borderRadius:"10px"},children:(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-end"},children:[(0,P.jsx)("div",{style:{marginRight:"5px"},children:(0,P.jsx)(m.Z,{sx:{minWidth:120},children:(0,P.jsxs)(h.Z,{displayEmpty:!0,inputProps:{"aria-label":"Without label"},sx:{borderRadius:"40px",width:"300px",backgroundColor:"#F3F4F6",padding:"0 0 0 10px","&:hover":{borderColor:"#686868 !important",color:"#686868"}},value:ue,onChange:function(e){pe(e.target.value),1===e.target.value?te([{id:F,desc:!1}]):te([{id:F,desc:!0}])},children:[(0,P.jsx)(x.Z,{value:1,children:"Sort by the oldest"}),(0,P.jsx)(x.Z,{value:2,children:"Sort by the newest"})]})})}),(0,P.jsx)("div",{style:{display:"flex",padding:"5px 7px 5px 7px",alignItems:"center"},children:(0,P.jsxs)(p.Z,{onClick:D,variant:"outlined",sx:{width:"150px",marginRight:"10px",height:"auto",borderRadius:"40px",borderColor:"#232323",color:"#232323","&:hover":{borderColor:"#686868 !important",color:"#686868"}},children:["+ ",H]})})]})}),T?(0,P.jsx)(l.Z,{variant:"outlined",sx:{py:1,boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.1)",border:"1px solid #ccc",borderRadius:"10px",pt:"14px"},children:E}):null,(0,P.jsx)("div",{style:{borderRadius:"10px",overflow:"hidden",backgroundColor:"#ffffff"},children:(0,P.jsxs)(f.Z,(0,o.Z)((0,o.Z)({},I()),{},{children:[(0,P.jsx)(v.Z,{style:{backgroundColor:"#E0E0E0"},children:U.map((function(e,t){return(0,P.jsx)(Z.Z,(0,o.Z)((0,o.Z)({},e.getHeaderGroupProps()),{},{sx:{"& > th:first-of-type":{width:"58px"}},children:e.headers.map((function(e,t){return(0,P.jsx)(g.Z,(0,o.Z)((0,o.Z)({},e.getHeaderProps([{className:e.className},k(e)])),{},{sx:{width:e.width||"auto",":not(:last-of-type)::after":{position:"inherit "}},children:(0,P.jsx)(S.RL,{column:e})}),t)}))}),t)}))}),(0,P.jsxs)(b.Z,(0,o.Z)((0,o.Z)({},G()),{},{children:[q.map((function(e,t){W(e);var n=e.getRowProps();return(0,P.jsxs)(i.Fragment,{children:[(0,P.jsx)(Z.Z,(0,o.Z)((0,o.Z)({},e.getRowProps()),{},{onClick:function(){e.toggleRowSelected()},sx:{cursor:"pointer",bgcolor:e.isSelected?(0,s.Fq)(N.palette.primary.lighter,.35):"inherit"},children:e.cells.map((function(t,n){return(0,P.jsx)(g.Z,(0,o.Z)((0,o.Z)({},t.getCellProps([{className:t.column.className}])),{},{children:(0,P.jsx)(d.Z,{title:0===n||n===e.cells.length-1?null:t.render("Cell"),arrow:!0,children:(0,P.jsx)("span",{children:t.column.truncate&&t.value.length>t.column.truncate?"".concat(t.value.slice(0,t.column.truncate),"..."):t.render("Cell")})})}),n)}))})),e.isExpanded&&(0,P.jsx)(g.Z,{colSpan:9,sx:{height:"100%",width:"100%"},children:R({row:e,rowProps:n,visibleColumns:O})})]},t)})),(0,P.jsx)(Z.Z,{sx:{"&:hover":{bgcolor:"transparent !important"}},children:(0,P.jsx)(g.Z,{sx:{p:2,py:3},colSpan:9,children:(0,P.jsx)(S.bG,{gotoPage:K,rows:V,setPageSize:L,pageSize:X,pageIndex:Q})})})]}))]}))})]})]})})}},41380:function(e,t,n){n.r(t),n.d(t,{default:function(){return Y}});var o=n(1413),r=n(74165),i=n(15861),a=n(29439),s=n(47313),d=n(94469),c=n(75761),l=n(73842),u=n(84897),p=(n(40750),function(e){var t=e,n=(0,s.useMemo)((function(){var e=[];return t&&t.forEach((function(n,o){if(t.length>0)if(console.log("data person",n),n.Positions.length>1){var r=n.Positions.map((function(e){return e.position_id})),i=n.Positions.map((function(e){return e.position_code})),a=n.Positions.map((function(e){return e.position_name})),s=n.Positions.map((function(e){return e.created_date}));console.log("data client_code",i);var d={department_id:n.department_id,department_code:n.department_code,department_name:n.department_name,created_date:n.created_date,position_id:r,position_code:i,position_name:a,position_date:s,is_disabled:!0,is_active:n.is_active,is_deleted:n.is_deleted};e.push(d)}else{var c,l,u,p,m=n.Positions.length>=1||n.Profiles.length>=1,h={department_id:n.department_id,department_code:n.department_code,department_name:n.department_name,created_date:n.created_date,position_id:null===(c=n.Positions[0])||void 0===c?void 0:c.position_id,position_code:null===(l=n.Positions[0])||void 0===l?void 0:l.position_code,position_name:null===(u=n.Positions[0])||void 0===u?void 0:u.position_name,position_date:null===(p=n.Positions[0])||void 0===p?void 0:p.created_date,is_disabled:m,is_active:n.is_active,is_deleted:n.is_deleted};e.push(h)}})),e}),[t]).slice().sort((function(e,t){return new Date(e.created_date)-new Date(t.created_date)}));return n.forEach((function(e,t){e.autoNumber=t+1})),n}),m=n(51997),h=n(65954),x=n(42832),f=n(61689),v=n(25002),Z=n(51405),g=n(74748),b=n(83213),_=n(94044),C=n(38443),j=n(43997),w=n(46417),y=function(e,t,n){return[{Header:"No.",accessor:"autoNumber",disableSortBy:!0,className:"cell-right"},{Header:"DepartmentId",accessor:"department_id",disableSortBy:!0,hidden:!0},{Header:"Department Code",accessor:"department_code",disableSortBy:!0,width:"20%"},{Header:"Department Name",accessor:"department_name",disableSortBy:!0,width:"70%"},{Header:"Department Date",accessor:"created_date",disableSortBy:!0,hidden:!0},{Header:"have data",accessor:"is_disabled",disableSortBy:!0,hidden:!0},{Header:"Position Code",accessor:"position_code",disableSortBy:!0,hidden:!0},{Header:"Position name",accessor:"position_name",disableSortBy:!0,hidden:!0},{Header:"Position Created",accessor:"position_date",disableSortBy:!0,hidden:!0},{Header:"Actions",className:"cell-center",width:"15%",disableSortBy:!0,Cell:function(o){var r=o.row,i=r.values,d=(r.isExpanded,r.toggleRowExpanded,(0,s.useState)(null)),c=(0,a.Z)(d,2),l=c[0],u=c[1];console.log("data values",i);return(0,w.jsxs)(x.Z,{direction:"row",alignItems:"center",justifyContent:"center",spacing:0,children:[(0,w.jsx)(f.Z,{title:"See More",children:(0,w.jsx)(_.Z,{color:"secondary",onClick:function(e){u(e.currentTarget)},children:(0,w.jsx)(j.Z,{})})}),(0,w.jsxs)(v.ZP,{open:Boolean(l),anchorEl:l,onClose:function(){u(null)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:[(0,w.jsxs)(Z.Z,{onClick:function(n){n.stopPropagation(),t(i),e(i)},children:[(0,w.jsx)(g.Z,{children:(0,w.jsx)(h.Z,{fontSize:"small",sx:{color:"#0066FF"}})}),(0,w.jsx)(b.Z,{primary:"Edit"})]}),(0,w.jsxs)(Z.Z,{disabled:i.is_disabled,onClick:function(){n(i)},children:[(0,w.jsx)(g.Z,{children:(0,w.jsx)(m.Z,{fontSize:"small",sx:{color:"#ED4040"}})}),(0,w.jsx)(b.Z,{primary:"Delete"})]})]}),(0,w.jsx)(C.Z,{row:r})]})}}]},S=n(67114),B=n.n(S),P=n(19860),k=n(84999),R=function(e){var t=(0,s.useState)([]),n=(0,a.Z)(t,2),o=n[0],r=n[1];return(0,s.useEffect)((function(){r(e)}),[e]),(0,s.useMemo)((function(){var e=[];if(o)for(var t in o)if(Object.prototype.hasOwnProperty.call(o,t)){var n=o[t];if(Array.isArray(n.position_name))if(n.position_name.length>0)for(var r=0;r<n.position_name.length;r++){var i={no:n.position_name.length-r,position_id:n.position_id[r],position_code:n.position_code[r],position_name:n.position_name[r],position_date:n.position_date[r]};e.push(i)}else{var a={no:n.position_name.length,position_id:n.position_id,position_code:n.position_code,position_name:n.position_name,position_date:n.position_date};e.push(a)}else{var s={no:1,position_id:n.position_id,position_code:n.position_code,position_name:n.position_name,position_date:n.position_date};e.push(s)}}return console.log("row row row row ",e),e}),[o])},D=(n(30686).useTheme,function(e,t,n,o){return[{Header:"no",accessor:"no",disableSortBy:!0,className:"cell-right"},{Header:"id",accessor:"position_id",disableSortBy:!0,hidden:!0},{Header:"Position Code.",accessor:"position_code",disableSortBy:!0},{Header:"Position Name",accessor:"position_name",disableSortBy:!0},{Header:"create",accessor:"position_date",disableSortBy:!0,hidden:!0},{Header:"create",accessor:"dummy1",disableSortBy:!0,hidden:!0},{Header:" ",accessor:"dummy2",disableSortBy:!0,hidden:!1},{Header:" ",accessor:"dummy3",disableSortBy:!0,hidden:!1},{Header:" ",accessor:"dummy4",disableSortBy:!0,hidden:!1}]}),H=function(e){(0,P.Z)();var t=R(e),n=(0,s.useState)(null),o=(0,a.Z)(n,2),r=o[0],i=o[1],d=(0,s.useState)(!1),c=(0,a.Z)(d,2),u=c[0],p=c[1],m=(0,s.useState)(null),h=(0,a.Z)(m,2),x=h[0],f=h[1],v=function(){p(!u),r&&u&&i(null)},Z=D(v,i,(function(e){i(null),p(!1),f(e)}),x);return(0,w.jsx)(w.Fragment,{children:(0,w.jsx)("div",{style:{width:"100%",border:"1px solid #ccc",boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.1)",borderRadius:"10px"},children:(0,w.jsx)(l.Z,{children:(0,w.jsx)(k.Z,{columns:Z,data:t,handleAdd:v,getHeaderProps:function(e){return e.getSortByToggleProps()}})})})})},F=n(56352),T=n(7410),E=n(3463),N=(n(70816),n(96467)),M=n(9019),z=n(15103),A=n(49914),I=n(15480),G=n(4117),U=n(31095),W=n(16031),O=n.n(W),V=n(18530),q=n(58467),K=function(e){if(e){var t={id:null===e||void 0===e?void 0:e.department_id,name:null===e||void 0===e?void 0:e.department_name,code:null===e||void 0===e?void 0:e.department_code};return O().merge({},t,e)}return{id:"",name:"",code:""}},L=function(e){var t=e.customer,n=(e.open,e.onCancel),d=e.namePage,c=(e.status,e.fetchDepartment);console.log("data customer is the",t);(0,P.Z)();var l=(0,F.I0)(),p=!!t,m=((0,q.TH)(),(0,s.useState)([])),h=(0,a.Z)(m,2),x=(h[0],h[1],(0,s.useState)("")),f=(0,a.Z)(x,2),v=(f[0],f[1],(0,q.s0)(),(0,s.useState)(void 0)),Z=(0,a.Z)(v,2),g=(Z[0],Z[1],(0,s.useState)([])),b=(0,a.Z)(g,2),_=(b[0],b[1]),C=(0,s.useState)([]),j=(0,a.Z)(C,2),y=(j[0],j[1]),S=(0,s.useState)([]),k=(0,a.Z)(S,2),R=(k[0],k[1]),D=(0,s.useState)([]),H=(0,a.Z)(D,2),W=(H[0],H[1],function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.setting.fetchUser();case 3:t=e.sent,n=t.data,t.isStatus&&R(n.map((function(e){return e.User}))),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}()),O=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.company.getPosition();case 3:t=e.sent,n=t.data,t.isStatus&&_(n),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),L=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.company.getDepartment();case 3:t=e.sent,n=t.data,t.isStatus&&y(n),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){O(),L(),W()}),[]);var Y=E.Ry().shape({code:E.Z_().max(255).required("".concat(d.charAt(0).toUpperCase()+d.slice(1)," Code is required")),name:E.Z_().max(255).required("".concat(d.charAt(0).toUpperCase()+d.slice(1)," Name is required"))}),J=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!te.values.name||!te.values.code){e.next=19;break}if(e.prev=1,!p){e.next=8;break}return e.next=5,$(te.values);case 5:B().fire({title:"Success",timer:2e3,customClass:"modal-success",showConfirmButton:!1,iconHtml:'<div class="success-icon"></div>'}),e.next=11;break;case 8:return e.next=10,Q();case 10:B().fire({title:"Success",timer:2e3,customClass:"modal-success",showConfirmButton:!1,iconHtml:'<div class="success-icon"></div>'});case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0),l((0,V.ss)({open:!0,message:"Error updating project.",variant:"alert",alert:{color:"error"}}));case 17:e.next=20;break;case 19:l((0,V.ss)({open:!0,message:"Please correct the errors in the form.",variant:"alert",alert:{color:"error"}}));case 20:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}();function Q(){return X.apply(this,arguments)}function X(){return(X=(0,i.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={code:te.values.code,name:te.values.name},e.next=3,u.Z.created.createDepartment(t);case 3:e.sent,c(),n();case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(e){return ee.apply(this,arguments)}function ee(){return(ee=(0,i.Z)((0,r.Z)().mark((function e(o){var i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i={id:t.department_id,code:te.values.code,name:te.values.name},e.next=3,u.Z.company.updateDepartment(i);case 3:e.sent,c(),n();case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var te=(0,T.TA)({initialValues:K(t),validationSchema:Y,onSubmit:J}),ne=te.errors,oe=te.touched,re=te.getFieldProps,ie=te.handleSubmit,ae=te.setFieldValue;return(0,s.useEffect)((function(){t&&(ae("id",null===t||void 0===t?void 0:t.department_id),ae("name",null===t||void 0===t?void 0:t.department_name),ae("code",null===t||void 0===t?void 0:t.department_code))}),[t]),console.log("test formik data",te.values),(0,w.jsx)("div",{children:(0,w.jsxs)("form",{onSubmit:ie,children:[(0,w.jsx)(N.Z,{sx:{mx:3},children:(0,w.jsxs)(M.ZP,{container:!0,spacing:2,children:[(0,w.jsxs)(M.ZP,{item:!0,xs:12,sm:6,children:[(0,w.jsxs)(z.Z,{htmlFor:"code",children:[d.charAt(0).toUpperCase()+d.slice(1)," Code",(0,w.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,w.jsx)(A.Z,(0,o.Z)((0,o.Z)({fullWidth:!0,rows:4,placeholder:"".concat(d.charAt(0).toUpperCase()+d.slice(1)," Code"),value:te.values.code},re("code")),{},{error:Boolean(oe.code&&ne.code),helperText:oe.code&&ne.code,sx:{borderRadius:40,mt:"4px"}})),(0,w.jsx)(I.Z,{sx:{color:"red"},children:oe.code&&ne.code})]}),(0,w.jsxs)(M.ZP,{item:!0,xs:12,sm:6,children:[(0,w.jsxs)(z.Z,{htmlFor:"project",children:[d.charAt(0).toUpperCase()+d.slice(1)," Name",(0,w.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,w.jsx)(A.Z,(0,o.Z)((0,o.Z)({fullWidth:!0,rows:4,placeholder:"".concat(d.charAt(0).toUpperCase()+d.slice(1)," Name"),value:te.values.name},re("name")),{},{error:Boolean(oe.name&&ne.name),helperText:oe.name&&ne.name,sx:{borderRadius:40,mt:"4px"}})),(0,w.jsx)(I.Z,{sx:{color:"red"},children:oe.name&&ne.name})]})]})}),(0,w.jsxs)(G.Z,{sx:{pr:2.5},children:[(0,w.jsx)(U.Z,{variant:"outlined",onClick:function(){p?te.values.name&&te.values.code?te.values.name!==t.name||te.values.code!==t.code?B().fire({title:"Discard",text:"if you discard the change, this process will not be able to be undone.",showCancelButton:!0,reverseButtons:!0,confirmButtonText:"Confirm",cancelButtonText:"Keep editing",customClass:{confirmButton:"confirm-rounded-button",cancelButton:"outlined-button"},iconHtml:'<div class="discard-icon"></div>'}).then((function(e){e.isConfirmed?(te.resetForm(),n()):(e.dismiss,B().DismissReason.cancel)})):(te.resetForm(),n()):B().fire({title:"Discard",text:"if you discard the change, this process will not be able to be undone.",showCancelButton:!0,reverseButtons:!0,confirmButtonText:"Confirm",cancelButtonText:"Keep editing",customClass:{confirmButton:"confirm-rounded-button",cancelButton:"outlined-button"},iconHtml:'<div class="discard-icon"></div>'}).then((function(e){e.isConfirmed?(te.resetForm(),n()):(e.dismiss,B().DismissReason.cancel)})):te.values.name||te.values.code?B().fire({title:"Discard",text:"if you discard the change, this process will not be able to be undone.",showCancelButton:!0,reverseButtons:!0,confirmButtonText:"Confirm",cancelButtonText:"Keep editing",customClass:{confirmButton:"confirm-rounded-button",cancelButton:"outlined-button"},iconHtml:'<div class="discard-icon"></div>'}).then((function(e){e.isConfirmed?(te.resetForm(),n()):(e.dismiss,B().DismissReason.cancel)})):(te.resetForm(),n())},sx:{mr:1.5,backgroundColor:"transparent",borderColor:"#393939",color:"#393939",borderRadius:"40px",width:"170px",height:"40px","&:hover":{backgroundColor:"#D2D2D2",borderColor:"#393939",color:"#393939"}},children:"Cancel"}),(0,w.jsx)(U.Z,{variant:"contained",type:"submit",sx:{backgroundColor:"#393939",borderRadius:"40px",width:"170px",height:"40px","&:hover":{backgroundColor:"#242424"}},children:"Save"})]})]})})},Y=function(){var e=(0,s.useState)(null),t=(0,a.Z)(e,2),n=t[0],m=t[1],h=(0,s.useState)(!1),x=(0,a.Z)(h,2),f=x[0],v=x[1],Z=(0,s.useState)(!1),g=(0,a.Z)(Z,2),b=g[0],_=(g[1],(0,s.useState)([])),C=(0,a.Z)(_,2),j=C[0],S=C[1],P=p(j),k=(0,s.useState)(""),R=(0,a.Z)(k,2),D=R[0],F=R[1],T=(0,s.useState)(!1),E=(0,a.Z)(T,2),N=E[0],M=E[1],z=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.company.getDepartment();case 3:t=e.sent,n=t.data,t.isStatus&&S(n),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){z()}),[N]);var A=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(""),v(!f),M(!0),console.log("add isExpand",N),N?(v(!1),M(!1),setTimeout((function(){M(!0),v(!0)}),1)):(v(!0),M(!0)),null!==t&&void 0!==t&&t.department_id?F("edit"):(F("add"),m(null)),n&&"add"===D&&m(null),z();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(""),v(!1),null!==t&&void 0!==t&&t.department_id?F("edit"):(F("add"),m(null)),M(!1),n&&"add"===D&&m(null),z();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(""),console.log("add",f),console.log("Edit isExpand",N),N?(v(!1),M(!1),setTimeout((function(){M(!0),v(!0)}),1)):(v(!0),M(!0)),null!==t&&void 0!==t&&t.department_id?F("edit"):(F("add"),m(null)),n&&"add"===D&&m(null),z();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();console.log("isExpand",N);var U=y(G,m,(function(e){z(),B().fire({title:"Delete",text:"if you delete the information, this process will not be able to be undone.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#0066FF",cancelButtonColor:"#0066FF",reverseButtons:!0,confirmButtonText:"Confirm",customClass:{confirmButton:"confirm-rounded-button",cancelButton:"outlined-button"},iconHtml:'<div class="delete-icon"></div>'}).then((function(t){if(t.isConfirmed){z();u.Z.company.deleteDepartment(e).then((function(){z(),B().fire({title:"Success",timer:2e3,customClass:"modal-success",showConfirmButton:!1,iconHtml:'<div class="success-icon"></div>'})}))}}))})),W=(0,s.useCallback)((function(e){var t=e.row;return(0,w.jsx)(H,{DatafromIndex:P[t.id]})}),[P]),O=(0,w.jsx)(L,{open:f,customer:n,onCancel:I,namePage:"department",status:D,fetchDepartment:z}),V={columns:U,data:P,renderRowSubComponent:W,getHeaderProps:function(e){return e.getSortByToggleProps()},nameCreateButton:"Add Department",handleAdd:function(){return A()},handleDelete:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){return handleDelete()})),sortColumn:"created_date",isExpand:N,expandPage:O};return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("div",{children:[(0,w.jsx)(l.Z,{children:(0,w.jsx)(c.Z,(0,o.Z)({},V))}),(0,w.jsx)(d.Z,{maxWidth:"lg",fullWidth:!0,open:b,PaperProps:{sx:{borderRadius:"10px"}}})]})})}},51997:function(e,t,n){var o=n(64836);t.Z=void 0;var r=o(n(45045)),i=n(46417),a=(0,r.default)((0,i.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=a},65954:function(e,t,n){var o=n(64836);t.Z=void 0;var r=o(n(45045)),i=n(46417),a=(0,r.default)((0,i.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.Z=a},43997:function(e,t,n){var o=n(64836);t.Z=void 0;var r=o(n(45045)),i=n(46417),a=(0,r.default)((0,i.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");t.Z=a},96467:function(e,t,n){n.d(t,{Z:function(){return Z}});var o=n(4942),r=n(63366),i=n(87462),a=n(47313),s=n(2197),d=n(21921),c=n(17592),l=n(77342),u=n(77430),p=n(32298);function m(e){return(0,p.Z)("MuiDialogContent",e)}(0,u.Z)("MuiDialogContent",["root","dividers"]);var h=n(93174),x=n(46417),f=["className","dividers"],v=(0,c.ZP)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.dividers&&t.dividers]}})((function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},n.dividers?{padding:"16px 24px",borderTop:"1px solid ".concat((t.vars||t).palette.divider),borderBottom:"1px solid ".concat((t.vars||t).palette.divider)}:(0,o.Z)({},".".concat(h.Z.root," + &"),{paddingTop:0}))})),Z=a.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiDialogContent"}),o=n.className,a=n.dividers,c=void 0!==a&&a,u=(0,r.Z)(n,f),p=(0,i.Z)({},n,{dividers:c}),h=function(e){var t=e.classes,n={root:["root",e.dividers&&"dividers"]};return(0,d.Z)(n,m,t)}(p);return(0,x.jsx)(v,(0,i.Z)({className:(0,s.Z)(h.root,o),ownerState:p,ref:t},u))}))},33604:function(e,t,n){var o=n(87462),r=n(63366),i=n(47313),a=n(2197),s=n(21921),d=n(61113),c=n(17592),l=n(77342),u=n(93174),p=n(63909),m=n(46417),h=["className","id"],x=(0,c.ZP)(d.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,t){return t.root}})({padding:"16px 24px",flex:"0 0 auto"}),f=i.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiDialogTitle"}),d=n.className,c=n.id,f=(0,r.Z)(n,h),v=n,Z=function(e){var t=e.classes;return(0,s.Z)({root:["root"]},u.a,t)}(v),g=i.useContext(p.Z).titleId,b=void 0===g?c:g;return(0,m.jsx)(x,(0,o.Z)({component:"h2",className:(0,a.Z)(Z.root,d),ownerState:v,ref:t,variant:"h6",id:null!=c?c:b},f))}));t.Z=f},93174:function(e,t,n){n.d(t,{a:function(){return i}});var o=n(77430),r=n(32298);function i(e){return(0,r.Z)("MuiDialogTitle",e)}var a=(0,o.Z)("MuiDialogTitle",["root"]);t.Z=a}}]);