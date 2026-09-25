import * as THREE from '../v5/vendor/three.module.js';

const R=(a,b)=>a+Math.random()*(b-a);
const C={sky:0x6e7f87,skyTop:0x253844,water:0x36515d,earth:0x2e3732,stone:0x545b57,
wood:0x2c211a,roof:0x171b1a,robe:0x243038,warm:0xe3a55f,gold:0xd7b06b,reed:0x596351};

function std(color,rough=.96,metal=.0){return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});}
function fadeGroup(g,v){g.visible=v>.005;g.traverse(o=>{if(o.material){o.material.transparent=v<.999;o.material.opacity=v*(o.userData.baseOpacity??1)}})}
function smoothNoise(x,z){
 return Math.sin(x*.37+z*.23)*.42+Math.sin(x*.81-z*.33)*.19+Math.sin(x*.16+z*.71)*.12;
}
function terrainPatch(side){
 const nz=120,nu=26,verts=[],uvs=[],idx=[];
 for(let iz=0;iz<=nz;iz++){
  const z=10-(iz/nz)*34;
  const inner=side*(4.65+.55*Math.sin(z*.31)+.22*Math.sin(z*.79+1.2)+.12*Math.sin(z*1.63));
  const outer=side*14.7;
  for(let iu=0;iu<=nu;iu++){
   const u=iu/nu;
   const eased=u*u*(3-2*u);
   const x=inner+(outer-inner)*eased;
   const edgeRise=Math.pow(u,1.35)*.78;
   const shoreDip=Math.exp(-u*9)*.12;
   const y=-.09+edgeRise+smoothNoise(x,z)*(.03+.08*u)-shoreDip;
   verts.push(x,y,z-7);uvs.push(u,iz/nz);
  }
 }
 for(let iz=0;iz<nz;iz++)for(let iu=0;iu<nu;iu++){
  const a=iz*(nu+1)+iu,b=a+nu+1,c=b+1,d=a+1;idx.push(a,b,d,b,c,d);
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(idx);g.computeVertexNormals();
 const m=new THREE.MeshStandardMaterial({color:C.earth,roughness:1});
 const mesh=new THREE.Mesh(g,m);mesh.receiveShadow=true;return mesh;
}
function mountainTerrain(seed,zBase,yBase,amp,color,opacity){
 const g=new THREE.PlaneGeometry(48,15,150,42);g.rotateX(-Math.PI/2);
 const p=g.attributes.position;
 for(let i=0;i<p.count;i++){
  const x=p.getX(i),z=p.getZ(i);
  const nx=(x+24)/48,nz=(z+7.5)/15;
  const ridge=(Math.sin(nx*9.0+seed)*.34+Math.sin(nx*4.1+seed*1.8)*.58+Math.sin(nx*17.0+seed*.7)*.10);
  const depthFall=Math.pow(1-Math.abs(nz-.52)*1.6,1.35);
  const y=yBase+Math.max(0,depthFall)*(amp*(.78+ridge*.55)) + smoothNoise(x*.42,z*.55+seed)*.16;
  p.setY(i,y);
 }
 p.needsUpdate=true;g.computeVertexNormals();
 const m=new THREE.MeshStandardMaterial({color,roughness:1,transparent:true,opacity,depthWrite:false});
 const mesh=new THREE.Mesh(g,m);mesh.position.z=zBase;return mesh;
}
function curveTube(points,r,color,segments=24){
 const c=new THREE.CatmullRomCurve3(points);
 return new THREE.Mesh(new THREE.TubeGeometry(c,segments,r,6,false),std(color,1));
}
function boatHull(){
 const group=new THREE.Group();
 const verts=[],idx=[],nx=18,nz=8;
 for(let ix=0;ix<nx;ix++){
  const u=ix/(nx-1),x=(u-.5)*2.35;
  const taper=Math.sin(Math.PI*u);
  for(let iz=0;iz<nz;iz++){
   const v=iz/(nz-1),z=(v-.5)*.78*taper;
   const y=.11*Math.cos((v-.5)*Math.PI*1.65)-.11-.09*Math.pow(Math.abs(x)/1.18,1.5);
   verts.push(x,y,z);
  }
 }
 for(let ix=0;ix<nx-1;ix++)for(let iz=0;iz<nz-1;iz++){
  const a=ix*nz+iz,b=a+nz,c=b+1,d=a+1;idx.push(a,b,d,b,c,d);
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(idx);g.computeVertexNormals();
 const hull=new THREE.Mesh(g,std(0x32271f,1));group.add(hull);
 const ribs=new THREE.Group();
 for(let i=4;i<nx-3;i+=3){const x=(i/(nx-1)-.5)*2.35;const w=.78*Math.sin(Math.PI*i/(nx-1));const bar=curveTube([new THREE.Vector3(x,.02,-w*.46),new THREE.Vector3(x,.09,0),new THREE.Vector3(x,.02,w*.46)],.018,0x1e1915,10);ribs.add(bar)}
 group.add(ribs);
 const canopy=new THREE.Group();
 for(const x of [-.38,.38]){const arch=curveTube([new THREE.Vector3(x,.06,-.31),new THREE.Vector3(x,.55,0),new THREE.Vector3(x,.06,.31)],.022,0x3b3228,12);canopy.add(arch)}
 const roof=new THREE.Mesh(new THREE.PlaneGeometry(.94,.72,10,4),new THREE.MeshStandardMaterial({color:0x4a4034,roughness:1,side:THREE.DoubleSide}));
 roof.rotation.x=-Math.PI/2;roof.position.y=.52;canopy.add(roof);group.add(canopy);
 const glow=new THREE.PointLight(C.warm,2.0,5);glow.position.set(.62,.42,.05);group.add(glow);
 const lamp=new THREE.Mesh(new THREE.SphereGeometry(.055,16,10),new THREE.MeshBasicMaterial({color:C.warm}));lamp.position.copy(glow.position);group.add(lamp);
 group.userData.glow=glow;return group;
}
function robeFigure(color=0x243038,scale=1){
 const g=new THREE.Group();
 const profile=[new THREE.Vector2(.08,0),new THREE.Vector2(.30,.12),new THREE.Vector2(.36,.72),new THREE.Vector2(.26,1.22),new THREE.Vector2(.19,1.52),new THREE.Vector2(.11,1.58)];
 const body=new THREE.Mesh(new THREE.LatheGeometry(profile,24),std(color,1));body.position.y=0;g.add(body);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.155,24,16),std(0x282a28,1));head.scale.set(.92,1.08,.94);head.position.y=1.78;g.add(head);
 const hat=curveTube([new THREE.Vector3(-.18,1.95,0),new THREE.Vector3(0,2.02,0),new THREE.Vector3(.18,1.95,0)],.045,0x111514,10);g.add(hat);
 const sleeveL=curveTube([new THREE.Vector3(-.16,1.35,0),new THREE.Vector3(-.38,1.08,.02),new THREE.Vector3(-.36,.72,.03)],.07,color,10);
 const sleeveR=curveTube([new THREE.Vector3(.16,1.35,0),new THREE.Vector3(.34,1.06,.02),new THREE.Vector3(.30,.70,.03)],.07,color,10);
 g.add(sleeveL,sleeveR);g.scale.setScalar(scale);return g;
}
function roofSurface(w,d,h,color){
 const nx=26,nz=18,verts=[],idx=[];
 for(let ix=0;ix<nx;ix++){
  const u=ix/(nx-1),x=(u-.5)*w;
  for(let iz=0;iz<nz;iz++){
   const v=iz/(nz-1),z=(v-.5)*d;
   const ridge=h*(1-Math.abs(v-.5)*2);
   const eave=-.14*Math.pow(Math.abs(x)/(w*.5),2.2);
   verts.push(x,ridge+eave,z);
  }
 }
 for(let ix=0;ix<nx-1;ix++)for(let iz=0;iz<nz-1;iz++){const a=ix*nz+iz,b=a+nz,c=b+1,d0=a+1;idx.push(a,b,d0,b,c,d0)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(idx);g.computeVertexNormals();
 return new THREE.Mesh(g,std(color,1));
}
function wineFlask(){
 const p=[new THREE.Vector2(.12,0),new THREE.Vector2(.18,.05),new THREE.Vector2(.19,.28),new THREE.Vector2(.14,.42),new THREE.Vector2(.10,.47),new THREE.Vector2(.08,.65),new THREE.Vector2(.11,.69)];
 return new THREE.Mesh(new THREE.LatheGeometry(p,28),std(0x29241f,1));
}

export function createWorld(renderer){
 const scene=new THREE.Scene();scene.background=new THREE.Color(C.skyTop);scene.fog=new THREE.FogExp2(0x84949a,.022);
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.16;

 const hemi=new THREE.HemisphereLight(0xc1d0d4,0x202823,2.15);scene.add(hemi);
 const sun=new THREE.DirectionalLight(0xffe0b4,1.85);sun.position.set(-5,9,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-14;sun.shadow.camera.right=14;sun.shadow.camera.top=12;sun.shadow.camera.bottom=-12;scene.add(sun);

 const sky=new THREE.Mesh(new THREE.SphereGeometry(45,36,18),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,
  uniforms:{top:{value:new THREE.Color(C.skyTop)},bottom:{value:new THREE.Color(C.sky)},sunset:{value:new THREE.Color(0x9f8068)},warm:{value:0}},
  vertexShader:'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'uniform vec3 top;uniform vec3 bottom;uniform vec3 sunset;uniform float warm;varying vec3 p;void main(){float h=clamp(normalize(p).y*.65+.42,0.,1.);vec3 c=mix(bottom,top,pow(h,1.25));c=mix(c,sunset,warm*(1.-h)*.55);gl_FragColor=vec4(c,1.);}'}));scene.add(sky);

 const waterMat=new THREE.ShaderMaterial({uniforms:{uTime:{value:0},deep:{value:new THREE.Color(0x294653)},shallow:{value:new THREE.Color(0x91a8ad)},warm:{value:0}},
  vertexShader:'uniform float uTime;varying vec3 wp;varying vec3 nrm;varying float wave;void main(){vec3 p=position;float a=p.y*1.55+uTime*.48;float b=p.x*2.55-p.y*.38+uTime*.31;wave=sin(a)*.038+sin(b)*.024;p.z+=wave;vec3 n=normalize(vec3(-cos(b)*.061,-cos(a)*.059,1.0));vec4 w=modelMatrix*vec4(p,1.);wp=w.xyz;nrm=normalize(mat3(modelMatrix)*n);gl_Position=projectionMatrix*viewMatrix*w;}',
  fragmentShader:'uniform vec3 deep;uniform vec3 shallow;uniform float warm;varying vec3 wp;varying vec3 nrm;varying float wave;void main(){vec3 v=normalize(cameraPosition-wp);float fres=pow(1.0-max(0.0,dot(v,nrm)),2.2);float bands=.5+.5*sin(wp.z*2.3+wp.x*.55+wave*38.0);float glint=pow(max(0.0,dot(reflect(normalize(vec3(.35,-.8,.28)),nrm),v)),18.0);vec3 c=mix(deep,shallow,.28+fres*.46+bands*.10);c+=vec3(.23,.25,.24)*glint*.55;c+=vec3(.11,.055,.018)*warm;gl_FragColor=vec4(c,1.0);}'
 });
 const water=new THREE.Mesh(new THREE.PlaneGeometry(13.5,36,90,190),waterMat);water.rotation.x=-Math.PI/2;water.position.set(0,-.08,-7);water.receiveShadow=true;scene.add(water);
 scene.add(terrainPatch(-1),terrainPatch(1));
 const mountains=new THREE.Group();mountains.add(mountainTerrain(1.1,-25,-.2,5.6,0x52686e,.27),mountainTerrain(2.8,-21,-.35,4.3,0x40555c,.36),mountainTerrain(5.2,-17,-.5,3.2,0x31464c,.50));scene.add(mountains);

 const reeds=new THREE.Group(),reedData=[];scene.add(reeds);
 for(let i=0;i<165;i++){
  const side=Math.random()<.5?-1:1,x=side*R(5.0,8.8),z=R(-19,7),h=R(.8,2.15);
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(R(-.05,.05),h*.55,0),new THREE.Vector3(R(-.12,.12),h,0)]);
  const stem=new THREE.Mesh(new THREE.TubeGeometry(curve,8,.011,5,false),std(C.reed,1));
  const head=new THREE.Mesh(new THREE.SphereGeometry(.06,8,5),std(0x80745c,1));head.scale.set(.55,2.2,.55);head.position.copy(curve.getPoint(1));stem.add(head);
  stem.position.set(x,0,z);stem.userData.phase=R(0,6.28);stem.userData.amp=R(.012,.04);reeds.add(stem);reedData.push(stem);
 }

 const willow=new THREE.Group();willow.position.set(-5.9,0,-4.2);scene.add(willow);
 const trunk=curveTube([new THREE.Vector3(0,0,0),new THREE.Vector3(.1,2.0,.1),new THREE.Vector3(-.15,4.2,.1),new THREE.Vector3(.3,6.0,0)],.24,0x31271f,30);willow.add(trunk);
 const willowBranches=[];
 for(let i=0;i<34;i++){
  const a=R(-2.8,.4),r=R(1.7,4.3),y=R(4.3,6.1);
  const b=curveTube([new THREE.Vector3(0,y,0),new THREE.Vector3(Math.cos(a)*r*.45,y-R(.2,.8),Math.sin(a)*r*.25),new THREE.Vector3(Math.cos(a)*r,y-R(1.8,4.4),Math.sin(a)*r*.5)],R(.018,.035),0x29271f,16);willow.add(b);willowBranches.push(b);
 }

 const tower=new THREE.Group();tower.position.set(6.2,0,-7.7);scene.add(tower);
 const plaster=std(0x6b6960,1),wood=std(C.wood,1);
 for(let floor=0;floor<2;floor++){
  const y=floor*2.12;
  const wall=new THREE.Mesh(new THREE.BoxGeometry(3.15,1.45,2.15),plaster);wall.position.y=y+1.13;tower.add(wall);
  for(const x of [-1.55,1.55])for(const z of [-1.05,1.05]){const c=curveTube([new THREE.Vector3(x,y+.1,z),new THREE.Vector3(x+R(-.02,.02),y+2.05,z)],.065,0x34251d,8);tower.add(c)}
  const roof=roofSurface(4.9,3.35,.78,C.roof);roof.position.y=y+2.28;tower.add(roof);
 }
 const towerLights=[];for(const p of [[-1.15,2.0,1.2],[1.15,2.0,1.2],[-1.15,4.08,1.2],[1.15,4.08,1.2]]){const l=new THREE.PointLight(C.warm,1.45,4);l.position.set(...p);tower.add(l);towerLights.push(l)}

 const boat=boatHull();boat.position.set(1.4,.08,-6.2);scene.add(boat);
 const traveler=robeFigure(C.robe,1.02);traveler.position.set(-1.3,0,-3.6);scene.add(traveler);
 const youthA=robeFigure(0x36464a,.92),youthB=robeFigure(0x50443b,.92);scene.add(youthA,youthB);

 const memory=new THREE.Group();scene.add(memory);
 const table=new THREE.Mesh(new THREE.CylinderGeometry(1.02,1.02,.1,40),std(0x3a2a20,1));table.scale.z=.82;table.position.set(0,.78,-1.55);memory.add(table);
 const flask=wineFlask();flask.position.set(.05,.86,-1.52);memory.add(flask);
 const cup=new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(.07,0),new THREE.Vector2(.11,.02),new THREE.Vector2(.12,.12),new THREE.Vector2(.10,.16)],24),std(0x8b806f,1));cup.position.set(.38,.86,-1.42);memory.add(cup);
 const memoryLight=new THREE.PointLight(0xf0aa62,3.8,8);memoryLight.position.set(-1.8,3.2,.8);memory.add(memoryLight);
 youthA.position.set(-.9,0,-1.9);youthB.position.set(.9,0,-1.9);

 const ruin=new THREE.Group();ruin.position.set(3.6,0,-5.2);scene.add(ruin);
 for(let i=0;i<9;i++){const g=new THREE.DodecahedronGeometry(R(.35,.72),0);const b=new THREE.Mesh(g,std(C.stone,1));b.scale.set(R(1.2,2.1),R(.25,.45),R(.9,1.6));b.position.set(R(-1.7,1.7),R(.04,.25),-i*.48+R(-.2,.2));b.rotation.set(R(-.2,.2),R(-.7,.7),R(-.15,.15));ruin.add(b)}

 const city=new THREE.Group();city.position.set(0,0,-13);scene.add(city);
 for(let i=0;i<24;i++){const g=new THREE.Group(),x=R(-9,9),z=R(-4,3),w=R(.65,1.5),h=R(.55,1.35);const body=new THREE.Mesh(new THREE.BoxGeometry(w,h,w*.72),std(0x505047,1));body.position.y=h/2;g.add(body);const rr=roofSurface(w*1.35,w*.95,.28,C.roof);rr.position.y=h+.12;g.add(rr);g.position.set(x,0,z);city.add(g)}

 const mist=new THREE.Group(),mistData=[];scene.add(mist);
 const cv=document.createElement('canvas');cv.width=256;cv.height=128;const cx=cv.getContext('2d'),gr=cx.createRadialGradient(128,64,4,128,64,124);
 gr.addColorStop(0,'rgba(225,233,231,.22)');gr.addColorStop(.5,'rgba(194,208,207,.08)');gr.addColorStop(1,'rgba(170,190,190,0)');cx.fillStyle=gr;cx.fillRect(0,0,256,128);const mt=new THREE.CanvasTexture(cv);
 for(let i=0;i<20;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:mt,transparent:true,depthWrite:false,opacity:R(.05,.12)}));sp.position.set(R(-8,8),R(.25,2.4),R(-19,3));sp.scale.set(R(4.5,10),R(.6,1.6),1);mist.add(sp);mistData.push(sp)}

 function pts(n,color,size,ymax){const a=new Float32Array(n*3);for(let i=0;i<n;i++){a[i*3]=R(-9,9);a[i*3+1]=R(.2,ymax);a[i*3+2]=R(-14,5)}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(a,3));return new THREE.Points(g,new THREE.PointsMaterial({color,size,transparent:true,opacity:.42,depthWrite:false}))}
 const rain=pts(1200,0xdce6e6,.018,9),petals=pts(280,0xe4b56c,.04,6);scene.add(rain,petals);

 const hand=new THREE.Group();scene.add(hand);
 const sleeve=curveTube([new THREE.Vector3(1.6,0,0),new THREE.Vector3(.85,.02,0),new THREE.Vector3(.28,.04,0)],.15,C.robe,14);hand.add(sleeve);
 const palm=new THREE.Mesh(new THREE.SphereGeometry(.15,18,12),std(0x806b5d,1));palm.scale.set(1.35,.65,.85);hand.add(palm);hand.position.set(1.7,1.25,-1.35);

 const state={sky,waterMat,hemi,sun,reeds,reedData,willow,willowBranches,tower,towerLights,boat,traveler,youthA,youthB,memory,memoryLight,flask,cup,hand,ruin,city,mist,mistData,rain,petals,sceneId:0};
 function showFor(id){
  state.sceneId=id;tower.visible=id===2;willow.visible=id===3;memory.visible=id===4||id===7;youthA.visible=id===4;youthB.visible=id===4;ruin.visible=id===5;city.visible=id===6;hand.visible=id===7;rain.visible=id===5;petals.visible=id===4||id===7;traveler.visible=!([4,7,8].includes(id));reeds.visible=id===0||id===1||id===8;boat.visible=id===0||id===1||id===3||id===8;
  if(id===0){traveler.position.set(-4.45,0,-3.9);boat.position.set(1.55,.08,-7.5)}
  if(id===1){traveler.position.set(-4.65,0,-5.1);boat.position.set(1.1,.08,-8.4)}
  if(id===2)traveler.position.set(4.25,0,-5.9);
  if(id===3){traveler.position.set(-3.9,0,-3.6);boat.position.set(-2.0,.08,-4.7)}
  if(id===5)traveler.position.set(3.35,.1,-5.0);
  if(id===6)traveler.position.set(-4.4,0,-4.2);
  if(id===8)boat.position.set(.4,.08,-5.5);
 }
 showFor(0);
 return {scene,state,showFor};
}

export function updateWorld(world,t,dt,st){
 const s=world.state,shot=st.shot;s.waterMat.uniforms.uTime.value=t;
 s.reedData.forEach(g=>g.rotation.z=Math.sin(t*.75+g.userData.phase)*g.userData.amp);
 s.willowBranches.forEach((b,i)=>b.rotation.z=Math.sin(t*.35+i*.7)*.005);
 s.mistData.forEach((m,i)=>{m.position.x+=dt*(.018+(i%5)*.003);if(m.position.x>9)m.position.x=-9;m.material.opacity=.05+.025*Math.sin(t*.13+i)});
 if(s.rain.visible){const a=s.rain.geometry.attributes.position.array;for(let i=0;i<a.length;i+=3){a[i]-=dt*.5;a[i+1]-=dt*5.2;if(a[i+1]<0){a[i+1]=9;a[i]=R(-9,9)}}s.rain.geometry.attributes.position.needsUpdate=true}
 if(s.petals.visible){const a=s.petals.geometry.attributes.position.array;for(let i=0;i<a.length;i+=3){a[i]+=dt*.13;a[i+1]-=dt*.18;if(a[i+1]<.2){a[i+1]=6;a[i]=R(-7,7)}}s.petals.geometry.attributes.position.needsUpdate=true}
 const warm=Math.max(0,st.warmth);s.sun.color.setRGB(1,.89+warm*.07,.75+warm*.15);s.sun.intensity=1.6+warm*1.7;s.hemi.intensity=1.9+warm*.65;s.sky.material.uniforms.warm.value=warm;s.waterMat.uniforms.warm.value=warm;s.memoryLight.intensity=s.memory.visible?2.0+warm*4.5:0;
 if(shot.id==='memory_drain'||shot.id==='empty_seat')s.youthB.position.x=Math.min(3.3,s.youthB.position.x+dt*.55);
 if(shot.id==='memory_enter'){s.youthB.position.x=.9;s.youthA.position.x=-.9}
 if(shot.id==='wine_flower')s.hand.position.x=1.7;
 if(shot.id==='wine_pot')s.hand.position.x=Math.max(1.05,s.hand.position.x-dt*.35);
 if(shot.id==='wine_hand')s.hand.position.x=Math.max(.45,s.hand.position.x-dt*.42);
 if(shot.id==='not_same'||shot.id==='silence_hold')s.hand.position.x=.45;
 if(shot.id==='youth_release'||shot.id==='withdraw')s.hand.position.x=Math.min(1.8,s.hand.position.x+dt*.65);
 if(shot.id==='departure'){const p=st.boat;s.boat.position.z=-5.5-p*12;s.boat.position.x=.4+p*.45;s.boat.scale.setScalar(1-p*.60);s.boat.userData.glow.intensity=2*(1-p*.7)}
}
