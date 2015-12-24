extend(TimeIsUp, createjs.Container);

function TimeIsUp(m, par)
{	
	this.initialize();
	var th = this
//--------------------------------//
	var t = new createjs.Container()
	this.addChild(m)

	var time_podl = new createjs.Sprite(jsons["JSON1"])
	time_podl.gotoAndStop("bg_points")
	setCoor(time_podl, 256, 3)

	var time_center = new createjs.Sprite(jsons["JSON1"])
	time_center.gotoAndStop("clocks_center")
	setCoor(time_center, 256, 2)

	var timer = new createjs.Sprite(jsons["JSON1"])
	timer.gotoAndStop("clocks_time_7")
	setCoor(timer, 256, 2)

	var tex_opp = new createjs.Sprite(jsons["JSON1"])
	tex_opp.gotoAndStop("text_times_up")
	setCoor(tex_opp, 159, 328)

	setCoor(t, 11, 410)

	t.addChild(time_podl)
	t.addChild(time_center)
	t.addChild(timer)

	m.getChanges().addChild(tex_opp)
	m.getChanges().addChild(t)

	this.update = function(p){
		m.slideFromTop(function(){
			t_delayOn(2, function(){
				m.slideOnBottom(function(){
					par.switchPlayers()
				});
			})
		})
	}

}