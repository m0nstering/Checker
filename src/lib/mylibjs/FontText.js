extend(FontText, createjs.Container)

function FontText(sheet, ref)
{	

	this.initialize();
//---------------------//
	var arrPoint = new Array();	
	var reference;
	var dx = 30/__koefDisplay;

	if(ref)
		reference = ref;

	this.setText = function (val, line){
		if(!line)
			this.removeAllChildren();
		if(typeof(val) == "string" || typeof(val) == "number"){
			var t = new createjs.Container();
			var l = val.toString();
			var x = 0;//(l.length-1) * dx;
			var y = line ? sheet.lineHeight*(line-1) : 0;
			for (var i = 0; i <l.length; i++) {
				arrPoint[i] = new createjs.Sprite(new createjs.SpriteSheet(sheet.ss_font));
				arrPoint[i].gotoAndStop("f" + l[i]);
				// setCoor(arrPoint[i], x, y);
				arrPoint[i].x = x
				arrPoint[i].y = y
				t.addChild(arrPoint[i]);
				for(var a = 0; a<sheet.kerning.length; a++)
					if(sheet.kerning[a][0] == l[i] && !sheet.kerning[a][1]) {
						dx = sheet.kerning[a][2]
						break;
					};
				if((l.length - (i+1))%3 == 0 && i+1 != l.length && typeof(val) == "number")
					dx = dx*1.5;
				x += dx;
			};
			t.x = 0;
			if(reference == "Center")
				t.x = - x/2; 
			this.addChild(t);
		}else{
			line = 1;
			for(var a=0; a<val.length; a++){
				this.setText(val[a], line);
				line++;
			};
		};
	};

	this.setText(0);	
};