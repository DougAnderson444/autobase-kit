import{e as X,i as R}from"./inherits_browser-5be4ea89.js";function q(e,t){return t.forEach(function(n){n&&typeof n!="string"&&!Array.isArray(n)&&Object.keys(n).forEach(function(i){if(i!=="default"&&!(i in e)){var r=Object.getOwnPropertyDescriptor(n,i);Object.defineProperty(e,i,r.get?r:{enumerable:!0,get:function(){return n[i]}})}})}),Object.freeze(e)}var ee=typeof queueMicrotask=="function"?queueMicrotask:e=>Promise.resolve().then(e),$=X.exports,te=R.exports,E=ee,k=y(new Error("Not readable")),U=y(new Error("Not writable")),N=y(new Error("Not deletable")),T=y(new Error("Not statable")),M=y(new Error("No readonly open")),B=0,P=1,D=2,j=3,x=4,m=5,S=6,ne=h;function h(e){if(!(this instanceof h))return new h(e);$.EventEmitter.call(this),this._queued=[],this._pending=0,this._needsOpen=!0,this.opened=!1,this.closed=!1,this.destroyed=!1,e&&(e.openReadonly&&(this._openReadonly=e.openReadonly),e.open&&(this._open=e.open),e.read&&(this._read=e.read),e.write&&(this._write=e.write),e.del&&(this._del=e.del),e.stat&&(this._stat=e.stat),e.close&&(this._close=e.close),e.destroy&&(this._destroy=e.destroy)),this.preferReadonly=this._openReadonly!==M,this.readable=this._read!==k,this.writable=this._write!==U,this.deletable=this._del!==N,this.statable=this._stat!==T}te(h,$.EventEmitter);h.prototype.read=function(e,t,n){this.run(new c(this,B,e,t,null,n))};h.prototype._read=k;h.prototype.write=function(e,t,n){n||(n=p),V(this),this.run(new c(this,P,e,t.length,t,n))};h.prototype._write=U;h.prototype.del=function(e,t,n){n||(n=p),V(this),this.run(new c(this,D,e,t,null,n))};h.prototype._del=N;h.prototype.stat=function(e){this.run(new c(this,j,0,0,null,e))};h.prototype._stat=T;h.prototype.open=function(e){if(e||(e=p),this.opened&&!this._needsOpen)return E(()=>e(null));O(this,new c(this,x,0,0,null,e))};h.prototype._open=y(null);h.prototype._openReadonly=M;h.prototype.close=function(e){if(e||(e=p),this.closed)return E(()=>e(null));O(this,new c(this,m,0,0,null,e))};h.prototype._close=y(null);h.prototype.destroy=function(e){e||(e=p),this.closed||this.close(p),O(this,new c(this,S,0,0,null,e))};h.prototype._destroy=y(null);h.prototype.run=function(e){this._needsOpen&&this.open(p),this._queued.length?this._queued.push(e):e._run()};function p(){}function c(e,t,n,i,r,o){this.type=t,this.offset=n,this.data=r,this.size=i,this.storage=e,this._sync=!1,this._callback=o,this._openError=null}c.prototype._maybeOpenError=function(e){if(this.type===x)for(var t=this.storage._queued,n=0;n<t.length;n++)t[n]._openError=e};c.prototype._unqueue=function(e){var t=this.storage,n=t._queued;if(e)this._maybeOpenError(e);else switch(this.type){case x:t.opened||(t.opened=!0,t.emit("open"));break;case m:t.closed||(t.closed=!0,t.emit("close"));break;case S:t.destroyed||(t.destroyed=!0,t.emit("destroy"));break}n.length&&n[0]===this&&n.shift(),--t._pending||ie(t)};c.prototype.callback=function(e,t){if(this._sync)return d(this,e,t);this._unqueue(e),this._callback(e,t)};c.prototype._openAndNotClosed=function(){var e=this.storage;return e.opened&&!e.closed?!0:(e.opened?e.closed&&d(this,new Error("Closed")):d(this,this._openError||new Error("Not opened")),!1)};c.prototype._open=function(){var e=this.storage;if(e.opened&&!e._needsOpen)return d(this,null);if(e.closed)return d(this,new Error("Closed"));e._needsOpen=!1,e.preferReadonly?e._openReadonly(this):e._open(this)};c.prototype._run=function(){var e=this.storage;switch(e._pending++,this._sync=!0,this.type){case B:this._openAndNotClosed()&&e._read(this);break;case P:this._openAndNotClosed()&&e._write(this);break;case D:this._openAndNotClosed()&&e._del(this);break;case j:this._openAndNotClosed()&&e._stat(this);break;case x:this._open();break;case m:e.closed||!e.opened?d(this,null):e._close(this);break;case S:e.destroyed?d(this,null):e._destroy(this);break}this._sync=!1};function O(e,t){e._queued.push(t),e._pending||t._run()}function ie(e){for(var t=e._queued;t.length>0;){var n=t[0].type>3;if((!n||!e._pending)&&t[0]._run(),n)return;t.shift()}}function V(e){e.preferReadonly&&(e._needsOpen=!0,e.preferReadonly=!1)}function y(e){return t;function t(n){d(n,e)}}function d(e,t,n){E(()=>e.callback(t,n))}function I(e){return e.length}function re(e){const t=e.byteLength;let n="";for(let i=0;i<t;i++)n+=String.fromCharCode(e[i]);return n}function oe(e,t,n=0,i=I(t)){const r=Math.min(i,e.byteLength-n);for(let o=0;o<r;o++)e[n+o]=t.charCodeAt(o);return r}var se={byteLength:I,toString:re,write:oe};const L="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g=new Uint8Array(256);for(let e=0;e<L.length;e++)g[L.charCodeAt(e)]=e;g[45]=62;g[95]=63;function W(e){let t=e.length;return e.charCodeAt(t-1)===61&&t--,t>1&&e.charCodeAt(t-1)===61&&t--,t*3>>>2}function fe(e){const t=e.byteLength;let n="";for(let i=0;i<t;i+=3)n+=L[e[i]>>2]+L[(e[i]&3)<<4|e[i+1]>>4]+L[(e[i+1]&15)<<2|e[i+2]>>6]+L[e[i+2]&63];return t%3==2?n=n.substring(0,n.length-1)+"=":t%3==1&&(n=n.substring(0,n.length-2)+"=="),n}function le(e,t,n=0,i=W(t)){const r=Math.min(i,e.byteLength-n);for(let o=0,s=0;o<r;o+=4){const f=g[t.charCodeAt(o)],l=g[t.charCodeAt(o+1)],u=g[t.charCodeAt(o+2)],b=g[t.charCodeAt(o+3)];e[s++]=f<<2|l>>4,e[s++]=(l&15)<<4|u>>2,e[s++]=(u&3)<<6|b&63}return r}var he={byteLength:W,toString:fe,write:le};function F(e){return e.length>>>1}function ue(e){const t=e.byteLength;e=new DataView(e.buffer,e.byteOffset,t);let n="",i=0;for(let r=t-t%4;i<r;i+=4)n+=e.getUint32(i).toString(16).padStart(8,"0");for(;i<t;i++)n+=e.getUint8(i).toString(16).padStart(2,"0");return n}function ce(e,t,n=0,i=F(t)){const r=Math.min(i,e.byteLength-n);for(let o=0;o<r;o++){const s=G(t.charCodeAt(o*2)),f=G(t.charCodeAt(o*2+1));if(s===void 0||f===void 0)return e.subarray(0,o);e[n+o]=s<<4|f}return r}var ae={byteLength:F,toString:ue,write:ce};function G(e){if(e>=48&&e<=57)return e-48;if(e>=65&&e<=70)return e-65+10;if(e>=97&&e<=102)return e-97+10}function v(e){let t=0;for(let n=0,i=e.length;n<i;n++){const r=e.charCodeAt(n);if(r>=55296&&r<=56319&&n+1<i){const o=e.charCodeAt(n+1);if(o>=56320&&o<=57343){t+=4,n++;continue}}r<=127?t+=1:r<=2047?t+=2:t+=3}return t}let z;if(typeof TextDecoder!="undefined"){const e=new TextDecoder;z=function(n){return e.decode(n)}}else z=function(t){const n=t.byteLength;let i="",r=0;for(;r<n;){let o=t[r];if(o<=127){i+=String.fromCharCode(o),r++;continue}let s=0,f=0;if(o<=223?(s=1,f=o&31):o<=239?(s=2,f=o&15):o<=244&&(s=3,f=o&7),n-r-s>0){let l=0;for(;l<s;)o=t[r+l+1],f=f<<6|o&63,l+=1}else f=65533,s=n-r;i+=String.fromCodePoint(f),r+=s+1}return i};let C;if(typeof TextEncoder!="undefined"){const e=new TextEncoder;C=function(n,i,r=0,o=v(i)){const s=Math.min(o,n.byteLength-r);return e.encodeInto(i,n.subarray(r,r+s)),s}}else C=function(t,n,i=0,r=v(n)){const o=Math.min(r,t.byteLength-i);t=t.subarray(i,i+o);let s=0,f=0;for(;s<n.length;){const l=n.codePointAt(s);if(l<=127){t[f++]=l,s++;continue}let u=0,b=0;for(l<=2047?(u=6,b=192):l<=65535?(u=12,b=224):l<=2097151&&(u=18,b=240),t[f++]=b|l>>u,u-=6;u>=0;)t[f++]=128|l>>u&63,u-=6;s+=l>=65536?2:1}return o};var ye={byteLength:v,toString:z,write:C};function Q(e){return e.length*2}function de(e){const t=e.byteLength;let n="";for(let i=0;i<t-1;i+=2)n+=String.fromCharCode(e[i]+e[i+1]*256);return n}function pe(e,t,n=0,i=Q(t)){const r=Math.min(i,e.byteLength-n);let o=r;for(let s=0;s<t.length&&!((o-=2)<0);++s){const f=t.charCodeAt(s),l=f>>8,u=f%256;e[n+s*2]=u,e[n+s*2+1]=l}return r}var ge={byteLength:Q,toString:de,write:pe};const we=se,_e=he,be=ae,Le=ye,xe=ge;function A(e){switch(e){case"ascii":return we;case"base64":return _e;case"hex":return be;case"utf8":case"utf-8":case void 0:return Le;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return xe;default:throw new Error(`Unknown encoding: ${e}`)}}function Y(e){return e instanceof Uint8Array}function Ae(e,t,n){const i=new Uint8Array(e);return t!==void 0&&t(i,t,0,i.byteLength,n),i}function Ee(e){return new Uint8Array(e)}function me(e){return new Uint8Array(e)}function Se(e,t){return A(t).byteLength(e)}function Oe(e,t){if(e===t)return 0;const n=Math.min(e.byteLength,t.byteLength);e=new DataView(e.buffer,e.byteOffset,e.byteLength),t=new DataView(t.buffer,t.byteOffset,t.byteLength);let i=0;for(let r=n-n%4;i<r;i+=4){const o=e.getUint32(i),s=t.getUint32(i);if(o<s)return-1;if(o>s)return 1}for(;i<n;i++){const r=e.getUint8(i),o=t.getUint8(i);if(r<o)return-1;if(r>o)return 1}return e.byteLength>t.byteLength?1:e.byteLength<t.byteLength?-1:0}function ve(e,t){t===void 0&&(t=e.reduce((i,r)=>i+r.byteLength,0));const n=new Uint8Array(t);return e.reduce((i,r)=>(n.set(r,i),i+r.byteLength),0),n}function ze(e,t,n=0,i=0,r=e.byteLength){if(r>0&&r<i||r===i||e.byteLength===0||t.byteLength===0)return 0;if(n<0)throw new RangeError("targetStart is out of range");if(i<0||i>=e.byteLength)throw new RangeError("sourceStart is out of range");if(r<0)throw new RangeError("sourceEnd is out of range");n>=t.byteLength&&(n=t.byteLength),r>e.byteLength&&(r=e.byteLength),t.byteLength-n<r-i&&(r=t.length-n+i);const o=r-i;return e===t?t.copyWithin(n,i,r):t.set(e.subarray(i,r),n),o}function Ce(e,t){if(e===t)return!0;if(e.byteLength!==t.byteLength)return!1;const n=e.byteLength;e=new DataView(e.buffer,e.byteOffset,e.byteLength),t=new DataView(t.buffer,t.byteOffset,t.byteLength);let i=0;for(let r=n-n%4;i<r;i+=4)if(e.getUint32(i)!==t.getUint32(i))return!1;for(;i<n;i++)if(e.getUint8(i)!==t.getUint8(i))return!1;return!0}function Re(e,t,n,i,r){if(typeof t=="string"?typeof n=="string"?(r=n,n=0,i=e.byteLength):typeof i=="string"&&(r=i,i=e.byteLength):typeof val=="number"?t=t&255:typeof val=="boolean"&&(t=+t),n<0||e.byteLength<n||e.byteLength<i)throw new RangeError("Out of range index");if(n===void 0&&(n=0),i===void 0&&(i=e.byteLength),i<=n)return e;if(t||(t=0),typeof t=="number")for(let o=n;o<i;++o)e[o]=t;else{t=Y(t)?t:Z(t,r);const o=t.byteLength;for(let s=0;s<i-n;++s)e[s+n]=t[s%o]}return e}function Z(e,t,n){return typeof e=="string"?$e(e,t):Array.isArray(e)?ke(e):ArrayBuffer.isView(e)?Ue(e):Ne(e,t,n)}function $e(e,t){const n=A(t),i=new Uint8Array(n.byteLength(e));return n.write(i,e,0,i.byteLength),i}function ke(e){const t=new Uint8Array(e.length);return t.set(e),t}function Ue(e){const t=new Uint8Array(e.byteLength);return t.set(e),t}function Ne(e,t,n){return new Uint8Array(e,t,n)}function w(e,t,n){const i=e[t];e[t]=e[n],e[n]=i}function Te(e){const t=e.byteLength;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<t;n+=2)w(e,n,n+1);return e}function Me(e){const t=e.byteLength;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<t;n+=4)w(e,n,n+3),w(e,n+1,n+2);return e}function Be(e){const t=e.byteLength;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<t;n+=8)w(e,n,n+7),w(e,n+1,n+6),w(e,n+2,n+5),w(e,n+3,n+4);return e}function Pe(e){return e}function De(e,t,n=0,i=e.byteLength){const r=e.byteLength;return n>=r||i<=n?"":(n<0&&(n=0),i>r&&(i=r),(n!==0||i<r)&&(e=e.subarray(n,i)),A(t).toString(e))}function je(e,t,n,i,r){return n===void 0?r="utf8":i===void 0&&typeof n=="string"?(r=n,n=void 0):r===void 0&&typeof i=="string"&&(r=i,i=void 0),A(r).write(e,t,n,i)}var H={isBuffer:Y,alloc:Ae,allocUnsafe:Ee,allocUnsafeSlow:me,byteLength:Se,compare:Oe,concat:ve,copy:ze,equals:Ce,fill:Re,from:Z,swap16:Te,swap32:Me,swap64:Be,toBuffer:Pe,toString:De,write:je};const Ve=H;var Ie=function(t){return typeof t=="object"&&t&&!Ve.isBuffer(t)};const J=ne,We=Ie,Fe=R.exports,_=H,Ge=1024*1024;var K=a;function a(e){if(!(this instanceof a))return new a(e);typeof e=="number"&&(e={length:e}),e||(e={}),J.call(this),_.isBuffer(e)&&(e={length:e.length,buffer:e}),We(e)||(e={}),this.length=e.length||0,this.pageSize=e.length||e.pageSize||Ge,this.buffers=[],e.buffer&&this.buffers.push(e.buffer)}Fe(a,J);a.prototype._stat=function(e){e.callback(null,{size:this.length})};a.prototype._write=function(e){var t=Math.floor(e.offset/this.pageSize),n=e.offset-t*this.pageSize,i=0;const r=e.offset+e.size;for(r>this.length&&(this.length=r);i<e.size;){const o=this._page(t++,!0),s=this.pageSize-n,f=s<e.size-i?i+s:e.size;_.copy(e.data,o,n,i,f),i=f,n=0}e.callback(null,null)};a.prototype._read=function(e){var t=Math.floor(e.offset/this.pageSize),n=e.offset-t*this.pageSize,i=0;if(e.offset+e.size>this.length)return e.callback(new Error("Could not satisfy length"),null);const r=_.alloc(e.size);for(;i<e.size;){const o=this._page(t++,!1),s=this.pageSize-n,f=e.size-i,l=s<f?s:f;o&&_.copy(o,r,i,n,n+l),i+=l,n=0}e.callback(null,r)};a.prototype._del=function(e){var t=Math.floor(e.offset/this.pageSize),n=e.offset-t*this.pageSize,i=0;if(n&&e.offset+e.size>=this.length){var r=this.buffers[t];r&&r.fill(0,n)}for(e.offset+e.size>this.length&&(e.size=Math.max(0,this.length-e.offset));i<e.size;)n===0&&e.size-i>=this.pageSize&&(this.buffers[t++]=void 0),n=0,i+=this.pageSize-n;e.offset+e.size>=this.length&&(this.length=e.offset),e.callback(null,null)};a.prototype._destroy=function(e){this._buffers=[],this.length=0,e.callback(null,null)};a.prototype._page=function(e,t){var n=this.buffers[e];return n||!t||(n=this.buffers[e]=_.alloc(this.pageSize)),n};a.prototype.toBuffer=function(){const e=_.alloc(this.length);for(var t=0;t<this.buffers.length;t++)this.buffers[t]&&_.copy(this.buffers[t],e,t*this.pageSize);return e};var Ye=Object.freeze(q({__proto__:null,[Symbol.toStringTag]:"Module",default:K},[K]));export{Ye as i};
