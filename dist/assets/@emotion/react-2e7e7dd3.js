import"../@amplitude/analytics-browser-ad7e1a7e.js";import{r as _,d as we}from"../vendor-e56015e7.js";function Be(e){if(e.sheet)return e.sheet;for(var r=0;r<document.styleSheets.length;r++)if(document.styleSheets[r].ownerNode===e)return document.styleSheets[r]}function He(e){var r=document.createElement("style");return r.setAttribute("data-emotion",e.key),e.nonce!==void 0&&r.setAttribute("nonce",e.nonce),r.appendChild(document.createTextNode("")),r.setAttribute("data-s",""),r}var Ke=function(){function e(t){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=t.speedy===void 0?!0:t.speedy,this.tags=[],this.ctr=0,this.nonce=t.nonce,this.key=t.key,this.container=t.container,this.prepend=t.prepend,this.insertionPoint=t.insertionPoint,this.before=null}var r=e.prototype;return r.hydrate=function(n){n.forEach(this._insertTag)},r.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(He(this));var a=this.tags[this.tags.length-1];if(this.isSpeedy){var s=Be(a);try{s.insertRule(n,s.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},r.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}(),w="-ms-",U="-moz-",o="-webkit-",Me="comm",pe="rule",me="decl",Ye="@import",Oe="@keyframes",Ze="@layer",Ue=Math.abs,J=String.fromCharCode,Je=Object.assign;function Qe(e,r){return g(e,0)^45?(((r<<2^g(e,0))<<2^g(e,1))<<2^g(e,2))<<2^g(e,3):0}function Pe(e){return e.trim()}function Xe(e,r){return(e=r.exec(e))?e[0]:e}function f(e,r,t){return e.replace(r,t)}function de(e,r){return e.indexOf(r)}function g(e,r){return e.charCodeAt(r)|0}function G(e,r,t){return e.slice(r,t)}function M(e){return e.length}function be(e){return e.length}function H(e,r){return r.push(e),e}function er(e,r){return e.map(r).join("")}var Q=1,W=1,Ie=0,C=0,p=0,z="";function X(e,r,t,n,a,s,i){return{value:e,root:r,parent:t,type:n,props:a,children:s,line:Q,column:W,length:i,return:""}}function j(e,r){return Je(X("",null,null,"",null,null,0),e,{length:-e.length},r)}function rr(){return p}function tr(){return p=C>0?g(z,--C):0,W--,p===10&&(W=1,Q--),p}function E(){return p=C<Ie?g(z,C++):0,W++,p===10&&(W=1,Q++),p}function P(){return g(z,C)}function K(){return C}function D(e,r){return G(z,e,r)}function V(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function _e(e){return Q=W=1,Ie=M(z=e),C=0,[]}function Fe(e){return z="",e}function Y(e){return Pe(D(C-1,he(e===91?e+2:e===40?e+1:e)))}function nr(e){for(;(p=P())&&p<33;)E();return V(e)>2||V(p)>3?"":" "}function ar(e,r){for(;--r&&E()&&!(p<48||p>102||p>57&&p<65||p>70&&p<97););return D(e,K()+(r<6&&P()==32&&E()==32))}function he(e){for(;E();)switch(p){case e:return C;case 34:case 39:e!==34&&e!==39&&he(p);break;case 40:e===41&&he(e);break;case 92:E();break}return C}function sr(e,r){for(;E()&&e+p!==47+10;)if(e+p===42+42&&P()===47)break;return"/*"+D(r,C-1)+"*"+J(e===47?e:E())}function ir(e){for(;!V(P());)E();return D(e,C)}function cr(e){return Fe(Z("",null,null,null,[""],e=_e(e),0,[0],e))}function Z(e,r,t,n,a,s,i,c,d){for(var S=0,m=0,v=i,I=0,F=0,k=0,l=1,$=1,y=1,x=0,R="",B=a,N=s,T=n,h=R;$;)switch(k=x,x=E()){case 40:if(k!=108&&g(h,v-1)==58){de(h+=f(Y(x),"&","&\f"),"&\f")!=-1&&(y=-1);break}case 34:case 39:case 91:h+=Y(x);break;case 9:case 10:case 13:case 32:h+=nr(k);break;case 92:h+=ar(K()-1,7);continue;case 47:switch(P()){case 42:case 47:H(or(sr(E(),K()),r,t),d);break;default:h+="/"}break;case 123*l:c[S++]=M(h)*y;case 125*l:case 59:case 0:switch(x){case 0:case 125:$=0;case 59+m:y==-1&&(h=f(h,/\f/g,"")),F>0&&M(h)-v&&H(F>32?$e(h+";",n,t,v-1):$e(f(h," ","")+";",n,t,v-2),d);break;case 59:h+=";";default:if(H(T=Se(h,r,t,S,m,a,c,R,B=[],N=[],v),s),x===123)if(m===0)Z(h,r,T,T,B,s,v,c,N);else switch(I===99&&g(h,3)===110?100:I){case 100:case 108:case 109:case 115:Z(e,T,T,n&&H(Se(e,T,T,0,0,a,c,R,a,B=[],v),N),a,N,v,c,n?B:N);break;default:Z(h,T,T,T,[""],N,0,c,N)}}S=m=F=0,l=y=1,R=h="",v=i;break;case 58:v=1+M(h),F=k;default:if(l<1){if(x==123)--l;else if(x==125&&l++==0&&tr()==125)continue}switch(h+=J(x),x*l){case 38:y=m>0?1:(h+="\f",-1);break;case 44:c[S++]=(M(h)-1)*y,y=1;break;case 64:P()===45&&(h+=Y(E())),I=P(),m=v=M(R=h+=ir(K())),x++;break;case 45:k===45&&M(h)==2&&(l=0)}}return s}function Se(e,r,t,n,a,s,i,c,d,S,m){for(var v=a-1,I=a===0?s:[""],F=be(I),k=0,l=0,$=0;k<n;++k)for(var y=0,x=G(e,v+1,v=Ue(l=i[k])),R=e;y<F;++y)(R=Pe(l>0?I[y]+" "+x:f(x,/&\f/g,I[y])))&&(d[$++]=R);return X(e,r,t,a===0?pe:c,d,S,m)}function or(e,r,t){return X(e,r,t,Me,J(rr()),G(e,2,-2),0)}function $e(e,r,t,n){return X(e,r,t,me,G(e,0,n),G(e,n+1,-1),n)}function L(e,r){for(var t="",n=be(e),a=0;a<n;a++)t+=r(e[a],a,e,r)||"";return t}function fr(e,r,t,n){switch(e.type){case Ze:if(e.children.length)break;case Ye:case me:return e.return=e.return||e.value;case Me:return"";case Oe:return e.return=e.value+"{"+L(e.children,n)+"}";case pe:e.value=e.props.join(",")}return M(t=L(e.children,n))?e.return=e.value+"{"+t+"}":""}function ur(e){var r=be(e);return function(t,n,a,s){for(var i="",c=0;c<r;c++)i+=e[c](t,n,a,s)||"";return i}}function dr(e){return function(r){r.root||(r=r.return)&&e(r)}}var Ce=function(r){var t=new WeakMap;return function(n){if(t.has(n))return t.get(n);var a=r(n);return t.set(n,a),a}};function hr(e){var r=Object.create(null);return function(t){return r[t]===void 0&&(r[t]=e(t)),r[t]}}var lr=function(r,t,n){for(var a=0,s=0;a=s,s=P(),a===38&&s===12&&(t[n]=1),!V(s);)E();return D(r,C)},yr=function(r,t){var n=-1,a=44;do switch(V(a)){case 0:a===38&&P()===12&&(t[n]=1),r[n]+=lr(C-1,t,n);break;case 2:r[n]+=Y(a);break;case 4:if(a===44){r[++n]=P()===58?"&\f":"",t[n]=r[n].length;break}default:r[n]+=J(a)}while(a=E());return r},pr=function(r,t){return Fe(yr(_e(r),t))},ke=new WeakMap,mr=function(r){if(!(r.type!=="rule"||!r.parent||r.length<1)){for(var t=r.value,n=r.parent,a=r.column===n.column&&r.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(r.props.length===1&&t.charCodeAt(0)!==58&&!ke.get(n))&&!a){ke.set(r,!0);for(var s=[],i=pr(t,s),c=n.props,d=0,S=0;d<i.length;d++)for(var m=0;m<c.length;m++,S++)r.props[S]=s[d]?i[d].replace(/&\f/g,c[m]):c[m]+" "+i[d]}}},br=function(r){if(r.type==="decl"){var t=r.value;t.charCodeAt(0)===108&&t.charCodeAt(2)===98&&(r.return="",r.value="")}};function Ne(e,r){switch(Qe(e,r)){case 5103:return o+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return o+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return o+e+U+e+w+e+e;case 6828:case 4268:return o+e+w+e+e;case 6165:return o+e+w+"flex-"+e+e;case 5187:return o+e+f(e,/(\w+).+(:[^]+)/,o+"box-$1$2"+w+"flex-$1$2")+e;case 5443:return o+e+w+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return o+e+w+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return o+e+w+f(e,"shrink","negative")+e;case 5292:return o+e+w+f(e,"basis","preferred-size")+e;case 6060:return o+"box-"+f(e,"-grow","")+o+e+w+f(e,"grow","positive")+e;case 4554:return o+f(e,/([^-])(transform)/g,"$1"+o+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,o+"$1"),/(image-set)/,o+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,o+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,o+"box-pack:$3"+w+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+o+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,o+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(M(e)-1-r>6)switch(g(e,r+1)){case 109:if(g(e,r+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+o+"$2-$3$1"+U+(g(e,r+3)==108?"$3":"$2-$3"))+e;case 115:return~de(e,"stretch")?Ne(f(e,"stretch","fill-available"),r)+e:e}break;case 4949:if(g(e,r+1)!==115)break;case 6444:switch(g(e,M(e)-3-(~de(e,"!important")&&10))){case 107:return f(e,":",":"+o)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+o+(g(e,14)===45?"inline-":"")+"box$3$1"+o+"$2$3$1"+w+"$2box$3")+e}break;case 5936:switch(g(e,r+11)){case 114:return o+e+w+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return o+e+w+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return o+e+w+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return o+e+w+e+e}return e}var gr=function(r,t,n,a){if(r.length>-1&&!r.return)switch(r.type){case me:r.return=Ne(r.value,r.length);break;case Oe:return L([j(r,{value:f(r.value,"@","@"+o)})],a);case pe:if(r.length)return er(r.props,function(s){switch(Xe(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return L([j(r,{props:[f(s,/:(read-\w+)/,":"+U+"$1")]})],a);case"::placeholder":return L([j(r,{props:[f(s,/:(plac\w+)/,":"+o+"input-$1")]}),j(r,{props:[f(s,/:(plac\w+)/,":"+U+"$1")]}),j(r,{props:[f(s,/:(plac\w+)/,w+"input-$1")]})],a)}return""})}},vr=[gr],xr=function(r){var t=r.key;if(t==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(l){var $=l.getAttribute("data-emotion");$.indexOf(" ")!==-1&&(document.head.appendChild(l),l.setAttribute("data-s",""))})}var a=r.stylisPlugins||vr,s={},i,c=[];i=r.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),function(l){for(var $=l.getAttribute("data-emotion").split(" "),y=1;y<$.length;y++)s[$[y]]=!0;c.push(l)});var d,S=[mr,br];{var m,v=[fr,dr(function(l){m.insert(l)})],I=ur(S.concat(a,v)),F=function($){return L(cr($),I)};d=function($,y,x,R){m=x,F($?$+"{"+y.styles+"}":y.styles),R&&(k.inserted[y.name]=!0)}}var k={key:t,sheet:new Ke({key:t,container:i,nonce:r.nonce,speedy:r.speedy,prepend:r.prepend,insertionPoint:r.insertionPoint}),nonce:r.nonce,inserted:s,registered:{},insert:d};return k.sheet.hydrate(c),k};function le(){return le=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},le.apply(this,arguments)}var Le={exports:{}},u={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b=typeof Symbol=="function"&&Symbol.for,ge=b?Symbol.for("react.element"):60103,ve=b?Symbol.for("react.portal"):60106,ee=b?Symbol.for("react.fragment"):60107,re=b?Symbol.for("react.strict_mode"):60108,te=b?Symbol.for("react.profiler"):60114,ne=b?Symbol.for("react.provider"):60109,ae=b?Symbol.for("react.context"):60110,xe=b?Symbol.for("react.async_mode"):60111,se=b?Symbol.for("react.concurrent_mode"):60111,ie=b?Symbol.for("react.forward_ref"):60112,ce=b?Symbol.for("react.suspense"):60113,wr=b?Symbol.for("react.suspense_list"):60120,oe=b?Symbol.for("react.memo"):60115,fe=b?Symbol.for("react.lazy"):60116,Sr=b?Symbol.for("react.block"):60121,$r=b?Symbol.for("react.fundamental"):60117,Cr=b?Symbol.for("react.responder"):60118,kr=b?Symbol.for("react.scope"):60119;function A(e){if(typeof e=="object"&&e!==null){var r=e.$$typeof;switch(r){case ge:switch(e=e.type,e){case xe:case se:case ee:case te:case re:case ce:return e;default:switch(e=e&&e.$$typeof,e){case ae:case ie:case fe:case oe:case ne:return e;default:return r}}case ve:return r}}}function We(e){return A(e)===se}u.AsyncMode=xe;u.ConcurrentMode=se;u.ContextConsumer=ae;u.ContextProvider=ne;u.Element=ge;u.ForwardRef=ie;u.Fragment=ee;u.Lazy=fe;u.Memo=oe;u.Portal=ve;u.Profiler=te;u.StrictMode=re;u.Suspense=ce;u.isAsyncMode=function(e){return We(e)||A(e)===xe};u.isConcurrentMode=We;u.isContextConsumer=function(e){return A(e)===ae};u.isContextProvider=function(e){return A(e)===ne};u.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===ge};u.isForwardRef=function(e){return A(e)===ie};u.isFragment=function(e){return A(e)===ee};u.isLazy=function(e){return A(e)===fe};u.isMemo=function(e){return A(e)===oe};u.isPortal=function(e){return A(e)===ve};u.isProfiler=function(e){return A(e)===te};u.isStrictMode=function(e){return A(e)===re};u.isSuspense=function(e){return A(e)===ce};u.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===ee||e===se||e===te||e===re||e===ce||e===wr||typeof e=="object"&&e!==null&&(e.$$typeof===fe||e.$$typeof===oe||e.$$typeof===ne||e.$$typeof===ae||e.$$typeof===ie||e.$$typeof===$r||e.$$typeof===Cr||e.$$typeof===kr||e.$$typeof===Sr)};u.typeOf=A;Le.exports=u;var Er=Le.exports,ze=Er,Ar={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Rr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},je={};je[ze.ForwardRef]=Ar;je[ze.Memo]=Rr;var Tr=!0;function Dr(e,r,t){var n="";return t.split(" ").forEach(function(a){e[a]!==void 0?r.push(e[a]+";"):n+=a+" "}),n}var Mr=function(r,t,n){var a=r.key+"-"+t.name;(n===!1||Tr===!1)&&r.registered[a]===void 0&&(r.registered[a]=t.styles)},Or=function(r,t,n){Mr(r,t,n);var a=r.key+"-"+t.name;if(r.inserted[t.name]===void 0){var s=t;do r.insert(t===s?"."+a:"",s,r.sheet,!0),s=s.next;while(s!==void 0)}};function Pr(e){for(var r=0,t,n=0,a=e.length;a>=4;++n,a-=4)t=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,t=(t&65535)*1540483477+((t>>>16)*59797<<16),t^=t>>>24,r=(t&65535)*1540483477+((t>>>16)*59797<<16)^(r&65535)*1540483477+((r>>>16)*59797<<16);switch(a){case 3:r^=(e.charCodeAt(n+2)&255)<<16;case 2:r^=(e.charCodeAt(n+1)&255)<<8;case 1:r^=e.charCodeAt(n)&255,r=(r&65535)*1540483477+((r>>>16)*59797<<16)}return r^=r>>>13,r=(r&65535)*1540483477+((r>>>16)*59797<<16),((r^r>>>15)>>>0).toString(36)}var Ir={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},_r=/[A-Z]|^ms/g,Fr=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Ge=function(r){return r.charCodeAt(1)===45},Ee=function(r){return r!=null&&typeof r!="boolean"},ue=hr(function(e){return Ge(e)?e:e.replace(_r,"-$&").toLowerCase()}),Ae=function(r,t){switch(r){case"animation":case"animationName":if(typeof t=="string")return t.replace(Fr,function(n,a,s){return O={name:a,styles:s,next:O},a})}return Ir[r]!==1&&!Ge(r)&&typeof t=="number"&&t!==0?t+"px":t};function q(e,r,t){if(t==null)return"";if(t.__emotion_styles!==void 0)return t;switch(typeof t){case"boolean":return"";case"object":{if(t.anim===1)return O={name:t.name,styles:t.styles,next:O},t.name;if(t.styles!==void 0){var n=t.next;if(n!==void 0)for(;n!==void 0;)O={name:n.name,styles:n.styles,next:O},n=n.next;var a=t.styles+";";return a}return Nr(e,r,t)}case"function":{if(e!==void 0){var s=O,i=t(e);return O=s,q(e,r,i)}break}}if(r==null)return t;var c=r[t];return c!==void 0?c:t}function Nr(e,r,t){var n="";if(Array.isArray(t))for(var a=0;a<t.length;a++)n+=q(e,r,t[a])+";";else for(var s in t){var i=t[s];if(typeof i!="object")r!=null&&r[i]!==void 0?n+=s+"{"+r[i]+"}":Ee(i)&&(n+=ue(s)+":"+Ae(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(r==null||r[i[0]]===void 0))for(var c=0;c<i.length;c++)Ee(i[c])&&(n+=ue(s)+":"+Ae(s,i[c])+";");else{var d=q(e,r,i);switch(s){case"animation":case"animationName":{n+=ue(s)+":"+d+";";break}default:n+=s+"{"+d+"}"}}}return n}var Re=/label:\s*([^\s;\n{]+)\s*(;|$)/g,O,Ve=function(r,t,n){if(r.length===1&&typeof r[0]=="object"&&r[0]!==null&&r[0].styles!==void 0)return r[0];var a=!0,s="";O=void 0;var i=r[0];i==null||i.raw===void 0?(a=!1,s+=q(n,t,i)):s+=i[0];for(var c=1;c<r.length;c++)s+=q(n,t,r[c]),a&&(s+=i[c]);Re.lastIndex=0;for(var d="",S;(S=Re.exec(s))!==null;)d+="-"+S[1];var m=Pr(s)+d;return{name:m,styles:s,next:O}},Lr=function(r){return r()},qe=we["useInsertionEffect"]?we["useInsertionEffect"]:!1,Br=qe||Lr,Te=qe||_.useLayoutEffect,De=_.createContext(typeof HTMLElement<"u"?xr({key:"css"}):null);De.Provider;var Wr=function(r){return _.forwardRef(function(t,n){var a=_.useContext(De);return r(t,a,n)})},ye=_.createContext({}),zr=function(r,t){if(typeof t=="function"){var n=t(r);return n}return le({},r,t)},jr=Ce(function(e){return Ce(function(r){return zr(e,r)})}),Hr=function(r){var t=_.useContext(ye);return r.theme!==t&&(t=jr(t)(r.theme)),_.createElement(ye.Provider,{value:t},r.children)},Kr=Wr(function(e,r){var t=e.styles,n=Ve([t],void 0,_.useContext(ye)),a=_.useRef();return Te(function(){var s=r.key+"-global",i=new r.sheet.constructor({key:s,nonce:r.sheet.nonce,container:r.sheet.container,speedy:r.sheet.isSpeedy}),c=!1,d=document.querySelector('style[data-emotion="'+s+" "+n.name+'"]');return r.sheet.tags.length&&(i.before=r.sheet.tags[0]),d!==null&&(c=!0,d.setAttribute("data-emotion",s),i.hydrate([d])),a.current=[i,c],function(){i.flush()}},[r]),Te(function(){var s=a.current,i=s[0],c=s[1];if(c){s[1]=!1;return}if(n.next!==void 0&&Or(r,n.next,!0),i.tags.length){var d=i.tags[i.tags.length-1].nextElementSibling;i.before=d,i.flush()}r.insert("",n,i,!1)},[r,n.name]),null});function Gr(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return Ve(r)}var Yr=function(){var r=Gr.apply(void 0,arguments),t="animation-"+r.name;return{name:t,styles:"@keyframes "+t+"{"+r.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}};export{Kr as G,ye as T,Hr as a,Dr as g,Or as i,Yr as k,hr as m,Mr as r,Ve as s,Br as u,Wr as w};
