import * as THREE from '../v5/vendor/three.module.js';
import {Director} from './director.js';
import {shots3D,captions,FILM_DURATION} from './timeline3d.js';
import {createWorld,updateWorld} from './world.js';

const $=s=>document.querySelector(s);
const canvas=$('#threeCanvas'),intro=$('#intro'),enter=$('#enter'),loadState=$('#loadState'),
voice=$('#voice'),score=$('#score'),caption=$('#caption'),chapter=$('#chapter'),sound=$('#sound'),
progress=$('#progress'),seal=$('#seal'),replay=$('#replay'),fade=$('#fade'),mistVeil=$('#mistVeil');

const TEST_MUTE=new URLSearchParams(location.search).get('mute')==='1';
let muted=TEST_MUTE,started=false,ended=false,currentCaption=-1,currentScene=0,transitionPulse=0;
let last=performance.now(),envCtx=null,envGain=null;

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<700?1.35:1.65));
renderer.setSize(innerWidth,innerHeight,false);

const world=createWorld(renderer);
const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,80);
camera.position.set(-3.8,2,7.8);
camera.lookAt(-.8,1,-4);

function resize(){
 camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
 renderer.setSize(innerWidth,innerHeight,false);
}
addEventListener('resize',resize);

const director=new Director(shots3D,{onShotChange:(shot,prev)=>{
 if(!prev||prev.scene!==shot.scene){
   currentScene=shot.scene;
   if(shot.transition!=='hard'){transitionPulse=1;mistVeil.style.opacity='.32';setTimeout(()=>mistVeil.style.opacity='0',680)}
   world.showFor(shot.scene);
   chapter.classList.remove('show');
   setTimeout(()=>{chapter.textContent=shot.title;chapter.classList.add('show');setTimeout(()=>chapter.classList.remove('show'),1400)},120);
 }
}});

function captionAt(t){
 let idx=-1;for(let i=0;i<captions.length;i++)if(t>=captions[i].a&&t<captions[i].b)idx=i;
 if(idx===currentCaption)return;currentCaption=idx;caption.classList.remove('show');
 if(idx<0){setTimeout(()=>caption.innerHTML='',220);return}
 const c=captions[idx];setTimeout(()=>{caption.innerHTML=c.text;caption.className=c.poem?'poem':'';requestAnimationFrame(()=>caption.classList.add('show'))},c.poem?220:130);
}
function createEnv(){
 if(TEST_MUTE)return;
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;envCtx=new AC();envGain=envCtx.createGain();envGain.gain.value=.008;envGain.connect(envCtx.destination);
 const b=envCtx.createBuffer(1,envCtx.sampleRate*2,envCtx.sampleRate),d=b.getChannelData(0);
 for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(.48+.52*Math.sin(i*.00012));
 const src=envCtx.createBufferSource(),f=envCtx.createBiquadFilter();src.buffer=b;src.loop=true;f.type='lowpass';f.frequency.value=430;src.connect(f).connect(envGain);src.start();
}
function applyDirector(st,t,now){
 const hold=st.shot.id.includes('hold')||st.shot.id==='not_same';
 const breath=hold?0:.010;
 camera.position.set(
  st.camera[0]+Math.sin(now*.00037)*breath,
  st.camera[1]+Math.sin(now*.00029+1.2)*breath*.55,
  st.camera[2]
 );
 const target=new THREE.Vector3(st.look[0],st.look[1],st.look[2]);
 if(!hold){target.x+=Math.sin(now*.00019)*.018;target.y+=Math.sin(now*.00017+.7)*.009}
 camera.lookAt(target);
 renderer.toneMappingExposure=st.exposure;
 score.volume=(muted||TEST_MUTE)?0:st.music;
 voice.volume=(muted||TEST_MUTE)?0:1;
 if(envGain)envGain.gain.setTargetAtTime(muted?0:.008,envCtx.currentTime,.2);
 updateWorld(world,t,.016,st);
}
function render(now){
 const dt=Math.min((now-last)/1000,.05);last=now;
 let st;
 if(started&&!ended){
  const t=voice.currentTime;st=director.update(t);applyDirector(st,t,now);updateWorld(world,t,dt,st);captionAt(t);
  progress.style.width=Math.min(100,t/FILM_DURATION*100)+'%';
  if(t>=63.0)seal.style.opacity='1';
 }else{
  // Living opening frame: no frozen hero image.
  const idleState={shot:shots3D[0],warmth:-.12,exposure:1.08,music:0,boat:0};
  updateWorld(world,now/1000,dt,idleState);
  camera.position.x=-3.8+Math.sin(now*.00012)*.035;
  camera.position.y=2.0+Math.sin(now*.00010+.5)*.012;
  camera.lookAt(-.8,1,-4);
 }
 renderer.render(world.scene,camera);
 requestAnimationFrame(render);
}
requestAnimationFrame(render);

async function startFilm(){
 if(started)return;started=true;ended=false;director.current=null;currentCaption=-1;seal.style.opacity='0';fade.style.opacity='0';replay.classList.remove('show');
 createEnv();intro.style.opacity='0';setTimeout(()=>intro.style.display='none',1300);
 voice.currentTime=0;score.currentTime=0;voice.muted=muted||TEST_MUTE;score.muted=muted||TEST_MUTE;
 score.play().catch(()=>{});voice.play().catch(()=>{});
}
enter.onclick=startFilm;
sound.onclick=()=>{muted=!muted;sound.textContent=muted?'声音关闭':'声音开启';voice.muted=muted||TEST_MUTE;score.muted=muted||TEST_MUTE;if(envGain)envGain.gain.setTargetAtTime(muted?0:.008,envCtx.currentTime,.18)};
voice.onended=()=>{ended=true;caption.classList.remove('show');progress.style.width='100%';score.volume=muted?0:.015;setTimeout(()=>fade.style.opacity='.42',1400);setTimeout(()=>replay.classList.add('show'),3000)};
replay.onclick=()=>{ended=false;started=true;director.current=null;currentScene=0;currentCaption=-1;fade.style.opacity='0';seal.style.opacity='0';replay.classList.remove('show');world.showFor(0);voice.currentTime=0;score.currentTime=0;voice.play().catch(()=>{});score.play().catch(()=>{})};

enter.disabled=false;loadState.textContent='纯 Three.js 世界已就绪';
