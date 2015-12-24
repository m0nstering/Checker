extend(Interface, createjs.Container);

function Interface(p, par)
{	
	this.initialize();
//--------------------------------//

	var n = 0
	var timer_cont = new createjs.Container()
	var ticker = null;

	var win_user = new Text(jsons["JSON1"], "text_", "Center")
	var win_bot = new Text(jsons["JSON1"], "text_", "Center")
	win_user.scaleX = win_user.scaleY = .8
	win_bot.scaleX = win_bot.scaleY = .8

	setCoor(win_user,180 + 3, 90 + 7)
	setCoor(win_bot, 434 + 3, 90 + 7)
	// dragAndDrop(win_user)
	// dragAndDrop(win_bot)
	var delay;

	var slider = new createjs.Sprite(jsons["JSON1"])
		slider.visible = false
	// slider.gotoAndStop("text_robot")//text_your_turn_small

	

	var user_border = new createjs.Sprite(jsons["JSON1"])
	user_border.gotoAndStop("frame")
	setCoor(user_border, 1, 16)

	var bot_border = new createjs.Sprite(jsons["JSON1"])
	bot_border.gotoAndStop("frame2")
	setCoor(bot_border, 548, 17)

	var user_turn = new createjs.Sprite(jsons["JSON1"])
	user_turn.gotoAndStop("text_your_turn")
	setCoor(user_turn, 5, 140)

	var bot_turn = new createjs.Sprite(jsons["JSON1"])
	bot_turn.gotoAndStop("text_robots_turn")
	setCoor(bot_turn, 471, 140)
	// dragAndDrop(user_turn)
	// dragAndDrop(bot_turn)

	user_border.visible = false
	bot_border.visible = false

	var user_glow = new createjs.Sprite(jsons["JSON1"])
	user_glow.gotoAndStop("area_glow")
	setCoor(user_glow, 9, 33)
	// dragAndDrop(user_glow)

	var bot_glow = new createjs.Sprite(jsons["JSON1"])
	bot_glow.gotoAndStop("area_glow")
	setCoor(bot_glow, 521, 33)
	// dragAndDrop(bot_glow)

	user_glow.visible = false
	bot_glow.visible = false

	var user_icon = new createjs.Sprite(jsons["JSON1"])
	user_icon.gotoAndStop("fruit_" + p.colors["user"] + "_top")
	setCoor(user_icon, 14, 24)
		// user_icon.scaleX = user_icon.scaleY = .85

	var bot_icon = new createjs.Sprite(jsons["JSON1"])
	bot_icon.gotoAndStop("fruit_" + p.colors["bot"] + "_top")
	setCoor(bot_icon, 564, 24)
		// bot_icon.scaleX = bot_icon.scaleY = .85

	var time_podl = new createjs.Sprite(jsons["JSON1"])
	time_podl.gotoAndStop("bg_points")
	setCoor(time_podl, 256, 3)

	var time_center = new createjs.Sprite(jsons["JSON1"])
	time_center.gotoAndStop("clocks_center")
	setCoor(time_center, 256, 2)

	var btn_pause = new createjs.Sprite(jsons["JSON1"])
	btn_pause.gotoAndStop("btn_settings_top")
	setCoor(btn_pause, 226, 9)
	btn_pause.addEventListener("click", function(){
		par.createModal("pause")
	})
	// dragAndDrop(btn_pause)

	var btn_home = new createjs.Sprite(jsons["JSON1"])
	btn_home.gotoAndStop("btn_house_top")
	setCoor(btn_home, 339, 9)

	var h = new createjs.Shape()
	h.graphics.beginFill("#000000").drawRect(0, 0, btn_home.getBounds().width, btn_home.getBounds().height)
	h.alpha = .01
	setCoor(h, 333, 12)
	h.addEventListener("click", function(){
		par.createModal("confirm")
	})

	// btn_home.hitObject = h
	// dragAndDrop(h)

	var timer = new Array()
	for(var a=0; a<8; a++){
		timer[a] = new createjs.Sprite(jsons["JSON1"])
		timer[a].gotoAndStop("clocks_time_" + a)
		setCoor(timer[a], 256, 2)
	}

	// dragAndDrop(krest)
	// dragAndDrop(galka)
	// dragAndDrop(reset)
	// dragAndDrop(nadpis)


//////////////////
	this.addChild(user_glow)
	this.addChild(bot_glow)
	// this.addChild(user_icon)
	// this.addChild(bot_icon)
	// this.addChild(time_podl)
	// this.addChild(timer_cont)
	// this.addChild(time_center)
	this.addChild(win_user)
	this.addChild(win_bot)
	this.addChild(btn_pause)
	this.addChild(btn_home)
	this.addChild(user_turn)
	this.addChild(bot_turn)
	this.addChild(h)
	// this.addChild(slider)

/// Реализация таймера
	this.startTimer = function(){
		// // console.log(p.timeMove)
		// this.delInTimer()
		// var cur_part_time = 8
		// var interval = p.timeMove/9
		// var tick = function(){
		// 	if(cur_part_time<0){
		// 		par.createModal("timeisup")
		// 		MusicCTRL.play("sound3");
		// 		// par.switchPlayers()
		// 		return
		// 	}
		// 	setPartTime(cur_part_time)
		// 	cur_part_time--;
		// 	ticker = t_delayOn(interval, tick)
		// }
		// tick()
	}

	this.stopTimer = function(){
		t_setPause(ticker)
	}

	this.resumeTimer = function(){
		t_delInPause(ticker)
	}

	this.delInTimer = function() {
		t_delInTicker(ticker)
	}

	this.update = function(){
		win_user.setText(st_getYouWin())
		win_bot.setText(st_getBotWin())
	}

	this.setActivePlayer = function(v){
		// console.log(n)
		if(n>10){
			// console.log("exit")
			user_turn.visible = false
			bot_turn.visible = false
		}
		if(v == "user"){
			user_glow.visible = true
			bot_glow.visible = false
			user_border.visible = true
			bot_border.visible = false
			if(n<=10){
				user_turn.visible = true
				bot_turn.visible = false
			}
		}
		if(v == "bot"){
			user_glow.visible = false
			bot_glow.visible = true
			user_border.visible = false
			bot_border.visible = true
			if(n<=10){
				user_turn.visible = false
				bot_turn.visible = true
			}
		}
	}

	this.slideTurn = function(v){
		n++
		slider.alpha = 1
		slider.visible = true
		tw_removeTween(slider)
		t_delInTicker(delay)
		if(v == "user"){
			slider.gotoAndStop("text_your_turn_small")
			setCoor(slider, 225, -35)
		}
		if(v == "bot"){
			slider.gotoAndStop("text_robot")
			setCoor(slider, 256, -35)
		}
		tw_tweenTo(slider, {x: slider.x, y: 35/__koefDisplay, d:.3, call: function(){
			delay = t_delayOn(1, function(){
				tw_tweenTo(slider, {x: slider.x, y: slider.y, alpha: .01, call: function(){
					slider.visible = false
				}})
			})
		}})

	}
/// Установка части таймера
	function setPartTime(v){
		timer_cont.removeAllChildren()
		if(timer[v])
			timer_cont.addChild(timer[v])
	}
}