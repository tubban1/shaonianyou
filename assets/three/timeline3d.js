import {captions,FILM_DURATION} from './timeline.js';

const V=(x,y,z)=>[x,y,z];
export {captions,FILM_DURATION};
export const shots3D=[
{id:'river_hold',t0:0,t1:3.94,scene:0,title:'江上初见',fx:'mist',cam:{p0:V(-1.8,1.82,7.5),p1:V(-1.8,1.82,7.5),l0:V(-2.7,.82,-4.5),l1:V(-2.7,.82,-4.5)},warmth:[-.12,-.12],exposure:[1.12,1.12],music:[.13,.13],focus:[0,0]},
{id:'river_truck',t0:3.94,t1:7.79,scene:0,title:'江上初见',cam:{p0:V(-1.8,1.82,7.5),p1:V(-.9,1.96,6.8),l0:V(-2.7,.82,-4.5),l1:V(-1.7,.75,-6.2)},warmth:[-.12,-.10],exposure:[1.12,1.15],music:[.14,.15],focus:[0,0]},
{id:'river_release',t0:7.79,t1:14.65,scene:0,title:'江上初见',cam:{p0:V(-.9,1.96,6.8),p1:V(.15,2.15,6.0),l0:V(-1.7,.75,-6.2),l1:V(.65,.32,-10.5)},warmth:[-.10,-.08],exposure:[1.15,1.17],music:[.15,.16],focus:[0,0]},
{id:'reeds_rack',t0:14.65,t1:20.34,scene:1,title:'芦洲寒水',cam:{p0:V(-3.9,1.10,3.4),p1:V(-2.4,1.52,4.2),l0:V(-4.8,.72,-2.2),l1:V(.5,.35,-9.2)},warmth:[-.13,-.10],exposure:[1.12,1.16],music:[.16,.17],focus:[0,0]},
{id:'tower_reveal',t0:20.34,t1:23.54,scene:2,title:'重过南楼',cam:{p0:V(1.2,2.2,4.8),p1:V(2.2,2.45,3.8),l0:V(6,2,-7.5),l1:V(6,2.4,-7.5)},warmth:[-.06,.02],exposure:[1.1,1.16],music:[.15,.17],focus:[0,0]},
{id:'rope_low',t0:23.54,t1:26.88,scene:3,title:'柳下系舟',cam:{p0:V(-5.7,.72,1.8),p1:V(-4.8,.8,1.0),l0:V(-2,.25,-4.5),l1:V(-2,.2,-4.8)},warmth:[-.08,-.05],exposure:[1.1,1.13],music:[.16,.16],focus:[0,0]},
{id:'autumn_tilt',t0:26.88,t1:30.43,scene:3,title:'柳下系舟',cam:{p0:V(-4.8,.8,1.0),p1:V(-4.0,2.0,2.5),l0:V(-2,.2,-4.8),l1:V(-2,1.2,-6)},warmth:[-.05,-.02],exposure:[1.13,1.16],music:[.16,.18],focus:[0,0]},
{id:'memory_enter',t0:30.43,t1:33.03,scene:4,title:'旧梦回潮',cam:{p0:V(-3.2,2.0,4.2),p1:V(-2.4,1.85,3.5),l0:V(0,.9,-1.5),l1:V(0,.9,-1.5)},warmth:[.05,.35],exposure:[1.12,1.24],music:[.18,.27],focus:[0,0]},
{id:'memory_orbit',t0:33.03,t1:37.30,scene:4,title:'旧梦回潮',cam:{p0:V(-2.4,1.85,3.5),p1:V(2.0,1.8,3.2),l0:V(0,.9,-1.5),l1:V(0,.9,-1.5)},warmth:[.35,.42],exposure:[1.24,1.28],music:[.27,.29],focus:[0,0]},
{id:'memory_drain',t0:37.30,t1:40.16,scene:4,title:'旧梦回潮',cam:{p0:V(2,1.8,3.2),p1:V(2,1.8,3.2),l0:V(0,.9,-1.5),l1:V(0,.9,-1.5)},warmth:[.42,.08],exposure:[1.28,1.12],music:[.29,.17],focus:[0,0]},
{id:'empty_seat',t0:40.16,t1:47.09,scene:4,title:'旧梦回潮',cam:{p0:V(2,1.8,3.2),p1:V(2,1.8,3.2),l0:V(0,.9,-1.5),l1:V(.8,.9,-1.5)},warmth:[.08,-.10],exposure:[1.12,1.06],music:[.17,.08],focus:[0,0]},
{id:'ruin_impact',t0:47.09,t1:50.11,scene:5,title:'黄鹤断矶',cam:{p0:V(-1.8,1.0,3.8),p1:V(-.6,1.2,2.9),l0:V(3.4,.5,-5),l1:V(3.6,.7,-5.5)},warmth:[-.18,-.18],exposure:[1.04,1.06],music:[.10,.09],focus:[0,0]},
{id:'oldfriend_hold',t0:50.11,t1:53.41,scene:5,title:'故人今在否',cam:{p0:V(-.6,1.2,2.9),p1:V(-.6,1.2,2.9),l0:V(3.6,.7,-5.5),l1:V(.8,.4,-10)},warmth:[-.18,-.2],exposure:[1.06,1.04],music:[.08,.045],focus:[0,0]},
{id:'oldcity_reveal',t0:53.41,t1:57.10,scene:6,title:'旧江山',cam:{p0:V(-6.0,3.0,3.5),p1:V(-3.2,3.2,2.8),l0:V(0,1,-13),l1:V(0,1,-13)},warmth:[-.12,-.12],exposure:[1.08,1.1],music:[.09,.11],focus:[0,0]},
{id:'wine_flower',t0:57.10,t1:58.30,scene:7,title:'桂花载酒',cam:{p0:V(-2.4,1.55,2.4),p1:V(-1.8,1.45,2.0),l0:V(0,1,-1.5),l1:V(.05,1,-1.5)},warmth:[.14,.28],exposure:[1.16,1.24],music:[.15,.21],focus:[0,0]},
{id:'wine_pot',t0:58.30,t1:59.25,scene:7,title:'桂花载酒',cam:{p0:V(-1.8,1.45,2),p1:V(-1.3,1.38,1.65),l0:V(.05,1,-1.5),l1:V(.1,1,-1.5)},warmth:[.28,.34],exposure:[1.24,1.28],music:[.21,.23],focus:[0,0]},
{id:'wine_hand',t0:59.25,t1:61.10,scene:7,title:'桂花载酒',cam:{p0:V(-1.3,1.38,1.65),p1:V(-1.0,1.34,1.45),l0:V(.1,1,-1.5),l1:V(.25,1.05,-1.4)},warmth:[.34,.32],exposure:[1.28,1.25],music:[.23,.20],focus:[0,0]},
{id:'not_same',t0:61.10,t1:62.27,scene:7,title:'终不似',cam:{p0:V(-1,1.34,1.45),p1:V(-1,1.34,1.45),l0:V(.25,1.05,-1.4),l1:V(.25,1.05,-1.4)},warmth:[.26,-.12],exposure:[1.22,1.05],music:[.11,.025],focus:[0,0]},
{id:'silence_hold',t0:62.27,t1:63.05,scene:7,title:'终不似',cam:{p0:V(-1,1.34,1.45),p1:V(-1,1.34,1.45),l0:V(.25,1.05,-1.4),l1:V(.25,1.05,-1.4)},warmth:[-.12,-.16],exposure:[1.05,1.03],music:[.02,.015],focus:[0,0]},
{id:'youth_release',t0:63.05,t1:64.42,scene:8,title:'少年游',cam:{p0:V(-1.2,1.4,4.0),p1:V(-1.2,1.65,6.4),l0:V(.4,.4,-5.5),l1:V(.4,.35,-7)},warmth:[-.16,-.14],exposure:[1.06,1.08],music:[.018,.025],focus:[0,0]},
{id:'withdraw',t0:64.42,t1:65.75,scene:8,title:'少年游',cam:{p0:V(-1.2,1.65,6.4),p1:V(-1.1,1.9,8.1),l0:V(.4,.35,-7),l1:V(.4,.3,-8)},warmth:[-.14,-.12],exposure:[1.08,1.08],music:[.025,.03],focus:[0,0]},
{id:'departure',t0:65.75,t1:71.04,scene:8,title:'余音',cam:{p0:V(-1.1,1.9,8.1),p1:V(-1.1,1.9,8.1),l0:V(.4,.3,-8),l1:V(.6,.25,-14)},warmth:[-.12,-.10],exposure:[1.08,1.04],music:[.03,.018],actor:{boat:[0,1]},focus:[0,0]}
];
