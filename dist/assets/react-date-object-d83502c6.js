function U(r){return(U=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a})(r)}function de(r){return function(a){if(Array.isArray(a))return ee(a)}(r)||ue(r)||Z(r)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function ue(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function te(r,a){var u=typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(!u){if(Array.isArray(r)||(u=Z(r))||a&&r&&typeof r.length=="number"){u&&(r=u);var e=0,t=function(){};return{s:t,n:function(){return e>=r.length?{done:!0}:{done:!1,value:r[e++]}},e:function(o){throw o},f:t}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,l=!0,w=!1;return{s:function(){u=u.call(r)},n:function(){var o=u.next();return l=o.done,o},e:function(o){w=!0,i=o},f:function(){try{l||u.return==null||u.return()}finally{if(w)throw i}}}}function ne(r,a){var u=Object.keys(r);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(r);a&&(e=e.filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})),u.push.apply(u,e)}return u}function re(r){for(var a=1;a<arguments.length;a++){var u=arguments[a]!=null?arguments[a]:{};a%2?ne(Object(u),!0).forEach(function(e){me(r,e,u[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(u)):ne(Object(u)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(u,e))})}return r}function me(r,a,u){return(a=ce(a))in r?Object.defineProperty(r,a,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[a]=u,r}function E(r,a){return he(r)||function(u,e){var t=u==null?null:typeof Symbol<"u"&&u[Symbol.iterator]||u["@@iterator"];if(t!=null){var i,l,w,o,h=[],m=!0,M=!1;try{if(w=(t=t.call(u)).next,e===0){if(Object(t)!==t)return;m=!1}else for(;!(m=(i=w.call(t)).done)&&(h.push(i.value),h.length!==e);m=!0);}catch(f){M=!0,l=f}finally{try{if(!m&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(M)throw l}}return h}}(r,a)||Z(r,a)||oe()}function oe(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Z(r,a){if(r){if(typeof r=="string")return ee(r,a);var u=Object.prototype.toString.call(r).slice(8,-1);return u==="Object"&&r.constructor&&(u=r.constructor.name),u==="Map"||u==="Set"?Array.from(r):u==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)?ee(r,a):void 0}}function ee(r,a){(a==null||a>r.length)&&(a=r.length);for(var u=0,e=new Array(a);u<a;u++)e[u]=r[u];return e}function he(r){if(Array.isArray(r))return r}function ge(r,a){for(var u=0;u<a.length;u++){var e=a[u];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(r,ce(e.key),e)}}function ce(r){var a=function(u,e){if(U(u)!=="object"||u===null)return u;var t=u[Symbol.toPrimitive];if(t!==void 0){var i=t.call(u,e||"default");if(U(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(u)}(r,"string");return U(a)==="symbol"?a:String(a)}function v(r,a,u){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(r,a),a.set(r,u)}function n(r,a){return function(u,e){return e.get?e.get.call(u):e.value}(r,le(r,a,"get"))}function s(r,a,u){return function(e,t,i){if(t.set)t.set.call(e,i);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=i}}(r,le(r,a,"set"),u),u}function le(r,a,u){if(!a.has(r))throw new TypeError("attempted to "+u+" private field on non-instance");return a.get(r)}var ie={name:"gregorian_en",months:[["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],weekDays:[["Saturday","Sat"],["Sunday","Sun"],["Monday","Mon"],["Tuesday","Tue"],["Wednesday","Wed"],["Thursday","Thu"],["Friday","Fri"]],digits:["0","1","2","3","4","5","6","7","8","9"],meridiems:[["AM","am"],["PM","pm"]]},B={name:"gregorian",startYear:1,yearLength:365,epoch:1721424,century:20,weekStartDayIndex:1,getMonthLengths:function(r){return[31,r?29:28,31,30,31,30,31,31,30,31,30,31]},isLeap:function(r){return r%4==0&&r%100!=0||r%400==0},getLeaps:function(r){if(r!==0){for(var a=r>0?1:-1,u=[];r>0?a<=r:r<=a;)this.isLeap(a)&&u.push(a),r>0?a++:a--;return u}},getDayOfYear:function(r){for(var a=r.year,u=r.month,e=r.day,t=this.getMonthLengths(this.isLeap(a)),i=0;i<u.index;i++)e+=t[i];return e},getAllDays:function(r){var a=r.year;return this.yearLength*(a-1)+this.leapsLength(a)+this.getDayOfYear(r)},leapsLength:function(r){return((r-1)/4|0)+(-(r-1)/100|0)+((r-1)/400|0)},guessYear:function(r,a){return~~(r/365.24)+(a>0?1:-1)}};function I(r){return r&&r.constructor===Object}function S(r){if(!isNaN(r))return parseInt(r)}function H(r){return Array.isArray(r)}function V(r,a,u){return r===void 0||r<a||r>u}var p=new WeakMap,y=new WeakMap,c=new WeakMap,Y=new WeakMap,N=new WeakMap,A=new WeakMap,g=new WeakMap,T=new WeakMap,b=new WeakMap,d=new WeakMap,J=new WeakMap,L=new WeakMap,ae=new WeakMap,_=new WeakMap,C=new WeakMap,se=new WeakMap,Q=new WeakMap,W=new WeakMap,X=new WeakMap,ve=function(){function r(e){var t=this;(function(o,h){if(!(o instanceof h))throw new TypeError("Cannot call a class as a function")})(this,r),v(this,p,{writable:!0,value:void 0}),v(this,y,{writable:!0,value:void 0}),v(this,c,{writable:!0,value:void 0}),v(this,Y,{writable:!0,value:void 0}),v(this,N,{writable:!0,value:void 0}),v(this,A,{writable:!0,value:void 0}),v(this,g,{writable:!0,value:void 0}),v(this,T,{writable:!0,value:void 0}),v(this,b,{writable:!0,value:ie}),v(this,d,{writable:!0,value:B}),v(this,J,{writable:!0,value:!1}),v(this,L,{writable:!0,value:{}}),v(this,ae,{writable:!0,value:/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/}),v(this,_,{writable:!0,value:[]}),v(this,C,{writable:!0,value:!0}),v(this,se,{writable:!0,value:function(o,h){switch(o){case"YYYY":return["year",h];case"YY":return["year","".concat(n(t,d).century).concat(h)];case"MMMM":case"MMM":return["month",t.months.findIndex(function(M){var f=M.name,O=M.shortName;return new RegExp(h,"i").test(f+O)})+1];case"MM":case"M":return["month",h];case"DD":case"D":return["day",h];case"HH":case"H":return["hour",h];case"hh":case"h":var m=S(h);return["hour",m>12?m-12:m];case"mm":case"m":return["minute",h];case"ss":case"s":return["second",h];case"SSS":case"SS":case"S":return["millisecond",h];default:return[]}}}),v(this,Q,{writable:!0,value:function(){return n(t,p)===0&&n(t,d).startYear!==0}}),v(this,W,{writable:!0,value:function(){if(n(t,C)&&t.isValid){var o=Math.floor,h=function(D,k){return[(P=D,(P<0?-1:1)*Math.abs(o(D/k))),(x=D,j=k,(x<0&&o(x%j)!==-0?j:0)+o(D%k))];var x,j,P},m=function(){if(n(t,y)<0||n(t,y)>11){var D=n(t,y)<0?-1:1,k=E(h(n(t,y),12),2),x=k[0],j=k[1];s(t,p,n(t,p)+x),s(t,y,j),n(t,Q).call(t)&&s(t,p,D)}};for(s(t,C,!1),[["millisecond","second",1e3],["second","minute",60],["minute","hour",60],["hour","day",24]].forEach(function(D){var k=E(D,3),x=k[0],j=k[1],P=k[2];if(function(z,$){return z>=$||z<0}(t[x],P)){var R=E(h(t[x],P),2),q=R[0],G=R[1];t[j]+=q,t[x]=G}}),s(t,C,!0),m();n(t,c)<-n(t,d).yearLength||n(t,c)>n(t,d).yearLength;){if(n(t,y)>0){for(var M=n(t,d).getMonthLengths(t.isLeap),f=0;f<n(t,y);f++)s(t,c,n(t,c)+M[f]);s(t,y,0)}var O=t.isLeap?t.calendar.yearLength+1:t.calendar.yearLength;s(t,c,n(t,c)+O*(n(t,c)<0?1:-1)),s(t,p,n(t,p)+(n(t,c)<0?-1:1))}for(;;){var F;for(m();n(t,c)<1;)s(t,y,n(t,y)-1),m(),s(t,c,t.month.length+n(t,c));if(n(t,c)<=t.month.length||isNaN(n(t,c)))break;s(t,c,n(t,c)-t.month.length),s(t,y,(F=n(t,y),F++,F))}n(t,Y)||s(t,Y,0),n(t,N)||s(t,N,0),n(t,A)||s(t,A,0),n(t,g)||s(t,g,0)}}}),v(this,X,{writable:!0,value:function(){return(n(t,L).weekDays||n(t,b).weekDays).map(function(o,h){var m=E(o,2),M=m[0],f=m[1],O=h-t.weekStartDayIndex;return O<0&&(O+=7),{name:M,shortName:f,index:O,number:O+1,toString:function(){return this.number.toString()},valueOf:function(){return this.number}}})}});var i=I(e)?re({},e):e,l=!0;if(i&&typeof i!="boolean"||(i={date:new Date}),I(i)||(i={date:i}),Object.keys(i).length!==0){for(var w in I(i.calendar)&&s(this,d,i.calendar),I(i.locale)&&s(this,b,i.locale),isNaN(i.year)&&isNaN(i.month)&&isNaN(i.day)&&!i.date&&(i.date=new Date),i.date&&(typeof i.date=="string"&&i.format&&s(this,T,i.format),this.setDate(i.date),i.calendar&&this.convert(i.calendar),l=!1),delete i.calendar,delete i.locale,delete i.date,i)this.set(w,i[w]);n(this,Q).call(this)&&s(this,p,-1),l&&n(this,W).call(this)}}var a,u;return a=r,(u=[{key:"parse",value:function(e){if(!e)return this;var t,i,l=n(this,T),w=n(this,b).digits,o=te(w);try{for(o.s();!(t=o.n()).done;){var h=t.value;e=e.replace(new RegExp(h,"g"),w.indexOf(h))}}catch(K){o.e(K)}finally{o.f()}if(l)for(var m=l.split(/[^\w\u0600-\u06FF]/),M=e.split(/[^\w\u0600-\u06FF]/),f=0;f<m.length;f++)this.set.apply(this,de(n(this,se).call(this,m[f],M[f])));else{var O=e.match(/(-?\d{2,4})?\W?([A-z]{3,9}|\d{1,2})?\W?(\d{1,2})?\W?(\d{1,2})?\W?(\d{1,2})?\W?(\d{1,2})?\W?(\d{1,3})?\W?(am|pm)?/),F=(he(i=O)||ue(i)||Z(i)||oe()).slice(1),D=F[1];D&&(D=/\d+/.test(D)?S(D)-1:this.months.findIndex(function(K){return new RegExp(D,"i").test(K.name)})),F[1]=D;var k=E(F.map(S),7),x=k[0],j=k[1],P=k[2],R=k[3],q=k[4],G=k[5],z=k[6];s(this,p,x),s(this,y,j),s(this,c,P),s(this,Y,R),s(this,N,q),s(this,A,G),s(this,g,z)}var $=E(n(this,b).meridiems[1],2),fe=$[0],ye=$[1];return n(this,Y)<12&&(e.includes(fe)||e.includes(ye))&&s(this,Y,n(this,Y)+12),n(this,W).call(this),this}},{key:"convert",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;if(I(t)&&s(this,b,t),!I(e)||e.name===n(this,d).name)return this;var i=this.toJulianDay()-e.epoch,l=new r({calendar:e,year:e.guessYear(i,n(this,p)),month:1,day:1});return l.day+=i-l.toDays(),s(this,p,l.year),s(this,y,l.month.index),s(this,c,l.day),s(this,d,e),this}},{key:"format",value:function(e,t){if(!this.isValid||e&&typeof e!="string")return"";e||(e=n(this,T)||"YYYY/MM/DD"),H(t)||(t=[]),t=(t=t.concat(n(this,_))).filter(function(f){return typeof f=="string"||(console.warn("type of all items in the ignore list must be string, found",U(f)),!1)}).map(function(f){return f.replace(/[*/+\-()[\]{}\s$^]/g,function(O){return"\\"+O})});var i,l=new RegExp("".concat(t.join("|")).concat(t.length>0?"|":"","YYYY|YY|MMMM|MMM|MM|M|WW|W|DDDD|DDD|DD|D|dddd|ddd|dd|d|HH|H|hh|h|mm|m|ss|s|SSS|SS|S|A|a|."),"g"),w="",o=te(e.match(l)||[]);try{for(o.s();!(i=o.n()).done;){var h=i.value,m=this.getValue(h);w+=t.includes(h)?h:m===0?m:m||h}}catch(f){o.e(f)}finally{o.f()}var M=this.digits;return w.replace(/[0-9]/g,function(f){return M[f]})}},{key:"getProperty",value:function(e){return this.getValue(e)}},{key:"getValue",value:function(e){var t=function(i){return i<10?"0"+i:i};switch(e){case"YYYY":return this.year;case"YY":return this.year.toString().substring(2,4);case"MMMM":return this.month.name;case"MMM":return this.month.shortName;case"MM":return t(this.month.number);case"M":return this.month.number;case"WW":return t(this.weekOfYear);case"W":return this.weekOfYear;case"DDDD":case"DDD":return this.dayOfYear;case"DD":return t(this.day);case"D":return this.day;case"HH":return t(this.hour);case"H":return this.hour;case"dddd":return this.weekDay.name;case"ddd":return this.weekDay.shortName;case"dd":return t(this.weekDay.number);case"d":return this.weekDay.number;case"hh":return t(this.hour>12?this.hour-12:this.hour||12);case"h":return this.hour>12?this.hour-12:this.hour||12;case"mm":return t(this.minute);case"m":return this.minute;case"ss":return t(this.second);case"s":return this.second;case"SSS":return n(this,g)<10?"00".concat(n(this,g)):n(this,g)<100?"0".concat(n(this,g)):n(this,g);case"SS":return n(this,g)<10?"00":n(this,g)<100?("0"+n(this,g)).substring(2,0):n(this,g).toString().substring(0,2);case"S":return n(this,g)<10||n(this,g)<100?"0":n(this,g).toString().substring(0,1);case"a":return this.hour>=12?n(this,b).meridiems[1][1]:n(this,b).meridiems[0][1];case"A":return this.hour>=12?n(this,b).meridiems[1][0]:n(this,b).meridiems[0][0];default:return""}}},{key:"setYear",value:function(e){return this.year=e,this}},{key:"setMonths",value:function(e){return this.months=e,this}},{key:"setMonth",value:function(e){return this.month=e,this}},{key:"setWeekDays",value:function(e){return this.weekDays=e,this}},{key:"setDigits",value:function(e){return this.digits=e,this}},{key:"setDay",value:function(e){return this.day=e,this}},{key:"setHour",value:function(e){return this.hour=e,this}},{key:"setMinute",value:function(e){return this.minute=e,this}},{key:"setSecond",value:function(e){return this.second=e,this}},{key:"setMillisecond",value:function(e){return this.millisecond=e,this}},{key:"setFormat",value:function(e){return s(this,T,e),this}},{key:"setLocale",value:function(e){return this.locale=e,this}},{key:"setCalendar",value:function(e){return this.calendar=e,this}},{key:"setDate",value:function(e){if(typeof e=="string"){if(!n(this,ae).test(e))return this.parse(e);e=new Date(e)}return typeof e=="number"&&(e=new Date(e)),e instanceof Date&&(s(this,d,B),s(this,p,e.getFullYear()),s(this,y,e.getMonth()),s(this,c,e.getDate()),s(this,Y,e.getHours()),s(this,N,e.getMinutes()),s(this,A,e.getSeconds()),s(this,g,e.getMilliseconds()),s(this,J,!1)),e instanceof r&&(s(this,p,e.year),s(this,y,e.month.index),s(this,c,e.day),s(this,Y,e.hour),s(this,N,e.minute),s(this,A,e.second),s(this,g,e.millisecond),s(this,b,e.locale),s(this,T,e._format),s(this,d,e.calendar),s(this,J,e.isUTC),s(this,_,e.ignoreList),s(this,L,e.custom)),this}},{key:"setIgnoreList",value:function(e){return this.ignoreList=e,this}},{key:"set",value:function(e,t){if(e==null)return this;if(I(e)){var i=re({},e);for(var l in i.date&&(this.setDate(i.date),delete i.date),i.calendar&&(this.convert(i.calendar),delete i.calendar),i.locale&&(this.setLocale(i.locale),delete i.locale),s(this,C,!1),i)this.set(l,i[l]);return s(this,C,!0),n(this,W).call(this),this}e==="format"&&(e="_format");try{this[e]=t}catch{}return this}},{key:"add",value:function(e,t){if(!(e=S(e))||!t)return this;switch(t){case"years":case"y":t="year";break;case"months":case"M":t="month";break;case"days":case"d":t="day";break;case"hours":case"h":t="hour";break;case"minutes":case"m":t="minute";break;case"seconds":case"s":t="second";break;case"milliseconds":case"ms":t="millisecond"}return this[t]+=e,this}},{key:"subtract",value:function(e,t){return this.add(-e,t)}},{key:"toFirstOfYear",value:function(){return this.month=1,this.day=1,this}},{key:"toLastOfYear",value:function(){return this.day>=29&&(this.day=29),this.month=12,this.toLastOfMonth(),this}},{key:"toFirstOfMonth",value:function(){return s(this,c,1),this}},{key:"toLastOfMonth",value:function(){return s(this,c,0),s(this,y,n(this,y)+1),n(this,W).call(this),this}},{key:"toFirstOfWeek",value:function(){return this.day-=this.weekDay.index,this}},{key:"toLastOfWeek",value:function(){return this.day+=6-this.weekDay.index,this}},{key:"toFirstWeekOfYear",value:function(){return this.toFirstOfYear(),this.weekDay.index===0?this:this.toLastOfWeek().setDay(this.day+1)}},{key:"toLastWeekOfYear",value:function(){return this.toLastOfYear().toFirstOfWeek()}},{key:"toString",value:function(){return this.format()}},{key:"toDate",value:function(){var e=new r(this);return n(this,d).name!=="gregorian"&&e.convert(B),new Date(e.year,e.month.index,e.day,e.hour,e.minute,e.second,e.millisecond)}},{key:"toUTC",value:function(){return n(this,J)||(this.minute+=this.toDate().getTimezoneOffset(),s(this,J,!0)),this}},{key:"toUnix",value:function(){return this.unix}},{key:"toJulianDay",value:function(){return this.toDays()+n(this,d).epoch}},{key:"toObject",value:function(){return{year:n(this,p),month:this.month,day:n(this,c),weekDay:this.weekDay,hour:n(this,Y),minute:n(this,N),second:n(this,A),millisecond:n(this,g),weekOfYear:this.weekOfYear,dayOfYear:this.dayOfYear,daysLeft:this.daysLeft,calendar:n(this,d),locale:n(this,b),format:n(this,T)||"YYYY/MM/DD",ignoreList:n(this,_)}}},{key:"toJSON",value:function(){return this.valueOf()}},{key:"valueOf",value:function(){return this.toDate().valueOf()}},{key:"toDays",value:function(){if(this.isValid)return n(this,d).getAllDays(this)}},{key:"dayOfBeginning",get:function(){return this.toDays()}},{key:"dayOfYear",get:function(){if(this.isValid)return n(this,d).getDayOfYear(this)}},{key:"weekOfYear",get:function(){if(this.isValid)return 1+~~(this.dayOfYear/7)}},{key:"daysLeft",get:function(){if(this.isValid){var e=n(this,d).yearLength;return(this.isLeap?e+1:e)-this.dayOfYear}}},{key:"year",get:function(){return n(this,p)},set:function(e){s(this,p,S(e)),n(this,W).call(this)}},{key:"month",get:function(){return this.months[n(this,y)]||{}},set:function(e){var t;e=(t=S(e.valueOf())-1)!==null&&t!==void 0?t:void 0,s(this,y,e),V(e,0,11)&&n(this,W).call(this)}},{key:"monthIndex",get:function(){return n(this,y)}},{key:"day",get:function(){return n(this,c)},set:function(e){e=S(e),s(this,c,e),V(e,1,28)&&n(this,W).call(this)}},{key:"weekDay",get:function(){if(!this.isValid)return{};var e=(this.toJulianDay()+3)%7;return n(this,X).call(this)[e]}},{key:"hour",get:function(){return n(this,Y)},set:function(e){e=S(e),s(this,Y,e),V(e,0,23)&&n(this,W).call(this)}},{key:"minute",get:function(){return n(this,N)},set:function(e){e=S(e),s(this,N,e),V(e,0,59)&&n(this,W).call(this)}},{key:"second",get:function(){return n(this,A)},set:function(e){e=S(e),s(this,A,e),V(e,0,59)&&n(this,W).call(this)}},{key:"millisecond",get:function(){return n(this,g)},set:function(e){e=S(e),s(this,g,e),V(e,0,999)&&n(this,W).call(this)}},{key:"months",get:function(){var e=n(this,d).getMonthLengths(this.isLeap);return(n(this,L).months||n(this,b).months).map(function(t,i){var l=E(t,2);return{name:l[0],shortName:l[1],length:e[i],index:i,number:i+1,toString:function(){return this.number.toString()},valueOf:function(){return this.number}}})},set:function(e){if(!e)return delete n(this,L).months;H(e)&&e.length===12&&e.every(function(t){return H(t)&&t.length===2&&t.every(function(i){return typeof i=="string"})})&&(n(this,L).months=e)}},{key:"weekDays",get:function(){return n(this,X).call(this).sort(function(e,t){return e.index-t.index})},set:function(e){if(!e)return delete n(this,L).weekDays;H(e)&&e.length===7&&e.every(function(t){return H(t)&&t.length===2&&t.every(function(i){return typeof i=="string"})})&&(n(this,L).weekDays=e)}},{key:"leaps",get:function(){return n(this,d).getLeaps(n(this,p))}},{key:"calendar",get:function(){return n(this,d)},set:function(e){this.convert(e)}},{key:"locale",get:function(){return n(this,b)},set:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ie;I(e)&&s(this,b,e)}},{key:"custom",get:function(){return n(this,L)}},{key:"meridiems",get:function(){return n(this,b).meridiems}},{key:"digits",get:function(){return n(this,L).digits||n(this,b).digits},set:function(e){if(!e)return delete n(this,L).digits;H(e)&&e.length===10&&(n(this,L).digits=e)}},{key:"_format",get:function(){return n(this,T)},set:function(e){typeof e=="string"&&s(this,T,e)}},{key:"isLeap",get:function(){return n(this,d).isLeap(n(this,p))}},{key:"isValid",get:function(){return!isNaN(n(this,p))&&!isNaN(n(this,y))&&!isNaN(n(this,c))}},{key:"isUTC",get:function(){return n(this,J)}},{key:"unix",get:function(){return(this.valueOf()-this.millisecond)/1e3}},{key:"ignoreList",get:function(){return n(this,_)},set:function(e){H(e)&&s(this,_,e)}},{key:"weekStartDayIndex",get:function(){return n(this,d).weekStartDayIndex},set:function(e){(e=S(e))!==void 0&&(n(this,d).weekStartDayIndex=Math.abs(e)%7)}},{key:"date",set:function(e){this.setDate(e)}}])&&ge(a.prototype,u),Object.defineProperty(a,"prototype",{writable:!1}),r}();const pe=Object.freeze(Object.defineProperty({__proto__:null,default:ve},Symbol.toStringTag,{value:"Module"}));export{pe as i};
