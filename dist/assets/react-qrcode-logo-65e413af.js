import{l as gr}from"./@cosmos-kit/cosmostation-7e767df7.js";import{c as sr,r as lr,a as pr}from"./vendor-e56015e7.js";var fr={},hr={exports:{}};(function(W,m){var A=function(){var c=function(d,w){var o=236,l=17,n=d,s=C[w],t=null,r=0,g=null,h=[],u={},x=function(a,f){r=n*4+17,t=function(e){for(var i=new Array(e),v=0;v<e;v+=1){i[v]=new Array(e);for(var p=0;p<e;p+=1)i[v][p]=null}return i}(r),D(0,0),D(r-7,0),D(0,r-7),N(),R(),H(a,f),n>=7&&I(a),g==null&&(g=V(n,s,h)),Q(g,f)},D=function(a,f){for(var e=-1;e<=7;e+=1)if(!(a+e<=-1||r<=a+e))for(var i=-1;i<=7;i+=1)f+i<=-1||r<=f+i||(0<=e&&e<=6&&(i==0||i==6)||0<=i&&i<=6&&(e==0||e==6)||2<=e&&e<=4&&2<=i&&i<=4?t[a+e][f+i]=!0:t[a+e][f+i]=!1)},L=function(){for(var a=0,f=0,e=0;e<8;e+=1){x(!0,e);var i=T.getLostPoint(u);(e==0||a>i)&&(a=i,f=e)}return f},R=function(){for(var a=8;a<r-8;a+=1)t[a][6]==null&&(t[a][6]=a%2==0);for(var f=8;f<r-8;f+=1)t[6][f]==null&&(t[6][f]=f%2==0)},N=function(){for(var a=T.getPatternPosition(n),f=0;f<a.length;f+=1)for(var e=0;e<a.length;e+=1){var i=a[f],v=a[e];if(t[i][v]==null)for(var p=-2;p<=2;p+=1)for(var M=-2;M<=2;M+=1)p==-2||p==2||M==-2||M==2||p==0&&M==0?t[i+p][v+M]=!0:t[i+p][v+M]=!1}},I=function(a){for(var f=T.getBCHTypeNumber(n),e=0;e<18;e+=1){var i=!a&&(f>>e&1)==1;t[Math.floor(e/3)][e%3+r-8-3]=i}for(var e=0;e<18;e+=1){var i=!a&&(f>>e&1)==1;t[e%3+r-8-3][Math.floor(e/3)]=i}},H=function(a,f){for(var e=s<<3|f,i=T.getBCHTypeInfo(e),v=0;v<15;v+=1){var p=!a&&(i>>v&1)==1;v<6?t[v][8]=p:v<8?t[v+1][8]=p:t[r-15+v][8]=p}for(var v=0;v<15;v+=1){var p=!a&&(i>>v&1)==1;v<8?t[8][r-v-1]=p:v<9?t[8][15-v-1+1]=p:t[8][15-v-1]=p}t[r-8][8]=!a},Q=function(a,f){for(var e=-1,i=r-1,v=7,p=0,M=T.getMaskFunction(f),_=r-1;_>0;_-=2)for(_==6&&(_-=1);;){for(var k=0;k<2;k+=1)if(t[i][_-k]==null){var F=!1;p<a.length&&(F=(a[p]>>>v&1)==1);var B=M(i,_-k);B&&(F=!F),t[i][_-k]=F,v-=1,v==-1&&(p+=1,v=7)}if(i+=e,i<0||r<=i){i-=e,e=-e;break}}},J=function(a,f){for(var e=0,i=0,v=0,p=new Array(f.length),M=new Array(f.length),_=0;_<f.length;_+=1){var k=f[_].dataCount,F=f[_].totalCount-k;i=Math.max(i,k),v=Math.max(v,F),p[_]=new Array(k);for(var B=0;B<p[_].length;B+=1)p[_][B]=255&a.getBuffer()[B+e];e+=k;var j=T.getErrorCorrectPolynomial(F),G=E(p[_],j.getLength()-1),ir=G.mod(j);M[_]=new Array(j.getLength()-1);for(var B=0;B<M[_].length;B+=1){var ur=B+ir.getLength()-M[_].length;M[_][B]=ur>=0?ir.getAt(ur):0}}for(var vr=0,B=0;B<f.length;B+=1)vr+=f[B].totalCount;for(var ar=new Array(vr),tr=0,B=0;B<i;B+=1)for(var _=0;_<f.length;_+=1)B<p[_].length&&(ar[tr]=p[_][B],tr+=1);for(var B=0;B<v;B+=1)for(var _=0;_<f.length;_+=1)B<M[_].length&&(ar[tr]=M[_][B],tr+=1);return ar},V=function(a,f,e){for(var i=O.getRSBlocks(a,f),v=U(),p=0;p<e.length;p+=1){var M=e[p];v.put(M.getMode(),4),v.put(M.getLength(),T.getLengthInBits(M.getMode(),a)),M.write(v)}for(var _=0,p=0;p<i.length;p+=1)_+=i[p].dataCount;if(v.getLengthInBits()>_*8)throw"code length overflow. ("+v.getLengthInBits()+">"+_*8+")";for(v.getLengthInBits()+4<=_*8&&v.put(0,4);v.getLengthInBits()%8!=0;)v.putBit(!1);for(;!(v.getLengthInBits()>=_*8||(v.put(o,8),v.getLengthInBits()>=_*8));)v.put(l,8);return J(v,i)};u.addData=function(a,f){f=f||"Byte";var e=null;switch(f){case"Numeric":e=q(a);break;case"Alphanumeric":e=Z(a);break;case"Byte":e=S(a);break;case"Kanji":e=X(a);break;default:throw"mode:"+f}h.push(e),g=null},u.isDark=function(a,f){if(a<0||r<=a||f<0||r<=f)throw a+","+f;return t[a][f]},u.getModuleCount=function(){return r},u.make=function(){if(n<1){for(var a=1;a<40;a++){for(var f=O.getRSBlocks(a,s),e=U(),i=0;i<h.length;i++){var v=h[i];e.put(v.getMode(),4),e.put(v.getLength(),T.getLengthInBits(v.getMode(),a)),v.write(e)}for(var p=0,i=0;i<f.length;i++)p+=f[i].dataCount;if(e.getLengthInBits()<=p*8)break}n=a}x(!1,L())},u.createTableTag=function(a,f){a=a||2,f=typeof f>"u"?a*4:f;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+f+"px;",e+='">',e+="<tbody>";for(var i=0;i<u.getModuleCount();i+=1){e+="<tr>";for(var v=0;v<u.getModuleCount();v+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+a+"px;",e+=" height: "+a+"px;",e+=" background-color: ",e+=u.isDark(i,v)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>",e},u.createSvgTag=function(a,f,e,i){var v={};typeof arguments[0]=="object"&&(v=arguments[0],a=v.cellSize,f=v.margin,e=v.alt,i=v.title),a=a||2,f=typeof f>"u"?a*4:f,e=typeof e=="string"?{text:e}:e||{},e.text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,i=typeof i=="string"?{text:i}:i||{},i.text=i.text||null,i.id=i.text?i.id||"qrcode-title":null;var p=u.getModuleCount()*a+f*2,M,_,k,F,B="",j;for(j="l"+a+",0 0,"+a+" -"+a+",0 0,-"+a+"z ",B+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',B+=v.scalable?"":' width="'+p+'px" height="'+p+'px"',B+=' viewBox="0 0 '+p+" "+p+'" ',B+=' preserveAspectRatio="xMinYMin meet"',B+=i.text||e.text?' role="img" aria-labelledby="'+Y([i.id,e.id].join(" ").trim())+'"':"",B+=">",B+=i.text?'<title id="'+Y(i.id)+'">'+Y(i.text)+"</title>":"",B+=e.text?'<description id="'+Y(e.id)+'">'+Y(e.text)+"</description>":"",B+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',B+='<path d="',k=0;k<u.getModuleCount();k+=1)for(F=k*a+f,M=0;M<u.getModuleCount();M+=1)u.isDark(k,M)&&(_=M*a+f,B+="M"+_+","+F+j);return B+='" stroke="transparent" fill="black"/>',B+="</svg>",B},u.createDataURL=function(a,f){a=a||2,f=typeof f>"u"?a*4:f;var e=u.getModuleCount()*a+f*2,i=f,v=e-f;return $(e,e,function(p,M){if(i<=p&&p<v&&i<=M&&M<v){var _=Math.floor((p-i)/a),k=Math.floor((M-i)/a);return u.isDark(k,_)?0:1}else return 1})},u.createImgTag=function(a,f,e){a=a||2,f=typeof f>"u"?a*4:f;var i=u.getModuleCount()*a+f*2,v="";return v+="<img",v+=' src="',v+=u.createDataURL(a,f),v+='"',v+=' width="',v+=i,v+='"',v+=' height="',v+=i,v+='"',e&&(v+=' alt="',v+=Y(e),v+='"'),v+="/>",v};var Y=function(a){for(var f="",e=0;e<a.length;e+=1){var i=a.charAt(e);switch(i){case"<":f+="&lt;";break;case">":f+="&gt;";break;case"&":f+="&amp;";break;case'"':f+="&quot;";break;default:f+=i;break}}return f},rr=function(a){var f=1;a=typeof a>"u"?f*2:a;var e=u.getModuleCount()*f+a*2,i=a,v=e-a,p,M,_,k,F,B={"██":"█","█ ":"▀"," █":"▄","  ":" "},j={"██":"▀","█ ":"▀"," █":" ","  ":" "},G="";for(p=0;p<e;p+=2){for(_=Math.floor((p-i)/f),k=Math.floor((p+1-i)/f),M=0;M<e;M+=1)F="█",i<=M&&M<v&&i<=p&&p<v&&u.isDark(_,Math.floor((M-i)/f))&&(F=" "),i<=M&&M<v&&i<=p+1&&p+1<v&&u.isDark(k,Math.floor((M-i)/f))?F+=" ":F+="█",G+=a<1&&p+1>=v?j[F]:B[F];G+=`
`}return e%2&&a>0?G.substring(0,G.length-e-1)+Array(e+1).join("▀"):G.substring(0,G.length-1)};return u.createASCII=function(a,f){if(a=a||1,a<2)return rr(f);a-=1,f=typeof f>"u"?a*2:f;var e=u.getModuleCount()*a+f*2,i=f,v=e-f,p,M,_,k,F=Array(a+1).join("██"),B=Array(a+1).join("  "),j="",G="";for(p=0;p<e;p+=1){for(_=Math.floor((p-i)/a),G="",M=0;M<e;M+=1)k=1,i<=M&&M<v&&i<=p&&p<v&&u.isDark(_,Math.floor((M-i)/a))&&(k=0),G+=k?F:B;for(_=0;_<a;_+=1)j+=G+`
`}return j.substring(0,j.length-1)},u.renderTo2dContext=function(a,f){f=f||2;for(var e=u.getModuleCount(),i=0;i<e;i++)for(var v=0;v<e;v++)a.fillStyle=u.isDark(i,v)?"black":"white",a.fillRect(i*f,v*f,f,f)},u};c.stringToBytesFuncs={default:function(d){for(var w=[],o=0;o<d.length;o+=1){var l=d.charCodeAt(o);w.push(l&255)}return w}},c.stringToBytes=c.stringToBytesFuncs.default,c.createStringToBytes=function(d,w){var o=function(){for(var n=er(d),s=function(){var R=n.read();if(R==-1)throw"eof";return R},t=0,r={};;){var g=n.read();if(g==-1)break;var h=s(),u=s(),x=s(),D=String.fromCharCode(g<<8|h),L=u<<8|x;r[D]=L,t+=1}if(t!=w)throw t+" != "+w;return r}(),l="?".charCodeAt(0);return function(n){for(var s=[],t=0;t<n.length;t+=1){var r=n.charCodeAt(t);if(r<128)s.push(r);else{var g=o[n.charAt(t)];typeof g=="number"?(g&255)==g?s.push(g):(s.push(g>>>8),s.push(g&255)):s.push(l)}}return s}};var y={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},C={L:1,M:0,Q:3,H:2},P={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},T=function(){var d=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],w=1335,o=7973,l=21522,n={},s=function(t){for(var r=0;t!=0;)r+=1,t>>>=1;return r};return n.getBCHTypeInfo=function(t){for(var r=t<<10;s(r)-s(w)>=0;)r^=w<<s(r)-s(w);return(t<<10|r)^l},n.getBCHTypeNumber=function(t){for(var r=t<<12;s(r)-s(o)>=0;)r^=o<<s(r)-s(o);return t<<12|r},n.getPatternPosition=function(t){return d[t-1]},n.getMaskFunction=function(t){switch(t){case P.PATTERN000:return function(r,g){return(r+g)%2==0};case P.PATTERN001:return function(r,g){return r%2==0};case P.PATTERN010:return function(r,g){return g%3==0};case P.PATTERN011:return function(r,g){return(r+g)%3==0};case P.PATTERN100:return function(r,g){return(Math.floor(r/2)+Math.floor(g/3))%2==0};case P.PATTERN101:return function(r,g){return r*g%2+r*g%3==0};case P.PATTERN110:return function(r,g){return(r*g%2+r*g%3)%2==0};case P.PATTERN111:return function(r,g){return(r*g%3+(r+g)%2)%2==0};default:throw"bad maskPattern:"+t}},n.getErrorCorrectPolynomial=function(t){for(var r=E([1],0),g=0;g<t;g+=1)r=r.multiply(E([1,b.gexp(g)],0));return r},n.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case y.MODE_NUMBER:return 10;case y.MODE_ALPHA_NUM:return 9;case y.MODE_8BIT_BYTE:return 8;case y.MODE_KANJI:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case y.MODE_NUMBER:return 12;case y.MODE_ALPHA_NUM:return 11;case y.MODE_8BIT_BYTE:return 16;case y.MODE_KANJI:return 10;default:throw"mode:"+t}else if(r<41)switch(t){case y.MODE_NUMBER:return 14;case y.MODE_ALPHA_NUM:return 13;case y.MODE_8BIT_BYTE:return 16;case y.MODE_KANJI:return 12;default:throw"mode:"+t}else throw"type:"+r},n.getLostPoint=function(t){for(var r=t.getModuleCount(),g=0,h=0;h<r;h+=1)for(var u=0;u<r;u+=1){for(var x=0,D=t.isDark(h,u),L=-1;L<=1;L+=1)if(!(h+L<0||r<=h+L))for(var R=-1;R<=1;R+=1)u+R<0||r<=u+R||L==0&&R==0||D==t.isDark(h+L,u+R)&&(x+=1);x>5&&(g+=3+x-5)}for(var h=0;h<r-1;h+=1)for(var u=0;u<r-1;u+=1){var N=0;t.isDark(h,u)&&(N+=1),t.isDark(h+1,u)&&(N+=1),t.isDark(h,u+1)&&(N+=1),t.isDark(h+1,u+1)&&(N+=1),(N==0||N==4)&&(g+=3)}for(var h=0;h<r;h+=1)for(var u=0;u<r-6;u+=1)t.isDark(h,u)&&!t.isDark(h,u+1)&&t.isDark(h,u+2)&&t.isDark(h,u+3)&&t.isDark(h,u+4)&&!t.isDark(h,u+5)&&t.isDark(h,u+6)&&(g+=40);for(var u=0;u<r;u+=1)for(var h=0;h<r-6;h+=1)t.isDark(h,u)&&!t.isDark(h+1,u)&&t.isDark(h+2,u)&&t.isDark(h+3,u)&&t.isDark(h+4,u)&&!t.isDark(h+5,u)&&t.isDark(h+6,u)&&(g+=40);for(var I=0,u=0;u<r;u+=1)for(var h=0;h<r;h+=1)t.isDark(h,u)&&(I+=1);var H=Math.abs(100*I/r/r-50)/5;return g+=H*10,g},n}(),b=function(){for(var d=new Array(256),w=new Array(256),o=0;o<8;o+=1)d[o]=1<<o;for(var o=8;o<256;o+=1)d[o]=d[o-4]^d[o-5]^d[o-6]^d[o-8];for(var o=0;o<255;o+=1)w[d[o]]=o;var l={};return l.glog=function(n){if(n<1)throw"glog("+n+")";return w[n]},l.gexp=function(n){for(;n<0;)n+=255;for(;n>=256;)n-=255;return d[n]},l}();function E(d,w){if(typeof d.length>"u")throw d.length+"/"+w;var o=function(){for(var n=0;n<d.length&&d[n]==0;)n+=1;for(var s=new Array(d.length-n+w),t=0;t<d.length-n;t+=1)s[t]=d[t+n];return s}(),l={};return l.getAt=function(n){return o[n]},l.getLength=function(){return o.length},l.multiply=function(n){for(var s=new Array(l.getLength()+n.getLength()-1),t=0;t<l.getLength();t+=1)for(var r=0;r<n.getLength();r+=1)s[t+r]^=b.gexp(b.glog(l.getAt(t))+b.glog(n.getAt(r)));return E(s,0)},l.mod=function(n){if(l.getLength()-n.getLength()<0)return l;for(var s=b.glog(l.getAt(0))-b.glog(n.getAt(0)),t=new Array(l.getLength()),r=0;r<l.getLength();r+=1)t[r]=l.getAt(r);for(var r=0;r<n.getLength();r+=1)t[r]^=b.gexp(b.glog(n.getAt(r))+s);return E(t,0).mod(n)},l}var O=function(){var d=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],w=function(n,s){var t={};return t.totalCount=n,t.dataCount=s,t},o={},l=function(n,s){switch(s){case C.L:return d[(n-1)*4+0];case C.M:return d[(n-1)*4+1];case C.Q:return d[(n-1)*4+2];case C.H:return d[(n-1)*4+3];default:return}};return o.getRSBlocks=function(n,s){var t=l(n,s);if(typeof t>"u")throw"bad rs block @ typeNumber:"+n+"/errorCorrectionLevel:"+s;for(var r=t.length/3,g=[],h=0;h<r;h+=1)for(var u=t[h*3+0],x=t[h*3+1],D=t[h*3+2],L=0;L<u;L+=1)g.push(w(x,D));return g},o}(),U=function(){var d=[],w=0,o={};return o.getBuffer=function(){return d},o.getAt=function(l){var n=Math.floor(l/8);return(d[n]>>>7-l%8&1)==1},o.put=function(l,n){for(var s=0;s<n;s+=1)o.putBit((l>>>n-s-1&1)==1)},o.getLengthInBits=function(){return w},o.putBit=function(l){var n=Math.floor(w/8);d.length<=n&&d.push(0),l&&(d[n]|=128>>>w%8),w+=1},o},q=function(d){var w=y.MODE_NUMBER,o=d,l={};l.getMode=function(){return w},l.getLength=function(t){return o.length},l.write=function(t){for(var r=o,g=0;g+2<r.length;)t.put(n(r.substring(g,g+3)),10),g+=3;g<r.length&&(r.length-g==1?t.put(n(r.substring(g,g+1)),4):r.length-g==2&&t.put(n(r.substring(g,g+2)),7))};var n=function(t){for(var r=0,g=0;g<t.length;g+=1)r=r*10+s(t.charAt(g));return r},s=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return l},Z=function(d){var w=y.MODE_ALPHA_NUM,o=d,l={};l.getMode=function(){return w},l.getLength=function(s){return o.length},l.write=function(s){for(var t=o,r=0;r+1<t.length;)s.put(n(t.charAt(r))*45+n(t.charAt(r+1)),11),r+=2;r<t.length&&s.put(n(t.charAt(r)),6)};var n=function(s){if("0"<=s&&s<="9")return s.charCodeAt(0)-"0".charCodeAt(0);if("A"<=s&&s<="Z")return s.charCodeAt(0)-"A".charCodeAt(0)+10;switch(s){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+s}};return l},S=function(d){var w=y.MODE_8BIT_BYTE,o=c.stringToBytes(d),l={};return l.getMode=function(){return w},l.getLength=function(n){return o.length},l.write=function(n){for(var s=0;s<o.length;s+=1)n.put(o[s],8)},l},X=function(d){var w=y.MODE_KANJI,o=c.stringToBytesFuncs.SJIS;if(!o)throw"sjis not supported.";(function(s,t){var r=o(s);if(r.length!=2||(r[0]<<8|r[1])!=t)throw"sjis not supported."})("友",38726);var l=o(d),n={};return n.getMode=function(){return w},n.getLength=function(s){return~~(l.length/2)},n.write=function(s){for(var t=l,r=0;r+1<t.length;){var g=(255&t[r])<<8|255&t[r+1];if(33088<=g&&g<=40956)g-=33088;else if(57408<=g&&g<=60351)g-=49472;else throw"illegal char at "+(r+1)+"/"+g;g=(g>>>8&255)*192+(g&255),s.put(g,13),r+=2}if(r<t.length)throw"illegal char at "+(r+1)},n},K=function(){var d=[],w={};return w.writeByte=function(o){d.push(o&255)},w.writeShort=function(o){w.writeByte(o),w.writeByte(o>>>8)},w.writeBytes=function(o,l,n){l=l||0,n=n||o.length;for(var s=0;s<n;s+=1)w.writeByte(o[s+l])},w.writeString=function(o){for(var l=0;l<o.length;l+=1)w.writeByte(o.charCodeAt(l))},w.toByteArray=function(){return d},w.toString=function(){var o="";o+="[";for(var l=0;l<d.length;l+=1)l>0&&(o+=","),o+=d[l];return o+="]",o},w},z=function(){var d=0,w=0,o=0,l="",n={},s=function(r){l+=String.fromCharCode(t(r&63))},t=function(r){if(!(r<0)){if(r<26)return 65+r;if(r<52)return 97+(r-26);if(r<62)return 48+(r-52);if(r==62)return 43;if(r==63)return 47}throw"n:"+r};return n.writeByte=function(r){for(d=d<<8|r&255,w+=8,o+=1;w>=6;)s(d>>>w-6),w-=6},n.flush=function(){if(w>0&&(s(d<<6-w),d=0,w=0),o%3!=0)for(var r=3-o%3,g=0;g<r;g+=1)l+="="},n.toString=function(){return l},n},er=function(d){var w=d,o=0,l=0,n=0,s={};s.read=function(){for(;n<8;){if(o>=w.length){if(n==0)return-1;throw"unexpected end of file./"+n}var r=w.charAt(o);if(o+=1,r=="=")return n=0,-1;if(r.match(/^\s$/))continue;l=l<<6|t(r.charCodeAt(0)),n+=6}var g=l>>>n-8&255;return n-=8,g};var t=function(r){if(65<=r&&r<=90)return r-65;if(97<=r&&r<=122)return r-97+26;if(48<=r&&r<=57)return r-48+52;if(r==43)return 62;if(r==47)return 63;throw"c:"+r};return s},nr=function(d,w){var o=d,l=w,n=new Array(d*w),s={};s.setPixel=function(h,u,x){n[u*o+h]=x},s.write=function(h){h.writeString("GIF87a"),h.writeShort(o),h.writeShort(l),h.writeByte(128),h.writeByte(0),h.writeByte(0),h.writeByte(0),h.writeByte(0),h.writeByte(0),h.writeByte(255),h.writeByte(255),h.writeByte(255),h.writeString(","),h.writeShort(0),h.writeShort(0),h.writeShort(o),h.writeShort(l),h.writeByte(0);var u=2,x=r(u);h.writeByte(u);for(var D=0;x.length-D>255;)h.writeByte(255),h.writeBytes(x,D,255),D+=255;h.writeByte(x.length-D),h.writeBytes(x,D,x.length-D),h.writeByte(0),h.writeString(";")};var t=function(h){var u=h,x=0,D=0,L={};return L.write=function(R,N){if(R>>>N)throw"length over";for(;x+N>=8;)u.writeByte(255&(R<<x|D)),N-=8-x,R>>>=8-x,D=0,x=0;D=R<<x|D,x=x+N},L.flush=function(){x>0&&u.writeByte(D)},L},r=function(h){for(var u=1<<h,x=(1<<h)+1,D=h+1,L=g(),R=0;R<u;R+=1)L.add(String.fromCharCode(R));L.add(String.fromCharCode(u)),L.add(String.fromCharCode(x));var N=K(),I=t(N);I.write(u,D);var H=0,Q=String.fromCharCode(n[H]);for(H+=1;H<n.length;){var J=String.fromCharCode(n[H]);H+=1,L.contains(Q+J)?Q=Q+J:(I.write(L.indexOf(Q),D),L.size()<4095&&(L.size()==1<<D&&(D+=1),L.add(Q+J)),Q=J)}return I.write(L.indexOf(Q),D),I.write(x,D),I.flush(),N.toByteArray()},g=function(){var h={},u=0,x={};return x.add=function(D){if(x.contains(D))throw"dup key:"+D;h[D]=u,u+=1},x.size=function(){return u},x.indexOf=function(D){return h[D]},x.contains=function(D){return typeof h[D]<"u"},x};return s},$=function(d,w,o){for(var l=nr(d,w),n=0;n<w;n+=1)for(var s=0;s<d;s+=1)l.setPixel(s,n,o(s,n));var t=K();l.write(t);for(var r=z(),g=t.toByteArray(),h=0;h<g.length;h+=1)r.writeByte(g[h]);return r.flush(),"data:image/gif;base64,"+r};return c}();(function(){A.stringToBytesFuncs["UTF-8"]=function(c){function y(C){for(var P=[],T=0;T<C.length;T++){var b=C.charCodeAt(T);b<128?P.push(b):b<2048?P.push(192|b>>6,128|b&63):b<55296||b>=57344?P.push(224|b>>12,128|b>>6&63,128|b&63):(T++,b=65536+((b&1023)<<10|C.charCodeAt(T)&1023),P.push(240|b>>18,128|b>>12&63,128|b>>6&63,128|b&63))}return P}return y(c)}})(),function(c){W.exports=c()}(function(){return A})})(hr);var dr=hr.exports,cr=sr&&sr.__extends||function(){var W=function(m,A){return W=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,y){c.__proto__=y}||function(c,y){for(var C in y)y.hasOwnProperty(C)&&(c[C]=y[C])},W(m,A)};return function(m,A){W(m,A);function c(){this.constructor=m}m.prototype=A===null?Object.create(A):(c.prototype=A.prototype,new c)}}();Object.defineProperty(fr,"__esModule",{value:!0});var wr=fr.QRCode=void 0,yr=gr,xr=dr,or=lr,Ar=pr,_r=function(W){cr(m,W);function m(A){var c=W.call(this,A)||this;return c.canvas=or.createRef(),c}return m.utf16to8=function(A){var c="",y,C,P=A.length;for(y=0;y<P;y++)C=A.charCodeAt(y),C>=1&&C<=127?c+=A.charAt(y):C>2047?(c+=String.fromCharCode(224|C>>12&15),c+=String.fromCharCode(128|C>>6&63),c+=String.fromCharCode(128|C>>0&63)):(c+=String.fromCharCode(192|C>>6&31),c+=String.fromCharCode(128|C>>0&63));return c},m.prototype.drawRoundedSquare=function(A,c,y,C,P,T,b,E){E.lineWidth=A,E.fillStyle=P,E.strokeStyle=P,y+=A/2,c+=A/2,C-=A,Array.isArray(T)||(T=[T,T,T,T]),T=T.map(function(S){return S=Math.min(S,C/2),S<0?0:S});var O=T[0]||0,U=T[1]||0,q=T[2]||0,Z=T[3]||0;E.beginPath(),E.moveTo(c+O,y),E.lineTo(c+C-U,y),U&&E.quadraticCurveTo(c+C,y,c+C,y+U),E.lineTo(c+C,y+C-q),q&&E.quadraticCurveTo(c+C,y+C,c+C-q,y+C),E.lineTo(c+Z,y+C),Z&&E.quadraticCurveTo(c,y+C,c,y+C-Z),E.lineTo(c,y+O),O&&E.quadraticCurveTo(c,y,c+O,y),E.closePath(),E.stroke(),b&&E.fill()},m.prototype.drawPositioningPattern=function(A,c,y,C,P,T,b){b===void 0&&(b=[0,0,0,0]);var E=Math.ceil(c),O,U;typeof b!="number"&&!Array.isArray(b)?(O=b.outer||0,U=b.inner||0):(O=b,U=O);var q,Z;typeof T!="string"?(q=T.outer,Z=T.inner):(q=T,Z=T);var S=C*c+y,X=P*c+y,K=c*7;this.drawRoundedSquare(E,X,S,K,q,O,!1,A),K=c*3,S+=c*2,X+=c*2,this.drawRoundedSquare(E,X,S,K,Z,U,!0,A)},m.prototype.isInPositioninZone=function(A,c,y){return y.some(function(C){return c>=C.row&&c<=C.row+7&&A>=C.col&&A<=C.col+7})},m.prototype.transformPixelLengthIntoNumberOfCells=function(A,c){return A/c},m.prototype.isCoordinateInImage=function(A,c,y,C,P,T,b,E){if(E){var O=2,U=this.transformPixelLengthIntoNumberOfCells(P,b),q=this.transformPixelLengthIntoNumberOfCells(T,b),Z=this.transformPixelLengthIntoNumberOfCells(y,b)-1,S=this.transformPixelLengthIntoNumberOfCells(C,b)-1;return c>=U-O&&c<=U+Z+O&&A>=q-O&&A<=q+S+O}else return!1},m.prototype.shouldComponentUpdate=function(A){return!yr(this.props,A)},m.prototype.componentDidMount=function(){this.update()},m.prototype.componentDidUpdate=function(){this.update()},m.prototype.update=function(){var A=this.props,c=A.value,y=A.ecLevel,C=A.enableCORS,P=A.bgColor,T=A.fgColor,b=A.logoImage,E=A.logoOpacity,O=A.logoOnLoad,U=A.removeQrCodeBehindLogo,q=A.qrStyle,Z=A.eyeRadius,S=A.eyeColor,X=A.logoPaddingStyle,K=+this.props.size,z=+this.props.quietZone,er=this.props.logoWidth?+this.props.logoWidth:0,nr=this.props.logoHeight?+this.props.logoHeight:0,$=this.props.logoPadding?+this.props.logoPadding:0,d=xr(0,y);d.addData(m.utf16to8(c)),d.make();var w=Ar.findDOMNode(this.canvas.current),o=w.getContext("2d"),l=K+2*z,n=d.getModuleCount(),s=K/n,t=window.devicePixelRatio||1;w.height=w.width=l*t,o.scale(t,t),o.fillStyle=P,o.fillRect(0,0,l,l);var r=z,g=[{row:0,col:0},{row:0,col:n-7},{row:n-7,col:0}];if(o.strokeStyle=T,q==="dots"){o.fillStyle=T;for(var h=s/2,u=0;u<n;u++)for(var x=0;x<n;x++)d.isDark(u,x)&&!this.isInPositioninZone(u,x,g)&&(o.beginPath(),o.arc(Math.round(x*s)+h+r,Math.round(u*s)+h+r,h/100*75,0,2*Math.PI,!1),o.closePath(),o.fill())}else for(var u=0;u<n;u++)for(var x=0;x<n;x++)if(d.isDark(u,x)&&!this.isInPositioninZone(u,x,g)){o.fillStyle=T;var D=Math.ceil((x+1)*s)-Math.floor(x*s),L=Math.ceil((u+1)*s)-Math.floor(u*s);o.fillRect(Math.round(x*s)+r,Math.round(u*s)+r,D,L)}for(var R=0;R<3;R++){var N=g[R],u=N.row,x=N.col,I=Z,H=void 0;Array.isArray(I)&&(I=I[R]),typeof I=="number"&&(I=[I,I,I,I]),S?Array.isArray(S)?H=S[R]:H=S:H=T,this.drawPositioningPattern(o,s,r,u,x,H,I)}if(b){var Q=new Image;C&&(Q.crossOrigin="Anonymous"),Q.onload=function(){o.save();var J=er||K*.2,V=nr||J,Y=(K-J)/2,rr=(K-V)/2;if(U||$){o.beginPath(),o.strokeStyle=P,o.fillStyle=P;var a=J+2*$,f=V+2*$,e=Y+r-$,i=rr+r-$;if(X==="circle"){var v=e+a/2,p=i+f/2;o.ellipse(v,p,a/2,f/2,0,0,2*Math.PI),o.stroke(),o.fill()}else o.fillRect(e,i,a,f)}o.globalAlpha=E,o.drawImage(Q,Y+r,rr+r,J,V),o.restore(),O&&O()},Q.src=b}},m.prototype.render=function(){var A,c=+this.props.size+2*+this.props.quietZone;return or.createElement("canvas",{id:(A=this.props.id)!==null&&A!==void 0?A:"react-qrcode-logo",height:c,width:c,style:{height:c+"px",width:c+"px"},ref:this.canvas})},m.defaultProps={value:"https://reactjs.org/",ecLevel:"M",enableCORS:!1,size:150,quietZone:10,bgColor:"#FFFFFF",fgColor:"#000000",logoOpacity:1,qrStyle:"squares",eyeRadius:[0,0,0],logoPaddingStyle:"square"},m}(or.Component);wr=fr.QRCode=_r;export{wr as Q};
