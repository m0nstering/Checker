extend(Instructions, createjs.Container);

function Instructions()
{	
	this.initialize();
//--------------------------------//
	var podl = new createjs.Container()
	var game
	var _active
	var _coor = [
					[27, 78],
					[26, 148],
				]
	var title = new createjs.Sprite(jsons["JSON1"])
	title.gotoAndStop("text_instructions")
	setCoor(title, 122, 15)

	var tut = new Array() 
	for (var i = 0; i < 2; i++) {
		tut[i] = new createjs.Sprite(jsons["JSON1"])
		tut[i].gotoAndStop("instructions" + (i+1))
		setCoor(tut[i], _coor[i][0], _coor[i][1])
	};

	var next = new Button({pod: "btn_small", i: "icon_right"})
	setCoor(next, 520, 636)
	var pre = new Button({pod: "btn_small", i: "icon_house"})
	setCoor(pre, 15, 636)

	// var title = new createjs.Sprite(jsons["JSON1"])
	// title.gotoAndStop("text_how_to_play")
	// setCoor(title, 102, 7)

	// dragAndDrop(tut[0])
	// dragAndDrop(tut[1])
	// dragAndDrop(next)
	// dragAndDrop(pre)
	// dragAndDrop(title)

	podl.addChild(tut[0])
	// podl.addChild(tut[1])

	this.addChild(next)
	this.addChild(pre)
	this.addChild(podl)
	this.addChild(title)
	// this.addChild(title)

	function setActive(v){
		podl.removeAllChildren()

		if(v >=0 && v<2)
			active = v

		podl.addChild(tut[active])

		pre.removeAllEventListeners()
		if(active-1 <0){
			if(game)
				pre.addEventListener("click", function(){v_choiseLocation("chlevel");})
			else
				pre.addEventListener("click", function(){v_choiseLocation("setting", {dont_update:true});})
			pre.changeIcon({i:"icon_house"})
		}else{
			pre.addEventListener("click", function(){setActive(active-1)})
			pre.changeIcon({i:"icon_left"})
		}

		next.removeAllEventListeners()
		if(active+1 >=2){
			if(game){
				next.changeFrame("on")
				next.addEventListener("click", function(){v_choiseLocation("game", {lvl: game.lvl, num_checkers: game.num_checkers});})
			}else	
				next.changeFrame("off")
		}else{
			next.changeFrame("on")
			next.addEventListener("click", function(){setActive(active+1)})
		}

	}

	this.update = function(p){
		if(p && p.game)
			game = p
		else
			game = false
		setActive(0)
	}
}