extend(About, createjs.Container);

function About()
{	
	this.initialize();
//--------------------------------//

	// var f = new createjs.Sprite(jsons["JSON1"])
	// f.gotoAndStop("window_big")
	// f.x = WIDTHGAME/2 - f.getBounds().width/2
	// f.y = HEIGHTGAME/2 - f.getBounds().height/2

	var title = new createjs.Sprite(jsons["JSON1"])
	title.gotoAndStop("checkers_about")
	setCoor(title, 148, 39)
	
	//title.addEventListener("click", function(){window.open(__config.url, "_blank")})
	// dragAndDrop(title)

	var btnback = new Button({pod: "btn_small", i: "icon_left"});
	setCoor(btnback, 15, 636)
	btnback.addEventListener("click", function(){v_choiseLocation("setting", {dont_update:true});});

	// this.addChild(f)
	this.addChild(title)
	this.addChild(btnback)

}
