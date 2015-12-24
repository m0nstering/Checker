extend(Modal, createjs.Container);

function Modal(sc, alpha)
{	
	this.initialize();
//--------------------------------//
	var _changes = new createjs.Container()

	var size = sc ? sc : "small"
	var al = alpha ? alpha : 0

	var sh = new createjs.Shape()
	sh.graphics.beginFill("000").drawRect(0,0,WIDTHGAME, HEIGHTGAME)
	sh.alpha = al

	var f = new createjs.Sprite(jsons["JSON1"])
	f.gotoAndStop("window_" + size)
	f.x = WIDTHGAME/2 - f.getBounds().width/2
	f.y = HEIGHTGAME/2 - f.getBounds().height/2

	this.addChild(sh)
	this.addChild(_changes)

	_changes.addChild(f)
	dragAndDrop(f)

	this.slideFromTop = function(cb) {
		_changes.y = -HEIGHTGAME

		tw_tweenTo(_changes, {x: _changes.x, y: .1, d: .5, call: cb} )
	}

	this.slideOnBottom = function(cb) {
		tw_tweenTo(_changes, {x: _changes.x, y: HEIGHTGAME, d: .5, call: cb} )
	}

	this.getChanges = function(){
		return _changes
	}

}