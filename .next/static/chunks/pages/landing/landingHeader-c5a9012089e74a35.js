(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6628],{94184:function(e,t){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var o={}.hasOwnProperty;function classNames(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var i=classNames.apply(null,n);i&&e.push(i)}}else if("object"===r){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var a in n)o.call(n,a)&&n[a]&&e.push(a)}}}return e.join(" ")}e.exports?(classNames.default=classNames,e.exports=classNames):void 0!==(n=(function(){return classNames}).apply(t,[]))&&(e.exports=n)}()},71174:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/landing/landingHeader",function(){return n(34571)}])},34571:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return landingHeader}});var o=n(85893),r=n(67294),i=n(65706),a=n(79862),c=n(67955),s=n(78652),l=n(28055),u=n(45697),f=n.n(u),p=n(94184),d=n.n(p),y=n(23305),b=n(22040);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var h=["className","cssModule","divider","tag","header","active","text"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var m={children:f().node,active:f().bool,disabled:f().bool,divider:f().bool,tag:b.iC,header:f().bool,onClick:f().func,className:f().string,cssModule:f().object,toggle:f().bool,text:f().bool},g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}(DropdownItem,e);var t,n,o,i=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,n=_getPrototypeOf(DropdownItem);if(t){var o=_getPrototypeOf(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return function(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}(this,e)});function DropdownItem(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,DropdownItem),(t=i.call(this,e)).onClick=t.onClick.bind(_assertThisInitialized(t)),t.getTabIndex=t.getTabIndex.bind(_assertThisInitialized(t)),t}return n=[{key:"onClick",value:function(e){var t,n=this.props,o=n.disabled,r=n.header,i=n.divider,a=n.text;if(o||r||i||a){e.preventDefault();return}this.props.onClick&&this.props.onClick(e),(null===(t=this.props.toggle)||void 0===t||t)&&this.context.toggle(e)}},{key:"getRole",value:function(){return"listbox"===this.context.menuRole?"option":"menuitem"}},{key:"getTabIndex",value:function(){var e=this.props,t=e.disabled,n=e.header,o=e.divider,r=e.text;return t||n||o||r?"-1":"0"}},{key:"render",value:function(){var e=this.getTabIndex(),t=e>-1?this.getRole():void 0,n=(0,b.CE)(this.props,["toggle"]),o=n.className,i=n.cssModule,a=n.divider,c=n.tag,s=void 0===c?"button":c,l=n.header,u=n.active,f=n.text,p=function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(n,h),y=(0,b.mx)(d()(o,{disabled:p.disabled,"dropdown-item":!a&&!l&&!f,active:u,"dropdown-header":l,"dropdown-divider":a,"dropdown-item-text":f}),i);return"button"===s&&(l?s="h6":a?s="div":p.href?s="a":f&&(s="span")),r.createElement(s,_extends({type:"button"===s&&(p.onClick||this.props.toggle)?"button":void 0},p,{tabIndex:e,role:t,className:y,onClick:this.onClick}))}}],_defineProperties(DropdownItem.prototype,n),o&&_defineProperties(DropdownItem,o),Object.defineProperty(DropdownItem,"prototype",{writable:!1}),DropdownItem}(r.Component);g.propTypes=m,g.contextType=y.D;var v=n(35510),O=n(81051),x=n(11163);n(41664);var _=n(23665);let w=[{path:"/auth/signUp",name:"Join as an Expert"},{path:"",name:"Contact Us"},{path:"",name:"About Us"}];var landingHeader=e=>{var t,n;let[u,f]=(0,r.useState)(!1),p=(0,x.useRouter)(),[d,y]=(0,r.useState)(!1),[b,h]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let handleResize=()=>{let e=window.innerWidth<390;h(e)};return window.addEventListener("resize",handleResize),handleResize(),()=>{window.removeEventListener("resize",handleResize)}},[]),(0,o.jsx)(r.Fragment,{children:(0,o.jsxs)("div",{className:"row",style:{position:"sticky",top:0,zIndex:1e3,backgroundColor:"white",margin:0,paddingBottom:"20px"},children:[(0,o.jsx)("div",{className:"col-1 col-sm-2 col-md-1 col-lg-4",children:(0,o.jsx)("img",{src:"/assets/images/netquix_logo.png",alt:"logo",className:"mt-3 header-image-logo",style:{marginLeft:"25px"}})}),(0,o.jsxs)("div",{className:"col-11 col-sm-10 col-md-11 col-lg-8",children:[(0,o.jsx)("button",{className:"navbar-toggler d-xl-none",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":d?"true":"false","aria-label":"Toggle navigation",onClick:()=>y(!d),style:{float:"right"},children:(0,o.jsx)("i",{className:"fa fa-bars",style:{marginTop:"40px",cursor:"pointer"},"aria-hidden":"true"})}),(0,o.jsx)(i.Z,{className:"navbar-collapse d-xl-block ".concat(d?"show":""),id:"navbarNav",children:(0,o.jsxs)(a.Z,{navbar:!!b&&!!d,className:"border-0 d-flex  mr-4 navbaritem ".concat(d?"d-none":""),style:{marginLeft:b?"0%":"8%",marginTop:b?"25%":"40px",float:b?"left":"right",alignItems:b?"":"end"},children:[(0,o.jsxs)(c.Z,{nav:!0,isOpen:u,toggle:()=>f(!u),children:[(0,o.jsx)(s.Z,{nav:!0,caret:!0,style:{fontSize:"16px",color:"grey"},children:"Categories"}),(0,o.jsx)(l.Z,{children:null==e?void 0:null===(n=e.masterRecords)||void 0===n?void 0:null===(t=n.category)||void 0===t?void 0:t.map((e,t)=>(0,o.jsx)(g,{style:{textDecoration:"underline",textUnderlineOffset:"0.4em",textDecorationColor:"#000080",fontWeight:500},children:e},"master_data".concat(t)))})]}),w.map((e,t)=>(0,o.jsx)(v.Z,{children:(0,o.jsx)(O.Z,{href:e.path,style:{fontSize:"16px",color:"grey"},children:e.name})},"headers-".concat(t))),(0,o.jsx)("button",{type:"button",className:"btn btn-primary btn-sm",style:{width:"82px",padding:"11px",alignItems:"center",fontSize:"14px",color:"white",cursor:"pointer"},onClick:()=>p.push(_.R0.signUp),children:"SignUp"}),(0,o.jsx)("button",{type:"button",className:"mt-xs-5 btn btn-primary btn-sm",style:{width:"82px",padding:"11px",marginright:"5px",marginLeft:b?"1px":"5px",marginTop:b?"10px":null,alignItems:"center",fontSize:"14px",color:"white",cursor:"pointer"},onClick:()=>p.push(_.R0.signIn),children:"Login"})]})})]})]})})}},92703:function(e,t,n){"use strict";var o=n(50414);function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,e.exports=function(){function shim(e,t,n,r,i,a){if(a!==o){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function getShim(){return shim}shim.isRequired=shim;var e={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return e.PropTypes=e,e}},45697:function(e,t,n){e.exports=n(92703)()},50414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},81051:function(e,t,n){"use strict";var o=n(67294),r=n(45697),i=n.n(r),a=n(94184),c=n.n(a),s=n(22040);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var l=["className","cssModule","active","tag","innerRef"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var u={active:i().bool,className:i().string,cssModule:i().object,disabled:i().bool,href:i().any,innerRef:i().oneOfType([i().object,i().func,i().string]),onClick:i().func,tag:s.iC},f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}(NavLink,e);var t,n,r,i=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,n=_getPrototypeOf(NavLink);if(t){var o=_getPrototypeOf(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return function(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}(this,e)});function NavLink(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,NavLink),(t=i.call(this,e)).onClick=t.onClick.bind(_assertThisInitialized(t)),t}return n=[{key:"onClick",value:function(e){if(this.props.disabled){e.preventDefault();return}"#"===this.props.href&&e.preventDefault(),this.props.onClick&&this.props.onClick(e)}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.cssModule,r=e.active,i=e.tag,a=void 0===i?"a":i,u=e.innerRef,f=function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,l),p=(0,s.mx)(c()(t,"nav-link",{disabled:f.disabled,active:r}),n);return o.createElement(a,_extends({},f,{ref:u,onClick:this.onClick,className:p}))}}],_defineProperties(NavLink.prototype,n),r&&_defineProperties(NavLink,r),Object.defineProperty(NavLink,"prototype",{writable:!1}),NavLink}(o.Component);f.propTypes=u,t.Z=f},22040:function(e,t,n){"use strict";n.d(t,{CE:function(){return omit},Do:function(){return d},E5:function(){return p},Kn:function(){return isObject},Nq:function(){return y},O4:function(){return warnOnce},Rf:function(){return conditionallyUpdateScrollbar},U9:function(){return getTarget},X9:function(){return getOriginalBodyPadding},ei:function(){return pick},iC:function(){return l},ku:function(){return b},mx:function(){return mapToCssModules},pp:function(){return setScrollbarWidth},qW:function(){return s},rb:function(){return f},wF:function(){return u},x9:function(){return deprecated}});var o,r=n(45697),i=n.n(r);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function setScrollbarWidth(e){document.body.style.paddingRight=e>0?"".concat(e,"px"):null}function getOriginalBodyPadding(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function conditionallyUpdateScrollbar(){var e,t,n=((e=document.createElement("div")).style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e),t=e.offsetWidth-e.clientWidth,document.body.removeChild(e),t),o=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],r=o?parseInt(o.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&setScrollbarWidth(r+n)}function mapToCssModules(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;return t?e.split(" ").map(function(e){return t[e]||e}).join(" "):e}function omit(e,t){var n={};return Object.keys(e).forEach(function(o){-1===t.indexOf(o)&&(n[o]=e[o])}),n}function pick(e,t){for(var n,o=Array.isArray(t)?t:[t],r=o.length,i={};r>0;)r-=1,i[n=o[r]]=e[n];return i}var a={};function warnOnce(e){a[e]||("undefined"!=typeof console&&console.error(e),a[e]=!0)}function deprecated(e,t){return function(n,o,r){null!==n[o]&&void 0!==n[o]&&warnOnce('"'.concat(o,'" property of "').concat(r,'" has been deprecated.\n').concat(t));for(var i=arguments.length,a=Array(i>3?i-3:0),c=3;c<i;c++)a[c-3]=arguments[c];return e.apply(void 0,[n,o,r].concat(a))}}var c=("undefined"==typeof window?"undefined":_typeof(window))==="object"&&window.Element||function(){},s=i().oneOfType([i().string,i().func,function(e,t,n){if(!(e[t]instanceof c))return Error("Invalid prop `"+t+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")},i().shape({current:i().any})]),l=i().oneOfType([i().func,i().string,i().shape({$$typeof:i().symbol,render:i().func}),i().arrayOf(i().oneOfType([i().func,i().string,i().shape({$$typeof:i().symbol,render:i().func})]))]),u={Fade:150,Collapse:350,Modal:300,Carousel:600,Offcanvas:300},f=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],p={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},d={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},y=!!("undefined"!=typeof window&&window.document&&window.document.createElement);function isObject(e){var t=_typeof(e);return null!=e&&("object"===t||"function"===t)}function isArrayOrNodeList(e){return null!==e&&(Array.isArray(e)||y&&"number"==typeof e.length)}function getTarget(e,t){var n=function(e){if(e&&"object"===_typeof(e)&&"current"in e)return e.current;if(function(e){if(!isObject(e))return!1;var t=null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e);return"[object Function]"===t||"[object AsyncFunction]"===t||"[object GeneratorFunction]"===t||"[object Proxy]"===t}(e))return e();if("string"==typeof e&&y){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#".concat(e))),!t.length)throw Error("The target '".concat(e,"' could not be identified in the dom, tip: check spelling"));return t}return e}(e);return t?isArrayOrNodeList(n)?n:null===n?[]:[n]:isArrayOrNodeList(n)?n[0]:n}var b=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal):not(.offcanvas)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']}},function(e){e.O(0,[1664,9290,1312,5340,5224,9774,2888,179],function(){return e(e.s=71174)}),_N_E=e.O()}]);