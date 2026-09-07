/* Small, versioned, offline persistence adapter. Android commits on its JS bridge
   worker before returning; localStorage remains a secondary copy/browser fallback. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.BloomPersistence=api;})(typeof self!=='undefined'?self:this,function(){
 'use strict';
 const MODES=['cozy','classic','adventure','prism'];
 const KEYS=['bloom.game','bloom.profile','bloom.settings'];
 function parse(s,fallback=null){try{return JSON.parse(s)||fallback;}catch(_){return fallback;}}
 function integer(n,max=1000000000){return Number.isFinite(Number(n))?Math.min(max,Math.max(0,Math.floor(Number(n)))):0;}
 function normalizeProfile(p){
   p=p&&typeof p==='object'?p:{};
   const r={bests:{},levelStars:{},unlocked:1,achievements:{},finished:[],tutorial:!!p.tutorial};
   for(const m of MODES)r.bests[m]=integer(p.bests&&p.bests[m]);
   for(let n=1;n<=24;n++)if(p.levelStars&&integer(p.levelStars[n],3))r.levelStars[n]=integer(p.levelStars[n],3);
   r.unlocked=Math.max(1,integer(p.unlocked,24));
   for(const a of ['first','double','combo','thousand','perfect','explorer','blast','collector'])r.achievements[a]=!!(p.achievements&&p.achievements[a]);
   if(p.restoredBest)r.restoredBest=true;
   return r;
 }
 function mergeProfiles(a,b){const r=normalizeProfile(a),q=normalizeProfile(b);for(const m of MODES)r.bests[m]=Math.max(r.bests[m],q.bests[m]);for(let n=1;n<=24;n++)r.levelStars[n]=Math.max(r.levelStars[n]||0,q.levelStars[n]||0);r.unlocked=Math.max(r.unlocked,q.unlocked);r.tutorial||=q.tutorial;for(const a in q.achievements)r.achievements[a]||=q.achievements[a];r.restoredBest=!!(r.restoredBest||q.restoredBest);return r;}
 function create(local,native){
   const mem=Object.create(null);let dirty=false,last='',nativeOK=false;
   let disk={};try{if(native)disk=parse(native.read(),{})||{};}catch(_){}
   for(const k of KEYS){let browser=null;try{browser=local.getItem(k);}catch(_){};mem[k]=typeof disk[k]==='string'?disk[k]:browser;}
   // Never let an older checkpoint or an Undo erase an existing record.
   let browserProfile=null;try{browserProfile=local.getItem('bloom.profile');}catch(_){}
   mem['bloom.profile']=JSON.stringify(mergeProfiles(parse(mem['bloom.profile'],{}),parse(browserProfile,{})));
   return {
     get:k=>Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null,
     set(k,v){if(!KEYS.includes(k))return;if(k==='bloom.profile')v=JSON.stringify(mergeProfiles(parse(mem[k],{}),parse(v,{})));if(mem[k]!==v){mem[k]=v;dirty=true;}try{local.setItem(k,v);}catch(_){}},
     del(k){if(!KEYS.includes(k))return;mem[k]=null;dirty=true;try{local.removeItem(k);}catch(_){}},
     flush(){const s=JSON.stringify(mem);if(s===last&&(!native||nativeOK))return true;let ok=false;if(native){try{ok=!!native.write(s);nativeOK=ok;}catch(_){nativeOK=false;}}else{try{for(const k of KEYS){if(mem[k]===null)local.removeItem(k);else local.setItem(k,mem[k]);}ok=true;}catch(_){}}if(ok){last=s;dirty=false;}return ok;},
     durable:()=>!!native&&nativeOK,
     snapshot:()=>JSON.parse(JSON.stringify(mem))
   };
 }
 function record(p,s){p=normalizeProfile(p);if(s&&MODES.includes(s.mode))p.bests[s.mode]=Math.max(p.bests[s.mode],integer(s.score));return p;}
 return {create,parse,normalizeProfile,mergeProfiles,record,MODES,integer};
});
