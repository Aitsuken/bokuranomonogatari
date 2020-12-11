(function(){var a,p,s,r,u,l,c,d,t,f,h,g,e,n,m=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1},i=function(t,e){for(var n in e)o.call(e,n)&&(t[n]=e[n]);function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;$("body").on("keyup",function(t){if(73===t.which)return(null!=d?d.element.parents().length:void 0)?o2.hideDebugger():o2.openDebugger()}),null==o2.openDebugger&&(o2.openDebugger=function(){return e(),n(),d.refresh()}),null==o2.hideDebugger&&(o2.hideDebugger=function(){if(null!=d)return t()}),d=void 0,e=function(){var t,e,n,r,i,o,a,s,l,c,u,h;if(null==d){for(d=new p,$(conductor).on("ran",function(t,e){return 0!==e&&d.linesView.scrollToCurrentTag(),d.refreshButtons()}),d.refreshButtons(),o=conductor.run,conductor.run=function(){return d.checkBreakPoint(),o.apply(this,arguments)},a=conductor.wait,conductor.wait=function(){return a.apply(this,arguments),d.linesView.scrollToCurrentTag()},f(),u=function(t){var e,n,r,i,o,a,s,l,c,u;for(e=$(t.target).parents(),s=d.element[0],0<=m.call(e,s)&&(t.stopImmediatePropagation(),t.preventDefault()),a=[t.target],e.each(function(t,e){return a.push(e)}),n=function(t){return(t.scrollHeight>t.offsetHeight||t.scrollWidth>t.offsetWidth)&&"scroll"===$(t).css("overflow")},l=[],i=0,o=a.length;i<o;i++)if(n(r=a[i])){u=r.scrollTop-.4*t.originalEvent.wheelDeltaY,c=r.scrollLeft-.4*t.originalEvent.wheelDeltaX,g(r,c,u),$(r).trigger("scroll");break}return l},e=0,r=(s=["mousewheel","DOMMouseScroll","wheel"]).length;e<r;e++)t=s[e],$("body").bindFirst(t,u);for($(window).on("resize",function(){return d.refresh()}),h=function(t){var e,n,r;if(e=d.element[0],0<=m.call($(t.target).parents(),e)||(n=null!=(r=d.selector)?r[0]:void 0,0<=m.call($(t.target).parents(),n)))return t.stopImmediatePropagation()},c=[],n=0,i=(l=["mouseup","mousemove","mousedown"]).length;n<i;n++)t=l[n],c.push($("body").bindFirst(t,h));return c}},n=function(){return d.element.appendTo($("body")),scaleToFitPage($(window).width()-d.element.width(),$(window).height()),$("#main-wrapper").css("left",0)},t=function(){return d.element.animate({right:-1*d.element.width()},200,function(){return d.element.detach(),d.element.css("right","0"),scaleToFitPage(-1,-1)})},p=function(){function t(){var t,e,n,r,i,o;this.element=$("<div>").addClass("debugger-view"),$("<div>").addClass("continueButton right-button").html("▶︎").attr("enabled","false").appendTo(this.element).click((t=this,function(){return t.continueBreakPoint()})),$("<div>").addClass("layersButton right-button").html("layers").appendTo(this.element).click((e=this,function(){return e.showLayerSelector(function(t){return new s(t).show(e.element)})})),$("<div>").addClass("soundsButton right-button").html("sounds").appendTo(this.element).click((n=this,function(){return n.showSoundSelector(function(t){return new c(t).show(n.element)})})),$("<div>").addClass("callStackButton right-button").html("call").appendTo(this.element).click((r=this,function(){return r.showCallStack(function(t){var e;return console.log(arguments),(e=new u(t.file)).show(r.element),e.highlightLine(t.originalLineNumber)})})),$("<div>").addClass("macroStackButton right-button").html("macro").appendTo(this.element).click((i=this,function(){return i.showMacroStack(function(t){var e;return(e=new u(t.file)).show(i.element),e.highlightLine(t.originalLineNumber)})})),$("<div>").addClass("profileButton right-button").html("Profile").appendTo(this.element).click((o=this,function(){return o.profiler?(o.profiler.stop(),$(".profileButton").removeClass("activated"),o.profiler.records.length?o.profiler.show(o.element,function(){return o.profiler=null}):o.profiler=null):(o.profiler=new l,o.profiler.start(),$(".profileButton").addClass("activated"))})),this.visible=!0,this.linesView=new a,this.linesView.element.appendTo(this.element),this.breakPoints={},this.breakPointStatus={paused:!1,tag:void 0}}return t.prototype.refresh=function(){return $(".lines-view").each(function(){var t;return null!=(t=$(this).data("controller"))?t.refresh():void 0})},t.prototype.addBreakPoint=function(t,e){var n;return null==(n=this.breakPoints)[t]&&(n[t]=[]),this.breakPointExist(t,e)||this.breakPoints[t].push(e),this.refresh()},t.prototype.removeBreakPoint=function(t,e){var n;if(this.breakPointExist(t,e))return n=this.breakPoints[t].indexOf(e),delete this.breakPoints[t][n],this.refresh()},t.prototype.breakPointExist=function(t,e){return t instanceof Tag?!!t.file&&this.breakPointExist(t.file.filename,t.originalLineNumber):0<=m.call(this.breakPointsInFile(t),e)},t.prototype.breakPointsInFile=function(t){return this.breakPoints[t]||[]},t.prototype.checkBreakPoint=function(){var t,e;if(this.refreshButtons(),t=conductor.getNextTag(),this.breakPointExist(t)&&"wait_breakpoint"!==conductor.currentTag.tagName)return(e=new Tag("wait_breakpoint")).file=t.file,e.originalLineNumber=t.originalLineNumber,[].push.call(conductor.queue,e),this.breakPointStatus={paused:!0,tag:t},$(".continueButton").attr("enabled","true")},t.prototype.isPausedAtTag=function(t){return this.breakPointStatus.paused&&this.breakPointStatus.tag===t},Tag.actions.wait_breakpoint=new TagAction({action:function(){return 1}}),t.prototype.continueBreakPoint=function(){if(this.breakPointStatus.paused)return $(".continueButton").attr("enabled","false"),this.breakPointStatus={paused:!1,tag:void 0},conductor.trigger("wait_breakpoint")},t.prototype.refreshButtons=function(){return $(".macroStackButton").attr("enabled",0<conductor.macroStack.length),$(".callStackButton").attr("enabled",0<conductor.callStack.length)},t.prototype.blurBackground=function(){return this.element.css({"-webkit-filter":"blur(3px) brightness(0.3)","pointer-events":"none"})},t.prototype.unblurBackground=function(){return this.element.css({"-webkit-filter":"","pointer-events":"auto"})},t.prototype.showLayerSelector=function(n){var t,e,r,i,o,a,s,l;for(this.blurBackground(),this.selector=$("<div>").addClass("selector"),l=this,t=function(t){var e;if(e=h(t))return $("<div>").html(e.page+" / "+e.layer).addClass("choice").click(function(){return l.unblurBackground(),n(t),l.selector.remove(),delete l.selector}).appendTo(l.selector)},e=0,i=(a=o2.allForeLayers()).length;e<i;e++)t(a[e]);for(r=0,o=(s=o2.allBackLayers()).length;r<o;r++)t(s[r]);return this.selector.appendTo($("body"))},t.prototype.showSoundSelector=function(n){var t,e,r,i,o,a;for(this.blurBackground(),this.selector=$("<div>").addClass("selector"),a=this,(t=function(t,e){return"number"==typeof e&&(e="se"+e),$("<div>").html(e).addClass("choice").click(function(){return a.unblurBackground(),n(t),a.selector.remove(),delete a.selector}).appendTo(a.selector)})(o2.bgm,"bgm"),e=r=0,i=(o=o2.se).length;r<i;e=++r)t(o[e],e);return this.selector.appendTo($("body"))},t.prototype.showCallStack=function(r){var t,e,n,i,o;for(this.blurBackground(),this.selector=$("<div>").addClass("selector"),o=this,t=function(t){var e,n;return e=t.originalLineNumber||t.line,n=t.file+":"+(e-1)+" : call",$("<div>").addClass("choice").html(n).click(function(){return o.unblurBackground(),o.selector.remove(),delete o.selector,$.when(t.restore()).then(function(t){return r(t)})}).appendTo(o.selector)},e=0,n=(i=conductor.callStack).length;e<n;e++)t(i[e]);return this.selector.appendTo($("body"))},t.prototype.showMacroStack=function(r){var t,e,n,i,o;for(this.blurBackground(),this.selector=$("<div>").addClass("selector"),o=this,t=function(t){var e,n;return e=t.returnTag.originalLineNumber||t.returnTag.line,n=t.returnTag.file.filename+" : "+(e-1)+" : "+t.definition.name,$("<div>").addClass("choice").html(n).click(function(){return o.unblurBackground(),o.selector.remove(),delete o.selector,$.when(t.returnTag.restore()).then(function(t){var e;return e=t.file.lines[t.lineNumber-1],r(e)})}).appendTo(o.selector)},e=0,n=(i=conductor.macroStack).length;e<n;e++)t(i[e]);return this.selector.appendTo($("body"))},t}(),r=function(){var r,i;function t(){var t;this.lineHeight=14,this.element=$("<div>").addClass("lines-view"),this.element.data("controller",this),this.content=$("<div>").addClass("content").on("scroll",(t=this,function(){return t.refresh()})).appendTo(this.element),this.title=$("<div>").addClass("title-bar").appendTo(this.element),this.heightPlaceHolder=$("<div>").css({top:0,height:0,width:1,left:0}).appendTo(this.content),this.currentFilename=void 0}return t.prototype.setFile=function(t){if(t.filename!==this.currentFilename)return this.currentFilename=t.filename,this.file=t,this.title.html(this.currentFilename),this.refreshHeight(),this.refresh()},t.prototype.refreshHeight=function(){var t;return t=(this.file.lines[this.file.lines.length-1].originalLineNumber+1)*this.lineHeight,this.heightPlaceHolder.height(t)},t.prototype.refresh=function(){var a,s,l,t,e,n,c;return this.refreshHeight(),e=Math.floor(this.content.scrollTop()/this.lineHeight)+1,t=Math.ceil((this.content.scrollTop()+this.content[0].offsetHeight)/this.lineHeight),this.content.html(""),this.content.append(this.heightPlaceHolder),l=function(e){return $("<div>").attr("line",e).css({top:(e-1)*n.lineHeight}).addClass("line").append($("<span>").addClass("line-number").html(e).click(function(t){return t.stopImmediatePropagation(),d.breakPointExist(n.currentFilename,e)?d.removeBreakPoint(n.currentFilename,e):d.addBreakPoint(n.currentFilename,e)}))},s=function(e,t){var n;if(n=$("<span>").html(i(e)).attr({line:e.lineNumber}).addClass("tag"),d.breakPointStatus.paused?d.isPausedAtTag(e)&&n.css({"text-shadow":"green 0px 0px 5px"}):e===conductor.currentTag&&n.css({color:"red"}),n.appendTo(t),conductor.isMacro(e))return n.css({cursor:"pointer","text-decoration":"underline"}).click(function(){var t;return t=conductor.macros[e.tagName],$.when(t.startTag.restore()).done(function(t){var e;return(e=new u(t.file)).show(d.element),e.highlightLine(t.originalLineNumber)})})},a=function(t){return $("<div>").addClass("breakPoint").appendTo(t)},r((n=this).file,e,t)((c=this,function(t,e){var n,r,i,o;for(i=l(e),n=0,r=t.length;n<r;n++)o=t[n],s(o,i);return d.breakPointExist(c.currentFilename,e)&&a(i),c.content.append(i)}))},r=function(l,c,u){var h;return null==c&&(c=0),null==u&&(u=Infinity),h=[],function(t){var e,n,r,i,o,a,s;for(a=[],e=n=0,r=(o=l.lines).length;n<r;e=++n)if(!((s=o[e]).originalLineNumber<c)){if(s.originalLineNumber>u)break;h.push(s),(i=l.lines[e+1])&&i.originalLineNumber===s.originalLineNumber?a.push(void 0):(t(h,s.originalLineNumber),a.push(h=[]))}return a}},i=function(n){var r,i;switch(n.tagName){case"text":return n.args.text;case"label":return null!=n.args.caption?"*"+n.args.name+" | "+n.args.caption:"*"+n.args.name;default:return"["+[n.tagName].concat(function(){var t,e;for(r in e=[],t=n.args)i=t[r],e.push(r+'="'+i+'"');return e}()).join(" ")+"]"}},t.prototype.scrollToOffset=function(t,e){return g(this.content[0],t,e)},t.prototype.scrollToTag=function(o){var t,e,a;return e=(o.originalLineNumber-1)*this.lineHeight,e-=(this.content[0].offsetHeight-this.lineHeight)/2,a=this,t=function(){var t,e,n,r,i;return(i=a.content.find("span[line="+o.lineNumber+"]")[0])&&(t=$(i).siblings(":first")[0])?(e=t.getBoundingClientRect().left,(r=(n=i.getBoundingClientRect()).left)-e<a.content[0].offsetWidth?0:r-e-(a.content[0].offsetWidth-n.width)/2):0}(),this.scrollToOffset(t,e),this.currentFilename!==o.file.filename?this.setFile(o.file):this.refresh()},t}(),a=function(t){function e(){e.__super__.constructor.apply(this,arguments)}return i(e,r),e.prototype.refresh=function(){var t;if((t=currentConductor.currentTag).file||"wait_breakpoint"===t.tagName)return this.file&&t.file.filename===this.currentFilename?e.__super__.refresh.apply(this,arguments):this.setFile(t.file)},e.prototype.scrollToCurrentTag=function(){var t;if((t=currentConductor.currentTag).file)return this.scrollToTag(t)},e}(),u=function(t){function n(t){var e;n.__super__.constructor.apply(this,arguments),this.element.addClass("overlay-lines-view"),this.backgroundWrapper=$("<div>").addClass("overlay-background").click((e=this,function(t){if($(t.target).is(e.backgroundWrapper))return e.close()})),this.setFile(t),this.highlightingLineNumber=-1}return i(n,r),n.prototype.show=function(t,e){var n;return this.callback=e,$("<div>").html("Close").addClass("close-button").click((n=this,function(){return n.close()})).appendTo(this.element),this.element.appendTo(this.backgroundWrapper),this.backgroundWrapper.appendTo(t),this.refresh()},n.prototype.close=function(){return this.backgroundWrapper.animate({opacity:0,width:0,height:0,left:"50%",top:"50%"},200,(t=this,function(){return t.backgroundWrapper.remove(),t.element.empty(),t.element.remove(),"function"==typeof t.callback?t.callback():void 0}));var t},n.prototype.refresh=function(){if(n.__super__.refresh.apply(this,arguments),-1!==this.highlightingLineNumber)return this.content.find("div[line="+this.highlightingLineNumber+"]").addClass("highlight")},n.prototype.highlightLine=function(t){var e;return e=(t-1)*this.lineHeight,e-=(this.content[0].offsetHeight-this.lineHeight)/2,this.highlightingLineNumber=t,this.scrollToOffset(0,e),this.refresh()},n}(),s=function(){function t(t){this.layer=t,this.element=$("<div>").addClass("layer-inspector")}return t.prototype.show=function(t){var e,a,n,r,i,o,s,l,c,u,h,p,d,f,g,m;return t.append(this.element),this.element.append(this.layer.canvas),$(this.layer.canvas).addClass("inspected-layer"),$("<div>").html("close").addClass("close").click((o=this,function(){return o.close()})).appendTo(this.element),a=$("<div>").appendTo(this.element),(e=function(t,e,n,r){var i,o;return null==r&&(r={type:"text"}),o=$("<span>").html(t),i=$("<input>").attr(r).val(e).on("keyup change input",function(){return n(i.val()),renderer.animator.requestFrame()}),$("<div>").css({float:"left",width:"30%"}).append(o).append(i).appendTo(a)})("x",this.layer.rect.x,(s=this,function(t){return s.layer.rect.x=Number(t)})),e("y",this.layer.rect.y,(l=this,function(t){return l.layer.rect.y=Number(t)})),e("height",this.layer.rect.height,(c=this,function(t){return c.layer.rect.height=Number(t)})),e("width",this.layer.rect.width,(u=this,function(t){return u.layer.rect.width=Number(t)})),e("opacity",this.layer.opacity,(h=this,function(t){return h.layer.opacity=Number(t)}),{type:"range",min:0,max:1,step:.01}),e("rotation",this.layer.rotation,(p=this,function(t){return p.layer.rotation=parseFloat(t)}),{type:"range",min:0,step:.01,max:2*Math.PI}),e("scaleX",this.layer.scaleX,(d=this,function(t){return d.layer.scaleX=parseFloat(t)}),{type:"range",min:.05,max:5,step:.01}),e("scaleY",this.layer.scaleY,(f=this,function(t){return f.layer.scaleY=parseFloat(t)}),{type:"range",min:.05,max:5,step:.01}),e("originX",this.layer.transformOrigin.x,(g=this,function(t){return g.layer.transformOrigin.x=parseFloat(t)})),e("originY",this.layer.transformOrigin.y,(m=this,function(t){return m.layer.transformOrigin.t=parseFloat(t)})),a.append($("<div>").css("clear","both")),n=this.element.height()-a.height(),i=this.element.width(),r=Math.min(i/this.layer.canvas.width,n/this.layer.canvas.height),$(this.layer.canvas).css({transform:"scale("+r+")","transform-origin":"0 0"}),a.css({position:"absolute",top:$(this.layer.canvas).height()*r})},t.prototype.close=function(){return this.element.animate({"margin-left":this.element.width()},200,(t=this,function(){return $(t.layer.canvas).css("transform",""),t.element.empty(),t.element.remove()}));var t},t}(),c=function(){function t(t){var e;this.sound=t,this.element=$("<div>").addClass("sound-inspector"),this.content=$("<div>").appendTo(this.element),this.backgroundWrapper=$("<div>").addClass("overlay-background").click((e=this,function(t){if($(t.target).is(e.backgroundWrapper))return e.close()})).append(this.element),this.timer=void 0}return t.prototype.infoString=function(){return"<table>\n<tr><td>file</td><td> "+this.sound.filepath+"</td></tr>\n<tr><td>actual path</td><td> "+this.sound.audio.src+"</td></tr>\n<tr><td>looping</td><td> "+(this.sound.loop?"YES":"NO")+"</td></tr>\n<tr><td>volume</td><td> "+this.sound.volume+"</td></tr>\n<tr><td>actual volume</td><td> "+this.sound.volume*this.sound.volumePercentage+"</td></tr>\n\n<tr><td>fading</td><td> "+this.fadeString()+"</td></tr>\n\n<tr><td>se gVolume</td><td> "+sf.__system.seGVolume+"</td></tr>\n<tr><td>bgm gVolume</td><td> "+sf.__system.bgmGVolume+"</td></tr>\n</table>"},t.prototype.fadeString=function(){return this.sound.fadeStatus?"\nfrom volume : "+this.sound.fadeStatus.fromVolume+"\nto volume : "+this.sound.fadeStatus.toVolume+"\nduration : "+this.sound.fadeStatus.duration:"NO"},t.prototype.show=function(t){var e,n;return t.append(this.backgroundWrapper),this.timer=setInterval((e=this,function(){return e.content.html(e.infoString())})),$("<table>").append($("<tr>").append($("<td>").html("Set volume:")).append($("<td>").append($("<input>").attr({type:"range",min:0,max:1,step:.01,value:this.sound.volume}).on("change",(n=this,function(t){return n.sound.setVolume($(t.target).val())}))))).appendTo(this.element)},t.prototype.close=function(){return clearInterval(this.timer),this.element.animate({opacity:0,width:0,height:0,left:"50%",top:"50%"},200,(t=this,function(){return t.element.empty(),t.element.remove(),t.backgroundWrapper.remove()}));var t},t}(),l=function(){var i;function t(){var e;this.element=$("<div>").addClass("profile-view"),this.backgroundWrapper=$("<div>").addClass("overlay-background").click((e=this,function(t){if($(t.target).is(e.backgroundWrapper))return e.close()})),this.records=[],this.currentRecord=null,this.showPercentage=!0,this.showCombined=!0}return t.prototype.show=function(t,e){var n,r;return this.callback=e,n=this,$("<span>").append($("<input>").attr({type:"checkbox",checked:!0}).on("change",function(){return n.showPercentage=$(this).is(":checked"),n.render()})).append($("<span>").html("Percentage")).appendTo(this.element),$("<span>").append($("<input>").attr({type:"checkbox",checked:!0}).on("change",function(){return n.showCombined=$(this).is(":checked"),n.render()})).append($("<span>").html("Combined")).appendTo(this.element),this.render(),$("<div>").html("Close").addClass("close").click((r=this,function(){return r.close()})).appendTo(this.element),this.element.appendTo(this.backgroundWrapper),this.backgroundWrapper.appendTo(t)},t.prototype.close=function(){return this.backgroundWrapper.animate({left:"100%"},200,(t=this,function(){return t.backgroundWrapper.remove(),t.element.empty(),t.element.remove(),"function"==typeof t.callback?t.callback():void 0}));var t},t.prototype.render=function(){var t,e,n,r,i,o,a,s,l;for(this.element.find("table").remove(),s=$("<table>"),this.element.append(s),o=[],n=0,r=(t=this.getCalculatedRecords()).length;n<r;n++)i=t[n],a=$("<tr>"),l=$("<td>").html(i.tagName),i.filename&&i.line&&l.append($("<span>").css("float","left").html("("+i.filename+":"+i.line+")")),a.append(l),e=$("<td>").css("position","relative").append($("<span>").addClass("duration").html(this.showPercentage?100*i.duration+"%":i.duration+"ms")),this.showPercentage&&e.prepend($("<div>").css({position:"absolute",width:100*i.duration+"%",height:"20px",float:"left",background:"#3e73b6",color:"white","white-space":"nowrap",overflow:"hidden"}).html(100*i.duration+"%")),a.append(e),o.push(s.append(a));return o},t.prototype.getCalculatedRecords=function(){var e,t,n,r,i,o,a,s;if(a=clone(this.records),this.showCombined){for(e={},t=0,n=(o=this.records).length;t<n;t++)i=o[t],null==e[r=i.tagName]&&(e[r]=0),e[i.tagName]+=i.duration;a=Object.keys(e).map(function(t){return{tagName:t,duration:e[t]}}).sort(function(t,e){return e.duration-t.duration})}return s=a.map(function(t){return t.duration}).reduce(function(t,e){return t+e}),this.showPercentage?a.forEach(function(t){return t.duration=t.duration/s}):a.unshift({tagName:"Total",duration:s}),a},i=null,t.prototype.start=function(){var r;return this.records=[],r=this,i=Tag.prototype.run,Tag.prototype.run=function(){var t,e,n;return this.conductor!==conductor?i.apply(this,arguments):(r.tagStart(this),e=this,n=i.apply(this,arguments),t=Conductor.prototype.oneShot,Conductor.prototype.oneShot=function(){return this===conductor&&(Conductor.prototype.oneShot=t,r.tagEnd(e)),t.apply(this,arguments)},n)}},t.prototype.stop=function(){return Tag.prototype.run=i},t.prototype.tagStart=function(t){var e;if(!this.currentRecord)return this.currentRecord={tagName:t.tagName,line:t.originalLineNumber||t.lineNumber||t.line,filename:null!=(e=t.file)?e.filename:void 0,start:Date.now(),duration:0}},t.prototype.tagEnd=function(t){if(this.currentRecord&&this.currentRecord.tagName===t.tagName)return this.currentRecord.duration=Date.now()-this.currentRecord.start,this.records.push(this.currentRecord),this.currentRecord=null},t}(),f=function(){return $("<style>").html("@-webkit-keyframes fromright{\n  from {-webkit-transform: translateX(500px);}\n  to   {-webkit-transform: none;}\n}\n.debugger-view{\n  width      : 500px;\n  height     : 100%;\n  position   : absolute;\n  top        : 0;\n  right      : 0;\n  background : white;\n  -webkit-animation: fromright 0.3s;\n  box-shadow: 0 0 50px black;\n  font-family: Helvetica, Arial;\n  background : #eee;\n  -webkit-transition : -webkit-filter 0.3s linear;\n}\n\n.lines-view{\n  width    : 450px;\n  height   : 100%;\n  position : absolute;\n  left     : 0;\n  top      : 0;\n  background : white;\n}\n.lines-view .title-bar{\n  position : 'absolute';\n  left     : 0;\n  top      : 0;\n  width    : 100%;\n  height   : 30px;\n  background: #f7f7f7;\n  background: -moz-linear-gradient(top, #f7f7f7 0%, #c9c9c9 5%, #727272 100%);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(5%,#c9c9c9), color-stop(100%,#727272));\n  text-align: center;\n  font-size: 17px;\n  box-shadow: 0 1px 5px -2px black;\n  line-height: 30px;\n  color: white;\n  text-shadow: 0px 1px 0px black;\n}\n.lines-view .content{\n  position : absolute;\n  left     : 0;\n  top      : 30px;\n  bottom   : 0;\n  width    : 100%;\n  overflow : scroll;\n  font-family: menlo,serif;\n  font-size: 11px;\n}\n.lines-view .line{\n  position : absolute;\n  left     : 0;\n  margin   : 0;\n  padding  : 0;\n  overflow : hidden;\n  white-space : nowrap;\n}\n.lines-view .line-number{\n    background  : #d8d8d8;\n    font-size   : 12px;\n    min-width   : 25px;\n    text-align  : right;\n    display     : inline-block;\n    cursor      : pointer;\n    box-shadow: inset 0 -1px white;\n}\n@-webkit-keyframes highlight {\n  0%   { background-color : #DAB0B0; }\n  50%  { background-color : #DF5555; }\n  100% { background-color : #DAB0B0; }\n}\n.line.highlight .line-number{\n  background-color : #F89191;\n  -webkit-animation : highlight 1s infinite;\n}\n\n.lines-view .tag{\n  line-height : "+d.linesView.lineHeight+"px;\n  white-space : nowrap;\n}\n.overlay-background{\n  position : absolute;\n  left : 0;\n  top : 0;\n  width : 100%;\n  height : 100%;\n  background : rgba(0,0,0,0.3);\n}\n.lines-view.overlay-lines-view {\n  font-family: Helvetica, Arial;\n  top : 25px;\n  bottom : 25px;\n  right : 25px;\n  left : auto;\n  height : auto;\n  -webkit-animation: popup 0.3s;\n  border-radius: 5px;\n  overflow: hidden;\n  box-shadow: 0 0 40px 0px #000;\n}\n.overlay-lines-view .close-button{\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  width: 50px;\n  height: 30px;\n  border: solid rgb(213, 213, 213);\n  border-width: 0 0 0 1px;\n  color: black;\n  text-shadow: 0 1px 1px white;\n  line-height: 30px;\n  text-align: center;\n  font-size: 12px;\n  cursor : pointer;\n}\n\n.breakPoint{\n  width : 5px;\n  height : "+(d.linesView.lineHeight-1)+'px;\n  background : #007bff;\n  overflow : visible;\n  position : absolute;\n  left : 0;\n  top : 0;\n  pointer-events : none;\n}\n.breakPoint:after{\n  content:"";\n  display : block;\n  width: 0px;\n  height: 0px;\n  border-style: solid;\n  border-width: '+(d.linesView.lineHeight-1)/2+"px 0 "+(d.linesView.lineHeight-1)/2+"px 7px;\n  border-color: transparent transparent transparent #007bff;\n  margin-left : 5px;\n}\n\n.right-button{\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  text-align: center;\n  line-height: 50px;\n  font-size: 11px;\n  color: #222;\n  border: solid;\n  border-width: 0 0 1px 0;\n  border-color: #aaa;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#efefef), color-stop(3%,#e2e2e2), color-stop(98%,#afafaf), color-stop(100%,#9e9e9e));\n  text-shadow: 0 1px 1px #fff;\n  cursor: pointer;\n}\n.right-button[enabled=false]{\n  opacity : 0.2;\n  cursor: default;\n  pointer-events : none;\n}\n.continueButton{\n  right : 0;\n  top : 0;\n  font-size: 14px;\n}\n.callStackButton{\n  right : 0;\n  top : 50px;\n}\n.macroStackButton{\n  right : 0;\n  top : 100px;\n}\n.profileButton{\n  right : 0;\n  top : 150px;\n}\n.profileButton.activated{\n  color : red;\n}\n\n.layersButton{\n  right : 0;\n  bottom : 0;\n}\n\n.soundsButton{\n  right : 0;\n  bottom : 50px;\n}\n\n@-webkit-keyframes popup{\n  0%   {-webkit-transform: scale(0); opacity:0;}\n  80%  {-webkit-transform: scale(1.05); opacity:1;}\n  100% {-webkit-transform: scale(1);}\n}\n.selector{\n  position   : absolute;\n  width      : 400px;\n  right      : 50px;\n  bottom     : 50px;\n  top        : 50px;\n  boxShadow  : 0px 0px 15px #000;\n  background : white;\n  -webkit-animation: popup 0.2s;\n  border-radius : 5px;\n}\n.selector .choice{\n  cursor : pointer;\n  border-radius : 5px;\n}\n.selector .choice:hover{\n  background : #eee;\n}\n\n.sound-inspector{\n  width      : 400px;\n  height     : 500px;\n  position   : absolute;\n  left       : 50px;\n  top        : 50px;\n  background : white;\n  -webkit-animation: popup 0.2s;\n  border-radius : 5px;\n  box-shadow  : 0px 0px 30px #000;\n}\ntable {\n  width : 100%;\n}\ntable td:first-child{\n  text-align : right;\n  width : 50%;\n}\ntable td{\n  max-width : 0;\n  word-break: break-all;\n}\ntable tr:nth-child(even){\n  background : rgb(238, 238, 238);\n}\n\n.layer-inspector{\n  width      : 100%;\n  height     : 100%;\n  position   : absolute;\n  left       : 0;\n  top        : 0;\n  background : white;\n  -webkit-animation: fromright 0.3s;\n  box-shadow  : 0px 0px 30px #000;\n}\n.layer-inspector .close{\n  width      : 50px;\n  height     : 30px;\n  position   : absolute;\n  right      : 0;\n  top        : 0;\n  background : -moz-linear-gradient(top, #f7f7f7 0%, #c9c9c9 5%, #727272 100%);\n  background : -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(5%,#c9c9c9), color-stop(100%,#727272));\n  border-radius : 0 0 0 5px;\n  color: black;\n  text-shadow: 0 1px 1px white;\n  box-shadow: 0 0 5px black;\n  line-height: 30px;\n  text-align: center;\n  font-size: 12px;\n  cursor : pointer;\n}\n\n.profile-view{\n  width      : 100%;\n  height     : 100%;\n  position   : absolute;\n  left       : 0;\n  top        : 0;\n  background : white;\n  -webkit-animation: fromright 0.3s;\n  box-shadow  : 0px 0px 30px #000;\n  overflow : scroll;\n}\n.profile-view .close{\n  width      : 50px;\n  height     : 30px;\n  position   : absolute;\n  right      : 0;\n  top        : 0;\n  background : -moz-linear-gradient(top, #f7f7f7 0%, #c9c9c9 5%, #727272 100%);\n  background : -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(5%,#c9c9c9), color-stop(100%,#727272));\n  border-radius : 0 0 0 5px;\n  color: black;\n  text-shadow: 0 1px 1px white;\n  box-shadow: 0 0 5px black;\n  line-height: 30px;\n  text-align: center;\n  font-size: 12px;\n  cursor : pointer;\n}").appendTo($("head"))},h=function(t){var e,n,r,i,o,a,s,l,c,u,h,p,d;if(o2.foreLayers.baseLayer===t)return{page:"fore",layer:"base"};for(e=n=0,o=(u=o2.foreLayers.imageLayers).length;n<o;e=++n)if(t===u[e])return{page:"fore",layer:"image"+e};if(o2.backLayers.baseLayer===t)return{page:"back",layer:"base"};for(e=r=0,a=(h=o2.backLayers.imageLayers).length;r<a;e=++r)if(t===h[e])return{page:"back",layer:"image"+e};for(e=i=0,s=(p=o2.foreLayers.messageLayers).length;i<s;e=++i)if(t===p[e])return{page:"fore",layer:"message"+e};for(e=c=0,l=(d=o2.backLayers.messageLayers).length;c<l;e=++c)if(t===d[e])return{page:"back",layer:"message"+e}},g=function(t,e,n){return n=Math.max(0,Math.min(n,t.scrollHeight-t.clientHeight)),e=Math.max(0,Math.min(e,t.scrollWidth-t.clientWidth)),t.scrollTop=n,t.scrollLeft=e}}).call(this);