extend(Fruit, createjs.Container);

function Fruit(kind)
{	
	this.initialize();
//--------------------------------//
	var queen = false
	var f = new createjs.Sprite(jsons["JSON1"])
	f.gotoAndStop("checker_" + kind)
	this.regX = f.getBounds().width/2
	this.regY = f.getBounds().height/2
	// dragAndDrop(f)

	this.addChild(f)

	this.setGlow = function(v){
		if(queen){
			if(v)
				f.gotoAndStop("checker_" + kind + "_queen_glow")
			else
				f.gotoAndStop("checker_" + kind + "_queen")
		}else{
			if(v)
				f.gotoAndStop("checker_" + kind + "_glow")
			else
				f.gotoAndStop("checker_" + kind)
		}
	}

	this.setQueen = function(){
		// console.log("QUEEN")
		f.gotoAndStop("checker_" + kind + "_queen")
		queen = true
	}

	this.animQueenStart = function(){
		var anim = new createjs.Sprite(jsons["JSON2"], "anim_1")
		anim.play()
		setCoor(anim, -104, -101)
		this.addChild(anim)

		anim.addEventListener("animationend", function(e){
			e.target.stop()
			if(e.target.parent)
				e.target.parent.removeChild(e.target)
		})
	}

	this.getQueen = function(){
		return queen
	}

	this.getKind = function(){
		return kind 
	}

}