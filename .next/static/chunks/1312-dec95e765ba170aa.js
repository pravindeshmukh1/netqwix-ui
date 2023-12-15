(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1312],{81385:function(e,t,n){"use strict";n.d(t,{C8:function(){return o},dK:function(){return Manager},mq:function(){return i}});var r=n(67294),o=r.createContext(),i=r.createContext();function Manager(e){var t=e.children,n=r.useState(null),a=n[0],s=n[1],c=r.useRef(!1);r.useEffect(function(){return function(){c.current=!0}},[]);var l=r.useCallback(function(e){c.current||s(e)},[]);return r.createElement(o.Provider,{value:a},r.createElement(i.Provider,{value:l},t))}},74688:function(e,t,n){"use strict";n.d(t,{r:function(){return Popper}});var r=n(67294),o=n(81385),i=n(67139),a=n(46440),NOOP=function(){},NOOP_PROMISE=function(){return Promise.resolve(null)},s=[];function Popper(e){var t=e.placement,n=void 0===t?"bottom":t,c=e.strategy,l=void 0===c?"absolute":c,f=e.modifiers,u=void 0===f?s:f,p=e.referenceElement,d=e.onFirstUpdate,m=e.innerRef,g=e.children,v=r.useContext(o.C8),y=r.useState(null),h=y[0],b=y[1],O=r.useState(null),w=O[0],x=O[1];r.useEffect(function(){(0,i.k$)(m,h)},[m,h]);var P=r.useMemo(function(){return{placement:n,strategy:l,onFirstUpdate:d,modifiers:[].concat(u,[{name:"arrow",enabled:null!=w,options:{element:w}}])}},[n,l,d,u,w]),j=(0,a.D)(p||v,h,P),E=j.state,S=j.styles,M=j.forceUpdate,N=j.update,C=r.useMemo(function(){return{ref:b,style:S.popper,placement:E?E.placement:n,hasPopperEscaped:E&&E.modifiersData.hide?E.modifiersData.hide.hasPopperEscaped:null,isReferenceHidden:E&&E.modifiersData.hide?E.modifiersData.hide.isReferenceHidden:null,arrowProps:{style:S.arrow,ref:x},forceUpdate:M||NOOP,update:N||NOOP_PROMISE}},[b,x,n,E,S,N,M]);return(0,i.$p)(g)(C)}},63351:function(e,t,n){"use strict";n.d(t,{s:function(){return Reference}});var r=n(67294),o=n(42473),i=n.n(o),a=n(81385),s=n(67139);function Reference(e){var t=e.children,n=e.innerRef,o=r.useContext(a.mq),c=r.useCallback(function(e){(0,s.k$)(n,e),(0,s.DL)(o,e)},[n,o]);return r.useEffect(function(){return function(){return(0,s.k$)(n,null)}},[]),r.useEffect(function(){i()(!!o,"`Reference` should not be used outside of a `Manager` component.")},[o]),(0,s.$p)(t)({ref:c})}},46440:function(e,t,n){"use strict";n.d(t,{D:function(){return usePopper}});var r,o,i,a,s,c=n(67294),l=n(73935);function getWindow(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function isElement(e){var t=getWindow(e).Element;return e instanceof t||e instanceof Element}function isHTMLElement(e){var t=getWindow(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function isShadowRoot(e){if("undefined"==typeof ShadowRoot)return!1;var t=getWindow(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}var f=Math.max,u=Math.min,p=Math.round;function getUAString(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function isLayoutViewport(){return!/^((?!chrome|android).)*safari/i.test(getUAString())}function getBoundingClientRect(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&isHTMLElement(e)&&(o=e.offsetWidth>0&&p(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&p(r.height)/e.offsetHeight||1);var a=(isElement(e)?getWindow(e):window).visualViewport,s=!isLayoutViewport()&&n,c=(r.left+(s&&a?a.offsetLeft:0))/o,l=(r.top+(s&&a?a.offsetTop:0))/i,f=r.width/o,u=r.height/i;return{width:f,height:u,top:l,right:c+f,bottom:l+u,left:c,x:c,y:l}}function getWindowScroll(e){var t=getWindow(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function getNodeName(e){return e?(e.nodeName||"").toLowerCase():null}function getDocumentElement(e){return((isElement(e)?e.ownerDocument:e.document)||window.document).documentElement}function getWindowScrollBarX(e){return getBoundingClientRect(getDocumentElement(e)).left+getWindowScroll(e).scrollLeft}function getComputedStyle(e){return getWindow(e).getComputedStyle(e)}function isScrollParent(e){var t=getComputedStyle(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function getLayoutRect(e){var t=getBoundingClientRect(e),n=e.offsetWidth,r=e.offsetHeight;return 1>=Math.abs(t.width-n)&&(n=t.width),1>=Math.abs(t.height-r)&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function getParentNode(e){return"html"===getNodeName(e)?e:e.assignedSlot||e.parentNode||(isShadowRoot(e)?e.host:null)||getDocumentElement(e)}function listScrollParents(e,t){void 0===t&&(t=[]);var n,r=function getScrollParent(e){return["html","body","#document"].indexOf(getNodeName(e))>=0?e.ownerDocument.body:isHTMLElement(e)&&isScrollParent(e)?e:getScrollParent(getParentNode(e))}(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=getWindow(r),a=o?[i].concat(i.visualViewport||[],isScrollParent(r)?r:[]):r,s=t.concat(a);return o?s:s.concat(listScrollParents(getParentNode(a)))}function getTrueOffsetParent(e){return isHTMLElement(e)&&"fixed"!==getComputedStyle(e).position?e.offsetParent:null}function getOffsetParent(e){for(var t=getWindow(e),n=getTrueOffsetParent(e);n&&["table","td","th"].indexOf(getNodeName(n))>=0&&"static"===getComputedStyle(n).position;)n=getTrueOffsetParent(n);return n&&("html"===getNodeName(n)||"body"===getNodeName(n)&&"static"===getComputedStyle(n).position)?t:n||function(e){var t=/firefox/i.test(getUAString());if(/Trident/i.test(getUAString())&&isHTMLElement(e)&&"fixed"===getComputedStyle(e).position)return null;var n=getParentNode(e);for(isShadowRoot(n)&&(n=n.host);isHTMLElement(n)&&0>["html","body"].indexOf(getNodeName(n));){var r=getComputedStyle(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}var d="bottom",m="right",g="left",v="auto",y=["top",d,m,g],h="start",b="viewport",O="popper",w=y.reduce(function(e,t){return e.concat([t+"-"+h,t+"-end"])},[]),x=[].concat(y,[v]).reduce(function(e,t){return e.concat([t,t+"-"+h,t+"-end"])},[]),P=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"],j={placement:"bottom",modifiers:[],strategy:"absolute"};function areValidElements(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(e){return!(e&&"function"==typeof e.getBoundingClientRect)})}var E={passive:!0};function getBasePlacement(e){return e.split("-")[0]}function getVariation(e){return e.split("-")[1]}function getMainAxisFromPlacement(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function computeOffsets(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?getBasePlacement(o):null,a=o?getVariation(o):null,s=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2;switch(i){case"top":t={x:s,y:n.y-r.height};break;case d:t={x:s,y:n.y+n.height};break;case m:t={x:n.x+n.width,y:c};break;case g:t={x:n.x-r.width,y:c};break;default:t={x:n.x,y:n.y}}var l=i?getMainAxisFromPlacement(i):null;if(null!=l){var f="y"===l?"height":"width";switch(a){case h:t[l]=t[l]-(n[f]/2-r[f]/2);break;case"end":t[l]=t[l]+(n[f]/2-r[f]/2)}}return t}var S={top:"auto",right:"auto",bottom:"auto",left:"auto"};function mapToStyles(e){var t,n,r,o,i,a,s,c=e.popper,l=e.popperRect,f=e.placement,u=e.variation,v=e.offsets,y=e.position,h=e.gpuAcceleration,b=e.adaptive,O=e.roundOffsets,w=e.isFixed,x=v.x,P=void 0===x?0:x,j=v.y,E=void 0===j?0:j,M="function"==typeof O?O({x:P,y:E}):{x:P,y:E};P=M.x,E=M.y;var N=v.hasOwnProperty("x"),C=v.hasOwnProperty("y"),R=g,k="top",B=window;if(b){var D=getOffsetParent(c),T="clientHeight",A="clientWidth";D===getWindow(c)&&"static"!==getComputedStyle(D=getDocumentElement(c)).position&&"absolute"===y&&(T="scrollHeight",A="scrollWidth"),("top"===f||(f===g||f===m)&&"end"===u)&&(k=d,E-=(w&&D===B&&B.visualViewport?B.visualViewport.height:D[T])-l.height,E*=h?1:-1),(f===g||("top"===f||f===d)&&"end"===u)&&(R=m,P-=(w&&D===B&&B.visualViewport?B.visualViewport.width:D[A])-l.width,P*=h?1:-1)}var L=Object.assign({position:y},b&&S),W=!0===O?(t={x:P,y:E},n=getWindow(c),r=t.x,o=t.y,{x:p(r*(i=n.devicePixelRatio||1))/i||0,y:p(o*i)/i||0}):{x:P,y:E};return(P=W.x,E=W.y,h)?Object.assign({},L,((s={})[k]=C?"0":"",s[R]=N?"0":"",s.transform=1>=(B.devicePixelRatio||1)?"translate("+P+"px, "+E+"px)":"translate3d("+P+"px, "+E+"px, 0)",s)):Object.assign({},L,((a={})[k]=C?E+"px":"",a[R]=N?P+"px":"",a.transform="",a))}var M={left:"right",right:"left",bottom:"top",top:"bottom"};function getOppositePlacement(e){return e.replace(/left|right|bottom|top/g,function(e){return M[e]})}var N={start:"end",end:"start"};function getOppositeVariationPlacement(e){return e.replace(/start|end/g,function(e){return N[e]})}function contains(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&isShadowRoot(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function rectToClientRect(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function getClientRectFromMixedType(e,t,n){var r,o,i,a,s,c,l,u,p,d;return t===b?rectToClientRect(function(e,t){var n=getWindow(e),r=getDocumentElement(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,s=0,c=0;if(o){i=o.width,a=o.height;var l=isLayoutViewport();(l||!l&&"fixed"===t)&&(s=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:s+getWindowScrollBarX(e),y:c}}(e,n)):isElement(t)?((r=getBoundingClientRect(t,!1,"fixed"===n)).top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r):rectToClientRect((o=getDocumentElement(e),a=getDocumentElement(o),s=getWindowScroll(o),c=null==(i=o.ownerDocument)?void 0:i.body,l=f(a.scrollWidth,a.clientWidth,c?c.scrollWidth:0,c?c.clientWidth:0),u=f(a.scrollHeight,a.clientHeight,c?c.scrollHeight:0,c?c.clientHeight:0),p=-s.scrollLeft+getWindowScrollBarX(o),d=-s.scrollTop,"rtl"===getComputedStyle(c||a).direction&&(p+=f(a.clientWidth,c?c.clientWidth:0)-l),{width:l,height:u,x:p,y:d}))}function getFreshSideObject(){return{top:0,right:0,bottom:0,left:0}}function mergePaddingObject(e){return Object.assign({},getFreshSideObject(),e)}function expandToHashMap(e,t){return t.reduce(function(t,n){return t[n]=e,t},{})}function detectOverflow(e,t){void 0===t&&(t={});var n,r,o,i,a,s,c,l=t,p=l.placement,g=void 0===p?e.placement:p,v=l.strategy,h=void 0===v?e.strategy:v,w=l.boundary,x=l.rootBoundary,P=l.elementContext,j=void 0===P?O:P,E=l.altBoundary,S=l.padding,M=void 0===S?0:S,N=mergePaddingObject("number"!=typeof M?M:expandToHashMap(M,y)),C=e.rects.popper,R=e.elements[void 0!==E&&E?j===O?"reference":O:j],k=(n=isElement(R)?R:R.contextElement||getDocumentElement(e.elements.popper),s=(a=[].concat("clippingParents"===(r=void 0===w?"clippingParents":w)?(o=listScrollParents(getParentNode(n)),isElement(i=["absolute","fixed"].indexOf(getComputedStyle(n).position)>=0&&isHTMLElement(n)?getOffsetParent(n):n)?o.filter(function(e){return isElement(e)&&contains(e,i)&&"body"!==getNodeName(e)}):[]):[].concat(r),[void 0===x?b:x]))[0],(c=a.reduce(function(e,t){var r=getClientRectFromMixedType(n,t,h);return e.top=f(r.top,e.top),e.right=u(r.right,e.right),e.bottom=u(r.bottom,e.bottom),e.left=f(r.left,e.left),e},getClientRectFromMixedType(n,s,h))).width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c),B=getBoundingClientRect(e.elements.reference),D=computeOffsets({reference:B,element:C,strategy:"absolute",placement:g}),T=rectToClientRect(Object.assign({},C,D)),A=j===O?T:B,L={top:k.top-A.top+N.top,bottom:A.bottom-k.bottom+N.bottom,left:k.left-A.left+N.left,right:A.right-k.right+N.right},W=e.modifiersData.offset;if(j===O&&W){var H=W[g];Object.keys(L).forEach(function(e){var t=[m,d].indexOf(e)>=0?1:-1,n=["top",d].indexOf(e)>=0?"y":"x";L[e]+=H[n]*t})}return L}function within(e,t,n){return f(e,u(t,n))}function getSideOffsets(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function isAnySideFullyClipped(e){return["top",m,d,g].some(function(t){return e[t]>=0})}var C=(i=void 0===(o=(r={defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,s=void 0===a||a,c=getWindow(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&l.forEach(function(e){e.addEventListener("scroll",n.update,E)}),s&&c.addEventListener("resize",n.update,E),function(){i&&l.forEach(function(e){e.removeEventListener("scroll",n.update,E)}),s&&c.removeEventListener("resize",n.update,E)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=computeOffsets({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=n.adaptive,i=n.roundOffsets,a=void 0===i||i,s={placement:getBasePlacement(t.placement),variation:getVariation(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:void 0===r||r,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,mapToStyles(Object.assign({},s,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:void 0===o||o,roundOffsets:a})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,mapToStyles(Object.assign({},s,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:a})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];isHTMLElement(o)&&getNodeName(o)&&(Object.assign(o.style,n),Object.keys(r).forEach(function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)}))})},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce(function(e,t){return e[t]="",e},{});isHTMLElement(r)&&getNodeName(r)&&(Object.assign(r.style,i),Object.keys(o).forEach(function(e){r.removeAttribute(e)}))})}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=x.reduce(function(e,n){var r,o,a,s,c,l;return e[n]=(r=t.rects,a=[g,"top"].indexOf(o=getBasePlacement(n))>=0?-1:1,c=(s="function"==typeof i?i(Object.assign({},r,{placement:n})):i)[0],l=s[1],c=c||0,l=(l||0)*a,[g,m].indexOf(o)>=0?{x:l,y:c}:{x:c,y:l}),e},{}),s=a[t.placement],c=s.x,l=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=a}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,c=n.fallbackPlacements,l=n.padding,f=n.boundary,u=n.rootBoundary,p=n.altBoundary,b=n.flipVariations,O=void 0===b||b,P=n.allowedAutoPlacements,j=t.options.placement,E=getBasePlacement(j)===j,S=c||(E||!O?[getOppositePlacement(j)]:function(e){if(getBasePlacement(e)===v)return[];var t=getOppositePlacement(e);return[getOppositeVariationPlacement(e),t,getOppositeVariationPlacement(t)]}(j)),M=[j].concat(S).reduce(function(e,n){var r,o,i,a,s,c,p,d,m,g,h,b;return e.concat(getBasePlacement(n)===v?(o=(r={placement:n,boundary:f,rootBoundary:u,padding:l,flipVariations:O,allowedAutoPlacements:P}).placement,i=r.boundary,a=r.rootBoundary,s=r.padding,c=r.flipVariations,d=void 0===(p=r.allowedAutoPlacements)?x:p,0===(h=(g=(m=getVariation(o))?c?w:w.filter(function(e){return getVariation(e)===m}):y).filter(function(e){return d.indexOf(e)>=0})).length&&(h=g),Object.keys(b=h.reduce(function(e,n){return e[n]=detectOverflow(t,{placement:n,boundary:i,rootBoundary:a,padding:s})[getBasePlacement(n)],e},{})).sort(function(e,t){return b[e]-b[t]})):n)},[]),N=t.rects.reference,C=t.rects.popper,R=new Map,k=!0,B=M[0],D=0;D<M.length;D++){var T=M[D],A=getBasePlacement(T),L=getVariation(T)===h,W=["top",d].indexOf(A)>=0,H=W?"width":"height",V=detectOverflow(t,{placement:T,boundary:f,rootBoundary:u,altBoundary:p,padding:l}),_=W?L?m:g:L?d:"top";N[H]>C[H]&&(_=getOppositePlacement(_));var F=getOppositePlacement(_),q=[];if(i&&q.push(V[A]<=0),s&&q.push(V[_]<=0,V[F]<=0),q.every(function(e){return e})){B=T,k=!1;break}R.set(T,q)}if(k)for(var I=O?3:1,_loop=function(e){var t=M.find(function(t){var n=R.get(t);if(n)return n.slice(0,e).every(function(e){return e})});if(t)return B=t,"break"},U=I;U>0&&"break"!==_loop(U);U--);t.placement!==B&&(t.modifiersData[r]._skip=!0,t.placement=B,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=n.altAxis,a=n.boundary,s=n.rootBoundary,c=n.altBoundary,l=n.padding,p=n.tether,v=void 0===p||p,y=n.tetherOffset,b=void 0===y?0:y,O=detectOverflow(t,{boundary:a,rootBoundary:s,padding:l,altBoundary:c}),w=getBasePlacement(t.placement),x=getVariation(t.placement),P=!x,j=getMainAxisFromPlacement(w),E="x"===j?"y":"x",S=t.modifiersData.popperOffsets,M=t.rects.reference,N=t.rects.popper,C="function"==typeof b?b(Object.assign({},t.rects,{placement:t.placement})):b,R="number"==typeof C?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),k=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,B={x:0,y:0};if(S){if(void 0===o||o){var D,T="y"===j?"top":g,A="y"===j?d:m,L="y"===j?"height":"width",W=S[j],H=W+O[T],V=W-O[A],_=v?-N[L]/2:0,F=x===h?M[L]:N[L],q=x===h?-N[L]:-M[L],I=t.elements.arrow,U=v&&I?getLayoutRect(I):{width:0,height:0},z=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:getFreshSideObject(),$=z[T],X=z[A],K=within(0,M[L],U[L]),Z=P?M[L]/2-_-K-$-R.mainAxis:F-K-$-R.mainAxis,Y=P?-M[L]/2+_+K+X+R.mainAxis:q+K+X+R.mainAxis,G=t.elements.arrow&&getOffsetParent(t.elements.arrow),J=G?"y"===j?G.clientTop||0:G.clientLeft||0:0,Q=null!=(D=null==k?void 0:k[j])?D:0,ee=W+Z-Q-J,et=W+Y-Q,en=within(v?u(H,ee):H,W,v?f(V,et):V);S[j]=en,B[j]=en-W}if(void 0!==i&&i){var er,eo,ei="x"===j?"top":g,ea="x"===j?d:m,es=S[E],ec="y"===E?"height":"width",el=es+O[ei],ef=es-O[ea],eu=-1!==["top",g].indexOf(w),ep=null!=(eo=null==k?void 0:k[E])?eo:0,ed=eu?el:es-M[ec]-N[ec]-ep+R.altAxis,em=eu?es+M[ec]+N[ec]-ep-R.altAxis:ef,eg=v&&eu?(er=within(ed,es,em))>em?em:er:within(v?ed:el,es,v?em:ef);S[E]=eg,B[E]=eg-es}t.modifiersData[r]=B}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n,r=e.state,o=e.name,i=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,c=getBasePlacement(r.placement),l=getMainAxisFromPlacement(c),f=[g,m].indexOf(c)>=0?"height":"width";if(a&&s){var u=mergePaddingObject("number"!=typeof(t="function"==typeof(t=i.padding)?t(Object.assign({},r.rects,{placement:r.placement})):t)?t:expandToHashMap(t,y)),p=getLayoutRect(a),v="y"===l?"top":g,h="y"===l?d:m,b=r.rects.reference[f]+r.rects.reference[l]-s[l]-r.rects.popper[f],O=s[l]-r.rects.reference[l],w=getOffsetParent(a),x=w?"y"===l?w.clientHeight||0:w.clientWidth||0:0,P=u[v],j=x-p[f]-u[h],E=x/2-p[f]/2+(b/2-O/2),S=within(P,E,j);r.modifiersData[o]=((n={})[l]=S,n.centerOffset=S-E,n)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&contains(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=detectOverflow(t,{elementContext:"reference"}),s=detectOverflow(t,{altBoundary:!0}),c=getSideOffsets(a,r),l=getSideOffsets(s,o,i),f=isAnySideFullyClipped(c),u=isAnySideFullyClipped(l);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:f,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":u})}}]}).defaultModifiers)?[]:o,s=void 0===(a=r.defaultOptions)?j:a,function(e,t,n){void 0===n&&(n=s);var r,o={placement:"bottom",orderedModifiers:[],options:Object.assign({},j,s),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],c=!1,l={state:o,setOptions:function(n){var r,c,f,u,p,d="function"==typeof n?n(o.options):n;cleanupModifierEffects(),o.options=Object.assign({},s,o.options,d),o.scrollParents={reference:isElement(e)?listScrollParents(e):e.contextElement?listScrollParents(e.contextElement):[],popper:listScrollParents(t)};var m=(c=Object.keys(r=[].concat(i,o.options.modifiers).reduce(function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e},{})).map(function(e){return r[e]}),f=new Map,u=new Set,p=[],c.forEach(function(e){f.set(e.name,e)}),c.forEach(function(e){u.has(e.name)||function sort(e){u.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach(function(e){if(!u.has(e)){var t=f.get(e);t&&sort(t)}}),p.push(e)}(e)}),P.reduce(function(e,t){return e.concat(p.filter(function(e){return e.phase===t}))},[]));return o.orderedModifiers=m.filter(function(e){return e.enabled}),o.orderedModifiers.forEach(function(e){var t=e.name,n=e.options,r=e.effect;if("function"==typeof r){var i=r({state:o,name:t,instance:l,options:void 0===n?{}:n});a.push(i||function(){})}}),l.update()},forceUpdate:function(){if(!c){var e,t,n,r,i,a,s,f,u,d,m,g,v=o.elements,y=v.reference,h=v.popper;if(areValidElements(y,h)){;o.rects={reference:(t=getOffsetParent(h),n="fixed"===o.options.strategy,r=isHTMLElement(t),f=isHTMLElement(t)&&(a=p((i=t.getBoundingClientRect()).width)/t.offsetWidth||1,s=p(i.height)/t.offsetHeight||1,1!==a||1!==s),u=getDocumentElement(t),d=getBoundingClientRect(y,f,n),m={scrollLeft:0,scrollTop:0},g={x:0,y:0},(r||!r&&!n)&&(("body"!==getNodeName(t)||isScrollParent(u))&&(m=(e=t)!==getWindow(e)&&isHTMLElement(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:getWindowScroll(e)),isHTMLElement(t)?(g=getBoundingClientRect(t,!0),g.x+=t.clientLeft,g.y+=t.clientTop):u&&(g.x=getWindowScrollBarX(u))),{x:d.left+m.scrollLeft-g.x,y:d.top+m.scrollTop-g.y,width:d.width,height:d.height}),popper:getLayoutRect(h)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach(function(e){return o.modifiersData[e.name]=Object.assign({},e.data)});for(var b=0;b<o.orderedModifiers.length;b++){if(!0===o.reset){o.reset=!1,b=-1;continue}var O=o.orderedModifiers[b],w=O.fn,x=O.options,P=void 0===x?{}:x,j=O.name;"function"==typeof w&&(o=w({state:o,options:P,name:j,instance:l})||o)}}}},update:function(){return r||(r=new Promise(function(e){Promise.resolve().then(function(){r=void 0,e(new Promise(function(e){l.forceUpdate(),e(o)}))})})),r},destroy:function(){cleanupModifierEffects(),c=!0}};if(!areValidElements(e,t))return l;function cleanupModifierEffects(){a.forEach(function(e){return e()}),a=[]}return l.setOptions(n).then(function(e){!c&&n.onFirstUpdate&&n.onFirstUpdate(e)}),l}),R=n(69743),k=n.n(R),B=n(67139),D=[],usePopper=function(e,t,n){void 0===n&&(n={});var r=c.useRef(null),o={onFirstUpdate:n.onFirstUpdate,placement:n.placement||"bottom",strategy:n.strategy||"absolute",modifiers:n.modifiers||D},i=c.useState({styles:{popper:{position:o.strategy,left:"0",top:"0"},arrow:{position:"absolute"}},attributes:{}}),a=i[0],s=i[1],f=c.useMemo(function(){return{name:"updateState",enabled:!0,phase:"write",fn:function(e){var t=e.state,n=Object.keys(t.elements);l.flushSync(function(){s({styles:(0,B.sq)(n.map(function(e){return[e,t.styles[e]||{}]})),attributes:(0,B.sq)(n.map(function(e){return[e,t.attributes[e]]}))})})},requires:["computeStyles"]}},[]),u=c.useMemo(function(){var e={onFirstUpdate:o.onFirstUpdate,placement:o.placement,strategy:o.strategy,modifiers:[].concat(o.modifiers,[f,{name:"applyStyles",enabled:!1}])};return k()(r.current,e)?r.current||e:(r.current=e,e)},[o.onFirstUpdate,o.placement,o.strategy,o.modifiers,f]),p=c.useRef();return(0,B.LI)(function(){p.current&&p.current.setOptions(u)},[u]),(0,B.LI)(function(){if(null!=e&&null!=t){var r=(n.createPopper||C)(e,t,u);return p.current=r,function(){r.destroy(),p.current=null}}},[e,t,n.createPopper]),{state:p.current?p.current.state:null,styles:a.styles,attributes:a.attributes,update:p.current?p.current.update:null,forceUpdate:p.current?p.current.forceUpdate:null}}},67139:function(e,t,n){"use strict";n.d(t,{$p:function(){return unwrapArray},DL:function(){return safeInvoke},LI:function(){return o},k$:function(){return setRef},sq:function(){return fromEntries}});var r=n(67294),unwrapArray=function(e){return Array.isArray(e)?e[0]:e},safeInvoke=function(e){if("function"==typeof e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e.apply(void 0,n)}},setRef=function(e,t){if("function"==typeof e)return safeInvoke(e,t);null!=e&&(e.current=t)},fromEntries=function(e){return e.reduce(function(e,t){var n=t[0],r=t[1];return e[n]=r,e},{})},o="undefined"!=typeof window&&window.document&&window.document.createElement?r.useLayoutEffect:r.useEffect},69743:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;e.exports=function(e,i){try{return function equal(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){var a,s,c,l;if(e.constructor!==i.constructor)return!1;if(Array.isArray(e)){if((a=e.length)!=i.length)return!1;for(s=a;0!=s--;)if(!equal(e[s],i[s]))return!1;return!0}if(n&&e instanceof Map&&i instanceof Map){if(e.size!==i.size)return!1;for(l=e.entries();!(s=l.next()).done;)if(!i.has(s.value[0]))return!1;for(l=e.entries();!(s=l.next()).done;)if(!equal(s.value[1],i.get(s.value[0])))return!1;return!0}if(r&&e instanceof Set&&i instanceof Set){if(e.size!==i.size)return!1;for(l=e.entries();!(s=l.next()).done;)if(!i.has(s.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(i)){if((a=e.length)!=i.length)return!1;for(s=a;0!=s--;)if(e[s]!==i[s])return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf&&"function"==typeof e.valueOf&&"function"==typeof i.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString&&"function"==typeof e.toString&&"function"==typeof i.toString)return e.toString()===i.toString();if((a=(c=Object.keys(e)).length)!==Object.keys(i).length)return!1;for(s=a;0!=s--;)if(!Object.prototype.hasOwnProperty.call(i,c[s]))return!1;if(t&&e instanceof Element)return!1;for(s=a;0!=s--;)if(("_owner"!==c[s]&&"__v"!==c[s]&&"__o"!==c[s]||!e.$$typeof)&&!equal(e[c[s]],i[c[s]]))return!1;return!0}return e!=e&&i!=i}(e,i)}catch(e){if((e.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw e}}},84082:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(67294),o=n(45697),i=n.n(o),a=n(94184),s=n.n(a),c=n(22040),l=["className","cssModule","variant","innerRef"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var f={active:i().bool,"aria-label":i().string,onClick:i().func,variant:i().oneOf(["white"]),className:i().string,cssModule:i().object,innerRef:i().oneOfType([i().object,i().string,i().func])};function CloseButton(e){var t=e.className,n=(e.cssModule,e.variant),o=e.innerRef,i=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,l),a=(0,c.mx)(s()(t,"btn-close",n&&"btn-close-".concat(n)));return r.createElement("button",_extends({ref:o,type:"button",className:a},function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({"aria-label":"close"},i)))}CloseButton.propTypes=f;var u=["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"];function Button_extends(){return(Button_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var p={active:i().bool,"aria-label":i().string,block:i().bool,children:i().node,className:i().string,cssModule:i().object,close:i().bool,color:i().string,disabled:i().bool,innerRef:i().oneOfType([i().object,i().func,i().string]),onClick:i().func,outline:i().bool,size:i().string,tag:c.iC};function Button(e){var t=(0,r.useCallback)(function(t){if(e.disabled){t.preventDefault();return}if(e.onClick)return e.onClick(t)},[e.onClick,e.disabled]),n=e.active,o=e["aria-label"],i=e.block,a=e.className,l=e.close,f=e.cssModule,p=e.color,d=void 0===p?"secondary":p,m=e.outline,g=e.size,v=e.tag,y=void 0===v?"button":v,h=e.innerRef,b=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,u);if(l)return r.createElement(CloseButton,b);var O="btn".concat(m?"-outline":"","-").concat(d),w=(0,c.mx)(s()(a,"btn",O,!!g&&"btn-".concat(g),!!i&&"d-block w-100",{active:n,disabled:e.disabled}),f);return b.href&&"button"===y&&(y="a"),r.createElement(y,Button_extends({type:"button"===y&&b.onClick?"button":void 0},b,{className:w,ref:h,onClick:t,"aria-label":o}))}Button.propTypes=p;var d=Button},79862:function(e,t,n){"use strict";var r=n(67294),o=n(45697),i=n.n(o),a=n(94184),s=n.n(a),c=n(22040),l=["className","cssModule","tabs","pills","vertical","horizontal","justified","fill","navbar","card","tag"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var f={card:i().bool,className:i().string,cssModule:i().object,fill:i().bool,horizontal:i().oneOf(["center","end"]),justified:i().bool,navbar:i().bool,pills:i().bool,tabs:i().bool,tag:c.iC,vertical:i().oneOfType([i().bool,i().string])};function Nav(e){var t=e.className,n=e.cssModule,o=e.tabs,i=e.pills,a=e.vertical,f=void 0!==a&&a,u=e.horizontal,p=e.justified,d=e.fill,m=e.navbar,g=e.card,v=e.tag,y=void 0===v?"ul":v,h=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,l),b=(0,c.mx)(s()(t,m?"navbar-nav":"nav",!!u&&"justify-content-".concat(u),!1!==f&&(!0===f||"xs"===f?"flex-column":"flex-".concat(f,"-column")),{"nav-tabs":o,"card-header-tabs":g&&o,"nav-pills":i,"card-header-pills":g&&i,"nav-justified":p,"nav-fill":d}),n);return r.createElement(y,_extends({},h,{className:b}))}Nav.propTypes=f,t.Z=Nav},35510:function(e,t,n){"use strict";var r=n(67294),o=n(45697),i=n.n(o),a=n(94184),s=n.n(a),c=n(22040),l=["className","cssModule","active","tag"];function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var f={active:i().bool,className:i().string,cssModule:i().object,tag:c.iC};function NavItem(e){var t=e.className,n=e.cssModule,o=e.active,i=e.tag,a=void 0===i?"li":i,f=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,l),u=(0,c.mx)(s()(t,"nav-item",!!o&&"active"),n);return r.createElement(a,_extends({},f,{className:u}))}NavItem.propTypes=f,t.Z=NavItem},42473:function(e){"use strict";e.exports=function(){}}}]);