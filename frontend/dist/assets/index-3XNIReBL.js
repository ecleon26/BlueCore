(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function Of(){const r=window.location.hostname;return r==="localhost"||r==="127.0.0.1"}function Za(r){return String(r||"").replace(/\/+$/,"")}const Ff=(()=>{var n,i;const r=(i=(n=import.meta)==null?void 0:n.env)==null?void 0:i.VITE_API_BASE;if(r)return Za(r);const e=String(window.location.port||""),t=window.location.hostname;if(e==="5173"||e==="4173"){const s=window.location.protocol;return Za(`${s}//${t}:3001/api`)}return Of()?"http://localhost:3001/api":Za(`${window.location.origin}/api`)})();function ku(r,e){localStorage.setItem("empire_token",r),localStorage.setItem("empire_user",JSON.stringify(e))}function bl(){return localStorage.getItem("empire_token")}function yr(){const r=localStorage.getItem("empire_user");return r?JSON.parse(r):null}function Bf(){localStorage.removeItem("empire_token"),localStorage.removeItem("empire_user")}function Tl(){const r=yr();return r!=null&&r.id?`empire_progress_${r.id}`:"empire_progress"}function wr(){const r=Tl();try{return JSON.parse(localStorage.getItem(r)||"{}")}catch{return{}}}function Al(r){const e=Tl();localStorage.setItem(e,JSON.stringify(r||{}))}async function Qs(r,e={}){const t=bl(),n={"Content-Type":"application/json",...e.headers};t&&(n.Authorization=`Bearer ${t}`);const i=await fetch(`${Ff}${r}`,{...e,headers:n}),s=await i.json();if(!i.ok)throw new Error(s.error||"Request failed");return s}async function zu(r){return Qs("/auth/register",{method:"POST",body:JSON.stringify(r)})}async function wl(r,e){const t=await Qs("/auth/login",{method:"POST",body:JSON.stringify({email:r,password:e})});return ku(t.token,t.user),t}async function kf(){return Qs("/auth/profile")}async function Hu(r=1){return(await Qs("/game/session/start",{method:"POST",body:JSON.stringify({level:r})})).sessionId}async function zf(){return Qs("/game/history")}async function Hf(r,e){return Qs(`/game/session/${r}/end`,{method:"POST",body:JSON.stringify(e)})}const Ja=Object.freeze(Object.defineProperty({__proto__:null,clearSession:Bf,endGameSession:Hf,getGameHistory:zf,getProfile:kf,getProgress:wr,getProgressKey:Tl,getToken:bl,getUser:yr,login:wl,register:zu,saveProgress:Al,saveToken:ku,startGameSession:Hu},Symbol.toStringTag,{value:"Module"}));document.getElementById("tab-login").onclick=()=>{document.getElementById("tab-login").classList.add("active"),document.getElementById("tab-register").classList.remove("active"),document.getElementById("login-form").classList.remove("hidden"),document.getElementById("register-form").classList.add("hidden")};document.getElementById("tab-register").onclick=()=>{document.getElementById("tab-register").classList.add("active"),document.getElementById("tab-login").classList.remove("active"),document.getElementById("register-form").classList.remove("hidden"),document.getElementById("login-form").classList.add("hidden")};document.querySelectorAll(".avatar-opt").forEach(r=>{r.onclick=()=>{document.querySelectorAll(".avatar-opt").forEach(e=>e.classList.remove("selected")),r.classList.add("selected"),document.getElementById("reg-avatar").value=r.dataset.val}});document.getElementById("login-form").onsubmit=async r=>{r.preventDefault();const e=document.getElementById("login-error");e.classList.add("hidden");const t=document.getElementById("login-btn");t.textContent="Logging in...",t.disabled=!0,window.game&&window.game.setLoading(!0,"VERIFYING CREDENTIALS...");try{await wl(document.getElementById("login-email").value.trim(),document.getElementById("login-password").value),window.location.reload()}catch(n){e.textContent="❌ "+n.message,e.classList.remove("hidden"),window.game&&window.game.setLoading(!1)}finally{t.textContent="LET'S PLAY!",t.disabled=!1}};document.getElementById("register-form").onsubmit=async r=>{r.preventDefault();const e=document.getElementById("register-error");e.classList.add("hidden");const t=document.getElementById("register-btn");t.textContent="Creating account...",t.disabled=!0,window.game&&window.game.setLoading(!0,"PROVISIONING NEW CEO ID...");try{await zu({email:document.getElementById("reg-email").value.trim(),password:document.getElementById("reg-password").value,full_name:document.getElementById("reg-name").value.trim(),username:document.getElementById("reg-username").value.trim(),age:parseInt(document.getElementById("reg-age").value),avatar:document.getElementById("reg-avatar").value}),await wl(document.getElementById("reg-email").value.trim(),document.getElementById("reg-password").value),window.location.reload()}catch(n){e.textContent="❌ "+n.message,e.classList.remove("hidden"),window.game&&window.game.setLoading(!1)}finally{t.textContent="JOIN THE EMPIRE!",t.disabled=!1}};const Gf="modulepreload",Vf=function(r){return"/"+r},_c={},Qa=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=Vf(l),l in _c)return;_c[l]=!0;const c=l.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":Gf,c||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),c)return new Promise((d,f)=>{u.addEventListener("load",d),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return i.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rl="160",rs={ROTATE:0,DOLLY:1,PAN:2},as={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wf=0,vc=1,Xf=2,Gu=1,Vu=2,Zn=3,ii=0,Yt=1,In=2,Si=0,Ls=1,yc=2,xc=3,Mc=4,qf=5,Vi=100,Yf=101,jf=102,Sc=103,Ec=104,$f=200,Kf=201,Zf=202,Jf=203,$o=204,Ko=205,Qf=206,ep=207,tp=208,np=209,ip=210,sp=211,rp=212,ap=213,op=214,lp=0,cp=1,hp=2,ba=3,up=4,dp=5,fp=6,pp=7,Ba=0,mp=1,gp=2,Ei=0,Wu=1,_p=2,vp=3,yp=4,xp=5,Mp=6,bc="attached",Sp="detached",Xu=300,Bs=301,ks=302,Zo=303,Jo=304,ka=306,zs=1e3,yn=1001,Ta=1002,Pt=1003,Qo=1004,ya=1005,Zt=1006,qu=1007,es=1008,bi=1009,Ep=1010,bp=1011,Cl=1012,Yu=1013,_i=1014,ti=1015,Rr=1016,ju=1017,$u=1018,Yi=1020,Tp=1021,xn=1023,Ap=1024,wp=1025,ji=1026,Hs=1027,Rp=1028,Ku=1029,Cp=1030,Zu=1031,Ju=1033,eo=33776,to=33777,no=33778,io=33779,Tc=35840,Ac=35841,wc=35842,Rc=35843,Qu=36196,Cc=37492,Pc=37496,Lc=37808,Ic=37809,Dc=37810,Nc=37811,Uc=37812,Oc=37813,Fc=37814,Bc=37815,kc=37816,zc=37817,Hc=37818,Gc=37819,Vc=37820,Wc=37821,so=36492,Xc=36494,qc=36495,Pp=36283,Yc=36284,jc=36285,$c=36286,Cr=2300,Gs=2301,ro=2302,Kc=2400,Zc=2401,Jc=2402,Lp=2500,Ip=0,ed=1,el=2,td=3e3,$i=3001,Dp=3200,Np=3201,za=0,Up=1,Mn="",ft="srgb",Lt="srgb-linear",Pl="display-p3",Ha="display-p3-linear",Aa="linear",ot="srgb",wa="rec709",Ra="p3",os=7680,Qc=519,Op=512,Fp=513,Bp=514,nd=515,kp=516,zp=517,Hp=518,Gp=519,tl=35044,eh="300 es",nl=1035,ni=2e3,Ca=2001;class is{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let th=1234567;const xr=Math.PI/180,Vs=180/Math.PI;function Dn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[r&255]+Bt[r>>8&255]+Bt[r>>16&255]+Bt[r>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function Nt(r,e,t){return Math.max(e,Math.min(t,r))}function Ll(r,e){return(r%e+e)%e}function Vp(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Wp(r,e,t){return r!==e?(t-r)/(e-r):0}function Mr(r,e,t){return(1-t)*r+t*e}function Xp(r,e,t,n){return Mr(r,e,1-Math.exp(-t*n))}function qp(r,e=1){return e-Math.abs(Ll(r,e*2)-e)}function Yp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function jp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function $p(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Kp(r,e){return r+Math.random()*(e-r)}function Zp(r){return r*(.5-Math.random())}function Jp(r){r!==void 0&&(th=r);let e=th+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qp(r){return r*xr}function em(r){return r*Vs}function il(r){return(r&r-1)===0&&r!==0}function tm(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Pa(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function nm(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),_=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*_,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*_,o*c);break;case"ZYZ":r.set(l*_,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Bn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function nt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const id={DEG2RAD:xr,RAD2DEG:Vs,generateUUID:Dn,clamp:Nt,euclideanModulo:Ll,mapLinear:Vp,inverseLerp:Wp,lerp:Mr,damp:Xp,pingpong:qp,smoothstep:Yp,smootherstep:jp,randInt:$p,randFloat:Kp,randFloatSpread:Zp,seededRandom:Jp,degToRad:Qp,radToDeg:em,isPowerOfTwo:il,ceilPowerOfTwo:tm,floorPowerOfTwo:Pa,setQuaternionFromProperEuler:nm,normalize:nt,denormalize:Bn};class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,n,i,s,a,o,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],_=n[8],g=i[0],p=i[3],m=i[6],x=i[1],v=i[4],M=i[7],T=i[2],A=i[5],E=i[8];return s[0]=a*g+o*x+l*T,s[3]=a*p+o*v+l*A,s[6]=a*m+o*M+l*E,s[1]=c*g+h*x+u*T,s[4]=c*p+h*v+u*A,s[7]=c*m+h*M+u*E,s[2]=d*g+f*x+_*T,s[5]=d*p+f*v+_*A,s[8]=d*m+f*M+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,_=t*u+n*d+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=u*g,e[1]=(i*c-h*n)*g,e[2]=(o*n-i*a)*g,e[3]=d*g,e[4]=(h*t-i*l)*g,e[5]=(i*s-o*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ao.makeScale(e,t)),this}rotate(e){return this.premultiply(ao.makeRotation(-e)),this}translate(e,t){return this.premultiply(ao.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ao=new Ye;function sd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Pr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function im(){const r=Pr("canvas");return r.style.display="block",r}const nh={};function Sr(r){r in nh||(nh[r]=!0,console.warn(r))}const ih=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),sh=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Vr={[Lt]:{transfer:Aa,primaries:wa,toReference:r=>r,fromReference:r=>r},[ft]:{transfer:ot,primaries:wa,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ha]:{transfer:Aa,primaries:Ra,toReference:r=>r.applyMatrix3(sh),fromReference:r=>r.applyMatrix3(ih)},[Pl]:{transfer:ot,primaries:Ra,toReference:r=>r.convertSRGBToLinear().applyMatrix3(sh),fromReference:r=>r.applyMatrix3(ih).convertLinearToSRGB()}},sm=new Set([Lt,Ha]),et={enabled:!0,_workingColorSpace:Lt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!sm.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Vr[e].toReference,i=Vr[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Vr[r].primaries},getTransfer:function(r){return r===Mn?Aa:Vr[r].transfer}};function Is(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function oo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ls;class rd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ls===void 0&&(ls=Pr("canvas")),ls.width=e.width,ls.height=e.height;const n=ls.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ls}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Pr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Is(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Is(t[n]/255)*255):t[n]=Is(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rm=0;class ad{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Dn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(lo(i[a].image)):s.push(lo(i[a]))}else s=lo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function lo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?rd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let am=0;class Ut extends is{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=yn,i=yn,s=Zt,a=es,o=xn,l=bi,c=Ut.DEFAULT_ANISOTROPY,h=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=Dn(),this.name="",this.source=new ad(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Sr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===$i?ft:Mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zs:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zs:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Sr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ft?$i:td}set encoding(e){Sr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===$i?ft:Mn}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Xu;Ut.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,n=0,i=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,M=(f+1)/2,T=(m+1)/2,A=(h+d)/4,E=(u+g)/4,P=(_+p)/4;return v>M&&v>T?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=A/n,s=E/n):M>T?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=A/i,s=P/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=E/s,i=P/s),this.set(n,i,s,t),this}let x=Math.sqrt((p-_)*(p-_)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(p-_)/x,this.y=(u-g)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class om extends is{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(Sr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===$i?ft:Mn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ut(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ad(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ts extends om{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class od extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lm extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Dt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],f=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=_,e[t+3]=g;return}if(u!==g||l!==d||c!==f||h!==_){let p=1-o;const m=l*d+c*f+h*_+u*g,x=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const T=Math.sqrt(v),A=Math.atan2(T,m*x);p=Math.sin(p*A)/T,o=Math.sin(o*A)/T}const M=o*x;if(l=l*p+d*M,c=c*p+f*M,h=h*p+_*M,u=u*p+g*M,p===1-o){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],_=s[a+3];return e[t]=o*_+h*u+l*f-c*d,e[t+1]=l*_+h*d+c*u-o*f,e[t+2]=c*_+h*f+o*d-l*u,e[t+3]=h*_-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),_=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"YXZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"ZXY":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"ZYX":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"YZX":this._x=d*h*u+c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u-d*f*_;break;case"XZY":this._x=d*h*u-c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return co.copy(this).projectOnVector(e),this.sub(co)}reflect(e){return this.sub(co.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const co=new N,rh=new Dt;class bn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(s,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wr.copy(n.boundingBox)),Wr.applyMatrix4(e.matrixWorld),this.union(Wr)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),Xr.subVectors(this.max,or),cs.subVectors(e.a,or),hs.subVectors(e.b,or),us.subVectors(e.c,or),oi.subVectors(hs,cs),li.subVectors(us,hs),Ni.subVectors(cs,us);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Ni.z,Ni.y,oi.z,0,-oi.x,li.z,0,-li.x,Ni.z,0,-Ni.x,-oi.y,oi.x,0,-li.y,li.x,0,-Ni.y,Ni.x,0];return!ho(t,cs,hs,us,Xr)||(t=[1,0,0,0,1,0,0,0,1],!ho(t,cs,hs,us,Xr))?!1:(qr.crossVectors(oi,li),t=[qr.x,qr.y,qr.z],ho(t,cs,hs,us,Xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Xn=[new N,new N,new N,new N,new N,new N,new N,new N],An=new N,Wr=new bn,cs=new N,hs=new N,us=new N,oi=new N,li=new N,Ni=new N,or=new N,Xr=new N,qr=new N,Ui=new N;function ho(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ui.fromArray(r,s);const o=i.x*Math.abs(Ui.x)+i.y*Math.abs(Ui.y)+i.z*Math.abs(Ui.z),l=e.dot(Ui),c=t.dot(Ui),h=n.dot(Ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const cm=new bn,lr=new N,uo=new N;class Gn{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cm.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;lr.subVectors(e,this.center);const t=lr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(lr.copy(e.center).add(uo)),this.expandByPoint(lr.copy(e.center).sub(uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qn=new N,fo=new N,Yr=new N,ci=new N,po=new N,jr=new N,mo=new N;class er{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fo.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(fo);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Yr),o=ci.dot(this.direction),l=-ci.dot(Yr),c=ci.lengthSq(),h=Math.abs(1-a*a);let u,d,f,_;if(h>0)if(u=a*l-o,d=a*o-l,_=s*h,u>=0)if(d>=-_)if(d<=_){const g=1/h;u*=g,d*=g,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(fo).addScaledVector(Yr,d),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),i=qn.dot(qn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,i,s){po.subVectors(t,e),jr.subVectors(n,e),mo.crossVectors(po,jr);let a=this.direction.dot(mo),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ci.subVectors(this.origin,e);const l=o*this.direction.dot(jr.crossVectors(ci,jr));if(l<0)return null;const c=o*this.direction.dot(po.cross(ci));if(c<0||l+c>a)return null;const h=-o*ci.dot(mo);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ke{constructor(e,t,n,i,s,a,o,l,c,h,u,d,f,_,g,p){ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,f,_,g,p)}set(e,t,n,i,s,a,o,l,c,h,u,d,f,_,g,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ke().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ds.setFromMatrixColumn(e,0).length(),s=1/ds.setFromMatrixColumn(e,1).length(),a=1/ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,_=o*h,g=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+_*c,t[5]=d-g*c,t[9]=-o*l,t[2]=g-d*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,_=c*h,g=c*u;t[0]=d+g*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-_,t[6]=g+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,_=c*h,g=c*u;t[0]=d-g*o,t[4]=-a*u,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*h,t[9]=g-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,_=o*h,g=o*u;t[0]=l*h,t[4]=_*c-f,t[8]=d*c+g,t[1]=l*u,t[5]=g*c+d,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,_=o*l,g=o*c;t[0]=l*h,t[4]=g-d*u,t[8]=_*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+_,t[10]=d-g*u}else if(e.order==="XZY"){const d=a*l,f=a*c,_=o*l,g=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+g,t[5]=a*h,t[9]=f*u-_,t[2]=_*u-f,t[6]=o*h,t[10]=g*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hm,e,um)}lookAt(e,t,n){const i=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),hi.crossVectors(n,an),hi.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),hi.crossVectors(n,an)),hi.normalize(),$r.crossVectors(an,hi),i[0]=hi.x,i[4]=$r.x,i[8]=an.x,i[1]=hi.y,i[5]=$r.y,i[9]=an.y,i[2]=hi.z,i[6]=$r.z,i[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],_=n[2],g=n[6],p=n[10],m=n[14],x=n[3],v=n[7],M=n[11],T=n[15],A=i[0],E=i[4],P=i[8],y=i[12],b=i[1],O=i[5],z=i[9],$=i[13],D=i[2],B=i[6],G=i[10],K=i[14],Z=i[3],J=i[7],I=i[11],C=i[15];return s[0]=a*A+o*b+l*D+c*Z,s[4]=a*E+o*O+l*B+c*J,s[8]=a*P+o*z+l*G+c*I,s[12]=a*y+o*$+l*K+c*C,s[1]=h*A+u*b+d*D+f*Z,s[5]=h*E+u*O+d*B+f*J,s[9]=h*P+u*z+d*G+f*I,s[13]=h*y+u*$+d*K+f*C,s[2]=_*A+g*b+p*D+m*Z,s[6]=_*E+g*O+p*B+m*J,s[10]=_*P+g*z+p*G+m*I,s[14]=_*y+g*$+p*K+m*C,s[3]=x*A+v*b+M*D+T*Z,s[7]=x*E+v*O+M*B+T*J,s[11]=x*P+v*z+M*G+T*I,s[15]=x*y+v*$+M*K+T*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],_=e[3],g=e[7],p=e[11],m=e[15];return _*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+g*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+p*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+m*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],_=e[12],g=e[13],p=e[14],m=e[15],x=u*p*c-g*d*c+g*l*f-o*p*f-u*l*m+o*d*m,v=_*d*c-h*p*c-_*l*f+a*p*f+h*l*m-a*d*m,M=h*g*c-_*u*c+_*o*f-a*g*f-h*o*m+a*u*m,T=_*u*l-h*g*l-_*o*d+a*g*d+h*o*p-a*u*p,A=t*x+n*v+i*M+s*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return e[0]=x*E,e[1]=(g*d*s-u*p*s-g*i*f+n*p*f+u*i*m-n*d*m)*E,e[2]=(o*p*s-g*l*s+g*i*c-n*p*c-o*i*m+n*l*m)*E,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*E,e[4]=v*E,e[5]=(h*p*s-_*d*s+_*i*f-t*p*f-h*i*m+t*d*m)*E,e[6]=(_*l*s-a*p*s-_*i*c+t*p*c+a*i*m-t*l*m)*E,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*f+t*l*f)*E,e[8]=M*E,e[9]=(_*u*s-h*g*s-_*n*f+t*g*f+h*n*m-t*u*m)*E,e[10]=(a*g*s-_*o*s+_*n*c-t*g*c-a*n*m+t*o*m)*E,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*f-t*o*f)*E,e[12]=T*E,e[13]=(h*g*i-_*u*i+_*n*d-t*g*d-h*n*p+t*u*p)*E,e[14]=(_*o*i-a*g*i-_*n*l+t*g*l+a*n*p-t*o*p)*E,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,_=s*u,g=a*h,p=a*u,m=o*u,x=l*c,v=l*h,M=l*u,T=n.x,A=n.y,E=n.z;return i[0]=(1-(g+m))*T,i[1]=(f+M)*T,i[2]=(_-v)*T,i[3]=0,i[4]=(f-M)*A,i[5]=(1-(d+m))*A,i[6]=(p+x)*A,i[7]=0,i[8]=(_+v)*E,i[9]=(p-x)*E,i[10]=(1-(d+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=ds.set(i[0],i[1],i[2]).length();const a=ds.set(i[4],i[5],i[6]).length(),o=ds.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],wn.copy(this);const c=1/s,h=1/a,u=1/o;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=u,wn.elements[9]*=u,wn.elements[10]*=u,t.setFromRotationMatrix(wn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=ni){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,_;if(o===ni)f=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Ca)f=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=ni){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*c,f=(n+i)*h;let _,g;if(o===ni)_=(a+s)*u,g=-2*u;else if(o===Ca)_=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ds=new N,wn=new ke,hm=new N(0,0,0),um=new N(1,1,1),hi=new N,$r=new N,an=new N,ah=new ke,oh=new Dt;class ei{constructor(e=0,t=0,n=0,i=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ah.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ah,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return oh.setFromEuler(this),this.setFromQuaternion(oh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Il{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dm=0;const lh=new N,fs=new Dt,Yn=new ke,Kr=new N,cr=new N,fm=new N,pm=new Dt,ch=new N(1,0,0),hh=new N(0,1,0),uh=new N(0,0,1),mm={type:"added"},gm={type:"removed"};class at extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=at.DEFAULT_UP.clone();const e=new N,t=new ei,n=new Dt,i=new N(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ke},normalMatrix:{value:new Ye}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=at.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(ch,e)}rotateY(e){return this.rotateOnAxis(hh,e)}rotateZ(e){return this.rotateOnAxis(uh,e)}translateOnAxis(e,t){return lh.copy(e).applyQuaternion(this.quaternion),this.position.add(lh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ch,e)}translateY(e){return this.translateOnAxis(hh,e)}translateZ(e){return this.translateOnAxis(uh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Kr.copy(e):Kr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(cr,Kr,this.up):Yn.lookAt(Kr,cr,this.up),this.quaternion.setFromRotationMatrix(Yn),i&&(Yn.extractRotation(i.matrixWorld),fs.setFromRotationMatrix(Yn),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(mm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gm)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,fm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,pm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++){const o=i[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}at.DEFAULT_UP=new N(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new N,jn=new N,go=new N,$n=new N,ps=new N,ms=new N,dh=new N,_o=new N,vo=new N,yo=new N;let Zr=!1;class Ln{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Rn.subVectors(e,t),i.cross(Rn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Rn.subVectors(i,t),jn.subVectors(n,t),go.subVectors(e,t);const a=Rn.dot(Rn),o=Rn.dot(jn),l=Rn.dot(go),c=jn.dot(jn),h=jn.dot(go),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,_=(a*h-o*l)*d;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getUV(e,t,n,i,s,a,o,l){return Zr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Zr=!0),this.getInterpolation(e,t,n,i,s,a,o,l)}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$n.x),l.addScaledVector(a,$n.y),l.addScaledVector(o,$n.z),l)}static isFrontFacing(e,t,n,i){return Rn.subVectors(n,t),jn.subVectors(e,t),Rn.cross(jn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Rn.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Zr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Zr=!0),Ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return Ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;ps.subVectors(i,n),ms.subVectors(s,n),_o.subVectors(e,n);const l=ps.dot(_o),c=ms.dot(_o);if(l<=0&&c<=0)return t.copy(n);vo.subVectors(e,i);const h=ps.dot(vo),u=ms.dot(vo);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ps,a);yo.subVectors(e,s);const f=ps.dot(yo),_=ms.dot(yo);if(_>=0&&f<=_)return t.copy(s);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(ms,o);const p=h*_-f*u;if(p<=0&&u-h>=0&&f-_>=0)return dh.subVectors(s,i),o=(u-h)/(u-h+(f-_)),t.copy(i).addScaledVector(dh,o);const m=1/(p+g+d);return a=g*m,o=d*m,t.copy(n).addScaledVector(ps,a).addScaledVector(ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function xo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=et.workingColorSpace){if(e=Ll(e,1),t=Nt(t,0,1),n=Nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=xo(a,s,e+1/3),this.g=xo(a,s,e),this.b=xo(a,s,e-1/3)}return et.toWorkingColorSpace(this,i),this}setStyle(e,t=ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){const n=ld[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}copyLinearToSRGB(e){return this.r=oo(e.r),this.g=oo(e.g),this.b=oo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return et.fromWorkingColorSpace(kt.copy(this),e),Math.round(Nt(kt.r*255,0,255))*65536+Math.round(Nt(kt.g*255,0,255))*256+Math.round(Nt(kt.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(kt.copy(this),t);const n=kt.r,i=kt.g,s=kt.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=ft){et.fromWorkingColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,i=kt.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Jr);const n=Mr(ui.h,Jr.h,t),i=Mr(ui.s,Jr.s,t),s=Mr(ui.l,Jr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new Ie;Ie.NAMES=ld;let _m=0;class Tn extends is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=Ls,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$o,this.blendDst=Ko,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=ba,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(n.blending=this.blending),this.side!==ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$o&&(n.blendSrc=this.blendSrc),this.blendDst!==Ko&&(n.blendDst=this.blendDst),this.blendEquation!==Vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ba&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xt extends Tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new N,Qr=new De;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=tl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tl&&(e.usage=this.usage),e}}class cd extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class hd extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ct extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let vm=0;const gn=new ke,Mo=new at,gs=new N,on=new bn,hr=new bn,Ct=new N;class $t extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sd(e)?hd:cd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ye().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return Mo.lookAt(e),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ct(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];on.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];hr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(on.min,hr.min),on.expandByPoint(Ct),Ct.addVectors(on.max,hr.max),on.expandByPoint(Ct)):(on.expandByPoint(hr.min),on.expandByPoint(hr.max))}on.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ct.fromBufferAttribute(o,c),l&&(gs.fromBufferAttribute(e,c),Ct.add(gs)),i=Math.max(i,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<o;b++)c[b]=new N,h[b]=new N;const u=new N,d=new N,f=new N,_=new De,g=new De,p=new De,m=new N,x=new N;function v(b,O,z){u.fromArray(i,b*3),d.fromArray(i,O*3),f.fromArray(i,z*3),_.fromArray(a,b*2),g.fromArray(a,O*2),p.fromArray(a,z*2),d.sub(u),f.sub(u),g.sub(_),p.sub(_);const $=1/(g.x*p.y-p.x*g.y);isFinite($)&&(m.copy(d).multiplyScalar(p.y).addScaledVector(f,-g.y).multiplyScalar($),x.copy(f).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar($),c[b].add(m),c[O].add(m),c[z].add(m),h[b].add(x),h[O].add(x),h[z].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let b=0,O=M.length;b<O;++b){const z=M[b],$=z.start,D=z.count;for(let B=$,G=$+D;B<G;B+=3)v(n[B+0],n[B+1],n[B+2])}const T=new N,A=new N,E=new N,P=new N;function y(b){E.fromArray(s,b*3),P.copy(E);const O=c[b];T.copy(O),T.sub(E.multiplyScalar(E.dot(O))).normalize(),A.crossVectors(P,O);const $=A.dot(h[b])<0?-1:1;l[b*4]=T.x,l[b*4+1]=T.y,l[b*4+2]=T.z,l[b*4+3]=$}for(let b=0,O=M.length;b<O;++b){const z=M[b],$=z.start,D=z.count;for(let B=$,G=$+D;B<G;B+=3)y(n[B+0]),y(n[B+1]),y(n[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new N,s=new N,a=new N,o=new N,l=new N,c=new N,h=new N,u=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,_=0;for(let g=0,p=l.length;g<p;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*h;for(let m=0;m<h;m++)d[_++]=c[f++]}return new jt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new $t,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fh=new ke,Oi=new er,ea=new Gn,ph=new N,_s=new N,vs=new N,ys=new N,So=new N,ta=new N,na=new De,ia=new De,sa=new De,mh=new N,gh=new N,_h=new N,ra=new N,aa=new N;class Qe extends at{constructor(e=new $t,t=new Xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){ta.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(So.fromBufferAttribute(u,e),a?ta.addScaledVector(So,h):ta.addScaledVector(So.sub(t),h))}t.add(ta)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(s),Oi.copy(e.ray).recast(e.near),!(ea.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(ea,ph)===null||Oi.origin.distanceToSquared(ph)>(e.far-e.near)**2))&&(fh.copy(s).invert(),Oi.copy(e.ray).applyMatrix4(fh),!(n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Oi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=x,T=v;M<T;M+=3){const A=o.getX(M),E=o.getX(M+1),P=o.getX(M+2);i=oa(this,m,e,n,c,h,u,A,E,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=o.getX(p),v=o.getX(p+1),M=o.getX(p+2);i=oa(this,a,e,n,c,h,u,x,v,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=x,T=v;M<T;M+=3){const A=M,E=M+1,P=M+2;i=oa(this,m,e,n,c,h,u,A,E,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=p,v=p+1,M=p+2;i=oa(this,a,e,n,c,h,u,x,v,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function ym(r,e,t,n,i,s,a,o){let l;if(e.side===Yt?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===ii,o),l===null)return null;aa.copy(o),aa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(aa);return c<t.near||c>t.far?null:{distance:c,point:aa.clone(),object:r}}function oa(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,_s),r.getVertexPosition(l,vs),r.getVertexPosition(c,ys);const h=ym(r,e,t,n,_s,vs,ys,ra);if(h){i&&(na.fromBufferAttribute(i,o),ia.fromBufferAttribute(i,l),sa.fromBufferAttribute(i,c),h.uv=Ln.getInterpolation(ra,_s,vs,ys,na,ia,sa,new De)),s&&(na.fromBufferAttribute(s,o),ia.fromBufferAttribute(s,l),sa.fromBufferAttribute(s,c),h.uv1=Ln.getInterpolation(ra,_s,vs,ys,na,ia,sa,new De),h.uv2=h.uv1),a&&(mh.fromBufferAttribute(a,o),gh.fromBufferAttribute(a,l),_h.fromBufferAttribute(a,c),h.normal=Ln.getInterpolation(ra,_s,vs,ys,mh,gh,_h,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new N,materialIndex:0};Ln.getNormal(_s,vs,ys,u.normal),h.face=u}return h}class tr extends $t{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,i,a,2),_("x","z","y",1,-1,e,n,-t,i,a,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(u,2));function _(g,p,m,x,v,M,T,A,E,P,y){const b=M/E,O=T/P,z=M/2,$=T/2,D=A/2,B=E+1,G=P+1;let K=0,Z=0;const J=new N;for(let I=0;I<G;I++){const C=I*O-$;for(let j=0;j<B;j++){const F=j*b-z;J[g]=F*x,J[p]=C*v,J[m]=D,c.push(J.x,J.y,J.z),J[g]=0,J[p]=0,J[m]=A>0?1:-1,h.push(J.x,J.y,J.z),u.push(j/E),u.push(1-I/P),K+=1}}for(let I=0;I<P;I++)for(let C=0;C<E;C++){const j=d+C+B*I,F=d+C+B*(I+1),W=d+(C+1)+B*(I+1),Q=d+(C+1)+B*I;l.push(j,F,Q),l.push(F,W,Q),Z+=6}o.addGroup(f,Z,y),f+=Z,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ws(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Wt(r){const e={};for(let t=0;t<r.length;t++){const n=Ws(r[t]);for(const i in n)e[i]=n[i]}return e}function xm(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ud(r){return r.getRenderTarget()===null?r.outputColorSpace:et.workingColorSpace}const Mm={clone:Ws,merge:Wt};var Sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wi extends Tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sm,this.fragmentShader=Em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ws(e.uniforms),this.uniformsGroups=xm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class dd extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=ni}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Jt extends dd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const xs=-90,Ms=1;class bm extends at{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Jt(xs,Ms,e,t);i.layers=this.layers,this.add(i);const s=new Jt(xs,Ms,e,t);s.layers=this.layers,this.add(s);const a=new Jt(xs,Ms,e,t);a.layers=this.layers,this.add(a);const o=new Jt(xs,Ms,e,t);o.layers=this.layers,this.add(o);const l=new Jt(xs,Ms,e,t);l.layers=this.layers,this.add(l);const c=new Jt(xs,Ms,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ca)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class fd extends Ut{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Bs,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Tm extends ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Sr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===$i?ft:Mn),this.texture=new fd(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new tr(5,5,5),s=new wi({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:Si});s.uniforms.tEquirect.value=t;const a=new Qe(i,s),o=t.minFilter;return t.minFilter===es&&(t.minFilter=Zt),new bm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const Eo=new N,Am=new N,wm=new Ye;class mi{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Eo.subVectors(n,t).cross(Am.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Eo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wm.getNormalMatrix(e),i=this.coplanarPoint(Eo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fi=new Gn,la=new N;class Dl{constructor(e=new mi,t=new mi,n=new mi,i=new mi,s=new mi,a=new mi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],_=i[9],g=i[10],p=i[11],m=i[12],x=i[13],v=i[14],M=i[15];if(n[0].setComponents(l-s,d-c,p-f,M-m).normalize(),n[1].setComponents(l+s,d+c,p+f,M+m).normalize(),n[2].setComponents(l+a,d+h,p+_,M+x).normalize(),n[3].setComponents(l-a,d-h,p-_,M-x).normalize(),n[4].setComponents(l-o,d-u,p-g,M-v).normalize(),t===ni)n[5].setComponents(l+o,d+u,p+g,M+v).normalize();else if(t===Ca)n[5].setComponents(o,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(e){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(la.x=i.normal.x>0?e.max.x:e.min.x,la.y=i.normal.y>0?e.max.y:e.min.y,la.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(la)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function pd(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Rm(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,f=u.byteLength,_=r.createBuffer();r.bindBuffer(h,_),r.bufferData(h,u,d),c.onUploadCallback();let g;if(u instanceof Float32Array)g=r.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=r.SHORT;else if(u instanceof Uint32Array)g=r.UNSIGNED_INT;else if(u instanceof Int32Array)g=r.INT;else if(u instanceof Int8Array)g=r.BYTE;else if(u instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:_,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function s(c,h,u){const d=h.array,f=h._updateRange,_=h.updateRanges;if(r.bindBuffer(u,c),f.count===-1&&_.length===0&&r.bufferSubData(u,0,d),_.length!==0){for(let g=0,p=_.length;g<p;g++){const m=_[g];t?r.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):r.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class Pn extends $t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],_=[],g=[],p=[];for(let m=0;m<h;m++){const x=m*d-a;for(let v=0;v<c;v++){const M=v*u-s;_.push(M,-x,0),g.push(0,0,1),p.push(v/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){const v=x+c*m,M=x+c*(m+1),T=x+1+c*(m+1),A=x+1+c*m;f.push(v,M,A),f.push(M,T,A)}this.setIndex(f),this.setAttribute("position",new ct(_,3)),this.setAttribute("normal",new ct(g,3)),this.setAttribute("uv",new ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Cm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Im=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Nm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Um=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Om=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,km=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Km=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Zm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Jm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,eg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ng=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ig=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ag=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,og=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ug=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_g=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,vg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Sg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Eg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ag=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ig=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ng=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ug=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Og=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,kg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Wg=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Xg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,e_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,t_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,n_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,i_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,s_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,r_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,o_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,c_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,h_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,u_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,d_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,f_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,p_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,m_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,g_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,__=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,v_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,y_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,x_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,M_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,S_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,E_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,b_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,A_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,w_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const R_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,C_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,U_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,O_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,F_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,B_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,V_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Y_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,K_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Q_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,a0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Cm,alphahash_pars_fragment:Pm,alphamap_fragment:Lm,alphamap_pars_fragment:Im,alphatest_fragment:Dm,alphatest_pars_fragment:Nm,aomap_fragment:Um,aomap_pars_fragment:Om,batching_pars_vertex:Fm,batching_vertex:Bm,begin_vertex:km,beginnormal_vertex:zm,bsdfs:Hm,iridescence_fragment:Gm,bumpmap_pars_fragment:Vm,clipping_planes_fragment:Wm,clipping_planes_pars_fragment:Xm,clipping_planes_pars_vertex:qm,clipping_planes_vertex:Ym,color_fragment:jm,color_pars_fragment:$m,color_pars_vertex:Km,color_vertex:Zm,common:Jm,cube_uv_reflection_fragment:Qm,defaultnormal_vertex:eg,displacementmap_pars_vertex:tg,displacementmap_vertex:ng,emissivemap_fragment:ig,emissivemap_pars_fragment:sg,colorspace_fragment:rg,colorspace_pars_fragment:ag,envmap_fragment:og,envmap_common_pars_fragment:lg,envmap_pars_fragment:cg,envmap_pars_vertex:hg,envmap_physical_pars_fragment:Sg,envmap_vertex:ug,fog_vertex:dg,fog_pars_vertex:fg,fog_fragment:pg,fog_pars_fragment:mg,gradientmap_pars_fragment:gg,lightmap_fragment:_g,lightmap_pars_fragment:vg,lights_lambert_fragment:yg,lights_lambert_pars_fragment:xg,lights_pars_begin:Mg,lights_toon_fragment:Eg,lights_toon_pars_fragment:bg,lights_phong_fragment:Tg,lights_phong_pars_fragment:Ag,lights_physical_fragment:wg,lights_physical_pars_fragment:Rg,lights_fragment_begin:Cg,lights_fragment_maps:Pg,lights_fragment_end:Lg,logdepthbuf_fragment:Ig,logdepthbuf_pars_fragment:Dg,logdepthbuf_pars_vertex:Ng,logdepthbuf_vertex:Ug,map_fragment:Og,map_pars_fragment:Fg,map_particle_fragment:Bg,map_particle_pars_fragment:kg,metalnessmap_fragment:zg,metalnessmap_pars_fragment:Hg,morphcolor_vertex:Gg,morphnormal_vertex:Vg,morphtarget_pars_vertex:Wg,morphtarget_vertex:Xg,normal_fragment_begin:qg,normal_fragment_maps:Yg,normal_pars_fragment:jg,normal_pars_vertex:$g,normal_vertex:Kg,normalmap_pars_fragment:Zg,clearcoat_normal_fragment_begin:Jg,clearcoat_normal_fragment_maps:Qg,clearcoat_pars_fragment:e_,iridescence_pars_fragment:t_,opaque_fragment:n_,packing:i_,premultiplied_alpha_fragment:s_,project_vertex:r_,dithering_fragment:a_,dithering_pars_fragment:o_,roughnessmap_fragment:l_,roughnessmap_pars_fragment:c_,shadowmap_pars_fragment:h_,shadowmap_pars_vertex:u_,shadowmap_vertex:d_,shadowmask_pars_fragment:f_,skinbase_vertex:p_,skinning_pars_vertex:m_,skinning_vertex:g_,skinnormal_vertex:__,specularmap_fragment:v_,specularmap_pars_fragment:y_,tonemapping_fragment:x_,tonemapping_pars_fragment:M_,transmission_fragment:S_,transmission_pars_fragment:E_,uv_pars_fragment:b_,uv_pars_vertex:T_,uv_vertex:A_,worldpos_vertex:w_,background_vert:R_,background_frag:C_,backgroundCube_vert:P_,backgroundCube_frag:L_,cube_vert:I_,cube_frag:D_,depth_vert:N_,depth_frag:U_,distanceRGBA_vert:O_,distanceRGBA_frag:F_,equirect_vert:B_,equirect_frag:k_,linedashed_vert:z_,linedashed_frag:H_,meshbasic_vert:G_,meshbasic_frag:V_,meshlambert_vert:W_,meshlambert_frag:X_,meshmatcap_vert:q_,meshmatcap_frag:Y_,meshnormal_vert:j_,meshnormal_frag:$_,meshphong_vert:K_,meshphong_frag:Z_,meshphysical_vert:J_,meshphysical_frag:Q_,meshtoon_vert:e0,meshtoon_frag:t0,points_vert:n0,points_frag:i0,shadow_vert:s0,shadow_frag:r0,sprite_vert:a0,sprite_frag:o0},me={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Fn={basic:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ie(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Wt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Wt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ie(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Wt([me.points,me.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Wt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Wt([me.common,me.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Wt([me.sprite,me.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Wt([me.common,me.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Wt([me.lights,me.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Fn.physical={uniforms:Wt([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ca={r:0,b:0,g:0};function l0(r,e,t,n,i,s,a){const o=new Ie(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function _(p,m){let x=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v===null?g(o,l):v&&v.isColor&&(g(v,1),x=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ka)?(h===void 0&&(h=new Qe(new tr(1,1,1),new wi({name:"BackgroundCubeMaterial",uniforms:Ws(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=et.getTransfer(v.colorSpace)!==ot,(u!==v||d!==v.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=r.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Qe(new Pn(2,2),new wi({name:"BackgroundMaterial",uniforms:Ws(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=et.getTransfer(v.colorSpace)!==ot,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function g(p,m){p.getRGB(ca,ud(r)),n.buffers.color.setClear(ca.r,ca.g,ca.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),l=m,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,g(o,l)},render:_}}function c0(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=p(null);let c=l,h=!1;function u(D,B,G,K,Z){let J=!1;if(a){const I=g(K,G,B);c!==I&&(c=I,f(c.object)),J=m(D,K,G,Z),J&&x(D,K,G,Z)}else{const I=B.wireframe===!0;(c.geometry!==K.id||c.program!==G.id||c.wireframe!==I)&&(c.geometry=K.id,c.program=G.id,c.wireframe=I,J=!0)}Z!==null&&t.update(Z,r.ELEMENT_ARRAY_BUFFER),(J||h)&&(h=!1,P(D,B,G,K),Z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(D){return n.isWebGL2?r.bindVertexArray(D):s.bindVertexArrayOES(D)}function _(D){return n.isWebGL2?r.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function g(D,B,G){const K=G.wireframe===!0;let Z=o[D.id];Z===void 0&&(Z={},o[D.id]=Z);let J=Z[B.id];J===void 0&&(J={},Z[B.id]=J);let I=J[K];return I===void 0&&(I=p(d()),J[K]=I),I}function p(D){const B=[],G=[],K=[];for(let Z=0;Z<i;Z++)B[Z]=0,G[Z]=0,K[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:K,object:D,attributes:{},index:null}}function m(D,B,G,K){const Z=c.attributes,J=B.attributes;let I=0;const C=G.getAttributes();for(const j in C)if(C[j].location>=0){const W=Z[j];let Q=J[j];if(Q===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor)),W===void 0||W.attribute!==Q||Q&&W.data!==Q.data)return!0;I++}return c.attributesNum!==I||c.index!==K}function x(D,B,G,K){const Z={},J=B.attributes;let I=0;const C=G.getAttributes();for(const j in C)if(C[j].location>=0){let W=J[j];W===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(W=D.instanceColor));const Q={};Q.attribute=W,W&&W.data&&(Q.data=W.data),Z[j]=Q,I++}c.attributes=Z,c.attributesNum=I,c.index=K}function v(){const D=c.newAttributes;for(let B=0,G=D.length;B<G;B++)D[B]=0}function M(D){T(D,0)}function T(D,B){const G=c.newAttributes,K=c.enabledAttributes,Z=c.attributeDivisors;G[D]=1,K[D]===0&&(r.enableVertexAttribArray(D),K[D]=1),Z[D]!==B&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,B),Z[D]=B)}function A(){const D=c.newAttributes,B=c.enabledAttributes;for(let G=0,K=B.length;G<K;G++)B[G]!==D[G]&&(r.disableVertexAttribArray(G),B[G]=0)}function E(D,B,G,K,Z,J,I){I===!0?r.vertexAttribIPointer(D,B,G,Z,J):r.vertexAttribPointer(D,B,G,K,Z,J)}function P(D,B,G,K){if(n.isWebGL2===!1&&(D.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const Z=K.attributes,J=G.getAttributes(),I=B.defaultAttributeValues;for(const C in J){const j=J[C];if(j.location>=0){let F=Z[C];if(F===void 0&&(C==="instanceMatrix"&&D.instanceMatrix&&(F=D.instanceMatrix),C==="instanceColor"&&D.instanceColor&&(F=D.instanceColor)),F!==void 0){const W=F.normalized,Q=F.itemSize,ae=t.get(F);if(ae===void 0)continue;const te=ae.buffer,de=ae.type,ge=ae.bytesPerElement,fe=n.isWebGL2===!0&&(de===r.INT||de===r.UNSIGNED_INT||F.gpuType===Yu);if(F.isInterleavedBufferAttribute){const Se=F.data,k=Se.stride,Ve=F.offset;if(Se.isInstancedInterleavedBuffer){for(let le=0;le<j.locationSize;le++)T(j.location+le,Se.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let le=0;le<j.locationSize;le++)M(j.location+le);r.bindBuffer(r.ARRAY_BUFFER,te);for(let le=0;le<j.locationSize;le++)E(j.location+le,Q/j.locationSize,de,W,k*ge,(Ve+Q/j.locationSize*le)*ge,fe)}else{if(F.isInstancedBufferAttribute){for(let Se=0;Se<j.locationSize;Se++)T(j.location+Se,F.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let Se=0;Se<j.locationSize;Se++)M(j.location+Se);r.bindBuffer(r.ARRAY_BUFFER,te);for(let Se=0;Se<j.locationSize;Se++)E(j.location+Se,Q/j.locationSize,de,W,Q*ge,Q/j.locationSize*Se*ge,fe)}}else if(I!==void 0){const W=I[C];if(W!==void 0)switch(W.length){case 2:r.vertexAttrib2fv(j.location,W);break;case 3:r.vertexAttrib3fv(j.location,W);break;case 4:r.vertexAttrib4fv(j.location,W);break;default:r.vertexAttrib1fv(j.location,W)}}}}A()}function y(){z();for(const D in o){const B=o[D];for(const G in B){const K=B[G];for(const Z in K)_(K[Z].object),delete K[Z];delete B[G]}delete o[D]}}function b(D){if(o[D.id]===void 0)return;const B=o[D.id];for(const G in B){const K=B[G];for(const Z in K)_(K[Z].object),delete K[Z];delete B[G]}delete o[D.id]}function O(D){for(const B in o){const G=o[B];if(G[D.id]===void 0)continue;const K=G[D.id];for(const Z in K)_(K[Z].object),delete K[Z];delete G[D.id]}}function z(){$(),h=!0,c!==l&&(c=l,f(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:z,resetDefaultState:$,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfProgram:O,initAttributes:v,enableAttribute:M,disableUnusedAttributes:A}}function h0(r,e,t,n){const i=n.isWebGL2;let s;function a(h){s=h}function o(h,u){r.drawArrays(s,h,u),t.update(u,s,1)}function l(h,u,d){if(d===0)return;let f,_;if(i)f=r,_="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[_](s,h,u,d),t.update(u,s,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<d;_++)this.render(h[_],u[_]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function u0(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,M=a||e.has("OES_texture_float"),T=v&&M,A=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:T,maxSamples:A}}function d0(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new mi,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const _=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,m=r.get(u);if(!i||_===null||_.length===0||s&&!p)s?h(null):c();else{const x=s?0:n,v=x*4;let M=m.clippingState||null;l.value=M,M=h(_,d,v,f);for(let T=0;T!==v;++T)M[T]=t[T];m.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,_){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const m=f+g*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,M=f;v!==g;++v,M+=4)a.copy(u[v]).applyMatrix4(x,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function f0(r){let e=new WeakMap;function t(a,o){return o===Zo?a.mapping=Bs:o===Jo&&(a.mapping=ks),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Zo||o===Jo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Tm(l.height/2);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Ga extends dd{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const As=4,vh=[.125,.215,.35,.446,.526,.582],Wi=20,bo=new Ga,yh=new Ie;let To=null,Ao=0,wo=0;const Hi=(1+Math.sqrt(5))/2,Ss=1/Hi,xh=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,Hi,Ss),new N(0,Hi,-Ss),new N(Ss,0,Hi),new N(-Ss,0,Hi),new N(Hi,Ss,0),new N(-Hi,Ss,0)];class Mh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(To,Ao,wo),e.scissorTest=!1,ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bs||e.mapping===ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:Rr,format:xn,colorSpace:Lt,depthBuffer:!1},i=Sh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sh(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=p0(s)),this._blurMaterial=m0(s,e,t)}return i}_compileMaterial(e){const t=new Qe(this._lodPlanes[0],e);this._renderer.compile(t,bo)}_sceneToCubeUV(e,t,n,i){const o=new Jt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(yh),h.toneMapping=Ei,h.autoClear=!1;const f=new Xt({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),_=new Qe(new tr,f);let g=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,g=!0):(f.color.copy(yh),g=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):x===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const v=this._cubeSize;ha(i,x*v,m>2?v:0,v,v),h.setRenderTarget(i),g&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Bs||e.mapping===ks;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new Qe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ha(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,bo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=xh[(i-1)%xh.length];this._blur(e,i-1,i,s,a)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Qe(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Wi-1),g=s/_,p=isFinite(s)?1+Math.floor(h*g):Wi;p>Wi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Wi}`);const m=[];let x=0;for(let E=0;E<Wi;++E){const P=E/g,y=Math.exp(-P*P/2);m.push(y),E===0?x+=y:E<p&&(x+=2*y)}for(let E=0;E<m.length;E++)m[E]=m[E]/x;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=_,d.mipInt.value=v-n;const M=this._sizeLods[i],T=3*M*(i>v-As?i-v+As:0),A=4*(this._cubeSize-M);ha(t,T,A,3*M,2*M),l.setRenderTarget(t),l.render(u,bo)}}function p0(r){const e=[],t=[],n=[];let i=r;const s=r-As+1+vh.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-As?l=vh[a-r+As-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,_=6,g=3,p=2,m=1,x=new Float32Array(g*_*f),v=new Float32Array(p*_*f),M=new Float32Array(m*_*f);for(let A=0;A<f;A++){const E=A%3*2/3-1,P=A>2?0:-1,y=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];x.set(y,g*_*A),v.set(d,p*_*A);const b=[A,A,A,A,A,A];M.set(b,m*_*A)}const T=new $t;T.setAttribute("position",new jt(x,g)),T.setAttribute("uv",new jt(v,p)),T.setAttribute("faceIndex",new jt(M,m)),e.push(T),i>As&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Sh(r,e,t){const n=new ts(r,e,t);return n.texture.mapping=ka,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ha(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function m0(r,e,t){const n=new Float32Array(Wi),i=new N(0,1,0);return new wi({name:"SphericalGaussianBlur",defines:{n:Wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Eh(){return new wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function bh(){return new wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Nl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function g0(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Zo||l===Jo,h=l===Bs||l===ks;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Mh(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Mh(r));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function _0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function v0(r,e,t,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,m=g.length;p<m;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const _ in d)e.update(d[_],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const _ in f){const g=f[_];for(let p=0,m=g.length;p<m;p++)e.update(g[p],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,_=u.attributes.position;let g=0;if(f!==null){const x=f.array;g=f.version;for(let v=0,M=x.length;v<M;v+=3){const T=x[v+0],A=x[v+1],E=x[v+2];d.push(T,A,A,E,E,T)}}else if(_!==void 0){const x=_.array;g=_.version;for(let v=0,M=x.length/3-1;v<M;v+=3){const T=v+0,A=v+1,E=v+2;d.push(T,A,A,E,E,T)}}else return;const p=new(sd(d)?hd:cd)(d,1);p.version=g;const m=s.get(u);m&&e.remove(m),s.set(u,p)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function y0(r,e,t,n){const i=n.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,_){r.drawElements(s,_,o,f*l),t.update(_,s,1)}function u(f,_,g){if(g===0)return;let p,m;if(i)p=r,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,_,o,f*l,g),t.update(_,s,g)}function d(f,_,g){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<g;m++)this.render(f[m]/l,_[m]);else{p.multiDrawElementsWEBGL(s,_,0,o,f,0,g);let m=0;for(let x=0;x<g;x++)m+=_[x];t.update(m,s,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function x0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function M0(r,e){return r[0]-e[0]}function S0(r,e){return Math.abs(e[1])-Math.abs(r[1])}function E0(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,a=new rt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=f!==void 0?f.length:0;let g=s.get(h);if(g===void 0||g.count!==_){let D=function(){z.dispose(),s.delete(h),h.removeEventListener("dispose",D)};g!==void 0&&g.texture.dispose();const x=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],E=h.morphAttributes.color||[];let P=0;x===!0&&(P=1),v===!0&&(P=2),M===!0&&(P=3);let y=h.attributes.position.count*P,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const O=new Float32Array(y*b*4*_),z=new od(O,y,b,_);z.type=ti,z.needsUpdate=!0;const $=P*4;for(let B=0;B<_;B++){const G=T[B],K=A[B],Z=E[B],J=y*b*4*B;for(let I=0;I<G.count;I++){const C=I*$;x===!0&&(a.fromBufferAttribute(G,I),O[J+C+0]=a.x,O[J+C+1]=a.y,O[J+C+2]=a.z,O[J+C+3]=0),v===!0&&(a.fromBufferAttribute(K,I),O[J+C+4]=a.x,O[J+C+5]=a.y,O[J+C+6]=a.z,O[J+C+7]=0),M===!0&&(a.fromBufferAttribute(Z,I),O[J+C+8]=a.x,O[J+C+9]=a.y,O[J+C+10]=a.z,O[J+C+11]=Z.itemSize===4?a.w:1)}}g={count:_,texture:z,size:new De(y,b)},s.set(h,g),h.addEventListener("dispose",D)}let p=0;for(let x=0;x<d.length;x++)p+=d[x];const m=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(r,"morphTargetBaseInfluence",m),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",g.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}else{const f=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==f){_=[];for(let v=0;v<f;v++)_[v]=[v,0];n[h.id]=_}for(let v=0;v<f;v++){const M=_[v];M[0]=v,M[1]=d[v]}_.sort(S0);for(let v=0;v<8;v++)v<f&&_[v][1]?(o[v][0]=_[v][0],o[v][1]=_[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(M0);const g=h.morphAttributes.position,p=h.morphAttributes.normal;let m=0;for(let v=0;v<8;v++){const M=o[v],T=M[0],A=M[1];T!==Number.MAX_SAFE_INTEGER&&A?(g&&h.getAttribute("morphTarget"+v)!==g[T]&&h.setAttribute("morphTarget"+v,g[T]),p&&h.getAttribute("morphNormal"+v)!==p[T]&&h.setAttribute("morphNormal"+v,p[T]),i[v]=A,m+=A):(g&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),p&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}const x=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function b0(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class md extends Ut{constructor(e,t,n,i,s,a,o,l,c,h){if(h=h!==void 0?h:ji,h!==ji&&h!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ji&&(n=_i),n===void 0&&h===Hs&&(n=Yi),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Pt,this.minFilter=l!==void 0?l:Pt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const gd=new Ut,_d=new md(1,1);_d.compareFunction=nd;const vd=new od,yd=new lm,xd=new fd,Th=[],Ah=[],wh=new Float32Array(16),Rh=new Float32Array(9),Ch=new Float32Array(4);function nr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Th[i];if(s===void 0&&(s=new Float32Array(i),Th[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function At(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function wt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Va(r,e){let t=Ah[e];t===void 0&&(t=new Int32Array(e),Ah[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function T0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function A0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2fv(this.addr,e),wt(t,e)}}function w0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;r.uniform3fv(this.addr,e),wt(t,e)}}function R0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4fv(this.addr,e),wt(t,e)}}function C0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(At(t,n))return;Ch.set(n),r.uniformMatrix2fv(this.addr,!1,Ch),wt(t,n)}}function P0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(At(t,n))return;Rh.set(n),r.uniformMatrix3fv(this.addr,!1,Rh),wt(t,n)}}function L0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(At(t,n))return;wh.set(n),r.uniformMatrix4fv(this.addr,!1,wh),wt(t,n)}}function I0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function D0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2iv(this.addr,e),wt(t,e)}}function N0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;r.uniform3iv(this.addr,e),wt(t,e)}}function U0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4iv(this.addr,e),wt(t,e)}}function O0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function F0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2uiv(this.addr,e),wt(t,e)}}function B0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;r.uniform3uiv(this.addr,e),wt(t,e)}}function k0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4uiv(this.addr,e),wt(t,e)}}function z0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?_d:gd;t.setTexture2D(e||s,i)}function H0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||yd,i)}function G0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||xd,i)}function V0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||vd,i)}function W0(r){switch(r){case 5126:return T0;case 35664:return A0;case 35665:return w0;case 35666:return R0;case 35674:return C0;case 35675:return P0;case 35676:return L0;case 5124:case 35670:return I0;case 35667:case 35671:return D0;case 35668:case 35672:return N0;case 35669:case 35673:return U0;case 5125:return O0;case 36294:return F0;case 36295:return B0;case 36296:return k0;case 35678:case 36198:case 36298:case 36306:case 35682:return z0;case 35679:case 36299:case 36307:return H0;case 35680:case 36300:case 36308:case 36293:return G0;case 36289:case 36303:case 36311:case 36292:return V0}}function X0(r,e){r.uniform1fv(this.addr,e)}function q0(r,e){const t=nr(e,this.size,2);r.uniform2fv(this.addr,t)}function Y0(r,e){const t=nr(e,this.size,3);r.uniform3fv(this.addr,t)}function j0(r,e){const t=nr(e,this.size,4);r.uniform4fv(this.addr,t)}function $0(r,e){const t=nr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function K0(r,e){const t=nr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Z0(r,e){const t=nr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function J0(r,e){r.uniform1iv(this.addr,e)}function Q0(r,e){r.uniform2iv(this.addr,e)}function ev(r,e){r.uniform3iv(this.addr,e)}function tv(r,e){r.uniform4iv(this.addr,e)}function nv(r,e){r.uniform1uiv(this.addr,e)}function iv(r,e){r.uniform2uiv(this.addr,e)}function sv(r,e){r.uniform3uiv(this.addr,e)}function rv(r,e){r.uniform4uiv(this.addr,e)}function av(r,e,t){const n=this.cache,i=e.length,s=Va(t,i);At(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||gd,s[a])}function ov(r,e,t){const n=this.cache,i=e.length,s=Va(t,i);At(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||yd,s[a])}function lv(r,e,t){const n=this.cache,i=e.length,s=Va(t,i);At(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||xd,s[a])}function cv(r,e,t){const n=this.cache,i=e.length,s=Va(t,i);At(n,s)||(r.uniform1iv(this.addr,s),wt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||vd,s[a])}function hv(r){switch(r){case 5126:return X0;case 35664:return q0;case 35665:return Y0;case 35666:return j0;case 35674:return $0;case 35675:return K0;case 35676:return Z0;case 5124:case 35670:return J0;case 35667:case 35671:return Q0;case 35668:case 35672:return ev;case 35669:case 35673:return tv;case 5125:return nv;case 36294:return iv;case 36295:return sv;case 36296:return rv;case 35678:case 36198:case 36298:case 36306:case 35682:return av;case 35679:case 36299:case 36307:return ov;case 35680:case 36300:case 36308:case 36293:return lv;case 36289:case 36303:case 36311:case 36292:return cv}}class uv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=W0(t.type)}}class dv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hv(t.type)}}class fv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Ro=/(\w+)(\])?(\[|\.)?/g;function Ph(r,e){r.seq.push(e),r.map[e.id]=e}function pv(r,e,t){const n=r.name,i=n.length;for(Ro.lastIndex=0;;){const s=Ro.exec(n),a=Ro.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ph(t,c===void 0?new uv(o,r,e):new dv(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new fv(o),Ph(t,u)),t=u}}}class xa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);pv(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Lh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const mv=37297;let gv=0;function _v(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function vv(r){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(r);let n;switch(e===t?n="":e===Ra&&t===wa?n="LinearDisplayP3ToLinearSRGB":e===wa&&t===Ra&&(n="LinearSRGBToLinearDisplayP3"),r){case Lt:case Ha:return[n,"LinearTransferOETF"];case ft:case Pl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Ih(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+_v(r.getShaderSource(e),a)}else return i}function yv(r,e){const t=vv(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function xv(r,e){let t;switch(e){case Wu:t="Linear";break;case _p:t="Reinhard";break;case vp:t="OptimizedCineon";break;case yp:t="ACESFilmic";break;case Mp:t="AgX";break;case xp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Mv(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ws).join(`
`)}function Sv(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ws).join(`
`)}function Ev(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function bv(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ws(r){return r!==""}function Dh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tv=/^[ \t]*#include +<([\w\d./]+)>/gm;function sl(r){return r.replace(Tv,wv)}const Av=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wv(r,e){let t=We[e];if(t===void 0){const n=Av.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return sl(t)}const Rv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uh(r){return r.replace(Rv,Cv)}function Cv(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Oh(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Pv(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Gu?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Vu?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Zn&&(e="SHADOWMAP_TYPE_VSM"),e}function Lv(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Bs:case ks:e="ENVMAP_TYPE_CUBE";break;case ka:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Iv(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ks:e="ENVMAP_MODE_REFRACTION";break}return e}function Dv(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ba:e="ENVMAP_BLENDING_MULTIPLY";break;case mp:e="ENVMAP_BLENDING_MIX";break;case gp:e="ENVMAP_BLENDING_ADD";break}return e}function Nv(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Uv(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Pv(t),c=Lv(t),h=Iv(t),u=Dv(t),d=Nv(t),f=t.isWebGL2?"":Mv(t),_=Sv(t),g=Ev(s),p=i.createProgram();let m,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ws).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ws).join(`
`),x.length>0&&(x+=`
`)):(m=[Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),x=[f,Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ei?"#define TONE_MAPPING":"",t.toneMapping!==Ei?We.tonemapping_pars_fragment:"",t.toneMapping!==Ei?xv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,yv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ws).join(`
`)),a=sl(a),a=Dh(a,t),a=Nh(a,t),o=sl(o),o=Dh(o,t),o=Nh(o,t),a=Uh(a),o=Uh(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===eh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===eh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const M=v+m+a,T=v+x+o,A=Lh(i,i.VERTEX_SHADER,M),E=Lh(i,i.FRAGMENT_SHADER,T);i.attachShader(p,A),i.attachShader(p,E),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function P(z){if(r.debug.checkShaderErrors){const $=i.getProgramInfoLog(p).trim(),D=i.getShaderInfoLog(A).trim(),B=i.getShaderInfoLog(E).trim();let G=!0,K=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(G=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,p,A,E);else{const Z=Ih(i,A,"vertex"),J=Ih(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+Z+`
`+J)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(D===""||B==="")&&(K=!1);K&&(z.diagnostics={runnable:G,programLog:$,vertexShader:{log:D,prefix:m},fragmentShader:{log:B,prefix:x}})}i.deleteShader(A),i.deleteShader(E),y=new xa(i,p),b=bv(i,p)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=i.getProgramParameter(p,mv)),O},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gv++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=E,this}let Ov=0;class Fv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Bv(e),t.set(e,n)),n}}class Bv{constructor(e){this.id=Ov++,this.code=e,this.usedTimes=0}}function kv(r,e,t,n,i,s,a){const o=new Il,l=new Fv,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return y===0?"uv":`uv${y}`}function p(y,b,O,z,$){const D=z.fog,B=$.geometry,G=y.isMeshStandardMaterial?z.environment:null,K=(y.isMeshStandardMaterial?t:e).get(y.envMap||G),Z=K&&K.mapping===ka?K.image.height:null,J=_[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const I=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,C=I!==void 0?I.length:0;let j=0;B.morphAttributes.position!==void 0&&(j=1),B.morphAttributes.normal!==void 0&&(j=2),B.morphAttributes.color!==void 0&&(j=3);let F,W,Q,ae;if(J){const yt=Fn[J];F=yt.vertexShader,W=yt.fragmentShader}else F=y.vertexShader,W=y.fragmentShader,l.update(y),Q=l.getVertexShaderID(y),ae=l.getFragmentShaderID(y);const te=r.getRenderTarget(),de=$.isInstancedMesh===!0,ge=$.isBatchedMesh===!0,fe=!!y.map,Se=!!y.matcap,k=!!K,Ve=!!y.aoMap,le=!!y.lightMap,Ee=!!y.bumpMap,_e=!!y.normalMap,He=!!y.displacementMap,Ce=!!y.emissiveMap,R=!!y.metalnessMap,S=!!y.roughnessMap,V=y.anisotropy>0,se=y.clearcoat>0,ie=y.iridescence>0,re=y.sheen>0,be=y.transmission>0,ue=V&&!!y.anisotropyMap,ce=se&&!!y.clearcoatMap,pe=se&&!!y.clearcoatNormalMap,Ae=se&&!!y.clearcoatRoughnessMap,ee=ie&&!!y.iridescenceMap,Ue=ie&&!!y.iridescenceThicknessMap,Pe=re&&!!y.sheenColorMap,we=re&&!!y.sheenRoughnessMap,Te=!!y.specularMap,ye=!!y.specularColorMap,L=!!y.specularIntensityMap,oe=be&&!!y.transmissionMap,Re=be&&!!y.thicknessMap,xe=!!y.gradientMap,ne=!!y.alphaMap,U=y.alphaTest>0,he=!!y.alphaHash,ve=!!y.extensions,Oe=!!B.attributes.uv1,Ne=!!B.attributes.uv2,je=!!B.attributes.uv3;let $e=Ei;return y.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&($e=r.toneMapping),{isWebGL2:h,shaderID:J,shaderType:y.type,shaderName:y.name,vertexShader:F,fragmentShader:W,defines:y.defines,customVertexShaderID:Q,customFragmentShaderID:ae,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:ge,instancing:de,instancingColor:de&&$.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:te===null?r.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Lt,map:fe,matcap:Se,envMap:k,envMapMode:k&&K.mapping,envMapCubeUVHeight:Z,aoMap:Ve,lightMap:le,bumpMap:Ee,normalMap:_e,displacementMap:d&&He,emissiveMap:Ce,normalMapObjectSpace:_e&&y.normalMapType===Up,normalMapTangentSpace:_e&&y.normalMapType===za,metalnessMap:R,roughnessMap:S,anisotropy:V,anisotropyMap:ue,clearcoat:se,clearcoatMap:ce,clearcoatNormalMap:pe,clearcoatRoughnessMap:Ae,iridescence:ie,iridescenceMap:ee,iridescenceThicknessMap:Ue,sheen:re,sheenColorMap:Pe,sheenRoughnessMap:we,specularMap:Te,specularColorMap:ye,specularIntensityMap:L,transmission:be,transmissionMap:oe,thicknessMap:Re,gradientMap:xe,opaque:y.transparent===!1&&y.blending===Ls,alphaMap:ne,alphaTest:U,alphaHash:he,combine:y.combine,mapUv:fe&&g(y.map.channel),aoMapUv:Ve&&g(y.aoMap.channel),lightMapUv:le&&g(y.lightMap.channel),bumpMapUv:Ee&&g(y.bumpMap.channel),normalMapUv:_e&&g(y.normalMap.channel),displacementMapUv:He&&g(y.displacementMap.channel),emissiveMapUv:Ce&&g(y.emissiveMap.channel),metalnessMapUv:R&&g(y.metalnessMap.channel),roughnessMapUv:S&&g(y.roughnessMap.channel),anisotropyMapUv:ue&&g(y.anisotropyMap.channel),clearcoatMapUv:ce&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:pe&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(y.sheenRoughnessMap.channel),specularMapUv:Te&&g(y.specularMap.channel),specularColorMapUv:ye&&g(y.specularColorMap.channel),specularIntensityMapUv:L&&g(y.specularIntensityMap.channel),transmissionMapUv:oe&&g(y.transmissionMap.channel),thicknessMapUv:Re&&g(y.thicknessMap.channel),alphaMapUv:ne&&g(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(_e||V),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Oe,vertexUv2s:Ne,vertexUv3s:je,pointsUvs:$.isPoints===!0&&!!B.attributes.uv&&(fe||ne),fog:!!D,useFog:y.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:$.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:C,morphTextureStride:j,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&O.length>0,shadowMapType:r.shadowMap.type,toneMapping:$e,useLegacyLights:r._useLegacyLights,decodeVideoTexture:fe&&y.map.isVideoTexture===!0&&et.getTransfer(y.map.colorSpace)===ot,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===In,flipSided:y.side===Yt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ve&&y.extensions.derivatives===!0,extensionFragDepth:ve&&y.extensions.fragDepth===!0,extensionDrawBuffers:ve&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ve&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function m(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const O in y.defines)b.push(O),b.push(y.defines[O]);return y.isRawShaderMaterial===!1&&(x(b,y),v(b,y),b.push(r.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function x(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function v(y,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function M(y){const b=_[y.type];let O;if(b){const z=Fn[b];O=Mm.clone(z.uniforms)}else O=y.uniforms;return O}function T(y,b){let O;for(let z=0,$=c.length;z<$;z++){const D=c[z];if(D.cacheKey===b){O=D,++O.usedTimes;break}}return O===void 0&&(O=new Uv(r,b,y,s),c.push(O)),O}function A(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),y.destroy()}}function E(y){l.remove(y)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:M,acquireProgram:T,releaseProgram:A,releaseShaderCache:E,programs:c,dispose:P}}function zv(){let r=new WeakMap;function e(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function t(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Hv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Fh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Bh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,_,g,p){let m=r[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},r[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=_,m.renderOrder=u.renderOrder,m.z=g,m.group=p),e++,m}function o(u,d,f,_,g,p){const m=a(u,d,f,_,g,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,_,g,p){const m=a(u,d,f,_,g,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||Hv),n.length>1&&n.sort(d||Fh),i.length>1&&i.sort(d||Fh)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function Gv(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Bh,r.set(n,[a])):i>=s.length?(a=new Bh,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Vv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Ie};break;case"SpotLight":t={position:new N,direction:new N,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new N,halfWidth:new N,halfHeight:new N};break}return r[e.id]=t,t}}}function Wv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Xv=0;function qv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Yv(r,e){const t=new Vv,n=Wv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new N);const s=new N,a=new ke,o=new ke;function l(h,u){let d=0,f=0,_=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let g=0,p=0,m=0,x=0,v=0,M=0,T=0,A=0,E=0,P=0,y=0;h.sort(qv);const b=u===!0?Math.PI:1;for(let z=0,$=h.length;z<$;z++){const D=h[z],B=D.color,G=D.intensity,K=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=B.r*G*b,f+=B.g*G*b,_+=B.b*G*b;else if(D.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(D.sh.coefficients[J],G);y++}else if(D.isDirectionalLight){const J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*b),D.castShadow){const I=D.shadow,C=n.get(D);C.shadowBias=I.bias,C.shadowNormalBias=I.normalBias,C.shadowRadius=I.radius,C.shadowMapSize=I.mapSize,i.directionalShadow[g]=C,i.directionalShadowMap[g]=Z,i.directionalShadowMatrix[g]=D.shadow.matrix,M++}i.directional[g]=J,g++}else if(D.isSpotLight){const J=t.get(D);J.position.setFromMatrixPosition(D.matrixWorld),J.color.copy(B).multiplyScalar(G*b),J.distance=K,J.coneCos=Math.cos(D.angle),J.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),J.decay=D.decay,i.spot[m]=J;const I=D.shadow;if(D.map&&(i.spotLightMap[E]=D.map,E++,I.updateMatrices(D),D.castShadow&&P++),i.spotLightMatrix[m]=I.matrix,D.castShadow){const C=n.get(D);C.shadowBias=I.bias,C.shadowNormalBias=I.normalBias,C.shadowRadius=I.radius,C.shadowMapSize=I.mapSize,i.spotShadow[m]=C,i.spotShadowMap[m]=Z,A++}m++}else if(D.isRectAreaLight){const J=t.get(D);J.color.copy(B).multiplyScalar(G),J.halfWidth.set(D.width*.5,0,0),J.halfHeight.set(0,D.height*.5,0),i.rectArea[x]=J,x++}else if(D.isPointLight){const J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity*b),J.distance=D.distance,J.decay=D.decay,D.castShadow){const I=D.shadow,C=n.get(D);C.shadowBias=I.bias,C.shadowNormalBias=I.normalBias,C.shadowRadius=I.radius,C.shadowMapSize=I.mapSize,C.shadowCameraNear=I.camera.near,C.shadowCameraFar=I.camera.far,i.pointShadow[p]=C,i.pointShadowMap[p]=Z,i.pointShadowMatrix[p]=D.shadow.matrix,T++}i.point[p]=J,p++}else if(D.isHemisphereLight){const J=t.get(D);J.skyColor.copy(D.color).multiplyScalar(G*b),J.groundColor.copy(D.groundColor).multiplyScalar(G*b),i.hemi[v]=J,v++}}x>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=_;const O=i.hash;(O.directionalLength!==g||O.pointLength!==p||O.spotLength!==m||O.rectAreaLength!==x||O.hemiLength!==v||O.numDirectionalShadows!==M||O.numPointShadows!==T||O.numSpotShadows!==A||O.numSpotMaps!==E||O.numLightProbes!==y)&&(i.directional.length=g,i.spot.length=m,i.rectArea.length=x,i.point.length=p,i.hemi.length=v,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=A+E-P,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=y,O.directionalLength=g,O.pointLength=p,O.spotLength=m,O.rectAreaLength=x,O.hemiLength=v,O.numDirectionalShadows=M,O.numPointShadows=T,O.numSpotShadows=A,O.numSpotMaps=E,O.numLightProbes=y,i.version=Xv++)}function c(h,u){let d=0,f=0,_=0,g=0,p=0;const m=u.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const M=h[x];if(M.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),d++}else if(M.isSpotLight){const T=i.spot[_];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),_++}else if(M.isRectAreaLight){const T=i.rectArea[g];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(m),o.identity(),a.copy(M.matrixWorld),a.premultiply(m),o.extractRotation(a),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const T=i.point[f];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const T=i.hemi[p];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:i}}function kh(r,e){const t=new Yv(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function jv(r,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new kh(r,e),t.set(s,[l])):a>=o.length?(l=new kh(r,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class $v extends Tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Kv extends Tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Zv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qv(r,e,t){let n=new Dl;const i=new De,s=new De,a=new rt,o=new $v({depthPacking:Np}),l=new Kv,c={},h=t.maxTextureSize,u={[ii]:Yt,[Yt]:ii,[In]:In},d=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:Zv,fragmentShader:Jv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new $t;_.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Qe(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gu;let m=this.type;this.render=function(A,E,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const y=r.getRenderTarget(),b=r.getActiveCubeFace(),O=r.getActiveMipmapLevel(),z=r.state;z.setBlending(Si),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const $=m!==Zn&&this.type===Zn,D=m===Zn&&this.type!==Zn;for(let B=0,G=A.length;B<G;B++){const K=A[B],Z=K.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);const J=Z.getFrameExtents();if(i.multiply(J),s.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/J.x),i.x=s.x*J.x,Z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/J.y),i.y=s.y*J.y,Z.mapSize.y=s.y)),Z.map===null||$===!0||D===!0){const C=this.type!==Zn?{minFilter:Pt,magFilter:Pt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new ts(i.x,i.y,C),Z.map.texture.name=K.name+".shadowMap",Z.camera.updateProjectionMatrix()}r.setRenderTarget(Z.map),r.clear();const I=Z.getViewportCount();for(let C=0;C<I;C++){const j=Z.getViewport(C);a.set(s.x*j.x,s.y*j.y,s.x*j.z,s.y*j.w),z.viewport(a),Z.updateMatrices(K,C),n=Z.getFrustum(),M(E,P,Z.camera,K,this.type)}Z.isPointLightShadow!==!0&&this.type===Zn&&x(Z,P),Z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(y,b,O)};function x(A,E){const P=e.update(g);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ts(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(E,null,P,d,g,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(E,null,P,f,g,null)}function v(A,E,P,y){let b=null;const O=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(O!==void 0)b=O;else if(b=P.isPointLight===!0?l:o,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const z=b.uuid,$=E.uuid;let D=c[z];D===void 0&&(D={},c[z]=D);let B=D[$];B===void 0&&(B=b.clone(),D[$]=B,E.addEventListener("dispose",T)),b=B}if(b.visible=E.visible,b.wireframe=E.wireframe,y===Zn?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:u[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const z=r.properties.get(b);z.light=P}return b}function M(A,E,P,y,b){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Zn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const $=e.update(A),D=A.material;if(Array.isArray(D)){const B=$.groups;for(let G=0,K=B.length;G<K;G++){const Z=B[G],J=D[Z.materialIndex];if(J&&J.visible){const I=v(A,J,y,b);A.onBeforeShadow(r,A,E,P,$,I,Z),r.renderBufferDirect(P,null,$,I,A,Z),A.onAfterShadow(r,A,E,P,$,I,Z)}}}else if(D.visible){const B=v(A,D,y,b);A.onBeforeShadow(r,A,E,P,$,B,null),r.renderBufferDirect(P,null,$,B,A,null),A.onAfterShadow(r,A,E,P,$,B,null)}}const z=A.children;for(let $=0,D=z.length;$<D;$++)M(z[$],E,P,y,b)}function T(A){A.target.removeEventListener("dispose",T);for(const P in c){const y=c[P],b=A.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}function ey(r,e,t){const n=t.isWebGL2;function i(){let U=!1;const he=new rt;let ve=null;const Oe=new rt(0,0,0,0);return{setMask:function(Ne){ve!==Ne&&!U&&(r.colorMask(Ne,Ne,Ne,Ne),ve=Ne)},setLocked:function(Ne){U=Ne},setClear:function(Ne,je,$e,mt,yt){yt===!0&&(Ne*=mt,je*=mt,$e*=mt),he.set(Ne,je,$e,mt),Oe.equals(he)===!1&&(r.clearColor(Ne,je,$e,mt),Oe.copy(he))},reset:function(){U=!1,ve=null,Oe.set(-1,0,0,0)}}}function s(){let U=!1,he=null,ve=null,Oe=null;return{setTest:function(Ne){Ne?ge(r.DEPTH_TEST):fe(r.DEPTH_TEST)},setMask:function(Ne){he!==Ne&&!U&&(r.depthMask(Ne),he=Ne)},setFunc:function(Ne){if(ve!==Ne){switch(Ne){case lp:r.depthFunc(r.NEVER);break;case cp:r.depthFunc(r.ALWAYS);break;case hp:r.depthFunc(r.LESS);break;case ba:r.depthFunc(r.LEQUAL);break;case up:r.depthFunc(r.EQUAL);break;case dp:r.depthFunc(r.GEQUAL);break;case fp:r.depthFunc(r.GREATER);break;case pp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ve=Ne}},setLocked:function(Ne){U=Ne},setClear:function(Ne){Oe!==Ne&&(r.clearDepth(Ne),Oe=Ne)},reset:function(){U=!1,he=null,ve=null,Oe=null}}}function a(){let U=!1,he=null,ve=null,Oe=null,Ne=null,je=null,$e=null,mt=null,yt=null;return{setTest:function(Je){U||(Je?ge(r.STENCIL_TEST):fe(r.STENCIL_TEST))},setMask:function(Je){he!==Je&&!U&&(r.stencilMask(Je),he=Je)},setFunc:function(Je,St,Nn){(ve!==Je||Oe!==St||Ne!==Nn)&&(r.stencilFunc(Je,St,Nn),ve=Je,Oe=St,Ne=Nn)},setOp:function(Je,St,Nn){(je!==Je||$e!==St||mt!==Nn)&&(r.stencilOp(Je,St,Nn),je=Je,$e=St,mt=Nn)},setLocked:function(Je){U=Je},setClear:function(Je){yt!==Je&&(r.clearStencil(Je),yt=Je)},reset:function(){U=!1,he=null,ve=null,Oe=null,Ne=null,je=null,$e=null,mt=null,yt=null}}}const o=new i,l=new s,c=new a,h=new WeakMap,u=new WeakMap;let d={},f={},_=new WeakMap,g=[],p=null,m=!1,x=null,v=null,M=null,T=null,A=null,E=null,P=null,y=new Ie(0,0,0),b=0,O=!1,z=null,$=null,D=null,B=null,G=null;const K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,J=0;const I=r.getParameter(r.VERSION);I.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(I)[1]),Z=J>=1):I.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),Z=J>=2);let C=null,j={};const F=r.getParameter(r.SCISSOR_BOX),W=r.getParameter(r.VIEWPORT),Q=new rt().fromArray(F),ae=new rt().fromArray(W);function te(U,he,ve,Oe){const Ne=new Uint8Array(4),je=r.createTexture();r.bindTexture(U,je),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $e=0;$e<ve;$e++)n&&(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)?r.texImage3D(he,0,r.RGBA,1,1,Oe,0,r.RGBA,r.UNSIGNED_BYTE,Ne):r.texImage2D(he+$e,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ne);return je}const de={};de[r.TEXTURE_2D]=te(r.TEXTURE_2D,r.TEXTURE_2D,1),de[r.TEXTURE_CUBE_MAP]=te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(de[r.TEXTURE_2D_ARRAY]=te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),de[r.TEXTURE_3D]=te(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ge(r.DEPTH_TEST),l.setFunc(ba),Ce(!1),R(vc),ge(r.CULL_FACE),_e(Si);function ge(U){d[U]!==!0&&(r.enable(U),d[U]=!0)}function fe(U){d[U]!==!1&&(r.disable(U),d[U]=!1)}function Se(U,he){return f[U]!==he?(r.bindFramebuffer(U,he),f[U]=he,n&&(U===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=he),U===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=he)),!0):!1}function k(U,he){let ve=g,Oe=!1;if(U)if(ve=_.get(he),ve===void 0&&(ve=[],_.set(he,ve)),U.isWebGLMultipleRenderTargets){const Ne=U.texture;if(ve.length!==Ne.length||ve[0]!==r.COLOR_ATTACHMENT0){for(let je=0,$e=Ne.length;je<$e;je++)ve[je]=r.COLOR_ATTACHMENT0+je;ve.length=Ne.length,Oe=!0}}else ve[0]!==r.COLOR_ATTACHMENT0&&(ve[0]=r.COLOR_ATTACHMENT0,Oe=!0);else ve[0]!==r.BACK&&(ve[0]=r.BACK,Oe=!0);Oe&&(t.isWebGL2?r.drawBuffers(ve):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ve))}function Ve(U){return p!==U?(r.useProgram(U),p=U,!0):!1}const le={[Vi]:r.FUNC_ADD,[Yf]:r.FUNC_SUBTRACT,[jf]:r.FUNC_REVERSE_SUBTRACT};if(n)le[Sc]=r.MIN,le[Ec]=r.MAX;else{const U=e.get("EXT_blend_minmax");U!==null&&(le[Sc]=U.MIN_EXT,le[Ec]=U.MAX_EXT)}const Ee={[$f]:r.ZERO,[Kf]:r.ONE,[Zf]:r.SRC_COLOR,[$o]:r.SRC_ALPHA,[ip]:r.SRC_ALPHA_SATURATE,[tp]:r.DST_COLOR,[Qf]:r.DST_ALPHA,[Jf]:r.ONE_MINUS_SRC_COLOR,[Ko]:r.ONE_MINUS_SRC_ALPHA,[np]:r.ONE_MINUS_DST_COLOR,[ep]:r.ONE_MINUS_DST_ALPHA,[sp]:r.CONSTANT_COLOR,[rp]:r.ONE_MINUS_CONSTANT_COLOR,[ap]:r.CONSTANT_ALPHA,[op]:r.ONE_MINUS_CONSTANT_ALPHA};function _e(U,he,ve,Oe,Ne,je,$e,mt,yt,Je){if(U===Si){m===!0&&(fe(r.BLEND),m=!1);return}if(m===!1&&(ge(r.BLEND),m=!0),U!==qf){if(U!==x||Je!==O){if((v!==Vi||A!==Vi)&&(r.blendEquation(r.FUNC_ADD),v=Vi,A=Vi),Je)switch(U){case Ls:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yc:r.blendFunc(r.ONE,r.ONE);break;case xc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Mc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ls:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yc:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case xc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Mc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,T=null,E=null,P=null,y.set(0,0,0),b=0,x=U,O=Je}return}Ne=Ne||he,je=je||ve,$e=$e||Oe,(he!==v||Ne!==A)&&(r.blendEquationSeparate(le[he],le[Ne]),v=he,A=Ne),(ve!==M||Oe!==T||je!==E||$e!==P)&&(r.blendFuncSeparate(Ee[ve],Ee[Oe],Ee[je],Ee[$e]),M=ve,T=Oe,E=je,P=$e),(mt.equals(y)===!1||yt!==b)&&(r.blendColor(mt.r,mt.g,mt.b,yt),y.copy(mt),b=yt),x=U,O=!1}function He(U,he){U.side===In?fe(r.CULL_FACE):ge(r.CULL_FACE);let ve=U.side===Yt;he&&(ve=!ve),Ce(ve),U.blending===Ls&&U.transparent===!1?_e(Si):_e(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),o.setMask(U.colorWrite);const Oe=U.stencilWrite;c.setTest(Oe),Oe&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),V(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ge(r.SAMPLE_ALPHA_TO_COVERAGE):fe(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(U){z!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),z=U)}function R(U){U!==Wf?(ge(r.CULL_FACE),U!==$&&(U===vc?r.cullFace(r.BACK):U===Xf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):fe(r.CULL_FACE),$=U}function S(U){U!==D&&(Z&&r.lineWidth(U),D=U)}function V(U,he,ve){U?(ge(r.POLYGON_OFFSET_FILL),(B!==he||G!==ve)&&(r.polygonOffset(he,ve),B=he,G=ve)):fe(r.POLYGON_OFFSET_FILL)}function se(U){U?ge(r.SCISSOR_TEST):fe(r.SCISSOR_TEST)}function ie(U){U===void 0&&(U=r.TEXTURE0+K-1),C!==U&&(r.activeTexture(U),C=U)}function re(U,he,ve){ve===void 0&&(C===null?ve=r.TEXTURE0+K-1:ve=C);let Oe=j[ve];Oe===void 0&&(Oe={type:void 0,texture:void 0},j[ve]=Oe),(Oe.type!==U||Oe.texture!==he)&&(C!==ve&&(r.activeTexture(ve),C=ve),r.bindTexture(U,he||de[U]),Oe.type=U,Oe.texture=he)}function be(){const U=j[C];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ue(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ue(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pe(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function L(U){Q.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),Q.copy(U))}function oe(U){ae.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),ae.copy(U))}function Re(U,he){let ve=u.get(he);ve===void 0&&(ve=new WeakMap,u.set(he,ve));let Oe=ve.get(U);Oe===void 0&&(Oe=r.getUniformBlockIndex(he,U.name),ve.set(U,Oe))}function xe(U,he){const Oe=u.get(he).get(U);h.get(he)!==Oe&&(r.uniformBlockBinding(he,Oe,U.__bindingPointIndex),h.set(he,Oe))}function ne(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},C=null,j={},f={},_=new WeakMap,g=[],p=null,m=!1,x=null,v=null,M=null,T=null,A=null,E=null,P=null,y=new Ie(0,0,0),b=0,O=!1,z=null,$=null,D=null,B=null,G=null,Q.set(0,0,r.canvas.width,r.canvas.height),ae.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:ge,disable:fe,bindFramebuffer:Se,drawBuffers:k,useProgram:Ve,setBlending:_e,setMaterial:He,setFlipSided:Ce,setCullFace:R,setLineWidth:S,setPolygonOffset:V,setScissorTest:se,activeTexture:ie,bindTexture:re,unbindTexture:be,compressedTexImage2D:ue,compressedTexImage3D:ce,texImage2D:Te,texImage3D:ye,updateUBOMapping:Re,uniformBlockBinding:xe,texStorage2D:Pe,texStorage3D:we,texSubImage2D:pe,texSubImage3D:Ae,compressedTexSubImage2D:ee,compressedTexSubImage3D:Ue,scissor:L,viewport:oe,reset:ne}}function ty(r,e,t,n,i,s,a){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,S){return f?new OffscreenCanvas(R,S):Pr("canvas")}function g(R,S,V,se){let ie=1;if((R.width>se||R.height>se)&&(ie=se/Math.max(R.width,R.height)),ie<1||S===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const re=S?Pa:Math.floor,be=re(ie*R.width),ue=re(ie*R.height);u===void 0&&(u=_(be,ue));const ce=V?_(be,ue):u;return ce.width=be,ce.height=ue,ce.getContext("2d").drawImage(R,0,0,be,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+be+"x"+ue+")."),ce}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function p(R){return il(R.width)&&il(R.height)}function m(R){return o?!1:R.wrapS!==yn||R.wrapT!==yn||R.minFilter!==Pt&&R.minFilter!==Zt}function x(R,S){return R.generateMipmaps&&S&&R.minFilter!==Pt&&R.minFilter!==Zt}function v(R){r.generateMipmap(R)}function M(R,S,V,se,ie=!1){if(o===!1)return S;if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let re=S;if(S===r.RED&&(V===r.FLOAT&&(re=r.R32F),V===r.HALF_FLOAT&&(re=r.R16F),V===r.UNSIGNED_BYTE&&(re=r.R8)),S===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(re=r.R8UI),V===r.UNSIGNED_SHORT&&(re=r.R16UI),V===r.UNSIGNED_INT&&(re=r.R32UI),V===r.BYTE&&(re=r.R8I),V===r.SHORT&&(re=r.R16I),V===r.INT&&(re=r.R32I)),S===r.RG&&(V===r.FLOAT&&(re=r.RG32F),V===r.HALF_FLOAT&&(re=r.RG16F),V===r.UNSIGNED_BYTE&&(re=r.RG8)),S===r.RGBA){const be=ie?Aa:et.getTransfer(se);V===r.FLOAT&&(re=r.RGBA32F),V===r.HALF_FLOAT&&(re=r.RGBA16F),V===r.UNSIGNED_BYTE&&(re=be===ot?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&(re=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(re=r.RGB5_A1)}return(re===r.R16F||re===r.R32F||re===r.RG16F||re===r.RG32F||re===r.RGBA16F||re===r.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function T(R,S,V){return x(R,V)===!0||R.isFramebufferTexture&&R.minFilter!==Pt&&R.minFilter!==Zt?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function A(R){return R===Pt||R===Qo||R===ya?r.NEAREST:r.LINEAR}function E(R){const S=R.target;S.removeEventListener("dispose",E),y(S),S.isVideoTexture&&h.delete(S)}function P(R){const S=R.target;S.removeEventListener("dispose",P),O(S)}function y(R){const S=n.get(R);if(S.__webglInit===void 0)return;const V=R.source,se=d.get(V);if(se){const ie=se[S.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&b(R),Object.keys(se).length===0&&d.delete(V)}n.remove(R)}function b(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const V=R.source,se=d.get(V);delete se[S.__cacheKey],a.memory.textures--}function O(R){const S=R.texture,V=n.get(R),se=n.get(S);if(se.__webglTexture!==void 0&&(r.deleteTexture(se.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(V.__webglFramebuffer[ie]))for(let re=0;re<V.__webglFramebuffer[ie].length;re++)r.deleteFramebuffer(V.__webglFramebuffer[ie][re]);else r.deleteFramebuffer(V.__webglFramebuffer[ie]);V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer[ie])}else{if(Array.isArray(V.__webglFramebuffer))for(let ie=0;ie<V.__webglFramebuffer.length;ie++)r.deleteFramebuffer(V.__webglFramebuffer[ie]);else r.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&r.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let ie=0;ie<V.__webglColorRenderbuffer.length;ie++)V.__webglColorRenderbuffer[ie]&&r.deleteRenderbuffer(V.__webglColorRenderbuffer[ie]);V.__webglDepthRenderbuffer&&r.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ie=0,re=S.length;ie<re;ie++){const be=n.get(S[ie]);be.__webglTexture&&(r.deleteTexture(be.__webglTexture),a.memory.textures--),n.remove(S[ie])}n.remove(S),n.remove(R)}let z=0;function $(){z=0}function D(){const R=z;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),z+=1,R}function B(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function G(R,S){const V=n.get(R);if(R.isVideoTexture&&He(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){const se=R.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(V,R,S);return}}t.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+S)}function K(R,S){const V=n.get(R);if(R.version>0&&V.__version!==R.version){Q(V,R,S);return}t.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+S)}function Z(R,S){const V=n.get(R);if(R.version>0&&V.__version!==R.version){Q(V,R,S);return}t.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+S)}function J(R,S){const V=n.get(R);if(R.version>0&&V.__version!==R.version){ae(V,R,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+S)}const I={[zs]:r.REPEAT,[yn]:r.CLAMP_TO_EDGE,[Ta]:r.MIRRORED_REPEAT},C={[Pt]:r.NEAREST,[Qo]:r.NEAREST_MIPMAP_NEAREST,[ya]:r.NEAREST_MIPMAP_LINEAR,[Zt]:r.LINEAR,[qu]:r.LINEAR_MIPMAP_NEAREST,[es]:r.LINEAR_MIPMAP_LINEAR},j={[Op]:r.NEVER,[Gp]:r.ALWAYS,[Fp]:r.LESS,[nd]:r.LEQUAL,[Bp]:r.EQUAL,[Hp]:r.GEQUAL,[kp]:r.GREATER,[zp]:r.NOTEQUAL};function F(R,S,V){if(V?(r.texParameteri(R,r.TEXTURE_WRAP_S,I[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,I[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,I[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,C[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,C[S.minFilter])):(r.texParameteri(R,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(R,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(S.wrapS!==yn||S.wrapT!==yn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(R,r.TEXTURE_MAG_FILTER,A(S.magFilter)),r.texParameteri(R,r.TEXTURE_MIN_FILTER,A(S.minFilter)),S.minFilter!==Pt&&S.minFilter!==Zt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,j[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const se=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===Pt||S.minFilter!==ya&&S.minFilter!==es||S.type===ti&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===Rr&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(r.texParameterf(R,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function W(R,S){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",E));const se=S.source;let ie=d.get(se);ie===void 0&&(ie={},d.set(se,ie));const re=B(S);if(re!==R.__cacheKey){ie[re]===void 0&&(ie[re]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ie[re].usedTimes++;const be=ie[R.__cacheKey];be!==void 0&&(ie[R.__cacheKey].usedTimes--,be.usedTimes===0&&b(S)),R.__cacheKey=re,R.__webglTexture=ie[re].texture}return V}function Q(R,S,V){let se=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(se=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(se=r.TEXTURE_3D);const ie=W(R,S),re=S.source;t.bindTexture(se,R.__webglTexture,r.TEXTURE0+V);const be=n.get(re);if(re.version!==be.__version||ie===!0){t.activeTexture(r.TEXTURE0+V);const ue=et.getPrimaries(et.workingColorSpace),ce=S.colorSpace===Mn?null:et.getPrimaries(S.colorSpace),pe=S.colorSpace===Mn||ue===ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Ae=m(S)&&p(S.image)===!1;let ee=g(S.image,Ae,!1,i.maxTextureSize);ee=Ce(S,ee);const Ue=p(ee)||o,Pe=s.convert(S.format,S.colorSpace);let we=s.convert(S.type),Te=M(S.internalFormat,Pe,we,S.colorSpace,S.isVideoTexture);F(se,S,Ue);let ye;const L=S.mipmaps,oe=o&&S.isVideoTexture!==!0&&Te!==Qu,Re=be.__version===void 0||ie===!0,xe=T(S,ee,Ue);if(S.isDepthTexture)Te=r.DEPTH_COMPONENT,o?S.type===ti?Te=r.DEPTH_COMPONENT32F:S.type===_i?Te=r.DEPTH_COMPONENT24:S.type===Yi?Te=r.DEPTH24_STENCIL8:Te=r.DEPTH_COMPONENT16:S.type===ti&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===ji&&Te===r.DEPTH_COMPONENT&&S.type!==Cl&&S.type!==_i&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=_i,we=s.convert(S.type)),S.format===Hs&&Te===r.DEPTH_COMPONENT&&(Te=r.DEPTH_STENCIL,S.type!==Yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Yi,we=s.convert(S.type))),Re&&(oe?t.texStorage2D(r.TEXTURE_2D,1,Te,ee.width,ee.height):t.texImage2D(r.TEXTURE_2D,0,Te,ee.width,ee.height,0,Pe,we,null));else if(S.isDataTexture)if(L.length>0&&Ue){oe&&Re&&t.texStorage2D(r.TEXTURE_2D,xe,Te,L[0].width,L[0].height);for(let ne=0,U=L.length;ne<U;ne++)ye=L[ne],oe?t.texSubImage2D(r.TEXTURE_2D,ne,0,0,ye.width,ye.height,Pe,we,ye.data):t.texImage2D(r.TEXTURE_2D,ne,Te,ye.width,ye.height,0,Pe,we,ye.data);S.generateMipmaps=!1}else oe?(Re&&t.texStorage2D(r.TEXTURE_2D,xe,Te,ee.width,ee.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee.width,ee.height,Pe,we,ee.data)):t.texImage2D(r.TEXTURE_2D,0,Te,ee.width,ee.height,0,Pe,we,ee.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){oe&&Re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,Te,L[0].width,L[0].height,ee.depth);for(let ne=0,U=L.length;ne<U;ne++)ye=L[ne],S.format!==xn?Pe!==null?oe?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,ye.width,ye.height,ee.depth,Pe,ye.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ne,Te,ye.width,ye.height,ee.depth,0,ye.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?t.texSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,ye.width,ye.height,ee.depth,Pe,we,ye.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ne,Te,ye.width,ye.height,ee.depth,0,Pe,we,ye.data)}else{oe&&Re&&t.texStorage2D(r.TEXTURE_2D,xe,Te,L[0].width,L[0].height);for(let ne=0,U=L.length;ne<U;ne++)ye=L[ne],S.format!==xn?Pe!==null?oe?t.compressedTexSubImage2D(r.TEXTURE_2D,ne,0,0,ye.width,ye.height,Pe,ye.data):t.compressedTexImage2D(r.TEXTURE_2D,ne,Te,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?t.texSubImage2D(r.TEXTURE_2D,ne,0,0,ye.width,ye.height,Pe,we,ye.data):t.texImage2D(r.TEXTURE_2D,ne,Te,ye.width,ye.height,0,Pe,we,ye.data)}else if(S.isDataArrayTexture)oe?(Re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,Te,ee.width,ee.height,ee.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,Pe,we,ee.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Te,ee.width,ee.height,ee.depth,0,Pe,we,ee.data);else if(S.isData3DTexture)oe?(Re&&t.texStorage3D(r.TEXTURE_3D,xe,Te,ee.width,ee.height,ee.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,Pe,we,ee.data)):t.texImage3D(r.TEXTURE_3D,0,Te,ee.width,ee.height,ee.depth,0,Pe,we,ee.data);else if(S.isFramebufferTexture){if(Re)if(oe)t.texStorage2D(r.TEXTURE_2D,xe,Te,ee.width,ee.height);else{let ne=ee.width,U=ee.height;for(let he=0;he<xe;he++)t.texImage2D(r.TEXTURE_2D,he,Te,ne,U,0,Pe,we,null),ne>>=1,U>>=1}}else if(L.length>0&&Ue){oe&&Re&&t.texStorage2D(r.TEXTURE_2D,xe,Te,L[0].width,L[0].height);for(let ne=0,U=L.length;ne<U;ne++)ye=L[ne],oe?t.texSubImage2D(r.TEXTURE_2D,ne,0,0,Pe,we,ye):t.texImage2D(r.TEXTURE_2D,ne,Te,Pe,we,ye);S.generateMipmaps=!1}else oe?(Re&&t.texStorage2D(r.TEXTURE_2D,xe,Te,ee.width,ee.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Pe,we,ee)):t.texImage2D(r.TEXTURE_2D,0,Te,Pe,we,ee);x(S,Ue)&&v(se),be.__version=re.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ae(R,S,V){if(S.image.length!==6)return;const se=W(R,S),ie=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+V);const re=n.get(ie);if(ie.version!==re.__version||se===!0){t.activeTexture(r.TEXTURE0+V);const be=et.getPrimaries(et.workingColorSpace),ue=S.colorSpace===Mn?null:et.getPrimaries(S.colorSpace),ce=S.colorSpace===Mn||be===ue?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const pe=S.isCompressedTexture||S.image[0].isCompressedTexture,Ae=S.image[0]&&S.image[0].isDataTexture,ee=[];for(let ne=0;ne<6;ne++)!pe&&!Ae?ee[ne]=g(S.image[ne],!1,!0,i.maxCubemapSize):ee[ne]=Ae?S.image[ne].image:S.image[ne],ee[ne]=Ce(S,ee[ne]);const Ue=ee[0],Pe=p(Ue)||o,we=s.convert(S.format,S.colorSpace),Te=s.convert(S.type),ye=M(S.internalFormat,we,Te,S.colorSpace),L=o&&S.isVideoTexture!==!0,oe=re.__version===void 0||se===!0;let Re=T(S,Ue,Pe);F(r.TEXTURE_CUBE_MAP,S,Pe);let xe;if(pe){L&&oe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,ye,Ue.width,Ue.height);for(let ne=0;ne<6;ne++){xe=ee[ne].mipmaps;for(let U=0;U<xe.length;U++){const he=xe[U];S.format!==xn?we!==null?L?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,0,0,he.width,he.height,we,he.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,ye,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,0,0,he.width,he.height,we,Te,he.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,ye,he.width,he.height,0,we,Te,he.data)}}}else{xe=S.mipmaps,L&&oe&&(xe.length>0&&Re++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,ye,ee[0].width,ee[0].height));for(let ne=0;ne<6;ne++)if(Ae){L?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ee[ne].width,ee[ne].height,we,Te,ee[ne].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ye,ee[ne].width,ee[ne].height,0,we,Te,ee[ne].data);for(let U=0;U<xe.length;U++){const ve=xe[U].image[ne].image;L?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,0,0,ve.width,ve.height,we,Te,ve.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,ye,ve.width,ve.height,0,we,Te,ve.data)}}else{L?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,we,Te,ee[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ye,we,Te,ee[ne]);for(let U=0;U<xe.length;U++){const he=xe[U];L?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,0,0,we,Te,he.image[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,ye,we,Te,he.image[ne])}}}x(S,Pe)&&v(r.TEXTURE_CUBE_MAP),re.__version=ie.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function te(R,S,V,se,ie,re){const be=s.convert(V.format,V.colorSpace),ue=s.convert(V.type),ce=M(V.internalFormat,be,ue,V.colorSpace);if(!n.get(S).__hasExternalTextures){const Ae=Math.max(1,S.width>>re),ee=Math.max(1,S.height>>re);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,re,ce,Ae,ee,S.depth,0,be,ue,null):t.texImage2D(ie,re,ce,Ae,ee,0,be,ue,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),_e(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,se,ie,n.get(V).__webglTexture,0,Ee(S)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,se,ie,n.get(V).__webglTexture,re),t.bindFramebuffer(r.FRAMEBUFFER,null)}function de(R,S,V){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer&&!S.stencilBuffer){let se=o===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(V||_e(S)){const ie=S.depthTexture;ie&&ie.isDepthTexture&&(ie.type===ti?se=r.DEPTH_COMPONENT32F:ie.type===_i&&(se=r.DEPTH_COMPONENT24));const re=Ee(S);_e(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,re,se,S.width,S.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,re,se,S.width,S.height)}else r.renderbufferStorage(r.RENDERBUFFER,se,S.width,S.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,R)}else if(S.depthBuffer&&S.stencilBuffer){const se=Ee(S);V&&_e(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,se,r.DEPTH24_STENCIL8,S.width,S.height):_e(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,se,r.DEPTH24_STENCIL8,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,R)}else{const se=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ie=0;ie<se.length;ie++){const re=se[ie],be=s.convert(re.format,re.colorSpace),ue=s.convert(re.type),ce=M(re.internalFormat,be,ue,re.colorSpace),pe=Ee(S);V&&_e(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,pe,ce,S.width,S.height):_e(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,pe,ce,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,ce,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ge(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),G(S.depthTexture,0);const se=n.get(S.depthTexture).__webglTexture,ie=Ee(S);if(S.depthTexture.format===ji)_e(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,se,0,ie):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,se,0);else if(S.depthTexture.format===Hs)_e(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,se,0,ie):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function fe(R){const S=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");ge(S.__webglFramebuffer,R)}else if(V){S.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[se]),S.__webglDepthbuffer[se]=r.createRenderbuffer(),de(S.__webglDepthbuffer[se],R,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=r.createRenderbuffer(),de(S.__webglDepthbuffer,R,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Se(R,S,V){const se=n.get(R);S!==void 0&&te(se.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&fe(R)}function k(R){const S=R.texture,V=n.get(R),se=n.get(S);R.addEventListener("dispose",P),R.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=r.createTexture()),se.__version=S.version,a.memory.textures++);const ie=R.isWebGLCubeRenderTarget===!0,re=R.isWebGLMultipleRenderTargets===!0,be=p(R)||o;if(ie){V.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(o&&S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[ue]=[];for(let ce=0;ce<S.mipmaps.length;ce++)V.__webglFramebuffer[ue][ce]=r.createFramebuffer()}else V.__webglFramebuffer[ue]=r.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let ue=0;ue<S.mipmaps.length;ue++)V.__webglFramebuffer[ue]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(re)if(i.drawBuffers){const ue=R.texture;for(let ce=0,pe=ue.length;ce<pe;ce++){const Ae=n.get(ue[ce]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&_e(R)===!1){const ue=re?S:[S];V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ce=0;ce<ue.length;ce++){const pe=ue[ce];V.__webglColorRenderbuffer[ce]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[ce]);const Ae=s.convert(pe.format,pe.colorSpace),ee=s.convert(pe.type),Ue=M(pe.internalFormat,Ae,ee,pe.colorSpace,R.isXRRenderTarget===!0),Pe=Ee(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Pe,Ue,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.RENDERBUFFER,V.__webglColorRenderbuffer[ce])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),de(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ie){t.bindTexture(r.TEXTURE_CUBE_MAP,se.__webglTexture),F(r.TEXTURE_CUBE_MAP,S,be);for(let ue=0;ue<6;ue++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let ce=0;ce<S.mipmaps.length;ce++)te(V.__webglFramebuffer[ue][ce],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ce);else te(V.__webglFramebuffer[ue],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);x(S,be)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){const ue=R.texture;for(let ce=0,pe=ue.length;ce<pe;ce++){const Ae=ue[ce],ee=n.get(Ae);t.bindTexture(r.TEXTURE_2D,ee.__webglTexture),F(r.TEXTURE_2D,Ae,be),te(V.__webglFramebuffer,R,Ae,r.COLOR_ATTACHMENT0+ce,r.TEXTURE_2D,0),x(Ae,be)&&v(r.TEXTURE_2D)}t.unbindTexture()}else{let ue=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?ue=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,se.__webglTexture),F(ue,S,be),o&&S.mipmaps&&S.mipmaps.length>0)for(let ce=0;ce<S.mipmaps.length;ce++)te(V.__webglFramebuffer[ce],R,S,r.COLOR_ATTACHMENT0,ue,ce);else te(V.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,ue,0);x(S,be)&&v(ue),t.unbindTexture()}R.depthBuffer&&fe(R)}function Ve(R){const S=p(R)||o,V=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let se=0,ie=V.length;se<ie;se++){const re=V[se];if(x(re,S)){const be=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ue=n.get(re).__webglTexture;t.bindTexture(be,ue),v(be),t.unbindTexture()}}}function le(R){if(o&&R.samples>0&&_e(R)===!1){const S=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],V=R.width,se=R.height;let ie=r.COLOR_BUFFER_BIT;const re=[],be=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ue=n.get(R),ce=R.isWebGLMultipleRenderTargets===!0;if(ce)for(let pe=0;pe<S.length;pe++)t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let pe=0;pe<S.length;pe++){re.push(r.COLOR_ATTACHMENT0+pe),R.depthBuffer&&re.push(be);const Ae=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(Ae===!1&&(R.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),ce&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ue.__webglColorRenderbuffer[pe]),Ae===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[be]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[be])),ce){const ee=n.get(S[pe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ee,0)}r.blitFramebuffer(0,0,V,se,0,0,V,se,ie,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,re)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ce)for(let pe=0;pe<S.length;pe++){t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,ue.__webglColorRenderbuffer[pe]);const Ae=n.get(S[pe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.TEXTURE_2D,Ae,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function Ee(R){return Math.min(i.maxSamples,R.samples)}function _e(R){const S=n.get(R);return o&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function He(R){const S=a.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function Ce(R,S){const V=R.colorSpace,se=R.format,ie=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===nl||V!==Lt&&V!==Mn&&(et.getTransfer(V)===ot?o===!1?e.has("EXT_sRGB")===!0&&se===xn?(R.format=nl,R.minFilter=Zt,R.generateMipmaps=!1):S=rd.sRGBToLinear(S):(se!==xn||ie!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),S}this.allocateTextureUnit=D,this.resetTextureUnits=$,this.setTexture2D=G,this.setTexture2DArray=K,this.setTexture3D=Z,this.setTextureCube=J,this.rebindTextures=Se,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=te,this.useMultisampledRTT=_e}function ny(r,e,t){const n=t.isWebGL2;function i(s,a=Mn){let o;const l=et.getTransfer(a);if(s===bi)return r.UNSIGNED_BYTE;if(s===ju)return r.UNSIGNED_SHORT_4_4_4_4;if(s===$u)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Ep)return r.BYTE;if(s===bp)return r.SHORT;if(s===Cl)return r.UNSIGNED_SHORT;if(s===Yu)return r.INT;if(s===_i)return r.UNSIGNED_INT;if(s===ti)return r.FLOAT;if(s===Rr)return n?r.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Tp)return r.ALPHA;if(s===xn)return r.RGBA;if(s===Ap)return r.LUMINANCE;if(s===wp)return r.LUMINANCE_ALPHA;if(s===ji)return r.DEPTH_COMPONENT;if(s===Hs)return r.DEPTH_STENCIL;if(s===nl)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Rp)return r.RED;if(s===Ku)return r.RED_INTEGER;if(s===Cp)return r.RG;if(s===Zu)return r.RG_INTEGER;if(s===Ju)return r.RGBA_INTEGER;if(s===eo||s===to||s===no||s===io)if(l===ot)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===eo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===to)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===no)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===io)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===eo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===to)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===no)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===io)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Tc||s===Ac||s===wc||s===Rc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Tc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ac)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===wc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Rc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Qu)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Cc||s===Pc)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Cc)return l===ot?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Pc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Lc||s===Ic||s===Dc||s===Nc||s===Uc||s===Oc||s===Fc||s===Bc||s===kc||s===zc||s===Hc||s===Gc||s===Vc||s===Wc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Lc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ic)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Dc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Nc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Uc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Oc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Fc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Bc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===kc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===zc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Hc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Gc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Vc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Wc)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===so||s===Xc||s===qc)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===so)return l===ot?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Xc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Pp||s===Yc||s===jc||s===$c)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===so)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Yc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===$c)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Yi?n?r.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class iy extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class zt extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sy={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,n),m=this._getHandJoint(c,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,_=.005;c.inputState.pinching&&d>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sy)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ry extends is{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,_=null;const g=t.getContextAttributes();let p=null,m=null;const x=[],v=[],M=new De;let T=null;const A=new Jt;A.layers.enable(1),A.viewport=new rt;const E=new Jt;E.layers.enable(2),E.viewport=new rt;const P=[A,E],y=new iy;y.layers.enable(1),y.layers.enable(2);let b=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let W=x[F];return W===void 0&&(W=new Co,x[F]=W),W.getTargetRaySpace()},this.getControllerGrip=function(F){let W=x[F];return W===void 0&&(W=new Co,x[F]=W),W.getGripSpace()},this.getHand=function(F){let W=x[F];return W===void 0&&(W=new Co,x[F]=W),W.getHandSpace()};function z(F){const W=v.indexOf(F.inputSource);if(W===-1)return;const Q=x[W];Q!==void 0&&(Q.update(F.inputSource,F.frame,c||a),Q.dispatchEvent({type:F.type,data:F.inputSource}))}function $(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",D);for(let F=0;F<x.length;F++){const W=v[F];W!==null&&(v[F]=null,x[F].disconnect(W))}b=null,O=null,e.setRenderTarget(p),f=null,d=null,u=null,i=null,m=null,j.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){s=F,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(F){c=F},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(F){if(i=F,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",$),i.addEventListener("inputsourceschange",D),g.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(M),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const W={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,W),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new ts(f.framebufferWidth,f.framebufferHeight,{format:xn,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let W=null,Q=null,ae=null;g.depth&&(ae=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,W=g.stencil?Hs:ji,Q=g.stencil?Yi:_i);const te={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),m=new ts(d.textureWidth,d.textureHeight,{format:xn,type:bi,depthTexture:new md(d.textureWidth,d.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const de=e.properties.get(m);de.__ignoreDepthValues=d.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),j.setContext(i),j.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function D(F){for(let W=0;W<F.removed.length;W++){const Q=F.removed[W],ae=v.indexOf(Q);ae>=0&&(v[ae]=null,x[ae].disconnect(Q))}for(let W=0;W<F.added.length;W++){const Q=F.added[W];let ae=v.indexOf(Q);if(ae===-1){for(let de=0;de<x.length;de++)if(de>=v.length){v.push(Q),ae=de;break}else if(v[de]===null){v[de]=Q,ae=de;break}if(ae===-1)break}const te=x[ae];te&&te.connect(Q)}}const B=new N,G=new N;function K(F,W,Q){B.setFromMatrixPosition(W.matrixWorld),G.setFromMatrixPosition(Q.matrixWorld);const ae=B.distanceTo(G),te=W.projectionMatrix.elements,de=Q.projectionMatrix.elements,ge=te[14]/(te[10]-1),fe=te[14]/(te[10]+1),Se=(te[9]+1)/te[5],k=(te[9]-1)/te[5],Ve=(te[8]-1)/te[0],le=(de[8]+1)/de[0],Ee=ge*Ve,_e=ge*le,He=ae/(-Ve+le),Ce=He*-Ve;W.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(Ce),F.translateZ(He),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert();const R=ge+He,S=fe+He,V=Ee-Ce,se=_e+(ae-Ce),ie=Se*fe/S*R,re=k*fe/S*R;F.projectionMatrix.makePerspective(V,se,ie,re,R,S),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}function Z(F,W){W===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(W.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(i===null)return;y.near=E.near=A.near=F.near,y.far=E.far=A.far=F.far,(b!==y.near||O!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,O=y.far);const W=F.parent,Q=y.cameras;Z(y,W);for(let ae=0;ae<Q.length;ae++)Z(Q[ae],W);Q.length===2?K(y,A,E):y.projectionMatrix.copy(A.projectionMatrix),J(F,y,W)};function J(F,W,Q){Q===null?F.matrix.copy(W.matrixWorld):(F.matrix.copy(Q.matrixWorld),F.matrix.invert(),F.matrix.multiply(W.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(W.projectionMatrix),F.projectionMatrixInverse.copy(W.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Vs*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(F){l=F,d!==null&&(d.fixedFoveation=F),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=F)};let I=null;function C(F,W){if(h=W.getViewerPose(c||a),_=W,h!==null){const Q=h.views;f!==null&&(e.setRenderTargetFramebuffer(m,f.framebuffer),e.setRenderTarget(m));let ae=!1;Q.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let te=0;te<Q.length;te++){const de=Q[te];let ge=null;if(f!==null)ge=f.getViewport(de);else{const Se=u.getViewSubImage(d,de);ge=Se.viewport,te===0&&(e.setRenderTargetTextures(m,Se.colorTexture,d.ignoreDepthValues?void 0:Se.depthStencilTexture),e.setRenderTarget(m))}let fe=P[te];fe===void 0&&(fe=new Jt,fe.layers.enable(te),fe.viewport=new rt,P[te]=fe),fe.matrix.fromArray(de.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(de.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(ge.x,ge.y,ge.width,ge.height),te===0&&(y.matrix.copy(fe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(fe)}}for(let Q=0;Q<x.length;Q++){const ae=v[Q],te=x[Q];ae!==null&&te!==void 0&&te.update(ae,W,c||a)}I&&I(F,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),_=null}const j=new pd;j.setAnimationLoop(C),this.setAnimationLoop=function(F){I=F},this.dispose=function(){}}}function ay(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,ud(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,x,v,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),u(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,x,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Yt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Yt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=e.get(m).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Yt&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function oy(r,e,t,n){let i={},s={},a=[];const o=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const M=v.program;n.uniformBlockBinding(x,M)}function c(x,v){let M=i[x.id];M===void 0&&(_(x),M=h(x),i[x.id]=M,x.addEventListener("dispose",p));const T=v.program;n.updateUBOMapping(x,T);const A=e.render.frame;s[x.id]!==A&&(d(x),s[x.id]=A)}function h(x){const v=u();x.__bindingPointIndex=v;const M=r.createBuffer(),T=x.__size,A=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,T,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,M),M}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=i[x.id],M=x.uniforms,T=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let A=0,E=M.length;A<E;A++){const P=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,b=P.length;y<b;y++){const O=P[y];if(f(O,A,y,T)===!0){const z=O.__offset,$=Array.isArray(O.value)?O.value:[O.value];let D=0;for(let B=0;B<$.length;B++){const G=$[B],K=g(G);typeof G=="number"||typeof G=="boolean"?(O.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,z+D,O.__data)):G.isMatrix3?(O.__data[0]=G.elements[0],O.__data[1]=G.elements[1],O.__data[2]=G.elements[2],O.__data[3]=0,O.__data[4]=G.elements[3],O.__data[5]=G.elements[4],O.__data[6]=G.elements[5],O.__data[7]=0,O.__data[8]=G.elements[6],O.__data[9]=G.elements[7],O.__data[10]=G.elements[8],O.__data[11]=0):(G.toArray(O.__data,D),D+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,z,O.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,v,M,T){const A=x.value,E=v+"_"+M;if(T[E]===void 0)return typeof A=="number"||typeof A=="boolean"?T[E]=A:T[E]=A.clone(),!0;{const P=T[E];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return T[E]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function _(x){const v=x.uniforms;let M=0;const T=16;for(let E=0,P=v.length;E<P;E++){const y=Array.isArray(v[E])?v[E]:[v[E]];for(let b=0,O=y.length;b<O;b++){const z=y[b],$=Array.isArray(z.value)?z.value:[z.value];for(let D=0,B=$.length;D<B;D++){const G=$[D],K=g(G),Z=M%T;Z!==0&&T-Z<K.boundary&&(M+=T-Z),z.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=M,M+=K.storage}}}const A=M%T;return A>0&&(M+=T-A),x.__size=M,x.__cache={},this}function g(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const M=a.indexOf(v.__bindingPointIndex);a.splice(M,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const x in i)r.deleteBuffer(i[x]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class Md{constructor(e={}){const{canvas:t=im(),context:n=null,depth:i=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const f=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const m=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ft,this._useLegacyLights=!1,this.toneMapping=Ei,this.toneMappingExposure=1;const v=this;let M=!1,T=0,A=0,E=null,P=-1,y=null;const b=new rt,O=new rt;let z=null;const $=new Ie(0);let D=0,B=t.width,G=t.height,K=1,Z=null,J=null;const I=new rt(0,0,B,G),C=new rt(0,0,B,G);let j=!1;const F=new Dl;let W=!1,Q=!1,ae=null;const te=new ke,de=new De,ge=new N,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Se(){return E===null?K:1}let k=n;function Ve(w,H){for(let q=0;q<w.length;q++){const Y=w[q],X=t.getContext(Y,H);if(X!==null)return X}return null}try{const w={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Rl}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",U,!1),t.addEventListener("webglcontextcreationerror",he,!1),k===null){const H=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&H.shift(),k=Ve(H,w),k===null)throw Ve(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let le,Ee,_e,He,Ce,R,S,V,se,ie,re,be,ue,ce,pe,Ae,ee,Ue,Pe,we,Te,ye,L,oe;function Re(){le=new _0(k),Ee=new u0(k,le,e),le.init(Ee),ye=new ny(k,le,Ee),_e=new ey(k,le,Ee),He=new x0(k),Ce=new zv,R=new ty(k,le,_e,Ce,Ee,ye,He),S=new f0(v),V=new g0(v),se=new Rm(k,Ee),L=new c0(k,le,se,Ee),ie=new v0(k,se,He,L),re=new b0(k,ie,se,He),Pe=new E0(k,Ee,R),Ae=new d0(Ce),be=new kv(v,S,V,le,Ee,L,Ae),ue=new ay(v,Ce),ce=new Gv,pe=new jv(le,Ee),Ue=new l0(v,S,V,_e,re,d,l),ee=new Qv(v,re,Ee),oe=new oy(k,He,Ee,_e),we=new h0(k,le,He,Ee),Te=new y0(k,le,He,Ee),He.programs=be.programs,v.capabilities=Ee,v.extensions=le,v.properties=Ce,v.renderLists=ce,v.shadowMap=ee,v.state=_e,v.info=He}Re();const xe=new ry(v,k);this.xr=xe,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const w=le.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=le.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(w){w!==void 0&&(K=w,this.setSize(B,G,!1))},this.getSize=function(w){return w.set(B,G)},this.setSize=function(w,H,q=!0){if(xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=w,G=H,t.width=Math.floor(w*K),t.height=Math.floor(H*K),q===!0&&(t.style.width=w+"px",t.style.height=H+"px"),this.setViewport(0,0,w,H)},this.getDrawingBufferSize=function(w){return w.set(B*K,G*K).floor()},this.setDrawingBufferSize=function(w,H,q){B=w,G=H,K=q,t.width=Math.floor(w*q),t.height=Math.floor(H*q),this.setViewport(0,0,w,H)},this.getCurrentViewport=function(w){return w.copy(b)},this.getViewport=function(w){return w.copy(I)},this.setViewport=function(w,H,q,Y){w.isVector4?I.set(w.x,w.y,w.z,w.w):I.set(w,H,q,Y),_e.viewport(b.copy(I).multiplyScalar(K).floor())},this.getScissor=function(w){return w.copy(C)},this.setScissor=function(w,H,q,Y){w.isVector4?C.set(w.x,w.y,w.z,w.w):C.set(w,H,q,Y),_e.scissor(O.copy(C).multiplyScalar(K).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(w){_e.setScissorTest(j=w)},this.setOpaqueSort=function(w){Z=w},this.setTransparentSort=function(w){J=w},this.getClearColor=function(w){return w.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor.apply(Ue,arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha.apply(Ue,arguments)},this.clear=function(w=!0,H=!0,q=!0){let Y=0;if(w){let X=!1;if(E!==null){const Me=E.texture.format;X=Me===Ju||Me===Zu||Me===Ku}if(X){const Me=E.texture.type,Le=Me===bi||Me===_i||Me===Cl||Me===Yi||Me===ju||Me===$u,Fe=Ue.getClearColor(),Be=Ue.getClearAlpha(),Xe=Fe.r,ze=Fe.g,Ge=Fe.b;Le?(f[0]=Xe,f[1]=ze,f[2]=Ge,f[3]=Be,k.clearBufferuiv(k.COLOR,0,f)):(_[0]=Xe,_[1]=ze,_[2]=Ge,_[3]=Be,k.clearBufferiv(k.COLOR,0,_))}else Y|=k.COLOR_BUFFER_BIT}H&&(Y|=k.DEPTH_BUFFER_BIT),q&&(Y|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",U,!1),t.removeEventListener("webglcontextcreationerror",he,!1),ce.dispose(),pe.dispose(),Ce.dispose(),S.dispose(),V.dispose(),re.dispose(),L.dispose(),oe.dispose(),be.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",yt),xe.removeEventListener("sessionend",Je),ae&&(ae.dispose(),ae=null),St.stop()};function ne(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const w=He.autoReset,H=ee.enabled,q=ee.autoUpdate,Y=ee.needsUpdate,X=ee.type;Re(),He.autoReset=w,ee.enabled=H,ee.autoUpdate=q,ee.needsUpdate=Y,ee.type=X}function he(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ve(w){const H=w.target;H.removeEventListener("dispose",ve),Oe(H)}function Oe(w){Ne(w),Ce.remove(w)}function Ne(w){const H=Ce.get(w).programs;H!==void 0&&(H.forEach(function(q){be.releaseProgram(q)}),w.isShaderMaterial&&be.releaseShaderCache(w))}this.renderBufferDirect=function(w,H,q,Y,X,Me){H===null&&(H=fe);const Le=X.isMesh&&X.matrixWorld.determinant()<0,Fe=If(w,H,q,Y,X);_e.setMaterial(Y,Le);let Be=q.index,Xe=1;if(Y.wireframe===!0){if(Be=ie.getWireframeAttribute(q),Be===void 0)return;Xe=2}const ze=q.drawRange,Ge=q.attributes.position;let xt=ze.start*Xe,rn=(ze.start+ze.count)*Xe;Me!==null&&(xt=Math.max(xt,Me.start*Xe),rn=Math.min(rn,(Me.start+Me.count)*Xe)),Be!==null?(xt=Math.max(xt,0),rn=Math.min(rn,Be.count)):Ge!=null&&(xt=Math.max(xt,0),rn=Math.min(rn,Ge.count));const Rt=rn-xt;if(Rt<0||Rt===1/0)return;L.setup(X,Y,Fe,q,Be);let Wn,ht=we;if(Be!==null&&(Wn=se.get(Be),ht=Te,ht.setIndex(Wn)),X.isMesh)Y.wireframe===!0?(_e.setLineWidth(Y.wireframeLinewidth*Se()),ht.setMode(k.LINES)):ht.setMode(k.TRIANGLES);else if(X.isLine){let qe=Y.linewidth;qe===void 0&&(qe=1),_e.setLineWidth(qe*Se()),X.isLineSegments?ht.setMode(k.LINES):X.isLineLoop?ht.setMode(k.LINE_LOOP):ht.setMode(k.LINE_STRIP)}else X.isPoints?ht.setMode(k.POINTS):X.isSprite&&ht.setMode(k.TRIANGLES);if(X.isBatchedMesh)ht.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else if(X.isInstancedMesh)ht.renderInstances(xt,Rt,X.count);else if(q.isInstancedBufferGeometry){const qe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ya=Math.min(q.instanceCount,qe);ht.renderInstances(xt,Rt,Ya)}else ht.render(xt,Rt)};function je(w,H,q){w.transparent===!0&&w.side===In&&w.forceSinglePass===!1?(w.side=Yt,w.needsUpdate=!0,Gr(w,H,q),w.side=ii,w.needsUpdate=!0,Gr(w,H,q),w.side=In):Gr(w,H,q)}this.compile=function(w,H,q=null){q===null&&(q=w),p=pe.get(q),p.init(),x.push(p),q.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),w!==q&&w.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights(v._useLegacyLights);const Y=new Set;return w.traverse(function(X){const Me=X.material;if(Me)if(Array.isArray(Me))for(let Le=0;Le<Me.length;Le++){const Fe=Me[Le];je(Fe,q,X),Y.add(Fe)}else je(Me,q,X),Y.add(Me)}),x.pop(),p=null,Y},this.compileAsync=function(w,H,q=null){const Y=this.compile(w,H,q);return new Promise(X=>{function Me(){if(Y.forEach(function(Le){Ce.get(Le).currentProgram.isReady()&&Y.delete(Le)}),Y.size===0){X(w);return}setTimeout(Me,10)}le.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let $e=null;function mt(w){$e&&$e(w)}function yt(){St.stop()}function Je(){St.start()}const St=new pd;St.setAnimationLoop(mt),typeof self<"u"&&St.setContext(self),this.setAnimationLoop=function(w){$e=w,xe.setAnimationLoop(w),w===null?St.stop():St.start()},xe.addEventListener("sessionstart",yt),xe.addEventListener("sessionend",Je),this.render=function(w,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(H),H=xe.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,H,E),p=pe.get(w,x.length),p.init(),x.push(p),te.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),F.setFromProjectionMatrix(te),Q=this.localClippingEnabled,W=Ae.init(this.clippingPlanes,Q),g=ce.get(w,m.length),g.init(),m.push(g),Nn(w,H,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(Z,J),this.info.render.frame++,W===!0&&Ae.beginShadows();const q=p.state.shadowsArray;if(ee.render(q,w,H),W===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ue.render(g,w),p.setupLights(v._useLegacyLights),H.isArrayCamera){const Y=H.cameras;for(let X=0,Me=Y.length;X<Me;X++){const Le=Y[X];uc(g,w,Le,Le.viewport)}}else uc(g,w,H);E!==null&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),w.isScene===!0&&w.onAfterRender(v,w,H),L.resetDefaultState(),P=-1,y=null,x.pop(),x.length>0?p=x[x.length-1]:p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function Nn(w,H,q,Y){if(w.visible===!1)return;if(w.layers.test(H.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(H);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||F.intersectsSprite(w)){Y&&ge.setFromMatrixPosition(w.matrixWorld).applyMatrix4(te);const Le=re.update(w),Fe=w.material;Fe.visible&&g.push(w,Le,Fe,q,ge.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||F.intersectsObject(w))){const Le=re.update(w),Fe=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ge.copy(w.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),ge.copy(Le.boundingSphere.center)),ge.applyMatrix4(w.matrixWorld).applyMatrix4(te)),Array.isArray(Fe)){const Be=Le.groups;for(let Xe=0,ze=Be.length;Xe<ze;Xe++){const Ge=Be[Xe],xt=Fe[Ge.materialIndex];xt&&xt.visible&&g.push(w,Le,xt,q,ge.z,Ge)}}else Fe.visible&&g.push(w,Le,Fe,q,ge.z,null)}}const Me=w.children;for(let Le=0,Fe=Me.length;Le<Fe;Le++)Nn(Me[Le],H,q,Y)}function uc(w,H,q,Y){const X=w.opaque,Me=w.transmissive,Le=w.transparent;p.setupLightsView(q),W===!0&&Ae.setGlobalState(v.clippingPlanes,q),Me.length>0&&Lf(X,Me,H,q),Y&&_e.viewport(b.copy(Y)),X.length>0&&Hr(X,H,q),Me.length>0&&Hr(Me,H,q),Le.length>0&&Hr(Le,H,q),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Lf(w,H,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;const Me=Ee.isWebGL2;ae===null&&(ae=new ts(1,1,{generateMipmaps:!0,type:le.has("EXT_color_buffer_half_float")?Rr:bi,minFilter:es,samples:Me?4:0})),v.getDrawingBufferSize(de),Me?ae.setSize(de.x,de.y):ae.setSize(Pa(de.x),Pa(de.y));const Le=v.getRenderTarget();v.setRenderTarget(ae),v.getClearColor($),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const Fe=v.toneMapping;v.toneMapping=Ei,Hr(w,q,Y),R.updateMultisampleRenderTarget(ae),R.updateRenderTargetMipmap(ae);let Be=!1;for(let Xe=0,ze=H.length;Xe<ze;Xe++){const Ge=H[Xe],xt=Ge.object,rn=Ge.geometry,Rt=Ge.material,Wn=Ge.group;if(Rt.side===In&&xt.layers.test(Y.layers)){const ht=Rt.side;Rt.side=Yt,Rt.needsUpdate=!0,dc(xt,q,Y,rn,Rt,Wn),Rt.side=ht,Rt.needsUpdate=!0,Be=!0}}Be===!0&&(R.updateMultisampleRenderTarget(ae),R.updateRenderTargetMipmap(ae)),v.setRenderTarget(Le),v.setClearColor($,D),v.toneMapping=Fe}function Hr(w,H,q){const Y=H.isScene===!0?H.overrideMaterial:null;for(let X=0,Me=w.length;X<Me;X++){const Le=w[X],Fe=Le.object,Be=Le.geometry,Xe=Y===null?Le.material:Y,ze=Le.group;Fe.layers.test(q.layers)&&dc(Fe,H,q,Be,Xe,ze)}}function dc(w,H,q,Y,X,Me){w.onBeforeRender(v,H,q,Y,X,Me),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),X.onBeforeRender(v,H,q,Y,w,Me),X.transparent===!0&&X.side===In&&X.forceSinglePass===!1?(X.side=Yt,X.needsUpdate=!0,v.renderBufferDirect(q,H,Y,X,w,Me),X.side=ii,X.needsUpdate=!0,v.renderBufferDirect(q,H,Y,X,w,Me),X.side=In):v.renderBufferDirect(q,H,Y,X,w,Me),w.onAfterRender(v,H,q,Y,X,Me)}function Gr(w,H,q){H.isScene!==!0&&(H=fe);const Y=Ce.get(w),X=p.state.lights,Me=p.state.shadowsArray,Le=X.state.version,Fe=be.getParameters(w,X.state,Me,H,q),Be=be.getProgramCacheKey(Fe);let Xe=Y.programs;Y.environment=w.isMeshStandardMaterial?H.environment:null,Y.fog=H.fog,Y.envMap=(w.isMeshStandardMaterial?V:S).get(w.envMap||Y.environment),Xe===void 0&&(w.addEventListener("dispose",ve),Xe=new Map,Y.programs=Xe);let ze=Xe.get(Be);if(ze!==void 0){if(Y.currentProgram===ze&&Y.lightsStateVersion===Le)return pc(w,Fe),ze}else Fe.uniforms=be.getUniforms(w),w.onBuild(q,Fe,v),w.onBeforeCompile(Fe,v),ze=be.acquireProgram(Fe,Be),Xe.set(Be,ze),Y.uniforms=Fe.uniforms;const Ge=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ge.clippingPlanes=Ae.uniform),pc(w,Fe),Y.needsLights=Nf(w),Y.lightsStateVersion=Le,Y.needsLights&&(Ge.ambientLightColor.value=X.state.ambient,Ge.lightProbe.value=X.state.probe,Ge.directionalLights.value=X.state.directional,Ge.directionalLightShadows.value=X.state.directionalShadow,Ge.spotLights.value=X.state.spot,Ge.spotLightShadows.value=X.state.spotShadow,Ge.rectAreaLights.value=X.state.rectArea,Ge.ltc_1.value=X.state.rectAreaLTC1,Ge.ltc_2.value=X.state.rectAreaLTC2,Ge.pointLights.value=X.state.point,Ge.pointLightShadows.value=X.state.pointShadow,Ge.hemisphereLights.value=X.state.hemi,Ge.directionalShadowMap.value=X.state.directionalShadowMap,Ge.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ge.spotShadowMap.value=X.state.spotShadowMap,Ge.spotLightMatrix.value=X.state.spotLightMatrix,Ge.spotLightMap.value=X.state.spotLightMap,Ge.pointShadowMap.value=X.state.pointShadowMap,Ge.pointShadowMatrix.value=X.state.pointShadowMatrix),Y.currentProgram=ze,Y.uniformsList=null,ze}function fc(w){if(w.uniformsList===null){const H=w.currentProgram.getUniforms();w.uniformsList=xa.seqWithValue(H.seq,w.uniforms)}return w.uniformsList}function pc(w,H){const q=Ce.get(w);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function If(w,H,q,Y,X){H.isScene!==!0&&(H=fe),R.resetTextureUnits();const Me=H.fog,Le=Y.isMeshStandardMaterial?H.environment:null,Fe=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Lt,Be=(Y.isMeshStandardMaterial?V:S).get(Y.envMap||Le),Xe=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ze=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ge=!!q.morphAttributes.position,xt=!!q.morphAttributes.normal,rn=!!q.morphAttributes.color;let Rt=Ei;Y.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Rt=v.toneMapping);const Wn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ht=Wn!==void 0?Wn.length:0,qe=Ce.get(Y),Ya=p.state.lights;if(W===!0&&(Q===!0||w!==y)){const mn=w===y&&Y.id===P;Ae.setState(Y,w,mn)}let gt=!1;Y.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Ya.state.version||qe.outputColorSpace!==Fe||X.isBatchedMesh&&qe.batching===!1||!X.isBatchedMesh&&qe.batching===!0||X.isInstancedMesh&&qe.instancing===!1||!X.isInstancedMesh&&qe.instancing===!0||X.isSkinnedMesh&&qe.skinning===!1||!X.isSkinnedMesh&&qe.skinning===!0||X.isInstancedMesh&&qe.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&qe.instancingColor===!1&&X.instanceColor!==null||qe.envMap!==Be||Y.fog===!0&&qe.fog!==Me||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Ae.numPlanes||qe.numIntersection!==Ae.numIntersection)||qe.vertexAlphas!==Xe||qe.vertexTangents!==ze||qe.morphTargets!==Ge||qe.morphNormals!==xt||qe.morphColors!==rn||qe.toneMapping!==Rt||Ee.isWebGL2===!0&&qe.morphTargetsCount!==ht)&&(gt=!0):(gt=!0,qe.__version=Y.version);let Ii=qe.currentProgram;gt===!0&&(Ii=Gr(Y,H,X));let mc=!1,ar=!1,ja=!1;const Ft=Ii.getUniforms(),Di=qe.uniforms;if(_e.useProgram(Ii.program)&&(mc=!0,ar=!0,ja=!0),Y.id!==P&&(P=Y.id,ar=!0),mc||y!==w){Ft.setValue(k,"projectionMatrix",w.projectionMatrix),Ft.setValue(k,"viewMatrix",w.matrixWorldInverse);const mn=Ft.map.cameraPosition;mn!==void 0&&mn.setValue(k,ge.setFromMatrixPosition(w.matrixWorld)),Ee.logarithmicDepthBuffer&&Ft.setValue(k,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ft.setValue(k,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,ar=!0,ja=!0)}if(X.isSkinnedMesh){Ft.setOptional(k,X,"bindMatrix"),Ft.setOptional(k,X,"bindMatrixInverse");const mn=X.skeleton;mn&&(Ee.floatVertexTextures?(mn.boneTexture===null&&mn.computeBoneTexture(),Ft.setValue(k,"boneTexture",mn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}X.isBatchedMesh&&(Ft.setOptional(k,X,"batchingTexture"),Ft.setValue(k,"batchingTexture",X._matricesTexture,R));const $a=q.morphAttributes;if(($a.position!==void 0||$a.normal!==void 0||$a.color!==void 0&&Ee.isWebGL2===!0)&&Pe.update(X,q,Ii),(ar||qe.receiveShadow!==X.receiveShadow)&&(qe.receiveShadow=X.receiveShadow,Ft.setValue(k,"receiveShadow",X.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Di.envMap.value=Be,Di.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),ar&&(Ft.setValue(k,"toneMappingExposure",v.toneMappingExposure),qe.needsLights&&Df(Di,ja),Me&&Y.fog===!0&&ue.refreshFogUniforms(Di,Me),ue.refreshMaterialUniforms(Di,Y,K,G,ae),xa.upload(k,fc(qe),Di,R)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(xa.upload(k,fc(qe),Di,R),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ft.setValue(k,"center",X.center),Ft.setValue(k,"modelViewMatrix",X.modelViewMatrix),Ft.setValue(k,"normalMatrix",X.normalMatrix),Ft.setValue(k,"modelMatrix",X.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const mn=Y.uniformsGroups;for(let Ka=0,Uf=mn.length;Ka<Uf;Ka++)if(Ee.isWebGL2){const gc=mn[Ka];oe.update(gc,Ii),oe.bind(gc,Ii)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ii}function Df(w,H){w.ambientLightColor.needsUpdate=H,w.lightProbe.needsUpdate=H,w.directionalLights.needsUpdate=H,w.directionalLightShadows.needsUpdate=H,w.pointLights.needsUpdate=H,w.pointLightShadows.needsUpdate=H,w.spotLights.needsUpdate=H,w.spotLightShadows.needsUpdate=H,w.rectAreaLights.needsUpdate=H,w.hemisphereLights.needsUpdate=H}function Nf(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(w,H,q){Ce.get(w.texture).__webglTexture=H,Ce.get(w.depthTexture).__webglTexture=q;const Y=Ce.get(w);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,H){const q=Ce.get(w);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(w,H=0,q=0){E=w,T=H,A=q;let Y=!0,X=null,Me=!1,Le=!1;if(w){const Be=Ce.get(w);Be.__useDefaultFramebuffer!==void 0?(_e.bindFramebuffer(k.FRAMEBUFFER,null),Y=!1):Be.__webglFramebuffer===void 0?R.setupRenderTarget(w):Be.__hasExternalTextures&&R.rebindTextures(w,Ce.get(w.texture).__webglTexture,Ce.get(w.depthTexture).__webglTexture);const Xe=w.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Le=!0);const ze=Ce.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ze[H])?X=ze[H][q]:X=ze[H],Me=!0):Ee.isWebGL2&&w.samples>0&&R.useMultisampledRTT(w)===!1?X=Ce.get(w).__webglMultisampledFramebuffer:Array.isArray(ze)?X=ze[q]:X=ze,b.copy(w.viewport),O.copy(w.scissor),z=w.scissorTest}else b.copy(I).multiplyScalar(K).floor(),O.copy(C).multiplyScalar(K).floor(),z=j;if(_e.bindFramebuffer(k.FRAMEBUFFER,X)&&Ee.drawBuffers&&Y&&_e.drawBuffers(w,X),_e.viewport(b),_e.scissor(O),_e.setScissorTest(z),Me){const Be=Ce.get(w.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+H,Be.__webglTexture,q)}else if(Le){const Be=Ce.get(w.texture),Xe=H||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Be.__webglTexture,q||0,Xe)}P=-1},this.readRenderTargetPixels=function(w,H,q,Y,X,Me,Le){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=Ce.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe){_e.bindFramebuffer(k.FRAMEBUFFER,Fe);try{const Be=w.texture,Xe=Be.format,ze=Be.type;if(Xe!==xn&&ye.convert(Xe)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ge=ze===Rr&&(le.has("EXT_color_buffer_half_float")||Ee.isWebGL2&&le.has("EXT_color_buffer_float"));if(ze!==bi&&ye.convert(ze)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ze===ti&&(Ee.isWebGL2||le.has("OES_texture_float")||le.has("WEBGL_color_buffer_float")))&&!Ge){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=w.width-Y&&q>=0&&q<=w.height-X&&k.readPixels(H,q,Y,X,ye.convert(Xe),ye.convert(ze),Me)}finally{const Be=E!==null?Ce.get(E).__webglFramebuffer:null;_e.bindFramebuffer(k.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(w,H,q=0){const Y=Math.pow(2,-q),X=Math.floor(H.image.width*Y),Me=Math.floor(H.image.height*Y);R.setTexture2D(H,0),k.copyTexSubImage2D(k.TEXTURE_2D,q,0,0,w.x,w.y,X,Me),_e.unbindTexture()},this.copyTextureToTexture=function(w,H,q,Y=0){const X=H.image.width,Me=H.image.height,Le=ye.convert(q.format),Fe=ye.convert(q.type);R.setTexture2D(q,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,q.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,q.unpackAlignment),H.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Y,w.x,w.y,X,Me,Le,Fe,H.image.data):H.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Y,w.x,w.y,H.mipmaps[0].width,H.mipmaps[0].height,Le,H.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,Y,w.x,w.y,Le,Fe,H.image),Y===0&&q.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),_e.unbindTexture()},this.copyTextureToTexture3D=function(w,H,q,Y,X=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=w.max.x-w.min.x+1,Le=w.max.y-w.min.y+1,Fe=w.max.z-w.min.z+1,Be=ye.convert(Y.format),Xe=ye.convert(Y.type);let ze;if(Y.isData3DTexture)R.setTexture3D(Y,0),ze=k.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)R.setTexture2DArray(Y,0),ze=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,Y.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,Y.unpackAlignment);const Ge=k.getParameter(k.UNPACK_ROW_LENGTH),xt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),rn=k.getParameter(k.UNPACK_SKIP_PIXELS),Rt=k.getParameter(k.UNPACK_SKIP_ROWS),Wn=k.getParameter(k.UNPACK_SKIP_IMAGES),ht=q.isCompressedTexture?q.mipmaps[X]:q.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,ht.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ht.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,w.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,w.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,w.min.z),q.isDataTexture||q.isData3DTexture?k.texSubImage3D(ze,X,H.x,H.y,H.z,Me,Le,Fe,Be,Xe,ht.data):q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(ze,X,H.x,H.y,H.z,Me,Le,Fe,Be,ht.data)):k.texSubImage3D(ze,X,H.x,H.y,H.z,Me,Le,Fe,Be,Xe,ht),k.pixelStorei(k.UNPACK_ROW_LENGTH,Ge),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,xt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,rn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Rt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Wn),X===0&&Y.generateMipmaps&&k.generateMipmap(ze),_e.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),_e.unbindTexture()},this.resetState=function(){T=0,A=0,E=null,_e.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Pl?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===Ha?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ft?$i:td}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===$i?ft:Lt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ly extends Md{}ly.prototype.isWebGL1Renderer=!0;class Ul{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ie(e),this.near=t,this.far=n}clone(){return new Ul(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class cy extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class hy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=tl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new N;class Ol{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ol(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const zh=new N,Hh=new rt,Gh=new rt,uy=new N,Vh=new ke,ua=new N,Po=new Gn,Wh=new ke,Lo=new er;class dy extends Qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=bc,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new bn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ua),this.boundingBox.expandByPoint(ua)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ua),this.boundingSphere.expandByPoint(ua)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Po.copy(this.boundingSphere),Po.applyMatrix4(i),e.ray.intersectsSphere(Po)!==!1&&(Wh.copy(i).invert(),Lo.copy(e.ray).applyMatrix4(Wh),!(this.boundingBox!==null&&Lo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===bc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Sp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Hh.fromBufferAttribute(i.attributes.skinIndex,e),Gh.fromBufferAttribute(i.attributes.skinWeight,e),zh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=Gh.getComponent(s);if(a!==0){const o=Hh.getComponent(s);Vh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(uy.copy(zh).applyMatrix4(Vh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class Sd extends at{constructor(){super(),this.isBone=!0,this.type="Bone"}}class fy extends Ut{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Pt,h=Pt,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xh=new ke,py=new ke;class Fl{constructor(e=[],t=[]){this.uuid=Dn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:py;Xh.multiplyMatrices(o,t[s]),Xh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Fl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new fy(t,e,e,xn,ti);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Sd),this.bones.push(a),this.boneInverses.push(new ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class rl extends jt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Es=new ke,qh=new ke,da=[],Yh=new bn,my=new ke,ur=new Qe,dr=new Gn;class pi extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,my)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new bn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),Yh.copy(e.boundingBox).applyMatrix4(Es),this.boundingBox.union(Yh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),dr.copy(e.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(dr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ur.geometry=this.geometry,ur.material=this.material,ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dr.copy(this.boundingSphere),dr.applyMatrix4(n),e.ray.intersectsSphere(dr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Es),qh.multiplyMatrices(n,Es),ur.matrixWorld=qh,ur.raycast(e,da);for(let a=0,o=da.length;a<o;a++){const l=da[a];l.instanceId=s,l.object=this,t.push(l)}da.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rl(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ed extends Tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const jh=new N,$h=new N,Kh=new ke,Io=new er,fa=new Gn;class Bl extends at{constructor(e=new $t,t=new Ed){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)jh.fromBufferAttribute(t,i-1),$h.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=jh.distanceTo($h);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(i),fa.radius+=s,e.ray.intersectsSphere(fa)===!1)return;Kh.copy(i).invert(),Io.copy(e.ray).applyMatrix4(Kh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new N,h=new N,u=new N,d=new N,f=this.isLineSegments?2:1,_=n.index,p=n.attributes.position;if(_!==null){const m=Math.max(0,a.start),x=Math.min(_.count,a.start+a.count);for(let v=m,M=x-1;v<M;v+=f){const T=_.getX(v),A=_.getX(v+1);if(c.fromBufferAttribute(p,T),h.fromBufferAttribute(p,A),Io.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let v=m,M=x-1;v<M;v+=f){if(c.fromBufferAttribute(p,v),h.fromBufferAttribute(p,v+1),Io.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(d);A<e.near||A>e.far||t.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Zh=new N,Jh=new N;class gy extends Bl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Zh.fromBufferAttribute(t,i),Jh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Zh.distanceTo(Jh);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _y extends Bl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class bd extends Tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Qh=new ke,al=new er,pa=new Gn,ma=new N;class vy extends at{constructor(e=new $t,t=new bd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(i),pa.radius+=s,e.ray.intersectsSphere(pa)===!1)return;Qh.copy(i).invert(),al.copy(e.ray).applyMatrix4(Qh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let _=d,g=f;_<g;_++){const p=c.getX(_);ma.fromBufferAttribute(u,p),eu(ma,p,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let _=d,g=f;_<g;_++)ma.fromBufferAttribute(u,_),eu(ma,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function eu(r,e,t,n,i,s,a){const o=al.distanceSqToPoint(r);if(o<t){const l=new N;al.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Un extends $t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new N,h=new De;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new ct(a,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Xi extends $t{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let _=0;const g=[],p=n/2;let m=0;x(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ct(u,3)),this.setAttribute("normal",new ct(d,3)),this.setAttribute("uv",new ct(f,2));function x(){const M=new N,T=new N;let A=0;const E=(t-e)/n;for(let P=0;P<=s;P++){const y=[],b=P/s,O=b*(t-e)+e;for(let z=0;z<=i;z++){const $=z/i,D=$*l+o,B=Math.sin(D),G=Math.cos(D);T.x=O*B,T.y=-b*n+p,T.z=O*G,u.push(T.x,T.y,T.z),M.set(B,E,G).normalize(),d.push(M.x,M.y,M.z),f.push($,1-b),y.push(_++)}g.push(y)}for(let P=0;P<i;P++)for(let y=0;y<s;y++){const b=g[y][P],O=g[y+1][P],z=g[y+1][P+1],$=g[y][P+1];h.push(b,O,$),h.push(O,z,$),A+=6}c.addGroup(m,A,0),m+=A}function v(M){const T=_,A=new De,E=new N;let P=0;const y=M===!0?e:t,b=M===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,p*b,0),d.push(0,b,0),f.push(.5,.5),_++;const O=_;for(let z=0;z<=i;z++){const D=z/i*l+o,B=Math.cos(D),G=Math.sin(D);E.x=y*G,E.y=p*b,E.z=y*B,u.push(E.x,E.y,E.z),d.push(0,b,0),A.x=B*.5+.5,A.y=G*.5*b+.5,f.push(A.x,A.y),_++}for(let z=0;z<i;z++){const $=T+z,D=O+z;M===!0?h.push(D,D+1,$):h.push(D+1,D,$),P+=3}c.addGroup(m,P,M===!0?1:2),m+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class kl extends $t{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new N,_=new De;for(let g=0;g<=i;g++){for(let p=0;p<=n;p++){const m=s+p/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),_.x=(f.x/t+1)/2,_.y=(f.y/t+1)/2,h.push(_.x,_.y)}u+=d}for(let g=0;g<i;g++){const p=g*(n+1);for(let m=0;m<n;m++){const x=m+p,v=x,M=x+n+1,T=x+n+2,A=x+1;o.push(v,M,A),o.push(M,T,A)}}this.setIndex(o),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(c,3)),this.setAttribute("uv",new ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Rs extends $t{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new N,d=new N,f=[],_=[],g=[],p=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let M=0;m===0&&a===0?M=.5/t:m===n&&l===Math.PI&&(M=-.5/t);for(let T=0;T<=t;T++){const A=T/t;u.x=-e*Math.cos(i+A*s)*Math.sin(a+v*o),u.y=e*Math.cos(a+v*o),u.z=e*Math.sin(i+A*s)*Math.sin(a+v*o),_.push(u.x,u.y,u.z),d.copy(u).normalize(),g.push(d.x,d.y,d.z),p.push(A+M,1-v),x.push(c++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const v=h[m][x+1],M=h[m][x],T=h[m+1][x],A=h[m+1][x+1];(m!==0||a>0)&&f.push(v,M,A),(m!==n-1||l<Math.PI)&&f.push(M,T,A)}this.setIndex(f),this.setAttribute("position",new ct(_,3)),this.setAttribute("normal",new ct(g,3)),this.setAttribute("uv",new ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class zl extends $t{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new N,u=new N,d=new N;for(let f=0;f<=n;f++)for(let _=0;_<=i;_++){const g=_/i*s,p=f/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(g),u.y=(e+t*Math.cos(p))*Math.sin(g),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(g),h.y=e*Math.sin(g),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(_/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let _=1;_<=i;_++){const g=(i+1)*f+_-1,p=(i+1)*(f-1)+_-1,m=(i+1)*(f-1)+_,x=(i+1)*f+_;a.push(g,p,x),a.push(p,m,x)}this.setIndex(a),this.setAttribute("position",new ct(o,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Hl extends Tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ai extends Hl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class di extends Tn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ie(16777215),this.specular=new Ie(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Cn extends Tn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function ga(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function yy(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function xy(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function tu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Td(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class Br{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class My extends Br{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kc,endingEnd:Kc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zc:s=e,o=2*t-n;break;case Jc:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zc:a=e,l=2*n-t;break;case Jc:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,_=(n-t)/(i-t),g=_*_,p=g*_,m=-d*p+2*d*g-d*_,x=(1+d)*p+(-1.5-2*d)*g+(-.5+d)*_+1,v=(-1-f)*p+(1.5+f)*g+.5*_,M=f*p-f*g;for(let T=0;T!==o;++T)s[T]=m*a[h+T]+x*a[c+T]+v*a[l+T]+M*a[u+T];return s}}class Sy extends Br{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class Ey extends Br{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Vn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ga(t,this.TimeBufferType),this.values=ga(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ga(e.times,Array),values:ga(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ey(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Sy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new My(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Cr:t=this.InterpolantFactoryMethodDiscrete;break;case Gs:t=this.InterpolantFactoryMethodLinear;break;case ro:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cr;case this.InterpolantFactoryMethodLinear:return Gs;case this.InterpolantFactoryMethodSmooth:return ro}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&yy(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ro,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let _=0;_!==n;++_){const g=t[u+_];if(g!==t[d+_]||g!==t[f+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=Gs;class ir extends Vn{}ir.prototype.ValueTypeName="bool";ir.prototype.ValueBufferType=Array;ir.prototype.DefaultInterpolation=Cr;ir.prototype.InterpolantFactoryMethodLinear=void 0;ir.prototype.InterpolantFactoryMethodSmooth=void 0;class Ad extends Vn{}Ad.prototype.ValueTypeName="color";class Xs extends Vn{}Xs.prototype.ValueTypeName="number";class by extends Br{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Dt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class ns extends Vn{InterpolantFactoryMethodLinear(e){return new by(this.times,this.values,this.getValueSize(),e)}}ns.prototype.ValueTypeName="quaternion";ns.prototype.DefaultInterpolation=Gs;ns.prototype.InterpolantFactoryMethodSmooth=void 0;class sr extends Vn{}sr.prototype.ValueTypeName="string";sr.prototype.ValueBufferType=Array;sr.prototype.DefaultInterpolation=Cr;sr.prototype.InterpolantFactoryMethodLinear=void 0;sr.prototype.InterpolantFactoryMethodSmooth=void 0;class qs extends Vn{}qs.prototype.ValueTypeName="vector";class Ty{constructor(e,t=-1,n,i=Lp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Dn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(wy(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(Vn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=xy(l);l=tu(l,1,h),c=tu(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new Xs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,_,g){if(f.length!==0){const p=[],m=[];Td(f,p,m,_),p.length!==0&&g.push(new u(d,p,m))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let _;for(_=0;_<d.length;_++)if(d[_].morphTargets)for(let g=0;g<d[_].morphTargets.length;g++)f[d[_].morphTargets[g]]=-1;for(const g in f){const p=[],m=[];for(let x=0;x!==d[_].morphTargets.length;++x){const v=d[_];p.push(v.time),m.push(v.morphTarget===g?1:0)}i.push(new Xs(".morphTargetInfluence["+g+"]",p,m))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(qs,f+".position",d,"pos",i),n(ns,f+".quaternion",d,"rot",i),n(qs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ay(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Xs;case"vector":case"vector2":case"vector3":case"vector4":return qs;case"color":return Ad;case"quaternion":return ns;case"bool":case"boolean":return ir;case"string":return sr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function wy(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ay(r.type);if(r.times===void 0){const t=[],n=[];Td(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const vi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Ry{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],_=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return _}return null}}}const gr=new Ry;class rr{constructor(e){this.manager=e!==void 0?e:gr,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}rr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Kn={};class Cy extends Error{constructor(e,t){super(e),this.response=t}}class wd extends rr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=vi.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Kn[e]!==void 0){Kn[e].push({onLoad:t,onProgress:n,onError:i});return}Kn[e]=[],Kn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Kn[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=d?parseInt(d):0,_=f!==0;let g=0;const p=new ReadableStream({start(m){x();function x(){u.read().then(({done:v,value:M})=>{if(v)m.close();else{g+=M.byteLength;const T=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:f});for(let A=0,E=h.length;A<E;A++){const P=h[A];P.onProgress&&P.onProgress(T)}m.enqueue(M),x()}})}}});return new Response(p)}else throw new Cy(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{vi.add(e,c);const h=Kn[e];delete Kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Kn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Py extends rr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=vi.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=Pr("img");function l(){h(),vi.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Ly extends rr{constructor(e){super(e)}load(e,t,n,i){const s=new Ut,a=new Py(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class kr extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Rd extends kr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Do=new ke,nu=new N,iu=new N;class Gl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dl,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;nu.setFromMatrixPosition(e.matrixWorld),t.position.copy(nu),iu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(iu),t.updateMatrixWorld(),Do.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Do),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Do)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Iy extends Gl{constructor(){super(new Jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Vs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Dy extends kr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Iy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const su=new ke,fr=new N,No=new N;class Ny extends Gl{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new De(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),fr.setFromMatrixPosition(e.matrixWorld),n.position.copy(fr),No.copy(n.position),No.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(No),n.updateMatrixWorld(),i.makeTranslation(-fr.x,-fr.y,-fr.z),su.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(su)}}class Uy extends kr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Ny}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Oy extends Gl{constructor(){super(new Ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cd extends kr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new Oy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Fy extends kr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Er{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class By extends rr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=vi.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return vi.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),vi.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});vi.add(e,l),s.manager.itemStart(e)}}const Vl="\\[\\]\\.:\\/",ky=new RegExp("["+Vl+"]","g"),Wl="[^"+Vl+"]",zy="[^"+Vl.replace("\\.","")+"]",Hy=/((?:WC+[\/:])*)/.source.replace("WC",Wl),Gy=/(WCOD+)?/.source.replace("WCOD",zy),Vy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),Wy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),Xy=new RegExp("^"+Hy+Gy+Vy+Wy+"$"),qy=["material","materials","bones","map"];class Yy{constructor(e,t,n){const i=n||tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class tt{constructor(e,t,n){this.path=t,this.parsedPath=n||tt.parseTrackName(t),this.node=tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new tt.Composite(e,t,n):new tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ky,"")}static parseTrackName(e){const t=Xy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);qy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}tt.Composite=Yy;tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray];tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class jy{constructor(e,t,n=0,i=1/0){this.ray=new er(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Il,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return ol(e,this,n,t),n.sort(ru),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ol(e[i],this,n,t);return n.sort(ru),n}}function ru(r,e){return r.distance-e.distance}function ol(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,a=i.length;s<a;s++)ol(i[s],e,t,!0)}}class au{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rl);const ou={type:"change"},Uo={type:"start"},lu={type:"end"},_a=new er,cu=new mi,$y=Math.cos(70*id.DEG2RAD);class Ky extends is{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:rs.ROTATE,MIDDLE:rs.DOLLY,RIGHT:rs.PAN},this.touches={ONE:as.ROTATE,TWO:as.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",pe),this._domElementKeyEvents=L},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",pe),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ou),n.update(),s=i.NONE},this.update=function(){const L=new N,oe=new Dt().setFromUnitVectors(e.up,new N(0,1,0)),Re=oe.clone().invert(),xe=new N,ne=new Dt,U=new N,he=2*Math.PI;return function(Oe=null){const Ne=n.object.position;L.copy(Ne).sub(n.target),L.applyQuaternion(oe),o.setFromVector3(L),n.autoRotate&&s===i.NONE&&z(b(Oe)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let je=n.minAzimuthAngle,$e=n.maxAzimuthAngle;isFinite(je)&&isFinite($e)&&(je<-Math.PI?je+=he:je>Math.PI&&(je-=he),$e<-Math.PI?$e+=he:$e>Math.PI&&($e-=he),je<=$e?o.theta=Math.max(je,Math.min($e,o.theta)):o.theta=o.theta>(je+$e)/2?Math.max(je,o.theta):Math.min($e,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&A||n.object.isOrthographicCamera?o.radius=I(o.radius):o.radius=I(o.radius*c),L.setFromSpherical(o),L.applyQuaternion(Re),Ne.copy(n.target).add(L),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0));let mt=!1;if(n.zoomToCursor&&A){let yt=null;if(n.object.isPerspectiveCamera){const Je=L.length();yt=I(Je*c);const St=Je-yt;n.object.position.addScaledVector(M,St),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Je=new N(T.x,T.y,0);Je.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),mt=!0;const St=new N(T.x,T.y,0);St.unproject(n.object),n.object.position.sub(St).add(Je),n.object.updateMatrixWorld(),yt=L.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;yt!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(yt).add(n.object.position):(_a.origin.copy(n.object.position),_a.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(_a.direction))<$y?e.lookAt(n.target):(cu.setFromNormalAndCoplanarPoint(n.object.up,n.target),_a.intersectPlane(cu,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),mt=!0);return c=1,A=!1,mt||xe.distanceToSquared(n.object.position)>a||8*(1-ne.dot(n.object.quaternion))>a||U.distanceToSquared(n.target)>0?(n.dispatchEvent(ou),xe.copy(n.object.position),ne.copy(n.object.quaternion),U.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ue),n.domElement.removeEventListener("pointerdown",R),n.domElement.removeEventListener("pointercancel",V),n.domElement.removeEventListener("wheel",re),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",V),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",pe),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const a=1e-6,o=new au,l=new au;let c=1;const h=new N,u=new De,d=new De,f=new De,_=new De,g=new De,p=new De,m=new De,x=new De,v=new De,M=new N,T=new De;let A=!1;const E=[],P={};let y=!1;function b(L){return L!==null?2*Math.PI/60*n.autoRotateSpeed*L:2*Math.PI/60/60*n.autoRotateSpeed}function O(L){const oe=Math.abs(L*.01);return Math.pow(.95,n.zoomSpeed*oe)}function z(L){l.theta-=L}function $(L){l.phi-=L}const D=function(){const L=new N;return function(Re,xe){L.setFromMatrixColumn(xe,0),L.multiplyScalar(-Re),h.add(L)}}(),B=function(){const L=new N;return function(Re,xe){n.screenSpacePanning===!0?L.setFromMatrixColumn(xe,1):(L.setFromMatrixColumn(xe,0),L.crossVectors(n.object.up,L)),L.multiplyScalar(Re),h.add(L)}}(),G=function(){const L=new N;return function(Re,xe){const ne=n.domElement;if(n.object.isPerspectiveCamera){const U=n.object.position;L.copy(U).sub(n.target);let he=L.length();he*=Math.tan(n.object.fov/2*Math.PI/180),D(2*Re*he/ne.clientHeight,n.object.matrix),B(2*xe*he/ne.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(D(Re*(n.object.right-n.object.left)/n.object.zoom/ne.clientWidth,n.object.matrix),B(xe*(n.object.top-n.object.bottom)/n.object.zoom/ne.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function K(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Z(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function J(L,oe){if(!n.zoomToCursor)return;A=!0;const Re=n.domElement.getBoundingClientRect(),xe=L-Re.left,ne=oe-Re.top,U=Re.width,he=Re.height;T.x=xe/U*2-1,T.y=-(ne/he)*2+1,M.set(T.x,T.y,1).unproject(n.object).sub(n.object.position).normalize()}function I(L){return Math.max(n.minDistance,Math.min(n.maxDistance,L))}function C(L){u.set(L.clientX,L.clientY)}function j(L){J(L.clientX,L.clientX),m.set(L.clientX,L.clientY)}function F(L){_.set(L.clientX,L.clientY)}function W(L){d.set(L.clientX,L.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const oe=n.domElement;z(2*Math.PI*f.x/oe.clientHeight),$(2*Math.PI*f.y/oe.clientHeight),u.copy(d),n.update()}function Q(L){x.set(L.clientX,L.clientY),v.subVectors(x,m),v.y>0?K(O(v.y)):v.y<0&&Z(O(v.y)),m.copy(x),n.update()}function ae(L){g.set(L.clientX,L.clientY),p.subVectors(g,_).multiplyScalar(n.panSpeed),G(p.x,p.y),_.copy(g),n.update()}function te(L){J(L.clientX,L.clientY),L.deltaY<0?Z(O(L.deltaY)):L.deltaY>0&&K(O(L.deltaY)),n.update()}function de(L){let oe=!1;switch(L.code){case n.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?$(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,n.keyPanSpeed),oe=!0;break;case n.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?$(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,-n.keyPanSpeed),oe=!0;break;case n.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(n.keyPanSpeed,0),oe=!0;break;case n.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(-n.keyPanSpeed,0),oe=!0;break}oe&&(L.preventDefault(),n.update())}function ge(L){if(E.length===1)u.set(L.pageX,L.pageY);else{const oe=ye(L),Re=.5*(L.pageX+oe.x),xe=.5*(L.pageY+oe.y);u.set(Re,xe)}}function fe(L){if(E.length===1)_.set(L.pageX,L.pageY);else{const oe=ye(L),Re=.5*(L.pageX+oe.x),xe=.5*(L.pageY+oe.y);_.set(Re,xe)}}function Se(L){const oe=ye(L),Re=L.pageX-oe.x,xe=L.pageY-oe.y,ne=Math.sqrt(Re*Re+xe*xe);m.set(0,ne)}function k(L){n.enableZoom&&Se(L),n.enablePan&&fe(L)}function Ve(L){n.enableZoom&&Se(L),n.enableRotate&&ge(L)}function le(L){if(E.length==1)d.set(L.pageX,L.pageY);else{const Re=ye(L),xe=.5*(L.pageX+Re.x),ne=.5*(L.pageY+Re.y);d.set(xe,ne)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const oe=n.domElement;z(2*Math.PI*f.x/oe.clientHeight),$(2*Math.PI*f.y/oe.clientHeight),u.copy(d)}function Ee(L){if(E.length===1)g.set(L.pageX,L.pageY);else{const oe=ye(L),Re=.5*(L.pageX+oe.x),xe=.5*(L.pageY+oe.y);g.set(Re,xe)}p.subVectors(g,_).multiplyScalar(n.panSpeed),G(p.x,p.y),_.copy(g)}function _e(L){const oe=ye(L),Re=L.pageX-oe.x,xe=L.pageY-oe.y,ne=Math.sqrt(Re*Re+xe*xe);x.set(0,ne),v.set(0,Math.pow(x.y/m.y,n.zoomSpeed)),K(v.y),m.copy(x);const U=(L.pageX+oe.x)*.5,he=(L.pageY+oe.y)*.5;J(U,he)}function He(L){n.enableZoom&&_e(L),n.enablePan&&Ee(L)}function Ce(L){n.enableZoom&&_e(L),n.enableRotate&&le(L)}function R(L){n.enabled!==!1&&(E.length===0&&(n.domElement.setPointerCapture(L.pointerId),n.domElement.addEventListener("pointermove",S),n.domElement.addEventListener("pointerup",V)),Pe(L),L.pointerType==="touch"?Ae(L):se(L))}function S(L){n.enabled!==!1&&(L.pointerType==="touch"?ee(L):ie(L))}function V(L){we(L),E.length===0&&(n.domElement.releasePointerCapture(L.pointerId),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",V)),n.dispatchEvent(lu),s=i.NONE}function se(L){let oe;switch(L.button){case 0:oe=n.mouseButtons.LEFT;break;case 1:oe=n.mouseButtons.MIDDLE;break;case 2:oe=n.mouseButtons.RIGHT;break;default:oe=-1}switch(oe){case rs.DOLLY:if(n.enableZoom===!1)return;j(L),s=i.DOLLY;break;case rs.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enablePan===!1)return;F(L),s=i.PAN}else{if(n.enableRotate===!1)return;C(L),s=i.ROTATE}break;case rs.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enableRotate===!1)return;C(L),s=i.ROTATE}else{if(n.enablePan===!1)return;F(L),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Uo)}function ie(L){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;W(L);break;case i.DOLLY:if(n.enableZoom===!1)return;Q(L);break;case i.PAN:if(n.enablePan===!1)return;ae(L);break}}function re(L){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(L.preventDefault(),n.dispatchEvent(Uo),te(be(L)),n.dispatchEvent(lu))}function be(L){const oe=L.deltaMode,Re={clientX:L.clientX,clientY:L.clientY,deltaY:L.deltaY};switch(oe){case 1:Re.deltaY*=16;break;case 2:Re.deltaY*=100;break}return L.ctrlKey&&!y&&(Re.deltaY*=10),Re}function ue(L){L.key==="Control"&&(y=!0,document.addEventListener("keyup",ce,{passive:!0,capture:!0}))}function ce(L){L.key==="Control"&&(y=!1,document.removeEventListener("keyup",ce,{passive:!0,capture:!0}))}function pe(L){n.enabled===!1||n.enablePan===!1||de(L)}function Ae(L){switch(Te(L),E.length){case 1:switch(n.touches.ONE){case as.ROTATE:if(n.enableRotate===!1)return;ge(L),s=i.TOUCH_ROTATE;break;case as.PAN:if(n.enablePan===!1)return;fe(L),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case as.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;k(L),s=i.TOUCH_DOLLY_PAN;break;case as.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ve(L),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Uo)}function ee(L){switch(Te(L),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;le(L),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Ee(L),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;He(L),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ce(L),n.update();break;default:s=i.NONE}}function Ue(L){n.enabled!==!1&&L.preventDefault()}function Pe(L){E.push(L.pointerId)}function we(L){delete P[L.pointerId];for(let oe=0;oe<E.length;oe++)if(E[oe]==L.pointerId){E.splice(oe,1);return}}function Te(L){let oe=P[L.pointerId];oe===void 0&&(oe=new De,P[L.pointerId]=oe),oe.set(L.pageX,L.pageY)}function ye(L){const oe=L.pointerId===E[0]?E[1]:E[0];return P[oe]}n.domElement.addEventListener("contextmenu",Ue),n.domElement.addEventListener("pointerdown",R),n.domElement.addEventListener("pointercancel",V),n.domElement.addEventListener("wheel",re,{passive:!1}),document.addEventListener("keydown",ue,{passive:!0,capture:!0}),this.update()}}class Xl extends at{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new De(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const bs=new N,hu=new ke,uu=new ke,du=new N,fu=new N;class Zy{constructor(e={}){const t=this;let n,i,s,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:i}},this.render=function(f,_){f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),hu.copy(_.matrixWorldInverse),uu.multiplyMatrices(_.projectionMatrix,hu),c(f,f,_),d(f)},this.setSize=function(f,_){n=f,i=_,s=n/2,a=i/2,l.style.width=f+"px",l.style.height=_+"px"};function c(f,_,g){if(f.isCSS2DObject){bs.setFromMatrixPosition(f.matrixWorld),bs.applyMatrix4(uu);const p=f.visible===!0&&bs.z>=-1&&bs.z<=1&&f.layers.test(g.layers)===!0;if(f.element.style.display=p===!0?"":"none",p===!0){f.onBeforeRender(t,_,g);const x=f.element;x.style.transform="translate("+-100*f.center.x+"%,"+-100*f.center.y+"%)translate("+(bs.x*s+s)+"px,"+(-bs.y*a+a)+"px)",x.parentNode!==l&&l.appendChild(x),f.onAfterRender(t,_,g)}const m={distanceToCameraSquared:h(g,f)};o.objects.set(f,m)}for(let p=0,m=f.children.length;p<m;p++)c(f.children[p],_,g)}function h(f,_){return du.setFromMatrixPosition(f.matrixWorld),fu.setFromMatrixPosition(_.matrixWorld),du.distanceToSquared(fu)}function u(f){const _=[];return f.traverse(function(g){g.isCSS2DObject&&_.push(g)}),_}function d(f){const _=u(f).sort(function(p,m){if(p.renderOrder!==m.renderOrder)return m.renderOrder-p.renderOrder;const x=o.objects.get(p).distanceToCameraSquared,v=o.objects.get(m).distanceToCameraSquared;return x-v}),g=_.length;for(let p=0,m=_.length;p<m;p++)_[p].element.style.zIndex=g-p}}}function pu(r,e){if(e===Ip)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===el||e===ed){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===el)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Jy extends rr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ix(t)}),this.register(function(t){return new dx(t)}),this.register(function(t){return new fx(t)}),this.register(function(t){return new px(t)}),this.register(function(t){return new rx(t)}),this.register(function(t){return new ax(t)}),this.register(function(t){return new ox(t)}),this.register(function(t){return new lx(t)}),this.register(function(t){return new nx(t)}),this.register(function(t){return new cx(t)}),this.register(function(t){return new sx(t)}),this.register(function(t){return new ux(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new ex(t)}),this.register(function(t){return new mx(t)}),this.register(function(t){return new gx(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Er.extractUrlBase(e);a=Er.resolveURL(c,this.path)}else a=Er.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new wd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Pd){try{a[Ke.KHR_BINARY_GLTF]=new _x(e)}catch(u){i&&i(u);return}s=JSON.parse(a[Ke.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Px(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Ke.KHR_MATERIALS_UNLIT:a[u]=new tx;break;case Ke.KHR_DRACO_MESH_COMPRESSION:a[u]=new vx(s,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:a[u]=new yx;break;case Ke.KHR_MESH_QUANTIZATION:a[u]=new xx;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Qy(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ex{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ie(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Lt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Cd(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Uy(h),c.distance=u;break;case"spot":c=new Dy(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,gi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class tx{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Xt}extendParams(e,t,n){const i=[];e.color=new Ie(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Lt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,ft))}return Promise.all(i)}}class nx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class ix{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new De(o,o)}return Promise.all(s)}}class sx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class rx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Lt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ft)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class ax{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class ox{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(o[0],o[1],o[2],Lt),Promise.all(s)}}class lx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class cx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(o[0],o[1],o[2],Lt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ft)),Promise.all(s)}}class hx{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class ux{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class dx{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class fx{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class px{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class mx{constructor(e){this.name=Ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class gx{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==vn.TRIANGLES&&c.mode!==vn.TRIANGLE_STRIP&&c.mode!==vn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const _ of u){const g=new ke,p=new N,m=new Dt,x=new N(1,1,1),v=new pi(_.geometry,_.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,M),l.SCALE&&x.fromBufferAttribute(l.SCALE,M),v.setMatrixAt(M,g.compose(p,m,x));for(const M in l)if(M==="_COLOR_0"){const T=l[M];v.instanceColor=new rl(T.array,T.itemSize,T.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&_.geometry.setAttribute(M,l[M]);at.prototype.copy.call(v,_),this.parser.assignFinalMaterial(v),f.push(v)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Pd="glTF",pr=12,mu={JSON:1313821514,BIN:5130562};class _x{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,pr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Pd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-pr,s=new DataView(e,pr);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===mu.JSON){const c=new Uint8Array(e,pr+a,o);this.content=n.decode(c)}else if(l===mu.BIN){const c=pr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class vx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=ll[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=ll[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ds[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const _ in f.attributes){const g=f.attributes[_],p=l[_];p!==void 0&&(g.normalized=p)}u(f)},o,c,Lt,d)})})}}class yx{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class xx{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class Ld extends Br{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,_=e*c,g=_-c,p=-2*f+3*d,m=f-d,x=1-p,v=m-d+u;for(let M=0;M!==o;M++){const T=a[g+M+o],A=a[g+M+l]*h,E=a[_+M+o],P=a[_+M]*h;s[M]=x*T+v*A+p*E+m*P}return s}}const Mx=new Dt;class Sx extends Ld{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return Mx.fromArray(s).normalize().toArray(s),s}}const vn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ds={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},gu={9728:Pt,9729:Zt,9984:Qo,9985:qu,9986:ya,9987:es},_u={33071:yn,33648:Ta,10497:zs},Oo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ll={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ex={CUBICSPLINE:void 0,LINEAR:Gs,STEP:Cr},Fo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function bx(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Hl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ii})),r.DefaultMaterial}function Bi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function gi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Tx(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function Ax(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function wx(r){let e;const t=r.extensions&&r.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Bo(t.attributes):e=r.indices+":"+Bo(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Bo(r.targets[n]);return e}function Bo(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function cl(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Rx(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Cx=new ke;class Px{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Qy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new Ly(this.options.manager):this.textureLoader=new By(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new wd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Bi(s,o,i),gi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Er.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Oo[i.type],o=Ds[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new jt(c,a,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=Oo[i.type],c=Ds[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,p;if(f&&f!==u){const m=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let v=t.cache.get(x);v||(g=new c(o,m*f,i.count*f/h),v=new hy(g,f/h),t.cache.add(x,v)),p=new Ol(v,l,d%f/h,_)}else o===null?g=new c(i.count*l):g=new c(o,d,i.count*l),p=new jt(g,l,_);if(i.sparse!==void 0){const m=Oo.SCALAR,x=Ds[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,T=new x(a[1],v,i.sparse.count*m),A=new c(a[2],M,i.sparse.count*l);o!==null&&(p=new jt(p.array.slice(),p.itemSize,p.normalized));for(let E=0,P=T.length;E<P;E++){const y=T[E];if(p.setX(y,A[E*l]),l>=2&&p.setY(y,A[E*l+1]),l>=3&&p.setZ(y,A[E*l+2]),l>=4&&p.setW(y,A[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=gu[d.magFilter]||Zt,h.minFilter=gu[d.minFilter]||es,h.wrapS=_u[d.wrapS]||zs,h.wrapT=_u[d.wrapT]||zs,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let _=d;t.isImageBitmapLoader===!0&&(_=function(g){const p=new Ut(g);p.needsUpdate=!0,d(p)}),t.load(Er.resolveURL(u,s.path),_,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),u.userData.mimeType=a.mimeType||Rx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new bd,Tn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Ed,Tn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Hl}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[Ke.KHR_MATERIALS_UNLIT]){const u=i[Ke.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Lt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,ft)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=In);const h=s.alphaMode||Fo.OPAQUE;if(h===Fo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Fo.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Xt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new De(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==Xt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Xt){const u=s.emissiveFactor;o.emissive=new Ie().setRGB(u[0],u[1],u[2],Lt)}return s.emissiveTexture!==void 0&&a!==Xt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ft)),Promise.all(c).then(function(){const u=new a(o);return s.name&&(u.name=s.name),gi(u,s),t.associations.set(u,{materials:e}),s.extensions&&Bi(i,u,s),u})}createUniqueName(e){const t=tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return vu(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=wx(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=vu(new $t,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?bx(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,_=h.length;f<_;f++){const g=h[f],p=a[f];let m;const x=c[f];if(p.mode===vn.TRIANGLES||p.mode===vn.TRIANGLE_STRIP||p.mode===vn.TRIANGLE_FAN||p.mode===void 0)m=s.isSkinnedMesh===!0?new dy(g,x):new Qe(g,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===vn.TRIANGLE_STRIP?m.geometry=pu(m.geometry,ed):p.mode===vn.TRIANGLE_FAN&&(m.geometry=pu(m.geometry,el));else if(p.mode===vn.LINES)m=new gy(g,x);else if(p.mode===vn.LINE_STRIP)m=new Bl(g,x);else if(p.mode===vn.LINE_LOOP)m=new _y(g,x);else if(p.mode===vn.POINTS)m=new vy(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&Ax(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),gi(m,s),p.extensions&&Bi(i,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,_=u.length;f<_;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Bi(i,u[0],s),u[0];const d=new zt;s.extensions&&Bi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,_=u.length;f<_;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Jt(id.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ga(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new ke;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Fl(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],_=i.samplers[f.sampler],g=f.target,p=g.node,m=i.parameters!==void 0?i.parameters[_.input]:_.input,x=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",x)),c.push(_),h.push(g))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],_=u[2],g=u[3],p=u[4],m=[];for(let x=0,v=d.length;x<v;x++){const M=d[x],T=f[x],A=_[x],E=g[x],P=p[x];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const y=n._createAnimationTracks(M,T,A,E,P);if(y)for(let b=0;b<y.length;b++)m.push(y[b])}return new Ty(s,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Cx)});for(let f=0,_=u.length;f<_;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Sd:c.length>1?h=new zt:c.length===1?h=c[0]:h=new at,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),gi(h,s),s.extensions&&Bi(n,h,s),s.matrix!==void 0){const u=new ke;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new zt;n.name&&(s.name=i.createUniqueName(n.name)),gi(s,n),n.extensions&&Bi(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Tn||d instanceof Ut)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,l=[];fi[s.path]===fi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(fi[s.path]){case fi.weights:c=Xs;break;case fi.rotation:c=ns;break;case fi.position:case fi.scale:c=qs;break;default:switch(n.itemSize){case 1:c=Xs;break;case 2:case 3:default:c=qs;break}break}const h=i.interpolation!==void 0?Ex[i.interpolation]:Gs,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const _=new c(l[d]+"."+fi[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=cl(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ns?Sx:Ld;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Lx(r,e,t){const n=e.attributes,i=new bn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new N(l[0],l[1],l[2]),new N(c[0],c[1],c[2])),o.normalized){const h=cl(Ds[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new N,l=new N;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,_=d.max;if(f!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(_[2]))),d.normalized){const g=cl(Ds[d.componentType]);l.multiplyScalar(g)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new Gn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function vu(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in n){const o=ll[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return et.workingColorSpace!==Lt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),gi(r,e),Lx(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Tx(r,e.targets,t):r})}function Jn(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Id(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var dn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ys={duration:.5,overwrite:!1,delay:0},ql,Ot,lt,Sn=1e8,st=1/Sn,hl=Math.PI*2,Ix=hl/4,Dx=0,Dd=Math.sqrt,Nx=Math.cos,Ux=Math.sin,It=function(e){return typeof e=="string"},vt=function(e){return typeof e=="function"},si=function(e){return typeof e=="number"},Yl=function(e){return typeof e>"u"},Hn=function(e){return typeof e=="object"},Qt=function(e){return e!==!1},jl=function(){return typeof window<"u"},va=function(e){return vt(e)||It(e)},Nd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Gt=Array.isArray,Ox=/random\([^)]+\)/g,Fx=/,\s*/g,yu=/(?:-?\.?\d|\.)+/gi,Ud=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Cs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ko=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Od=/[+-]=-?[.\d]+/,Bx=/[^,'"\[\]\s]+/gi,kx=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,dt,On,ul,$l,fn={},La={},Fd,Bd=function(e){return(La=js(e,fn))&&sn},Kl=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Lr=function(e,t){return!t&&console.warn(e)},kd=function(e,t){return e&&(fn[e]=t)&&La&&(La[e]=t)||fn},Ir=function(){return 0},zx={suppressEvents:!0,isStart:!0,kill:!1},Ma={suppressEvents:!0,kill:!1},Hx={suppressEvents:!0},Zl={},Ti=[],dl={},zd,ln={},zo={},xu=30,Sa=[],Jl="",Ql=function(e){var t=e[0],n,i;if(Hn(t)||vt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Sa.length;i--&&!Sa[i].targetTest(t););n=Sa[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new uf(e[i],n)))||e.splice(i,1);return e},Ki=function(e){return e._gsap||Ql(En(e))[0]._gsap},Hd=function(e,t,n){return(n=e[t])&&vt(n)?e[t]():Yl(n)&&e.getAttribute&&e.getAttribute(t)||n},en=function(e,t){return(e=e.split(",")).forEach(t)||e},Mt=function(e){return Math.round(e*1e5)/1e5||0},ut=function(e){return Math.round(e*1e7)/1e7||0},Ns=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Gx=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Ia=function(){var e=Ti.length,t=Ti.slice(0),n,i;for(dl={},Ti.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},ec=function(e){return!!(e._initted||e._startAt||e.add)},Gd=function(e,t,n,i){Ti.length&&!Ot&&Ia(),e.render(t,n,!!(Ot&&t<0&&ec(e))),Ti.length&&!Ot&&Ia()},Vd=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Bx).length<2?t:It(e)?e.trim():e},Wd=function(e){return e},pn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Vx=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},js=function(e,t){for(var n in t)e[n]=t[n];return e},Mu=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Hn(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Da=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},br=function(e){var t=e.parent||dt,n=e.keyframes?Vx(Gt(e.keyframes)):pn;if(Qt(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Wx=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Xd=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},Wa=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Ri=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Zi=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Xx=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},fl=function(e,t,n,i){return e._startAt&&(Ot?e._startAt.revert(Ma):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},qx=function r(e){return!e||e._ts&&r(e.parent)},Su=function(e){return e._repeat?$s(e._tTime,e=e.duration()+e._rDelay)*e:0},$s=function(e,t){var n=Math.floor(e=ut(e/t));return e&&n===e?n-1:n},Na=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Xa=function(e){return e._end=ut(e._start+(e._tDur/Math.abs(e._ts||e._rts||st)||0))},qa=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=ut(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Xa(e),n._dirty||Zi(n,e)),e},qd=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Na(e.rawTime(),t),(!t._dur||zr(0,t.totalDuration(),n)-t._tTime>st)&&t.render(n,!0)),Zi(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-st}},kn=function(e,t,n,i){return t.parent&&Ri(t),t._start=ut((si(n)?n:n||e!==dt?_n(e,n,t):e._time)+t._delay),t._end=ut(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Xd(e,t,"_first","_last",e._sort?"_start":0),pl(t)||(e._recent=t),i||qd(e,t),e._ts<0&&qa(e,e._tTime),e},Yd=function(e,t){return(fn.ScrollTrigger||Kl("scrollTrigger",t))&&fn.ScrollTrigger.create(t,e)},jd=function(e,t,n,i,s){if(nc(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Ot&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&zd!==cn.frame)return Ti.push(e),e._lazy=[s,i],1},Yx=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},pl=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},jx=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&Yx(e)&&!(!e._initted&&pl(e))||(e._ts<0||e._dp._ts<0)&&!pl(e))?0:1,o=e._rDelay,l=0,c,h,u;if(o&&e._repeat&&(l=zr(0,e._tDur,t),h=$s(l,o),e._yoyo&&h&1&&(a=1-a),h!==$s(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||Ot||i||e._zTime===st||!t&&e._zTime){if(!e._initted&&jd(e,t,i,n,l))return;for(u=e._zTime,e._zTime=t||(n?st:0),n||(n=t&&!u),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&fl(e,t,n,!0),e._onUpdate&&!n&&hn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&hn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Ri(e,1),!n&&!Ot&&(hn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},$x=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Ks=function(e,t,n,i){var s=e._repeat,a=ut(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:ut(a*(s+1)+e._rDelay*s):a,o>0&&!i&&qa(e,e._tTime=e._tDur*o),e.parent&&Xa(e),n||Zi(e.parent,e),e},Eu=function(e){return e instanceof qt?Zi(e):Ks(e,e._dur)},Kx={_start:0,endTime:Ir,totalDuration:Ir},_n=function r(e,t,n){var i=e.labels,s=e._recent||Kx,a=e.duration()>=Sn?s.endTime(!1):e._dur,o,l,c;return It(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(Gt(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Tr=function(e,t,n){var i=si(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Qt(l.vars.inherit)&&l.parent;a.immediateRender=Qt(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new bt(t[0],a,t[s+1])},Li=function(e,t){return e||e===0?t(e):t},zr=function(e,t,n){return n<e?e:n>t?t:n},Ht=function(e,t){return!It(e)||!(t=kx.exec(e))?"":t[1]},Zx=function(e,t,n){return Li(n,function(i){return zr(e,t,i)})},ml=[].slice,$d=function(e,t){return e&&Hn(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Hn(e[0]))&&!e.nodeType&&e!==On},Jx=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return It(i)&&!t||$d(i,1)?(s=n).push.apply(s,En(i)):n.push(i)})||n},En=function(e,t,n){return lt&&!t&&lt.selector?lt.selector(e):It(e)&&!n&&(ul||!Zs())?ml.call((t||$l).querySelectorAll(e),0):Gt(e)?Jx(e,n):$d(e)?ml.call(e,0):e?[e]:[]},gl=function(e){return e=En(e)[0]||Lr("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return En(t,n.querySelectorAll?n:n===e?Lr("Invalid scope")||$l.createElement("div"):e)}},Kd=function(e){return e.sort(function(){return .5-Math.random()})},Zd=function(e){if(vt(e))return e;var t=Hn(e)?e:{each:e},n=Ji(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,h=i,u=i;return It(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],u=i[1]),function(d,f,_){var g=(_||t).length,p=a[g],m,x,v,M,T,A,E,P,y;if(!p){if(y=t.grid==="auto"?0:(t.grid||[1,Sn])[1],!y){for(E=-Sn;E<(E=_[y++].getBoundingClientRect().left)&&y<g;);y<g&&y--}for(p=a[g]=[],m=l?Math.min(y,g)*h-.5:i%y,x=y===Sn?0:l?g*u/y-.5:i/y|0,E=0,P=Sn,A=0;A<g;A++)v=A%y-m,M=x-(A/y|0),p[A]=T=c?Math.abs(c==="y"?M:v):Dd(v*v+M*M),T>E&&(E=T),T<P&&(P=T);i==="random"&&Kd(p),p.max=E-P,p.min=P,p.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(y>g?g-1:c?c==="y"?g/y:y:Math.max(y,g/y))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=Ht(t.amount||t.each)||0,n=n&&g<0?lf(n):n}return g=(p[d]-p.min)/p.max||0,ut(p.b+(n?n(g):g)*p.v)+p.u}},_l=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=ut(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(si(n)?0:Ht(n))}},Jd=function(e,t){var n=Gt(e),i,s;return!n&&Hn(e)&&(i=n=e.radius||Sn,e.values?(e=En(e.values),(s=!si(e[0]))&&(i*=i)):e=_l(e.increment)),Li(t,n?vt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Sn,h=0,u=e.length,d,f;u--;)s?(d=e[u].x-o,f=e[u].y-l,d=d*d+f*f):d=Math.abs(e[u]-o),d<c&&(c=d,h=u);return h=!i||c<=i?e[h]:a,s||h===a||si(a)?h:h+Ht(a)}:_l(e))},Qd=function(e,t,n,i){return Li(Gt(e)?!t:n===!0?!!(n=0):!i,function(){return Gt(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},Qx=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},eM=function(e,t){return function(n){return e(parseFloat(n))+(t||Ht(n))}},tM=function(e,t,n){return tf(e,t,0,1,n)},ef=function(e,t,n){return Li(n,function(i){return e[~~t(i)]})},nM=function r(e,t,n){var i=t-e;return Gt(e)?ef(e,r(0,e.length),t):Li(n,function(s){return(i+(s-e)%i)%i+e})},iM=function r(e,t,n){var i=t-e,s=i*2;return Gt(e)?ef(e,r(0,e.length-1),t):Li(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},Dr=function(e){return e.replace(Ox,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(Fx);return Qd(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},tf=function(e,t,n,i,s){var a=t-e,o=i-n;return Li(s,function(l){return n+((l-e)/a*o||0)})},sM=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var a=It(e),o={},l,c,h,u,d;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(Gt(e)&&!Gt(t)){for(h=[],u=e.length,d=u-2,c=1;c<u;c++)h.push(r(e[c-1],e[c]));u--,s=function(_){_*=u;var g=Math.min(d,~~_);return h[g](_-g)},n=t}else i||(e=js(Gt(e)?[]:{},e));if(!h){for(l in t)tc.call(o,e,l,"get",t[l]);s=function(_){return rc(_,o)||(a?e.p:e)}}}return Li(n,s)},bu=function(e,t,n){var i=e.labels,s=Sn,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},hn=function(e,t,n){var i=e.vars,s=i[t],a=lt,o=e._ctx,l,c,h;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Ti.length&&Ia(),o&&(lt=o),h=l?s.apply(c,l):s.call(c),lt=a,h},_r=function(e){return Ri(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Ot),e.progress()<1&&hn(e,"onInterrupt"),e},Ps,nf=[],sf=function(e){if(e)if(e=!e.name&&e.default||e,jl()||e.headless){var t=e.name,n=vt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ir,render:rc,add:tc,kill:xM,modifier:yM,rawVars:0},a={targetTest:0,get:0,getSetter:sc,aliases:{},register:0};if(Zs(),e!==i){if(ln[t])return;pn(i,pn(Da(e,s),a)),js(i.prototype,js(s,Da(e,a))),ln[i.prop=t]=i,e.targetTest&&(Sa.push(i),Zl[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}kd(t,i),e.register&&e.register(sn,i,tn)}else nf.push(e)},it=255,vr={aqua:[0,it,it],lime:[0,it,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,it],navy:[0,0,128],white:[it,it,it],olive:[128,128,0],yellow:[it,it,0],orange:[it,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[it,0,0],pink:[it,192,203],cyan:[0,it,it],transparent:[it,it,it,0]},Ho=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*it+.5|0},rf=function(e,t,n){var i=e?si(e)?[e>>16,e>>8&it,e&it]:0:vr.black,s,a,o,l,c,h,u,d,f,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),vr[e])i=vr[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&it,i&it,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&it,e&it]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(yu),!t)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=Ho(l+1/3,s,a),i[1]=Ho(l,s,a),i[2]=Ho(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(Ud),n&&i.length<4&&(i[3]=1),i}else i=e.match(yu)||vr.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/it,a=i[1]/it,o=i[2]/it,u=Math.max(s,a,o),d=Math.min(s,a,o),h=(u+d)/2,u===d?l=c=0:(f=u-d,c=h>.5?f/(2-u-d):f/(u+d),l=u===s?(a-o)/f+(a<o?6:0):u===a?(o-s)/f+2:(s-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},af=function(e){var t=[],n=[],i=-1;return e.split(Ai).forEach(function(s){var a=s.match(Cs)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},Tu=function(e,t,n){var i="",s=(e+i).match(Ai),a=t?"hsla(":"rgba(",o=0,l,c,h,u;if(!s)return e;if(s=s.map(function(d){return(d=rf(d,t,1))&&a+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=af(e),l=n.c,l.join(i)!==h.c.join(i)))for(c=e.replace(Ai,"1").split(Cs),u=c.length-1;o<u;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=e.split(Ai),u=c.length-1;o<u;o++)i+=c[o]+s[o];return i+c[u]},Ai=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in vr)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),rM=/hsl[a]?\(/,of=function(e){var t=e.join(" "),n;if(Ai.lastIndex=0,Ai.test(t))return n=rM.test(t),e[1]=Tu(e[1],n),e[0]=Tu(e[0],n,af(e[1])),!0},Nr,cn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,u,d,f,_=function g(p){var m=r()-i,x=p===!0,v,M,T,A;if((m>e||m<0)&&(n+=m-t),i+=m,T=i-n,v=T-a,(v>0||x)&&(A=++u.frame,d=T-u.time*1e3,u.time=T=T/1e3,a+=v+(v>=s?4:s-v),M=1),x||(l=c(g)),M)for(f=0;f<o.length;f++)o[f](T,d,A,p)};return u={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){Fd&&(!ul&&jl()&&(On=ul=window,$l=On.document||{},fn.gsap=sn,(On.gsapVersions||(On.gsapVersions=[])).push(sn.version),Bd(La||On.GreenSockGlobals||!On.gsap&&On||{}),nf.forEach(sf)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(p){return setTimeout(p,a-u.time*1e3+1|0)},Nr=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Nr=0,c=Ir},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),a=u.time*1e3+s},add:function(p,m,x){var v=m?function(M,T,A,E){p(M,T,A,E),u.remove(v)}:p;return u.remove(p),o[x?"unshift":"push"](v),Zs(),v},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&f>=m&&f--},_listeners:o},u}(),Zs=function(){return!Nr&&cn.wake()},Ze={},aM=/^[\d.\-M][\d.\-,\s]/,oM=/["']/g,lM=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(oM,"").trim():+c,i=l.substr(o+1).trim();return t},cM=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},hM=function(e){var t=(e+"").split("("),n=Ze[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[lM(t[1])]:cM(e).split(",").map(Vd)):Ze._CE&&aM.test(e)?Ze._CE("",e):n},lf=function(e){return function(t){return 1-e(1-t)}},cf=function r(e,t){for(var n=e._first,i;n;)n instanceof qt?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Ji=function(e,t){return e&&(vt(e)?e:Ze[e]||hM(e))||t},ss=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return en(e,function(o){Ze[o]=fn[o]=s,Ze[a=o.toLowerCase()]=n;for(var l in s)Ze[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Ze[o+"."+l]=s[l]}),s},hf=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Go=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/hl*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*Ux((h-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:hf(o);return s=hl/s,l.config=function(c,h){return r(e,c,h)},l},Vo=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:hf(n);return i.config=function(s){return r(e,s)},i};en("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;ss(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Ze.Linear.easeNone=Ze.none=Ze.Linear.easeIn;ss("Elastic",Go("in"),Go("out"),Go());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};ss("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);ss("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ss("Circ",function(r){return-(Dd(1-r*r)-1)});ss("Sine",function(r){return r===1?1:-Nx(r*Ix)+1});ss("Back",Vo("in"),Vo("out"),Vo());Ze.SteppedEase=Ze.steps=fn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-st;return function(o){return((i*zr(0,a,o)|0)+s)*n}}};Ys.ease=Ze["quad.out"];en("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Jl+=r+","+r+"Params,"});var uf=function(e,t){this.id=Dx++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Hd,this.set=t?t.getSetter:sc},Ur=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ks(this,+t.duration,1,1),this.data=t.data,lt&&(this._ctx=lt,lt.data.push(this)),Nr||cn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Ks(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Zs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(qa(this,n),!s._dp||s.parent||qd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&kn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===st||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Gd(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Su(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Su(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?$s(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-st?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Na(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-st?0:this._rts,this.totalTime(zr(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Xa(this),Xx(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Zs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==st&&(this._tTime-=st)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=ut(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&kn(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Qt(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Na(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Hx);var i=Ot;return Ot=n,ec(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ot=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Eu(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Eu(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(_n(this,n),Qt(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Qt(i)),this._dur||(this._zTime=-st),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-st:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-st,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-st)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=vt(n)?n:Wd,l=function(){var h=i.then;i.then=null,s&&s(),vt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){_r(this)},r}();pn(Ur.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-st,_prom:0,_ps:!1,_rts:1});var qt=function(r){Id(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Qt(n.sortChildren),dt&&kn(n.parent||dt,Jn(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Yd(Jn(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return Tr(0,arguments,this),this},t.from=function(i,s,a){return Tr(1,arguments,this),this},t.fromTo=function(i,s,a,o){return Tr(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,br(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new bt(i,s,_n(this,a),1),this},t.call=function(i,s,a){return kn(this,bt.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new bt(i,a,_n(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,br(a).immediateRender=Qt(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},t.staggerFromTo=function(i,s,a,o,l,c,h,u){return o.startAt=a,br(o).immediateRender=Qt(o.immediateRender),this.staggerTo(i,s,o,l,c,h,u)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:ut(i),u=this._zTime<0!=i<0&&(this._initted||!c),d,f,_,g,p,m,x,v,M,T,A,E;if(this!==dt&&h>l&&i>=0&&(h=l),h!==this._tTime||a||u){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),d=h,M=this._start,v=this._ts,m=!v,u&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(d=ut(h%p),h===l?(g=this._repeat,d=c):(T=ut(h/p),g=~~T,g&&g===T&&(d=c,g--),d>c&&(d=c)),T=$s(this._tTime,p),!o&&this._tTime&&T!==g&&this._tTime-T*p-this._dur<=0&&(T=g),A&&g&1&&(d=c-d,E=1),g!==T&&!this._lock){var P=A&&T&1,y=P===(A&&g&1);if(g<T&&(P=!P),o=P?0:h%c?c:h,this._lock=1,this.render(o||(E?0:ut(g*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&hn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,T=g),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,o=P?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!m)return this;cf(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=$x(this,ut(o),ut(d)),x&&(h-=d-(d=x._start))),this._tTime=h,this._time=d,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!T&&(hn(this,"onStart"),this._tTime!==h))return this;if(d>=o&&i>=0)for(f=this._first;f;){if(_=f._next,(f._act||d>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,a),d!==this._time||!this._ts&&!m){x=0,_&&(h+=this._zTime=-st);break}}f=_}else{f=this._last;for(var b=i<0?i:d;f;){if(_=f._prev,(f._act||b<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(b-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(b-f._start)*f._ts,s,a||Ot&&ec(f)),d!==this._time||!this._ts&&!m){x=0,_&&(h+=this._zTime=b?-st:st);break}}f=_}}if(x&&!s&&(this.pause(),x.render(d>=o?0:-st)._zTime=d>=o?1:-1,this._ts))return this._start=M,Xa(this),this.render(i,s,a);this._onUpdate&&!s&&hn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(M===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ri(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(hn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(si(s)||(s=_n(this,s,i)),!(i instanceof Ur)){if(Gt(i))return i.forEach(function(o){return a.add(o,s)}),this;if(It(i))return this.addLabel(i,s);if(vt(i))i=bt.delayedCall(0,i);else return this}return this!==i?kn(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Sn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof bt?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return It(i)?this.removeLabel(i):vt(i)?this.killTweensOf(i):(i.parent===this&&Wa(this,i),i===this._recent&&(this._recent=this._last),Zi(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ut(cn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=_n(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=bt.delayedCall(0,s||Ir,a);return o.data="isPause",this._hasPause=1,kn(this,o,_n(this,i))},t.removePause=function(i){var s=this._first;for(i=_n(this,i);s;)s._start===i&&s.data==="isPause"&&Ri(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)yi!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=En(i),l=this._first,c=si(s),h;l;)l instanceof bt?Gx(l._targets,o)&&(c?(!yi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=_n(a,i),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,d=l.immediateRender,f,_=bt.to(a,pn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||st,onStart:function(){if(a.pause(),!f){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());_._dur!==p&&Ks(_,p,0,1).render(_._time,!0,!0),f=1}h&&h.apply(_,u||[])}},s));return d?_.render(0):_},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,pn({startAt:{time:_n(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),bu(this,_n(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),bu(this,_n(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+st)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=ut(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Zi(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Zi(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=Sn,c,h,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(u=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,kn(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=ut(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Ks(a,a===dt&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(dt._ts&&(Gd(dt,Na(i,dt)),zd=cn.frame),cn.frame>=xu){xu+=dn.autoSleep||120;var s=dt._first;if((!s||!s._ts)&&dn.autoSleep&&cn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||cn.sleep()}}},e}(Ur);pn(qt.prototype,{_lock:0,_hasPause:0,_forcing:0});var uM=function(e,t,n,i,s,a,o){var l=new tn(this._pt,e,t,0,1,_f,null,s),c=0,h=0,u,d,f,_,g,p,m,x;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Dr(i)),a&&(x=[n,i],a(x,e,t),n=x[0],i=x[1]),d=n.match(ko)||[];u=ko.exec(i);)_=u[0],g=i.substring(c,u.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),_!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:g||h===1?g:",",s:p,c:_.charAt(1)==="="?Ns(p,_)-p:parseFloat(_)-p,m:f&&f<4?Math.round:0},c=ko.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Od.test(i)||m)&&(l.e=0),this._pt=l,l},tc=function(e,t,n,i,s,a,o,l,c,h){vt(i)&&(i=i(s||0,e,a));var u=e[t],d=n!=="get"?n:vt(u)?c?e[t.indexOf("set")||!vt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():u,f=vt(u)?c?gM:mf:ic,_;if(It(i)&&(~i.indexOf("random(")&&(i=Dr(i)),i.charAt(1)==="="&&(_=Ns(d,i)+(Ht(d)||0),(_||_===0)&&(i=_))),!h||d!==i||vl)return!isNaN(d*i)&&i!==""?(_=new tn(this._pt,e,t,+d||0,i-(d||0),typeof u=="boolean"?vM:gf,0,f),c&&(_.fp=c),o&&_.modifier(o,this,e),this._pt=_):(!u&&!(t in e)&&Kl(t,i),uM.call(this,e,t,d,i,f,l||dn.stringFilter,c))},dM=function(e,t,n,i,s){if(vt(e)&&(e=Ar(e,s,t,n,i)),!Hn(e)||e.style&&e.nodeType||Gt(e)||Nd(e))return It(e)?Ar(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=Ar(e[o],s,t,n,i);return a},df=function(e,t,n,i,s,a){var o,l,c,h;if(ln[e]&&(o=new ln[e]).init(s,o.rawVars?t[e]:dM(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new tn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==Ps))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},yi,vl,nc=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,d=i.keyframes,f=i.autoRevert,_=e._dur,g=e._startAt,p=e._targets,m=e.parent,x=m&&m.data==="nested"?m.vars.targets:p,v=e._overwrite==="auto"&&!ql,M=e.timeline,T,A,E,P,y,b,O,z,$,D,B,G,K;if(M&&(!d||!s)&&(s="none"),e._ease=Ji(s,Ys.ease),e._yEase=u?lf(Ji(u===!0?s:u,Ys.ease)):0,u&&e._yoyo&&!e._repeat&&(u=e._yEase,e._yEase=e._ease,e._ease=u),e._from=!M&&!!i.runBackwards,!M||d&&!i.stagger){if(z=p[0]?Ki(p[0]).harness:0,G=z&&i[z.prop],T=Da(i,Zl),g&&(g._zTime<0&&g.progress(1),t<0&&h&&o&&!f?g.render(-1,!0):g.revert(h&&_?Ma:zx),g._lazy=0),a){if(Ri(e._startAt=bt.set(p,pn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!g&&Qt(l),startAt:null,delay:0,onUpdate:c&&function(){return hn(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Ot||!o&&!f)&&e._startAt.revert(Ma),o&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(h&&_&&!g){if(t&&(o=!1),E=pn({overwrite:!1,data:"isFromStart",lazy:o&&!g&&Qt(l),immediateRender:o,stagger:0,parent:m},T),G&&(E[z.prop]=G),Ri(e._startAt=bt.set(p,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Ot?e._startAt.revert(Ma):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,st,st);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Qt(l)||l&&!_,A=0;A<p.length;A++){if(y=p[A],O=y._gsap||Ql(p)[A]._gsap,e._ptLookup[A]=D={},dl[O.id]&&Ti.length&&Ia(),B=x===p?A:x.indexOf(y),z&&($=new z).init(y,G||T,e,B,x)!==!1&&(e._pt=P=new tn(e._pt,y,$.name,0,1,$.render,$,0,$.priority),$._props.forEach(function(Z){D[Z]=P}),$.priority&&(b=1)),!z||G)for(E in T)ln[E]&&($=df(E,T,e,B,y,x))?$.priority&&(b=1):D[E]=P=tc.call(e,y,E,"get",T[E],B,x,0,i.stringFilter);e._op&&e._op[A]&&e.kill(y,e._op[A]),v&&e._pt&&(yi=e,dt.killTweensOf(y,D,e.globalTime(t)),K=!e.parent,yi=0),e._pt&&l&&(dl[O.id]=1)}b&&vf(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!K,d&&t<=0&&M.render(Sn,!0,!0)},fM=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(h=d[f][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return vl=1,e.vars[t]="+=0",nc(e,o),vl=0,l?Lr(t+" not eligible for reset"):1;c.push(h)}for(f=c.length;f--;)u=c[f],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,u.e&&(u.e=Mt(n)+Ht(u.e)),u.b&&(u.b=h.s+Ht(u.b))},pM=function(e,t){var n=e[0]?Ki(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=js({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},mM=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(Gt(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},Ar=function(e,t,n,i,s){return vt(e)?e.call(t,n,i,s):It(e)&&~e.indexOf("random(")?Dr(e):e},ff=Jl+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",pf={};en(ff+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return pf[r]=1});var bt=function(r){Id(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:br(i))||this;var l=o.vars,c=l.duration,h=l.delay,u=l.immediateRender,d=l.stagger,f=l.overwrite,_=l.keyframes,g=l.defaults,p=l.scrollTrigger,m=l.yoyoEase,x=i.parent||dt,v=(Gt(n)||Nd(n)?si(n[0]):"length"in i)?[n]:En(n),M,T,A,E,P,y,b,O;if(o._targets=v.length?Ql(v):Lr("GSAP target "+n+" not found. https://gsap.com",!dn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,_||d||va(c)||va(h)){if(i=o.vars,M=o.timeline=new qt({data:"nested",defaults:g||{},targets:x&&x.data==="nested"?x.vars.targets:v}),M.kill(),M.parent=M._dp=Jn(o),M._start=0,d||va(c)||va(h)){if(E=v.length,b=d&&Zd(d),Hn(d))for(P in d)~ff.indexOf(P)&&(O||(O={}),O[P]=d[P]);for(T=0;T<E;T++)A=Da(i,pf),A.stagger=0,m&&(A.yoyoEase=m),O&&js(A,O),y=v[T],A.duration=+Ar(c,Jn(o),T,y,v),A.delay=(+Ar(h,Jn(o),T,y,v)||0)-o._delay,!d&&E===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),M.to(y,A,b?b(T,y,v):0),M._ease=Ze.none;M.duration()?c=h=0:o.timeline=0}else if(_){br(pn(M.vars.defaults,{ease:"none"})),M._ease=Ji(_.ease||i.ease||"none");var z=0,$,D,B;if(Gt(_))_.forEach(function(G){return M.to(v,G,">")}),M.duration();else{A={};for(P in _)P==="ease"||P==="easeEach"||mM(P,_[P],A,_.easeEach);for(P in A)for($=A[P].sort(function(G,K){return G.t-K.t}),z=0,T=0;T<$.length;T++)D=$[T],B={ease:D.e,duration:(D.t-(T?$[T-1].t:0))/100*c},B[P]=D.v,M.to(v,B,z),z+=B.duration;M.duration()<c&&M.to({},{duration:c-M.duration()})}}c||o.duration(c=M.duration())}else o.timeline=0;return f===!0&&!ql&&(yi=Jn(o),dt.killTweensOf(v),yi=0),kn(x,Jn(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(u||!c&&!_&&o._start===ut(x._time)&&Qt(u)&&qx(Jn(o))&&x.data!=="nested")&&(o._tTime=-st,o.render(Math.max(0,-h)||0)),p&&Yd(Jn(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-st&&!h?l:i<st?0:i,d,f,_,g,p,m,x,v,M;if(!c)jx(this,i,s,a);else if(u!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=u,v=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(g*100+i,s,a);if(d=ut(u%g),u===l?(_=this._repeat,d=c):(p=ut(u/g),_=~~p,_&&_===p?(d=c,_--):d>c&&(d=c)),m=this._yoyo&&_&1,m&&(M=this._yEase,d=c-d),p=$s(this._tTime,g),d===o&&!a&&this._initted&&_===p)return this._tTime=u,this;_!==p&&(v&&this._yEase&&cf(v,m),this.vars.repeatRefresh&&!m&&!this._lock&&d!==g&&this._initted&&(this._lock=a=1,this.render(ut(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(jd(this,h?i:d,a,s,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(M||this._ease)(d/c),this._from&&(this.ratio=x=1-x),!o&&u&&!s&&!p&&(hn(this,"onStart"),this._tTime!==u))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;v&&v.render(i<0?i:v._dur*v._ease(d/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&fl(this,i,s,a),hn(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&hn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&fl(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Ri(this,1),!s&&!(h&&!o)&&(u||o||m)&&(hn(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){Nr||cn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||nc(this,c),h=this._ease(c/this._dur),fM(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(qa(this,0),this.parent||Xd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?_r(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ot),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,yi&&yi.vars.overwrite!==!0)._first||_r(this),this.parent&&a!==this.timeline.totalDuration()&&Ks(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?En(i):o,c=this._ptLookup,h=this._pt,u,d,f,_,g,p,m;if((!s||s==="all")&&Wx(o,l))return s==="all"&&(this._pt=0),_r(this);for(u=this._op=this._op||[],s!=="all"&&(It(s)&&(g={},en(s,function(x){return g[x]=1}),s=g),s=pM(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){d=c[m],s==="all"?(u[m]=s,_=d,f={}):(f=u[m]=u[m]||{},_=s);for(g in _)p=d&&d[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&Wa(this,p,"_pt"),delete d[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&h&&_r(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Tr(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return Tr(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return dt.killTweensOf(i,s,a)},e}(Ur);pn(bt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});en("staggerTo,staggerFrom,staggerFromTo",function(r){bt[r]=function(){var e=new qt,t=ml.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var ic=function(e,t,n){return e[t]=n},mf=function(e,t,n){return e[t](n)},gM=function(e,t,n,i){return e[t](i.fp,n)},_M=function(e,t,n){return e.setAttribute(t,n)},sc=function(e,t){return vt(e[t])?mf:Yl(e[t])&&e.setAttribute?_M:ic},gf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},vM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},_f=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},rc=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},yM=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},xM=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Wa(this,t,"_pt"):t.dep||(n=1),t=i;return!n},MM=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},vf=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},tn=function(){function r(t,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||gf,this.d=l||this,this.set=c||ic,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=MM,this.m=n,this.mt=s,this.tween=i},r}();en(Jl+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Zl[r]=1});fn.TweenMax=fn.TweenLite=bt;fn.TimelineLite=fn.TimelineMax=qt;dt=new qt({sortChildren:!1,defaults:Ys,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});dn.stringFilter=of;var Qi=[],Ea={},SM=[],Au=0,EM=0,Wo=function(e){return(Ea[e]||SM).map(function(t){return t()})},yl=function(){var e=Date.now(),t=[];e-Au>2&&(Wo("matchMediaInit"),Qi.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=On.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Wo("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Au=e,Wo("matchMedia"))},yf=function(){function r(t,n){this.selector=n&&gl(n),this.data=[],this._r=[],this.isReverted=!1,this.id=EM++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){vt(n)&&(s=i,i=n,n=vt);var a=this,o=function(){var c=lt,h=a.selector,u;return c&&c!==a&&c.data.push(a),s&&(a.selector=gl(s)),lt=a,u=i.apply(a,arguments),vt(u)&&a._r.push(u),lt=c,a.selector=h,a.isReverted=!1,u};return a.last=o,n===vt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=lt;lt=null,n(this),lt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof bt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof qt?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof bt)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Qi.length;a--;)Qi[a].id===this.id&&Qi.splice(a,1)},e.revert=function(n){this.kill(n||{})},r}(),bM=function(){function r(t){this.contexts=[],this.scope=t,lt&&lt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Hn(n)||(n={matches:n});var a=new yf(0,s||this.scope),o=a.conditions={},l,c,h;lt&&!a.selector&&(a.selector=lt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=On.matchMedia(n[c]),l&&(Qi.indexOf(a)<0&&Qi.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(yl):l.addEventListener("change",yl)));return h&&i(a,function(u){return a.add(null,u)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Ua={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return sf(i)})},timeline:function(e){return new qt(e)},getTweensOf:function(e,t){return dt.getTweensOf(e,t)},getProperty:function(e,t,n,i){It(e)&&(e=En(e)[0]);var s=Ki(e||{}).get,a=n?Wd:Vd;return n==="native"&&(n=""),e&&(t?a((ln[t]&&ln[t].get||s)(e,t,n,i)):function(o,l,c){return a((ln[o]&&ln[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=En(e),e.length>1){var i=e.map(function(h){return sn.quickSetter(h,t,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}e=e[0]||{};var a=ln[t],o=Ki(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var u=new a;Ps._pt=0,u.init(e,n?h+n:h,Ps,0,[e]),u.render(1,u),Ps._pt&&rc(1,Ps)}:o.set(e,l);return a?c:function(h){return c(e,l,n?h+n:h,o,1)}},quickTo:function(e,t,n){var i,s=sn.to(e,pn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(t,l,c,h)};return a.tween=s,a},isTweening:function(e){return dt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ji(e.ease,Ys.ease)),Mu(Ys,e||{})},config:function(e){return Mu(dn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!ln[o]&&!fn[o]&&Lr(t+" effect requires "+o+" plugin.")}),zo[t]=function(o,l,c){return n(En(o),pn(l||{},s),c)},a&&(qt.prototype[t]=function(o,l,c){return this.add(zo[t](o,Hn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Ze[e]=Ji(t)},parseEase:function(e,t){return arguments.length?Ji(e,t):Ze},getById:function(e){return dt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new qt(e),i,s;for(n.smoothChildTiming=Qt(e.smoothChildTiming),dt.remove(n),n._dp=0,n._time=n._tTime=dt._time,i=dt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof bt&&i.vars.onComplete===i._targets[0]))&&kn(n,i,i._start-i._delay),i=s;return kn(dt,n,0),n},context:function(e,t){return e?new yf(e,t):lt},matchMedia:function(e){return new bM(e)},matchMediaRefresh:function(){return Qi.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||yl()},addEventListener:function(e,t){var n=Ea[e]||(Ea[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Ea[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:nM,wrapYoyo:iM,distribute:Zd,random:Qd,snap:Jd,normalize:tM,getUnit:Ht,clamp:Zx,splitColor:rf,toArray:En,selector:gl,mapRange:tf,pipe:Qx,unitize:eM,interpolate:sM,shuffle:Kd},install:Bd,effects:zo,ticker:cn,updateRoot:qt.updateRoot,plugins:ln,globalTimeline:dt,core:{PropTween:tn,globals:kd,Tween:bt,Timeline:qt,Animation:Ur,getCache:Ki,_removeLinkedListItem:Wa,reverting:function(){return Ot},context:function(e){return e&&lt&&(lt.data.push(e),e._ctx=lt),lt},suppressOverwrites:function(e){return ql=e}}};en("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Ua[r]=bt[r]});cn.add(qt.updateRoot);Ps=Ua.to({},{duration:0});var TM=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},AM=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=TM(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},Xo=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(It(s)&&(l={},en(s,function(h){return l[h]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}AM(o,s)}}}},sn=Ua.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Ot?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Xo("roundProps",_l),Xo("modifiers"),Xo("snap",Jd))||Ua;bt.version=qt.version=sn.version="3.14.2";Fd=1;jl()&&Zs();Ze.Power0;Ze.Power1;Ze.Power2;Ze.Power3;Ze.Power4;Ze.Linear;Ze.Quad;Ze.Cubic;Ze.Quart;Ze.Quint;Ze.Strong;Ze.Elastic;Ze.Back;Ze.SteppedEase;Ze.Bounce;Ze.Sine;Ze.Expo;Ze.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var wu,xi,Us,ac,qi,Ru,oc,wM=function(){return typeof window<"u"},ri={},Gi=180/Math.PI,Os=Math.PI/180,Ts=Math.atan2,Cu=1e8,lc=/([A-Z])/g,RM=/(left|right|width|margin|padding|x)/i,CM=/[\s,\(]\S/,zn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},xl=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},PM=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},LM=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},IM=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},DM=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},xf=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Mf=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},NM=function(e,t,n){return e.style[t]=n},UM=function(e,t,n){return e.style.setProperty(t,n)},OM=function(e,t,n){return e._gsap[t]=n},FM=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},BM=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},kM=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},pt="transform",nn=pt+"Origin",zM=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in ri&&s){if(this.tfm=this.tfm||{},e!=="transform")e=zn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Qn(i,o)}):this.tfm[e]=a.x?a[e]:Qn(i,e),e===nn&&(this.tfm.zOrigin=a.zOrigin);else return zn.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(pt)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(nn,t,"")),e=pt}(s||t)&&this.props.push(e,t,s[e])},Sf=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},HM=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(lc,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=oc(),(!s||!s.isStart)&&!n[pt]&&(Sf(n),i.zOrigin&&n[nn]&&(n[nn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Ef=function(e,t){var n={target:e,props:[],revert:HM,save:zM};return e._gsap||sn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},bf,Ml=function(e,t){var n=xi.createElementNS?xi.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):xi.createElement(e);return n&&n.style?n:xi.createElement(e)},un=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(lc,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Js(t)||t,1)||""},Pu="O,Moz,ms,Ms,Webkit".split(","),Js=function(e,t,n){var i=t||qi,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Pu[a]+e in s););return a<0?null:(a===3?"ms":a>=0?Pu[a]:"")+e},Sl=function(){wM()&&window.document&&(wu=window,xi=wu.document,Us=xi.documentElement,qi=Ml("div")||{style:{}},Ml("div"),pt=Js(pt),nn=pt+"Origin",qi.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",bf=!!Js("perspective"),oc=sn.core.reverting,ac=1)},Lu=function(e){var t=e.ownerSVGElement,n=Ml("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Us.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Us.removeChild(n),s},Iu=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Tf=function(e){var t,n;try{t=e.getBBox()}catch{t=Lu(e),n=1}return t&&(t.width||t.height)||n||(t=Lu(e)),t&&!t.width&&!t.x&&!t.y?{x:+Iu(e,["x","cx","x1"])||0,y:+Iu(e,["y","cy","y1"])||0,width:0,height:0}:t},Af=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Tf(e))},Ci=function(e,t){if(t){var n=e.style,i;t in ri&&t!==nn&&(t=pt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(lc,"-$1").toLowerCase())):n.removeAttribute(t)}},Mi=function(e,t,n,i,s,a){var o=new tn(e._pt,t,n,0,1,a?Mf:xf);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},Du={deg:1,rad:1,turn:1},GM={grid:1,flex:1},Pi=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=qi.style,l=RM.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,d=i==="px",f=i==="%",_,g,p,m;if(i===a||!s||Du[i]||Du[a])return s;if(a!=="px"&&!d&&(s=r(e,t,n,"px")),m=e.getCTM&&Af(e),(f||a==="%")&&(ri[t]||~t.indexOf("adius")))return _=m?e.getBBox()[l?"width":"height"]:e[h],Mt(f?s/_*u:s/100*_);if(o[l?"width":"height"]=u+(d?a:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===xi||!g.appendChild)&&(g=xi.body),p=g._gsap,p&&f&&p.width&&l&&p.time===cn.time&&!p.uncache)return Mt(s/p.width*u);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=u+i,_=e[h],x?e.style[t]=x:Ci(e,t)}else(f||a==="%")&&!GM[un(g,"display")]&&(o.position=un(e,"position")),g===e&&(o.position="static"),g.appendChild(qi),_=qi[h],g.removeChild(qi),o.position="absolute";return l&&f&&(p=Ki(g),p.time=cn.time,p.width=g[h]),Mt(d?_*s/u:_&&s?u/_*s:0)},Qn=function(e,t,n,i){var s;return ac||Sl(),t in zn&&t!=="transform"&&(t=zn[t],~t.indexOf(",")&&(t=t.split(",")[0])),ri[t]&&t!=="transform"?(s=Fr(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Fa(un(e,nn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Oa[t]&&Oa[t](e,t,n)||un(e,t)||Hd(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Pi(e,t,s,n)+n:s},VM=function(e,t,n,i){if(!n||n==="none"){var s=Js(t,e,1),a=s&&un(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=un(e,"borderTopColor"))}var o=new tn(this._pt,e.style,t,0,1,_f),l=0,c=0,h,u,d,f,_,g,p,m,x,v,M,T;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=un(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=e.style[t],e.style[t]=i,i=un(e,t)||i,g?e.style[t]=g:Ci(e,t)),h=[n,i],of(h),n=h[0],i=h[1],d=n.match(Cs)||[],T=i.match(Cs)||[],T.length){for(;u=Cs.exec(i);)p=u[0],x=i.substring(l,u.index),_?_=(_+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(_=1),p!==(g=d[c++]||"")&&(f=parseFloat(g)||0,M=g.substr((f+"").length),p.charAt(1)==="="&&(p=Ns(f,p)+M),m=parseFloat(p),v=p.substr((m+"").length),l=Cs.lastIndex-v.length,v||(v=v||dn.units[t]||M,l===i.length&&(i+=v,o.e+=v)),M!==v&&(f=Pi(e,t,g,v)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:f,c:m-f,m:_&&_<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Mf:xf;return Od.test(i)&&(o.e=0),this._pt=o,o},Nu={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},WM=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Nu[n]||n,t[1]=Nu[i]||i,t.join(" ")},XM=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],ri[o]&&(l=1,o=o==="transformOrigin"?nn:pt),Ci(n,o);l&&(Ci(n,pt),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Fr(n,1),a.uncache=1,Sf(i)))}},Oa={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new tn(e._pt,t,n,0,0,XM);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},Or=[1,0,0,1,0,0],wf={},Rf=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Uu=function(e){var t=un(e,pt);return Rf(t)?Or:t.substr(7).match(Ud).map(Mt)},cc=function(e,t){var n=e._gsap||Ki(e),i=e.style,s=Uu(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Or:s):(s===Or&&!e.offsetParent&&e!==Us&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Us.appendChild(e)),s=Uu(e),l?i.display=l:Ci(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Us.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},El=function(e,t,n,i,s,a){var o=e._gsap,l=s||cc(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=l[0],_=l[1],g=l[2],p=l[3],m=l[4],x=l[5],v=t.split(" "),M=parseFloat(v[0])||0,T=parseFloat(v[1])||0,A,E,P,y;n?l!==Or&&(E=f*p-_*g)&&(P=M*(p/E)+T*(-g/E)+(g*x-p*m)/E,y=M*(-_/E)+T*(f/E)-(f*x-_*m)/E,M=P,T=y):(A=Tf(e),M=A.x+(~v[0].indexOf("%")?M/100*A.width:M),T=A.y+(~(v[1]||v[0]).indexOf("%")?T/100*A.height:T)),i||i!==!1&&o.smooth?(m=M-c,x=T-h,o.xOffset=u+(m*f+x*g)-m,o.yOffset=d+(m*_+x*p)-x):o.xOffset=o.yOffset=0,o.xOrigin=M,o.yOrigin=T,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[nn]="0px 0px",a&&(Mi(a,o,"xOrigin",c,M),Mi(a,o,"yOrigin",h,T),Mi(a,o,"xOffset",u,o.xOffset),Mi(a,o,"yOffset",d,o.yOffset)),e.setAttribute("data-svg-origin",M+" "+T)},Fr=function(e,t){var n=e._gsap||new uf(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=un(e,nn)||"0",h,u,d,f,_,g,p,m,x,v,M,T,A,E,P,y,b,O,z,$,D,B,G,K,Z,J,I,C,j,F,W,Q;return h=u=d=g=p=m=x=v=M=0,f=_=1,n.svg=!!(e.getCTM&&Af(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[pt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[pt]!=="none"?l[pt]:"")),i.scale=i.rotate=i.translate="none"),E=cc(e,n.svg),n.svg&&(n.uncache?(Z=e.getBBox(),c=n.xOrigin-Z.x+"px "+(n.yOrigin-Z.y)+"px",K=""):K=!t&&e.getAttribute("data-svg-origin"),El(e,K||c,!!K||n.originIsAbsolute,n.smooth!==!1,E)),T=n.xOrigin||0,A=n.yOrigin||0,E!==Or&&(O=E[0],z=E[1],$=E[2],D=E[3],h=B=E[4],u=G=E[5],E.length===6?(f=Math.sqrt(O*O+z*z),_=Math.sqrt(D*D+$*$),g=O||z?Ts(z,O)*Gi:0,x=$||D?Ts($,D)*Gi+g:0,x&&(_*=Math.abs(Math.cos(x*Os))),n.svg&&(h-=T-(T*O+A*$),u-=A-(T*z+A*D))):(Q=E[6],F=E[7],I=E[8],C=E[9],j=E[10],W=E[11],h=E[12],u=E[13],d=E[14],P=Ts(Q,j),p=P*Gi,P&&(y=Math.cos(-P),b=Math.sin(-P),K=B*y+I*b,Z=G*y+C*b,J=Q*y+j*b,I=B*-b+I*y,C=G*-b+C*y,j=Q*-b+j*y,W=F*-b+W*y,B=K,G=Z,Q=J),P=Ts(-$,j),m=P*Gi,P&&(y=Math.cos(-P),b=Math.sin(-P),K=O*y-I*b,Z=z*y-C*b,J=$*y-j*b,W=D*b+W*y,O=K,z=Z,$=J),P=Ts(z,O),g=P*Gi,P&&(y=Math.cos(P),b=Math.sin(P),K=O*y+z*b,Z=B*y+G*b,z=z*y-O*b,G=G*y-B*b,O=K,B=Z),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,m=180-m),f=Mt(Math.sqrt(O*O+z*z+$*$)),_=Mt(Math.sqrt(G*G+Q*Q)),P=Ts(B,G),x=Math.abs(P)>2e-4?P*Gi:0,M=W?1/(W<0?-W:W):0),n.svg&&(K=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Rf(un(e,pt)),K&&e.setAttribute("transform",K))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Mt(f),n.scaleY=Mt(_),n.rotation=Mt(g)+o,n.rotationX=Mt(p)+o,n.rotationY=Mt(m)+o,n.skewX=x+o,n.skewY=v+o,n.transformPerspective=M+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[nn]=Fa(c)),n.xOffset=n.yOffset=0,n.force3D=dn.force3D,n.renderTransform=n.svg?YM:bf?Cf:qM,n.uncache=0,n},Fa=function(e){return(e=e.split(" "))[0]+" "+e[1]},qo=function(e,t,n){var i=Ht(t);return Mt(parseFloat(t)+parseFloat(Pi(e,"x",n+"px",i)))+i},qM=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Cf(e,t)},ki="0deg",mr="0px",zi=") ",Cf=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,_=n.scaleX,g=n.scaleY,p=n.transformPerspective,m=n.force3D,x=n.target,v=n.zOrigin,M="",T=m==="auto"&&e&&e!==1||m===!0;if(v&&(u!==ki||h!==ki)){var A=parseFloat(h)*Os,E=Math.sin(A),P=Math.cos(A),y;A=parseFloat(u)*Os,y=Math.cos(A),a=qo(x,a,E*y*-v),o=qo(x,o,-Math.sin(A)*-v),l=qo(x,l,P*y*-v+v)}p!==mr&&(M+="perspective("+p+zi),(i||s)&&(M+="translate("+i+"%, "+s+"%) "),(T||a!==mr||o!==mr||l!==mr)&&(M+=l!==mr||T?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+zi),c!==ki&&(M+="rotate("+c+zi),h!==ki&&(M+="rotateY("+h+zi),u!==ki&&(M+="rotateX("+u+zi),(d!==ki||f!==ki)&&(M+="skew("+d+", "+f+zi),(_!==1||g!==1)&&(M+="scale("+_+", "+g+zi),x.style[pt]=M||"translate(0, 0)"},YM=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,_=n.xOrigin,g=n.yOrigin,p=n.xOffset,m=n.yOffset,x=n.forceCSS,v=parseFloat(a),M=parseFloat(o),T,A,E,P,y;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Os,c*=Os,T=Math.cos(l)*u,A=Math.sin(l)*u,E=Math.sin(l-c)*-d,P=Math.cos(l-c)*d,c&&(h*=Os,y=Math.tan(c-h),y=Math.sqrt(1+y*y),E*=y,P*=y,h&&(y=Math.tan(h),y=Math.sqrt(1+y*y),T*=y,A*=y)),T=Mt(T),A=Mt(A),E=Mt(E),P=Mt(P)):(T=u,P=d,A=E=0),(v&&!~(a+"").indexOf("px")||M&&!~(o+"").indexOf("px"))&&(v=Pi(f,"x",a,"px"),M=Pi(f,"y",o,"px")),(_||g||p||m)&&(v=Mt(v+_-(_*T+g*E)+p),M=Mt(M+g-(_*A+g*P)+m)),(i||s)&&(y=f.getBBox(),v=Mt(v+i/100*y.width),M=Mt(M+s/100*y.height)),y="matrix("+T+","+A+","+E+","+P+","+v+","+M+")",f.setAttribute("transform",y),x&&(f.style[pt]=y)},jM=function(e,t,n,i,s){var a=360,o=It(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Gi:1),c=l-i,h=i+c+"deg",u,d;return o&&(u=s.split("_")[1],u==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),u==="cw"&&c<0?c=(c+a*Cu)%a-~~(c/a)*a:u==="ccw"&&c>0&&(c=(c-a*Cu)%a-~~(c/a)*a)),e._pt=d=new tn(e._pt,t,n,i,c,PM),d.e=h,d.u="deg",e._props.push(n),d},Ou=function(e,t){for(var n in t)e[n]=t[n];return e},$M=function(e,t,n){var i=Ou({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,u,d,f,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[pt]=t,o=Fr(n,1),Ci(n,pt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[pt],a[pt]=t,o=Fr(n,1),a[pt]=c);for(l in ri)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(f=Ht(c),_=Ht(h),u=f!==_?Pi(n,l,c,_):parseFloat(c),d=parseFloat(h),e._pt=new tn(e._pt,o,l,u,d-u,xl),e._pt.u=_||0,e._props.push(l));Ou(o,i)};en("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});Oa[e>1?"border"+r:r]=function(o,l,c,h,u){var d,f;if(arguments.length<4)return d=a.map(function(_){return Qn(o,_,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(h+"").split(" "),f={},a.forEach(function(_,g){return f[_]=d[g]=d[g]||d[(g-1)/2|0]}),o.init(l,f,u)}});var Pf={name:"css",register:Sl,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,h,u,d,f,_,g,p,m,x,v,M,T,A,E,P,y;ac||Sl(),this.styles=this.styles||Ef(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(h=t[g],!(ln[g]&&df(g,t,n,i,e,s)))){if(f=typeof h,_=Oa[g],f==="function"&&(h=h.call(n,i,e,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=Dr(h)),_)_(this,e,g,h,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),h+="",Ai.lastIndex=0,Ai.test(c)||(p=Ht(c),m=Ht(h),m?p!==m&&(c=Pi(e,g,c,m)+m):p&&(h+=p)),this.add(o,"setProperty",c,h,i,s,0,0,g),a.push(g),P.push(g,0,o[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],It(c)&&~c.indexOf("random(")&&(c=Dr(c)),Ht(c+"")||c==="auto"||(c+=dn.units[g]||Ht(Qn(e,g))||""),(c+"").charAt(1)==="="&&(c=Qn(e,g))):c=Qn(e,g),d=parseFloat(c),x=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),x&&(h=h.substr(2)),u=parseFloat(h),g in zn&&(g==="autoAlpha"&&(d===1&&Qn(e,"visibility")==="hidden"&&u&&(d=0),P.push("visibility",0,o.visibility),Mi(this,o,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),g!=="scale"&&g!=="transform"&&(g=zn[g],~g.indexOf(",")&&(g=g.split(",")[0]))),v=g in ri,v){if(this.styles.save(g),y=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=un(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var b=e.style.perspective;e.style.perspective=h,h=un(e,"perspective"),b?e.style.perspective=b:Ci(e,"perspective")}u=parseFloat(h)}if(M||(T=e._gsap,T.renderTransform&&!t.parseTransform||Fr(e,t.parseTransform),A=t.smoothOrigin!==!1&&T.smooth,M=this._pt=new tn(this._pt,o,pt,0,1,T.renderTransform,T,0,-1),M.dep=1),g==="scale")this._pt=new tn(this._pt,T,"scaleY",T.scaleY,(x?Ns(T.scaleY,x+u):u)-T.scaleY||0,xl),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(nn,0,o[nn]),h=WM(h),T.svg?El(e,h,0,A,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==T.zOrigin&&Mi(this,T,"zOrigin",T.zOrigin,m),Mi(this,o,g,Fa(c),Fa(h)));continue}else if(g==="svgOrigin"){El(e,h,1,A,0,this);continue}else if(g in wf){jM(this,T,g,d,x?Ns(d,x+h):h);continue}else if(g==="smoothOrigin"){Mi(this,T,"smooth",T.smooth,h);continue}else if(g==="force3D"){T[g]=h;continue}else if(g==="transform"){$M(this,h,e);continue}}else g in o||(g=Js(g)||g);if(v||(u||u===0)&&(d||d===0)&&!CM.test(h)&&g in o)p=(c+"").substr((d+"").length),u||(u=0),m=Ht(h)||(g in dn.units?dn.units[g]:p),p!==m&&(d=Pi(e,g,c,m)),this._pt=new tn(this._pt,v?T:o,g,d,(x?Ns(d,x+u):u)-d,!v&&(m==="px"||g==="zIndex")&&t.autoRound!==!1?DM:xl),this._pt.u=m||0,v&&y!==h?(this._pt.b=c,this._pt.e=y,this._pt.r=IM):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=LM);else if(g in o)VM.call(this,e,g,c,x?x+h:h);else if(g in e)this.add(e,g,c||e[g],x?x+h:h,i,s);else if(g!=="parseTransform"){Kl(g,h);continue}v||(g in o?P.push(g,0,o[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),a.push(g)}}E&&vf(this)},render:function(e,t){if(t.tween._time||!oc())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Qn,aliases:zn,getSetter:function(e,t,n){var i=zn[t];return i&&i.indexOf(",")<0&&(t=i),t in ri&&t!==nn&&(e._gsap.x||Qn(e,"x"))?n&&Ru===n?t==="scale"?FM:OM:(Ru=n||{})&&(t==="scale"?BM:kM):e.style&&!Yl(e.style[t])?NM:~t.indexOf("-")?UM:sc(e,t)},core:{_removeProperty:Ci,_getMatrix:cc}};sn.utils.checkPrefix=Js;sn.core.getStyleSaver=Ef;(function(r,e,t,n){var i=en(r+","+e+","+t,function(s){ri[s]=1});en(e,function(s){dn.units[s]="deg",wf[s]=1}),zn[i[13]]=r+","+e,en(n,function(s){var a=s.split(":");zn[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");en("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){dn.units[r]="px"});sn.registerPlugin(Pf);var Fs=sn.registerPlugin(Pf)||sn;Fs.core.Tween;class KM{constructor(e){this.game=e,this.buildings=[],this.loader=new Jy,this.buildingTypes={hq:{name:"Headquarters",color:62207,size:[2.5,3.5,2.5],modelPath:"./assets/officeBuilding.glb",scale:7,yOffset:.2,description:"The strategic nerve center. Optimize operations to boost morale.",actions:[{id:"optimize",label:"⚙️ Optimize Operations (+8% Morale)"},{id:"sell_equity",label:"📊 Sell 10% Equity (+$10k)"}]},factory:{name:"Production Plant",color:16747520,size:[5,2.5,4],modelPath:"./assets/warehouse.glb",scale:7,yOffset:.2,description:"High-output manufacturing. $300/tick. Vulnerable to accidents and logistics failures.",actions:[{id:"expand_prod",label:"🏭 Expand Production (–$5k)"},{id:"safety_protocol",label:"🔥 Safety Protocol (–$2k) [resolves accident]"}]},bank:{name:"NovaTech Bank",color:7089113,size:[2.5,6,2.5],modelPath:"./assets/bank.glb",scale:7,yOffset:.2,description:"Secure your capital. Take loans or sell equity for immediate cash injections.",actions:[{id:"take_loan",label:"💰 Take $5k Emergency Loan"},{id:"sell_equity",label:"📊 Sell 10% Equity (+$10k)"}]},hr:{name:"Office Building (HR)",color:3069299,size:[2,2.5,2],modelPath:"./assets/office.glb",scale:7,yOffset:.2,description:"Human Resources hub. Keep morale high to maximize all building output.",actions:[{id:"bonus",label:"🎁 Staff Bonus (–$2k, +20% Morale)"},{id:"hire_staff",label:"👥 Hire Staff (–$3k, +10% Morale)"},{id:"resolve_strike",label:"✋ Resolve Strike (–$3k) [resolves strike]"}]},rd:{name:"R&D Lab",color:16729943,size:[3,2.5,4],modelPath:"./assets/rdLab.glb",scale:7,yOffset:.2,description:"Innovation engine. Passive income $50/tick. Target of data breaches.",actions:[{id:"research",label:"🔬 Start Research Project (–$3k)"},{id:"security_patch",label:"🔒 Security Patch (–$3.5k) [resolves breach]"}]},warehouse:{name:"Logistics Warehouse",color:8623527,size:[6,2,5],modelPath:"./assets/warehouse.glb",scale:7,yOffset:.2,description:"Supply chain backbone. $80/tick. Vulnerable to logistics crises.",actions:[{id:"storage_upgrade",label:"🚚 Upgrade Capacity (–$4k)"},{id:"logistics_fix",label:"🛠️ Emergency Logistics Fix (–$4k) [resolves crisis]"}]},media:{name:"Media Tower",color:16766720,size:[2,8,2],modelPath:"./assets/tower.glb",scale:7,yOffset:.2,description:"Public relations powerhouse. Counter competitor attacks. Broadcast viral campaigns.",actions:[{id:"marketing_campaign",label:"📢 Marketing Campaign (–$2k, +15 Reputation)"},{id:"counter_campaign",label:"⚔️ Counter-Campaign (–$2.5k) [resolves competitor]"},{id:"surge_broadcast",label:"🚀 Surge Broadcast (–$1k) [captures market surge]"},{id:"pr_statement",label:"📰 Issue PR Statement (+10 Reputation)"}]},storefront:{name:"Metro Storefront",color:14774357,size:[3,1.5,2.5],modelPath:"./assets/store.glb",scale:7,yOffset:.2,description:"Consumer-facing sales outlet. $150/tick. Vulnerable to competitor attacks.",actions:[{id:"marketing_campaign",label:"📢 Local Promotion (–$2k, +15 Reputation)"}]}},this.init()}_createBuildingNameCloud(e){const t=document.createElement("div");return t.className="building-name-cloud",t.textContent=e||"",t}_attachBuildingNameCloud(e,t){var o,l;if(!e||!t)return;const n=((o=e==null?void 0:e.userData)==null?void 0:o.name)||(t==null?void 0:t.name)||"",i=this._createBuildingNameCloud(n),s=new Xl(i),a=(((l=t.size)==null?void 0:l[1])||3)*(t.scale||1)*.1;s.position.set(0,a+3,0),e.add(s),e.userData.nameLabelEl=i,e.userData.nameLabelObj=s}_updateBuildingNameCloud(e){var n,i;const t=(n=e==null?void 0:e.userData)==null?void 0:n.nameLabelEl;t&&(t.textContent=((i=e==null?void 0:e.userData)==null?void 0:i.name)||"")}init(){this.createSky(),this.createGround(),this.createRoads(),this.createEnvironment()}spawnTutorialHQ(){this.addBuilding("hq",0,0)}spawnInitialBuildings(e=1){this.buildings=[],this.game.scene.children.filter(s=>s.userData&&s.userData.type).forEach(s=>this.game.scene.remove(s));const t={2:{"./assets/officeBuilding.glb":"./assets/level2/hq.glb","./assets/warehouse.glb":"./assets/level2/warehouse.glb","./assets/bank.glb":"./assets/level2/bank.glb","./assets/office.glb":"./assets/level2/office.glb","./assets/rdLab.glb":"./assets/level2/warehouse.glb","./assets/tower.glb":"./assets/level2/townhall.glb","./assets/store.glb":"./assets/level2/store.glb"},3:{"./assets/officeBuilding.glb":"./assets/level3/hq.glb","./assets/warehouse.glb":"./assets/level3/warehouse.glb","./assets/bank.glb":"./assets/level3/bank.glb","./assets/office.glb":"./assets/level3/rdLab.glb","./assets/rdLab.glb":"./assets/level3/rdLab.glb","./assets/tower.glb":"./assets/level3/tower.glb","./assets/store.glb":"./assets/level3/restaurant.glb"}};this._levelOverrides=t[e]||{},this.addBuilding("hq",-9,-9),this.addBuilding("media",-9,9),this.addBuilding("hr",-23,9),this.addBuilding("factory",-23,-9),this.addBuilding("storefront",9,9),this.addBuilding("warehouse",23,9),this.addBuilding("bank",9,-9),this.addBuilding("rd",23,-9);const n=["bank","rd","factory","warehouse","storefront"];[[-40,-40],[-40,0],[-40,40],[-40,65],[40,-40],[40,0],[40,40],[40,65],[65,-40],[65,0],[65,40],[65,65],[-65,-40],[-65,0],[-65,40],[-65,65],[0,-40],[0,40],[0,65]].forEach(s=>{if(Math.random()>.2){const a=n[Math.floor(Math.random()*n.length)],o=Math.random()>.5?9:-9,l=Math.random()>.5?9:-9;this.addBuilding(a,s[0]+o,s[1]+l)}}),this._levelOverrides={}}spawnMultiplayerBuildings(e,t){this.buildings=[],this.game.scene.children.filter(o=>o.userData&&o.userData.type).forEach(o=>this.game.scene.remove(o));const n=Math.min(e,4);n>1&&(this.addBuilding("bank",0,-2),this.addBuilding("media",0,3));const i=30,s=[[-1,-1],[1,-1],[-1,1],[1,1]],a=[];for(let o=0;o<n;o++){const[l,c]=s[o],h=l*i,u=c*i,d=o===t;a.push([h,u]);const f=this.addBuilding("hq",h,u);f.userData.ownerIndex=o,d||(f.userData.name=`CEO ${o+1}'s HQ`,this._updateBuildingNameCloud(f));const _=this.addBuilding("factory",h+5*l,u+5*c);_.userData.ownerIndex=o;const g=this.addBuilding("warehouse",h-5*l,u+5*c);g.userData.ownerIndex=o;const p=this.addBuilding("warehouse",h+5*l,u-5*c);p.userData.ownerIndex=o;const m=this.addBuilding("rd",h-10*l,u-10*c);m.userData.ownerIndex=o,d&&(this.game.controls.target.set(h,0,u),this.game.camera.position.set(h+100,100,u+100))}this._scatterMultiplayerLandmarks(a)}_scatterMultiplayerLandmarks(e=[]){const t=[["./assets/burjKhalifa.glb",2.5],["./assets/lake1.glb",4],["./assets/lake2.glb",4],["./assets/townhall.glb",3.5],["./assets/house.glb",3],["./assets/level2/clockTower.glb",5],["./assets/level2/eiffelTower.glb",3],["./assets/level2/house2.glb",3.5],["./assets/level2/townhall.glb",4],["./assets/level2/lake1.glb",4],["./assets/level2/restaurant.glb",3.5],["./assets/level3/college.glb",4],["./assets/level3/tower.glb",4],["./assets/level3/tower2.glb",4],["./assets/level3/tower3.glb",4],["./assets/level3/townhall.glb",4.5]],n=[0,15,-15,40,-40,65,-65],i=[0,15,-15,40,-40,65,-65],s=7,a=18,o=(_,g)=>{for(const p of n)if(Math.abs(_-p)<s)return!0;for(const p of i)if(Math.abs(g-p)<s)return!0;return!1},l=(_,g)=>{for(const[p,m]of e){const x=_-p,v=g-m;if(Math.sqrt(x*x+v*v)<a)return!0}return!1},c=[],h=14,u=30,d=100;let f=0;for(;c.length<u&&f<u*20;){f++;const _=(Math.random()-.5)*d*2,g=(Math.random()-.5)*d*2;if(o(_,g)||l(_,g))continue;let p=!1;for(const[M,T]of c){const A=_-M,E=g-T;if(Math.sqrt(A*A+E*E)<h){p=!0;break}}if(p)continue;const[m,x]=t[Math.floor(Math.random()*t.length)],v=new zt;v.position.set(_,0,g),this.game.scene.add(v),this._loadModel(v,m,x,.2),c.push([_,g])}}createSky(){this.game.scene.background=new Ie(8571002),this.game.scene.fog=new Ul(13691125,180,320);const e=new Rs(800,32,16),t=new wi({side:Yt,uniforms:{topColor:{value:new Ie(1731253)},bottomColor:{value:new Ie(8571002)},horizon:{value:.4},exponent:{value:.6}},vertexShader:`
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPos = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPos.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,fragmentShader:`
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float horizon;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition).y;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h - horizon, 0.0), exponent), 0.0)), 1.0);
                }
            `}),n=new Qe(e,t);this.game.scene.add(n);const i=new Un(12,32),s=new Xt({color:16776672,transparent:!0,opacity:.92,depthWrite:!1}),a=new Qe(i,s);a.position.set(-200,350,-400),a.lookAt(0,0,0),this.game.scene.add(a);const o=new Un(22,32),l=new Xt({color:16774576,transparent:!0,opacity:.3,depthWrite:!1}),c=new Qe(o,l);c.position.copy(a.position),c.lookAt(0,0,0),this.game.scene.add(c)}createGround(){const e=new Pn(2e3,2e3,8,8),t=new Cn({color:8571002}),n=new Qe(e,t);n.rotation.x=-Math.PI/2,n.position.y=-.05,n.receiveShadow=!0,this.game.scene.add(n);const i=[new Cn({color:7782255}),new Cn({color:5941842}),new Cn({color:9427336}),new Cn({color:7193701}),new Cn({color:10347412})],s=[new Un(3.5,6),new Un(6,6),new Un(10,6)];for(let P=0;P<90;P++){const y=(Math.random()-.5)*260,b=(Math.random()-.5)*260;if(Math.abs(y%15)<5||Math.abs(b%15)<5)continue;const O=new Qe(s[P%3],i[P%5]);O.rotation.x=-Math.PI/2,O.position.set(y,-.03,b),this.game.scene.add(O)}const a=1200*2,o=new Pn(.35,.6),l=new Xt({color:5023812,side:In}),c=new pi(o,l,a);c.frustumCulled=!0;const h=new ke,u=new Dt,d=new N,f=new N(1,1,1);let _=0;for(let P=0;P<1200&&_<a-1;P++){const y=(Math.random()-.5)*240,b=(Math.random()-.5)*240;if(!(Math.abs(y%15)<6.5||Math.abs(b%15)<6.5))for(let O=0;O<2;O++)d.set(y+(Math.random()-.5)*.3,.3,b+(Math.random()-.5)*.3),u.setFromEuler(new ei(0,O*Math.PI/2+Math.random()*.5,(Math.random()-.5)*.3)),h.compose(d,u,f),c.setMatrixAt(_++,h)}c.count=_,c.instanceMatrix.needsUpdate=!0,this.game.scene.add(c);const g=500,p=new Xi(.04,.04,.5,4),m=new Cn({color:2984493}),x=new Rs(.14,5,4),v=new Cn({vertexColors:!0}),M=new pi(p,m,g),T=new pi(x,v,g);M.frustumCulled=!0,T.frustumCulled=!0;const A=[16739229,16767293,16753920,16729943,15620644,12938480,16771751];let E=0;for(let P=0;P<g*3&&E<g;P++){const y=(Math.random()-.5)*220,b=(Math.random()-.5)*220;if(Math.abs(y%15)<6||Math.abs(b%15)<6)continue;const O=Math.random()*Math.PI*2;u.setFromEuler(new ei(0,O,0)),d.set(y,.25,b),h.compose(d,u,f),M.setMatrixAt(E,h),d.set(y,.58,b),h.compose(d,u,f),T.setMatrixAt(E,h),T.setColorAt(E,new Ie(A[E%A.length])),E++}M.count=E,T.count=E,M.instanceMatrix.needsUpdate=!0,T.instanceMatrix.needsUpdate=!0,T.instanceColor&&(T.instanceColor.needsUpdate=!0),this.game.scene.add(M),this.game.scene.add(T)}createRoads(){const e=new zt,t=4.5,n=1.2,i=320,s=new Cn({color:13220250}),a=new Cn({color:4870745}),o=new Xt({color:16239128}),l=new Xt({color:16777215}),c=new Pn(t+n*2,i),h=new Pn(t,i),u=new Pn(t*.035,i),d=4,f=Math.floor(i/d),_=new Pn(t*.05,1),m=(7+7)*f*2,x=new pi(_,l,m);x.frustumCulled=!1;const v=new ke,M=new Dt().setFromEuler(new ei(-Math.PI/2,0,0)),T=new N(1,1,1),A=new Dt().setFromEuler(new ei(-Math.PI/2,Math.PI/2,0));let E=0;const P=(ce,pe,Ae,ee,Ue=0)=>{const Pe=new zt,we=Math.abs(Ue)>.1,Te=new Qe(c,s);Te.rotation.x=-Math.PI/2,Te.position.y=.005,Pe.add(Te);const ye=new Qe(h,a);ye.rotation.x=-Math.PI/2,ye.position.y=.01,Pe.add(ye);const L=new Qe(u,o);L.rotation.x=-Math.PI/2,L.position.y=.02,Pe.add(L);const oe=we?A:M,Re=Ae*.25;for(let xe=0;xe<f;xe++){const ne=-160+xe*d+2;E+1<m&&(v.compose(new N(we?pe+ne:ce+Re,.022,we?ce:pe+ne),oe,T),x.setMatrixAt(E++,v),v.compose(new N(we?pe+ne:ce-Re,.022,we?ce:pe+ne),oe,T),x.setMatrixAt(E++,v))}return Pe.position.set(ce,0,pe),Pe.rotation.y=Ue,e.add(Pe),Pe};P(0,0,t,i,0),P(15,0,t,i,0),P(-15,0,t,i,0),P(40,0,t,i,0),P(-40,0,t,i,0),P(65,0,t,i,0),P(-65,0,t,i,0),P(0,0,t,i,Math.PI/2),P(0,15,t,i,Math.PI/2),P(0,-15,t,i,Math.PI/2),P(0,40,t,i,Math.PI/2),P(0,-40,t,i,Math.PI/2),P(0,65,t,i,Math.PI/2),P(0,-65,t,i,Math.PI/2);const y=new di({color:4870745,shininess:5}),b=(ce,pe,Ae,ee)=>{const Ue=new zt,Pe=new Pn(3,Ae),we=new Qe(Pe,y);we.rotation.x=-Math.PI/2,we.position.y=.009,Ue.add(we),Ue.position.set(ce,0,pe),Ue.rotation.y=ee,e.add(Ue)};b(-27,-27,26,Math.PI/4),b(27,27,26,Math.PI/4),b(-27,27,26,-Math.PI/4),b(27,-27,26,-Math.PI/4),b(-52,52,18,Math.PI/4),b(52,-52,18,Math.PI/4),b(-52,-52,18,-Math.PI/4),b(52,52,18,-Math.PI/4);const O=new di({color:4014921}),z=new kl(3.5,7,24),$=new Qe(z,O);$.rotation.x=-Math.PI/2,$.position.set(0,.015,0),e.add($);const D=new di({color:6076508}),B=new Un(3.4,24),G=new Qe(B,D);G.rotation.x=-Math.PI/2,G.position.set(0,.02,0),e.add(G);const K=new di({color:11184810}),Z=new Qe(new Xi(1.2,1.4,.3,16),K);Z.position.set(0,.22,0),e.add(Z);const J=new Qe(new Xi(.15,.2,1.2,8),K);J.position.set(0,.82,0),e.add(J);const I=new Qe(new Rs(.35,8,6),new di({color:10079487,transparent:!0,opacity:.7}));I.position.set(0,1.5,0),e.add(I);const C=new Qe(new Un(1.1,16),new di({color:7255551,transparent:!0,opacity:.6}));C.rotation.x=-Math.PI/2,C.position.set(0,.38,0),e.add(C),x.instanceMatrix.needsUpdate=!0,e.add(x);const j=new Xi(.08,.1,4,5),F=new Rs(.2,6,5),W=new Cn({color:5592422}),Q=new Xt({color:16772744}),ae=[0,15,-15,40,-40,65,-65],te=[0,15,-15,40,-40,65,-65],de=12,ge=140,fe=[];ae.forEach(ce=>{for(let pe=-ge;pe<=ge;pe+=de)fe.push([ce+3.5,pe,0]),fe.push([ce-3.5,pe,Math.PI])}),te.forEach(ce=>{for(let pe=-ge;pe<=ge;pe+=de)fe.push([pe,ce+3.5,Math.PI/2]),fe.push([pe,ce-3.5,-Math.PI/2])});const Se=fe.length,k=new pi(j,W,Se),Ve=new pi(F,Q,Se),le=new Xi(.05,.05,1.5,4),Ee=new pi(le,W,Se);k.frustumCulled=!0,Ve.frustumCulled=!0,Ee.frustumCulled=!0;const _e=new Dt,He=new N(1,1,1),Ce=new ke,R=new Dt().setFromAxisAngle(new N(0,0,1),Math.PI/2),S=new Dt,V=new Dt;fe.forEach(([ce,pe,Ae],ee)=>{_e.setFromEuler(new ei(0,Ae,0)),Ce.compose(new N(ce,2,pe),_e,He),k.setMatrixAt(ee,Ce);const Ue=ce+Math.cos(Ae)*1.5,Pe=pe-Math.sin(Ae)*1.5;Ce.compose(new N(Ue,3.8,Pe),_e,He),Ve.setMatrixAt(ee,Ce);const we=ce+Math.cos(Ae)*.75,Te=pe-Math.sin(Ae)*.75;S.setFromAxisAngle(new N(0,1,0),Ae),V.multiplyQuaternions(S,R),Ce.compose(new N(we,3.8,Te),V,He),Ee.setMatrixAt(ee,Ce)}),k.instanceMatrix.needsUpdate=!0,Ve.instanceMatrix.needsUpdate=!0,Ee.instanceMatrix.needsUpdate=!0,e.add(k),e.add(Ve),e.add(Ee);const se=new Rd(16774604,4491332,.3);this.game.scene.add(se);const ie=new di({color:4344144});[[0,0],[15,0],[-15,0],[0,15],[0,-15],[15,15],[15,-15],[-15,15],[-15,-15],[40,0],[-40,0],[0,40],[0,-40],[40,40],[40,-40],[-40,40],[-40,-40],[65,0],[-65,0],[0,65],[0,-65]].forEach(([ce,pe])=>{const Ae=new Un(t*.9,12),ee=new Qe(Ae,ie);ee.rotation.x=-Math.PI/2,ee.position.set(ce,.012,pe),e.add(ee)});const be=new Xt({color:16777215}),ue=(ce,pe,Ae)=>{const ee=new zt;for(let Ue=-3;Ue<=3;Ue++){const Pe=new Qe(new Pn(.5,t),be);Pe.rotation.x=-Math.PI/2,Pe.position.set(Ue*.85,.018,0),ee.add(Pe)}ee.position.set(ce,0,pe),ee.rotation.y=Ae,e.add(ee)};ue(7.5,0,0),ue(-7.5,0,0),ue(0,7.5,Math.PI/2),ue(0,-7.5,Math.PI/2),ue(22.5,0,0),ue(-22.5,0,0),ue(0,22.5,Math.PI/2),ue(0,-22.5,Math.PI/2),this.game.scene.add(e)}createEnvironment(){const e=new zt;this.game.scene.add(e);const t=new Map,n=[],i=(P,y)=>{if(t.has(P)){y(t.get(P).clone());return}n[P]||(n[P]=[]),n[P].push(y),n[P].length===1&&this.loader.load(P,b=>{const O=b.scene;O.traverse(z=>{z.isMesh&&(z.castShadow=!0,z.receiveShadow=!0,z.material&&(z.material.roughness=.8,z.material.metalness=.05))}),t.set(P,O);for(const z of n[P])z(O.clone());n[P]=[]})},s=(P,y,b,O,z=0)=>{const $=new zt;$.position.set(y,0,b),e.add($),i(P,D=>{D.scale.set(O,O,O),D.rotation.y=z,D.updateMatrixWorld(!0);const B=new bn().setFromObject(D);D.position.y=-B.min.y,$.add(D)})},a=new Set([0,15,-15,40,-40,65,-65]),o=new Set([0,15,-15,40,-40,65,-65]),l=7,c=(P,y)=>{for(const b of a)if(Math.abs(P-b)<l)return!0;for(const b of o)if(Math.abs(y-b)<l)return!0;return Math.abs(P+27)<5&&Math.abs(y+27)<15||Math.abs(P-27)<5&&Math.abs(y-27)<15||Math.abs(P+27)<5&&Math.abs(y-27)<15||Math.abs(P-27)<5&&Math.abs(y+27)<15},h=["./assets/lushGreenTree.glb","./assets/coniferousTree.glb","./assets/coniferous_tree.glb"],u=650;let d=0,f=0;for(;d<u&&f<u*5;){f++;const P=(Math.random()-.5)*260,y=(Math.random()-.5)*260;c(P,y)||(Math.random()>.35?s(h[d%3],P,y,4,Math.random()*Math.PI*2):s("./assets/new_bush.glb",P,y,2,Math.random()*Math.PI*2),d++)}const _=[],g=150,p=5;let m=0,x=0;for(;m<g&&x<g*10;){x++;const P=(Math.random()-.5)*85,y=(Math.random()-.5)*85;if(Math.sqrt(P*P+y*y)<12||c(P,y))continue;let b=!1;for(const $ of _){const D=P-$.x,B=y-$.z;if(Math.sqrt(D*D+B*B)<p){b=!0;break}}if(b)continue;const O=Math.random()>.3?h[m%3]:"./assets/new_bush.glb",z=O.includes("bush")?2.2:4+Math.random();s(O,P,y,z,Math.random()*Math.PI*2),_.push({x:P,z:y}),m++}[[-75,-75,5],[75,-70,3],[-65,75,4],[-55,-55,4],[55,55,3],[-85,20,3],[85,-20,4],[-30,-90,5],[30,90,3],[-90,60,4],[90,-60,5],[50,-90,3]].forEach(([P,y,b])=>s("./assets/rock1.glb",P,y,b,Math.random()*Math.PI*2));const M=(P,y,b)=>s("./assets/car.glb",P,y,3,b);M(0,-60,Math.PI/2),M(60,6,Math.PI/2),M(-60,12,Math.PI/2),M(41,0,0),M(-41,0,0),M(15,-60,Math.PI/2),M(-15,-80,Math.PI/2),M(65,15,0),M(-65,15,0),M(2,60,0),M(-2,-60,0),M(40,65,0),M(-40,65,0),M(0,-80,Math.PI/2),M(65,-40,Math.PI/2),M(-65,-40,Math.PI/2);const T=[[-40,-40],[-40,0],[-40,40],[-40,65],[40,-40],[40,0],[40,40],[40,65],[65,-40],[65,0],[65,40],[65,65],[-65,-40],[-65,0],[-65,40],[-65,65],[0,-40],[0,40],[0,65]];T.forEach(([P,y])=>{Math.random()>.35&&M(P,y+(Math.random()>.5?8:-8),Math.PI/2),Math.random()>.35&&M(P+(Math.random()>.5?8:-8),y,0)});const A=(P,y,b,O)=>s(`./assets/${P}.glb`,y,b,2.5,O);[["employee",-14,-14,Math.PI/4],["ceo",-18,-14,-Math.PI/4],["employee",-14,18,Math.PI/2],["ceo",-18,14,Math.PI],["employee",18,14,-Math.PI/4],["employee",14,18,Math.PI/4],["ceo",14,-18,Math.PI/2],["employee",18,-14,-Math.PI/2],["employee",30,9,-Math.PI/2],["employee",-30,-9,Math.PI/2],["ceo",30,-15,-Math.PI/4],["employee",-30,15,Math.PI/4],["employee",60,41,Math.PI],["employee",60,-41,Math.PI],["employee",-60,41,Math.PI],["employee",-60,-41,Math.PI],["employee",5,5,Math.PI/4],["ceo",-5,-5,-Math.PI/4],["employee",40,2,Math.PI/2],["employee",-40,-2,-Math.PI/2],["ceo",0,20,Math.PI],["employee",20,0,Math.PI/2],["employee",-20,0,-Math.PI/2],["ceo",0,-20,0]].forEach(([P,y,b,O])=>A(P,y,b,O)),T.forEach(([P,y])=>{const b=Math.floor(Math.random()*3)+2;for(let O=0;O<b;O++){const z=Math.random()>.75?"ceo":"employee";A(z,P+(Math.random()-.5)*16,y+(Math.random()-.5)*16,Math.random()*Math.PI*2)}}),s("./assets/townhall.glb",0,80,4),s("./assets/apartment.glb",-80,-40,4,Math.PI/2),s("./assets/apartment1.glb",-80,40,3,Math.PI/2),s("./assets/apartment.glb",-80,0,4,Math.PI/2),s("./assets/house.glb",80,-40,3,-Math.PI/2),s("./assets/house.glb",80,40,3,-Math.PI/2),s("./assets/house.glb",80,0,3,-Math.PI/2),s("./assets/lake1.glb",-70,-70,4),s("./assets/lake2.glb",70,70,4),s("./assets/burjKhalifa.glb",0,-110,2)}_loadModel(e,t,n=1,i=.2){t&&this.loader.load(t,s=>{const a=s.scene;a.scale.set(n,n,n),a.updateMatrixWorld(!0);const o=new bn().setFromObject(a);a.position.y=i-o.min.y,a.traverse(l=>{l.isMesh&&(l.castShadow=!0,l.receiveShadow=!0,l.material&&(l.material.roughness=.8,l.material.metalness=.05))}),e.add(a)})}addBuilding(e,t,n){const i=this.buildingTypes[e],s=new zt,a=new tr(i.size[0]+2,.2,i.size[2]+2),o=new di({color:14540253}),l=new Qe(a,o);l.position.y=.1,l.receiveShadow=!0,s.add(l);const c=i.modelPath,h=this._levelOverrides&&this._levelOverrides[c]?this._levelOverrides[c]:c;return this._loadModel(s,h,i.scale,i.yOffset),s.position.set(t,0,n),s.userData={buildingId:Math.random().toString(36).substr(2,9),type:e,name:i.name},this._attachBuildingNameCloud(s,i),this.game.scene.add(s),this.buildings.push(s),s}createCEO(){if(this.ceo)return this.ceo;const e=new zt;this.loader.load("./assets/ceo.glb",s=>{const a=s.scene;a.scale.set(2,2,2),a.updateMatrixWorld(!0);const o=new bn().setFromObject(a);a.position.y=.3-o.min.y,a.traverse(l=>{l.isMesh&&(l.castShadow=!0,l.receiveShadow=!0,l.material&&(l.material.roughness=.4,l.material.metalness=.5))}),e.add(a)});const t=new zl(.8,.04,16,100),n=new Xt({color:16764201}),i=new Qe(t,n);return i.rotation.x=Math.PI/2,i.position.y=2.5,e.add(i),this.ceoHead=new at,this.ceoHead.position.y=5,e.add(this.ceoHead),e.position.set(0,0,0),this.game.scene.add(e),this.ceo=e,e}moveCEOTo(e,t){this.ceo||this.createCEO(),Fs.to(this.ceo.position,{x:e,z:t+2,duration:1,ease:"power2.inOut"}),Fs.to(this.ceo.position,{y:.5,duration:.2,repeat:1,yoyo:!0,ease:"power1.out"})}removeCEO(){this.ceo&&(this.game.scene.remove(this.ceo),this.ceo=null)}update(){const e=Date.now()*.001;if(this.buildings.forEach((t,n)=>{}),this.ceo){const t=this.ceo.children.find(n=>n.geometry.type==="TorusGeometry");t&&(t.rotation.z+=.02),this.ceo.position.y=.1+Math.sin(e*3)*.1}}}var hc={};(function r(e,t,n,i){var s=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),a=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var I=new OffscreenCanvas(1,1),C=I.getContext("2d");C.fillRect(0,0,1,1);var j=I.transferToImageBitmap();C.createPattern(j,"no-repeat")}catch{return!1}return!0}();function l(){}function c(I){var C=t.exports.Promise,j=C!==void 0?C:e.Promise;return typeof j=="function"?new j(I):(I(l,l),null)}var h=function(I,C){return{transform:function(j){if(I)return j;if(C.has(j))return C.get(j);var F=new OffscreenCanvas(j.width,j.height),W=F.getContext("2d");return W.drawImage(j,0,0),C.set(j,F),F},clear:function(){C.clear()}}}(o,new Map),u=function(){var I=Math.floor(16.666666666666668),C,j,F={},W=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(C=function(Q){var ae=Math.random();return F[ae]=requestAnimationFrame(function te(de){W===de||W+I-1<de?(W=de,delete F[ae],Q()):F[ae]=requestAnimationFrame(te)}),ae},j=function(Q){F[Q]&&cancelAnimationFrame(F[Q])}):(C=function(Q){return setTimeout(Q,I)},j=function(Q){return clearTimeout(Q)}),{frame:C,cancel:j}}(),d=function(){var I,C,j={};function F(W){function Q(ae,te){W.postMessage({options:ae||{},callback:te})}W.init=function(te){var de=te.transferControlToOffscreen();W.postMessage({canvas:de},[de])},W.fire=function(te,de,ge){if(C)return Q(te,null),C;var fe=Math.random().toString(36).slice(2);return C=c(function(Se){function k(Ve){Ve.data.callback===fe&&(delete j[fe],W.removeEventListener("message",k),C=null,h.clear(),ge(),Se())}W.addEventListener("message",k),Q(te,fe),j[fe]=k.bind(null,{data:{callback:fe}})}),C},W.reset=function(){W.postMessage({reset:!0});for(var te in j)j[te](),delete j[te]}}return function(){if(I)return I;if(!n&&s){var W=["var CONFETTI, SIZE = {}, module = {};","("+r.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{I=new Worker(URL.createObjectURL(new Blob([W])))}catch(Q){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",Q),null}F(I)}return I}}(),f={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function _(I,C){return C?C(I):I}function g(I){return I!=null}function p(I,C,j){return _(I&&g(I[C])?I[C]:f[C],j)}function m(I){return I<0?0:Math.floor(I)}function x(I,C){return Math.floor(Math.random()*(C-I))+I}function v(I){return parseInt(I,16)}function M(I){return I.map(T)}function T(I){var C=String(I).replace(/[^0-9a-f]/gi,"");return C.length<6&&(C=C[0]+C[0]+C[1]+C[1]+C[2]+C[2]),{r:v(C.substring(0,2)),g:v(C.substring(2,4)),b:v(C.substring(4,6))}}function A(I){var C=p(I,"origin",Object);return C.x=p(C,"x",Number),C.y=p(C,"y",Number),C}function E(I){I.width=document.documentElement.clientWidth,I.height=document.documentElement.clientHeight}function P(I){var C=I.getBoundingClientRect();I.width=C.width,I.height=C.height}function y(I){var C=document.createElement("canvas");return C.style.position="fixed",C.style.top="0px",C.style.left="0px",C.style.pointerEvents="none",C.style.zIndex=I,C}function b(I,C,j,F,W,Q,ae,te,de){I.save(),I.translate(C,j),I.rotate(Q),I.scale(F,W),I.arc(0,0,1,ae,te,de),I.restore()}function O(I){var C=I.angle*(Math.PI/180),j=I.spread*(Math.PI/180);return{x:I.x,y:I.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:I.startVelocity*.5+Math.random()*I.startVelocity,angle2D:-C+(.5*j-Math.random()*j),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:I.color,shape:I.shape,tick:0,totalTicks:I.ticks,decay:I.decay,drift:I.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:I.gravity*3,ovalScalar:.6,scalar:I.scalar,flat:I.flat}}function z(I,C){C.x+=Math.cos(C.angle2D)*C.velocity+C.drift,C.y+=Math.sin(C.angle2D)*C.velocity+C.gravity,C.velocity*=C.decay,C.flat?(C.wobble=0,C.wobbleX=C.x+10*C.scalar,C.wobbleY=C.y+10*C.scalar,C.tiltSin=0,C.tiltCos=0,C.random=1):(C.wobble+=C.wobbleSpeed,C.wobbleX=C.x+10*C.scalar*Math.cos(C.wobble),C.wobbleY=C.y+10*C.scalar*Math.sin(C.wobble),C.tiltAngle+=.1,C.tiltSin=Math.sin(C.tiltAngle),C.tiltCos=Math.cos(C.tiltAngle),C.random=Math.random()+2);var j=C.tick++/C.totalTicks,F=C.x+C.random*C.tiltCos,W=C.y+C.random*C.tiltSin,Q=C.wobbleX+C.random*C.tiltCos,ae=C.wobbleY+C.random*C.tiltSin;if(I.fillStyle="rgba("+C.color.r+", "+C.color.g+", "+C.color.b+", "+(1-j)+")",I.beginPath(),a&&C.shape.type==="path"&&typeof C.shape.path=="string"&&Array.isArray(C.shape.matrix))I.fill(K(C.shape.path,C.shape.matrix,C.x,C.y,Math.abs(Q-F)*.1,Math.abs(ae-W)*.1,Math.PI/10*C.wobble));else if(C.shape.type==="bitmap"){var te=Math.PI/10*C.wobble,de=Math.abs(Q-F)*.1,ge=Math.abs(ae-W)*.1,fe=C.shape.bitmap.width*C.scalar,Se=C.shape.bitmap.height*C.scalar,k=new DOMMatrix([Math.cos(te)*de,Math.sin(te)*de,-Math.sin(te)*ge,Math.cos(te)*ge,C.x,C.y]);k.multiplySelf(new DOMMatrix(C.shape.matrix));var Ve=I.createPattern(h.transform(C.shape.bitmap),"no-repeat");Ve.setTransform(k),I.globalAlpha=1-j,I.fillStyle=Ve,I.fillRect(C.x-fe/2,C.y-Se/2,fe,Se),I.globalAlpha=1}else if(C.shape==="circle")I.ellipse?I.ellipse(C.x,C.y,Math.abs(Q-F)*C.ovalScalar,Math.abs(ae-W)*C.ovalScalar,Math.PI/10*C.wobble,0,2*Math.PI):b(I,C.x,C.y,Math.abs(Q-F)*C.ovalScalar,Math.abs(ae-W)*C.ovalScalar,Math.PI/10*C.wobble,0,2*Math.PI);else if(C.shape==="star")for(var le=Math.PI/2*3,Ee=4*C.scalar,_e=8*C.scalar,He=C.x,Ce=C.y,R=5,S=Math.PI/R;R--;)He=C.x+Math.cos(le)*_e,Ce=C.y+Math.sin(le)*_e,I.lineTo(He,Ce),le+=S,He=C.x+Math.cos(le)*Ee,Ce=C.y+Math.sin(le)*Ee,I.lineTo(He,Ce),le+=S;else I.moveTo(Math.floor(C.x),Math.floor(C.y)),I.lineTo(Math.floor(C.wobbleX),Math.floor(W)),I.lineTo(Math.floor(Q),Math.floor(ae)),I.lineTo(Math.floor(F),Math.floor(C.wobbleY));return I.closePath(),I.fill(),C.tick<C.totalTicks}function $(I,C,j,F,W){var Q=C.slice(),ae=I.getContext("2d"),te,de,ge=c(function(fe){function Se(){te=de=null,ae.clearRect(0,0,F.width,F.height),h.clear(),W(),fe()}function k(){n&&!(F.width===i.width&&F.height===i.height)&&(F.width=I.width=i.width,F.height=I.height=i.height),!F.width&&!F.height&&(j(I),F.width=I.width,F.height=I.height),ae.clearRect(0,0,F.width,F.height),Q=Q.filter(function(Ve){return z(ae,Ve)}),Q.length?te=u.frame(k):Se()}te=u.frame(k),de=Se});return{addFettis:function(fe){return Q=Q.concat(fe),ge},canvas:I,promise:ge,reset:function(){te&&u.cancel(te),de&&de()}}}function D(I,C){var j=!I,F=!!p(C||{},"resize"),W=!1,Q=p(C,"disableForReducedMotion",Boolean),ae=s&&!!p(C||{},"useWorker"),te=ae?d():null,de=j?E:P,ge=I&&te?!!I.__confetti_initialized:!1,fe=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Se;function k(le,Ee,_e){for(var He=p(le,"particleCount",m),Ce=p(le,"angle",Number),R=p(le,"spread",Number),S=p(le,"startVelocity",Number),V=p(le,"decay",Number),se=p(le,"gravity",Number),ie=p(le,"drift",Number),re=p(le,"colors",M),be=p(le,"ticks",Number),ue=p(le,"shapes"),ce=p(le,"scalar"),pe=!!p(le,"flat"),Ae=A(le),ee=He,Ue=[],Pe=I.width*Ae.x,we=I.height*Ae.y;ee--;)Ue.push(O({x:Pe,y:we,angle:Ce,spread:R,startVelocity:S,color:re[ee%re.length],shape:ue[x(0,ue.length)],ticks:be,decay:V,gravity:se,drift:ie,scalar:ce,flat:pe}));return Se?Se.addFettis(Ue):(Se=$(I,Ue,de,Ee,_e),Se.promise)}function Ve(le){var Ee=Q||p(le,"disableForReducedMotion",Boolean),_e=p(le,"zIndex",Number);if(Ee&&fe)return c(function(S){S()});j&&Se?I=Se.canvas:j&&!I&&(I=y(_e),document.body.appendChild(I)),F&&!ge&&de(I);var He={width:I.width,height:I.height};te&&!ge&&te.init(I),ge=!0,te&&(I.__confetti_initialized=!0);function Ce(){if(te){var S={getBoundingClientRect:function(){if(!j)return I.getBoundingClientRect()}};de(S),te.postMessage({resize:{width:S.width,height:S.height}});return}He.width=He.height=null}function R(){Se=null,F&&(W=!1,e.removeEventListener("resize",Ce)),j&&I&&(document.body.contains(I)&&document.body.removeChild(I),I=null,ge=!1)}return F&&!W&&(W=!0,e.addEventListener("resize",Ce,!1)),te?te.fire(le,He,R):k(le,He,R)}return Ve.reset=function(){te&&te.reset(),Se&&Se.reset()},Ve}var B;function G(){return B||(B=D(null,{useWorker:!0,resize:!0})),B}function K(I,C,j,F,W,Q,ae){var te=new Path2D(I),de=new Path2D;de.addPath(te,new DOMMatrix(C));var ge=new Path2D;return ge.addPath(de,new DOMMatrix([Math.cos(ae)*W,Math.sin(ae)*W,-Math.sin(ae)*Q,Math.cos(ae)*Q,j,F])),ge}function Z(I){if(!a)throw new Error("path confetti are not supported in this browser");var C,j;typeof I=="string"?C=I:(C=I.path,j=I.matrix);var F=new Path2D(C),W=document.createElement("canvas"),Q=W.getContext("2d");if(!j){for(var ae=1e3,te=ae,de=ae,ge=0,fe=0,Se,k,Ve=0;Ve<ae;Ve+=2)for(var le=0;le<ae;le+=2)Q.isPointInPath(F,Ve,le,"nonzero")&&(te=Math.min(te,Ve),de=Math.min(de,le),ge=Math.max(ge,Ve),fe=Math.max(fe,le));Se=ge-te,k=fe-de;var Ee=10,_e=Math.min(Ee/Se,Ee/k);j=[_e,0,0,_e,-Math.round(Se/2+te)*_e,-Math.round(k/2+de)*_e]}return{type:"path",path:C,matrix:j}}function J(I){var C,j=1,F="#000000",W='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof I=="string"?C=I:(C=I.text,j="scalar"in I?I.scalar:j,W="fontFamily"in I?I.fontFamily:W,F="color"in I?I.color:F);var Q=10*j,ae=""+Q+"px "+W,te=new OffscreenCanvas(Q,Q),de=te.getContext("2d");de.font=ae;var ge=de.measureText(C),fe=Math.ceil(ge.actualBoundingBoxRight+ge.actualBoundingBoxLeft),Se=Math.ceil(ge.actualBoundingBoxAscent+ge.actualBoundingBoxDescent),k=2,Ve=ge.actualBoundingBoxLeft+k,le=ge.actualBoundingBoxAscent+k;fe+=k+k,Se+=k+k,te=new OffscreenCanvas(fe,Se),de=te.getContext("2d"),de.font=ae,de.fillStyle=F,de.fillText(C,Ve,le);var Ee=1/j;return{type:"bitmap",bitmap:te.transferToImageBitmap(),matrix:[Ee,0,0,Ee,-fe*Ee/2,-Se*Ee/2]}}t.exports=function(){return G().apply(this,arguments)},t.exports.reset=function(){G().reset()},t.exports.create=D,t.exports.shapeFromPath=Z,t.exports.shapeFromText=J})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),hc,!1);const ZM=hc.exports;hc.exports.create;class JM{constructor(e){this.game=e,this.baseState={cash:1e4,revenue:0,targetRevenue:5e4,morale:80,reputation:85,equity:100,debt:0,factoryMult:1,warehouseMult:1,rdMult:1,timeLeft:180,running:!1},this.state={...this.baseState},this.tickRate=1e3,this.lastTick=0,this.ui={cash:document.getElementById("cash-value"),revenue:document.getElementById("revenue-value"),morale:document.getElementById("morale-value"),reputation:document.getElementById("reputation-value"),progress:document.getElementById("revenue-progress"),timer:document.getElementById("timer-value"),objTitle:document.getElementById("objective-title"),objDesc:document.getElementById("objective-desc")},this._lastUi=null,this._lastStateSyncSecond=null}_getUpgradeMult(e){switch(e){case"factory":return this.state.factoryMult||1;case"warehouse":return this.state.warehouseMult||1;case"rd":return this.state.rdMult||1;default:return 1}}_getBaseRevenuePerSec(e){switch(e){case"hq":return 15;case"factory":return 140;case"storefront":return 80;case"hr":return 5;case"bank":return 10;case"rd":return 20;case"warehouse":return 40;case"media":return 15;default:return 0}}start(e=1,t={}){const n={0:{target:1e6,time:3600,name:"INITIALIZING COMMAND"},1:{target:5e4,time:180,name:"SURVIVAL PHASE"},2:{target:15e4,time:240,name:"EXPANSION PHASE"},3:{target:5e5,time:300,name:"DOMINANCE PHASE"},4:{target:15e5,time:360,name:"MONOPOLY CORE"},5:{target:5e6,time:480,name:"EMPIRE PROTOCOL"}},i=n[e]||n[1],s=Number(t==null?void 0:t.timeOverride),a=Number.isFinite(s)&&s>0?Math.floor(s):i.time;this.state={...this.baseState,currentLevel:e,targetRevenue:i.target,timeLeft:a},this._initialTime=a,this.ui.objTitle&&(this.ui.objTitle.innerText=`LEVEL ${e}: ${i.name}`),this.ui.objDesc&&(this.ui.objDesc.innerHTML=`Reach <span class="highlight">$${i.target.toLocaleString()}</span> revenue in ${Math.floor(a/60)} minutes.`),document.title=`Empire Protocol | Level ${e}: ${i.name}`,this.state.running=!0,this.lastTick=Date.now(),this.game.events.start(),this.updateUI()}update(){if(!this.state.running)return;const e=Date.now();e-this.lastTick>=this.tickRate&&(this.tick(),this.lastTick=e)}tick(){var s,a;if(!this.state.running)return;if(this.state.timeLeft--,this.state.timeLeft<=0){this.endGame(!1,"TIME EXPIRED. The board has revoked your access to the Protocol.");return}let e=0;this.game.world.buildings.forEach(o=>{const l=o.userData.type,c=this.game.events.getRevenueMultiplier(l),h=this._getUpgradeMult(l),u=this._getBaseRevenuePerSec(l);switch(l){case"factory":case"warehouse":case"rd":e+=Math.floor(u*c*h);break;default:e+=Math.floor(u*c);break}});const t=this.game.events.activeEventIds.size;if(t>0){const o=1-t*.05;e=Math.floor(e*Math.max(.5,o))}const n=this.state.morale<50?Math.pow(this.state.morale/100,1.5):this.state.morale/100;e=Math.floor(e*n);const i=this.state.reputation<70?Math.max(.1,this.state.reputation/100):1;if(e=Math.floor(e*i),this.state.cash+=e,this.state.revenue+=e,this.state.debt>0){const o=Math.ceil(this.state.debt*.008);this.state.cash-=o}if(this.state.morale=Math.max(0,this.state.morale-.2),this.state.cash<-3e3){this.endGame(!1,"BANKRUPTCY DECLARED. Your company is insolvent.");return}if(this.state.morale<=1){this.endGame(!1,"MORALE COLLAPSED. All employees have walked out.");return}if(this.updateUI(),this.checkWinCondition(),this.game.socket){const o=((a=(s=this.game.socket)._elapsed)==null?void 0:a.call(s))??null;if(Number.isFinite(o)){const l=Math.floor(o);l!==this._lastStateSyncSecond&&l%5===0&&(this._lastStateSyncSecond=l,this.game.socket.sendStateUpdate({cash:Math.floor(this.state.cash),revenue:Math.floor(this.state.revenue),morale:Math.floor(this.state.morale),reputation:Math.floor(this.state.reputation),debt:Math.floor(this.state.debt),equity:Math.floor(this.state.equity),timeLeft:Math.floor(this.state.timeLeft),factoryMult:this.state.factoryMult,warehouseMult:this.state.warehouseMult,rdMult:this.state.rdMult}))}}}updateUI(){if(!this.ui.cash)return;const e={cash:Math.floor(this.state.cash),revenue:Math.floor(this.state.revenue),morale:Math.floor(this.state.morale),reputation:Math.floor(this.state.reputation)};this._lastUi&&(this._emitDelta(this.ui.cash,e.cash-this._lastUi.cash,{kind:"money"}),this._emitDelta(this.ui.revenue,e.revenue-this._lastUi.revenue,{kind:"money"}),this._emitDelta(this.ui.morale,e.morale-this._lastUi.morale,{kind:"percent"}),this._emitDelta(this.ui.reputation,e.reputation-this._lastUi.reputation,{kind:"percent"})),this._lastUi=e,this.ui.cash.innerText=`$${Math.floor(this.state.cash).toLocaleString()}`,this.ui.revenue.innerText=`$${Math.floor(this.state.revenue).toLocaleString()}`,this.ui.morale.innerText=`${Math.floor(this.state.morale)}%`,this.ui.reputation.innerText=`${Math.floor(this.state.reputation)}%`;const t=this.state.revenue/this.state.targetRevenue*100;this.ui.progress.style.width=`${Math.min(t,100)}%`;const n=Math.floor(this.state.timeLeft/60),i=this.state.timeLeft%60;this.ui.timer.innerText=`${n.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`,this.ui.timer.style.color=this.state.timeLeft<30?"#ff4757":"#ffcd29",this.ui.cash.style.color=this.state.cash<0?"#ff4757":"#2ed573",this.ui.morale.style.color=this.state.morale<40?"#ff4757":this.state.morale<60?"#ffa502":"#2c3e50",this.ui.reputation.style.color=this.state.reputation<40?"#ff4757":this.state.reputation<60?"#ffa502":"#2c3e50"}_emitDelta(e,t,{kind:n}){if(!e||!t)return;const i=e.closest(".metric-item");if(!i||n==="percent"&&Math.abs(t)<1)return;const s=document.createElement("span");if(s.className=`metric-delta ${t>0?"up":"down"}`,n==="money"){const a=Math.abs(t);s.textContent=`${t>0?"+":"-"}$${a.toLocaleString()}`}else s.textContent=`${t>0?"+":""}${t}%`;i.appendChild(s),setTimeout(()=>s.remove(),950)}executeAction(e,t){var o;let n=!1;const i=this.state,s=this.game.events,a=(l,c="info")=>s.notify(l,c);switch(e){case"take_loan":i.cash+=5e3,i.debt+=5e3,a(`💰 LOAN APPROVED: +$5,000 cash | Debt: +$5,000. ⚠️ Interest is ~0.8%/sec (≈ -$${Math.ceil(i.debt*.008).toLocaleString()}/sec right now).`,"warning"),n=!0;break;case"sell_equity":i.equity>=10?(i.cash+=1e4,i.equity-=10,a(`📊 EQUITY SOLD: +$10,000 cash | Ownership -10% (Remaining: ${i.equity}%). No interest cost.`,"positive"),n=!0):a("❌ Not enough equity to sell (need at least 10%).","negative");break;case"optimize":i.morale=Math.min(100,i.morale+8),a("🔧 OPERATIONS OPTIMIZED: Morale +8%. Higher morale increases ALL revenue.","positive"),n=!0;break;case"bonus":i.cash>=2e3?(i.cash-=2e3,i.morale=Math.min(100,i.morale+20),a("🎁 STAFF BONUS: -$2,000 | Morale +20% (boosts total revenue/sec).","positive"),n=!0):a("❌ Insufficient cash for Staff Bonus (need $2,000).","negative");break;case"hire_staff":i.cash>=3e3?(i.cash-=3e3,i.morale=Math.min(100,i.morale+10),a("👥 HIRED STAFF: -$3,000 | Morale +10% (stabilizes revenue scaling).","positive"),n=!0):a("❌ Insufficient cash to hire staff (need $3,000).","negative");break;case"resolve_strike":s.resolveEvent({id:"staff_strike",resolveActions:[]},"resolve_strike"),n=!0;break;case"expand_prod":i.cash>=5e3?(i.cash-=5e3,i.factoryMult=Math.min(3,(i.factoryMult||1)*1.3),a(`🏭 PRODUCTION EXPANDED: -$5,000 | Factory revenue +30% (Total factory boost: ×${i.factoryMult.toFixed(2)}).`,"positive"),n=!0):a("❌ Insufficient cash to expand production (need $5,000).","negative");break;case"safety_protocol":s.resolveEvent({id:"factory_accident",resolveActions:[]},"safety_protocol"),n=!0;break;case"storage_upgrade":i.cash>=4e3?(i.cash-=4e3,i.warehouseMult=Math.min(3,(i.warehouseMult||1)*1.5),a(`🚚 WAREHOUSE UPGRADED: -$4,000 | Warehouse revenue +50% (Total warehouse boost: ×${i.warehouseMult.toFixed(2)}).`,"positive"),n=!0):a("❌ Insufficient cash to upgrade warehouse (need $4,000).","negative");break;case"logistics_fix":s.resolveEvent({id:"supply_crisis",resolveActions:[]},"logistics_fix"),n=!0;break;case"research":i.cash>=3e3?(i.cash-=3e3,i.rdMult=Math.min(3,(i.rdMult||1)*1.25),a(`🔬 R&D INVESTMENT: -$3,000 | R&D revenue boosted (Total R&D boost: ×${i.rdMult.toFixed(2)}).`,"positive"),n=!0):a("❌ Insufficient cash for R&D (need $3,000).","negative");break;case"security_patch":s.resolveEvent({id:"rd_breach",resolveActions:[]},"security_patch"),n=!0;break;case"counter_campaign":s.resolveEvent({id:"competitor_launch",resolveActions:[]},"counter_campaign"),n=!0;break;case"surge_broadcast":s.resolveEvent({id:"market_opportunity",resolveActions:[]},"surge_broadcast"),n=!0;break;case"marketing_campaign":i.cash>=2e3?(i.cash-=2e3,i.reputation=Math.min(100,i.reputation+15),i.morale=Math.min(100,i.morale+5),a("📢 MEDIA CAMPAIGN: -$2,000 | Reputation +15, Morale +5 (both improve revenue scaling).","positive"),n=!0):a("❌ Insufficient cash for Media Campaign (need $2,000).","negative");break;case"pr_statement":i.reputation=Math.min(100,i.reputation+10),a("📰 PR STATEMENT: Reputation +10 (protects consumer revenue).","positive"),n=!0;break}if(this.updateUI(),n&&this.game.socket){const l=(t==null?void 0:t.type)||((o=t==null?void 0:t.userData)==null?void 0:o.type)||"SYSTEM";let c={cost:0,effect:{}};e==="take_loan"&&(c={cost:0,effect:{cash:5e3,debt:5e3}}),e==="sell_equity"&&(c={cost:0,effect:{cash:1e4,equity_delta:-10}}),e==="bonus"&&(c={cost:2e3,effect:{morale:20}}),e==="hire_staff"&&(c={cost:3e3,effect:{morale:10}}),e==="expand_prod"&&(c={cost:5e3,effect:{factoryMult:i.factoryMult}}),e==="storage_upgrade"&&(c={cost:4e3,effect:{warehouseMult:i.warehouseMult}}),e==="research"&&(c={cost:3e3,effect:{rdMult:i.rdMult}}),e==="marketing_campaign"&&(c={cost:2e3,effect:{reputation:15,morale:5}}),e==="pr_statement"&&(c={cost:0,effect:{reputation:10}}),e==="optimize"&&(c={cost:0,effect:{morale:8}}),this.game.socket.sendAction(e,l,c.cost,c.effect)}return n}checkWinCondition(){this.state.revenue>=this.state.targetRevenue&&this.endGame(!0)}endGame(e,t){var a,o;this.state.running=!1,(o=(a=this.game.events).dismissAlert)==null||o.call(a),e?(ZM({particleCount:250,spread:100,origin:{y:.5},colors:["#47a1ff","#ffcd29","#2ed573","#ffffff"]}),this.game.events.notify(`🏆 MISSION COMPLETE! Revenue: $${Math.floor(this.state.revenue).toLocaleString()}`)):this.game.events.notify(`❌ MISSION FAILED: ${t}`);const n=wr(),i=this.state.currentLevel||1;e&&(n[`level${i}_complete`]=!0,n[`level${i+1}_unlocked`]=!0,Al(n));const s=l=>this.game.showSummary(l,e?"win":"loss",t);this.game.socket?(this.game.setLoading&&this.game.setLoading(!0,"AI STRATEGIST ANALYZING GAMEPLAY..."),this.game.socket.sendGameOver(e?"win":this.state.timeLeft<=0?"loss_time":"loss_bankrupt",{cash:Math.floor(this.state.cash),revenue:Math.floor(this.state.revenue),morale:Math.floor(this.state.morale),reputation:Math.floor(this.state.reputation)}),this._summaryTimeout=setTimeout(()=>{s({score:this._calcScore(e),badge:e?`⭐ Level ${i} Champion`:"💼 Keep Going",play_style:"balanced",strengths:e?["Survived all events","Reached revenue target"]:["Tried their best"],key_moments:[],encouragement:e?`🎉 Amazing! Level ${i+1} is now unlocked!`:"💪 Every CEO fails sometimes. Try again!"})},5e3)):setTimeout(()=>s({score:this._calcScore(e),badge:e?"⭐ Level 1 Champion":"💼 Keep Going",play_style:"balanced",strengths:e?["Survived all events","Built revenue without backend"]:["Played offline"],key_moments:[],encouragement:e?"🎉 Amazing! Level 2 is now unlocked!":"💪 Every CEO fails sometimes. Try again!"}),e?2e3:1500)}_calcScore(e){if(!e)return Math.floor(this.state.revenue/this.state.targetRevenue*50);const t=Number.isFinite(this._initialTime)&&this._initialTime>0?this._initialTime:180,n=Math.floor(this.state.timeLeft/t*30),i=Math.floor(this.state.morale/5),s=Math.floor(this.state.reputation/5);return Math.min(100,50+n+i+s)}}function Yo(r,e=.6){try{const t=new Audio(r);t.volume=Math.max(0,Math.min(1,e));const n=t.play();n&&n.catch(()=>{})}catch{}}const _t={click:()=>Yo("./assets/click.mp3",1.5),notify:()=>Yo("./assets/notify.mp3",.85),error:()=>Yo("./assets/error.mp3",1.2)};document.addEventListener("click",r=>{const e=r.target;(e.closest("button")||e.closest("a")||e.closest(".level-node")||e.closest(".action-btn")||e.closest(".notif-btn")||e.closest(".primary-btn")||e.closest(".secondary-btn")||e.closest('[role="button"]'))&&_t.click()},{passive:!0});let Tt=null;const jo={start(){if(Tt&&!Tt.paused)return;Tt||(Tt=new Audio("./assets/bgmusic.mp3"),Tt.loop=!0,Tt.volume=.1),Tt.currentTime=0;const r=Tt.play();r&&r.catch(()=>{})},pause(){Tt&&!Tt.paused&&Tt.pause()},resume(){if(Tt&&Tt.paused){const r=Tt.play();r&&r.catch(()=>{})}},stop(){Tt&&(Tt.pause(),Tt.currentTime=0)},setVolume(r){Tt&&(Tt.volume=Math.max(0,Math.min(1,r)))}};class QM{constructor(){this.synth=window.speechSynthesis,this.voice=null,this.isInitialized=!1,this._initVoice(),this.synth.onvoiceschanged!==void 0&&(this.synth.onvoiceschanged=()=>this._initVoice())}_initVoice(){if(this.isInitialized&&this.voice)return;const e=this.synth.getVoices();if(!e.length)return;const t=["Microsoft Guy Online (Natural)","David","Daniel","Alex"];for(const n of t){const i=e.find(s=>s.name.includes(n));if(i){this.voice=i;break}}this.voice||(this.voice=e.find(n=>n.lang.startsWith("en"))||e[0]),this.voice&&(this.isInitialized=!0,console.log(`[TTS] Voice initialized: ${this.voice.name}`))}speak(e,t={}){if(!this.synth)return;this.synth.cancel();const n=e.replace(/💰|🚀|😊|⚙️|📊|💰|🏭|📢|⚔️|🔬|🔒|🚚|🛠️|✨|🎁|👥|✋/g,"").replace(/HQ/g,"Headquarters").replace(/HUD/g,"H.U.D.").replace(/RD/g,"R and D").replace(/CEO/g,"C.E.O."),i=new SpeechSynthesisUtterance(n);this.voice&&(i.voice=this.voice),i.pitch=t.pitch||1,i.rate=t.rate||1.2,i.volume=t.volume||1,this.synth.speak(i)}stop(){this.synth&&this.synth.cancel()}}const Kt=new QM,eS=[{id:"factory_accident",triggerAt:20,icon:"🔥",title:"FACTORY ACCIDENT",urgency:"CRITICAL",desc:"A fire broke out on the production floor! Workers are evacuating.",impact:"CRITICAL Penalty: Factory revenue drops to 10% AND costs $400/sec until resolved.",resolveBuilding:"factory",resolveActions:[{label:"Emergency Safety Protocol (–$2,000)",id:"safety_protocol"}]},{id:"staff_strike",triggerAt:40,icon:"😤",title:"STAFF STRIKE",urgency:"HIGH",desc:"Employees are walking out! Demands for higher pay are escalating fast.",impact:"HIGH Penalty: Morale drains –4% every second. Ignore and it hits 0.",resolveBuilding:"hr",resolveActions:[{label:"Distribute Staff Bonus (–$3,000)",id:"resolve_strike"}]},{id:"competitor_launch",triggerAt:70,icon:"📉",title:"COMPETITOR PRODUCT LAUNCH",urgency:"HIGH",desc:"RivalCorp launched a competing product and is capturing your market share!",impact:"HIGH Penalty: Store revenue halved AND reputation drains –2%/sec.",resolveBuilding:"media",resolveActions:[{label:"Announce Counter-Campaign (–$2,500)",id:"counter_campaign"}]},{id:"supply_crisis",triggerAt:100,icon:"🚚",title:"SUPPLY CHAIN CRISIS",urgency:"CRITICAL",desc:"Warehouse logistics collapsed. Suppliers blocking all deliveries!",impact:"CRITICAL Penalty: Warehouse + Factory at 5% revenue AND $200/sec cash drain.",resolveBuilding:"warehouse",resolveActions:[{label:"Emergency Logistics Fix (–$4,000)",id:"logistics_fix"}]},{id:"rd_breach",triggerAt:125,icon:"🔓",title:"DATA BREACH AT R&D LAB",urgency:"HIGH",desc:"Hackers have infiltrated the R&D servers! Trade secrets at risk.",impact:"HIGH Penalty: Reputation –4%/sec. Investors losing confidence rapidly.",resolveBuilding:"rd",resolveActions:[{label:"Deploy Security Patch (–$3,500)",id:"security_patch"}]},{id:"market_opportunity",triggerAt:150,icon:"🚀",title:"MARKET SURGE OPPORTUNITY!",urgency:"OPPORTUNITY",desc:"Global demand spiked! Act NOW to capture 3× revenue for 20 seconds.",impact:"OPPORTUNITY: Use Media Tower to broadcast and gain ×3 revenue (20s). Don't miss it!",resolveBuilding:"media",resolveActions:[{label:"Broadcast Surge (–$1,000)",id:"surge_broadcast"}]}];class tS{constructor(e){this.game=e,this.container=document.getElementById("notifications"),this.activeEventIds=new Set,this.alertPanel=document.getElementById("event-alert"),this.alertIcon=document.getElementById("event-icon"),this.alertTitle=document.getElementById("event-title"),this.alertUrgency=document.getElementById("event-urgency"),this.alertDesc=document.getElementById("event-desc"),this.alertImpact=document.getElementById("event-impact"),this.alertActions=document.getElementById("event-actions"),document.getElementById("event-dismiss").onclick=()=>{_t.click(),this.dismissAlert()},this.penalties={factoryRevenue:!1,storeRevenue:!1,logistics:!1,moraleDrain:!1,repDrain:!1,surgeActive:!1,surgeExpiry:0,factoryCashDrain:!1,supplyCashDrain:!1,_severity:{}},this.currentAlert=null,this.schedule=[...eS],this.triggeredEvents=new Set,this.startTime=null,this._ignorePenaltyTimers={}}start(){this.startTime=Date.now(),this.triggeredEvents.clear(),this.activeEventIds.clear(),this.penalties={factoryRevenue:!1,storeRevenue:!1,logistics:!1,moraleDrain:!1,repDrain:!1,surgeActive:!1,surgeExpiry:0,factoryCashDrain:!1,supplyCashDrain:!1,_severity:{}}}receiveServerEvent(e){if(this.game.economy.state.currentLevel===0||(console.log("[Events] Received server event:",e.id,e.title),this.triggeredEvents.has(e.id)))return;this.triggeredEvents.add(e.id);const t=e.urgency==="CRITICAL"?"critical":e.urgency==="OPPORTUNITY"?"opportunity":"warning";this.notify(`${e.icon} INCOMING: ${e.title}`,t),this._applyPenalty(e),this._startIgnoreTimer(e),setTimeout(()=>this.showAlert(e),800)}_clampSev(e){const t=Number(e);return Number.isFinite(t)?Math.max(.8,Math.min(1.2,t)):1}_sev(...e){var n;let t=1;for(const i of e){const s=(n=this.penalties._severity)==null?void 0:n[i];typeof s=="number"&&Number.isFinite(s)&&(t=Math.max(t,s))}return t}_applyPenalty(e){const t=typeof e=="string"?e:e==null?void 0:e.id;if(!t)return;const n=this._clampSev(typeof e=="string"?1:e==null?void 0:e.severityMult);switch(this.penalties._severity[t]=n,t){case"factory_accident":this.penalties.factoryRevenue=!0,this.penalties.factoryCashDrain=!0;break;case"staff_strike":this.penalties.moraleDrain=!0;break;case"competitor_launch":this.penalties.storeRevenue=!0,this.penalties.repDrain=!0;break;case"supply_crisis":this.penalties.logistics=!0,this.penalties.supplyCashDrain=!0;break;case"rd_breach":this.penalties.repDrain=!0;break}}_removePenalty(e){switch(e){case"factory_accident":this.penalties.factoryRevenue=!1,this.penalties.factoryCashDrain=!1;break;case"staff_strike":this.penalties.moraleDrain=!1;break;case"competitor_launch":this.penalties.storeRevenue=!1,this.penalties.repDrain=!1;break;case"supply_crisis":this.penalties.logistics=!1,this.penalties.supplyCashDrain=!1;break;case"rd_breach":this.penalties.repDrain=!1;break}this.penalties._severity&&delete this.penalties._severity[e],this._ignorePenaltyTimers[e]&&(clearTimeout(this._ignorePenaltyTimers[e]),delete this._ignorePenaltyTimers[e])}_startIgnoreTimer(e){if(e.urgency==="OPPORTUNITY")return;const t=this._clampSev(e==null?void 0:e.severityMult);this._ignorePenaltyTimers[e.id]=setTimeout(()=>{if(this.activeEventIds.has(e.id)){this.notify(`⚠️ ${e.title} IGNORED — suffering extra consequences!`,"negative");const n=this.game.economy.state;n.morale=Math.max(0,n.morale-20*t),n.cash-=3e3*t,this.game.economy.updateUI()}},2e4)}notify(e,t="info",n=null){t==="negative"||t==="critical"?_t.error():_t.notify();const i=Date.now().toString(),s=document.createElement("div");s.className=`notification ${t}`,s.id=`notif-${i}`;let a=`<div class="notif-text">${e}</div>`;n&&n.length>0&&(a+='<div class="notif-actions">',n.forEach((o,l)=>{a+=`<button class="notif-btn" id="notif-act-${i}-${l}">${o.label}</button>`}),a+="</div>"),s.innerHTML=a,document.getElementById("notifications").appendChild(s),n&&n.forEach((o,l)=>{const c=document.getElementById(`notif-act-${i}-${l}`);c&&(c.onclick=()=>{o.action(),s.remove()})}),n||setTimeout(()=>{s.style.opacity="0",setTimeout(()=>s.remove(),500)},5e3)}showAlert(e){this.currentAlert=e,this.activeEventIds.add(e.id),this.alertIcon.innerText=e.icon,this.alertTitle.innerText=e.title,this.alertUrgency.innerText=e.urgency,this.alertUrgency.className=`urgency-${e.urgency.toLowerCase()}`,this.alertDesc.innerText=e.desc;const t=e.severityMult?` (Severity ×${this._clampSev(e.severityMult).toFixed(2)})`:"";this.alertImpact.innerText=`${e.impact}${t}`,Kt.speak(e.desc),this.alertActions.innerHTML="",e.resolveActions.forEach(n=>{const i=document.createElement("button");i.className="primary-btn",i.innerText=n.label,i.onclick=()=>{_t.click(),this.resolveEvent(e,n.id),this.dismissAlert()},this.alertActions.appendChild(i)}),this.alertPanel.classList.remove("hidden"),this.alertPanel.classList.add("animate-in"),this.highlightBuilding(e.resolveBuilding)}dismissAlert(){this.alertPanel.classList.add("hidden"),this.alertPanel.classList.remove("animate-in"),this.currentAlert=null,Kt.stop()}resolveEvent(e,t){if(!this.activeEventIds.has(e.id))return;const n=this.game.economy.state,s={safety_protocol:2e3,resolve_strike:3e3,counter_campaign:2500,logistics_fix:4e3,security_patch:3500,surge_broadcast:1e3}[t]||0;if(s>0&&n.cash<s){_t.error(),this.notify(`❌ Not enough cash to resolve! Need $${s.toLocaleString()}`,"negative");return}n.cash-=s,t==="resolve_strike"?n.morale=Math.min(100,n.morale+25):t==="security_patch"?n.reputation=Math.min(100,n.reputation+15):t==="counter_campaign"?n.reputation=Math.min(100,n.reputation+20):t==="surge_broadcast"&&(this.penalties.surgeActive=!0,this.penalties.surgeExpiry=Date.now()+2e4,this.notify("📡 MARKET SURGE BROADCAST LIVE! Revenue ×3 for 20 seconds!","opportunity")),this._removePenalty(e.id),this.activeEventIds.delete(e.id),this.notify(`✅ ${e.title} RESOLVED!`,"positive"),this.game.socket&&this.game.socket.sendEventResolved(e.id,t,s),this.game.economy.updateUI()}highlightBuilding(e){var a,o;const t=(o=(a=this.game.world)==null?void 0:a.buildings)==null?void 0:o.find(l=>l.userData.type===e);if(!t)return;const n=t.position.y;let i=0;const s=setInterval(()=>{t.position.y=i%2===0?n+.5:n,i++,i>8&&clearInterval(s)},200)}update(){if(!this.game.economy.state.running)return;const e=this.game.economy,t=this.penalties;if(!this.game.socket&&this.startTime&&this.game.economy.state.currentLevel!==0){const n=Math.floor((Date.now()-this.startTime)/1e3);this.schedule.forEach(i=>{if(n>=i.triggerAt&&!this.triggeredEvents.has(i.id)){this.triggeredEvents.add(i.id);const s=i.urgency==="CRITICAL"?"critical":i.urgency==="OPPORTUNITY"?"opportunity":"warning";this.notify(`${i.icon} INCOMING: ${i.title}`,s);const a={...i,severityMult:1};this._applyPenalty(a),this._startIgnoreTimer(a),setTimeout(()=>this.showAlert(i),800)}})}if(t.moraleDrain){const n=this._sev("staff_strike");e.state.morale=Math.max(0,e.state.morale-.067*n)}if(t.repDrain){const n=this._sev("competitor_launch","rd_breach");e.state.reputation=Math.max(0,e.state.reputation-.067*n)}if(t.factoryCashDrain){const n=this._sev("factory_accident");e.state.cash-=6.7*n}if(t.supplyCashDrain){const n=this._sev("supply_crisis");e.state.cash-=3.3*n}}getRevenueMultiplier(e){const t=this.penalties;let n=1;const i=(s,a,o)=>Math.max(a,Math.min(o,s));if(t.factoryRevenue&&e==="factory"){const s=this._sev("factory_accident");n*=i(.1/s,.02,.25)}if(t.storeRevenue&&e==="storefront"){const s=this._sev("competitor_launch");n*=i(.5/s,.2,.8)}if(t.logistics&&(e==="warehouse"||e==="factory")){const s=this._sev("supply_crisis");n*=i(.05/s,.01,.2)}if(t.surgeActive&&Date.now()<t.surgeExpiry){const s=this._sev("market_opportunity");n*=i(3*s,2.5,3.6)}return t.surgeActive&&Date.now()>=t.surgeExpiry&&(t.surgeActive=!1,this.notify("⏱ Market surge has ended.","info")),n}}class nS{constructor(e){this.game=e,this.steps=[{id:"welcome",text:"Welcome, CEO. I am your Strategic AI Assistant. My mission is to help you build a global business empire. Let's begin by reviewing your Command Center HUD at the top.",action:()=>{this.game.world.createCEO(),this.game.world.moveCEOTo(0,5),this.highlightHUD("metrics"),this.attachPopupToCEO(),this.recenterCamera(0,0,5,2.5)}},{id:"concepts",text:"Your Cash represents immediate liquid funds. Revenue is your projected passive growth, and Morale reflects the overall happiness and productivity of your workforce.",action:()=>this.highlightHUD("metrics")},{id:"hq",text:"This is your Headquarters—the nerve center of your operations. Selecting it allows you to optimize workflows and boost overall efficiency.",action:()=>{this.game.world.spawnTutorialHQ(),this.highlightBuilding("hq")}},{id:"bank",text:"Capital reserves are currently low. I've authorized access to a local CyberBank. Secure an emergency loan to provide the initial liquidity needed for expansion.",action:()=>{this.game.world.addBuilding("bank",-15,15),this.highlightBuilding("bank")},requiredAction:"take_loan"},{id:"factory",text:"Production Plants are the backbone of your supply chain. Expanding production here will significantly increase your long-term revenue streams.",action:()=>{this.game.world.addBuilding("factory",15,-15),this.highlightBuilding("factory")}},{id:"storefront",text:"Metro Storefronts serve as your primary consumer interface, converting production into steady passive income for the empire.",action:()=>{this.game.world.addBuilding("storefront",0,15),this.highlightBuilding("storefront")}},{id:"rd_media",text:"R&D Labs are essential for technological breakthroughs, while Media Towers manage public relations and broadcast campaigns to maintain high morale.",action:()=>{this.game.world.addBuilding("rd",15,15),this.game.world.addBuilding("media",-15,-15),this.game.world.moveCEOTo(0,0),this.recenterCamera(0,0,0,1.2)}},{id:"finish",text:"Outstanding work, CEO. The foundation is set. It is time to proceed to the Campaign Map and begin your global takeover.",action:()=>{const t=wr();t.tutorial_done=!0,Al(t),setTimeout(()=>{this.game.world.removeCEO(),this.game.renderDashboard(),this.game.showScreen("dashboard"),this.game.hideHUD(),this.recenterCamera(0,0,0,.5)},2e3)}}],this.currentStepIndex=0,this.isActive=!1,this.popupEl=document.getElementById("tutorial-popup"),this.textElement=document.getElementById("tutorial-text"),this.nextBtn=document.getElementById("tutorial-next"),this.label=new Xl(this.popupEl),this.nextBtn.onclick=()=>this.nextStep()}attachPopupToCEO(){this.game.world.ceoHead&&this.game.world.ceoHead.add(this.label)}start(){this.isActive=!0,this.currentStepIndex=0,this.game.economy.start(0),this.popupEl.classList.remove("hidden"),this.showStep(),setTimeout(()=>this.game.economy.start(0),100)}showStep(){const e=this.steps[this.currentStepIndex];this.textElement.innerText=e.text,Kt.speak(e.text),e.action&&e.action(),e.requiredAction?this.nextBtn.classList.add("hidden"):this.nextBtn.classList.remove("hidden")}nextStep(){this.currentStepIndex++,this.currentStepIndex<this.steps.length?this.showStep():(this.isActive=!1,this.popupEl.classList.add("hidden"),Kt.stop())}onGameAction(e){const t=this.steps[this.currentStepIndex];t&&t.requiredAction===e&&this.nextStep()}highlightHUD(e){const t=document.querySelector("."+e);t&&(t.classList.add("highlight-target"),setTimeout(()=>t.classList.remove("highlight-target"),3e3))}highlightBuilding(e){const t=this.game.world.buildings.find(n=>n.userData.type===e);t&&(this.game.world.moveCEOTo(t.position.x,t.position.z),this.recenterCamera(t.position.x,0,t.position.z,1.8))}recenterCamera(e,t,n,i=1){Fs.to(this.game.controls.target,{x:e,y:t,z:n,duration:1.5,ease:"power2.inOut",onUpdate:()=>this.game.controls.update()});const s={x:150,y:150,z:150};Fs.to(this.game.camera.position,{x:e+s.x,y:t+s.y,z:n+s.z,duration:1.5,ease:"power2.inOut"}),Fs.to(this.game.camera,{zoom:i,duration:1.5,ease:"power2.inOut",onUpdate:()=>this.game.camera.updateProjectionMatrix()})}}function iS(){const r=window.location.hostname;return r==="localhost"||r==="127.0.0.1"}function Fu(r){return String(r||"").replace(/\/+$/,"")}function sS(){var i,s;const r=(s=(i=import.meta)==null?void 0:i.env)==null?void 0:s.VITE_WS_URL;if(r)return Fu(r);const e=String(window.location.port||""),t=window.location.hostname;if(e==="5173"||e==="4173")return`${window.location.protocol==="https:"?"wss:":"ws:"}//${t}:3001`;const n=iS()?"http://localhost:3001":window.location.origin;return Fu(n).replace(/^http/i,"ws")}const rS=sS();class Bu{constructor(e){this.game=e,this.ws=null,this.sessionId=null,this.startTime=null}connect(){return new Promise((e,t)=>{const n=bl();if(!n)return t(new Error("No auth token found."));this.ws=new WebSocket(`${rS}?token=${n}`),this.ws.onopen=()=>{console.log("[WS] Connected to Empire Protocol server"),e()},this.ws.onmessage=i=>{let s;try{s=JSON.parse(i.data)}catch(a){console.error("[WS] Failed to parse message",a);return}try{this._handleMessage(s)}catch(a){console.error("[WS] Message handler error",a)}},this.ws.onerror=i=>{console.error("[WS] Connection error:",i),t(i)},this.ws.onclose=()=>{console.log("[WS] Disconnected")}})}_handleMessage(e){var t,n,i,s;switch(e.type){case"connected":console.log("[WS]",e.message);break;case"session_started":this.sessionId=e.sessionId,this.startTime=Date.now(),console.log("[WS] Session started:",this.sessionId);break;case"battle_session_started":this.sessionId=e.sessionId,this.startTime=Date.now(),console.log("[WS] Battle session started:",this.sessionId);break;case"game_event":this.game.events&&this.game.events.receiveServerEvent(e.event);break;case"game_summary":if(this.game.showSummary&&(this.game.showSummary(e.summary,e.outcome),e.summary&&e.summary.encouragement))try{(t=Kt==null?void 0:Kt.speak)==null||t.call(Kt,e.summary.encouragement)}catch{}break;case"coach_tip":if((i=(n=this.game)==null?void 0:n.events)!=null&&i.notify){const a=e.tip||{},o=h=>String(h).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),l=[];if(a.tip){l.push(`💡 ${o(a.tip)}`);try{(s=Kt==null?void 0:Kt.speak)==null||s.call(Kt,`Coach tip: ${a.tip}`)}catch{}}a.reason&&l.push(`Why: ${o(a.reason)}`),a.next_action&&l.push(`Next: ${o(a.next_action)}`);const c=l.join("<br/>");this.game.events.notify(c,"info")}break;case"room_created":this.game.onRoomCreated&&this.game.onRoomCreated(e.code,e.room);break;case"player_joined":this.game.onPlayerJoined&&this.game.onPlayerJoined(e.players,e.room);break;case"battle_started":this.game.onBattleStarted&&this.game.onBattleStarted(e.room);break;case"chat":this.game.onChatMessage&&this.game.onChatMessage(e);break;case"service_request":this.game.onServiceRequest&&this.game.onServiceRequest(e);break;case"ai_global_challenge":this.game.onGlobalChallenge&&this.game.onGlobalChallenge(e.challenge);break;case"player_state":this.game.onPlayerStateUpdate&&this.game.onPlayerStateUpdate(e);break;case"error":console.error("[WS Error]",e.message),this.game.events&&this.game.events.notify("❌ "+e.message);break}}startGame(e){this.sessionId=e,this._send({type:"start_game",sessionId:e})}sendAction(e,t,n,i){this._send({type:"player_action",sessionId:this.sessionId,actionId:e,buildingType:t,cost:n,effect:i,elapsedSecs:this._elapsed()})}sendEventResolved(e,t,n){this._send({type:"event_resolved",sessionId:this.sessionId,eventId:e,actionId:t,cost:n,elapsedSecs:this._elapsed()})}sendGameOver(e,t){this._send({type:"game_over",sessionId:this.sessionId,outcome:e,finalState:t})}sendStateUpdate(e){this._send({type:"state_update",sessionId:this.sessionId,elapsedSecs:this._elapsed(),...e})}createRoom(){this._send({type:"create_room"})}joinRoom(e){this._send({type:"join_room",roomCode:e})}startBattle(e){this._send({type:"start_battle",roomCode:e})}startBattleSession(e){this._send({type:"start_battle_session",roomCode:e})}sendChat(e,t=null){this._send({type:"chat",text:e,toId:t})}sendServiceRequest(e,t,n){this._send({type:"service_request",toId:e,requestType:t,data:n})}_send(e){this.ws&&this.ws.readyState===WebSocket.OPEN?this.ws.send(JSON.stringify(e)):console.warn("[WS] Cannot send — not connected:",e)}_elapsed(){return this.startTime?Math.floor((Date.now()-this.startTime)/1e3):0}disconnect(){this.ws&&this.ws.close()}}class aS{constructor(){window.game=this;const e=yr();this.userName=(e==null?void 0:e.username)||(e==null?void 0:e.full_name)||"CEO",this.userProfile=e,this.currentScreen="intro",this.socket=null,this.rivalStates=new Map,this._lastRivalRender=0,this.canvas=document.getElementById("game-canvas"),this.scene=new cy,this.scene.background=new Ie(14282751),this.renderer=new Md({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Vu,this.renderer.outputColorSpace=ft,this.renderer.toneMapping=Wu,this.renderer.toneMappingExposure=1.2,this.labelRenderer=new Zy,this.labelRenderer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0px",this.labelRenderer.domElement.style.pointerEvents="none",document.getElementById("app").appendChild(this.labelRenderer.domElement);const t=window.innerWidth/window.innerHeight,n=20;this.camera=new Ga(-n*t,n*t,n,-n,.1,2e3),this.camera.position.set(100,100,100),this.camera.zoom=1,this.camera.lookAt(0,0,0),this.camera.updateProjectionMatrix(),this.economy=new JM(this),this.world=new KM(this),this.events=new tS(this),this.tutorial=new nS(this),this.controls=new Ky(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.maxPolarAngle=Math.PI/2.1,this.controls.minZoom=.5,this.controls.maxZoom=4,this.menuEl=document.getElementById("context-menu"),this.buildingMenuLabel=new Xl(this.menuEl),this.loaderEl=document.getElementById("global-loader"),this.loaderStatusEl=document.getElementById("loader-status"),this.setupLoadingManager(),this.setupLighting(),this.init()}_fmtMoney(e){return e==null||Number.isNaN(Number(e))?"—":`$${Math.floor(Number(e)).toLocaleString()}`}_fmtPct(e){return e==null||Number.isNaN(Number(e))?"—":`${Math.floor(Number(e))}%`}_fmtTimeLeft(e){const t=Number(e);if(!Number.isFinite(t))return"—";const n=Math.max(0,Math.floor(t)),i=Math.floor(n/60),s=n%60;return`${i.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}_setRivalPanelVisible(e){const t=document.getElementById("rival-stats-panel");t&&t.classList.toggle("hidden",!e)}_renderRivalStats(){var s;const e=Date.now();if(e-this._lastRivalRender<150)return;this._lastRivalRender=e;const t=document.getElementById("rival-stats-container");if(!t)return;if(!this.currentRoom||!Array.isArray(this.currentRoom.players)){this._setRivalPanelVisible(!1);return}const n=(s=this.userProfile)==null?void 0:s.id,i=this.currentRoom.players.filter(a=>(a==null?void 0:a.id)&&a.id!==n);if(!i.length){t.innerHTML="",this._setRivalPanelVisible(!1);return}this._setRivalPanelVisible(!0),t.innerHTML=i.map(a=>{const o=this.rivalStates.get(a.id),l=(o==null?void 0:o.state)||{},c=this._fmtMoney(l.cash),h=this._fmtMoney(l.revenue),u=this._fmtMoney(l.debt),d=l.equity===null||l.equity===void 0||Number.isNaN(Number(l.equity))?"—":`${Math.floor(Number(l.equity))}%`,f=this._fmtPct(l.morale),_=this._fmtPct(l.reputation),g=this._fmtTimeLeft(l.timeLeft),p=o!=null&&o.at?Math.floor((Date.now()-o.at)/1e3):null,m=p===null?"":`<span class="rival-sub">${p}s ago</span>`;return`
                <div class="rival-card">
                    <div class="rival-name">
                        <span>${this._escapeHtml(a.name||"Rival")}</span>
                        ${m}
                    </div>
                    <div class="rival-metrics">
                        <div class="rival-metric"><span class="k">CASH</span><span class="v">${c}</span></div>
                        <div class="rival-metric"><span class="k">REV</span><span class="v">${h}</span></div>
                        <div class="rival-metric"><span class="k">MORALE</span><span class="v">${f}</span></div>
                        <div class="rival-metric"><span class="k">REP</span><span class="v">${_}</span></div>
                        <div class="rival-metric"><span class="k">DEBT</span><span class="v">${u}</span></div>
                        <div class="rival-metric"><span class="k">EQ</span><span class="v">${d}</span></div>
                        <div class="rival-metric"><span class="k">TIME</span><span class="v">${g}</span></div>
                    </div>
                </div>
            `}).join("")}setupLoadingManager(){gr.onStart=(e,t,n)=>{this.setLoading(!0,`INITIALIZING ASSETS... (${t}/${n})`)},gr.onProgress=(e,t,n)=>{this.setLoading(!0,`LOADING EMPIRE ASSETS... ${Math.round(t/n*100)}%`)},gr.onLoad=()=>{this.setLoading(!1)},gr.onError=e=>{console.error("There was an error loading "+e),this.setLoading(!1)}}setLoading(e,t="INITIALIZING SYSTEM..."){var n,i;this.loaderEl&&(e&&((i=(n=this.economy)==null?void 0:n.state)==null?void 0:i.currentLevel)===0||(e?(this.loaderStatusEl.innerText=t,this.loaderEl.classList.remove("hidden"),this.loaderEl.style.opacity="1"):(this.loaderEl.style.opacity="0",setTimeout(()=>{this.loaderEl.style.opacity==="0"&&this.loaderEl.classList.add("hidden")},500))))}setupLighting(){const e=new Fy(16777215,1.8);this.scene.add(e);const t=new Cd(16777215,1.5);t.position.set(40,60,20),t.castShadow=!0,t.shadow.mapSize.width=4096,t.shadow.mapSize.height=4096,t.shadow.camera.left=-80,t.shadow.camera.right=80,t.shadow.camera.top=80,t.shadow.camera.bottom=-80,t.shadow.bias=-.001,t.shadow.radius=2,this.scene.add(t);const n=new Rd(16777215,14282751,1);this.scene.add(n)}init(){window.addEventListener("resize",()=>this.onWindowResize()),this._pendingRulesLevel=null,this.myPlayerIndex=null,this._globalChallengeSeen=new Map;const e=yr(),t=wr();if(!e)this.showScreen("auth");else if(this.userName=e.username||e.full_name||"CEO",this.userProfile=e,!!(t.tutorial_done||e.tutorial_completed))this.renderDashboard(),this.showScreen("dashboard");else{this.showScreen("intro"),this.initializeAvatarPicker();const l=document.getElementById("user-name");l&&(l.value=this.userName)}const n=document.getElementById("initialize-btn");n.onclick=()=>{const o=document.getElementById("user-name").value.trim(),l=yr();l&&o?(this.userName=o,this.userProfile={...l,full_name:o,avatar:this.avatars[this.avatarIndex]},localStorage.setItem("empire_user",JSON.stringify(this.userProfile)),!!(wr().tutorial_done||l.tutorial_completed)?(this.renderDashboard(),this.showScreen("dashboard")):this.startTutorial()):this.showScreen("auth")},document.getElementById("mode-map").onclick=()=>{this.renderRoadway(),this.showScreen("map")};const i=document.getElementById("logout-btn-dashboard");i&&(i.onclick=()=>this.logout()),document.getElementById("logout-btn-map").onclick=()=>this.logout(),document.getElementById("mode-battle").onclick=()=>this.showScreen("battle-lobby"),document.getElementById("btn-create-room").onclick=()=>{_t.click(),this.createBattleRoom()},document.getElementById("btn-show-join").onclick=()=>{_t.click(),document.getElementById("lobby-init-ui").classList.add("hidden"),document.getElementById("lobby-join-ui").classList.remove("hidden")},document.getElementById("btn-back-to-lobby").onclick=()=>{_t.click(),document.getElementById("lobby-init-ui").classList.remove("hidden"),document.getElementById("lobby-join-ui").classList.add("hidden")},document.getElementById("btn-join-room").onclick=()=>{_t.click();const o=document.getElementById("join-room-code").value.toUpperCase().trim();o&&this.joinBattleRoom(o)},document.getElementById("leave-battle-btn").onclick=()=>{_t.click(),this.showScreen("dashboard")},document.getElementById("start-battle-btn").onclick=()=>{_t.click(),this.currentRoom&&this.socket.startBattle(this.currentRoom.code)},document.getElementById("send-chat-btn").onclick=()=>{_t.click(),this.sendChatMessage()},document.getElementById("chat-input").onkeypress=o=>{o.key==="Enter"&&(_t.click(),this.sendChatMessage())},document.getElementById("back-to-dashboard").onclick=()=>{_t.click(),this.showScreen("dashboard")};const s=document.getElementById("rules-cancel"),a=document.getElementById("rules-start");s&&(s.onclick=()=>{this._pendingRulesLevel=null,this.showScreen("map")}),a&&(a.onclick=()=>{const o=this._pendingRulesLevel;this._pendingRulesLevel=null,Number.isFinite(o)?this.startLevel(o):this.showScreen("map")}),document.querySelectorAll(".level-node").forEach(o=>{o.onclick=()=>{var h;const l=parseInt(o.dataset.level),c=((h=this.userProfile)==null?void 0:h.last_unlocked_level)||1;if(l>c){_t.error(),this.events.notify("⚠️ LEVEL LOCKED: Complete previous mission first!");return}this.startLevelFromMap(l),this.updateSelectedLevelInfo(l),_t.click()}}),document.getElementById("start-level-btn").onclick=()=>{var l;_t.click();const o=((l=this.userProfile)==null?void 0:l.last_unlocked_level)||1;o>5?alert("All current protocols complete! Stay tuned for more levels."):this.startLevelFromMap(o)},document.getElementById("close-menu").onclick=()=>{this.menuEl.classList.add("hidden")},this.raycaster=new jy,this.mouse=new De,this.renderer.domElement.addEventListener("mousedown",o=>this.onMouseDown(o)),this.animate()}showScreen(e){if(document.querySelectorAll(".overlay").forEach(n=>n.classList.add("hidden")),e==="none"){this.currentScreen="none";return}const t=document.getElementById(`screen-${e}`);t&&(t.classList.remove("hidden"),this.currentScreen=e)}logout(){Qa(()=>Promise.resolve().then(()=>Ja),void 0).then(e=>{e.clearSession(),window.location.reload()})}async renderDashboard(){var c,h;document.getElementById("dash-ceo-name").innerText=this.userName.toUpperCase();const e=document.getElementById("dash-avatar-img");e&&((c=this.userProfile)!=null&&c.avatar)&&(e.src=this.userProfile.avatar);const t=((h=this.userProfile)==null?void 0:h.last_unlocked_level)||1,n=Math.max(0,Number(t)-1),i=document.getElementById("dash-ceo-rank");if(i){const u=["JUNIOR EXECUTIVE","SECTOR MANAGER","REGIONAL DIRECTOR","GLOBAL VICE PRESIDENT","CORPORATE MONARCH","EMPIRE OVERLORD"];i.innerText=u[Math.min(t-1,u.length-1)]}const s=document.getElementById("dash-kpi-unlocked");s&&(s.textContent=String(n));const a=document.getElementById("dash-kpi-latest");a&&(a.textContent="--");const o=document.getElementById("dash-kpi-last-score");o&&(o.textContent="--");const l=document.getElementById("dash-kpi-best-score");l&&(l.textContent="--");try{const{getGameHistory:u}=await Qa(async()=>{const{getGameHistory:g}=await Promise.resolve().then(()=>Ja);return{getGameHistory:g}},void 0),d=await u(),f=document.getElementById("latest-summary-box"),_=g=>{const p=Number(g);return Number.isFinite(p)?p:null};if(d&&d.length>0){const g=d[0],p=(g==null?void 0:g.ai_summary)||(g==null?void 0:g.summary)||{},m=(g==null?void 0:g.level_completed)||(g==null?void 0:g.level)||"?",x=_((p==null?void 0:p.score)??(g==null?void 0:g.score));let v=x;for(const M of d){const T=(M==null?void 0:M.ai_summary)||(M==null?void 0:M.summary)||{},A=_((T==null?void 0:T.score)??(M==null?void 0:M.score));A!==null&&(v==null?v=A:v=Math.max(v,A))}a&&(a.textContent=`LEVEL ${m}`),o&&(o.textContent=x===null?"--":`${x}/100`),l&&(l.textContent=v==null?"--":`${v}/100`),f.innerHTML=`
                    <div class="summary-header-mini">
                        <strong>LEVEL ${m}</strong> | 
                        <span>SCORE: ${x??0}/100</span>
                    </div>
                    <p>"${(p==null?void 0:p.encouragement)||"Strategic analysis pending next operation."}"</p>
                `}else f.innerHTML='<p class="placeholder-text">Complete a protocol to receive AI strategic analysis.</p>'}catch(u){console.warn("[Dashboard] Could not fetch game history:",u.message)}}async renderRoadway(){var t;try{const{getProfile:n}=await Qa(async()=>{const{getProfile:s}=await Promise.resolve().then(()=>Ja);return{getProfile:s}},void 0),i=await n();this.userProfile=i}catch(n){console.warn("[Game] Failed to fetch profile for roadway:",n.message)}const e=((t=this.userProfile)==null?void 0:t.last_unlocked_level)||1;document.querySelectorAll(".level-node").forEach(n=>{const i=parseInt(n.dataset.level);n.classList.remove("active","locked","completed"),i<e?n.classList.add("completed"):i===e?n.classList.add("active"):n.classList.add("locked")}),this.updateSelectedLevelInfo(Math.min(e,5))}updateSelectedLevelInfo(e){const n={1:{name:"SURVIVAL PHASE",desc:"Reach $50,000 revenue. High volatility detected in the sector."},2:{name:"EXPANSION PHASE",desc:"Scale operations to $150,000. New competitors are entering the fray."},3:{name:"DOMINANCE PHASE",desc:"Secure $500,000 revenue. Assert market authority through tech and media."},4:{name:"MONOPOLY CORE",desc:"Hit $1.5M revenue. Control the entire infrastructure of the metro area."},5:{name:"EMPIRE PROTOCOL",desc:"Reach the ultimate $5M target. Ascend to Corporate Godhood."}}[e];document.getElementById("road-level-title").innerText=`LEVEL ${e}: ${n.name}`,document.getElementById("road-level-desc").innerText=n.desc;const i=document.getElementById("start-level-btn");i.innerText=`ENGAGE PROTOCOL ${e}`,i.onclick=()=>this.startLevel(e),document.querySelectorAll(".level-node").forEach(s=>{s.style.transform=parseInt(s.dataset.level)===e?"scale(1.2) rotate(0deg)":"",s.style.borderColor=parseInt(s.dataset.level)===e?"var(--primary)":""})}startTutorial(){this.showScreen("none"),this.showHUD(),this.world.buildings.forEach(e=>this.scene.remove(e)),this.world.buildings=[],this.tutorial.start(),this.economy.start(1)}startLevelFromMap(e){const t=Number(e)||1;this._pendingRulesLevel=t,this._renderRulesBriefing(t),this.showScreen("rules")}_renderRulesBriefing(e){const t=document.getElementById("rules-title"),n=document.getElementById("rules-body");if(!n)return;const i={1:{target:5e4,time:180,name:"SURVIVAL PHASE"},2:{target:15e4,time:240,name:"EXPANSION PHASE"},3:{target:5e5,time:300,name:"DOMINANCE PHASE"},4:{target:15e5,time:360,name:"MONOPOLY CORE"},5:{target:5e6,time:480,name:"EMPIRE PROTOCOL"}},s=i[e]||i[1],a=Math.max(1,Math.floor(s.time/60));t&&(t.innerText=`LEVEL ${e} RULES`);const o=[{name:"Production Plant (Factory)",val:140},{name:"Metro Storefront",val:80},{name:"Logistics Warehouse",val:40},{name:"R&D Lab",val:20},{name:"Headquarters",val:15},{name:"Media Tower",val:15},{name:"NovaTech Bank",val:10},{name:"HR Office",val:5}];n.innerHTML=`
            <h2>Objective</h2>
            <p>Win by reaching <span class="highlight">$${Number(s.target).toLocaleString()}</span> revenue before time runs out (${a} min).</p>

            <h2>How Money Increases</h2>
            <ul>
                <li>Every second, each building generates income (base amount × multipliers).</li>
                <li>Some buildings can be upgraded to increase output (Factory / Warehouse / R&D).</li>
            </ul>
            <p>Base income examples (per second):</p>
            <ul>
                ${o.map(l=>`<li>${l.name}: +$${l.val}/sec</li>`).join("")}
            </ul>

            <h2>Multipliers & Penalties</h2>
            <ul>
                <li><b>Events</b> can reduce output until you fix them.</li>
                <li><b>Multiple active critical events</b> stack a revenue decay (up to a minimum floor).</li>
                <li><b>Morale</b> affects all output — low morale causes a steep drop.</li>
                <li><b>Reputation</b> affects consumer-facing output (storefront performance).</li>
                <li><b>Debt</b> costs interest each second if you take loans.</li>
            </ul>

            <h2>Buildings You’ll See</h2>
            <ul>
                <li><b>Headquarters</b> — boosts morale / strategy actions.</li>
                <li><b>HR Office</b> — hire/bonus to recover morale, resolve strikes.</li>
                <li><b>Factory</b> — highest output; can have accidents.</li>
                <li><b>Warehouse</b> — supply chain output; can have logistics crises.</li>
                <li><b>R&D Lab</b> — innovation income; can face data breaches.</li>
                <li><b>Bank</b> — loans/equity for emergency cash (adds debt risk).</li>
                <li><b>Media Tower</b> — reputation + PR actions, counters attacks.</li>
                <li><b>Storefront</b> — consumer sales output; influenced by reputation.</li>
            </ul>

            <h2>What You Can Do</h2>
            <ul>
                <li>Left-click a building → choose an action from the menu.</li>
                <li>Spend cash to upgrade, fix events, or stabilize morale/reputation.</li>
            </ul>

            <h2>How You Lose</h2>
            <ul>
                <li>Time hits zero.</li>
                <li>Cash drops too low (bankruptcy).</li>
                <li>Morale collapses (employees walk out).</li>
            </ul>
        `}async startLevel(e){this.setLoading(!0,`PROVISIONING SECTOR ${e}...`),this.showScreen("none"),this.showHUD(),this.tutorial.isActive=!1,document.getElementById("tutorial-popup").classList.add("hidden"),this.world.spawnInitialBuildings(e),this.economy.start(e),jo.start(),this.events.notify(`⚡ LEVEL ${e} COMMENCING — SURVIVE THE STORM, ${this.userName.toUpperCase()}!`);try{this.setLoading(!0,"SYNCING PROTOCOLS WITH COMMAND..."),this.socket||(this.socket=new Bu(this),await this.socket.connect());const t=await Hu(e);this.socket.startGame(t),this.setLoading(!1)}catch(t){console.warn("[Game] Backend offline, playing in offline mode:",t.message),this.socket=null,this.setLoading(!1)}}showHUD(){document.getElementById("hud").classList.remove("hidden")}hideHUD(){document.getElementById("hud").classList.add("hidden")}onMouseDown(e){if(this.currentScreen!=="none"&&!this.tutorial.isActive||e.button!==0)return;this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.world.buildings,!0);if(t.length>0){let n=t[0].object;for(;n.parent&&!n.userData.buildingId;)n=n.parent;if(n.userData.buildingId){const i=n.userData.ownerIndex,s=!!this.currentRoom,a=s?this.currentRoom.players.findIndex(o=>o.id===this.userProfile.id):0;if(s&&i!==void 0&&i!==a){this.events.notify("🚫 That belongs to a competitor!");return}this.showBuildingMenu(n)}}else this.menuEl.classList.add("hidden")}endGame(e,t){this.setLoading(!0,"AI STRATEGIST ANALYZING GAMEPLAY..."),this.economy.endGame(e,t)}showSummary(e,t,n){var c,h;this.setLoading(!1),jo.stop(),this.economy._summaryTimeout&&(clearTimeout(this.economy._summaryTimeout),this.economy._summaryTimeout=null),this.hideHUD();const i=document.getElementById("screen-summary");i&&i.remove();const s=document.createElement("div");s.id="screen-summary",s.className="overlay summary-screen";const a=t==="win",o=this.economy.state.currentLevel||1;a&&o>=(((c=this.userProfile)==null?void 0:c.last_unlocked_level)||1)&&this.userProfile&&(this.userProfile.last_unlocked_level=o+1),(h=this.userProfile)!=null&&h.last_unlocked_level;const l=a?o+1:null;s.innerHTML=`
            <div class="summary-card">
                <div class="summary-header ${a?"win":"loss"}">
                    <div class="summary-icon">${a?"🏆":"💼"}</div>
                    <h1>${a?"Mission Complete!":"Mission Failed"}</h1>
                    <div class="summary-badge">${e.badge||(a?"Rising CEO":"Determined Entrepreneur")}</div>
                </div>
                ${l&&l<=5?`<div class="level-unlock-banner">🔓 Level ${l} Unlocked!</div>`:""}
                ${n?`<div class="summary-reason">${n}</div>`:""}
                <div class="summary-body">
                    <div class="summary-score">
                        <span class="score-num">${e.score||0}</span>
                        <span class="score-label">/ 100</span>
                    </div>
                    <div class="summary-style">
                        Play Style: <strong>${(e.play_style||"balanced").replace(/_/g," ").toUpperCase()}</strong>
                    </div>
                    <div class="summary-sections">
                        <div class="summary-col">
                            <h3>💪 Strengths</h3>
                            <ul>${(e.strengths||[]).map(u=>`<li>${u}</li>`).join("")}</ul>
                        </div>
                        <div class="summary-col">
                            <h3>🎯 Key Moments</h3>
                            <ul>${(e.key_moments||[]).map(u=>`<li><em>t=${u.time}</em>: ${u.action} — ${u.impact}</li>`).join("")}</ul>
                        </div>
                    </div>
                    <div class="summary-encouragement">
                        ${e.encouragement||(a?"🎉 Amazing work!":"💪 Keep trying!")}
                    </div>
                    <div class="summary-actions">
                        <button id="summary-play-again" class="primary-btn">🔄 Play Again</button>
                        <button id="summary-menu" class="secondary-btn">🏠 Main Menu</button>
                    </div>
                </div>
            </div>
        `,document.getElementById("app").appendChild(s),document.getElementById("summary-play-again").onclick=()=>{_t.click(),s.remove(),this.startLevel(o)},document.getElementById("summary-menu").onclick=()=>{_t.click(),s.remove(),this.hideHUD(),this.renderDashboard(),this.showScreen("dashboard")}}async connectSocket(){this.socket||(this.setLoading(!0,"ESTABLISHING SECURE CONNECTION..."),this.socket=new Bu(this),await this.socket.connect(),this.setLoading(!1))}async createBattleRoom(){this.setLoading(!0,"PROVISIONING BATTLE ARENA..."),await this.connectSocket(),this.socket.createRoom(),this.setLoading(!1)}async joinBattleRoom(e){this.setLoading(!0,`JOINING ARENA: ${e}...`),await this.connectSocket(),this.socket.joinRoom(e),this.setLoading(!1)}onRoomCreated(e,t){this.currentRoom=t,this.updateLobbyUI()}onPlayerJoined(e,t){this.currentRoom=t,this.updateLobbyUI(),this.events.notify(`👤 ${e[e.length-1].name} joined the arena!`)}updateLobbyUI(){if(!this.currentRoom)return;document.getElementById("lobby-init-ui").classList.add("hidden"),document.getElementById("lobby-join-ui").classList.add("hidden"),document.getElementById("lobby-waiting-ui").classList.remove("hidden"),document.getElementById("display-room-code").innerText=this.currentRoom.code,document.getElementById("player-count").innerText=`Waiting for CEOs (${this.currentRoom.players.length}/4)...`;const e=document.getElementById("lobby-player-list");e.innerHTML=this.currentRoom.players.map(i=>`
            <div class="lobby-player-item">
                <span class="avatar">👨‍💼</span>
                <span class="name">${i.name} ${i.id===this.userProfile.id?"(YOU)":""}</span>
                ${i.isAdmin?'<span class="badge">HOST</span>':""}
            </div>
        `).join("");const t=document.getElementById("start-battle-btn"),n=this.currentRoom.hostId===this.userProfile.id;t.classList.toggle("locked",!n||this.currentRoom.players.length<1),t.disabled=!n}onBattleStarted(e){var n,i;this.currentRoom=e,this.showScreen("none"),this.showHUD(),document.getElementById("multiplayer-hud").classList.remove("hidden");const t=e.players.findIndex(s=>s.id===this.userProfile.id);this.myPlayerIndex=t,this._globalChallengeSeen.clear(),this.rivalStates.clear(),this._renderRivalStats();try{(i=(n=this.socket)==null?void 0:n.startBattleSession)==null||i.call(n,e.code)}catch{}this.world.spawnMultiplayerBuildings(e.players.length,t),this.economy.start(1,{timeOverride:120}),jo.start(),this.events.notify("⚔️ BATTLE COMMENCED! CRUSH THE COMPETITION!"),this.updatePlayerList()}onPlayerStateUpdate(e){var n,i,s;const t=(n=this.userProfile)==null?void 0:n.id;if(!(!e||!e.fromId||e.fromId===t)){if(this.rivalStates.set(e.fromId,{name:e.fromName,state:e.state||{},at:Date.now()}),(s=(i=this.currentRoom)==null?void 0:i.players)!=null&&s.length){const a=this.currentRoom.players.find(o=>o.id===e.fromId);a&&e.fromName&&(a.name=e.fromName)}this._renderRivalStats()}}_escapeHtml(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}_globalChallengeKey(e){const t=((e==null?void 0:e.key)||(e==null?void 0:e.title)||"").toString().toLowerCase().replace(/\s+/g," ").trim(),n=((e==null?void 0:e.resolveBuilding)||"").toString().toLowerCase().trim();return`${t}|${n}`}_findBuildingForChallenge(e){var s,a;const t=String(e||"").toLowerCase().trim();if(!t||!((a=(s=this.world)==null?void 0:s.buildings)!=null&&a.length))return null;const n=this.world.buildings.filter(o=>{var l;return((l=o==null?void 0:o.userData)==null?void 0:l.type)===t});if(!n.length)return null;if(Number.isFinite(this.myPlayerIndex)){const o=n.find(l=>{var c;return Number.isFinite((c=l==null?void 0:l.userData)==null?void 0:c.ownerIndex)&&l.userData.ownerIndex===this.myPlayerIndex});if(o)return o}return n.find(o=>{var l;return!Number.isFinite((l=o==null?void 0:o.userData)==null?void 0:l.ownerIndex)})||n[0]}showGlobalChallengeAtBuilding(e){var m,x,v,M,T,A;const t=Date.now(),n=this._globalChallengeKey(e),i=this._globalChallengeSeen.get(n);if(i&&t-i<12e4)return;this._globalChallengeSeen.set(n,t);for(const[E,P]of this._globalChallengeSeen.entries())t-P>10*60*1e3&&this._globalChallengeSeen.delete(E);const s=this._findBuildingForChallenge(e==null?void 0:e.resolveBuilding);if(!s){this.showGlobalChallengePopup(e);return}const a=(m=s.userData)==null?void 0:m.type,o=(x=this.world.buildingTypes)==null?void 0:x[a],l=(e==null?void 0:e.department)||(o==null?void 0:o.name)||"Department",c=(e==null?void 0:e.icon)||"🤖",h=this.menuEl||document.getElementById("context-menu"),u=((v=h==null?void 0:h.querySelector)==null?void 0:v.call(h,"#building-name"))||document.getElementById("building-name"),d=((M=h==null?void 0:h.querySelector)==null?void 0:M.call(h,"#building-stats"))||document.getElementById("building-stats"),f=((T=h==null?void 0:h.querySelector)==null?void 0:T.call(h,"#building-actions"))||document.getElementById("building-actions");if(!h||!u||!d||!f){this.showGlobalChallengePopup(e);return}s.add(this.buildingMenuLabel),this.buildingMenuLabel.position.set(0,((A=o==null?void 0:o.size)!=null&&A[1]?o.size[1]*(o.scale||1)*.1:3)+2,0),u.innerText=`${c} ${l}: ${(e==null?void 0:e.title)||"GLOBAL CHALLENGE"}`;const _=this._escapeHtml((e==null?void 0:e.desc)||""),g=this._escapeHtml((e==null?void 0:e.impact)||"");d.innerHTML=`
            <p><strong>Source:</strong> ${this._escapeHtml(l)}</p>
            <p>${_}</p>
            <p class="event-impact-text">${g}</p>
        `,f.innerHTML="",(Array.isArray(e==null?void 0:e.resolveActions)?e.resolveActions:[]).forEach(E=>{const P=document.createElement("button");P.className="action-btn";const y=(E==null?void 0:E.label)||"Respond",b=Number(E==null?void 0:E.cost)||0;P.innerText=b?`${y} (–$${b})`:y,P.onclick=()=>{this.resolveGlobalChallenge(e,E),this.menuEl.classList.add("hidden")},f.appendChild(P)});try{const E=new N;s.getWorldPosition(E),this.controls.target.set(E.x,0,E.z)}catch{}this.menuEl.classList.remove("hidden")}updatePlayerList(){const e=document.getElementById("players-container");this.currentRoom&&(e.innerHTML=this.currentRoom.players.map(t=>{const n=t.id===this.userProfile.id;return`
                <div class="online-player ${n?"me":""}">
                    <span class="p-name">${t.name}</span>
                    ${n?"":`
                        <div class="p-actions">
                            <button onclick="window.game.initPrivateChat('${t.id}', '${t.name}')" title="Private Chat">💬</button>
                            <button onclick="window.game.initServiceRequest('${t.id}', '${t.name}')" title="Request Service">🤝</button>
                        </div>
                    `}
                </div>
            `}).join(""),this._renderRivalStats())}initPrivateChat(e,t){const n=document.getElementById("chat-input");n.value=`/w ${t} `,n.focus(),this.privateChatTarget={id:e,name:t}}initServiceRequest(e,t){this.socket.sendServiceRequest(e,"Strategic Partnership",{offer:"Shared Market Intel",cost:5e3}),this.events.notify(`🤝 Offer sent to ${t}!`)}sendChatMessage(){const e=document.getElementById("chat-input");let t=e.value.trim();if(!t||!this.socket)return;let n=null;t.startsWith("/w ")&&this.privateChatTarget&&(n=this.privateChatTarget.id,t=t.replace(/^\/w [^ ]+ /,"")),this.socket.sendChat(t,n),e.value="",n&&(this.privateChatTarget=null)}onChatMessage(e){const t=document.getElementById("chat-messages"),n=document.createElement("div");n.className="chat-msg",n.innerHTML=`
            <span class="author">${e.fromId===this.userProfile.id?"YOU":e.fromName}:</span>
            <span class="text">${e.text}</span>
            ${e.isPrivate?'<span class="private">[PRIVATE]</span>':""}
        `,t.appendChild(n),t.scrollTop=t.scrollHeight}onServiceRequest(e){this.events.notify(`📩 SERVICE REQUEST from ${e.fromName}: ${e.requestType}`,"opportunity",[{label:`ACCEPT (${e.data.cost?"$"+e.data.cost:"FREE"})`,action:()=>this.acceptServiceRequest(e)}])}onGlobalChallenge(e){this.showGlobalChallengeAtBuilding(e)}showGlobalChallengePopup(e){const t=document.getElementById("event-alert"),n=document.getElementById("event-alert-inner");n.style.borderColor="#9b59b6",n.style.boxShadow="0 0 60px rgba(155, 89, 182, 0.4)",document.getElementById("event-icon").innerText="🤖",document.getElementById("event-title").innerText=`GAME MASTER: ${e.title}`,document.getElementById("event-urgency").innerText=e.urgency,document.getElementById("event-urgency").className=`urgency-${e.urgency.toLowerCase()}`,document.getElementById("event-desc").innerText=e.desc,document.getElementById("event-impact").innerText=e.impact;const i=document.getElementById("event-actions");i.innerHTML="",e.resolveActions.forEach(s=>{const a=document.createElement("button");a.className="primary-btn",a.style.background="linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",a.innerText=`${s.label} (–$${s.cost})`,a.onclick=()=>{_t.click(),this.resolveGlobalChallenge(e,s),t.classList.add("hidden")},i.appendChild(a)}),t.classList.remove("hidden")}resolveGlobalChallenge(e,t){if(this.economy.state.cash<t.cost){this.events.notify("❌ Insufficient funds for this strategic move!");return}this.economy.state.cash-=t.cost,this.economy.state.revenue+=2e3,this.economy.state.reputation=Math.min(100,this.economy.state.reputation+10),this.economy.updateUI(),this.socket.sendAction("resolve_global_challenge","SYSTEM",t.cost,{revenue:2e3,reputation:10,challengeId:e.id}),this.events.notify(`✅ ${t.label} SUCCESSFUL! Profit boost applied.`),this.socket.sendChat(`🚀 I have successfully addressed the "${e.title}" challenge!`)}acceptServiceRequest(e){if(e.data.cost&&this.economy.state.cash<e.data.cost){this.events.notify("❌ Not enough cash to accept this partnership.");return}e.data.cost&&(this.economy.state.cash-=e.data.cost),this.economy.state.morale=Math.min(100,this.economy.state.morale+10),this.economy.updateUI(),this.events.notify(`✅ Partnership with ${e.fromName} established!`),this.socket.sendChat(`🤝 I have accepted your ${e.requestType}!`,e.fromId)}showBuildingMenu(e){const t=e.userData;document.getElementById("building-name").innerText=t.name;const n=this.world.buildingTypes[t.type];document.getElementById("building-stats").innerHTML=`<p>${n.description}</p>`;const i=document.getElementById("building-actions");i.innerHTML="",n.actions.forEach(s=>{const a=document.createElement("button");a.className="action-btn",a.innerText=s.label,a.onclick=()=>{_t.click(),this.economy.executeAction(s.id,t),this.tutorial.onGameAction(s.id),this.menuEl.classList.add("hidden")},i.appendChild(a)}),e.add(this.buildingMenuLabel),this.buildingMenuLabel.position.set(0,n.size[1]*n.scale*.1+2,0),this.menuEl.classList.remove("hidden")}onWindowResize(){const e=window.innerWidth/window.innerHeight,t=20;this.camera.left=-t*e,this.camera.right=t*e,this.camera.top=t,this.camera.bottom=-t,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.setSize(window.innerWidth,window.innerHeight)}initializeAvatarPicker(){this.avatars=["assets/avatars/youngGuy.png","assets/avatars/women.png","assets/avatars/oldDude.png"],this.avatarIndex=0;const e=document.getElementById("prev-avatar"),t=document.getElementById("next-avatar"),n=document.getElementById("selected-avatar-img");if(!e||!t||!n)return;const i=()=>{n.src=this.avatars[this.avatarIndex]};e.onclick=()=>{this.avatarIndex=(this.avatarIndex-1+this.avatars.length)%this.avatars.length,i()},t.onclick=()=>{this.avatarIndex=(this.avatarIndex+1)%this.avatars.length,i()}}animate(){requestAnimationFrame(()=>this.animate()),this.controls.update(),this.world&&this.world.update(),this.economy&&this.economy.update(),this.events&&this.events.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}}new aS;
