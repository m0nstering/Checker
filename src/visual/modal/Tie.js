extend(Tie, createjs.Container);

function Tie(m, par)
{	
	this.initialize();
	var th = this
//--------------------------------//
	var t = new createjs.Container()
	this.addChild(m)
	this.addChild(t)

	var tex_opp = new createjs.Sprite(jsons["JSON1"])
	tex_opp.gotoAndStop("text_game_is_a_tie")
	setCoor(tex_opp, 136, 337)

	var btn_menu = new Button({pod: "btn", icon: "icon_menu"})
	setCoor(btn_menu, 136, 425)
	btn_menu.addEventListener("click", function(){v_choiseLocation("menu");});

	var btn_reset = new Button({pod: "btn", icon: "icon_reset"})
	setCoor(btn_reset, 403, 425)
	btn_reset.addEventListener("click", function(){
		m.slideOnBottom(function(){
			par.hideModal(th)
			par.update()
		})
	})

	// dragAndDrop(tex_opp)
	// dragAndDrop(btn_reset)

	m.getChanges().addChild(tex_opp)
	m.getChanges().addChild(btn_menu)
	m.getChanges().addChild(btn_reset)

	this.update = function(p){
		m.slideFromTop()		
	}
}