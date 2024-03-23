"use strict";(self.webpackChunkmantis_material_react=self.webpackChunkmantis_material_react||[]).push([[6624],{7519:function(e,t,r){r.d(t,{RL:function(){return b},YQ:function(){return y},bG:function(){return w},c:function(){return S}});var n=r(45987),o=r(29439),a=r(1413),i=r(47313),s=r(19860),c=r(17592),l=r(42832),u=r(57829),d=r(9019),p=r(61113),f=r(1550),m=r(23931),x=r(51405),h=r(77970),Z=r(44758),g=r(66212),_=r(10054),v=r(40737),j=r(46417),C=["indeterminate"],b=function(e){var t=e.column,r=e.sort,n=(0,s.Z)();return(0,j.jsxs)(l.Z,{direction:"row",spacing:1,alignItems:"center",sx:{display:"inline-flex"},children:[(0,j.jsx)(u.Z,{children:t.render("Header")}),!t.disableSortBy&&(0,j.jsxs)(l.Z,(0,a.Z)((0,a.Z)({sx:{color:"secondary.light"}},r&&(0,a.Z)({},t.getHeaderProps(t.getSortByToggleProps()))),{},{children:[(0,j.jsx)(_.Z,{style:{fontSize:"0.625rem",color:t.isSorted&&!t.isSortedDesc?n.palette.text.secondary:"inherit"}}),(0,j.jsx)(v.Z,{style:{fontSize:"0.625rem",marginTop:-2,color:t.isSortedDesc?n.palette.text.secondary:"inherit"}})]}))]})},w=function(e){var t=e.gotoPage,r=e.rows,n=e.setPageSize,a=e.pageSize,s=e.pageIndex,c=(0,i.useState)(!1),u=(0,o.Z)(c,2),Z=u[0],g=u[1];return(0,j.jsxs)(d.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",sx:{width:"auto"},children:[(0,j.jsx)(d.ZP,{item:!0,children:(0,j.jsx)(l.Z,{direction:"row",spacing:1,alignItems:"center",children:(0,j.jsxs)(l.Z,{direction:"row",spacing:1,alignItems:"center",children:[(0,j.jsx)(p.Z,{variant:"caption",color:"secondary",children:"Page"}),(0,j.jsx)(f.Z,{sx:{m:1},children:(0,j.jsxs)(m.Z,{id:"demo-controlled-open-select",open:Z,onClose:function(){g(!1)},onOpen:function(){g(!0)},value:a,onChange:function(e){n(+e.target.value)},size:"small",sx:{"& .MuiSelect-select":{py:.75,px:1.25}},children:[(0,j.jsx)(x.Z,{value:5,children:"5"}),(0,j.jsx)(x.Z,{value:10,children:"10"}),(0,j.jsx)(x.Z,{value:25,children:"25"}),(0,j.jsx)(x.Z,{value:50,children:"50"}),(0,j.jsx)(x.Z,{value:100,children:"100"})]})})]})})}),(0,j.jsx)(d.ZP,{item:!0,sx:{mt:{xs:2,sm:0}},children:(0,j.jsx)(h.Z,{count:Math.ceil(r.length/a),page:s+1,onChange:function(e,r){t(r-1)},variant:"combined",showFirstButton:!0,showLastButton:!0,sx:{"& .MuiButtonBase-root":{borderRadius:"50%",cursor:"pointer"},"& .MuiPaginationItem-root.Mui-selected":{backgroundColor:"#000000",color:"#ffffff"}}})})]})},y=(0,i.forwardRef)((function(e,t){var r=e.indeterminate,o=(0,n.Z)(e,C),s=(0,i.useRef)(),c=t||s;return(0,j.jsx)(Z.Z,(0,a.Z)({indeterminate:r,ref:c},o))})),S=function(e){var t=e.selected;return(0,j.jsx)(j.Fragment,{children:t>0&&(0,j.jsx)(g.Z,{size:"small",color:"secondary",variant:"light",sx:{position:"absolute",right:-1,top:-1,borderRadius:"0 4px 0 4px"}})})};(0,c.ZP)("div")((function(e){var t=e.theme,r=e.x,n=e.y;return{color:t.palette.text.secondary,position:"fixed",pointerEvents:"none",left:12,top:24,transform:"translate(".concat(r,"px, ").concat(n,"px)"),opacity:.6}}))},66471:function(e,t,r){r.r(t),r.d(t,{default:function(){return X}});var n=r(1413),o=r(74165),a=r(15861),i=r(29439),s=r(47313),c=r(19860),l=r(94469),u=r(38493),d=r(84897),p=r(56352),f=r(33604),m=r(96467),x=r(9019),h=r(15103),Z=r(24631),g=r(76088),_=r(31095),v=r(19536),j=r(16031),C=r.n(j),b=r(3463),w=r(70816),y=r.n(w),S=r(7410),Y=r(18530),P=r(44714),D=r(11653),M=r(43394),B=r(67114),F=r.n(B),I=r(46417),k=function(e){var t={project_id:"",client_id:"",group_id:"",project_code:"",project_name:"",start_date:"",finish_date:"",due_date:""};return e?C().merge({},t,e):t},L=function(e){var t=e.customer,r=e.onCancel,l=e.fetchWorkTable,u=((0,c.Z)(),(0,p.I0)()),j=!!t,C=(0,s.useState)([]),w=(0,i.Z)(C,2),B=w[0],L=w[1],R=(0,s.useState)([]),T=(0,i.Z)(R,2),H=T[0],V=T[1],E=(0,s.useState)(),N=(0,i.Z)(E,2),z=N[0],W=N[1];(0,s.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){var t,r,n,a;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.Z.monday.getBoardId();case 3:t=e.sent,r=t.data,t.isStatus&&(n=r.data.boards.filter((function(e){return e.name.includes("Subitems of")})),a=n.map((function(e){return{board_id:e.id,name:e.name.replace("Subitems of","").trim()}})),L(a)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);var q=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){var t,r,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.Z.group.getGroup();case 3:t=e.sent,r=t.data,t.isStatus&&(n=r.map((function(e){return{group_id:e.group_id,group_name:e.group_name}})),W(n)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){var t,r,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.Z.work.fetchDataClient();case 3:t=e.sent,r=t.data,t.isStatus&&(n=r.map((function(e){return{client_id:e.client_id,client_name:e.client_name}})),V(n)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){G(),q()}),[]);var A=b.Ry().shape({project_code:b.Z_().max(255).required("Project Code is required"),project_name:b.Z_().max(255).required("Project Name is required"),group_id:b.Z_().max(36).required("Group Name is required"),client_id:b.Z_().max(36).required("Client Name is required"),start_date:b.Z_().max(255).required("Start Date is required"),finish_date:b.Z_().max(255).required("Finish Date is required").test("date-order","Finish Date must be equal or after Start Date",(function(e){var t=this.parent.start_date;return y()(e,"DD-MM-YYYY").isSameOrAfter(y()(t,"DD-MM-YYYY"))})),due_date:b.Z_().max(255).required("Go Live Date is required").test("date-order","Go Live Date must be after Finish Date",(function(e){var t=this.parent.finish_date;return y()(e,"DD-MM-YYYY").isAfter(y()(t,"DD-MM-YYYY"))}))}),O=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!j){e.next=7;break}return e.next=4,Q(X.values);case 4:F().fire({title:"Success",customClass:"modal-success",timer:2e3,showConfirmButton:!1,iconHtml:'<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'}),e.next=10;break;case 7:return e.next=9,$();case 9:F().fire({title:"Success",customClass:"modal-success",timer:2e3,showConfirmButton:!1,iconHtml:'<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'});case 10:r(),l(),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0),u((0,Y.ss)({open:!0,message:"Error updating project.",variant:"alert",alert:{color:"error"},close:!1}));case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}();function $(){return K.apply(this,arguments)}function K(){return(K=(0,a.Z)((0,o.Z)().mark((function e(){var t;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={project_code:X.values.project_code,project_name:X.values.project_name,boards_id:X.values.boards_id,client_id:X.values.client_id,group_id:X.values.group_id,start_date:y()(X.values.start_date,"DD-MM-YYYY").format(),finish_date:y()(X.values.finish_date,"DD-MM-YYYY").format(),due_date:y()(X.values.due_date,"DD-MM-YYYY").format(),is_active:!1,is_deleted:!1},e.next=3,d.Z.work.createProject([t]);case 3:e.sent;case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(e){return U.apply(this,arguments)}function U(){return(U=(0,a.Z)((0,o.Z)().mark((function e(t){var r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(0,n.Z)((0,n.Z)({},t),{},{start_date:y()(X.values.start_date,"DD-MM-YYYY").format(),finish_date:y()(X.values.finish_date,"DD-MM-YYYY").format(),due_date:y()(X.values.due_date,"DD-MM-YYYY").format(),project_id:t.project_id}),e.next=3,d.Z.work.updateProject([r]);case 3:e.sent,console.log("updateProjectData",r);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var X=(0,S.TA)({initialValues:k(t),validationSchema:A,onSubmit:O}),J=X.errors,ee=X.touched,te=X.getFieldProps,re=X.handleSubmit;return(0,I.jsxs)(s.Fragment,{children:[(0,I.jsx)(f.Z,{sx:{px:3,backgroundColor:"#f3f4f6 ",fontSize:"24px",fontWeight:"bold"},id:"scroll-dialog-title",children:j?"Edit Project":"Add Project"}),(0,I.jsxs)("form",{onSubmit:re,children:[(0,I.jsxs)(m.Z,{children:[(0,I.jsx)("div",{className:"Client",style:{marginBottom:"200px"},children:(0,I.jsxs)(x.ZP,{container:!0,spacing:2,children:[(0,I.jsxs)(x.ZP,{item:!0,xs:6,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Project Code",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)({fullWidth:!0,rows:4,placeholder:"Project Code",value:X.values.project_code},te("project_code")),{},{error:Boolean(ee.project_code&&J.project_code),helperText:ee.project_code&&J.project_code,InputProps:{sx:{borderRadius:"30px"}}}))]}),(0,I.jsxs)(x.ZP,{item:!0,xs:6,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Project Name",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(g.Z,{id:"project_name",fullWidth:!0,freeSolo:!0,value:X.values.project_name,inputValue:X.values.project_name,onInputChange:function(e,t){console.log("project_name",t),X.setFieldValue("project_name",t);var r=B.find((function(e){return e.name===t}));r&&(X.setFieldValue("boards_id",r.board_id),console.log("boards_id",r.board_id))},options:B.map((function(e){return e.name})),renderInput:function(e){return(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)((0,n.Z)({},e),{},{placeholder:"Project Name"},te("project_name")),{},{error:Boolean(ee.project_name&&J.project_name),helperText:ee.project_name&&J.project_name,InputProps:(0,n.Z)((0,n.Z)({},e.InputProps),{},{sx:(0,n.Z)((0,n.Z)({},e.InputProps.sx),{},{borderRadius:"30px"})})}))}})]}),(0,I.jsxs)(x.ZP,{item:!0,xs:6,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Client Name",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(g.Z,{id:"client_name",fullWidth:!0,value:H.find((function(e){return e.client_id===X.values.client_id}))||null,onChange:function(e,t){null!==t?(X.setFieldValue("client_id",t.client_id),console.log("Selected Client ID:",t)):X.setFieldValue("client_id","")},options:H,getOptionLabel:function(e){return e.client_name||""},isOptionEqualToValue:function(e,t){return e.client_id===t.client_id},renderInput:function(e){return(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)({},e),{},{placeholder:"Client Name",error:Boolean(ee.client_id&&J.client_id),helperText:ee.client_id&&J.client_id,InputProps:(0,n.Z)((0,n.Z)({},e.InputProps),{},{sx:(0,n.Z)((0,n.Z)({},e.InputProps.sx),{},{borderRadius:"30px"})})}))}})]}),(0,I.jsxs)(x.ZP,{item:!0,xs:6,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Group Name",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(g.Z,{id:"group_name",fullWidth:!0,value:z&&z.find((function(e){return e.group_id===X.values.group_id}))||null,onChange:function(e,t){null!==t?(console.log("newValue",t),X.setFieldValue("group_id",t.group_id)):X.setFieldValue("group_id","")},options:z||[],getOptionLabel:function(e){return e.group_name||""},isOptionEqualToValue:function(e,t){return e.group_id===t.group_id},renderInput:function(e){return(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)({},e),{},{placeholder:"Group Name",error:Boolean(ee.group_id&&J.group_id),helperText:ee.group_id&&J.group_id,InputProps:(0,n.Z)((0,n.Z)({},e.InputProps),{},{sx:(0,n.Z)((0,n.Z)({},e.InputProps.sx),{},{borderRadius:"30px"})})}))}})]}),(0,I.jsx)(x.ZP,{item:!0,xs:12,sm:4,children:(0,I.jsxs)(M._,{dateAdapter:D.H,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Start Date",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(P.$,{value:X.values.start_date?y()(X.values.start_date,"DD-MM-YYYY").toDate():null,onChange:function(e){return X.setFieldValue("start_date",e?y()(e).format("DD-MM-YYYY"):"")},inputFormat:"dd/MM/yyyy",renderInput:function(e){return(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)((0,n.Z)({fullWidth:!0},e),{},{placeholder:"Start Date"},te("start_date")),{},{error:Boolean(ee.start_date&&J.start_date),helperText:ee.start_date&&J.start_date,onChange:function(e){var t=e.target.value;/^\d{2}-\d{2}-\d{4}$/.test(t)&&X.setFieldValue("start_date",t)},InputProps:(0,n.Z)((0,n.Z)({},e.InputProps),{},{sx:(0,n.Z)((0,n.Z)({},e.InputProps.sx),{},{borderRadius:"30px"})})}))}})]})}),(0,I.jsx)(x.ZP,{item:!0,xs:12,sm:4,children:(0,I.jsxs)(M._,{dateAdapter:D.H,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Finish Date",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(P.$,{value:X.values.finish_date?y()(X.values.finish_date,"DD-MM-YYYY").toDate():null,onChange:function(e){return X.setFieldValue("finish_date",e?y()(e).format("DD-MM-YYYY"):"")},inputFormat:"dd/MM/yyyy",renderInput:function(e){return(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)((0,n.Z)({fullWidth:!0},e),{},{placeholder:"Finish Date"},te("finish_date")),{},{error:Boolean(ee.finish_date&&J.finish_date),helperText:ee.finish_date&&J.finish_date,onChange:function(e){var t=e.target.value;/^\d{2}-\d{2}-\d{4}$/.test(t)&&X.setFieldValue("finish_date",t)},InputProps:(0,n.Z)((0,n.Z)({},e.InputProps),{},{sx:(0,n.Z)((0,n.Z)({},e.InputProps.sx),{},{borderRadius:"30px"})})}))}})]})}),(0,I.jsx)(x.ZP,{item:!0,xs:12,sm:4,children:(0,I.jsxs)(M._,{dateAdapter:D.H,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Go Live",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(P.$,{value:X.values.due_date?y()(X.values.due_date,"DD-MM-YYYY").toDate():null,onChange:function(e){return X.setFieldValue("due_date",e?y()(e).format("DD-MM-YYYY"):"")},inputFormat:"dd/MM/yyyy",renderInput:function(e){return(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)((0,n.Z)({fullWidth:!0},e),{},{placeholder:"Go Live"},te("due_date")),{},{error:Boolean(ee.due_date&&J.due_date),helperText:ee.due_date&&J.due_date,onChange:function(e){var t=e.target.value;/^\d{2}-\d{2}-\d{4}$/.test(t)&&X.setFieldValue("due_date",t)},InputProps:(0,n.Z)((0,n.Z)({},e.InputProps),{},{sx:(0,n.Z)((0,n.Z)({},e.InputProps.sx),{},{borderRadius:"30px"})})}))}})]})})]})}),(0,I.jsxs)("div",{style:{marginTop:"10px",display:"flex",justifyContent:"flex-end",padding:"0 2.5 0 2.5"},children:[(0,I.jsx)("div",{style:{display:"flex",padding:"5px 7px 5px 7px",alignItems:"center"},children:(0,I.jsx)(_.Z,{onClick:function(){Object.keys(ee).some((function(e){return ee[e]}))?F().fire({title:"Cancel",text:"If you cancel now, your information fills will be discard.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#0066FF",cancelButtonColor:"#0066FF",reverseButtons:!0,confirmButtonText:"Confirm",cancelButtonText:"Keep Editing",customClass:{confirmButton:"confirm-rounded-button",cancelButton:"outlined-button"},iconHtml:'<svg width="150" height="150" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4339 0.666016C36.3209 0.666016 46.7673 11.1123 46.7673 23.9993C46.7673 36.8863 36.3209 47.3327 23.4339 47.3327C10.5469 47.3327 0.100586 36.8863 0.100586 23.9993C0.100586 11.1123 10.5469 0.666016 23.4339 0.666016ZM23.4339 5.33268C18.4832 5.33268 13.7353 7.29934 10.2346 10.8C6.73391 14.3007 4.76725 19.0486 4.76725 23.9993C4.76725 28.9501 6.73391 33.698 10.2346 37.1987C13.7353 40.6994 18.4832 42.666 23.4339 42.666C28.3846 42.666 33.1326 40.6994 36.6332 37.1987C40.1339 33.698 42.1006 28.9501 42.1006 23.9993C42.1006 19.0486 40.1339 14.3007 36.6332 10.8C33.1326 7.29934 28.3846 5.33268 23.4339 5.33268ZM23.4339 30.9993C24.0528 30.9993 24.6462 31.2452 25.0838 31.6828C25.5214 32.1203 25.7673 32.7138 25.7673 33.3327C25.7673 33.9515 25.5214 34.545 25.0838 34.9826C24.6462 35.4202 24.0528 35.666 23.4339 35.666C22.8151 35.666 22.2216 35.4202 21.784 34.9826C21.3464 34.545 21.1006 33.9515 21.1006 33.3327C21.1006 32.7138 21.3464 32.1203 21.784 31.6828C22.2216 31.2452 22.8151 30.9993 23.4339 30.9993ZM23.4339 9.99935C24.0528 9.99935 24.6462 10.2452 25.0838 10.6828C25.5214 11.1204 25.7673 11.7138 25.7673 12.3327V26.3327C25.7673 26.9515 25.5214 27.545 25.0838 27.9826C24.6462 28.4202 24.0528 28.666 23.4339 28.666C22.8151 28.666 22.2216 28.4202 21.784 27.9826C21.3464 27.545 21.1006 26.9515 21.1006 26.3327V12.3327C21.1006 11.7138 21.3464 11.1204 21.784 10.6828C22.2216 10.2452 22.8151 9.99935 23.4339 9.99935Z" fill="#ED4040"/></svg>'}).then(function(){var e=(0,a.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.isConfirmed&&(X.resetForm(),r());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()):(X.resetForm(),r())},variant:"outlined",sx:{width:"150px",marginLeft:"5px",height:"auto",borderRadius:"40px",borderColor:"#232323",color:"#232323","&:hover":{borderColor:"#686868 !important",color:"#686868"}},children:"Cancel"})}),(0,I.jsx)("div",{style:{display:"flex",padding:"5px 7px 5px 7px",alignItems:"center"},children:(0,I.jsx)(_.Z,{type:"submit",variant:"contained",sx:{width:"150px",marginLeft:"5px",height:"auto",borderRadius:"40px",backgroundColor:"#232323","&::after":{boxShadow:"0 0 5px 5px rgba(0, 0, 0, 0.9)",borderRadius:"40px"},"&:hover":{backgroundColor:"#686868 !important"}},children:"Save"})})]})]}),(0,I.jsx)(v.Z,{})]})]})},R=function(e){var t={project_id:"",client_id:"",group_id:"",project_code:"",project_name:"",start_date:"",finish_date:"",due_date:""};return e?C().merge({},t,e):t},T=function(e){var t=e.customer,r=e.onCancel,c=(e.fetchWorkTable,(0,p.I0)()),l=(0,s.useState)([]),u=(0,i.Z)(l,2),j=u[0],C=u[1],w=(0,s.useState)([]),y=(0,i.Z)(w,2),P=(y[0],y[1],(0,s.useState)()),D=(0,i.Z)(P,2),M=D[0],B=D[1];(0,s.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){var t,r,n,a,i;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.Z.monday.getBoardId();case 3:t=e.sent,r=t.data,n=t.isStatus,console.log("data monday",r),n&&(a=r.data.boards.filter((function(e){return e.name.includes("Subitems of")})),i=a.map((function(e){return{board_id:e.id,name:e.name.replace("Subitems of","").trim()}})),C(i)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);var k=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){var t,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.Z.monday.fetchMondayUser();case 3:t=e.sent,r=t.data,t.isStatus&&B(r),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){k()}),[]),console.log("getGroup",M);var L=b.Ry().shape({project_name:b.Z_().max(255).required("Project Name is required")}),T=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,H();case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),console.error(e.t0),c((0,Y.ss)({open:!0,message:"Error updating project.",variant:"alert",alert:{color:"error"},close:!1}));case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}();function H(){return V.apply(this,arguments)}function V(){return(V=(0,a.Z)((0,o.Z)().mark((function e(){var t,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={project_name:E.values.project_name,boards_id:E.values.boards_id,group:M},e.next=3,d.Z.monday.fetchDataAll([t]);case 3:n=e.sent,console.log("createMonday",n.isStatus),n.isStatus?(F().fire({title:"Success",customClass:"modal-success",timer:2e3,showConfirmButton:!1,iconHtml:'<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'}),r()):F().fire({title:"Error",text:"Please check your data on monday, It's not have empty data. ",customClass:"modal-error",allowEscapeKey:!0,icon:"warning",showConfirmButton:!1,iconHtml:'<svg width="150" height="150" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4339 0.666016C36.3209 0.666016 46.7673 11.1123 46.7673 23.9993C46.7673 36.8863 36.3209 47.3327 23.4339 47.3327C10.5469 47.3327 0.100586 36.8863 0.100586 23.9993C0.100586 11.1123 10.5469 0.666016 23.4339 0.666016ZM23.4339 5.33268C18.4832 5.33268 13.7353 7.29934 10.2346 10.8C6.73391 14.3007 4.76725 19.0486 4.76725 23.9993C4.76725 28.9501 6.73391 33.698 10.2346 37.1987C13.7353 40.6994 18.4832 42.666 23.4339 42.666C28.3846 42.666 33.1326 40.6994 36.6332 37.1987C40.1339 33.698 42.1006 28.9501 42.1006 23.9993C42.1006 19.0486 40.1339 14.3007 36.6332 10.8C33.1326 7.29934 28.3846 5.33268 23.4339 5.33268ZM23.4339 30.9993C24.0528 30.9993 24.6462 31.2452 25.0838 31.6828C25.5214 32.1203 25.7673 32.7138 25.7673 33.3327C25.7673 33.9515 25.5214 34.545 25.0838 34.9826C24.6462 35.4202 24.0528 35.666 23.4339 35.666C22.8151 35.666 22.2216 35.4202 21.784 34.9826C21.3464 34.545 21.1006 33.9515 21.1006 33.3327C21.1006 32.7138 21.3464 32.1203 21.784 31.6828C22.2216 31.2452 22.8151 30.9993 23.4339 30.9993ZM23.4339 9.99935C24.0528 9.99935 24.6462 10.2452 25.0838 10.6828C25.5214 11.1204 25.7673 11.7138 25.7673 12.3327V26.3327C25.7673 26.9515 25.5214 27.545 25.0838 27.9826C24.6462 28.4202 24.0528 28.666 23.4339 28.666C22.8151 28.666 22.2216 28.4202 21.784 27.9826C21.3464 27.545 21.1006 26.9515 21.1006 26.3327V12.3327C21.1006 11.7138 21.3464 11.1204 21.784 10.6828C22.2216 10.2452 22.8151 9.99935 23.4339 9.99935Z" fill="#ED4040"/></svg>'});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E=(0,S.TA)({initialValues:R(t),validationSchema:L,onSubmit:T}),N=E.errors,z=E.touched,W=E.getFieldProps,q=E.handleSubmit;return(0,I.jsxs)(s.Fragment,{children:[(0,I.jsx)(f.Z,{sx:{px:3,backgroundColor:"#f3f4f6 ",fontSize:"24px",fontWeight:"bold"},id:"scroll-dialog-title",children:"Fetch Monday"}),(0,I.jsxs)("form",{onSubmit:q,children:[(0,I.jsxs)(m.Z,{children:[(0,I.jsx)("div",{className:"Client",style:{marginBottom:"50px"},children:(0,I.jsx)(x.ZP,{container:!0,spacing:2,children:(0,I.jsxs)(x.ZP,{item:!0,xs:12,children:[(0,I.jsxs)(h.Z,{sx:{marginBottom:"5px"},children:["Select a project to fetch data from Monday.",(0,I.jsx)("span",{style:{color:"red",marginLeft:"3px"},children:"*"})]}),(0,I.jsx)(g.Z,{id:"fetch_project",fullWidth:!0,freeSolo:!0,value:E.values.project_name,inputValue:E.values.project_name,onInputChange:function(e,t){console.log("project_name",t),E.setFieldValue("project_name",t);var r=j.find((function(e){return e.name===t}));r&&(E.setFieldValue("boards_id",r.board_id),console.log("boards_id",r.board_id))},options:j.map((function(e){return e.name})),renderInput:function(e){return(0,I.jsx)(Z.Z,(0,n.Z)((0,n.Z)((0,n.Z)({},e),{},{placeholder:"Project Name"},W("project_name")),{},{error:Boolean(z.project_name&&N.project_name),helperText:z.project_name&&N.project_name,InputProps:(0,n.Z)((0,n.Z)({},e.InputProps),{},{sx:(0,n.Z)((0,n.Z)({},e.InputProps.sx),{},{borderRadius:"30px"})})}))}})]})})}),(0,I.jsxs)("div",{style:{marginTop:"10px",display:"flex",justifyContent:"flex-end",padding:"0 2.5 0 2.5"},children:[(0,I.jsx)("div",{style:{display:"flex",padding:"5px 7px 5px 7px",alignItems:"center"},children:(0,I.jsx)(_.Z,{onClick:function(){Object.keys(z).some((function(e){return z[e]}))?F().fire({title:"Cancel",text:"If you cancel now, your information fills will be discard.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#0066FF",cancelButtonColor:"#0066FF",reverseButtons:!0,confirmButtonText:"Confirm",cancelButtonText:"Keep Editing",customClass:{confirmButton:"confirm-rounded-button",cancelButton:"outlined-button"},iconHtml:'<svg width="150" height="150" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4339 0.666016C36.3209 0.666016 46.7673 11.1123 46.7673 23.9993C46.7673 36.8863 36.3209 47.3327 23.4339 47.3327C10.5469 47.3327 0.100586 36.8863 0.100586 23.9993C0.100586 11.1123 10.5469 0.666016 23.4339 0.666016ZM23.4339 5.33268C18.4832 5.33268 13.7353 7.29934 10.2346 10.8C6.73391 14.3007 4.76725 19.0486 4.76725 23.9993C4.76725 28.9501 6.73391 33.698 10.2346 37.1987C13.7353 40.6994 18.4832 42.666 23.4339 42.666C28.3846 42.666 33.1326 40.6994 36.6332 37.1987C40.1339 33.698 42.1006 28.9501 42.1006 23.9993C42.1006 19.0486 40.1339 14.3007 36.6332 10.8C33.1326 7.29934 28.3846 5.33268 23.4339 5.33268ZM23.4339 30.9993C24.0528 30.9993 24.6462 31.2452 25.0838 31.6828C25.5214 32.1203 25.7673 32.7138 25.7673 33.3327C25.7673 33.9515 25.5214 34.545 25.0838 34.9826C24.6462 35.4202 24.0528 35.666 23.4339 35.666C22.8151 35.666 22.2216 35.4202 21.784 34.9826C21.3464 34.545 21.1006 33.9515 21.1006 33.3327C21.1006 32.7138 21.3464 32.1203 21.784 31.6828C22.2216 31.2452 22.8151 30.9993 23.4339 30.9993ZM23.4339 9.99935C24.0528 9.99935 24.6462 10.2452 25.0838 10.6828C25.5214 11.1204 25.7673 11.7138 25.7673 12.3327V26.3327C25.7673 26.9515 25.5214 27.545 25.0838 27.9826C24.6462 28.4202 24.0528 28.666 23.4339 28.666C22.8151 28.666 22.2216 28.4202 21.784 27.9826C21.3464 27.545 21.1006 26.9515 21.1006 26.3327V12.3327C21.1006 11.7138 21.3464 11.1204 21.784 10.6828C22.2216 10.2452 22.8151 9.99935 23.4339 9.99935Z" fill="#ED4040"/></svg>'}).then(function(){var e=(0,a.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.isConfirmed&&(E.resetForm(),r());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()):(E.resetForm(),r())},variant:"outlined",sx:{width:"150px",marginLeft:"5px",height:"auto",borderRadius:"40px",borderColor:"#232323",color:"#232323","&:hover":{borderColor:"#686868 !important",color:"#686868"}},children:"Cancel"})}),(0,I.jsx)("div",{style:{display:"flex",padding:"5px 7px 5px 7px",alignItems:"center"},children:(0,I.jsx)(_.Z,{type:"submit",variant:"contained",sx:{width:"150px",marginLeft:"5px",height:"auto",borderRadius:"40px",backgroundColor:"#232323","&::after":{boxShadow:"0 0 5px 5px rgba(0, 0, 0, 0.9)",borderRadius:"40px"},"&:hover":{backgroundColor:"#686868 !important"}},children:"Confirm"})})]})]}),(0,I.jsx)(v.Z,{})]})]})},H=function(e){var t=e,r=(0,s.useMemo)((function(){var e=[];return t&&t.forEach((function(r,n){t.length>0&&r.Projects.forEach((function(t){var n={project_id:t.project_id,client_id:r.client_id,client_name:r.client_name,group_id:t.Group.group_id,group_name:t.Group.group_name,project_code:t.project_code,project_name:t.project_name,created_date:t.created_date,start_date:y()(t.start_date).format("DD-MM-YYYY"),finish_date:y()(t.finish_date).format("DD-MM-YYYY"),due_date:y()(t.due_date).format("DD-MM-YYYY"),is_active:t.is_active,is_deleted:t.is_deleted};e.push(n)}))})),e}),[t]).slice().sort((function(e,t){return new Date(e.created_date)-new Date(t.created_date)}));return r.forEach((function(e,t){e.autoNumber=t+1})),r},V=r(51997),E=r(65954),N=r(42832),z=r(61689),W=r(25002),q=r(51405),G=r(74748),A=r(83213),O=r(94044),$=r(43997),K=r(30686).useTheme,Q=function(e,t,r){K();return[{Header:"No",accessor:"autoNumber",className:"cell-right",width:"5%",disableSortBy:!0},{Header:"ProjectId",accessor:"project_id",disableSortBy:!0,hidden:!0},{Header:"Project Code",accessor:"project_code",disableSortBy:!0,truncate:10,width:"10%"},{Header:"Project Name",accessor:"project_name",truncate:20,disableSortBy:!0},{Header:"Client Id",accessor:"client_id",disableSortBy:!0,hidden:!0},{Header:"Client Name",accessor:"client_name",truncate:20,disableSortBy:!0},{Header:"Group Id",accessor:"group_id",disableSortBy:!0,hidden:!0},{Header:"Group",accessor:"group_name",disableSortBy:!0,hidden:!0},{Header:"Start Date",accessor:"start_date",disableSortBy:!0},{Header:"Finish Date",accessor:"finish_date",disableSortBy:!0},{Header:"Go Live",accessor:"due_date"},{Header:"CreateDate",accessor:"created_date",disableSortBy:!0,hidden:!0},{Header:"Is Active",accessor:"is_active",disableSortBy:!0,hidden:!0},{Header:"Is Deleted",accessor:"is_deleted",disableSortBy:!0,hidden:!0},{Header:"Actions",accessor:"action",className:"cell-center",width:"10%",disableSortBy:!0,Cell:function(n){var o=n.row,a=o.values,c=(o.isExpanded,o.toggleRowExpanded,(0,s.useState)(null)),l=(0,i.Z)(c,2),u=l[0],d=l[1];return(0,I.jsxs)(N.Z,{direction:"row",alignItems:"center",justifyContent:"center",spacing:0,children:[(0,I.jsx)(z.Z,{title:"See More",children:(0,I.jsx)(O.Z,{color:"secondary",onClick:function(e){d(e.currentTarget)},children:(0,I.jsx)($.Z,{})})}),(0,I.jsxs)(W.ZP,{open:Boolean(u),anchorEl:u,onClose:function(){d(null)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:[(0,I.jsxs)(q.Z,{onClick:function(r){r.stopPropagation(),t(a),e()},children:[(0,I.jsx)(G.Z,{children:(0,I.jsx)(E.Z,{fontSize:"small",sx:{color:"#0066FF"}})}),(0,I.jsx)(A.Z,{primary:"Edit"})]}),(0,I.jsxs)(q.Z,{disabled:a.is_active,onClick:function(){r(a)},children:[(0,I.jsx)(G.Z,{children:(0,I.jsx)(V.Z,{fontSize:"small",sx:{color:"#ED4040"}})}),(0,I.jsx)(A.Z,{primary:"Delete"})]})]})]})}}]},U=r(779),X=function(){(0,c.Z)();var e=(0,s.useState)(null),t=(0,i.Z)(e,2),r=t[0],p=t[1],f=(0,s.useState)(!1),m=(0,i.Z)(f,2),x=m[0],h=m[1],Z=(0,s.useState)(!1),g=(0,i.Z)(Z,2),_=g[0],v=g[1],j=(0,s.useState)(),C=(0,i.Z)(j,2),b=C[0],w=C[1],y=(0,s.useState)(!1),S=(0,i.Z)(y,2),Y=S[0],P=S[1],D=H(b),M=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){var t,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.Z.work.fetchSubDataProject();case 3:t=e.sent,r=t.data,t.isStatus&&w(r),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){M()}),[]);var B=function(){h(!x),r&&x&&p(null),E(!0),E(!V)},F=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v(!_),r&&_&&p(null),P(!0),P(!Y);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=(0,s.useState)(!1),R=(0,i.Z)(k,2),V=R[0],E=R[1],N=Q(B,p,(function(e){(0,U.Z)(e,M,"project")})),z={customer:r,onCancel:function(){return B()},fetchWorkTable:function(){return M()}},W={columns:N,data:D,getHeaderProps:function(e){return e.getSortByToggleProps()},handleAdd:function(){return B()},handleSelect:function(){return F()},nameCreateButton:"Project",sortColumn:"created_date",fixColumnR:"action",fixColumnL:"autoNumber",checkProject:"thisIsProject"};return(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{children:[(0,I.jsx)("div",{style:{overflowX:"auto",maxWidth:"100%"},children:(0,I.jsx)(u.Z,(0,n.Z)({},W))}),(0,I.jsx)(l.Z,{maxWidth:"lg",fullWidth:!0,open:V,PaperProps:{sx:{borderRadius:"10px"}},children:V&&(0,I.jsx)(L,(0,n.Z)({},z))}),(0,I.jsx)(l.Z,{maxWidth:"sm",fullWidth:!0,open:Y,PaperProps:{sx:{borderRadius:"10px"}},children:Y&&(0,I.jsx)(T,{customer:r,onCancel:F,fetchWorkTable:M})})]})})}},35397:function(e,t,r){r.d(t,{KO:function(){return f},KR:function(){return x}});var n=r(1413),o=r(29439),a=r(45987),i=r(47313),s=r(49914),c=r(45110),l=r(3732),u=(r(94044),r(40765)),d=r(46417),p=["preGlobalFilteredRows","globalFilter","setGlobalFilter"];function f(e){var t=e.preGlobalFilteredRows,r=e.globalFilter,l=e.setGlobalFilter,f=(0,a.Z)(e,p),m=t.length,x=(0,i.useState)(r),h=(0,o.Z)(x,2),Z=h[0],g=h[1],_=(0,c.useAsyncDebounce)((function(e){l(e||void 0)}),200);return(0,d.jsx)(s.Z,(0,n.Z)({value:Z||"",onChange:function(e){g(e.target.value),_(e.target.value)},placeholder:"Search ".concat(m," records..."),id:"start-adornment-email",startAdornment:(0,d.jsx)(u.Z,{})},f))}function m(e,t,r){return(0,l.Lu)(e,r,{keys:[function(e){return e.values[t]}]})}m.autoRemove=function(e){return!e};var x=function(){return{fuzzyText:m,text:function(e,t,r){e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(r).toLowerCase())}))}}}}}]);