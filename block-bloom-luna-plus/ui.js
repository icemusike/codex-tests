
/* Block Bloom • Rendering, touch input, audio and local-only persistence. */
(function(){
'use strict';
const E=window.BloomEngine,$=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d',{alpha:false});
const STR={
 en:{homeTag:'YOUR HAPPY LITTLE PUZZLE',relax:'Big smiles. No rush.',letsPlay:'Let’s play',continue:'Continue your game',classic:'Classic',cozy:'Cozy',adventure:'Adventure',chaseScore:'Beat your best',littleWorlds:'24 little worlds',yourGarden:'Your trophy garden',private:'OFFLINE • NO ADS • JUST PLAY',hint:'Hint',undo:'Undo',bloom:'Bloom',score:'SCORE',best:'BEST',noRush:'Take your time. Make something lovely.',drag:'Drag a shape. Fill a row or column.',selected:'Tap the board to place your shape.',pick:'Pick a shape below',combo:'COMBO',line:'LINE',lines:'LINES',moves:'MOVES',level:'LEVEL',bloomReady:'Your Bloom is ready!',bloomTip:'Tap the board to bloom a 3 × 3 space.',great:'LOVELY!',double:'DOUBLE BLOOM!',triple:'TRIPLE BLOOM!',perfect:'ALL CLEAR!',comboPop:'LOOK AT YOU!',rescued:'Pip made a little room for you.',badPlace:'A little more room is needed there.',settings:'Make it yours',settingsDesc:'A little space that feels just right.',sound:'Sound effects',soundDesc:'Soft pops and happy little chords',music:'Gentle music',musicDesc:'A quiet, original melody',motion:'Reduced motion',motionDesc:'Fewer sparkles. No bouncing or shake.',language:'LANGUAGE',theme:'YOUR LITTLE WORLD',sky:'Starlight',candy:'Candy',forest:'Meadow',done:'All done',paused:'A little breather',pausedDesc:'Your puzzle is safe. There’s no hurry.',resume:'Keep playing',shuffle:'New shapes',shuffleDesc:'Deal a fresh, playable set',restart:'Start a fresh game',home:'Back to the garden',help:'How to play',privacy:'Privacy & about',howTitle:'Little shapes. Big smiles.',how1:'Find their happy place',how1b:'Drag a shape onto empty squares. Or tap a shape, then tap the board.',how2:'Make a full line',how2b:'Fill any row or column to watch it bloom. Colors do not need to match.',how3:'Keep the blooms coming',how3b:'Clear again within the next 2 moves for a bigger combo. Cozy gives you 3.',how4:'A little extra magic',how4b:'Every 6 lines charge a Bloom. Tap it, then clear any 3 × 3 area.',begin:'Let’s do this!',close:'Close',garden:'Your trophy garden',gardenDesc:'Little moments worth celebrating. All saved on this device.',cozyBest:'Cozy best',classicBest:'Classic best',firstBloom:'First bloom',firstBloomDesc:'Clear your first line',doubleBloom:'Double delight',doubleBloomDesc:'Clear 2 lines together',comboHero:'Combo star',comboHeroDesc:'Reach a 5× combo',thousand:'A thousand smiles',thousandDesc:'Score 1,000 in one game',allClear:'Fresh start',allClearDesc:'Clear the entire board',explorer:'Little explorer',explorerDesc:'Finish 8 adventure levels',blossom:'Bloom keeper',blossomDesc:'Use your first Bloom',champion:'Star collector',championDesc:'Earn 36 adventure stars',path:'The happy little trail',pathDesc:'24 puzzles, one lovely adventure. No clock.',world1:'01 • Starlight meadow',world2:'02 • Candy clouds',world3:'03 • Moonflower valley',stuckTitle:'What a lovely run!',stuckDesc:'These shapes need more space. Try a new set, undo, or enjoy a fresh start.',lostTitle:'So close, little star!',lostDesc:'You used all your moves. Your next adventure is just one try away.',wonTitle:'You made it bloom!',wonDesc:'One more happy little world in your garden.',playAgain:'Play again',nextLevel:'Next little world',allLevels:'Adventure complete!',scoreLabel:'YOUR SCORE',newBest:'A NEW PERSONAL BEST',bestCombo:'Best combo',linesCleared:'Lines cleared',tryAgain:'Try this level again',outOfMoves:'No moves left',noUndo:'No move to undo yet.',hintText:'Try the glowing spaces.',notCharged:'Clear {n} more lines to charge your Bloom.',emptyBlast:'Pick a spot with blocks to bloom.',shuffleDone:'Three fresh possibilities!',freshTitle:'A fresh start?',freshDesc:'This will replace the saved puzzle. Your best scores and adventure stars stay safe.',yesFresh:'Start fresh',cancel:'Keep my puzzle',record:'A new best. That’s you!',cozyMode:'COZY MODE',classicMode:'CLASSIC MODE',adventureMode:'ADVENTURE',saveNote:'Saved automatically, after every move.',aboutTitle:'Just you and the puzzle',about:'Block Bloom Luna+ 2.0 is an original, offline block puzzle. There are no ads, purchases, accounts, analytics, trackers, chat, or links to outside content. Progress and preferences stay on this device. Uninstalling or clearing app data removes them. A grown-up can manage installation and screen time in the device’s parental controls.',about2:'Design, artwork, game rules implementation, and synthesized audio are original. Not affiliated with Block Blast or Hungry Studio.',exitInfo:'Use your device’s Home button to leave. Your puzzle is saved.',starsEarned:'adventure stars',keyboard:'Keyboard: 1–3 select · arrows aim · Enter places · Esc pauses.',reminder:'A good moment to stretch and rest your eyes.',session:'A little stretch?',sessionDesc:'You’ve been playing for a while. Your garden will be here after a break.',breakDone:'Thanks, Pip!'},
 ro:{homeTag:'Micul tău puzzle vesel'.toUpperCase(),relax:'Zâmbete mari. Fără grabă.',letsPlay:'Hai la joacă',continue:'Continuă jocul',classic:'Clasic',cozy:'Relaxat',adventure:'Aventură',chaseScore:'Bate-ți recordul',littleWorlds:'24 de lumi mici',yourGarden:'Grădina ta de trofee',private:'FĂRĂ INTERNET • FĂRĂ RECLAME',hint:'Indiciu',undo:'Înapoi',bloom:'Floare',score:'SCOR',best:'RECORD',noRush:'Fără grabă. Fiecare piesă își are locul.',drag:'Mută o piesă. Umple un rând sau o coloană.',selected:'Atinge tabla pentru a pune piesa.',pick:'Alege o piesă de mai jos',combo:'COMBO',line:'LINIE',lines:'LINII',moves:'MUTĂRI',level:'NIVEL',bloomReady:'Floarea ta este gata!',bloomTip:'Atinge tabla: eliberezi o zonă de 3 × 3.',great:'MINUNAT!',double:'DOUĂ FLORI!',triple:'TREI FLORI!',perfect:'TABLĂ CURATĂ!',comboPop:'BRAVO ȚIE!',rescued:'Pip ți-a făcut puțin loc.',badPlace:'Piesa are nevoie de puțin mai mult loc.',settings:'Pe placul tău',settingsDesc:'Un colțișor exact așa cum îți place.',sound:'Efecte sonore',soundDesc:'Pocnituri moi și acorduri vesele',music:'Muzică liniștită',musicDesc:'O melodie originală, delicată',motion:'Mișcare redusă',motionDesc:'Mai puține particule, fără tremur.',language:'LIMBA',theme:'LUMEA TA',sky:'Steluțe',candy:'Dulciuri',forest:'Poieniță',done:'Gata',paused:'O mică pauză',pausedDesc:'Puzzle-ul tău este în siguranță. Nu ne grăbim.',resume:'Continuă joaca',shuffle:'Piese noi',shuffleDesc:'Trei piese noi, care au loc',restart:'Un joc nou',home:'Înapoi în grădină',help:'Cum se joacă',privacy:'Despre joc și date',howTitle:'Piese mici. Zâmbete mari.',how1:'Găsește locul potrivit',how1b:'Trage piesa pe pătrățele libere. Sau atinge piesa, apoi tabla.',how2:'Completează o linie',how2b:'Umple un rând sau o coloană. Culorile nu trebuie să fie la fel.',how3:'Adună combinații',how3b:'Completează încă o linie în următoarele 2 mutări. În modul Relaxat ai 3.',how4:'Un strop de magie',how4b:'La fiecare 6 linii primești o Floare. Atinge-o, apoi eliberează o zonă de 3 × 3.',begin:'Să începem!',close:'Închide',garden:'Grădina ta de trofee',gardenDesc:'Mici reușite care merită sărbătorite. Salvate pe acest dispozitiv.',cozyBest:'Record relaxat',classicBest:'Record clasic',firstBloom:'Prima floare',firstBloomDesc:'Completează prima linie',doubleBloom:'Bucurie dublă',doubleBloomDesc:'Completează 2 linii deodată',comboHero:'Steaua combinațiilor',comboHeroDesc:'Obține un combo de 5×',thousand:'O mie de zâmbete',thousandDesc:'Obține 1.000 de puncte',allClear:'Un nou început',allClearDesc:'Golește toată tabla',explorer:'Micul explorator',explorerDesc:'Termină 8 niveluri',blossom:'Grădinar priceput',blossomDesc:'Folosește prima Floare',champion:'Colecționar de stele',championDesc:'Adună 36 de stele',path:'Potecuța veselă',pathDesc:'24 de puzzle-uri, o aventură frumoasă. Fără cronometru.',world1:'01 • Poiana steluțelor',world2:'02 • Norii de bomboane',world3:'03 • Valea florilor de lună',stuckTitle:'Ce joc frumos!',stuckDesc:'Aceste piese au nevoie de mai mult loc. Încearcă piese noi, mergi înapoi sau începe alt joc.',lostTitle:'Ai fost foarte aproape!',lostDesc:'Ai folosit toate mutările. O nouă încercare te așteaptă.',wonTitle:'Ai făcut lumea să înflorească!',wonDesc:'Încă o mică lume veselă în grădina ta.',playAgain:'Joacă din nou',nextLevel:'Următoarea lume',allLevels:'Aventură terminată!',scoreLabel:'SCORUL TĂU',newBest:'UN NOU RECORD PERSONAL',bestCombo:'Cel mai bun combo',linesCleared:'Linii completate',tryAgain:'Încearcă din nou',outOfMoves:'Nu mai sunt mutări',noUndo:'Nu ai încă o mutare de anulat.',hintText:'Încearcă pătrățelele luminoase.',notCharged:'Mai completează {n} linii pentru Floare.',emptyBlast:'Alege un loc cu piese.',shuffleDone:'Trei posibilități noi!',freshTitle:'Un nou început?',freshDesc:'Puzzle-ul salvat va fi înlocuit. Recordurile și stelele rămân.',yesFresh:'Joc nou',cancel:'Păstrează jocul',record:'Un nou record. Bravo ție!',cozyMode:'MOD RELAXAT',classicMode:'MOD CLASIC',adventureMode:'AVENTURĂ',saveNote:'Jocul se salvează după fiecare mutare.',aboutTitle:'Doar tu și puzzle-ul',about:'Block Bloom Luna+ 2.0 este un joc original, care funcționează fără internet. Nu are reclame, cumpărături, conturi, monitorizare, analiză de utilizare, chat sau linkuri externe. Progresul și preferințele rămân pe dispozitiv. Dezinstalarea sau ștergerea datelor le elimină. Un adult poate gestiona instalarea și timpul de utilizare prin controlul parental al dispozitivului.',about2:'Designul, grafica, implementarea regulilor și muzica sintetizată sunt originale. Jocul nu este afiliat cu Block Blast sau Hungry Studio.',exitInfo:'Folosește butonul Acasă al dispozitivului. Puzzle-ul tău este salvat.',starsEarned:'stele din aventură',keyboard:'Tastatură: 1–3 aleg · săgețile mișcă · Enter pune · Esc pauză.',reminder:'Un moment bun să te întinzi și să îți odihnești ochii.',session:'O mică întindere?',sessionDesc:'Te joci de ceva timp. Grădina te așteaptă și după o pauză.',breakDone:'Mulțumesc, Pip!'}
};
Object.assign(STR.en,{"prism":"Prism","prismMode":"PRISM MODE","prismSub":"40 moves · rotate","prismBest":"Prism best","adventureBest":"Adventure best","prismTitle":"Prism challenge","prismDesc":"40 moves. All 48 shapes. Rotate any piece for free. Every 5 cleared lines raises your score multiplier, up to 5×. No clock!","prismFinished":"Prism complete!","prismFinishedDesc":"Forty moves, your own masterpiece. Beat this score next time.","rotate":"Rotate","rotatePick":"Select a shape below, then rotate it.","palette":"Block colors","pastel":"Pastel","neon":"Neon","ocean":"Ocean","sunset":"Sunset","berry":"Berry","personalBest":"Best","progress":"Scores & backup","progressDesc":"Records are saved after every move in app-private storage. A lower run or Undo never replaces a higher record.","restoreBest":"Restore a previous best","restoreHint":"Enter a score you reached in the earlier app. This is a manual recovery, not an imported save.","restoreScore":"Save previous best","restored":"Previous best saved on this device.","invalidScore":"Enter a whole score between 0 and 1,000,000,000.","exportTitle":"Progress backup","exportDesc":"Copy this code somewhere safe. It contains your scores, stars, settings and current puzzle.","exportCode":"Show backup code","importCode":"Restore backup code","importDesc":"Paste a Block Bloom backup code. Higher records are always kept. This replaces your current puzzle.","importDo":"Restore progress","importOK":"Progress restored.","importBad":"That backup code is not valid.","saveFailed":"Saving failed. Check free storage, then reopen Settings.","startLevel":"Start this level","mission":"Your mission","missionCombo":"Reach a {n}× combo","missionGems":"Clear {n} marked-color blocks","missionLines":"Clear {n} lines","missionMoves":"Within {n} moves","shapeCount":"{n} shape designs","gemNames":"Lilac,Blue,Pink,Gold,Mint,Peach","goalLabel":"Goals","playful":"A bigger puzzle toy box","newLabel":"NEW","shapeGallery":"Explore all 48 shapes","galleryDesc":"Classic introduces the new shapes after 5,000 points. Adventure unlocks them gradually. Prism uses all shapes from the start.","pathDesc":"24 distinct missions. More lines, trickier shapes and tighter move budgets at every level.","littleWorlds":"24 rising challenges","saveNote":"Records saved after every move.","allLevels":"All 24 missions complete!"});
Object.assign(STR.ro,{"prism":"Prismă","prismMode":"MOD PRISMĂ","prismSub":"40 mutări · rotire","prismBest":"Record prismă","adventureBest":"Record aventură","prismTitle":"Provocarea Prismă","prismDesc":"40 de mutări. Toate cele 48 de forme. Rotește gratuit orice piesă. La fiecare 5 linii, multiplicatorul de puncte crește până la 5×. Fără cronometru!","prismFinished":"Prismă completă!","prismFinishedDesc":"Patruzeci de mutări, o creație a ta. Întrece acest scor data viitoare.","rotate":"Rotește","rotatePick":"Alege o piesă de jos, apoi rotește-o.","palette":"Culorile pieselor","pastel":"Pastel","neon":"Neon","ocean":"Ocean","sunset":"Apus","berry":"Fructe","personalBest":"Record","progress":"Recorduri și copie","progressDesc":"Recordurile se salvează după fiecare mutare în memoria privată a aplicației. Un joc mai slab sau Anulează nu scade recordul.","restoreBest":"Recuperează un record vechi","restoreHint":"Introdu scorul obținut în aplicația anterioară. Aceasta este o recuperare manuală, nu un import automat.","restoreScore":"Salvează recordul","restored":"Recordul anterior a fost salvat.","invalidScore":"Introdu un scor întreg între 0 și 1.000.000.000.","exportTitle":"Copie a progresului","exportDesc":"Copiază acest cod într-un loc sigur. Include recordurile, stelele, preferințele și puzzle-ul curent.","exportCode":"Arată codul de salvare","importCode":"Recuperează din cod","importDesc":"Lipește un cod Block Bloom. Recordurile mai mari rămân. Puzzle-ul curent va fi înlocuit.","importDo":"Recuperează progresul","importOK":"Progres recuperat.","importBad":"Codul de salvare nu este valid.","saveFailed":"Salvarea a eșuat. Verifică spațiul liber, apoi redeschide Setări.","startLevel":"Începe nivelul","mission":"Misiunea ta","missionCombo":"Obține un combo de {n}×","missionGems":"Elimină {n} piese de culoarea indicată","missionLines":"Completează {n} linii","missionMoves":"În cel mult {n} mutări","shapeCount":"{n} modele de forme","gemNames":"Mov,Albastru,Roz,Auriu,Mentă,Piersică","goalLabel":"Obiective","playful":"Mai multe forme, mai multă joacă","newLabel":"NOU","shapeGallery":"Descoperă cele 48 de forme","galleryDesc":"Clasic adaugă forme noi după 5.000 de puncte. Aventura le introduce treptat. Prismă folosește toate formele de la început.","pathDesc":"24 de misiuni diferite. Mai multe linii, forme mai dificile și mai puține mutări per obiectiv.","littleWorlds":"24 de provocări","saveNote":"Recorduri salvate după fiecare mutare.","allLevels":"Toate cele 24 de misiuni sunt gata!"});
let localAdapter;try{localAdapter=window.localStorage;}catch(_){localAdapter={getItem(){return null;},setItem(){throw Error('Storage unavailable');},removeItem(){}};}
const P=window.BloomPersistence;
const store=P.create(localAdapter,window.BloomStorage||null);
function getJSON(key,fallback){try{return JSON.parse(store.get(key))||fallback;}catch(_){return fallback;}}
let settings=Object.assign({lang:'en',sound:true,music:false,reduced:window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,theme:'sky',palette:'pastel'},getJSON('bloom.settings',{}));
if(!STR[settings.lang])settings.lang='en';if(!['sky','candy','forest'].includes(settings.theme))settings.theme='sky';
let profile=P.normalizeProfile(getJSON('bloom.profile',{}));
let state=E.restore(store.get('bloom.game')),scene='home',selected=-1,drag=null,hover=null,armed=false,hintMove=null;
let particles=[],rings=[],floaters=[],pops=[],clearVisual=null,shake=0,celebration=null,busyUntil=0,recordNotified=false;
let now=0,lastTime=0,displayScore=0,toastTimer=0,modalReturn=null,sessionSeconds=0,breakShown=false;
let L={},W=innerWidth,H=innerHeight,DPR=1,scale=1,offsetX=0,offsetY=0,screenH=850,lastPointer=null;
let overlayOpen=false, modalName='',renderTicks=0;
const t=(key,params)=>{let text=STR[settings.lang][key]||STR.en[key]||key;if(params)for(const k in params)text=text.replace('{'+k+'}',params[k]);return text;};
const pastel={
 1:['#b5adff','#9781f3','#6546b8','#ded4ff'],2:['#a5e9ff','#58baf0','#3476b9','#e7faff'],
 3:['#ffbdda','#f18cb7','#b65287','#fff0f7'],4:['#ffe9a5','#efbd62','#b88237','#fff9d8'],
 5:['#bcf1d0','#71d4b1','#358e7d','#eaffee'],6:['#ffc2a0','#f18b72','#b45652','#ffebdc']
};
function shade(hex,f){return '#'+[1,3,5].map(i=>Math.max(0,Math.min(255,Math.round(parseInt(hex.slice(i,i+2),16)*f))).toString(16).padStart(2,'0')).join('');}
const palettes={pastel};
palettes.neon=Object.fromEntries(["#ad88ff", "#57daff", "#ff70c9", "#ffee70", "#4df0b6", "#ff9666"].map((h,i)=>[i+1,[shade(h,1.17),h,shade(h,.63),shade(h,1.4)]]));
palettes.ocean=Object.fromEntries(["#a594ee", "#59cfff", "#88e9dd", "#ffe39c", "#62c8ae", "#eeacaf"].map((h,i)=>[i+1,[shade(h,1.17),h,shade(h,.63),shade(h,1.4)]]));
palettes.sunset=Object.fromEntries(["#bd97ff", "#92caff", "#ff9abe", "#ffda7b", "#b7d997", "#ff9968"].map((h,i)=>[i+1,[shade(h,1.17),h,shade(h,.63),shade(h,1.4)]]));
palettes.berry=Object.fromEntries(["#c9a5ff", "#a5c3ef", "#ef81bc", "#edcdb7", "#a7d4bc", "#de8ba4"].map((h,i)=>[i+1,[shade(h,1.17),h,shade(h,.63),shade(h,1.4)]]));
if(!palettes[settings.palette])settings.palette='pastel';
let palette=palettes[settings.palette];
const worlds={sky:{top:'#253251',bottom:'#101c34',orb:'#5666a3',hills:'#304669',accent:'#b7efcf'},candy:{top:'#442c58',bottom:'#211a36',orb:'#a569a5',hills:'#5c4569',accent:'#efb5dc'},forest:{top:'#1e454d',bottom:'#102b32',orb:'#599b85',hills:'#2a585a',accent:'#b4e8ba'}};
const Audio={ctx:null,musicAt:0,step:0,
 unlock(){try{if(!this.ctx)this.ctx=new(window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});}catch(_){}},
 tone(freq,delay=.0,duration=.12,volume=.035,type='sine'){
  if(!this.ctx||this.ctx.state!=='running')return;
  try{let o=this.ctx.createOscillator(),g=this.ctx.createGain(),at=this.ctx.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,at);g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(volume,at+.009);g.gain.exponentialRampToValueAtTime(.0001,at+duration);o.connect(g);g.connect(this.ctx.destination);o.start(at);o.stop(at+duration+.02);}catch(_){}
 },
 play(kind,combo=1){if(!settings.sound)return;this.unlock();
  if(kind==='pick'){this.tone(440,0,.08,.022);this.tone(660,.025,.08,.012);}
  if(kind==='place'){this.tone(250,0,.11,.035);this.tone(510,.035,.08,.025);}
  if(kind==='invalid'){this.tone(180,0,.1,.02);}
  if(kind==='clear'){const base=392*Math.pow(1.05946,Math.min(12,(combo-1)*2));[1,1.25,1.5,2].forEach((n,i)=>this.tone(base*n,i*.065,.32,.026));}
  if(kind==='blast'){[196,294,392,588,784,1176].forEach((n,i)=>this.tone(n,i*.048,.5,.028));}
  if(kind==='win'){[392,494,587,784,660,784,988].forEach((n,i)=>this.tone(n,i*.12,.38,.027));}
  if(kind==='tap')this.tone(600,0,.075,.012);
 },
 update(){if(!settings.music||!this.ctx||this.ctx.state!=='running'||overlayOpen)return;let c=this.ctx.currentTime;if(c>this.musicAt){let notes=[261.63,329.63,392,523.25,440,392,329.63,293.66,261.63,392,440,523.25,659.25,523.25,392,329.63];this.tone(notes[this.step++%notes.length],0,1.9,.009);if(this.step%4===0)this.tone(130.81,0,2.8,.008);this.musicAt=c+.68;}},
 suspend(){if(this.ctx&&this.ctx.state==='running')this.ctx.suspend().catch(()=>{});}
};
let saveWarningShown=false;
function save(){
 profile=P.record(profile,state);
 if(state)store.set('bloom.game',E.serialize(state));
 store.set('bloom.profile',JSON.stringify(profile));store.set('bloom.settings',JSON.stringify(settings));
 const ok=store.flush();
 if(!ok&&!saveWarningShown){saveWarningShown=true;toast(t('saveFailed'));}
 if($('home-best'))$('home-best').textContent='♛ '+t('personalBest')+' '+Math.max(...Object.values(profile.bests)).toLocaleString(settings.lang);
 return ok;
}
function localize(){document.documentElement.lang=settings.lang;document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));$('pause').setAttribute('aria-label',t('paused'));$('hint').setAttribute('aria-label',t('hint'));$('undo').setAttribute('aria-label',t('undo'));$('blast').setAttribute('aria-label',t('bloom'));}
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2700);}
function roundRect(c,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function fillRound(c,x,y,w,h,r,fill,stroke){roundRect(c,x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}}
function text(txt,x,y,size=14,color='#fff9ee',align='left',weight=700){ctx.font=weight+' '+size+'px "Trebuchet MS",sans-serif';ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(txt,x,y);}
function starPath(c,x,y,r,inner=r*.48,n=5,angle=-Math.PI/2){c.beginPath();for(let i=0;i<n*2;i++){let a=angle+i*Math.PI/n,rr=i%2?inner:r;i?c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):c.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();}
function sparkle(c,x,y,r,color='#fff2c8'){c.fillStyle=color;c.beginPath();c.moveTo(x,y-r);c.quadraticCurveTo(x+r*.18,y-r*.12,x+r,y);c.quadraticCurveTo(x+r*.13,y+r*.12,x,y+r);c.quadraticCurveTo(x-r*.14,y+r*.14,x-r,y);c.quadraticCurveTo(x-r*.1,y-r*.15,x,y-r);c.fill();}
const gemCache=new Map();
function gemSprite(color,size){const key=color+':'+Math.round(size*10);if(gemCache.has(key))return gemCache.get(key);const d=2,s=Math.ceil(size),o=document.createElement('canvas');o.width=(s+10)*d;o.height=(s+14)*d;const c=o.getContext('2d');c.scale(d,d);const p=palette[color]||palette[1],a=2,w=s-4;
 c.shadowColor=p[2]+'66';c.shadowBlur=5;c.shadowOffsetY=4;
 fillRound(c,5+a,4+a,w,w,Math.max(6,size*.16),p[2]);c.shadowBlur=0;c.shadowOffsetY=0;
 let g=c.createLinearGradient(0,4,0,size);g.addColorStop(0,p[0]);g.addColorStop(.32,p[1]);g.addColorStop(1,p[2]);
 fillRound(c,5+a,3+a,w,w-3,Math.max(6,size*.16),g);
 c.lineWidth=1.2;c.strokeStyle=p[3]+'80';roundRect(c,5+a+.7,3+a+.7,w-1.4,w-4.4,Math.max(5,size*.15));c.stroke();
 let g2=c.createLinearGradient(0,5,0,size);g2.addColorStop(0,p[3]+'aa');g2.addColorStop(.35,p[3]+'13');g2.addColorStop(1,p[3]+'00');
 fillRound(c,5+a+3,3+a+2,w-6,w*.52,Math.max(4,size*.1),g2);
 c.fillStyle=p[3]+'74';c.beginPath();c.ellipse(5+a+w*.22,3+a+w*.17,w*.10,w*.043,-.45,0,Math.PI*2);c.fill();
 const cx=5+s/2,cy=3+s/2,rr=size*.09;c.globalAlpha=.48;c.fillStyle=p[3];
 if(color===1||color===4){starPath(c,cx,cy,rr*1.25,rr*.56);c.fill();}
 else if(color===2){c.save();c.translate(cx,cy);c.rotate(Math.PI/4);fillRound(c,-rr,-rr,rr*2,rr*2,1.3,p[3]);c.restore();}
 else if(color===3){c.beginPath();c.moveTo(cx,cy+rr);c.bezierCurveTo(cx-rr*2,cy,cx-rr,cy-rr*1.8,cx,cy-rr*.5);c.bezierCurveTo(cx+rr,cy-rr*1.8,cx+rr*2,cy,cx,cy+rr);c.fill();}
 else if(color===5){c.beginPath();c.ellipse(cx,cy,rr*.7,rr*1.4,.7,0,Math.PI*2);c.fill();}
 else {c.beginPath();c.arc(cx,cy,rr,0,Math.PI*2);c.fill();}
 c.globalAlpha=1;gemCache.set(key,o);if(gemCache.size>100){const first=gemCache.keys().next().value;gemCache.delete(first);}return o;
}
function gem(x,y,size,color,alpha=1,pop=1){ctx.save();ctx.globalAlpha*=alpha;if(pop!==1){ctx.translate(x+size/2,y+size/2);ctx.scale(pop,pop);ctx.translate(-x-size/2,-y-size/2);}ctx.drawImage(gemSprite(color,size),x-5,y-3,size+10,size+14);ctx.restore();}
function mascot(x,y,size,happy=false){ctx.save();ctx.translate(x,y);const bounce=settings.reduced?0:Math.sin(now*1.9)*2.5;ctx.translate(0,bounce);ctx.scale(size,size);
 ctx.fillStyle='#08172833';ctx.beginPath();ctx.ellipse(0,46,43,8,0,0,Math.PI*2);ctx.fill();
 // Soft leaf antennae.
 ctx.save();ctx.translate(6,-45);ctx.rotate(Math.sin(now*1.3)*.07);let leaf=ctx.createLinearGradient(-10,-24,15,3);leaf.addColorStop(0,'#dcffdc');leaf.addColorStop(1,'#66bda2');ctx.fillStyle=leaf;ctx.beginPath();ctx.moveTo(0,7);ctx.bezierCurveTo(-23,-4,-21,-22,-14,-27);ctx.bezierCurveTo(2,-23,11,-7,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(1,3);ctx.bezierCurveTo(20,-1,31,-18,25,-24);ctx.bezierCurveTo(8,-24,-4,-5,1,3);ctx.fill();ctx.restore();
 // Little arms, body and feet are independently rounded, not a traced asset.
 const g=ctx.createLinearGradient(0,-40,0,46);g.addColorStop(0,'#d4ffe1');g.addColorStop(.55,'#a2e9c2');g.addColorStop(1,'#62bba4');
 ctx.save();ctx.translate(-40,7);ctx.rotate(-.3-(happy?.35:0));fillRound(ctx,-12,-5,22,32,12,g);ctx.restore();ctx.save();ctx.translate(39,7);ctx.rotate(.3+(happy?.6:0));fillRound(ctx,-10,-6,22,32,12,g);ctx.restore();
 fillRound(ctx,-30,31,22,19,10,'#68b8a4');fillRound(ctx,10,31,22,19,10,'#68b8a4');ctx.shadowColor='#071c323d';ctx.shadowBlur=15;ctx.shadowOffsetY=8;fillRound(ctx,-44,-42,88,87,32,g);ctx.shadowBlur=0;ctx.shadowOffsetY=0;
 ctx.strokeStyle='#ecffe594';ctx.lineWidth=1.8;roundRect(ctx,-42,-40,84,82,30);ctx.stroke();
 ctx.fillStyle='#fff9df';ctx.globalAlpha=.26;ctx.beginPath();ctx.ellipse(-19,-25,17,8,-.5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
 const blink=!happy && Math.sin(now*.78)>.998;
 for(const ex of [-16,17]){ctx.fillStyle='#273e47';if(blink){fillRound(ctx,ex-5,-2,10,2,1,'#273e47');}else{ctx.beginPath();ctx.ellipse(ex,-1,5.4,happy?6:7,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='white';ctx.beginPath();ctx.arc(ex+1,-3.2,1.7,0,Math.PI*2);ctx.fill();}}
 ctx.fillStyle='#f4aebb8c';ctx.beginPath();ctx.ellipse(-28,12,8,4.3,0,0,Math.PI*2);ctx.ellipse(28,12,8,4.3,0,0,Math.PI*2);ctx.fill();
 ctx.strokeStyle='#31564c';ctx.lineWidth=2.8;ctx.lineCap='round';ctx.beginPath();ctx.arc(1,9,9,.2,Math.PI-.2);ctx.stroke();
 if(happy){ctx.fillStyle='#30544a';ctx.beginPath();ctx.arc(1,12,9,0,Math.PI);ctx.fill();ctx.fillStyle='#e596a4';ctx.beginPath();ctx.ellipse(1,18,4,2,0,0,Math.PI*2);ctx.fill();}
 ctx.restore();}
function resize(){W=innerWidth;H=innerHeight;const landscape=W/H>1.2;screenH=landscape?560:Math.max(720,Math.min(980,H/W*420));const designW=landscape?900:420;scale=Math.min(W/designW,H/screenH);offsetX=(W-designW*scale)/2;offsetY=(H-screenH*scale)/2;
 DPR=Math.min(devicePixelRatio||1,2,Math.sqrt(3500000/(W*H)));canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);canvas.style.width=W+'px';canvas.style.height=H+'px';
 if(landscape){L={landscape:true,w:900,h:560,bx:42,by:136,bs:356,scoreX:540,scoreY:120,missionX:467,missionY:182,missionW:382,trayX:471,trayY:261,trayW:365,trayH:110,toolsX:481,toolsY:433,pauseX:817,pauseY:30};}
 else{const bs=Math.min(364,screenH-415);const by=212+(screenH-800)*.035;L={landscape:false,w:420,h:screenH,bx:(420-bs)/2,by,bs,scoreX:30,scoreY:112,missionX:28,missionY:166,missionW:364,trayX:26,trayY:by+bs+28,trayW:368,trayH:98,toolsX:32,toolsY:Math.min(screenH-82,by+bs+155),pauseX:348,pauseY:26};}
 L.cell=L.bs/8;
 // Home keeps its portrait composition, also on landscape tablets.
 const homeScale=scene==='home'&&landscape?Math.min(W/420,H/800):scale;
 if(scene==='home'&&landscape){$('stage').style.transform='translate('+(W-420*homeScale)/2+'px,0px) scale('+homeScale+')';$('stage').style.height='800px';}
 else{$('stage').style.transform='translate('+offsetX+'px,'+offsetY+'px) scale('+scale+')';$('stage').style.height=screenH+'px';}
 $('stage').style.width=(scene==='home'?420:designW)+'px';
 $('pause').style.left=L.pauseX+'px';$('pause').style.top=L.pauseY+'px';
 const prism=state&&state.mode==='prism';
 $('rotate').hidden=!prism;
 const ids=prism?['hint','undo','blast','rotate']:['hint','undo','blast'];
 ids.forEach((id,i)=>{$(id).style.width=(prism?84:106)+'px';$(id).style.left=((prism?(L.landscape?477:30):L.toolsX)+i*(prism?92:124))+'px';$(id).style.top=L.toolsY+'px';});
 // Title and controls stay clear of the character on small screens.
 const homeH=scene==='home'&&landscape?800:screenH;
 $('home').style.height=homeH+'px';$('home').classList.toggle('compact',homeH<780);cancelDrag();
}
function background(){const w=worlds[settings.theme];let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,w.top);g.addColorStop(1,w.bottom);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 const a=ctx.createRadialGradient(W*.73,H*.27,2,W*.65,H*.32,W*.9);a.addColorStop(0,w.orb+'38');a.addColorStop(1,w.orb+'00');ctx.fillStyle=a;ctx.fillRect(0,0,W,H);
 // Quiet parallax dust; no flashing, even when effects are enabled.
 for(let i=0;i<36;i++){let x=((i*109.71+17)%997)/997*W,y=((i*71.89+37)%787)/787*H;let alpha=.12+.12*(1+Math.sin(now*.45+i))/2;ctx.fillStyle='#dce9ff';ctx.globalAlpha=alpha;ctx.beginPath();ctx.arc(x,y,i%3===0?1.5:1,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
 ctx.fillStyle=w.hills+'50';ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,H*.90);ctx.bezierCurveTo(W*.30,H*.77,W*.68,H*1.09,W,H*.88);ctx.lineTo(W,H);ctx.fill();ctx.fillStyle=w.hills+'43';ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,H*.94);ctx.bezierCurveTo(W*.35,H*1.01,W*.65,H*.86,W,H*.94);ctx.lineTo(W,H);ctx.fill();
}
function drawHome(){const landscape=L.landscape;const hh=landscape?800:screenH;const hs=landscape?Math.min(W/420,H/800):scale;ctx.save();ctx.setTransform(DPR*hs,0,0,DPR*hs,(W-420*hs)/2*DPR,landscape?0:offsetY*DPR);
 const bottomReserve=state&&state.status==='playing'?359:315;let cy=(260+(hh-bottomReserve))/2;cy=Math.min(cy,hh-bottomReserve-38);cy=Math.max(294,cy);const breathe=settings.reduced?0:Math.sin(now*.8)*4;
 // A miniature floating garden island.
 let aura=ctx.createRadialGradient(210,cy,5,210,cy,160);aura.addColorStop(0,'#91d2bc24');aura.addColorStop(.55,'#829fd915');aura.addColorStop(1,'#829fd900');ctx.fillStyle=aura;ctx.fillRect(0,cy-180,420,360);
 ctx.fillStyle='#131d3555';ctx.beginPath();ctx.ellipse(214,cy+99,98,18,0,0,Math.PI*2);ctx.fill();
 ctx.save();ctx.translate(208,cy+73);ctx.rotate(-.08);let island=ctx.createLinearGradient(0,-15,0,32);island.addColorStop(0,'#7584a9');island.addColorStop(.16,'#394e70');island.addColorStop(1,'#1b2943');fillRound(ctx,-101,-10,202,48,30,island);ctx.fillStyle='#8391b036';ctx.beginPath();ctx.ellipse(0,-4,97,19,0,0,Math.PI*2);ctx.fill();ctx.restore();
 const gs=43;ctx.save();ctx.translate(106,cy+27+breathe);ctx.rotate(-.16);gem(-30,-20,gs,1);gem(-30,-20-gs,gs,1);gem(-30+gs,-20,gs,1);ctx.restore();
 ctx.save();ctx.translate(314,cy-43-breathe);ctx.rotate(.17);gem(-26,0,40,4);gem(-26+40,0,40,4);gem(-26+40,-40,40,4);ctx.restore();
 ctx.save();ctx.translate(302,cy+54);ctx.rotate(.08);gem(-15,-8,35,3);gem(20,-8,35,3);ctx.restore();
 mascot(205,cy+2,1.42,false);
 ctx.save();ctx.translate(80,cy-78);ctx.rotate(-.23);gem(-16,-16,32,2);ctx.restore();sparkle(ctx,302,cy-108,8,'#ffdda4');sparkle(ctx,90,cy+34,6,'#e5d6ff');sparkle(ctx,335,cy+10,5,'#c9f3de');
 // Small orbit and leaves make the art feel intentional, not a tiled dashboard.
 ctx.strokeStyle='#a5b8cf23';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(210,cy+8,151,100,-.27,3.2,5.8);ctx.stroke();ctx.fillStyle='#b7edcd';ctx.beginPath();ctx.ellipse(116,cy+76,4,10,-.6,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(120,cy+80,9,4,.3,0,Math.PI*2);ctx.fill();ctx.restore();
}
function pill(x,y,w,h,label,color='#d2d9ec',bg='#a0b8e012',font=10){fillRound(ctx,x,y,w,h,h/2,bg,'#b9c6ee14');text(label,x+w/2,y+h/2,font,color,'center',800);}
function drawHud(){const s=state,w=worlds[settings.theme];
 text('block bloom',L.landscape?42:28,46,22,'#f5f2e9','left',900);text('✦',L.landscape?190:176,44,16,'#baf0ce');
 if(L.landscape){text(t(s.mode),680,49,11,'#b2c8dc','center',800);}
 const scoreY=L.scoreY;
 text(t('score'),L.scoreX,scoreY-27,9,'#aebbd8','left',900);text(Math.round(displayScore).toLocaleString(settings.lang),L.scoreX,scoreY+12,L.landscape?51:48,'#fff4dd','left',900);
 const bestX=L.landscape?710:254;
 fillRound(ctx,bestX,scoreY-39,136,68,19,'#9aacd014','#aab9dc19');text('♛',bestX+22,scoreY-6,27,'#ffda91','center',700);text(t('best'),bestX+46,scoreY-21,9,'#aebbd8','left',900);text(Math.max(profile.bests[s.mode]||0,s.score).toLocaleString(settings.lang),bestX+47,scoreY+3,21,'#ffe0a3','left',900);
 // A progress ribbon, with Pip rather than a timer or a pressure meter.
 const mx=L.missionX,my=L.missionY,mw=L.missionW;
 fillRound(ctx,mx,my-15,mw,37,14,'#aabbd40c','#b6cae616');
 if(s.mode==='adventure') {
  text(t('level')+' '+s.level,mx+13,my+1,10,'#e4e5f4','left',900);
  const px=mx+85,pw=mw-183;fillRound(ctx,px,my-4,pw,8,4,'#111c35');fillRound(ctx,px,my-4,Math.max(1,pw*Math.min(1,s.lines/s.target)),8,4,'#b6f1c6');
  text(s.lines+'/'+s.target+' '+t('lines'),px+pw/2,my+12,8,'#9fb7cd','center',700);
  text(Math.max(0,s.moveLimit-s.moves)+' '+t('moves'),mx+mw-11,my+1,9,'#f2d7aa','right',800);
 } else if(s.mode==='prism') {
  text('◆ '+(1+Math.min(4,Math.floor(s.lines/5)))+'× '+t('score'),mx+14,my+3,12,'#e4c7ff','left',900);
  text((40-s.moves)+' / 40 '+t('moves'),mx+mw-14,my+3,11,'#f5dfa9','right',900);
 } else if(s.combo>0) {
  text('✦ '+s.combo+'× '+t('combo'),mx+15,my+3,12,'#f4d99f','left',900);
  text(t(s.mode==='cozy'?'cozyMode':'classicMode'),mx+mw-15,my+3,8,'#a9b9d5','right',800);
  for(let i=0;i<(s.mode==='cozy'?3:2);i++) {ctx.fillStyle=i<s.grace?'#b8efc8':'#46536c';ctx.beginPath();ctx.arc(mx+146+i*14,my+3,3.5,0,Math.PI*2);ctx.fill();}
 } else {
  text('✿',mx+16,my+3,17,w.accent);text(t('noRush'),mx+38,my+3,10.5,'#c0cedf','left',600);
 }
}
function getPreview(){if(!state)return null;let slot=drag?drag.slot:selected;if(slot<0||!state.tray[slot])return null;let pos=hover;if(!pos&&hintMove&&hintMove.slot===slot)pos=hintMove;if(!pos)return null;return {slot,x:pos.x,y:pos.y,piece:state.tray[slot],ok:E.fits(state.board,state.tray[slot].cells,pos.x,pos.y)};}
function drawBoard(){const {bx,by,bs,cell:c}=L;
 ctx.save();if(!settings.reduced&&shake>.1)ctx.translate(Math.sin(now*67)*shake,Math.cos(now*58)*shake*.6);
 ctx.shadowColor='#050e2566';ctx.shadowBlur=25;ctx.shadowOffsetY=15;fillRound(ctx,bx-10,by-10,bs+20,bs+25,25,'#364563');ctx.shadowBlur=0;ctx.shadowOffsetY=0;
 let edge=ctx.createLinearGradient(0,by,0,by+bs);edge.addColorStop(0,'#a3b8d55c');edge.addColorStop(1,'#6273951a');fillRound(ctx,bx-9,by-11,bs+18,bs+21,24,edge);
 fillRound(ctx,bx-5,by-5,bs+10,bs+10,19,'#111e36','#080f2840');
 for(let y=0;y<8;y++)for(let x=0;x<8;x++){const i=y*8+x;fillRound(ctx,bx+x*c+1.7,by+y*c+1.7,c-3.4,c-3.4,Math.max(4,c*.13),(x+y)%2?'#23314b':'#25354f','#50607d20');if(state.board[i]) {
   const pp=pops.find(p=>p.i===i),elapsed=pp?(now-pp.start):1;
   const sc=elapsed<.28&&!settings.reduced?1+Math.sin(Math.min(1,elapsed/.28)*Math.PI)*.13:1;
   gem(bx+x*c,by+y*c,c,state.board[i],1,sc);
 }}
 // Tiny perimeter marks make the board read as a tactile toy tray.
 [0,1,2].forEach(i=>{ctx.fillStyle='#a3b9d442';ctx.beginPath();ctx.arc(bx+bs/2+(i-1)*7,by+bs+10,1.2,0,Math.PI*2);ctx.fill();});
 const preview=getPreview();
 if(preview&&preview.ok) {
   let r=E.simulate(state.board,preview.piece,preview.x,preview.y);
   r.clear.rows.forEach(y=>fillRound(ctx,bx+1,by+y*c+1,bs-2,c-2,6,'#d1f6bb2b','#ddffc07a'));
   r.clear.cols.forEach(x=>fillRound(ctx,bx+x*c+1,by+1,c-2,bs-2,6,'#d1f6bb2b','#ddffc07a'));
   for(const [dx,dy] of preview.piece.cells){let x=bx+(preview.x+dx)*c,y=by+(preview.y+dy)*c;gem(x,y,c,preview.piece.color,.42);ctx.strokeStyle='#eaffd2bb';ctx.lineWidth=1.5;roundRect(ctx,x+2,y+2,c-4,c-6,7);ctx.stroke();}
 }
 if(hintMove&&now<hintMove.until&&!preview&&state.tray[hintMove.slot]){let p=state.tray[hintMove.slot];for(const [x,y]of p.cells){const alpha=settings.reduced?.6:.4+.2*Math.sin(now*3);fillRound(ctx,bx+(hintMove.x+x)*c+3,by+(hintMove.y+y)*c+3,c-6,c-6,7,'rgba(201,244,194,'+alpha+')','#e1ffd3');}}
 if(armed&&hover){for(let y=Math.max(0,hover.y-1);y<=Math.min(7,hover.y+1);y++)for(let x=Math.max(0,hover.x-1);x<=Math.min(7,hover.x+1);x++)fillRound(ctx,bx+x*c+2,by+y*c+2,c-4,c-4,6,'#dbc3ff40','#e6ceffbb');}
 if(clearVisual){const f=(now-clearVisual.start)/.42;if(f<=1){for(const o of clearVisual.cells){const x=bx+(o.i%8)*c,y=by+Math.floor(o.i/8)*c;gem(x,y,c,o.color,1-f,settings.reduced?1:1+f*.22);}}else clearVisual=null;}
 ctx.restore();
 if(state.mode==='adventure'&&(state.comboTarget||state.gemTarget)){
   const goal=[];if(state.comboTarget)goal.push((state.bestCombo>=state.comboTarget?'✓ ':'')+t('combo')+' '+state.bestCombo+'/'+state.comboTarget);
   if(state.gemTarget)goal.push((state.gems>=state.gemTarget?'✓ ':'')+t('gemNames').split(',')[state.gemColor-1]+' '+state.gems+'/'+state.gemTarget);
   text(goal.join('   ·   '),L.landscape?660:210,L.trayY-12,10,'#efd4ff','center',800);
 }else if(!L.landscape){text(armed?t('bloomTip'):selected>=0?t('selected'):t('drag'),210,L.trayY-11,10,armed?'#e6caff':'#a8b8d0','center',600);}
}
function pieceCellSize(p){const d=E.dims(p.cells);return Math.min(30,91/d.w,78/d.h);}
function trayBounds(i){return {x:L.trayX+i*(L.trayW/3),y:L.trayY,w:L.trayW/3-5,h:L.trayH};}
function drawTray(){for(let i=0;i<3;i++) {const b=trayBounds(i),p=state.tray[i],isSelected=selected===i||(drag&&drag.slot===i);
 fillRound(ctx,b.x,b.y,b.w,b.h,21,isSelected?'#a5b5e326':'#9fbbdb09',isSelected?'#c5d7ff77':'#a8bad316');
 if(!p){text('✧',b.x+b.w/2,b.y+b.h/2,22,'#778dab44','center');continue;}
 const can=E.positions(state.board,p.cells).length>0;
 const c=pieceCellSize(p),d=E.dims(p.cells),x=b.x+(b.w-d.w*c)/2,y=b.y+(b.h-d.h*c)/2-3;
 const alpha=drag&&drag.slot===i?.18:can?1:.37;
 const float=isSelected&&!settings.reduced?Math.sin(now*3)*1.5:0;
 p.cells.forEach(([dx,dy])=>gem(x+dx*c,y+dy*c+float,c,p.color,alpha));
 if(hintMove&&hintMove.slot===i&&now<hintMove.until){sparkle(ctx,b.x+b.w-15,b.y+13,5,'#c6f4c8');}
 }
 text(t('saveNote'),L.landscape?660:210,Math.min(L.h-8,L.toolsY+83),8,'#798eaa','center',600);
}
function spawn(cells,power=1){if(settings.reduced)return;for(const o of cells){const x=L.bx+(o.i%8+.5)*L.cell,y=L.by+(Math.floor(o.i/8)+.5)*L.cell;for(let n=0;n<6;n++){if(particles.length>=340)particles.shift();const angle=Math.random()*Math.PI*2,v=(70+Math.random()*170)*power;particles.push({x,y,vx:Math.cos(angle)*v,vy:Math.sin(angle)*v-75,size:3+Math.random()*6,angle:Math.random()*6,spin:(Math.random()-.5)*9,life:.7+Math.random()*.65,max:1.35,color:o.color,type:n<2?'gem':n===2?'star':'dust',bounces:0});}}}
function confetti(){if(settings.reduced)return;for(let i=0;i<90;i++){particles.push({x:L.w/2,y:L.h*.39,vx:(Math.random()-.5)*550,vy:-100-Math.random()*450,size:3+Math.random()*6,angle:Math.random()*7,spin:(Math.random()-.5)*14,life:2+Math.random(),max:3,color:1+Math.floor(Math.random()*6),type:i%3?'gem':'star',bounces:0});}}
function ring(x,y,color='#daf5c9',max=140){rings.push({x,y,color,max,start:now});}
function announce(word,sub){celebration={word,sub,start:now};}
function drawEffects(dt){for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;if(p.life<=0){particles.splice(i,1);continue;}p.vy+=360*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.angle+=p.spin*dt;p.vx*=Math.pow(.995,dt*60);if(p.y>L.h-13&&p.vy>0){p.y=L.h-13;p.vy*=-.38;p.vx*=.72;p.bounces++;if(p.bounces>2)p.life=Math.min(p.life,.15);}ctx.save();ctx.globalAlpha=Math.min(1,p.life/.3);ctx.translate(p.x,p.y);ctx.rotate(p.angle);if(p.type==='star'){starPath(ctx,0,0,p.size,p.size*.43);ctx.fillStyle=palette[p.color][0];ctx.fill();}else if(p.type==='dust'){ctx.fillStyle=palette[p.color][3];ctx.beginPath();ctx.arc(0,0,p.size*.45,0,Math.PI*2);ctx.fill();}else{fillRound(ctx,-p.size/2,-p.size/2,p.size,p.size*.7,1.5,palette[p.color][0]);}ctx.restore();}
 for(let i=rings.length-1;i>=0;i--){let r=rings[i],a=(now-r.start)/.65;if(a>1){rings.splice(i,1);continue;}ctx.save();ctx.globalAlpha=(1-a)*.55;ctx.strokeStyle=r.color;ctx.lineWidth=2*(1-a)+.5;ctx.beginPath();ctx.arc(r.x,r.y,12+(settings.reduced?0:r.max*(1-Math.pow(1-a,3))),0,Math.PI*2);ctx.stroke();ctx.restore();}
 for(let i=floaters.length-1;i>=0;i--){let f=floaters[i],a=(now-f.start)/1.2;if(a>1){floaters.splice(i,1);continue;}ctx.save();ctx.globalAlpha=Math.min(1,(1-a)*2);text(f.text,f.x,f.y-(settings.reduced?0:a*48),f.size||22,f.color||'#fff0b1','center',900);ctx.restore();}
 if(celebration){const a=(now-celebration.start)/1.7;if(a>1)celebration=null;else{let alpha=Math.min(1,a*9,(1-a)*4);ctx.save();ctx.globalAlpha=alpha;const x=L.bx+L.bs/2,y=L.by+L.bs*.40;ctx.translate(x,y);if(!settings.reduced){const p=Math.min(1,a*5);const sc=1+Math.sin(p*Math.PI)*.13;ctx.scale(sc,sc);}fillRound(ctx,-L.bs*.44,-37,L.bs*.88,75,22,'#152744ec','#d9e6f439');text(celebration.word,0,-8,Math.min(25,L.bs/Math.max(12,celebration.word.length)*1.45),'#fff2c5','center',900);text(celebration.sub,0,18,12,'#bdf6d3','center',800);sparkle(ctx,-L.bs*.40,-31,8,'#ffe3a8');sparkle(ctx,L.bs*.40,27,6,'#e2d2ff');ctx.restore();}}
}
function drawDrag(){if(!drag||!drag.moved)return;const p=drag.piece,d=E.dims(p.cells),c=L.cell,pos=dragOrigin(lastPointer||drag.start,p,drag.touch);ctx.save();ctx.shadowColor='#070f2855';ctx.shadowBlur=15;ctx.shadowOffsetY=10;p.cells.forEach(([x,y])=>gem(pos.x+x*c,pos.y+y*c,c,p.color,.96));ctx.restore();}
function update(dt){now=performance.now()/1000;shake*=Math.pow(.001,dt);pops=pops.filter(p=>now-p.start<.35);if(hintMove&&now>hintMove.until)hintMove=null;
 if(scene==='game'&&state){displayScore+=(state.score-displayScore)*Math.min(1,dt*10);if(Math.abs(displayScore-state.score)<.1)displayScore=state.score;if(!overlayOpen&&state.status==='playing')sessionSeconds+=dt;if(sessionSeconds>1200&&!breakShown&&!overlayOpen){breakShown=true;pauseForBreak();}}
 Audio.update();
}
function frame(ms){const dt=Math.min(.035,Math.max(0,(ms-lastTime)/1000||.016));lastTime=ms;if(!document.hidden){update(dt);ctx.setTransform(DPR,0,0,DPR,0,0);background();if(scene==='home')drawHome();else if(state){ctx.save();ctx.setTransform(DPR*scale,0,0,DPR*scale,offsetX*DPR,offsetY*DPR);drawHud();drawBoard();drawTray();drawEffects(overlayOpen?dt*.6:dt);drawDrag();ctx.restore();}renderTicks++;}requestAnimationFrame(frame);}
function refresh(){localize();save();$('home').hidden=scene!=='home';$('game-controls').hidden=scene!=='game';$('continue').hidden=!(state&&['playing','stuck'].includes(state.status));if(state){$('undo-count').textContent=state.mode==='cozy'?'∞':state.undos;$('bloom-count').textContent=state.charge+'/6';$('blast').classList.toggle('ready',state.charge>=6);$('blast').classList.toggle('armed',armed);$('undo').disabled=!state.undoState||state.undos<=0;$('blast').setAttribute('aria-label',t('bloom')+' '+state.charge+'/6');}resize();}
function award(event){if(!state)return;const old=profile.bests[state.mode]||0;if(state.score>old){profile.bests[state.mode]=state.score;if(old>=1000&&!recordNotified){recordNotified=true;toast(t('record'));}}
 const a=profile.achievements;if(state.lines>0)a.first=true;if(event.clear&&event.clear.count>=2)a.double=true;if(state.bestCombo>=5)a.combo=true;if(state.score>=1000)a.thousand=true;if(state.perfects>0)a.perfect=true;if(state.blasts>0)a.blast=true;
 if(state.status==='won'&&state.mode==='adventure'){profile.levelStars[state.level]=Math.max(profile.levelStars[state.level]||0,E.stars(state));profile.unlocked=Math.max(profile.unlocked,Math.min(24,state.level+1));if(Object.keys(profile.levelStars).filter(k=>profile.levelStars[k]>0).length>=8)a.explorer=true;if(Object.values(profile.levelStars).reduce((a,b)=>a+(+b||0),0)>=36)a.collector=true;}
 save();
}
function doPlace(slot,x,y){if(overlayOpen||performance.now()<busyUntil)return false;const event=E.place(state,slot,x,y);if(!event.ok){Audio.play('invalid');toast(t('badPlace'));return false;}
 selected=-1;hover=null;hintMove=null;armed=false;busyUntil=performance.now()+220;
 pops=event.placed.map(i=>({i,start:now}));Audio.play(event.clear.count?'clear':'place',event.combo);
 if(event.clear.count){clearVisual={cells:event.removed,start:now};spawn(event.removed,event.clear.count>1?1.1:.8);ring(L.bx+(x+1)*L.cell,L.by+(y+.5)*L.cell,'#c8f6d7',L.bs*.55);shake=settings.reduced?0:Math.min(3.1,event.clear.count*1.15);
 const word=event.perfect?t('perfect'):event.clear.count>=3?t('triple'):event.clear.count===2?t('double'):event.combo>=3?t('comboPop'):t('great');announce(word,event.combo>1?event.combo+'× '+t('combo')+'   +'+event.earned:'+'+event.earned+'  ✦');
 } else floaters.push({text:'+'+event.earned,x:L.bx+(x+.5)*L.cell,y:L.by+(y+.4)*L.cell,start:now,size:19});
 if(event.rescued&&event.rescued.length){spawn(event.rescued);setTimeout(()=>toast(t('rescued')),850);}
 award(event);refreshControls();$('live').textContent=t('score')+' '+state.score+', '+state.lines+' '+t('lines');
 if(state.status!=='playing'){const id=state.id;setTimeout(()=>{if(state&&state.id===id&&scene==='game'&&state.status!=='playing')resultModal();},event.clear.count?1450:450);}
 return true;
}
function refreshControls(){if(!state)return;$('undo-count').textContent=state.mode==='cozy'?'∞':state.undos;$('bloom-count').textContent=state.charge+'/6';$('undo').disabled=!state.undoState||state.undos<=0;$('blast').classList.toggle('ready',state.charge>=6);$('blast').classList.toggle('armed',armed);}
function point(e){return{x:(e.clientX-offsetX)/scale,y:(e.clientY-offsetY)/scale};}
function onBoard(p){return p.x>=L.bx&&p.y>=L.by&&p.x<L.bx+L.bs&&p.y<L.by+L.bs;}
function cellAt(p){return{x:Math.floor((p.x-L.bx)/L.cell),y:Math.floor((p.y-L.by)/L.cell)};}
function dragOrigin(p,piece,touch){const d=E.dims(piece.cells);return{x:p.x-d.w*L.cell/2,y:p.y-(touch?d.h*L.cell+22:d.h*L.cell/2)};}
function updateDrag(p){lastPointer=p;if(!drag)return;const moved=Math.hypot(p.x-drag.start.x,p.y-drag.start.y);if(moved>5)drag.moved=true;if(drag.moved){const o=dragOrigin(p,drag.piece,drag.touch);hover={x:Math.round((o.x-L.bx)/L.cell),y:Math.round((o.y-L.by)/L.cell)};}}
function cancelDrag(){drag=null;lastPointer=null;hover=null;}
canvas.addEventListener('pointerdown',e=>{Audio.unlock();if(scene!=='game'||overlayOpen||!state||performance.now()<busyUntil)return;if(drag)return;if(state.status!=='playing'&&!(armed&&state.status==='stuck'))return;const p=point(e);lastPointer=p;
 if(onBoard(p)){
  const c=cellAt(p);if(armed){doBlast(c.x,c.y);return;}if(selected>=0){doPlace(selected,c.x,c.y);return;}
  toast(t('pick'));return;
 }
 for(let i=0;i<3;i++){const b=trayBounds(i);if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h&&state.tray[i]){selected=i;armed=false;hintMove=null;drag={slot:i,piece:E.copy(state.tray[i]),start:p,touch:e.pointerType!=='mouse',moved:false,pointerId:e.pointerId};try{canvas.setPointerCapture(e.pointerId);}catch(_){}Audio.play('pick');refreshControls();e.preventDefault();break;}}
});
canvas.addEventListener('pointermove',e=>{if(scene!=='game'||overlayOpen)return;const p=point(e);if(drag&&e.pointerId===drag.pointerId){updateDrag(p);e.preventDefault();}else if(armed||selected>=0){hover=onBoard(p)?cellAt(p):null;}});
canvas.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.pointerId)return;const current=drag;updateDrag(point(e));const h=hover;drag=null;lastPointer=null;if(current.moved){if(h&&E.fits(state.board,current.piece.cells,h.x,h.y))doPlace(current.slot,h.x,h.y);else {Audio.play('invalid');hover=null;}}try{canvas.releasePointerCapture(e.pointerId);}catch(_){}e.preventDefault();});
canvas.addEventListener('pointercancel',cancelDrag);canvas.addEventListener('lostpointercapture',()=>{if(drag)cancelDrag();});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('keydown',e=>{if(overlayOpen){if(e.key==='Escape'){e.preventDefault();if(modalName==='pause'){closeModal();}else if(modalName==='settings'){showSettingsReturn();}else{closeModal();}}return;}
 if(scene!=='game'||!state)return;
 if(['1','2','3'].includes(e.key)){const k=+e.key-1;if(state.tray[k]){selected=k;armed=false;hover={x:0,y:0};Audio.play('pick');}e.preventDefault();}
 if(e.key.startsWith('Arrow')&&(selected>=0||armed)){hover=hover||{x:0,y:0};const d=selected>=0?E.dims(state.tray[selected].cells):{w:1,h:1};hover.x=Math.min(8-d.w,Math.max(0,hover.x+(e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0)));hover.y=Math.min(8-d.h,Math.max(0,hover.y+(e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0)));e.preventDefault();}
 if(e.key==='Enter'&&hover){if(armed)doBlast(hover.x,hover.y);else if(selected>=0)doPlace(selected,hover.x,hover.y);e.preventDefault();}
 if(e.key==='Escape'){if(selected>=0||armed){selected=-1;armed=false;hover=null;refreshControls();}else showPause();e.preventDefault();}
});
function doBlast(x,y){const ev=E.blast(state,x,y);if(!ev.ok){toast(t('emptyBlast'));return;}armed=false;hover=null;clearVisual={cells:ev.removed,start:now};spawn(ev.removed,1.5);ring(L.bx+(x+.5)*L.cell,L.by+(y+.5)*L.cell,'#dfc4ff',L.bs*.85);Audio.play('blast');shake=settings.reduced?0:3;announce(t('bloom').toUpperCase()+'!', '+'+ev.earned);award(ev);refreshControls();busyUntil=performance.now()+300;if(state.status==='stuck')setTimeout(resultModal,700);}
function showModal(name,html){cancelDrag();overlayOpen=true;modalName=name;$('modal').innerHTML=html;$('overlay').hidden=false;$('modal').scrollTop=0;setTimeout(()=>$('modal').focus(),0);}
function closeModal(){overlayOpen=false;modalName='';$('overlay').hidden=true;Audio.unlock();refreshControls();}
function btn(action,label,cls='secondary',extra=''){return '<button class="'+cls+'" data-action="'+action+'" '+extra+'>'+label+'</button>';}
function title(symbol,heading,desc=''){return '<div class="modal-symbol">'+symbol+'</div><h2 id="modal-title">'+heading+'</h2>'+(desc?'<p>'+desc+'</p>':'');}
function start(mode,level=1){closeModal();state=E.newGame(mode,level);scene='game';displayScore=0;selected=-1;armed=false;hover=null;particles=[];rings=[];floaters=[];celebration=null;clearVisual=null;pops=[];recordNotified=false;hintMove={slot:0,x:3,y:7,until:now+14};save();refresh();Audio.unlock();if(!profile.tutorial)showHelp('start');}
function requestStart(mode,level=1){if(state&&['playing','stuck'].includes(state.status)&&state.moves>0){window.pendingStart={mode,level};showModal('confirm',title('✿',t('freshTitle'),t('freshDesc'))+btn('confirmStart',t('yesFresh'),'primary')+btn('cancelConfirm',t('cancel')));}else start(mode,level);}
function home(){closeModal();save();scene='home';selected=-1;armed=false;refresh();}
function showHelp(from){window.helpFrom=from;const entries=[['↗','how1','how1b'],['▦','how2','how2b'],['✦','how3','how3b'],['✿','how4','how4b']];showModal('help',title('✿',t('howTitle'))+entries.map(([i,a,b])=>'<div class="help-step"><span>'+i+'</span><div><b>'+t(a)+'</b><small>'+t(b)+'</small></div></div>').join('')+btn('helpDone',t(from==='start'?'begin':'done'),'primary')+'<p class="footer-note">'+t('keyboard')+'</p>');}
function showPause(){if(scene!=='game'||!state)return;save();showModal('pause',title('☁',t('paused'),t('pausedDesc'))+btn('resume',t('resume'),'primary')+btn('shuffle',t('shuffle')+' <span style="opacity:.6">· '+(state.mode==='cozy'?'∞':state.shuffles)+'</span>','secondary',state.shuffles>0&&['playing','stuck'].includes(state.status)?'':'disabled')+btn('settings',t('settings'))+btn('help',t('help'))+btn('restart',t('restart'),'text-button')+btn('home',t('home'),'text-button')+'<p class="footer-note">'+t('saveNote')+'</p>');}
function settingsModal(from){modalReturn=from||modalReturn||'home';let h=title('✧',t('settings'),t('settingsDesc'))+'<div class="settings-list">';for(const [key,label,desc]of [['sound','sound','soundDesc'],['music','music','musicDesc'],['reduced','motion','motionDesc']])h+='<div class="setting-row"><div><b>'+t(label)+'</b><small>'+t(desc)+'</small></div><button class="toggle '+(settings[key]?'on':'')+'" role="switch" aria-checked="'+!!settings[key]+'" aria-label="'+t(label)+'" data-action="toggle" data-setting="'+key+'"><span></span></button></div>';h+='</div><div class="settings-caption">'+t('language')+'</div><div class="segmented">'+btn('lang-en','English',settings.lang==='en'?'active':'')+btn('lang-ro','Română',settings.lang==='ro'?'active':'')+'</div><div class="settings-caption">'+t('theme')+'</div><div class="themes">';for(const theme of ['sky','candy','forest'])h+='<button class="theme-button '+(settings.theme===theme?'active':'')+'" data-action="theme" data-theme="'+theme+'">'+t(theme)+'</button>';h+='</div><div class="settings-caption">'+t('palette')+'</div><div class="palettes">';for(const name of Object.keys(palettes))h+='<button class="palette-button '+(settings.palette===name?'active':'')+'" data-action="palette" data-palette="'+name+'"><b>'+t(name)+'</b><span>'+Object.values(palettes[name]).map(p=>'<i style="background:'+p[1]+'"></i>').join('')+'</span></button>';h+='</div>'+btn('gallery',t('shapeGallery'),'secondary')+btn('progress',t('progress'),'secondary')+btn('settingsDone',t('done'),'primary')+btn('privacy',t('privacy'),'text-button');showModal('settings',h);}
function showSettingsReturn(){if(modalReturn==='pause')showPause();else closeModal();}
function showLevels(){let h=title('⚑',t('path'),t('pathDesc'));for(let world=0;world<3;world++){h+='<div class="world-label">'+t('world'+(world+1))+'</div><div class="levels">';for(let j=1;j<=8;j++){const n=world*8+j,stars=profile.levelStars[n]||0,open=n<=profile.unlocked;h+='<button class="level-button '+(open?'unlocked ':'')+(n===profile.unlocked?'current':'')+'" data-action="level" data-level="'+n+'" '+(!open?'disabled':'')+' aria-label="'+t('level')+' '+n+'">'+(open?n:'·')+'<small class="level-target">'+E.levelSpec(n).target+' '+t('lines')+'</small><span class="level-stars">'+(stars?'★'.repeat(stars)+'☆'.repeat(3-stars):open?'☆☆☆':'')+'</span></button>';}h+='</div>';}h+=btn('close',t('close'),'secondary');showModal('levels',h);}
function showGarden(){const a=profile.achievements,items=[['first','✿','firstBloom','firstBloomDesc'],['double','✦','doubleBloom','doubleBloomDesc'],['combo','⚡','comboHero','comboHeroDesc'],['thousand','♛','thousand','thousandDesc'],['perfect','☀','allClear','allClearDesc'],['explorer','⚑','explorer','explorerDesc'],['blast','❀','blossom','blossomDesc'],['collector','★','champion','championDesc']];let h=title('♛',t('garden'),t('gardenDesc'))+'<div class="score-table">'+P.MODES.map(m=>'<div><strong>'+profile.bests[m].toLocaleString(settings.lang)+'</strong><small>'+t(m+'Best')+'</small></div>').join('')+'</div><div class="trophies">';h+=items.map(([id,icon,name,desc])=>'<div class="trophy '+(a[id]?'earned':'')+'"><span class="trophy-icon">'+icon+'</span><b>'+t(name)+'</b><small>'+t(desc)+'</small></div>').join('');h+='</div>'+btn('close',t('done'),'primary');showModal('garden',h);}
function resultModal(){if(!state||scene!=='game')return;const win=state.status==='won',lost=state.status==='lost';if(win){Audio.play('win');confetti();}let h=title(win?'✿':'✦',t(win?(state.mode==='prism'?'prismFinished':'wonTitle'):lost?'lostTitle':'stuckTitle'),t(win?(state.mode==='prism'?'prismFinishedDesc':'wonDesc'):lost?'lostDesc':'stuckDesc'));
 if(win&&state.mode==='adventure')h+='<div class="result-stars">'+'★'.repeat(E.stars(state))+'<span style="opacity:.2">'+'★'.repeat(3-E.stars(state))+'</span></div>';
 h+='<div class="eyebrow" style="position:static;margin:20px 0 6px;text-align:center">'+t('scoreLabel')+'</div><div class="score-big">'+state.score.toLocaleString()+'</div><div class="result-stats"><div><b>'+state.lines+'</b><small>'+t('linesCleared')+'</small></div><div><b>'+state.bestCombo+'×</b><small>'+t('bestCombo')+'</small></div></div>';
 if(win&&state.mode==='adventure')h+=btn(state.level<24?'nextLevel':'levels',t(state.level<24?'nextLevel':'allLevels'),'primary');
 else if(state.status==='stuck'&&state.shuffles>0)h+=btn('shuffle',t('shuffle')+' ('+state.shuffles+')','primary');
 if(state.status==='stuck'&&state.charge>=6)h+=btn('rescueBloom',t('bloomReady'),'secondary');
 if(!win&&state.undoState&&state.undos>0)h+=btn('resultUndo',t('undo')+' ('+state.undos+')','secondary');
 h+=btn('playAgain',t(state.mode==='adventure'?'tryAgain':'playAgain'),win?'secondary':'primary')+btn('home',t('home'),'text-button');showModal('result',h);}
function pauseForBreak(){showModal('break',title('☁',t('session'),t('sessionDesc'))+btn('close',t('breakDone'),'primary')+btn('home',t('home'),'text-button'));}
function levelPreview(n){
 const z=E.levelSpec(n);window.previewLevel=n;
 let h=title('⚑',t('level')+' '+n,t('mission'))+'<div class="mission-list"><b>'+t('missionLines',{n:z.target})+'</b><span>'+t('missionMoves',{n:z.moves})+'</span>';
 if(z.comboTarget)h+='<span>'+t('missionCombo',{n:z.comboTarget})+'</span>';
 if(z.gemTarget)h+='<span>'+t('missionGems',{n:z.gemTarget})+' · '+t('gemNames').split(',')[z.gemColor-1]+'</span>';
 h+='</div><p>'+t('shapeCount',{n:z.shapeCount})+' · '+z.helpers+' '+t('undo')+'</p><div class="difficulty"><i style="width:'+(n/24*100)+'%"></i></div>'+btn('beginLevel',t('startLevel'),'primary')+btn('levels',t('path'),'text-button');showModal('mission',h);
}
function showPrism(){showModal('prism',title('◆',t('prismTitle'),t('prismDesc'))+btn('beginPrism',t('letsPlay'),'primary')+btn('close',t('cancel'),'text-button'));}
function progressModal(){
 let h=title('♛',t('progress'),t('progressDesc'))+'<div class="score-table">'+P.MODES.map(m=>'<div><strong>'+profile.bests[m].toLocaleString(settings.lang)+'</strong><small>'+t(m)+'</small></div>').join('')+'</div>';
 h+='<details class="restore"><summary>'+t('restoreBest')+'</summary><p>'+t('restoreHint')+'</p><label for="restore-mode">'+t('restoreBest')+'</label><select id="restore-mode">'+P.MODES.map(m=>'<option value="'+m+'">'+t(m)+'</option>').join('')+'</select><label for="restore-score">'+t('score')+'</label><input id="restore-score" type="number" min="0" max="1000000000" step="1" inputmode="numeric" placeholder="50000">'+btn('restoreScore',t('restoreScore'),'primary')+'</details>'+btn('export',t('exportCode'),'secondary')+btn('import',t('importCode'),'secondary')+btn('backSettings',t('done'),'primary');showModal('progress',h);
}
function backupCode(){save();return 'BB2:'+btoa(unescape(encodeURIComponent(JSON.stringify({version:2,profile,settings,state}))));}
function importBackup(code){
 if(!code.startsWith('BB2:')||code.length>200000)throw Error('Invalid backup');
 const b=JSON.parse(decodeURIComponent(escape(atob(code.slice(4)))));
 if(b.version!==2||!b.profile||!b.profile.bests||!b.settings||(b.state&&!E.validate(b.state)))throw Error('Invalid backup');
 profile=P.mergeProfiles(profile,b.profile);if(b.state)state=b.state;
 if(STR[b.settings.lang])settings.lang=b.settings.lang;
 if(worlds[b.settings.theme])settings.theme=b.settings.theme;
 if(palettes[b.settings.palette])settings.palette=b.settings.palette;
 palette=palettes[settings.palette];gemCache.clear();save();home();toast(t('importOK'));
}
function gallery(){let h=title('▦',t('shapeGallery'),t('galleryDesc'))+'<div class="shape-gallery">';for(const [i,cells]of E.SHAPES.entries()){const d=E.dims(cells);h+='<div><svg viewBox="0 0 60 60" role="img" aria-label="Shape '+(i+1)+'">'+cells.map(([x,y])=>'<rect x="'+((60-d.w*10)/2+x*10)+'" y="'+((60-d.h*10)/2+y*10)+'" width="9" height="9" rx="2" fill="'+palette[i%6+1][1]+'"/>').join('')+'</svg><small>'+(i+1)+'</small></div>';}showModal('gallery',h+'</div>'+btn('backSettings',t('done'),'primary'));}
$('modal').addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;Audio.unlock();Audio.play('tap');const a=b.dataset.action;
 if(a==='resume'||a==='close')closeModal();
 if(a==='home')home();
 if(a==='settings')settingsModal('pause');
 if(a==='help')showHelp('pause');
 if(a==='helpDone'){profile.tutorial=true;save();if(window.helpFrom==='pause')showPause();else closeModal();}
 if(a==='settingsDone')showSettingsReturn();
 if(a==='privacy')showModal('privacy',title('✿',t('aboutTitle'))+'<p style="text-align:left">'+t('about')+'</p><p style="text-align:left;font-size:11px">'+t('about2')+'</p>'+btn('backSettings',t('done'),'primary'));
 if(a==='backSettings')settingsModal();
 if(a==='toggle'){settings[b.dataset.setting]=!settings[b.dataset.setting];if(b.dataset.setting==='reduced'&&settings.reduced){particles=[];shake=0;}save();settingsModal();}
 if(a==='lang-en'||a==='lang-ro'){settings.lang=a.slice(5);save();localize();settingsModal();}
 if(a==='theme'){settings.theme=b.dataset.theme;save();settingsModal();}
 if(a==='level'){const n=+b.dataset.level;if(n<=profile.unlocked)levelPreview(n);}
 if(a==='beginLevel')requestStart('adventure',window.previewLevel);
 if(a==='beginPrism')requestStart('prism');
 if(a==='progress')progressModal();
 if(a==='gallery')gallery();
 if(a==='palette'){settings.palette=b.dataset.palette;palette=palettes[settings.palette];gemCache.clear();save();settingsModal();}
 if(a==='restoreScore'){const raw=$('restore-score').value,n=Number(raw);if(raw.trim()===''||!Number.isInteger(n)||n<0||n>1000000000){toast(t('invalidScore'));return;}const m=$('restore-mode').value;profile.bests[m]=Math.max(profile.bests[m],n);profile.restoredBest=true;save();progressModal();toast(t('restored'));}
 if(a==='export'){showModal('backup',title('♛',t('exportTitle'),t('exportDesc'))+'<textarea id="backup-code" class="backup-code" readonly aria-label="Backup code"></textarea>'+btn('progress',t('done'),'primary'));$('backup-code').value=backupCode();$('backup-code').onclick=()=>{$('backup-code').select();};}
 if(a==='import')showModal('backup',title('♛',t('importCode'),t('importDesc'))+'<textarea id="import-code" class="backup-code" placeholder="BB2:…" aria-label="Backup code"></textarea>'+btn('importDo',t('importDo'),'primary')+btn('progress',t('cancel'),'secondary'));
 if(a==='importDo'){try{importBackup($('import-code').value.trim());}catch(_){toast(t('importBad'));}}
 if(a==='levels')showLevels();
 if(a==='nextLevel')levelPreview(Math.min(24,state.level+1));
 if(a==='playAgain')start(state.mode,state.level);
 if(a==='restart')requestStart(state.mode,state.level);
 if(a==='confirmStart'){const p=window.pendingStart;if(p)start(p.mode,p.level);}
 if(a==='cancelConfirm'){if(scene==='game')showPause();else closeModal();}
 if(a==='shuffle'){const ev=E.shuffle(state);if(ev.ok){closeModal();selected=-1;hover=null;hintMove=null;Audio.play('pick');award(ev);refreshControls();toast(t('shuffleDone'));if(state.status==='stuck')resultModal();}}
 if(a==='resultUndo'){if(E.undo(state).ok){closeModal();selected=-1;hover=null;celebration=null;clearVisual=null;save();refreshControls();}}
 if(a==='rescueBloom'){closeModal();armed=true;hover=null;toast(t('bloomTip'));refreshControls();}
});
$('home-settings').onclick=()=>{Audio.unlock();settingsModal('home');};$('play-cozy').onclick=()=>requestStart('cozy');$('play-classic').onclick=()=>requestStart('classic');$('play-adventure').onclick=showLevels;$('play-prism').onclick=showPrism;$('collection').onclick=showGarden;
$('continue').onclick=()=>{scene='game';displayScore=state.score;recordNotified=false;refresh();Audio.unlock();if(state.status==='stuck')resultModal();};$('pause').onclick=showPause;
$('hint').onclick=()=>{if(overlayOpen||!state||state.status!=='playing')return;const h=E.hint(state);if(h){if(h.turns){E.rotate(state,h.slot,h.turns);save();}hintMove={...h,until:now+8};selected=-1;hover=null;armed=false;toast(t('hintText'));Audio.play('pick');refreshControls();}};
$('undo').onclick=()=>{if(overlayOpen||performance.now()<busyUntil)return;if(E.undo(state).ok){selected=-1;hover=null;armed=false;celebration=null;clearVisual=null;hintMove=null;Audio.play('pick');save();refreshControls();}else toast(t('noUndo'));};
$('rotate').onclick=()=>{if(overlayOpen||!state||performance.now()<busyUntil)return;if(selected<0){toast(t('rotatePick'));return;}if(E.rotate(state,selected).ok){hover=null;hintMove=null;save();refreshControls();Audio.play('pick');}};
$('blast').onclick=()=>{if(overlayOpen||!state)return;if(state.charge<6){toast(t('notCharged',{n:6-state.charge}));return;}selected=-1;hintMove=null;armed=!armed;hover=null;toast(t('bloomTip'));Audio.play('pick');refreshControls();};
// Traps focus in the modal for keyboard / assistive users.
$('overlay').addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=[...$('modal').querySelectorAll('button:not(:disabled)')];if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===$('modal'))){last.focus();e.preventDefault();}else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault();}});
window.nativePause=()=>{cancelDrag();save();Audio.suspend();if(scene==='game'&&!overlayOpen&&state&&state.status==='playing')showPause();};
window.nativeResume=()=>{lastTime=performance.now();};
window.nativeBack=()=>{if(overlayOpen){if(modalName==='pause')home();else if(modalName==='settings')showSettingsReturn();else closeModal();}else if(scene==='game')showPause();else toast(t('exitInfo'));return true;};
document.addEventListener('visibilitychange',()=>{if(document.hidden)window.nativePause();else window.nativeResume();});window.addEventListener('pagehide',save);window.addEventListener('resize',resize);
// Deliberately no remote URLs, service workers, telemetry, or debug mutation hooks.
window.BLOOM_VERSION='2.0';localize();refresh();requestAnimationFrame(frame);
})();

