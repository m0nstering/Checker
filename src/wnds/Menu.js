extend(Menu, createjs.Container);

function Menu()
{	
	this.initialize();
//--------------------------------//

	var fon = new createjs.Bitmap(images["cover"])
	fon.y = HEIGHTGAME/2 - fon.getBounds().height/2

	var play = new createjs.Shape()
	play.graphics.beginFill("#ff0000").drawRect(0, 0, 150, 150);
	play.alpha = .01
	play.addEventListener("click", function(){v_choiseLocation("playWith");})
	setCoor(play, 258, 573)

	var setting = new createjs.Shape()
	setting.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
	setting.alpha = .01
	setting.addEventListener("click", function(){v_choiseLocation("setting");})
	setCoor(setting, 528, 644)

	/*var moregames = new createjs.Shape()
	moregames.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
	moregames.alpha = .01
	moregames.addEventListener("click", function(){window.open(__config.url, "_blank")})*/

	var tink = new createjs.Shape()
	tink.graphics.beginFill("#ff0000").drawRect(0, 0, 250, 100);
	tink.alpha = .01
	//tink.addEventListener("click", function(){window.open(__config.url, "_blank")})
	setCoor(tink, 55, 176)

	//setCoor(moregames, 14, 644)

	//  dragAndDrop(tink)
	// dragAndDrop(setting)
	// dragAndDrop(moregames)
	// dragAndDrop(play)

	this.addChild(fon)
	this.addChild(play)
	this.addChild(setting)
	//this.addChild(moregames)
	this.addChild(tink)
}