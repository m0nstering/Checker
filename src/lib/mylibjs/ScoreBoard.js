extend(StoreBoard, createjs.Container)

function StoreBoard(sheet, font)
{	
	this.initialize();
//---------------------------//

	var p = {time:.2};
	var st = true;
	var count;
	var currentNum = 0;
	var c = new FontText(font, "Center");
	setCoor(c, 0, 0)
	// c.x = 0
	// c.y = 0
	c.setText(currentNum);

	this.addChild(c);


	this.start = function (finishVal){
		var counter = 0
		st = false
		var step = Math.round((finishVal - currentNum)*round(1/__freq)/p.time);
		count = function(){
		 counter = counter + round(1/__freq)
			if (currentNum >= finishVal || st == true)
				return
			var d = step;
			if(currentNum + d > finishVal)
				d = finishVal - currentNum;
			currentNum = currentNum + d;
			c.setText(currentNum);
			t_delayOn(round(1/__freq), count)
		}
		t_delayOn(round(1/__freq), count)
	};

	this.set = function(val){
		c.setText(val);
	}
	
	this.stop = function (){
		st = true
	}

};