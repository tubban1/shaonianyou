export const FILM_DURATION = 71.04;

const V = (x,y,z)=>[x,y,z];

export const shots = [
  {id:'river_hold',t0:0,t1:3.94,scene:0,title:'江上初见',fx:'mist',transition:'cut',
   cam:{p0:V(-.10,.06,7.62),p1:V(-.10,.06,7.62),l0:V(-.04,.01,0),l1:V(-.04,.01,0)},focus:[.73,.73],warmth:[-.16,-.16],exposure:[.90,.90],music:[.13,.13]},
  {id:'river_truck',t0:3.94,t1:7.79,scene:0,title:'江上初见',fx:'mist',
   cam:{p0:V(-.18,.06,7.58),p1:V(.14,.08,7.42),l0:V(-.08,.02,0),l1:V(.03,.02,0)},focus:[.68,.61],warmth:[-.15,-.14],exposure:[.91,.92],music:[.14,.15]},
  {id:'river_release',t0:7.79,t1:14.65,scene:0,title:'江上初见',fx:'mist',
   cam:{p0:V(.14,.08,7.42),p1:V(.20,.13,7.18),l0:V(.03,.02,0),l1:V(.10,-.02,0)},focus:[.61,.30],warmth:[-.14,-.13],exposure:[.92,.94],music:[.15,.16]},

  {id:'reeds_rack',t0:14.65,t1:20.34,scene:1,title:'芦洲寒水',fx:'reeds',transition:'fog',
   cam:{p0:V(.18,.02,7.38),p1:V(-.13,.10,7.58),l0:V(.08,-.04,0),l1:V(-.05,.00,0)},focus:[.82,.31],warmth:[-.18,-.16],exposure:[.92,.94],music:[.16,.17]},

  {id:'tower_reveal',t0:20.34,t1:23.54,scene:2,title:'重过南楼',fx:'rain',transition:'willow',
   cam:{p0:V(-.22,.10,7.56),p1:V(.10,.06,7.20),l0:V(-.12,.05,0),l1:V(.04,.02,0)},focus:[.66,.53],warmth:[-.11,-.08],exposure:[.91,.95],music:[.15,.17]},

  {id:'rope_low',t0:23.54,t1:26.88,scene:3,title:'柳下系舟',fx:'willow',
   cam:{p0:V(.17,-.05,7.28),p1:V(.09,-.01,7.20),l0:V(.11,-.16,0),l1:V(.05,-.10,0)},focus:[.78,.67],warmth:[-.12,-.11],exposure:[.93,.94],music:[.16,.16]},
  {id:'autumn_tilt',t0:26.88,t1:30.43,scene:3,title:'柳下系舟',fx:'willow',
   cam:{p0:V(.09,-.01,7.20),p1:V(-.10,.15,7.48),l0:V(.05,-.10,0),l1:V(-.02,.10,0)},focus:[.67,.44],warmth:[-.11,-.08],exposure:[.94,.96],music:[.16,.18]},

  {id:'memory_enter',t0:30.43,t1:33.03,scene:4,title:'旧梦回潮',fx:'petals',transition:'post',
   cam:{p0:V(-.10,.05,7.46),p1:V(-.03,.04,7.32),l0:V(-.04,.03,0),l1:V(.02,.02,0)},focus:[.56,.59],warmth:[.02,.34],exposure:[.94,1.03],music:[.18,.27]},
  {id:'memory_orbit',t0:33.03,t1:37.30,scene:4,title:'旧梦回潮',fx:'petals',
   cam:{p0:V(-.03,.04,7.32),p1:V(.14,.03,7.16),l0:V(.02,.02,0),l1:V(.07,.00,0)},focus:[.59,.64],warmth:[.34,.40],exposure:[1.03,1.06],music:[.27,.29]},
  {id:'memory_drain',t0:37.30,t1:40.16,scene:4,title:'旧梦回潮',fx:'petals',
   cam:{p0:V(.14,.03,7.16),p1:V(.14,.03,7.16),l0:V(.07,.00,0),l1:V(.07,.00,0)},focus:[.64,.57],warmth:[.40,.08],exposure:[1.06,.96],music:[.29,.17]},
  {id:'empty_seat',t0:40.16,t1:47.09,scene:4,title:'旧梦回潮',fx:'mist',
   cam:{p0:V(.14,.03,7.16),p1:V(.14,.03,7.16),l0:V(.07,.00,0),l1:V(.07,.00,0)},focus:[.57,.29],warmth:[.08,-.13],exposure:[.96,.91],music:[.17,.08]},

  {id:'ruin_impact',t0:47.09,t1:50.11,scene:5,title:'黄鹤断矶',fx:'rain',transition:'hard',
   cam:{p0:V(-.18,.13,7.46),p1:V(-.07,.07,7.30),l0:V(-.08,-.05,0),l1:V(-.01,-.03,0)},focus:[.63,.58],warmth:[-.22,-.22],exposure:[.88,.90],music:[.10,.09]},
  {id:'oldfriend_hold',t0:50.11,t1:53.41,scene:5,title:'故人今在否',fx:'rain',
   cam:{p0:V(-.07,.07,7.30),p1:V(-.07,.07,7.30),l0:V(-.01,-.03,0),l1:V(-.01,-.03,0)},focus:[.67,.25],warmth:[-.22,-.24],exposure:[.90,.88],music:[.08,.045]},

  {id:'oldcity_reveal',t0:53.41,t1:57.10,scene:6,title:'旧江山',fx:'mist',transition:'post',
   cam:{p0:V(.18,.04,7.34),p1:V(-.11,.10,7.58),l0:V(.09,.02,0),l1:V(-.05,.05,0)},focus:[.45,.34],warmth:[-.17,-.18],exposure:[.91,.92],music:[.09,.11]},

  {id:'wine_flower',t0:57.10,t1:58.30,scene:7,title:'桂花载酒',fx:'petals',transition:'fog',
   cam:{p0:V(-.08,.01,7.38),p1:V(-.05,.01,7.31),l0:V(-.04,-.02,0),l1:V(-.01,-.02,0)},focus:[.82,.75],warmth:[.12,.28],exposure:[.98,1.03],music:[.15,.21]},
  {id:'wine_pot',t0:58.30,t1:59.25,scene:7,title:'桂花载酒',fx:'petals',
   cam:{p0:V(-.05,.01,7.31),p1:V(.00,.01,7.24),l0:V(-.01,-.02,0),l1:V(.02,-.02,0)},focus:[.75,.57],warmth:[.28,.34],exposure:[1.03,1.05],music:[.21,.23]},
  {id:'wine_hand',t0:59.25,t1:61.10,scene:7,title:'桂花载酒',fx:'petals',
   cam:{p0:V(.00,.01,7.24),p1:V(.05,.02,7.18),l0:V(.02,-.02,0),l1:V(.04,-.01,0)},focus:[.57,.69],warmth:[.34,.33],exposure:[1.05,1.04],music:[.23,.20]},

  {id:'not_same',t0:61.10,t1:62.27,scene:8,title:'终不似',fx:'mist',transition:'fog',
   cam:{p0:V(.10,.07,7.43),p1:V(.10,.07,7.43),l0:V(.04,.01,0),l1:V(.04,.01,0)},focus:[.62,.62],warmth:[.20,-.18],exposure:[1.00,.88],music:[.11,.025]},
  {id:'silence_hold',t0:62.27,t1:63.05,scene:8,title:'终不似',fx:'mist',
   cam:{p0:V(.10,.07,7.43),p1:V(.10,.07,7.43),l0:V(.04,.01,0),l1:V(.04,.01,0)},focus:[.62,.56],warmth:[-.18,-.22],exposure:[.88,.87],music:[.02,.015]},
  {id:'youth_release',t0:63.05,t1:64.42,scene:8,title:'少年游',fx:'mist',
   cam:{p0:V(.10,.07,7.43),p1:V(.03,.10,7.80),l0:V(.04,.01,0),l1:V(.00,.02,0)},focus:[.56,.38],warmth:[-.22,-.20],exposure:[.87,.89],music:[.018,.025]},
  {id:'withdraw',t0:64.42,t1:65.75,scene:8,title:'少年游',fx:'mist',
   cam:{p0:V(.03,.10,7.80),p1:V(-.04,.13,8.18),l0:V(.00,.02,0),l1:V(-.03,.03,0)},focus:[.38,.31],warmth:[-.20,-.18],exposure:[.89,.90],music:[.025,.03]},
  {id:'departure',t0:65.75,t1:71.04,scene:8,title:'余音',fx:'mist',
   cam:{p0:V(-.04,.13,8.18),p1:V(-.04,.13,8.18),l0:V(-.03,.03,0),l1:V(-.03,.03,0)},focus:[.31,.22],warmth:[-.18,-.16],exposure:[.90,.88],music:[.03,.018],actor:{boat:[0,1]}}
];

export const captions = [
 {a:0,b:3.10,text:'二十年……可以改变多少事。'},
 {a:3.94,b:13.57,text:'一个人，从少年，走到暮色。<br>一座城，换了人间。可江水……仍旧这样流。'},
 {a:14.65,b:19.27,text:'芦叶满汀洲，寒沙带浅流。',poem:1},
 {a:20.34,b:22.92,text:'二十年重过南楼。',poem:1},
 {a:23.54,b:29.38,text:'柳下系船犹未稳，<br>能几日，又中秋。',poem:1},
 {a:30.43,b:36.30,text:'我们总以为，回到旧地，<br>就能把从前……也一并找回来。'},
 {a:37.30,b:45.67,text:'后来才知道——故地，可以重游。<br>故人……却未必还在。'},
 {a:47.09,b:49.35,text:'黄鹤断矶头。',poem:1},
 {a:50.11,b:52.27,text:'故人……今在否？',poem:1},
 {a:53.41,b:56.42,text:'旧江山，浑是新愁。',poem:1},
 {a:57.10,b:60.22,text:'欲买桂花同载酒。',poem:1},
 {a:61.10,b:62.27,text:'终不似……',poem:1},
 {a:63.05,b:64.42,text:'少年游。',poem:1},
 {a:65.75,b:70.65,text:'场景还在。<br>人生……却早已走远了。'}
];
