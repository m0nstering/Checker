extend(ChoiseLevel, createjs.Container);

function ChoiseLevel()
{	
	this.initialize();
//--------------------------------//
	
	var f = new createjs.Sprite(jsons["JSON1"])
	f.gotoAndStop("text_choose")
	setCoor(f, 204, 39)
	// f.x = WIDTHGAME/2 - f.getBounds().width/2
	// f.y = HEIGHTGAME/2 - f.getBounds().height/2

	var btnback = new Button({pod: "btn_small", i: "icon_left"});
	setCoor(btnback, 15, 636)
	btnback.addEventListener("click", function(){v_choiseLocation("playWith");});

	var title = new createjs.Sprite(jsons["JSON1"])
	title.gotoAndStop("text_beginner")
	setCoor(title, 204, 202)

	////////
	var play_1 = new createjs.Shape()
	play_1.graphics.beginFill("#ff0000").drawRect(0, 0, 200, 50);
	play_1.alpha = .01
	play_1.addEventListener("click", function(){gotoLvl(1)})
	setCoor(play_1, 221, 205)

	var play_2 = new createjs.Shape()
	play_2.graphics.beginFill("#ff0000").drawRect(0, 0, 200, 50);
	play_2.alpha = .01
	play_2.addEventListener("click", function(){gotoLvl(2)})
	setCoor(play_2, 221, 303)

	var play_3 = new createjs.Shape()
	play_3.graphics.beginFill("#ff0000").drawRect(0, 0, 200, 50);
	play_3.alpha = .01
	play_3.addEventListener("click", function(){gotoLvl(3)})
	setCoor(play_3, 221, 398)

	var play_4 = new createjs.Shape()
	play_4.graphics.beginFill("#ff0000").drawRect(0, 0, 200, 50);
	play_4.alpha = .01
	play_4.addEventListener("click", function(){gotoLvl(4)})
	setCoor(play_4, 221, 504)

	this.addChild(f)
	this.addChild(title)
	this.addChild(btnback)
	// this.addChild(btnback)

	this.addChild(play_1)
	this.addChild(play_2)
	this.addChild(play_3)
	this.addChild(play_4)

	// dragAndDrop(f)
	// dragAndDrop(title)
	// dragAndDrop(play_1)
	// dragAndDrop(play_2)
	// dragAndDrop(play_3)
	// dragAndDrop(play_4)

	var num;
	this.update = function(p){
		if(p && p.numChekers)
			num = p.numChekers
	}

	function gotoLvl(v){
		if(st_getNumLvl() == 0){
			v_choiseLocation("instructions", {game:true, lvl: v, num_checkers: num})
		}else{
			v_choiseLocation("game", {lvl: v, num_checkers: num});
		}
	}
}