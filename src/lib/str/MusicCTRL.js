var _allMusic = new Array();
var _obsMusic = new Array();
var onoff = new Array();

MusicCTRL = {

	start:function(e){
						var loadResourses = e.target._loadQueueBackup
						for (var i = 0; i < loadResourses.length; i++) {
						//------- Если загруженный объект - звук
							if (loadResourses[i]._item.type == createjs.LoadQueue.SOUND) {
								_allMusic[loadResourses[i]._item.id] = createjs.Sound.createInstance(loadResourses[i]._item.id);
							}
						}
					},
	on: function(v, l){
						if(!l)
							l = -1;
						if(l == 1)
							l = null;
						else
							l--;
						if(_allMusic[v]){
							onoff[v] = {open:true, loop :  l}
						}
						var ind = 1;
						while(_allMusic[v+ind]){
							onoff[v+ind] = {open:true, loop :  l}
							ind++;
						};
						for (var i = 0; i < _obsMusic.length; i++)
							if(_obsMusic[i].on)
								_obsMusic[i].on(v)
					},
	off: function(v){
						if(_allMusic[v]){
							_allMusic[v].stop();
							onoff[v] = {open:false};
						}
						var ind = 1;
						while(_allMusic[v+ind]){
							_allMusic[v+ind].stop();
							onoff[v+ind] = {open:false};
							ind++;
						};
						for (var i = 0; i < _obsMusic.length; i++)
							if(_obsMusic[i].off)
								_obsMusic[i].off(v)
					},
	play: function(mus){
							if(onoff[mus] && onoff[mus].open){
								var lo;
								if(!onoff[mus].loop)
									lo = null
								else
									lo = {loop :  onoff[mus].loop}
								_allMusic[mus].play(lo);
							}
						},
	registerObserver: function(o){
						_obsMusic.push(o);
					}

		}