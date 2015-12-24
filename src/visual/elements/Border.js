extend(Border, createjs.Container);

function Border(x, y, width, height, color)
{	
	this.initialize();
//--------------------------------//
	
	var sh = new createjs.Shape()
	sh.graphics.setStrokeStyle(7/__koefDisplay).beginStroke(color).drawRect(x, y, width, height);

	this.addChild(sh);
}