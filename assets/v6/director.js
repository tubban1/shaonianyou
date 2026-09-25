const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=t=>t*t*(3-2*t);
const vec=(a,b,t)=>a.map((v,i)=>lerp(v,b[i],t));

export class Director {
  constructor(shots,{onShotChange}={}){
    this.shots=shots;
    this.onShotChange=onShotChange||(()=>{});
    this.current=null;
  }
  shotAt(t){
    let found=this.shots[0];
    for(const s of this.shots){ if(t>=s.t0) found=s; else break; }
    return found;
  }
  update(t){
    const shot=this.shotAt(t);
    if(!this.current||this.current.id!==shot.id){
      const prev=this.current;
      this.current=shot;
      this.onShotChange(shot,prev,t);
    }
    const raw=clamp((t-shot.t0)/Math.max(.001,shot.t1-shot.t0));
    const p=smooth(raw);
    const cam=shot.cam;
    return {
      shot,raw,p,
      camera:vec(cam.p0,cam.p1,p),
      look:vec(cam.l0,cam.l1,p),
      focus:lerp(shot.focus[0],shot.focus[1],p),
      warmth:lerp(shot.warmth[0],shot.warmth[1],p),
      exposure:lerp(shot.exposure[0],shot.exposure[1],p),
      music:lerp(shot.music[0],shot.music[1],p),
      boat:shot.actor?.boat?lerp(shot.actor.boat[0],shot.actor.boat[1],p):0
    };
  }
}
