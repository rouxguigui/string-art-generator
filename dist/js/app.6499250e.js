(function(t){function e(e){for(var n,o,r=e[0],l=e[1],c=e[2],d=0,h=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&h.push(i[o][0]),i[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(h.length)h.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,r=1;r<a.length;r++){var l=a[r];0!==i[l]&&(n=!1)}n&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},i={app:0},s=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/string-art-generator/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("home")],1)},s=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"home"}},[a("div",{staticClass:"properties-panel",class:{extended:t.menuExtended}},[a("div",{staticClass:"properties-group",attrs:{id:"properties"}},[t.menuExtended?a("b-btn",{staticClass:"float-right",attrs:{size:"sm",variant:"transparent"},on:{click:function(e){t.menuExtended=!1}}},[a("i",{staticClass:"fas fa-arrow-right"})]):t._e(),a("h4",[t._v("Propriétés")]),t.layerSelected?a("div",{staticClass:"content"},[a("b-form-group",[a("b-input-group",[a("b-input-group-text",[t._v("Nom")]),a("b-input",{attrs:{type:"text"},model:{value:t.layerSelected.name,callback:function(e){t.$set(t.layerSelected,"name",e)},expression:"layerSelected.name"}})],1)],1),a("b-form-group",[a("b-input-group",[a("b-input-group-text",[t._v("Couleur")]),a("b-input",{attrs:{type:"color"},model:{value:t.layerSelected.color,callback:function(e){t.$set(t.layerSelected,"color",e)},expression:"layerSelected.color"}})],1)],1)],1):a("div",{staticClass:"content"},[a("b-form-group",[a("b-input-group",[a("b-input-group-text",[t._v("Forme de base")]),a("b-select",{model:{value:t.board.shape,callback:function(e){t.$set(t.board,"shape",e)},expression:"board.shape"}},[a("option",{attrs:{value:"circle"}},[t._v("Cercle")])])],1)],1),a("b-form-group",[a("b-input-group",[a("b-input-group-text",[t._v("Rayon (cm)")]),a("b-input",{attrs:{type:"number",min:"1",max:"150",step:"1"},model:{value:t.board.radius,callback:function(e){t.$set(t.board,"radius",t._n(e))},expression:"board.radius"}})],1)],1),a("b-form-group",[a("b-input-group",[a("b-input-group-text",[t._v("Nombre de clous")]),a("b-select",{model:{value:t.board.nails,callback:function(e){t.$set(t.board,"nails",t._n(e))},expression:"board.nails"}},t._l(999,(function(e){return a("option",{key:"nail-"+e,domProps:{value:e+1}},[t._v(t._s(e+1))])})),0)],1)],1),a("b-form-group",[a("b-input-group",[a("b-input-group-text",[t._v("Taille")]),a("b-input",{attrs:{type:"number",min:"1",max:"150",step:"1"},model:{value:t.board.width,callback:function(e){t.$set(t.board,"width",t._n(e))},expression:"board.width"}}),a("b-input-group-text",[t._v(" x")]),a("b-input",{attrs:{type:"number",min:"1",max:"150",step:"1"},model:{value:t.board.height,callback:function(e){t.$set(t.board,"height",t._n(e))},expression:"board.height"}})],1)],1)],1)],1),a("div",{staticClass:"properties-group",attrs:{id:"layers"}},[a("h4",[t._v("Couches")]),a("div",{staticClass:"content"},[a("div",{staticClass:"layer",class:{active:null===t.layerSelected},on:{click:function(e){t.layerSelected=null}}},[a("div",{staticClass:"visibility"}),a("div",{staticClass:"name"},[t._v(" Board ")])]),t._l(t.layers,(function(e,n){return a("div",{key:"index-"+n,staticClass:"layer",class:{active:t.layerSelected===e},on:{click:function(a){t.layerSelected=e}}},[a("div",{staticClass:"visibility",on:{click:function(t){t.stopPropagation(),e.visible=!e.visible}}},[e.visible?a("i",{staticClass:"fas fa-eye fa-fw"}):a("i",{staticClass:"fas fa-eye-slash fa-fw"})]),a("div",{staticClass:"name"},[t._v(" "+t._s(e.name)+" ")]),a("div",{staticClass:"color"},[a("i",{staticClass:"fas fa-dot-circle",style:{color:e.color}})])])}))],2)]),a("div",{staticClass:"properties-group hide-sm",attrs:{id:"options"}},[a("h4",[t._v("Options")]),a("div",{staticClass:"content"},[a("b-form-group",{attrs:{label:"Zoom"}},[a("b-form-spinbutton",{attrs:{size:"sm",step:"0.1",min:"0.1",max:"3"},model:{value:t.zoom,callback:function(e){t.zoom=t._n(e)},expression:"zoom"}})],1)],1)]),a("div",{staticClass:"mobile-controls d-flex flex-column h-100 justify-content-end my-2"},[a("b-btn",{attrs:{size:"sm",block:"",variant:"outline-white"},on:{click:function(e){t.zoom>.1&&(t.zoom+=.1)}}},[a("i",{staticClass:"fas fa-plus"})]),a("b-btn",{attrs:{size:"sm",block:"",variant:"outline-white"},on:{click:function(e){t.zoom<3&&(t.zoom-=.1)}}},[a("i",{staticClass:"fas fa-minus"})]),a("b-btn",{attrs:{size:"sm",block:"",variant:"outline-white"},on:{click:function(e){t.menuExtended=!0}}},[a("i",{staticClass:"fas fa-arrow-left"})])],1)]),a("main-page",[a("board",{attrs:{layers:t.layers,zoom:t.zoom,board:t.board}})],1)],1)},r=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"board"},[a("canvas",{style:{transform:"scale("+t.zoom+")"},attrs:{id:"board-canvas",width:t.board.width*t.resolution,height:t.board.height*t.resolution}})])},c=[],u=(a("a4d3"),a("e01a"),a("d28b"),a("cb29"),a("a9e3"),a("d3b7"),a("3ca3"),a("ddb0"),a("d4ec")),d=a("bee2"),h=function(){function t(e){Object(u["a"])(this,t),this.element=document.getElementById(e),this.context=this.element.getContext("2d"),this.context.strokeStyle="#000",this.context.fillStyle="#f26a63"}return Object(d["a"])(t,[{key:"clear",value:function(t,e){this.context.clearRect(0,0,this.element.width,this.element.height),t&&this.fill(t,e)}},{key:"fill",value:function(t,e){this.context.globalAlpha=e||1,this.context.fillStyle=t,this.context.fillRect(0,0,this.element.width,this.element.height),this.context.globalAlpha=1}}]),t}(),f={name:"board",props:{zoom:{type:Number},board:{type:Object},layers:{type:Array}},data:function(){return{refreshRequired:!0,canvas:null,nails:[]}},mounted:function(){this.canvas=new h("board-canvas"),this.redraw()},created:function(){this.updateLoop()},computed:{resolution:function(){return this.board.resolution},centerX:function(){return this.board.width*this.resolution/2},centerY:function(){return this.board.width*this.resolution/2}},methods:{updateLoop:function(){var t=this;window.requestAnimationFrame((function(){t.refreshRequired&&t.redraw(),t.updateLoop()}))},generateNails:function(){this.nails=[];for(var t=0;t<this.board.nails;t++){var e=90-360*t/this.board.nails;e*=Math.PI/180,this.nails.push({x:this.centerX+this.board.radius*this.resolution*Math.cos(e),y:this.centerY+this.board.radius*this.resolution*Math.sin(e),textX:this.centerX+1.05*this.board.radius*this.resolution*Math.cos(e),textY:this.centerY+1.05*this.board.radius*this.resolution*Math.sin(e)})}},redraw:function(){this.canvas.clear(),this.generateNails(),this.drawLayers(),this.drawNails(),this.refreshRequired=!1},drawNails:function(){this.canvas.context.strokeStyle="#bbb",this.canvas.context.lineWidth=1,this.canvas.context.beginPath(),this.canvas.context.moveTo(0,0),this.canvas.context.lineTo(this.board.width*this.resolution,this.board.height*this.resolution),this.canvas.context.stroke(),this.canvas.context.beginPath(),this.canvas.context.moveTo(0,this.board.height*this.resolution),this.canvas.context.lineTo(this.board.width*this.resolution,0),this.canvas.context.stroke(),this.canvas.context.fillStyle="#aaa";var t=!0,e=!1,a=void 0;try{for(var n,i=this.nails[Symbol.iterator]();!(t=(n=i.next()).done);t=!0){var s=n.value;this.canvas.context.beginPath(),this.canvas.context.arc(s.x,s.y,3,0,2*Math.PI),this.canvas.context.fill()}}catch(o){e=!0,a=o}finally{try{t||null==i.return||i.return()}finally{if(e)throw a}}},drawLayers:function(){var t=0,e=!0,a=!1,n=void 0;try{for(var i,s=this.layers[Symbol.iterator]();!(e=(i=s.next()).done);e=!0){var o=i.value;this.drawLayer(t,o),t++}}catch(r){a=!0,n=r}finally{try{e||null==s.return||s.return()}finally{if(a)throw n}}},drawLayer:function(t,e){if(!e.visible)return!1;this.canvas.context.strokeStyle=e.color,this.canvas.context.lineWidth=1;var a=-t*this.board.nails/(this.layers.length-1)/2;this.canvas.context.beginPath();for(var n=0;n<this.board.nails/2;n++){var i=this.nails[this.modulo(a+n,this.board.nails)];this.canvas.context.moveTo(i.x,i.y),i=this.nails[this.modulo(a+2*n+this.board.nails/2,this.board.nails)],this.canvas.context.lineTo(i.x,i.y)}this.canvas.context.stroke()},modulo:function(t,e){var a=Number(t)%Number(e);return a<0?e+a:a}},watch:{board:{deep:!0,handler:function(){this.refreshRequired=!0}},layers:{deep:!0,handler:function(){this.refreshRequired=!0}}}},b=f,p=(a("d7ec"),a("2877")),v=Object(p["a"])(b,l,c,!1,null,"2b88a7cf",null),m=v.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-page"},[t._t("default")],2)},x=[],g={name:"main-page"},w=g,_=Object(p["a"])(w,y,x,!1,null,"17114284",null),k=_.exports,C={name:"home",components:{Board:m,MainPage:k},data:function(){return{board:{width:55.88,height:55.88,nails:320,radius:25,resolution:25,shape:"circle"},zoom:1,layerSelected:!1,layers:[],menuExtended:!1,defaultPalette:["#051f24","#1d758a","#036074","#5b93a3","#3587a3","#3aa1aa","#93cccc","#8eb1af","#88babf"]}},mounted:function(){window.innerWidth<576&&(this.resolution=10);for(var t=0;t<9;t++)this.addLayer()},methods:{addLayer:function(){this.layers.push({name:"Fil ".concat(this.layers.length),color:this.defaultPalette[this.layers.length%this.defaultPalette.length],visible:!0})}}},S=C,P=(a("cb63"),Object(p["a"])(S,o,r,!1,null,"9c0e4d98",null)),O=P.exports,j={name:"App",components:{home:O}},z=j,$=(a("5c0b"),Object(p["a"])(z,i,s,!1,null,null,null)),M=$.exports,E=a("2f62");n["default"].use(E["a"]);var T=new E["a"].Store({state:{},getters:{},mutations:{},actions:{}}),L=a("5f5b");a("f82b"),a("1fc5");n["default"].config.productionTip=!1,n["default"].use(L["a"]),new n["default"]({store:T,render:function(t){return t(M)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("9c0c"),i=a.n(n);i.a},9973:function(t,e,a){},"9c0c":function(t,e,a){},"9de0":function(t,e,a){},cb63:function(t,e,a){"use strict";var n=a("9973"),i=a.n(n);i.a},d7ec:function(t,e,a){"use strict";var n=a("9de0"),i=a.n(n);i.a}});
//# sourceMappingURL=app.6499250e.js.map