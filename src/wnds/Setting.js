extend(Setting, createjs.Container);

function Setting()
{	
	this.initialize();
	var _par
	var th = this
//--------------------------------//

	// var f = new createjs.Sprite(jsons["JSON1"])
	// f.gotoAndStop("window_big")
	// f.x = WIDTHGAME/2 - f.getBounds().width/2
	// f.y = HEIGHTGAME/2 - f.getBounds().height/2

	var title = new createjs.Sprite(jsons["JSON1"])
	title.gotoAndStop("text_settings")
	setCoor(title, 198, 33)
	// dragAndDrop(title)

	if(__audio_supported){
		var btnmusic = new Button({pod: "btn_settings", i: "icon_music"});
		btnmusic.changeFrame("off")
		// btnmusic.alpha = .5
		setCoor(btnmusic, 153, 430)
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
		
		var btnsound = new Button({pod: "btn_settings", i: "icon_sound"});
		btnsound.changeFrame("off")
		// btnsound.alpha = .5
		setCoor(btnsound, 376, 430)
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

	var about = new Button({pod: "btn_settings", i: "icon_i"});
	setCoor(about, 153, 209)
	about.addEventListener("click", function(){v_choiseLocation("about");});

	var help = new Button({pod: "btn_settings", i: "icon_help"});
	setCoor(help, 376, 209)
	help.addEventListener("click", function(){v_choiseLocation("instructions");});

	var _modal
	var btnback = new Button({pod: "btn_small", i: "icon_house"});
	setCoor(btnback, 15, 636)
	btnback.addEventListener("click", function(){
		if(!_par){
			v_choiseLocation("menu");
			return
		}
		_modal = new Modal(null, 0.01)
		_modal = new Confirmation(_modal, th)
		if(_modal.update)
			_modal.update(pars)
		th.addChild(_modal);
		po.mouseChildren = false
	});

	var btnplay = new Button({pod: "btn_small", i: "icon_right"});
	setCoor(btnplay, 525, 636)
	btnplay.addEventListener("click", function(){
		var o = v_choiseLocation("game", {dont_update:true});
		o.hideModal()
		o.resume()
	});
	// dragAndDrop(btnplay)

	MusicCTRL.registerObserver(this);

	var po = new createjs.Container()
	// this.addChild(f)
	po.addChild(title)
	po.addChild(btnmusic)
	po.addChild(btnsound)
	po.addChild(about)
	po.addChild(help)
	po.addChild(btnback)
	po.addChild(btnplay)

	this.addChild(po)

	this.update = function(p){
		if(_modal && _modal.parent)
			_modal.parent.removeChild(_modal)
		po.mouseChildren = true

		if(p && p.dont_update)
			return
		btnplay.visible = false
		if(p && p.par){
			_par = p.par
			btnplay.visible = true
		}

	}
	
	this.hideModal = function(v){
		if(v && v.parent)
			v.parent.removeChild(v)
		po.mouseChildren = true
	}

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
}