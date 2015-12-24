extend(Text, createjs.Container)

function Text(sheet, font, ref, kern)
{	
	this.initialize();
//---------------------//
	var arrPoint = new Array();	
	var reference;
	var t = new createjs.Container();
	var dx = 30;
	var ot = 15;
	this.addChild(t);

	if(kern)
		dx = kern
	if(ref)
		reference = ref;									

	this.setText = function (val){
		// console.log("/////////////////---------------///////////////")
		t.removeAllChildren();
		var l = val.toString();
		var numOtst = Math.floor(l.length/3);
		if(l.length%3 == 0)
			numOtst--;
		var x = (l.length-1) * dx + numOtst * ot;
		for (var i = l.length-1; i >=0; i--) {
			if(!arrPoint[i]){
				arrPoint[i] = new createjs.Sprite(sheet);
			};
			arrPoint[i].gotoAndStop(font + l[i]);
			setCoor(arrPoint[i], x);
			// arrPoint[i].x = x;
			t.addChild(arrPoint[i]);
			var otst = 0;
			if((l.length-i)%3 == 0){
				otst = ot;
				if(i!=0){
					var zpt = new createjs.Bitmap(images["zpt"]);
					zpt.x = x - dx + otst/2;
					t.addChild(zpt);
				};
			};
			x -= dx + otst;
		};
		if(reference == "Center"){
			t.x = - (dx/__koefDisplay/2) * l.length - numOtst/__koefDisplay/2 * ot;
		};
	};

	this.setText(0);
};