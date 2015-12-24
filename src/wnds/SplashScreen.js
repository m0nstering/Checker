extend(SplashScreen, createjs.Container);

function SplashScreen()
{	
	this.initialize();
//------------------//
	var img = new createjs.Bitmap(images["splash"]);
	img.scaleX = __WIDTHBG/img.getBounds().width
	img.scaleY = __HEIGHTBG/img.getBounds().height
	img.y = HEIGHTGAME/2 - __HEIGHTBG/2; 
	//img.addEventListener("click", function(){window.open(__config.url, "_blank")});
	// img.y = -50
	this.addChild(img);
}