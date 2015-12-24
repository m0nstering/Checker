extend(Turn, createjs.Container);

function Turn(m, par)
{	
	this.initialize();
	var th = this
//--------------------------------//
	var t = new createjs.Container()
	this.addChild(m)
	this.addChild(t)

	var tex_opp = new createjs.Sprite(jsons["JSON1"])
	tex_opp.gotoAndStop("text_opponents_turn")
	setCoor(tex_opp, 140, 303)

	var tex_you = new createjs.Sprite(jsons["JSON1"])
	tex_you.gotoAndStop("text_your turn")
	setCoor(tex_you, 139, 337)

	// dragAndDrop(tex_opp)
	// dragAndDrop(tex_you)

	m.getChanges().addChild(tex_opp)
	m.getChanges().addChild(tex_you)

	this.update = function(p){
		tex_opp.visible = false
		tex_you.visible = false
		m.slideFromTop()
		t_delayOn(2, function(){
			m.slideOnBottom(function(){
				par.hideModal(th)
				par.playAndSwitch()})
			});
		
		if(p.turn == "user")
			tex_opp.visible = true
		if(p.turn == "bot")
			tex_you.visible = true
	}
}