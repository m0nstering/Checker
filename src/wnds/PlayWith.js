extend(PlayWith, createjs.Container);

function PlayWith()
{	
	this.initialize();
	var th = this
//---------------------------//

	var title = new createjs.Sprite(jsons["JSON1"])
	title.gotoAndStop("text_play_with")
	setCoor(title, 154, 171)

	var checker1 =  new Button({pod: "area_pers", i: "checker_blue", iconX: 10, iconY: 9, iconScaleX: .9, iconScaleY: .9});
	setCoor(checker1, 260, 266)
	checker1.addEventListener("click", function(){
		v_choiseLocation("chlevel", {numChekers: 8})
	})

	var checker2 =  new Button({pod: "area_pers", i: "checker_blue", iconX: 10, iconY: 9, iconScaleX: .9, iconScaleY: .9});
	setCoor(checker2, 260, 490)
	checker2.addEventListener("click", function(){
		v_choiseLocation("chlevel", {numChekers: 12})
	})

	var text1 = new Text(jsons["JSON1"], "text_")
	text1.setText(8)
	setCoor(text1, 188, 293)

	var text2 = new Text(jsons["JSON1"], "text_")
	text2.setText(12)
	setCoor(text2, 161, 516)

	var or = new createjs.Sprite(jsons["JSON1"])
	or.gotoAndStop("text_or")
	setCoor(or, 193, 415)

	var btnback = new Button({pod: "btn_small", i: "icon_left"});
	setCoor(btnback, 15, 636)
	btnback.addEventListener("click", function(){v_choiseLocation("menu");});

	// dragAndDrop(title)
	// dragAndDrop(checker1)
	// dragAndDrop(checker2)
	// dragAndDrop(text1)
	// dragAndDrop(text2)
	// dragAndDrop(or)

	this.addChild(title)
	this.addChild(checker1)
	this.addChild(checker2)
	this.addChild(text1)
	this.addChild(text2)
	this.addChild(or)
	this.addChild(btnback)


}