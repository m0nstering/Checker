extend(Preloader, createjs.Container);

function Preloader()
{	
	this.initialize();
//--------------------------------//
	var pr = new createjs.Bitmap(images["img_star"]);
	var prStartX = 68;
	var fullVall = 400;
	setCoor(pr, prStartX, 641);

	this.addChild(pr);

	// dragAndDrop(pr);

	this.setLvl = function (val) {
		setCoor(pr, (prStartX) + fullVall * val, null);
	}
};

