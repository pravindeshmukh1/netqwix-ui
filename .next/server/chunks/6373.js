"use strict";exports.id=6373,exports.ids=[6373],exports.modules={6373:(e,a,n)=>{n.r(a),n.d(a,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var s=n(997),l=n(1163),r=n(6689),i=n(1664),d=n.n(i),o=n(6981);let __WEBPACK_DEFAULT_EXPORT__=()=>{let e=(0,l.useRouter)(),[a,n]=(0,r.useState)(!1),[i,c]=(0,r.useState)(!1),[t,h]=(0,r.useState)(!1),[g,x]=(0,r.useState)(!1),handleScroll=()=>{window.scrollY>60?document.querySelector(".landing-header").classList.add("fixed"):document.querySelector(".landing-header").classList.remove("fixed")};return(0,r.useEffect)(()=>(window.addEventListener("scroll",handleScroll),handleScroll(),()=>{window.removeEventListener("scroll",handleScroll)}),[]),s.jsx("div",{children:s.jsx("div",{className:`${"/landing"===e.pathname||"/"===e.pathname?"theme-landing":""}`,children:s.jsx("header",{id:"home",className:"header",children:s.jsx(o.Container,{className:"custom-container",children:s.jsx(o.Row,{children:s.jsx(o.Col,{className:"col-12",children:s.jsx("div",{className:"landing-header",children:s.jsx("div",{className:"main-menu",children:(0,s.jsxs)(o.Navbar,{className:"navbar navbar-expand-xl navbar-light",children:[s.jsx(d(),{className:"navbar-brand",href:"/landing",children:s.jsx("div",{className:"logo-block",children:s.jsx("img",{className:"img-fluid",src:"/assets/images/logo/landing-logo.png",alt:"logo"})})}),s.jsx("button",{className:"navbar-toggler d-xl-none",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":g,"aria-label":"Toggle navigation",onClick:()=>x(!g),children:s.jsx("span",{className:"navbar-toggler-icon"})}),s.jsx(o.Collapse,{className:"navbar-collapse d-xl-block",id:"navbarNav",isOpen:g,children:(0,s.jsxs)(o.Nav,{className:"mr-auto",navbar:!0,children:[s.jsx(o.NavItem,{className:"active",children:s.jsx(d(),{href:"/messenger",children:"Messenger"})}),(0,s.jsxs)(o.Dropdown,{nav:!0,isOpen:a,toggle:()=>n(e=>!e),children:[s.jsx(o.DropdownToggle,{nav:!0,caret:!0,children:"Blog"}),(0,s.jsxs)(o.DropdownMenu,{children:[s.jsx(d(),{href:"/blog/rightSidebar",children:"Blog Right sidebar"}),s.jsx(d(),{href:"/blog/leftSidebar",children:"Blog Left sidebar"}),s.jsx(d(),{href:"/blog/detailSidebar",children:"Blog Details"}),s.jsx(d(),{href:"/blog/noSidebar",children:"Blog No sidebar"})]})]}),(0,s.jsxs)(o.Dropdown,{nav:!0,isOpen:i,toggle:()=>c(e=>!e),children:[s.jsx(o.DropdownToggle,{nav:!0,caret:!0,children:"Authentication"}),(0,s.jsxs)(o.DropdownMenu,{children:[s.jsx(d(),{href:"/auth/signIn",children:"Signin"}),s.jsx(d(),{href:"/auth/signInClassic",children:"Signin Classic"}),s.jsx(d(),{href:"/auth/signUp",children:"Signup"}),s.jsx(d(),{href:"/auth/signUpClassic",children:"Signup Classic"})]})]}),(0,s.jsxs)(o.Dropdown,{nav:!0,isOpen:t,toggle:()=>h(e=>!e),children:[s.jsx(o.DropdownToggle,{nav:!0,caret:!0,children:"Bouns page"}),(0,s.jsxs)(o.DropdownMenu,{children:[s.jsx(d(),{href:"/bonus/about",children:"About"}),s.jsx(d(),{href:"/bonus/faq",children:"FAQ"}),s.jsx(d(),{href:"/bonus/elements",children:"Elements"}),s.jsx(d(),{href:"/bonus/price",children:"Price"})]})]})]})})]})})})})})})})})})}}};