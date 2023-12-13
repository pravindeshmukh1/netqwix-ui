"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5340],{67955:function(e,t,n){n.d(t,{Z:function(){return g}});var o=n(67294),r=n(45697),i=n.n(r),s=n(81385),a=n(94184),c=n.n(a),l=n(23305),u=n(22040),p=o.createContext({});function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var f=["className","cssModule","direction","isOpen","group","size","nav","setActiveFromChild","active","tag","menuRole"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h={a11y:i().bool,disabled:i().bool,direction:i().oneOf(["up","down","start","end","left","right"]),group:i().bool,isOpen:i().bool,nav:i().bool,active:i().bool,size:i().string,tag:u.iC,toggle:i().func,children:i().node,className:i().string,cssModule:i().object,dropup:i().bool,inNavbar:i().bool,setActiveFromChild:i().bool,menuRole:i().oneOf(["listbox","menu"])},d=[u.Do.space,u.Do.enter,u.Do.up,u.Do.down,u.Do.end,u.Do.home],y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}(Dropdown,e);var t,n,r,i=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,n=_getPrototypeOf(Dropdown);if(t){var o=_getPrototypeOf(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return function(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}(this,e)});function Dropdown(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,Dropdown),(t=i.call(this,e)).addEvents=t.addEvents.bind(_assertThisInitialized(t)),t.handleDocumentClick=t.handleDocumentClick.bind(_assertThisInitialized(t)),t.handleKeyDown=t.handleKeyDown.bind(_assertThisInitialized(t)),t.removeEvents=t.removeEvents.bind(_assertThisInitialized(t)),t.toggle=t.toggle.bind(_assertThisInitialized(t)),t.handleMenuRef=t.handleMenuRef.bind(_assertThisInitialized(t)),t.handleToggleRef=t.handleToggleRef.bind(_assertThisInitialized(t)),t.containerRef=o.createRef(),t.menuRef=o.createRef(),t.toggleRef=o.createRef(),t}return n=[{key:"componentDidMount",value:function(){this.handleProps()}},{key:"componentDidUpdate",value:function(e){this.props.isOpen!==e.isOpen&&this.handleProps()}},{key:"componentWillUnmount",value:function(){this.removeEvents()}},{key:"handleMenuRef",value:function(e){this.menuRef.current=e}},{key:"handleToggleRef",value:function(e){this.toggleRef.current=e}},{key:"handleDocumentClick",value:function(e){if(!e||3!==e.which&&("keyup"!==e.type||e.which===u.Do.tab)){var t=this.getContainer(),n=this.getMenu(),o=this.getToggle().contains(e.target),r=n&&n.contains(e.target)&&n!==e.target,i=!1;t&&(i=t.classList.contains("input-group")&&t.classList.contains("dropdown")&&"INPUT"===e.target.tagName),(o&&!i||r)&&("keyup"!==e.type||e.which===u.Do.tab)||this.toggle(e)}}},{key:"handleKeyDown",value:function(e){var t,n=this,o="menuitem"===e.target.getAttribute("role")||"option"===e.target.getAttribute("role"),r=this.getMenuCtrl()===e.target,i=u.Do.tab===e.which;if(!/input|textarea/i.test(e.target.tagName)&&(!i||this.props.a11y)&&(!i||o||r)&&((-1!==d.indexOf(e.which)||e.which>=48&&e.which<=90)&&e.preventDefault(),!this.props.disabled&&(r&&([u.Do.space,u.Do.enter,u.Do.up,u.Do.down].indexOf(e.which)>-1?(this.props.isOpen||this.toggle(e),setTimeout(function(){var e;return null===(e=n.getMenuItems()[0])||void 0===e?void 0:e.focus()})):this.props.isOpen&&i?(e.preventDefault(),null===(t=this.getMenuItems()[0])||void 0===t||t.focus()):this.props.isOpen&&e.which===u.Do.esc&&this.toggle(e)),this.props.isOpen&&o))){if([u.Do.tab,u.Do.esc].indexOf(e.which)>-1)this.toggle(e),this.getMenuCtrl().focus();else if([u.Do.space,u.Do.enter].indexOf(e.which)>-1)e.target.click(),this.getMenuCtrl().focus();else if([u.Do.down,u.Do.up].indexOf(e.which)>-1||[u.Do.n,u.Do.p].indexOf(e.which)>-1&&e.ctrlKey){var s=this.getMenuItems(),a=s.indexOf(e.target);u.Do.up===e.which||u.Do.p===e.which&&e.ctrlKey?a=0!==a?a-1:s.length-1:(u.Do.down===e.which||u.Do.n===e.which&&e.ctrlKey)&&(a=a===s.length-1?0:a+1),s[a].focus()}else if(u.Do.end===e.which){var c=this.getMenuItems();c[c.length-1].focus()}else if(u.Do.home===e.which)this.getMenuItems()[0].focus();else if(e.which>=48&&e.which<=90){for(var l=this.getMenuItems(),p=String.fromCharCode(e.which).toLowerCase(),f=0;f<l.length;f+=1)if((l[f].textContent&&l[f].textContent[0].toLowerCase())===p){l[f].focus();break}}}}},{key:"handleProps",value:function(){this.props.isOpen?this.addEvents():this.removeEvents()}},{key:"getContextValue",value:function(){return{toggle:this.toggle,isOpen:this.props.isOpen,direction:"down"===this.props.direction&&this.props.dropup?"up":this.props.direction,inNavbar:this.props.inNavbar,disabled:this.props.disabled,onMenuRef:this.handleMenuRef,onToggleRef:this.handleToggleRef,menuRole:this.props.menuRole}}},{key:"getContainer",value:function(){return this.containerRef.current}},{key:"getMenu",value:function(){return this.menuRef.current}},{key:"getToggle",value:function(){return this.toggleRef.current}},{key:"getMenuCtrl",value:function(){return this._$menuCtrl||(this._$menuCtrl=this.getToggle()),this._$menuCtrl}},{key:"getItemType",value:function(){return"listbox"===this.props.menuRole?"option":"menuitem"}},{key:"getMenuItems",value:function(){var e=this.getMenu()||this.getContainer();return[].slice.call(e.querySelectorAll('[role="'.concat(this.getItemType(),'"]')))}},{key:"addEvents",value:function(){var e=this;["click","touchstart","keyup"].forEach(function(t){return document.addEventListener(t,e.handleDocumentClick,!0)})}},{key:"removeEvents",value:function(){var e=this;["click","touchstart","keyup"].forEach(function(t){return document.removeEventListener(t,e.handleDocumentClick,!0)})}},{key:"toggle",value:function(e){return this.props.disabled?e&&e.preventDefault():this.props.toggle(e)}},{key:"render",value:function(){var e,t=this,n=(0,u.CE)(this.props,["toggle","disabled","inNavbar","a11y"]),r=n.className,i=n.cssModule,a=n.direction,p=n.isOpen,h=n.group,d=n.size,y=n.nav,g=n.setActiveFromChild,b=n.active,v=n.tag,m=(n.menuRole,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(n,f)),O=v||(y?"li":"div"),w=!1;g&&o.Children.map(this.props.children[1].props.children,function(e){e&&e.props.active&&(w=!0)});var _=(0,u.mx)(c()(r,!!y&&!!b&&"active",!!g&&!!w&&"active",(_defineProperty(e={"btn-group":h},"btn-group-".concat(d),!!d),_defineProperty(e,"dropdown",!h),_defineProperty(e,"dropup","up"===a),_defineProperty(e,"dropstart","start"===a||"left"===a),_defineProperty(e,"dropend","end"===a||"right"===a),_defineProperty(e,"show",p),_defineProperty(e,"nav-item",y),e)),i);return this.context.insideInputGroup?o.createElement(l.D.Provider,{value:this.getContextValue()},o.createElement(s.dK,null,o.Children.map(this.props.children,function(e){return o.cloneElement(e,{onKeyDown:t.handleKeyDown})}))):o.createElement(l.D.Provider,{value:this.getContextValue()},o.createElement(s.dK,null,o.createElement(O,_extends({},m,_defineProperty({},"string"==typeof O?"ref":"innerRef",this.containerRef),{onKeyDown:this.handleKeyDown,className:_}))))}}],_defineProperties(Dropdown.prototype,n),r&&_defineProperties(Dropdown,r),Object.defineProperty(Dropdown,"prototype",{writable:!1}),Dropdown}(o.Component);y.propTypes=h,y.defaultProps={a11y:!0,isOpen:!1,direction:"down",nav:!1,active:!1,inNavbar:!1,setActiveFromChild:!1},y.contextType=p;var g=y},23305:function(e,t,n){n.d(t,{D:function(){return o}});var o=n(67294).createContext({})},78652:function(e,t,n){var o=n(67294),r=n(45697),i=n.n(r),s=n(94184),a=n.n(s),c=n(63351),l=n(23305),u=n(22040),p=n(84082);function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var f=["className","color","cssModule","caret","split","nav","tag","innerRef"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h={caret:i().bool,color:i().string,children:i().node,className:i().string,cssModule:i().object,disabled:i().bool,onClick:i().func,"aria-haspopup":i().bool,split:i().bool,tag:u.iC,nav:i().bool,innerRef:i().oneOfType([i().object,i().string,i().func])},d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}(DropdownToggle,e);var t,n,r,i=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,n=_getPrototypeOf(DropdownToggle);if(t){var o=_getPrototypeOf(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return function(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}(this,e)});function DropdownToggle(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,DropdownToggle),(t=i.call(this,e)).onClick=t.onClick.bind(_assertThisInitialized(t)),t}return n=[{key:"onClick",value:function(e){if(this.props.disabled||this.context.disabled){e.preventDefault();return}this.props.nav&&!this.props.tag&&e.preventDefault(),this.props.onClick&&this.props.onClick(e),this.context.toggle(e)}},{key:"getRole",value:function(){return this.context.menuRole||this.props["aria-haspopup"]}},{key:"render",value:function(){var e,t=this,n=this.props,r=n.className,i=n.color,s=n.cssModule,l=n.caret,h=n.split,d=n.nav,y=n.tag,g=n.innerRef,b=function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(n,f),v=b["aria-label"]||"Toggle Dropdown",m=(0,u.mx)(a()(r,{"dropdown-toggle":l||h,"dropdown-toggle-split":h,"nav-link":d}),s),O=void 0!==b.children?b.children:o.createElement("span",{className:"visually-hidden"},v);return(d&&!y?(e="a",b.href="#"):y?e=y:(e=p.Z,b.color=i,b.cssModule=s),this.context.inNavbar)?o.createElement(e,_extends({},b,{className:m,onClick:this.onClick,ref:this.context.onToggleRef,"aria-expanded":this.context.isOpen,"aria-haspopup":this.getRole(),children:O})):o.createElement(c.s,{innerRef:g},function(n){var r,i,s,a=n.ref;return o.createElement(e,_extends({},b,(r={},i="string"==typeof e?"ref":"innerRef",s=function(e){a(e);var n=t.context.onToggleRef;n&&n(e)},i in r?Object.defineProperty(r,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[i]=s,r),{className:m,onClick:t.onClick,"aria-expanded":t.context.isOpen,"aria-haspopup":t.getRole(),children:O}))})}}],_defineProperties(DropdownToggle.prototype,n),r&&_defineProperties(DropdownToggle,r),Object.defineProperty(DropdownToggle,"prototype",{writable:!1}),DropdownToggle}(o.Component);d.propTypes=h,d.defaultProps={color:"secondary","aria-haspopup":!0},d.contextType=l.D,t.Z=d}}]);