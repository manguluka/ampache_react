!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="/app/dist/",t(0)}({0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(495);Object.keys(r).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})})},495:function(e,t){!function(t,n){function r(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function a(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=b.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),b.elements=n+" "+e,s(t)}function c(e){var t=E[e[v]];return t||(t={},y++,e[v]=y,E[y]=t),t}function i(e,t,r){if(t||(t=n),f)return t.createElement(e);r||(r=c(t));var a;return a=r.cache[e]?r.cache[e].cloneNode():g.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||p.test(e)||a.tagUrn?a:r.frag.appendChild(a)}function l(e,t){if(e||(e=n),f)return e.createDocumentFragment();t=t||c(e);for(var r=t.frag.cloneNode(),o=0,i=a(),l=i.length;o<l;o++)r.createElement(i[o]);return r}function u(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+a().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function s(e){e||(e=n);var t=c(e);return!b.shivCSS||d||t.hasCSS||(t.hasCSS=!!r(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),f||u(e,t),e}var d,f,m="3.7.3-pre",h=t.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,g=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",y=0,E={};!function(){try{var e=n.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,f=1==e.childNodes.length||function(){n.createElement("a");var e=n.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(t){d=!0,f=!0}}();var b={elements:h.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:m,shivCSS:h.shivCSS!==!1,supportsUnknownElements:f,shivMethods:h.shivMethods!==!1,type:"default",shivDocument:s,createElement:i,createDocumentFragment:l,addElements:o};t.html5=b,s(n),"object"==typeof e&&e.exports&&(e.exports=b)}("undefined"!=typeof window?window:this,document)}});
//# sourceMappingURL=fix.ie9.js.map