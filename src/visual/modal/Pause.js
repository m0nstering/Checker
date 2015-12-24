extend(Pause, createjs.Container);

function Pause(m, par)
{
	this.initialize();
	var th = this
//--------------------------------//
	var t = new createjs.Container()
	this.addChild(m)
	this.addChild(t)

	var title1 = new createjs.Sprite(jsons["JSON1"]);			/// Заголовок
	title1.gotoAndStop("text_pause");
	setCoor(title1, 212, 126)
	// title1.x = 231;
	// title1.y = 222;
	// dragAndDrop(title1);

	if(__audio_supported){
		var btnmusic = new Button({pod: "btn", icon: "icon_music"});
		btnmusic.changeFrame("off")
		// btnmusic.alpha = .5
		setCoor(btnmusic, 153, 242)
		// btnmusic.x = 166
		// btnmusic.y = 301
		btnmusic.addEventListener("click", function(){
														var cur = btnmusic.changeBeetweenAnim("off", "on");
														if(cur == "off")
															MusicCTRL.off("music");
														else{
															MusicCTRL.on("music");
															MusicCTRL.play("music");
														}
													})
		
		var btnsound = new Button({pod: "btn", icon: "icon_sound"});
		btnsound.changeFrame("off")
		btnsound.alpha = .5
		setCoor(btnsound, 379, 242)
		// btnsound.x = 374
		// btnsound.y = 301
		btnsound.addEventListener("click", function(){
														var cur = btnsound.changeBeetweenAnim("off", "on");
														if(cur == "off")
															MusicCTRL.off("sound");
														else
															MusicCTRL.on("sound", 1);
													})
	}

	var btnback = new Button({pod: "btn", icon: "icon_right"});
	setCoor(btnback, 379, 539)
	// btnback.x = 374
	// btnback.y = 524
	btnback.addEventListener("click", function(){
		m.slideOnBottom(function(){
			par.hideModal(th)
			par.resume()
		})
	});

	var btnmenu = new Button({pod: "btn", icon: "icon_menu"});
	setCoor(btnmenu, 153, 539)
	// btnmenu.x = 166
	// btnmenu.y = 524
	btnmenu.addEventListener("click", function(){v_choiseLocation("menu");});

	MusicCTRL.registerObserver(this);
	
	m.getChanges().addChild(title1);
	m.getChanges().addChild(btnmusic);
	m.getChanges().addChild(btnsound);
	m.getChanges().addChild(btnback);
	m.getChanges().addChild(btnmenu);

	this.off = function(v){
		if(v == "music")
			btnmusic.changeFrame("off")
		if(v == "sound")
			btnsound.changeFrame("off")
	},

	this.on = function(v){
		if(v == "music")
			btnmusic.changeFrame("on")
		if(v == "sound")
			btnsound.changeFrame("on")		
	}

	this.update = function(){
		m.slideFromTop()
	}
};