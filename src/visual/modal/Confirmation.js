extend(Confirmation, createjs.Container);

function Confirmation(m, par)
{
	this.initialize();
	var th = this
//--------------------------------//
	var t = new createjs.Container()
	// this.addChild(m)
	this.addChild(t)

	var plenka = new createjs.Shape()
	plenka.graphics.beginFill("330000").drawRect(0, 0, __WIDTHBG, __HEIGHTBG)
	plenka.y = HEIGHTGAME/2 - __HEIGHTBG/2
	plenka.alpha = .8

	var krest = new Button({pod: "btn_small", i: "icon_no"});	
	var galka = new Button({pod: "btn_small", i: "icon_yes"});	
	var reset = new Button({pod: "btn_small", i: "icon_reset"});
	krest.addEventListener("click", function(){
		if(par.hideModal)
			par.hideModal(th)
		if(par.resume)
			par.resume()
	})

	galka.addEventListener("click", function(){
		v_choiseLocation("menu")
	})

	reset.addEventListener("click", function(){
		v_choiseLocation("game")
	})

	var nadpis = new createjs.Sprite(jsons["JSON1"])
	nadpis.gotoAndStop("text_are_you_sure")
	setCoor(krest, 82, 438)
	setCoor(galka, 449, 438)
	setCoor(reset, 276, 603)
	setCoor(nadpis, 116, 173)

	this.addChild(plenka)
	this.addChild(krest)
	this.addChild(galka)
	this.addChild(reset)
	this.addChild(nadpis)



}