extend(WhoStart, createjs.Container);

function WhoStart()
{	
	this.initialize();
	var current_player;
	var th = this
//--------------------------------//
	var par

	// var t = new createjs.Container()
	// // this.addChild(m)
	// this.addChild(t)

	var _play = new createjs.Sprite(jsons["JSON1"])
	_play.gotoAndStop("btn_play")
	setCoor(_play, 216, 438)
	// dragAndDrop(_play)
	_play.addEventListener("click", function(){
		par.hideModal(th)
		par.start()
	})

	var _glow = new createjs.Sprite(jsons["JSON1"])
	_glow.gotoAndStop("area_glow")
	// setCoor(_glow, -9, 6)

	// dragAndDrop(_glow)

	var txt = new createjs.Sprite(jsons["JSON1"])
	txt.gotoAndStop("text_who_starts")
	setCoor(txt, 128, 255)
	// dragAndDrop(txt)
		
	var left = new createjs.Sprite(jsons["JSON1"])
	left.gotoAndStop("icon_left")
	setCoor(left, 199, 355)
		
	var right = new createjs.Sprite(jsons["JSON1"])
	right.gotoAndStop("icon_right")
	setCoor(right, 320, 355)

	// dragAndDrop(left)
	// dragAndDrop(right)

	var user_icon
	var bot_icon
	var user_icon = new Button({pod: "area_pers", i: "checker_blue", iconX: 10, iconY: 9, iconScaleX: .9, iconScaleY: .9});
	setCoor(user_icon, 84, 356)
	var bot_icon = new Button({pod: "area_pers", i: "checker_red", iconX: 10, iconY: 9, iconScaleX: .9, iconScaleY: .9});
	setCoor(bot_icon, 436, 356)
	// dragAndDrop(user_icon)
	// dragAndDrop(bot_icon)

	var text_you = new createjs.Bitmap(images["text_you_starts"])
	var text_robot = new createjs.Bitmap(images["text_robot_starts"])
	setCoor(text_robot, 133, 259)
	setCoor(text_you, 178, 259)

	// dragAndDrop(text_you)
	// dragAndDrop(text_robot)

	this.addChild(txt)
	this.addChild(left)
	this.addChild(right)
	this.addChild(_glow)
	this.addChild(_play)
	// this.addChild(text_you)
	// this.addChild(text_robot)
	
	this.update = function(p) {
		if(p.par)
			par = p.par
		text_you.visible = false
		text_robot.visible = false
		_glow.visible = false
		_play.visible = false
		current_player = p.started

		user_icon.changeIcon({pod: "area_pers", i: "checker_blue", iconX: 10, iconY: 9, iconScaleX: .9, iconScaleY: .9})
		bot_icon.changeIcon({pod: "area_pers", i: "checker_red", iconX: 10, iconY: 9, iconScaleX: .9, iconScaleY: .9})
		// user_icon.gotoAndStop("fruit_" + p.colors["user"] + "_top")
	// user_icon.scaleX = user_icon.scaleY = .85

		// bot_icon.gotoAndStop("fruit_" + p.colors["bot"] + "_top")
	// bot_icon.scaleX = bot_icon.scaleY = .85

		// left.visible = false
		// right.visible = false

		th.addChild(user_icon)
		th.addChild(bot_icon)
		th.addChild(_glow)
	
		// m.slideFromTop(fun)
		fun()
	}
	
	function fun() {
		var rand = Math.round(Math.random())
		var curArrow = rand ? "user" : "bot"
		var afterFull = function(){
			if(current_player == "user"){
				setCoor(_glow, 84, 358)
				text_you.visible = true
				user_icon.changeIcon({i: "checker_blue_glow", iconX: 5, iconY: 6})
			}else{
				setCoor(_glow, 436, 358)
				text_robot.visible = true
				bot_icon.changeIcon({i: "checker_red_glow", iconX: 5, iconY: 6})
			}
			_play.visible = true
			_glow.visible = true
			setActiveArrow(current_player)			
		}	
		t_intervalOn(.02, function(){
			curArrow = (curArrow == "user") ? "bot" : "user"
			setActiveArrow(curArrow)
		}, null, 2, afterFull)
	}

	function setActiveArrow(v) {
		if(v == "user"){
			left.visible = true
			right.visible = false
		}else{
			left.visible = false
			right.visible = true
		}
	}

}