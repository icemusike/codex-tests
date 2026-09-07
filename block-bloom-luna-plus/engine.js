
/* Block Bloom • Original deterministic puzzle engine. No dependencies. */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.BloomEngine = api;
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';
  const N = 8, MAX_CHARGE = 6, VERSION = 2;
  const copy = o => JSON.parse(JSON.stringify(o));
  const SHAPES = [
    [[0,0]], [[0,0],[1,0]], [[0,0],[0,1]],
    [[0,0],[1,0],[2,0]], [[0,0],[0,1],[0,2]],
    [[0,0],[1,0],[0,1]], [[0,0],[1,0],[1,1]],
    [[0,0],[0,1],[1,1]], [[1,0],[0,1],[1,1]],
    [[0,0],[1,0],[0,1],[1,1]],
    [[0,0],[1,0],[2,0],[3,0]], [[0,0],[0,1],[0,2],[0,3]],
    [[0,0],[1,0],[2,0],[1,1]], [[1,0],[0,1],[1,1],[1,2]],
    [[1,0],[0,1],[1,1],[2,1]], [[0,0],[0,1],[1,1],[0,2]],
    [[0,0],[1,0],[1,1],[2,1]], [[1,0],[0,1],[1,1],[0,2]],
    [[1,0],[2,0],[0,1],[1,1]], [[0,0],[0,1],[1,1],[1,2]],
    [[0,0],[0,1],[0,2],[1,2]], [[0,0],[1,0],[2,0],[0,1]],
    [[0,0],[1,0],[1,1],[1,2]], [[2,0],[0,1],[1,1],[2,1]],
    [[0,0],[1,0],[2,0],[3,0],[4,0]], [[0,0],[0,1],[0,2],[0,3],[0,4]],
    [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],
    [[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]],
    [[0,0],[1,0],[2,0],[0,1],[0,2]],
    [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]
  ];
  SHAPES.push(...[[[0,0],[2,0],[0,1],[1,1],[2,1]],[[0,0],[1,0],[0,1],[0,2],[1,2]],[[0,0],[1,0],[2,0],[0,1],[2,1]],[[0,0],[1,0],[1,1],[0,2],[1,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[0,1],[1,1],[1,2],[2,2]],[[2,0],[1,1],[2,1],[0,2],[1,2]],[[0,0],[1,0],[1,1],[2,1],[2,2]],[[1,0],[2,0],[0,1],[1,1],[0,2]],[[0,0],[1,0],[2,0],[1,1],[1,2]],[[1,0],[1,1],[0,2],[1,2],[2,2]],[[0,0],[0,1],[1,1],[2,1],[0,2]],[[2,0],[0,1],[1,1],[2,1],[2,2]],[[0,0],[0,1],[0,2],[0,3],[1,3]],[[1,0],[1,1],[1,2],[0,3],[1,3]],[[0,0],[1,0],[2,0],[3,0],[0,1]],[[0,0],[1,0],[0,1],[1,1],[0,2]],[[0,0],[1,0],[0,1],[1,1],[1,2]]]);
  function rand(s) {
    s.rng = (s.rng + 0x6D2B79F5) >>> 0;
    let t=s.rng;
    t=Math.imul(t ^ (t>>>15),t|1); t ^= t+Math.imul(t ^ (t>>>7),t|61);
    return ((t ^ (t>>>14))>>>0)/4294967296;
  }
  function dims(cells) { return {w:Math.max(...cells.map(c=>c[0]))+1,h:Math.max(...cells.map(c=>c[1]))+1}; }
  function fits(board,cells,x,y) {
    if (!Number.isInteger(x)||!Number.isInteger(y)||!Array.isArray(cells)||!cells.length) return false;
    return cells.every(c => x+c[0]>=0 && y+c[1]>=0 && x+c[0]<N && y+c[1]<N && !board[(y+c[1])*N+x+c[0]]);
  }
  function positions(board,cells) {
    const a=[],d=dims(cells);
    for(let y=0;y<=N-d.h;y++) for(let x=0;x<=N-d.w;x++) if(fits(board,cells,x,y)) a.push({x,y});
    return a;
  }
  function lines(board) {
    const rows=[],cols=[],indices=new Set();
    for(let i=0;i<N;i++) {
      if(board.slice(i*N,i*N+N).every(Boolean)) rows.push(i);
      let full=true; for(let j=0;j<N;j++) if(!board[j*N+i]){full=false;break;}
      if(full) cols.push(i);
    }
    rows.forEach(y=>{for(let x=0;x<N;x++)indices.add(y*N+x);});
    cols.forEach(x=>{for(let y=0;y<N;y++)indices.add(y*N+x);});
    return {rows,cols,indices:[...indices],count:rows.length+cols.length};
  }
  function simulate(board,piece,x,y) {
    const b=board.slice();
    if(!fits(b,piece.cells,x,y)) return null;
    for(const c of piece.cells) b[(y+c[1])*N+x+c[0]]=piece.color;
    const clear=lines(b); clear.indices.forEach(i=>b[i]=0);
    return {board:b,clear};
  }
  function heuristic(board) {
    let h=0;
    for(let y=0;y<N;y++) for(let x=0;x<N;x++) {
      const i=y*N+x;
      if(board[i]) {h+=0.3; continue;}
      let neighbours=0;
      if(x===0||board[i-1]) neighbours++;
      if(x===7||board[i+1]) neighbours++;
      if(y===0||board[i-8]) neighbours++;
      if(y===7||board[i+8]) neighbours++;
      if(neighbours===4)h+=9;
      else if(neighbours===3)h+=2;
    }
    return h;
  }
  function rotated(cells,turns=1) {
    let out=copy(cells);
    for(let i=0;i<((turns%4)+4)%4;i++){
      const h=dims(out).h;out=out.map(([x,y])=>[h-1-y,x]);
      const mx=Math.min(...out.map(c=>c[0])),my=Math.min(...out.map(c=>c[1]));
      out=out.map(([x,y])=>[x-mx,y-my]);
    }
    return out;
  }
  function hint(s) {
    let best=null;
    s.tray.forEach((p,slot)=>{
      if(!p)return;
      for(let turns=0;turns<(s.mode==='prism'?4:1);turns++){
        const piece={...p,cells:rotated(p.cells,turns)};
        for(const pos of positions(s.board,piece.cells)) {
          const r=simulate(s.board,piece,pos.x,pos.y);
          const value=r.clear.count*150-heuristic(r.board)+piece.cells.length*0.7;
          if(!best||value>best.value) best={slot,x:pos.x,y:pos.y,value,turns,lines:r.clear.count};
        }
      }
    });
    return best;
  }
  function hasMove(s) {
    return s.tray.some(p=>p && (s.mode==='prism'?[0,1,2,3]:[0]).some(t=>positions(s.board,rotated(p.cells,t)).length>0));
  }
  function pool(s) {
    if(s.mode==='cozy')return s.moves<16 ? SHAPES.slice(0,10) : SHAPES.slice(0,24);
    if(s.mode==='adventure')return SHAPES.slice(0,levelSpec(s.level).shapeCount);
    if(s.mode==='prism')return SHAPES;
    return SHAPES.slice(0,s.score<1500?24:s.score<5000?30:48);
  }
  // Construct a hand along a simulated legal route, then shuffle the hand.
  // This guarantees that there is a route to place all three pieces when dealt,
  // not that every arbitrary placement the player makes will remain solvable.
  function deal(s) {
    let board=s.board.slice(), hand=[];
    for(let k=0;k<3;k++) {
      const available=pool(s).map(c=>({cells:c,pos:positions(board,c)})).filter(o=>o.pos.length);
      if(!available.length) {
        hand.push({cells:[[0,0]],color:1+Math.floor(rand(s)*6),uid:++s.uid});
        continue;
      }
      // Single squares remain possible, but never dominate healthy boards.
      let pick=available[Math.floor(rand(s)*available.length)];
      if(pick.cells.length===1&&available.length>3&&rand(s)>.23)pick=available[1+Math.floor(rand(s)*(available.length-1))];
      const p={cells:copy(pick.cells),color:1+Math.floor(rand(s)*6),uid:++s.uid};
      let pos=pick.pos[Math.floor(rand(s)*pick.pos.length)];
      if(s.mode!=='classic'||rand(s)<.75) {
        let v=-1e9;
        for(const a of pick.pos){const r=simulate(board,p,a.x,a.y),q=r.clear.count*100-heuristic(r.board);if(q>v){v=q;pos=a;}}
      }
      board=simulate(board,p,pos.x,pos.y).board;
      hand.push(p);
    }
    for(let i=hand.length-1;i>0;i--){let j=Math.floor(rand(s)*(i+1));[hand[i],hand[j]]=[hand[j],hand[i]];}
    s.tray=hand; s.hands++;
  }
  function levelSpec(level) {
    level=Math.max(1,Math.min(24,Math.floor(level)||1));
    const target=level+2;
    // Every level has a strictly higher line target. The move allowance per
    // required line shrinks; later boards use a larger shape vocabulary.
    return {
      target,moves:Math.ceil(target*(4.5-(level-1)*0.055)+4),
      seed:(0xB1000+level*17353)>>>0,world:Math.floor((level-1)/8),
      shapeCount:Math.min(48,12+level*2),
      prefill:Math.min(18,4+Math.floor(level*.6)),
      helpers:level<=8?3:level<=16?2:1,
      comboTarget:level<9?0:level<17?2:3,
      gemColor:level>=5&&level%3===2?1+Math.floor(level/3)%6:0,
      gemTarget:level>=5&&level%3===2?5+Math.floor(level/3):0
    };
  }
  function newGame(mode='cozy',level=1,seed) {
    if(!['cozy','classic','adventure','prism'].includes(mode))mode='cozy';
    level=Math.max(1,Math.min(24,Math.floor(level)||1));
    const spec=levelSpec(level);
    const startSeed=seed===undefined ? (mode==='adventure'?spec.seed:Date.now()>>>0) : seed>>>0;
    const s={v:VERSION,id:Date.now().toString(36)+'-'+startSeed.toString(36), mode,level,rng:startSeed,
      board:Array(64).fill(0),tray:[],score:0,lines:0,moves:0,combo:0,grace:0,bestCombo:0,
      charge:0,shuffles:mode==='cozy'?99:mode==='adventure'?spec.helpers:mode==='prism'?3:2,undos:mode==='cozy'?99:mode==='adventure'?spec.helpers:mode==='prism'?5:2,uid:0,hands:0,
      target:mode==='adventure'?spec.target:0,moveLimit:mode==='adventure'?spec.moves:mode==='prism'?40:0,
      comboTarget:mode==='adventure'?spec.comboTarget:0,gemColor:mode==='adventure'?spec.gemColor:0,gemTarget:mode==='adventure'?spec.gemTarget:0,gems:0,
      status:'playing',rescues:0,blasts:0,perfects:0,undoState:null};
    // Welcoming starter board. One easy clear is available in every mode.
    const bottomGap=3;
    for(let x=0;x<8;x++)if(x<bottomGap||x>bottomGap+2)s.board[7*8+x]=4;
    if(mode==='adventure') {
      const candidates=[];
      for(let y=2;y<7;y++)for(let x=0;x<8;x++)candidates.push(y*8+x);
      for(let i=candidates.length-1;i>0;i--){const j=Math.floor(rand(s)*(i+1));[candidates[i],candidates[j]]=[candidates[j],candidates[i]];}
      candidates.slice(0,spec.prefill).forEach((i,j)=>s.board[i]=(spec.gemColor&&j<spec.gemTarget)?spec.gemColor:1+Math.floor(rand(s)*6));
    }
    s.tray=[{cells:[[0,0],[1,0],[2,0]],color:4,uid:++s.uid},
      {cells:[[0,0],[1,0],[0,1],[1,1]],color:1,uid:++s.uid},
      {cells:[[0,0],[0,1],[1,1]],color:3,uid:++s.uid}];
    if(mode==='prism')deal(s);
    return s;
  }
  function remember(s) {
    const prev=copy(s); prev.undoState=null;
    s.undoState=prev;
  }
  function rescue(s) {
    const removed=[];
    // One dense row opens a space of at least 8 contiguous squares.
    let best=0,occupied=-1;
    for(let y=0;y<8;y++){const n=s.board.slice(y*8,y*8+8).filter(Boolean).length;if(n>occupied){occupied=n;best=y;}}
    for(let x=0;x<8;x++){let i=best*8+x;if(s.board[i]){removed.push({i,color:s.board[i]});s.board[i]=0;}}
    s.rescues++; s.combo=0; s.grace=0; deal(s);
    return removed;
  }
  function updateStatus(s,event) {
    if(s.mode==='adventure'&&s.lines>=s.target&&s.bestCombo>=s.comboTarget&&s.gems>=s.gemTarget){s.status='won';return;}
    if(s.mode==='adventure'&&s.moves>=s.moveLimit){s.status='lost';return;}
    if(s.mode==='prism'&&s.moves>=s.moveLimit){s.status='won';return;}
    if(!hasMove(s)) {
      if(s.mode==='cozy')event.rescued=rescue(s);
      else s.status='stuck';
    } else s.status='playing';
  }
  function place(s,slot,x,y) {
    if(s.status!=='playing'||!Number.isInteger(slot)||slot<0||slot>2)return {ok:false};
    const p=s.tray[slot];
    if(!p||!fits(s.board,p.cells,x,y))return {ok:false};
    remember(s);
    const placed=[];
    p.cells.forEach(c=>{let i=(y+c[1])*N+x+c[0];s.board[i]=p.color;placed.push(i);});
    s.tray[slot]=null; s.moves++;
    const clear=lines(s.board), removed=clear.indices.map(i=>({i,color:s.board[i]}));
    let earned=p.cells.length*10,perfect=false;
    if(clear.count) {
      s.combo=s.grace>0?s.combo+1:1;
      s.grace=s.mode==='cozy'?3:2;
      s.bestCombo=Math.max(s.bestCombo,s.combo);
      s.lines+=clear.count;
      if(s.gemColor)s.gems+=removed.filter(o=>o.color===s.gemColor).length;
      s.charge=Math.min(MAX_CHARGE,s.charge+clear.count);
      earned+=120*clear.count*clear.count+40*(s.combo-1)*clear.count;
      clear.indices.forEach(i=>s.board[i]=0);
      if(!s.board.some(Boolean)){earned+=600;perfect=true;s.perfects++;}
    } else {
      s.grace=Math.max(0,s.grace-1);
      if(!s.grace)s.combo=0;
    }
    if(s.mode==='prism')earned*=1+Math.min(4,Math.floor(s.lines/5));
    s.score+=earned;
    if(s.tray.every(p=>!p))deal(s);
    const event={ok:true,placed,removed,clear,earned,perfect,combo:s.combo};
    updateStatus(s,event);
    return event;
  }
  function undo(s) {
    if(!s.undoState||s.undos<=0||s.status==='won')return {ok:false};
    const remaining=s.undos-1, shuffles=s.shuffles,prev=copy(s.undoState);
    Object.keys(s).forEach(k=>delete s[k]); Object.assign(s,prev);
    // Undo does not refund utility charges used after the move.
    s.undos=remaining; s.shuffles=Math.min(s.shuffles,shuffles);s.undoState=null;s.status='playing';
    return {ok:true};
  }
  function shuffle(s) {
    if(s.shuffles<=0||!['playing','stuck'].includes(s.status))return {ok:false};
    s.shuffles--;s.undoState=null;deal(s);
    const event={ok:true};updateStatus(s,event);return event;
  }
  function blast(s,x,y) {
    if(s.charge<MAX_CHARGE||!['playing','stuck'].includes(s.status)||!Number.isInteger(x)||!Number.isInteger(y)||x<0||x>7||y<0||y>7)return {ok:false};
    const removed=[];
    for(let yy=Math.max(0,y-1);yy<=Math.min(7,y+1);yy++)for(let xx=Math.max(0,x-1);xx<=Math.min(7,x+1);xx++) {
      let i=yy*8+xx;if(s.board[i])removed.push({i,color:s.board[i]});
    }
    if(!removed.length)return {ok:false};
    s.undoState=null;s.charge=0;s.blasts++;
    if(s.gemColor)s.gems+=removed.filter(o=>o.color===s.gemColor).length;
    removed.forEach(c=>s.board[c.i]=0);
    const earned=removed.length*20;s.score+=earned;
    const event={ok:true,removed,earned,blast:true};
    updateStatus(s,event);return event;
  }
  function rotate(s,slot,turns=1){
    if(s.mode!=='prism'||!['playing','stuck'].includes(s.status)||!Number.isInteger(slot)||slot<0||slot>2||!s.tray[slot])return {ok:false};
    s.tray[slot].cells=rotated(s.tray[slot].cells,turns);
    const ev={ok:true};updateStatus(s,ev);return ev;
  }
  function stars(s) {
    if(s.status!=='won')return 0;
    const used=s.moves/s.moveLimit;
    return used<=.6?3:used<=.85?2:1;
  }
  function validate(s) {
    if(!s||s.v!==VERSION||!['cozy','classic','adventure','prism'].includes(s.mode)||!['playing','stuck','won','lost'].includes(s.status))return false;
    if(!Array.isArray(s.board)||s.board.length!==64||!s.board.every(c=>Number.isInteger(c)&&c>=0&&c<=6))return false;
    if(!Array.isArray(s.tray)||s.tray.length!==3)return false;
    for(const p of s.tray)if(p) {
      if(!Number.isInteger(p.color)||p.color<1||p.color>6||!Array.isArray(p.cells)||!p.cells.length||p.cells.length>9)return false;
      const seen=new Set();
      for(const c of p.cells) {
        if(!Array.isArray(c)||c.length!==2||!c.every(v=>Number.isInteger(v)&&v>=0&&v<5)||seen.has(c.join(',')))return false;
        seen.add(c.join(','));
      }
    }
    for(const k of ['rng','score','lines','moves','combo','grace','bestCombo','charge','shuffles','undos','uid','hands','rescues','blasts','perfects','level','target','moveLimit','comboTarget','gemColor','gemTarget','gems'])if(!Number.isFinite(s[k])||s[k]<0||!Number.isInteger(s[k]))return false;
    if(s.charge>6||s.level<1||s.level>24||s.grace>3||typeof s.id!=='string')return false;
    if(s.mode==='adventure'){const z=levelSpec(s.level);if(s.target!==z.target||s.moveLimit!==z.moves||s.comboTarget!==z.comboTarget||s.gemColor!==z.gemColor||s.gemTarget!==z.gemTarget)return false;}
    if(s.mode==='prism'&&s.moveLimit!==40)return false;
    if(s.undoState && (!validate({...s.undoState,undoState:null})||s.undoState.id!==s.id))return false;
    return true;
  }
  function serialize(s){return JSON.stringify(s);}
  function restore(json){try{const s=JSON.parse(json);return validate(s)?s:null;}catch(_){return null;}}
  return {N,MAX_CHARGE,SHAPES,copy,dims,fits,positions,lines,simulate,hint,hasMove,newGame,deal,place,undo,shuffle,blast,stars,validate,serialize,restore,levelSpec,rotate,rotated,pool};
});

