/* Original vector artwork and lightweight canvas renderer. No remote assets. */
const FOX_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 320"><defs>
<linearGradient id="fur" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffd187"/><stop offset=".5" stop-color="#f59a55"/><stop offset="1" stop-color="#d66a46"/></linearGradient>
<linearGradient id="suit" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#cbbaff"/><stop offset="1" stop-color="#8b72c9"/></linearGradient>
<linearGradient id="tail" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f9b473"/><stop offset="1" stop-color="#d17657"/></linearGradient>
<radialGradient id="visor" cx=".3" cy=".15" r=".9"><stop stop-color="#e6fffa" stop-opacity=".18"/><stop offset=".7" stop-color="#addcf9" stop-opacity=".025"/><stop offset="1" stop-color="#c2b8ff" stop-opacity=".15"/></radialGradient>
<linearGradient id="cream" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff4d7"/><stop offset="1" stop-color="#fbd8b1"/></linearGradient>
</defs>
<ellipse cx="147" cy="295" rx="97" ry="15" fill="#08051a" opacity=".25"/>
<path d="M216 241C261 254 297 229 280 187C271 165 253 162 252 143C213 157 231 189 221 205L189 229Z" fill="url(#tail)" stroke="#ae6259" stroke-width="2"/>
<path d="M279 187C274 171 254 162 252 143C235 150 230 163 231 174L248 174 240 193 257 189 258 206Z" fill="url(#cream)"/>
<path d="M100 217C78 245 67 268 79 278C89 287 99 274 110 257L117 222Z" fill="url(#suit)" stroke="#69517f" stroke-width="3"/>
<path d="M197 214C215 210 226 185 236 191C250 201 228 234 214 245L197 244Z" fill="url(#suit)" stroke="#69517f" stroke-width="3"/>
<path d="M226 192C222 184 227 174 232 177L235 185C237 167 246 169 244 184C252 176 258 182 249 192C242 203 231 204 226 192Z" fill="#fbcb9d"/>
<path d="M107 248L108 285C106 298 130 299 133 287L138 265 163 265 168 288C169 300 195 296 192 284L195 248Z" fill="url(#suit)" stroke="#69517f" stroke-width="3"/>
<path d="M104 282Q121 274 136 282L135 292Q118 307 99 295Z" fill="#5c467c"/><path d="M165 282Q179 275 196 282L201 294Q185 305 165 293Z" fill="#5c467c"/>
<path d="M101 207Q146 187 200 208L205 244Q199 266 152 272Q107 266 99 248Z" fill="url(#suit)" stroke="#69517f" stroke-width="3"/>
<path d="M120 218Q148 211 178 218L176 246Q150 261 124 246Z" fill="#e0d7ff" opacity=".88"/>
<rect x="137" y="228" width="27" height="22" rx="7" fill="#594476"/><path d="m151 232 2.4 5 5.6.8-4 4 .9 5.5-4.9-2.6-5 2.6 1-5.5-4-4 5.5-.8Z" fill="#b8ffdf"/>
<circle cx="112" cy="236" r="3" fill="#afffe1"/><circle cx="188" cy="236" r="3" fill="#ffd18b"/>
<path d="M77 86Q67 56 79 25Q114 34 130 72Z" fill="url(#fur)" stroke="#b66953" stroke-width="3"/>
<path d="M85 41Q82 59 88 77L114 76Z" fill="#81465c"/><path d="M92 50L92 68 106 69Z" fill="#e79a9c"/>
<path d="M179 71Q200 31 231 25Q244 57 226 91Z" fill="url(#fur)" stroke="#b66953" stroke-width="3"/>
<path d="M194 76L222 41Q230 60 220 77Z" fill="#81465c"/><path d="M204 69L218 51 219 71Z" fill="#e79a9c"/>
<path d="M83 77Q115 57 150 64Q191 56 223 80Q240 109 232 134L245 146 230 151 239 162 221 164Q208 205 154 218Q99 211 79 178L63 175 74 163 58 158 74 146Q62 103 83 77Z" fill="url(#fur)" stroke="#b66953" stroke-width="2.5"/>
<path d="M119 71Q130 51 148 47L141 66Q154 49 166 52L157 72Z" fill="#ffbd75"/>
<path d="M72 148Q83 165 107 161Q119 145 134 157Q150 175 169 155Q183 143 200 158Q220 159 234 144Q234 179 213 191Q186 214 154 218Q111 212 88 189Q74 176 72 148Z" fill="url(#cream)"/>
<ellipse cx="109" cy="135" rx="22" ry="27" fill="#fff6e2"/><ellipse cx="191" cy="135" rx="22" ry="27" fill="#fff6e2"/>
<ellipse cx="115" cy="136" rx="11.5" ry="17" fill="#392934"/><ellipse cx="185" cy="136" rx="11.5" ry="17" fill="#392934"/>
<ellipse cx="117" cy="140" rx="7" ry="10" fill="#65434b"/><ellipse cx="183" cy="140" rx="7" ry="10" fill="#65434b"/>
<ellipse cx="111" cy="129" rx="4.5" ry="6" fill="white"/><ellipse cx="181" cy="129" rx="4.5" ry="6" fill="white"/>
<circle cx="119" cy="144" r="2" fill="#fff9e8"/><circle cx="189" cy="144" r="2" fill="#fff9e8"/>
<path d="M93 99Q105 93 116 99M179 98Q192 92 204 99" stroke="#9b5644" stroke-width="4" stroke-linecap="round" fill="none"/>
<circle cx="108" cy="136" r="31" fill="none" stroke="#544075" stroke-width="6"/><circle cx="192" cy="136" r="31" fill="none" stroke="#544075" stroke-width="6"/>
<path d="M139 132Q150 127 161 132M77 128 69 122M223 128 232 121" stroke="#544075" stroke-width="6" stroke-linecap="round" fill="none"/>
<path d="M84 124Q90 111 103 111M168 124Q174 111 187 111" stroke="#d6bce7" stroke-width="2" stroke-linecap="round" fill="none" opacity=".65"/>
<ellipse cx="95" cy="167" rx="10" ry="5" fill="#e89585" opacity=".6"/><ellipse cx="207" cy="167" rx="10" ry="5" fill="#e89585" opacity=".6"/>
<path d="M142 174Q151 166 161 174Q160 184 152 185Q144 183 142 174Z" fill="#563346"/><ellipse cx="148" cy="174" rx="3.5" ry="2" fill="#b6868c"/>
<path d="M152 185V190M136 189Q150 204 168 188" stroke="#764455" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M143 196Q152 199 159 195" stroke="#e49394" stroke-width="3" fill="none"/>
<ellipse cx="151" cy="121" rx="114" ry="110" fill="url(#visor)" stroke="#d9fff1" stroke-opacity=".37" stroke-width="3"/>
<path d="M58 103Q63 59 99 40" fill="none" stroke="#effff8" stroke-width="7" stroke-linecap="round" opacity=".35"/>
<path d="M66 112L64 121" stroke="#effff8" stroke-width="5" stroke-linecap="round" opacity=".35"/>
<path d="M91 208Q150 244 211 208L213 218Q150 253 89 218Z" fill="#8a71af" stroke="#c8b1e5" stroke-width="2"/>
<rect x="38" y="125" width="18" height="35" rx="9" fill="#937db8" stroke="#d3c2ec" stroke-width="2"/><rect x="246" y="125" width="18" height="35" rx="9" fill="#937db8" stroke="#d3c2ec" stroke-width="2"/>
<circle cx="47" cy="140" r="4" fill="#b1fbdc"/><circle cx="255" cy="140" r="4" fill="#b1fbdc"/>
</svg>`;
const HEAD_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path d="M12 36 10 7 32 18Q40 14 48 18L71 7 69 38Q79 67 40 76Q1 65 12 36" fill="#f7ad6e"/><path d="m17 27-1-11 13 8M54 24l11-9-1 14" fill="#8b4561"/><path d="M9 46Q26 56 36 44Q40 54 46 44Q56 54 71 44Q76 65 40 74Q13 67 9 46" fill="#ffebd0"/><circle cx="26" cy="40" r="13" fill="none" stroke="#614573" stroke-width="4"/><circle cx="54" cy="40" r="13" fill="none" stroke="#614573" stroke-width="4"/><path d="M38 38h5" stroke="#614573" stroke-width="4"/><ellipse cx="28" cy="40" rx="3" ry="5" fill="#392733"/><ellipse cx="52" cy="40" rx="3" ry="5" fill="#392733"/><circle cx="27" cy="38" r="1" fill="white"/><circle cx="51" cy="38" r="1" fill="white"/><path d="M36 55q4-3 8 0-1 6-4 6-4-1-4-6" fill="#54313e"/><path d="M33 62q7 7 14 0" fill="none" stroke="#81484e" stroke-width="2" stroke-linecap="round"/></svg>`;
const artImage=new Image();artImage.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(FOX_SVG);
const headImage=new Image();headImage.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(HEAD_SVG);
const PALETTE=['#bda2ff','#98efd4','#ffd489','#ff9ccc','#a1d8ff'];
function rng(seed){return function(){let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function roundRect(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r)}
function starPath(c,x,y,r,n=4){c.beginPath();for(let i=0;i<n*2;i++){const a=-Math.PI/2+i*Math.PI/n;const rr=i%2?r*.34:r;i?c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):c.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath()}
function glow(c,x,y,r,col){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'transparent');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)}
function planet(c,x,y,r,col,ring=false){c.save();if(ring){c.translate(x,y);c.rotate(-.35);c.strokeStyle=col+'55';c.lineWidth=r*.2;c.beginPath();c.ellipse(0,0,r*1.8,r*.4,0,0,Math.PI*2);c.stroke();c.rotate(.35);c.translate(-x,-y)}const g=c.createRadialGradient(x-r*.4,y-r*.5,r*.1,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'#3b295f');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#ffffff0b';c.beginPath();c.ellipse(x-r*.2,y-r*.25,r*.58,r*.21,-.5,0,Math.PI*2);c.fill();c.restore()}
function bubble(c,x,y,r,text,col,phase=0,done=0){c.save();c.translate(x,y);glow(c,0,0,r*1.65,col+'13');const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,col+'40');g.addColorStop(.6,col+'12');g.addColorStop(1,col+'29');c.fillStyle=g;c.strokeStyle=col+'c0';c.lineWidth=1.6;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.fill();c.stroke();c.strokeStyle='#ffffff68';c.lineWidth=3;c.lineCap='round';c.beginPath();c.arc(0,0,r-5,-2.55,-1.65);c.stroke();c.fillStyle='#ffffff6b';c.beginPath();c.arc(r*.5,r*.54,2,0,Math.PI*2);c.fill();c.shadowColor=col+'66';c.shadowBlur=12;c.textAlign='center';c.textBaseline='middle';c.font=`900 ${Math.round(text.length>1?Math.min(r*.7,r*1.62/(text.length*.67)):r*1.04)}px 'Trebuchet MS',sans-serif`;if(done>0){const full=c.measureText(text).width;let start=-full/2;c.textAlign='left';for(let i=0;i<text.length;i++){c.fillStyle=i<done?'#a1f6d5':(i===done?'#ffffff':'#d9d0e9');c.globalAlpha=i<done?.4:1;c.fillText(text[i],start,2);start+=c.measureText(text[i]).width}}else{c.fillStyle='#fffaff';c.fillText(text,0,2)}c.restore()}
const Graphics={
  background(w,h,theme=0){const cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(w*1.5));cv.height=Math.max(1,Math.round(h*1.5));const c=cv.getContext('2d');c.scale(1.5,1.5);const sky=c.createLinearGradient(0,0,0,h);const themes=[['#19142f','#342146'],['#102b35','#204751'],['#221e44','#31346a']];const t=themes[theme%3];sky.addColorStop(0,t[0]);sky.addColorStop(.7,t[1]);sky.addColorStop(1,'#302042');c.fillStyle=sky;c.fillRect(0,0,w,h);glow(c,w*.64,h*.25,w*.48,'#9e61ce13');glow(c,w*.2,h*.7,w*.4,'#699ddd12');const rd=rng(77);for(let i=0;i<90;i++){const x=rd()*w,y=rd()*h*.86,r=rd()*1.2+.35;c.fillStyle=`rgba(219,212,255,${rd()*.4+.15})`;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()}planet(c,w*.84,h*.2,Math.min(35,h*.095),'#be97cd',true);planet(c,w*.16,h*.37,Math.min(15,h*.05),'#86cfc2');c.strokeStyle='#e5ceff09';c.lineWidth=1;c.beginPath();c.ellipse(w*.7,h*.21,w*.52,h*.61,-.38,0,Math.PI*2);c.stroke();
    // Three painted landscape layers keep the playfield legible.
    for(let layer=0;layer<3;layer++){c.fillStyle=['#39294b','#302942','#25323e'][layer];c.beginPath();c.moveTo(0,h);let y=h*(.78+layer*.065);c.lineTo(0,y);for(let x=0;x<=w+80;x+=80)c.quadraticCurveTo(x+40,y-22-Math.sin(x*.015+layer)*18,x+80,y+Math.cos(x*.015)*10);c.lineTo(w,h);c.closePath();c.fill()}
    const rd2=rng(9);for(let i=0;i<18;i++){const x=rd2()*w,hh=13+rd2()*32,yy=h-10-rd2()*16;c.fillStyle=i%2?'#49655688':'#53657466';c.beginPath();c.ellipse(x,yy-hh/2,5,hh/2,rd2()-.5,0,Math.PI*2);c.fill();c.strokeStyle='#7b9a8219';c.beginPath();c.moveTo(x,yy);c.lineTo(x,yy-hh);c.stroke()}return cv},
  ship(c,x,y,s=1,t=0){c.save();c.translate(x,y);c.scale(s,s);glow(c,0,23,85,'#9ef7d128');c.fillStyle='#b0ffe51f';c.beginPath();c.ellipse(0,32,49,10,0,0,Math.PI*2);c.fill();c.fillStyle='#211831';c.beginPath();c.ellipse(0,17,61,14,0,0,Math.PI*2);c.fill();const g=c.createLinearGradient(0,-5,0,25);g.addColorStop(0,'#b6a3e3');g.addColorStop(1,'#57406e');c.fillStyle=g;c.beginPath();c.ellipse(0,6,74,19,0,0,Math.PI*2);c.fill();c.strokeStyle='#cfbafa60';c.lineWidth=2;c.stroke();c.fillStyle='#cab6e9';c.beginPath();c.ellipse(0,0,55,11,0,0,Math.PI*2);c.fill();for(let i=-2;i<=2;i++){c.fillStyle=i%2?'#ffd791':'#c1ffe6';c.shadowColor=c.fillStyle;c.shadowBlur=6;c.beginPath();c.ellipse(i*23,14-Math.abs(i)*2,4,2.6,0,0,Math.PI*2);c.fill()}c.shadowBlur=0;c.restore()},
  setup(canvas){const dpr=Math.min(devicePixelRatio||1,2);const r=canvas.getBoundingClientRect();canvas.width=Math.max(1,Math.round(r.width*dpr));canvas.height=Math.max(1,Math.round(r.height*dpr));const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);return{c,w:r.width,h:r.height,dpr}}
};
let homeRAF=0,homeView=null;
function renderHome(t=0){if(document.getElementById('home-screen').hidden){homeRAF=0;return}const v=homeView;if(!v||v.w<1){homeRAF=requestAnimationFrame(renderHome);return}const {c,w,h}=v;const small=w<460;const tm=window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced')?0:t/1000;c.clearRect(0,0,w,h);c.save();c.translate(w*.5,h*.49);const scale=Math.min(w/530,h/365);c.scale(scale,scale);glow(c,0,0,235,'#9270d52a');glow(c,80,60,165,'#9de9d411');
 c.strokeStyle='#b699ef18';c.lineWidth=1;c.beginPath();c.ellipse(0,0,221,125,-.35,0,Math.PI*2);c.stroke();c.beginPath();c.ellipse(0,0,184,157,.3,0,Math.PI*2);c.stroke();const rd=rng(34);for(let i=0;i<49;i++){const x=(rd()-.5)*530,y=(rd()-.5)*350,r=rd()*2+.6;c.fillStyle=`rgba(222,200,255,${.15+Math.sin(tm*.7+i)*.12+rd()*.4})`;if(i%6===0){starPath(c,x,y,r*2);c.fill()}else{c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()}}planet(c,171,-96,31,'#b493d7',true);planet(c,-189,80,17,'#8edfc1');planet(c,-131,-120,10,'#cfb1e6');
 c.save();c.translate(9,Math.sin(tm*1.2)*5+10);Graphics.ship(c,0,114,1.35,tm);if(artImage.complete)c.drawImage(artImage,-110,-139,226,241);c.restore();
 bubble(c,-169,-32+Math.sin(tm*.9)*8,39,'A','#bca0ff');bubble(c,170,44+Math.sin(tm*.7+1)*7,33,'7','#9df0d7');bubble(c,87,-121+Math.sin(tm*.8)*5,28,'B','#ffd78d');bubble(c,-103,108+Math.sin(tm+1)*6,25,'C','#ff9fc9');c.save();c.translate(-52,-145);c.rotate(.2+Math.sin(tm)*.04);c.fillStyle='#ffdb8f';starPath(c,0,0,12,5);c.fill();c.restore();c.fillStyle='#9ae6cf';starPath(c,222,-9,6);c.fill();c.restore();homeRAF=requestAnimationFrame(renderHome)}
function initHomeArt(){homeView=Graphics.setup(document.getElementById('home-canvas'));if(!homeRAF)homeRAF=requestAnimationFrame(renderHome)}
