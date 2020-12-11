"use strict";Tag.actions.rain=new TagAction({rules:{layer:{type:"LAYER",required:!0},page:{type:/fore|back/,defaultValue:"fore"},trail:{type:/none|drops|smudge/,defaultValue:"drops"},gravityangle:{type:"FLOAT",defaultValue:180},preset:{type:"STRING",defaultValue:"(0,2,0.5)(4,4,1)"},speed:{type:"INT",defaultValue:50},opaque:{type:"BOOLEAN",defaultValue:!0}},action:function(o){var i=o.layer[o.page];if(i.rainyday)return 0;var p=this,s=document.createElement("canvas");function e(){var r=new RainyDay(s,i.canvas,i.rect.width,i.rect.height,1,5);switch((i.rainyday=r).reflection=r.REFLECTION_MINIATURE,o.trail){case"none":r.trail=r.TRAIL_NONE;break;case"smudge":r.trail=r.TRAIL_SMUDGE;break;case"drops":default:r.trail=r.TRAIL_DROPS}r.VARIABLE_GRAVITY_ANGLE=o.gravityangle/180*Math.PI;for(var e=o.preset.match(/\((-?[0-9\.,\s]+)*\)/g),a=[],t=0;t<e.length;t++){var n=e[t].replace("(","").replace(")","").split(",");a.push(r.preset(parseFloat(n[0]),parseFloat(n[1]),parseFloat(n[2])))}r.rain(a,o.speed),r._drawOnContext=i.drawOnContext,r._flush=i.flush,o.opaque?(i.drawOnContext=function(e){var a=i.canvas;i.canvas=s,r._drawOnContext.apply(this,arguments),i.canvas=a},i.flush=function(){return!!r._flush.apply(this,arguments)&&(r.prepareBackground(),r.prepareReflections(),r.stoppedDrops.forEach(function(e){e.draw()}),!0)}):i.drawOnContext=function(e){r._drawOnContext.apply(this,arguments),r.img=e.canvas,r.prepareBackground(),r.prepareReflections(),r.stoppedDrops.forEach(function(e){e.draw()}),e.drawImage(r.canvas,0,0)},renderer.animator.requestFrame(function e(){i.rainyday==r&&renderer.animator.requestFrame(e)}),p.done()}return s.width=i.rect.width,s.height=i.rect.height,window.RainyDay?setTimeout(e,0):$.getScript("plugin/rainyday.js").done(e),1}}),Tag.actions.stopraining=new TagAction({rules:{layer:{type:"LAYER",required:!0},page:{type:/fore|back/,defaultValue:"fore"}},action:function(e){var a=e.layer[e.page];if(!a.rainyday)return 0;var r=a.rainyday;return r.drops.concat(r.stoppedDrops).forEach(function(e){r.clearDrop(e,!0)}),a.drawOnContext=r._drawOnContext,a.flush=r._flush,r.stop=!0,delete a.rainyday,0}});